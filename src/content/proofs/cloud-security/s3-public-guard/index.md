---

title: "S3 Public Guard Lab"
description: "LocalStack + Terraform で S3 の公開バケットを自動検出し、Lambda で即時に非公開化するラボ"
category: cloud-security
difficulty: medium
repro:
  - docker
  - terraform
stack:
  - docker
  - localstack
  - terraform
  - lambda
updated: "2025-06-09"
progress: 30                # 0–100 で実装進捗を管理
tags:
  - s3
  - localstack
  - terraform
  - lambda
ci_status: "https://img.shields.io/badge/ci-pending-lightgrey.svg"
stories: []                 # Zenn/Note 公開後に追記
why_md: "./why.md"
---

## Design Rationale

<div class="my-4 border-l-4 p-4 rounded bg-blue-800 border-blue-500 text-white">
クラウド環境で<strong>“公開のつもりがなかった S3 バケットがインターネットに晒される”</strong>事故を想定し、<br>
<strong>検出 → 自動修復</strong> までを 1 コンテナ内で疑似体験できる PoC を目指しました。  
LocalStack により AWS 本番アカウントを消費せずに再現でき、Terraform/Lambda で IaC & Serverless の基本構成も学べます。
</div>

- LocalStack を **Edge ポート 4566** で起動—S3/Lambda/IAM だけを有効化  
- Terraform で<br>  ① 公開 ACL バケット<br>  ② 検出用 S3 イベント通知<br>  ③ 修復 Lambda 関数を自動生成  
- “なぜこの構成か” の詳細は `why.md` を参照

---

## Prerequisites

| 必要ツール | バージョンの目安 | 備考 |
| ---------- | -------------- | ---- |
| Docker Desktop | 25.x 以降 | WSL2 / macOS いずれも可 |
| PowerShell 7   | 任意 | 例示コマンドは PowerShell で記載 |
| `make` (任意) | 4.x | Makefile を使わない場合は手動で Terraform CLI を実行可能 |

> **Tip**: Terraform CLI や AWS CLI は **controller コンテナ** 内に同梱しているため、  
> ローカルへ直接インストールしなくても再現できます。

---

## How to Reproduce

### 1. リポジトリをクローンし、ディレクトリ移動

```bash
git clone https://github.com/kwstyk/kwstyk-portfolio.git
Set-Location kwstyk-portfolio\src\content\proofs\cloud-security\s3-public-guard
````

### 2. LocalStack & controller コンテナを起動

```bash
docker compose up -d    
```

### 3. Terraform でスタックをデプロイ
- 初期化
- プラン確認（LocalStack エンドポイントを変数で渡す）
- 適用

```bash
docker compose exec controller terraform init
docker compose exec controller terraform plan -var="endpoint=http://localstack:4566"
docker compose exec controller terraform apply -auto-approve -var="endpoint=http://localstack:4566"
```

- ここで **demo-public-bucket** が `public-read` ACL で作成され、
- Lambda (`s3PublicGuard`) が S3 イベントでトリガーされるように設定されます。

### 4. 動作テスト
- 公開状態を意図的に再設定して Lambda を呼び出す
- Lambda ログを確認（非公開化処理が走る）

```bash
docker compose exec controller aws s3api put-bucket-acl `
  --bucket demo-public-bucket --acl public-read `
  --endpoint-url http://localstack:4566
docker compose exec localstack awslocal logs tail /aws/lambda/s3PublicGuard
```

---

## Expected Outcome

* Lambda ログに `Blocking public ACL for demo-public-bucket` が出力される
* `aws s3api get-public-access-block` で **BlockPublicAcls=true** が確認できる
* オブジェクト ACL もすべて `private` に修正されている
* CI では “public → guard で private 化” が **Green** 判定

---

## Directory Structure

<div class="my-6 p-4 bg-gray-800 text-white rounded font-mono text-sm overflow-x-auto">
<pre>
s3-public-guard/
├── docker-compose.yml
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── lambda.zip      （make で自動生成）
├── lambda/
│   └── handler.py
├── Makefile
├── index.md 
└── why.md
</pre>
</div>

---

## Troubleshoot

| 症状                                         | 解決策                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------- |
| LocalStack の起動が 4566 以外のポートで待ち受ける          | `docker compose logs localstack` で PORT\_BINDINGS を確認し、`TF_VAR_endpoint` に正しい URL を渡す |
| `terraform apply` で `InvalidClientTokenId` | controller コンテナの ENV が `AWS_ACCESS_KEY_ID=test` になっているか確認（LocalStack では任意文字列で可）       |
| Lambda ログにアクセスできない                         | `awslocal logs list` でロググループ名を一覧し、`logs tail` する                                      |
| Lambda が S3 を修正していない                       | `aws s3api get-public-access-block` でフラグが全て `true` か確認、イベントが届いているか `lambda tail`      |

---

## References

* [LocalStack Documentation](https://docs.localstack.cloud/)
* [AWS S3 Public Access Block](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html)
* [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

