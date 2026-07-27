import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { QuoteBuilder } from "@/components/pricing/QuoteBuilder";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pricingPackages } from "@/data/growth-catalog";
import { ctaLinks } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = generatePageMetadata({
  title: "Pricing",
  description:
    "Transparent starting prices for every Expandova service. Choose a package or build your own proposal with a live running total.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.14),transparent_60%)]"
          aria-hidden="true"
        />
        <Container className="relative text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            Pricing
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-display-sm font-bold leading-tight text-white sm:text-display-md">
            Build Your Growth Plan.{" "}
            <span className="text-gold-gradient">Pay for What You Need.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg">
            Every service has a transparent starting price. Pick a package, or add exactly the
            services you want and watch your estimate update in real time.
          </p>
        </Container>
      </section>

      {/* Packages */}
      <Section variant="primary" aria-labelledby="packages-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="packages-heading"
              className="font-display text-display-sm font-bold text-white"
            >
              Simple, transparent packages
            </h2>
            <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
              Start with a plan built around where your business is today.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricingPackages.map((pkg) => {
              const isEnterprise = pkg.price === null;
              return (
                <div
                  key={pkg.id}
                  className={cn(
                    "relative flex flex-col rounded-2xl border p-6",
                    pkg.highlighted
                      ? "border-accent/60 bg-gradient-to-b from-surface-elevated to-surface-secondary shadow-glow"
                      : "border-border-subtle bg-surface-elevated",
                  )}
                >
                  {pkg.highlighted ? (
                    <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                      Most popular
                    </span>
                  ) : null}

                  <h3 className="font-display text-lg font-bold text-white">{pkg.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wide text-content-muted">
                    {pkg.idealFor}
                  </p>

                  <p className="mt-4 font-display text-3xl font-bold text-white">
                    {pkg.priceLabel}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                    {pkg.description}
                  </p>

                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-content-secondary">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={isEnterprise ? ctaLinks.consultation : ctaLinks.strategyCall}
                    className={cn(
                      "mt-6 inline-flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors",
                      pkg.highlighted
                        ? "bg-accent text-white shadow-glow hover:bg-accent-hover"
                        : "border border-border text-white hover:border-accent hover:text-accent",
                    )}
                  >
                    {isEnterprise ? "Request a Quote" : "Get started"}
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Quote builder */}
      <Section variant="dark" aria-labelledby="quote-builder-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Interactive quote builder
            </p>
            <h2
              id="quote-builder-heading"
              className="mt-3 font-display text-display-sm font-bold text-white"
            >
              Or build your own proposal
            </h2>
            <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
              Add services across Build, Brand, Market, Automate, and Scale. Your estimated total
              updates instantly.
            </p>
          </div>

          <div className="mt-12">
            <QuoteBuilder />
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section variant="primary">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/20 via-surface-elevated to-surface-secondary px-6 py-14 text-center sm:px-12">
            <h2 className="mx-auto max-w-2xl font-display text-display-sm font-bold text-white">
              Not sure where to start?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg">
              Book a free consultation and we&apos;ll recommend the right mix of services for your
              goals and budget.
            </p>
            <Link
              href={ctaLinks.consultation}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-accent-hover sm:text-base"
            >
              Book a Free Consultation
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
