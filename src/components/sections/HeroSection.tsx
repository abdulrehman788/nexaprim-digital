"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

import { HeroVisual } from "@/components/sections/hero/HeroVisual";
import { Container } from "@/components/ui/Container";
import { heroContent, heroTrustStats } from "@/data/hero";
import { ctaLinks } from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-x-hidden bg-black pb-20 pt-28 lg:pb-24 lg:pt-32 xl:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_35%,rgba(197,163,88,0.09),transparent_50%)]" />

      <Container className="relative overflow-visible">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-x-4 xl:grid-cols-[minmax(0,460px)_minmax(0,600px)] xl:gap-x-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 min-w-0 max-w-full"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
              {heroContent.overline}
            </p>

            <h1
              id="hero-heading"
              className="font-display text-[2rem] font-bold leading-[1.1] sm:text-display-md lg:text-[3.5rem] lg:leading-[1.08]"
            >
              <span className="block text-white">
                We Build Digital{" "}
                <span className="font-serif font-bold text-gold-gradient">Systems.</span>
              </span>
              <span className="mt-2 block text-white">
                You Get{" "}
                <span className="font-serif font-bold text-gold-gradient">Results.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-prose font-sans text-base leading-relaxed text-content-secondary sm:text-lg">
              {heroContent.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={ctaLinks.strategyCall}
                className="bg-gold-gradient inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-7 text-sm font-semibold text-black transition-opacity hover:opacity-90 sm:text-base"
              >
                {heroContent.primaryCta}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
              <Link
                href={ctaLinks.showreel}
                className="inline-flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-white/50 px-7 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5 sm:text-base"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/60"
                  aria-hidden="true"
                >
                  <Play className="h-3.5 w-3.5 fill-white text-white" />
                </span>
                {heroContent.secondaryCta}
              </Link>
            </div>

            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4 sm:gap-x-6">
              {heroTrustStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <li key={stat.id} className="flex flex-col gap-1.5">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    <span className="font-display text-xl font-bold text-white sm:text-2xl">
                      {stat.value}
                    </span>
                    <span className="text-xs leading-snug text-content-muted sm:text-sm">
                      {stat.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <div className="relative min-w-0 w-full lg:-mr-6 xl:-mr-10">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
