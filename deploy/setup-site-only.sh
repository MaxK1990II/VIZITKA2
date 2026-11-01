#!/bin/bash
# Replace Prox VPN with portfolio site on the same VM (single public IP).
set -euo pipefail

DOMAIN="${1:-kanochkinmm.ru}"
APP_DIR="/var/www/kanochkinmm-portfolio"

[[ $EUID -ne 0 ]] && { echo "Run: sudo bash setup-site-only.sh"; exit 1; }

export DEBIAN_FRONTEND=noninteractive

# Stop VPN — free port 443
if systemctl is-active --quiet xray 2>/dev/null; then
  systemctl stop xray
  systemctl disable xray
  echo "Xray stopped and disabled."
fi

apt-get update
apt-get install -y nginx certbot python3-certbot-nginx git curl ufw

if ! command -v node >/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

mkdir -p "$APP_DIR"
chown -R ubuntu:www-data "$APP_DIR"

cat > /etc/systemd/system/kanochkinmm.service <<EOF
[Unit]
Description=KanochkinMM Next.js (standalone)
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
systemctl enable kanochkinmm nginx
systemctl restart nginx

ufw allow 22/tcp >/dev/null 2>&1 || true
ufw allow 80/tcp >/dev/null 2>&1 || true
ufw allow 443/tcp >/dev/null 2>&1 || true
ufw --force enable >/dev/null 2>&1 || true

echo "Setup done. Deploy app files to ${APP_DIR}, then:"
echo "  sudo systemctl restart kanochkinmm"
echo "  sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos -m admin@${DOMAIN}"
