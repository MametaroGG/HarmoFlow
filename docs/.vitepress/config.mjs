import { defineConfig } from "vitepress";
const base = process.env.DOCS_BASE || "/HarmoFlow/";
export default defineConfig({
  lang: "ja-JP",
  title: "HarmoFlow",
  description: "NPR・PBRの両方に対応。3Dモデルに直接描画できる、Windows専用テクスチャ・マテリアル制作ソフト。",
  base,
  locales: {
    root: { label: "日本語", lang: "ja-JP" },
    en: { label: "English", lang: "en", description: "Windows 3D texture and material painting software with NPR and PBR support." },
    zh: { label: "简体中文", lang: "zh-CN", description: "支持 NPR 和 PBR 的 Windows 3D 纹理与材质绘制软件。" },
    ko: { label: "한국어", lang: "ko-KR", description: "NPR과 PBR을 지원하는 Windows용 3D 텍스처·머티리얼 페인팅 소프트웨어." },
  },
  transformHead({ pageData }) {
    const relative = pageData.relativePath.replace(/^(en|zh|ko)\//, "").replace(/\.md$/, ".html");
    if (relative === "404.html") return [];
    const route = relative === "index.html" ? "" : relative;
    return [["ja-JP", ""], ["en", "en/"], ["zh-CN", "zh/"], ["ko-KR", "ko/"]].map(([lang, prefix]) =>
      ["link", { rel: "alternate", hreflang: lang, href: new URL(base + prefix + route, "https://mametarogg.github.io").href }]);
  },
  srcDir: "site",
  // Downloadable SDK Markdown is an asset, not an additional documentation route.
  srcExclude: ["public/**"],
  appearance: false,
  cleanUrls: false,
  head: [["link", { rel: "icon", href: `${base}favicon.svg` }]],
  markdown: { headers: { level: [2, 3] } },
  vite: { server: { host: "0.0.0.0" } },
  themeConfig: { outline: [2, 3] },
});
