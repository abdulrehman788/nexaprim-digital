import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { HeroTrustBar } from "@/components/sections/hero/HeroTrustBar";
import { HeroVisual } from "@/components/sections/hero/HeroVisual";
import { Container } from "@/components/ui/Container";
import { heroContent, heroFeatures } from "@/data/hero";
import { ctaLinks } from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 -z-10">
        <picture>
          <source
            type="image/avif"
            srcSet="/images/hero/hero-earth-1280.avif 1280w, /images/hero/hero-earth-1920.avif 1920w, /images/hero/hero-earth-2560.avif 2560w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/images/hero/hero-earth-1280.webp 1280w, /images/hero/hero-earth-1920.webp 1920w, /images/hero/hero-earth-2560.webp 2560w"
            sizes="100vw"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- responsive local LCP asset; skip Next recompression */}
          <img
            src="/images/hero/hero-earth-1920.jpg"
            srcSet="/images/hero/hero-earth-1280.jpg 1280w, /images/hero/hero-earth-1920.jpg 1920w, /images/hero/hero-earth-2560.jpg 2560w"
            sizes="100vw"
            alt={heroContent.skylineAlt}
            width={1920}
            height={1280}
            decoding="async"
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

      <Container className="relative flex flex-1 flex-col justify-center pb-0 pt-24 sm:pt-28 lg:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-x-8 xl:gap-x-10">
          {/* No opacity fade on LCP copy — keeps headline paintable immediately */}
          <div className="relative z-10 flex min-w-0 flex-col">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white sm:text-xs">
              <span
                className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]"
                aria-hidden="true"
              />
              {heroContent.overline}
            </span>

            <h1
              id="hero-heading"
              className="font-display text-[clamp(2rem,4.4vw+0.4rem,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white"
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={ctaLinks.strategyCall}
                className="bg-gold-gradient inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-7 text-sm font-semibold text-white shadow-glow transition-opacity hover:opacity-90 sm:text-base"
              >
                {heroContent.primaryCta}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/35 bg-white/[0.04] px-7 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10 sm:text-base"
              >
                {heroContent.secondaryCta}
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/50"
                  aria-hidden="true"
                >
                  <Play className="h-3 w-3 fill-white text-white" />
                </span>
              </Link>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 sm:mt-8">
              {heroFeatures.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs font-medium text-slate-300 sm:text-sm"
                >
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-500/25 text-[0.65rem] font-bold text-violet-300"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 w-full min-w-0 lg:animate-fade-in-up">
            <HeroVisual />
          </div>
        </div>

        <HeroTrustBar />
      </Container>
    </section>
  );
}
