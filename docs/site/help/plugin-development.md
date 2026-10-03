---
title: "プラグインを作る"
category: "設定とリファレンス"
description: "Lua拡張の最小サンプルから、パネル登録、Undo、DLL SDKの仕組み、ビルドと動作確認まで。"
outline: [2, 3]
prev: false
next: false
---

# プラグインを作る {#plugin-development}

最初は、**Luaで「ボタンを押すとレイヤーを1枚追加する」パネル**を作ると、ファイル作成・登録・実行・確認までを短く試せます。画像の各ピクセルを処理するフィルターにはDLLを使います。導入するだけの場合は[プラグインの導入・管理](./plugins.md)をご覧ください。

<GuideFlow kind="plugin-authoring" />

## どちらで作る？ {#choose-plugin-api}

| | Lua拡張 | DLLプラグイン |
| --- | --- | --- |
| 作るもの | ボタンと数値スライダーを持つパネル | ネイティブの画像フィルターなど |
| 開発の準備 | UTF-8のテキストエディター | 公式SDKヘッダーとWindows x64対応C/C++コンパイラー |
| 実行の仕組み | 操作ボタンから、許可された `hf` APIを呼ぶ | ホストに登録したコールバックで、渡された画像を処理する |
| 得意なこと | レイヤーの追加・整理、定型操作をまとめる | RGBA画像のピクセル処理、数値・グラデーション・カーブで調整するフィルター |
| APIの版 | 拡張側の `hf.api_version` は1 | 現在のSDKの `HF_API_VERSION` は3 |

::: tip 公式SDKと最小サンプル
[HarmoFlow Plugin SDK API 3をダウンロード（ZIP）](/downloads/harmoflow-plugin-sdk-v3.zip)。公式ヘッダー `harmoflow_api.h`、このガイド用の小さなCサンプル `guide_gray.c`、ビルド手順を収録しています。アプリ本体は含みません。Luaの最小例はSDKを使わず試せます。
:::

SDK API 3は現在の開発実装に対応します。使用中のHarmoFlowが対応するAPI版を確認してください。以下の基本CサンプルはAPI 1の機能だけを使い、API 1として登録します。

## 1. 最小のLuaパネルを作る {#first-lua-panel}

テキストエディターで新しいファイルを作り、以下を **`my_first_panel.lua`** の名前、UTF-8（BOMなし）で保存します。Windowsの拡張子を表示して、`.lua.txt` になっていないことを確認してください。

```lua
hf.register_panel {
  id = "example.my_first_panel",
  title = "My First Panel",
  description = "Add one paint layer",
  actions = {
    {
      id = "add_paint",
      label = "Add paint layer",
      run = function(values)
        hf.add_layer("paint", "Practice layer")
        hf.log("Added one paint layer")
      end
    }
  }
}
```

この例は、既存ファイルの読み書きや外部通信をせず、ボタンを押すたびにペイントレイヤーを1枚追加します。追加位置は選択中のレイヤーとテクスチャセットに従います。実際の制作シーンではなく、テスト用シーンで確認してください。

### コードの各部分

- `hf.register_panel`：読み込み時にパネルを登録します。登録時点ではレイヤーを追加しません。
- `id`：他の拡張と重ならない識別子です。配布時は `作者名.機能名` のように自分固有の名前へ変更します。
- `title`／`description`：パネル名と説明です。
- `actions`：ボタンの一覧です。各ボタンにも固有の `id` と表示用の `label` が必要です。
- `run(values)`：ユーザーがボタンを押したときに実行します。`values` はその時点のスライダー値をIDで参照できるテーブルです。この最小例では使いません。

## 2. 読み込んで動作を確認する {#test-lua-panel}

1. UVを持つ小さなモデルを開き、テスト用シーンを保存します。
2. 「プラグイン(P) → プラグインを追加・閲覧... → プラグインを追加...」で `my_first_panel.lua` を選びます。
3. 一覧でLua拡張が正しく登録されたことを確認します。
4. 「プラグイン(P)」から **My First Panel** を開き、**Add paint layer** を1回押します。
5. レイヤーが1枚増えたことを確認します。Ctrl+Zで追加が戻り、Ctrl+Yでやり直せることも確認します。
6. シーンを保存して開き直し、結果のレイヤーが残ることを確認します。

