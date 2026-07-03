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

## Image Assets

Placeholder SVG assets are included for development. Replace files in `public/images/` with production photography for hero mockups, industry cards, and case study imagery.
