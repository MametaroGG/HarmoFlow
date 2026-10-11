import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { articles } from '../.vitepress/theme/help-data.js';
const docs = path.resolve(import.meta.dirname, '..');
const anchors = {brush: ['pressure-flow-quality', 'selection-transform-frame'], layers: ['whole-layer-move'], materials: ['material-mask-transform'], viewport: ['mesh-visibility-shortcuts'], settings: ['settings-detached-panels'], workspace: ['detached-panels'], projects: ['scene-version-compatibility']};
const staleUv = ['UV strokes currently use fixed pressure', '現在のUV描画は一定の筆圧', '当前UV绘制以固定笔压', '현재 UV 그리기는 일정한 필압'];
for (const locale of ['ja', 'en', 'zh', 'ko']) {
  const prefix = locale === 'ja' ? '' : locale;
  const source = slug => fs.readFileSync(path.join(docs, 'site', prefix, 'help', slug + '.md'), 'utf8');
  const built = slug => fs.readFileSync(path.join(docs, '.vitepress/dist', prefix, 'help', slug + '.html'), 'utf8');
  const index = locale === 'ja' ? articles : JSON.parse(fs.readFileSync(path.join(docs, '.vitepress/theme/locales', `help-${locale}.json`), 'utf8'));
  for (const [slug, ids] of Object.entries(anchors)) {
    for (const id of ids) {
      assert(source(slug).includes(`{#${id}}`), `${locale}/${slug}: anchor ${id}`);
      assert(built(slug).includes(`id="${id}"`), `${locale}/${slug}: built anchor ${id}`);
    }
    assert(source(slug).includes('Ver.0.3.0'), `${locale}/${slug}: current release guidance`);
    assert(index.find(item => item.slug === slug).searchText.includes('Ver.0.3.0'), `${locale}/${slug}: searchable current guidance`);
  }
  for (const stale of staleUv) assert(!source('uv').includes(stale) && !built('uv').includes(stale), `${locale}: no stale UV limitations`);
  for (const key of ['Ctrl+T', 'K', 'M', 'S', 'Ctrl+H', 'Shift+H', 'Alt+H', 'Ctrl+Shift+H']) assert(source('shortcuts').includes(key), `${locale}: current keys`);
  assert(source('brush').includes('Ctrl+T') && source('brush').includes('Enter') && source('brush').includes('Esc'), `${locale}: transform apply/cancel`);
  assert(source('adjustments').includes('Ver.0.3.0') && source('adjustments').includes('27'), `${locale}: adjustment blend support`);
  assert(source('start').includes('Ver.0.3.0') && source('projects').includes('Ver.0.3.0'), `${locale}: update and save compatibility`);
  const overview = fs.readFileSync(path.join(docs, 'site', prefix, 'guide.md'), 'utf8');
  assert(overview.includes('Ver.0.3.0'), `${locale}: current overview`);
  assert(!/Ver\.0\.2\.1[^\n]*(?:Custom|自定义|사용자 지정|カスタム)/.test(overview), `${locale}: no stale preset overview`);
}
console.log('PASS: 0.3.0 guides in four languages: pressure/UV, transform/move/masks, key bindings, panels/VRAM, compatibility, overview and search. Static documentation checks, not app runtime QA.');
