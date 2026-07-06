import {
  FileText,
  MapPin,
  Search,
  Share2,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { ServiceCapabilityItem, ServiceDetail } from "@/types";

type MarketingServiceSeed = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  imageAlt: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  accentShape: ServiceDetail["accentShape"];
  heroTitleBefore: string;
  heroTitleAccent: string;
  heroOverline: string;
  heroSecondaryLine?: string;
  longDescription: string;
  idealFor: string;
  outcomes: string[];
  capabilityTitle: string;
  capabilityDescription: string;
  capabilityItems: ServiceCapabilityItem[];
  capabilitySecondary: ServiceCapabilityItem[];
};

function createMarketingService(seed: MarketingServiceSeed): ServiceDetail {
  return {
    id: seed.id,
    title: seed.title,
    description: seed.description,
    href: `/services/${seed.id}`,
    icon: seed.icon,
    imageAlt: seed.imageAlt,
    gradientFrom: seed.gradientFrom,
    gradientVia: seed.gradientVia,
    gradientTo: seed.gradientTo,
    accentShape: seed.accentShape,
    category: "marketing",
    heroLayout: "centered",
    heroTitleBefore: seed.heroTitleBefore,
    heroTitleAccent: seed.heroTitleAccent,
    heroOverline: seed.heroOverline,
    heroSecondaryLine:
      seed.heroSecondaryLine ?? `Accountable ${seed.title.toLowerCase()} — tied to pipeline, not vanity metrics.`,
    heroCtaLabel: "Get Your Free Consultation",
    headline: seed.longDescription,
    longDescription: seed.longDescription,
    deliverables: seed.capabilityItems.map((item) => ({
      title: item.title,
      description: item.description,
    })),
    outcomes: seed.outcomes,
    idealFor: seed.idealFor,
    featureSections: [
      {
        id: "smart-spending",
        cardLabel: "Smart Spending",
        cardIcon: "wallet",
        cardPosition: "left",
        titleWhite: "Stop Wasting Budget—",
        titleAccent: `${seed.title} That Compounds`,
        withDropCap: true,
        paragraphs: [
          `Most brands pour budget into ${seed.title.toLowerCase()} tactics that look busy on reports but never tie to pipeline or revenue. Without a clear system, teams chase trends instead of outcomes.`,
          `We build disciplined programs with owners, KPIs, and weekly optimization — so every dollar earns its place and leadership can see what's working.`,
          `From audits and strategy through execution and reporting, NexaPrime Digital turns ${seed.title.toLowerCase()} into a compounding channel your finance team can fund with confidence.`,
        ],
      },
      {
        id: "automated-growth",
        cardLabel: "Automated Growth",
        cardIcon: "trending-up",
        cardPosition: "right",
        titleWhite: "Scale What Works—",
        titleAccent: "While You Focus on the Business",
        paragraphs: [
          "Growth compounds when systems run consistently — content calendars, bid governance, testing loops, and reporting your team trusts.",
          "Partner with NexaPrime Digital for programs that adapt as markets shift, with clear metrics tied to revenue — not vanity dashboards.",
          "Unlike one-off campaigns that reset every quarter, disciplined programs keep delivering qualified leads and sales long after launch.",
        ],
      },
    ],
    capabilitiesSection: {
      id: `${seed.id}-included`,
      titleWhite: "What's included in",
      titleAccent: seed.capabilityTitle,
      description: seed.capabilityDescription,
      items: seed.capabilityItems,
      secondaryItems: seed.capabilitySecondary,
    },
    highlightSection: {
      id: `${seed.id}-highlight`,
      titleWhite: "Marketing That Moves",
      titleAccent: "Real Numbers",
      paragraphs: [
        `${seed.title} should connect directly to leads, sales, and margin — not slide decks full of impressions.`,
        "From strategy through execution and reporting, NexaPrime Digital delivers accountable programs your leadership can fund and measure.",
      ],
      ctaLabel: "Get Your Free Consultation",
    },
    faqSection: {
      id: `${seed.id}-faq`,
      titleWhite: seed.title,
      titleAccent: "FAQs",
      items: [
        {
          id: "results-timeline",
          question: `How quickly will we see results from ${seed.title.toLowerCase()}?`,
          answer:
            "Early signals often appear within 30–60 days. Compounding outcomes typically build over 3–6 months depending on competition, budget, and starting position — we set expectations upfront.",
        },
        {
          id: "differentiation",
          question: `What makes your ${seed.title.toLowerCase()} approach better than competitors?`,
          answer:
            "We connect tactics to revenue — not vanity metrics. Strategy maps to buyer stage, execution stays accountable to agreed KPIs, and you get one team instead of disconnected vendors.",
        },
        {
          id: "niche-budget",
          question: `Can ${seed.title.toLowerCase()} work for niche industries or smaller budgets?`,
          answer:
            "Yes. Focused topic clusters, geo-targeting, and phased budgets often win faster than chasing head terms. We scope to your capacity and prioritize what moves revenue first.",
        },
        {
          id: "reporting",
          question: "How transparent is your reporting process?",
          answer:
            "Live dashboards plus weekly or monthly reviews tied to agreed KPIs — spend, leads, revenue contribution, and exactly what we changed. No black-box management.",
        },
      ],
    },
  };
}

