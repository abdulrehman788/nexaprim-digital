import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import type { ClientReview } from "@/types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "fill-gold-400 text-gold-400"
              : i < rating
                ? "fill-gold-400/50 text-gold-400"
                : "fill-slate-200 text-slate-200"
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
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(15,23,42,0.15)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <StarRating rating={review.rating} />
        <p className="text-xs font-medium text-slate-500">{review.reviewed}</p>
      </div>

      <p className="mt-4 inline-flex w-fit rounded-full bg-gold-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-700 ring-1 ring-gold-100">
        {review.highlight}
      </p>

      <div className="mt-5 flex-1 space-y-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-slate-700">
            {paragraph}
          </p>
        ))}
      </div>

      <footer className="mt-6 border-t border-slate-100 pt-5">
        <p className="font-display text-base font-bold text-slate-900">{review.author}</p>
        <p className="mt-0.5 text-sm text-slate-600">
          {review.role}, {review.client}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {review.industry} · {review.engagement} engagement
        </p>
        {review.caseStudySlug ? (
          <Link
            href={`/case-studies/${review.caseStudySlug}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 transition-colors hover:text-gold-800"
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
    <ul className="grid gap-8 lg:grid-cols-2">
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
}

export function ReviewsSummary({ aggregateRating, totalReviews }: ReviewsSummaryProps) {
  return (
    <div className="mb-12 grid gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3 sm:p-8">
      <div className="text-center sm:text-left">
        <p className="font-display text-4xl font-bold text-slate-900">{aggregateRating}</p>
        <p className="mt-1 text-sm text-slate-600">Average rating</p>
        <div className="mt-2 flex justify-center sm:justify-start">
          <StarRating rating={aggregateRating} />
        </div>
      </div>
      <div className="text-center sm:text-left">
        <p className="font-display text-4xl font-bold text-slate-900">{totalReviews}</p>
        <p className="mt-1 text-sm text-slate-600">Published reviews</p>
      </div>
      <div className="text-center sm:text-left">
        <p className="font-display text-4xl font-bold text-slate-900">250+</p>
        <p className="mt-1 text-sm text-slate-600">Projects delivered since 2019</p>
      </div>
    </div>
  );
}
