import { Poppins } from "next/font/google";

/**
 * Single Poppins load for the whole site (headings + body).
 * Avoids duplicate Google Font requests from two next/font instances.
 */
export const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
});

/** Alias — display styles use the same Poppins family via --font-sans. */
export const fontDisplay = fontSans;

export const fontVariables = fontSans.variable;
