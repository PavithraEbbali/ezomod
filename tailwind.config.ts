import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: { DEFAULT: "#FAFCFF", sunk: "#F3F7FA", deep: "#EDF3F8" },
        ink: { DEFAULT: "#090D1A", soft: "#1B2437" },
        steel: { DEFAULT: "#475569", light: "#64748B", faint: "#94A3B8" },
        line: "#E2E8F0",
        azure: { DEFAULT: "#007BFF", light: "#00A3FF", deep: "#0060CC", wash: "#EBF5FF" },
        spring: { DEFAULT: "#22C55E", deep: "#10B981" },
      },
      backgroundImage: {
        brand: "linear-gradient(135deg, #007BFF 0%, #00A3FF 45%, #22C55E 100%)",
      },
      keyframes: {
        wave: { "0%,100%": { transform: "scaleY(0.35)" }, "50%": { transform: "scaleY(1)" } },
        dash: { to: { strokeDashoffset: "-16" } },
      },
      animation: {
        wave: "wave 1.1s ease-in-out infinite",
        dash: "dash 0.9s linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
