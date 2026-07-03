import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ReviewsList, ReviewsSummary } from "@/components/sections/reviews/ReviewsList";
import { reviews, reviewsPage } from "@/data/reviews";
import { ctaLinks } from "@/lib/constants";

export function ReviewsSection() {
  return (
    <Section variant="light" divider={false}>
      <Container>
        <ReviewsSummary
          aggregateRating={reviewsPage.aggregateRating}
          totalReviews={reviewsPage.totalReviews}
        />
        <ReviewsList reviews={reviews} />

        <div className="mt-14 text-center">
          <p className="text-base text-slate-600">
            Want references for your industry? Ask on a strategy call — we will connect you directly.
          </p>
          <Button href={ctaLinks.strategyCall} size="lg" pill className="mt-4">
            Book a Strategy Call
          </Button>
        </div>
      </Container>
    </Section>
  );
}
