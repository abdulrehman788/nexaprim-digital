import type { IndustryIconId } from "@/types";

type AccentShape = "bars" | "circle" | "ring" | "grid" | "wave" | "diamond";

export interface CaseStudyTheme {
  iconId: IndustryIconId;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  accentShape: AccentShape;
}

export const caseStudyThemes: Record<string, CaseStudyTheme> = {
  "grand-vista-hotel": {
    iconId: "hotel",
    gradientFrom: "#c9a962",
    gradientVia: "#e8d4a8",
    gradientTo: "#7a5c28",
    accentShape: "bars",
  },
  "meridian-health": {
    iconId: "heart-pulse",
    gradientFrom: "#5b8f8a",
    gradientVia: "#9ec4bf",
    gradientTo: "#2d4f4b",
    accentShape: "ring",
  },
  "urban-table": {
    iconId: "utensils",
    gradientFrom: "#b8895a",
    gradientVia: "#dcc4a8",
    gradientTo: "#6b4423",
    accentShape: "wave",
  },
  "lakeside-realty": {
    iconId: "building",
    gradientFrom: "#6b7c94",
    gradientVia: "#a8b4c4",
    gradientTo: "#3d4a5c",
    accentShape: "grid",
  },
  "brightpath-academy": {
    iconId: "graduation-cap",
    gradientFrom: "#7a6b9e",
    gradientVia: "#b8aed4",
    gradientTo: "#453a62",
    accentShape: "diamond",
  },
  "nova-commerce": {
    iconId: "shopping-cart",
    gradientFrom: "#c17f59",
    gradientVia: "#e0b49a",
    gradientTo: "#7a4530",
    accentShape: "circle",
  },
};

export const defaultCaseStudyTheme: CaseStudyTheme = {
  iconId: "building",
  gradientFrom: "#6b7c94",
  gradientVia: "#a8b4c4",
  gradientTo: "#3d4a5c",
  accentShape: "bars",
};

export function getCaseStudyTheme(slug: string): CaseStudyTheme {
  return caseStudyThemes[slug] ?? defaultCaseStudyTheme;
}

const industryThemeById: Record<string, CaseStudyTheme> = {
  hospitality: caseStudyThemes["grand-vista-hotel"]!,
  healthcare: caseStudyThemes["meridian-health"]!,
  restaurants: caseStudyThemes["urban-table"]!,
  "real-estate": caseStudyThemes["lakeside-realty"]!,
  education: caseStudyThemes["brightpath-academy"]!,
  ecommerce: caseStudyThemes["nova-commerce"]!,
};

export function getIndustryTheme(industryId: string): CaseStudyTheme {
  return industryThemeById[industryId] ?? defaultCaseStudyTheme;
}