ファイルを修正したら、アプリを終了して `extensions/` のインストール済みファイルを置き換え、再起動します。元の作業フォルダーでソースだけを書き換えても、追加時にコピーしたファイルは更新されません。[更新手順](./plugins.md#update-plugin)も参照してください。

## 3. 操作を増やすときのルール {#lua-contract}

### 利用できる操作

Lua拡張のアクションで使える `hf` APIは次の範囲です。通常の「スクリプト (Lua)」画面のAPI全体を、そのまま使えるわけではありません。

| 用途 | API |
| --- | --- |
| ログ | `log` |
| レイヤーを調べる | `layer_count`, `layer_name`, `layer_depth` |
| 追加・削除・選択 | `add_layer`, `remove_layer`, `set_active_layer` |
| レイヤーの状態 | `set_layer_opacity`, `set_layer_visible`, `set_layer_clip`, `set_layer_alpha_lock` |
| Fillの設定 | `set_fill_channel`, `set_fill_uv` |

レイヤー番号は**1から**始まります。`hf.add_layer` は新しい番号を返しません。また、選択位置によって途中に追加されるため、追加直後の `hf.layer_count()` を新しいレイヤーの番号として扱わないでください。番号を使う処理は、操作対象を確実に特定してから実行します。

### スライダーと上限

パネルの `controls` に数値スライダーを登録できます。各スライダーのIDをキーにして、アクション内の `values` から値を読み取ります。最小値は最大値より小さくし、有限の数値を使います。初期値は範囲内に収められます。

- 1パネルにつき数値スライダー16個、アクション16個まで
- 1拡張につきパネル8個、読み込める拡張32個まで
- ファイルは1 MiBまで。ID・タイトル・ラベルは空でない256バイト以下の文字列
- パネルIDは全拡張で一意。コントロールID・アクションIDもパネル内で重複させない

現在の実装では、起動時に読み込みを試みるLuaファイルは、ファイル名順で先頭の16個までです。実行中に読み込める拡張は最大32個ですが、すべてを次回起動時にも使う場合は、`extensions/` 直下の `.lua` ファイルを16個以内にしてください。

### スライダー付きの例

次の例は、指定した不透明度のペイントレイヤーを追加します。同名レイヤーがあれば名前へ `_` を足し、追加後に名前から実際の番号を見つけます。レイヤー末尾へ追加されると仮定しないための例です。`opacity` のIDと `values.opacity` が対応しています。

```lua
assert(hf.api_version == 1)
hf.register_panel {
    id = "guide.paint_layer",
    title = "Paint Layer Helper",
    description = "Create an empty paint layer with a chosen opacity.",
    controls = {
        {id = "opacity", label = "Opacity", min = 0, max = 1, value = 0.5},
    },
    actions = {
        {
            id = "add",
            label = "Add paint layer",
            run = function(values)
                local name = "Plugin practice"
                local function find_layer()
                    for i = 1, hf.layer_count() do
                        if hf.layer_name(i) == name then return i end
                    end
                end
                while find_layer() do name = name .. "_" end
                hf.add_layer("paint", name)
                local index = assert(find_layer(), "Layer was not created")
                hf.set_layer_opacity(index, values.opacity)
                hf.set_active_layer(index)
            end,
        },
    },
}
```

### Undoと保存の考え方

1回のアクションで記録された編集は、1回のUndoにまとめられます。エラーの場合は記録された編集を巻き戻し、元の選択レイヤーへ戻します。ただし、あらゆる処理に無条件の復旧を保証するものではありません。最初から制作シーンで試さず、失敗ケースもテストしてください。

シーンに保存されるのは処理結果の通常のレイヤーです。Lua変数やパネルのスライダー値がシーンと一緒に永続化されると想定しないでください。

### 実行環境の制限

Lua拡張はそれぞれ独立したLua状態を持ちます。使える標準機能は基本関数・`math`・`string`・`table` が中心で、任意のファイル読み込み、GPUアクセス、独自Undo APIはありません。`load`、`dofile`、`loadfile`、`collectgarbage`、`pcall`、`xpcall` も除かれています。

登録とアクションには、Lua命令を監視する2秒の実行制限があります。C++側の処理を強制中断するものではなく、重い処理を長時間回してよいという意味ではありません。これは悪意あるコードを安全に実行するためのプロセス隔離ではありません。

## DLLの構造を理解する {#native-plugin}

DLLはC ABIでホストとやり取りします。現在のSDKはAPI 3で、旧版向けのDLLに対しては3 → 2 → 1の順に初期化を試します。利用する機能が、指定したAPI版に存在することを確認してください。

| API | 登録するフィルター | 入力の考え方 |
| --- | --- | --- |
| 1 | `register_filter` | 基本の画像コールバック |
| 2 | `register_adjustable_filter` | 最大16個の浮動小数パラメーター |
| 3 | `register_gradient_filter` | 2〜16個のグラデーションストップ |
| 3 | `register_curve_filter` | RGB全体・R・G・Bの4カーブ。各2〜16点 |

### エントリーポイント

DLLは `hf_plugin_init(const HfHost*, HfPluginInfo*)` を、名前を変形せずエクスポートします。C++では `extern "C"` とSDKの `HF_EXPORT` を使います。戻り値0が初期化成功です。

初期化では `HfPluginInfo` に `api_version`、`name`、`author`、`version` を設定し、ホストの登録関数へコールバックを渡します。渡された `HfHost*` は初期化中だけ使い、後の処理のためにポインターを保持しないでください。フィルター名、コールバック、必要なデータは、処理時にも有効な寿命を持たせてください。

### 画像コールバック

基本の `HfFilterDesc` は `name`、`apply`、`user` を持ち、コールバックは `void apply(HfImage* image, void* user)` の形です。ホストは登録時に記述子をコピーします。`HfImage` は幅×高さ×4バイトの、行方向に連続したRGBA8画像です。画像の範囲内だけを書き換え、アルファを変更するかどうかも意図して決めます。`pixels` のポインターや `width`／`height` を差し替えず、渡されたバッファをその場で処理します。

SDKの構造体のメンバーや関数テーブルを推測して手書きせず、対応する公式ヘッダーを読み込んでください。画像のメモリを解放したり、コールバック後もポインターを保持したりしない設計から始めると、寿命の問題を避けやすくなります。

### 最小のCフィルター

ダウンロードに含まれる `guide_gray.c` は、RGBの単純平均を3色へ戻す小さな学習用フィルターです。アルファは変更しません。知覚上の輝度を厳密に計算する処理ではありません。

```c
#include <stddef.h>
#include "harmoflow_api.h"

static void grayscale(HfImage* image, void* user) {
    (void)user;
    for (size_t i = 0; i < (size_t)image->width * image->height; ++i) {
        uint8_t* pixel = image->pixels + i * 4;
        uint8_t value = (uint8_t)(((unsigned)pixel[0] + pixel[1] + pixel[2]) / 3);
        pixel[0] = pixel[1] = pixel[2] = value;
    }
}

HF_EXPORT int hf_plugin_init(const HfHost* host, HfPluginInfo* info) {
    if (!host || !info || host->api_version < 1 || !host->register_filter)
        return 1;
    info->api_version = 1;
    info->name = "Guide Grayscale";
    info->author = "Your name";
    info->version = "1.0";
    HfFilterDesc filter = {"Guide Grayscale", grayscale, NULL};
    host->register_filter(&filter);
    return 0;
}
```

このファイルはCとしてビルドします。C++へ書き換える場合は、エクスポート関数を `extern "C"` で宣言してください。SDKにない終了コールバックを想定したり、初期化で渡されたホストポインターを保持したりしないでください。

### プレビューと適用結果

独自のDLLフィルターは、最大512×512ピクセルのプレビュー画像に対しても呼ばれます。コールバックが「適用を押したときだけ」実行されると仮定せず、繰り返し呼ばれても問題ない画像処理にしてください。「適用」時はフル解像度で処理し、画像を持つFillレイヤーができます。独自DLLが自動的にパラメーター再編集可能な調整レイヤーになるわけではありません。

`Color Adjustment`、`Gradient Map`、`Tone Curve` は標準調整機能の識別に使われる名前です。独自フィルターに同じ名前を付けず、固有の名前を使います。標準搭載の3機能の操作は[調整機能のガイド](./adjustments.md)に分けて説明しています。

## DLLをビルドして試す {#build-native-plugin}

まず上の公式SDK ZIPを展開します。アプリ本体の開発環境一式を揃える必要はなく、単純な画像コールバックなら、SDKヘッダーとWindows x64用C/C++コンパイラーから始められます。

1. SDK ZIPを展開し、`harmoflow_api.h` と `guide_gray.c` があるフォルダーを開きます。
2. 最初は同梱サンプルを変更せずビルドし、その後フィルター名や画像処理を自分の目的に合わせて編集します。
3. x64用のコンパイラー環境で、共有ライブラリー（DLL）としてビルドします。Debug版の依存ランタイムが他のPCにもあると仮定しないでください。
4. 出力DLLに `hf_plugin_init` がエクスポートされていることを確認します。
5. テスト用シーンを保存し、[追加手順](./plugins.md#install-plugin)でDLLを読み込みます。管理画面の情報とプラグインメニューを両方確認します。**Guide Grayscale** を開き、BaseColorでプレビュー → キャンセル → 再度開く → 適用を試します。レイヤー、Undo／Redo、保存・再読込も確認します。
6. ソースを変更したらHarmoFlowを終了し、再ビルドしたDLLへ置き換えて再起動します。

Microsoftの**x64 Native Tools Command Prompt**で、ヘッダーとCサンプルを展開したフォルダーへ移動して実行します。コンパイラーのインストールやライセンスは、その開発ツールの提供元の案内に従ってください。

```bat
cl /nologo /LD /O2 /W4 /I . guide_gray.c /link /OUT:guide_gray.dll
dumpbin /exports guide_gray.dll
```

`dumpbin` の一覧に `hf_plugin_init` があれば、名前付きエクスポートを確認できています。DLLがHarmoFlowで実行できるかは、実際に読み込んで確認します。将来C++のソースを使う場合は、ビルド設定もC++向けに調整してください。

基本の `HfImage` コールバックだけを使うDLLでは、HarmoFlow本体のVulkan・ImGui・Luaを直接リンクする必要はありません。自分で追加した依存ライブラリーがある場合は、その配布条件と実行時の依存関係を別途確認してください。

## 配布前のチェックリスト {#plugin-test-checklist}

- **登録**：初回追加、アプリ再起動、同名ファイルや重複IDでの失敗を確認する
- **操作対象**：空の状態、モデルあり、複数パーツ、グループ内の選択で意図した対象へ作用する
- **繰り返し**：ボタンを連打・再実行しても、予期しない対象へ変更が及ばない
- **履歴**：Luaでは1アクションのUndo／Redo、エラー時の結果と選択の復旧を確認する
- **保存**：処理後のシーンを保存・再読込し、必要な結果が残ることを確認する
- **画像**：DLLでは小さい画像、異なる解像度、透明ピクセル、パラメーターの最小値・最大値を確認する
- **案内**：作者、版、対応HarmoFlow/API、導入先、操作手順、依存関係、既知の制限を添える

このガイドのコードは学習用の最小例です。CサンプルはLinux上でコンパイルとCPU処理（登録、画素変換、アルファ保持）、Lua例は構文と模擬APIでの動作を確認しています。Windows DLLの生成と実際のHarmoFlowでの動作確認は、この公開ガイド作成時には実施していません。使用するアプリ・SDK・開発環境で上の手順を検証してください。
