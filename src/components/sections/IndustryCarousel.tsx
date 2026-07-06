"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollState();
    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, industries.length]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.72;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f8f7f4] to-transparent transition-opacity duration-300 sm:w-16",
          canScrollLeft ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f8f7f4] to-transparent transition-opacity duration-300 sm:w-16",
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={cn(
          "absolute left-0 top-[34%] z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-600 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.15)] transition-all hover:border-slate-300 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-0 sm:flex lg:-left-1",
        )}
        aria-label="Scroll industries left"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-1 pb-1 pt-1 snap-x snap-mandatory scrollbar-hide sm:gap-7 sm:px-14 lg:px-16"
      >
        {industries.map((industry) => (
          <IndustryCard key={industry.id} industry={industry} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={cn(
          "absolute right-0 top-[34%] z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-600 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.15)] transition-all hover:border-slate-300 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-0 sm:flex lg:-right-1",
        )}
        aria-label="Scroll industries right"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
