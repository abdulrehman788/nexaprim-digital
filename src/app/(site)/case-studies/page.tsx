import type { Metadata } from "next";

import { CaseStudiesGrid } from "@/components/sections/case-studies/CaseStudiesGrid";
import { CaseStudiesHero } from "@/components/sections/case-studies/CaseStudiesHero";
import { getPublishedCaseStudies } from "@/lib/content/case-studies";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Case Studies",
  description:
    "See how NexaPrime Digital helped hospitality, healthcare, restaurant, real estate, education, and ecommerce brands grow revenue with connected digital systems.",
  path: "/case-studies",
});

export const dynamic = "force-dynamic";

export default async function CaseStudiesPage() {
  const studies = await getPublishedCaseStudies();

  return (
    <main>
      <CaseStudiesHero />
      <CaseStudiesGrid studies={studies} />
    </main>
  );
}
