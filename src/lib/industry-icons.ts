import {
  Building2,
  GraduationCap,
  HeartPulse,
  Hotel,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";

import type { IndustryIconId } from "@/types";

export const industryIcons = {
  hotel: Hotel,
  utensils: UtensilsCrossed,
  "graduation-cap": GraduationCap,
  "heart-pulse": HeartPulse,
  building: Building2,
  "shopping-cart": ShoppingCart,
} satisfies Record<IndustryIconId, typeof Hotel>;
