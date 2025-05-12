# Structure ページ完成仕様書 **v 1.1 — 2025‑05‑04 改訂版**

> 本書は「立体ポートフォリオ戦略 v 7.1」「ポートフォリオ構成仕様書 v 2.2」に準拠し、Structure（体系）レイヤの要件を完全に定義する。抜粋無し、これ 1 冊で実装〜運用まで把握できる **Complete Edition**。

---

## 1. 目的・役割

| ペルソナ    | 所要時間 | 欲しい情報                  | Structure が提供するもの                      |
| ------- | ---- | ---------------------- | -------------------------------------- |
| 採用担当    | 5 秒  | スキル領域を俯瞰できるか           | カテゴリ一覧カード + アイコン + バッジ                 |
| 現場エンジニア | 1 分  | どの領域をどの深さで扱っているか       | カード + 詳細ページ (slug) に概要 / 具体 Proof 数を表示 |
| 学習者     | 3 分  | 自分の学習ロードマップに組み込めるか     | カテゴリの説明 + 関連 Story / Proof へのリンク       |
| 未来の自分   | 何度でも | カテゴリ追加・分類見直し時の作業負荷を最小化 | categories.json による **データ駆動更新**で再ビルドのみ |

---

## 2. ルーティング & ページ階層

```
/structure/                  (index.astro)
/structure/[slug]/           ([...slug].astro でカテゴリ詳細)
/structure/network-security/ (例)
```

* `slug` は `categories.json` の `slug` フィールドをそのまま使用。
* 404 用カスタムページ `/structure/404` は v 1.2 で検討。

---

## 3. データモデル (`src/data/categories.json`)

```jsonc
[
  {
    "id": "network-security",          // 一意 ID (内部用)
    "slug": "network-security",         // URL スラッグ
    "title": "ネットワークセキュリティ",      // カードタイトル
    "description": "安全な通信と監視体制を確立するための実践",  // 概要 (80 文字以内)
    "icon": "🛡️",                       // 絵文字 1 文字
    "badge": "執筆中",                   // 表示テキスト
    "badgeColorClass": "bg-gray-500",   // Tailwind クラス (safelist 済)
    "color": "#00C8FF"                  // カード枠色 (CSS var にも利用)
  },
  … 複数 …
]
```

*Zod スキーマ*（`utils/schema/category.ts`）

```ts
export const CategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().max(120),
  icon: z.string().max(2),
  badge: z.string(),
  badgeColorClass: z.string(),
  color: z.string().regex(/^#/),
});
```

* CI で JSON を検証し不整合は失敗。

---

## 4. Atomic レイアウト構造

```text
Structure/index.astro
│
├─ Hero            (Organism)  ← 再利用 (title="Structure")
│
├─ CardGrid        (Molecule)
│   └─ Card        (Molecule) × N  ← categories.json を map
│        ├─ Icon (Atom)
│        ├─ Title (Atom)
│        ├─ Description (Atom)
│        └─ Badge (Atom)
│
└─ Footer slot
```

### 4.1 Card コンポーネント仕様

| Prop              | 型      | 必須 | 用途                  |
| ----------------- | ------ | -- | ------------------- |
| `title`           | string | ✓  | カードタイトル (H3 相当)     |
| `description`     | string | ✓  | 概要テキスト              |
| `href`            | string | ✓  | 詳細ページへのリンク          |
| `icon`            | string | —  | 上部アイコン (絵文字 or SVG) |
| `badge`           | string | —  | 右上バッジテキスト           |
| `badgeColorClass` | string | —  | Tailwind 背景色クラス     |

HTML（抜粋）

```astro
<a href={href} class="card group border rounded-xl p-6 hover:shadow-lg transition">
  <div class="flex items-center justify-between mb-2">
    <span class="text-2xl">{icon}</span>
    {badge && <span class:list={["badge", badgeColorClass]}>{badge}</span>}
  </div>
  <h3 class="card-title">{title}</h3>
  <p class="card-description">{description}</p>
</a>
```

Tailwind safelist

```js
theme: { … },
safelist: [
  'bg-gray-500', 'bg-red-600', 'bg-green-500',
  'text-gray-50', 'text-red-50',
],
```

### 4.2 CSS（`structure.css` 抜粋）

```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
}
.badge {
  @apply text-xs font-bold px-2 py-0.5 rounded-full text-white;
}
```

---

## 5. 詳細ページ `[slug].astro` 構成

```text
/structure/[slug].astro
│
├─ Hero (タイトル = category.title)
├─ Markdown セクション (詳細説明・相関図 Mermaid)   ★TODO v1.2
├─ ProofList (そのカテゴリに属する Proof カード)   ★TODO v1.2
└─ Back to Structure_Link
```

* `getStaticPaths()` で `categories.json` 走査、404 でカスタム表示。
* Proof 件数は `astro:content` で該当 slug を count。

---

## 6. 完成チェックリスト

* [x] categories.json から一覧生成
* [x] Card アイコン・バッジ・色が Props で反映
* [x] `/structure/index` / `/structure/[slug]` が静的生成
* [x] Zod 検証が CI で実行
* [ ] badgeColorClass safelist で正しく色が出る
* [ ] 詳細ページでカテゴリ概要＋ProofList を表示
* [ ] SEO: meta description, OG image 自動生成 (v1.2)

---

## 7. 運用フロー

1. **カテゴリ追加**: `src/data/categories.json` にエントリを追加。
2. `pnpm dev` → 自動反映確認。
3. PR 作成 → CI (`ci.yml`) で JSON 検証 → Merge。
4. `nightly.yml` で Mermaid 図や Proof 件数リンクを再生成（予定）。

---

## 8. 今後の拡張案

| フェーズ | 追加機能        | 概要                                               |
| ---- | ----------- | ------------------------------------------------ |
| v1.2 | Proof 件数バッジ | カテゴリ内 MDX 数を動的カウントし表示                            |
| v1.3 | Mermaid 相関図 | `data/relations.yml` → `<Mermaid />` 描画          |
| v1.4 | Story 連動    | stories.json から最新 Story 3 件をカテゴリごとに紐付け           |
| v2.0 | CMS 化       | Storyblok headless で categories を管理し Webhook ビルド |

---

> **Done is better than perfect.** まずは JSON 駆動 + Card 一覧で MVP を完成し、段階的にリッチ化していく。
