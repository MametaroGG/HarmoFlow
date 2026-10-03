import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { articles } from '../.vitepress/theme/help-data.js';

const docs = path.resolve(import.meta.dirname, '..');
const base = process.env.DOCS_BASE || '/HarmoFlow/';
const cases = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'documentation-review-cases.json'), 'utf8'));
const indexes = { ja: articles };
for (const locale of ['en', 'zh', 'ko']) indexes[locale] = JSON.parse(fs.readFileSync(path.join(docs, '.vitepress/theme/locales', `help-${locale}.json`), 'utf8'));
const plain = value => value
  .replace(/^---\n[\s\S]*?\n---\n/, '')
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/<[^>]*>/g, '')
  .replace(/\{#[^}]+\}/g, '')
  .replace(/&(?:amp|quot|lt|gt|#39|#x27|nbsp);/g, entity => ({ '&amp;': '&', '&quot;': '"', '&lt;': '<', '&gt;': '>', '&#39;': "'", '&#x27;': "'", '&nbsp;': ' ' })[entity])
  .replace(/^\s*\d+\.\s+/gm, '')
  .replace(/[|#*`]/g, '')
  .replace(/\s+/g, '').normalize('NFC');
let assertions = 0;
for (const check of cases) {
  const prefix = check.locale === 'ja' ? '' : check.locale;
  const source = fs.readFileSync(path.join(docs, 'site', prefix, 'help', check.article + '.md'), 'utf8');
  const rendered = fs.readFileSync(path.join(docs, '.vitepress/dist', prefix, 'help', check.article + '.html'), 'utf8');
  const search = indexes[check.locale].find(article => article.slug === check.article)?.searchText;
  assert(search, `${check.locale}/${check.article}: missing search entry`);
  for (const [kind, raw] of [['source', source], ['rendered', rendered], ['search', search]]) {
    const content = plain(raw);
    for (const expected of check.allOf || []) {
      if (expected.startsWith('./')) {
        const renderedUrl = base + (prefix ? prefix + '/' : '') + 'help/' + expected.slice(2).replace('.md', '.html');
        if (kind === 'rendered') {
          const from = 'https://mametarogg.github.io' + base + (prefix ? prefix + '/' : '') + 'help/' + check.article + '.html';
          const targets = [...raw.matchAll(/href="([^"]+)"/g)].map(match => new URL(match[1].replaceAll('&amp;', '&'), from).href);
          assert(targets.includes('https://mametarogg.github.io' + renderedUrl), `${check.id}: missing rendered link ${renderedUrl}`);
        }
        else assert(content.includes(plain(expected)), `${check.id} ${kind}: missing link ${expected}`);
      } else if (/^\{#[^}]+\}$/.test(expected)) {
        if (kind === 'search') continue;
        if (kind === 'source') assert(raw.includes(expected), `${check.id}: missing source anchor ${expected}`);
        if (kind === 'rendered') assert(raw.includes(`id="${expected.slice(2, -1)}"`), `${check.id}: missing rendered anchor ${expected}`);
      } else assert(content.includes(plain(expected)), `${check.id} ${check.locale}/${check.article} ${kind}: missing ${expected}`);
      assertions++;
    }
    for (const obsolete of check.noneOf || []) {
      // Table-cell labels may still be valid words in explanatory captions.
      if (obsolete.includes('|')) {
        if (kind === 'search') continue;
        if (kind === 'source') assert(!raw.includes(obsolete), `${check.id} ${check.locale}/${check.article}: obsolete table label ${obsolete}`);
        if (kind === 'rendered') {
          const cells = [...raw.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(match => plain(match[1]));
          assert(!cells.includes(plain(obsolete)), `${check.id} ${check.locale}/${check.article}: obsolete rendered table label ${obsolete}`);
        }
      } else {
        // Shared media captions may use a conceptual synonym; check authored text.
        if (kind === 'rendered') continue;
        assert(!content.includes(plain(obsolete)), `${check.id} ${check.locale}/${check.article} ${kind}: obsolete ${obsolete}`);
      }
      assertions++;
    }
  }
  if (check.before && check.after) {
    const content = plain(source), before = content.indexOf(plain(check.before)), after = content.indexOf(plain(check.after));
    assert(before !== -1 && after > before, `${check.id} ${check.locale}/${check.article}: caution must precede the action`);
    assertions++;
  }
}
// Shared-copy corrections must preserve the provisional hardware caveat.
const shared = {
  ja: ['Windows専用 · Vulkan 1.2対応GPUが必要', '表の製品名は、CPUとGPUそれぞれの性能の目安です。', '光の強さに比例した値'],
  en: ['Windows only · Requires a Vulkan 1.2-compatible GPU', 'The listed CPUs and GPUs are performance examples.', 'Color values proportional to light intensity'],
  zh: ['仅限Windows · 需要支持Vulkan 1.2的GPU', '表中的CPU和GPU型号仅作为性能参考。', '用与光强成比例的数值'],
  ko: ['Windows 전용 · Vulkan 1.2 지원 GPU 필요', '표의 CPU와 GPU 제품명은 성능을 비교하기 위한 예시입니다.', '빛의 세기에 비례하는 값'],
};
for (const [locale, [status, hardware, linear]] of Object.entries(shared)) {
  const prefix = locale === 'ja' ? '' : locale;
  const read = file => fs.readFileSync(path.join(docs, '.vitepress/dist', prefix, file), 'utf8');
  assert(read('index.html').includes(status), `${locale}: accurate release-status wording`);
  assert(read('download.html').includes(hardware), `${locale}: examples do not imply a vendor restriction`);
  assert(read('help/glossary.html').includes(linear), `${locale}: linear-light glossary definition`);
  assert(read('help/uv.html').includes('id="uv-path-editing"'), `${locale}: distinct UV-path instructions`);
}
console.log(`PASS: ${cases.length} localized documentation-review cases and ${assertions} source/rendered/search assertions; shared status, hardware wording, glossary and UV-path guidance`);
