import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { articles } from '../.vitepress/theme/help-data.js';

const docs = path.resolve(import.meta.dirname, '..');
const labels = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'shortcut-reference-labels.json'), 'utf8'));
const plain = text => text.replace(/<[^>]+>/g, '').replace(/[|*`]/g, '').replace(/\s+/g, '').normalize('NFC');
assert.equal(labels.length, 81, 'complete action reference');
const anchors = {
  workspace: ['command-search'],
  brush: ['brush-material-channels', 'strict-uv-padding', 'blend-controls'],
  materials: ['normal-map-only', 'material-preset-data', 'material-paint-target', 'material-resume'],
  layers: ['merge-layers-down'],
  stamps: ['stamp-relief-only', 'stamp-gestures', 'stamp-image-color'],
  settings: ['panel-rail-operations', 'history-navigation', 'performance-panel', 'vram-presets', 'vram-budget', 'display-compression', 'lua-execution-undo'],
  export: ['psd-editable-masks'],
};
const caveats = {
  ja: ['未割り当てになる場合があります', '修飾キーを先に離すと取り消します', 'Pivot 360モードでは移動できません', 'Windowsのごみ箱', 'シーンのUndoでは戻せません'],
  en: ['can leave Close Path unassigned', 'releasing the modifiers first cancels', 'Pivot 360', 'Windows Recycle Bin', 'scene Undo'],
  zh: ['可能变为未绑定', '先松开修饰键', 'Pivot 360', 'Windows回收站', '场景撤销'],
  ko: ['미할당 상태가 될 수 있습니다', '보조 키를 먼저 놓으면 취소됩니다', 'Pivot 360', 'Windows 휴지통', '씬의 Undo로 복원할 수 없습니다'],
};
let checked = 0;
for (const locale of ['ja', 'en', 'zh', 'ko']) {
  const prefix = locale === 'ja' ? '' : locale;
  const source = article => fs.readFileSync(path.join(docs, 'site', prefix, 'help', article + '.md'), 'utf8');
  const rendered = article => fs.readFileSync(path.join(docs, '.vitepress/dist', prefix, 'help', article + '.html'), 'utf8');
  const index = locale === 'ja' ? articles : JSON.parse(fs.readFileSync(path.join(docs, '.vitepress/theme/locales', `help-${locale}.json`), 'utf8'));
  const shortcut = source('shortcuts');
  for (const weight of ['Regular', 'Bold']) assert(rendered('shortcuts').includes(`LINESeedJP-${weight}.woff2`), `${locale}: guide font preloaded`);
  for (const action of labels) {
    const rows = shortcut.split('\n').filter(line => line.startsWith('| ' + action.labels[locale] + ' |'));
    assert(rows.length, `${locale}: missing action ${action.labels[locale]}`);
    for (const key of action.keys) assert(rows.some(row => plain(row).includes(plain(key))), `${locale}: wrong binding for ${action.labels[locale]}: ${key}`);
    assert(plain(rendered('shortcuts')).includes(plain(action.labels[locale])), `${locale}: rendered action missing`);
    assert(plain(index.find(item => item.slug === 'shortcuts').searchText).includes(plain(action.labels[locale])), `${locale}: action absent from search`);
    checked++;
  }
  for (const term of caveats[locale]) assert(plain(shortcut).includes(plain(term)), `${locale}: missing shortcut condition ${term}`);
  assert(shortcut.includes('width="1420" height="876"'), `${locale}: supplied key-configuration image reserves its exact aspect ratio`);
  for (const [article, ids] of Object.entries(anchors)) {
    const html = rendered(article), markdown = source(article), search = index.find(item => item.slug === article).searchText;
    for (const id of ids) {
      assert(markdown.includes(`{#${id}}`) && html.includes(`id="${id}"`), `${locale}/${article}: missing guide anchor ${id}`);
      const heading = markdown.split('\n').find(line => line.includes(`{#${id}}`)).replace(/^#+\s*/, '').replace(/\s*\{#[^}]+\}/, '');
      assert(plain(search).includes(plain(heading)), `${locale}/${article}: new section missing from search`);
      checked++;
    }
  }
  const workspaceRows = source('workspace').split('\n').filter(line => /^\| \[.+\]\(\.\/.*\) \|/.test(line));
  assert.equal(workspaceRows.length, 23, `${locale}: complete Window panel overview`);
  assert(new Set(index.map(item => item.category)).size === 5, `${locale}: no near-duplicate help categories`);
}
const css = fs.readFileSync(path.join(docs, '.vitepress/theme/custom.css'), 'utf8');
assert(css.includes('"LINE Seed JP"') && !css.includes('fonts.googleapis.com'), 'local brand font without an external font request');
const fonts = fs.readFileSync(path.join(docs, '.vitepress/theme/release-fonts.css'), 'utf8');
assert.equal((fonts.match(/font-display:\s*optional/g) || []).length, 2, 'both weights avoid a late font swap moving guide anchors');
assert(fs.existsSync(path.join(docs, 'site/public/fonts/line-seed-jp/OFL.txt')), 'font license is distributed');
console.log(`PASS: ${checked} localized action/section checks, all 81 actions and 23 Window panels, conditional gestures, reserved screenshot size, category consistency, and local licensed typography (static documentation checks).`);
