# VPS deployment — Expandova

Repo: [https://github.com/abdulrehman788/nexaprim-digital.git](https://github.com/abdulrehman788/nexaprim-digital.git)

Use these commands on an **Ubuntu 22.04+** VPS. Replace nothing in the clone URL.

---

## 0. Push latest code from your PC first

On your Windows machine (project folder):

```bash
git add .
git commit -m "Prepare VPS deploy (Docker, Nginx, security)"
git push origin master
```

---

## 1. One-time server setup

SSH into the VPS, then:

```bash
sudo apt update && sudo apt install -y docker.io docker-compose-v2 nginx certbot python3-certbot-nginx git
sudo usermod -aG docker $USER
# log out and SSH back in so docker works without sudo
```

Point DNS **A records** for `expandova.com` and `www.expandova.com` to this VPS IP.

---

## 2. Clone this repo

```bash
sudo mkdir -p /var/www/expandova
sudo chown $USER:$USER /var/www/expandova
cd /var/www/expandova
git clone https://github.com/abdulrehman788/nexaprim-digital.git .
```

---

## 3. Production env

```bash
cd /var/www/expandova
cp .env.production.example .env
nano .env
chmod 600 .env
```

Minimum values:

```env
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_PUBLIC_SITE_URL=https://expandova.com
ALLOWED_ORIGINS=https://www.expandova.com
DATABASE_URL="file:/app/data/prod.db"
ADMIN_PASSWORD=your-strong-password-here
ADMIN_SESSION_SECRET=your-long-random-secret-here-min-32-chars
CONTACT_TO_EMAIL=info@expandova.com
```

Generate secrets:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

---

## 4. Build & start (Docker)

```bash
cd /var/www/expandova
chmod +x scripts/deploy-vps.sh scripts/docker-entrypoint.sh
./scripts/deploy-vps.sh
curl -I http://127.0.0.1:3000/
```

---

## 5. Nginx + HTTPS

Install the **HTTP-only** config first (no SSL lines — required so `nginx -t` passes):

```bash
sudo mkdir -p /var/www/certbot
sudo cp /var/www/expandova/deploy/nginx.conf /etc/nginx/sites-available/expandova
sudo ln -sf /etc/nginx/sites-available/expandova /etc/nginx/sites-enabled/expandova
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Then let Certbot create certificates **and** add the `443 ssl` blocks:

```bash
sudo certbot --nginx -d expandova.com -d www.expandova.com
```

Open: `https://expandova.com` and `https://expandova.com/admin`

---

## 6. Later updates

```bash
cd /var/www/expandova
git pull origin master
./scripts/deploy-vps.sh
```

---

## Firewall (recommended)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Build fails: `DATABASE_URL` / Prisma / `/blog` prerender | Pull latest Dockerfile (build-time SQLite is set). Rebuild: `./scripts/deploy-vps.sh` |
| `nginx -t` fails: SSL without certificate | Use latest `deploy/nginx.conf` (HTTP only), then run Certbot |
| Admin **Forbidden** | Rebuild after setting `NEXT_PUBLIC_SITE_URL` + `ALLOWED_ORIGINS` correctly |
| Admin **misconfigured** | Strong `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` (no placeholders) |
| 502 Bad Gateway | `docker compose -f /var/www/expandova/docker-compose.yml ps` |
| Empty DB after recreate | Never run `docker compose down -v` (that deletes volumes) |
| `containerd` / `containerd.io` conflict | Stick with Ubuntu `docker.io` package; don’t also install Docker CE |
| Docker Hub pull denied for `expandova-web` | Expected — image is built locally (`pull_policy: build`) |

Full detail also lives in this file; PM2 (no Docker) option is below.

### PM2 without Docker

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
cd /var/www/expandova
git clone https://github.com/abdulrehman788/nexaprim-digital.git .
cp .env.production.example .env
# In .env use: DATABASE_URL="file:./data/prod.db"
mkdir -p data public/images/uploads
npm ci
npx prisma generate
npm run build
npx prisma migrate deploy
sudo npm i -g pm2
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup
```

Then use the same Nginx + Certbot steps as above.
