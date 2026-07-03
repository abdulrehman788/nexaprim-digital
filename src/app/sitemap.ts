import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    "",
    "/services",
    "/packages",
    "/industries",
    "/case-studies",
    "/about",
    "/contact",
    "/reviews",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const industryRoutes = [
    "/industries/hospitality",
    "/industries/restaurants",
    "/industries/education",
    "/industries/healthcare",
    "/industries/real-estate",
    "/industries/ecommerce",
  ];

  const caseStudyRoutes = [
    "/case-studies/grand-vista-hotel",
    "/case-studies/meridian-health",
    "/case-studies/urban-table",
    "/case-studies/lakeside-realty",
    "/case-studies/brightpath-academy",
    "/case-studies/nova-commerce",
  ];

  const packageRoutes = [
    "/packages/niche-growth",
    "/packages/complete-growth",
    "/packages/brand-acceleration",
    "/packages/performance-engine",
  ];

  const serviceRoutes = [
    "/services/digital-strategy",
    "/services/seo-content",
    "/services/paid-media",
    "/services/social-media",
    "/services/brand-creative",
    "/services/marketing-automation",
  ];

  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...caseStudyRoutes,
    ...packageRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
