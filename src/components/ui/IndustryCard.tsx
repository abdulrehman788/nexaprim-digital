import Link from "next/link";

import { IndustryCardArt } from "@/components/ui/IndustryCardArt";
import { getIndustryTheme } from "@/lib/case-study-themes";
import { industryIcons } from "@/lib/industry-icons";
import type { Industry } from "@/types";

interface IndustryCardProps {
  industry: Industry;
}

export function IndustryCard({ industry }: IndustryCardProps) {
  const theme = getIndustryTheme(industry.id);
  const Icon = industryIcons[industry.iconId];

  return (
    <article className="group w-[16.75rem] shrink-0 snap-start sm:w-[18rem] lg:w-[19rem]">
      <Link href={industry.href} className="block">
        <div className="relative">
          <IndustryCardArt theme={theme} image={industry.image} label={industry.imageAlt} />
          <div className="absolute -bottom-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white shadow-[0_4px_14px_-2px_rgba(15,23,42,0.12)] transition-transform duration-300 group-hover:scale-105">
            <Icon className="h-4 w-4 text-slate-800" strokeWidth={1.75} aria-hidden="true" />
          </div>
        </div>

        <div className="pt-7">
          <h3 className="font-display text-[1.05rem] font-bold text-slate-900 transition-colors group-hover:text-slate-700 sm:text-lg">
            {industry.title}
          </h3>
          <p className="mt-1.5 text-sm leading-snug text-slate-500">{industry.subtitle}</p>
        </div>
      </Link>
    </article>
  );
}
