# 設計理由 — Linux Secure Baseline Lab

## 🎯 目的

“OS を固める” を抽象論で終わらせず、**測定 → 改善 → 再測定** のサイクルを体験させること。  
CIS Benchmarks のうち実務で最初に適用しやすい 10 コントロールを選び、**手動設定ゼロ** で自動化する。

---

## 📝 背景

1. **属人ハードニング**  
   手順が Wiki に散在し、何を守っているのか曖昧  
2. **証跡不足**  
   「設定したはず」が事故後に検証不能 → スコアで数値化したい  
3. **CI/CD 連携の遅延**  
   Terraform で VM を作っても OS 設定が追いつかない

---

## 🛠️ 設計方針

| 目的             | 実装／設定                                                                 | 
|----------------|----------------------------------------------------------------------------|
| 再現性 100%      | Docker Compose で **Debian11** のクリーンイメージを固定                  |
| ワンコマンド適用  | `just apply-hardening` → `ansible-playbook -i inventory playbook.yml`      |
| 可観測性の向上   | Lynis HTML レポートを `reports/` に保存し、GitHub Actions Artifacts へアップ |
| 拡張容易性       | `roles/cis/tasks/*.yml` を増やすだけでコントロールを追加可能                |

---

## 🚀 クイックスタート

```bash
git clone https://github.com/kwstyk/kwstyk-portfolio.git
cd kwstyk-portfolio/src/content/proofs/os-hardening/linux-secure-baseline
docker compose up -d base
just apply-hardening
```

---

## 📈 期待される学習効果

* **ベースライン思考** — 設定を “場当たり” でなく **コード** として管理  
* **監査ログ読解** — Lynis の出力から優先度を判断する力  
* **自動化マインド** — Ansible ロールを積み上げて「作業＝コード化」する習慣

---

