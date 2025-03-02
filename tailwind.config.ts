import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "[data-theme='dark']"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "xl": "1.25rem",  // 20px
        "2xl": "1.5rem",  // 24px
        "3xl": "1.875rem", // 30px
      },
      letterSpacing: {
        tighter: "-0.05em",
      },
      lineHeight: {
        relaxed: "1.625",
      },
    },
  },
  plugins: [],
};

export default config;
