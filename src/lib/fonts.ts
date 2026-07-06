import { DM_Sans, Playfair_Display, Syne } from "next/font/google";

export const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const fontVariables = `${fontDisplay.variable} ${fontSerif.variable} ${fontSans.variable}`;
