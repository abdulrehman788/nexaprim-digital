/** Homepage-only imagery and copy aligned to the Website Design doc. */

export const homeServiceCardImages: Record<string, string> = {
  "digital-strategy":
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "seo-content":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "paid-media":
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
  "social-media":
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
  "brand-creative":
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  "graphics-design":
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
  "web-development":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  "shopify-development":
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
  "custom-website-design":
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
};

export const growthProcessImages = {
  discover:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  strategy:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
  build:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  optimize:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
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
