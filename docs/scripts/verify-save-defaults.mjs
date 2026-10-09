import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { articles } from '../.vitepress/theme/help-data.js';
const docs = path.resolve(import.meta.dirname, '..');
const required = {
  ja: { projects: ['現在の作業ライブラリ内のアセット全体', '同じ相対パス', '確認なしで上書き', '保存先だけにあるファイルは削除しません', 'バックアップ', '新しい空のプロジェクト', '通常の別名保存・増分保存'], settings: ['公開版同梱の既定設定は「カスタム」', '仮想テクスチャキャッシュがオン', 'ユーザー設定', '優先', '組込み既定は「バランス」'], obsolete: ['初期設定は「バランス」です', '「非編集中のテクスチャセットを省メモリ化」は初期状態ではオフ'] },
  en: { projects: ['all assets in the current working library', 'same relative path', 'overwritten without confirmation', 'does not delete files found only at the destination', 'Back up', 'new, empty project folder', 'Ordinary Save Scene As and Incremental Save'], settings: ['defaults included with the Ver.0.2.1 release use Custom', 'virtual texture caching enabled', 'Saved user settings take priority', 'Balanced is the built-in fallback'], obsolete: ['Balanced is the default preset', 'This option is off by default'] },
  zh: { projects: ['当前工作库中的全部资产', '相同相对路径', '不经确认直接覆盖', '不会删除仅存在于目标位置的文件', '先备份', '新建的空项目文件夹', '常规“场景另存为”和“递增保存”'], settings: ['公开版本随附的默认设置使用“自定义”', '和虚拟纹理缓存', '用户保存设置优先', '内置回退预设为“均衡”'], obsolete: ['默认预设是“均衡”', '“Reduce memory for non-edited texture sets”默认关闭'] },
  ko: { projects: ['현재 작업 라이브러리의 모든 에셋', '같은 상대 경로', '확인 없이 덮어쓰므로', '대상 위치에만 있는 파일은 삭제하지 않습니다', '백업', '새 빈 프로젝트 폴더', '일반적인 “씬 다른 이름으로 저장”과 “증분 저장”'], settings: ['공개 버전에 포함된 기본 설정은 “사용자 지정”', '가상 텍스처 캐시가 켜져', '저장된 사용자 설정', '우선 적용', '내장 대체 프리셋은 “균형”'], obsolete: ['기본 프리셋은 “균형”입니다', '“Reduce memory for non-edited texture sets”는 기본적으로 꺼져'] },
};
for (const [locale, checks] of Object.entries(required)) {
  const prefix = locale === 'ja' ? '' : locale + '/';
  const index = locale === 'ja' ? articles : JSON.parse(fs.readFileSync(path.join(docs, `.vitepress/theme/locales/help-${locale}.json`), 'utf8'));
  const guide = fs.readFileSync(path.join(docs, 'site', prefix, 'guide.md'), 'utf8');
  const guideHtml = fs.readFileSync(path.join(docs, '.vitepress/dist', prefix, 'guide.html'), 'utf8');
  for (const slug of ['projects', 'settings']) {
    const source = fs.readFileSync(path.join(docs, 'site', prefix, `help/${slug}.md`), 'utf8');
    const html = fs.readFileSync(path.join(docs, '.vitepress/dist', prefix, `help/${slug}.html`), 'utf8');
    const search = index.find(item => item.slug === slug).searchText;
    for (const text of checks[slug]) {
      for (const [name, content] of Object.entries({ source, html, search, guide, guideHtml })) assert(content.includes(text), `${locale}/${slug} ${name}: ${text}`);
    }
    for (const text of checks.obsolete) for (const content of [source, html, search, guide, guideHtml]) assert(!content.includes(text), `${locale}: obsolete default ${text}`);
  }
}
console.log('Verified save collision warnings and bundled VRAM defaults across four languages, guides, built pages, and search indexes.');
