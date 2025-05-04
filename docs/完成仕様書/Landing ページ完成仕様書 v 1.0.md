# Landing ページ完成仕様書 **v 1.0 — 2025‑05‑04 初版**

> 本書は「立体ポートフォリオ戦略 v 7.1」「ポートフォリオ構成仕様書 v 2.2」に準拠し、ポートフォリオの最上位レイヤ **Landing** の要件をフル定義する。抜粋無し・これ 1 冊で実装〜運用まで把握可能な Complete Edition。

---

## 1. 目的・ターゲット

| ペルソナ      | 所要時間       | 欲しい情報                | Landing が提供するもの           |
| --------- | ---------- | -------------------- | ------------------------- |
| 採用担当      | **5 秒**    | 何をやっている人か瞬時に掴みたい     | ヒーロー見出し・キャッチコピー・直感的 CTA   |
| 現場エンジニア   | 30 秒 ‑ 1 分 | 導線を探しやすいナビゲーション      | Navbar + Hero ボタン         |
| 学習者／未来の自分 | 1 分‑3 分    | 自己紹介・保有資格・学習ロードマップ概要 | Intro セクション・資格アコーディオン・CTA |

**Goal**: 「何のサイトか 5 秒で理解 → クリック 1 回で深掘りページへ」

---

## 2. ルーティング & ファイル構成

```
/                      (src/pages/index.astro)
```

* 親レイアウト: `layout: '@/layouts/Layout.astro'` で共通ヘッダー固定。
* 追加アセット: `landing.css`・`heading.css`・`hero.css` などテーマ CSS。

---

## 3. Atomic レイアウト

```text
Landing (index.astro)
│
├─ Layout          (organisms)  ※共通
│   └─ Navbar      (molecules)
│
├─ Hero            (organisms)
│   ├─ Heading (Atom)
│   ├─ SubHeading (Atom)
│   └─ CTA Button[] (molecules)
│
├─ Title & Catchcopy (Atoms)
│
├─ IntroCard       (organisms) ×2
│   ├─ SectionHeading (Atom)
│   └─ Body / List / Accordion (molecules)
│
└─ ButtonGroup     (molecules)
```

> Hero 内 CTA とページ下部 ButtonGroup は**同等アクション**を提供し、どこからでも Structure / Proof へ遷移できる UX を担保。

---

## 4. コンポーネント仕様

| 名称              | Props                              | 説明                                    | 実装状況                  |
| --------------- | ---------------------------------- | ------------------------------------- | --------------------- |
| **Hero**        | `title`, `subtitle`                | ページ最上部、グラデ背景上に大見出し                    | ✅ 実装済 (hero.css)      |
| **Button**      | `variant: primary\|ghost`, `href`  | CTA & 汎用ボタン                           | ✅ 実装済                 |
| **Navbar**      | —                                  | サイト横断ナビ (`Structure / Proof / Story`) | ✅ 実装済                 |
| **IntroCard**   | `heading`, `body`                  | 自己紹介 / 資格一覧カード                        | ✅ 実装済 (`intro` クラス)   |
| **Accordion**   | 原生 `<input type="checkbox">` + ラベル | 資格の詳細折りたたみ                            | ✅ 実装済 (accordion.css) |
| **ButtonGroup** | —                                  | ページ最下部 CTA 二重化                        | ✅                     |

---

## 5. スタイル指針

| トークン                 | 用途           | 色 (例)                             |
| -------------------- | ------------ | --------------------------------- |
| `--bg-start/mid/end` | ページ背景グラデーション | `#0d1b2a` → `#162d46` → `#0a2540` |
| `--text`             | 基本文字         | `#e0e7ff`                         |
| `--accent`           | 見出し・ボタン強調    | `#61dafb`                         |
| `--card-bg`          | カード背景        | `#112240`                         |
| `--card-accent`      | カード見出し       | `#64ffda`                         |

* `landing.css` で `gradientShift` アニメを定義、Hero\~Footer で共通背景。
* ボタンは `ghost` (アウトライン) と `primary` (塗り) の 2 バリアントのみ。

---

## 6. Front‑matter (index.astro)

```yaml
---
layout: '@/layouts/Layout.astro'
title: 'KWSTYK Portfolio'
---
```

> **タイトル**は `<Layout>` の `<title>` タグに渡し、SEO 上もトップページ専用タイトルに設定。

---

## 7. 完了チェックリスト

* [x] Navbar が全ページ共通で 1 個だけ描画
* [x] Hero のタイトル・サブタイトル・CTA が中央揃えでレスポンシブ対応
* [x] 背景グラデーションが `landing.css` に従いアニメーション
* [x] Intro セクション内のアコーディオンがクリックで展開／閉じ
* [x] 全 CTA ボタンが `/structure` / `/proof` に遷移
* [x] ページ下部の ButtonGroup はモバイル折返し対応
* [ ] meta description と OG 画像を自動生成（★ v1.1 TODO）

---

## 8. 妥協点・改善タスク (優先度付)

| Priority | 項目             | 現状     | 対応方針                           |
| -------- | -------------- | ------ | ------------------------------ |
| ★★★      | SEO meta 自動化   | 固定文    | `seo.ts` util で自動生成            |
| ★★☆      | OG 画像          | 無し     | `@vercel/og` で動的生成             |
| ★★☆      | Hero Asciinema | 未導入    | `demo.svg` or 動画で差替え           |
| ★★☆      | アコーディオン anim   | CSS 数行 | `details/summary` 置換検討         |
| ★☆☆      | ライトモード         | 非対応    | カラートークン変数 + `dark:` suffix で切替 |

---

## 9. 運用フロー

1. キャッチコピー変更 → `index.astro` 直編集（30 秒以内）
2. 資格 / 経歴追加 → IntroCard 内のリストを編集＋`accordion` 追加
3. SEO 文言更新 → `seo.ts` か Front‑matter で `description` 更新
4. CI (`ci.yml`) で Lint/Typecheck → GitHub Pages／Vercel に自動デプロイ

---

## 10. 今後の拡張ロードマップ（Landing）

| バージョン | 追加機能          | 概要                        |
| ----- | ------------- | ------------------------- |
| v1.1  | SEO 自動化 + OG  | `seo.ts` & Vercel OG 画像生成 |
| v1.2  | Hero 3D Cover | Three.js ベースの軽量背景アニメ      |
| v1.3  | ライト / ダーク自動切替 | `prefers-color-scheme` 検知 |

---

> **Done is better than perfect.** まずは “分かりやすく誘導しやすい” を満たし、徐々にリッチ化していく。
