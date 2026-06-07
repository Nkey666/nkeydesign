#!/bin/sh
# Cloud-init для Timeweb (Ubuntu 24.04). Вставить в раздел 7 при создании сервера.
# Шебанг именно #!/bin/sh — этого требует валидатор Timeweb. Скрипт POSIX-совместимый.
# Делает всё автоматически при первом запуске: swap, Node 22, nginx, pm2, клон, сборка, старт.
# SSL (certbot) — отдельно ПОСЛЕ привязки домена (DNS), на boot его не сделать.
set -e
exec > /var/log/nkey-init.log 2>&1   # лог установки: tail -f /var/log/nkey-init.log

REPO="https://github.com/Nkey666/nkeydesign.git"
APP_DIR="/var/www/nkeydesign"

# 1. Swap 2 ГБ — чтобы сборка Next не упала по памяти на 2 ГБ RAM
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# 2. Софт
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y git nginx ufw curl
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
npm i -g pm2

# 3. Firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# 4. Код + сборка
mkdir -p /var/www
git clone "$REPO" "$APP_DIR"
cd "$APP_DIR"
npm ci
npm run build

# 5. Запуск через pm2 + автостарт после ребута
pm2 start deploy/ecosystem.config.js
pm2 save
pm2 startup systemd -u root --hp /root

# 6. nginx
cp "$APP_DIR/deploy/nginx.conf" /etc/nginx/sites-available/nkeydesign
ln -sf /etc/nginx/sites-available/nkeydesign /etc/nginx/sites-enabled/nkeydesign
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "DONE. Дальше: прописать DNS A-записи на этот IP, затем certbot --nginx."
