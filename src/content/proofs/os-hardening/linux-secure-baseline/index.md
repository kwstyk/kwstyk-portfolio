---

title: "Linux Secure Baseline Lab"
description: "CIS Benchmarks の主要 10 項目を Ansible で自動適用し、before / after を監査レポートで比較するラボ"
category: "os-hardening"
difficulty: "medium"
repro:
  - "docker"
stack:
  - "docker"
  - "ansible"
  - "lynis"
updated: "2025-05-28"
progress: 0
tags:
  - "cis-benchmark"
  - "ansible"
  - "lynis"
ci_status: "https://img.shields.io/badge/ci-passing-brightgreen.svg"
stories: []
why_md: "/src/why/os-hardening/linux-secure-baseline.md"

---

## Design Rationale

<div class="my-4 border-l-4 p-4 rounded bg-blue-800 border-blue-500 text-white">
このラボは **最小限の Docker 環境** で OS ハードニングの勘所を体験させることを目的にしています。  
CIS Benchmarks の “Priority 1” レベルを中心に **Ansible Playbook 1 回** で自動適用し、適用前後を Lynis でスコア比較することで「何が変わったか」を可視化します。
</div>

---

## 🛠️ Prerequisites（事前準備）

- Docker Desktop （macOS / Windows 11 + WSL2 / Linux いずれか）
- Git
- pnpm & just（リポジトリ標準のユーティリティ）
- 基礎知識：Linux 標準コマンド、SSH 鍵の概念

---

## How to Reproduce

### 1. リポジトリをクローン＆移動

```bash
git clone https://github.com/kwstyk/kwstyk-portfolio.git
cd kwstyk-portfolio/src/content/proofs/os-hardening/linux-secure-baseline
```

### 2. コンテナ起動 & ベースライン取得
- Debian11 ベースのテストサーバを起動
- 監査前スコアを取得

```bash
docker compose up -d base
docker compose exec base lynis audit system --quick --quiet --auditor "pre"
```

### 3. Ansible で CIS 主要項目を適用
- Playbook を 1 コマンド適用
```bash
just apply-hardening
```

### 4. 再監査 & スコア比較
- 差分レポートを表示
```bash
docker compose exec base lynis audit system --quick --quiet --auditor "post"
just diff-report
```

### 5. 後片付け

```bash
docker compose down -v
```

---

## Expected Outcome

- Lynis スコアが **70 → 85** 付近へ向上  
- `/etc/ssh/sshd_config` に *PermitRootLogin no* が反映  
- `ufw` が有効化され、無応答ポートが DROP

---

## Directory Structure

<div class="my-6 p-4 bg-gray-800 text-white rounded font-mono text-sm overflow-x-auto">
<pre>
linux-secure-baseline/
├── ansible/
│   ├── playbook.yml
│   └── roles/
│       └── cis/
├── docker-compose.yml
├── justfile
└── reports/
    ├── lynis-pre.html
    └── lynis-post.html
</pre>
</div>

---

## Troubleshoot

| 症状                                         | 解決策                                           |
|--------------------------------------------|------------------------------------------------|
| Ansible が `ssh: connect to host` で失敗する | `docker compose ps` で `base` コンテナの IP／状態を確認 |
| Lynis が「**command not found**」            | コンテナビルド時に失敗 → `docker compose build --no-cache` |

---

## References

- [CIS Benchmark: Debian Linux 11 v1.0.0](https://www.cisecurity.org/)
- [Lynis – Security Auditing Tool](https://github.com/CISOfy/lynis)
