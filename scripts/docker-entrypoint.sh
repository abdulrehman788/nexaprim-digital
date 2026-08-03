#!/bin/sh
set -eu

# Ensure persistent dirs exist (Docker volumes)
mkdir -p /app/data /app/public/images/uploads

# Apply Prisma migrations against DATABASE_URL (SQLite file or Postgres)
if [ -d /app/prisma/migrations ]; then
  echo "Running prisma migrate deploy..."
  prisma migrate deploy --schema=/app/prisma/schema.prisma
fi

exec "$@"
