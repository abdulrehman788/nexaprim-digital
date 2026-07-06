import {
  Megaphone,
  Palette,
  Search,
  Share2,
  Target,
  Zap,
} from "lucide-react";

import { developmentServices } from "@/data/development-services";
import { logicMarketingServices } from "@/data/logic-marketing-services";
import { nicheServices } from "@/data/niche-services";
import type { ServiceCategory, ServiceDetail } from "@/types";

export const serviceCategories: { id: ServiceCategory; label: string }[] = [
  { id: "marketing", label: "Marketing & Growth" },
  { id: "design", label: "Design & Creative" },
  { id: "development", label: "Development & Technology" },
];

export const servicesSection = {
  title: "Every Niche. One Accountable Team.",
  description:
    "Separate specialists for strategy, SEO, paid media, social, automation, brand, graphics, and web development — or bundle everything in one package.",
  ctaLabel: "Explore All Services",
  ctaHref: "/services",
} as const;

export const servicesPage = {
  overline: "Services",
  titleLine1: "Pick your niche — or",
  titleAccent: "bundle them all",
  description:
    "Twenty-one dedicated service lines across marketing, design, and development — from SEO, local search, and paid social to Shopify, WordPress, custom apps, and hosting.",
  ctaLabel: "Get Your Free Consultation",
  packagesOverline: "Packages",
  packagesTitle: "Need more than one service?",
  packagesDescription:
    "Bundle every capability in our All-in-One package, or tell us what you need and we'll build a custom Enterprise quote.",
  allInOneLabel: "See the All-in-One package",
  enterpriseLabel: "Request an Enterprise quote",
} as const;

