import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailSection } from "@/components/sections/services/ServiceDetailSection";
import { getServiceById, services } from "@/data/services";
import { generatePageMetadata } from "@/lib/seo";

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceById(params.slug);

  if (!service) {
    return generatePageMetadata({ title: "Service Not Found", path: "/services", noIndex: true });
  }

  return generatePageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.id}`,
  });
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceById(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <ServiceDetailSection service={service} />
    </main>
  );
}
