import type { Metadata } from "next";

import { CaseStudiesGrid } from "@/components/sections/case-studies/CaseStudiesGrid";
import { CaseStudiesHero } from "@/components/sections/case-studies/CaseStudiesHero";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Case Studies",
  description:
    "See how NexaPrime Digital helped hospitality, healthcare, restaurant, real estate, education, and ecommerce brands grow revenue with connected digital systems.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <main>
      <CaseStudiesHero />
      <CaseStudiesGrid />
    </main>
  );
}
