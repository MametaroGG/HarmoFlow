import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { ref, computed } from 'vue';
import postcss from 'postcss';

const docs = path.resolve(import.meta.dirname, '..');
const dist = path.join(docs, '.vitepress/dist');
const base = process.env.DOCS_BASE || '/HarmoFlow/';
const origin = 'https://mametarogg.github.io';
const locales = [['ja-JP', ''], ['en', 'en/'], ['zh-CN', 'zh/'], ['ko-KR', 'ko/']];
const read = file => fs.readFileSync(path.join(dist, file), 'utf8');
const alternates = html => Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m => [m[1], m[2]]));
const pages = fs.readdirSync(dist, { recursive: true }).filter(file => file.endsWith('.html') && file !== '404.html');
assert.equal(pages.length, 112);
for (const file of pages) {
  const route = file.replace(/^(en|zh|ko)\//, '').replace(/^index\.html$/, '');
  const expected = Object.fromEntries(locales.map(([lang, prefix]) => [lang, origin + base + prefix + route]));
  assert.deepEqual(alternates(read(file)), expected, `${file}: fully qualified equivalent-page alternates`);
  for (const [, prefix] of locales) {
    assert.deepEqual(alternates(read(prefix + (route || 'index.html'))), expected, `${file}: reciprocal alternates`);
  }
}

for (const [, prefix] of locales) {
  const home = read(prefix + 'index.html');
  assert.match(home, /<main id="main">(?:<!--[\s\S]*?-->)*<section class="[^"]*\bhero\b[^"]*"/, `${prefix}: original hero remains the first section`);
  assert(!home.includes('launch-video-section'), `${prefix}: no separate launch-video section`);
  assert.equal((home.match(/youtube\.com\/embed\/x3csgJasBKg/g) || []).length, 1);
  const player = home.match(/<iframe\b[^>]*src="https:\/\/www\.youtube\.com\/embed\/x3csgJasBKg[^>]+>/)?.[0];
  assert(player && player.includes('loading="eager"') && player.includes('allowfullscreen'), `${prefix}: visible, controllable player`);
  assert(!player.includes('autoplay=1'), 'Launch video must not force autoplay');
  assert(home.includes('href="https://www.youtube.com/watch?v=x3csgJasBKg"'), 'YouTube fallback missing');
  assert(player.includes('title="') && !player.includes('controls=0'), `${prefix}: named player keeps native controls`);
  assert.match(home, /<p class="hero-note">[\s\S]*?<\/p><\/div><div class="hero-launch-video" role="group" aria-label="[^"]+"><div class="launch-video-frame">[\s\S]*?<\/iframe><\/div><a class="launch-video-link"[^>]+>[^<]+<\/a><\/div><div class="hero-product">/, `${prefix}: player sits directly after requirements and before the existing layer demo`);
  assert(home.indexOf('</h1>') < home.indexOf('hero-launch-video'), `${prefix}: headline remains above the video`);

  const help = read(prefix + 'help.html');
  assert.equal((help.match(/class="category-link-title"/g) || []).length, 22, `${prefix}: all help titles remain`);
  assert.equal((help.match(/category-link-icon/g) || []).length, 22, `${prefix}: link affordances`);
  const breadcrumbs = read(prefix + 'guide.html').match(/<div class="breadcrumbs">([\s\S]*?)<\/div>/)?.[1];
  assert(breadcrumbs);
  assert.equal((breadcrumbs.match(/class="breadcrumb-divider"/g) || []).length, 1, `${prefix}: no repeated guide breadcrumb`);
  assert.equal((breadcrumbs.match(/aria-current="page"/g) || []).length, 1);

  const terms = read(prefix + 'terms.html');
  const shopLinks = [...terms.matchAll(/href="(https:\/\/mametarovv\.booth\.pm\/[^"\s]*)"/g)].map(m => m[1]);
  assert(shopLinks.length >= 4);
  for (const link of shopLinks) assert(['https://mametarovv.booth.pm/', 'https://mametarovv.booth.pm/items/8754692'].includes(link), `${prefix}: malformed shop link ${link}`);
  assert(terms.includes('https://mametarovv.booth.pm/</a>）. 無断転載・再配布を禁じます.'));
  assert(terms.includes('https://mametarovv.booth.pm/</a>）で'), 'Preserve visible Japanese agreement text');
}

const theme = path.join(docs, '.vitepress/theme');
const cssText = fs.readFileSync(path.join(theme, 'custom.css'), 'utf8');
const css = postcss.parse(cssText);
const ruleValues = selector => {
  const values = {};
  css.walkRules(rule => {
    if (rule.selector === selector && rule.parent.type === 'root') {
      for (const decl of rule.nodes.filter(node => node.type === 'decl')) values[decl.prop] = decl.value;
    }
  });
  return values;
};
const luminance = hex => {
  const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);
const link = ruleValues('.category-links a');
assert(contrast(link.color, '#ffffff') >= 4.5, 'Help titles require accessible normal-text contrast');
assert(!cssText.includes('.category-links a > span:last-child'), 'Do not mute the title span');
const active = ruleValues('.category-links a:hover,\n.category-links a:focus-visible');
assert(contrast(active.color, active.background) >= 4.5, 'Hover/focus title contrast');
assert.equal(active['text-decoration'], 'underline');
assert(ruleValues('.category-links a:focus-visible').outline, 'Visible keyboard focus');
assert.equal(ruleValues('.launch-video-frame')['aspect-ratio'], '16 / 9');
assert.equal(ruleValues('.launch-video-frame iframe').width, '100%');

// Exercise the real setup handlers with Vue refs and minimal DOM/lifecycle doubles.
// This is a behavior regression check, not a substitute for browser QA.
const layout = fs.readFileSync(path.join(theme, 'Layout.vue'), 'utf8');
const script = layout.match(/<script setup>([\s\S]*?)<\/script>/)[1].replace(/^import .*;\n/gm, '');
const callbacks = [], watchers = [];
const document = { activeElement: null };
const page = ref({ relativePath: 'guide.md', title: 'ユーザーガイド', headers: [] });
const context = {
  ref, computed, document,
  useData: () => ({ frontmatter: ref({}), page }),
  useRoute: () => ({ path: '/HarmoFlow/guide.html' }),
  useRouter: () => ({ go() {} }),
  withBase: value => value,
  localeFromPath: () => 'ja',
  localizedPath: value => value,
  dictionaries: { ja: {} }, jaArticles: [], jaCategories: [], localizedArticles: {},
  watch: (source, handler) => watchers.push(handler), onMounted() {}, onUnmounted() {},
  nextTick: callback => { if (callback) callbacks.push(callback); return Promise.resolve(); },
};
vm.runInNewContext(script + '\nglobalThis.handlers = { openSearch, closeSearch, keyboard, modal, menu, query, searchInput, menuToggle };', context);
const { handlers: h } = context;
const flush = () => { while (callbacks.length) callbacks.shift()(); };
const target = () => ({ count: 0, focus() { this.count++; document.activeElement = this; } });
const opener = target(), other = target(), input = target(), toggle = target();
h.searchInput.value = input;
h.menuToggle.value = toggle;
document.activeElement = opener;
await h.openSearch();
assert.equal(h.modal.value, true);
assert.equal(input.count, 1);
h.keyboard({ key: 'Escape' }); flush();
assert.equal(h.modal.value, false);
assert.equal(opener.count, 1);
document.activeElement = other;
h.keyboard({ key: 'Escape' }); flush();
assert.equal(document.activeElement, other, 'Escape while closed must not move focus');
assert.equal(opener.count, 1);
h.menu.value = true;
h.keyboard({ key: 'Escape' }); flush();
assert.equal(h.menu.value, false);
assert.equal(toggle.count, 1, 'Menu dismissal returns focus to its toggle');
let prevented = false;
document.activeElement = other;
h.keyboard({ key: 'k', ctrlKey: true, preventDefault() { prevented = true; } });
await Promise.resolve();
assert(prevented && h.modal.value, 'Ctrl+K still opens search');
h.query.value = 'paint';
watchers[0](); flush();
assert.equal(h.modal.value, false);
assert.equal(h.query.value, '');
assert.equal(other.count, 0, 'Navigation must not restore stale search focus');
h.query.value = 'brush'; watchers[0]();
assert.equal(h.query.value, '', 'Navigation clears the inline help query when the modal is closed');
document.activeElement = opener;
await h.openSearch();
h.closeSearch();
document.activeElement = other;
await h.openSearch(); flush();
assert.equal(opener.count, 1, 'A queued close must not steal focus from a reopened dialog');
h.closeSearch(); flush();
assert.equal(other.count, 1);

console.log(`PASS: 112 reciprocal absolute language alternates; 4 launch players between hero requirements and layer demo, help lists, EULA links and deduplicated breadcrumbs; help contrast ${contrast(link.color, '#ffffff').toFixed(2)}:1; search/menu focus regressions`);
