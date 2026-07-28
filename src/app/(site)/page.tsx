import type { Metadata } from "next";
import { preload } from "react-dom";

import { HomePageContent } from "@/components/sections/home/HomePageContent";
import { heroContent } from "@/data/hero";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Digital Marketing Agency",
  description:
    "Expandova builds integrated digital systems — strategy, creative, performance marketing, and automation — that drive measurable growth for mid-market brands.",
  path: "/",
});

export default function HomePage() {
  preload(heroContent.skylineImage, { as: "image", fetchPriority: "high" });

  return (
    <main>
      <HomePageContent />
    </main>
  );
}
