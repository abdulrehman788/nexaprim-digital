import {
  BarChart3,
  Bot,
  Boxes,
  Megaphone,
  Palette,
  type LucideIcon,
} from "lucide-react";

export type PriceUnit = "project" | "month";

export interface CatalogService {
  id: string;
  name: string;
  price: number;
  unit: PriceUnit;
}

export interface CatalogCategory {
  id: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  services: CatalogService[];
}

// Starting prices are indicative "from" figures used by the quote builder.
export const catalogCategories: CatalogCategory[] = [
  {
    id: "build",
    name: "Build",
    tagline: "Websites, stores, and apps engineered to convert.",
    icon: Boxes,
    services: [
      { id: "business-website", name: "Business Website", price: 1500, unit: "project" },
      { id: "corporate-website", name: "Corporate Website", price: 3500, unit: "project" },
      { id: "landing-page", name: "Landing Page", price: 600, unit: "project" },
      { id: "ecommerce-store", name: "E-commerce Store", price: 4000, unit: "project" },
      { id: "web-app", name: "Web App", price: 8000, unit: "project" },
      { id: "mobile-app", name: "Mobile App", price: 12000, unit: "project" },
      { id: "ui-ux-design", name: "UI/UX Design", price: 2000, unit: "project" },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    tagline: "Identities that make you unforgettable.",
    icon: Palette,
    services: [
      { id: "logo", name: "Logo", price: 500, unit: "project" },
      { id: "brand-identity", name: "Brand Identity", price: 1500, unit: "project" },
      { id: "brand-guidelines", name: "Brand Guidelines", price: 1200, unit: "project" },
      { id: "presentation-design", name: "Presentation Design", price: 800, unit: "project" },
      { id: "social-media-kit", name: "Social Media Kit", price: 600, unit: "project" },
    ],
  },
  {
    id: "market",
    name: "Market",
    tagline: "Demand engines that compound month over month.",
    icon: Megaphone,
    services: [
      { id: "seo", name: "SEO", price: 1200, unit: "month" },
      { id: "google-ads", name: "Google Ads", price: 1000, unit: "month" },
      { id: "meta-ads", name: "Meta Ads", price: 1000, unit: "month" },
      { id: "linkedin-ads", name: "LinkedIn Ads", price: 1200, unit: "month" },
      { id: "email-marketing", name: "Email Marketing", price: 800, unit: "month" },
      { id: "social-media-management", name: "Social Media Management", price: 1000, unit: "month" },
      { id: "content-marketing", name: "Content Marketing", price: 1500, unit: "month" },
    ],
  },
  {
    id: "automate",
    name: "Automate",
    tagline: "AI and workflows that run your busywork.",
    icon: Bot,
    services: [
      { id: "ai-chatbots", name: "AI Chatbots", price: 1500, unit: "project" },
      { id: "crm-setup", name: "CRM Setup", price: 2000, unit: "project" },
      { id: "workflow-automation", name: "Workflow Automation", price: 1800, unit: "project" },
      { id: "ai-agents", name: "AI Agents", price: 3000, unit: "project" },
      { id: "integrations", name: "Integrations", price: 1200, unit: "project" },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Strategy and optimization that unlock the next level.",
    icon: BarChart3,
    services: [
      { id: "analytics", name: "Analytics", price: 900, unit: "month" },
      { id: "conversion-optimization", name: "Conversion Optimization", price: 1500, unit: "month" },
      { id: "growth-consulting", name: "Growth Consulting", price: 2500, unit: "month" },
      { id: "fractional-cmo", name: "Fractional CMO", price: 5000, unit: "month" },
    ],
  },
];

export interface PricingPackage {
  id: string;
  name: string;
  idealFor: string;
  price: number | null;
  priceLabel: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const pricingPackages: PricingPackage[] = [
  {
    id: "launch",
    name: "Launch",
    idealFor: "Startups",
    price: 999,
    priceLabel: "$999",
    description: "Everything you need to get to market with a credible, converting presence.",
    features: [
      "Conversion-focused website",
      "Core brand starter kit",
      "Analytics & tracking setup",
      "Launch checklist & handover",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    idealFor: "Growing businesses",
    price: 2999,
    priceLabel: "$2,999",
    description: "A compounding growth engine across build, brand, and marketing.",
    features: [
      "Everything in Launch",
      "SEO + paid acquisition",
      "Content & social system",
      "Monthly reporting & strategy",
    ],
    highlighted: true,
  },
  {
    id: "scale",
    name: "Scale",
    idealFor: "Established companies",
    price: 5999,
    priceLabel: "$5,999",
    description: "Full-funnel growth with automation and senior strategic guidance.",
    features: [
      "Everything in Growth",
      "Automation & AI workflows",
      "Conversion optimization",
      "Fractional growth leadership",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    idealFor: "Custom organizations",
    price: null,
    priceLabel: "Request a Quote",
    description: "Tailored programs for complex, multi-team, multi-market organizations.",
    features: [
      "Custom scope & SLAs",
      "Dedicated growth team",
      "Advanced integrations",
      "Executive reporting cadence",
    ],
  },
];
