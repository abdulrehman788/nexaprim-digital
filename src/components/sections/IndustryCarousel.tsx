"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { IndustryCard } from "@/components/ui/IndustryCard";
import type { Industry } from "@/types";
import { cn } from "@/lib/utils";

interface IndustryCarouselProps {
  industries: Industry[];
  className?: string;
}

export function IndustryCarousel({ industries, className }: IndustryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => scroll("left")}
        className="absolute -left-2 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-soft transition-colors hover:border-slate-300 hover:text-slate-900 sm:flex lg:-left-5"
        aria-label="Scroll industries left"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-1 pb-2 pt-1 snap-x snap-mandatory scrollbar-hide sm:gap-7 sm:px-12"
      >
        {industries.map((industry) => (
          <IndustryCard key={industry.id} industry={industry} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll("right")}
        className="absolute -right-2 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-soft transition-colors hover:border-slate-300 hover:text-slate-900 sm:flex lg:-right-5"
        aria-label="Scroll industries right"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
