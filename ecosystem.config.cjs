/**
 * PM2 process file for non-Docker VPS deploys.
 * Next.js loads `.env` from the app directory automatically.
 *
 *   npm ci && npx prisma generate && npm run build
 *   npx prisma migrate deploy
 *   pm2 start ecosystem.config.cjs
 *   pm2 save && pm2 startup
 */
module.exports = {
  apps: [
    {
      name: "expandova",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3000",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "768M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
