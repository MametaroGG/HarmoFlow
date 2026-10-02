import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import postcss from 'postcss';
const root = path.resolve(import.meta.dirname, '..');
const theme = path.join(root, '.vitepress/theme');
const css = postcss.parse(fs.readFileSync(path.join(theme, 'custom.css'), 'utf8'));
let autoImages = false, heroAuto = false, containFrames = false;
css.walkRules(rule => {
  const values = Object.fromEntries(rule.nodes.filter(n => n.type === 'decl').map(n => [n.prop, n.value]));
  if (rule.selector === 'img' && values.height === 'auto') autoImages = true;
  if (rule.selector === '.hero-product > img' && values.height === 'auto' && values['object-fit'] === 'contain') heroAuto = true;
  if (rule.selector.includes('.feature-visual img') && rule.selector.includes('.export-image img') && values.height === 'auto' && values.width === 'auto' && values['object-fit'] === 'contain') containFrames = true;
});
assert(autoImages && heroAuto && containFrames, 'Image ratio protections missing');
const layout = fs.readFileSync(path.join(theme, 'Layout.vue'), 'utf8');
assert(!/[\p{Extended_Pictographic}⊞☰↗→←]/u.test(layout.replaceAll('©', '')), 'Decorative character icon found');
for (const m of layout.matchAll(/<SiteIcon name="([^"]+)"/g)) assert(fs.existsSync(path.join(theme, 'icons', m[1] + '.svg')));
const home = fs.readFileSync(path.join(root, '.vitepress/dist/index.html'), 'utf8');
assert(home.includes('3Dモデルに直接') && home.includes('テクスチャを描く'));
assert(home.includes('同じモデルで、NPRとPBRの仕上がりを比較'));
assert(home.includes('制作イメージ・実際の操作画面ではありません'));
assert(home.includes('Windows専用'));
assert(home.includes('動きを再生'));
for (const mode of ['npr','pbr']) for (const suffix of ['-worn.mp4','-worn-poster.webp']) assert(fs.existsSync(path.join(root, '.vitepress/dist/graphics/model-movie', mode + suffix)));
const material = fs.readFileSync(path.join(theme, 'PaintDemo.vue'), 'utf8');
assert(material.includes('IntersectionObserver') && material.includes('visibilitychange'));
assert(material.includes('type="range"') && material.includes('@timeupdate') && material.includes('aria-pressed'));
assert(layout.includes('prefers-reduced-motion') && layout.includes('animationEnabled'));
const download = fs.readFileSync(path.join(root, '.vitepress/dist/download.html'), 'utf8');
assert(download.includes('動作環境の目安（暫定）'));
assert(!download.includes('検証結果がまとまり次第掲載'));
assert(!layout.includes('name="arrow-'));
assert(!home.includes('/screenshots/'));
const cssText = fs.readFileSync(path.join(theme, 'custom.css'), 'utf8');
assert(cssText.includes('circle(0% at 50% 50%)') && cssText.includes('circle(75% at 50% 50%)'));
assert(cssText.includes('prefers-reduced-motion') && cssText.includes(':focus-visible, :active'));
for (const name of ['layers','paths','stamps','mesh-maps','export']) for(const ext of ['svg','png']) assert(fs.existsSync(path.join(root, '.vitepress/dist/graphics', name + '.' + ext)));
css.walkDecls('font-size', decl => { const match = /^(\d+(?:\.\d+)?)px$/.exec(decl.value); if(match) assert(Number(match[1]) >= 14, 'Small text: '+decl.value); });
assert(home.includes('site-icon') && home.includes('aria-hidden="true"'));
assert(!home.includes('思いのままに。'));
assert.equal((home.match(/class="brand-wordmark"/g)||[]).length, 2, 'Header/footer brand wordmarks missing');
assert(fs.existsSync(path.join(root, '.vitepress/dist/lucide-LICENSE.txt')));
for (const m of home.matchAll(/<img[^>]+src="([^"]+)"/g)) {
  const asset = m[1].replace(/^\/HarmoFlow\//, '').replace(/^\//, '');
  assert(fs.existsSync(path.join(root, '.vitepress/dist', asset)), `Missing image ${asset}`);
}
console.log('PASS: image sizing rules, local licensed SVG icons, revised copy, conceptual graphics, no decorative arrows and center-fill/reduced-motion rules and built image references (static checks; not browser QA)');

