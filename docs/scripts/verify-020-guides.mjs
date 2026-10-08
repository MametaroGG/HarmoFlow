import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { releases } from '../.vitepress/theme/release-notes-data.js';
import { articles as jaArticles } from '../.vitepress/theme/help-data.js';

const docs = path.resolve(import.meta.dirname, '..');
const dist = path.join(docs, '.vitepress/dist');
const base = process.env.DOCS_BASE || '/HarmoFlow/';
const release = releases.find(item => item.id === 'v0-2-0');
assert(releases.includes(release), '0.2.0 remains in the release history');
assert.equal(release.version, 'Ver.0.2.0');
assert.equal(release.date, '2026-10-08', 'Date from the official release notes');
assert.equal(release.sourceUrl, 'https://github.com/MametaroGG/HarmoFlow/releases/tag/Ver.0.2.0');
assert.equal(release.video.youtubeId, 'fFjN-EyH7sQ', 'Use the owner-provided 0.2.0 video');
assert.equal(release.video.watchUrl, 'https://www.youtube.com/watch?v=fFjN-EyH7sQ');
const required = {
  brush: ['paint-selection-transform'],
  layers: ['layer-blend-modes'],
  assets: ['decal-library'],
  materials: ['material-cache-management'],
  paths: ['path-surface-target'],
  projects: ['scene-version-compatibility'],
  settings: ['appearance-theme'],
  shortcuts: ['visual-key-config', 'selection-tool-shortcuts'],
  workspace: ['workspace-020'],
  uv: ['uv-paint-selection'],
};
for (const locale of ['ja', 'en', 'zh', 'ko']) {
  const prefix = locale === 'ja' ? '' : locale + '/';
  const read = route => fs.readFileSync(path.join(dist, prefix + route), 'utf8');
  const updates = read('updates.html');
  const home = read('index.html');
  for (const html of [updates, home]) {
    const players = html.match(/<iframe\b[^>]*youtube-nocookie\.com\/embed\/fFjN-EyH7sQ[^>]*>/g) || [];
    assert.equal(players.length, 1, locale + ': one correctly attributed 0.2.0 player');
    assert(players[0].includes('width="1280"') && players[0].includes('height="720"') && players[0].includes('allowfullscreen'), locale + ': reserved responsive player');
    assert(players[0].includes(`title="${release.content[locale].videoTitle}"`), locale + ': localized video title');
    assert(!players[0].includes('autoplay=1'), locale + ': no forced video playback');
    assert(html.includes(release.video.watchUrl), locale + ': direct video link');
  }
  const index = locale === 'ja' ? jaArticles : JSON.parse(fs.readFileSync(path.join(docs, '.vitepress/theme/locales/help-' + locale + '.json'), 'utf8'));
  assert(updates.indexOf('id="release-v0-2-0"') < updates.indexOf('id="release-v0-1-2"'), locale + ': newest release precedes preserved history');
  assert(updates.includes('datetime="2026-10-08"'), locale + ': verified date renders');
  assert(updates.includes(release.sourceUrl), locale + ': official release linked');
  assert.equal((home.match(/class="current-release-card"/g) || []).length, 3, locale + ': three current feature highlights');
  assert(home.includes(`href="${base}${prefix}updates.html#release-v0-2-0"`), locale + ': home links to current release');
  for (const highlight of release.content[locale].highlights) {
    assert(!highlight.image && !highlight.visual, locale + ': no fabricated product media');
    for (const html of [updates, home]) {
      assert(html.includes(highlight.title), locale + ': localized highlight');
      assert(html.includes(`href="${base}${prefix}${highlight.href.slice(1)}"`), locale + ': localized highlight guide link');
    }
  }
  for (const [slug, anchors] of Object.entries(required)) {
    const source = fs.readFileSync(path.join(docs, 'site', prefix, 'help', slug + '.md'), 'utf8');
    const rendered = read('help/' + slug + '.html');
    for (const anchor of anchors) {
      assert(source.includes(`{#${anchor}}`), locale + ': source anchor ' + anchor);
      assert(rendered.includes(`id="${anchor}"`), locale + ': rendered anchor ' + anchor);
      if (locale === 'ja') assert(read('guide.html').includes(`id="${anchor}"`), 'Japanese full guide includes ' + anchor);
    }
    for (const content of [source, rendered, index.find(item => item.slug === slug).searchText]) {
      assert(content.includes('Ver.0.2.0'), locale + ': searchable current guidance in ' + slug);
    }
  }
  for (const [slug, term] of [['layers', '27'], ['assets', '255'], ['shortcuts', 'Shift']]) {
    assert(index.find(item => item.slug === slug).searchText.includes(term), locale + ': searchable release fact ' + term);
  }
  const compatibility = { ja: '旧版では正しく開けない場合', en: 'may not open correctly in older releases', zh: '可能无法在旧版中正确打开', ko: '구버전에서 올바르게 열리지 않을 수' };
  assert(read('help/projects.html').includes(compatibility[locale]), locale + ': 0.2.0 scene compatibility warning');
  assert(index.find(item => item.slug === 'projects').searchText.includes('.harmos'), locale + ': current scene filter is searchable');
  const notes = Object.values(release.content[locale].changes).flat().join(' ');
  for (const term of ['27', '255', 'Shift', '.harmos']) assert(notes.includes(term), locale + ': release detail ' + term);
  assert(read('help/shortcuts.html').includes('Ver.0.1.x'), locale + ': legacy key-config screenshot is labeled');
}
console.log('PASS: four-language 0.2.0 release, homepage, guide anchors, localized links, compatibility notes and searchable content; no fabricated media.');
