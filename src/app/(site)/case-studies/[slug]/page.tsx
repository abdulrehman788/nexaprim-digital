import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetail } from "@/components/sections/case-studies/CaseStudyDetail";
import { getAllCaseStudySlugs, getCaseStudyBySlug } from "@/lib/content/case-studies";
import { generatePageMetadata } from "@/lib/seo";

interface CaseStudyPageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const slugs = await getAllCaseStudySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const study = await getCaseStudyBySlug(params.slug);

  if (!study) {
    return generatePageMetadata({ title: "Case Study Not Found", path: "/case-studies", noIndex: true });
  }

  return generatePageMetadata({
    title: `${study.client} Case Study`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = await getCaseStudyBySlug(params.slug);

  if (!study) {
    notFound();
  }

  return (
    <main>
      <CaseStudyDetail study={study} />
    </main>
  );
}
