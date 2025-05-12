---

createDate: "2025-05-12"
title: "ADセキュリティ"
description: "Active Directory環境における認証・認可強化と攻撃検知"
updated: "2025-05-12"
---------------------

## 概要

ADセキュリティカテゴリでは、オンプレミスのWindows Active DirectoryやAzure ADといったディレクトリサービス環境におけるセキュリティ強化手法を学びます。
ここでは、ドメインコントローラーの保護、Kerberos認証の堅牢化、LDAP/LDAPS通信の暗号化、グループポリシーによるハードニング、特権アカウント管理、そして監査ログ収集とSIEM連携による攻撃検知まで、実践的な演習を通じて学習します。

## アーキテクチャ図

```mermaid
graph LR
  subgraph AD_Security
    DC[ドメインコントローラー]
    GPO[グループポリシー (GPO)]
    Kerberos[Kerberos認証]
    LDAPS[LDAPS 暗号化通信]
    Privileged[特権アカウント管理]
    Logging[監査ログ収集]
    SIEM[SIEM連携]
  end
  DC --> GPO
  DC --> Kerberos
  Kerberos --> LDAPS
  GPO --> Privileged
  Logging --> SIEM
  DC --> Logging
```

## 主なトピック

* **ドメインコントローラー保護**
  物理／仮想セキュリティ、セキュアブート、役割分離
* **グループポリシーハードニング**
  パスワードポリシー、ユーザー権利割当、セキュリティ監査の適用
* **Kerberos攻撃防止**
  AS-REP Roasting、Pass-the-Ticket、チケット有効期限設定
* **LDAPS構成と証明書管理**
  証明書発行、証明書チェーン、LDAP over SSL/TLS
* **特権アカウント管理**
  Tiered Administration、Just Enough Administration (JEA)、PAMソリューション
* **監査ログとモニタリング**
  Windows イベントログ、Microsoft Defender for Identity、SIEMへの連携

## 学習の流れ

1. AD環境のセットアップとドメインコントローラー初期ハードニング
2. グループポリシーによるセキュリティ設定の適用
3. Kerberos認証フローの理解と攻撃演習
4. LDAPS通信の構成と証明書導入
5. 特権アカウント管理フレームワークの設計
6. 監査ログ収集とSIEM連携による検知シナリオ演習

> **Note:** 次はProofレイヤのADセキュリティ演習に進み、実際の攻撃検知と防御策の運用を体験します。
