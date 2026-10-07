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
  ja: '再合成の最適化による反応速度の向上：4K・不透明な素材1000レイヤーで、不透明度変更が約29倍高速化（中央値922ms→32ms）。開発環境での計測（RTX 4070 SUPER / Core i5-12400F / DDR4 64GB）です。改善幅は操作や環境によって異なります。',
  en: 'Recompositing optimization improves responsiveness: opacity changes are approximately 29× faster with 1,000 layers of opaque materials at 4K (median: 922 ms → 32 ms). Measured in the development environment (RTX 4070 SUPER / Core i5-12400F / DDR4 64GB). Gains vary by operation and environment.',
  zh: '通过优化重新合成，提升响应速度：在 4K、1000 个不透明材质图层的条件下，不透明度更改约提速 29 倍（中位数 922ms→32ms）。在开发环境中测得（RTX 4070 SUPER / Core i5-12400F / DDR4 64GB）。改善幅度因操作和环境而异。',
  ko: '재합성 최적화로 반응 속도 향상: 4K·불투명 소재 1000개 레이어에서 불투명도 변경이 약 29배 빨라졌습니다(중앙값 922ms→32ms). 개발 환경(RTX 4070 SUPER / Core i5-12400F / DDR4 64GB)에서 측정한 결과입니다. 개선 폭은 작업과 환경에 따라 달라집니다.',
};

