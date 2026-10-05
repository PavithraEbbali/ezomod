import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/site";
import ContactSection from "@/components/ContactSection";
import Differentiator from "@/components/Differentiator";
import Hero from "@/components/Hero";
import Integrations from "@/components/Integrations";
import OperationalShift from "@/components/OperationalShift";
import Process from "@/components/Process";
import Services from "@/components/Services";

export const metadata: Metadata = pageMetadata({
  title: "Ezomod | AI Automation Agency for Leads, Agents & Workflows",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Page() {
  return (
    <>
      <Hero />
      <Differentiator />
      <Services />
      <Process />
      <OperationalShift />
      <Integrations />
      <ContactSection />
    </>
  );
}
