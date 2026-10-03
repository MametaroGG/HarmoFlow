/**
 * Verified version notes, in the intended display order. Product films stay in
 * productIntroduction unless an authoritative source ties them to a version.
 *
 * Each entry has a stable URL-safe id, version, and content for ja/en/zh/ko.
 * date (ISO YYYY-MM-DD), public sourceUrl, and version-specific video are optional:
 * omit unknown fields rather than inferring publication timing or associations.
 * Owner-provided notes may be included without a public source URL.
 *
 * video: { youtubeId, watchUrl } OR { src, poster, tracks?: [{ src, lang, label }] }
 * content[locale]: { title, summary, videoTitle?,
 *   highlights: [{ title, description, image?: { src, alt, width, height },
 *     visual?: { kind, label, note, before?, after?, beforeLabel?, afterLabel?, unit?, metric? }, href? }],
 *   changes: { added?: string[], improved?: string[], fixed?: string[], notes?: string[] } }
 *
 * Use root-relative paths for local assets and guide links. Include only
 * substantiated changes; never publish private source or message identifiers.
 */
const recompositeTiming = { kind: 'recomposite', before: 922, after: 32, unit: 'ms' };
const performance = {
  ja: '再合成の最適化による反応速度の向上：4K・不透明な素材1000レイヤーで、不透明度変更が約29倍高速化（中央値922ms→32ms）。改善幅は操作や環境によって異なります。',
  en: 'Recompositing optimization improves responsiveness: opacity changes are approximately 29× faster with 1,000 layers of opaque materials at 4K (median: 922 ms → 32 ms). Gains vary by operation and environment.',
  zh: '通过优化重新合成，提升响应速度：在 4K、1000 个不透明材质图层的条件下，不透明度更改约提速 29 倍（中位数 922ms→32ms）。改善幅度因操作和环境而异。',
  ko: '재합성 최적화로 반응 속도 향상: 4K·불투명 소재 1000개 레이어에서 불투명도 변경이 약 29배 빨라졌습니다(중앙값 922ms→32ms). 개선 폭은 작업과 환경에 따라 달라집니다.',
};

