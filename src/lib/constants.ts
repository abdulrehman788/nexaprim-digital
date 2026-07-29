import type { FooterColumn, NavLink, SiteConfig, SocialLink } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Expandova",
  legalName: "Expandova LLC",
  description:
    "Expandova is a digital growth company that blends strategy, branding, technology, AI, marketing, and automation to help businesses expand.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://expandova.com",
  locale: "en_US",
  email: "info@expandova.com",
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
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Twitter", href: "https://twitter.com" },
];

export const footerTagline =
  "Expandova turns complex digital strategies into measurable wins. We cut the noise and amplify your growth.";

export const footerQuickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Digital Strategy", href: "/services/digital-strategy" },
  { label: "Search Engine Optimization", href: "/services/seo-content" },
  { label: "Pay Per Click", href: "/services/paid-media" },
  { label: "Social Media Marketing", href: "/services/social-media" },
  { label: "Brand & Creative Design", href: "/services/brand-creative" },
  { label: "Web Development", href: "/services/web-development" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "All-in-One Package", href: "/packages/all-in-one" },
      { label: "Enterprise", href: "/packages/enterprise" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "Shopify Web Design", href: "/services/shopify-development" },
      { label: "eCommerce Web Design", href: "/services/ecommerce-web-design" },
      { label: "Search Engine Optimization", href: "/services/seo-content" },
      { label: "Pay Per Click", href: "/services/paid-media" },
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
  consultation: "/book",
  strategyCall: "/book",
  freeConsultation: "/book",
  showreel: "/showreel",
  caseStudies: "/case-studies",
  methodologies: "/about",
  industries: "/industries",
} as const;
