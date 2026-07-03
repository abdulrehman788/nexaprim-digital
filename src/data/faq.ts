import type { FaqItem } from "@/types";

export const faqSection = {
  title: "Frequently Asked Questions",
  description:
    "Clear answers about how we work, what to expect, and how NexaPrime Digital helps brands grow with confidence.",
} as const;

export const faqItems: FaqItem[] = [
  {
    id: "services",
    question: "What digital marketing services does NexaPrime Digital offer?",
    answer:
      "We provide end-to-end digital growth services including strategy, brand and creative, performance marketing, web development, SEO, marketing automation, and analytics. Packages can be tailored to your goals — from focused campaigns to full-funnel partnerships.",
  },
  {
    id: "industries",
    question: "Which industries do you specialize in?",
    answer:
      "Our team has deep experience across hospitality, restaurants, healthcare, ecommerce, real estate, and education. We adapt proven frameworks to each sector's buyer journey, compliance needs, and competitive landscape.",
  },
  {
    id: "timeline",
    question: "How long does it take to see results?",
    answer:
      "Quick wins such as landing page optimizations or paid media adjustments can show impact within weeks. Sustainable growth from SEO, brand positioning, and automation typically builds over 3–6 months. We set clear milestones from day one so you always know what to expect.",
  },
  {
    id: "pricing",
    question: "How are your packages priced?",
    answer:
      "We offer flexible packages — from foundational digital presence to complete growth programs — scoped to your goals, channels, and team capacity. After a strategy call, we provide a transparent proposal with deliverables, timelines, and investment.",
  },
  {
    id: "onboarding",
    question: "What does onboarding look like?",
    answer:
      "Onboarding starts with a discovery workshop to align on goals, audiences, and KPIs. We audit your current digital footprint, define priorities, and launch a 90-day roadmap. You'll have a dedicated strategist and regular reporting from week one.",
  },
  {
    id: "reporting",
    question: "How do you measure and report performance?",
    answer:
      "Every engagement includes live dashboards and monthly performance reviews tied to agreed KPIs — leads, revenue, ROAS, conversion rate, and channel-specific metrics. We focus on business outcomes, not vanity numbers.",
  },
];
