"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { homeReviewsSection } from "@/data/home-sections";
import { reviews } from "@/data/reviews";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const featuredReviews = reviews.slice(0, 3);

export function HomeClientReviewsSection() {
  const [active, setActive] = useState(0);
  const current = featuredReviews[active];

  if (!current) return null;

  return (
    <Section variant="dark" aria-labelledby="home-reviews-heading">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <p
            id="home-reviews-heading"
            className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-400"
          >
            {homeReviewsSection.overline}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setActive((prev) => (prev === 0 ? featuredReviews.length - 1 : prev - 1))
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/40"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActive((prev) => (prev === featuredReviews.length - 1 ? 0 : prev + 1))
              }
              className="bg-gold-gradient flex h-10 w-10 items-center justify-center rounded-full text-white shadow-glow"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredReviews.map((review, index) => (
            <article
              key={review.id}
              className={`rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-opacity ${
                index === active ? "opacity-100" : "opacity-70 lg:opacity-100"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-200">
                  {getInitials(review.author)}
                </div>
                <p className="text-sm leading-relaxed text-content-secondary line-clamp-5">
                  &ldquo;{review.body.split("\n\n")[0]}&rdquo;
                </p>
              </div>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{review.author}</p>
                <p className="text-xs text-content-muted">{review.role}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-violet-300">{review.highlight}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
