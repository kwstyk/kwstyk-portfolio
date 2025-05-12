# Proof ページ完成仕様書 **v 1.5 — 2025-05-12 統合改訂版**

> **準拠ドキュメント**
> ・立体ポートフォリオ戦略 v 7.1&#x20;
> ・ポートフォリオ構成仕様書 v 2.2&#x20;
> ・Proof ページ完成仕様書 v 1.4（前版）&#x20;
> ・Proof Index ページ完成仕様書 v 1.0（本版に吸収）

---

## 0. 本書の位置づけ

| レイヤ       | 深度 | 使命                  | 本仕様で定義する範囲                                                            |
| --------- | -- | ------------------- | --------------------------------------------------------------------- |
| **Proof** | 3  | “技術検証ラボ” を公開し再現性を担保 | `/proof/index`（一覧）から `/proof/{category}/{slug}`（詳細）まで、UX・データ・CI をフル定義 |

> **Goal**: 採用担当 15 秒／現場エンジニア 3 分／未来の自分 10 分 で目的の Proof に到達し、再現できる。

---

## 1. ペルソナ別 UX

| ペルソナ       | 所要時間     | 欲しい情報         | Proof が提供するもの               |
| ---------- | -------- | ------------- | --------------------------- |
| 採用担当       | **15 秒** | 手を動かす深度の俯瞰    | Hero Stats＋難易度ヒートマップ        |
| 現場エンジニア    | 1–3 分    | 該当 PoC を素早く発見 | FilterBar & 検索 & Pagination |
| 学習者／未来の自分  | 5–10 分   | 学習ロードマップ組込    | 進捗率メータ＋未完リスト                |
| OSS コミュニティ | 随時       | Fork／Issue 入口 | GitHub 直リンク & README badge  |

---

## 2. ルーティング & ファイル階層

```
/proof/                       ← 一覧 (index.astro)
/proof/[category]/[slug]/     ← 詳細 (動的 MDX)
```

* **親レイアウト** `@/layouts/Layout.astro` を全ページで使用。
* 静的生成: `astro:content` コレクションからメタデータを取得し `getStaticPaths()` で構築。

---

## 3. データモデル

### 3.1 Front-matter (詳細ページ)&#x20;

```yaml
---
slug: "network-security/packet-capture"
difficulty: easy                # easy|medium|hard|expert
repro: ["docker"]               # docker|terraform|vagrant|manual
stack: ["docker","tcpdump"]
updated: 2025-05-01
tags: ["pcap","wireshark"]
ci_status: "https://…/badge.svg"   # optional
stories: ["zenn-123"]              # optional
why_md: "./why.md"                 # optional
---
```

### 3.2 ProofSummary (一覧ページ)

```ts
interface ProofSummary {
  slug: string;          // "network-security/packet-capture"
  category: string;      // derived
  title: string;         // derived
  difficulty: 'easy'|'medium'|'hard'|'expert';
  repro: ('docker'|'terraform'|'vagrant'|'manual')[];
  updated: string;       // ISO8601
  tags?: string[];
}
```

Build 時に `allProofs`, カテゴリ別件数、難易度別件数を reduce し Hero に渡す。

---

## 4. Atomic レイアウト

### 4.1 `/proof/index.astro`（一覧）

```text
Hero
│ ├─ Heading "Proof"
│ ├─ SubHeading "再現性のある技術検証ラボ"
│ └─ StatsBar (件数 / カテゴリ数 / 完了率)
FilterBar       ★v1.1 完全版予定
ProofCardGrid
│ └─ ProofCard × N
Pagination      (12 件 / page)
```

* **FilterBar**: Category multi-select, Difficulty toggle, Repro checkbox, SearchInput (`?q=`同期)。
* **ProofCard** Props: `href, title, category, difficulty, repro[], updated, tags?`。ホバーで `scale-105` と `shadow-lg`。
* **Pagination**: クエリパラメータ `?page=` を URL に保持。

### 4.2 `/proof/[category]/[slug].astro`（詳細）&#x20;

```text
ProofHero
ProofMetaCard
ProofBody (MDX <slot/>)
│ ├─ Alert (Prerequisites)
│ ├─ CopyBlock (How to Reproduce)
│ └─ markdown sections
RelatedStories   (stories[] リンク)
```

---

## 5. コンポーネント仕様

