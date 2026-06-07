# Деплой nkeydesign.ru на VPS (Ubuntu 24.04)

Стек на сервере: Node 22 + pm2 (процесс) + nginx (прокси) + certbot (SSL Let's Encrypt).
Сайт собирается на сервере и работает как `next start` на :3000, nginx отдаёт его наружу по 80/443.

> Команды выполняются на сервере под root (или через `sudo`). Замени `СЕРВЕР_IP` на реальный.

---

## 0. Что нужно заранее
- VPS создан, есть IP и доступ по SSH.
- Домен `nkeydesign.ru` куплен, есть доступ к DNS у регистратора.
- Код на GitHub: https://github.com/Nkey666/nkeydesign (публичный — клонируется без пароля).

## 1. Подключиться к серверу
```bash
ssh root@СЕРВЕР_IP
```

## 2. Swap 2 ГБ (страховка: на 2 ГБ RAM сборка Next может упасть по памяти)
```bash
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

## 3. Базовый софт
```bash
apt update && apt upgrade -y
apt install -y git nginx ufw
# Node 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
node -v   # должно быть v22.x
npm i -g pm2
```

## 4. Firewall
```bash
ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw --force enable
```

## 5. Забрать код и собрать
```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/Nkey666/nkeydesign.git
cd nkeydesign
npm ci
npm run build
```

## 6. Запуск через pm2
```bash
pm2 start deploy/ecosystem.config.js
pm2 save
pm2 startup systemd -u root --hp /root   # выполнить команду, которую он напечатает
```
Проверка: `curl -I http://127.0.0.1:3000` → должен ответить 200.

## 7. nginx
```bash
cp /var/www/nkeydesign/deploy/nginx.conf /etc/nginx/sites-available/nkeydesign
ln -s /etc/nginx/sites-available/nkeydesign /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

## 8. DNS (у регистратора домена)
Добавить A-записи на IP сервера:
```
A   @     СЕРВЕР_IP
A   www   СЕРВЕР_IP
```
Подождать распространения (от пары минут до пары часов). Проверка: `ping nkeydesign.ru` показывает твой IP.

## 9. SSL (после того как DNS заработал)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d nkeydesign.ru -d www.nkeydesign.ru --redirect -m ТВОЙ_EMAIL --agree-tos --no-eff-email
```
certbot сам допишет :443 и редирект с http на https. Авто-продление уже настроено.

## 10. Проверка
- https://nkeydesign.ru — открывается, замок есть.
- https://nkeydesign.ru/robots.txt, /sitemap.xml, /llms.txt — отдаются.
- https://nkeydesign.ru/opengraph-image.* — картинка.

---

## Обновление сайта (после правок в коде)
```bash
cd /var/www/nkeydesign
git pull
npm ci
npm run build
pm2 reload nkeydesign
```

## Полезное
- Логи: `pm2 logs nkeydesign`
- Статус: `pm2 status`
- Перезапуск nginx: `systemctl reload nginx`
