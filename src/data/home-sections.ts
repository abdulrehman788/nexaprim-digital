/** Homepage-only imagery and copy aligned to the Website Design doc. */

/** Pre-optimized local WebP assets — avoids 9+ third-party image requests on first paint. */
export const homeServiceCardImages: Record<string, string> = {
  "digital-strategy": "/images/services/strategy-devices.webp",
  "seo-content": "/images/services/seo-sketch.webp",
  "paid-media": "/images/services/paid-media.webp",
  "social-media": "/images/services/social-mindmap.webp",
  "brand-creative": "/images/services/social-effort.webp",
  "graphics-design": "/images/services/social-effort.webp",
  "web-development": "/images/services/strategy-devices.webp",
  "shopify-development": "/images/services/shopify-web-design.webp",
  "custom-website-design": "/images/services/shopify-web-design.webp",
};

export const growthProcessImages = {
  discover: "/images/services/seo-growth.webp",
  strategy: "/images/services/strategy-sales.webp",
  build: "/images/services/shopify-web-design.webp",
  optimize: "/images/services/paid-media-growth.webp",
} as const;

export const homePricingSection = {
  overline: "Plans built to expand",
  titleLine1: "Start with the right plan.",
  titleAccent: "Scale with confidence.",
  description:
    "Whether you're launching, growing, or scaling globally — choose the plan that fits your stage and goals.",
} as const;

export const homePricingTrust = [
  {
    id: "risk-free",
    title: "Risk-Free Start",
    description: "No long-term contracts. Cancel anytime.",
  },
  {
    id: "support",
    title: "Dedicated Support",
    description: "Real people, fast responses. Always here to help.",
  },
  {
    id: "secure",
    title: "Secure & Reliable",
    description: "Your data is safe with industry-standard security.",
  },
  {
    id: "scale",
    title: "Results That Scale",
    description: "Built to adapt, optimize, and grow with you.",
  },
] as const;

export const homeReviewsSection = {
  overline: "What our clients say",
} as const;

export const homeConnectCta = {
  overline: "Ready to connect?",
  title: "Let's build something great together.",
  description:
    "Book a free consultation call with our experts and let's discuss how we can achieve your growth goals.",
  cta: "Book a Free Strategy Call",
} as const;