export const services: ServiceDetail[] = [
  {
    id: "digital-strategy",
    title: "Digital Strategy",
    description:
      "Research-driven roadmaps that align your channels, messaging, and budget to measurable revenue goals.",
    href: "/services/digital-strategy",
    icon: Target,
    imageAlt: "Digital strategy consulting and growth planning services",
    gradientFrom: "#5c4520",
    gradientVia: "#e8c878",
    gradientTo: "#2a1f0c",
    accentShape: "bars",
    category: "marketing",
    heroLayout: "centered",
    heroTitleBefore: "Position Your Brand to",
    heroTitleAccent: "Winning",
    heroOverline: "Digital Strategy",
    heroSecondaryLine: "Measurable wins. Zero guesswork.",
    heroCtaLabel: "Get Your Free Consultation",
    headline: "A growth plan your leadership can actually fund and measure.",
    longDescription:
      "With expert Digital Strategy services, we help brands define clear roadmaps, align every channel to revenue goals, and execute with measurable impact. Whether you need funnel audits, positioning frameworks, or a prioritized 90-day plan, we build systems your leadership can fund and track — partner with us today.",
    deliverables: [
      {
        title: "Funnel & channel audit",
        description:
          "Map every step from first touch to closed revenue and score drop-off, cost, and attribution gaps.",
      },
      {
        title: "Positioning & messaging framework",
        description:
          "Clarify who you win with, what you promise, and how that shows up across ads, site, and sales.",
      },
      {
        title: "90-day execution roadmap",
        description:
          "Sequenced initiatives ranked by impact and effort — so quick wins fund bigger bets.",
      },
      {
        title: "Measurement architecture",
        description:
          "Define the dashboards and tracking your team needs to make weekly decisions, not quarterly guesses.",
      },
    ],
    outcomes: [
      "Leadership agrees on one set of numbers to optimize.",
      "Budget shifts from low-ROI channels without political fights.",
      "Creative and media teams work from the same brief.",
    ],
    idealFor: "Brands spending $15K+/month on marketing without a clear link to revenue.",
    featureSections: [
      {
        id: "smart-spending",
        cardLabel: "Smart Spending",
        cardIcon: "wallet",
        cardPosition: "left",
        titleWhite: "Stop Wasting Budget—A Strategy Partner That",
        titleAccent: "Optimizes Every Dollar",
        withDropCap: true,
        paragraphs: [
          "In today's competitive landscape, every marketing dollar must earn its place. Brands pour budget into channels that look busy on reports but never connect to pipeline or revenue. Without a clear strategy, teams chase trends instead of outcomes — and leadership loses confidence in the numbers.",
          "We audit where spend leaks, which channels actually convert, and where your funnel breaks before sales ever gets involved. Our roadmaps rank initiatives by impact and effort so quick wins fund bigger bets — not the other way around.",
          "From positioning and messaging to measurement architecture, we build a system your leadership can fund, track, and scale. Partner with NexaPrime Digital and turn scattered spend into a growth engine with owners, timelines, and KPIs tied to the P&L.",
        ],
      },
      {
        id: "automated-growth",
        cardLabel: "Automated Growth",
        cardIcon: "trending-up",
        cardPosition: "right",
        titleWhite: "Double Your Revenue Without Doubling Your Effort—",
        titleAccent: "Strategy Works While You Sleep",
        paragraphs: [
          "Imagine generating explosive sales growth while your team focuses on what they do best — running your business. A disciplined digital strategy is not just a slide deck; it is a 24/7 operating system that aligns channels, creative, and spend to revenue goals. Unlike scattered tactics that take quarters to show impact, a clear roadmap delivers immediate clarity on what to fund, pause, or scale.",
          "Our measurement frameworks automate reporting, surface what is working, and flag budget drift before it becomes a quarterly surprise. By leveraging funnel data — from first touch to closed deal — we ensure every initiative reaches the right audience at the right moment. Whether scaling during peak seasons or entering new markets, your strategy adapts with owners, timelines, and KPIs your leadership can trust.",
        ],
      },
    ],
    closingFeatureSection: {
      id: "kpi-engineering",
      cardLabel: "Engineered for KPIs",
      cardIcon: "cog",
      cardPosition: "right",
      titleWhite: "Your Competitors Can't Keep Up—",
      titleAccent: "Strategy Built to Crush KPIs",
      ctaLabel: "Get Your Free Consultation",
      paragraphs: [
        "In today's hyper-competitive digital landscape, guesswork is a liability. While rivals burn budgets on scattered tactics, precision-engineered strategy captures market share with ruthless efficiency. We identify funnel gaps, channel leaks, and messaging mismatches — then build a roadmap your team can actually run.",
        "Our frameworks target the metrics that matter: cost per lead, conversion rate, pipeline velocity, and revenue per channel. Every initiative ties to a KPI leadership can track weekly. Partner with NexaPrime Digital and convert clicks into customers — without doubling your team's workload.",
      ],
    },
    capabilitiesSection: {
      id: "capture-buyers",
      titleWhite: "High-Intent Buyers Are Searching Now—",
      titleAccent: "Capture Them with Clear Strategy",
      description:
        "Ready-to-buy customers are actively comparing options — don't let competitors define the conversation. Our digital strategy deploys funnel insights, sharp messaging, and measurement systems that turn interest into revenue.",
      items: [
        {
          id: "funnel-audit",
          icon: "search",
          title: "Funnel & Channel Audit",
          description:
            "Map every step from first touch to revenue and score where prospects drop off.",
        },
        {
          id: "positioning",
          icon: "shopping-bag",
          title: "Positioning & Messaging",
          description:
            "Clarify who you win with and how your promise shows up across every channel.",
        },
        {
          id: "measurement",
          icon: "bar-chart",
          title: "Measurement Architecture",
          description:
            "Define KPIs, reporting cadence, and attribution models leadership trusts.",
        },
      ],
      secondaryItems: [
        {
          id: "execution-roadmap",
          icon: "monitor",
          title: "90-Day Execution Roadmap",
          description:
            "Rank initiatives by impact and effort so quick wins fund bigger bets.",
        },
        {
          id: "conversion-paths",
          icon: "layers",
          title: "Landing Page Conversion",
          description:
            "Map pages, CTAs, and handoffs to reduce bounce and strengthen message match.",
        },
        {
          id: "channel-alignment",
          icon: "bar-chart",
          title: "Cross-Channel Budget Planning",
          description:
            "Model budgets, forecast outcomes, and govern spend where unit economics hold.",
        },
      ],
    },
    highlightSection: {
      id: "award-winning",
      titleWhite: "Turn Strategy into Sales With",
      titleAccent: "Award-Winning Growth Partners",
      paragraphs: [
        "In a crowded market, visibility alone is not enough — you need a strategy that converts attention into pipeline. NexaPrime Digital builds roadmaps that align channels, creative, and spend to revenue goals, so every initiative has an owner, a timeline, and a number leadership can track.",
        "From funnel audits and positioning frameworks to measurement architecture and 90-day execution plans, we help mid-market brands stop guessing and start scaling. Partner with a team that has delivered measurable outcomes across hospitality, healthcare, ecommerce, and more — and bring that rigor to your growth plan.",
      ],
      ctaLabel: "Get Your Free Consultation",
    },
    faqSection: {
      id: "digital-strategy-faq",
      titleWhite: "Digital Strategy",
      titleAccent: "FAQs",
      items: [
        {
          id: "results-timeline",
          question: "How quickly will we see results from a digital strategy engagement?",
          answer:
            "Clarity arrives in the first few weeks — funnel gaps, channel priorities, and a ranked roadmap. Tactical wins such as landing page fixes or budget reallocation can show impact within 30–60 days. Full strategic outcomes — stronger conversion rates, lower CAC, and pipeline growth — typically compound over 3–6 months as initiatives roll out.",
        },
        {
          id: "differentiation",
          question: "What makes your strategy frameworks better than competitors?",
          answer:
            "We tie every recommendation to revenue and unit economics, not vanity metrics. Deliverables include owners, timelines, and KPIs your leadership can fund. You get one accountable team across strategy, creative, and media — not a slide deck that sits in a folder.",
        },
        {
          id: "niche-budget",
          question: "Can digital strategy work for niche industries or smaller budgets?",
          answer:
            "Yes. We scope engagements to your stage — from a focused 90-day roadmap for a single segment to a full-funnel program for multi-market brands. Niche Growth packages concentrate spend where you can win fastest before scaling everywhere.",
        },
        {
          id: "reporting",
          question: "How transparent is your reporting process?",
          answer:
            "Every engagement includes live dashboards and regular reviews tied to agreed KPIs — leads, revenue, conversion rate, and channel-specific metrics. You see what we see: spend, performance, and what we are changing week to week.",
        },
        {
          id: "industries",
          question: "Do you specialize in strategy for specific industries?",
          answer:
            "We have deep experience in hospitality, restaurants, healthcare, ecommerce, real estate, and education. Frameworks adapt to each sector's buyer journey, compliance requirements, and margin structure — we do not recycle generic playbooks.",
        },
      ],
    },
  },
  {
    id: "seo-content",
    title: "Search Engine Optimization",
    description:
      "Rank higher, attract intent-driven traffic, and convert visitors with authoritative content that builds trust.",
    href: "/services/seo-content",
    icon: Search,
    imageAlt: "Search engine optimization and content marketing services",
    gradientFrom: "#1a3050",
    gradientVia: "#5a9ae8",
    gradientTo: "#0c1520",
    accentShape: "circle",
    category: "marketing",
    heroLayout: "centered",
    heroTitleBefore: "Organic traffic that arrives",
    heroTitleAccent: "with intent",
    heroOverline: "Search Engine Optimization",
    heroSecondaryLine: "— not curiosity.",
    heroCtaLabel: "Get Your Free Consultation",
    headline: "Organic traffic that arrives with intent — not curiosity.",
    longDescription:
      "We build content around the questions your buyers ask before they contact sales. Technical SEO fixes the crawlability issues holding you back; editorial fills the gaps competitors ignore.",
    deliverables: [
      {
        title: "Technical SEO remediation",
        description:
          "Core Web Vitals, indexation, schema, and site architecture fixes that unlock existing content.",
      },
      {
        title: "Keyword & topic strategy",
        description:
          "Clusters mapped to buyer stage — awareness, comparison, and ready-to-buy — with internal linking plans.",
      },
      {
        title: "Editorial production",
        description:
          "Articles, guides, and landing copy written for humans first, optimized for search second.",
      },
      {
        title: "Local & vertical SEO",
        description:
          "Location pages, industry hubs, and citation work for multi-market and regulated brands.",
      },
    ],
    outcomes: [
      "Steady growth in non-branded organic traffic.",
      "Sales cites content in conversations — it answers real objections.",
      "Lower blended CAC as paid reliance drops.",
    ],
    idealFor: "Teams tired of paying for every click when buyers research for weeks before converting.",
    featureSections: [
      {
        id: "smart-spending",
        cardLabel: "Smart Spending",
        cardIcon: "shopping-bag",
        cardPosition: "left",
        titleWhite: "Stop Wasting Budget—SEO That",
        titleAccent: "Compounds Over Time",
        withDropCap: true,
        paragraphs: [
          "Organic search is the highest-ROI channel when it is done right — but most teams publish content without a plan, ignore technical debt, and wonder why rankings stall. Every month without a keyword strategy is budget shifted back to paid.",
          "We fix crawlability, map topics to buyer intent, and produce content that answers the questions your sales team hears on calls. Technical SEO unlocks what you already have; editorial fills the gaps competitors ignore.",
          "From audits and cluster strategy to production and internal linking, we build an organic engine leadership can fund with confidence. Partner with NexaPrime Digital and turn search into a durable acquisition channel.",
        ],
      },
      {
        id: "automated-growth",
        cardLabel: "Automated Growth",
        cardIcon: "trending-up",
        cardPosition: "right",
        titleWhite: "Double Your Traffic Without Doubling Your Effort—",
        titleAccent: "Content Works While You Sleep",
        paragraphs: [
          "Imagine compounding organic traffic while your team focuses on closing deals. SEO is not a one-time project — it is a system of published pages, internal links, and refreshed content that keeps ranking long after launch day.",
          "Our editorial calendars, template workflows, and performance reviews surface what ranks, what converts, and what to update next. Unlike paid channels that stop the moment spend pauses, strong content keeps delivering qualified visitors month after month.",
        ],
      },
    ],
    capabilitiesSection: {
      id: "seo-included",
      titleWhite: "What's included in",
      titleAccent: "Search Engine Optimization",
      description:
        "Technical fixes, keyword strategy, and editorial production that compound organic traffic — built around how your buyers actually search.",
      items: [
        {
          id: "technical-seo",
          icon: "search",
          title: "Technical SEO remediation",
          description:
            "Core Web Vitals, indexation, schema, and site architecture fixes that unlock existing content.",
        },
        {
          id: "keyword-strategy",
          icon: "layers",
          title: "Keyword & topic strategy",
          description:
            "Clusters mapped to buyer stage — awareness, comparison, and ready-to-buy — with internal linking plans.",
        },
        {
          id: "editorial",
          icon: "monitor",
          title: "Editorial production",
          description:
            "Articles, guides, and landing copy written for humans first, optimized for search second.",
        },
      ],
      secondaryItems: [
        {
          id: "local-seo",
          icon: "bar-chart",
          title: "Local & vertical SEO",
          description:
            "Location pages, industry hubs, and citation work for multi-market and regulated brands.",
        },
        {
          id: "on-page",
          icon: "shopping-bag",
          title: "On-page optimization",
          description:
            "Title tags, meta descriptions, headers, and internal links tuned for intent and crawl efficiency.",
        },
        {
          id: "content-audit",
          icon: "search",
          title: "Content gap analysis",
          description:
            "Identify topics competitors rank for that you miss — then prioritize production by revenue potential.",
        },
      ],
    },
    highlightSection: {
      id: "seo-highlight",
      titleWhite: "Turn Search Into Pipeline With",
      titleAccent: "Award-Winning SEO Partners",
      paragraphs: [
        "Ranking is not the goal — qualified traffic that converts is. NexaPrime Digital builds SEO programs that tie content to revenue: technical foundations, topic clusters mapped to buyer stage, and reporting your leadership trusts.",
        "Whether you need to fix a site that should rank higher or build authority in a competitive vertical, we deliver the roadmap, the content, and the measurement to prove impact quarter over quarter.",
      ],
      ctaLabel: "Get Your Free Consultation",
    },
    faqSection: {
      id: "seo-content-faq",
      titleWhite: "Search Engine Optimization",
      titleAccent: "FAQs",
      items: [
        {
          id: "results-timeline",
          question: "How quickly will we see results from SEO and content marketing?",
          answer:
            "Technical fixes and indexation improvements can show impact in 4–8 weeks. Meaningful ranking and traffic gains from new content typically build over 3–6 months as pages earn authority and internal links compound. SEO is a long game — we set expectations upfront and report leading indicators monthly.",
        },
        {
          id: "differentiation",
          question: "What makes your SEO approach better than competitors?",
          answer:
            "We connect content to revenue — not vanity rankings. Keyword strategy maps to buyer stage, technical work unlocks existing assets, and editorial answers real sales objections. You get one accountable team, not disconnected writers and auditors.",
        },
        {
          id: "niche-budget",
          question: "Can SEO work for niche industries or smaller budgets?",
          answer:
            "Yes. Niche verticals often win faster with focused topic clusters and localized content than by chasing head terms. We scope production to your capacity and prioritize pages with the highest revenue potential first.",
        },
        {
          id: "reporting",
          question: "How transparent is your reporting process?",
          answer:
            "Dashboards cover rankings, organic traffic, conversions, and content performance by cluster. Monthly reviews explain what we published, what moved, and what we are prioritizing next — no black-box SEO.",
        },
      ],
    },
  },
  {
    id: "paid-media",
    title: "Pay Per Click",
    description:
      "High-ROI campaigns across Google, Meta, and LinkedIn — optimized daily for lower CPA and stronger pipeline.",
    href: "/services/paid-media",
    icon: Megaphone,
    imageAlt: "Paid media advertising and PPC campaign management services",
    gradientFrom: "#3a2048",
    gradientVia: "#b888e8",
    gradientTo: "#180c20",
    accentShape: "ring",
    category: "marketing",
    heroLayout: "centered",
    heroTitleBefore: "Paid campaigns tied to",
    heroTitleAccent: "margin",
    heroOverline: "Pay Per Click",
    heroSecondaryLine: "Not just ROAS screenshots.",
    heroCtaLabel: "Get Your Free Consultation",
    headline: "Paid campaigns tied to margin — not just ROAS screenshots.",
    longDescription:
      "We structure accounts around profitable SKUs, services, and geos. Creative testing, audience segmentation, and landing page feedback loops run weekly so spend scales only where unit economics hold.",
    deliverables: [
      {
        title: "Account architecture",
        description:
          "Campaign structure aligned to funnel stage, margin, and capacity — not platform defaults.",
      },
      {
        title: "Creative testing program",
        description:
          "Rapid iteration on hooks, formats, and offers with clear readouts on cost per qualified lead.",
      },
      {
        title: "Landing page collaboration",
        description:
          "Message match between ad and page — we flag friction and work with your team to fix it.",
      },
      {
        title: "Weekly optimization & reporting",
        description:
          "Bid, budget, and audience shifts with commentary your CFO can follow.",
      },
    ],
    outcomes: [
      "Cost per qualified lead trends down quarter over quarter.",
      "Spend reallocates to winners without waiting for monthly reviews.",
      "Finance trusts the numbers because offline conversions are included.",
    ],
    idealFor: "Advertisers spending $10K–$150K/month who need accountability beyond platform dashboards.",
    featureSections: [
      {
        id: "smart-spending",
        cardLabel: "Smart Spending",
        cardIcon: "shopping-bag",
        cardPosition: "left",
        titleWhite: "Stop Wasting Budget—Paid Media That",
        titleAccent: "Optimizes Every Dollar",
        withDropCap: true,
        paragraphs: [
          "In a competitive auction landscape, poorly structured accounts burn budget on clicks that never convert. Teams scale spend before fixing tracking, creative, or landing pages — then wonder why ROAS looks fine until finance asks harder questions.",
          "We structure campaigns around profitable SKUs, services, and geos — not platform defaults. Creative testing, audience segmentation, and landing page feedback run weekly so spend scales only where unit economics hold.",
          "From account architecture to bid governance and offline conversion imports, we build paid programs your CFO can follow. Partner with NexaPrime Digital and turn ad spend into accountable pipeline.",
        ],
      },
      {
        id: "automated-growth",
        cardLabel: "Automated Growth",
        cardIcon: "trending-up",
        cardPosition: "right",
        titleWhite: "Double Your Revenue Without Doubling Your Effort—",
        titleAccent: "Campaigns Work While You Sleep",
        paragraphs: [
          "Imagine scaling pipeline while your team focuses on closing — not daily bid tweaks. Modern paid media runs on rules, scripts, and automated bidding tuned to qualified leads, not just platform-reported conversions.",
          "Our optimization cadence reallocates budget to winners, pauses underperformers, and refreshes creative before fatigue sets in. Whether scaling during peak season or testing new geos, campaigns adapt with commentary leadership can trust.",
        ],
      },
    ],
    capabilitiesSection: {
      id: "paid-included",
      titleWhite: "What's included in",
      titleAccent: "Pay Per Click",
      description:
        "Account structure, creative testing, and weekly optimization built around qualified leads and margin — not vanity ROAS screenshots.",
      items: [
        {
          id: "account-architecture",
          icon: "search",
          title: "Account architecture",
          description:
            "Unlock efficient spend with funnel-aligned campaign structure. We organize accounts by stage, margin, and capacity — not platform defaults.",
        },
        {
          id: "creative-testing",
          icon: "shopping-bag",
          title: "Creative testing program",
          description:
            "Maximize conversion with rapid hook and offer iteration. We test formats weekly with clear readouts on cost per qualified lead.",
        },
        {
          id: "video-ads",
          icon: "monitor",
          title: "Video & display advertising",
          description:
            "Expand reach with platform-native video and display campaigns. We optimize creative and placements to lower CPA across Meta, YouTube, and programmatic.",
        },
      ],
      secondaryItems: [
        {
          id: "landing-pages",
          icon: "layers",
          title: "Landing page collaboration",
          description:
            "Turn clicks into customers with message-matched pages. We flag friction between ad and landing experience — then work with your team to fix it.",
        },
        {
          id: "google-meta-ads",
          icon: "bar-chart",
          title: "Google & Meta ads management",
          description:
            "Scale winners across Search, Shopping, and paid social. We optimize bids, budgets, and audiences with commentary your CFO can follow.",
        },
        {
          id: "weekly-optimization",
          icon: "bar-chart",
          title: "Weekly optimization & reporting",
          description:
            "Reduce wasted spend with disciplined weekly reviews. Bid shifts, budget moves, and offline conversion data — all in one accountable report.",
        },
      ],
    },
    highlightSection: {
      id: "paid-highlight",
      titleWhite: "Turn Ad Spend Into Sales With",
      titleAccent: "Performance Media Experts",
      paragraphs: [
        "Platform dashboards tell one story — your P&L tells another. NexaPrime Digital aligns Google, Meta, and LinkedIn campaigns to margin, capacity, and qualified pipeline so growth scales without surprises.",
        "From restructuring underperforming accounts to building creative testing programs that actually move CPA, we help advertisers spending five figures monthly get accountability beyond vanity metrics.",
      ],
      ctaLabel: "Get Your Free Consultation",
    },
    faqSection: {
      id: "paid-media-faq",
      titleWhite: "Pay Per Click",
      titleAccent: "FAQs",
      items: [
        {
          id: "results-timeline",
          question: "How quickly will we see results from paid media campaigns?",
          answer:
            "Early signal shows in 2–4 weeks as we fix tracking, restructure accounts, and launch creative tests. Meaningful CPA and lead-quality improvements typically land in 60–90 days once winning audiences and offers are identified. Scale follows when unit economics hold week over week.",
        },
        {
          id: "differentiation",
          question: "What makes your PPC strategies better than competitors?",
          answer:
            "We optimize to qualified leads and margin — not platform-reported ROAS alone. Account structure, creative testing, and landing page feedback run as one system with weekly accountability. You get one team across Google, Meta, and LinkedIn instead of siloed channel vendors.",
        },
        {
          id: "niche-budget",
          question: "Can paid media work for niche industries or small budgets?",
          answer:
            "Yes. Smaller budgets demand tighter focus — we concentrate spend on high-intent keywords, retargeting pools, and geos where you can win profitably. Niche industries benefit from precise audience segmentation and message match rather than broad awareness plays.",
        },
        {
          id: "reporting",
          question: "How transparent is your reporting process?",
          answer:
            "Every client gets live dashboards plus weekly reviews tied to agreed KPIs — cost per qualified lead, pipeline contribution, and offline conversions where applicable. You see spend, performance, and exactly what we changed — no black-box optimizations.",
        },
      ],
    },
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    description:
      "Build community, amplify your brand voice, and drive engagement with platform-native content and paid social.",
    href: "/services/social-media",
    icon: Share2,
    imageAlt: "Social media marketing and community management services",
    gradientFrom: "#143830",
    gradientVia: "#6ee0c0",
    gradientTo: "#081810",
    accentShape: "wave",
    category: "marketing",
    heroLayout: "centered",
    heroTitleBefore: "Social that supports",
    heroTitleAccent: "sales",
    heroOverline: "Social Media Marketing",
    heroSecondaryLine: "Not just a content calendar.",
    heroCtaLabel: "Get Your Free Consultation",
    headline: "Social that supports sales — not just fills a content calendar.",
    longDescription:
      "Organic builds trust and retargeting pools; paid social fills gaps in the funnel. We produce platform-native creative and community management that sounds like your brand, then measure what drives site visits, leads, and foot traffic.",
    deliverables: [
      {
        title: "Channel strategy & cadence",
        description:
          "Right platforms for your audience — with realistic posting rhythm and role clarity.",
      },
      {
        title: "Content & short-form creative",
        description:
          "Reels, carousels, and stories designed for attention, not stock-photo filler.",
      },
      {
        title: "Paid social amplification",
        description:
          "Boost high performers and run conversion campaigns with proper pixel and event setup.",
      },
      {
        title: "Community & reputation",
        description:
          "Timely responses, review prompts, and escalation paths for sensitive industries.",
      },
    ],
    outcomes: [
      "Engagement rates rise without chasing viral trends.",
      "Social traffic converts at higher rates due to message consistency.",
      "Local and B2B brands see measurable lift in inquiries.",
    ],
    idealFor: "Brands where trust and personality matter before the first purchase or appointment.",
    featureSections: [
      {
        id: "smart-spending",
        cardLabel: "Smart Spending",
        cardIcon: "shopping-bag",
        cardPosition: "left",
        titleWhite: "Stop Wasting Budget—Social That",
        titleAccent: "Supports Every Sale",
        withDropCap: true,
        paragraphs: [
          "In today's feed-first landscape, brands burn budget on posts that earn likes but never move pipeline. Without platform-native creative and paid social tied to conversion events, teams fill calendars while sales still waits for qualified inquiries.",
          "We map which channels build trust, which formats drive site visits, and where paid social fills gaps organic cannot reach. Our approach pairs community management with conversion campaigns — proper pixel setup, retargeting pools, and creative tested for message match.",
          "From channel strategy to short-form creative and reputation management, we build social systems your team can run and measure. Partner with NexaPrime Digital and turn engagement into inquiries, foot traffic, and revenue — not vanity metrics.",
        ],
      },
      {
        id: "automated-growth",
        cardLabel: "Automated Growth",
        cardIcon: "trending-up",
        cardPosition: "right",
        titleWhite: "Double Your Reach Without Doubling Your Effort—",
        titleAccent: "Social Works While You Sleep",
        paragraphs: [
          "Imagine nurturing audiences and retargeting warm prospects while your team focuses on closing. Social is not just posting — it is always-on creative, paid amplification, and community signals that keep your brand top of mind.",
          "Our content calendars, boost rules, and conversion campaigns run on schedules and triggers — not whoever has time that week. Performance data tells us what to scale, what to cut, and what to test next across every platform that matters to your buyers.",
        ],
      },
    ],
    capabilitiesSection: {
      id: "social-included",
      titleWhite: "What's included in",
      titleAccent: "Social Media Marketing",
      description:
        "Channel strategy, platform-native creative, paid social amplification, and community management — built to support sales, not just fill a content calendar.",
      items: [
        {
          id: "channel-strategy",
          icon: "layers",
          title: "Channel strategy & cadence",
          description:
            "Right platforms for your audience — with realistic posting rhythm and role clarity.",
        },
        {
          id: "content-creative",
          icon: "monitor",
          title: "Content & short-form creative",
          description:
            "Reels, carousels, and stories designed for attention — not stock-photo filler.",
        },
        {
          id: "paid-social",
          icon: "shopping-bag",
          title: "Paid social amplification",
          description:
            "Boost high performers and run conversion campaigns with proper pixel and event setup.",
        },
      ],
      secondaryItems: [
        {
          id: "community",
          icon: "search",
          title: "Community & reputation",
          description:
            "Timely responses, review prompts, and escalation paths for sensitive industries.",
        },
        {
          id: "social-analytics",
          icon: "bar-chart",
          title: "Social analytics & reporting",
          description:
            "Track what drives site visits, leads, and inquiries — not just likes and impressions.",
        },
        {
          id: "influencer",
          icon: "layers",
          title: "Influencer & partnership campaigns",
          description:
            "Activate creators and partners who reach your buyers with authentic, on-brand messaging.",
        },
      ],
    },
    highlightSection: {
      id: "social-highlight",
      titleWhite: "Turn Followers Into Customers With",
      titleAccent: "Social Media That Sells",
      paragraphs: [
        "Likes do not pay invoices — inquiries do. NexaPrime Digital builds social programs where organic trust, paid amplification, and community management work as one system tied to site visits, leads, and revenue.",
        "Whether you need platform-native creative, conversion campaigns with proper tracking, or reputation management in a regulated industry, we deliver the strategy and execution to make social a sales channel — not a calendar checkbox.",
      ],
      ctaLabel: "Get Your Free Consultation",
    },
    faqSection: {
      id: "social-media-faq",
      titleWhite: "Social Media Marketing",
      titleAccent: "FAQs",
      items: [
        {
          id: "results-timeline",
          question: "How quickly will we see results from social media marketing?",
          answer:
            "Organic trust-building starts in the first 30–45 days as cadence and voice take shape. Paid social and conversion campaigns typically show measurable lead or traffic lift within 60–90 days once creative and audiences are tested. Compounding results follow as retargeting pools grow.",
        },
        {
          id: "differentiation",
          question: "What makes your social strategies better than competitors?",
          answer:
            "We optimize for inquiries and revenue — not engagement rate alone. Organic, paid social, and community management run as one system with shared messaging and proper tracking. You get platform-native creative that sounds like your brand, not a generic agency template.",
        },
        {
          id: "niche-budget",
          question: "Can social media work for niche industries or small budgets?",
          answer:
            "Yes. Smaller budgets benefit from focused channel selection and high-intent paid social over trying to be everywhere. Niche and regulated industries get escalation paths, compliant messaging, and community playbooks tailored to how their buyers actually decide.",
        },
        {
          id: "reporting",
          question: "How transparent is your reporting process?",
          answer:
            "Every engagement includes dashboards tied to agreed KPIs — site visits, leads, cost per inquiry, and channel-specific conversion events. Weekly reviews cover what we posted, what we boosted, and what we are changing based on performance.",
        },
      ],
    },
  },
  ...logicMarketingServices,
  {
    id: "brand-creative",
    title: "Brand & Creative Design",
    description:
      "Distinctive visual identities, campaign creative, and brand systems that command attention and premium positioning.",
    href: "/services/brand-creative",
    icon: Palette,
    imageAlt: "Brand identity and creative design services for digital campaigns",
    gradientFrom: "#4a3018",
    gradientVia: "#f0c060",
    gradientTo: "#201408",
    accentShape: "diamond",
    category: "design",
    heroLayout: "centered",
    heroTitleBefore: "Creative that looks",
    heroTitleAccent: "premium",
    heroOverline: "Brand & Creative",
    heroSecondaryLine: "And performs in paid channels.",
    heroCtaLabel: "Get Your Free Consultation",
    headline: "Creative that looks premium and performs in paid channels.",
    longDescription:
      "We design for the feed, the inbox, and the sales deck — not just the brand guidelines PDF. Visual systems stay flexible enough for rapid testing while keeping your positioning unmistakable.",
    deliverables: [
      {
        title: "Brand identity & guidelines",
        description:
          "Logo refinements, typography, color, and voice rules your internal team can apply daily.",
      },
      {
        title: "Campaign creative suites",
        description:
          "Ad sets, landing hero modules, and email templates built for conversion testing.",
      },
      {
        title: "Sales & investor collateral",
        description:
          "Decks, one-pagers, and case study layouts that match your digital presence.",
      },
      {
        title: "Creative ops & asset libraries",
        description:
          "Organized files, templates, and specs so media launches are not blocked on design.",
      },
    ],
    outcomes: [
      "Ads stop looking like stock templates competing on price.",
      "Sales materials match the quality of your website.",
      "Turnaround on new campaigns drops from weeks to days.",
    ],
    idealFor: "Growing brands whose visual identity has not kept pace with their ambition.",
    featureSections: [
      {
        id: "smart-spending",
        cardLabel: "Smart Spending",
        cardIcon: "shopping-bag",
        cardPosition: "left",
        titleWhite: "Stop Wasting Budget—Creative That",
        titleAccent: "Commands Premium Positioning",
        withDropCap: true,
        paragraphs: [
          "In a crowded market, weak creative is a tax on every dollar you spend. Brands invest in ads and websites that look interchangeable — stock templates, mismatched decks, and guidelines nobody uses — while competitors with sharper identity win trust at first glance.",
          "We design for the feed, the inbox, and the sales conversation — not just the brand PDF sitting in a shared drive. Visual systems stay flexible for rapid testing while keeping your positioning unmistakable across every touchpoint.",
          "From identity refinements and campaign suites to sales collateral and asset libraries, we build creative infrastructure your team can deploy daily. Partner with NexaPrime Digital and turn design from a bottleneck into a growth lever.",
        ],
      },
      {
        id: "automated-growth",
        cardLabel: "Automated Growth",
        cardIcon: "trending-up",
        cardPosition: "right",
        titleWhite: "Double Your Revenue Without Doubling Your Effort—",
        titleAccent: "Creative Works While You Sleep",
        paragraphs: [
          "Imagine scaling campaigns while your team focuses on what they do best — closing deals and running the business. A disciplined creative system is not just a brand book; it is a 24/7 engine that ships on-brand ads, landing modules, and sales decks on demand. Unlike one-off design projects that take weeks per launch, templated asset libraries deliver immediate turnaround for every new test.",
          "Our creative ops automate sizing, versioning, and spec handoffs — optimizing every hour your team spends on design for maximum output. By leveraging performance data from paid channels, we refresh what wins and retire what does not, so your feed, inbox, and sales materials stay sharp without draining internal bandwidth. Whether scaling during peak seasons or entering new markets, your visual system adapts instantly — turning creative from a bottleneck into a growth multiplier.",
        ],
      },
    ],
    capabilitiesSection: {
      id: "brand-included",
      titleWhite: "What's included in",
      titleAccent: "Brand & Creative",
      description:
        "Identity systems, campaign creative, sales collateral, and asset ops — built to look premium and perform in paid channels.",
      items: [
        {
          id: "brand-identity",
          icon: "layers",
          title: "Brand identity & guidelines",
          description:
            "Logo refinements, typography, color, and voice rules your internal team can apply daily.",
        },
        {
          id: "campaign-creative",
          icon: "monitor",
          title: "Campaign creative suites",
          description:
            "Ad sets, landing hero modules, and email templates built for conversion testing.",
        },
        {
          id: "sales-collateral",
          icon: "shopping-bag",
          title: "Sales & investor collateral",
          description:
            "Decks, one-pagers, and case study layouts that match your digital presence.",
        },
      ],
      secondaryItems: [
        {
          id: "creative-ops",
          icon: "bar-chart",
          title: "Creative ops & asset libraries",
          description:
            "Organized files, templates, and specs so media launches are not blocked on design.",
        },
        {
          id: "paid-social-creative",
          icon: "search",
          title: "Paid social & display creative",
          description:
            "Platform-native ad formats sized, spec'd, and versioned for rapid testing across Meta, Google, and LinkedIn.",
        },
        {
          id: "messaging-kits",
          icon: "layers",
          title: "Messaging & voice kits",
          description:
            "Headline banks, proof points, and tone rules so sales, marketing, and support sound like one brand.",
        },
      ],
    },
    highlightSection: {
      id: "brand-highlight",
      titleWhite: "Turn Creative Into Revenue With",
      titleAccent: "Brand Systems That Scale",
      paragraphs: [
        "Premium positioning dies when your ads, site, and sales deck look like they came from three different companies. NexaPrime Digital builds visual systems flexible enough for rapid testing and strict enough to keep your brand unmistakable.",
        "From identity refreshes and campaign suites to asset libraries your team deploys daily, we help growing brands look as ambitious as their product — and perform that way in paid channels.",
      ],
      ctaLabel: "Get Your Free Consultation",
    },
    faqSection: {
      id: "brand-creative-faq",
      titleWhite: "Brand & Creative Design",
      titleAccent: "FAQs",
      items: [
        {
          id: "results-timeline",
          question: "How quickly will we see results from a brand or creative engagement?",
          answer:
            "Quick-win deliverables — ad templates, deck refreshes, landing hero modules — can ship within 2–4 weeks. Full identity systems and guidelines typically take 6–10 weeks depending on scope and stakeholder rounds. Performance lift in paid channels follows as new creative enters testing rotation.",
        },
        {
          id: "differentiation",
          question: "What makes your creative work better than competitors?",
          answer:
            "We design for conversion and consistency — not awards alone. Every asset ties to where it lives: the feed, the landing page, or the sales deck. You get flexible systems your internal team can apply without calling the agency for every resize.",
        },
        {
          id: "niche-budget",
          question: "Can brand creative work for smaller teams or limited budgets?",
          answer:
            "Yes. We scope to your stage — from a focused campaign suite and asset library for a growth team to a full rebrand for multi-market brands. Niche Growth packages concentrate on the touchpoints that move revenue fastest.",
        },
        {
          id: "reporting",
          question: "How do you measure creative performance?",
          answer:
            "Campaign creative is tested against agreed KPIs — CTR, conversion rate, cost per lead, and message recall where applicable. We document what won, why it won, and feed learnings back into the asset library so the next launch starts smarter.",
        },
      ],
    },
  },
  {
    id: "marketing-automation",
    title: "Marketing Automation",
    description:
      "Streamline lead nurturing, email flows, and CRM integrations that turn prospects into loyal, repeat customers.",
    href: "/services/marketing-automation",
    icon: Zap,
    imageAlt: "Marketing automation and email lifecycle campaign services",
    gradientFrom: "#1a2438",
    gradientVia: "#88b0e0",
    gradientTo: "#080c14",
    accentShape: "grid",
    category: "marketing",
    heroLayout: "centered",
    heroTitleBefore: "Follow-up that happens",
    heroTitleAccent: "automatically",
    heroOverline: "Marketing Automation",
    heroSecondaryLine: "And feels personal.",
    heroCtaLabel: "Get Your Free Consultation",
    headline: "Follow-up that happens automatically — and feels personal.",
    longDescription:
      "Most leads die in the gap between form fill and sales call. We wire CRM, email, and SMS flows so prospects get the right message at the right time, and sales sees context before they dial.",
    deliverables: [
      {
        title: "CRM & stack integration",
        description:
          "HubSpot, Salesforce, Klaviyo, or similar — connected with clean data hygiene rules.",
      },
      {
        title: "Lifecycle email programs",
        description:
          "Welcome, nurture, win-back, and replenishment sequences with segmentation by behavior.",
      },
      {
        title: "Lead scoring & routing",
        description:
          "Rules that send hot leads to sales in minutes, not days.",
      },
      {
        title: "Reporting & attribution hooks",
        description:
          "See which automations influence pipeline and revenue, not just open rates.",
      },
    ],
    outcomes: [
      "Speed-to-lead drops under five minutes for qualified inquiries.",
      "Email contributes measurable revenue, not just engagement metrics.",
      "Sales stops complaining about lead quality and missing context.",
    ],
    idealFor: "Teams generating leads but losing them to slow or generic follow-up.",
    featureSections: [
      {
        id: "smart-spending",
        cardLabel: "Smart Spending",
        cardIcon: "shopping-bag",
        cardPosition: "left",
        titleWhite: "Stop Losing Leads—Automation That",
        titleAccent: "Works While You Sleep",
        withDropCap: true,
        paragraphs: [
          "Most leads die in the gap between form fill and first contact. Teams pour budget into traffic while follow-up stays manual — slow handoffs, generic emails, and CRM data nobody trusts. Without automation tied to behavior, prospects go cold before sales ever dials.",
          "We wire CRM, email, and SMS flows so the right message reaches the right person at the right moment. Lead scoring, routing rules, and lifecycle sequences run 24/7 — so hot inquiries hit sales in minutes, not days.",
          "From stack integration and nurture programs to attribution hooks your leadership can trust, we build systems that feel personal at scale. Partner with NexaPrime Digital and turn automation from a checkbox into a revenue engine.",
        ],
      },
      {
        id: "automated-growth",
        cardLabel: "Automated Growth",
        cardIcon: "trending-up",
        cardPosition: "right",
        titleWhite: "Double Your Pipeline Without Doubling Your Team—",
        titleAccent: "Automation Works While You Sleep",
        paragraphs: [
          "Imagine every lead nurtured, scored, and routed while sales sleeps. Marketing automation is not a batch email tool — it is a 24/7 system that delivers the right message at the right moment based on behavior, not guesswork.",
          "Our lifecycle programs, trigger-based workflows, and CRM integrations compound over time — warming cold lists, re-engaging stalled deals, and giving sales context before they pick up the phone. Scale follow-up without scaling headcount.",
        ],
      },
    ],
    capabilitiesSection: {
      id: "automation-included",
      titleWhite: "What's included in",
      titleAccent: "Marketing Automation",
      description:
        "CRM integration, lifecycle email, lead routing, and revenue attribution — built to close the gap between interest and sales conversation.",
      items: [
        {
          id: "crm-integration",
          icon: "layers",
          title: "CRM & stack integration",
          description:
            "HubSpot, Salesforce, Klaviyo, or similar — connected with clean data hygiene rules.",
        },
        {
          id: "lifecycle-email",
          icon: "monitor",
          title: "Lifecycle email programs",
          description:
            "Welcome, nurture, win-back, and replenishment sequences with segmentation by behavior.",
        },
        {
          id: "lead-scoring",
          icon: "shopping-bag",
          title: "Lead scoring & routing",
          description:
            "Rules that send hot leads to sales in minutes, not days.",
        },
      ],
      secondaryItems: [
        {
          id: "reporting",
          icon: "bar-chart",
          title: "Reporting & attribution hooks",
          description:
            "See which automations influence pipeline and revenue, not just open rates.",
        },
        {
          id: "sms-workflows",
          icon: "search",
          title: "SMS & multi-channel workflows",
          description:
            "Timely text and email touchpoints triggered by behavior — not batch-and-blast schedules.",
        },
        {
          id: "sales-handoff",
          icon: "layers",
          title: "Sales handoff & context packs",
          description:
            "Every routed lead arrives with source, behavior history, and talking points sales can use immediately.",
        },
      ],
    },
    highlightSection: {
      id: "automation-highlight",
      titleWhite: "Turn Leads Into Revenue With",
      titleAccent: "Automation That Feels Personal",
      paragraphs: [
        "Most leads do not die from lack of interest — they die from slow, generic follow-up. NexaPrime Digital wires CRM, email, and SMS flows so prospects get nurtured automatically and sales gets context before every conversation.",
        "From HubSpot and Salesforce integrations to lifecycle programs and attribution dashboards, we help teams generating leads stop losing them in the gap between form fill and first call.",
      ],
      ctaLabel: "Get Your Free Consultation",
    },
    faqSection: {
      id: "marketing-automation-faq",
      titleWhite: "Marketing Automation",
      titleAccent: "FAQs",
      items: [
        {
          id: "results-timeline",
          question: "How quickly will we see results from marketing automation?",
          answer:
            "Core integrations and first lifecycle flows typically go live in 3–6 weeks. Speed-to-lead improvements often show within the first month once routing rules are active. Revenue attribution from email and nurture programs compounds over 60–90 days as sequences mature and data cleans up.",
        },
        {
          id: "differentiation",
          question: "What makes your automation setup better than competitors?",
          answer:
            "We optimize for pipeline and revenue — not open rates alone. CRM hygiene, scoring logic, and sales handoffs are built together so marketing and sales trust the same data. You get one team that understands both the stack and the funnel — not a vendor who only configures templates.",
        },
        {
          id: "niche-budget",
          question: "Can marketing automation work for smaller teams or limited budgets?",
          answer:
            "Yes. We start with the highest-impact flows — welcome sequences, lead routing, and win-back — before expanding. Smaller teams benefit from automation that removes manual follow-up without hiring another coordinator.",
        },
        {
          id: "reporting",
          question: "How transparent is your reporting process?",
          answer:
            "Dashboards tie automations to agreed KPIs — speed-to-lead, qualified pipeline, influenced revenue, and conversion by sequence. You see what is running, what changed, and what we recommend adjusting each review cycle.",
        },
      ],
    },
  },
  ...nicheServices,
  ...developmentServices,
];

export function getServiceById(id: string): ServiceDetail | undefined {
  return services.find((service) => service.id === id);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.id);
}
