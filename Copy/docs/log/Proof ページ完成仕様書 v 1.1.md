```markdown
# Proof ページ完成仕様書 **v 1.1**

「立体ポートフォリオ戦略 v6.2」および  
「ポートフォリオ構成仕様書 v1.1」準拠  
（*v1.0* からの差分をすべて反映）

---

## 1. 目的 — *Why*

| ペルソナ | 欲しい情報 | 本仕様での提供方法 |
|----------|-----------|--------------------|
| **採用担当（30 秒）** | 何を出来るか／再現性 | *Hero* に達成スクリーンショット＋CI バッジ＋再現方法バッジ |
| **現場エンジニア（3 分）** | 再現手順・環境構成 | “How to Reproduce” ブロック（コピー用コード） |
| **未来の自分（10 分〜）** | 設計判断・トラブル対応 | “Design Rationale” セクション（why.md要約リンク）＋Troubleshoot |

---

## 2. ルーティング

```
/proof/[category]/[slug]/
/proof/network-security/packet-capture/
```

---

## 3. 画面レイアウト（Atomic Design）

```
ProofPageTemplate (Template)
│
├─ Hero                 (Organism)
│    ├─ Heading(h1)        (Atom)
│    ├─ DifficultyBadge    (Atom)
│    ├─ ReproMethodBadge   (Atom)   ← ★NEW
│    ├─ StackChip[]        (Molecule)
│    └─ StatusBadge(CI)    (Atom)
│
├─ ProofMetaCard        (Organism)
│    ├─ UpdatedDate
│    ├─ Tags
│    └─ ProgressBar (optional)
│
├─ ProofBody            (Organism)
│    ├─ Section “Overview”
│    ├─ Section **“Design Rationale”** ← ★NEW (why.md 要約)
│    ├─ Section “Prerequisites”
│    ├─ Section “How to Reproduce”
│    ├─ Section “Expected Outcome”
│    ├─ Section “Troubleshoot”
│    └─ Section “References / Story links”
│
└─ Footer slot
```

---

## 4. コンポーネント一覧

| コンポーネント | Props | 説明 |
|----------------|-------|------|
| `<DifficultyBadge>` | `level: 'easy' | 'medium' | 'hard' | 'expert'` | 🟢🟡🟠🔴 |
| `<ReproMethodBadge>` | `method: 'docker' | 'terraform' | 'vagrant' | 'manual'` | アイコン＋テキスト |
| `<StackChip>` | `icon, name` | 使用ツール列挙 |
| `<CopyBlock>` | `code, lang` | 再現コマンド コピー |
| `<Alert>` | `type: info | warn | error` | 注意喚起 |

---

## 5. Front-matter スキーマ v4.3

```yaml
---
title: "packet-capture"
category: "network-security"
difficulty: "easy"          # easy | medium | hard | expert
repro: ["docker"]           # docker | terraform | vagrant | manual など複数可
stack: ["docker","tcpdump"] # 表示順は自由
updated: 2025-04-27
tags: ["Wireshark","pcap"]
stories: ["zenn-123","note-456"]
ci_status: "https://github.com/kwstyk/…/badge.svg"
why_md: "./why.md"
---
```

---

## 6. 難易度定義

| 記号 | ラベル  | 目安               |
|------|---------|--------------------|
| 🟢   | easy    | チュートリアル級（〜1 日） |
| 🟡   | medium  | 基礎実践（2–3 日）        |
| 🟠   | hard    | 応用実践（4–7 日）        |
| 🔴   | expert  | 実戦投入（1 週＋複数技術）|

---

## 7. Repro Method バッジ定義

| method     | 表示 | ツール例 |
|------------|------|----------|
| docker     | 🐳 Docker | `docker compose up` |
| terraform  | 🏗 Terraform | `terraform apply` |
| vagrant    | 📦 Vagrant | `vagrant up` |
| manual     | 🔧 Manual  | 手動手順のみ |

---

## 8. ページ Markdown（サンプル packet-capture.mdx）

```mdx
---
{front-matter ↑}
---

<Hero
  title="Packet Capture Lab"
  difficulty="easy"
  repro={["docker"]}
  stack={["docker","tcpdump"]}
  ci={ci_status}
/>

<ProofMetaCard updated={updated} tags={tags} />

## Overview
最小構成の Docker ネットワークで **ARP → DNS → HTTP** を再現し、  
`tcpdump` と `Wireshark` でパケットを可視化するラボ。

## Design Rationale
import Why from '{why_md}'
<Why />  <!-- or 要約 -->

## Prerequisites
<Alert type="warn">WSL2 / Linux 推奨。macOS は <code>--network host</code> 非対応。</Alert>

## How to Reproduce
<CopyBlock lang="bash" code={`git clone …\ncd proofs/network-security/packet-capture\njust up`} />

## Expected Outcome
![demo](demo.svg)

## Troubleshoot
| 症状 | 解決策 |
|------|--------|
| `device lo0 not found` | WSL2 では **eth0** を指定 |

## References
- Story (Zenn) → [DNS パケットを読むコツ](https://…)
```

---

## 9. CI パイプライン基準

| フェーズ | ツール | 失敗条件 |
|----------|--------|----------|
| Lint     | markdownlint, shellcheck | Error 0 |
| Build    | `docker compose up --wait` | exit 0 |
| Scan     | `grype` | Critical 0 |
| Test     | `bats` e2e | all ✔︎ |
| Publish  | asciinema→SVG アップロード | 成功 |

成功で Hero の CI バッジが **green** に。

---

## 10. 実装ロードマップ

| Step | ブランチ | 内容 | 完了条件 |
|------|----------|------|----------|
| 1 | `feature/proof-template` | Template + 新 Badge 実装 | `/proof/sample` 表示 |
| 2 | `feat/packet-capture` | サンプル Proof 完成 | CI 緑＋Why.md リンク |
| 3 | `ci/proof-matrix` | paths-filter で並列 Build | PR 10 分以内 |
| 4 | 各 Proof ブランチ | ad-lab など 8 件追加 | Story 連携バッジOK |

---

## 11. Figma モック

> URL     : `https://figma.com/file/…/proof-template-v1.1`  
> Breakpoints: **1440 / 768 / 390 px**

---

### ✅ これで v 1.1 仕様が完成です。  
次のアクション:  
1. `feature/proof-template` を作成  
2. この仕様に従ってコンポーネント & テンプレートを実装  
3. サンプル Proof (`packet-capture`) を流し込んでビジュアル確認
