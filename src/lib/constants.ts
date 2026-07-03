import type { FooterColumn, NavLink, SiteConfig, SocialLink } from "@/types";

export const siteConfig: SiteConfig = {
  name: "NexaPrime Digital",
  legalName: "NexaPrime Digital LLC",
  description:
    "Premium digital marketing agency helping mid-market organizations grow with strategy, design, automation, and data-driven marketing that delivers measurable results.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexaprime.digital",
  locale: "en_US",
  email: "hello@nexaprime.digital",
  phone: "+1 (555) 123-4567",
  address: {
    street: "1200 Innovation Drive, Suite 400",
    city: "Austin",
    region: "TX",
    postalCode: "78701",
    country: "US",
  },
};

export const primaryNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact Us", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "Digital Strategy", href: "/services/digital-strategy" },
      { label: "Brand & Creative", href: "/services/brand-creative" },
      { label: "Paid Media & PPC", href: "/services/paid-media" },
      { label: "Marketing Automation", href: "/services/marketing-automation" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Restaurants", href: "/industries/restaurants" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Ecommerce", href: "/industries/ecommerce" },
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Education", href: "/industries/education" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Client Reviews", href: "/reviews" },
      { label: "Packages", href: "/#packages" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export const ctaLinks = {
  consultation: "/contact",
  strategyCall: "/contact?intent=strategy-call",
  showreel: "/showreel",
  caseStudies: "/case-studies",
  methodologies: "/about#methodologies",
  industries: "/industries",
} as const;
