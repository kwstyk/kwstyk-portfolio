# Story ページ完成仕様書 **v 1.0 — 2025‑05‑04 初版**

> 本書は「立体ポートフォリオ戦略 v 7.1」「ポートフォリオ構成仕様書 v 2.2」に準拠し、ポートフォリオ最深層 **Story レイヤ** の要件をフル定義する。抜粋無しの Complete Edition。

---

## 1. 目的・位置づけ

| ペルソナ     | 所要時間  | 欲しい情報            | Story が提供するもの                   |
| -------- | ----- | ---------------- | ------------------------------- |
| 技術コミュニティ | 3–5 分 | 学習過程・失敗談・改善ストーリー | Zenn/Note 記事の一覧・要約・関連 Proof リンク |
| 採用担当     | 30 秒  | 成長志向・発信力         | Story の更新頻度・内容カテゴリ（タグ）          |
| 未来の自分    | 随時    | 過去の決断理由と改善履歴     | 記事タイムライン + proof ↔ story 相互リンク  |

---

## 2. ルーティング & ファイル構成

```
/story/                 (index.astro)  … 一覧
/story/[id]/            ([id].astro)   … 詳細（オプション）
```

> **デフォルトは外部リンク**（Zenn/Note等）に遷移。`[id].astro` は自己ホスト用 fallback として用意。

---

## 3. データモデル (`src/data/stories.json`)

```jsonc
[
  {
    "id": "zenn-123",               // 一意 ID = source + slug
    "source": "zenn",               // zenn | note | qiita …
    "title": "DNS パケットを読むコツ",  // 公開記事タイトル
    "summary": "tcpdump で DNS トランザクションを…", // 140字以内
    "url": "https://zenn.dev/...",  // 外部 URL
    "tags": ["network", "pcap"],    // 任意タグ
    "published": "2025-04-30"        // ISO8601
  }
]
```

### 3.1 自動同期フロー

1. GitHub Actions (`sync-stories.yml`) を cron 日次で実行。
2. RSS フィードを fetch → `scripts/rss2json.ts` で JSON へ整形。
3. 変更があれば commit + PR (Bot)。
4. Merge → サイト再ビルドで Story 一覧が更新。

---

## 4. ページ構造

### 4.1 `/story/index.astro`

```text
Layout
│
├─ Hero (title="Story" subtitle="失敗談と学びの記録" … )
│
├─ FilterBar (tags dropdown + search)  ★v1.1
│
├─ StoryCardGrid
│   └─ StoryCard (molecule) × N
│        ├─ SourceIcon (Atom)
│        ├─ Title        (Atom)
│        ├─ Summary      (Atom)
│        ├─ Published    (Atom)
│        └─ TagBadges[]  (Atom)
│
└─ Pagination (optional) ★v1.2
```

### 4.2 StoryCard Props

| Prop        | 型                  | 必須 | 説明               |
| ----------- | ------------------ | -- | ---------------- |
| `title`     | string             | ✓  | 記事タイトル           |
| `summary`   | string             | ✓  | 概要 140 字以内       |
| `url`       | string             | ✓  | 外部リンク            |
| `source`    | 'zenn' \| 'note' … | ✓  | Source に応じアイコン表示 |
| `tags`      | string\[]          | —  | バッジ列表示           |
| `published` | string             | ✓  | 日付               |

Tailwind カラーマップ例

```ts
export const sourceColor: Record<Source,'bg-cyan-600'|'bg-yellow-500'> = {
  zenn:  'bg-cyan-600',
  note:  'bg-green-600',
};
```

---

## 5. SEO & OGP

* Story 一覧自体には `title="Story – KWSTYK Portfolio"` と meta description を固定。
* 各外部記事閲覧時は 外部サービス側で SEO を担保。
* OGP 画像は一覧サムネに `source` ロゴを埋め込むダイナミック OG (Vercel OG)。

---

## 6. CI / 品質ゲート

| フェーズ          | ツール                   | 基準                       |
| ------------- | --------------------- | ------------------------ |
| RSS fetch     | `scripts/rss2json.ts` | HTTP 200 & JSON parse OK |
| JSON validate | Zod schema            | Error 0                  |
| Build         | `pnpm build`          | exit 0                   |
| Link‑check    | lychee                | 404 0                    |

---

## 7. 未実装 & 優先度リスト

| Priority | 項目                 | 現状      | 対応策                   |
| -------- | ------------------ | ------- | --------------------- |
| ★★★      | RSS 自動同期           | 手動 JSON | `sync-stories.yml` 実装 |
| ★★☆      | FilterBar          | 未実装     | tags + search input   |
| ★★☆      | Pagination         | 未実装     | 12 件/ページ想定            |
| ★★☆      | カバー画像              | 無       | Vercel OG dynamic     |
| ★☆☆      | `story/[id].astro` | プレースホルダ | 外部記事ミラー or embed      |

---

## 8. 完了チェックリスト

* [x] StoryCard グリッドが JSON から動的生成
* [x] Source 別アイコン・色分けが適用
* [ ] RSS Bot で stories.json 自動更新
* [ ] tags Filter が動作（v1.1）
* [ ] Pagination が動作（v1.2）

---

> **Done is better than perfect.** まずは JSON 駆動の一覧と RSS 同期を MVP とし、Filter・Pagination でリッチ化。
