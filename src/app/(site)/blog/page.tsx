import type { Metadata } from "next";

import { BlogGrid } from "@/components/sections/blog/BlogGrid";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog",
  description:
    "Digital marketing, SEO, paid media, and web development insights from NexaPrime Digital.",
  path: "/blog",
});

export const dynamic = "force-dynamic";

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
      <BlogGrid />
    </main>
  );
}
