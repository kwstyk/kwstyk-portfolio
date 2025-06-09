# 設計理由 — Linux Secure Baseline Lab

## 🎯 目的

“OS を固める” を抽象論で終わらせず、**測定 → 改善 → 再測定** のサイクルを体感する。  
CIS Benchmarks のうち **実務でまず着手しやすい 10 コントロール** を抽出し、**手動設定ゼロ** で自動化する。

---

## 📝 背景

| Pain point | 説明 |
|-----------|------|
| **属人ハードニング** | 手順が Wiki に散在し、何を守っているか曖昧 |
| **証跡不足** | 「設定したはず」が事故後に検証不能 → スコアで数値化したい |
| **CI/CD 連携遅延** | Terraform で VM を作っても OS 設定が追いつかない |

---

## 🛠️ 設計方針

| 目的 / 要件 | 実装・設定 |
|-------------|------------|
| **再現性 100 %** | Docker Compose で **Debian 11** のクリーンイメージを固定 |
| **ワンコマンド適用** | `just apply-hardening` → `ansible-playbook -i inventory playbook.yml` |
| **可観測性** | Lynis HTML レポートを `reports/` に保存し、GitHub Actions Artifacts へアップ |
| **拡張容易性** | `roles/cis/tasks/*.yml` を増やすだけでコントロールを追加可能 |

---

## 🚀 クイックスタート（所要 ≒ 5 分）

> **想定ハードニングスコア** : `Hardening index ≈ 50 ± 5 → 65 ± 5`（環境差で前後します）

```bash
git clone https://github.com/kwstyk/kwstyk-portfolio.git
cd kwstyk-portfolio/src/content/proofs/os-hardening/linux-secure-baseline
```

> **テスト VM（Debian 11）起動 ＆ ベースライン採取** 

```bash
docker compose up -d base
docker compose exec base lynis audit system --quick --auditor "pre"
```

> **ハードニング適用（Ansible）**
```bash
docker compose run --rm controller ansible-playbook -i ansible/inventory ansible/playbook.yml
```

> **再スキャン**
```bash
docker compose exec base lynis audit system --quick --quiet --auditor "post"
just diff-report
```

### 5. 後片付け

```bash
docker compose down -v
```
---

## 📈 期待される学習効果

* **ベースライン思考** — 設定を “場当たり” でなく **コード** として管理  
* **監査ログ読解** — Lynis の出力から優先度を判断する力  
* **自動化マインド** — Ansible ロールを積み上げて「作業＝コード化」する習慣

---

