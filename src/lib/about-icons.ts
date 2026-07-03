import { BarChart2, Crosshair, KeyRound, Users } from "lucide-react";

import type { AboutPrincipleIconId } from "@/types";

export const aboutPrincipleIcons = {
  key: KeyRound,
  "bar-chart": BarChart2,
  users: Users,
  scope: Crosshair,
} satisfies Record<AboutPrincipleIconId, typeof KeyRound>;
