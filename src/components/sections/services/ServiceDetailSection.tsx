import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ctaLinks } from "@/lib/constants";
import type { ServiceDetail } from "@/types";

function ServiceVisual({ service }: { service: ServiceDetail }) {
  const Icon = service.icon;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${service.gradientFrom} 0%, ${service.gradientVia}88 50%, ${service.gradientTo} 100%)`,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,255,255,0.15),transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white bg-accent text-black shadow-lg">
        <Icon className="h-7 w-7" strokeWidth={2.25} aria-hidden="true" />
      </div>
    </div>
  );
}

interface ServiceDetailSectionProps {
  service: ServiceDetail;
}

export function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
  const Icon = service.icon;

  return (
    <>
      <section
        aria-labelledby="service-heading"
        className="relative overflow-hidden bg-[#050505] pb-12 pt-32 lg:pt-36"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_20%,rgba(197,163,88,0.08),transparent_55%)]" />
        <Container className="relative">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All services
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {service.title}
              </p>
              <h1
                id="service-heading"
                className="mt-4 max-w-2xl font-serif text-[2rem] font-bold leading-[1.12] text-white sm:text-display-md"
              >
                {service.headline}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg">
                {service.longDescription}
              </p>
            </div>

            <ServiceVisual service={service} />
          </div>
        </Container>
      </section>

      <Section variant="light" divider={false}>
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              What&apos;s included
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                >
                  <h3 className="font-display text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">Typical outcomes</h2>
              <ul className="mt-5 space-y-3">
                {service.outcomes.map((outcome) => (
                  <li
                    key={outcome.slice(0, 48)}
                    className="flex gap-3 text-sm leading-relaxed text-slate-600 sm:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-slate-900">Best fit for</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{service.idealFor}</p>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl text-center">
            <p className="text-base text-slate-600">
              Want to see how {service.title.toLowerCase()} fits your growth plan?
            </p>
            <Button href={ctaLinks.strategyCall} size="lg" pill className="mt-4">
              Book a Strategy Call
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
