---
layout: '@/components/templates/ProofPageTemplate.astro'
title: "<Proofのタイトル>"
description: "<Proofの内容・目的を簡潔に説明>"
category: "<カテゴリ名>"   # network-security | cloud-security | os-hardening | ...
difficulty: "<難易度>"      # easy | medium | hard | expert
repro:                     # 再現手段を1つ以上選択
  - "<docker|terraform|vagrant|manual>"
stack:                     # 使用技術スタックを列挙
  - "<技術スタック1>"
  - "<技術スタック2>"
updated: "<更新日>"         # YYYY-MM-DD 形式
progress: <進捗率>          # 0–100（未完の場合に活用）
tags:                      # 関連タグ（複数可）
  - "<タグ1>"
  - "<タグ2>"
ci_status: "<CIステータスバッジのURL>" # オプション
stories:                   # 関連する外部記事へのリンク（オプション）
  - "<source>-<URL>"       # 例：zenn-https://zenn.dev/...
why_md: "/src/why/[category]/[slug].md"         # Whyファイルへのパス（オプション）
---

## Design Rationale

<div class="my-4 border-l-4 p-4 rounded bg-blue-800 border-blue-500 text-white">

> このProofを作成した動機、必要となる背景、対象とする技術や概念を簡潔に説明します。  
> なぜこれが重要なのかを理解できるようにします。
</div>
---

## 🛠️ Prerequisites（事前準備）

以下を前提条件として推奨しています：

- OS要件：Windows 11 / macOS Monterey 以上 / Ubuntu 22.04 など
- 必要ツール・環境（インストール済み）：
  - Docker Desktop
  - Terraform
  - Git
- 前提となる基礎知識：
  - TCP/IPの基本
  - Linuxコマンドの基本

---

## How to Reproduce

### 1. リポジトリをクローン＆移動
- このコマンドで GitHub からソースをローカルにクローンし、Packet Capture Lab のディレクトリに移動します。
```bash
git clone https://github.com/kwstyk/kwstyk-portfolio.git
cd kwstyk-portfolio/src/content/proofs/network-security/packet-capture
```

### 2. 画像と tcpdump コンテナをビルド
- Dockerfile に従って、nginx＋tcpdump コンテナのイメージを作成します。 
```bash
docker compose build
```
### 3. バックグラウンドで起動
- バックグラウンドでコンテナを起動します。起動後は <strong>http://localhost:8080</strong> で nginx のウェルカムページが表示されます。
```bash
docker compose up -d
```
### 4. 実行結果を確認・停止
- コンテナを停止・削除したあと、`capture/` フォルダ内に `capture.pcap` が生成されていることを確認します。
```bash
docker compose down 
ls capture/ 
```

- 起動後、コンテナ内部の tcpdump が capture/capture.pcap に通信ログを書き出します。

## Expected Outcome


## Directory Structure
<div class="my-6 p-4 bg-gray-800 text-white rounded font-mono text-sm overflow-x-auto">
<pre>


</pre>
</div>

## Troubleshoot

| 症状                       | 解決策                                    |
| ------------------------ | -------------------------------------- |

## References
