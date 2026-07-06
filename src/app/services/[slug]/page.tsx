import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailSection } from "@/components/sections/services/ServiceDetailSection";
import { getAllServiceSlugs, getServiceById } from "@/data/services";
import { generatePageMetadata } from "@/lib/seo";

interface ServicePageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceById(params.slug);

  if (!service) {
    return generatePageMetadata({ title: "Service Not Found", path: "/services", noIndex: true });
  }

  return generatePageMetadata({
    title: service.title,
    description: service.description,
    path: service.href,
  });
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceById(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-surface-primary">
      <ServiceDetailSection service={service} />
    </main>
  );
}
