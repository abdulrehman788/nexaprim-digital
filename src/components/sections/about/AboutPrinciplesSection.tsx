import { Container } from "@/components/ui/Container";
import { aboutPrincipleIcons } from "@/lib/about-icons";
import { aboutPrinciples, aboutPrinciplesSection } from "@/data/about";

export function AboutPrinciplesSection() {
  return (
    <section
      aria-labelledby="about-principles-heading"
      className="border-t border-white/[0.06] bg-[#111118] py-20 lg:py-28"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {aboutPrinciplesSection.overline}
          </p>
          <h2
            id="about-principles-heading"
            className="mt-4 font-display text-[1.75rem] font-bold text-white sm:text-3xl"
          >
            {aboutPrinciplesSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary">
            {aboutPrinciplesSection.description}
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:gap-6">
          {aboutPrinciples.map((principle, index) => {
            const Icon = aboutPrincipleIcons[principle.iconId];
            const number = String(index + 1).padStart(2, "0");

            return (
              <li
                key={principle.id}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-primary p-7 transition-colors hover:border-accent/25 sm:p-8"
              >
                <span
                  className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-bold text-white/[0.03] transition-colors group-hover:text-accent/[0.06]"
                  aria-hidden="true"
                >
                  {number}
                </span>
                <div className="relative flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{principle.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-content-secondary sm:text-base">
                      {principle.body}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
