import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";

/**
 * Served at /robots.txt — points crawlers at the sitemap and blocks private areas.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = siteConfig.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/admin/", "/checkout", "/checkout/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
