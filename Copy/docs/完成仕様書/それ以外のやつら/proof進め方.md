Proof ページの構築方針:

これらの仕様書に基づき、以下の方針で Proof ページを構築していくのが良いでしょう。

基盤実装: まず Proof ページ完成仕様書 v 1.0 のロードマップ Step 1 に従い、ProofPageTemplate.astro と共通コンポーネント群 (DifficultyBadge, ToolChip, CopyBlock, Alert 等) を ポートフォリオ構成仕様書 v 2.0 の規約に沿って実装します。
データ連携: Front-matter のデータモデルを data/schema/proof.ts で定義・検証し、MDX ページ ([...slug].mdx) がそのデータを読み込んでテンプレートに渡す仕組みを構築します。
個別 Proof 作成: 立体ポートフォリオ戦略 v6.2 で定義された Proof カテゴリ や、前回議論した「納得感の高い Proof リスト (V7.1)」を参考に、個別の Proof (ad-lab, packet-capture など) の .mdx ファイルを作成します。
コンテンツ記述: 各 Proof の .mdx ファイル内に、Proof ページ完成仕様書 v 1.0 の Section 6, 7 に示された標準項目（概要、前提条件、再現手順、期待結果、トラブルシュート、参考文献/Storyリンク等）を具体的かつ正確に記述します。
再現手順: <CopyBlock /> を使い、コマンドが簡単にコピーできるようにします。just up や px proof up <name> など、v6.2 で定義された簡易実行コマンドも併記すると親切です。
設計理由: 各 Proof の why.md へのリンクを「概要」セクションなどに含めます。
視覚情報: Asciinema デモやスクリーンショットを効果的に活用します。
CI/CD 連携: proof-ci.yml を実装し、各 Proof の種類に応じて適切なテスト（Lint, Docker build, Vagrant validate, Terraform validate, Security Scan 等）が実行され、結果がバッジとして Proof ページに反映されるようにします。
Story 連携: story-sync.yml を実装し、Zenn/note との連携が自動で行われ、Proof ページに関連 Story が表示されるようにします。