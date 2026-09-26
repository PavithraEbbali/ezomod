import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const DESCRIPTION =
  "EZOMOD builds custom AI systems inside your existing CRM that call, text, and email every lead, follow up until they respond, and book appointments for your team.";

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
    default: "EZOMOD — Custom AI Lead Management Built Into Your CRM",
    template: "%s · EZOMOD",
  },
  description: DESCRIPTION,
  keywords: [
    "AI lead follow-up",
    "speed to lead",
    "real estate lead management",
    "AI voice calls",
    "CRM automation",
    "Follow Up Boss automation",
  ],
  openGraph: {
    title: "EZOMOD — AI systems that manage your leads from first click to closed deal",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "EZOMOD",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "EZOMOD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EZOMOD — Custom AI Lead Management",
    description: DESCRIPTION,
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
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
