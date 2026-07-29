import type { Client } from "@/types";

/** Partner logos sized for the dark homepage strip (light marks on black). */
export const clients: Client[] = [
  {
    id: "wlpi",
    name: "World Leadership and Policy Institute",
    tagline: "World Leadership & Policy Institute",
    logo: "/images/clients/wlpi-dark.webp?v=10",
    logoAlt: "World Leadership and Policy Institute",
    logoSize: "lg",
  },
  {
    id: "nexus",
    name: "Nexus Public Policy Institute",
    tagline: "Nexus Public Policy Institute",
    logo: "/images/clients/nexus-dark.webp?v=3",
    logoAlt: "Nexus Public Policy Institute",
    logoSize: "md",
  },
  {
    id: "opportunity-station",
    name: "Opportunity Station",
    logo: "/images/clients/opportunity-station-dark.webp?v=6",
    logoAlt: "Opportunity Station",
    logoSize: "lg",
  },
];

export const clientLogosHeading =
  "Trusted by innovators & leaders worldwide";
