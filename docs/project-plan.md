# git基礎
1. Issueを作って自分のタスクを登録する
2. developブランチにて```git pull```を実行
3. ```git switch -c ブランチ名```で追加機能用のブランチを作成、移動
4. 追加機能作成
5. ```git add .```で修正したファイルをgitに指示する（ステージング）
6. ```git commit -m "変更内容に関するメッセージ"```でステージングしたファイルの内容をgitに指示する
7. ```git push origin ブランチ名```でリモートリポジトリへ一連の作業内容を保存
8. developブランチへプルリクエストを作成する
9. プルリクエストに対するレビューをしてもらう
10. developブランチへマージする

# Team Development Guidelines

このドキュメントは、初心者チーム開発をスムーズに進めるためのルールと方針をまとめたものです。

---

## 1. ゴールとスコープ

### MVP（最低限実装する機能）
- おみくじ機能
- 開発者についてのページ
- おみくじについてのページ

---

## 2. ブランチ運用ルール

### ブランチの役割
- `main`：完成版・安定版（基本触らない）
- `develop`：開発の統合先（デフォルトブランチ）
- `feature/xxx`：各メンバーの作業ブランチの命名方式

### 開発の基本フロー
1. developを最新にする&pull
2. featureブランチを作成
3. 作業する
4. PRを作成する
5. Review後にdevelopへmergeする

---

## 3. Pull Request（PR）ルール

### PR作成時のルール
- PRの取り込み先（base）は必ず `develop`
- Reviewerを最低1人以上つける
- PR作成者は原則mergeしない

---

## 4. Issue運用ルール

- 1 Issue = 1 PR を基本とします
- Issueは小さく分割して作成します
- 作業前に必ずIssueで担当を明確にします

---

# フォルダ構成
## 📁 原稿のフォルダ構成

現在の原稿（リポジトリ）のフォルダ構成は以下です。

```text
project/
├── README.md                 # プロジェクト概要・セットアップ手順
├── docs/
│   └── project-plan.md       # 本ドキュメント
└── src/
    ├── index.html            # トップページ
    ├── assets/               # 画像素材
    │   ├── omikuji_box.png
    │   ├── omikuji_chuukichi.png
    │   ├── omikuji_daikichi.png
    │   ├── omikuji_daikyou.png
    │   ├── omikuji_hole.png
    │   ├── omikuji_kichi.png
    │   ├── omikuji_kyou.png
    │   ├── omikuji_stick.png
    │   ├── omikuji_suekichi.png
    │   └── omikuji_syoukichi.png
    ├── pages/
    │   ├── about.html
    │   └── developers.html
    ├── scripts/
    │   └── main.js
    └── styles/
        └── main.css
```

---

# 命名規則
## 🏷️ 開発時の命名ルール

チーム内で表記ゆれを防ぐため、以下の命名規則を統一します。

### 1. ブランチ名
- 機能追加: `feature/機能名`
- 単語は `kebab-case`（小文字 + ハイフン）で記述する  
  例: `feature/omikuji-result-page`

### 2. ファイル名
- HTML/CSS/JSファイルは `kebab-case` を使用する
- 役割が分かる名前をつける  
  例: `developers.html`, `main.css`, `main.js`

### 3. CSSのクラス名・ID名
- クラス名は `kebab-case` を使用する  
  例: `.result-card`, `.draw-button`
- ID名は最小限にし、必要な場合のみ使用する  
  例: `#omikuji-result`

### 4. JavaScriptの命名
- 変数名・関数名は `camelCase` を使用する  
  例: `drawResult`, `resultImage`
- 定数は `UPPER_SNAKE_CASE` を使用する  
  例: `RESULT_LIST`

