import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  Code2,
  Layers,
  Layers3,
  LineChart,
  Megaphone,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import { StarryNightBackground } from "@/components/sections/services/StarryNightBackground";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { getRelatedPackages } from "@/data/packages";
import { ctaLinks } from "@/lib/constants";
import { isLightBand, lightBody, lightCard, lightHeading, lightMuted, sectionDark } from "@/lib/section-surfaces";
import type { PackageDetail, PackageEngagementStep } from "@/types";
import { cn } from "@/lib/utils";

const DEFAULT_HIGHLIGHTS = [
  "Named lead accountable to outcomes",
  "Weekly performance readouts",
  "Clear owners on every deliverable",
  "Reporting your leadership can act on",
];

const DEFAULT_ENGAGEMENT_STEPS: PackageEngagementStep[] = [
  {
    title: "Discovery & alignment",
    description:
      "We map goals, constraints, and success metrics with your stakeholders before anything goes live.",
  },
  {
    title: "Launch & optimize",
    description:
      "Deliverables ship in focused sprints with weekly readouts — no black-box agency work.",
  },
  {
    title: "Review & scale",
    description:
      "We double down on what moves pipeline and cut what does not, with clear reporting cadence.",
  },
];

function DeliverableIcon({ index, className }: { index: number; className?: string }) {
  const iconProps = { className, strokeWidth: 1.75, "aria-hidden": true as const };

  switch (index % 6) {
    case 0:
      return <LineChart {...iconProps} />;
    case 1:
      return <Megaphone {...iconProps} />;
    case 2:
      return <Palette {...iconProps} />;
    case 3:
      return <Code2 {...iconProps} />;
    case 4:
      return <Workflow {...iconProps} />;
    default:
      return <BarChart3 {...iconProps} />;
  }
}

const PACKAGE_ICONS: Record<string, LucideIcon> = {
  "all-in-one": Sparkles,
  "niche-growth": Target,
  "complete-growth": Rocket,
  "brand-acceleration": Layers,
  "performance-engine": Zap,
  enterprise: Building2,
};

function splitHeadline(headline: string): { lead: string; accent: string | null } {
  const parts = headline.split(/(?<=[.!?])\s+/);
  if (parts.length < 2) {
    const words = headline.trim().split(/\s+/);
    if (words.length < 4) return { lead: headline, accent: null };
    const accent = words.slice(-3).join(" ");
    const lead = words.slice(0, -3).join(" ");
    return { lead: lead || headline, accent };
  }
  return { lead: parts.slice(0, -1).join(" "), accent: parts[parts.length - 1] ?? null };
}

interface PackageDetailSectionProps {
  pkg: PackageDetail;
}

