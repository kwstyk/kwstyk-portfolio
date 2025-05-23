# ベースイメージ
FROM ubuntu:20.04

# 必要パッケージをインストール
RUN apt-get update && \
    apt-get install -y nginx tcpdump && \
    rm -rf /var/lib/apt/lists/*

# キャプチャ出力先ディレクトリを作成
RUN mkdir /capture

# nginx を 8080 ポートで起動するよう設定
RUN sed -i 's/listen 80;/listen 8080;/' /etc/nginx/sites-available/default

# エントリポイントスクリプトをコピー
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# ポート公開
EXPOSE 8080

# 起動時にスクリプトを実行
CMD ["/entrypoint.sh"]
