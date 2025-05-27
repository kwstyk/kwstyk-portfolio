---

title: "インシデントレスポンス"
description: "インシデントの検知から復旧、事後対応までの一連の実践的プロセス"
date: 2025-05-12
-------------------

## 概要

インシデントレスポンスカテゴリでは、セキュリティインシデントのライフサイクルに沿って、迅速かつ効果的に対応する手法を学びます。
準備（Preparation）、検知・分析（Detection & Analysis）、封じ込め（Containment）、根絶（Eradication）、復旧（Recovery）、事後対応（Post-Incident Activity）まで、一連のプロセスを通じて実践演習を提供します。

## アーキテクチャ図

```mermaid
graph TD
  subgraph Incident_Response
    Preparation[準備 (Preparation)]
    Detection[検知・分析 (Detection & Analysis)]
    Containment[封じ込め (Containment)]
    Eradication[根絶 (Eradication)]
    Recovery[復旧 (Recovery)]
    Lessons[事後対応 (Post-Incident Activity)]
  end
  Preparation --> Detection
  Detection --> Containment
  Containment --> Eradication
  Eradication --> Recovery
  Recovery --> Lessons
  Lessons --> Preparation
```

## 主なトピック

* **準備**
  インシデント対応計画、チーム編成、ツール・演習の設計
* **検知・分析**
  アラートトリアージ、フォレンジックデータ収集、タイムライン作成
* **封じ込め**
  ネットワーク分離、マルウェア隔離、二次被害防止策
* **根絶**
  マルウェア除去、脆弱性修正、システムクリーニング
* **復旧**
  サービス再開、バックアップリストア、システム強化
* **事後対応**
  インシデント報告書作成、教訓抽出、改善策の実装

## 学習の流れ

1. 対応体制と実行手順のドキュメント化
2. アラートシナリオに基づく検知演習
3. フォレンジックツールによる証拠収集
4. 封じ込め・根絶の手順実践
5. 復旧演習とバックアップ検証
6. 事後報告書の作成と演習レビュー

> **Note:** 次にProofレイヤのインシデントレスポンス演習へ進み、実際の攻撃シナリオを想定したハンズオンを行います。
