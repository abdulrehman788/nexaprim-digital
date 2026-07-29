import {
  Code2,
  Megaphone,
  Palette,
  PenTool,
  Search,
  Share2,
  ShoppingBag,
  Target,
  Layout,
} from "lucide-react";

import type { Service } from "@/types";

/**
 * Slim homepage services catalog — avoids importing the full service detail
 * trees (100KB+ of copy) into the home route chunk.
 */
export const homepageServices: Service[] = [
  {
    id: "digital-strategy",
    title: "Digital Strategy",
    description:
      "Research-driven roadmaps that align your channels, messaging, and budget to measurable revenue goals.",
    href: "/services/digital-strategy",
    icon: Target,
    imageAlt: "Digital strategy consulting and growth planning services",
    gradientFrom: "#3a2a6b",
    gradientVia: "#8b5cf6",
    gradientTo: "#1a1230",
    accentShape: "bars",
    category: "marketing",
  },
  {
    id: "seo-content",
    title: "Search Engine Optimization",
    description:
      "Technical SEO, content clusters, and authority building that compound organic traffic and qualified demand.",
    href: "/services/seo-content",
    icon: Search,
    imageAlt: "SEO and content marketing services",
    gradientFrom: "#1e3a5f",
    gradientVia: "#3b82f6",
    gradientTo: "#0f172a",
    accentShape: "circle",
    category: "marketing",
  },
  {
    id: "paid-media",
    title: "Pay Per Click",
    description:
      "Paid search and social campaigns engineered for efficient CAC, clear attribution, and scalable pipeline.",
    href: "/services/paid-media",
    icon: Megaphone,
    imageAlt: "Pay-per-click and paid media advertising services",
    gradientFrom: "#4c1d95",
    gradientVia: "#a855f7",
    gradientTo: "#1e1b4b",
    accentShape: "ring",
    category: "marketing",
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    description:
      "Content systems and community growth that turn attention into brand preference and inbound leads.",
    href: "/services/social-media",
    icon: Share2,
    imageAlt: "Social media marketing and community growth services",
    gradientFrom: "#9d174d",
    gradientVia: "#ec4899",
    gradientTo: "#4a044e",
    accentShape: "wave",
    category: "marketing",
  },
  {
    id: "brand-creative",
    title: "Brand & Creative Design",
    description:
      "Positioning, identity, and creative systems that make your brand unmistakable across every channel.",
    href: "/services/brand-creative",
    icon: Palette,
    imageAlt: "Brand identity and creative design services",
    gradientFrom: "#c2410c",
    gradientVia: "#f97316",
    gradientTo: "#431407",
    accentShape: "diamond",
    category: "design",
  },
  {
    id: "graphics-design",
    title: "Graphic Design",
    description:
      "Campaign visuals, product graphics, and design systems built for conversion — not decoration.",
    href: "/services/graphics-design",
    icon: PenTool,
    imageAlt: "Graphic design and visual creative services",
    gradientFrom: "#5b21b6",
    gradientVia: "#8b5cf6",
    gradientTo: "#2e1065",
    accentShape: "grid",
    category: "design",
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Fast, conversion-focused websites and apps engineered for SEO, performance, and growth experiments.",
    href: "/services/web-development",
    icon: Code2,
    imageAlt: "Custom web development services",
    gradientFrom: "#0e7490",
    gradientVia: "#06b6d4",
    gradientTo: "#083344",
    accentShape: "bars",
    category: "development",
  },
  {
    id: "shopify-development",
    title: "Shopify Web Design",
    description:
      "High-converting Shopify storefronts with clean UX, speed, and checkout flows that protect revenue.",
    href: "/services/shopify-development",
    icon: ShoppingBag,
    imageAlt: "Shopify web design and ecommerce development",
    gradientFrom: "#166534",
    gradientVia: "#22c55e",
    gradientTo: "#052e16",
    accentShape: "circle",
    category: "development",
  },
  {
    id: "custom-website-design",
    title: "Custom Website Design",
    description:
      "Bespoke website experiences tailored to your brand, audience, and conversion goals — not templates.",
    href: "/services/custom-website-design",
    icon: Layout,
    imageAlt: "Custom website design services",
    gradientFrom: "#1e3a8a",
    gradientVia: "#6366f1",
    gradientTo: "#0f172a",
    accentShape: "ring",
    category: "development",
  },
];
