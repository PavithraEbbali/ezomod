import type { Metadata } from "next";
import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Chips from "@/components/content/Chips";
import FaqList from "@/components/content/FaqList";
import SectionIntro from "@/components/content/SectionIntro";
import ServiceCards from "@/components/content/ServiceCards";
import Differentiator from "@/components/Differentiator";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import Process from "@/components/Process";
import TrustSection from "@/components/TrustSection";
import { faqPage, professionalService } from "@/lib/schema";
import { HOW_WE_WORK } from "@/lib/company";
import { HOME_FAQS } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Ezomod | AI Automation Agency for Leads, Agents & Workflows",
  description: SITE_DESCRIPTION,
  path: "/",
});

const LINK = "font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]";

const OTHER_INDUSTRIES = [
  "Professional services",
  "Home and local services",
  "E-commerce",
  "Agencies",
  "SaaS and technology",
];

export default function Page() {
  return (
    <>
      <JsonLd data={[professionalService(), faqPage(HOME_FAQS)]} />
      <Hero />

      <section id="services" className="section">
        <div className="container-x">
          <SectionIntro title="What does Ezomod build?">
            <p>
              Ezomod builds AI systems that win more leads and remove repetitive work, from finding
              new prospects to answering every call and keeping your CRM up to date.
            </p>
          </SectionIntro>
          <div className="mt-10">
            <ServiceCards />
          </div>
          <p className="mt-8">
            <Link href="/services" className={LINK}>
              Compare all Ezomod services
            </Link>
          </p>
        </div>
      </section>

      <Differentiator />

      <section id="industries" className="section">
        <div className="container-x">
          <SectionIntro title="Which industries does Ezomod work with?">
            <p>
              Ezomod works with any business that relies on leads, phone calls or repetitive admin.
              Our deepest specialisation is real estate.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <Link href="/industries/real-estate" className="card group flex flex-col p-6 sm:p-8">
              <span className="icon-tile w-fit">
                <Building2 className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">Real estate teams and brokerages</h3>
              <p className="mt-2 leading-relaxed text-slate-600">
                Instant AI follow-up for portal and ad leads, buyer and seller qualification on the
                phone, showings booked on your calendar, and automation inside Follow Up Boss, Lofty
                and Salesforce.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#0062CC]">
                AI automation for real estate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Also a good fit for</h3>
              <div className="mt-4">
                <Chips items={OTHER_INDUSTRIES} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Process
        title="How does Ezomod work?"
        intro="Every project follows four clear steps. We do the technical work; your team reviews and approves each stage."
        steps={HOW_WE_WORK}
      />

      <TrustSection />

      <section id="faq" className="section">
        <div className="container-x">
          <SectionIntro title="Frequently asked questions about Ezomod" />
          <div className="mt-8 max-w-3xl">
            <FaqList faqs={HOME_FAQS} />
          </div>
          <p className="mt-6">
            <Link href="/faq" className={LINK}>
              See all questions in the Ezomod FAQ
            </Link>
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
