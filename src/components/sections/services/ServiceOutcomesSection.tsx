import { Container } from "@/components/ui/Container";
import { featureGridCardClass } from "@/lib/service-card-styles";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/types";

interface ServiceOutcomesSectionProps {
  service: ServiceDetail;
}

export function ServiceOutcomesSection({ service }: ServiceOutcomesSectionProps) {
  return (
    <section
      aria-labelledby="service-outcomes-heading"
      className="border-t border-white/[0.06] bg-surface-primary py-16 sm:py-20"
    >
      <Container>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Results</p>
            <h2
              id="service-outcomes-heading"
              className="mt-4 font-display text-xl font-bold text-white sm:text-2xl"
            >
              Typical outcomes
            </h2>
            <ul className="mt-6 space-y-4">
              {service.outcomes.map((outcome) => (
                <li
                  key={outcome.slice(0, 48)}
                  className="flex gap-3 text-sm leading-relaxed text-content-secondary sm:text-base"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <div className={cn(featureGridCardClass, "hover:border-accent/20 hover:shadow-[0_0_32px_-12px_rgba(197,163,88,0.25)]")}>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Fit</p>
            <h2 className="mt-4 font-display text-xl font-bold text-white sm:text-2xl">Best fit for</h2>
            <p className="mt-4 text-base leading-relaxed text-content-secondary/90">{service.idealFor}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
