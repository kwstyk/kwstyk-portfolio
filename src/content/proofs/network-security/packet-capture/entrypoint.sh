#!/usr/bin/env bash
set -euxo pipefail

echo "[entrypoint] Starting tcpdump..."
tcpdump -i any -w /capture/capture.pcap &

echo "[entrypoint] Starting nginx..."
# exec を使ってプロセスを nginx に差し替えることで、コンテナが nginx とともに正しく動き続けます
exec nginx -g 'daemon off;'
