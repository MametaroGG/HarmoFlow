import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { localeFromPath, localizedPath, languagePath } from '../.vitepress/theme/locale-routing.js';

const docs = path.resolve(import.meta.dirname, '..'), dist = path.join(docs, '.vitepress/dist');
const languages = ['ja','en','zh','ko'].map(code => ({code}));
const read = name => JSON.parse(fs.readFileSync(path.join(docs, '.vitepress/theme/locales', name+'.json'), 'utf8'));
const dictionaries = Object.fromEntries(['en','zh','ko'].map(l => [l, read(l)]));
const localizedArticles = Object.fromEntries(['en','zh','ko'].map(l => [l, read('help-'+l)]));
for (const locale of languages.map(l => l.code)) {
  assert.equal(localeFromPath((locale === 'ja' ? '' : locale + '/') + 'help/start.md'), locale);
  assert.equal(localizedPath('/help/start', locale), (locale === 'ja' ? '' : '/' + locale) + '/help/start.html');
  assert.equal(localizedPath('/graphics/layers.svg', locale), '/graphics/layers.svg');
  assert.equal(localizedPath('/logo.svg', locale), '/logo.svg');
  assert.equal(localizedPath('/#features', locale), (locale === 'ja' ? '' : '/' + locale) + '/#features');
  for (const old of languages.map(l => l.code)) {
    assert.equal(languagePath((old === 'ja' ? '' : old + '/') + 'help/layers.md', locale), (locale === 'ja' ? '' : '/' + locale) + '/help/layers.html');
  }
}
const keysets = Object.values(dictionaries).map(d => Object.keys(d).sort());
for (const keys of keysets) assert.deepEqual(keys, keysets[0]);
for (const locale of ['en','zh','ko']) {
  const articles = localizedArticles[locale];
  assert.equal(articles.length, 19);
  assert.equal(new Set(articles.map(a => a.slug)).size, 19);
  for (const a of articles) {
    assert(a.title && a.description && a.category && a.searchText.length > 50);
    assert(fs.existsSync(path.join(dist,locale,'help',a.slug+'.html')));
  }
  const home = fs.readFileSync(path.join(dist,locale,'index.html'),'utf8');
  const lang = {en:'en',zh:'zh-CN',ko:'ko-KR'}[locale];
  assert(home.includes('lang="'+lang+'"'), locale+' HTML lang');
  assert(home.includes(dictionaries[locale]['Windows専用']));
  assert(!home.includes('本文へスキップ'));
  assert(home.includes(locale+'/download.html'));
  const guide = fs.readFileSync(path.join(dist,locale,'guide.html'),'utf8');
  for (const a of articles) assert(guide.includes('id="'+a.slug+'"'), locale+' legacy anchor '+a.slug);
  const terms = fs.readFileSync(path.join(dist,locale,'terms.html'),'utf8');
  assert(terms.includes('lang="ja"'), 'EULA language must be explicit');
}
console.log('PASS: locale routing, same-page language switching, shared assets, 3 translated search indexes, language metadata and legacy anchors (static checks)');
const paintToolsSource = fs.readFileSync(path.join(docs, '.vitepress/theme/PaintTools.vue'), 'utf8');
const paintToolKeys = [...paintToolsSource.matchAll(/\bt\('([^']+)'\)/g)].map(m => m[1]);
for (const locale of ['en','zh','ko']) {
  for (const key of paintToolKeys) assert(dictionaries[locale][key], locale + ' missing paint feature translation: ' + key);
  const home = fs.readFileSync(path.join(dist,locale,'index.html'),'utf8');
  assert(home.includes(dictionaries[locale]['描く・消す・なじませる。']));
}
console.log('PASS: new paint feature copy and diagram descriptions in all locales');
