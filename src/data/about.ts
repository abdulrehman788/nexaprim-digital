import type { AboutMethodologyStep, AboutPrinciple, AboutStat } from "@/types";

export const aboutHero = {
  overline: "Who We Are",
  titleLine1: "Built for brands that need",
  titleAccent: "marketing that connects.",
  description:
    "NexaPrime began in Austin in 2019 — two marketers tired of watching great ad spend die in broken funnels. We built a studio where strategy, creative, and media sit at the same table.",
  primaryCta: "See our story",
  primaryCtaHref: "#our-story",
  secondaryCta: "Read our method",
  highlights: [
    { id: "founded", label: "Founded", value: "2019" },
    { id: "base", label: "Headquarters", value: "Austin, TX" },
    { id: "team", label: "Core team", value: "18 people" },
    { id: "projects", label: "Projects", value: "250+" },
  ],
} as const;

export const aboutStory = {
  id: "our-story",
  overline: "Our Story",
  title: "How we ended up here",
  pullQuote: "Fit matters more than revenue.",
  pullQuoteAttribution: "Scoping rule we still use on every new inquiry",
  paragraphs: [
    "The first NexaPrime client was a boutique hotel group spending $18,000 a month on paid search. Bookings were flat. The problem was not the budget. Their booking engine sent people to a landing page built three years earlier for a different property. We rebuilt the funnel in six weeks. Direct bookings rose 34% that quarter. That project set the tone for everything after.",
    "We stayed small on purpose. No account managers reading scripts. No offshore production line. When you work with us, the strategist who runs your kickoff is the same person reviewing your weekly numbers. Our team is 18 people across strategy, design, development, and media — all under one roof in Austin, with a handful of senior contractors we have worked with for years.",
    "Most of our clients sit between $2M and $50M in annual revenue. Big enough to need real infrastructure. Small enough that the CEO still reads the reports. We have turned down projects that needed a 200-person agency and projects that wanted a logo swap in 48 hours.",
  ],
  milestones: [
    { year: "2019", event: "NexaPrime opens in Austin with two founders and one hotel client." },
    { year: "2021", event: "Expanded into healthcare and education after three referral-only years." },
    { year: "2024", event: "Crossed 250 delivered projects without opening a second office." },
  ],
} as const;

export const aboutPrinciplesSection = {
  overline: "Operating Rules",
  title: "What we refuse to do",
  description:
    "Not slogans for a slide deck — rules we use when scoping work and when a campaign is underperforming.",
} as const;

export const aboutPrinciples: AboutPrinciple[] = [
  {
    id: "no-hostage-data",
    iconId: "key",
    title: "We do not hold your data hostage",
    body: "You own your ad accounts, analytics, and creative files from day one. If we part ways, you leave with everything. We have seen too many businesses locked out of their own Google Ads history. That does not happen here.",
  },
  {
    id: "no-vanity",
    iconId: "bar-chart",
    title: "We do not optimize for impressions",
    body: "Reach and engagement look good in a boardroom. They rarely pay rent. Every plan we write ties back to leads, bookings, revenue, or another number your finance team actually tracks.",
  },
  {
    id: "no-bait-switch",
    iconId: "users",
    title: "We do not bait-and-switch the team",
    body: "The people on your discovery call do the work. We do not sell senior talent and hand the account to juniors. If capacity is tight, we tell you before you sign — not after.",
  },
  {
    id: "no-everything",
    iconId: "scope",
    title: "We do not pretend to do everything",
    body: "We are strong in digital strategy, creative, paid media, web builds, and automation. We are not a PR firm, not a tradeshow booth shop, and not the right call for a one-off flyer. Saying no keeps our work sharp.",
  },
];

export const aboutMethodologiesSection = {
  id: "methodologies",
  overline: "How We Work",
  title: "The NexaPrime Method",
  titleAccent: "NexaPrime Method",
  description:
    "Five phases. No mystery. You always know what we are doing this week and what success looks like at the end of it.",
} as const;

export const aboutMethodologySteps: AboutMethodologyStep[] = [
  {
    id: "listen",
    step: "01",
    title: "Listen",
    body: "Two weeks of discovery. We interview your sales team, read support tickets, and walk through the customer journey as if we were buying. Assumptions get written down and tested, not hidden.",
  },
  {
    id: "map",
    step: "02",
    title: "Map",
    body: "Funnel audit, competitive teardown, and a gap sheet: where you are losing people and what it is costing you. You get this document before we propose any tactics.",
  },
  {
    id: "build",
    step: "03",
    title: "Build",
    body: "Work ships in two-week sprints. Creative, landing pages, automations, and campaigns go live in small batches so we can read results early instead of waiting three months for a big reveal.",
  },
  {
    id: "measure",
    step: "04",
    title: "Measure",
    body: "A shared scorecard updated weekly — not a 40-page PDF at month end. You see spend, conversions, and pipeline contribution in one place. We review it together on a fixed cadence.",
  },
  {
    id: "refine",
    step: "05",
    title: "Refine",
    body: "Underperforming ads get paused fast. Winners get budget. We document what we learned so your team keeps the knowledge even if you scale back our involvement later.",
  },
];

export const aboutStatsSection = {
  overline: "Track Record",
  title: "By the numbers",
  description: "Snapshot as of early 2026. Updated once a year — no live counters, no inflated rounding.",
} as const;

export const aboutStats: AboutStat[] = [
  { id: "projects", value: "250+", label: "Projects delivered since 2019" },
  { id: "industries", value: "50+", label: "Industries served" },
  { id: "retention", value: "91%", label: "Clients who renewed year two" },
  { id: "team", value: "18", label: "Full-time team members in Austin" },
];

export const aboutCta = {
  title: "Tell us what is not working",
  description:
    "No pitch deck on the first call. Bring your numbers, your frustrations, and twenty minutes. We will tell you honestly if we can help.",
  primaryCta: "Book a Strategy Call",
  secondaryCta: "View Case Studies",
  benefits: [
    {
      id: "call",
      title: "Straight conversation",
      description: "You talk to a strategist, not a sales script.",
    },
    {
      id: "plan",
      title: "Clear next steps",
      description: "You leave knowing whether we are a fit — either way.",
    },
    {
      id: "timeline",
      title: "Fast follow-up",
      description: "We respond within one business day, every time.",
    },
  ],
} as const;
