#!/usr/bin/env bash
# Deploy Expandova on a VPS with Docker Compose.
# Run from the repo root on the server:
#   chmod +x scripts/deploy-vps.sh && ./scripts/deploy-vps.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "Missing .env — copy .env.production.example to .env and fill secrets first."
  exit 1
fi

# Fail fast if DATABASE_URL is missing (runtime DB path)
if ! grep -qE '^DATABASE_URL=.+' .env; then
  echo "ERROR: DATABASE_URL is missing in .env"
  echo 'Add: DATABASE_URL="file:/app/data/prod.db"'
  exit 1
fi

# Ensure LF line endings on the entrypoint (Windows checkouts can break sh)
if command -v sed >/dev/null 2>&1; then
  sed -i 's/\r$//' scripts/docker-entrypoint.sh 2>/dev/null || true
fi

chmod +x scripts/docker-entrypoint.sh

echo "→ Building image locally (no Docker Hub pull)..."
docker compose build

echo "→ Starting containers..."
docker compose up -d --remove-orphans

echo "→ Status:"
docker compose ps

echo ""
echo "App should listen on 127.0.0.1:3000."
echo "Health: curl -I http://127.0.0.1:3000/"
echo "Nginx: use deploy/nginx.conf (HTTP only), then: sudo certbot --nginx -d expandova.com -d www.expandova.com"
