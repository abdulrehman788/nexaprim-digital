import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { ctaLinks } from "@/lib/constants";
import type { ServiceDetail } from "@/types";

interface ServicePageCtaProps {
  service: ServiceDetail;
}

export function ServicePageCta({ service }: ServicePageCtaProps) {
  const ctaLabel = service.heroCtaLabel ?? "Get Your Free Consultation";

  return (
    <section
      aria-labelledby="service-page-cta"
      className="border-t border-white/[0.06] bg-surface-primary py-20 sm:py-24"
    >
      <Container>
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#111118] px-6 py-12 text-center sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Next step</p>

          <h2
            id="service-page-cta"
            className="mt-5 font-display text-[1.75rem] font-bold leading-[1.15] text-white sm:text-3xl"
          >
            Ready to move forward with {service.title}?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg sm:leading-8">
            Book a free consultation and we&apos;ll map how {service.title.toLowerCase()} fits your
            goals — clear next steps, no generic pitch deck.
          </p>

          <Link
            href={ctaLinks.strategyCall}
            className="bg-gold-gradient mt-10 inline-flex min-h-[3.25rem] items-center justify-center rounded-lg px-10 py-3.5 text-sm font-semibold text-black shadow-glow transition-opacity hover:opacity-90 sm:text-base"
          >
            {ctaLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
