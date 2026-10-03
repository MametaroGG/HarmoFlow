import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { articles } from "../.vitepress/theme/help-data.js";
const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, ".vitepress/dist");
const files = fs
  .readdirSync(dist, { recursive: true })
  .filter((f) => fs.statSync(path.join(dist, f)).isFile());
const expected = new Set([
  "index.html",
  "help.html",
  "guide.html",
  "download.html",
  "terms.html",
  "updates.html",
  "404.html",
  ...articles.map((a) => `help/${a.slug}.html`),
]);
const rootPages = [...expected].filter(f => f !== "404.html");
for (const locale of ["en", "zh", "ko"]) for (const file of rootPages) expected.add(locale + "/" + file);
const pages = files.filter((f) => f.endsWith(".html"));
assert.deepEqual(new Set(pages), expected, "Unexpected page in public output");
assert.equal(articles.length, 22);
assert.equal(new Set(articles.map((a) => a.slug)).size, 22);
for (const a of articles) {
  assert(a.searchText.length > 30, `Missing full text for ${a.slug}`);
  assert(fs.existsSync(path.join(root, "site/help", a.slug + ".md")));
}
const guide = fs.readFileSync(path.join(dist, "guide.html"), "utf8");
for (const article of articles)
  assert(
    guide.includes(`id="${article.slug}"`),
    `Legacy anchor missing: ${article.slug}`,
  );
// Emphasis adjacent to CJK punctuation must render, not leak Markdown markers.
for (const file of pages) {
  const page = fs.readFileSync(path.join(dist, file), "utf8");
  const prose = page.replace(/<(script|style|pre|code)\b[^>]*>[\s\S]*?<\/\1>/gi, "").replace(/<[^>]*>/g, "");
  assert(!prose.includes("**"), `Unrendered bold Markdown in ${file}`);
}
// Standardize authored Japanese asset terminology while retaining quoted terms.
for (const file of pages.filter(file => !/^(en|zh|ko)\//.test(file) && file !== 'terms.html')) {
  let prose = fs.readFileSync(path.join(dist, file), 'utf8').replace(/<(script|style|pre|code)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<[^>]*>/g, '');
  // Preserve the developer-supplied 0.1.1 benchmark condition exactly.
  if (file === 'updates.html') prose = prose.replaceAll('不透明な素材1000レイヤー', '');
  assert(!prose.includes('素材'), `Japanese asset terminology not standardized in ${file}`);
}
assert(articles.every(article => ![article.title, article.category, article.description, article.searchText].some(text => text.includes('素材'))), 'Japanese search uses asset terminology');
for (const file of ['help/assets.html', 'guide.html']) {
  const page = fs.readFileSync(path.join(dist, file), 'utf8');
  for (const id of ['素材を検索・絞り込む', '素材を取り込んて\u3099使う']) assert(page.includes(`id="${id}"`), `${file}: retain old Japanese heading anchor ${id}`);
}
const emphasis = {
  "help/start.html": "現在使っている種類（製品版／体験版）",
  "guide.html": "現在使っている種類（製品版／体験版）",
  "zh/help/start.html": "同一版本类型（正式版／试用版）",
  "ko/help/start.html": "같은 판(정식판／체험판)",
  "ko/help/adjustments.html": "Gradient Map(그라디언트 맵)",
  "ko/help/plugin-development.html": "<code>my_first_panel.lua</code>",
};
for (const [file, text] of Object.entries(emphasis)) {
  assert(fs.readFileSync(path.join(dist, file), "utf8").includes(`<strong>${text}</strong>`), `Expected semantic emphasis in ${file}`);
}
const prohibited = [
  "HF_INTERNAL_PUBLICATION_SENTINEL_2026",
  "development-plan.md",
  "update-manifest.md",
  "performance-audit.md",
];
for (const file of files.filter((f) => /\.(html|js|json|css)$/.test(f))) {
  const text = fs.readFileSync(path.join(dist, file), "utf8");
  for (const marker of prohibited)
    assert(
      !text.includes(marker),
      `Private marker ${marker} leaked into ${file}`,
    );
}
console.log(
  `PASS: ${pages.length} public HTML pages, 22 article anchors, public-only search data and no private markers`,
);
