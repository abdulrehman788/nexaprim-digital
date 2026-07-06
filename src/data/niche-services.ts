import { Code, PenTool } from "lucide-react";

import type { ServiceDetail } from "@/types";

export const nicheServices: ServiceDetail[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Modern, fast, conversion-focused websites engineered for SEO and performance — not template bloat.",
    href: "/services/web-development",
    icon: Code,
    imageAlt: "Custom web development and website design services",
    gradientFrom: "#1a2a3a",
    gradientVia: "#4a90c8",
    gradientTo: "#0a1018",
    accentShape: "ring",
    category: "development",
    heroLayout: "centered",
    heroTitleBefore: "Websites That",
    heroTitleAccent: "Convert",
    heroOverline: "Web Development",
    heroSecondaryLine: "Built fast. Built to rank. Built to sell.",
    heroCtaLabel: "Get Your Free Consultation",
    headline: "Sites that load fast, rank well, and turn visitors into leads.",
    longDescription:
      "Modern, fast, conversion-focused websites engineered for SEO and performance. We build custom experiences on proven stacks with Core Web Vitals, clean architecture, and conversion paths baked in from day one.",
    deliverables: [
      {
        title: "Custom site architecture",
        description:
          "Information hierarchy, page templates, and CMS structure your team can maintain without breaking design.",
      },
      {
        title: "Performance & Core Web Vitals",
        description:
          "Sub-3-second loads, optimized images, and clean code that passes Google's performance bar.",
      },
      {
        title: "Conversion-focused UX",
        description:
          "Forms, CTAs, and landing modules designed around how your buyers actually decide.",
      },
      {
        title: "Integrations & tracking",
        description:
          "CRM, analytics, pixels, and marketing tags wired correctly — not duct-taped in after launch.",
      },
    ],
    outcomes: [
      "Page speed and mobile scores that support SEO and paid media efficiency.",
      "Clear paths from first visit to form fill — with tracking leadership trusts.",
      "A site your team can update without calling a developer for every copy change.",
    ],
    idealFor: "Brands outgrowing templates, rebuilding after a rebrand, or launching a new offer that needs a dedicated funnel.",
    featureSections: [
      {
        id: "smart-spending",
        cardLabel: "Smart Build",
        cardIcon: "wallet",
        cardPosition: "left",
        titleWhite: "Stop Paying for Bloat—Development That",
        titleAccent: "Ships What You Actually Need",
        withDropCap: true,
        paragraphs: [
          "Most agency sites are overbuilt slide decks in code — heavy themes, unused plugins, and pages that load like molasses. You pay for complexity you never use while conversion and SEO suffer in silence.",
          "We scope around business goals: the pages that drive revenue, the integrations that matter, and the CMS workflows your team will actually run. No gold-plated features that sit untouched after launch.",
          "From architecture and design handoff to launch and post-live optimization, you get a site built for speed, search, and sales — with a clear roadmap and owners at every step.",
        ],
      },
      {
        id: "automated-growth",
        cardLabel: "Scale Ready",
        cardIcon: "trending-up",
        cardPosition: "right",
        titleWhite: "Launch Once, Grow Continuously—",
        titleAccent: "Sites Built for the Long Game",
        paragraphs: [
          "A launch is not the finish line — it's when real data starts flowing. We build modular page systems, reusable components, and analytics foundations so you can test offers, add landing pages, and expand without rebuilding from scratch.",
          "Whether you're adding locales, product lines, or paid campaigns, your site adapts with performance budgets and SEO guardrails intact. Partner with a dev team that thinks in funnels and P&L, not just pixels.",
        ],
      },
    ],
    capabilitiesSection: {
      id: "web-included",
      titleWhite: "What's included in",
      titleAccent: "Web Development",
      description:
        "End-to-end delivery from discovery through launch — with performance, SEO, and conversion wired in, not bolted on.",
      items: [
        {
          id: "discovery",
          icon: "search",
          title: "Discovery & site map",
          description:
            "User flows, page inventory, and technical requirements aligned to your growth goals.",
        },
        {
          id: "design-dev",
          icon: "monitor",
          title: "Design-to-code build",
          description:
            "Responsive UI, accessible components, and CMS setup your marketing team can run.",
        },
        {
          id: "performance",
          icon: "bar-chart",
          title: "Speed & SEO foundation",
          description:
            "Core Web Vitals, schema, sitemaps, and on-page structure ready for organic growth.",
        },
      ],
      secondaryItems: [
        {
          id: "landing-pages",
          icon: "layers",
          title: "Landing page systems",
          description:
            "Modular templates for campaigns, offers, and A/B tests without full rebuilds.",
        },
        {
          id: "integrations",
          icon: "shopping-bag",
          title: "CRM & analytics wiring",
          description:
            "Forms, tags, and event tracking connected to HubSpot, GA4, or your stack.",
        },
        {
          id: "post-launch",
          icon: "monitor",
          title: "Post-launch support",
          description:
            "Bug fixes, CRO tweaks, and iteration sprints after go-live.",
        },
      ],
    },
    highlightSection: {
      id: "web-highlight",
      titleWhite: "Turn Your Site Into a",
      titleAccent: "Revenue Engine",
      paragraphs: [
        "Traffic without conversion is an expense. We build websites where every page has a job — educate, qualify, or close — and where speed and SEO support every channel you run.",
        "From marketing sites and product launches to multi-location brands, NexaPrime Digital delivers development that marketing and leadership can measure, not just admire.",
      ],
      ctaLabel: "Get Your Free Consultation",
    },
    faqSection: {
      id: "web-development-faq",
      titleWhite: "Web Development",
      titleAccent: "FAQs",
      items: [
        {
          id: "platform",
          question: "What platforms and stacks do you build on?",
          answer:
            "We typically work with Next.js, headless CMS options, and modern hosting (Vercel, AWS, or your preference). For simpler marketing sites, WordPress or Webflow may fit — we recommend based on your team's skills and growth plans, not our favorite stack.",
        },
        {
          id: "timeline",
          question: "How long does a typical website project take?",
          answer:
            "A focused marketing site with 8–15 pages usually runs 8–12 weeks including discovery, design, development, and QA. Larger builds with custom integrations or ecommerce take longer — we scope timelines in the proposal before work starts.",
        },
        {
          id: "maintenance",
          question: "Do you offer ongoing maintenance after launch?",
          answer:
            "Yes. We offer retainer support for updates, CRO iterations, and performance monitoring — or we can train your team and document handoff so you run day-to-day changes in-house.",
        },
      ],
    },
  },
  {
    id: "graphics-design",
    title: "Graphic Design",
    description:
      "Scroll-stopping visuals for ads, social, decks, and campaigns — on-brand, on-deadline, built to perform.",
    href: "/services/graphics-design",
    icon: PenTool,
    imageAlt: "Professional graphics design for marketing and brand campaigns",
    gradientFrom: "#3a2048",
    gradientVia: "#c878e8",
    gradientTo: "#1a0c24",
    accentShape: "wave",
    category: "design",
    heroLayout: "centered",
    heroTitleBefore: "Design That",
    heroTitleAccent: "Stops the Scroll",
    heroOverline: "Graphic Design",
    heroSecondaryLine: "On brand. On deadline. Built to perform.",
    heroCtaLabel: "Get Your Free Consultation",
    headline: "Creative that looks premium and tests well in market.",
    longDescription:
      "Great offers die behind weak visuals. We produce campaign creative, social assets, ad sets, and sales graphics that match your brand system — fast enough for weekly testing, consistent enough for trust at every touchpoint.",
    deliverables: [
      {
        title: "Paid social & display creative",
        description:
          "Static and motion concepts sized for Meta, Google, LinkedIn, and programmatic — with variants for testing.",
      },
      {
        title: "Social content kits",
        description:
          "Feed posts, stories, reels covers, and carousel templates your team can reuse with fresh copy.",
      },
      {
        title: "Sales & pitch assets",
        description:
          "Decks, one-pagers, case study layouts, and proposal graphics that look as sharp as your offer.",
      },
      {
        title: "Brand asset production",
        description:
          "Icons, illustrations, banners, and campaign lockups that extend your identity without reinventing it each launch.",
      },
    ],
    outcomes: [
      "Creative libraries your media and social teams can pull from without waiting on ad-hoc requests.",
      "Higher CTR and lower fatigue from systematic testing — not one-off hero images.",
      "Visual consistency across ads, site, email, and sales — so you look like the leader you are.",
    ],
    idealFor: "Teams running paid or organic at volume who need design output that keeps pace with campaigns.",
    featureSections: [
      {
        id: "smart-spending",
        cardLabel: "Smart Creative",
        cardIcon: "shopping-bag",
        cardPosition: "left",
        titleWhite: "Stop Wasting Spend on Weak Visuals—Design That",
        titleAccent: "Earns Every Impression",
        withDropCap: true,
        paragraphs: [
          "Budget flows to channels that can't convert because creative looks generic — stock photos, off-brand colors, and layouts that scream template. Buyers scroll past in milliseconds; weak design is a tax on every dollar you spend.",
          "We produce campaign-ready assets tied to your brand system: hooks that test, formats that fit each platform, and variants produced fast enough for weekly iteration. Creative becomes a growth lever, not a bottleneck.",
          "From ad sets and social kits to decks and landing visuals, you get design output with clear owners, turnaround SLAs, and files organized for your team to deploy — not buried in email threads.",
        ],
      },
      {
        id: "automated-growth",
        cardLabel: "Always On Brand",
        cardIcon: "trending-up",
        cardPosition: "right",
        titleWhite: "Scale Creative Without Losing Quality—",
        titleAccent: "Systems That Keep Up With You",
        paragraphs: [
          "Growth means more campaigns, more geos, more offers — not more chaos in your asset folder. We build template systems, component libraries, and production workflows so new creative ships in hours, not weeks.",
          "Whether you're launching seasonal promos or entering new markets, your visuals stay cohesive and test-ready. Partner with a design team that understands performance metrics, not just aesthetics.",
        ],
      },
    ],
    capabilitiesSection: {
      id: "graphics-included",
      titleWhite: "What's included in",
      titleAccent: "Graphic Design",
      description:
        "Production-grade creative for every channel — scoped to your campaign calendar, not hourly guesswork.",
      items: [
        {
          id: "paid-creative",
          icon: "monitor",
          title: "Paid media creative",
          description:
            "Static and motion ads with platform specs, safe zones, and test variants built in.",
        },
        {
          id: "social-kits",
          icon: "layers",
          title: "Social content kits",
          description:
            "Posts, stories, and carousel templates aligned to your brand and content calendar.",
        },
        {
          id: "sales-assets",
          icon: "shopping-bag",
          title: "Sales & pitch graphics",
          description:
            "Decks, one-pagers, and leave-behinds that match your market-facing creative.",
        },
      ],
      secondaryItems: [
        {
          id: "brand-extensions",
          icon: "search",
          title: "Brand extensions",
          description:
            "Icons, illustrations, and campaign lockups that extend your identity system.",
        },
        {
          id: "email-graphics",
          icon: "bar-chart",
          title: "Email & landing visuals",
          description:
            "Hero modules, banners, and supporting graphics for lifecycle and CRO tests.",
        },
        {
          id: "asset-library",
          icon: "layers",
          title: "Organized asset delivery",
          description:
            "Named files, source docs, and libraries your team can reuse without designer hand-holding.",
        },
      ],
    },
    highlightSection: {
      id: "graphics-highlight",
      titleWhite: "Creative That Performs Across",
      titleAccent: "Every Channel",
      paragraphs: [
        "Design is not decoration — it's the first test of whether someone stops, clicks, or trusts you. NexaPrime Digital produces graphics that look premium and are built for the platforms and funnels where your buyers actually live.",
        "From high-volume ad creative to executive-ready decks, we help brands show up consistently and test relentlessly — so creative compounds instead of resetting every quarter.",
      ],
      ctaLabel: "Get Your Free Consultation",
    },
    faqSection: {
      id: "graphics-design-faq",
      titleWhite: "Graphic Design",
      titleAccent: "FAQs",
      items: [
        {
          id: "turnaround",
          question: "How fast can you turn around creative requests?",
          answer:
            "Standard campaign sets typically ship within 5–7 business days; rush production is available for retainers. We agree on SLAs upfront so your media calendar isn't held hostage by design queues.",
        },
        {
          id: "brand-guide",
          question: "What if we don't have a full brand guide yet?",
          answer:
            "We can work from existing assets and tighten consistency as we go — or pair graphics design with our Brand & Creative service for a full identity build. We'll tell you which path makes sense before you commit.",
        },
        {
          id: "formats",
          question: "What file formats and platforms do you support?",
          answer:
            "We deliver platform-ready exports (PNG, JPG, MP4, GIF) plus source files (Figma, PSD, AI) when needed. Specs cover Meta, Google, LinkedIn, TikTok, email, and print — tell us your channels and we match them.",
        },
      ],
    },
  },
];
