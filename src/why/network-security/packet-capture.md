# 設計理由

## 🎯 目的 ― “パケットの動き” を **実体験で腹落ち** させる
ネットワークの基礎理論（TCP/IP 5 層モデルや 3-way handshake）を  
*「目に見える形」* で追体験したい **初学者** と、障害調査の初動を学びたい **現場エンジニア** がターゲット。  
教科書だけでは掴みにくい「レイヤ間を流れるバイト列」を、**GUI（Wireshark）＋ CLI（tcpdump）** の両輪で体感し、学習効率を最大化することが目的です。



## 📝 背景
1. **理論⇔実践ギャップ**  
   RFC や教科書は構造図ばかりで“動き”が見えない → 実パケットを観察  
2. **環境構築のハードル**  
   OSごとの差異で tcpdump / WinPcap が動かない → Docker で統一  
3. **学習コスト最適化**  
   “環境構築で一晩” を避け、2コマンドで解析開始

---

## 🛠️ アーキテクチャ & 設計方針

| レイヤ | 採用技術 | 役割 |
| :-- | :-- | :-- |
| **ホスト** | Docker Engine | 再現性の担保 |
| **Service** | `web`（Compose） | nginx HTTP + `tcpdump` 全IFキャプチャ |
| **Init** | `entrypoint.sh` | `tcpdump -i any -w /capture/capture.pcap` → nginx 起動 |
| **永続化** | bind mount `./capture:/capture` | pcap をホストへ共有 |
| **可観測性** | Wireshark | pcap を GUI 解析 |

**なぜ docker-composeか?**  
単一 `docker run` でも動くが、将来サービスを増やしやすいよう Compose v3.8 を採用。

---

## 🚀 クイックスタート ― 2 コマンド

```bash
git clone https://github.com/kwstyk/kwstyk-portfolio.git
cd kwstyk-portfolio/src/content/proofs/network-security/packet-capture
docker compose up --build -d   # (--build は初回のみ)
````

停止は `docker compose down`。
生成された `capture/capture.pcap` を Wireshark で開き、`GET /index.html` を確認する。

---

## 💡 設計ポイント

| 目的           | 具体策                                  |
| ------------ | ------------------------------------ |
| **再現性 100%** | Compose + 単一 Dockerfile。CI でも同手順を実行  |
| **最小ステップ**   | ホストに必要なのは Docker と git だけ            |
| **学習の可視化**   | pcap を残し何度でも再解析                      |
| **拡張容易性**    | `services:` に DB/攻撃ツールを追加し多段通信ラボへ発展可 |

---

## 📈 期待される学習効果

* **プロトコル読解** — Ethernet→IP→TCP→HTTP のヘッダを実パケットで確認
* **初動調査力** — “まず `tcpdump -i any`” が体得できる
* **文書化スキル** — Why / How / Outcome を切り分けて記述する習慣

