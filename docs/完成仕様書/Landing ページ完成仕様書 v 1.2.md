# Landing ページ完成仕様書 **v 1.2 — 2025‑05‑17 最新版**

> *本書は「Landing ページ完成仕様書 v 1.0」および直近の実装状態を統合し、**差分ではなく全文**を再定義したものです。SEO/OGP 機能はまだ未実装のため、TODO として残しています。* citeturn3file0

---

## 0. 位置づけ・目的

| レイヤー    | 役割                              | 本仕様書の範囲                    |
| ------- | ------------------------------- | -------------------------- |
| Landing | **最初に訪れた人へ「何者か／何が出来るか」3 秒で伝える** | UI / UX / 情報設計 / 実装仕様をフル定義 |

---

## 1. ペルソナ別 UX ゴール

| ペルソナ             | 所要時間 | 主要関心事            | 目標 UI 要素                       |
| ---------------- | ---- | ---------------- | ------------------------------ |
| 採用担当 (非技術)       | 5 秒  | この人が何を出来るのか／強みは？ | Hero タイトル＋サブ🤝CTA              |
| 技術リーダー / エンジニア   | 15 秒 | 具体的アウトプット／再現性の深さ | Hero + CTA → Structure / Proof |
| 同期 / フォロワー (SNS) | 30 秒 | 学習姿勢／ポートフォリオの面白さ | AboutCard・保有資格・Career Timeline |

---

## 2. 実装機能一覧 & ステータス

| No | 機能                      | ステータス   | 実装概要 / 備考                                                                 |
| -- | ----------------------- | ------- | ------------------------------------------------------------------------- |
| 1  | **Hero セクション**          | ✅ 完了    | タイプライター JS (速度=⽂字数×60 ms) / 背景パーティクル + 流星エフェクト                            |
| 2  | **AboutCard / 保有資格カード** | ✅ 完了    | `AboutCard` コンポーネントを汎用化。自己紹介＋資格一覧をカード化＆アコーディオン展開                          |
| 3  | **Career Timeline**     | ✅ 完了    | `career.ts` から JSON 読取り → timeline コンポーネントで中央マーカー配置                       |
| 4  | **Navbar & ハンバーガー**     | ✅ 完了    | 画面幅問わずハンバーガー。クリックでメニューリストが側面からスライドイン。                                     |
| 5  | **ダークモード切替**            | 🌓 部分実装 | ボタン押下で 🌙/☀️ アイコン切替までは完了。CSS 変数によるカラートークン切替は未適用。                          |
| 6  | **globals.css**         | 🔄 復旧済  | v0.9 の内容へロールバック。ダークテーマ用の変数定義はまだ未追加。                                       |
| 7  | **ESM Front‑matter 移行** | ✅ 完了    | 全 `index.astro` を `export const layout=…` 形式へ変更。Layout 経由で SEO props 受渡し。 |
| 8  | **SEO meta / OGP 自動生成** | 🚧 未実装  | `src/utils/seo.ts` は済み。各ページへの適用と `/api/og` 生成は次リリース。                      |

---

## 3. ファイル構成 (Landing 関連)

```
src/
├─ layouts/
│   └─ Layout.astro          # 共通 head (generateSeo), Navbar, footer slot
├─ pages/
│   ├─ index.astro           # Landing トップ
│   ├─ structure/index.astro # Structure トップ
│   ├─ proof/index.astro     # Proof トップ
│   └─ story/index.astro     # Story トップ
├─ components/
│   ├─ organisms/Hero.astro
│   ├─ molecules/AboutCard.astro
│   ├─ molecules/Navbar.astro
│   └─ atoms/Button.astro
└─ utils/seo.ts              # generateSeo (title/desc/url/image 補完)
```

---

## 4. コーディング規約抜粋

* **ESM Front‑matter** で `layout` / `pageTitle` / `description` / `pathname` / `ogImage` を `export const` として宣言。
* CSS は Tailwind + 自前トークン。Light/Dark 切替は `:root` 変数で制御。
* 全コンポーネントは props 型を明示 (TypeScript strict)。
* アニメは `prefers-reduced-motion` 準拠でフェード or オフ。

---

## 5. 完了チェックリスト (v 1.2 現在)

* [x] Hero セクション中央配置 & 最長 LCP < 2.5 s
* [x] Navbar レスポンシブ (常時ハンバーガー)
* [x] AboutCard アコーディオン展開
* [x] Timeline 中央マーカー整列
* [x] globals.css バグ修正＆反映
* \[ ] **SEO meta 各ページ動的注入** (v 1.3 目標)
* \[ ] **OGP 画像自動生成** (v 1.3 目標)
* \[ ] ダークテーマ変数反映 (v 1.4 目標)

---

## 6. 既知の課題 & 今後タスク

| 優先  | タスク                  | 詳細                                                    |
| --- | -------------------- | ----------------------------------------------------- |
| ★★★ | SEO 自動化              | `generateSeo` 利用し `<meta>` 出力 + CI で description 必須検証 |
| ★★★ | OGP 画像               | `/api/og` (Vercel Edge) でサーバレス SVG → PNG 生成           |
| ★★☆ | ダークモード完結             | CSS 変数に `--bg-*`, `--text-*` を追加。`dark:` プレフィックス適用    |
| ★★☆ | Hero Asciinema / MP4 | Codespaces デモ (〜5 s) を動画 or svg で LCP を超えないように埋込      |
| ★☆☆ | アコーディオン semantic化    | `<details><summary>` に置換し、キーボードアクセシビリティ向上             |

---

## 7. リリースロードマップ

| 想定日        | バージョン | 完了条件                                           |
| ---------- | ----- | ---------------------------------------------- |
| 2025‑05‑25 | v 1.3 | SEO 自動化 + OG 画像自動生成                            |
| 2025‑06‑05 | v 1.4 | ダークモード変数反映 + Hero Demo 動画挿入                    |
| 2025‑06‑20 | v 2.0 | パフォーマンス 95↑/アクセスビリティ 100/SEO 100 + 多言語 i18n 対応 |

---

## 8. テスト手順 (Lighthouse)

1. `pnpm run build && pnpm serve` でローカル静的配信。
2. Chrome DevTools → Lighthouse → Mobile / Desktop それぞれ実行。
3. 目標値：Perf ≥ 90、A11y 100、SEO ≥ 90、Best‑Practices ≥ 90。

---

© 2025 KWSTYK Portfolio — Landing 完成仕様書 v 1.2
