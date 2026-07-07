"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Star,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { ClientReview } from "@/types";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7500;

const industryThemes: Record<string, { glow: string; accent: string }> = {
  Hospitality: {
    glow: "from-amber-500/15 via-transparent to-transparent",
    accent: "border-amber-500/25 bg-amber-500/10 text-amber-200",
  },
  Healthcare: {
    glow: "from-sky-500/15 via-transparent to-transparent",
    accent: "border-sky-500/25 bg-sky-500/10 text-sky-200",
  },
  Restaurants: {
    glow: "from-orange-500/15 via-transparent to-transparent",
    accent: "border-orange-500/25 bg-orange-500/10 text-orange-200",
  },
  "Real Estate": {
    glow: "from-emerald-500/15 via-transparent to-transparent",
    accent: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
  },
  Education: {
    glow: "from-violet-500/15 via-transparent to-transparent",
    accent: "border-violet-500/25 bg-violet-500/10 text-violet-200",
  },
  "E-commerce": {
    glow: "from-rose-500/15 via-transparent to-transparent",
    accent: "border-rose-500/25 bg-rose-500/10 text-rose-200",
  },
};

const defaultTheme = {
  glow: "from-accent/15 via-transparent to-transparent",
  accent: "border-accent/25 bg-accent/10 text-accent",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getTheme(industry: string) {
  return industryThemes[industry] ?? defaultTheme;
}

export function StarRating({ rating, dark = false }: { rating: number; dark?: boolean }) {
  const emptyClass = dark ? "fill-white/10 text-white/10" : "fill-slate-200 text-slate-200";

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-4 w-4",
            index < Math.floor(rating)
              ? "fill-accent text-accent"
              : index < rating
                ? "fill-accent/50 text-accent"
                : emptyClass,
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

interface ReviewSlideProps {
  review: ClientReview;
  theme?: "light" | "dark";
}

function ReviewSlide({ review, theme = "dark" }: ReviewSlideProps) {
  const light = theme === "light";
  const [lead, ...rest] = review.body.split("\n\n");
  const themeColors = getTheme(review.industry);

  return (
    <article className="flex flex-col">
      <header
        className={cn(
          "flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between",
          light ? "border-slate-200" : "border-white/[0.06]",
        )}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
              light ? "border-accent/30 bg-accent/10 text-accent" : themeColors.accent,
            )}
          >
            {review.industry}
          </span>
          <span className={cn("text-[11px] font-semibold uppercase tracking-wider", light ? "text-slate-500" : "text-content-muted")}>
            Verified client review
          </span>
          <span className={cn("hidden h-1 w-1 rounded-full sm:block", light ? "bg-slate-300" : "bg-white/20")} aria-hidden="true" />
          <span className={cn("text-xs", light ? "text-slate-500" : "text-content-muted")}>{review.reviewed}</span>
          <span className={cn("text-xs", light ? "text-slate-500" : "text-content-muted")}>· {review.engagement}</span>
        </div>
        <StarRating rating={review.rating} dark={!light} />
      </header>

      <div className="grid gap-8 py-8 lg:grid-cols-[11.5rem_minmax(0,1fr)] lg:gap-10">
        <aside className="flex flex-col gap-4 lg:pt-1">
          <div
            className={cn(
              "rounded-xl border p-5",
              light ? "border-slate-200 bg-slate-50" : "border-white/[0.08] bg-[#1c1c26]/90",
            )}
          >
            <p className={cn("text-[10px] font-semibold uppercase tracking-[0.28em]", light ? "text-slate-500" : "text-content-muted")}>
              Measured result
            </p>
            <p className={cn("mt-3 font-display text-xl font-bold leading-snug", light ? "text-slate-900" : "text-white")}>
              {review.highlight}
            </p>
          </div>
          <div
            className={cn(
              "rounded-xl border px-4 py-3",
              light ? "border-slate-200 bg-white" : "border-white/[0.06] bg-white/[0.02]",
            )}
          >
            <p className={cn("text-[10px] font-semibold uppercase tracking-[0.2em]", light ? "text-slate-500" : "text-content-muted")}>
              Engagement
            </p>
            <p className={cn("mt-1 text-sm font-medium", light ? "text-slate-600" : "text-content-secondary")}>{review.engagement}</p>
          </div>
        </aside>

        <div className="relative min-w-0">
          <span
            className={cn(
              "pointer-events-none absolute -left-1 -top-3 font-serif text-6xl leading-none",
              light ? "text-slate-200" : "text-white/[0.06]",
            )}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote
            className={cn(
              "relative font-serif text-lg leading-relaxed sm:text-xl sm:leading-8",
              light ? "text-slate-800" : "text-white",
            )}
          >
            {lead}
          </blockquote>

          {rest.length > 0 ? (
            <div className={cn("mt-5 space-y-4 border-l pl-5", light ? "border-slate-200" : "border-white/[0.08]")}>
              {rest.map((paragraph) => (
                <p
                  key={`${review.id}-${paragraph.slice(0, 40)}`}
                  className={cn(
                    "text-sm leading-relaxed sm:text-[0.95rem] sm:leading-7",
                    light ? "text-slate-600" : "text-content-secondary",
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <footer
        className={cn(
          "flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between",
          light ? "border-slate-200" : "border-white/[0.06]",
        )}
      >
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-sm font-bold text-black">
            {getInitials(review.author)}
          </span>
          <div>
            <p className={cn("font-display text-base font-bold", light ? "text-slate-900" : "text-white")}>{review.author}</p>
            <p className={cn("mt-0.5 text-sm", light ? "text-slate-600" : "text-content-secondary")}>{review.role}</p>
            <p className={cn("text-sm", light ? "text-slate-500" : "text-content-muted")}>{review.client}</p>
          </div>
        </div>

        {review.caseStudySlug ? (
          <Link
            href={`/case-studies/${review.caseStudySlug}`}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent sm:w-auto",
              light ? "border-slate-300 bg-slate-50 text-slate-800" : "border-white/15 bg-white/[0.04] text-white",
            )}
          >
            View case study
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : null}
      </footer>
    </article>
  );
}

interface ReviewsCarouselProps {
  reviews: ClientReview[];
  theme?: "light" | "dark";
}

export function ReviewsCarousel({ reviews, theme = "dark" }: ReviewsCarouselProps) {
  const light = theme === "light";
  const prefersReducedMotion = useReducedMotion();
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const industries = useMemo(
    () => ["All", ...Array.from(new Set(reviews.map((review) => review.industry)))],
    [reviews],
  );

  const filteredReviews = useMemo(
    () =>
      activeIndustry === "All"
        ? reviews
        : reviews.filter((review) => review.industry === activeIndustry),
    [activeIndustry, reviews],
  );

  const total = filteredReviews.length;

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) return;

      const wrapped = ((nextIndex % total) + total) % total;
      if (wrapped === activeIndex) return;

      const forward = wrapped > activeIndex || (activeIndex === total - 1 && wrapped === 0);
      setDirection(forward ? 1 : -1);
      setActiveIndex(wrapped);
      setProgress(0);
    },
    [activeIndex, total],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const handleIndustryChange = (industry: string) => {
    setActiveIndustry(industry);
    setActiveIndex(0);
    setDirection(0);
    setProgress(0);
  };

  useEffect(() => {
    if (activeIndex >= total && total > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
      if (event.key === " ") {
        event.preventDefault();
        setIsPaused((value) => !value);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || total <= 1) {
      return;
    }

    setProgress(0);
    const start = performance.now();
    let frame = 0;

    const animate = (now: number) => {
      const elapsed = now - start;
      const pct = (elapsed / AUTOPLAY_MS) * 100;

      if (pct >= 100) {
        goNext();
        return;
      }

      setProgress(pct);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, goNext, isPaused, prefersReducedMotion, total]);

  if (total === 0) {
    return null;
  }

  const activeReview = filteredReviews[activeIndex];
  if (!activeReview) {
    return null;
  }

  const industryTheme = getTheme(activeReview.industry);

  return (
    <div className="space-y-6 overflow-x-hidden">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter reviews by industry"
      >
        {industries.map((industry) => {
          const isActive = activeIndustry === industry;

          return (
            <button
              key={industry}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleIndustryChange(industry)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                isActive
                  ? "border-accent/50 bg-accent/15 text-accent"
                  : light
                    ? "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    : "border-white/10 bg-white/[0.03] text-content-secondary hover:border-white/20 hover:text-white",
              )}
            >
              {industry}
            </button>
          );
        })}
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border shadow-card",
            light ? "border-slate-200 bg-white" : "border-white/[0.08] bg-[#0d0d12]",
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70",
              industryTheme.glow,
            )}
            aria-hidden="true"
          />
          {!light ? (
            <div
              className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-1/4 rounded-full bg-accent/10 blur-3xl opacity-60"
              aria-hidden="true"
            />
          ) : null}

          <div className="relative px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeReview.id}
                custom={direction}
                drag={prefersReducedMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -90) goNext();
                  else if (info.offset.x > 90) goPrev();
                }}
                initial={{
                  opacity: 0,
                  x: direction >= 0 ? 64 : -64,
                  scale: 0.98,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: direction >= 0 ? -64 : 64,
                  scale: 0.98,
                  filter: "blur(4px)",
                }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
                className="touch-pan-y"
              >
                <ReviewSlide review={activeReview} theme={theme} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={cn("relative border-t px-5 py-4 sm:px-8", light ? "border-slate-200" : "border-white/[0.06]")}>
            <div className={cn("mb-4 h-0.5 overflow-hidden rounded-full", light ? "bg-slate-200" : "bg-white/10")}>
              <motion.div
                className="h-full origin-left rounded-full bg-gold-gradient"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className={cn("text-xs", light ? "text-slate-500" : "text-content-muted")}>
                Review {activeIndex + 1} of {total}
                {activeIndustry !== "All" ? ` · ${activeIndustry}` : ""}
              </p>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setIsPaused((value) => !value)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-accent/40 hover:text-accent",
                    light
                      ? "border-slate-300 bg-slate-50 text-slate-700"
                      : "border-white/15 bg-white/[0.04] text-white",
                  )}
                  aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
                  aria-pressed={isPaused}
                >
                  {isPaused ? (
                    <Play className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Pause className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={goPrev}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-accent/40 hover:text-accent",
                    light
                      ? "border-slate-300 bg-slate-50 text-slate-700"
                      : "border-white/15 bg-white/[0.04] text-white",
                  )}
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="hidden items-center gap-1.5 sm:flex" role="tablist" aria-label="Review dots">
                  {filteredReviews.map((review, index) => (
                    <button
                      key={review.id}
                      type="button"
                      role="tab"
                      aria-selected={index === activeIndex}
                      aria-label={`Review ${index + 1}: ${review.author}`}
                      onClick={() => goTo(index)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        index === activeIndex
                          ? "w-7 bg-accent"
                          : light
                            ? "w-2 bg-slate-300 hover:bg-slate-400"
                            : "w-2 bg-white/20 hover:bg-white/40",
                      )}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-accent/40 hover:text-accent",
                    light
                      ? "border-slate-300 bg-slate-50 text-slate-700"
                      : "border-white/15 bg-white/[0.04] text-white",
                  )}
                  aria-label="Next review"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
        role="tablist"
        aria-label="All client reviews"
      >
        {filteredReviews.map((review, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={review.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => goTo(index)}
              className={cn(
                "flex flex-col rounded-xl border p-3 text-left transition-all sm:p-4",
                isActive
                  ? light
                    ? "border-accent/35 bg-gold-50 ring-1 ring-accent/25"
                    : "border-accent/35 bg-[#1c1c26] ring-1 ring-accent/25"
                  : light
                    ? "border-slate-200 bg-white hover:border-slate-300"
                    : "border-white/[0.06] bg-[#14141c] hover:border-white/12",
              )}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                    isActive ? "bg-gold-gradient text-black" : light ? "bg-slate-100 text-slate-700" : "bg-white/10 text-white",
                  )}
                >
                  {getInitials(review.author)}
                </span>
                <span className="min-w-0">
                  <span className={cn("block truncate text-xs font-semibold", light ? "text-slate-900" : "text-white")}>
                    {review.author}
                  </span>
                  <span className={cn("block truncate text-[11px]", light ? "text-slate-500" : "text-content-muted")}>
                    {review.client}
                  </span>
                </span>
              </div>
              <p className="mt-3 line-clamp-2 text-[11px] font-semibold uppercase tracking-wide text-accent">
                {review.highlight}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
