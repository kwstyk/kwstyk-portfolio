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
why_md: "./why.md"         # Whyファイルへのパス（オプション）
---

## 📌 Design Rationale（設計の背景・意図）

> このProofを作成した動機、必要となる背景、対象とする技術や概念を簡潔に説明します。  
> なぜこれが重要なのかを理解できるようにします。

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

## 🚀 How to Reproduce（再現手順）

以下の手順を順番に実行してください。

```bash
# リポジトリのクローン
git clone https://github.com/<your-repo>/<portfolio>.git

# Proofのディレクトリに移動
cd proofs/<category>/<proof-name>

# 実行コマンド
just up
