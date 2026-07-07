import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Megaphone,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ctaLinks } from "@/lib/constants";
import { industryIcons } from "@/lib/industry-icons";
import { isLightBand, lightBody, lightCard, lightCardMuted, lightHeading, lightMuted, sectionDark } from "@/lib/section-surfaces";
import type { IndustryDetail } from "@/types";
import { cn } from "@/lib/utils";

const CAPABILITY_ICONS = [Megaphone, Users, Star, BarChart3];

function CapabilityIconAt({ index, className }: { index: number; className?: string }) {
  const Icon = CAPABILITY_ICONS[index % CAPABILITY_ICONS.length]!;
  return <Icon className={className} strokeWidth={2} aria-hidden="true" />;
}

interface IndustryDetailSectionProps {
  industry: IndustryDetail;
}

export function IndustryDetailSection({ industry }: IndustryDetailSectionProps) {
  const Icon = industryIcons[industry.iconId];

  return (
    <>
      <section
        aria-labelledby="industry-heading"
        className="relative overflow-hidden bg-[#050505] pb-10 pt-32 sm:pb-12 sm:pt-36 lg:pt-40"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(197,163,88,0.12),transparent_55%)]"
          aria-hidden="true"
        />

        <Container className="relative">
          <Link
            href="/industries"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All industries
          </Link>

          <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0d0d12] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                  <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  {industry.title}
                </p>
                <h1
                  id="industry-heading"
                  className="mt-4 font-serif text-[1.75rem] font-bold leading-[1.12] text-white sm:text-display-sm lg:text-[2.5rem]"
                >
                  {industry.headline}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg">
                  {industry.description}
                </p>
                <p className="mt-3 text-sm text-content-muted">{industry.subtitle}</p>
                <div className="mt-7">
                  <Button href={ctaLinks.strategyCall} size="lg" pill>
                    Book a Strategy Call
                  </Button>
                </div>
              </div>

              <div className="relative min-h-[240px] lg:min-h-[420px]">
                <OptimizedImage
                  src={industry.image}
                  alt={industry.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#0d0d12] via-[#0d0d12]/30 to-transparent lg:via-[#0d0d12]/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0d0d12]/70 via-transparent to-transparent lg:hidden"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="industry-challenges-heading"
        className={cn(
          "border-b py-10 sm:py-12 lg:py-14",
          isLightBand(1) ? "border-slate-200/80 bg-white" : "border-white/[0.06] bg-[#08080c]",
        )}
      >
        <Container>
          <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-2 lg:gap-6">
            <div
              className={cn(
                "rounded-2xl border p-6 sm:p-8",
                isLightBand(1) ? lightCardMuted : "border-white/[0.1] bg-[#111118]",
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Challenges</p>
              <h2
                id="industry-challenges-heading"
                className={cn(
                  "mt-2 font-serif text-xl font-bold sm:text-2xl",
                  isLightBand(1) ? lightHeading : "text-white",
                )}
              >
                What we see most often
              </h2>
              <ul className="mt-6 space-y-4">
                {industry.painPoints.map((point, index) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-accent/25 bg-accent/10 font-mono text-[10px] font-bold text-accent">
                      {index + 1}
                    </span>
                    <p
                      className={cn(
                        "text-sm leading-relaxed sm:text-base",
                        isLightBand(1) ? lightBody : "text-content-secondary",
                      )}
                    >
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                "flex flex-col rounded-2xl border p-6 sm:p-8",
                isLightBand(1)
                  ? "border-gold-300/40 bg-gradient-to-br from-gold-50 via-white to-slate-50"
                  : "border-accent/25 bg-gradient-to-br from-[#15151c] via-[#111118] to-[#0a0a0f]",
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Results</p>
              <h2
                className={cn(
                  "mt-2 font-serif text-xl font-bold sm:text-2xl",
                  isLightBand(1) ? lightHeading : "text-white",
                )}
              >
                Proof it works
              </h2>
              <p
                className={cn(
                  "mt-5 flex-1 text-base leading-relaxed",
                  isLightBand(1) ? lightBody : "text-content-secondary",
                )}
              >
                {industry.proofPoint}
              </p>
              {industry.relatedCaseStudySlug ? (
                <Link
                  href={`/case-studies/${industry.relatedCaseStudySlug}`}
                  className={cn(
                    "mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent",
                    isLightBand(1)
                      ? "border-slate-300 bg-white text-slate-800"
                      : "border-white/15 bg-white/[0.04] text-white",
                  )}
                >
                  Read the case study
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="industry-capabilities-heading"
        className={cn(
          "border-b py-10 sm:py-12 lg:py-14",
          isLightBand(2) ? "border-slate-200/80 bg-[#f8f7f4]" : sectionDark,
        )}
      >
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                  Capabilities
                </p>
                <h2
                  id="industry-capabilities-heading"
                  className={cn(
                    "mt-2 font-serif text-2xl font-bold sm:text-3xl",
                    isLightBand(2) ? lightHeading : "text-white",
                  )}
                >
                  How we help {industry.title.toLowerCase()} brands grow
                </h2>
              </div>
              <p
                className={cn(
                  "max-w-xs text-sm sm:text-right",
                  isLightBand(2) ? lightBody : "text-content-secondary",
                )}
              >
                Systems built around your buying cycle — not generic agency playbooks.
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {industry.capabilities.map((capability, index) => (
                <li
                  key={capability.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300/60 hover:shadow-[0_20px_48px_-18px_rgba(15,23,42,0.14)] sm:p-7"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700 ring-1 ring-gold-200/80">
                    <CapabilityIconAt index={index} className="h-5 w-5" />
                  </span>
                  <h3 className={cn("mt-4 font-display text-base font-bold sm:text-lg", lightHeading)}>
                    {capability.title}
                  </h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", lightBody)}>
                    {capability.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className={cn("py-12 sm:py-14", isLightBand(3) ? "bg-white" : "bg-[#050505]")}>
        <Container>
          <div
            className={cn(
              "mx-auto max-w-5xl overflow-hidden rounded-2xl border",
              isLightBand(3) ? lightCard : "border-white/10 bg-[#111118]",
            )}
          >
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Next step</p>
                <h3
                  className={cn(
                    "mt-3 font-serif text-2xl font-bold leading-tight sm:text-3xl",
                    isLightBand(3) ? lightHeading : "text-white",
                  )}
                >
                  Ready to build a system tailored to {industry.title.toLowerCase()}?
                </h3>
                <p
                  className={cn(
                    "mt-4 max-w-md text-sm leading-relaxed sm:text-base",
                    isLightBand(3) ? lightBody : "text-content-secondary",
                  )}
                >
                  Book a free strategy call and we&apos;ll map the funnel, channels, and reporting cadence
                  for your market.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href={ctaLinks.strategyCall} size="lg" pill className="w-full sm:w-auto">
                    Book a Strategy Call
                  </Button>
                  <Link
                    href="/industries"
                    className={cn(
                      "inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors hover:border-accent hover:text-accent sm:w-auto",
                      isLightBand(3) ? "border-slate-300 text-slate-800" : "border-white/20 text-white",
                    )}
                  >
                    All industries
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div
                className={cn(
                  "border-t px-6 py-8 sm:px-10 sm:py-10 lg:border-l lg:border-t-0",
                  isLightBand(3) ? "border-slate-200 bg-slate-50" : "border-white/[0.08] bg-[#0a0a0f]",
                )}
              >
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.22em]",
                    isLightBand(3) ? lightMuted : "text-content-muted",
                  )}
                >
                  What you get on the call
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    "Channel audit for your industry",
                    "90-day roadmap with owners & KPIs",
                    "Budget range before you commit",
                  ].map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "flex items-start gap-3 text-sm",
                        isLightBand(3) ? lightBody : "text-content-secondary",
                      )}
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
