import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutPrincipleIcons } from "@/lib/about-icons";
import { aboutPrinciples, aboutPrinciplesSection } from "@/data/about";

export function AboutPrinciplesSection() {
  return (
    <Section variant="dark" aria-labelledby="about-principles-heading" className="bg-[#0a0c12]">
      <Container>
        <h2
          id="about-principles-heading"
          className="text-center font-serif text-display-sm font-bold text-white sm:text-[2.5rem]"
        >
          {aboutPrinciplesSection.title}
        </h2>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:gap-6">
          {aboutPrinciples.map((principle) => {
            const Icon = aboutPrincipleIcons[principle.iconId];
            return (
              <li
                key={principle.id}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 sm:p-8"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-content-secondary sm:text-base">
                  {principle.body}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
