## Cafe Morivela

ナチュラルで落ち着いた雰囲気の架空のカフェ「Cafe Morivela」の公式サイト（静的サイト）です。WordPress オリジナルテーマ化のための制作物です。

### 特徴

- **静的 HTML/CSS/JS 構成**（ビルド不要、即時プレビュー可能）
- **SCSS** を利用し、`sass` で `style.css` を生成
- WordPress テーマ化を想定したページ／コンポーネント分割

---

## ディレクトリ構成

```text
.
├── 404.html
├── about.html
├── access.html
├── index.html
├── menu-detail.html
├── news-detail.html
├── news.html
├── images/
│   ├── about/
│   ├── access/
│   ├── common/
│   ├── menu/
│   ├── news/
│   └── top/
├── javascripts/
│   └── common.js
├── stylesheets/
│   ├── normalize.css
│   ├── style.css            # SCSS から生成
│   ├── style.css.map        # ソースマップ
│   └── scss/
│       ├── abstracts/       # 変数・関数・mixin
│       ├── base/            # ベーススタイル
│       ├── components/      # コンポーネント（ボタン等）
│       ├── layout/          # ヘッダー/フッター
│       ├── pages/           # 各ページ固有のスタイル
│       └── style.scss       # エントリーポイント
├── package.json
└── package-lock.json
```

---

## 必要環境

- Node.js 18 以上（推奨）
- npm 9 以上（推奨）

ローカル HTTP サーバは任意です（例: VS Code の Live Server、`python -m http.server` など）。

---

## セットアップ

```bash
npm install
```

初回セットアップ後、SCSS をウォッチして CSS を自動生成します。

```bash
npm run sass
```

- スクリプトの内容: `sass --watch stylesheets/scss:stylesheets --style=expanded`
- 一度だけビルドしたい場合（ウォッチ不要）:

```bash
npx sass stylesheets/scss:stylesheets --style=expanded
```

---

## 開発フロー

1. `npm run sass` を実行して SCSS をウォッチ
2. 任意のローカルサーバで `index.html` をプレビュー
   - 例（Python）: `python -m http.server 8080`
   - 例（VS Code）: 拡張機能 Live Server を使用
3. `stylesheets/scss/` 配下を編集 → `stylesheets/style.css` が自動更新
4. `javascripts/common.js` に振る舞いを追加/修正

必要に応じて Stylelint を使った SCSS の静的検査も可能です（設定済み）。

```bash
npx stylelint "stylesheets/scss/**/*.scss"
```

---

## ページ一覧

- `index.html`（トップ）
- `about.html`（私たちについて）
- `access.html`（アクセス）
- `menu-detail.html`（メニュー詳細）
- `news.html`（ニュース一覧）
- `news-detail.html`（ニュース詳細）
- `404.html`（エラーページ）

---

## WordPress テーマ化の想定

将来的に以下の対応を行う前提で設計しています。

- テンプレート分割:
  - `header.php` / `footer.php` へ共通レイアウトを抽出
  - `index.php`, `front-page.php`, `page-about.php`, `single.php`, `archive.php`, `404.php` などへマッピング
- アセットの読み込み: `functions.php` で `wp_enqueue_style` / `wp_enqueue_script`
- 画像パスの相対化・`get_template_directory_uri()` 利用
- ニュース（投稿）: カスタム投稿タイプ化の検討、または標準 `post` のテンプレート整備
- ページビルド不要の SCSS 構成は維持（`sass` は外部ツールで生成）

---

## スクリプト一覧

`package.json` より抜粋:

```json
{
  "scripts": {
    "sass": "sass --watch stylesheets/scss:stylesheets --style=expanded"
  },
  "devDependencies": {
    "sass": "^1.93.2",
    "stylelint": "^16.25.0",
    "stylelint-config-prettier-scss": "^1.0.0",
    "stylelint-config-property-sort-order-smacss": "^10.0.0",
    "stylelint-config-standard-scss": "^16.0.0"
  }
}
```

---

## ライセンス

本リポジトリは **ISC License** です。詳細は `package.json` を参照してください。

---

## 作者

tsunadog
