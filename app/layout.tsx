import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { OG_IMAGE } from "@/lib/seo";
import { SERVICES, servicePath } from "@/lib/services";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Ezomod | AI Automation Agency for Leads, Agents & Workflows",
    template: "%s | Ezomod",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Ezomod | AI Automation Agency",
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezomod | AI Automation Agency",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
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
        <Navbar services={SERVICES.map((s) => ({ href: servicePath(s.slug), name: s.name }))} />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
