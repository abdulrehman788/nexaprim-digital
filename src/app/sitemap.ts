import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";
import { getPublishedBlogPosts } from "@/lib/content/blog";
import { getPublishedCaseStudies } from "@/lib/content/case-studies";
import { siteRoutes } from "@/lib/site-routes";

/** Refresh sitemap often so new blog/case-study URLs appear for crawlers. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = siteRoutes.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}${path || "/"}`,
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  // Avoid duplicate case-study URLs when DB content replaces static slugs
  const staticCaseStudyUrls = new Set(
    siteRoutes
      .filter((route) => route.path.startsWith("/case-studies/"))
      .map((route) => `${baseUrl}${route.path}`),
  );

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedBlogPosts();
    blogEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishAt ?? now,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    }));
  } catch {
    // DB unavailable during build — static routes still ship
  }

  let caseStudyEntries: MetadataRoute.Sitemap = [];
  try {
    const studies = await getPublishedCaseStudies();
    caseStudyEntries = studies
      .map((study) => ({
        url: `${baseUrl}/case-studies/${study.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
      .filter((entry) => !staticCaseStudyUrls.has(entry.url));
  } catch {
    // fall back to static case studies already in siteRoutes
  }

  // Dedupe by URL (home may appear as base and base/)
  const seen = new Set<string>();
  const merged = [...staticEntries, ...caseStudyEntries, ...blogEntries].filter(
    (entry) => {
      const key = entry.url.replace(/\/$/, "") || baseUrl;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    },
  );

  return merged;
}
