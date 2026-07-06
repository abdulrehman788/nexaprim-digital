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
  { label: "Book a Call", href: "/book" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Twitter", href: "https://twitter.com" },
];

export const footerTagline =
  "NexaPrime Digital turns complex digital strategies into measurable wins. We cut the noise and amplify your growth.";

export const footerQuickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
  { label: "Book a Call", href: "/book" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Digital Strategy", href: "/services/digital-strategy" },
  { label: "Search Engine Optimization", href: "/services/seo-content" },
  { label: "Local SEO", href: "/services/local-seo" },
  { label: "Pay Per Click", href: "/services/paid-media" },
  { label: "Social Media Marketing", href: "/services/social-media" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Website Design", href: "/services/website-design" },
  { label: "eCommerce Web Design", href: "/services/ecommerce-web-design" },
  { label: "Shopify Web Design", href: "/services/shopify-development" },
  { label: "WordPress Website Design", href: "/services/wordpress-development" },
  { label: "Graphic Design", href: "/services/graphics-design" },
  { label: "Marketing Automation", href: "/services/marketing-automation" },
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
  methodologies: "/about#methodologies",
  industries: "/industries",
} as const;
