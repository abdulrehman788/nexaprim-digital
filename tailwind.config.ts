import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#05080f",
          900: "#0a0f1a",
          800: "#111827",
          700: "#1a2332",
          600: "#243044",
          500: "#334155",
        },
        gold: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        brand: {
          purple: "#7c3aed",
          orange: "#f97316",
          heading: "#0f172a",
          body: "#475569",
        },
        surface: {
          primary: "var(--color-surface-primary)",
          secondary: "var(--color-surface-secondary)",
          elevated: "var(--color-surface-elevated)",
        },
        content: {
          primary: "var(--color-content-primary)",
          secondary: "var(--color-content-secondary)",
          muted: "var(--color-content-muted)",
          inverse: "var(--color-content-inverse)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          muted: "var(--color-accent-muted)",
        },
        light: {
          DEFAULT: "#ffffff",
          muted: "#f8f7f4",
        },
        border: {
          DEFAULT: "var(--color-border)",
          subtle: "var(--color-border-subtle)",
        },
      },
      fontFamily: {
        display: ["var(--font-sans)", "Arial", "Helvetica Neue", "sans-serif"],
        /** Legacy alias — same Poppins stack as body */
        serif: ["var(--font-sans)", "Arial", "Helvetica Neue", "sans-serif"],
        sans: ["var(--font-sans)", "Arial", "Helvetica Neue", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        34: "8.5rem",
      },
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.5rem",
        md: "0.625rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(5, 8, 15, 0.4)",
        glow:
          "0 0 40px -8px rgba(124, 58, 237, 0.45), 0 0 56px -12px rgba(249, 115, 22, 0.3)",
        card: "0 8px 32px -8px rgba(5, 8, 15, 0.55)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(90deg, #7c3aed 0%, #a855f7 48%, #f97316 100%)",
      },
      maxWidth: {
        content: "72rem",
        prose: "65ch",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
