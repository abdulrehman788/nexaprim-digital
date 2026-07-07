import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { StarryNightBackground } from "@/components/sections/services/StarryNightBackground";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { serviceCategories } from "@/data/services";
import { ctaLinks } from "@/lib/constants";
import type { ServiceDetail } from "@/types";

interface ServiceCenteredHeroProps {
  service: ServiceDetail;
}

export function ServiceCenteredHero({ service }: ServiceCenteredHeroProps) {
  const Icon = service.icon;
  const titleBefore = service.heroTitleBefore ?? service.headline;
  const titleAccent = service.heroTitleAccent;
  const overline = service.heroOverline ?? service.title;
  const ctaLabel = service.heroCtaLabel ?? "Get Your Free Consultation";
  const categoryLabel =
    serviceCategories.find((c) => c.id === service.category)?.label ?? "Services";

  return (
    <section
      aria-labelledby="service-heading"
      className="relative overflow-hidden bg-[#050505] pb-10 pt-32 sm:pb-12 sm:pt-36 lg:pt-40"
    >
      <StarryNightBackground />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(197,163,88,0.12),transparent_55%)]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <Link
          href="/services"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All services
        </Link>

        <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0d0d12] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{overline}</p>
              <p className="mt-2 text-xs font-medium text-content-muted">{categoryLabel}</p>
              <h1
                id="service-heading"
                className="mt-4 font-serif text-[1.65rem] font-bold leading-[1.12] text-white sm:text-3xl lg:text-[2.35rem]"
              >
                {titleBefore}
                {titleAccent ? (
                  <>
                    {" "}
                    <span className="text-gold-gradient">{titleAccent}</span>
                  </>
                ) : null}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg">
                {service.longDescription}
              </p>
              {service.heroSecondaryLine ? (
                <p className="mt-3 text-sm font-medium text-accent/90">{service.heroSecondaryLine}</p>
              ) : null}
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={ctaLinks.strategyCall} size="lg" pill>
                  {ctaLabel}
                </Button>
                <a
                  href="#service-deliverables"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
                >
                  See deliverables
                </a>
              </div>
            </div>

            <div className="relative min-h-[240px] lg:min-h-[400px]">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(145deg, ${service.gradientFrom} 0%, ${service.gradientVia} 45%, ${service.gradientTo} 100%)`,
                }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#0d0d12]/80 via-transparent to-transparent lg:from-[#0d0d12]/40"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm sm:h-32 sm:w-32">
                  <Icon className="h-14 w-14 text-white sm:h-16 sm:w-16" strokeWidth={1.25} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          <ul className="grid divide-y divide-white/[0.08] border-t border-white/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <li className="px-6 py-5 text-center sm:py-6">
              <p className="font-display text-2xl font-bold text-white">{service.deliverables.length}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-content-muted">Deliverables</p>
            </li>
            <li className="px-6 py-5 text-center sm:py-6">
              <p className="font-display text-2xl font-bold text-white">{service.outcomes.length}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-content-muted">Key outcomes</p>
            </li>
            <li className="px-6 py-5 text-center sm:py-6">
              <p className="font-display text-lg font-bold leading-snug text-white sm:text-xl">{categoryLabel}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-content-muted">Practice area</p>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