export const releases = [{
  id: 'v0-2-0',
  version: 'Ver.0.2.0',
  date: '2026-10-08',
  sourceUrl: 'https://github.com/MametaroGG/HarmoFlow/releases/tag/Ver.0.2.0',
  video: { youtubeId: 'fFjN-EyH7sQ', watchUrl: 'https://www.youtube.com/watch?v=fFjN-EyH7sQ' },
  content: {
    ja: {
      title: 'Ver.0.2.0の更新内容',
      videoTitle: 'HarmoFlow Ver.0.2.0 アップデート紹介動画',
      summary: '描いた塗りを選んで、表面に沿って移動・回転・拡縮。27種類の合成モードと255種類のデカールで、重ね方や仕上げの選択肢が広がりました。外観やキーコンフィグも改善しています。新機能を使って保存したシーンは旧版で正しく開けない場合があるため、変更前のファイルを残してください。',
      highlights: [
        { title: '描いたあとから、位置も形も。', description: 'メッシュと塗りの選択ツールを追加。選んだ塗りを移動・回転・拡縮でき、3Dビューでは表面に沿った配置、UVシェル境界やカメラの死角をまたぐ操作、シンメトリーに対応します。', href: '/help/brush.html#paint-selection-transform' },
        { title: '27通りの、重ね方。', description: 'レイヤーの合成モードを27種類に拡張。スクリーン、ソフトライト、色相、彩度、差の絶対値などから、色や明るさの重なり方を選べます。', href: '/help/layers.html#layer-blend-modes' },
        { title: '255種類を、好きな色で。', description: '白いデカール255種類を追加。カラーピッカーで色を付けて配置できます。一覧とプレビューは同梱され、アセットデータは初回使用時にライブラリ単位で取得します。', href: '/help/assets.html#decal-library' },
      ],
      changes: {
        added: [
          'メッシュと塗りの選択ツールを追加しました。長方形・楕円・投げ縄・折れ線・選択ペン・選択消し・シュリンク選択を使い分けられます。',
          '選択した塗りを移動・回転・拡縮できるようになりました。3Dビューでは表面に沿って配置し、UVシェル境界や画面外・カメラの死角をまたぐ操作とシンメトリーに対応します。',
          '選択ペン・選択消しは筆圧とブラシサイズのショートカットに対応します。長方形・楕円の選択中にShiftを押すと、正方形・正円にできます。',
          'レイヤーの合成モードを27種類に拡張しました。スクリーン、ソフトライト、色相、彩度、差の絶対値などを利用できます。',
          'ダーク・ライト・システムの外観設定、7色の配色プリセットとカスタムカラーを追加しました。ホーム、ロード画面、パイメニュー、ビューポート、UVエディタも設定に合わせた配色になります。',
          '白いデカール255種類を追加しました。カラーピッカーで色を付けて配置できます。一覧とプレビューを同梱し、アセットデータは初回使用時にライブラリ単位で取得します。',
          'ダウンロードしたマテリアル・デカールのキャッシュ上限設定と不要データの削除、デカールライブラリのアンインストールを追加しました。配置済みのデカールは保存したシーンでも保持します。',
        ],
        improved: [
          'キーコンフィグを、キーボードとマウスの図から割り当てを確認・編集できる画面へ改善しました。キーによる絞り込み、移動キー・テンキー、日本語・英語・韓国語・中国語の配列表示に対応し、長いショートカットの見切れも改善しました。',
          'パイメニューのツール分類とレイヤー一覧からの戻り操作を整理しました。ブラシ一覧は線のプレビューと名前が重ならない配置にし、ドロップダウンはホイールでも変更できるようにしました。',
          '新規起動では共通の「デフォルト」プロジェクトを使い、仮プロジェクトが毎回増えないようにしました。シーンを開く際の対象形式は.harmosに統一しました。',
          '3Dパスの描画先を最初のアンカーを置いたメッシュへ合わせ、表面の凹凸への追従を改善しました。',
          '起動時のアセット準備とUVワイヤー表示を最適化し、操作中の待ち時間を軽減しました。',
        ],
        fixed: [
          '高DPIディスプレイの拡大率に合わせてUIを調整し、高解像度の画面で文字やボタンが小さくなりすぎる問題を修正しました。',
          '球体の極など、UVが密集した部分を塗ったときに白い筋が入る問題を修正しました。',
          '視点の回転・ズーム・パン中に、選択したパスの点やハンドルが動く問題を修正しました。',
        ],
        notes: [
          '新機能を使って保存したシーンは、旧版では正しく開けない場合があります。旧版でも使う場合は、変更前のファイルを残してください。',
          'マテリアルとデカールの初回取得にはインターネット接続が必要です。取得済みのアセットはオフラインでも使用できます。',
          '製品版・体験版のインストーラーはBOOTHの配布ページから入手できます。選んだ版のZIPを展開し、中にあるEXEを実行してください。体験版は編集とシーン保存に対応し、テクスチャの書き出しは製品版で利用できます。',
          'GitHubリリースに添付されたversion.jsonは、アプリの更新確認に使うバージョン情報です。',
        ],
      },
    },
    en: {
      title: 'What changed in Ver.0.2.0',
      videoTitle: 'HarmoFlow Ver.0.2.0 update showcase',
      summary: 'Select painted areas, then move, rotate, and scale them along the surface. With 27 blend modes and 255 decals, there are more ways to build up and finish your work. Appearance settings and key configuration have also improved. Scenes saved with new features may not open correctly in older releases, so keep the original files.',
      highlights: [
        { title: 'Paint first. Adjust it afterward.', description: 'New mesh and paint selection tools let you move, rotate, and scale selected paint. In the 3D view, placement follows the surface across UV shell boundaries and hidden areas, with symmetry support.', href: '/help/brush.html#paint-selection-transform' },
        { title: '27 ways to blend.', description: 'Layer blending expands to 27 modes. Choose how colors and brightness combine with Screen, Soft Light, Hue, Saturation, Difference, and more.', href: '/help/layers.html#layer-blend-modes' },
        { title: '255 decals. Your choice of color.', description: 'Tint 255 new white decals with the color picker and place them on your work. The catalog and previews are included; each source library downloads as a pack on first use.', href: '/help/assets.html#decal-library' },
      ],
      changes: {
        added: [
          'Added mesh and paint selection tools: rectangle, ellipse, lasso, polygon, selection pen, selection eraser, and shrink selection.',
          'Added move, rotate, and scale for selected paint. The 3D view places paint along the surface and supports operations across UV shell boundaries, offscreen and hidden surfaces, and symmetry.',
          'Selection pens and erasers support pressure and brush-size shortcuts. Hold Shift when making rectangle or ellipse selections to create squares or circles.',
          'Expanded layer blending to 27 modes, including Screen, Soft Light, Hue, Saturation, and Difference.',
          'Added Dark, Light, and System appearance modes, seven color presets, and custom colors. Home, loading screens, pie menus, the viewport, and UV Editor follow the selected theme.',
          'Added 255 white decals that can be tinted with the color picker. The catalog and previews are included; the source library downloads as one pack on first use.',
          'Added a cache size limit and unused-data cleanup for downloaded materials and decals, plus decal-library uninstall. Placed decal sources remain in saved scenes.',
        ],
        improved: [
          'Redesigned key configuration with keyboard and mouse diagrams for inspecting and editing bindings. Added key filtering, navigation and numeric keypad clusters, Japanese, English, Korean, and Chinese layout displays, and improved visibility of long shortcuts.',
          'Organized pie-menu tool groups and the return action from the layer picker. Separated brush stroke previews from preset names and added mouse-wheel changes to dropdowns.',
          'New sessions reuse a shared Default project instead of creating another temporary project each time. Scene-open file filters now use .harmos.',
          'New 3D paths target the mesh under their first anchor and follow uneven surfaces more closely.',
          'Optimized startup material preparation and UV wire rendering to reduce waits during use.',
        ],
        fixed: [
          'Adapted the UI to high-DPI display scaling so text and controls do not become too small on high-resolution monitors.',
          'Fixed white streaks in painted areas where UV triangles converge, such as sphere poles.',
          'Fixed selected path points and handles moving while orbiting, zooming, or panning.',
        ],
        notes: [
          'Scenes saved with new features may not open correctly in older releases. Keep the original files if you need to continue using an older version.',
          'Initial material and decal downloads require an internet connection. Downloaded assets can be used offline.',
          'Full and Trial installers are distributed through BOOTH. Extract the ZIP for your edition and run the EXE. The Trial supports editing and saving scenes; texture export is available in the Full edition.',
          'The version.json attached to the GitHub release contains version information used by the app to check for updates.',
        ],
      },
    },
    zh: {
      title: 'Ver.0.2.0 更新内容',
      videoTitle: 'HarmoFlow Ver.0.2.0 更新介绍视频',
      summary: '选中已绘制的内容，沿表面移动、旋转或缩放。27 种混合模式与 255 种贴花，为叠加和细节处理带来更多选择。外观设置和按键配置也有所改进。使用新功能保存的场景可能无法在旧版中正确打开，请保留修改前的文件。',
      highlights: [
        { title: '画好之后，还能调整。', description: '新增网格与绘制内容选择工具，可移动、旋转和缩放选中的绘制内容。在 3D 视图中可沿表面放置，支持跨 UV 壳边界与相机视角死角的操作，以及对称功能。', href: '/help/brush.html#paint-selection-transform' },
        { title: '27 种混合方式。', description: '图层混合模式扩展至 27 种。可选择滤色、柔光、色相、饱和度、差值等模式，调整颜色与亮度的叠加方式。', href: '/help/layers.html#layer-blend-modes' },
        { title: '255 种贴花，随心着色。', description: '新增 255 种白色贴花，可通过颜色选择器着色后放置。列表与预览随软件提供，首次使用时以整个素材库为单位下载素材数据。', href: '/help/assets.html#decal-library' },
      ],
      changes: {
        added: [
          '新增网格与绘制内容选择工具：矩形、椭圆、套索、多边形、选择笔、选择橡皮擦和收缩选择。',
          '可移动、旋转和缩放选中的绘制内容。在 3D 视图中可沿表面放置，支持跨 UV 壳边界、画面外区域与相机视角死角的操作，以及对称功能。',
          '选择笔与选择橡皮擦支持压感和画笔大小快捷键。创建矩形或椭圆选区时按住 Shift，可得到正方形或正圆。',
          '图层混合模式扩展至 27 种，包括滤色、柔光、色相、饱和度和差值等。',
          '新增深色、浅色与跟随系统的外观设置，以及 7 种配色预设和自定义颜色。主页、加载画面、饼状菜单、视口和 UV 编辑器都会跟随所选主题。',
          '新增 255 种白色贴花，可通过颜色选择器着色后放置。列表与预览随软件提供，首次使用时以整个素材库为单位下载素材数据。',
          '新增已下载材质与贴花的缓存容量上限设置、无用数据清理，以及贴花库卸载功能。已放置的贴花源数据会保留在保存的场景中。',
        ],
        improved: [
          '重新设计按键配置界面，可通过键盘与鼠标示意图查看和编辑绑定。支持按键筛选、导航键与数字键盘区域，以及日语、英语、韩语和中文布局显示，并改善了较长快捷键显示不全的问题。',
          '整理了饼状菜单的工具分组和从图层列表返回的操作。画笔列表中的笔触预览与预设名称不再重叠，下拉选项也可使用滚轮切换。',
          '新启动的会话共用“默认”项目，避免每次都新增临时项目。打开场景时的文件类型筛选统一为 .harmos。',
          '新建 3D 路径以第一个锚点所在的网格为绘制目标，并更好地贴合凹凸表面。',
          '优化了启动时的素材准备与 UV 线框显示，减少使用过程中的等待。',
        ],
        fixed: [
          '根据高 DPI 显示器的缩放比例调整界面，修复了高分辨率屏幕上文字和控件过小的问题。',
          '修复了在球体极点等 UV 三角形密集汇聚的区域绘制时出现白色条纹的问题。',
          '修复了旋转视角、缩放或平移时，选中路径的控制点和手柄会移动的问题。',
        ],
        notes: [
          '使用新功能保存的场景可能无法在旧版中正确打开。如果还需要在旧版中使用，请保留修改前的文件。',
          '首次下载材质和贴花需要互联网连接，已下载的素材可离线使用。',
          '正式版和试用版安装程序均通过 BOOTH 提供。解压所选版本的 ZIP 后运行其中的 EXE。试用版支持编辑和保存场景，纹理导出功能需使用正式版。',
          'GitHub 版本发布附件中的 version.json 是供软件检查更新使用的版本信息。',
        ],
      },
    },
    ko: {
      title: 'Ver.0.2.0 업데이트 내용',
      videoTitle: 'HarmoFlow Ver.0.2.0 업데이트 소개 영상',
      summary: '그린 영역을 선택한 뒤 표면을 따라 이동·회전·크기 조절할 수 있습니다. 27가지 합성 모드와 255종의 데칼로 겹쳐 그리고 마무리하는 선택지가 넓어졌습니다. 외관 설정과 키 설정도 개선했습니다. 새 기능을 사용해 저장한 장면은 이전 버전에서 제대로 열리지 않을 수 있으므로 변경 전 파일을 보관하세요.',
      highlights: [
        { title: '그린 뒤에도 위치와 크기를 조절.', description: '메시와 페인트 선택 도구를 추가했습니다. 선택한 페인트를 이동·회전·크기 조절할 수 있으며, 3D 뷰에서는 표면을 따른 배치, UV 셸 경계와 카메라 사각지대를 넘는 작업, 대칭을 지원합니다.', href: '/help/brush.html#paint-selection-transform' },
        { title: '27가지 방식으로 겹치기.', description: '레이어 합성 모드가 27가지로 늘어났습니다. 스크린, 소프트 라이트, 색조, 채도, 차이 등으로 색상과 밝기가 겹쳐지는 방식을 선택하세요.', href: '/help/layers.html#layer-blend-modes' },
        { title: '255종 데칼을 원하는 색으로.', description: '흰색 데칼 255종을 추가했습니다. 색상 선택기로 색을 입혀 배치할 수 있습니다. 목록과 미리보기는 앱에 포함되며, 원본 데이터는 처음 사용할 때 라이브러리 단위로 다운로드합니다.', href: '/help/assets.html#decal-library' },
      ],
      changes: {
        added: [
          '메시와 페인트 선택 도구를 추가했습니다. 사각형, 타원, 올가미, 다각형, 선택 펜, 선택 지우개, 축소 선택을 사용할 수 있습니다.',
          '선택한 페인트를 이동·회전·크기 조절할 수 있습니다. 3D 뷰에서는 표면을 따라 배치하며, UV 셸 경계와 화면 밖·카메라 사각지대를 넘는 작업 및 대칭을 지원합니다.',
          '선택 펜과 선택 지우개는 필압과 브러시 크기 단축키를 지원합니다. 사각형이나 타원으로 선택하는 동안 Shift를 누르면 정사각형이나 완전한 원을 만들 수 있습니다.',
          '레이어 합성 모드를 27가지로 확장했습니다. 스크린, 소프트 라이트, 색조, 채도, 차이 등을 사용할 수 있습니다.',
          '다크·라이트·시스템 외관 설정, 7가지 색상 프리셋과 사용자 지정 색상을 추가했습니다. 홈, 로딩 화면, 파이 메뉴, 뷰포트, UV 에디터도 선택한 테마를 따릅니다.',
          '색상 선택기로 색을 입혀 배치할 수 있는 흰색 데칼 255종을 추가했습니다. 목록과 미리보기는 앱에 포함되며, 원본 데이터는 처음 사용할 때 라이브러리 단위로 다운로드합니다.',
          '다운로드한 머티리얼과 데칼의 캐시 용량 제한 및 불필요한 데이터 정리, 데칼 라이브러리 제거 기능을 추가했습니다. 배치한 데칼의 원본 데이터는 저장한 장면에 유지됩니다.',
        ],
        improved: [
          '키보드와 마우스 그림에서 할당을 확인하고 편집할 수 있도록 키 설정 화면을 개선했습니다. 키별 필터링, 탐색 키와 숫자 키패드 영역, 일본어·영어·한국어·중국어 배열 표시를 지원하며 긴 단축키가 잘리는 문제도 개선했습니다.',
          '파이 메뉴의 도구 분류와 레이어 목록에서 돌아가는 동작을 정리했습니다. 브러시 목록의 스트로크 미리보기와 프리셋 이름이 겹치지 않도록 배치하고, 드롭다운을 마우스 휠로 변경할 수 있게 했습니다.',
          '새로 시작할 때 공통 기본 프로젝트를 사용해 임시 프로젝트가 매번 늘어나지 않도록 했습니다. 장면 열기의 파일 형식 필터는 .harmos로 통일했습니다.',
          '새 3D 패스는 첫 앵커가 놓인 메시를 그리기 대상으로 삼고, 표면의 굴곡을 더 잘 따라갑니다.',
          '시작 시 소재 준비와 UV 와이어 표시를 최적화해 사용 중 대기 시간을 줄였습니다.',
        ],
        fixed: [
          '고 DPI 디스플레이의 배율에 맞춰 UI를 조정해 고해상도 화면에서 글자와 컨트롤이 지나치게 작아지는 문제를 수정했습니다.',
          '구의 극점처럼 UV 삼각형이 밀집한 부분을 칠할 때 흰 줄이 생기는 문제를 수정했습니다.',
          '시점 회전·확대/축소·이동 중에 선택한 패스의 점이나 핸들이 움직이는 문제를 수정했습니다.',
        ],
        notes: [
          '새 기능을 사용해 저장한 장면은 이전 버전에서 제대로 열리지 않을 수 있습니다. 이전 버전에서도 사용해야 한다면 변경 전 파일을 보관하세요.',
          '머티리얼과 데칼의 첫 다운로드에는 인터넷 연결이 필요합니다. 다운로드한 소재는 오프라인에서도 사용할 수 있습니다.',
          '정식판과 체험판 설치 프로그램은 BOOTH에서 받을 수 있습니다. 선택한 버전의 ZIP을 압축 해제한 뒤 안에 있는 EXE를 실행하세요. 체험판은 편집과 장면 저장을 지원하며, 텍스처 내보내기는 정식판에서 사용할 수 있습니다.',
          'GitHub 릴리스에 첨부된 version.json은 앱이 업데이트를 확인할 때 사용하는 버전 정보입니다.',
        ],
      },
    },
  },
}, {
  id: 'v0-1-2',
  version: 'Ver.0.1.2',
  date: '2026-10-04',
  sourceUrl: 'https://github.com/MametaroGG/HarmoFlow/releases/tag/Ver.0.1.2',
  video: {
    youtubeId: '7ICF2pMDIbM',
    watchUrl: 'https://www.youtube.com/watch?v=7ICF2pMDIbM',
  },
  content: {
    ja: {
      title: 'Ver.0.1.2の更新内容',
      videoTitle: 'HarmoFlow Ver.0.1.2 アップデート紹介動画',
      summary: 'パイメニューでレイヤーを選び、設定を切り替え。UVアイランド境界での描画と、PNGの透明出力も改善しました。新しい3Dパスを含むシーンはVer.0.1.1以前では開けないため、更新前のファイルを残してください。',
      highlights: [
        { title: 'レイヤーの選択も、設定も。', description: '3DビューとUVエディタのパイメニューから、サムネイル付きのレイヤー一覧へ。カード横から6つの設定を切り替えられます。', href: '/help/layers.html#layer-pie-menu' },
        { title: 'UVの境界を越えて描く。', description: '3Dビューの通常ブラシは、同じパーツのつながった表面でUVアイランド境界を越えて描画できます。3Dビューで新しく作るパスの線・塗りが、境界で途切れたり飛んだりする問題も修正しました。', href: '/help/paths.html#path-uv-island-boundaries' },
        { title: '描いていない部分は、透明に。', description: 'PNG出力から表示用の自動Base下地を除外。半透明の描画・マスク・レイヤーの不透明度を反映し、読み込んだテクスチャと自分で追加したFillレイヤーは出力に残します。', href: '/help/export.html#png-transparency' },
      ],
      changes: {
        added: [
          'パイメニューのレイヤー一覧にサムネイルを追加。右ボタンを押したまま「レイヤー」へ滑らせ、カードの上で離すと選択できます。3DビューとUVエディタに対応しています。',
          'カード横から、表示、ロック、クリッピング、透明ピクセルロック、描画で高さ、単独表示を切り替えられます。設定へ滑らせ、離した場所の設定だけを変更できます。',
        ],
        improved: [
          'パスレイヤーを選ぶとパスツール、ペイントレイヤーを選ぶとブラシへ切り替わります。ぼかし、UVシェル塗り、ポリゴン塗りを使用中の場合は、その塗り方を保持します。',
          'PNG出力では表示用に自動で付くBaseの下地を除外し、未描画部分を透明にします。半透明の描画、マスク、レイヤーの不透明度を反映し、読み込んだテクスチャと自分で追加したFillレイヤーは含めます。',
        ],
        fixed: [
          '3Dビューの通常ブラシが、同じパーツのつながった表面でUVアイランド境界を越えて描画できるように修正しました。',
          '3Dビューで新しく作成するパスの線・塗りが、UVアイランド境界で途切れたり別の位置へ飛んだりする問題を修正しました。以前に保存したUV座標のパスには、3Dビューでの作り直しが必要です。',
        ],
        notes: [
          '新しい3Dパスを含むシーンはVer.0.1.1以前では開けません。旧版でも使うシーンは、変更前のファイルを残してください。',
          'BOOTHの配布ページから選んだ版のZIPをダウンロード・展開し、中にあるEXEを実行してインストールしてください。',
          'アセット一覧は本体に含まれています。画像アセットを初めて使う際はインターネット接続で必要なデータを取得します。取得済みのアセットは以降オフラインでも使用できます。',
          'GitHubリリースに添付されたversion.jsonは、アプリの更新確認に使うバージョン情報です。',
        ],
      },
    },
    en: {
      title: 'What changed in Ver.0.1.2',
      videoTitle: 'HarmoFlow Ver.0.1.2 update showcase',
      summary: 'Select layers and change their settings from the pie menu, with improved drawing across UV island boundaries and transparent PNG export. Scenes containing new 3D paths cannot be opened in Ver.0.1.1 or earlier, so keep a copy of the file from before the changes.',
      highlights: [
        { title: 'Select layers. Adjust settings.', description: 'Open a layer list with thumbnails from the pie menu in the 3D view or UV Editor. Toggle six settings beside each card.', href: '/help/layers.html#layer-pie-menu' },
        { title: 'Draw across UV boundaries.', description: 'The regular 3D brush can paint across UV island boundaries on connected surfaces of the same part. Lines and fills of paths newly created in the 3D view no longer break or jump at those boundaries.', href: '/help/paths.html#path-uv-island-boundaries' },
        { title: 'Keep unpainted areas transparent.', description: 'PNG export excludes the automatic Base used for display. It reflects semi-transparent painting, masks, and layer opacity, while keeping imported textures and Fill layers you added.', href: '/help/export.html#png-transparency' },
      ],
      changes: {
        added: [
          'The pie menu now opens a layer list with thumbnails. Hold the right button, slide to Layers, and release over a card to select it. Available in the 3D view and UV Editor.',
          'Toggle Visibility, Lock, Clipping, Alpha lock, Stroke height, and Solo beside each card. Slide to a setting and release to change only that setting.',
        ],
        improved: [
          'Selecting a Path layer switches to the Path tool; selecting a Paint layer switches to the brush. If Blur, UV Shell Fill, or Polygon Fill is active, that painting mode is preserved.',
          'PNG export excludes the automatically added Base used for display, leaving unpainted areas transparent. Semi-transparent painting, masks, and layer opacity are reflected; imported textures and Fill layers you added remain included.',
        ],
        fixed: [
          'The regular brush in the 3D view can now paint across UV island boundaries on connected surfaces of the same part.',
          'Fixed lines and fills of paths newly created in the 3D view breaking or jumping elsewhere at UV island boundaries. Paths previously saved with UV coordinates must be recreated in the 3D view.',
        ],
        notes: [
          'Scenes containing new 3D paths cannot be opened in Ver.0.1.1 or earlier. Keep the file from before the changes if you also need to use the scene in an older version.',
          'Download the ZIP for your chosen edition from the BOOTH distribution page, extract it, and run the EXE inside to install.',
          'The material catalog is included with the app. The first use of an image material requires an internet connection to retrieve its data. Downloaded materials can then be used offline.',
          'The version.json attached to the GitHub release contains version information used by the app to check for updates.',
        ],
      },
    },
    zh: {
      title: 'Ver.0.1.2 更新内容',
      videoTitle: 'HarmoFlow Ver.0.1.2 更新介绍视频',
      summary: '通过饼状菜单选择图层、切换设置，并改进了跨 UV 岛边界的绘制与透明 PNG 导出。包含新 3D 路径的场景无法在 Ver.0.1.1 及更早版本中打开，请保留修改前的文件。',
      highlights: [
        { title: '选择图层，随手调整。', description: '在 3D 视图或 UV 编辑器中，通过饼状菜单打开带缩略图的图层列表。可在卡片旁切换六项设置。', href: '/help/layers.html#layer-pie-menu' },
        { title: '跨越 UV 边界绘制。', description: '3D 视图的普通画笔可在同一部件的相连表面上跨 UV 岛边界绘制。在 3D 视图中新建路径的线条和填充，在边界处中断或跳到其他位置的问题也已修复。', href: '/help/paths.html#path-uv-island-boundaries' },
        { title: '未绘制的部分，保持透明。', description: 'PNG 导出不再包含自动添加、用于显示的 Base 底层。导出会体现半透明绘制、蒙版和图层不透明度，并保留导入的纹理与自行添加的 Fill 图层。', href: '/help/export.html#png-transparency' },
      ],
      changes: {
        added: [
          '饼状菜单新增带缩略图的图层列表。按住右键滑向“图层”，在卡片上松开即可选择。支持 3D 视图和 UV 编辑器。',
          '可在卡片旁切换显示、锁定、剪贴、锁定透明像素、笔触高度和单独显示。滑向某项设置后松开，只会更改松开位置对应的设置。',
        ],
        improved: [
          '选择路径图层时切换到路径工具，选择绘画图层时切换到画笔。若正在使用模糊、UV 壳填充或多边形填充，则保留当前绘制模式。',
          'PNG 导出会排除自动添加、用于显示的 Base 底层，使未绘制区域保持透明，并体现半透明绘制、蒙版及图层不透明度。导入的纹理和自行添加的 Fill 图层仍会包含在输出中。',
        ],
        fixed: [
          '修复了 3D 视图普通画笔的绘制，使其可在同一部件的相连表面上跨 UV 岛边界绘制。',
          '修复了在 3D 视图中新建路径的线条和填充，在 UV 岛边界处中断或跳到其他位置的问题。此前以 UV 坐标保存的路径需要在 3D 视图中重新创建。',
        ],
        notes: [
          '包含新 3D 路径的场景无法在 Ver.0.1.1 及更早版本中打开。如果还需要在旧版中使用该场景，请保留修改前的文件。',
          '从 BOOTH 发布页面下载所选版本的 ZIP，解压后运行其中的 EXE 进行安装。',
          '素材列表已包含在软件中。首次使用图片素材时，需要联网获取相应数据；已获取的素材之后可离线使用。',
          'GitHub 版本发布附件中的 version.json 是供软件检查更新使用的版本信息。',
        ],
      },
    },
    ko: {
      title: 'Ver.0.1.2 업데이트 내용',
      videoTitle: 'HarmoFlow Ver.0.1.2 업데이트 소개 영상',
      summary: '파이 메뉴에서 레이어를 선택하고 설정을 바꿀 수 있습니다. UV 아일랜드 경계의 그리기와 투명 PNG 출력도 개선했습니다. 새 3D 패스가 포함된 씬은 Ver.0.1.1 이하에서 열 수 없으므로 변경 전 파일을 보관하세요.',
      highlights: [
        { title: '레이어 선택과 설정을 한곳에서.', description: '3D 뷰와 UV 편집기의 파이 메뉴에서 썸네일이 있는 레이어 목록을 여세요. 카드 옆에서 여섯 가지 설정을 바꿀 수 있습니다.', href: '/help/layers.html#layer-pie-menu' },
        { title: 'UV 경계를 넘어 그리기.', description: '3D 뷰의 일반 브러시가 같은 파트의 연결된 표면에서 UV 아일랜드 경계를 넘어 그릴 수 있습니다. 3D 뷰에서 새로 만든 패스의 선과 채우기가 경계에서 끊기거나 다른 위치로 튀는 문제도 수정했습니다.', href: '/help/paths.html#path-uv-island-boundaries' },
        { title: '칠하지 않은 부분은 투명하게.', description: 'PNG 출력에서 표시용으로 자동 생성되는 Base 바탕을 제외합니다. 반투명 페인팅, 마스크, 레이어 불투명도를 반영하며, 불러온 텍스처와 직접 추가한 Fill 레이어는 유지합니다.', href: '/help/export.html#png-transparency' },
      ],
      changes: {
        added: [
          '파이 메뉴에 썸네일이 있는 레이어 목록을 추가했습니다. 오른쪽 버튼을 누른 채 “레이어”로 이동한 뒤 카드 위에서 놓으면 선택됩니다. 3D 뷰와 UV 편집기에서 사용할 수 있습니다.',
          '카드 옆에서 표시, 잠금, 클리핑, 투명 픽셀 잠금, 스트로크 높이, 단독 표시를 전환할 수 있습니다. 설정 쪽으로 이동한 뒤 놓으면 해당 위치의 설정만 변경됩니다.',
        ],
        improved: [
          '패스 레이어를 선택하면 패스 도구로, 페인트 레이어를 선택하면 브러시로 전환됩니다. 흐림, UV 셸 채우기, 폴리곤 채우기를 사용 중이면 해당 그리기 모드를 유지합니다.',
          'PNG 출력은 표시용으로 자동 추가되는 Base 바탕을 제외하여 칠하지 않은 부분을 투명하게 만듭니다. 반투명 페인팅, 마스크, 레이어 불투명도를 반영하며, 불러온 텍스처와 직접 추가한 Fill 레이어는 출력에 포함됩니다.',
        ],
        fixed: [
          '3D 뷰의 일반 브러시가 같은 파트의 연결된 표면에서 UV 아일랜드 경계를 넘어 그릴 수 있도록 수정했습니다.',
          '3D 뷰에서 새로 만드는 패스의 선과 채우기가 UV 아일랜드 경계에서 끊기거나 다른 위치로 튀는 문제를 수정했습니다. 이전에 UV 좌표로 저장한 패스는 3D 뷰에서 다시 만들어야 합니다.',
        ],
        notes: [
          '새 3D 패스가 포함된 씬은 Ver.0.1.1 이하에서 열 수 없습니다. 이전 버전에서도 사용할 씬은 변경 전 파일을 보관하세요.',
          'BOOTH 배포 페이지에서 원하는 버전의 ZIP을 다운로드하고 압축을 푼 뒤, 안에 있는 EXE를 실행하여 설치하세요.',
          '소재 목록은 앱에 포함되어 있습니다. 이미지 소재를 처음 사용할 때는 인터넷에 연결하여 필요한 데이터를 받습니다. 받은 소재는 이후 오프라인에서도 사용할 수 있습니다.',
          'GitHub 릴리스에 첨부된 version.json은 앱의 업데이트 확인에 사용하는 버전 정보입니다.',
        ],
      },
    },
  },
}, {
  id: 'v0-1-1',
  version: 'Ver.0.1.1',
  video: {
    youtubeId: 'V4Ehv4t5r1M',
    watchUrl: 'https://www.youtube.com/watch?v=V4Ehv4t5r1M',
  },
  content: {
    ja: {
      title: 'Ver.0.1.1の更新内容',
      videoTitle: 'HarmoFlow Ver.0.1.1 アップデート紹介動画',
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
      videoTitle: 'HarmoFlow Ver.0.1.1 update showcase',
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
      videoTitle: 'HarmoFlow Ver.0.1.1 更新介绍视频',
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
      videoTitle: 'HarmoFlow Ver.0.1.1 업데이트 소개 영상',
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
