#!/usr/bin/env bash
set -euo pipefail

SNIPPET_DIR="/etc/nginx/snippets"
SNIPPET="${SNIPPET_DIR}/kanochkinmm-security.conf"
SITE="/etc/nginx/sites-available/kanochkinmm"
INCLUDE_LINE="    include /etc/nginx/snippets/kanochkinmm-security.conf;"

if [[ ! -f "$SITE" ]]; then
  echo "ERROR: nginx site config not found: $SITE" >&2
  exit 1
fi

mkdir -p "$SNIPPET_DIR"

cat > "$SNIPPET" <<'EOF'
# Security headers for kanochkinmm.ru (include inside server { ... })
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "DENY" always;
add_header Content-Security-Policy "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:;" always;
EOF

# Drop previous includes, then inject into every server block.
sed -i '/kanochkinmm-security\.conf/d' "$SITE"
sed -i "s|server {|server {\n${INCLUDE_LINE}|" "$SITE"

# Collapse accidental blank-line runs (keeps certbot config readable).
awk 'BEGIN{b=0} /^$/{b++; if(b<=1) print; next} {b=0; print}' "$SITE" > "${SITE}.tmp"
mv "${SITE}.tmp" "$SITE"

nginx -t
systemctl reload nginx
echo "Security headers applied."
