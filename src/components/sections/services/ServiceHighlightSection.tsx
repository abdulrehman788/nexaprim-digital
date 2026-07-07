import Link from "next/link";
import { Trophy } from "lucide-react";

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
      className="border-b border-white/[0.06] bg-[#111118] py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
          <div className="flex justify-center lg:justify-start">
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent sm:h-24 sm:w-24">
              <Trophy className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.25} aria-hidden="true" />
            </span>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Why NexaPrime</p>
            <h2
              id={`service-highlight-${content.id}`}
              className="mt-3 font-serif text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl"
            >
              {content.titleWhite}{" "}
              <span className="text-gold-gradient">{content.titleAccent}</span>
            </h2>

            <div className="mt-5 space-y-4">
              {content.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-sm leading-relaxed text-content-secondary sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <Link
              href={ctaLinks.strategyCall}
              className="mt-6 inline-flex min-h-[3rem] items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              {content.ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
