import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IndustryDetailSection } from "@/components/sections/industries/IndustryDetailSection";
import { getIndustryById, industries } from "@/data/industries";
import { generatePageMetadata } from "@/lib/seo";

interface IndustryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.id }));
}

export function generateMetadata({ params }: IndustryPageProps): Metadata {
  const industry = getIndustryById(params.slug);

  if (!industry) {
    return generatePageMetadata({ title: "Industry Not Found", path: "/industries", noIndex: true });
  }

  return generatePageMetadata({
    title: `${industry.title} Marketing`,
    description: industry.description,
    path: `/industries/${industry.id}`,
  });
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const industry = getIndustryById(params.slug);

  if (!industry) {
    notFound();
  }

  return (
    <main className="bg-white">
      <IndustryDetailSection industry={industry} />
    </main>
  );
}
