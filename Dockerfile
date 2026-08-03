# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

FROM node:20-bookworm-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public URL is baked into the client bundle at build time
ARG NEXT_PUBLIC_SITE_URL=https://expandova.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

# Prisma + Next prerender need DATABASE_URL at build time (throwaway SQLite).
# Runtime uses the real DATABASE_URL from compose/.env (volume-mounted DB).
ENV DATABASE_URL="file:/app/prisma/build.db"

RUN npx prisma generate \
  && npx prisma migrate deploy \
  && npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Default; overridden by compose/env_file at runtime
ENV DATABASE_URL="file:/app/data/prod.db"

RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs \
  && mkdir -p /app/data /app/public/images/uploads \
  && chown -R nextjs:nodejs /app

USER root
# Prisma CLI for migrate deploy on container start
RUN npm install -g prisma@5.22.0

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/scripts/docker-entrypoint.sh ./scripts/docker-entrypoint.sh

RUN chmod +x ./scripts/docker-entrypoint.sh \
  && chown -R nextjs:nodejs /app/data /app/public /app/prisma /app/scripts

USER nextjs

EXPOSE 3000

VOLUME ["/app/data", "/app/public/images/uploads"]

ENTRYPOINT ["./scripts/docker-entrypoint.sh"]
CMD ["node", "server.js"]
