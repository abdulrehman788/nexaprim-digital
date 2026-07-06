import type { Metadata } from "next";

import { ReviewsHero } from "@/components/sections/reviews/ReviewsHero";
import { ReviewsSection } from "@/components/sections/reviews/ReviewsSection";
import { reviews, reviewsPage } from "@/data/reviews";
import { siteConfig } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Client Reviews",
  description:
    "Read what marketing leaders at Grand Vista Hotel Group, Meridian Health, Urban Table, and other NexaPrime clients say about working with our team.",
  path: "/reviews",
});

function ReviewsJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewsPage.aggregateRating,
      reviewCount: reviewsPage.totalReviews,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.body.replace(/\n\n/g, " "),
      datePublished: review.reviewed,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ReviewsPage() {
  return (
    <main className="overflow-x-hidden bg-surface-primary">
      <ReviewsJsonLd />
      <ReviewsHero />
      <ReviewsSection />
    </main>
  );
}
