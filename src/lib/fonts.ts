import { DM_Sans, Playfair_Display, Syne } from "next/font/google";

/** Section headings & UI labels */
export const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/** Hero headlines — elegant serif per design mockups */
export const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/** Body copy & UI */
export const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const fontVariables = `${fontDisplay.variable} ${fontSerif.variable} ${fontSans.variable}`;
