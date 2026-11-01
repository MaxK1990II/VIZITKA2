#!/bin/bash
# One-time setup on YC VM (second IP for site, first IP for VPN).
# Run on server: sudo bash setup-server.sh <VPN_IP> <SITE_IP> <DOMAIN>
set -euo pipefail

VPN_IP="${1:-84.201.154.71}"
SITE_IP="${2:-}"
DOMAIN="${3:-kanochkinmm.ru}"

[[ -z "$SITE_IP" ]] && { echo "Usage: sudo bash setup-server.sh <VPN_IP> <SITE_IP> [DOMAIN]"; exit 1; }
[[ $EUID -ne 0 ]] && { echo "Run as root: sudo bash setup-server.sh ..."; exit 1; }

echo "VPN IP:  $VPN_IP (Xray stays here on :443)"
echo "Site IP: $SITE_IP (nginx + Next.js on :80/:443)"
echo "Domain:  $DOMAIN"

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y nginx certbot python3-certbot-nginx git curl

# Node.js 20 LTS
if ! command -v node >/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

# Bind Xray to VPN IP only so nginx can use SITE_IP:443
XRAY_CFG="/usr/local/etc/xray/config.json"
if [[ -f "$XRAY_CFG" ]]; then
  cp "$XRAY_CFG" "${XRAY_CFG}.bak.$(date +%Y%m%d%H%M%S)"
  python3 - <<PY
import json
path = "$XRAY_CFG"
vpn_ip = "$VPN_IP"
with open(path, encoding="utf-8") as f:
    cfg = json.load(f)
for inbound in cfg.get("inbounds", []):
    if inbound.get("port") == 443:
        inbound["listen"] = vpn_ip
with open(path, "w", encoding="utf-8") as f:
    json.dump(cfg, f, indent=2)
    f.write("\n")
print(f"Xray inbound listen -> {vpn_ip}")
PY
  systemctl restart xray
  echo "Xray restarted. Verify VPN still works before continuing."
fi

APP_DIR="/var/www/kanochkinmm-portfolio"
mkdir -p "$APP_DIR"
chown -R "${SUDO_USER:-ubuntu}:www-data" "$APP_DIR"

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
    listen ${SITE_IP}:80;
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

if command -v ufw >/dev/null; then
  ufw allow 22/tcp >/dev/null 2>&1 || true
  ufw allow 80/tcp >/dev/null 2>&1 || true
  ufw allow 443/tcp >/dev/null 2>&1 || true
  ufw --force enable >/dev/null 2>&1 || true
fi

echo ""
echo "Setup complete."
echo "Next steps:"
echo "  1) Deploy app files to ${APP_DIR}"
echo "  2) sudo systemctl restart kanochkinmm"
echo "  3) sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos -m admin@${DOMAIN}"
echo "  4) Point DNS A records @ and www to ${SITE_IP}"
