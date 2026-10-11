import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { articles } from '../.vitepress/theme/help-data.js';
const docs = path.resolve(import.meta.dirname, '..');
const required = {
  ja: { projects: ['現在の作業ライブラリ内のアセット全体', '同じ相対パス', '確認なしで上書き', '保存先だけにあるファイルは削除しません', 'バックアップ', '新しい空のプロジェクト', '通常の別名保存・増分保存'], settings: ["Ver.0.3.0では、VRAM設定をまだ保存していない場合", "保存済みのユーザー設定が優先", "UIパネルを半分の解像度", "仮想テクスチャキャッシュはオフ"], obsolete: ["公開版同梱の既定設定は「カスタム」", "仮想テクスチャキャッシュがオン", "Ver.0.2.1の公開版同梱の既定設定ではオン"] },
  en: { projects: ['all assets in the current working library', 'same relative path', 'overwritten without confirmation', 'does not delete files found only at the destination', 'Back up', 'new, empty project folder', 'Ordinary Save Scene As and Incremental Save'], settings: ["if you have not saved VRAM settings", "Saved user settings take priority", "half-resolution UI-panel previews", "virtual texture caching off"], obsolete: ["defaults included with the Ver.0.2.1 release", "Balanced is the built-in fallback"] },
  zh: { projects: ['当前工作库中的全部资产', '相同相对路径', '不经确认直接覆盖', '不会删除仅存在于目标位置的文件', '先备份', '新建的空项目文件夹', '常规“场景另存为”和“递增保存”'], settings: ["如果尚未保存显存设置", "用户保存设置优先", "半分辨率的 UI 面板预览", "自动选择的预设会关闭"], obsolete: ["公开版本随附的默认设置使用“自定义”", "内置回退预设为“均衡”", "Ver.0.2.1公开版本随附的默认设置开启"] },
  ko: { projects: ['현재 작업 라이브러리의 모든 에셋', '같은 상대 경로', '확인 없이 덮어쓰므로', '대상 위치에만 있는 파일은 삭제하지 않습니다', '백업', '새 빈 프로젝트 폴더', '일반적인 “씬 다른 이름으로 저장”과 “증분 저장”'], settings: ["VRAM 설정을 아직 저장하지 않았다면", "저장된 사용자 설정이 우선 적용", "UI 패널 미리보기를 절반 해상도", "자동 선택하는 프리셋은"], obsolete: ["공개 버전에 포함된 기본 설정은 “사용자 지정”", "내장 대체 프리셋은 “균형”", "Ver.0.2.1 공개 버전에 포함된 기본 설정에서는"] },
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
console.log('Verified save collision warnings and hardware-selected VRAM defaults across four languages, guides, built pages, and search indexes.');
