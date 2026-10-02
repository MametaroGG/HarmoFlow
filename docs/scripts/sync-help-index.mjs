import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles, categories } from '../.vitepress/theme/help-data.js';

const docs = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const order = ['start','workspace','viewport','uv','brush','layers','stamps','paths','materials','channels','mesh-maps','weathering','assets','projects','export','settings','shortcuts','glossary','troubleshooting'];
const plain = source => source.replace(/^---\n[\s\S]*?\n---\n/, '')
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
  .replace(/<[^>]+>/g, ' ').replace(/\{#[^}]+\}/g, '')
  .replace(/[|#*`]/g, ' ').replace(/\s+/g, ' ').trim();
for (const locale of ['ja','en','zh','ko']) {
  const file = path.join(docs, '.vitepress/theme/locales/help-'+locale+'.json');
  const current = locale === 'ja' ? articles : JSON.parse(fs.readFileSync(file,'utf8'));
  const next = order.map(slug => {
    const item = current.find(a => a.slug === slug);
    if (!item) throw new Error('Missing article: '+locale+'/'+slug);
    const source = fs.readFileSync(path.join(docs, 'site', locale === 'ja' ? '' : locale, 'help', slug+'.md'),'utf8');
    return {...item, searchText: plain(source)};
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
      if (!section) throw new Error('Missing guide anchor: '+locale+'/'+slug);
      return section.trim();
    });
    fs.writeFileSync(guidePath, intro.trim()+'\n\n'+ordered.join('\n\n')+'\n');
  }
}
console.log('Updated four search indexes and reading order from current help articles.');
