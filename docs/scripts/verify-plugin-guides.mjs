import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { articles } from '../.vitepress/theme/help-data.js';

const docs = path.resolve(import.meta.dirname, '..');
const site = path.join(docs, 'site');
const dist = path.join(docs, '.vitepress/dist');
const slugs = ['plugins', 'plugin-development', 'adjustments'];
const source = (prefix, slug) => fs.readFileSync(path.join(site, prefix, 'help', slug + '.md'), 'utf8');
const render = (prefix, slug) => fs.readFileSync(path.join(dist, prefix, 'help', slug + '.html'), 'utf8');
const explicitAnchors = text => [...text.matchAll(/\{#([^}]+)\}/g)].map(match => match[1]);
const codeBlocks = text => [...text.matchAll(/```(lua|c|bat)\n([\s\S]*?)```/g)].map(match => [match[1], match[2]]);

for (const prefix of ['', 'en', 'zh', 'ko']) {
  const index = prefix ? JSON.parse(fs.readFileSync(path.join(docs, '.vitepress/theme/locales/help-' + prefix + '.json'), 'utf8')) : articles;
  for (const slug of slugs) {
    const text = source(prefix, slug), html = render(prefix, slug);
    assert.deepEqual(explicitAnchors(text), explicitAnchors(source('', slug)), `${prefix}/${slug}: stable localized anchors`);
    for (const id of explicitAnchors(text)) assert(html.includes(`id="${id}"`), `${prefix}/${slug}: rendered anchor ${id}`);
    assert(index.some(article => article.slug === slug && article.searchText.length > 500), `${prefix}/${slug}: substantial search content`);
    assert(html.includes('rel="alternate"'), `${prefix}/${slug}: language alternatives`);
  }
  const plugin = source(prefix, 'plugins'), development = source(prefix, 'plugin-development'), adjustment = source(prefix, 'adjustments');
  assert(plugin.includes('hf.register_panel') && plugin.includes('extensions/') && plugin.includes('plugins/'));
  for (const message of ['Could not load DLL', 'DLL exports no hf_plugin_init', 'Plugin init failed or wrong API version', 'Already loaded']) assert(plugin.includes(message), `${prefix}: ${message}`);
  assert(plugin.includes('<GuideFlow kind="plugin-install" />'));
  assert(development.includes('<GuideFlow kind="plugin-authoring" />'));
  assert(development.includes('/downloads/harmoflow-plugin-sdk-v3.zip'));
  assert(development.includes('HF_API_VERSION') && development.includes('hf.api_version'));
  assert(development.includes('run = function(values)') && development.includes('values.opacity'));
  assert(development.includes('info->api_version = 1;') && development.includes('image->pixels'));
  assert.deepEqual(codeBlocks(development), codeBlocks(source('', 'plugin-development')), `${prefix}: runnable examples must stay identical`);
  assert(adjustment.includes('<GuideConcept kind="adjustments" />'));
  assert(adjustment.includes('BaseColor') && adjustment.includes('Roughness') && adjustment.includes('Emission'));
  assert(adjustment.includes('PSD') && adjustment.includes('.harmos'));
  const assets = source(prefix, 'assets'), viewport = source(prefix, 'viewport');
  assert(assets.includes('{#unitypackage-import}') && assets.includes('.unitypackage'));
  assert(viewport.includes('{#mesh-visibility}') && viewport.includes('id="shape-keys"') && viewport.includes('FBX'));
  assert(assets.includes('/graphics/guide/file-menu-import.png'));
  assert(viewport.includes('/graphics/guide/window-menu-panels.png'));
  const settings = source(prefix, 'settings');
  assert(settings.includes('id="lua-and-plugins"'));
  assert(!settings.includes('sdk/harmoflow_api.h') && !settings.includes('examples/sample_plugin/'), `${prefix}: no unavailable SDK paths`);
}

// Public SDK scope is deliberate: one approved header, an original C sample, and build instructions.
const sdk = path.join(site, 'public/downloads/harmoflow-plugin-sdk-v3');
assert.deepEqual(fs.readdirSync(sdk).sort(), ['README.md', 'guide_gray.c', 'harmoflow_api.h']);
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
assert.equal(hash(path.join(sdk, 'harmoflow_api.h')), '8488409642bafd734d36b84a638a23c786b254fe4d7c7b8484c146283946be6f');
assert.equal(hash(path.join(site, 'public/downloads/harmoflow-plugin-sdk-v3.zip')), 'e312cb42f6f90e7a7985a632c9ab5e75e14997247192e681328e63edbd352403');
for (const file of ['harmoflow_api.h', 'guide_gray.c', 'README.md']) assert(fs.existsSync(path.join(dist, 'downloads/harmoflow-plugin-sdk-v3', file)));
assert(fs.existsSync(path.join(dist, 'downloads/harmoflow-plugin-sdk-v3.zip')));
const sample = fs.readFileSync(path.join(sdk, 'guide_gray.c'), 'utf8').trim();
assert(source('', 'plugin-development').includes(sample), 'Published C sample matches the downloadable file');
for (const name of ['file-menu-import', 'window-menu-panels']) {
  const png = fs.readFileSync(path.join(dist, 'graphics/guide', name + '.png'));
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  assert(png.readUInt32BE(16) > 100 && png.readUInt32BE(20) > 100, `${name}: actual screenshot dimensions`);
}

// Check exact internal link fragments throughout the four new guides, including the full JA guide.
const base = process.env.DOCS_BASE || '/HarmoFlow/';
for (const prefix of ['', 'en/', 'zh/', 'ko/']) {
  for (const slug of [...slugs, 'assets', 'viewport', 'projects', 'settings', 'layers']) {
    const file = prefix + 'help/' + slug + '.html';
    const html = fs.readFileSync(path.join(dist, file), 'utf8');
    for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), 'https://mametarogg.github.io' + base + file);
      if (url.origin !== 'https://mametarogg.github.io' || !url.pathname.startsWith(base) || !url.hash) continue;
      const relative = decodeURIComponent(url.pathname.slice(base.length));
      const target = path.join(dist, !relative || relative.endsWith('/') ? relative + 'index.html' : relative);
      assert(fs.existsSync(target), `${file}: ${match[1]}`);
      const id = decodeURIComponent(url.hash.slice(1));
      assert(fs.readFileSync(target, 'utf8').includes(`id="${id}"`), `${file}: missing target anchor ${match[1]}`);
    }
  }
}
console.log('PASS: 12 localized plugin/adjustment articles, search/anchors, matching runnable examples, approved SDK scope/hash, two real menu screenshots, and internal guide links');
