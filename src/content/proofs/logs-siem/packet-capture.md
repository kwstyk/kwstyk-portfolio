---
layout: '@/components/templates/ProofPageTemplate.astro'
title: Packet Capture Lab
description: 'Docker ネットワーク上でシンプルな HTTP 通信を再現し、`tcpdump` と `Wireshark` でパケットを可視化する。'
category: logs-siem
difficulty: easy
repro:
  - docker
stack:
  - docker
  - tcpdump
updated: '2024-05-01'
tags:
  - network
  - pcap
  - wireshark
ci_status: 'https://img.shields.io/badge/ci-passing-brightgreen.svg'
stories:
  - "zenn-https://zenn.dev/mijucation/articles/0f2e203bca0551"
---
## Design Rationale

…

## Prerequisites

- Windows 11 + WSL2 推奨  
- Docker Desktop インストール済み  

## How to Reproduce

```bash
git clone https://github.com/kwstyk/kwstyk-portfolio.git
cd proofs/network-security/packet-capture
just up
```

## Expected Outcome

- nginx のアクセスログが pcap ファイルに記録される
- Wireshark で HTTP GET /index.html が見える

## Troubleshoot

| 症状 | 解決策 |
|------|--------|
| デバイスが見つからない | WSL2 なら eth0 を指定する |

## References

- [TCP/IP 入門](https://amzn.asia/d/eon0oUv)


