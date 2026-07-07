import { serviceCategories } from "@/data/services";
import { siteConfig } from "@/lib/constants";
import type { ServiceDetail } from "@/types";

interface ServicePageJsonLdProps {
  service: ServiceDetail;
}

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServicePageJsonLd({ service }: ServicePageJsonLdProps) {
  const pageUrl = new URL(service.href, siteConfig.url).toString();
  const categoryLabel =
    serviceCategories.find((c) => c.id === service.category)?.label ?? "Digital Marketing";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: new URL("/services", siteConfig.url).toString(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: pageUrl,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.longDescription,
    url: pageUrl,
    serviceType: categoryLabel,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

  const faqSchema = service.faqSection?.items.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqSection.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <JsonLdScript data={breadcrumbSchema} />
      <JsonLdScript data={serviceSchema} />
      {faqSchema ? <JsonLdScript data={faqSchema} /> : null}
    </>
  );
}
