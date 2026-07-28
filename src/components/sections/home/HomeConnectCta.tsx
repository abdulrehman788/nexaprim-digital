import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { homeConnectCta } from "@/data/home-sections";
import { ctaLinks } from "@/lib/constants";

export function HomeConnectCta() {
  return (
    <section
      aria-labelledby="home-connect-heading"
      className="relative overflow-hidden bg-black py-16 sm:py-20"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(105deg,#2563eb_0%,#7c3aed_45%,#f97316_100%)] opacity-95"
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              {homeConnectCta.overline}
            </p>
            <h2
              id="home-connect-heading"
              className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl"
            >
              {homeConnectCta.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              {homeConnectCta.description}
            </p>
          </div>
          <Link
            href={ctaLinks.strategyCall}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-90 sm:text-base"
          >
            {homeConnectCta.cta}
            <ArrowRight className="h-4 w-4 text-orange-500" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
