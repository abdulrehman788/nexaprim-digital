import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { featureGridCardClass } from "@/lib/service-card-styles";
import { ctaLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/types";

interface ServiceDetailBodyProps {
  service: ServiceDetail;
  hideDeliverables?: boolean;
  variant?: "light" | "dark";
}

export function ServiceDetailBody({
  service,
  hideDeliverables = false,
  variant = "light",
}: ServiceDetailBodyProps) {
  const isDark = variant === "dark";

  if (isDark) {
    return (
      <section className="bg-[#111118] pb-20 pt-4 sm:pb-24 lg:pb-28">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                Typical outcomes
              </h2>
              <ul className="mt-5 space-y-3">
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

            <div className={cn(featureGridCardClass, "hover:border-white/[0.05] hover:shadow-none")}>
              <h2 className="font-display text-xl font-bold text-white">Best fit for</h2>
              <p className="mt-4 text-base leading-relaxed text-content-secondary/80">
                {service.idealFor}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl text-center">
            <p className="text-base text-content-secondary">
              Want to see how {service.title.toLowerCase()} fits your growth plan?
            </p>
            <Button href={ctaLinks.strategyCall} size="lg" pill className="mt-4">
              Book a Strategy Call
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <Section variant="light" divider={false}>
      <Container>
        {!hideDeliverables ? (
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
        ) : null}

        <div
          className={
            hideDeliverables
              ? "mx-auto grid max-w-5xl gap-10 lg:grid-cols-2"
              : "mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2"
          }
        >
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">Typical outcomes</h2>
            <ul className="mt-5 space-y-3">
              {service.outcomes.map((outcome) => (
                <li
                  key={outcome.slice(0, 48)}
                  className="flex gap-3 text-sm leading-relaxed text-slate-600 sm:text-base"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                    aria-hidden="true"
                  />
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
  );
}