assert(layout.includes('hero-title-line hero-title-accent'), 'Hero title requires explicit centered lines');
assert(cssText.includes('width: min(100%, 432px)') && cssText.includes('grid-template-columns: repeat(2, minmax(0, 1fr))'), 'Hero paired controls require equal-width centered tracks');
assert(home.includes('NPR・PBRに対応した'), 'Both rendering modes must remain explicit');

assert(layout.includes('t("、")') && layout.includes('t("。")'), 'Hero punctuation must be retained');

assert(home.includes('<video') && home.includes('playsinline') && home.includes('preload="metadata"'), 'Layer painting movie must support inline mobile playback');
assert(material.includes('el.play()') && material.includes('el.pause()') && material.includes('pendingTime'), 'Video pause and mode position handling missing');
assert(material.includes('movie-static-poster') && material.includes('@error="error"'), 'Static and load failure fallback missing');
assert(home.includes('白いモデルに、色と質感を。') && home.includes('paint-layer-steps'), 'Layer painting sequence labels missing');
assert(!home.includes('/graphics/ukulele-demo/') && !home.includes('/graphics/paint-demo/'), 'Retired models must not be referenced');
assert(!home.includes('Joseph Burgan') && !home.includes('polyhaven.com/a/Ukulele_01'), 'Previous model attribution must not be applied to supplied models');
assert(fs.existsSync(path.join(root, '.vitepress/dist/graphics/model-movie/CREDITS.txt')), 'Model provenance note missing');
console.log('PASS: layer-painting movie, timeline, mode switching, pause/reduced-motion fallback, and supplied-model provenance (static checks)');

assert(material.includes("'デカール', '完成'") && !material.includes("'ライティング', 'コンポジット'"), 'Finish stages must be combined with completion');

assert(material.includes('@click="selectChapter(index)"') && material.includes('class="paint-chapter"'), 'Chapter labels must be native seek buttons');
assert(material.includes("emit('play')") && layout.includes('@play="animationEnabled = true"'), 'Chapter selection must resume playback');
assert(material.includes('else pendingTime = time'), 'Chapter selection must queue before media readiness');
assert(cssText.includes('.paint-chapter:focus-visible'), 'Chapter keyboard focus must be visible');

assert(layout.includes('class="language-chevron"') && cssText.includes('right:12px'), 'Language dropdown chevron needs inset spacing');
assert(cssText.includes('@media(forced-colors:active)'), 'Native high-contrast language control fallback missing');

const paintTools = fs.readFileSync(path.join(theme, 'PaintTools.vue'), 'utf8');
assert.equal((home.match(/class="paint-tool-card"/g) || []).length, 4, 'Four paint tool cards required');
assert(home.indexOf('02 / LAYERS') < home.indexOf('描く・消す・なじませる。') && home.indexOf('描く・消す・なじませる。') < home.indexOf('EDITING TOOLS'), 'Paint tools must follow Layers');
for (const label of ['ブラシ','消しゴム','色混ぜ・ぼかし','面・UV島の塗りつぶし']) assert(home.includes(label));
assert(paintTools.includes('IntersectionObserver') && cssText.includes('tool-blur-mix 6s'), 'Paint diagrams must have bounded entrance animation');
console.log('PASS: four source-grounded paint cards below Layers, functional diagrams and reduced-motion rules (static checks)');
assert.equal((paintTools.match(/class="paint-tool-replay"/g) || []).length, 4, 'Each paint diagram needs a replay button');
assert(paintTools.includes('entry.intersectionRatio >= .5') && paintTools.includes('diagrams.forEach'), 'Observe individual diagrams with a visibility threshold');
assert(paintTools.includes(':key="runs[0]"') && paintTools.includes("emit('play')"), 'Manual replay must restart the diagram and enable playback');
assert(cssText.includes('animation-play-state:paused') && cssText.includes(':not(.tool-manual)'), 'Pause preservation and manual reduced-motion override missing');

assert(cssText.includes('tool-erase-draw 6s') && cssText.includes('tool-fill-four 6s'), 'Non-brush demos need visible before/action/after timing');
assert(paintTools.includes('tool-phase-before') && paintTools.includes('tool-phase-after') && paintTools.includes('tool-erase-cursor'), 'Phase labels and moving eraser cursor missing');
