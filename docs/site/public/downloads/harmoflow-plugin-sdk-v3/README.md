# HarmoFlow Plugin SDK v3

HarmoFlow 用の Windows x64 DLL プラグインを作るための最小 SDK です。
API ヘッダー、独自のグレースケール・サンプル、ビルド手順を収録しています。
アプリ本体やビルド済み DLL は含まれません。

## 内容

- `harmoflow_api.h`: C ABI の API 3 ヘッダー
- `guide_gray.c`: RGB の平均値を使う学習用グレースケール・フィルター。アルファは保持します
- `README.md`: この手順

## Windows でビルドする

必要なものは、Windows x64 の MSVC C/C++ ビルドツールと Windows SDK です。
Visual Studio または Build Tools の「C++ によるデスクトップ開発」で導入できます。
このサンプルに HarmoFlow 本体のソース、Vulkan SDK、CMake、vcpkg は必要ありません。

1. このフォルダーを展開します。
2. スタートメニューから **x64 Native Tools Command Prompt** を開きます。
3. 展開先へ移動して実行します。

```bat
cd /d "C:\path\to\harmoflow-plugin-sdk-v3"
cl /nologo /LD /MT /O2 /W4 /I. guide_gray.c /link /OUT:guide_gray.dll
dumpbin /exports guide_gray.dll
```

最後の一覧に `hf_plugin_init` が表示されることを確認してください。
`/LD` は DLL を作り、`/MT` はこのサンプルの C ランタイムを静的リンクします。
`.obj`、`.lib`、`.exp` はビルド時の生成物です。HarmoFlow に追加するのは
`guide_gray.dll` です。x86 や ARM64 の DLL を混在させないでください。

MSVC の公式資料:
- [コマンドライン環境と x64 ツール](https://learn.microsoft.com/en-us/cpp/build/building-on-the-command-line)
- [/LD と /MT](https://learn.microsoft.com/en-us/cpp/build/reference/md-mt-ld-use-run-time-library)

## HarmoFlow で確かめる

1. 作業中の Scene を保存し、練習用のモデルを開きます。
2. 「プラグイン(P)」→「プラグインを追加・閲覧...」→「プラグインを追加...」で
   `guide_gray.dll` を選びます。
3. 管理画面に **Guide Grayscale** が表示されたら、上部の「プラグイン(P)」
   メニューから同名のフィルターを開きます。
4. 対象テクスチャセットと **BaseColor** を選び、色付きの部分が灰色になるか確認します。
5. 「キャンセル」で元の表示へ戻ることを確認します。開き直して「適用」を押すと、
   処理結果を画像として持つ Fill レイヤーが追加されます。
6. Undo/Redo、Scene の保存・再読み込み、アプリ再起動後のメニュー表示を確認します。

このサンプルは、標準搭載の色調補正・グラデーションマップ・トーンカーブのような
再編集可能な調整レイヤーではありません。適用時の合成結果を画像にするため、
後から下位レイヤーを変えてもフィルター画像は追従しません。

DLL は `harmoflow.exe` の隣の `plugins` フォルダーへコピーされます。
更新時は HarmoFlow を終了してから同じファイルを置き換え、再起動してください。
追加操作で既存の同名ファイルは上書きされません。

## API の基本

- エントリーポイントは `hf_plugin_init(const HfHost*, HfPluginInfo*)`。
  成功時に `0` を返し、初期化中にフィルターを登録します。
- このサンプルは API 1 の機能だけを使うため `info->api_version = 1` とします。
  ヘッダー自体の `HF_API_VERSION` は `3` です。
- API 2 は `register_adjustable_filter`、API 3 は
  `register_gradient_filter` と `register_curve_filter` を追加します。
  必要なホスト API バージョンと関数ポインターを確認してから使ってください。
- `HfImage` は行優先・隙間なしの RGBA8 画像です。長さは
  `width * height * 4` バイト。ピクセルをその場で書き換えます。
  `pixels`、`width`、`height` を置き換えたり、バッファを解放したりしないでください。
- コールバックはプレビュー時にも呼ばれます。前の実行状態に依存しない処理にし、
  画像サイズを固定しないでください。
- `host` のポインターは初期化後に保持しないでください。コールバックと
  プラグイン情報の文字列は、DLL が読み込まれている間有効なものを使います。
- C++ へ変更する場合は、エントリーポイントを
  `extern "C" HF_EXPORT int hf_plugin_init(...)` として名前修飾を防いでください。
- 独自フィルターには独自の名前を付けてください。
  `Color Adjustment`、`Gradient Map`、`Tone Curve` は標準機能で使う名前です。

## うまく読み込めないとき

- **Could not load DLL**: x64 でビルドしたか、必要な依存 DLL があるか確認します。
- **DLL exports no hf_plugin_init**: `dumpbin /exports` で名前とエクスポートを確認します。
- **Plugin init failed or wrong API version**: 戻り値、申告した API バージョン、
  必要なホスト機能を確認します。
- **Already loaded**: アプリを終了して DLL を置き換え、再起動します。

DLL は HarmoFlow と同じプロセスで実行されます。外部 DLL のクラッシュを隔離する
仕組みはありません。信頼できるコードだけを使用し、テスト前に作業を保存してください。

## 配布範囲

このパッケージはプラグイン開発用の API ヘッダーと最小サンプルの配布です。
HarmoFlow 本体の EULA は変更しません。このパッケージに別のオープンソース・
ライセンスを追加するものではありません。

---

## English quick start

This package contains the API 3 C ABI header and a small C grayscale example for
Windows x64 HarmoFlow plugins. It contains no application binary or prebuilt DLL.

Install the MSVC C/C++ Build Tools and Windows SDK, open an **x64 Native Tools
Command Prompt**, change to this directory, and run the commands above.
`hf_plugin_init` must appear in the export list. Add `guide_gray.dll` through
**Plugins → Add / Browse Plugins... → Add Plugin...**, then launch
**Guide Grayscale** from the Plugins menu. Test on **BaseColor**, including
Cancel, Apply, Undo/Redo, saving/reopening a Scene, and restarting the app.

The sample preserves alpha and changes each RGB component to their arithmetic
mean. Apply creates an image-backed Fill layer, not a built-in editable
adjustment layer. Close HarmoFlow before replacing or removing the installed DLL.

Use an in-place RGBA8 callback; do not replace or free the image buffer. Register
filters during initialization and do not retain the temporary host pointer.
The sample declares API 1 because it uses only API 1 services; the supplied
header also defines APIs 2 and 3. A C++ entry point needs explicit C linkage.
Native plugins run inside HarmoFlow's process. Use trusted code and save your
work before testing.

This SDK package does not change the application's EULA or add an open-source
license.
