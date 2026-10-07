import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { releases, productIntroduction, featureGuides, updateCopy } from '../.vitepress/theme/release-notes-data.js';
import { localizedPath, languagePath } from '../.vitepress/theme/locale-routing.js';
import { articles as jaArticles } from '../.vitepress/theme/help-data.js';

const docs = path.resolve(import.meta.dirname, '..');
const dist = path.join(docs, '.vitepress/dist');
const base = process.env.DOCS_BASE || '/HarmoFlow/';
const locales = ['ja', 'en', 'zh', 'ko'];
const hashes = {
  'LINESeedJP-Regular.woff2': '75a41f51f4b2d3172fde7a45daf544a58df58f5791d996c3cb3fbf855f67c7a8',
  'LINESeedJP-Bold.woff2': '512c1b416bb24e281e182c5a70f3909a8ebd0b5494082f9b7a7c157452c7026f',
  'OFL.txt': '8aa3e80c0d02c9f999756a5bb21258700edea4c727dab6169f6460245c4b6f0a',
};
for (const [file, expected] of Object.entries(hashes)) {
  const data = fs.readFileSync(path.join(dist, 'fonts/line-seed-jp', file));
  assert.equal(crypto.createHash('sha256').update(data).digest('hex'), expected, 'Preserve the official font and license: ' + file);
}
assert.equal(productIntroduction.youtubeId, 'x3csgJasBKg');
assert.equal(productIntroduction.watchUrl, 'https://www.youtube.com/watch?v=x3csgJasBKg');
const uniqueIds = new Set();
for (const release of releases) {
  assert(/^[a-z0-9][a-z0-9-]*$/.test(release.id), 'Stable release anchor');
  assert(!uniqueIds.has(release.id), 'Unique release anchor');
  uniqueIds.add(release.id);
  assert(release.version, 'A release entry requires a confirmed version');
  if (release.date) assert(/^\d{4}-\d{2}-\d{2}$/.test(release.date), 'Use a confirmed ISO date when supplied');
  if (release.sourceUrl) assert(new URL(release.sourceUrl).protocol === 'https:', 'Release sources use HTTPS');
  if (release.video?.youtubeId) assert(/^[A-Za-z0-9_-]{11}$/.test(release.video.youtubeId), 'Valid video ID');
  if (release.video?.src) assert(release.video.poster, 'A local update video has a poster');
  for (const locale of locales) {
    const item = release.content[locale];
    assert(item?.title && item.summary && (!release.video || item.videoTitle), locale + ': release copy');
    assert(Array.isArray(item.highlights), locale + ': release highlights');
    assert(item.changes && Object.values(item.changes).some(items => items.length), locale + ': detailed changes');
    for (const image of item.highlights.flatMap(item => item.image ? [item.image] : [])) {
      assert(image.alt && image.width > 0 && image.height > 0, 'Images reserve their dimensions and have alternative text');
    }
  }
}
for (const locale of locales) {
  const prefix = locale === 'ja' ? '' : locale + '/';
  const html = fs.readFileSync(path.join(dist, prefix + 'updates.html'), 'utf8');
  const copy = updateCopy[locale];
  const text = html.replace(/<[^>]*>/g, '').replaceAll('&#39;', "'").replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, locale + ': one page heading');
  assert(text.includes(copy.title) && text.includes(copy.titleAccent), locale + ': localized title');
  for (const id of ['introduction', 'features', 'release-history']) {
    assert.equal((html.match(new RegExp(`id="${id}"`, 'g')) || []).length, 1, locale + ': unique ' + id);
    assert(html.includes(`href="#${id}"`), locale + ': section navigation ' + id);
  }
  assert.equal((html.match(/youtube-nocookie\.com\/embed\/x3csgJasBKg/g) || []).length, 1, locale + ': introduction video');
  assert(text.includes(copy.introNote), locale + ': product film is separate from release notes');
  assert(!html.includes('autoplay=1'), 'Do not autoplay release films');
  const player = html.match(/<iframe\b[^>]*youtube-nocookie\.com\/embed\/x3csgJasBKg[^>]*>/)?.[0];
  assert(player?.includes('width="1280"') && player.includes('height="720"') && player.includes('allowfullscreen'), locale + ': stable accessible player');
  assert(player.includes(`title="${copy.introVideoTitle}"`), locale + ': video title');
  assert.equal((html.match(/<article[^>]*class="[^"]*\brn-feature-card\b[^"]*"/g) || []).length, featureGuides.length, locale + ': complete feature summary');
  for (const feature of featureGuides) {
    assert(text.includes(copy.features[feature.id].title), locale + ': localized feature');
    for (const url of [feature.href, feature.secondaryHref].filter(Boolean)) assert(html.includes(`href="${base}${prefix}${url.slice(1)}"`), locale + ': localized feature link ' + url);
  }
  assert(html.includes(`href="${base}${prefix}help/start.html#update-backup"`), locale + ': update preparation');
  assert.equal((html.match(/rel="alternate"/g) || []).length, 4, locale + ': all language alternates');
  assert(html.includes(`href="${base}${prefix}updates.html" aria-current="page"`), locale + ': discoverable current nav');
  assert.equal(localizedPath('/updates', locale), (prefix ? '/' + locale : '') + '/updates.html');
  assert.equal(languagePath('ko/updates.md', locale), '/' + prefix + 'updates.html');
  if (!releases.length) {
    assert(text.includes(copy.emptyTitle) && text.includes(copy.emptyDescription), locale + ': truthful empty history');
    assert(!html.includes('class="rn-release"'), 'No fabricated version cards');
    assert(!/<time\b/.test(html), 'No invented release dates');
  }
  for (const release of releases) {
    assert(html.includes(`id="release-${release.id}"`), locale + ': release anchor');
    if (!release.date) assert(!html.includes('datetime="undefined"'), 'Unknown date stays omitted');
  }
  for (const weight of ['Regular','Bold']) assert(html.includes(`href="${base}fonts/line-seed-jp/LINESeedJP-${weight}.woff2"`), locale + ': local font preload');
}
// Keep the owner-provided 0.1.1 measurement attached to its exact workload.
const update011 = releases.find(item => item.id === 'v0-1-1');
assert(update011 && update011.version === 'Ver.0.1.1', 'Version from the provided update notes');
assert(!update011.date && !update011.sourceUrl, 'Do not infer an app release date or announcement URL from the published video');
assert.equal(update011.video.youtubeId, 'V4Ehv4t5r1M', 'Use the owner-published 0.1.1 update video');
assert.equal(update011.video.watchUrl, 'https://www.youtube.com/watch?v=V4Ehv4t5r1M');
const benchmark011 = update011.content.ja.highlights.find(item => item.visual?.kind === 'recomposite');
assert(benchmark011.description.includes('4K・不透明な素材1000レイヤー'), 'Preserve the supplied benchmark workload');
assert(benchmark011.description.includes('不透明度変更が約29倍高速化（中央値922ms→32ms）'), 'Preserve operation, approximation, medians and units');
assert(benchmark011.description.includes('改善幅は操作や環境によって異なります'), 'Keep the performance qualifier prominent');
const developmentEnvironmentLabels = {
  ja: '開発環境での計測',
  en: 'Measured in the development environment',
  zh: '在开发环境中测得',
  ko: '개발 환경',
};
for (const locale of locales) {
  const item = update011.content[locale].highlights.find(item => item.visual?.kind === 'recomposite');
  assert.equal(item.visual.before, 922);
  assert.equal(item.visual.after, 32);
  assert.equal(item.visual.unit, 'ms');
  const prefix = locale === 'ja' ? '' : locale + '/';
  const html = fs.readFileSync(path.join(dist, prefix + 'updates.html'), 'utf8');
  const releasePlayer = html.match(/<iframe\b[^>]*youtube-nocookie\.com\/embed\/V4Ehv4t5r1M[^>]*>/g) || [];
  assert.equal(releasePlayer.length, 1, locale + ': one 0.1.1 update player');
  assert(releasePlayer[0].includes(`title="${update011.content[locale].videoTitle}"`), locale + ': localized update video title');
  assert(releasePlayer[0].includes('width="1280"') && releasePlayer[0].includes('height="720"') && releasePlayer[0].includes('allowfullscreen'), locale + ': reserved accessible update player');
  assert(html.includes(`href="${update011.video.watchUrl}"`), locale + ': direct link to the update video');
  assert(html.indexOf('id="release-v0-1-1"') < html.indexOf(releasePlayer[0]) && html.indexOf(releasePlayer[0]) < html.indexOf('class="rn-release-highlights"', html.indexOf(releasePlayer[0])), locale + ': update video precedes its feature details');
  assert(html.includes('922') && html.includes('32') && html.includes('29'), locale + ': measurement renders');
  for (const context of [developmentEnvironmentLabels[locale], 'RTX 4070 SUPER', 'Core i5-12400F', 'DDR4 64GB']) {
    assert(item.description.includes(context), locale + ': performance highlight includes the measured development environment');
    assert(update011.content[locale].changes.improved.some(text => text.includes(context)), locale + ': detailed performance notes preserve the development environment');
    assert(html.includes(context), locale + ': development environment renders');
  }
  if (releases.every(item => !item.date)) assert(!/<time\b/.test(html), 'No release dates were provided');
  assert(html.indexOf('id="release-history"') < html.indexOf('id="introduction"'), 'Confirmed update notes precede the general product introduction');
}
// The 0.1.2 film, release notes and procedural guidance must ship together.
const update012 = releases.find(item => item.id === 'v0-1-2');
assert(releases.indexOf(update012) < releases.indexOf(update011), 'Preserve the 0.1.2 archive before 0.1.1');
assert.equal(update012.date, '2026-10-04', 'Use the date in the official release');
assert.equal(update012.sourceUrl, 'https://github.com/MametaroGG/HarmoFlow/releases/tag/Ver.0.1.2');
assert.equal(update012.video.youtubeId, '7ICF2pMDIbM');
const required012 = {
  start: ['app-install', 'update-backup'],
  workspace: ['pie-menu'],
  layers: ['layer-pie-menu', 'layer-tool-selection'],
  viewport: ['viewport-layer-pie'],
  brush: ['brush-uv-island-boundaries'],
  paths: ['path-uv-island-boundaries'],
  uv: ['uv-island-boundaries'],
  export: ['png-transparency'],
  projects: ['scene-version-compatibility'],
};
const obsoleteInstaller = ['ZIPの解凍や分割BINの結合は不要', 'No ZIP extraction', '无需解压ZIP', 'ZIP 압축 해제나 분할 BIN 파일 결합이 필요하지'];
for (const locale of locales) {
  const prefix = locale === 'ja' ? '' : locale + '/';
  const html = fs.readFileSync(path.join(dist, prefix + 'updates.html'), 'utf8');
  const releaseHtml = html.slice(html.indexOf('id="release-v0-1-2"'), html.indexOf('id="release-v0-1-1"'));
  const player = releaseHtml.match(/<iframe\b[^>]*youtube-nocookie\.com\/embed\/7ICF2pMDIbM[^>]*>/)?.[0];
  assert(player?.includes(`title="${update012.content[locale].videoTitle}"`), locale + ': localized 0.1.2 PV');
  assert(player.includes('width="1280"') && player.includes('height="720"'), locale + ': reserved PV dimensions');
  assert(releaseHtml.indexOf(player) < releaseHtml.indexOf('class="rn-release-highlights"'), locale + ': PV before 0.1.2 details');
  assert(html.includes('datetime="2026-10-04"') && html.includes('href="#release-v0-1-1"'), locale + ': dated release and preserved archive');
  assert(releaseHtml.includes(update012.content[locale].summary), locale + ': prominent compatibility summary');
  const index = locale === 'ja' ? jaArticles : JSON.parse(fs.readFileSync(path.join(docs, `.vitepress/theme/locales/help-${locale}.json`), 'utf8'));
  for (const [slug, anchors] of Object.entries(required012)) {
    const source = fs.readFileSync(path.join(docs, 'site', prefix, 'help', slug + '.md'), 'utf8');
    const rendered = fs.readFileSync(path.join(dist, prefix, 'help', slug + '.html'), 'utf8');
    for (const anchor of anchors) assert(source.includes(`{#${anchor}}`) && rendered.includes(`id="${anchor}"`), locale + ': source/rendered ' + anchor);
    for (const content of [source, rendered, index.find(item => item.slug === slug).searchText]) {
      assert(content.includes('Ver.0.1.2'), locale + ': 0.1.2 is searchable and rendered in ' + slug);
      if (slug === 'start') {
        assert(content.includes('ZIP') && content.includes('EXE'), locale + ': extract ZIP before installer');
        for (const phrase of obsoleteInstaller) assert(!content.includes(phrase), locale + ': no obsolete installer claim');
      }
      if (['start', 'paths', 'projects'].includes(slug)) assert(content.includes('Ver.0.1.1'), locale + ': old-version compatibility boundary');
      if (slug === 'export') for (const term of ['PNG', 'Base', 'Fill']) assert(content.includes(term), locale + ': scoped PNG transparency ' + term);
    }
  }
}
const component = fs.readFileSync(path.join(docs, '.vitepress/theme/ReleaseNotes.vue'), 'utf8');
assert(component.includes("font-family: 'LINE Seed JP', sans-serif"), 'New content uses the requested font');
assert(/aspect-ratio:\s*16\s*\/\s*9/.test(component), 'Film space is reserved before the iframe loads');
assert(/grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(component), 'Feature columns cannot force overflow');
assert(/@media\s*\(max-width:\s*620px\)/.test(component), 'Phone layout has a dedicated breakpoint');
assert(component.includes('grid-template-columns: 1fr'), 'Phone cards stack');
assert(component.includes('prefers-reduced-motion: reduce'), 'Motion preference is respected');
assert(!/scroll-margin-top:\s*108px/.test(component), 'Use the shared responsive anchor offset without doubling it');
console.log(`PASS: four localized update pages, verified introduction, ${releases.length} evidenced release entries, stable media frames, guide/navigation links, future release contract, and unchanged licensed LINE Seed JP fonts (static; not physical-device QA).`);
