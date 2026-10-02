import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles, categories } from '../.vitepress/theme/help-data.js';

const docs = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const order = ['start','workspace','viewport','uv','brush','layers','adjustments','stamps','paths','materials','channels','mesh-maps','weathering','assets','projects','export','settings','plugins','plugin-development','shortcuts','glossary','troubleshooting'];
const plain = source => source.replace(/^---\n[\s\S]*?\n---\n/, '')
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
  .replace(/<[^>]+>/g, ' ').replace(/\{#[^}]+\}/g, '')
  .replace(/[|#*`]/g, ' ').replace(/\s+/g, ' ').trim();
for (const locale of ['ja','en','zh','ko']) {
  const file = path.join(docs, '.vitepress/theme/locales/help-'+locale+'.json');
  const current = locale === 'ja' ? articles : JSON.parse(fs.readFileSync(file,'utf8'));
  const next = order.map(slug => {
    const item = current.find(a => a.slug === slug) || {slug};
    const source = fs.readFileSync(path.join(docs, 'site', locale === 'ja' ? '' : locale, 'help', slug+'.md'),'utf8');
    const metadata = Object.fromEntries(['title','category','description'].map(key => {
      const raw = source.match(new RegExp('^'+key+':\\s*(.+)$','m'))?.[1]?.trim();
      if (!raw) throw new Error('Missing '+key+': '+locale+'/'+slug);
      return [key, raw.replace(/^["']|["']$/g, '')];
    }));
    return {...item, ...metadata, searchText: plain(source)};
  });
  if (locale === 'ja') fs.writeFileSync(path.join(docs,'.vitepress/theme/help-data.js'), '// Generated from help articles by scripts/sync-help-index.mjs.\nexport const categories = '+JSON.stringify(categories,null,2)+';\nexport const articles = '+JSON.stringify(next,null,2)+';\n');
  else {
    fs.writeFileSync(file,JSON.stringify(next,null,2)+'\n');
    const guidePath = path.join(docs, 'site', locale, 'guide.md');
    const guide = fs.readFileSync(guidePath, 'utf8');
    const sections = guide.split(/(?=^## )/m);
    const intro = sections.shift();
    const ordered = order.map(slug => {
      const section = sections.find(s => s.split('\n')[0].includes('{#'+slug+'}'));
      if (section) return section.trim();
      const item = next.find(article => article.slug === slug);
      return `## ${item.title} {#${slug}}\n\n${item.description}\n\n[${item.title}](./help/${slug}.md)`;
    });
    fs.writeFileSync(guidePath, intro.trim()+'\n\n'+ordered.join('\n\n')+'\n');
  }
}
console.log('Updated four search indexes and reading order from current help articles.');
