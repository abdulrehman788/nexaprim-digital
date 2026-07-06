import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutMethodologiesSection, aboutMethodologySteps } from "@/data/about";

export function AboutMethodologiesSection() {
  return (
    <Section
      id={aboutMethodologiesSection.id}
      variant="light"
      aria-labelledby="about-method-heading"
      className="bg-slate-50"
      divider={false}
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <h2
            id="about-method-heading"
            className="font-serif text-display-sm font-bold text-slate-900 sm:text-[2.5rem]"
          >
            The{" "}
            <span className="text-gold-gradient">{aboutMethodologiesSection.titleAccent}</span>
          </h2>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg lg:max-w-md lg:justify-self-end">
            {aboutMethodologiesSection.description}
          </p>
        </div>

        <ol className="mt-12 space-y-4 lg:mt-14">
          {aboutMethodologySteps.map((step) => (
            <li
              key={step.id}
              className="flex gap-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.12)] sm:gap-6 sm:p-7"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-gradient font-display text-sm font-bold text-black shadow-glow sm:h-14 sm:w-14 sm:text-base"
                aria-hidden="true"
              >
                {step.step}
              </div>
              <div className="min-w-0 pt-0.5">
                <h3 className="font-display text-lg font-bold text-slate-900 sm:text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
