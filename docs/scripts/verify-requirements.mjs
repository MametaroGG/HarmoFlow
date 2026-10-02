import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const docs = path.resolve(import.meta.dirname, '..');
const theme = path.join(docs, '.vitepress/theme');
const component = fs.readFileSync(path.join(theme, 'SystemRequirements.vue'), 'utf8');
const literalKeys = [...component.matchAll(/\bt\('([^']+)'\)/g)].map(match => match[1]);
const rows = [...component.matchAll(/^  \['([^']+)', '([^']+)', '([^']+)'\],$/gm)].map(match => match.slice(1));
assert.equal(rows.length, 10, 'Six specification rows and four desktop hardware example rows are required');
const identity = new Set(['OS', 'CPU', 'GPU', 'Core i3-10100', 'Core i5-12400', 'Ryzen 3 3100', 'Ryzen 5 5600']);
const keys = [...new Set([...literalKeys, ...rows.flat()])];
const retired = 'CPU・メモリ・GPUの最低スペックと推奨スペックは、検証結果がまとまり次第掲載します。';
for (const locale of ['ja', 'en', 'zh', 'ko']) {
  const dictionary = locale === 'ja' ? {} : JSON.parse(fs.readFileSync(path.join(theme, 'locales', `${locale}.json`), 'utf8'));
  const html = fs.readFileSync(path.join(docs, '.vitepress/dist', locale === 'ja' ? '' : locale, 'download.html'), 'utf8');
  for (const key of keys) {
    if (locale !== 'ja' && !identity.has(key)) assert(dictionary[key], `${locale}: missing requirements translation for ${key}`);
    assert(html.includes(dictionary[key] ?? key), `${locale}: missing rendered requirements copy for ${key}`);
  }
  assert.equal((html.match(/class="requirements-table"/g) || []).length, 2, `${locale}: comparison and example tables`);
  assert.equal((html.match(/scope="row"/g) || []).length, 10, `${locale}: semantic row headings`);
  assert(!html.includes(retired) && !Object.hasOwn(dictionary, retired), `${locale}: obsolete placeholder`);
  for (const expected of ['Vulkan 1.2', '1920×1080', '1024px', '2048px', '4K', '4GB', '8GB', '12GB', '10GB', '20GB', '16GB', '32GB']) {
    assert(html.includes(expected), `${locale}: source quantity ${expected}`);
  }
}
const css = fs.readFileSync(path.join(theme, 'custom.css'), 'utf8');
assert(css.includes('.requirements-table { width:100%; table-layout:fixed;'), 'Tables must fit the available viewport');
assert(css.includes('overflow-wrap:anywhere;'), 'Long hardware labels must wrap on narrow screens');
console.log('PASS: provisional system requirements, exact hardware/VRAM variants, caveats and complete translations in all four built download pages');
