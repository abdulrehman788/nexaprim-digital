import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface TrustStat {
  id: string;
  value: string;
  label: string;
  icon: LucideIcon;
}

export type IndustryIconId =
  | "hotel"
  | "utensils"
  | "graduation-cap"
  | "heart-pulse"
  | "building"
  | "shopping-cart";

export interface Industry {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  imageAlt: string;
  iconId: IndustryIconId;
}

export interface IndustryCapability {
  title: string;
  description: string;
}

export interface IndustryDetail extends Industry {
  headline: string;
  description: string;
  painPoints: string[];
  capabilities: IndustryCapability[];
  proofPoint: string;
  relatedCaseStudySlug?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  imageAlt: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  accentShape: "bars" | "circle" | "ring" | "grid" | "wave" | "diamond";
}

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceDetail extends Service {
  headline: string;
  longDescription: string;
  deliverables: ServiceDeliverable[];
  outcomes: string[];
  idealFor: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
  badge?: string;
}

export interface PackageFeature {
  title: string;
  description: string;
}

export interface PackageDetail extends Package {
  headline: string;
  longDescription: string;
  includes: PackageFeature[];
  idealFor: string;
  timeline: string;
}

export interface WhyUsFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  id: string;
  headline: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  industry: string;
}

export interface ClientReview {
  id: string;
  client: string;
  author: string;
  role: string;
  industry: string;
  rating: number;
  engagement: string;
  reviewed: string;
  body: string;
  highlight: string;
  caseStudySlug?: string;
}

export interface CaseStudyStat {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  industry: string;
  headline: string;
  summary: string;
  image: string;
  imageAlt: string;
  stats: CaseStudyStat[];
  challenge: string;
  approach: string[];
  outcome: string;
  quote?: string;
  quoteAuthor?: string;
}

export interface Client {
  id: string;
  name: string;
  tagline?: string;
  logo: string;
  logoAlt: string;
}

export interface CTABenefit {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactIntentOption {
  value: string;
  label: string;
}

export interface AboutPrinciple {
  id: string;
  title: string;
  body: string;
  iconId: AboutPrincipleIconId;
}

export type AboutPrincipleIconId = "key" | "bar-chart" | "users" | "scope";

export interface AboutMethodologyStep {
  id: string;
  step: string;
  title: string;
  body: string;
}

export interface AboutStat {
  id: string;
  value: string;
  label: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SiteConfig {
  name: string;
  legalName: string;
  description: string;
  url: string;
  locale: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
}
