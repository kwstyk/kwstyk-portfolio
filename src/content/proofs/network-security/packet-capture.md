---

title: "Packet Capture Lab"
description: "Dockerネットワーク上で簡易HTTP通信を再現し、tcpdump + Wiresharkでパケット解析するラボ"
category: network-security
difficulty: easy
repro:
  - docker
stack:
  - docker
  - tcpdump
updated: "2025-05-19"
progress: 100
tags:
  - pcap
  - wireshark
  - tcpdump
ci_status: "https://img.shields.io/badge/ci-passing-brightgreen.svg"
stories:
  - "zenn-https://zenn.dev/mijucation/articles/0f2e203bca0551"
why_md: "./why.md"
---
## Design Rationale

<div class="my-4 border-l-4 p-4 rounded bg-blue-800 border-blue-500 text-white">
このラボは、ネットワークセキュリティの初学者が「実際のパケットを自分の手で見て理解する」ことを目的としています。  
抽象的なTCP/IPの学習を、<strong>目に見えるかたち（pcapファイルやWireshark GUI）</strong>で体験させることに重きを置いています。
</div>

シンプルなDocker構成（nginx + tcpdump）で再現性を最大化

環境構築不要 → just up で即起動

“なぜこの構成か” は why.md に記載

## Prerequisites

- OS: Windows 11 + WSL2 / macOS / Linux
- Docker Desktop インストール済み  
- pnpm install 済み（justfile実行環境）
- just インストール（https://github.com/casey/just）

## How to Reproduce

```bash
git clone https://github.com/kwstyk/kwstyk-portfolio.git
cd proofs/network-security/packet-capture
just up
```
- 起動後、コンテナ内部の tcpdump が capture/capture.pcap に通信ログを書き出します。

## Expected Outcome

- capture/capture.pcap にパケットが保存されている
- Wiresharkで「GET /index.html」が表示される
- ブラウザから http://localhost:8080 にアクセス可能
- nginx のログが tcpdump によって記録されている

## Directory Structure
<div class="my-6 p-4 bg-gray-800 text-white rounded font-mono text-sm overflow-x-auto">
<pre>
packet-capture/
├── docker-compose.yml
├── Dockerfile
├── justfile
├── capture/
│   └── capture.pcap （出力予定）
└── scripts/
    └── setup.sh （任意：tcpdumpやnginx設定用）
</pre>
</div>

## Troubleshoot

| 症状                       | 解決策                                    |
| ------------------------ | -------------------------------------- |
| Wireshark でパケットが見えない     | `capture/capture.pcap` を直接開く           |
| `eth0` デバイスが見つからない（WSL2） | `tcpdump -i any` または `-i eth0` を明示的に指定 |
| `just` が動作しない            | `just` コマンドが未導入 → `cargo install just` |
| port 8080 にアクセスできない      | Docker コンテナが起動しているか確認 (`docker ps`)    |


## References

- [TCP/IP 入門](https://amzn.asia/d/eon0oUv)


