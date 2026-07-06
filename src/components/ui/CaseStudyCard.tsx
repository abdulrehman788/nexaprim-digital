import { OptimizedImage } from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getCaseStudyTheme } from "@/lib/case-study-themes";
import { industryIcons } from "@/lib/industry-icons";
import type { CaseStudy } from "@/types";

function AccentShape({ shape }: { shape: ReturnType<typeof getCaseStudyTheme>["accentShape"] }) {
  const shapeClasses = "absolute opacity-30";

  switch (shape) {
    case "bars":
      return (
        <div className={`${shapeClasses} right-8 top-8 flex gap-1.5`}>
          <span className="h-16 w-2 rounded-full bg-white/70" />
          <span className="mt-3 h-10 w-2 rounded-full bg-white/45" />
          <span className="mt-6 h-6 w-2 rounded-full bg-white/30" />
        </div>
      );
    case "circle":
      return (
        <div
          className={`${shapeClasses} right-8 top-10 h-20 w-20 rounded-full border-2 border-white/40`}
        />
      );
    case "ring":
      return (
        <div
          className={`${shapeClasses} right-10 top-10 h-16 w-16 rounded-full border-[5px] border-white/35`}
        />
      );
    case "wave":
      return (
        <svg
          className={`${shapeClasses} right-6 top-12 h-14 w-28 text-white/40`}
          viewBox="0 0 120 40"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 30 Q30 10 60 30 T120 30"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      );
    case "diamond":
      return (
        <div
          className={`${shapeClasses} right-10 top-10 h-14 w-14 rotate-45 border-2 border-white/35`}
        />
      );
    case "grid":
      return (
        <div className={`${shapeClasses} right-8 top-8 grid grid-cols-3 gap-1.5`}>
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-sm bg-white/35" />
          ))}
        </div>
      );
    default:
      return null;
  }
}

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const theme = getCaseStudyTheme(study.slug);
  const Icon = industryIcons[theme.iconId];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-2 hover:border-gold-300/50 hover:shadow-[0_24px_56px_-16px_rgba(15,23,42,0.2),0_0_0_1px_rgba(197,163,88,0.15)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <OptimizedImage
          src={study.image}
          alt={study.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-35 mix-blend-multiply"
          style={{
            background: `linear-gradient(145deg, ${theme.gradientFrom} 0%, ${theme.gradientVia} 50%, ${theme.gradientTo} 100%)`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/25 to-navy-950/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <AccentShape shape={theme.accentShape} />

        <p className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-800 shadow-sm backdrop-blur-sm">
          {study.industry}
        </p>

        <div className="absolute -bottom-5 left-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </div>
      </div>

      <div className="relative flex min-h-[5.5rem] items-center bg-navy-950 px-5 py-5 sm:px-6">
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <h3 className="font-display text-base font-bold leading-snug text-white sm:text-lg">
          {study.headline}
        </h3>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-7 sm:px-6 sm:pb-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">
          {study.client}
        </p>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-700">{study.summary}</p>

        <ul className="mt-5 grid grid-cols-3 gap-2">
          {study.stats.map((stat, index) => (
            <li
              key={stat.label}
              className="rounded-xl bg-gradient-to-b from-slate-50 to-white px-2 py-3 text-center ring-1 ring-slate-100 transition-all duration-300 group-hover:from-gold-50/80 group-hover:to-white group-hover:ring-gold-200/60"
            >
              <span
                className={`block font-display text-sm font-bold leading-tight sm:text-base ${
                  index === 0 ? "text-gold-700" : "text-slate-900"
                }`}
              >
                {stat.value}
              </span>
              <span className="mt-1 block text-[9px] font-semibold uppercase leading-tight tracking-wide text-slate-500">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={`/case-studies/${study.slug}`}
          className="relative z-10 mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-gold-600 hover:shadow-md group-hover:bg-gold-500"
        >
          Read full story
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
