import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { HeroTrustBar } from "@/components/sections/hero/HeroTrustBar";
import { HeroVisual } from "@/components/sections/hero/HeroVisual";
import { Container } from "@/components/ui/Container";
import { heroContent } from "@/data/hero";
import { ctaLinks } from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-0 flex-col overflow-x-clip bg-[#050505] lg:min-h-[100svh]"
    >
      <div className="absolute inset-0 -z-10">
        <picture>
          {/* Prefer 1280 for most viewports; only ship 1920 on large desktops */}
          <source
            media="(min-width: 1440px)"
            type="image/avif"
            srcSet="/images/hero/hero-earth-1920.avif"
          />
          <source
            media="(min-width: 1440px)"
            type="image/webp"
            srcSet="/images/hero/hero-earth-1920.webp"
          />
          <source type="image/avif" srcSet="/images/hero/hero-earth-1280.avif" />
          <source type="image/webp" srcSet="/images/hero/hero-earth-1280.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element -- responsive local LCP asset; skip Next recompression */}
          <img
            src="/images/hero/hero-earth-1280.jpg"
            alt={heroContent.skylineAlt}
            width={1280}
            height={853}
            decoding="async"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[82%_center] sm:object-[76%_center] lg:object-[70%_center]"
          />
        </picture>
        {/* Soft left wash only — keep Earth / city / arcs crisp */}
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,5,10,0.72)_0%,rgba(5,5,10,0.38)_34%,rgba(5,5,10,0.08)_58%,transparent_78%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050505] to-transparent sm:h-28"
          aria-hidden="true"
        />
      </div>

      <Container className="relative flex flex-1 flex-col justify-center pb-8 pt-24 sm:pb-10 sm:pt-28 lg:pb-0 lg:pt-28">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-x-8 xl:gap-x-10">
          {/* No opacity fade on LCP copy — keeps headline paintable immediately */}
          <div className="relative z-10 flex min-w-0 flex-col">
            <span className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white sm:mb-5 sm:px-4 sm:text-xs sm:tracking-[0.22em]">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]"
                aria-hidden="true"
              />
              <span className="truncate">{heroContent.overline}</span>
            </span>

            <h1
              id="hero-heading"
              className="font-display text-[clamp(1.75rem,4.2vw+0.55rem,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white"
            >
              {heroContent.headlineLine1}
              <br />
              <span className="text-gold-gradient">{heroContent.headlineAccent}</span>
              <br />
              {heroContent.headlineLine2}
            </h1>

            <p className="mt-5 max-w-lg font-sans text-sm font-medium leading-relaxed text-slate-300 sm:mt-6 sm:text-base lg:text-[1.05rem]">
              {heroContent.description}
            </p>

            <div className="mt-8 flex flex-nowrap items-center gap-2 sm:gap-3">
              <Link
                href={ctaLinks.strategyCall}
                className="bg-gold-gradient inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-[0.7rem] font-semibold leading-tight text-white shadow-glow transition-opacity hover:opacity-90 sm:h-12 sm:flex-none sm:gap-2.5 sm:px-7 sm:text-base"
              >
                <span className="sm:hidden">Book a Free Call</span>
                <span className="hidden sm:inline">{heroContent.primaryCta}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border border-white/35 bg-white/[0.04] px-3 text-[0.7rem] font-semibold leading-tight text-white transition-colors hover:border-white/60 hover:bg-white/10 sm:h-12 sm:flex-none sm:gap-2.5 sm:px-7 sm:text-base"
              >
                {heroContent.secondaryCta}
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/50 sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  <Play className="h-2.5 w-2.5 fill-white text-white sm:h-3 sm:w-3" />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative z-10 hidden w-full min-w-0 lg:block lg:animate-fade-in-up">
            <HeroVisual />
          </div>
        </div>

        <HeroTrustBar />
      </Container>
    </section>
  );
}
