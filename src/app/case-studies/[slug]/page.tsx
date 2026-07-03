import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetail } from "@/components/sections/case-studies/CaseStudyDetail";
import { caseStudies, getCaseStudyBySlug } from "@/data/case-studies";
import { generatePageMetadata } from "@/lib/seo";

interface CaseStudyPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const study = getCaseStudyBySlug(params.slug);

  if (!study) {
    return generatePageMetadata({ title: "Case Study Not Found", path: "/case-studies", noIndex: true });
  }

  return generatePageMetadata({
    title: `${study.client} Case Study`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
  });
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = getCaseStudyBySlug(params.slug);

  if (!study) {
    notFound();
  }

  return (
    <main>
      <CaseStudyDetail study={study} />
    </main>
  );
}
