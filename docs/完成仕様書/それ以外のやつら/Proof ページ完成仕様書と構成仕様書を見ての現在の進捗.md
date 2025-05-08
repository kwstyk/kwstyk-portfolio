**進捗状況の確認と提案**

ユーザーは進捗、変更点、改善点を求めているので、現在のポートフォリオ仕様v2.0と、証跡ページ仕様v1.1との違いを確認する必要があります。これまでに行ったコード修正やlint設定、テンプレート変更などを反映させ、プロジェクトの進捗として以下の項目を挙げます。

* 実装済み機能
* 残りの作業
* 改善提案

その後、予定されているルートやアクション可能なタスクを整理して、ユーザーのトーンに合わせて日本語で提供します。


思考時間: 16 秒


### 現在の進捗サマリ（2025-04-27 時点）

| 項目                         | 実装状況     | 主な変更点・実装痕跡                                                                   |           |                                                    |
| -------------------------- | -------- | ---------------------------------------------------------------------------- | --------- | -------------------------------------------------- |
| **Astro/Tailwind 基盤**      | ✅ 完了     | `astro.config.mjs` に Tailwind+MDX 統合、パスエイリアス `@/*` 設定                        |           |                                                    |
| **パッケージ管理 & スクリプト**        | ✅ 完了     | `package.json` に `lint` `typecheck` 追加、`pnpm` ワークフローへ                        |           |                                                    |
| **Lint/型チェック CI**          | ✅ 最低限    | `ci.yml` で **ESLint+Astro check** を自動実行                                      |           |                                                    |
| **Atomic ディレクトリ**          | ✅ 構造確定   | \`components/atoms                                                           | molecules | organisms` を分離（例：`Button.astro` `Card.astro\` など）  |
| **カラー設計の二重定義**             | ◑ 部分実装   | `tailwind.config.mjs` と `globals.css` にトークン配置。ただし変数名がばらつきあり                  |           |                                                    |
| **Layout / Navbar / Hero** | ✅ 基本完成   | 全ページ共通 `Layout.astro` ＋ `Navbar` が固定ヘッダで動作                                   |           |                                                    |
| **Structure ページ**          | ✅ 静的カード版 | `structure/index.astro` は Card 羅列で表示 (データ駆動は未)                               |           |                                                    |
| **Proof テンプレート**           | ◑ ほぼ完成   | `ProofPageTemplate.astro` + `ProofHero.astro` 実装。ただし props 名のバグ・二重 div など残存  |           |                                                    |
| **Content Collections**    | ▲ 雛形     | `[...slug].astro` で `astro:content`+Zod 連携を試験導入                              |           |                                                    |
| **ESLint Flat Config**     | ✅ 完了     | Astro/TS の mixed 環境でエラー 0 を確認                                                |           |                                                    |
| **Nightly Heavy CI**       | ✕ 未着手    | Lighthouse / Trivy / lychee なし                                               |           |                                                    |
| **Story 連携**               | ✕ 未着手    | RSS → `stories.json` sync なし                                                 |           |                                                    |

---

### 仕様書 v 2.0 との差分・不足点

| v 2.0 章                | 必要要素                                               | 現状のギャップ                           |
| ---------------------- | -------------------------------------------------- | --------------------------------- |
| **§2 型定義**             | `src/types/components.d.ts` で共有型                   | まだ個別ファイル内にバラバラ                    |
| **§3 動的ルーティング**        | `structure/*` `story/*` も MDX + data 駆動            | Card 手書きのまま                       |
| **§6 data/schema**     | `proof.json` + Zod parse をビルド時検証                   | `astro:content` へ途中で方針変更し未統合      |
| **§7 SLO**             | Build / Scan / Test / Lighthouse を CI matrix で     | Lint/Typecheck のみ                 |
| **§8 utils/**          | `seo.ts` など共通 util                                 | 未作成                               |
| **Proof ページ v 1.1 要件** | `ProofMetaCard`, `CopyBlock`, `Alert`, Why.md 埋め込み | Hero 以外まだ雛形 or 未実装                |
| **カラー Token**          | Tailwind = CSS Var の 1:1 対応                        | `--accent-0` と `--accent` 二重化など残る |
| **アクセシビリティ**           | `Button` の `aria-label`, focus ring                | 基本クラスのみで未対応                       |

---

### 改善 & 次アクション（優先度順）

1. **Proof 系完成度を上げる**

   * `ProofHero` の二重 `<div>` を削除、`stack={stack}` タイポ修正。
   * `ProofMetaCard`, `CopyBlock`, `Alert` を実装し **packet-capture.mdx** を実データで流し込み。

2. **data/ スキーマ決定**

   * `astro:content` **or** `proof.json+getStaticPaths` のどちらかに統一（後者推奨：非技術者でも GitHub 編集しやすい）。
   * Zod で全フィールド検証し CI で落ちるようにする。

3. **CI Matrix 強化**

   ```yaml
   strategy:
     matrix:
       proof: ${{ fromJson(needs.detect.outputs.changed) }}
   steps:
     - run: docker compose up -d --wait 120
     - run: trivy image proof:${{ matrix.proof }}
   ```

   * **Lint → Typecheck → Build → Scan** に昇格。
   * Nightly Heavy ワークフローを別ファイルで追加。

4. **カラー＆ユーティリティ整理**

   * `tailwind.config` の `bg.start` → `bg-start` に合わせ、CSS 変数と同一命名へ。
   * ハードコード色 (`#22303c` など) を `rgba(var(--card-bg) / 0.8)` 形式に置換。

5. **Structure / Story のデータ駆動化**

   * `data/categories.yml` と `stories.json` を読み込み、`Card`/`Timeline` を map 生成。
   * 変更が多い手書き部分をゼロに近づけてメンテ負荷を削減。

6. **utils/ & SEO**

   * OG 画像自動生成（`@vercel/og`）を util にまとめ、各 MDX の `frontmatter.og` で呼び出し。
   * `format.ts` の `formatDate`   `slugToBreadcrumb` など汎用整形を切り出し。

7. **アクセシビリティ & UX**

   * `Button` に `aria-label` 必須化、FocusRing を Tailwind の `focus-visible` で付与。
   * キーボード操作で Accordion 開閉確認。

8. **ドキュメント & 図**

   * v 2.0 仕様書を **Docs サイト内にも MDX で配置**し、Pull Request でプレビュー可能に。
   * Figma モックから主要ブレークポイントの PNG を `assets/` にエクスポートして共有。

---

### まとめ

*移行の山場* は **Proof ページの完成度 × CI 自動実行**。ここをクリアすれば “見る人が再現できる” 状態になり、残タスクは Story 連携・Nightly 品質ゲートといった **運用フェーズ** だけになります。

> **次の一手 🚀**
>
> 1. ブランチ `feat/proof-template-final` を切り、Hero + MetaCard + Body セクションを結合。
> 2. `packet-capture.mdx` を流し込み **CI 緑を確認**。
> 3. 成功後 `ci/proof-matrix` ブランチで Docker Build & Trivy の並列化に着手。

この順で進めれば **2 週間以内に v 2.0 準拠** へ到達できます。つまずきログが出たら該当コミットのハッシュを投げてください—次の修正パッチをピンポイントで提案します🛠
