import { ReviewsCarousel, StarRating } from "@/components/sections/reviews/ReviewsCarousel";
import type { ClientReview } from "@/types";

export { StarRating };

interface ReviewsListProps {
  reviews: ClientReview[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return <ReviewsCarousel reviews={reviews} />;
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
    <div className="mb-12 overflow-hidden rounded-2xl border border-white/10 bg-[#111118]">
      <div className="grid divide-y divide-white/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="px-6 py-7 text-center sm:py-8 sm:text-left">
          <p className="font-display text-4xl font-bold text-gold-gradient">{aggregateRating}</p>
          <p className="mt-1 text-sm text-content-secondary">Average client rating</p>
          <div className="mt-3 flex justify-center sm:justify-start">
            <StarRating rating={aggregateRating} dark />
          </div>
        </div>
        <div className="px-6 py-7 text-center sm:py-8 sm:text-left">
          <p className="font-display text-4xl font-bold text-white">{totalReviews}</p>
          <p className="mt-1 text-sm text-content-secondary">Verified client reviews</p>
          <p className="mt-2 text-xs text-content-muted">Named authors, permission on file</p>
        </div>
        <div className="px-6 py-7 text-center sm:py-8 sm:text-left">
          <p className="font-display text-4xl font-bold text-white">{projectsDelivered}</p>
          <p className="mt-1 text-sm text-content-secondary">Projects delivered since 2019</p>
          <p className="mt-2 text-xs text-content-muted">Across six core industries</p>
        </div>
      </div>
    </div>
  );
}
