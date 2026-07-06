import type { AboutMethodologyStep, AboutPrinciple, AboutStat } from "@/types";

export const aboutHero = {
  overline: "Who We Are",
  titleLine1: "Built for brands that need",
  titleAccent: "marketing that connects.",
  description:
    "We help mid-market brands build long-term growth through strategy, creative, and media that actually moves revenue — not slide decks full of impressions.",
  primaryCta: "Let's Talk",
  primaryCtaHref: "/book",
  secondaryCta: "Who we work with",
  secondaryCtaHref: "#our-story",
  highlights: [
    { id: "industry", label: "Industry", value: "Agency" },
    { id: "founded", label: "Founded", value: "2019" },
    { id: "base", label: "Location", value: "Austin, TX" },
    { id: "team", label: "Team", value: "18+" },
  ],
} as const;

export const aboutStory = {
  id: "our-story",
  title: "How we ended up here",
  pullQuote: "Your success is our success.",
  bullets: [
    "We started in Austin after watching great ad budgets die in broken funnels and outdated sites.",
    "We stayed intentionally small — senior strategists on every account, no bait-and-switch handoffs.",
    "We work best with brands between $2M and $50M who need one accountable team across the stack.",
  ],
  paragraphs: [
    "The first NexaPrime client was a boutique hotel group spending $18,000 a month on paid search. Bookings were flat. The problem was not the budget — their booking engine sent people to a landing page built three years earlier for a different property. We rebuilt the funnel in six weeks. Direct bookings rose 34% that quarter.",
    "We have turned down projects that needed a 200-person agency and projects that wanted a logo swap in 48 hours. Fit matters more than revenue. That scoping rule still governs every new inquiry we take on.",
    "Today we are 18 people across strategy, design, development, and media — all under one roof, with a handful of senior contractors we have worked with for years. When you work with us, the person on your kickoff call reviews your weekly numbers.",
  ],
} as const;

export const aboutPrinciplesSection = {
  title: "What we refuse to do",
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
    body: "Two weeks of discovery — sales interviews, support tickets, and the customer journey walked as if we were buying. Assumptions get written down and tested.",
  },
  {
    id: "learn",
    step: "02",
    title: "Learn",
    body: "Funnel audit, competitive teardown, and a gap sheet showing where you lose people and what it costs. You get this before we propose any tactics.",
  },
  {
    id: "build",
    step: "03",
    title: "Build",
    body: "Work ships in two-week sprints — creative, landing pages, automations, and campaigns in small batches so we read results early.",
  },
  {
    id: "measure",
    step: "04",
    title: "Measure",
    body: "A shared scorecard updated weekly. Spend, conversions, and pipeline contribution in one place — reviewed together on a fixed cadence.",
  },
  {
    id: "refine",
    step: "05",
    title: "Refine",
    body: "Underperforming ads get paused fast. Winners get budget. We document what we learned so your team keeps the knowledge.",
  },
];

export const aboutStatsSection = {
  title: "By the numbers",
} as const;

export const aboutStats: AboutStat[] = [
  { id: "projects", value: "250+", label: "Projects delivered" },
  { id: "industries", value: "50+", label: "Industries served" },
  { id: "retention", value: "91%", label: "Client satisfaction" },
  { id: "revenue", value: "$10M+", label: "Revenue influenced" },
];

export const aboutCta = {
  title: "Tell us what is not working",
  description:
    "No pitch deck on the first call. Bring your numbers, your frustrations, and twenty minutes — we will tell you honestly if we can help.",
  primaryCta: "Start a Project",
  primaryCtaHref: "/contact",
  secondaryCta: "View Our Services",
  secondaryCtaHref: "/services",
} as const;
