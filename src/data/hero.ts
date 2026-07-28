import {
  Award,
  Briefcase,
  Target,
  Users,
} from "lucide-react";

import type { TrustStat } from "@/types";

export const heroContent = {
  overline: "Digital Growth Partner",
  headlineLine1: "We help businesses",
  headlineLine2: "expand beyond limits.",
  description:
    "Strategy. Technology. Marketing. AI. Everything you need to grow, in one place.",
  primaryCta: "Book a Free Strategy Call",
  secondaryCta: "Explore Our Services",
  trustedLabel: "Trusted by innovators & leaders worldwide",
  skylineImage: "/images/hero/hero-bg-hd.jpg",
  skylineAlt:
    "Earth from space with glowing city lights and a futuristic skyline",
  heroImage: "/images/hero/hero-devices-hd.png",
  heroImageAlt:
    "Laptop and smartphone on a dark surface with golden light trails and mountain landscape on screen",
  laptopScreenImage: "/images/hero/mountain-landscape.jpg",
  laptopScreenAlt: "Moody mountain landscape on laptop screen mockup",
  laptopScreenLines: ["Strategy.", "Design.", "Growth.", "Impact."],
  excellenceBadge: {
    value: "5+",
    label: "Years of Excellence",
  },
} as const;

export const heroStatCards = {
  totalGrowth: { label: "Total Growth", value: "+148%" },
  revenue: {
    label: "Revenue Generated",
    value: "$12.6M",
    delta: "+99% vs last year",
  },
  activeProjects: { label: "Active Projects", value: "125", note: "Live" },
} as const;

export const heroTrustStats: TrustStat[] = [
  {
    id: "projects",
    value: "250+",
    label: "Projects Delivered",
    icon: Briefcase,
  },
  {
    id: "industries",
    value: "50+",
    label: "Industries Served",
    icon: Target,
  },
  {
    id: "satisfaction",
    value: "98%",
    label: "Client Satisfaction",
    icon: Users,
  },
  {
    id: "experience",
    value: "5+",
    label: "Years of Excellence",
    icon: Award,
  },
];

export const heroGrowthCard = {
  title: "Growth Overview",
  value: "+230%",
  period: "This Month",
} as const;

export const heroServiceCards = [
  {
    id: "branding",
    title: "Branding",
    subtitle: "Identity Design",
    href: "/services/brand-creative",
  },
  {
    id: "performance",
    title: "Performance",
    subtitle: "Marketing",
    href: "/services/paid-media",
  },
  {
    id: "web",
    title: "Web Development",
    subtitle: "& Solutions",
    href: "/services/digital-strategy",
  },
] as const;

export const heroLeadsCard = {
  label: "Total Leads",
  value: "+12,540",
  period: "This Month",
} as const;
