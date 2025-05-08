🏠 Landing レイヤ（トップページ）
重要度	項目	現状	参考仕様書
★★★	SEO meta 自動生成（description／title）	□ 固定文のまま	Landing v1.0 §7 TODO
★★☆	OGP 画像の動的生成（Vercel OG など）	□ 未実装	Landing v1.0 §8
★★☆	Hero セクションを Asciinema → 軽量デモ or 3D Cover に差し替え	□ 未実装	Landing v1.0 §8
★★☆	アコーディオンの開閉アニメ最適化（details/summary 置換）	□ 未実装	Landing v1.0
★☆☆	ライトモード対応（CSS 変数＋prefers-color-scheme）	□ 未実装	Landing v1.0
★☆☆	グローバル <Seo> ユーティル導入（全ページ共通）	□ 設計のみ	strategy v7.1

🗂 Structure レイヤ
重要度	項目	現状	参考仕様書
★★★	badgeColorClass の safelist 適用
（動的バッジ色が Tailwind で確実に出るか検証）	□ 色が出ないケースあり	Structure v1.1 §6
★★★	カテゴリ詳細ページ [slug].astro
・カテゴリ概説 MDX（intro.mdx）
・ProofList（同カテゴリの Proof 一覧）	◑ 基本は表示・Mermaid 図未	Structure v1.1 §5
★★☆	Proof 件数バッジ（カテゴリカードに件数表示）	□ 未実装	Structure v1.2 予定
★★☆	Mermaid 相関図（カテゴリ間依存）	□ 未実装	Structure v1.3 予定
★★☆	詳細ページの SEO meta & OG 画像	□ 未実装	Structure v1.2
★☆☆	Story 3 件連携（カテゴリ詳細に最新 Story を紐付け）	□ 未実装	Structure v1.4
★☆☆	CMS 化 (Storyblok) 検証	□ 未来タスク	Structure v2.0

🔬 Proof レイヤ
重要度	項目	現状	参考仕様書
★★★	ProofMetaCard（更新日・タグ・進捗バー）	◑ 半実装（バー保留）	Proof v1.2 §4
★★★	CopyBlock コンポーネント（コード＋コピー）	□ 未実装	Proof v1.2 §5
★★★	Alert コンポーネント（info/warn/error ボックス）	□ 未実装	Proof v1.2 §5
★★★	proof-ci.yml パイプライン
（Docker build＋Trivy スキャン）	□ 叩き台のみ／fail 0 判定未	Proof v1.2 §9
★★☆	Front-matter v4.4 へ完全移行
（stories[] , why_md など）	◑ 一部適用	Proof v1.2 §6
★★☆	ProgressBar（ProofMetaCard 内）	□ 未実装（設計保留）	Proof v1.2
★★☆	ReproBadge 拡張（Terraform／Vagrant 等）	□ 基本のみ	Proof v1.2
★☆☆	why.md の自動要約埋め込み	□ 未実装	strategy
★☆☆	Nightly Lighthouse／dead-link チェック	□ workflow だけ存在	strategy v7.1

🔧 横断タスク（全レイヤ共通）
重要度	項目	現状
★★☆	seo.ts ユーティルを用いた meta 一元管理	□ 未導入
★★☆	カラートークンの暗黙依存削減（CSS 変数→Tailwind extend）	□ 実装途中
★★☆	キャッシュ戦略の最適化（Vercel Edge / HTTP Headers）	□ 未検証
★☆☆	Lighthouse ≥95 保持のパフォチューニング	□ 未測定

✅ 推奨ロードマップ（次の２スプリント例）
Sprint	重点	完了目標タスク
S1	★Landing & Structure 基礎強化	1) Landing SEO meta 自動化
2) Structure 詳細ページ完成＋バッジ色 fix
3) CopyBlock / Alert の最小実装
S2	★Proof UX & CI 強化	1) ProofMetaCard 完成＋ProgressBar stub
2) proof-ci.yml 本番運用 & Trivy
3) OG 画像動的生成（全レイヤ共通）