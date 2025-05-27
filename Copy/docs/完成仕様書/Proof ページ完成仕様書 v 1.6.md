# Proof ページ完成仕様書 **v 1.6 — 2025‑05‑23 更新版**

> **準拠ドキュメント**
> ・立体ポートフォリオ戦略 v 8.0
> ・ポートフォリオ構成仕様書 v 2.3
> ・Proof ページ完成仕様書 v 1.5（前版）

---

## 0. 本書の位置づけ

| レイヤ       | 深度 | 使命                  | 本仕様で定義する範囲                                                           |
| --------- | -- | ------------------- | -------------------------------------------------------------------- |
| **Proof** | 3  | “技術検証ラボ” を公開し再現性を担保 | `/proof/index`（一覧）〜 `/proof/{category}/{slug}`（詳細）まで、UX・データ・CI をフル定義 |

> **Goal** : 採用担当 15 秒／現場エンジニア 3 分／未来の自分 10 分 で目的の Proof に到達し、再現できる。

---

## 1. 変更概要（v 1.5 → v 1.6）

| 区分                | 変更点                                                                  | 理由                            |
| ----------------- | -------------------------------------------------------------------- | ----------------------------- |
| **Markdown 処理**   | remark‑directive 系プラグインを廃止し、純粋な Markdown＋HTML へ移行                    | ディレクティブのパース不具合を根本回避し、ビルド依存を削減 |
| **Alert**         | `<div class="…">` + Tailwind で実装                                     | プラグイン不要化・スタイル統一               |
| **CopyBlock**     | ProofPageTemplate にインライン Script を追加し、`<pre><code>` を走査して Copy ボタンを付与 | コンテンツ側は通常のコードフェンスだけで済むように改善   |
| **DirectoryTree** | Markdown に `<pre>` で手書き → CSS で装飾                                    | プラグイン不要・コピー対象外                |
| **見出し下線**         | Proof ページのみ `&[_h2]:border-b …` の Tailwind arbitrary selector で実装    | 一覧や他レイヤに影響せず視認性アップ            |
| **プラグイン整理**       | remark-copyblock / remark-alert / rehype-copy-button をリポジトリから削除      | 上記の代替実装で役割を吸収したため             |

---

## 2. ルーティング & ファイル階層（変更なし）

```
/proof/                       ← 一覧 (index.astro)
/proof/[category]/[slug]/     ← 詳細 (動的 .md)
```

* Content Collections は `.md` のみ。`.mdx` は廃止。
* `getStaticPaths()` でビルド時に静的生成。

---

## 3. データモデル（変更なし）

<同 v 1.5 の定義を継続>

---

## 4. Atomic レイアウト

### 4.1 `/proof/index.astro`

* 変更なし（FilterBar, ProofCardGrid, Pagination など v 1.5 準拠）

### 4.2 `/proof/[category]/[slug].astro`

```
ProofHero
ProofMetaCard
ProofBody (<slot/>)
│ ├─ Alert (HTML+Tailwind)
│ ├─ CopyBlock (pre>code + Copy ボタン)
│ └─ DirectoryTree (<pre> 手書き)
RelatedStories  (任意)
```

* `<article class="prose prose-invert [&_h2]:border-b [&_h2]:border-gray-600 [&_h2]:pb-2 [&_h2]:mb-4 …">` で見出し下線を実装。
* インライン Script が `<pre><code>` を対象に Copy ボタンを差し込み、DirectoryTree（`<pre>` 単体）には付与されない。

---

## 5. コンポーネント実装状況

| Component     | v 1.5 | v 1.6             | 備考          |
| ------------- | ----- | ----------------- | ----------- |
| ProofHero     | ✅     | ✅                 | 変更なし        |
| ProofMetaCard | ✅     | ✅                 | 変更なし        |
| **CopyBlock** | ❌     | ✅ (inline JS)     | プラグイン依存廃止   |
| **Alert**     | ❌     | ✅ (HTML+Tailwind) | プラグイン依存廃止   |
| DirectoryTree | —     | ✅ (HTML+Tailwind) | 新規          |
| StatsBar      | ❌     | ❌                 | 次バージョンで実装予定 |

---

## 6. スタイル / カラートークン（追加）

| クラス / Token       | 用途                                                                  |
| ----------------- | ------------------------------------------------------------------- |
| `.copy-button`    | CopyBlock の右上ボタン（Tailwind `bg-gray-700 text-white text-xs rounded`） |
| `&[_h2]:border-b` | Proof ページ専用の見出し下線                                                   |

---

## 7. CI / 品質ゲート

| Workflow     | チェック                                     | 合格基準   |
| ------------ | ---------------------------------------- | ------ |
| ci.yml       | ESLint / TypeCheck / Astro build         | exit 0 |
| proof-ci.yml | Docker build & Trivy (Critical/High = 0) | pass   |
| pages.yml    | GitHub Pages Deploy                      | exit 0 |

※ remark 系プラグインが減ったため、CI 時間は約 20 % 短縮。

---

## 8. ロードマップ更新

| バージョン     | 追加機能 or 変更         | 概要                         |
| --------- | ------------------ | -------------------------- |
| **v 1.7** | StatsBar 完成        | Home Hero に完了率・カテゴリ数などを可視化 |
| **v 1.8** | InfiniteScroll トグル | Pagination↔無限スクロールを切替      |
| **v 1.9** | 難易度ヒートマップ          | D3.js で分布を表示               |
| **v 2.0** | CMS/API 化          | GitHub GraphQL から動的取得      |

---

### **Done is better than perfect — Reproducible is even better.**

v 1.6 では「プラグイン地獄」から脱却し、Markdown と Tailwind だけで **Alert／CopyBlock／DirectoryTree** を再現。依存簡素化と UX 向上を同時に達成した。
