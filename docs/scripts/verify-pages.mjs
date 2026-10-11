import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const docs = path.resolve(import.meta.dirname, '..');
const dist = path.join(docs, '.vitepress/dist');
const base = process.env.DOCS_BASE || '/HarmoFlow/';
assert(base.startsWith('/') && base.endsWith('/'), 'Use a site-absolute base with trailing slash');
const origin = process.env.DOCS_ORIGIN || 'https://mametarogg.github.io';
const files = fs.readdirSync(dist, { recursive: true }).map(file => file.replaceAll('\\', '/')).filter(file => fs.statSync(path.join(dist, file)).isFile());
const htmlFiles = files.filter(file => file.endsWith('.html'));
assert.equal(htmlFiles.length, 113);
let references = 0;
const errors = [];
const decode = text => text.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');
function targetFor(ref, from) {
  if (!ref || /^(?:data:|mailto:|tel:|javascript:|#)/i.test(ref)) return;
  const url = new URL(decode(ref), origin + base + from);
  if (url.origin !== origin) return;
  if (!url.pathname.startsWith(base)) {
    errors.push(`${from}: reference escapes ${base}: ${ref}`);
    return;
  }
  const relative = decodeURIComponent(url.pathname.slice(base.length));
  const target = path.join(dist, relative.endsWith('/') || !relative ? relative + 'index.html' : relative);
  references++;
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) errors.push(`${from}: missing ${ref}`);
}
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]*)"/g)) targetFor(match[1], file);
  for (const match of html.matchAll(/\bsrcset="([^"]*)"/g)) {
    for (const candidate of match[1].split(',')) targetFor(candidate.trim().split(/\s+/)[0], file);
  }
  if (file !== '404.html') assert.equal((html.match(/rel="alternate"/g) || []).length, 4, `${file}: language alternates`);
}
for (const file of files.filter(file => file.endsWith('.css'))) {
  const css = fs.readFileSync(path.join(dist, file), 'utf8');
  for (const match of css.matchAll(/url\(\s*["']?([^\s)"']+)["']?\s*\)/g)) targetFor(match[1], file);
}
for (const prefix of ['', 'en/', 'zh/', 'ko/']) {
  const home = fs.readFileSync(path.join(dist, prefix, 'index.html'), 'utf8');
  assert(home.includes('x3csgJasBKg'), `${prefix || 'ja'}: launch YouTube link`);
  assert(home.includes(base + prefix + 'help.html'), `${prefix || 'ja'}: localized help link`);
  assert(home.includes(base + 'logo.svg'), `${prefix || 'ja'}: shared logo path`);
}
for (const name of ['LICENSE', 'README.md']) assert(fs.existsSync(path.join(docs, '.vitepress/theme/icons', name)));
for (const name of ['lucide-LICENSE.txt', 'graphics/model-movie/CREDITS.txt']) assert(fs.existsSync(path.join(dist, name)));
assert.equal(files.filter(file => file.startsWith('captures/') && file.endsWith('.mp4')).length, 8);
const media = JSON.parse(fs.readFileSync(path.join(docs, '.vitepress/theme/guide-media.json'), 'utf8'));
const captures = new Set(media.filter(slot => slot.kind === 'image').flatMap(slot => slot.images?.map(image => image.src) || [slot.src]).filter(Boolean));
assert.equal(captures.size, 11);
for (const capture of captures) assert(fs.existsSync(path.join(dist, capture)), `Missing guide capture: ${capture}`);
for (const file of files) assert(fs.statSync(path.join(dist, file)).size < 25 * 1024 * 1024, `Large asset: ${file}`);
assert.deepEqual(errors, [], errors.join('\n'));
console.log(`PASS: ${htmlFiles.length} GitHub Pages routes, ${references} local references, 4 language alternates per content page, 8 guide videos, 11 captures, launch video and license assets`);
