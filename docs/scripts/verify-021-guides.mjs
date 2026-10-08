import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { releases } from '../.vitepress/theme/release-notes-data.js';
import { articles as jaArticles } from '../.vitepress/theme/help-data.js';
const docs = path.resolve(import.meta.dirname, '..');
const base = process.env.DOCS_BASE || '/HarmoFlow/';
const release = releases[0];
assert.equal(release.id, 'v0-2-1');
assert.equal(release.version, 'Ver.0.2.1');
assert.equal(release.date, '2026-10-08');
assert.equal(release.sourceUrl, 'https://github.com/MametaroGG/HarmoFlow/releases/tag/Ver.0.2.1');
assert(!release.video, 'Do not reuse the 0.2.0 video as a 0.2.1 video');
for (const locale of ['ja', 'en', 'zh', 'ko']) {
  const prefix = locale === 'ja' ? '' : locale + '/';
  const read = route => fs.readFileSync(path.join(docs, '.vitepress/dist', prefix + route), 'utf8');
  const updates = read('updates.html');
  const home = read('index.html');
  const content = release.content[locale];
  assert(updates.indexOf('id="release-v0-2-1"') < updates.indexOf('id="release-v0-2-0"'), locale + ': newest release first');
  assert(updates.includes(release.sourceUrl), locale + ': official patch release source');
  assert.equal(content.highlights.length, 0, 'A small fix release adds no feature highlights');
  assert(!content.changes.added, 'No invented new features');
  for (const html of [updates, home]) {
    assert(html.includes(content.title) && html.includes(content.summary), locale + ': patch summary');
    assert(html.includes('fFjN-EyH7sQ') && html.includes('Ver.0.2.0'), locale + ': retained feature release and film');
  }
  for (const text of [...content.changes.fixed, ...content.changes.improved]) assert(updates.includes(text), locale + ': complete patch details');
  assert(home.includes(`href="${base}${prefix}updates.html#release-v0-2-1"`), locale + ': newest release link');
  const index = locale === 'ja' ? jaArticles : JSON.parse(fs.readFileSync(path.join(docs, '.vitepress/theme/locales/help-' + locale + '.json'), 'utf8'));
  for (const slug of ['brush', 'uv']) {
    assert(read('help/' + slug + '.html').includes('Ver.0.2.1'), locale + ': relevant patch guidance');
    assert(index.find(item => item.slug === slug).searchText.includes('Ver.0.2.1'), locale + ': searchable patch guidance');
  }
  const start = fs.readFileSync(path.join(docs, 'site', prefix, 'help/start.md'), 'utf8');
  const installation = start.split('\n').find(line => line.startsWith('1.') && line.includes('BOOTH'));
  assert(installation?.includes('ZIP') && installation.includes('EXE'), locale + ': BOOTH ZIP to EXE instructions');
  assert(!installation.includes('Ver.0.1.2'), locale + ': version-neutral install instructions');
}
assert(fs.readFileSync(path.join(docs, '.vitepress/dist/guide.html'), 'utf8').includes('Ver.0.2.1'));
console.log('PASS: 0.2.1 patch release in four languages, latest links, preserved 0.2.0 film, relevant guides, search and version-neutral installation.');
