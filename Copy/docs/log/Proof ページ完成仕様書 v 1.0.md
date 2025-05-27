以下に **「Proof ページの完成仕様書 v 1.0」** を Markdown でまとめました。  

---

# Proof ページ完成仕様書 v 1.0

## 1. 目的（Why）
| ペルソナ | 欲しい情報 | 本仕様での提供方法 |
|----------|-----------|--------------------|
| 採用担当（30 秒） | 何を出来るのか・再現性 | Hero セクションに “達成スクリーンショット＋CI バッジ” |
| 現場エンジニア（3 分） | 再現手順・環境構成 | 「再現手順」ブロック（Copy & Paste コード） |
| 未来の自分（10 分〜） | 設計判断・トラブル対応 | 「設計思想」「Troubleshoot」「Why.md」リンク |

## 2. URL / ルーティング
```
/proof/[category]/[slug]/
例）/proof/ad-security/ad-lab/
```

## 3. 画面レイアウト（Atomic Design）

```
│  ProofPageTemplate (Template) ─────────────────────────
│
├─ Hero      (Organism)
│    ├─ Heading(h1)     (Atom)
│    ├─ Badge CI Status (Atom)  ← GitHub Actions shield
│    └─ ProgressBar     (Molecule) ← if long-running lab
│
├─ ProofMetaCard (Organism)  ← 左サイドまたは上部
│    ├─ DifficultyBadge 🟢🟡🟠🔴
│    ├─ ToolStack list (Docker • Terraform …)
│    ├─ Tags
│
├─ ProofBody (Organism)
│    ├─ Section “Overview”
│    ├─ Section “Prerequisites”
│    ├─ Section “How to Reproduce”
│    ├─ Section “Expected Outcome”
│    ├─ Section “Troubleshoot”
│    └─ Section “References / Story links”
│
└─ Footer slot
```

### ✦ 主要コンポーネント

| コンポーネント | Props | 役割 |
|----------------|-------|------|
| `<DifficultyBadge />` | `level: 'easy'|'medium'|'hard'|'expert'` | 色分け：🟢🟡🟠🔴 |
| `<ToolChip />` | `icon, name` | Docker / Tf / ZAP など |
| `<CopyBlock />` | `code:str , lang:str` | 再現コマンドをワンクリックコピー |
| `<Alert />` | `type:'info'|'warn'|'error'` | 注意喚起（ポート空け、要メモリなど） |

## 4. データモデル (Front-matter v4.2)

```yaml
---
title: "ad-lab"
category: "ad-security"
difficulty: "medium"   # easy / medium / hard / expert
updated: 2025-04-27
stack: ["docker","samba4","kerberos"]
tags: ["Active Directory","Kerberos","Red Team"]
stories: [ "note-link-id-123", "zenn-id-456" ]
ci_status: "https://github.com/kwstyk/…/workflows/proof-ci/badge.svg"
---
```

Astro の MDX で読み取り、`ProofPageTemplate` にバインド。

## 5. スタイル（Tailwind + CSS 変数）

```css
/* tailwind.config.mjs → theme.extend.colors */
{
  "card": {
    "DEFAULT": "rgb(var(--card-bg) / <alpha-value>)",
    "muted": "#1c2744"
  }
}
```
- 明暗モード共通で CSS 変数を読み替え。
- `.card:hover` は `ring-1 ring-accent/30` で立体感。

## 6. CI / 再現性

| フェーズ | ジョブ | Pass 基準 |
|----------|--------|-----------|
| Lint     | md-lint / flake8 | エラー 0 |
| Build    | `docker compose up -d --wait` | exit 0 & port 開 |
| Scan     | `grype image` | Critical 0 |
| Test     | `bats tests/e2e.bats` | all ✔︎ |
| Upload   | `asciinema rec` → `public/demo.svg` | アーティファクト保存 |

成功時に README と Proof ページへバッジ自動更新。

## 7. 例：`packet-capture` ページ骨子（MDX）

```mdx
---
{front-matter}
---

<Hero title="Packet Capture Lab" />

<ProofMetaCard difficulty="easy" stack={["docker","tcpdump"]} />

## Overview
最小構成の Docker ネットワークで **ARP→DNS→HTTP** の 3 ステップ通信を再現し、  
`tcpdump` と `Wireshark` でパケットを可視化するラボ環境です。

## Prerequisites
<Alert type="warn">ホスト OS は WSL2 or Linux 推奨。macOS は <code>--network host</code> 不可。</Alert>

```bash
git clone https://github.com/kwstyk/portfolio-monorepo
cd proofs/network-security/packet-capture
just up        # ← CopyBlock コンポーネント
```

## Expected Outcome
![ci-pass](badge.svg)

- `pcap/nginx.pcap` が生成される  
- Wireshark で HTTP GET `/index.html` が確認できる

## Troubleshoot
| 症状 | 解決策 |
|------|--------|
| `device lo0 not found` | WSL2 の場合は **eth0** を指定する |

## References
- Story: [DNS パケットを読むコツ](https://zenn.dev/kwstyk/articles/dns-packet-tips)
```

## 8. 実装ロードマップ

| Step | ブランチ | 内容 | 完了判定 |
|------|----------|------|----------|
| 1 | `feature/proof-template` | `ProofPageTemplate.astro` と共通コンポーネント実装 | `/proof/sample` が表示 |
| 2 | `feat/packet-capture` | network-security/packet-capture.md 作成 | CI 緑 + ページ表示 |
| 3 | `ci/proof-matrix` | paths-filter で Proof 単位並列ビルド | PR が 10 分以内 |
| 4 | 各 Proof ブランチ | ad-lab など 8 件実装 | Story 連携バッジが付く |

---

## 9. 完成イメージ（Figma モック）

> Figma URL: `figma.com/file/…/proof-template`  
> レイアウトは 1440 / 768 / 390 の 3 ブレークポイントを用意。

---

# ✅ 次のアクション

1. `feature/proof-template` ブランチを切る  
2. 上記テンプレと `DifficultyBadge`, `ToolChip`, `CopyBlock` を実装  
3. `packet-capture` をサンプルとして流し込み、**画面が崩れないこと**を確認  
4. CI に `proof-ci.yml` を追加（成功バッジが Hero に出れば OK）

ここまで完了＝「Proof 基盤」が完成です。  
以降は **各カテゴリに合わせてラボを追加していくだけ** になります。

---

これが **“最高の Proof” を量産できる完全仕様書 v 1.0** です。  
実装へ進む際に詰まったら、また声をかけてください！