import type { Metadata } from "next";

import { HomePageContent } from "@/components/sections/home/HomePageContent";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Digital Marketing Agency",
  description:
    "NexaPrime Digital builds integrated digital systems — strategy, creative, performance marketing, and automation — that drive measurable growth for mid-market brands.",
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <HomePageContent />
    </main>
  );
}
