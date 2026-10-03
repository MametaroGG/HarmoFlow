# HarmoFlow website

HarmoFlow の製品紹介・操作ガイドを公開する Web サイトです。日本語・English・简体中文・한국어に対応しています。

公開先: https://mametarogg.github.io/HarmoFlow/

このリポジトリには Web サイトのソース、説明用画像・動画、公開ガイドを収録しています。Windows アプリ本体やインストーラーは含みません。購入・問い合わせは [豆々庵の BOOTH ショップ](https://mametarovv.booth.pm/)をご利用ください。

## ローカルで確認する

Node.js **24.19.0** を使用します。バージョンは `.nvmrc` に固定しています。

```sh
npm ci
npm run check
npm run preview
```

プレビュー URL: `http://localhost:4173/HarmoFlow/`

開発中は `npm run dev` を使用してください。`npm run build` の生成先は `docs/.vitepress/dist` です。生成物と `node_modules` はコミットしません。

## GitHub Pages

1. リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定します。
2. `main` ブランチへ変更を push します。
3. **Actions → Build and deploy HarmoFlow** の完了を確認します。

ワークフローは依存関係を lockfile からインストールし、ビルドとチェックに成功した場合だけ公開します。Pull request ではビルドとチェックのみ実行します。公開用の追加トークンやアカウント情報は不要です。

プロジェクト URL に合わせ、VitePress の `base` は `/HarmoFlow/` に設定しています。リポジトリ名や公開パスを変更する場合は `docs/.vitepress/config.mjs` とワークフローの `DOCS_BASE` を併せて見直してください。

## 構成

- `docs/site/`: 日本語ページ
- `docs/site/en/`, `zh/`, `ko/`: 翻訳ページ
- `docs/site/public/`: 共通画像、操作動画、図解、クレジット
- `docs/.vitepress/`: 設定、カスタムテーマ、翻訳辞書、検索データ
- `docs/scripts/`: 公開ページ・言語・メディア・リンクのチェック
- `.github/workflows/deploy.yml`: GitHub Pages のビルドと公開

ガイド記事は各言語の `help/` 内で編集します。記事の変更後は `npm run sync:help` で検索データを更新し、日本語の全体ガイドにも反映するときは `npm run sync:guide` を実行します。最後に `npm run check` で検証してください。

チェックでは 109 HTML ページ（404 を含む）、全言語のリンク、言語切り替え、共通アセット、8 本の操作動画、11 枚のキャプチャと2枚のメニュー画像、22記事のアンカー、動画再生制御、暫定の動作環境と注記の全言語表示を確認します。加えて、ローンチ動画がヒーロー内の動作環境の注記とレイヤーデモの間に一つだけ配置されること、ヘルプ一覧のコントラスト、検索・メニューのフォーカス復帰、パンくず、使用許諾契約のショップリンク、言語別 URL の相互参照も検証します。プラグイン導入・開発・標準調整の3記事、公式SDK ZIPと最小Cサンプルも収録しています。導入・更新、アセットの取得とキャッシュ、GPU復旧と問い合わせ、購入前FAQについても4言語のアンカー・リンクと公開範囲を検証します。書き出し時の上書き注意、パッケージの保存範囲、設定の確定操作、描画・プラグインの手順と画面上の名称についても、本文・生成ページ・検索データの一致を検証します。ブラウザ・実機での表示や動画再生の確認をすべて代替するものではありません。

## 権利・ライセンス

リポジトリの公開は、独自のソース、文章、画像、動画などに新しい再利用ライセンスを付与するものではありません。`package.json` の `UNLICENSED` は、このパッケージにオープンソースライセンスを付与していないことを示します。

- `LICENSE.txt` は、既存の HarmoFlow アプリの使用許諾契約をそのまま収録したものです
- Lucide の SVG アイコンのライセンスは `docs/.vitepress/theme/icons/LICENSE` および `docs/site/public/lucide-LICENSE.txt` を参照してください
- モデルの説明動画については `docs/site/public/graphics/model-movie/CREDITS.txt` を参照してください
- VitePress などの依存パッケージには、それぞれのライセンスが適用されます

## 参考

- [VitePress の公開ガイド](https://vitepress.dev/guide/deploy)
- [GitHub Pages のカスタムワークフロー](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

GitHub Actions は公式のリリースをフルコミット SHA で固定しています。バージョン名はワークフロー内のコメントを参照してください。公開権限は deploy ジョブに限定しています。
