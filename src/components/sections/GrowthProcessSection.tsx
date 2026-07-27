import { LineChart, Rocket, Search, Map } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type ProcessStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: ProcessStep[] = [
  {
    id: "discover",
    step: "01",
    title: "Discover & Audit",
    description:
      "We map your funnel, market, and metrics to surface the highest-leverage opportunities for growth.",
    icon: Search,
  },
  {
    id: "strategy",
    step: "02",
    title: "Strategy & Roadmap",
    description:
      "A prioritized plan that ties every initiative to revenue — so quick wins fund the bigger bets.",
    icon: Map,
  },
  {
    id: "build",
    step: "03",
    title: "Design & Build",
    description:
      "We craft the creative, sites, and systems that turn attention into qualified pipeline.",
    icon: Rocket,
  },
  {
    id: "optimize",
    step: "04",
    title: "Launch & Optimize",
    description:
      "Continuous testing and clear reporting so spend scales only where the unit economics hold.",
    icon: LineChart,
  },
];

export function GrowthProcessSection() {
  return (
    <Section variant="primary" aria-labelledby="growth-process-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            How we work
          </p>
          <h2
            id="growth-process-heading"
            className="mt-3 font-display text-display-sm font-bold text-white sm:text-display-md"
          >
            The Expansive <span className="text-gold-gradient">Growth Process</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
            A repeatable system that moves you from scattered tactics to a compounding growth engine.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block"
            aria-hidden="true"
          />
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-surface-elevated text-accent shadow-glow">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <span className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Step {item.step}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">{item.description}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
