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
  "404.html",
  ...articles.map((a) => `help/${a.slug}.html`),
]);
const rootPages = [...expected].filter(f => f !== "404.html");
for (const locale of ["en", "zh", "ko"]) for (const file of rootPages) expected.add(locale + "/" + file);
const pages = files.filter((f) => f.endsWith(".html"));
assert.deepEqual(new Set(pages), expected, "Unexpected page in public output");
assert.equal(articles.length, 19);
assert.equal(new Set(articles.map((a) => a.slug)).size, 19);
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
  `PASS: ${pages.length} public HTML pages, 19 legacy anchors, public-only search data and no private markers`,
);
