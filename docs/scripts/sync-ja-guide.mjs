import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles } from '../.vitepress/theme/help-data.js';
const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../site');
const target = path.join(site, 'guide.md');
let intro = fs.readFileSync(target, 'utf8').split(/^## /m)[0];
intro = intro.replace('掲載画像は開発版の実画面です。', '画面画像は以前の開発版です。現在の配置や項目と異なる場合があります。図解は操作や仕組みを説明するためのものです。');
intro = intro.replaceAll(' →</span>', '</span>');
const sections = articles.map(({slug}) => fs.readFileSync(path.join(site,'help',slug+'.md'),'utf8')
  .replace(/^---\n[\s\S]*?\n---\n/, '')
  .replace(/<script setup>[\s\S]*?<\/script>\s*/g, '')
  .replace(/\]\(\.\.\/([^)]*)\)/g, '](/$1)')
  .replace(/\]\(\.\/([^)]*)\)/g, '](/help/$1)')
  .replace(/^(#{1,5}) /gm, '$1# ').trim());
fs.writeFileSync(target, intro.trim()+'\n\n'+sections.join('\n\n')+'\n');
console.log('Updated full Japanese guide from the same help articles; preserved section anchors.');
