import Link from "next/link";
import { ArrowRight, LineChart, Map, Rocket, Search, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { growthProcessImages } from "@/data/home-sections";

type ProcessStep = {
  id: keyof typeof growthProcessImages;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  iconBg: string;
};

const steps: ProcessStep[] = [
  {
    id: "discover",
    step: "01",
    title: "Discover & Audit",
    description:
      "We map your funnel, market, and metrics to surface the highest-leverage opportunities for growth.",
    icon: Search,
    accent: "text-sky-400",
    iconBg: "border-sky-400/40 bg-sky-500/10 shadow-[0_0_24px_-4px_rgba(56,189,248,0.45)]",
  },
  {
    id: "strategy",
    step: "02",
    title: "Strategy & Roadmap",
    description:
      "A prioritized plan that ties every initiative to revenue — so quick wins fund the bigger bets.",
    icon: Map,
    accent: "text-violet-400",
    iconBg: "border-violet-400/40 bg-violet-500/10 shadow-[0_0_24px_-4px_rgba(139,92,246,0.45)]",
  },
  {
    id: "build",
    step: "03",
    title: "Design & Build",
    description:
      "We craft the creative, sites, and systems that turn attention into qualified pipeline.",
    icon: Rocket,
    accent: "text-orange-400",
    iconBg: "border-orange-400/40 bg-orange-500/10 shadow-[0_0_24px_-4px_rgba(251,146,60,0.45)]",
  },
  {
    id: "optimize",
    step: "04",
    title: "Launch & Optimize",
    description:
      "Continuous testing and clear reporting so spend scales only where the unit economics hold.",
    icon: LineChart,
    accent: "text-rose-400",
    iconBg: "border-rose-400/40 bg-rose-500/10 shadow-[0_0_24px_-4px_rgba(251,113,133,0.45)]",
  },
];

export function GrowthProcessSection() {
  return (
    <Section variant="primary" aria-labelledby="growth-process-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-400 sm:text-sm">
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

        <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-sky-500/50 via-violet-500/50 to-rose-500/50 lg:block"
            aria-hidden="true"
          />
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
              >
                <div
                  className={`relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border ${item.iconBg}`}
                >
                  <Icon className={`h-6 w-6 ${item.accent}`} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <p className={`mt-4 text-center text-xs font-semibold uppercase tracking-[0.2em] ${item.accent}`}>
                  Step {item.step}
                </p>
                <h3 className="mt-2 text-center font-display text-lg font-bold text-white">
                  {item.title}
                </h3>
                <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl">
                  <OptimizedImage
                    src={growthProcessImages[item.id]}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-content-muted">{item.description}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-start gap-4 sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-400/30 bg-orange-500/10">
              <Target className="h-6 w-6 text-orange-400" aria-hidden="true" />
            </div>
            <p className="text-sm leading-relaxed text-content-secondary sm:text-base">
              <span className="font-semibold text-white">Built for compounding results.</span> Every
              step reinforces the next — creating sustainable, scalable growth.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold-gradient"
          >
            See Case Studies
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
