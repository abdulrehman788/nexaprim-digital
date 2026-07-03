import type { Metadata } from "next";

import { IndustriesGrid } from "@/components/sections/industries/IndustriesGrid";
import { IndustriesHero } from "@/components/sections/industries/IndustriesHero";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Industries",
  description:
    "Industry-specific digital marketing for hospitality, restaurants, healthcare, real estate, education, and e-commerce — funnels, content, and media built around your sector.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <main>
      <IndustriesHero />
      <IndustriesGrid />
    </main>
  );
}
