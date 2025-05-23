# Story ページ完成仕様書 **v 1.2 — 2025‑05‑12 改訂版 (Complete Edition)**

> 本書は「立体ポートフォリオ戦略 v 7.1」「ポートフォリオ構成仕様書 v 2.2」に準拠し、ポートフォリオ最深層 **Story レイヤ** の最新要件・実装・運用を一冊に統合する。これ 1 冊で設計思想からロードマップまで把握できる。

---

## 0. 位置づけ・ゴール

| ペルソナ     | 所要時間  | 欲しい情報            | Story が提供するもの                    |
| -------- | ----- | ---------------- | -------------------------------- |
| 技術コミュニティ | 3‑5 分 | 学習過程・失敗談・改善ストーリー | 外部ブログ記事(Zenn/Note)の要約＋タグ検索＋時系列表示 |
| 採用担当     | 30 秒  | 成長志向・発信力         | 更新頻度・人気タグ・記事件数バッジ                |
| 未来の自分    | 随時    | 過去の決断理由・改善履歴     | Proof ↔ Story 相互リンク／タグで時系列ナビゲート  |

**Goal** : "記事を **2 クリック以内** で発見し、タグで関連コンテンツを素早く横断できる"。

---

## 1. ルーティング & ページ階層

```
/story/                   (index.astro)
/story/tag/[tag]/         (動的, ★TODO v1.3)
/story/[id]/              (自己ホスト fallback, ★スコープ外)
```

* **デフォルト**: 記事カードクリックで外部 URL(Zenn / Note / その他)に遷移。
* タグ詳細ページは v1.3 で自動生成予定。

---

## 2. データモデル (`src/data/stories.json`)

```jsonc
{
  "id": "zenn-abcdef",      // source + guid
  "source": "zenn",         // zenn | note | other
  "title": "DNSパケットを読むコツ",
  "summary": "tcpdump で DNS トランザクションを…",
  "url": "https://zenn.dev/...",
  "tags": ["network", "pcap"],
  "published": "2025-05-05",
  "hidden": false            // optional
}
```

### 2.1 自動同期フロー (実装済)

1. **GitHub Actions** `sync-stories.yml` (cron 00:15 JST, manual dispatch)
2. `scripts/rss-to-json.ts` が Zenn/Note RSS を取得。
3. 既存 `stories.json` と **マージ** し `hidden` / 手動タグを保持。
4. 差分があれば Bot が PR → Merge → Astro 再ビルド。

---

## 3. ページ構造 (`/story/index.astro`)

```text
Layout
│
├─ Hero                (title="Lab Notes" subtitle="～Proof から得た知見～")
│
├─ TagFilterBar        ★実装済 (ドロップダウン + クエリ sync)
│
├─ StoryCardGrid       (3 col responsive)
│    └─ StoryCard × N
│
├─ Pagination          ★実装済 (6 件 / page)
└─ Footer slot
```

---

## 4. コンポーネント仕様

| Component        | Props / 主責務                                     | 状態      |
| ---------------- | ----------------------------------------------- | ------- |
| **StoryCard**    | `title, summary, url, source, tags?, published` | ✅       |
| **TagFilterBar** | `tags: string[]`, `selectedTag: string`         |         |
|                  | → `<select>` 変更で `?tag=&page=1` 反映              | ✅       |
| **Pagination**   | `totalItems, itemsPerPage`  → Prev/Next リンク生成   | ✅       |
| **TagBadge**     | `<span>` 色決定: source 色 or tag 固有色               | ✅       |
| **TagCloud**     | 全タグ+頻度をサイズ変化で表示                                 | ❌ ★v1.3 |

Tailwind safelist: `bg-cyan-600`(zenn) `bg-green-600`(note) ほか tag 色追加。

---

## 5. スタイル・カラートークン

| Token        | 用途           | HEX (例)   |
| ------------ | ------------ | --------- |
| `--story-bg` | ページ背景        | `#0d1117` |
| `--card-bg`  | StoryCard 背景 | `#112240` |
| `--zenn`     | zenn バッジ背景   | `#0598ff` |
| `--note`     | note バッジ背景   | `#2ecc71` |

---

## 6. SEO & OGP (一覧ページ)

* `<title>` : `Story – KWSTYK Portfolio`
* `<meta description>` : 「Zenn・Note 記事の失敗談と学びをタグ付きで一覧表示」
* **OGP** : Vercel OG で中央に “Story” ロゴ + zenn/note バッジ。
* JSON‑LD `ItemList` (最大 100 件) を埋め込み。

---

## 7. CI / 品質ゲート

| フェーズ                 | ツール              | 基準                       |
| -------------------- | ---------------- | ------------------------ |
| RSS fetch            | `rss-to-json.ts` | HTTP 200 & JSON parse OK |
| JSON validate        | Zod schema       | Error 0                  |
| Build                | `pnpm build`     | exit 0                   |
| Link‑check           | lychee           | 外部 URL 404 = 0           |
| Lighthouse (Nightly) | lighthouse‑ci    | Perf ≥ 90 / SEO ≥ 90     |

---

## 8. 完了チェックリスト (v 1.2 現状)

* [x] RSS 自動同期 + hidden / 手動タグ保持マージ
* [x] StoryCard グリッドが JSON から生成
* [x] Source 別アイコン・色分けが適用
* [x] TagFilterBar (単一タグ OR フィルタ)
* [x] Pagination (6 件 / page)
* [ ] タグ一覧ページ (`/story/tag/[tag]`) 自動生成 ★v1.3
* [ ] TagCloud サイドバー ★v1.3
* [ ] 複数タグ絞り込み (AND モード) ★v1.4

---

## 9. 運用フロー

1. **記事公開** : Zenn / Note で公開 → RSS 自動同期 (最大 24 h) でサイトに反映。
2. **手動タグ追加 / 非表示** : `src/data/stories.json` を直接編集し `tags` 追記 or `hidden: true` → 次同期以降も保持。
3. **デザイン調整** : `TagFilterBar.astro` や `StoryCard.astro` を編集 → `pnpm dev` で確認。
4. **CI** : PR → `ci.yml` (lint/typecheck/build) 合格 → Merge。

---

## 10. ロードマップ

| バージョン     | 追加機能                       | 概要                                     |
| --------- | -------------------------- | -------------------------------------- |
| **v 1.3** | タグ一覧ページ & TagCloud         | `/story/tag/[tag]` 静的生成 + サイズ可変クラウド表示  |
| **v 1.4** | 複数タグ絞り込み (AND) + URL パラメ同期 | `?tag=tag1,tag2` 形式で AND フィルタ          |
| **v 1.5** | 人気記事ランキング / 閲覧数計測          | Plausible or Umami で PV 取得 → Card 並べ替え |
| **v 2.0** | CMS/API 化                  | Zenn API / Note API or Scrapbox 連携     |

---

### **Done is better than perfect — and Story is where mistakes shine.**

まずは RSS 自動同期 + タグ単一絞り込みで MVP を完成させ、次リリースでタグ UX を強化し “学びの地層” を可視化する。
