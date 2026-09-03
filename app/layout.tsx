import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ezomod.ai"),
  title: {
    default: "EZOMOD — Autonomous Real Estate Lead Generation & Voice Qualification",
    template: "%s · EZOMOD",
  },
  description:
    "EZOMOD is the autonomous AI agency for real estate. Every inbound lead is dialed in under 45 seconds, qualified on budget, location, timeline and pre-approval, then warm-transferred to your agent with the CRM already updated.",
  keywords: [
    "real estate lead generation",
    "AI voice qualification",
    "speed to lead",
    "ISA automation",
    "outbound call AI",
    "Follow Up Boss automation",
  ],
  openGraph: {
    title: "EZOMOD — Zero Missed Leads. Instant Sub-60s Voice Qualification.",
    description:
      "Autonomous voice agents that dial, qualify and warm-transfer every real estate lead in under 45 seconds.",
    url: "https://ezomod.ai",
    siteName: "EZOMOD",
    type: "website",
    images: [{ url: "/ezomod logo.jpeg", width: 248, height: 224, alt: "EZOMOD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EZOMOD — Autonomous Real Estate Voice Qualification",
    description: "Zero missed leads. Sub-60s voice qualification. Warm transfers on autopilot.",
    images: ["/ezomod logo.jpeg"],
  },
  icons: { icon: "/ezomod logo.jpeg", apple: "/ezomod logo.jpeg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAFCFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${mono.variable}`}>
      <body className="bg-canvas text-ink">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
