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

# Ensure LF line endings on the entrypoint (Windows checkouts can break sh)
if command -v sed >/dev/null 2>&1; then
  sed -i 's/\r$//' scripts/docker-entrypoint.sh 2>/dev/null || true
fi

chmod +x scripts/docker-entrypoint.sh

echo "→ Building and starting containers..."
docker compose pull || true
docker compose build --pull
docker compose up -d

echo "→ Status:"
docker compose ps

echo ""
echo "App should listen on 127.0.0.1:3000. Point Nginx at it (see deploy/nginx.conf)."
echo "Health: curl -I http://127.0.0.1:3000/"
