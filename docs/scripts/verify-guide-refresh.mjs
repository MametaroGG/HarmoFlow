import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles } from '../.vitepress/theme/help-data.js';
const docs = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const names = ['layer-stack-mask','editable-adjustment-gradient-map','work-export-resolution','mix-before-after','face-versus-uv-island','clone-source-target'];
for (const name of names) {
  const svg = fs.readFileSync(path.join(docs,'site/public/graphics/guide',name+'.svg'),'utf8');
  assert(svg.includes('<svg') && svg.includes('viewBox='), name);
  assert(!/<script|onload=|javascript:/i.test(svg), name+' must remain a static diagram');
}
for (const locale of ['ja','en','zh','ko']) {
  const dir = path.join(docs,'site', locale === 'ja' ? '' : locale,'help');
  const read = slug => fs.readFileSync(path.join(dir,slug+'.md'),'utf8');
  assert(read('channels').includes('8192'), locale+' export limit');
  assert(read('mesh-maps').includes('1024') && read('mesh-maps').includes('64'), locale+' mesh-map defaults');
  assert(read('start').includes('UV0'), locale+' glTF limits');
  assert(read('layers').includes('Ctrl+C') && read('layers').includes('Ctrl+D'), locale+' layer shortcuts');
  const source = fs.readdirSync(dir).filter(p=>p.endsWith('.md')).map(p=>fs.readFileSync(path.join(dir,p),'utf8')).join('\n');
  for (const name of names) assert(source.includes('/graphics/guide/'+name+'.svg'), locale+' '+name);
  const index = locale === 'ja' ? articles : JSON.parse(fs.readFileSync(path.join(docs,'.vitepress/theme/locales/help-'+locale+'.json'),'utf8'));
  assert.deepEqual(index.slice(0,5).map(a=>a.slug), ['start','workspace','viewport','uv','brush']);
  assert(index.find(a=>a.slug==='start').searchText.includes('UV0'));
  if (locale === 'en') {
    assert(index.find(a=>a.slug==='start').searchText.includes('Import'));
    assert(index.find(a=>a.slug==='workspace').searchText.includes('HarmoFlow'));
  }
  const rendered = fs.readFileSync(path.join(docs,'.vitepress/dist',locale==='ja'?'':locale,'help/channels.html'),'utf8');
  assert(rendered.includes('work-export-resolution.svg'));
  assert(rendered.includes('8192'));
}
console.log('PASS: four-language guide facts, six diagrams, intact search words and learning order (static; no app runtime or browser QA).');
