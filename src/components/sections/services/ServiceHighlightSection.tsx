import Link from "next/link";
import { Trophy } from "lucide-react";

import { StarryNightBackground } from "@/components/sections/services/StarryNightBackground";
import { Container } from "@/components/ui/Container";
import { ctaLinks } from "@/lib/constants";
import type { ServiceHighlightSection as ServiceHighlightSectionData } from "@/types";

interface ServiceHighlightSectionProps {
  content: ServiceHighlightSectionData;
}

export function ServiceHighlightSection({ content }: ServiceHighlightSectionProps) {
  return (
    <section
      aria-labelledby={`service-highlight-${content.id}`}
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <StarryNightBackground />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
          <div className="flex items-center justify-center">
            <Trophy
              className="h-40 w-40 text-accent sm:h-48 sm:w-48 lg:h-56 lg:w-56"
              strokeWidth={1.1}
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Why NexaPrime</p>
            <h2
              id={`service-highlight-${content.id}`}
              className="mt-4 font-display text-[1.75rem] font-bold leading-[1.18] text-white sm:text-3xl lg:text-[2.15rem] lg:leading-[1.2]"
            >
              {content.titleWhite}{" "}
              <span className="text-gold-gradient">{content.titleAccent}</span>
            </h2>

            <div className="mt-8 space-y-6">
              {content.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-content-primary sm:text-[1.05rem] sm:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <Link
              href={ctaLinks.strategyCall}
              className="bg-gold-gradient mt-10 inline-flex min-h-[3.25rem] items-center justify-center rounded-lg px-8 py-3.5 text-sm font-semibold text-black shadow-glow transition-opacity hover:opacity-90 sm:text-base"
            >
              {content.ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
