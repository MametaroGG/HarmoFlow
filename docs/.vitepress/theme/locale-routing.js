export const localeFromPath = (path = "") => /^(en|zh|ko)\//.exec(path.replace(/^\//, ""))?.[1] || "ja";
export const localizedPath = (path, locale) => {
  const isPage = path === "/" || path.startsWith("/#") || /^\/(?:help(?:\/[^/#.]+)?|guide|download|terms|updates)$/.test(path);
  const target = /^\/(?:help(?:\/[^/#.]+)?|guide|download|terms|updates)$/.test(path) ? path + ".html" : path;
  return isPage && locale !== "ja" ? "/" + locale + target : target;
};
export const languagePath = (relativePath = "index.md", locale = "ja") => {
  const relative = relativePath.replace(/^(en|zh|ko)\//, "").replace(/\.md$/, ".html");
  const target = relative === "index.html" || relative === "404.html" ? "" : relative;
  return "/" + (locale === "ja" ? "" : locale + "/") + target;
};