export const releases = [{
  id: 'v0-1-1',
  version: 'Ver.0.1.1',
  content: {
    ja: {
      title: 'Ver.0.1.1の更新内容',
      summary: 'パイメニューの追加、再合成の最適化、アップデート自動通知機能の追加。3つの更新内容を紹介します。',
      highlights: [
        { title: 'パイメニューの追加', description: 'パイメニューを追加しました。', visual: { kind: 'pie-menu', label: '中心の周囲に項目を配置するパイメニューの概念図', note: '概念図です。実際の画面・項目数・配置を示すものではありません。' } },
        { title: '再合成の最適化による反応速度の向上', description: performance.ja, visual: { ...recompositeTiming, label: '不透明度変更の所要時間：最適化前922ms、最適化後32ms（中央値）', metric: '不透明度変更の所要時間（中央値）', beforeLabel: '最適化前', afterLabel: '最適化後', note: '棒の長さは同じ尺度です。短いほど高速。' } },
        { title: 'アップデート自動通知機能の追加', description: 'アップデートを自動で通知する機能を追加しました。', visual: { kind: 'update-notification', label: 'ベルのアイコンで更新通知を表した概念図', note: '概念図です。実際の画面や通知の表示位置を示すものではありません。' } },
      ],
      changes: { added: ['パイメニューの追加', 'アップデート自動通知機能の追加'], improved: [performance.ja] },
    },
    en: {
      title: 'What changed in Ver.0.1.1',
      summary: 'Three updates: a pie menu, recompositing optimization, and automatic update notifications.',
      highlights: [
        { title: 'Pie menu added', description: 'A pie menu has been added.', visual: { kind: 'pie-menu', label: 'Concept diagram of a pie menu with items arranged around a center', note: 'Concept diagram; the actual interface, item count, and layout may differ.' } },
        { title: 'Faster response through recompositing optimization', description: performance.en, visual: { ...recompositeTiming, label: 'Median opacity-change time: 922 ms before optimization and 32 ms after', metric: 'Opacity-change time (median)', beforeLabel: 'Before', afterLabel: 'After', note: 'Both bars use the same scale. Shorter is faster.' } },
        { title: 'Automatic update notifications added', description: 'A feature that automatically notifies you of updates has been added.', visual: { kind: 'update-notification', label: 'Concept diagram representing update notifications with a bell icon', note: 'Concept diagram; it does not show the actual interface or notification placement.' } },
      ],
      changes: { added: ['Pie menu added', 'Automatic update notifications added'], improved: [performance.en] },
    },
    zh: {
      title: 'Ver.0.1.1 更新内容',
      summary: '三项更新：新增饼状菜单、优化重新合成、新增自动更新通知功能。',
      highlights: [
        { title: '新增饼状菜单', description: '新增了饼状菜单。', visual: { kind: 'pie-menu', label: '围绕中心排列菜单项的饼状菜单原理示意图', note: '原理示意图，并非实际界面、菜单项数量或布局。' } },
        { title: '优化重新合成，提升响应速度', description: performance.zh, visual: { ...recompositeTiming, label: '不透明度更改耗时中位数：优化前 922ms，优化后 32ms', metric: '不透明度更改耗时（中位数）', beforeLabel: '优化前', afterLabel: '优化后', note: '两条柱形使用相同比例，越短越快。' } },
        { title: '新增自动更新通知功能', description: '新增了自动通知更新的功能。', visual: { kind: 'update-notification', label: '用铃铛图标表示更新通知的原理示意图', note: '原理示意图，并非实际界面或通知显示位置。' } },
      ],
      changes: { added: ['新增饼状菜单', '新增自动更新通知功能'], improved: [performance.zh] },
    },
    ko: {
      title: 'Ver.0.1.1 업데이트 내용',
      summary: '파이 메뉴 추가, 재합성 최적화, 업데이트 자동 알림 기능 추가. 세 가지 변경 사항을 소개합니다.',
      highlights: [
        { title: '파이 메뉴 추가', description: '파이 메뉴를 추가했습니다.', visual: { kind: 'pie-menu', label: '중심 주위에 항목을 배치하는 파이 메뉴 개념도', note: '개념도이며 실제 화면, 항목 수 또는 배치를 나타내지 않습니다.' } },
        { title: '재합성 최적화로 반응 속도 향상', description: performance.ko, visual: { ...recompositeTiming, label: '불투명도 변경 시간 중앙값: 최적화 전 922ms, 최적화 후 32ms', metric: '불투명도 변경 시간(중앙값)', beforeLabel: '최적화 전', afterLabel: '최적화 후', note: '두 막대는 같은 척도를 사용합니다. 짧을수록 빠릅니다.' } },
        { title: '업데이트 자동 알림 기능 추가', description: '업데이트를 자동으로 알려주는 기능을 추가했습니다.', visual: { kind: 'update-notification', label: '벨 아이콘으로 업데이트 알림을 표현한 개념도', note: '개념도이며 실제 화면이나 알림 표시 위치를 나타내지 않습니다.' } },
      ],
      changes: { added: ['파이 메뉴 추가', '업데이트 자동 알림 기능 추가'], improved: [performance.ko] },
    },
  },
}];

export const productIntroduction = {
  youtubeId: 'x3csgJasBKg',
  watchUrl: 'https://www.youtube.com/watch?v=x3csgJasBKg',
};

export const featureGuides = [
  { id: 'paint', label: '01', href: '/help/brush.html', secondaryHref: '/help/uv.html' },
  { id: 'layers', label: '02', href: '/help/layers.html' },
  { id: 'weathering', label: '03', href: '/help/weathering.html' },
  { id: 'adjustments', label: '04', href: '/help/adjustments.html' },
];

