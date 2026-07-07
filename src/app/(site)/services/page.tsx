import type { Metadata } from "next";

import { ServicesGrid } from "@/components/sections/services/ServicesGrid";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Services",
  description:
    "Digital strategy, SEO, paid media, social, brand creative, graphics design, web development, Shopify, WordPress, software development, hosting, and marketing automation — full-stack services from one accountable team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <ServicesHero />
      <ServicesGrid />
    </main>
  );
}
