/** Homepage service card imagery — unique, topic-matched photos (no duplicates). */
export const homeServiceCardImages: Record<string, string> = {
  "digital-strategy":
    "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=640&q=70",
  "seo-content":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=640&q=70",
  "paid-media":
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=640&q=70",
  "social-media":
    "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&w=640&q=70",
  "brand-creative":
    "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=640&q=70",
  "graphics-design":
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=640&q=70",
  "web-development":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=640&q=70",
  "shopify-development":
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=640&q=70",
  "custom-website-design":
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=640&q=70",
};

export const growthProcessImages = {
  discover:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=70",
  strategy:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=70",
  build:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=70",
  optimize:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=70",
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
