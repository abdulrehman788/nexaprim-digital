import type { TrustStat } from "@/types";

export const heroContent = {
  overline: "Digital Growth Partner",
  headlineLine1: "Helping Businesses",
  headlineAccent: "Expand",
  headlineLine2: "Beyond Limits.",
  description:
    "Strategy, design, technology and marketing—working together to help your business grow faster, smarter and bigger.",
  primaryCta: "Book a Free Strategy Call",
  secondaryCta: "View Our Work",
  trustedLabel: "Trusted by innovators & leaders worldwide",
  skylineImage: "/images/hero/hero-earth-1920.webp",
  skylineImagePreload: "/images/hero/hero-earth-1280.webp",
  skylineAlt:
    "Earth from space with glowing orbital arcs and a futuristic city skyline",
  heroImage: "/images/hero/hero-devices-hd.webp",
  heroImageAlt:
    "Laptop and smartphone on a dark surface with golden light trails and mountain landscape on screen",
  laptopScreenImage: "/images/hero/mountain-landscape.webp",
  laptopScreenAlt: "Moody mountain landscape on laptop screen mockup",
  laptopScreenLines: ["Strategy.", "Design.", "Growth.", "Impact."],
  excellenceBadge: {
    value: "5+",
    label: "Years of Excellence",
  },
} as const;

export const heroFeatures = [
  "Custom Solutions",
  "Proven Results",
  "Transparent Process",
  "Ongoing Support",
] as const;

export const heroStatCards = {
  revenueGrowth: {
    label: "Revenue Growth",
    value: "+$2.45M",
    delta: "↑ 125% vs last 6 months",
  },
  clientSatisfaction: {
    label: "Client Satisfaction",
    value: "98%",
  },
  activeProjects: {
    label: "Active Projects",
    value: "24",
    note: "On Going",
    extra: "+6",
  },
} as const;

export const heroPerformanceOverview = {
  title: "Performance Overview",
  period: "Last 6 Months",
  metricLabel: "Total Revenue",
  metricValue: "$2.45M",
  delta: "↑ 125% vs last 6 months",
  chartPeak: "$2.45M",
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] as const,
  kpis: [
    { id: "traffic", label: "Website Traffic", value: "215K", delta: "↑ 32%" },
    { id: "leads", label: "Leads Generated", value: "12.5K", delta: "↑ 154%" },
    { id: "conversion", label: "Conversion Rate", value: "6.8%", delta: "↑ 52%" },
    { id: "roi", label: "Avg. ROI", value: "420%", delta: "↑ 88%" },
  ] as const,
} as const;

export const heroTrustStats: TrustStat[] = [
  {
    id: "projects",
    value: "250+",
    label: "Projects Delivered",
  },
  {
    id: "industries",
    value: "50+",
    label: "Industries Served",
  },
  {
    id: "satisfaction",
    value: "98%",
    label: "Client Satisfaction",
  },
  {
    id: "experience",
    value: "5+",
    label: "Years of Excellence",
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
