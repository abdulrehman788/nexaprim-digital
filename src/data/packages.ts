import { Layers, Rocket, Target, Zap } from "lucide-react";

import type { PackageDetail } from "@/types";

export const packagesSection = {
  title: "Flexible Packages. Maximum Impact.",
  description:
    "Modular growth systems built to match your stage, budget, and ambitions — from focused niche plays to full-funnel dominance.",
  ctaLabel: "Compare all packages",
  ctaHref: "/packages",
} as const;

export const packagesPage = {
  overline: "Packages",
  titleLine1: "Growth systems scoped to",
  titleAccent: "your stage and budget.",
  description:
    "Four modular programs — from a focused niche play to a full-funnel engine. Every package includes a named strategist, clear deliverables, and reporting your leadership can follow.",
} as const;

export const packages: PackageDetail[] = [
  {
    id: "niche-growth",
    title: "Niche Growth System",
    description:
      "Targeted campaigns and conversion assets engineered to dominate a specific market segment fast.",
    href: "/packages/niche-growth",
    icon: Target,
    headline: "Win one segment completely before you scale everywhere.",
    longDescription:
      "Built for brands that need traction in a defined niche — a geography, service line, or buyer persona — without funding a full agency retainer. We concentrate spend and creative on the segment where you can win fastest, then document what works for expansion.",
    includes: [
      {
        title: "Segment & offer positioning",
        description:
          "Clarify the niche, the promise, and the proof points that separate you from generic competitors.",
      },
      {
        title: "Landing page + conversion path",
        description:
          "One high-intent funnel with message match from ad to form — mobile-first, measured weekly.",
      },
      {
        title: "Paid media launch (1–2 channels)",
        description:
          "Google or Meta campaigns scoped to your niche with creative testing in the first 30 days.",
      },
      {
        title: "30-day optimization sprint",
        description:
          "Weekly readouts on cost per lead, creative winners, and budget shifts — no black-box management.",
      },
    ],
    idealFor: "Brands testing a new market, service line, or region with $5K–$15K/month in media budget.",
    timeline: "6–8 weeks to launch; optimization continues month over month.",
  },
  {
    id: "complete-growth",
    title: "Complete Growth Pack",
    description:
      "Our flagship end-to-end system — strategy, creative, media, automation, and analytics under one roof.",
    href: "/packages/complete-growth",
    icon: Rocket,
    featured: true,
    badge: "Best Value",
    headline: "The full funnel — one team, one roadmap, one set of numbers.",
    longDescription:
      "Our flagship engagement for brands ready to treat marketing as a revenue system, not a collection of vendors. Strategy, creative, paid and organic channels, automation, and reporting run as one program with a senior lead accountable to outcomes.",
    includes: [
      {
        title: "Quarterly growth roadmap",
        description:
          "Prioritized initiatives tied to revenue targets, with owners and KPIs your leadership signs off on.",
      },
      {
        title: "Creative & brand support",
        description:
          "Campaign assets, landing modules, and sales collateral that stay on-message across channels.",
      },
      {
        title: "Multi-channel media management",
        description:
          "Paid search, paid social, and retargeting with unified reporting and budget governance.",
      },
      {
        title: "SEO, content & automation",
        description:
          "Organic programs and lifecycle email/CRM flows that compound paid acquisition over time.",
      },
      {
        title: "Executive reporting cadence",
        description:
          "Monthly business reviews with pipeline, CAC, and channel contribution — not vanity dashboards.",
      },
    ],
    idealFor: "Mid-market brands spending $20K+/month who want one partner across the full funnel.",
    timeline: "90-day onboarding; ongoing partnership with quarterly planning cycles.",
  },
  {
    id: "brand-acceleration",
    title: "Brand Acceleration",
    description:
      "Elevate your brand identity and messaging to command attention and premium positioning.",
    href: "/packages/brand-acceleration",
    icon: Layers,
    headline: "Look and sound like the market leader before you outspend everyone.",
    longDescription:
      "For companies whose product is strong but their market presence still looks like a startup. We refine identity, messaging, and campaign creative so every touchpoint — site, ads, decks, social — feels cohesive and premium.",
    includes: [
      {
        title: "Brand audit & positioning",
        description:
          "Competitive review, messaging gaps, and a clear story for sales and marketing to share.",
      },
      {
        title: "Visual identity refresh",
        description:
          "Logo refinements, typography, color, and templates your team can apply without a designer on call.",
      },
      {
        title: "Campaign creative suite",
        description:
          "Ad concepts, hero modules, and email templates built for testing in paid channels.",
      },
      {
        title: "Launch playbook",
        description:
          "Rollout plan for site, sales, and social so the rebrand lands consistently — not in silos.",
      },
    ],
    idealFor: "Brands preparing for a growth push, fundraise, or market expansion that need to look the part.",
    timeline: "8–12 weeks depending on scope and approval cycles.",
  },
  {
    id: "performance-engine",
    title: "Performance Engine",
    description:
      "Data-driven paid media and CRO programs optimized relentlessly for ROAS and pipeline growth.",
    href: "/packages/performance-engine",
    icon: Zap,
    headline: "Scale what converts. Cut what doesn't. Every week.",
    longDescription:
      "For teams that already have offers and landing pages but need paid media and CRO run with discipline. We treat accounts like a trading desk — creative tests, audience splits, and landing feedback loops with fast iteration.",
    includes: [
      {
        title: "Account rebuild & tracking audit",
        description:
          "Fix structure, pixels, and offline conversion imports so decisions are based on real pipeline.",
      },
      {
        title: "Creative testing program",
        description:
          "Weekly ad iterations with clear hypotheses — hooks, offers, formats — and documented winners.",
      },
      {
        title: "Landing page CRO support",
        description:
          "Friction audits and test recommendations; we collaborate with your dev team or ours on implementation.",
      },
      {
        title: "Budget & bid governance",
        description:
          "Daily monitoring with weekly shifts toward profitable segments, geos, and SKUs.",
      },
    ],
    idealFor: "Advertisers spending $10K–$100K/month who need hands-on optimization, not set-and-forget.",
    timeline: "4-week audit and rebuild; ongoing management with weekly optimization.",
  },
];

export function getPackageById(id: string): PackageDetail | undefined {
  return packages.find((pkg) => pkg.id === id);
}
