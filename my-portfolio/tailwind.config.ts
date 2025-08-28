import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
      },
      ringColor: {
        DEFAULT: "rgb(var(--brand) / <alpha-value>)",
      },
      fontFamily: {
        cinzel: ["Craw Modern", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
