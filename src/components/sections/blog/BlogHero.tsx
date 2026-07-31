import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { ctaLinks } from "@/lib/constants";

export function BlogHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#05080f] pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 15% 10%, rgba(249,115,22,0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 88% 20%, rgba(14,165,233,0.08), transparent 50%), linear-gradient(180deg, transparent 60%, #05080f 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(180deg, black, transparent 85%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative pb-16 sm:pb-20 lg:pb-24">
        <p className="font-display text-sm font-semibold tracking-[0.08em] text-orange-400 sm:text-base">
          Expandova
        </p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
          Insights · Strategy · Growth
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Field notes from the{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(105deg, #fb923c 0%, #f97316 45%, #ea580c 100%)",
            }}
          >
            growth floor
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Practical thinking on SEO, paid media, creative, and conversion — written for operators
          who ship, not slide decks that sit.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#articles"
            className="inline-flex items-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(249,115,22,0.8)] transition hover:bg-orange-400"
          >
            Browse articles
          </a>
          <Link
            href={ctaLinks.consultation}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:border-orange-400/40 hover:bg-white/10"
          >
            Book a strategy call
          </Link>
        </div>
      </Container>
    </section>
  );
}
