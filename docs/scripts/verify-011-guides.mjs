import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { articles as jaArticles } from '../.vitepress/theme/help-data.js';

const docs = path.resolve(import.meta.dirname, '..');
const dist = path.join(docs, '.vitepress/dist');
const base = process.env.DOCS_BASE || '/HarmoFlow/';
const contexts = {
  ja: { pie: 'パイメニュー', update: 'アップデート自動通知', buttons: ['アップデートを入手', '後で', 'この更新を通知しない'], release: '右ボタンを離すと', install: 'インストーラーのダウンロードやインストールは自分で行います' },
  en: { pie: 'pie menu', update: 'Automatic update notifications', buttons: ['Get update', 'Later', 'Skip this update'], release: 'Release the right button', install: 'you download and run the installer yourself' },
  zh: { pie: '饼状菜单', update: '自动更新通知', buttons: ['Get update', '稍后', 'Skip this update'], release: '松开右键', install: '安装程序需要自行下载并运行' },
  ko: { pie: '파이 메뉴', update: '업데이트 자동 알림', buttons: ['Get update', '나중에', 'Skip this update'], release: '오른쪽 버튼을 놓으면', install: '설치 프로그램은 직접 다운로드하고 실행합니다' },
};
for (const [locale, words] of Object.entries(contexts)) {
  const prefix = locale === 'ja' ? '' : locale + '/';
  const read = route => fs.readFileSync(path.join(dist, prefix + route), 'utf8');
  const text = html => html.replace(/<[^>]*>/g, '').toLocaleLowerCase();
  const articles = locale === 'ja' ? jaArticles : JSON.parse(fs.readFileSync(path.join(docs, '.vitepress/theme/locales/help-' + locale + '.json'), 'utf8'));
  const home = read('index.html');
  assert.equal((home.match(/class="update-feature-card"/g) || []).length, 2, locale + ': only pie menu and notification added to home features');
  assert(home.includes(`href="${base}${prefix}help/workspace.html#pie-menu"`), locale + ': home links to pie steps');
  assert(home.includes(`href="${base}${prefix}help/start.html#automatic-update-notifications"`), locale + ': home links to notifications');
  assert(!home.includes('recompositing-performance') && !home.includes('922ms'), locale + ': timing comparison remains off the homepage');
  const workspace = read('help/workspace.html');
  assert(workspace.includes('id="pie-menu"'), locale + ': stable pie anchor');
  for (const marker of [words.pie, words.release, 'Esc', 'UV', 'Ctrl', 'Shift', 'Alt']) {
    assert(text(workspace).includes(marker.toLocaleLowerCase()), locale + ': pie interaction context ' + marker);
  }
  assert(text(read('help/shortcuts.html')).includes(words.pie.toLocaleLowerCase()), locale + ': pie gesture is in shortcut reference');
  const start = read('help/start.html');
  assert(start.includes('id="automatic-update-notifications"'), locale + ': stable notification anchor');
  for (const marker of [...words.buttons, words.install, 'BOOTH', 'Ver.0.1.1']) {
    assert(text(start).includes(marker.toLocaleLowerCase()), locale + ': actual notification controls and manual installation ' + marker);
  }
  assert(read('download.html').includes('href="./help/start.html#automatic-update-notifications"'), locale + ': download FAQ explains notifications');
  const layers = read('help/layers.html');
  assert(layers.includes('id="recompositing-performance"') && /href="(?:\.\/)?\.\.\/updates\.html#release-v0-1-1"/.test(layers), locale + ': layer guide links to scoped measurements');
  for (const [slug, marker] of [['workspace', words.pie], ['shortcuts', words.pie], ['start', words.update], ['layers', 'Ver.0.1.1']]) {
    assert(articles.find(item => item.slug === slug).searchText.toLocaleLowerCase().includes(marker.toLocaleLowerCase()), locale + ': searchable new guidance for ' + slug);
  }
  const guide = read('guide.html');
  if (locale === 'ja') {
    for (const anchor of ['pie-menu', 'automatic-update-notifications', 'recompositing-performance']) assert(guide.includes(`id="${anchor}"`), 'Full Japanese guide includes ' + anchor);
  } else {
    assert(text(guide).includes(words.pie.toLocaleLowerCase()) && text(guide).includes(words.update.toLocaleLowerCase()), locale + ': guide overview includes new guidance');
  }
}
console.log('PASS: four-language 0.1.1 home features, pie gestures and context, actual notification labels and manual installation, layer performance guidance, full-guide/index coverage (static; not app runtime QA).');
