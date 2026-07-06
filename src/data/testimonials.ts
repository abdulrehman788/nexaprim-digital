import {
  BarChart3,
  Headphones,
  Layers,
  LineChart,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";

import type { CTABenefit, Testimonial, WhyUsFeature } from "@/types";

export const whyUsSection = {
  title: "More Than an Agency, Your Growth Partner",
  description:
    "We embed alongside your team as strategic partners — aligning every initiative to measurable business outcomes.",
} as const;

export const whyUsFeatures: WhyUsFeature[] = [
  {
    id: "strategy-first",
    title: "Strategy First",
    description:
      "Every engagement begins with deep discovery and a roadmap tied to revenue goals — not vanity metrics.",
    icon: Target,
  },
  {
    id: "end-to-end",
    title: "End-to-End Service",
    description:
      "From brand positioning to paid media and automation, we own the full funnel so nothing falls through the cracks.",
    icon: Layers,
  },
  {
    id: "data-driven",
    title: "Data Driven Results",
    description:
      "Real-time dashboards, rigorous testing, and transparent reporting keep performance accountable and optimizable.",
    icon: BarChart3,
  },
  {
    id: "dedicated-support",
    title: "Dedicated Support",
    description:
      "A senior strategist and responsive team on call — proactive communication, fast pivots, zero runaround.",
    icon: Headphones,
  },
];

export const testimonialsSection = {
  title: "Success Stories That Speak for Themselves",
  description:
    "Real outcomes from brands that trusted us to transform their digital presence and revenue engine.",
  ctaLabel: "Read client reviews",
  ctaHref: "/reviews",
} as const;

export const testimonials: Testimonial[] = [
  {
    id: "grand-vista-hotel",
    headline: "Increased direct bookings by 220%",
    description:
      "A four-property hotel group was bleeding margin to OTAs. We rebuilt the booking funnel and shifted paid spend to high-intent direct traffic.",
    href: "/case-studies/grand-vista-hotel",
    image: "/images/industries/hospitality.svg",
    imageAlt: "Luxury hotel lobby — Grand Vista Hotel Group case study",
    industry: "Hospitality",
  },
  {
    id: "meridian-health",
    headline: "Tripled new patient intake in six months",
    description:
      "A regional clinic network needed compliant lead generation without sacrificing trust. Local SEO and education-first content did the heavy lifting.",
    href: "/case-studies/meridian-health",
    image: "/images/industries/healthcare.svg",
    imageAlt: "Modern medical clinic — Meridian Health Network case study",
    industry: "Healthcare",
  },
  {
    id: "urban-table",
    headline: "Filled 40% more tables every week",
    description:
      "A three-location restaurant group struggled with empty Tuesday–Thursday covers. Hyper-local ads and a simple loyalty loop changed the pattern.",
    href: "/case-studies/urban-table",
    image: "/images/industries/restaurants.svg",
    imageAlt: "Upscale restaurant interior — Urban Table case study",
    industry: "Restaurants",
  },
];

export const ctaSection = {
  title: "Let's Build Your Digital Future",
  description:
    "Partner with a team that combines strategic rigor, creative excellence, and relentless optimization to accelerate your growth.",
  primaryCta: "Book a Free Strategy Call",
  secondaryCta: "Our Methodologies",
} as const;

export const ctaBenefits: CTABenefit[] = [
  {
    id: "strategy-call",
    title: "Free Strategy Call",
    description: "A no-obligation session to map your biggest growth opportunities.",
    icon: LineChart,
  },
  {
    id: "custom-plan",
    title: "Custom Plan",
    description: "A tailored roadmap aligned to your goals, timeline, and budget.",
    icon: Shield,
  },
  {
    id: "growth-guaranteed",
    title: "Growth Guaranteed",
    description: "Performance frameworks built for accountability and measurable ROI.",
    icon: TrendingUp,
  },
];
