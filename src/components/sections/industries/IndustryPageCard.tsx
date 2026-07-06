import { OptimizedImage } from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getIndustryTheme } from "@/lib/case-study-themes";
import { industryIcons } from "@/lib/industry-icons";
import type { IndustryDetail } from "@/types";

interface IndustryPageCardProps {
  industry: IndustryDetail;
}

export function IndustryPageCard({ industry }: IndustryPageCardProps) {
  const theme = getIndustryTheme(industry.id);
  const Icon = industryIcons[industry.iconId];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-2 hover:border-gold-300/50 hover:shadow-[0_24px_56px_-16px_rgba(15,23,42,0.2)]">
      <Link href={industry.href} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
          <OptimizedImage
            src={industry.image}
            alt={industry.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{
              background: `linear-gradient(145deg, ${theme.gradientFrom} 0%, ${theme.gradientVia} 50%, ${theme.gradientTo} 100%)`,
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />

          <div className="absolute -bottom-5 left-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950 shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-6 pt-8 sm:px-6 sm:pb-7">
          <h3 className="font-display text-lg font-bold text-slate-900">{industry.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{industry.subtitle}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700 line-clamp-3">
            {industry.headline}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors group-hover:text-gold-600">
            Explore solutions
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
