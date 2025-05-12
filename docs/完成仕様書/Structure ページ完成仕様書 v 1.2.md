# Structure ページ完成仕様書 **v 1.2 — 2025-05-12 改訂版**

*(v 1.1 を全面更新。現状の実装・進捗・今後のロードマップを 1 冊に統合した **Complete Edition**)*

---

## 1. 目的・役割

| ペルソナ           | 所要 time | 欲しい情報               | Structure が提供するもの                                  |
| -------------- | ------- | ------------------- | -------------------------------------------------- |
| **採用担当**       | 5 秒     | スキル領域の俯瞰            | カテゴリ一覧カード + 絵文字アイコン + 状態バッジ                        |
| **現場エンジニア**    | 1 分     | 領域ごとの深度・最新／人気 Proof | 詳細ページで Intro + 最新5件・人気5件 + 全 Proof グリッド            |
| **学習者／未来の自分**  | 3 分     | 学習ロードマップへの組込み可否     | Intro (Mermaid 相関図) + ProofList + Story 連携 (次フェーズ) |
| **OSS コミュニティ** | 随時      | Issue / PR を投げる導線   | Card → カテゴリ GitHub 連携 (v 1.3 予定)                   |

---

## 2. ルーティング & ページ階層

```
/structure/                 → 一覧 (index.astro)
/structure/[slug]/          → カテゴリ詳細
例: /structure/network-security/
```

* 静的生成 (`astro build`)：`getStaticPaths()` で `categories.json` を map
* カスタム 404 (`/structure/404`) は v 1.3 で実装

---

## 3. データモデル

### 3.1 `categories.json`

```jsonc
{
  "id": "network-security",
  "slug": "network-security",
  "title": "ネットワークセキュリティ",
  "description": "安全な通信と監視体制を確立するための実践",
  "icon": "🛡️",
  "badge": "執筆中",
  "badgeColorClass": "bg-gray-500",
  "color": "#0ea5e9"
}
```

* **Zod** でスキーマ検証 (`utils/schema/category.ts`)
* CI (`ci.yml`) で JSON 破損時はブロック

### 3.2 Intro Markdown (`src/content/descriptions/structure/*/intro.md`)

* slug ごとに 1 枚配置
* **front-matter** optional (`title/description/updated`)
* 詳細ページで `Astro.renderMarkdown()` により埋め込み表示
* Mermaid 図 OK（rehype/prism 済み）

### 3.3 Proof コレクション (参照のみ)

* `astro:content` の `proofs` コレクションから

  * 件数カウント (`entries.length`)
  * 最新 5 件・人気 5 件抽出（views フィールド）

---

## 4. Atomic レイアウト構成

### 4.1 `/structure/index.astro`

```
Layout (page-background)
└─ Hero                 … title="Structure"
   └─ CardGrid
        └─ Card (category) × N   … categories.json map
```

### 4.2 `/structure/[slug].astro`

```
Layout
├─ Header  … アイコン+タイトル+説明+件数
├─ Intro   … intro.md → Markdown (Mermaid 可)
├─ ProofList type="latest"  (SmallProofCard × up to 5)
├─ ProofList type="popular" (SmallProofCard × up to 5)
└─ Large CardGrid  (全 Proof)
```

---

## 5. コンポーネント仕様

| Component            | 主要 Props                                        | 進捗 | メモ                                                      |
| -------------------- | ----------------------------------------------- | -- | ------------------------------------------------------- |
| **Card** (一覧)        | `title, description, href, icon, badge, color?` | ✅  | `card-base` + `flex-col h-full justify-between`／バッジ下寄せ済 |
| **ProofList**        | `categorySlug, type='latest\|popular', count`   | ✅  | `.map` → `SmallProofCard` グリッド（3 列 / wrap）              |
| **SmallProofCard**   | `title, href, difficulty?, updated?`            | ✅  | `card-base` + 固定幅 300 px／hover shadow                   |
| **Intro (Markdown)** | n/a                                             | ✅  | `descriptions/structure/*/intro.md` を動的読込               |
| **MermaidEmbed**     | code string                                     | ★  | rehype-mermaid で v 1.3 導入予定                             |

---

## 6. スタイル指針

| トークン                 | 用途              | 値 (例)       |
| -------------------- | --------------- | ----------- |
| `--bg-start/mid/end` | Structure 背景グラデ | `#0d1b2a`\~ |
| `--card-bg`          | Card 背景（暗）      | `#112240`   |
| `--border`           | Card 枠線         | `#233554`   |

### 6.1 `card-base` (Tailwind plugin)

```css
.card-base {
  @apply bg-gradient-to-br from-slate-800 to-slate-900/70
         border border-slate-600/40
         rounded-2xl shadow-md hover:shadow-lg
         transition-colors duration-200;
}
```

### 6.2 Grid & Flex 揃え

```css
.card-grid {
  @apply grid gap-8 mt-8
         grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
         items-stretch;
}
.card-grid > a { /* Large Card */
  @apply h-full;
}
```

---

## 7. 完了チェックリスト (v 1.2)

* [x] Card 一覧（高さ揃え・バッジ下寄せ）
* [x] categories.json → index 自動生成
* [x] Intro markdown 反映 (descriptions/structure)
* [x] ProofList latest / popular (SmallProofCard)
* [x] Tailwind safelist バッジ色 (`bg-gray-500` など)
* [x] card-grid `items-stretch` ＆ `h-full` 適用
* [ ] Mermaid rehype プラグイン（v 1.3）
* [ ] Story 連携バッジ (最新 Story 3 件)（v 1.4）
* [ ] 動的 OG 画像 (`/api/og?title=Structure|{title}`)（v 1.4）

---

## 8. CI / Typecheck ゲート (Structure 関連)

| ステップ                  | 失敗条件                                    |
| --------------------- | --------------------------------------- |
| **tsc / astro check** | Error ≠ 0・Unused label 警告未解消            |
| **lint-styles**       | `.css` / Tailwind クラス衝突                 |
| **json-schema**       | `categories.json` が Zod 失敗              |
| **pages build**       | `/structure` or `/structure/[slug]` 404 |

---

## 9. 運用フロー

1. **カテゴリ追加 / 更新**: `src/data/categories.json` 編集
2. Intro 追加: `src/content/descriptions/structure/<slug>/intro.md` 作成
3. `pnpm typecheck` → `pnpm dev` でローカル確認
4. PR → CI green → Merge → GitHub Pages 自動公開

---

## 10. 今後のロードマップ (Structure)

| バージョン     | 機能追加               | 概要                                              |
| --------- | ------------------ | ----------------------------------------------- |
| **v 1.3** | Mermaid 相関図 rehype | ` ```mermaid` ブロックを詳細ページで自動レンダ                  |
| **v 1.3** | OG 画像自動生成          | `/api/og` (Vercel OG) でカテゴリ別サムネイル               |
| **v 1.4** | Story 連携           | 最新 Story 3 件をカテゴリ詳細にバッジ表示／リンク                   |
| **v 1.5** | Proof 件数バッジ        | Card 一覧に “{完了}/{総件数}” 円グラフバッジ                   |
| **v 2.0** | CMS Headless 化     | Storyblok で categories.json を外部管理 → Webhook ビルド |

---

### **Done is better than perfect — and Self-Driving Structure is even better.**

*JSON 駆動 × Static Build* により、カテゴリ追加〜デプロイまでが **“ファイル追加 → PR → Merge”** で完結。
次フェーズは Mermaid と Story の自動連携で「学習ロードマップ」をさらに立体化する。
