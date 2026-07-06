import Link from "next/link";

import { StarryNightBackground } from "@/components/sections/services/StarryNightBackground";
import { Container } from "@/components/ui/Container";
import { ctaLinks } from "@/lib/constants";
import type { ServiceDetail } from "@/types";

interface ServiceCenteredHeroProps {
  service: ServiceDetail;
}

export function ServiceCenteredHero({ service }: ServiceCenteredHeroProps) {
  const titleBefore = service.heroTitleBefore ?? service.headline;
  const titleAccent = service.heroTitleAccent;
  const overline = service.heroOverline ?? service.title;
  const ctaLabel = service.heroCtaLabel ?? "Get Your Free Consultation";

  return (
    <section
      aria-labelledby="service-heading"
      className="relative overflow-hidden px-4 pb-24 pt-36 sm:px-6 sm:pb-28 sm:pt-40 lg:pb-32 lg:pt-44"
    >
      <StarryNightBackground />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            {overline}
          </p>

          <h1
            id="service-heading"
            className="mt-5 font-display text-[2rem] font-bold leading-[1.12] text-white sm:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.1]"
          >
            {titleBefore}
            {titleAccent ? (
              <>
                {" "}
                <span className="text-gold-gradient">{titleAccent}</span>
              </>
            ) : null}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-content-secondary sm:mt-8 sm:text-lg sm:leading-8">
            {service.longDescription}
          </p>

          <Link
            href={ctaLinks.strategyCall}
            className="bg-gold-gradient mt-10 inline-flex min-h-[3.25rem] items-center justify-center rounded-lg px-10 py-3.5 text-sm font-semibold text-black shadow-glow transition-opacity hover:opacity-90 sm:mt-12 sm:text-base"
          >
            {ctaLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
