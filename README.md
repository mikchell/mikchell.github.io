# mikchell.github.io

ポートフォリオサイト。<https://mikchell.github.io> で公開しています。

## コンセプト

白地に極細線で構成した「ネットワーク図」。全画面に常駐する canvas がノードとエッジを描き、
スクロール速度が網の流れに変換されます。各セクションのカードもネットワーク上のノードとして
背景の網と線で結ばれ、ページ全体がひと続きのネットワークとして見えるようにしています。

## 構成

ビルド不要の静的サイトです。`main` への push がそのまま GitHub Pages へ反映されます。

```
index.html      マークアップ
styles.css      スタイル（デザイントークンは :root にまとめています）
data.js         ★ 掲載内容。基本はこのファイルだけを編集します
js/
  main.js         エントリポイント
  sections.js     data.js から各セクションの DOM を組み立てる
  network.js      背景ネットワークの描画エンジン
  interactions.js スクロール・カーソル連動の UI 挙動
images/         画像
```

JavaScript はネイティブの ES Modules で読み込んでいるため、バンドラやパッケージ管理は不要です。

## 掲載内容の更新

`data.js` の各配列を編集します。

| 変数 | 内容 |
| --- | --- |
| `ABOUT` | 自己紹介文とリンク |
| `WORKS` | 制作物 |
| `ARTICLES` | 執筆記事 |
| `ARCHIVES` | 受賞・登壇・インターンなどの記録 |
| `CAREER` | 経歴年表 |
| `FOOTER_LINKS` | SNS リンク（ヘッダーとフッターに表示。`url` が空のものは非表示） |

`ARCHIVES` の `category` は自由記述で、そこに現れた値がそのまま絞り込みボタンになります。

## ローカルでの確認

ES Modules を使うため `file://` では動きません。簡易サーバー経由で開いてください。

```sh
python3 -m http.server 4173
# http://localhost:4173
```

## 配色の変更

アクセントカラーは `styles.css` の `:root` にある 2 つの変数だけで決まります。
canvas の描画色も同じ値を読んでいるため、ここを書き換えるとサイト全体に反映されます。

```css
--accent:     #2563eb;
--accent-rgb: 37, 99, 235;
```