export const updateCopy = {
  ja: {
    home: 'ホーム', pageLabel: 'アップデート', eyebrow: 'HarmoFlow / Updates',
    title: 'HarmoFlowの', titleAccent: 'アップデート。',
    lead: 'バージョンごとの見どころと変更点を、図解で。製品紹介動画とガイドで、HarmoFlowの使い心地もご覧ください。',
    introNav: '紹介動画', featuresNav: '主な機能', historyNav: '更新履歴', navLabel: 'このページの内容',
    introEyebrow: 'Product introduction', introTitle: 'まずは、動画で。',
    introDescription: '3Dモデルに直接描く、色と質感を重ねる。HarmoFlowの紹介動画をご覧ください。',
    introVideoTitle: 'HarmoFlow 製品紹介動画', introNote: 'HarmoFlowの製品紹介動画です。特定のバージョンの更新内容を示すものではありません。',
    watchVideo: 'YouTubeで見る', featuresEyebrow: 'Explore the workflow',
    featuresTitle: '描く。重ねる。仕上げる。',
    featuresDescription: 'HarmoFlowの主な機能を、図解とガイドで紹介します。',
    conceptNote: '機能の仕組みを表した概念図です。実際の画面や出力結果ではありません。',
    readGuide: '使い方を見る', uvGuide: 'UVで描く',
    features: {
      paint: { title: '立体にも、UVにも。', description: '3DビューとUVエディタで直接ペイント。色や粗さなど、複数のPBRチャンネルを同じストロークで描けます。', tag: '3D & UV ペイント', first: '3Dビュー', second: 'UVエディタ', alt: '3D表面のストロークをUV上にも表した、対応関係の概念図' },
      layers: { title: '重ねて、見せたいところだけ。', description: 'レイヤーで描画を分け、マスクで見える範囲を調整。描いた内容を残したまま、重なり方や仕上がりを整えます。', tag: 'レイヤー & マスク', first: 'レイヤー', second: 'マスク', third: '合成結果', alt: 'ペイントにマスクを適用し、下地の上に一部を表示する概念図' },
      weathering: { title: '形に沿って、質感を足す。', description: 'プロシージャルパターンを、凸エッジ・凹エッジ・遮蔽部分へ配置。メッシュマップを使い、汚しの強さや分布を調整します。', tag: '形状に合わせた汚し', first: '形状', second: 'エッジへの配置', alt: '立体の形状をもとに、凸エッジへ汚しを配置する概念図' },
      adjustments: { title: '色の仕上げは、あとからでも。', description: '色調補正・トーンカーブ・グラデーションマップを調整レイヤーとして追加。下のレイヤーの合成結果を補正し、保存後も設定を編集できます。', tag: '再編集できる色調整', first: '元の明るさ', second: 'グラデーションマップ', alt: '元の暗部から明部へ、グラデーションの色を対応させる概念図' },
    },
    historyEyebrow: 'Release history', historyTitle: 'バージョンごとの変更点。',
    historyDescription: 'バージョンごとの見どころと、詳しい更新内容を確認できます。',
    emptyTitle: 'バージョン別の更新履歴は準備中です。',
    emptyDescription: '更新内容の公開に合わせて、動画と詳しい変更点を掲載します。現在の配布情報は購入・ダウンロードページをご確認ください。',
    download: '購入・ダウンロード', updateGuide: '更新前のバックアップと手順',
    archive: '過去の更新内容', latest: '更新内容', highlights: 'このバージョンの見どころ',
    detailedChanges: '詳しい変更内容', releaseSource: 'リリースの公開情報',
    categories: { added: '新機能', improved: '改善', fixed: '修正', notes: '補足・注意事項' },
    footerTitle: '試す前に、知っておきたいこと。', footerDescription: '更新の前には、作業中のプロジェクトを保存してバックアップを。手順をガイドにまとめています。',
  },
  en: {
    home: 'Home', pageLabel: 'Updates', eyebrow: 'HarmoFlow / Updates',
    title: 'What’s happening', titleAccent: 'with HarmoFlow.',
    lead: 'Explore versioned highlights and changes through clear visuals. Get to know HarmoFlow through its product film and guides.',
    introNav: 'Introduction', featuresNav: 'Core features', historyNav: 'Release history', navLabel: 'On this page',
    introEyebrow: 'Product introduction', introTitle: 'See it in motion.',
    introDescription: 'Paint directly on a 3D model. Build up color and surface detail. Get to know HarmoFlow in the product film.',
    introVideoTitle: 'HarmoFlow product introduction', introNote: 'This film introduces HarmoFlow. It does not describe changes for a particular version.',
    watchVideo: 'Watch on YouTube', featuresEyebrow: 'Explore the workflow',
    featuresTitle: 'Paint. Layer. Refine.',
    featuresDescription: 'A visual introduction to the core tools, with guides to help you try them.',
    conceptNote: 'Concept diagrams explain the tools; they are not app screenshots or exact output previews.',
    readGuide: 'Read the guide', uvGuide: 'Paint in UV',
    features: {
      paint: { title: 'From the surface to the UVs.', description: 'Paint directly in the 3D view and UV Editor. Apply color, roughness, and other enabled PBR channels in the same stroke.', tag: '3D & UV painting', first: '3D view', second: 'UV Editor', alt: 'Concept diagram showing corresponding brush strokes on a 3D surface and its UV layout' },
      layers: { title: 'Build it up. Reveal what matters.', description: 'Separate your work into layers and control visibility with masks. Refine the composite while keeping the painted content.', tag: 'Layers & masks', first: 'Layer', second: 'Mask', third: 'Composite', alt: 'Concept diagram showing a mask revealing part of a paint layer over a base layer' },
      weathering: { title: 'Let the shape guide the detail.', description: 'Place procedural patterns on convex edges, concave edges, or occluded areas. Use mesh maps to refine the strength and distribution of weathering.', tag: 'Geometry-based weathering', first: 'Geometry', second: 'Edge placement', alt: 'Concept diagram showing weathering placed on the convex edges of a shape' },
      adjustments: { title: 'Keep your color choices editable.', description: 'Add Color Adjustment, Tone Curve, or Gradient Map as an adjustment layer. Refine the composite below and edit the settings again after saving.', tag: 'Editable color adjustments', first: 'Original brightness', second: 'Gradient map', alt: 'Concept diagram mapping dark-to-light input values to colors along a gradient' },
    },
    historyEyebrow: 'Release history', historyTitle: 'Every release, in detail.',
    historyDescription: 'Explore highlights and detailed changes by version.',
    emptyTitle: 'Versioned release notes are not posted yet.',
    emptyDescription: 'Videos and detailed changes will be added as release notes are published. For current availability, visit Purchase & download.',
    download: 'Purchase & download', updateGuide: 'Back up and update',
    archive: 'Previous version notes', latest: 'Update notes', highlights: 'Version highlights',
    detailedChanges: 'Detailed changes', releaseSource: 'View release announcement',
    categories: { added: 'New features', improved: 'Improvements', fixed: 'Fixes', notes: 'Notes & considerations' },
    footerTitle: 'Before you update.', footerDescription: 'Save your work and back up the project before installing an update. Follow the guide for the full steps.',
  },
  zh: {
    home: '首页', pageLabel: '更新', eyebrow: 'HarmoFlow / Updates',
    title: 'HarmoFlow', titleAccent: '更新动态。',
    lead: '通过图解了解各版本的亮点与变化，再通过产品介绍视频和指南认识 HarmoFlow。',
    introNav: '介绍视频', featuresNav: '主要功能', historyNav: '更新记录', navLabel: '本页内容',
    introEyebrow: 'Product introduction', introTitle: '先从视频开始。',
    introDescription: '直接在 3D 模型上绘制，逐层叠加颜色与质感。通过产品介绍视频认识 HarmoFlow。',
    introVideoTitle: 'HarmoFlow 产品介绍视频', introNote: '本视频为 HarmoFlow 产品介绍，并非某个特定版本的更新说明。',
    watchVideo: '在 YouTube 上观看', featuresEyebrow: 'Explore the workflow',
    featuresTitle: '绘制、叠加、细调。',
    featuresDescription: '通过原理示意图了解主要功能，再前往指南查看操作方法。',
    conceptNote: '图示用于说明功能原理，并非软件界面截图或精确输出预览。',
    readGuide: '查看使用方法', uvGuide: '在 UV 中绘制',
    features: {
      paint: { title: '在立体表面，也在 UV 中。', description: '直接在 3D 视图和 UV 编辑器中绘制。同一笔触可以同时绘制颜色、粗糙度等多个已启用的 PBR 通道。', tag: '3D 与 UV 绘制', first: '3D 视图', second: 'UV 编辑器', alt: '原理示意图：3D 表面上的笔触与 UV 布局中的对应位置' },
      layers: { title: '逐层叠加，只显示需要的部分。', description: '用图层分开处理绘制内容，通过蒙版控制可见范围。在保留原始绘制内容的同时，调整叠加效果。', tag: '图层与蒙版', first: '图层', second: '蒙版', third: '合成结果', alt: '原理示意图：蒙版使绘制图层的一部分显示在底层之上' },
      weathering: { title: '顺着形状，增添质感。', description: '将程序化图案放置在凸边、凹边或遮蔽区域。利用网格贴图调整旧化效果的强度与分布。', tag: '基于形状的旧化', first: '形状', second: '沿边缘放置', alt: '原理示意图：根据立体形状，将旧化效果放置在凸边上' },
      adjustments: { title: '色彩调整，随时再编辑。', description: '将色调校正、色调曲线或渐变映射添加为调整图层，校正下方图层的合成结果，保存后仍可编辑设置。', tag: '可重新编辑的色彩调整', first: '原始亮度', second: '渐变映射', alt: '原理示意图：将从暗到亮的输入值映射到渐变中的颜色' },
    },
    historyEyebrow: 'Release history', historyTitle: '查看每个版本的变化。',
    historyDescription: '了解各版本的亮点与详细更新内容。',
    emptyTitle: '分版本的更新记录尚未刊登。',
    emptyDescription: '更新说明发布后，我们将在此收录视频与详细变化。当前的获取方式请查看购买与下载页面。',
    download: '购买与下载', updateGuide: '更新前的备份与操作步骤',
    archive: '历史版本', latest: '更新内容', highlights: '版本亮点',
    detailedChanges: '详细更新内容', releaseSource: '查看版本公告',
    categories: { added: '新增功能', improved: '改进', fixed: '修复', notes: '补充与注意事项' },
    footerTitle: '更新之前，先做好准备。', footerDescription: '安装更新前，请保存正在进行的工作并备份整个项目。完整步骤已整理在指南中。',
  },
  ko: {
    home: '홈', pageLabel: '업데이트', eyebrow: 'HarmoFlow / Updates',
    title: 'HarmoFlow의', titleAccent: '업데이트.',
    lead: '버전별 주요 내용과 변경 사항을 그림으로 살펴보세요. 제품 소개 영상과 가이드에서 HarmoFlow의 사용 방법도 확인할 수 있습니다.',
    introNav: '소개 영상', featuresNav: '주요 기능', historyNav: '업데이트 기록', navLabel: '이 페이지의 내용',
    introEyebrow: 'Product introduction', introTitle: '먼저, 영상으로 만나보세요.',
    introDescription: '3D 모델에 직접 그리고, 색과 질감을 쌓아갑니다. 제품 소개 영상으로 HarmoFlow를 살펴보세요.',
    introVideoTitle: 'HarmoFlow 제품 소개 영상', introNote: 'HarmoFlow 제품 소개 영상이며, 특정 버전의 변경 사항을 설명하는 영상은 아닙니다.',
    watchVideo: 'YouTube에서 보기', featuresEyebrow: 'Explore the workflow',
    featuresTitle: '그리고, 쌓고, 다듬으세요.',
    featuresDescription: '개념도로 주요 기능을 살펴보고 가이드에서 사용 방법을 확인하세요.',
    conceptNote: '기능의 원리를 설명하는 개념도이며, 실제 앱 화면이나 정확한 출력 미리보기가 아닙니다.',
    readGuide: '사용 방법 보기', uvGuide: 'UV에서 그리기',
    features: {
      paint: { title: '입체 표면에서도, UV에서도.', description: '3D 뷰와 UV 에디터에서 직접 그립니다. 하나의 스트로크로 색상, 거칠기 등 활성화한 여러 PBR 채널을 함께 칠할 수 있습니다.', tag: '3D & UV 페인팅', first: '3D 뷰', second: 'UV 에디터', alt: '3D 표면의 브러시 스트로크와 UV 레이아웃의 대응 위치를 보여주는 개념도' },
      layers: { title: '겹쳐 그리고, 필요한 부분만.', description: '레이어로 작업을 나누고 마스크로 보이는 범위를 조절합니다. 그린 내용을 유지하면서 겹쳐지는 방식과 결과를 다듬습니다.', tag: '레이어 & 마스크', first: '레이어', second: '마스크', third: '합성 결과', alt: '마스크를 적용해 페인트 레이어 일부를 바탕 레이어 위에 표시하는 개념도' },
      weathering: { title: '형태를 따라 질감을 더하세요.', description: '볼록한 모서리, 오목한 모서리 또는 가려진 영역에 프로시저럴 패턴을 배치합니다. 메시 맵으로 웨더링의 강도와 분포를 조절하세요.', tag: '형상 기반 웨더링', first: '형상', second: '모서리에 배치', alt: '입체 형상의 볼록한 모서리에 웨더링을 배치하는 개념도' },
      adjustments: { title: '색감은 나중에도 바꿀 수 있게.', description: '색조 보정, 톤 커브, 그라디언트 맵을 조정 레이어로 추가하세요. 아래 레이어의 합성 결과를 보정하고 저장 후에도 설정을 편집할 수 있습니다.', tag: '다시 편집하는 색상 조정', first: '원래 밝기', second: '그라디언트 맵', alt: '어두운 값부터 밝은 값까지 그라디언트의 색상을 대응시키는 개념도' },
    },
    historyEyebrow: 'Release history', historyTitle: '버전별 변경 사항을 한눈에.',
    historyDescription: '각 릴리스의 주요 내용과 자세한 변경 사항을 확인하세요.',
    emptyTitle: '버전별 업데이트 기록은 아직 게시되지 않았습니다.',
    emptyDescription: '업데이트 안내가 공개되면 영상과 자세한 변경 사항을 게시합니다. 현재 배포 정보는 구매 및 다운로드 페이지에서 확인하세요.',
    download: '구매 및 다운로드', updateGuide: '업데이트 전 백업과 진행 방법',
    archive: '이전 버전의 업데이트', latest: '업데이트 내용', highlights: '이 버전의 주요 내용',
    detailedChanges: '자세한 변경 사항', releaseSource: '릴리스 안내 보기',
    categories: { added: '새 기능', improved: '개선', fixed: '수정', notes: '참고 및 주의 사항' },
    footerTitle: '업데이트 전에 확인하세요.', footerDescription: '업데이트를 설치하기 전에 작업을 저장하고 프로젝트를 백업하세요. 자세한 절차는 가이드에 정리되어 있습니다.',
  },
};
