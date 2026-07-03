import {
  Megaphone,
  Palette,
  Search,
  Share2,
  Target,
  Zap,
} from "lucide-react";

import type { ServiceDetail } from "@/types";

export const servicesSection = {
  title: "Digital Marketing Services That Deliver Results",
  description:
    "Full-funnel capabilities to grow your brand, generate qualified leads, and maximize ROI across every digital channel.",
  ctaLabel: "Explore All Services",
  ctaHref: "/services",
} as const;

export const servicesPage = {
  overline: "Services",
  titleLine1: "Every capability you need —",
  titleAccent: "one accountable team.",
  description:
    "Strategy, creative, media, content, and automation under one roof. No handoffs between vendors, no gaps in the funnel.",
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
    headline: "A growth plan your leadership can actually fund and measure.",
    longDescription:
      "We start with where revenue leaks today — not a slide deck of trends. Discovery covers your funnel, unit economics, competitive positioning, and team capacity, then outputs a prioritized roadmap with owners, timelines, and KPIs tied to the P&L.",
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
  },
  {
    id: "seo-content",
    title: "SEO & Content Marketing",
    description:
      "Rank higher, attract intent-driven traffic, and convert visitors with authoritative content that builds trust.",
    href: "/services/seo-content",
    icon: Search,
    imageAlt: "Search engine optimization and content marketing services",
    gradientFrom: "#1a3050",
    gradientVia: "#5a9ae8",
    gradientTo: "#0c1520",
    accentShape: "circle",
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
  },
  {
    id: "paid-media",
    title: "Paid Media & PPC",
    description:
      "High-ROI campaigns across Google, Meta, and LinkedIn — optimized daily for lower CPA and stronger pipeline.",
    href: "/services/paid-media",
    icon: Megaphone,
    imageAlt: "Paid media advertising and PPC campaign management services",
    gradientFrom: "#3a2048",
    gradientVia: "#b888e8",
    gradientTo: "#180c20",
    accentShape: "ring",
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
  },
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
  },
];

export function getServiceById(id: string): ServiceDetail | undefined {
  return services.find((service) => service.id === id);
}
