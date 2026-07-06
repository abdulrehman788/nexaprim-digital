import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = siteConfig.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
