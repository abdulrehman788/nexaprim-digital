import { Building2, Layers, Rocket, Sparkles, Target, Zap } from "lucide-react";

import type { PackageDetail } from "@/types";

export const packagesSection = {
  title: "Flexible Packages. Maximum Impact.",
  description:
    "Start with one niche, bundle everything in All-in-One, or tell us what you need — we'll build a custom Enterprise quote.",
  ctaLabel: "Compare all packages",
  ctaHref: "/packages",
} as const;

export const packagesPage = {
  overline: "Packages",
  titleLine1: "Modular niches or",
  titleAccent: "full coverage.",
  description:
    "Six programs — from a focused niche play to our All-in-One bundle and custom Enterprise engagements. Every package includes clear deliverables and a named lead.",
} as const;

export const packages: PackageDetail[] = [
  {
    id: "all-in-one",
    title: "All-in-One Package",
    description:
      "Every service under one roof — strategy, marketing, design, graphics, web development, and automation in a single accountable program.",
    href: "/packages/all-in-one",
    icon: Sparkles,
    featured: true,
    badge: "All Services",
    headline: "Every niche. One team. One roadmap.",
    longDescription:
      "Our complete engagement for brands that want one partner across the full stack — not six vendors pointing fingers. Digital strategy, SEO, paid and social media, brand and graphics design, web development, and marketing automation run as one program with unified reporting and a senior lead accountable to outcomes.",
    includes: [
      {
        title: "Digital strategy & quarterly roadmap",
        description:
          "Prioritized initiatives across every channel — with owners, KPIs, and budget governance leadership signs off on.",
      },
      {
        title: "Full-funnel marketing",
        description:
          "SEO, content, paid media, and social programs managed together — not in silos.",
      },
      {
        title: "Brand, graphics & creative production",
        description:
          "Identity support, campaign creative, ad sets, and sales assets on a production calendar your team can rely on.",
      },
      {
        title: "Web development & CRO",
        description:
          "Site builds, landing page systems, performance optimization, and conversion testing tied to media and SEO.",
      },
      {
        title: "Marketing automation & CRM",
        description:
          "Lifecycle email, lead scoring, routing, and attribution hooks that connect traffic to pipeline.",
      },
      {
        title: "Executive reporting cadence",
        description:
          "Monthly business reviews with channel contribution, CAC, and pipeline — not vanity dashboards.",
      },
    ],
    idealFor: "Mid-market brands that want one accountable partner across marketing, design, and development.",
    timeline: "90-day onboarding; ongoing partnership with quarterly planning cycles.",
  },
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
  {
    id: "enterprise",
    title: "Enterprise",
    description:
      "Custom scope for complex organizations — tell us your requirements and we'll deliver a tailored proposal.",
    href: "/packages/enterprise",
    icon: Building2,
    isEnterprise: true,
    headline: "Your requirements. Our custom quote.",
    longDescription:
      "Multi-brand portfolios, international rollouts, complex tech stacks, or engagements that don't fit a standard package — Enterprise is built around your brief. Share your goals, constraints, and timeline; we'll scope deliverables, team structure, and investment in a proposal within one business day of our discovery call.",
    includes: [
      {
        title: "Discovery & requirements workshop",
        description:
          "Stakeholder interviews, technical audit, and success criteria documented before we quote.",
      },
      {
        title: "Custom service mix",
        description:
          "Any combination of strategy, marketing, design, graphics, development, and automation — scoped to your org.",
      },
      {
        title: "Dedicated account leadership",
        description:
          "Named senior lead with escalation path and executive reporting cadence you define.",
      },
      {
        title: "Flexible commercial terms",
        description:
          "Retainer, project-based, or hybrid models — structured for procurement and finance review.",
      },
      {
        title: "SLA-backed delivery",
        description:
          "Turnaround commitments, change-order process, and governance documented in the SOW.",
      },
      {
        title: "Security & compliance alignment",
        description:
          "NDA, vendor onboarding, and data-handling requirements addressed in the proposal.",
      },
    ],
    idealFor: "Organizations with multi-market needs, complex stakeholders, or requirements beyond standard packages.",
    timeline: "Proposal within 1 business day after discovery; kickoff timeline agreed in SOW.",
  },
];

export function getPackageById(id: string): PackageDetail | undefined {
  return packages.find((pkg) => pkg.id === id);
}