export function PackageDetailSection({ pkg }: PackageDetailSectionProps) {
  const Icon = pkg.icon;
  const steps = pkg.engagementSteps ?? DEFAULT_ENGAGEMENT_STEPS;
  const highlights = pkg.highlights ?? DEFAULT_HIGHLIGHTS;
  const outcomes =
    pkg.outcomes ?? pkg.includes.slice(0, 3).map((item) => item.title);
  const ctaHref = pkg.isEnterprise ? "/contact?intent=enterprise" : ctaLinks.strategyCall;
  const ctaLabel = pkg.isEnterprise ? "Request a Custom Quote" : "Book a Strategy Call";
  const relatedPackages = getRelatedPackages(pkg.id);
  const kickoffLabel = pkg.timeline.split(";")[0]?.trim() ?? pkg.timeline;
  const { lead: headlineLead, accent: headlineAccent } = splitHeadline(pkg.headline);

  const stats = [
    { icon: Layers3, value: String(pkg.includes.length), label: "Workstreams" },
    { icon: Sparkles, value: "1", label: "Accountable lead" },
    { icon: Clock3, value: kickoffLabel, label: "Kickoff", compact: true },
  ];

  const trustFeatures = [
    { icon: ShieldCheck, label: "Clear SOW & owners" },
    { icon: Users, label: "Senior-led delivery" },
    { icon: TrendingUp, label: "Outcome-focused" },
    { icon: Target, label: "KPIs you approve" },
  ];

  return (
    <>
      <section
        aria-labelledby="package-heading"
        className="relative overflow-hidden bg-[#050505] pb-10 pt-32 sm:pb-12 sm:pt-36 lg:pt-40"
      >
        <StarryNightBackground />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(197,163,88,0.14),transparent_55%)]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Link
            href="/packages"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All packages
          </Link>

          <div
            className={cn(
              "relative overflow-hidden rounded-3xl border bg-[#0d0d12] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]",
              pkg.featured ? "border-accent/25" : "border-white/[0.1]",
            )}
          >
            {pkg.featured ? (
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
                aria-hidden="true"
              />
            ) : null}

            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  {pkg.badge ? <Badge>{pkg.badge}</Badge> : null}
                  {pkg.featured ? (
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                      Flagship program
                    </span>
                  ) : null}
                  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    {pkg.title}
                  </p>
                </div>

                <h1
                  id="package-heading"
                  className="mt-5 font-serif text-[2rem] font-bold leading-[1.08] text-white sm:text-[2.5rem] lg:text-[2.75rem]"
                >
                  {headlineLead}
                  {headlineAccent ? (
                    <>
                      {" "}
                      <span className="text-gold-gradient">{headlineAccent}</span>
                    </>
                  ) : null}
                </h1>

                <p className="mt-5 text-base leading-relaxed text-content-secondary sm:text-lg sm:leading-8">
                  {pkg.longDescription}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {highlights.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-content-secondary">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={ctaHref} size="lg" pill>
                    {ctaLabel}
                  </Button>
                  <a
                    href="#package-deliverables"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
                  >
                    See deliverables
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>

                <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                    Best fit for
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white sm:text-base">{pkg.idealFor}</p>
                </div>
              </div>

              <div className="relative min-h-[240px] lg:min-h-[460px]">
                <OptimizedImage
                  src={pkg.heroImage}
                  alt={pkg.heroImageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#0d0d12] via-[#0d0d12]/35 to-transparent lg:via-[#0d0d12]/15"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0d0d12]/70 via-transparent to-transparent lg:hidden"
                  aria-hidden="true"
                />

                <div className="absolute right-5 top-5 hidden rounded-2xl border border-white/15 bg-[#0d0d12]/85 px-4 py-3 backdrop-blur-sm sm:block">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-content-muted">
                    Program scope
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-white">
                    {pkg.includes.length} deliverables
                  </p>
                </div>

                <div
                  className="pointer-events-none absolute bottom-8 right-8 hidden h-24 w-24 rounded-full border border-accent/20 lg:block"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute bottom-12 right-12 hidden h-16 w-16 rounded-full border border-accent/30 lg:block"
                  aria-hidden="true"
                />
              </div>
            </div>

            <ul className="grid divide-y divide-white/[0.08] border-t border-white/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {stats.map((stat) => (
                <li key={stat.label} className="flex items-center gap-4 px-6 py-5 sm:py-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <stat.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "font-bold text-white",
                        stat.compact ? "text-sm leading-snug" : "text-xl",
                      )}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-content-muted">
                      {stat.label}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111118]/90">
            <ul className="grid divide-y divide-white/[0.06] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
              {trustFeatures.map((feature) => (
                <li
                  key={feature.label}
                  className="flex items-center gap-3 px-5 py-4 sm:justify-center sm:px-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <feature.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-medium text-content-secondary sm:text-sm">
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        id="package-deliverables"
        aria-labelledby="package-includes-heading"
        className={cn(
          "border-b py-10 sm:py-12 lg:py-14",
          isLightBand(1)
            ? "border-slate-200/80 bg-white"
            : "border-white/[0.06] bg-[#08080c]",
        )}
      >
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                  Outcomes & deliverables
                </p>
                <h2
                  id="package-includes-heading"
                  className={cn(
                    "mt-2 font-serif text-2xl font-bold sm:text-3xl",
                    isLightBand(1) ? lightHeading : "text-white",
                  )}
                >
                  Built to deliver results
                </h2>
              </div>
              <p
                className={cn(
                  "max-w-xs text-sm sm:text-right",
                  isLightBand(1) ? lightBody : "text-content-secondary",
                )}
              >
                {pkg.includes.length} workstreams · named owners · weekly reporting
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {outcomes.map((outcome, index) => (
                <li
                  key={outcome}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border p-5 sm:p-6",
                    isLightBand(1)
                      ? "border-slate-200 bg-slate-50"
                      : "border-white/[0.1] bg-[#111118]",
                  )}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="font-display text-2xl font-bold text-accent/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={cn(
                      "mt-3 text-sm font-medium leading-snug sm:text-base",
                      isLightBand(1) ? lightHeading : "text-white",
                    )}
                  >
                    {outcome}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 sm:mt-12">
              <h3
                id="package-outcomes-heading"
                className={cn(
                  "font-display text-lg font-bold sm:text-xl",
                  isLightBand(1) ? lightHeading : "text-white",
                )}
              >
                Everything in this package
              </h3>

              <ol
                className={cn(
                  "mt-5 divide-y overflow-hidden rounded-2xl border",
                  isLightBand(1)
                    ? "divide-slate-200 border-slate-200 bg-white"
                    : "divide-white/[0.08] border-white/[0.1] bg-[#111118]",
                )}
              >
                {pkg.includes.map((item, index) => (
                  <li
                    key={item.title}
                    id={`deliverable-${index + 1}`}
                    className={cn(
                      "group scroll-mt-28 transition-colors",
                      isLightBand(1) ? "hover:bg-slate-50" : "hover:bg-white/[0.02]",
                      index === 0 && "bg-accent/[0.04]",
                    )}
                  >
                    <div className="flex gap-4 p-5 sm:gap-5 sm:p-6">
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 text-accent transition-colors group-hover:border-accent/40 group-hover:bg-accent/10",
                          isLightBand(1) ? "bg-slate-50" : "bg-[#0d0d12]",
                        )}
                      >
                        <DeliverableIcon index={index} className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h4
                            className={cn(
                              "font-display text-sm font-bold sm:text-base",
                              isLightBand(1) ? lightHeading : "text-white",
                            )}
                          >
                            {item.title}
                          </h4>
                          <span
                            className={cn(
                              "shrink-0 font-mono text-[10px] tracking-widest",
                              isLightBand(1) ? lightMuted : "text-content-muted",
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "mt-1.5 text-sm leading-relaxed",
                            isLightBand(1) ? lightBody : "text-content-secondary",
                          )}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="package-process-heading"
        className={cn(
          "border-b py-10 sm:py-12",
          isLightBand(2) ? "border-slate-200/80 bg-[#f8f7f4]" : "border-white/[0.06] bg-[#050505]",
        )}
      >
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">How we work</p>
                <h2
                  id="package-process-heading"
                  className={cn(
                    "mt-2 font-serif text-xl font-bold sm:text-2xl",
                    isLightBand(2) ? lightHeading : "text-white",
                  )}
                >
                  From kickoff to measurable outcomes
                </h2>
              </div>
              <p
                className={cn(
                  "max-w-sm text-sm sm:text-right",
                  isLightBand(2) ? lightBody : "text-content-secondary",
                )}
              >
                {pkg.timeline}
              </p>
            </div>

            <ol
              className={cn(
                "mt-6 grid divide-y overflow-hidden rounded-2xl border sm:mt-8 lg:grid-cols-3 lg:divide-x lg:divide-y-0",
                isLightBand(2)
                  ? "divide-slate-200 border-slate-200 bg-white"
                  : "divide-white/[0.08] border-white/[0.1] bg-[#111118]",
              )}
            >
              {steps.map((step, index) => (
                <li key={step.title} className="p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-bold text-accent">
                      {index + 1}
                    </span>
                    <h3
                      className={cn(
                        "font-display text-sm font-bold sm:text-base",
                        isLightBand(2) ? lightHeading : "text-white",
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed",
                      isLightBand(2) ? lightBody : "text-content-secondary",
                    )}
                  >
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="package-related-heading"
        className={cn(
          "relative overflow-hidden border-t py-12 sm:py-16",
          isLightBand(3) ? "border-slate-200/80 bg-white" : sectionDark,
        )}
      >
        {!isLightBand(3) ? (
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(197,163,88,0.08),transparent_60%)]"
            aria-hidden="true"
          />
        ) : null}
        <Container className="relative">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Explore more</p>
              <h2
                id="package-related-heading"
                className={cn(
                  "mt-2 font-serif text-2xl font-bold sm:text-3xl",
                  isLightBand(3) ? lightHeading : "text-white",
                )}
              >
                Other packages
              </h2>
            </div>
            <Link
              href="/packages"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:border-accent/40 hover:text-accent",
                isLightBand(3)
                  ? "border-slate-300 bg-slate-50 text-slate-800"
                  : "border-white/10 bg-white/[0.04] text-white",
              )}
            >
              View all packages
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-3">
            {relatedPackages.map((related) => {
              const RelatedIcon = PACKAGE_ICONS[related.id] ?? Sparkles;
              return (
                <li key={related.id}>
                  <Link
                    href={related.href}
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1",
                      isLightBand(3)
                        ? related.featured
                          ? "border-gold-300/60 bg-white shadow-sm hover:border-gold-400 hover:shadow-md"
                          : "border-slate-200 bg-white shadow-sm hover:border-gold-300/60 hover:shadow-md"
                        : related.featured
                          ? "border-accent/25 bg-gradient-to-b from-[#18181f] to-[#101016] shadow-[0_0_0_1px_rgba(197,163,88,0.12)] hover:border-accent/40 hover:shadow-[0_24px_48px_-20px_rgba(197,163,88,0.3)]"
                          : "border-white/[0.08] bg-gradient-to-b from-[#18181f] to-[#101016] hover:border-accent/25 hover:shadow-[0_24px_48px_-20px_rgba(197,163,88,0.18)]",
                    )}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    {related.badge ? (
                      <span className="absolute right-4 top-4 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                        {related.badge}
                      </span>
                    ) : null}
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20">
                      <RelatedIcon className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3
                      className={cn(
                        "mt-4 font-display text-base font-bold transition-colors group-hover:text-accent sm:text-lg",
                        isLightBand(3) ? lightHeading : "text-white",
                      )}
                    >
                      {related.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 flex-1 text-sm leading-relaxed",
                        isLightBand(3) ? lightBody : "text-content-secondary",
                      )}
                    >
                      {related.description}
                    </p>
                    <p className={cn("mt-3 flex items-center gap-1.5 text-xs", isLightBand(3) ? lightMuted : "text-content-muted")}>
                      <Clock3 className="h-3.5 w-3.5 shrink-0 text-accent/70" aria-hidden="true" />
                      <span className="line-clamp-1">{related.timeline.split(";")[0]}</span>
                    </p>
                    <span
                      className={cn(
                        "mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors group-hover:bg-accent/15 group-hover:text-accent",
                        isLightBand(3) ? "bg-slate-100 text-slate-800" : "bg-white/[0.06] text-white",
                      )}
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className={cn(
              "mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border sm:mt-12",
              isLightBand(3)
                ? cn(lightCard, pkg.featured && "border-gold-300/50")
                : cn("bg-[#111118]", pkg.featured ? "border-accent/25" : "border-white/10"),
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
                  {pkg.isEnterprise
                    ? "Get a custom proposal in one business day"
                    : "Get a proposal scoped to your goals"}
                </h3>
                <p
                  className={cn(
                    "mt-4 max-w-md text-sm leading-relaxed sm:text-base",
                    isLightBand(3) ? lightBody : "text-content-secondary",
                  )}
                >
                  {pkg.isEnterprise
                    ? "Tell us your requirements — we'll return a tailored SOW within one business day."
                    : "Book a free strategy call and we'll map deliverables, timeline, and budget."}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <Button href={ctaHref} size="lg" pill className="w-full sm:w-auto lg:w-full xl:w-auto">
                    {ctaLabel}
                  </Button>
                  <Link
                    href="/packages"
                    className={cn(
                      "inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors hover:border-accent hover:text-accent sm:w-auto lg:w-full xl:w-auto",
                      isLightBand(3) ? "border-slate-300 text-slate-800" : "border-white/20 text-white",
                    )}
                  >
                    Compare packages
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div
                className={cn(
                  "border-t px-6 py-8 sm:px-10 sm:py-10 lg:border-l lg:border-t-0",
                  isLightBand(3)
                    ? "border-slate-200 bg-slate-50"
                    : "border-white/[0.08] bg-[#0a0a0f]",
                )}
              >
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.22em]",
                    isLightBand(3) ? lightMuted : "text-content-muted",
                  )}
                >
                  Included in your proposal
                </p>
                <ul className="mt-5 space-y-3">
                  {pkg.includes.slice(0, 4).map((item) => (
                    <li
                      key={item.title}
                      className={cn(
                        "flex items-start gap-3 text-sm",
                        isLightBand(3) ? lightBody : "text-content-secondary",
                      )}
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span className="leading-snug">{item.title}</span>
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
