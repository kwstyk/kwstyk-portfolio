# Proof ページ完成仕様書 **v 1.2 — 2025‑05‑04 改訂版**

「立体ポートフォリオ戦略 v 7.1」および
「ポートフォリオ構成仕様書 v 2.2」準拠（*v 1.1* → *v 1.2* 差分を完全反映）

---

## 1. 本仕様書の位置づけ

| レイヤ       | 目的                | 本仕様が定める範囲                                     |
| --------- | ----------------- | --------------------------------------------- |
| **Proof** | 技術検証・再現手順・学習ログを公開 | ページレイアウト / 必須 Front‑matter / Badge 規格 / CI 基準 |

> **採用担当 30 秒・現場エンジニア 3 分・未来の自分 10 分** の三段階で必要情報が得られる UI／情報設計を保証する。

---

## 2. 変更サマリ（v 1.1 → v 1.2）

| 区分           | v 1.1                       | **v 1.2 変更点**                                            |
| ------------ | --------------------------- | -------------------------------------------------------- |
| ルーティング       | `/proof/[category]/[slug]/` | 変更無し                                                     |
| テンプレート       | `ProofHero` のみ実装            | **`ProofMetaCard`・`CopyBlock`・`Alert` を追加**              |
| Layout       | Layout 内蔵                   | **親 Layout 指定 (`layout: '@/layouts/Layout.astro'`) に統一** |
| Front‑matter | v 4.3                       | **`stories[]` optional / `ci_status` bronze→optional**   |
| CI           | 手動定義                        | **`proof-ci.yml` で Docker build + Trivy 予定**             |
| 妥協点          | Badge 色は固定                  | **色は `badgeColorClass` 渡しで動的に**                          |

---

## 3. ルーティング規定（再掲）

```
/proof/[category]/[slug]/
例) /proof/network-security/packet-capture/
```

静的ビルド時に `src/pages/proof/[...slug].astro` が `getStaticPaths()` で MDX コレクションを走査して生成する。

---

## 4. Atomic レイアウト構造

```text
ProofPageTemplate (Template)
│
├─ ProofHero         (Organism)
│   ├─ Heading             (Atom)
│   ├─ DifficultyBadge     (Atom)
│   ├─ ReproMethodBadge    (Atom)
│   ├─ StackChip[]         (Molecule)
│   └─ StatusBadge(CI)     (Atom, optional)
│
├─ ProofMetaCard     (Organism)   ★v1.2 NEW
│   ├─ UpdatedDate           (Atom)
│   ├─ Tags                  (Molecule)
│   └─ ProgressBar optional  (Atom)
│
├─ ProofBody         (Organism)
│   ├─ Overview
│   ├─ Design Rationale     (why.md 要約 or インポート)
│   ├─ Prerequisites        (Alert)
│   ├─ How to Reproduce     (CopyBlock)
│   ├─ Expected Outcome
│   ├─ Troubleshoot (Table)
│   └─ References / Story links
│
└─ Footer slot
```

> **妥協点**: `ProgressBar` はデータモデル未定のため実装保留。v 1.3 で再検討。

---

## 5. コンポーネント仕様

| 名称                | Props                              | UI/動作            | 実装状況      |            |              |       |
| ----------------- | ---------------------------------- | ---------------- | --------- | ---------- | ------------ | ----- |
| DifficultyBadge   | \`level: 'easy'                    | 'medium'         | 'hard'    | 'expert'\` | 🟢🟡🟠🔴 色分け | ✅ 実装済 |
| ReproMethodBadge  | \`method: 'docker'                 | 'terraform'      | 'vagrant' | 'manual'\` | 🐳🏗📦🔧     | ✅ 実装済 |
| StackChip         | `name: string`                     | Pill表示           | ✅         |            |              |       |
| StatusBadge       | `src: url`                         | CI SVG           | ✅         |            |              |       |
| **ProofMetaCard** | `updated: string; tags?: string[]` | 日付 + タグ          | ◑ 実装途中    |            |              |       |
| **CopyBlock**     | `code: string; lang: string`       | コピーボタン付き `<pre>` | ✕ 未       |            |              |       |
| **Alert**         | \`type: info                       | warn             | error\`   | 色分けボックス    | ✕ 未          |       |

---

## 6. Front‑matter スキーマ v 4.4（v 1.2 対応）

```yaml
---
slug: "network-security/packet-capture"
difficulty: easy            # easy|medium|hard|expert
repro: ["docker"]          # docker|terraform|vagrant|manual
stack: ["docker","tcpdump"]
updated: 2025-05-01
ci_status: "https://…/badge.svg"   # optional
stories: ["zenn-123"]              # optional
why_md: "./why.md"                 # optional
---
```

追加・変更点:

* `title` / `category` は **自動生成**（slug 分割で取得）に移行
* `ci_status` *optional*：CI が無い Proof は省略可

---

## 7. 難易度 & Repro Badge 定義（変更なし）

| Level  | Badge | 目安    | 色 (Tailwind)    |
| ------ | ----- | ----- | --------------- |
| easy   | 🟢    | 〜1 日  | `bg-green-500`  |
| medium | 🟡    | 2‑3 日 | `bg-yellow-400` |
| hard   | 🟠    | 4‑7 日 | `bg-orange-500` |
| expert | 🔴    | ≥1 週  | `bg-red-600`    |

Repro は v 1.1 と同一。

---

## 8. サンプル MDX (最新版)

```mdx
---
slug: "network-security/packet-capture"
difficulty: easy
repro: ["docker"]
stack: ["docker","tcpdump"]
updated: 2025-05-01
ci_status: "https://github.com/kwstyk/…/badge.svg"
tags: ["pcap","wireshark"]
stories: ["zenn-123"]
---

import ProofPageTemplate from '@/components/templates/ProofPageTemplate.astro';

<ProofPageTemplate {...Astro.props}>

<Alert type="info">WSL2 / Linux 推奨。macOS は `--network host` 非対応。</Alert>

## Overview
最小構成の Docker ネットワークで **ARP→DNS→HTTP** を再現し、`tcpdump` と `Wireshark` でパケットを可視化するラボ。

## Design Rationale
import Why from './why.md'
<Why />

## How to Reproduce
<CopyBlock lang="bash" code={`git clone https://github.com/kwstyk/kwstyk-portfolio.git\ncd proofs/network-security/packet-capture\njust up`} />

## Expected Outcome
![demo](demo.svg)

## Troubleshoot
| Symptoms | Fix |
|----------|-----|
| `device lo0 not found` | WSL2 なら **eth0** を指定 |

## References
- Story → Zenn: [DNS パケットを読むコツ](https://example.com)

</ProofPageTemplate>
```

---

## 9. CI パイプライン基準 (更新)

| フェーズ            | ツール                        | 失敗条件    |
| --------------- | -------------------------- | ------- |
| Lint            | markdownlint, shellcheck   | Error 0 |
| Typecheck       | `pnpm typecheck`           | Error 0 |
| Build           | `pnpm build`               | exit 0  |
| **Proof Build** | `docker compose up --wait` | exit ≠0 |
| Scan            | Tr                         |         |
