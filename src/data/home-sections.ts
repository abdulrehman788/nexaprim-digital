/** Homepage-only imagery and copy â€” Unsplash photos matching the design mockup. */

export const homeServiceCardImages: Record<string, string> = {
  "digital-strategy":
    "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop",
  "seo-content":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop",
  "paid-media":
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop",
  "social-media":
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop",
  "brand-creative":
    "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop",
  "graphics-design":
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop",
  "web-development":
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop",
  "shopify-development":
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop",
  "custom-website-design":
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop",
};

export const growthProcessImages = {
  discover:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop",
  strategy:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop",
  build:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop",
  optimize:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop",
} as const;

export const homePricingSection = {
  overline: "Plans built to expand",
  titleLine1: "Start with the right plan.",
  titleAccent: "Scale with confidence.",
  description:
    "Whether you're launching, growing, or scaling globally â€” choose the plan that fits your stage and goals.",
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
