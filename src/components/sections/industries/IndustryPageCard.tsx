import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { industryIcons } from "@/lib/industry-icons";
import type { IndustryDetail } from "@/types";

interface IndustryPageCardProps {
  industry: IndustryDetail;
}

export function IndustryPageCard({ industry }: IndustryPageCardProps) {
  const Icon = industryIcons[industry.iconId];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-300/60 hover:shadow-[0_20px_48px_-18px_rgba(15,23,42,0.14)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />

      <Link href={industry.href} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-slate-200">
          <OptimizedImage
            src={industry.image}
            alt={industry.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute -bottom-5 left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950 shadow-md transition-transform duration-300 group-hover:scale-105">
            <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-7 sm:px-6 sm:pb-6">
          <h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-gold-700">
            {industry.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{industry.subtitle}</p>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-2">
            {industry.headline}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors group-hover:text-gold-600">
            Explore solutions
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
