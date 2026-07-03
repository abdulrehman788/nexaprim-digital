import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { CaseStudy } from "@/types";
import { ctaLinks } from "@/lib/constants";

interface CaseStudyDetailProps {
  study: CaseStudy;
}

export function CaseStudyDetail({ study }: CaseStudyDetailProps) {
  return (
    <>
      <section
        aria-labelledby="case-study-heading"
        className="relative overflow-hidden bg-[#050505] pb-12 pt-32 lg:pt-36"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_20%,rgba(197,163,88,0.08),transparent_55%)]" />
        <Container className="relative">
          <Link
            href="/case-studies"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All case studies
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {study.industry} · {study.client}
          </p>
          <h1
            id="case-study-heading"
            className="mt-4 max-w-3xl font-serif text-[2rem] font-bold leading-[1.12] text-white sm:text-display-md"
          >
            {study.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg">
            {study.summary}
          </p>

          <ul className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:max-w-lg">
            {study.stats.map((stat) => (
              <li key={stat.label}>
                <span className="font-display text-2xl font-bold text-accent sm:text-3xl">
                  {stat.value}
                </span>
                <p className="mt-1 text-xs text-content-muted">{stat.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section variant="light" divider={false}>
        <Container>
          <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">The challenge</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{study.challenge}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">What we did</h2>
              <ul className="mt-4 space-y-3">
                {study.approach.map((step) => (
                  <li
                    key={step.slice(0, 48)}
                    className="flex gap-3 text-sm leading-relaxed text-slate-600 sm:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900">The outcome</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{study.outcome}</p>
            {study.quote ? (
              <blockquote className="mt-8 border-l-2 border-accent pl-5">
                <p className="font-serif text-lg italic leading-relaxed text-slate-800">
                  &ldquo;{study.quote}&rdquo;
                </p>
                {study.quoteAuthor ? (
                  <footer className="mt-3 text-sm text-slate-500">— {study.quoteAuthor}</footer>
                ) : null}
              </blockquote>
            ) : null}
          </div>

          <div className="mx-auto mt-12 max-w-4xl text-center">
            <p className="text-base text-slate-600">Facing something similar?</p>
            <Button href={ctaLinks.strategyCall} size="lg" pill className="mt-4">
              Book a Strategy Call
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
