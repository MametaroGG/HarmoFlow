import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import config from '../.vitepress/config.mjs';

const docs = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(path.join(docs, file), 'utf8');
const slots = JSON.parse(read('.vitepress/theme/guide-media.json'));

// Read the dimensions stored in each MP4 track rather than trusting the manifest.
// This keeps CI independent of an installed video decoder or ffprobe.
function boxes(buffer, start = 0, end = buffer.length) {
  const result = [];
  while (start < end) {
    assert(start + 8 <= end, 'Complete MP4 box header');
    let size = buffer.readUInt32BE(start), header = 8;
    if (size === 1) {
      assert(start + 16 <= end, 'Complete extended MP4 box header');
      size = Number(buffer.readBigUInt64BE(start + 8));
      header = 16;
    } else if (size === 0) size = end - start;
    assert(size >= header && start + size <= end, 'Valid MP4 box boundary');
    result.push({ type: buffer.toString('ascii', start + 4, start + 8), start: start + header, end: start + size });
    start += size;
  }
  return result;
}

function videoDimensions(file) {
  const buffer = fs.readFileSync(file);
  const movie = boxes(buffer).find(box => box.type === 'moov');
  assert(movie, `${file}: movie metadata`);
  for (const track of boxes(buffer, movie.start, movie.end).filter(box => box.type === 'trak')) {
    const children = boxes(buffer, track.start, track.end);
    const media = children.find(box => box.type === 'mdia');
    const handler = media && boxes(buffer, media.start, media.end).find(box => box.type === 'hdlr');
    if (!handler || buffer.toString('ascii', handler.start + 8, handler.start + 12) !== 'vide') continue;
    const header = children.find(box => box.type === 'tkhd');
    assert(header, `${file}: video track header`);
    return { width: buffer.readUInt32BE(header.end - 8) / 65536, height: buffer.readUInt32BE(header.end - 4) / 65536 };
  }
  assert.fail(`${file}: video track`);
}

const guide = read('.vitepress/dist/guide.html');
const videos = slots.filter(item => item.kind === 'video' && item.src);
let screenshots = 0;
for (const item of slots.filter(item => item.images?.length)) {
  const figure = guide.match(new RegExp(`<figure\\b[^>]*data-media-slot="${item.id}"[^>]*>([\\s\\S]*?)</figure>`));
  assert(figure, `${item.id}: rendered gallery`);
  const frames = [...figure[1].matchAll(/<a\b([^>]*)>\s*<img\b([^>]*)>/g)];
  assert.equal(frames.length, item.images.length, `${item.id}: every image has its own frame`);
  item.images.forEach((image, index) => {
    assert(Number.isInteger(image.width) && image.width > 0 && Number.isInteger(image.height) && image.height > 0, `${image.src}: reserved dimensions`);
    assert(new RegExp(`width:\\s*${image.width}px`).test(frames[index][1]), `${image.src}: frame width is known before the image loads`);
    assert(frames[index][2].includes(`width="${image.width}"`) && frames[index][2].includes(`height="${image.height}"`), `${image.src}: image ratio is known before the image loads`);
    screenshots++;
  });
}
for (const item of videos) {
  assert(Number.isInteger(item.width) && item.width > 0 && Number.isInteger(item.height) && item.height > 0, `${item.id}: reserved dimensions`);
  assert.deepEqual({ width: item.width, height: item.height }, videoDimensions(path.join(docs, 'site/public', item.src)), `${item.id}: match the actual video dimensions`);
  const figure = guide.match(new RegExp(`<figure\\b[^>]*data-media-slot="${item.id}"[^>]*>([\\s\\S]*?)</figure>`));
  assert(figure, `${item.id}: rendered guide figure`);
  const video = figure[1].match(/<video\b[^>]*>/)?.[0];
  assert(video, `${item.id}: rendered player`);
  assert(video.includes(`width="${item.width}"`) && video.includes(`height="${item.height}"`), `${item.id}: dimensions present before metadata arrives`);
  assert(new RegExp(`aspect-ratio:\\s*${item.width}\\s*/\\s*${item.height}`).test(video), `${item.id}: reserve the true ratio before the poster loads`);
}

// Native fragment navigation and VitePress both clear the responsive header.
const css = postcss.parse(read('.vitepress/theme/custom.css'));
const values = (selector, media) => {
  const result = {};
  css.walkRules(selector, rule => {
    const scope = rule.parent.type === 'atrule' ? rule.parent.params : undefined;
    if (scope === media) rule.walkDecls(decl => { result[decl.prop] = decl.value; });
  });
  return result;
};
const desktop = values(':root');
const mobile = values(':root', '(max-width: 760px)');
assert.equal(config.scrollOffset.selector, '.site-header');
assert.equal(config.scrollOffset.padding, parseFloat(desktop['--anchor-gap']));
assert.equal(values('.site-header').height, 'var(--site-header-height)');
assert.equal(values('html')['scroll-padding-top'], 'calc(var(--site-header-height) + var(--anchor-gap))');
assert.equal(parseFloat(desktop['--site-header-height']), 82);
assert.equal(parseFloat(mobile['--site-header-height']), 66);
assert.equal(values('.guide-media-image a')['max-width'], '100%', 'Natural screenshot frames fit narrow screens');
assert.equal(values('.prose .guide-media-image img').width, '100%', 'Images use the reserved frame width before loading');

// Hash-only navigation never updates route.path, including a repeated hash.
const layout = read('.vitepress/theme/Layout.vue');
const script = layout.match(/<script setup>([\s\S]*?)<\/script>/)[1].replace(/^import .*;\n/gm, '');
const ref = value => ({ value });
const context = {
  ref, computed: fn => ({ get value() { return fn(); } }),
  useData: () => ({ frontmatter: ref({}), page: ref({ relativePath: 'index.md' }) }),
  useRoute: () => ({ path: '/HarmoFlow/' }), useRouter: () => ({ go() {} }),
  withBase: value => value, localeFromPath: () => 'ja', localizedPath: value => value,
  dictionaries: { ja: {} }, jaArticles: [], jaCategories: [], localizedArticles: {},
  watch() {}, onMounted() {}, onUnmounted() {}, nextTick: () => Promise.resolve(),
};
vm.runInNewContext(script + '\nglobalThis.handlers = { closeMenuOnNavigate, menu };', context);
const { closeMenuOnNavigate, menu } = context.handlers;
for (let click = 0; click < 2; click++) {
  menu.value = true;
  closeMenuOnNavigate({ target: { closest: selector => selector === 'a[href]' ? { href: '#features' } : null } });
  assert.equal(menu.value, false, 'Close on both new and repeated same-page links');
}
menu.value = true;
closeMenuOnNavigate({ target: { closest: () => null } });
assert.equal(menu.value, true, 'Non-link navigation content is not a link activation');
assert(/<nav\b[^>]*@click="closeMenuOnNavigate"/.test(layout), 'Navigation activation is connected to menu dismissal');

console.log(`PASS: ${videos.length} real MP4 dimensions, ${screenshots} reserved screenshot frames, pre-load rendered ratios, responsive anchor/header offsets, and same/repeated-link menu dismissal (static and logic checks; browser scroll QA remains required).`);
