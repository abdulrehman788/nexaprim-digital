import { Container } from "@/components/ui/Container";
import { aboutMethodologiesSection, aboutMethodologySteps } from "@/data/about";

export function AboutMethodologiesSection() {
  return (
    <section
      id={aboutMethodologiesSection.id}
      aria-labelledby="about-method-heading"
      className="border-t border-white/[0.06] bg-surface-primary py-20 lg:py-28"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {aboutMethodologiesSection.overline}
            </p>
            <h2
              id="about-method-heading"
              className="mt-4 font-display text-[1.75rem] font-bold leading-tight text-white sm:text-3xl"
            >
              The{" "}
              <span className="text-gold-gradient">{aboutMethodologiesSection.titleAccent}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-content-secondary sm:text-lg">
              {aboutMethodologiesSection.description}
            </p>
          </div>

          <ol className="relative space-y-0">
            <div
              className="absolute bottom-6 left-[1.35rem] top-6 hidden w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent sm:block"
              aria-hidden="true"
            />
            {aboutMethodologySteps.map((step) => (
              <li key={step.id} className="relative flex gap-5 pb-8 last:pb-0 sm:gap-6 sm:pb-10">
                <div
                  className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-accent/40 bg-[#111118] font-display text-xs font-bold text-accent sm:h-12 sm:w-12 sm:text-sm"
                  aria-hidden="true"
                >
                  {step.step}
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border border-white/[0.06] bg-[#111118] p-5 sm:p-6">
                  <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-content-secondary sm:text-base">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
