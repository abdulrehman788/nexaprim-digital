import {
  AppWindow,
  LayoutTemplate,
  Monitor,
  Server,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

import type { ServiceDetail } from "@/types";

type DevServiceSeed = {
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
  capabilityItems: ServiceDetail["capabilitiesSection"] extends infer T
    ? T extends { items: infer I }
      ? I
      : never
    : never;
  capabilitySecondary: NonNullable<ServiceDetail["capabilitiesSection"]>["secondaryItems"];
};

function createDevelopmentService(seed: DevServiceSeed): ServiceDetail {
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
    category: "development",
    heroLayout: "centered",
    heroTitleBefore: seed.heroTitleBefore,
    heroTitleAccent: seed.heroTitleAccent,
    heroOverline: seed.heroOverline,
    heroSecondaryLine:
      seed.heroSecondaryLine ?? `Built fast. Built to rank. Built to convert.`,
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
        id: "smart-build",
        cardLabel: "Smart Build",
        cardIcon: "wallet",
        cardPosition: "left",
        titleWhite: "Built for Performance—",
        titleAccent: `${seed.title} That Converts`,
        withDropCap: true,
        paragraphs: [
          `Most ${seed.title.toLowerCase()} projects fail quietly — slow loads, weak UX, and integrations that break the week after launch. You pay for visuals that look fine in a mockup but never connect to pipeline, revenue, or search.`,
          `We scope around business outcomes: the pages, flows, and systems that move your numbers. Clean architecture, fast delivery, and handoff your team can actually run — not bloated builds that sit untouched after go-live.`,
          `From discovery through launch, NexaPrime Digital delivers ${seed.title.toLowerCase()} your marketing and sales teams can measure — not a brochure that sits idle.`,
        ],
      },
      {
        id: "scale-ready",
        cardLabel: "Scale Ready",
        cardIcon: "trending-up",
        cardPosition: "right",
        titleWhite: "Launch Once, Grow Continuously—",
        titleAccent: "Systems Built for the Long Game",
        paragraphs: [
          "Launch is when real data starts. We build modular foundations — reusable components, analytics wiring, and performance guardrails — so you can test offers, add pages, and expand without rebuilding from scratch.",
          "Whether you're scaling traffic, adding products, or entering new markets, your build adapts with SEO, speed, and conversion paths intact.",
          "Partner with NexaPrime Digital for development that supports every channel you run — paid, organic, email, and sales — from day one.",
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
      titleWhite: "Development That Drives",
      titleAccent: "Measurable Growth",
      paragraphs: [
        `${seed.title} should be a revenue asset — not a brochure that sits idle. NexaPrime Digital builds with performance, SEO, and conversion wired in from day one.`,
        "From discovery through launch and post-live support, you get one accountable team that speaks marketing and engineering — so your site or app supports every channel you run.",
      ],
      ctaLabel: "Get Your Free Consultation",
    },
    faqSection: {
      id: `${seed.id}-faq`,
      titleWhite: seed.title,
      titleAccent: "FAQs",
      items: [
        {
          id: "timeline",
          question: `How long does a typical ${seed.title.toLowerCase()} project take?`,
          answer:
            "Timelines depend on scope — a focused build usually runs 6–12 weeks including discovery, design, development, and QA. We document milestones and owners in the proposal before work starts.",
        },
        {
          id: "differentiation",
          question: `What makes your ${seed.title.toLowerCase()} different?`,
          answer:
            "We build for marketing outcomes — speed, SEO, conversion, and integrations — not just visuals. One accountable team speaks both engineering and growth.",
        },
        {
          id: "support",
          question: "Do you offer support after launch?",
          answer:
            "Yes — retainers cover updates, monitoring, and iteration sprints. We can also train your team and document handoff for day-to-day changes in-house.",
        },
        {
          id: "stack",
          question: "How do you choose the right technology?",
          answer:
            "We recommend based on your goals, team skills, and growth plan — not our favorite stack. You'll get a clear rationale before you commit.",
        },
      ],
    },
  };
}

