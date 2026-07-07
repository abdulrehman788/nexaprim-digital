import type { Metadata } from "next";

import { IndustriesPageContent } from "@/components/sections/industries/IndustriesPageContent";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Industries",
  description:
    "Industry-specific digital marketing for hospitality, restaurants, healthcare, real estate, education, and e-commerce — funnels, content, and media built around your sector.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <main data-page-ver="industries-v6">
      <IndustriesPageContent />
    </main>
  );
}
