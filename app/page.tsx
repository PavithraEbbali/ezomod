import type { Metadata } from "next";
import { ArrowRight, Briefcase, Building2, Cpu, Megaphone, ShoppingCart, Wrench, type LucideIcon } from "lucide-react";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import FaqList from "@/components/content/FaqList";
import SectionIntro from "@/components/content/SectionIntro";
import ServiceCards from "@/components/content/ServiceCards";
import Differentiator from "@/components/Differentiator";
import Hero from "@/components/Hero";
import { FlowDiagram } from "@/components/Integrations";
import JsonLd from "@/components/JsonLd";
import Process from "@/components/Process";
import ProofStrip from "@/components/ProofStrip";
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

const OTHER_INDUSTRIES: readonly { name: string; icon: LucideIcon }[] = [
  { name: "Professional services", icon: Briefcase },
  { name: "Home and local services", icon: Wrench },
  { name: "E-commerce", icon: ShoppingCart },
  { name: "Agencies", icon: Megaphone },
  { name: "SaaS and technology", icon: Cpu },
];

export default function Page() {
  return (
    <>
      <JsonLd data={[professionalService(), faqPage(HOME_FAQS)]} />
      <Hero />

      <ProofStrip />

      <section id="services" className="section bg-tint">
        <div className="container-x">
          <SectionIntro eyebrow="What does Ezomod build?" title="Eight AI automation services. One team that builds and runs them.">
            <p>
              Ezomod builds AI systems that win more leads and remove repetitive work, from finding
              new prospects to answering every call and keeping your CRM up to date.
            </p>
          </SectionIntro>
          <div className="mt-10">
            <ServiceCards visual />
          </div>
          <p className="mt-8">
            <Link href="/services" className={LINK}>
              Compare all Ezomod services
            </Link>
          </p>
        </div>
      </section>

      <Differentiator />

      <Process
        dark
        eyebrow="How does Ezomod work?"
        title="Leads in. Booked meetings out."
        intro="Every project follows four clear steps. We do the technical work; your team reviews and approves each stage."
        steps={HOW_WE_WORK}
      >
        <FlowDiagram className="mt-10" />
      </Process>

      <section id="industries" className="section bg-plain">
        <div className="container-x">
          <SectionIntro eyebrow="Which industries does Ezomod work with?" title="Deepest in real estate. Useful anywhere leads matter.">
            <p>
              Ezomod works with any business that relies on leads, phone calls or repetitive admin.
              Our deepest specialisation is real estate.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Link
              href="/industries/real-estate"
              className="group relative isolate flex flex-col overflow-hidden rounded-2xl bg-navy p-6 sm:p-8"
            >
              <div
                aria-hidden
                className="absolute -right-24 -top-24 -z-10 h-72 w-72 bg-[radial-gradient(closest-side,rgba(0,163,255,0.35),transparent)]"
              />
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-[#5CC8FF]">
                <Building2 className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">Real estate teams and brokerages</h3>
              <p className="mt-2 flex-1 leading-relaxed text-white/80">
                Instant AI follow-up for portal and ad leads, buyer and seller qualification on the
                phone, showings booked on your calendar, and automation inside Follow Up Boss, Lofty
                and Salesforce.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                AI automation for real estate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
            <div className="rounded-2xl border border-slate-200/80 bg-[#F8FBFF] p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900">Also a good fit for</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {OTHER_INDUSTRIES.map(({ name, icon: Icon }) => (
                  <li key={name} className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 font-medium text-slate-800">
                    <span className="icon-tile shrink-0 p-2">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    {name}
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="flex h-full min-h-[3.5rem] items-center justify-between gap-3 rounded-xl border border-dashed border-[#00A3FF]/40 px-3.5 py-3 font-medium text-[#0062CC] hover:bg-white"
                  >
                    Another industry? Ask us
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />

      <section id="faq" className="section bg-tint">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div>
            <SectionIntro compact eyebrow="FAQ" title="Frequently asked questions about Ezomod" />
            <p className="body mt-4">
              <Link href="/faq" className={LINK}>
                See all questions in the Ezomod FAQ
              </Link>
            </p>
          </div>
          <FaqList faqs={HOME_FAQS} />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
