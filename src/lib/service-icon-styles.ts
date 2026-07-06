export interface ServiceIconStyle {
  iconClass: string;
  bgClass: string;
  glowClass: string;
}

export const serviceIconStyles: Record<string, ServiceIconStyle> = {
  "digital-strategy": {
    iconClass: "text-amber-400",
    bgClass: "bg-amber-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(251,191,36,0.3)]",
  },
  "seo-content": {
    iconClass: "text-cyan-400",
    bgClass: "bg-cyan-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(34,211,238,0.3)]",
  },
  "paid-media": {
    iconClass: "text-blue-400",
    bgClass: "bg-blue-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(96,165,250,0.3)]",
  },
  "social-media": {
    iconClass: "text-fuchsia-400",
    bgClass: "bg-fuchsia-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(232,121,249,0.3)]",
  },
  "brand-creative": {
    iconClass: "text-orange-400",
    bgClass: "bg-orange-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(251,146,60,0.3)]",
  },
  "marketing-automation": {
    iconClass: "text-emerald-400",
    bgClass: "bg-emerald-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(52,211,153,0.3)]",
  },
  "web-development": {
    iconClass: "text-sky-400",
    bgClass: "bg-sky-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(56,189,248,0.3)]",
  },
  "custom-website-design": {
    iconClass: "text-blue-400",
    bgClass: "bg-blue-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(96,165,250,0.3)]",
  },
  "shopify-development": {
    iconClass: "text-emerald-400",
    bgClass: "bg-emerald-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(52,211,153,0.3)]",
  },
  "wordpress-development": {
    iconClass: "text-cyan-400",
    bgClass: "bg-cyan-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(34,211,238,0.3)]",
  },
  "website-hosting": {
    iconClass: "text-slate-300",
    bgClass: "bg-slate-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(148,163,184,0.3)]",
  },
  "software-development": {
    iconClass: "text-violet-400",
    bgClass: "bg-violet-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(167,139,250,0.3)]",
  },
  "graphics-design": {
    iconClass: "text-violet-400",
    bgClass: "bg-violet-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(167,139,250,0.3)]",
  },
  "local-seo": {
    iconClass: "text-emerald-400",
    bgClass: "bg-emerald-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(52,211,153,0.3)]",
  },
  "seo-content-writing": {
    iconClass: "text-purple-400",
    bgClass: "bg-purple-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(192,132,252,0.3)]",
  },
  "ecommerce-seo": {
    iconClass: "text-cyan-400",
    bgClass: "bg-cyan-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(34,211,238,0.3)]",
  },
  "ecommerce-ppc": {
    iconClass: "text-blue-400",
    bgClass: "bg-blue-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(96,165,250,0.3)]",
  },
  "social-media-management": {
    iconClass: "text-fuchsia-400",
    bgClass: "bg-fuchsia-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(232,121,249,0.3)]",
  },
  "social-media-advertising": {
    iconClass: "text-pink-400",
    bgClass: "bg-pink-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(244,114,182,0.3)]",
  },
  "ecommerce-web-design": {
    iconClass: "text-teal-400",
    bgClass: "bg-teal-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(45,212,191,0.3)]",
  },
  "website-design": {
    iconClass: "text-indigo-400",
    bgClass: "bg-indigo-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(129,140,248,0.3)]",
  },
};

export const defaultServiceIconStyle: ServiceIconStyle = {
  iconClass: "text-gold-400",
  bgClass: "bg-gold-400/12",
  glowClass: "shadow-[0_0_24px_-6px_rgba(197,163,88,0.3)]",
};

export function getServiceIconStyle(serviceId: string): ServiceIconStyle {
  return serviceIconStyles[serviceId] ?? defaultServiceIconStyle;
}
