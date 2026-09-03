import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: { DEFAULT: "#FAFCFF", sunk: "#F3F7FA", deep: "#EDF3F8" },
        ink: { DEFAULT: "#090D1A", soft: "#1B2437" },
        steel: { DEFAULT: "#475569", light: "#64748B", faint: "#94A3B8" },
        azure: { DEFAULT: "#007BFF", light: "#00A3FF", deep: "#0060CC" },
        aqua: "#06B6D4",
        mint: "#10B981",
        spring: "#22C55E",
        lime: "#84CC16",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: { tightest: "-0.045em" },
      boxShadow: {
        halo: "0 1px 2px rgba(9,13,26,0.04), 0 12px 28px -12px rgba(0,123,255,0.22), 0 40px 80px -40px rgba(34,197,94,0.18)",
        "halo-lg":
          "0 2px 4px rgba(9,13,26,0.04), 0 24px 60px -20px rgba(0,123,255,0.28), 0 70px 120px -60px rgba(34,197,94,0.26)",
        glow: "0 10px 30px -8px rgba(0,123,255,0.45), 0 18px 60px -20px rgba(34,197,94,0.4)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.9)",
      },
      backgroundImage: {
        brand: "linear-gradient(135deg, #007BFF 0%, #00A3FF 28%, #06B6D4 55%, #10B981 78%, #22C55E 100%)",
        "brand-soft":
          "linear-gradient(135deg, rgba(0,123,255,0.12) 0%, rgba(6,182,212,0.12) 50%, rgba(34,197,94,0.12) 100%)",
      },
      transitionTimingFunction: { swift: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        marquee: { from: { transform: "translate3d(0,0,0)" }, to: { transform: "translate3d(-50%,0,0)" } },
        "marquee-reverse": { from: { transform: "translate3d(-50%,0,0)" }, to: { transform: "translate3d(0,0,0)" } },
        pulseRing: {
          "0%": { transform: "scale(0.85)", opacity: "0.7" },
          "70%": { transform: "scale(1.9)", opacity: "0" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        shimmer: { from: { backgroundPosition: "0% 50%" }, to: { backgroundPosition: "200% 50%" } },
      },
      animation: {
        marquee: "marquee var(--marquee-duration,42s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--marquee-duration,42s) linear infinite",
        pulseRing: "pulseRing 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
        floaty: "floaty 7s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
