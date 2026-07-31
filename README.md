# NexaPrime Digital

Production-grade digital marketing agency website built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom design tokens
- **Animations:** Framer Motion (entrance/scroll effects)
- **Icons:** lucide-react
- **Fonts:** next/font (Syne + DM Sans, self-hosted at build time)
- **Forms:** React Hook Form + Zod (ready for contact pages)

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Folder Structure

```
src/
├── app/                    # App Router pages, layout, SEO routes
│   ├── layout.tsx          # Root layout, fonts, metadata, header/footer
│   ├── page.tsx            # Homepage (imports sections only)
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   └── (routes)/           # Future inner pages
├── components/
│   ├── sections/           # Homepage section components
│   ├── layout/             # Header, Footer, Navbar, MobileMenu
│   ├── ui/                 # Reusable UI primitives
│   └── seo/                # JSON-LD structured data
├── data/                   # All business content (no hardcoded copy in components)
├── lib/                    # Constants, SEO helpers, utilities, fonts
└── types/                  # Shared TypeScript interfaces
public/
├── images/                 # Image assets
└── icons/
```

## Content Management

All business copy, navigation data, and section content lives in `src/data/`. Components import from data files — never hardcode marketing text inside components.

## SEO

- Dynamic metadata via `generateMetadata` / `generatePageMetadata`
- JSON-LD: Organization, WebSite, BreadcrumbList, Service schemas
- Dynamic `sitemap.ts` and `robots.ts`
- Semantic HTML5, single H1 per page, logical heading hierarchy

## Deployment

Optimized for [Vercel](https://vercel.com). Set `NEXT_PUBLIC_SITE_URL` in your environment variables.

## Admin panel (ops dashboard)

The site includes an authenticated admin area at `/admin` for content **and** operations:

- Analytics (sessions, live visitors via SSE, countries, devices, form funnels)
- Orders & payments (gateway-agnostic)
- Contact submissions
- Call bookings
- Generic form submissions
- Blog / Stories CMS

### Local setup

```bash
cp .env.example .env.local
# Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET (min 16 chars)

npm install
npx prisma migrate dev
npm run db:seed          # case studies + mock ops data
npm run dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) and sign in with `ADMIN_PASSWORD`.

### Auth model

Admin auth uses a signed HTTP-only cookie (`np_admin_session`) backed by `ADMIN_PASSWORD` + `ADMIN_SESSION_SECRET` — the same model as the existing CMS. An `AdminUser` row is seeded for future role expansion (`SUPER_ADMIN` / `ADMIN` / `SUPPORT`); login is still password-env based today.

### Payment gateway keys

Orders go through `src/lib/payments/gateway.ts` (`PaymentGateway` interface). Local default is **mock**.

Mock checkout UI: `/checkout/mock?order=ORD-…&txn=mock_…` (returned from `POST /api/orders`, also linked from order detail).

To plug in a real gateway later:

1. Implement `createPayment`, `verifyPayment`, and `handleWebhook` for Stripe / JazzCash / EasyPaisa / PayPal.
2. Register it in `getPaymentGateway()` and set `PAYMENT_GATEWAY=stripe` (or your name).
3. Put secrets in env (`STRIPE_SECRET_KEY`, webhook secret, etc.) — never commit them.
4. Point the provider webhook URL at `/api/payments/webhook`.

Order rows already store `gatewayName` + `gatewayTxnId`, so multiple gateways can coexist without schema changes.

### Tracking

`SiteTracker` in the root layout pings `/api/analytics/track` on navigation and `/api/analytics/heartbeat` every ~25s for live visitors. Contact/booking POSTs persist to SQLite and still attempt email delivery via FormSubmit / `CONTACT_FORM_ENDPOINT`.

## Image Assets

Placeholder SVG assets are included for development. Replace files in `public/images/` with production photography for hero mockups, industry cards, and case study imagery.
