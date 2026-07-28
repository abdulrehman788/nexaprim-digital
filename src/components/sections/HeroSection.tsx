import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { HeroVisual } from "@/components/sections/hero/HeroVisual";
import { Container } from "@/components/ui/Container";
import { heroContent } from "@/data/hero";
import { ctaLinks } from "@/lib/constants";

const heroFeatures = [
  "Strategy",
  "Technology",
  "Marketing",
  "AI Automation",
] as const;

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#050505]"
    >
      {/* Earth + city hero background — HD asset served at full quality */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimized HD local asset; avoid re-encode blur */}
        <img
          src={heroContent.skylineImage}
          alt={heroContent.skylineAlt}
          width={2400}
          height={1600}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[75%_center] sm:object-[70%_center]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,5,8,0.78)_0%,rgba(5,5,8,0.4)_38%,rgba(5,5,8,0.12)_68%,transparent_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_45%,rgba(168,85,247,0.16),transparent_52%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505]/85 to-transparent sm:h-32"
          aria-hidden="true"
        />
      </div>

      <Container className="relative flex flex-1 flex-col justify-center pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-8 xl:gap-x-12">
          <div className="animate-fade-in-up relative z-10 flex min-w-0 flex-col">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-violet-200 backdrop-blur sm:mb-6 sm:px-4 sm:text-xs">
              <span
                className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]"
                aria-hidden="true"
              />
              {heroContent.overline}
            </span>

            <h1
              id="hero-heading"
              className="font-display text-[clamp(1.5rem,3.5vw+0.4rem,2.75rem)] font-bold leading-[1.12] text-white"
            >
              We help businesses{" "}
              <span className="text-gold-gradient">expand</span> beyond limits.
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-base lg:text-lg">
              {heroContent.description}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
              <Link
                href={ctaLinks.strategyCall}
                className="bg-gold-gradient inline-flex h-11 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-sm font-semibold text-white shadow-glow transition-opacity hover:opacity-90 sm:h-12 sm:px-7 sm:text-base"
              >
                {heroContent.primaryCta}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex h-11 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/35 bg-white/[0.04] px-6 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10 sm:h-12 sm:px-7 sm:text-base"
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/50"
                  aria-hidden="true"
                >
                  <Play className="h-3 w-3 fill-white text-white" />
                </span>
                {heroContent.secondaryCta}
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 sm:mt-8 sm:gap-x-5">
              {heroFeatures.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs text-slate-300 sm:text-sm"
                >
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-500/20 text-[0.65rem] font-bold text-violet-300"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in-up animation-delay-150 relative z-10 w-full min-w-0">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
