import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutPrincipleIcons } from "@/lib/about-icons";
import { aboutPrinciples, aboutPrinciplesSection } from "@/data/about";

export function AboutPrinciplesSection() {
  return (
    <Section variant="dark" aria-labelledby="about-principles-heading">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            {aboutPrinciplesSection.overline}
          </p>
          <h2
            id="about-principles-heading"
            className="font-serif text-display-sm font-bold text-content-primary sm:text-display-md"
          >
            {aboutPrinciplesSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
            {aboutPrinciplesSection.description}
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {aboutPrinciples.map((principle) => {
            const Icon = aboutPrincipleIcons[principle.iconId];
            return (
              <li
                key={principle.id}
                className="group rounded-2xl border border-border-subtle bg-surface-elevated/60 p-6 transition-colors hover:border-accent/35 hover:shadow-glow sm:p-7"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-accent/30 bg-accent-muted transition-colors group-hover:border-accent/50">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-content-primary">
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
