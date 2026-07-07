import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ctaLinks } from "@/lib/constants";
import type { ServiceDetail } from "@/types";

interface ServicePageCtaProps {
  service: ServiceDetail;
}

export function ServicePageCta({ service }: ServicePageCtaProps) {
  const ctaLabel = service.heroCtaLabel ?? "Get Your Free Consultation";

  return (
    <section aria-labelledby="service-page-cta" className="bg-[#050505] py-12 sm:py-14">
      <Container>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#111118]">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Next step</p>
              <h2
                id="service-page-cta"
                className="mt-3 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl"
              >
                Ready to move forward with {service.title}?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-content-secondary sm:text-base">
                Book a free consultation and we&apos;ll map how {service.title.toLowerCase()} fits your
                goals — clear next steps, no generic pitch deck.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={ctaLinks.strategyCall} size="lg" pill className="w-full sm:w-auto">
                  {ctaLabel}
                </Button>
                <Link
                  href="/services"
                  className="inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent sm:w-auto"
                >
                  All services
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="border-t border-white/[0.08] bg-[#0a0a0f] px-6 py-8 sm:px-10 sm:py-10 lg:border-l lg:border-t-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-content-muted">
                On the call
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "Scope aligned to your business goals",
                  "Timeline and deliverable walkthrough",
                  "Budget range before you commit",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-content-secondary">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
