# Omikuji Web App

小規模チームで開発しているブラウザ向けおみくじアプリです。
HTML / CSS / Vanilla JavaScript で実装しています。

## 概要

- 「おみくじを引く」ボタンで結果を表示
- 結果表示前にアニメーションを実行
  - おみくじ箱を振る
  - 棒が穴から出る
  - 結果表示エリアへ切り替える
- 結果に応じた追加演出
  - 大吉: 紙吹雪
  - 凶 / 大凶: フラッシュ

## リポジトリ構成

```text
project/
  README.md
  docs/
    project-plan.md
  index.html
  src/
    pages/
      about.html
      developers.html
    assets/
      omikuji_box.png
      omikuji_hole.png
      omikuji_stick.png
      omikuji_daikichi.png
      omikuji_kichi.png
      omikuji_chuukichi.png
      omikuji_syoukichi.png
      omikuji_suekichi.png
      omikuji_kyou.png
      omikuji_daikyou.png
    styles/
      main.css
    scripts/
      main.js
```

## アニメーション設計

### レイヤー順

- hole（前面）
- stick（中間）
- box（背面）

### 素材の役割

- `omikuji_box.png`: ベースの箱
- `omikuji_stick.png`: アニメーション対象
- `omikuji_hole.png`: 棒の根元を隠すオーバーレイ

### フロー

- ボタンクリック
- `boxShake`
- `stickRise`
- `resultDelay` 後に結果表示

アニメーション制御は CSS Animation と JavaScript の状態遷移（`is-shaking` / `is-stick-rising` / `is-waiting-result`）で実装しています。

## ブランチ戦略

- `main`: 本番相当の安定ブランチ
- `develop`: 開発統合ブランチ
- `feature/*`: 個別作業ブランチ

例:

- `feature/result-screen`
- `feature/omikuji-animation`
- `feature/about-page`

## セットアップ

- リポジトリをクローン
- `index.html` をブラウザで開く

ビルドツールやフレームワークは使っていません。

## 開発ルール

- `main` へ直接コミットしない
- 変更は Pull Request で取り込む
- コミットは小さく分ける
- コミットメッセージは変更内容が分かる文にする

## 今後の改善候補

- 効果音の追加
- アニメーションバリエーションの追加
- モバイル表示と操作性の改善
