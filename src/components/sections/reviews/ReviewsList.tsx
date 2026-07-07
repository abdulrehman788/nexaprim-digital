import { ReviewsCarousel, StarRating } from "@/components/sections/reviews/ReviewsCarousel";
import { lightBody, lightCard, lightHeading, lightMuted } from "@/lib/section-surfaces";
import type { ClientReview } from "@/types";
import { cn } from "@/lib/utils";

export { StarRating };

interface ReviewsListProps {
  reviews: ClientReview[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return <ReviewsCarousel reviews={reviews} theme="light" />;
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
    <div className={cn("mb-12 overflow-hidden rounded-2xl border", lightCard)}>
      <div className="grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="px-6 py-7 text-center sm:py-8 sm:text-left">
          <p className="font-display text-4xl font-bold text-gold-gradient">{aggregateRating}</p>
          <p className={cn("mt-1 text-sm", lightBody)}>Average client rating</p>
          <div className="mt-3 flex justify-center sm:justify-start">
            <StarRating rating={aggregateRating} />
          </div>
        </div>
        <div className="px-6 py-7 text-center sm:py-8 sm:text-left">
          <p className={cn("font-display text-4xl font-bold", lightHeading)}>{totalReviews}</p>
          <p className={cn("mt-1 text-sm", lightBody)}>Verified client reviews</p>
          <p className={cn("mt-2 text-xs", lightMuted)}>Named authors, permission on file</p>
        </div>
        <div className="px-6 py-7 text-center sm:py-8 sm:text-left">
          <p className={cn("font-display text-4xl font-bold", lightHeading)}>{projectsDelivered}</p>
          <p className={cn("mt-1 text-sm", lightBody)}>Projects delivered since 2019</p>
          <p className={cn("mt-2 text-xs", lightMuted)}>Across six core industries</p>
        </div>
      </div>
    </div>
  );
}
