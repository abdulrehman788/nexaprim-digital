import type { Metadata } from "next";

import { PackagesGrid } from "@/components/sections/packages/PackagesGrid";
import { PackagesHero } from "@/components/sections/packages/PackagesHero";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Packages",
  description:
    "Modular growth packages — Niche Growth System, Complete Growth Pack, Brand Acceleration, and Performance Engine — scoped to your stage and budget.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <main>
      <PackagesHero />
      <PackagesGrid />
    </main>
  );
}