export const developmentServices: ServiceDetail[] = [
  createDevelopmentService({
    id: "custom-website-design",
    title: "Custom Website Design",
    description:
      "Unique, brand-focused websites tailored to your goals — responsive, conversion-ready, and built to engage.",
    icon: Monitor,
    imageAlt: "Custom website design services for brands and businesses",
    gradientFrom: "#2a3040",
    gradientVia: "#8aa8d8",
    gradientTo: "#101420",
    accentShape: "circle",
    heroTitleBefore: "Websites Tailored to",
    heroTitleAccent: "Your Brand",
    heroOverline: "Custom Website Design",
    longDescription:
      "Your website is often the first impression customers have of your business. We craft visually stunning, responsive sites that reflect your identity, engage visitors, and convert — across desktop, tablet, and mobile.",
    idealFor:
      "Brands that need a distinctive presence — not another template — with design and development under one roof.",
    outcomes: [
      "A site that looks premium and loads fast on every device.",
      "Clear user journeys from first visit to form fill or purchase.",
      "Design and code your marketing team can maintain with confidence.",
    ],
    capabilityTitle: "Custom Website Design",
    capabilityDescription:
      "End-to-end design and build — discovery through launch — with responsive layouts and SEO-friendly structure.",
    capabilityItems: [
      {
        id: "discovery",
        icon: "search",
        title: "Discovery & strategy",
        description: "Research, wireframes, and site architecture aligned to your business goals.",
      },
      {
        id: "custom-ui",
        icon: "monitor",
        title: "Custom UI design",
        description: "Brand-true visuals, typography, and layouts — corporate clean or bold interactive.",
      },
      {
        id: "responsive",
        icon: "layers",
        title: "Responsive development",
        description: "Mobile-first builds that look and perform seamlessly on every screen size.",
      },
    ],
    capabilitySecondary: [
      {
        id: "conversion",
        icon: "bar-chart",
        title: "Conversion-focused UX",
        description: "CTAs, forms, and page flows designed to capture and qualify leads.",
      },
      {
        id: "seo-structure",
        icon: "search",
        title: "SEO-friendly structure",
        description: "Clean markup, metadata, and site architecture ready for organic growth.",
      },
      {
        id: "launch-support",
        icon: "monitor",
        title: "Launch & training",
        description: "QA, go-live support, and handoff documentation for your team.",
      },
    ],
  }),
  createDevelopmentService({
    id: "ecommerce-web-design",
    title: "eCommerce Web Design",
    description:
      "High-converting online store design — product discovery, trust signals, and checkout flows built to sell.",
    icon: ShoppingBag,
    imageAlt: "eCommerce web design services for online retailers",
    gradientFrom: "#1a2830",
    gradientVia: "#68b8a0",
    gradientTo: "#0a1410",
    accentShape: "grid",
    heroTitleBefore: "Storefronts That",
    heroTitleAccent: "Convert Browsers",
    heroOverline: "eCommerce Web Design",
    longDescription:
      "We design ecommerce experiences that make products easy to find, easy to trust, and easy to buy — with category UX, product storytelling, and checkout flows tuned for conversion on any platform.",
    idealFor:
      "Retailers launching or redesigning online stores who need design and UX expertise beyond a default theme.",
    outcomes: [
      "Clear category and product journeys that reduce bounce and cart abandonment.",
      "Brand-consistent storefront creative across desktop and mobile.",
      "Design systems your team can extend for campaigns and seasonal drops.",
    ],
    capabilityTitle: "eCommerce Web Design",
    capabilityDescription:
      "Store UX, product presentation, and conversion design — from wireframes through launch-ready creative.",
    capabilityItems: [
      {
        id: "store-ux",
        icon: "monitor",
        title: "Store UX & navigation",
        description: "Category architecture, filters, and search patterns shoppers actually use.",
      },
      {
        id: "product-pages",
        icon: "shopping-bag",
        title: "Product page design",
        description: "Gallery, specs, social proof, and CTAs optimized for add-to-cart.",
      },
      {
        id: "checkout",
        icon: "layers",
        title: "Checkout & cart flows",
        description: "Friction audits and layout design for higher completion rates.",
      },
    ],
    capabilitySecondary: [
      {
        id: "mobile",
        icon: "bar-chart",
        title: "Mobile commerce UX",
        description: "Thumb-friendly layouts and sticky CTAs for on-the-go buyers.",
      },
      {
        id: "brand",
        icon: "search",
        title: "Brand & campaign modules",
        description: "Homepage heroes, promos, and landing templates for seasonal pushes.",
      },
      {
        id: "handoff",
        icon: "monitor",
        title: "Dev-ready handoff",
        description: "Specs and assets for Shopify, WooCommerce, or custom storefront builds.",
      },
    ],
  }),
  createDevelopmentService({
    id: "website-design",
    title: "Website Design",
    description:
      "Professional website design for businesses of every size — responsive layouts, clear messaging, and conversion-ready pages.",
    icon: LayoutTemplate,
    imageAlt: "Professional website design services for businesses",
    gradientFrom: "#2a3048",
    gradientVia: "#90a8e0",
    gradientTo: "#101428",
    accentShape: "circle",
    heroTitleBefore: "Design That",
    heroTitleAccent: "Looks Premium",
    heroOverline: "Website Design",
    longDescription:
      "We design professional websites that communicate credibility at a glance — clear hierarchy, on-brand visuals, and page flows that guide visitors toward contact, signup, or purchase.",
    idealFor:
      "Businesses that need polished web design before development — or a redesign that elevates perception without a full custom build.",
    outcomes: [
      "A cohesive visual system across homepage, service pages, and key landing templates.",
      "Mobile-responsive layouts ready for development handoff.",
      "Faster stakeholder approval with prototypes before code begins.",
    ],
    capabilityTitle: "Website Design",
    capabilityDescription:
      "Discovery, wireframes, and high-fidelity design for marketing sites and lead-gen experiences.",
    capabilityItems: [
      {
        id: "wireframes",
        icon: "layers",
        title: "Wireframes & site map",
        description: "Page structure and user flows aligned to your goals before pixels.",
      },
      {
        id: "ui-design",
        icon: "monitor",
        title: "UI design & mockups",
        description: "High-fidelity pages with typography, imagery, and component styles.",
      },
      {
        id: "responsive",
        icon: "search",
        title: "Responsive layouts",
        description: "Desktop, tablet, and mobile breakpoints designed together.",
      },
    ],
    capabilitySecondary: [
      {
        id: "brand-align",
        icon: "bar-chart",
        title: "Brand alignment",
        description: "Color, type, and imagery that match your identity and market position.",
      },
      {
        id: "conversion",
        icon: "shopping-bag",
        title: "Conversion-focused sections",
        description: "Heroes, proof blocks, FAQs, and CTAs placed with intent.",
      },
      {
        id: "handoff",
        icon: "monitor",
        title: "Developer handoff",
        description: "Organized Figma files and specs for smooth build-out.",
      },
    ],
  }),
  createDevelopmentService({
    id: "shopify-development",
    title: "Shopify Web Design",
    description:
      "High-converting Shopify stores — custom themes, smooth checkout, and integrations that drive sales and loyalty.",
    icon: ShoppingBag,
    imageAlt: "Shopify web design and ecommerce development services",
    gradientFrom: "#1a3328",
    gradientVia: "#5cb88a",
    gradientTo: "#0a1810",
    accentShape: "diamond",
    heroTitleBefore: "Shopify Stores That",
    heroTitleAccent: "Sell",
    heroOverline: "Shopify Web Design",
    longDescription:
      "We build secure, intuitive Shopify stores with smart product displays, streamlined checkout, and reliable payments — optimized for conversion, speed, and scale as your catalog grows.",
    idealFor: "Brands launching or replatforming to Shopify who need custom design beyond a basic theme.",
    outcomes: [
      "Faster checkout and lower cart abandonment with optimized UX.",
      "Store performance that supports paid media and organic traffic.",
      "Theme and app integrations your ops team can manage day to day.",
    ],
    capabilityTitle: "Shopify Web Design",
    capabilityDescription:
      "Custom Shopify design and development — theme builds, catalog setup, and conversion optimization.",
    capabilityItems: [
      {
        id: "theme",
        icon: "monitor",
        title: "Custom theme design",
        description: "Brand-aligned storefronts — not generic templates with your logo swapped in.",
      },
      {
        id: "catalog",
        icon: "shopping-bag",
        title: "Product & catalog setup",
        description: "Collections, variants, and merchandising structured for discovery and upsell.",
      },
      {
        id: "checkout",
        icon: "layers",
        title: "Checkout optimization",
        description: "Friction audits and UX improvements to improve completion rates.",
      },
    ],
    capabilitySecondary: [
      {
        id: "apps",
        icon: "search",
        title: "App & payment integrations",
        description: "Reviews, subscriptions, ERP, and payment gateways wired correctly.",
      },
      {
        id: "speed",
        icon: "bar-chart",
        title: "Speed & Core Web Vitals",
        description: "Image optimization, lazy loading, and theme performance tuning.",
      },
      {
        id: "migration",
        icon: "monitor",
        title: "Migration & launch",
        description: "Replatforming from WooCommerce, Magento, or custom stacks with minimal downtime.",
      },
    ],
  }),
  createDevelopmentService({
    id: "wordpress-development",
    title: "WordPress Website Design",
    description:
      "Block-based, fast, and secure WordPress builds — easy for your team to manage without sacrificing performance.",
    icon: LayoutTemplate,
    imageAlt: "WordPress website design and development services",
    gradientFrom: "#1a2838",
    gradientVia: "#4a90c8",
    gradientTo: "#0a1018",
    accentShape: "grid",
    heroTitleBefore: "WordPress Sites That Are",
    heroTitleAccent: "Fast & Secure",
    heroOverline: "WordPress Website Design",
    longDescription:
      "We deliver block-based WordPress builds that are fast, secure, and simple for your team to update — with custom themes, plugin governance, and SEO architecture that supports long-term growth.",
    idealFor: "Teams that want WordPress flexibility with agency-grade performance and security discipline.",
    outcomes: [
      "A CMS your marketing team can run without breaking design or speed.",
      "Hardened installs with update workflows and plugin policies.",
      "SEO-ready structure that compounds organic traffic over time.",
    ],
    capabilityTitle: "WordPress Website Design",
    capabilityDescription:
      "Custom WordPress themes, Gutenberg blocks, and managed builds — performance and security included.",
    capabilityItems: [
      {
        id: "custom-theme",
        icon: "monitor",
        title: "Custom theme development",
        description: "Lightweight themes aligned to your brand — not bloated multipurpose templates.",
      },
      {
        id: "gutenberg",
        icon: "layers",
        title: "Block editor & patterns",
        description: "Reusable blocks and page patterns your team can assemble without developers.",
      },
      {
        id: "security",
        icon: "search",
        title: "Security & updates",
        description: "Hardening, backups, and update policies to reduce risk and downtime.",
      },
    ],
    capabilitySecondary: [
      {
        id: "plugins",
        icon: "shopping-bag",
        title: "Plugin strategy",
        description: "Minimal, vetted plugin stacks — fewer conflicts, faster loads.",
      },
      {
        id: "seo",
        icon: "bar-chart",
        title: "SEO & schema setup",
        description: "Metadata, sitemaps, and structured data configured correctly.",
      },
      {
        id: "hosting",
        icon: "monitor",
        title: "Hosting guidance",
        description: "Environment recommendations and migration support for reliable performance.",
      },
    ],
  }),
  createDevelopmentService({
    id: "website-hosting",
    title: "Website Hosting",
    description:
      "Reliable, fast hosting with monitoring, SSL, backups, and support — so your site stays online and performant.",
    icon: Server,
    imageAlt: "Managed website hosting and maintenance services",
    gradientFrom: "#1a2030",
    gradientVia: "#6a8ab0",
    gradientTo: "#080c14",
    accentShape: "bars",
    heroTitleBefore: "Hosting You Can",
    heroTitleAccent: "Trust",
    heroOverline: "Website Hosting",
    longDescription:
      "Your site is only as good as the infrastructure behind it. We provide managed hosting with uptime monitoring, SSL, automated backups, security patches, and responsive support — so you focus on growth, not server fires.",
    idealFor: "Businesses that want dependable hosting and maintenance without managing servers in-house.",
    outcomes: [
      "Higher uptime and faster response when issues arise.",
      "Automated backups and security updates handled proactively.",
      "Performance monitoring tied to real user experience — not vanity uptime badges.",
    ],
    capabilityTitle: "Website Hosting",
    capabilityDescription:
      "Managed hosting, monitoring, and maintenance — built for marketing sites, WordPress, and custom apps.",
    capabilityItems: [
      {
        id: "managed-hosting",
        icon: "monitor",
        title: "Managed hosting",
        description: "Production environments on modern cloud infrastructure with scaling options.",
      },
      {
        id: "ssl-security",
        icon: "search",
        title: "SSL & security",
        description: "Certificates, firewall rules, and patch management to reduce risk.",
      },
      {
        id: "backups",
        icon: "layers",
        title: "Automated backups",
        description: "Scheduled backups with tested restore procedures.",
      },
    ],
    capabilitySecondary: [
      {
        id: "monitoring",
        icon: "bar-chart",
        title: "Uptime & performance monitoring",
        description: "Alerts when speed or availability drops — before customers notice.",
      },
      {
        id: "support",
        icon: "shopping-bag",
        title: "Priority support",
        description: "Direct access when something breaks — not a ticket queue black hole.",
      },
      {
        id: "maintenance",
        icon: "monitor",
        title: "Ongoing maintenance",
        description: "Updates, small fixes, and health checks on a predictable cadence.",
      },
    ],
  }),
  createDevelopmentService({
    id: "software-development",
    title: "Software Development",
    description:
      "Custom web applications, mobile apps, and enterprise software — built with modern stacks and clear roadmaps.",
    icon: AppWindow,
    imageAlt: "Custom software and web application development services",
    gradientFrom: "#281a38",
    gradientVia: "#a878d8",
    gradientTo: "#100818",
    accentShape: "wave",
    heroTitleBefore: "Software Built for",
    heroTitleAccent: "Your Workflow",
    heroOverline: "Software Development",
    longDescription:
      "When off-the-shelf tools do not fit, we build custom web applications, mobile apps, and enterprise software with modern technologies — scoped to your workflow, integrations, and scale requirements.",
    idealFor:
      "Organizations with unique processes, complex integrations, or products that need custom engineering.",
    outcomes: [
      "Software that matches how your team actually works — not the other way around.",
      "Clean APIs and integrations with CRM, ERP, and marketing stacks.",
      "Documented architecture your team can extend with confidence.",
    ],
    capabilityTitle: "Software Development",
    capabilityDescription:
      "Discovery through delivery — custom apps, portals, and internal tools with modern engineering practices.",
    capabilityItems: [
      {
        id: "discovery",
        icon: "search",
        title: "Requirements & architecture",
        description: "Workflow mapping, technical specs, and phased roadmaps leadership can fund.",
      },
      {
        id: "web-apps",
        icon: "monitor",
        title: "Web applications",
        description: "Dashboards, portals, and SaaS products on React, Next.js, or your preferred stack.",
      },
      {
        id: "mobile",
        icon: "layers",
        title: "Mobile applications",
        description: "Cross-platform or native apps tied to your backend and analytics.",
      },
    ],
    capabilitySecondary: [
      {
        id: "api",
        icon: "bar-chart",
        title: "API & integrations",
        description: "CRM, payments, auth, and third-party services wired with clean contracts.",
      },
      {
        id: "enterprise",
        icon: "shopping-bag",
        title: "Enterprise solutions",
        description: "Role-based access, audit logs, and compliance-aware builds.",
      },
      {
        id: "devops",
        icon: "monitor",
        title: "DevOps & deployment",
        description: "CI/CD, staging environments, and observability from day one.",
      },
    ],
  }),
];
