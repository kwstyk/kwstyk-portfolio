# Story ページ完成仕様書 **v 1.3 — 2025-05-19 改訂版 (Complete Edition)**&#x20;

> **本書は v 1.2 (2025-05-12) を全面アップデート。**
> RSS 同期基盤は維持しつつ、
> *Story ⇔ Proof 相互リンク* の実装を β 段階に導入し、
> 今後のタグ UX 拡張ロードマップを反映した。
> これ 1 冊で設計思想・実装・運用フローを把握できる。

---

## 0. ゴール & ペルソナ

| ペルソナ     | 所要    | 目的           | Story が提供するもの             |
| -------- | ----- | ------------ | ------------------------- |
| 技術コミュニティ | 3-5 分 | 失敗談・学びをざっと把握 | タグ & 投稿日で一覧、ワンクリック外部遷移    |
| 採用担当     | 30 秒  | 発信頻度・技術志向を確認 | Source バッジ・人気タグ・件数        |
| 未来の自分    | 随時    | 過去の改善履歴を再チェク | Proof ⇔ Story 相互リンクで因果を遡及 |

**KPI** :
*「目的の学び記事に **2 クリック以内**、関連 Lab に **+1 クリック以内** で到達」*

---

## 1. ルーティング & ページ階層

```
/story/                   (index.astro)          ★MVP
/story/tag/[tag]/         (静的生成)             ★v1.3
/story/[id]/              (自己ホスト fallback)   ☆保留
```

* デフォルト：カードクリック → 外部 URL (Zenn / Note) を新規タブで開く。
* タグ一覧ページは次バージョン v 1.3 で自動生成。

---

## 2. データモデル (`src/data/stories.json`)

* **変更なし** — v 1.2 と同フォーマットを継続使用&#x20;
* `hidden: true` / 手動タグのマージ保持ロジックも据置。

---

## 3. 静的データ同期

| フェーズ       | ツール / Job                           | 成否基準                             |
| ---------- | ----------------------------------- | -------------------------------- |
| RSS fetch  | `sync-stories.yml` (cron 00:15 JST) | HTTP 200 & JSON parse OK         |
| JSON merge | `scripts/rss-to-json.ts`            | 既存 `hidden` & 手動 `tags` を保持      |
| PR 自動化     | `github-actions[bot]`               | 変更があれば `sync-stories` ブランチ PR 作成 |

---

## 4. ページ構造 (`/story/index.astro`)

```
Layout
│
├─ Hero              "Lab Notes – Proof から得た知見"
│
├─ StoryFilterBar    ★単一タグ & キーワード絞り込み (URL ?tag= / ?q=)
│
├─ StoryCardGrid     カード × N (3col Responsive)
│    ├─ StoryCard
│    └─ RelatedLabLinks   ← NEW (Proof ⇔ Story 相互リンク β)
│
├─ Pagination        6 件／page  (URL ?page=)
└─ Footer slot
```

---

## 5. コンポーネント仕様

| Component           | Props / 主責務                                                      | 状態      |
| ------------------- | ---------------------------------------------------------------- | ------- |
| **StoryCard**       | `title, summary, url, source, tags?, published`                  | ✅       |
| **StoryFilterBar**  | `tags: string[]`, `selectedTag: string`<br>単一タグ＋keyword→URL同期    | ✅       |
| **Pagination**      | `totalItems, itemsPerPage, currentPage, totalPages, getPageHref` | ✅       |
| **RelatedLabLinks** | `<a href="/proof/...">Proof Title</a>[]` (proofMap 生成)           | 🔄 β    |
| **TagCloud**        | 全タグ + 頻度でサイズ差                                                    | ❌ ★v1.3 |
| **TagListPage**     | `/story/tag/[tag]` 静的生成 & SEO                                    | ❌ ★v1.3 |
| **MultiTagFilter**  | AND モード (`?tag=a,b`)                                             | ❌ ★v1.4 |

---

## 6. Style / カラートークン変化点

* `--zenn` `--note` バッジ色は不変
* `line-clamp` プラグイン削除（Tailwind 3.3 でコア化）

---

## 7. SEO & OGP

| 要素                   | 値                                   |
| -------------------- | ----------------------------------- |
| `<title>`            | `Story – KWSTYK Portfolio`          |
| `<meta description>` | 「Zenn・Note の失敗談と学びをタグで横断」           |
| OGP                  | Vercel OG で “Story” ロゴ + source バッジ |
| JSON-LD              | `ItemList` 100 件まで埋め込み              |

---

## 8. CI / 品質ゲート

| ステージ               | ツール                    | 基準                   |
| ------------------ | ---------------------- | -------------------- |
| Lint / TypeCheck   | ESLint / `astro check` | Error = 0            |
| Build              | `pnpm build`           | exit 0               |
| Link Check         | lychee                 | 外部404 = 0            |
| Lighthouse Nightly | lighthouse-ci          | Perf ≥ 90 / SEO ≥ 90 |

---

## 9. 完了チェックリスト (v 1.3)

* [x] RSS 自動同期 + hidden / 手動タグ保持
* [x] StoryCard グリッド + source 色分け
* [x] StoryFilterBar (単一タグ & キーワード OR)
* [x] Pagination (6 件 / page)
* [x] Proof → Story 相互リンク **表示 β**
* [ ] タグ一覧ページ (`/story/tag/[tag]`) ★v 1.3
* [ ] TagCloud サイドバー ★v 1.3
* [ ] 複数タグ絞り込み (AND) ★v 1.4

---

## 10. 今後のロードマップ（Story）

| バージョン     | 追加機能               | 概要                               |
| --------- | ------------------ | -------------------------------- |
| **v 1.3** | タグ一覧ページ & TagCloud | 静的生成 + サイズ可変クラウド                 |
| **v 1.4** | 複数タグ絞り込み (AND)     | `?tag=a,b` → チェックボックス UI         |
| **v 1.5** | 人気記事ランキング / PV     | Plausible で Page-view, Card 並べ替え |
| **v 2.0** | CMS/API 化          | Zenn API 直接取得 & Webhook ビルド      |

---

### **Done is better than perfect — そして “Learning Story” は転んだ記録を誇れ。**