export const logicMarketingServices: ServiceDetail[] = [
  createMarketingService({
    id: "local-seo",
    title: "Local SEO",
    description:
      "Dominate local search — maps, reviews, and location pages that put you in front of buyers near you.",
    icon: MapPin,
    imageAlt: "Local SEO services for multi-location and regional businesses",
    gradientFrom: "#1a3028",
    gradientVia: "#5cb88a",
    gradientTo: "#0a1810",
    accentShape: "circle",
    heroTitleBefore: "Own Your",
    heroTitleAccent: "Local Market",
    heroOverline: "Local SEO",
    longDescription:
      "When buyers search for services near them, you need to show up in Maps and local pack results — not three pages deep. We optimize GBP profiles, citations, location pages, and review velocity so you win the zip codes that matter.",
    idealFor: "Multi-location brands, regional service businesses, and anyone competing on 'near me' searches.",
    outcomes: [
      "Stronger visibility in Google Maps and local pack results.",
      "More calls, direction requests, and form fills from nearby buyers.",
      "Consistent NAP data and location content across the web.",
    ],
    capabilityTitle: "Local SEO",
    capabilityDescription:
      "Local search programs built for rankings, reputation, and measurable foot traffic or calls.",
    capabilityItems: [
      {
        id: "gbp",
        icon: "search",
        title: "Google Business Profile",
        description: "Optimization, posts, categories, and ongoing GBP management.",
      },
      {
        id: "citations",
        icon: "layers",
        title: "Citations & directories",
        description: "NAP consistency and authoritative local listings.",
      },
      {
        id: "location-pages",
        icon: "monitor",
        title: "Location landing pages",
        description: "Unique pages per market with local proof and CTAs.",
      },
    ],
    capabilitySecondary: [
      {
        id: "reviews",
        icon: "bar-chart",
        title: "Review strategy",
        description: "Systems to earn and respond to reviews that build trust.",
      },
      {
        id: "local-content",
        icon: "shopping-bag",
        title: "Local content",
        description: "Geo-targeted blogs and landing modules for service areas.",
      },
      {
        id: "reporting",
        icon: "search",
        title: "Local rank reporting",
        description: "Track map pack, local keywords, and call volume by location.",
      },
    ],
  }),
  createMarketingService({
    id: "seo-content-writing",
    title: "SEO Content Writing",
    description:
      "Keyword-driven content that ranks, engages, and converts — blogs, pages, and pillars built for search intent.",
    icon: FileText,
    imageAlt: "SEO content writing and editorial services",
    gradientFrom: "#2a2838",
    gradientVia: "#a898d8",
    gradientTo: "#100818",
    accentShape: "wave",
    heroTitleBefore: "Content That",
    heroTitleAccent: "Ranks & Converts",
    heroOverline: "SEO Content Writing",
    longDescription:
      "We craft keyword-rich, intent-matched content — blogs, service pages, and pillar articles — engineered to climb rankings, earn clicks, and move readers toward action with your brand voice intact.",
    idealFor: "Brands that need consistent editorial output tied to an SEO strategy — not generic filler posts.",
    outcomes: [
      "Content calendars aligned to keyword clusters and funnel stages.",
      "Higher organic traffic from pages that match buyer intent.",
      "Assets your sales and paid teams can reuse across channels.",
    ],
    capabilityTitle: "SEO Content Writing",
    capabilityDescription:
      "Research, writing, and optimization — from briefs through published assets.",
    capabilityItems: [
      {
        id: "web-content",
        icon: "monitor",
        title: "Web & blog writing",
        description: "Engaging copy with headers, CTAs, and storytelling that converts.",
      },
      {
        id: "optimization",
        icon: "search",
        title: "On-page optimization",
        description: "Meta tags, internal links, readability, and cannibalization fixes.",
      },
      {
        id: "keyword-research",
        icon: "bar-chart",
        title: "Keyword research",
        description: "Intent mapping and opportunity scoring before a word is written.",
      },
    ],
    capabilitySecondary: [
      {
        id: "strategy",
        icon: "layers",
        title: "Content strategy",
        description: "Calendars, pillars, and user-journey mapping for maximum ROI.",
      },
      {
        id: "product-pages",
        icon: "shopping-bag",
        title: "Product & service pages",
        description: "Copy that ranks and persuades for commercial keywords.",
      },
      {
        id: "refresh",
        icon: "monitor",
        title: "Content refreshes",
        description: "Update and expand winners; prune or merge underperformers.",
      },
    ],
  }),
  createMarketingService({
    id: "ecommerce-seo",
    title: "eCommerce SEO",
    description:
      "Organic growth for online stores — category architecture, product pages, and technical SEO that scales with catalog size.",
    icon: Search,
    imageAlt: "eCommerce SEO services for online stores",
    gradientFrom: "#1a2838",
    gradientVia: "#6a9ac8",
    gradientTo: "#0a1018",
    accentShape: "ring",
    heroTitleBefore: "Organic Traffic That",
    heroTitleAccent: "Buys",
    heroOverline: "eCommerce SEO",
    longDescription:
      "We optimize ecommerce sites for crawlability, category structure, and product-page performance — so organic becomes a compounding channel, not an afterthought behind paid ads.",
    idealFor: "Shopify, WooCommerce, and custom stores with large catalogs competing on commercial keywords.",
    outcomes: [
      "Cleaner site architecture that search engines and shoppers navigate easily.",
      "Product and category pages optimized for intent and conversion.",
      "Technical fixes that unlock indexation and speed at scale.",
    ],
    capabilityTitle: "eCommerce SEO",
    capabilityDescription:
      "Store-wide SEO — technical, structural, and on-page — built for revenue per session.",
    capabilityItems: [
      {
        id: "technical",
        icon: "search",
        title: "Technical ecommerce SEO",
        description: "Indexation, faceted navigation, schema, and site speed.",
      },
      {
        id: "category",
        icon: "layers",
        title: "Category architecture",
        description: "Taxonomy and internal linking that distributes authority.",
      },
      {
        id: "product-pages",
        icon: "shopping-bag",
        title: "Product page optimization",
        description: "Titles, descriptions, media, and UX that rank and convert.",
      },
    ],
    capabilitySecondary: [
      {
        id: "content",
        icon: "monitor",
        title: "Buying guides & content",
        description: "Editorial hubs that capture top-funnel and comparison traffic.",
      },
      {
        id: "shopify-woo",
        icon: "bar-chart",
        title: "Platform expertise",
        description: "Shopify, WooCommerce, and headless storefront best practices.",
      },
      {
        id: "reporting",
        icon: "search",
        title: "Revenue reporting",
        description: "Organic revenue, AOV, and keyword contribution — not just rankings.",
      },
    ],
  }),
  createMarketingService({
    id: "ecommerce-ppc",
    title: "eCommerce PPC",
    description:
      "Shopping feeds, Performance Max, and retargeting that compound ROAS for online stores.",
    icon: ShoppingCart,
    imageAlt: "eCommerce PPC and paid shopping campaign management",
    gradientFrom: "#1a2438",
    gradientVia: "#88b0e0",
    gradientTo: "#080c14",
    accentShape: "grid",
    heroTitleBefore: "Paid Shopping That",
    heroTitleAccent: "Compounds ROAS",
    heroOverline: "eCommerce PPC",
    longDescription:
      "We manage Google Shopping, Performance Max, and retargeting for ecommerce — with feed hygiene, creative testing, and bid governance tied to margin and MER, not just platform ROAS screenshots.",
    idealFor: "Online retailers spending $10K+/month on paid media who need hands-on feed and campaign optimization.",
    outcomes: [
      "Cleaner product feeds and stronger shopping ad visibility.",
      "Retargeting sequences that recover abandoned carts profitably.",
      "Budget shifts toward SKUs and audiences that actually contribute margin.",
    ],
    capabilityTitle: "eCommerce PPC",
    capabilityDescription:
      "Shopping and performance campaigns managed with SKU-level discipline.",
    capabilityItems: [
      {
        id: "shopping-feeds",
        icon: "shopping-bag",
        title: "Shopping feed management",
        description: "Titles, attributes, and feed rules that improve ad relevance.",
      },
      {
        id: "pmax",
        icon: "monitor",
        title: "Performance Max",
        description: "Asset groups, audience signals, and conversion value tuning.",
      },
      {
        id: "retargeting",
        icon: "layers",
        title: "Retargeting & DPA",
        description: "Dynamic ads that bring browsers back without burning budget.",
      },
    ],
    capabilitySecondary: [
      {
        id: "creative",
        icon: "bar-chart",
        title: "Creative testing",
        description: "Hooks, offers, and formats tested weekly with clear winners.",
      },
      {
        id: "landing",
        icon: "search",
        title: "Landing alignment",
        description: "Message match from ad to product page to reduce bounce.",
      },
      {
        id: "mer",
        icon: "monitor",
        title: "MER & margin reporting",
        description: "Blended efficiency metrics leadership can trust.",
      },
    ],
  }),
  createMarketingService({
    id: "social-media-management",
    title: "Social Media Management",
    description:
      "Strategy, calendars, content, and community engagement that grows your audience organically.",
    icon: Users,
    imageAlt: "Social media management and organic community building",
    gradientFrom: "#3a2048",
    gradientVia: "#c878e8",
    gradientTo: "#1a0c24",
    accentShape: "diamond",
    heroTitleBefore: "Social That Builds",
    heroTitleAccent: "Real Community",
    heroOverline: "Social Media Management",
    longDescription:
      "We run organic social programs — content calendars, community management, and platform-native creative — so your brand stays visible, on-voice, and engaged without burning your team's nights and weekends.",
    idealFor: "Brands that need consistent organic presence across Instagram, LinkedIn, Facebook, TikTok, or X.",
    outcomes: [
      "Predictable publishing cadence with on-brand creative.",
      "Faster community response times and stronger sentiment.",
      "Content libraries that support paid and email campaigns.",
    ],
    capabilityTitle: "Social Media Management",
    capabilityDescription:
      "Organic social operations — strategy, production, and community — under one retainer.",
    capabilityItems: [
      {
        id: "strategy",
        icon: "search",
        title: "Channel strategy",
        description: "Platform priorities, pillars, and voice guidelines.",
      },
      {
        id: "calendars",
        icon: "layers",
        title: "Content calendars",
        description: "Monthly plans with hooks, formats, and campaign tie-ins.",
      },
      {
        id: "community",
        icon: "monitor",
        title: "Community management",
        description: "Comments, DMs, and escalation paths with SLA-backed response.",
      },
    ],
    capabilitySecondary: [
      {
        id: "creative",
        icon: "shopping-bag",
        title: "Organic creative",
        description: "Posts, stories, reels, and carousels produced on schedule.",
      },
      {
        id: "analytics",
        icon: "bar-chart",
        title: "Performance reporting",
        description: "Reach, engagement, saves, and traffic — tied to goals.",
      },
      {
        id: "influencer",
        icon: "search",
        title: "Creator coordination",
        description: "Briefs and approvals for influencer or UGC partnerships.",
      },
    ],
  }),
  createMarketingService({
    id: "social-media-advertising",
    title: "Social Media Advertising",
    description:
      "Paid social creative, audiences, and testing loops that turn views into sales.",
    icon: Share2,
    imageAlt: "Social media advertising and paid social campaign management",
    gradientFrom: "#381a48",
    gradientVia: "#d878e8",
    gradientTo: "#180818",
    accentShape: "bars",
    heroTitleBefore: "Paid Social That",
    heroTitleAccent: "Converts",
    heroOverline: "Social Media Advertising",
    longDescription:
      "We build and optimize paid social campaigns on Meta, TikTok, LinkedIn, and more — with creative testing, audience splits, and landing alignment that turns scrolls into qualified leads and sales.",
    idealFor: "Advertisers who need paid social run with the same discipline as performance media accounts.",
    outcomes: [
      "Weekly creative iterations with documented winners and losers.",
      "Audience structures that scale without CAC blowouts.",
      "Clear reporting from ad click to pipeline or purchase.",
    ],
    capabilityTitle: "Social Media Advertising",
    capabilityDescription:
      "Paid social management — creative, targeting, and optimization — with full-funnel tracking.",
    capabilityItems: [
      {
        id: "creative-testing",
        icon: "monitor",
        title: "Creative testing",
        description: "Hooks, formats, and offers tested systematically.",
      },
      {
        id: "audiences",
        icon: "layers",
        title: "Audience strategy",
        description: "Prospecting, retargeting, and lookalikes governed by unit economics.",
      },
      {
        id: "platform-ops",
        icon: "shopping-bag",
        title: "Campaign operations",
        description: "Account structure, pixels, and offline conversion imports.",
      },
    ],
    capabilitySecondary: [
      {
        id: "landing",
        icon: "search",
        title: "Landing page alignment",
        description: "Message match and CRO feedback loops with your web team.",
      },
      {
        id: "video",
        icon: "bar-chart",
        title: "Video & UGC ads",
        description: "Short-form creative built for platform algorithms.",
      },
      {
        id: "reporting",
        icon: "monitor",
        title: "ROAS & CPA reporting",
        description: "Weekly readouts with budget shift recommendations.",
      },
    ],
  }),
];
