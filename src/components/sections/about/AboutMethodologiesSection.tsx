import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutMethodologiesSection, aboutMethodologySteps } from "@/data/about";

export function AboutMethodologiesSection() {
  return (
    <Section
      id={aboutMethodologiesSection.id}
      variant="light"
      aria-labelledby="about-method-heading"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 sm:text-sm">
              {aboutMethodologiesSection.overline}
            </p>
            <h2
              id="about-method-heading"
              className="font-serif text-display-sm font-bold text-slate-900 sm:text-display-md"
            >
              The{" "}
              <span className="text-gold-gradient">{aboutMethodologiesSection.titleAccent}</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg lg:max-w-md lg:justify-self-end">
            {aboutMethodologiesSection.description}
          </p>
        </div>

        <ol className="relative mt-14 space-y-5">
          <div
            className="absolute bottom-4 left-[1.65rem] top-4 hidden w-px bg-gradient-to-b from-accent/60 via-accent/25 to-transparent lg:block"
            aria-hidden="true"
          />
          {aboutMethodologySteps.map((step) => (
            <li
              key={step.id}
              className="relative grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:grid-cols-[4.5rem_1fr] sm:gap-6 sm:p-7 lg:pl-8"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent/40 bg-gold-50 font-display text-sm font-bold text-gold-700 sm:h-14 sm:w-14 sm:text-base">
                {step.step}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
