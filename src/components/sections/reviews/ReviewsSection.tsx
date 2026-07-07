import Link from "next/link";

import { ReviewsList, ReviewsSummary } from "@/components/sections/reviews/ReviewsList";
import { Container } from "@/components/ui/Container";
import { reviews, reviewsPage } from "@/data/reviews";
import { ctaLinks } from "@/lib/constants";
import { sectionLight, sectionPadding } from "@/lib/section-surfaces";
import { cn } from "@/lib/utils";

export function ReviewsSection() {
  return (
    <section
      aria-labelledby="reviews-list-heading"
      className={cn(sectionLight, sectionPadding, "overflow-x-hidden pb-20 sm:pb-24")}
    >
      <Container>
        <h2 id="reviews-list-heading" className="sr-only">
          Client reviews
        </h2>

        <ReviewsSummary
          aggregateRating={reviewsPage.aggregateRating}
          totalReviews={reviewsPage.totalReviews}
          projectsDelivered={reviewsPage.projectsDelivered}
        />

        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
            Interactive review studio
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Filter by industry and use the arrows or client cards below to browse each testimonial.
            Reviews auto-advance — hover to pause, or press spacebar to toggle playback.
          </p>
        </div>

        <ReviewsList reviews={reviews} />

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 text-center sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
            {reviewsPage.ctaOverline}
          </p>
          <h3 className="mt-5 font-display text-[1.75rem] font-bold leading-[1.15] text-slate-900 sm:text-3xl">
            {reviewsPage.ctaTitle}
          </h3>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {reviewsPage.ctaDescription}
          </p>
          <Link
            href={ctaLinks.strategyCall}
            className="bg-gold-gradient mt-10 inline-flex min-h-[3.25rem] items-center justify-center rounded-lg px-10 py-3.5 text-sm font-semibold text-black shadow-glow transition-opacity hover:opacity-90 sm:text-base"
          >
            {reviewsPage.ctaLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
