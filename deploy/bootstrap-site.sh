#!/bin/bash
# Full bootstrap: stop Prox VPN, deploy portfolio from GitHub.
set -euo pipefail
DOMAIN="kanochkinmm.ru"
APP_DIR="/var/www/kanochkinmm-portfolio"
REPO="https://github.com/MaxK1990II/VIZITKA2.git"

export DEBIAN_FRONTEND=noninteractive

systemctl stop xray 2>/dev/null || true
systemctl disable xray 2>/dev/null || true

apt-get update
apt-get install -y nginx certbot python3-certbot-nginx git curl ufw

if ! command -v node >/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

rm -rf "$APP_DIR"
git clone "$REPO" "$APP_DIR"
cd "$APP_DIR"
npm ci
npm run build

cat > /etc/systemd/system/kanochkinmm.service <<EOF
[Unit]
Description=KanochkinMM Next.js
After=network.target
[Service]
Type=simple
User=ubuntu
WorkingDirectory=${APP_DIR}/.next/standalone
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=127.0.0.1
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
[Install]
WantedBy=multi-user.target
EOF

cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
chown -R ubuntu:www-data "$APP_DIR"

cat > /etc/nginx/snippets/kanochkinmm-security.conf <<'HEADERS'
# Security headers for kanochkinmm.ru (include inside server { ... })
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "DENY" always;
add_header Content-Security-Policy "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:;" always;
HEADERS

cat > /etc/nginx/sites-available/kanochkinmm <<EOF
server {
    include /etc/nginx/snippets/kanochkinmm-security.conf;
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/kanochkinmm /etc/nginx/sites-enabled/kanochkinmm
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl daemon-reload
systemctl enable kanochkinmm nginx
systemctl restart kanochkinmm nginx

ufw allow 22/tcp; ufw allow 80/tcp; ufw allow 443/tcp
ufw --force enable || true

certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "admin@${DOMAIN}" || true

echo "DONE: site should be live on http://${DOMAIN}"
