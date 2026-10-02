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
const cc0Policy = {
  '': '付属のCC0素材は商用利用でき、それらを使った作品も販売できます。',
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
  const start = read(prefix, 'help/start'), download = html(prefix, 'download');
  for (const term of ['EXE', 'full', 'trial', '.harmos', '.harmopackage', 'BOOTH']) assert(start.includes(term), `${prefix}: installer facts`);
  for (const flow of ['app-install', 'update-backup']) assert(start.includes(`<GuideFlow kind="${flow}" />`));
  assert(download.includes(base + (prefix ? prefix + '/' : '') + 'help/start.html#app-install'), `${prefix}: localized setup navigation`);
  assert(download.includes('class="prose purchase-faq"'), `${prefix}: purchase FAQ is rendered`);
  assert(read(prefix, 'download').includes(multiPcPolicy[prefix]), `${prefix}: confirmed multiple-PC policy in source`);
  assert(download.includes(multiPcPolicy[prefix]), `${prefix}: confirmed multiple-PC policy is rendered`);
  const teamFaq = read(prefix, 'download').split('{#faq-team-license}')[1]?.split('\n### ')[0];
  assert(teamFaq?.includes(teamLicensePolicy[prefix]), `${prefix}: confirmed team-license policy in source`);
  assert(teamFaq.includes('https://mametarovv.booth.pm/') && teamFaq.includes('Contact'), `${prefix}: team consultation uses the existing shop contact`);
  assert(download.includes(teamLicensePolicy[prefix]), `${prefix}: confirmed team-license policy is rendered`);
  const cc0Faq = read(prefix, 'download').split('{#faq-cc0-materials}')[1]?.split('\n### ')[0];
  assert(cc0Faq?.includes(cc0Policy[prefix]), `${prefix}: confirmed CC0 commercial-use policy in source`);
  assert(cc0Faq.includes('https://creativecommons.org/publicdomain/zero/1.0/') && cc0Faq.includes('./terms.md'), `${prefix}: official CC0 and separate software terms links`);
  assert(download.includes(cc0Policy[prefix]), `${prefix}: confirmed CC0 commercial-use policy is rendered`);
  assert(read(prefix, 'help/troubleshooting').includes('5,000'), `${prefix}: console retention guidance`);
  assert(read(prefix, 'help/brush').includes('50%') && read(prefix, 'help/brush').includes('10%'), `${prefix}: practical flow/opacity example`);
}
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
