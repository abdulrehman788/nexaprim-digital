import type { AboutMethodologyStep, AboutPrinciple, AboutStat } from "@/types";

export const aboutHero = {
  overline: "About Us",
  titleLine1: "Built for brands that need",
  titleAccent: "marketing that connects.",
  description:
    "NexaPrime Digital is an Austin-based studio helping mid-market brands grow with strategy, creative, and media under one accountable team.",
  ctaLabel: "Book a Free Consultation",
} as const;

export const aboutStory = {
  id: "our-story",
  overline: "Our Story",
  title: "How we ended up here",
  pullQuote: "Your success is our success.",
  pullQuoteAttribution: "The standard we hold every engagement to",
  paragraphs: [
    "The first NexaPrime client was a boutique hotel group spending $18,000 a month on paid search. Bookings were flat. The problem was not the budget — their booking engine sent people to a landing page built three years earlier for a different property. We rebuilt the funnel in six weeks. Direct bookings rose 34% that quarter.",
    "We stayed intentionally small. No account managers reading scripts, no bait-and-switch handoffs. When you work with us, the strategist on your kickoff call reviews your weekly numbers.",
    "Most clients sit between $2M and $50M in annual revenue — big enough to need real infrastructure, small enough that leadership still reads the reports. We have turned down projects that needed a 200-person agency and projects that wanted a logo swap in 48 hours.",
  ],
  milestones: [
    { year: "2019", label: "Founded in Austin", detail: "Two marketers, one hotel client, one rebuilt funnel." },
    { year: "2021", label: "Healthcare & education", detail: "Three referral-only years before expanding verticals." },
    { year: "2024", label: "250+ projects", detail: "Delivered without opening a second office." },
  ],
} as const;

export const aboutPrinciplesSection = {
  overline: "Operating Standards",
  title: "What we refuse to do",
  description:
    "Not marketing slogans — rules we apply when scoping work and when a campaign is underperforming.",
} as const;

export const aboutPrinciples: AboutPrinciple[] = [
  {
    id: "no-everyone",
    iconId: "users",
    title: "Working with everyone",
    body: "We are selective about partnerships. If we cannot move your numbers in 90 days, we will tell you before you sign — not after.",
  },
  {
    id: "no-wrong-reasons",
    iconId: "scope",
    title: "Working for the wrong reasons",
    body: "We do not take work just to fill the calendar. Every engagement needs a clear revenue or pipeline outcome we can both measure.",
  },
  {
    id: "no-empty-promises",
    iconId: "bar-chart",
    title: "Making empty promises",
    body: "No guaranteed rankings, no vanity dashboards, no three-month timelines for problems that need six. We set expectations you can hold us to.",
  },
  {
    id: "no-opacity",
    iconId: "key",
    title: "Working without transparency",
    body: "You own your ad accounts, analytics, and creative from day one. Weekly scorecards, open reporting, and direct access to the team doing the work.",
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
    body: "Two weeks of discovery — sales interviews, support tickets, and the customer journey walked as if we were buying.",
  },
  {
    id: "learn",
    step: "02",
    title: "Learn",
    body: "Funnel audit, competitive teardown, and a gap sheet showing where you lose people and what it costs.",
  },
  {
    id: "build",
    step: "03",
    title: "Build",
    body: "Work ships in two-week sprints — creative, landing pages, automations, and campaigns in small batches.",
  },
  {
    id: "measure",
    step: "04",
    title: "Measure",
    body: "A shared scorecard updated weekly. Spend, conversions, and pipeline contribution in one place.",
  },
  {
    id: "refine",
    step: "05",
    title: "Refine",
    body: "Underperforming ads get paused fast. Winners get budget. Knowledge stays with your team.",
  },
];

export const aboutStatsSection = {
  overline: "Track Record",
  title: "By the numbers",
  description: "Snapshot as of early 2026 — real outcomes, not inflated rounding.",
} as const;

export const aboutStats: AboutStat[] = [
  { id: "projects", value: "250+", label: "Projects delivered" },
  { id: "industries", value: "50+", label: "Industries served" },
  { id: "retention", value: "91%", label: "Client satisfaction" },
  { id: "revenue", value: "$10M+", label: "Revenue influenced" },
];

export const aboutCta = {
  overline: "Work With Us",
  title: "Tell us what is not working",
  description:
    "No pitch deck on the first call. Bring your numbers, your frustrations, and twenty minutes — we will tell you honestly if we can help.",
  primaryCta: "Book a Free Consultation",
  primaryCtaHref: "/book",
  secondaryCta: "View Our Services",
  secondaryCtaHref: "/services",
} as const;
