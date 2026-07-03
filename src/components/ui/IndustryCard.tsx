import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { industryIcons } from "@/lib/industry-icons";
import type { Industry } from "@/types";

interface IndustryCardProps {
  industry: Industry;
}

export function IndustryCard({ industry }: IndustryCardProps) {
  const Icon = industryIcons[industry.iconId];

  return (
    <article className="group w-[17.5rem] shrink-0 snap-start sm:w-[18.5rem]">
      <Link href={industry.href} className="block">
        <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={industry.image}
            alt={industry.imageAlt}
            fill
            sizes="(max-width: 640px) 280px, 296px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute -bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-900 bg-white shadow-md">
            <Icon className="h-4 w-4 text-slate-900" strokeWidth={1.75} aria-hidden="true" />
          </div>
        </div>

        <h3 className="font-display text-lg font-bold text-slate-900">{industry.title}</h3>
        <p className="mt-1.5 text-sm leading-snug text-slate-500">{industry.subtitle}</p>
        <ArrowRight
          className="mt-4 h-4 w-4 text-slate-900 transition-transform group-hover:translate-x-0.5"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
