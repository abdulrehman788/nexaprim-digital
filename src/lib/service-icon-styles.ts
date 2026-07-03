export interface ServiceIconStyle {
  iconClass: string;
  bgClass: string;
}

export const serviceIconStyles: Record<string, ServiceIconStyle> = {
  "digital-strategy": {
    iconClass: "text-amber-400",
    bgClass: "bg-amber-400/15",
  },
  "seo-content": {
    iconClass: "text-sky-400",
    bgClass: "bg-sky-400/15",
  },
  "paid-media": {
    iconClass: "text-blue-400",
    bgClass: "bg-blue-400/15",
  },
  "social-media": {
    iconClass: "text-fuchsia-400",
    bgClass: "bg-fuchsia-400/15",
  },
  "brand-creative": {
    iconClass: "text-orange-400",
    bgClass: "bg-orange-400/15",
  },
  "marketing-automation": {
    iconClass: "text-emerald-400",
    bgClass: "bg-emerald-400/15",
  },
};

export const defaultServiceIconStyle: ServiceIconStyle = {
  iconClass: "text-gold-400",
  bgClass: "bg-gold-400/15",
};

export function getServiceIconStyle(serviceId: string): ServiceIconStyle {
  return serviceIconStyles[serviceId] ?? defaultServiceIconStyle;
}
