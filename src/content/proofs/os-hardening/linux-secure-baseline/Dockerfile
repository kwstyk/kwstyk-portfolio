# linux-secure-baseline/Dockerfile
FROM debian:11

# SSHd, Ansible, Lynis をインストール
RUN apt-get update \
 && apt-get install -y openssh-server ansible lynis \
 && mkdir /var/run/sshd \
 # root パスワードを root に設定（ラボ用）
 && echo 'root:root' | chpasswd \
 # PermitRootLogin を有効化
 && sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

WORKDIR /work

EXPOSE 22

# SSH デーモンをフォアグラウンドで起動
CMD ["/usr/sbin/sshd","-D"]
