import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import type { ClientReview } from "@/types";

function StarRating({ rating, dark = false }: { rating: number; dark?: boolean }) {
  const emptyClass = dark ? "fill-white/10 text-white/10" : "fill-slate-200 text-slate-200";

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "fill-accent text-accent"
              : i < rating
                ? "fill-accent/50 text-accent"
                : emptyClass
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

interface ReviewCardProps {
  review: ClientReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const paragraphs = review.body.split("\n\n");

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-[#1c1c26] p-6 transition-colors hover:border-accent/20 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <StarRating rating={review.rating} dark />
        <p className="text-xs font-medium text-content-muted">{review.reviewed}</p>
      </div>

      <p className="mt-4 inline-flex w-fit rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
        {review.highlight}
      </p>

      <div className="mt-5 flex-1 space-y-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-content-secondary">
            {paragraph}
          </p>
        ))}
      </div>

      <footer className="mt-6 border-t border-white/[0.06] pt-5">
        <p className="font-display text-base font-bold text-white">{review.author}</p>
        <p className="mt-0.5 text-sm text-content-secondary">
          {review.role}, {review.client}
        </p>
        <p className="mt-1 text-xs text-content-muted">
          {review.industry} · {review.engagement} engagement
        </p>
        {review.caseStudySlug ? (
          <Link
            href={`/case-studies/${review.caseStudySlug}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            Read the case study
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        ) : null}
      </footer>
    </article>
  );
}

interface ReviewsListProps {
  reviews: ClientReview[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <ul className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {reviews.map((review) => (
        <li key={review.id}>
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}

interface ReviewsSummaryProps {
  aggregateRating: number;
  totalReviews: number;
  projectsDelivered: string;
}

export function ReviewsSummary({
  aggregateRating,
  totalReviews,
  projectsDelivered,
}: ReviewsSummaryProps) {
  return (
    <div className="mb-12 grid gap-6 rounded-2xl border border-white/10 bg-[#111118] p-6 sm:grid-cols-3 sm:p-8">
      <div className="text-center sm:text-left">
        <p className="font-display text-4xl font-bold text-gold-gradient">{aggregateRating}</p>
        <p className="mt-1 text-sm text-content-secondary">Average rating</p>
        <div className="mt-2 flex justify-center sm:justify-start">
          <StarRating rating={aggregateRating} dark />
        </div>
      </div>
      <div className="text-center sm:text-left">
        <p className="font-display text-4xl font-bold text-white">{totalReviews}</p>
        <p className="mt-1 text-sm text-content-secondary">Published reviews</p>
      </div>
      <div className="text-center sm:text-left">
        <p className="font-display text-4xl font-bold text-white">{projectsDelivered}</p>
        <p className="mt-1 text-sm text-content-secondary">Projects delivered since 2019</p>
      </div>
    </div>
  );
}