| Component         | Props                                            | 機能 / UI          | 実装状況         |
| ----------------- | ------------------------------------------------ | ---------------- | ------------ |
| **ProofHero**     | `title, difficulty, repro[], stack[], ciStatus?` | 見出し + バッジ列       | ✅            |
| **ProofMetaCard** | `updated, tags?`                                 | 日付＋タグ行           | ✅            |
| **CopyBlock**     | `lang, code`                                     | コピーボタン付き `<pre>` | ❌ 未実装            |
| **Alert**         | `type: info\|warn\|error`                        | 色分けボックス          | ❌ 未実装            |
| **ProofCard**     | see 4.1                                          | 一覧カード            | ✅            |
| **FilterBar**     | see 4.1                                          | AND 絞り込み         | ✅ (v1.0 MVP) |
| **StatsBar**      | `total, doneRate, categories`                    | Hero 内数値         | ❌ 未実装            |

Tailwind safelist には `bg-{category}` & 難易度色 (`bg-green-500` ほか) を追加。

---

## 6. スタイル・カラートークン

| Token                                         | 用途         | 値 (例)                                         |
| --------------------------------------------- | ---------- | --------------------------------------------- |
| `--proof-bg`                                  | Proof 全体背景 | `#0d1117`                                     |
| `--proof-card`                                | カード背景      | `#112240`                                     |
| `--proof-border`                              | カード枠       | `#1e314f`                                     |
| `--easy` / `--medium` / `--hard` / `--expert` | 難易度バッジ     | `#22c55e` / `#eab308` / `#f97316` / `#dc2626` |
Tailwind safelist に bg-{category}＋難易度色を追加
---

## 7. SEO & OGP

| ページ    | `<title>`                  | `<meta name="description">`                       | OG 画像                                |                      |
| ------ | -------------------------- | ------------------------------------------------- | ------------------------------------ | -------------------- |
| /proof | `Proof – KWSTYK Portfolio` | 「Docker から Terraform まで再現可能な技術検証ラボをカテゴリ別・難易度別に公開」 | Vercel OG：中央 “Proof” ロゴ + カテゴリ絵文字    |                      |
| 詳細     | \`Proof                    | {title}\`                                         | Front-matter `summary` (fallback 上記) | Vercel OG：Hero をサムネ化 |

JSON-LD `ItemList` を `/proof` に埋め込み（最大 100 件）。

---

## 8. CI / 品質ゲート

| Workflow         | チェック                                                | 合格基準            |
| ---------------- | --------------------------------------------------- | --------------- |
| **ci.yml**       | Lint / TypeCheck / Astro build                      | exit 0          |
| **proof-ci.yml** | Docker/Vagrant build & Trivy                        | Critical/High 0 |
| **nightly.yml**  | Lighthouse (Performance ≥ 95, SEO ≥ 90) / dead-link | pass            |
| **Vitest**       | FilterBar ロジック / Utility                            | 全テスト緑           |

---

## 9. 完了チェックリスト（v 1.5 現状）

| 項目                                                       | 状態 |
| -------------------------------------------------------- | -- |
| `allProofs` 取得 & 404 無し                                  | ✅  |
| Hero Stats & ProgressRing                                | ✅  |
| ProofCard 難易度・repro・カテゴリ色                                | ✅  |
| FilterBar 多条件 AND 絞り込み                                   | ✅  |
| URL パラメータ同期（q, cat, diff, repro, page）                   | ✅  |
| Pagination 12 件 / page                                   | ✅  |
| Lighthouse CI Desktop LCP < 2.5 s / Perf ≥ 95 / SEO ≥ 90 | ✅  |
| Vitest ユニットテスト緑                                          | ✅  |

---

## 10. 今後のロードマップ

| バージョン     | 追加機能                     | 概要                              |
| --------- | ------------------------ | ------------------------------- |
| **v 1.6** | CopyBlock・Alert・StatsBar | コンポーネント未完機能を実装                  |
| **v 1.7** | InfiniteScroll トグル       | Pagination ↔ Infinite scroll 切替 |
| **v 1.8** | 難易度ヒートマップ                | D3.js で分布可視化                    |
| **v 1.9** | “未完 (WIP)” タブ            | `progress < 100` の抽出            |
| **v 2.0** | CMS/API 化                | GitHub GraphQL → 動的取得           |

---

## 11. 運用フロー

1. **Proof 追加**: `src/content/proofs/*.mdx` を作成 → Front-matter 自動検証。
2. PR → `ci.yml` & `proof-ci.yml` が通過 → Merge。
3. Nightly で Lighthouse / Trivy / link-check → Slack 通知。

---

### **Done is better than perfect — and Reproducible is even better.**

本仕様で Proof レイヤは「一覧性 × 探索性 × 再現性」を高水準で両立し、サイト訪問者を 3 クリック以内に “動くラボ” へ導く。
