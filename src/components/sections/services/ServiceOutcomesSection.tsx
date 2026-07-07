import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/Container";
import type { ServiceDetail } from "@/types";

interface ServiceOutcomesSectionProps {
  service: ServiceDetail;
}

export function ServiceOutcomesSection({ service }: ServiceOutcomesSectionProps) {
  return (
    <section
      id="service-deliverables"
      aria-labelledby="service-outcomes-heading"
      className="border-b border-white/[0.06] bg-[#08080c] py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Outcomes & deliverables
              </p>
              <h2
                id="service-outcomes-heading"
                className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl"
              >
                What you get
              </h2>
            </div>
            <p className="max-w-xs text-sm text-content-secondary sm:text-right">
              {service.deliverables.length} deliverables · scoped to your goals
            </p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {service.outcomes.map((outcome, index) => (
              <li
                key={outcome}
                className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#111118] p-5 sm:p-6"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="font-display text-2xl font-bold text-accent/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm font-medium leading-snug text-white sm:text-base">{outcome}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 sm:mt-12">
            <h3 className="font-display text-lg font-bold text-white sm:text-xl">Everything included</h3>
            <ol className="mt-5 divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#111118]">
              {service.deliverables.map((item, index) => (
                <li
                  key={item.title}
                  className="flex gap-4 p-5 sm:gap-5 sm:p-6"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display text-sm font-bold text-white sm:text-base">{item.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-content-secondary">{item.description}</p>
                  </div>
                  <span className="hidden shrink-0 font-mono text-[10px] tracking-widest text-content-muted sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 rounded-2xl border border-accent/20 bg-gradient-to-br from-[#15151c] to-[#111118] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Best fit for</p>
            <p className="mt-3 text-base leading-relaxed text-content-secondary">{service.idealFor}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
