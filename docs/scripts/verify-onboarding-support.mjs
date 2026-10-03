import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { articles } from '../.vitepress/theme/help-data.js';

const docs = path.resolve(import.meta.dirname, '..');
const root = path.dirname(docs);
const site = path.join(docs, 'site');
const dist = path.join(docs, '.vitepress/dist');
const base = process.env.DOCS_BASE || '/HarmoFlow/';
const read = (prefix, slug) => fs.readFileSync(path.join(site, prefix, slug + '.md'), 'utf8');
const html = (prefix, slug) => fs.readFileSync(path.join(dist, prefix, slug + '.html'), 'utf8');
const anchors = {
  'help/start': ['app-install', 'first-launch', 'update-backup', 'version-changelog'],
  'help/materials': ['material-downloads', 'material-download-retry', 'material-cache-uninstall'],
  'help/brush': ['flow-opacity', 'strict-uv-padding'],
  'help/assets': ['offline-materials'],
  'help/projects': ['autosave-location', 'gpu-recovery'],
  'help/troubleshooting': ['startup-checks', 'gpu-errors', 'diagnostic-info', 'report-template'],
  download: ['purchase-faq', 'faq-platform', 'faq-trial', 'faq-offline', 'faq-output-rights', 'faq-cc0-materials', 'faq-multiple-pcs', 'faq-team-license', 'faq-redistribution', 'faq-support'],
};
const multiPcPolicy = {
  '': '原則として1人につき1ライセンスです。同じ購入者本人が使う場合は、複数のPCで利用できます。',
  en: 'As a rule, each person needs one license. The same purchaser may use HarmoFlow on multiple PCs.',
  zh: '原则上，每人需要一份许可证。同一购买者本人可以在多台电脑上使用HarmoFlow。',
  ko: '원칙적으로 1인당 라이선스 하나가 필요합니다. 동일한 구매자 본인은 여러 PC에서 HarmoFlow를 사용할 수 있습니다.',
};
const teamLicensePolicy = {
  '': 'チームライセンスは現在検討中です。',
  en: 'Team licenses are currently under consideration.',
  zh: '团队许可证正在考虑中。',
  ko: '팀 라이선스는 현재 검토 중입니다.',
};
const manualUpdateHeadings = {
  '': '最新版を確認する', en: 'Check the latest release', zh: '查看最新版本', ko: '최신 버전 확인하기',
};
const unverifiedNoticeCopy = {
  '': ['更新のお知らせについて', 'このバージョンをスキップ', '更新確認ができなくても起動を妨げません'],
  en: ['About update notices', 'Skip this version', 'An unsuccessful update check does not prevent startup'],
  zh: ['关于更新提示', '跳过此版本', '更新检查失败不会阻止启动'],
  ko: ['업데이트 알림 안내', '이 버전 건너뛰기', '업데이트 확인 실패는 앱 실행을 막지 않습니다'],
};
const assetBrowserLabels = { '': 'アセットブラウザー', en: 'Asset Browser', zh: '资产浏览器', ko: '에셋 브라우저' };
const selectedTextureSet = { '': '現在選択中のテクスチャセット', en: 'currently selected texture set', zh: '当前选中的纹理集', ko: '현재 선택한 텍스처 세트' };
const obsoleteMaterialScope = { '': '最初に触れたパーツ', en: 'first part you touch', zh: '最先触及的部件', ko: '처음 닿은 파트' };
const obsoleteBrowserLabel = { '': '素材ブラウザ', en: 'material browser', zh: '材质浏览器', ko: '머티리얼 브라우저' };
const cc0Policy = {
  '': '付属のCC0アセットは商用利用でき、それらを使った作品も販売できます。',
  en: 'The bundled CC0 materials can be used commercially, including in works you sell.',
  zh: '附带的CC0素材可以用于商业用途，也可以用于制作并销售作品。',
  ko: '포함된 CC0 소재는 상업적으로 이용할 수 있으며, 이를 사용해 만든 작품도 판매할 수 있습니다.',
};
let links = 0;
for (const prefix of ['', 'en', 'zh', 'ko']) {
  const index = prefix ? JSON.parse(fs.readFileSync(path.join(docs, '.vitepress/theme/locales/help-' + prefix + '.json'), 'utf8')) : articles;
  for (const [slug, ids] of Object.entries(anchors)) {
    const source = read(prefix, slug), rendered = html(prefix, slug);
    for (const id of ids) {
      assert(source.includes(`{#${id}}`), `${prefix}/${slug}: source anchor ${id}`);
      assert(rendered.includes(`id="${id}"`), `${prefix}/${slug}: rendered anchor ${id}`);
    }
    if (slug.startsWith('help/')) {
      const text = index.find(a => a.slug === slug.slice(5))?.searchText;
      assert(text && text.length > 300, `${prefix}/${slug}: updated searchable content`);
    }
    const from = (prefix ? prefix + '/' : '') + slug + '.html';
    for (const match of rendered.matchAll(/\bhref="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), 'https://mametarogg.github.io' + base + from);
      if (url.origin !== 'https://mametarogg.github.io' || !url.hash) continue;
      assert(url.pathname.startsWith(base), `${from}: link must remain under Pages base`);
      let target = decodeURIComponent(url.pathname.slice(base.length));
      if (!target || target.endsWith('/')) target += 'index.html';
      const targetFile = path.join(dist, target);
      assert(fs.existsSync(targetFile), `${from}: missing local target ${match[1]}`);
      assert(fs.readFileSync(targetFile, 'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${from}: missing fragment ${match[1]}`);
      links++;
    }
  }
  for (const slug of ['workspace', 'brush', 'paths', 'materials', 'assets']) {
    const source = read(prefix, 'help/' + slug), rendered = html(prefix, 'help/' + slug);
    const searchText = index.find(article => article.slug === slug)?.searchText;
    for (const content of [source, rendered, searchText]) {
      assert(content.includes(assetBrowserLabels[prefix]), `${prefix}/${slug}: exact localized Asset Browser label`);
      assert(!content.includes(obsoleteBrowserLabel[prefix]), `${prefix}/${slug}: no obsolete browser label`);
      assert(!content.includes(obsoleteMaterialScope[prefix]), `${prefix}/${slug}: no stale first-touched-part target`);
      if (slug !== 'paths') assert(content.includes(selectedTextureSet[prefix]), `${prefix}/${slug}: selected texture-set material scope`);
    }
  }
  const start = read(prefix, 'help/start'), download = html(prefix, 'download');
  for (const term of ['EXE', 'full', 'trial', '.harmos', '.harmopackage', 'BOOTH']) assert(start.includes(term), `${prefix}: installer facts`);
  for (const flow of ['app-install', 'update-backup']) assert(start.includes(`<GuideFlow kind="${flow}" />`));
  assert(start.includes(manualUpdateHeadings[prefix]) && html(prefix, 'help/start').includes(manualUpdateHeadings[prefix]), `${prefix}: manual release check is documented and rendered`);
  const startIndex = index.find(article => article.slug === 'start')?.searchText;
  for (const phrase of unverifiedNoticeCopy[prefix]) {
    for (const content of [start, html(prefix, 'help/start'), startIndex, read(prefix, 'download'), download]) {
      assert(!content.includes(phrase), `${prefix}: no unverified shipping-notice instruction: ${phrase}`);
    }
  }

  assert(download.includes(base + (prefix ? prefix + '/' : '') + 'help/start.html#app-install'), `${prefix}: localized setup navigation`);
  assert(download.includes('class="prose purchase-faq"'), `${prefix}: purchase FAQ is rendered`);
  assert(read(prefix, 'download').includes(multiPcPolicy[prefix]), `${prefix}: confirmed multiple-PC policy in source`);
  assert(download.includes(multiPcPolicy[prefix]), `${prefix}: confirmed multiple-PC policy is rendered`);
  const teamFaq = read(prefix, 'download').split('{#faq-team-license}')[1]?.split('\n### ')[0];
  assert(teamFaq?.includes(teamLicensePolicy[prefix]), `${prefix}: confirmed team-license policy in source`);
  for (const id of ['faq-team-license', 'faq-support']) {
    const sourceFaq = read(prefix, 'download').split(`{#${id}}`)[1]?.split('\n### ')[0];
    const renderedFaq = download.split(`id="${id}"`)[1]?.split('<h3')[0];
    for (const [kind, faq] of [['source', sourceFaq], ['rendered', renderedFaq]]) {
      assert(faq?.includes('https://mametarovv.booth.pm/') && faq.includes('「メッセージ」'), `${prefix}/${id}: ${kind} uses the shop messaging label`);
      assert(!/(?:のContact|的Contact|의 Contact|via Contact|or Contact on)/.test(faq), `${prefix}/${id}: ${kind} must not use the obsolete shop Contact label`);
    }
  }
  assert(download.includes(teamLicensePolicy[prefix]), `${prefix}: confirmed team-license policy is rendered`);
  const cc0Faq = read(prefix, 'download').split('{#faq-cc0-materials}')[1]?.split('\n### ')[0];
  assert(cc0Faq?.includes(cc0Policy[prefix]), `${prefix}: confirmed CC0 commercial-use policy in source`);
  assert(cc0Faq.includes('https://creativecommons.org/publicdomain/zero/1.0/') && cc0Faq.includes('./terms.md'), `${prefix}: official CC0 and separate software terms links`);
  assert(download.includes(cc0Policy[prefix]), `${prefix}: confirmed CC0 commercial-use policy is rendered`);
  assert(read(prefix, 'help/troubleshooting').includes('5,000'), `${prefix}: console retention guidance`);
  assert(read(prefix, 'help/brush').includes('50%') && read(prefix, 'help/brush').includes('10%'), `${prefix}: practical flow/opacity example`);
}
// Keep version updates distinct from choosing the full or trial edition.
const updateFlowCopy = '新しいバージョンのインストーラーを実行';
assert(fs.readFileSync(path.join(docs, '.vitepress/theme/GuideFlow.vue'), 'utf8').includes(updateFlowCopy));
for (const slug of ['help/start', 'guide']) {
  assert(html('', slug).includes(updateFlowCopy), `${slug}: clear version-update flow is rendered`);
  assert(read('', slug).includes('現在使っている種類（製品版／体験版）'), `${slug}: full/trial choice remains explicit`);
}
for (const slug of ['help/start', 'help/troubleshooting', 'guide']) {
  assert(!read('', slug).includes('同じ版'), `${slug}: no ambiguous same-edition wording`);
  assert(!html('', slug).includes('同じ版'), `${slug}: no ambiguous same-edition wording is rendered`);
}
for (const slug of ['start', 'troubleshooting']) {
  assert(!articles.find(article => article.slug === slug).searchText.includes('同じ版'), `${slug}: search data matches clear edition wording`);
}
for (const phrase of unverifiedNoticeCopy['']) {
  assert(!read('', 'guide').includes(phrase) && !html('', 'guide').includes(phrase), 'Japanese full guide has no unverified notice instructions');
}
for (const slug of ['help/brush', 'guide']) {
  for (const content of [read('', slug), html('', slug)]) {
    assert(content.includes('現在のUVにベイクされます。') && !content.includes('現在のUVへ'), `${slug}: readable Japanese UV wording`);
  }
}
assert(articles.find(article => article.slug === 'brush').searchText.includes('現在のUVにベイクされます。'), 'Brush search index uses corrected UV wording');
// The purchase FAQ summarizes the existing agreement; it must not silently change it.
const sha256 = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
assert.equal(sha256(path.join(root, 'LICENSE.txt')), '50b8401d344dce364afd5af1545641d00436374ce57abd173e40f9ebd914bb0b');
const termsHashes = {"": "8b35b9448906c7d4963e2a4b54fc0a38358c5f8e61b874d40fdd328aeda91d2a", "en": "6329832869febc6fe513d930e82e54f4f5e49cb295f6a6aface69ae6774235fd", "zh": "d6b530736471b2aaf142c3a88a6b05d4ec0064b6ab7ddf9c6d7cefe18de89938", "ko": "4585eaa9d2136af274ed9ae82c84fcbc9d63031641a255031fa28467ab66d7c5"};
for (const [prefix, hash] of Object.entries(termsHashes)) assert.equal(sha256(path.join(site, prefix, 'terms.md')), hash, `${prefix}: unchanged existing EULA text`);
for (const prefix of ['', 'en', 'zh', 'ko']) {
  for (const slug of Object.keys(anchors)) {
    const text = read(prefix, slug);
    for (const disallowed of ['HarmoFlow-Dev', 'src/core/', 'src/ui/', 'update-manifest.md', 'E:\\BOOTH', '643f797fa8104c8dd46b8269a1e06f65']) assert(!text.includes(disallowed), `${prefix}/${slug}: private source detail`);
  }
}
console.log(`PASS: four-language onboarding, download/cache, brush, recovery and purchase FAQ anchors, ${links} exact local fragment links, search coverage, unchanged EULA, and no private source details`);
