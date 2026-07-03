import type { Metadata } from "next";

import { ServicesGrid } from "@/components/sections/services/ServicesGrid";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Services",
  description:
    "Digital strategy, SEO, paid media, social, brand creative, and marketing automation — full-funnel services from one accountable team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
    </main>
  );
}
