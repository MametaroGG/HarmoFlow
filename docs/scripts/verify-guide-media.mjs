import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const docs = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slots = JSON.parse(fs.readFileSync(path.join(docs,'.vitepress/theme/guide-media.json'),'utf8'));
assert.equal(slots.length,16);
assert.equal(new Set(slots.map(s=>s.id)).size,16);
assert.equal(slots.filter(s=>s.kind==='image').length,8);
assert.equal(slots.filter(s=>s.kind==='video').length,8);
for (const item of slots) for (const locale of ['ja','en','zh','ko']) {
  assert(item.copy[locale].title && item.copy[locale].caption);
}
for (const item of slots) {
  for (const asset of [item.src, item.poster, ...(item.images || []).map(i=>i.src)].filter(Boolean)) {
    assert(fs.existsSync(path.join(docs,'site/public',asset)), 'Missing capture '+asset);
  }
}
const availableVideos = slots.filter(s=>s.kind==='video' && s.src).length;
const pendingSlots = slots.filter(s=>!s.src && !s.images?.length).length;
assert.equal(availableVideos,8);
assert.equal(pendingSlots,0);
assert(!fs.existsSync(path.join(docs,'site/public/screenshots')));
for (const locale of ['ja','en','zh','ko']) {
  const dir = path.join(docs,'.vitepress/dist',locale==='ja'?'':locale,'help');
  const html = fs.readdirSync(dir).filter(f=>f.endsWith('.html')).map(f=>fs.readFileSync(path.join(dir,f),'utf8')).join('\n');
  assert.equal((html.match(/data-media-slot=/g)||[]).length,16,locale+' media slots');
  for (const slot of slots) assert(html.includes('data-media-slot="'+slot.id+'"'));
  assert(!html.includes('/screenshots/'));
  assert.equal((html.match(/<video\b/g)||[]).length,availableVideos,'Only supplied videos should render players');
  assert(!/<video[^>]*autoplay/.test(html),'Viewport controller must own autoplay timing');
  assert.equal((html.match(/class="guide-media-placeholder"/g)||[]).length,pendingSlots);
  assert(!html.includes('src=""'));
  assert.equal((html.match(/class="guide-flow(?:\s|\")/g)||[]).length,7,locale+' explanatory flows');
}
const guide = fs.readFileSync(path.join(docs,'.vitepress/dist/guide.html'),'utf8');
assert.equal((guide.match(/data-media-slot=/g)||[]).length,16);
assert(!guide.includes('/screenshots/'));
console.log('PASS: 16 shared media slots, 11 supplied screenshots, 8 viewport-controlled videos, 0 remaining reservations, no old screenshots or empty players, and 7 explanatory flows (static).');
