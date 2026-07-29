import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ServicesCatalogJsonLd } from "@/components/seo/JsonLd";
import { ServicesGrid } from "@/components/sections/services/ServicesGrid";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { Container } from "@/components/ui/Container";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Services",
  description:
    "From websites, apps, and branding to SEO, ads, AI automation, and growth strategy — Build, Brand, Market, Automate, and Scale with one accountable team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <ServicesCatalogJsonLd />
      <ServicesHero />
      <ServicesGrid />

      <section className="border-t border-slate-200 bg-white pb-20 sm:pb-24" aria-label="Pricing">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 text-center sm:px-10 sm:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
              Transparent pricing
            </p>
            <h2 className="mt-5 font-display text-[1.75rem] font-bold leading-[1.15] text-slate-900 sm:text-3xl">
              Want a custom mix with a live estimate?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Open the quote builder to add services and see your total update in real time — or
              start with a ready-made package.
            </p>
            <Link
              href="/pricing#quote-builder-heading"
              className="bg-gold-gradient mt-10 inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-lg px-10 py-3.5 text-sm font-semibold text-white shadow-glow transition-opacity hover:opacity-90 sm:text-base"
            >
              Open the quote builder
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
