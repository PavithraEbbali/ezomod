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

const DESCRIPTION =
  "EZOMOD deploys autonomous omnichannel AI agents that orchestrate neural voice calls, WhatsApp, SMS, and email to qualify buyers, handle complex objections, escalate ghosted contacts, and book pipeline 24/7.";

/**
 * Absolute base for OG/Twitter asset URLs. Set NEXT_PUBLIC_SITE_URL once a custom
 * domain is attached; otherwise preview builds resolve against their own Vercel URL.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://ezomod.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EZOMOD — Autonomous Omnichannel Lead Management & Client Operations AI",
    template: "%s · EZOMOD",
  },
  description: DESCRIPTION,
  keywords: [
    "autonomous revenue operations",
    "omnichannel AI agent",
    "speed to lead",
    "neural voice qualification",
    "WhatsApp Business API automation",
    "lead escalation",
    "Tier-1 client support automation",
    "payment dunning automation",
    "Follow Up Boss automation",
  ],
  openGraph: {
    title: "EZOMOD — Every Lead. Every Channel. Contacted in Under 30 Seconds.",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "EZOMOD",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "EZOMOD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EZOMOD — Autonomous Omnichannel RevOps Engine",
    description:
      "Neural voice, WhatsApp, SMS and email orchestrated by one agent — from first inbound signal to post-close client desk.",
    images: ["/logo.png"],
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
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
