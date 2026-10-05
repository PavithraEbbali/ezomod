import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import CheckList from "@/components/content/CheckList";
import FaqList from "@/components/content/FaqList";
import ItemGrid from "@/components/content/ItemGrid";
import SectionIntro from "@/components/content/SectionIntro";
import ServiceCards from "@/components/content/ServiceCards";
import HeroTelemetry from "@/components/HeroTelemetry";
import JsonLd from "@/components/JsonLd";
import OperationalShift from "@/components/OperationalShift";
import { faqPage } from "@/lib/schema";
import Process from "@/components/Process";
import ButtonLink from "@/components/ui/ButtonLink";
import { pageMetadata } from "@/lib/seo";
import { getService, type Service } from "@/lib/services";
import { CONSULTATION_HREF, CTA_LABEL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "AI Automation for Real Estate Teams | Ezomod",
  description:
    "Ezomod builds AI for real estate teams: instant lead follow-up, AI voice qualification, showing booking and Follow Up Boss, Lofty or Salesforce automation.",
  path: "/industries/real-estate",
});

const LINK = "font-medium text-[#007BFF] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]";

const PROBLEMS = [
  {
    title: "Online leads go cold before anyone calls",
    text: "Portal and ad leads often inquire at night or on weekends. Ezomod's system calls them within about thirty seconds, every time.",
  },
  {
    title: "Agents can't qualify every inquiry",
    text: "The AI asks about budget, pre-approval, timeline and neighbourhoods, so agents only spend time on buyers and sellers who are ready.",
  },
  {
    title: "Long-term leads get forgotten",
    text: "Leads who say \"call me in three months\" are followed up on the promised date, with relevant listings sent in between.",
  },
  {
    title: "CRM records are incomplete",
    text: "Recordings, transcripts, tags and appointments are written to Follow Up Boss, Lofty or Salesforce automatically.",
  },
];

const FAQS = [
  {
    q: "What does Ezomod do for real estate teams?",
    a: "Ezomod builds AI systems that call, text and email every new buyer and seller lead within seconds, qualify them on the phone, book showings on your team's calendar and keep your CRM up to date. Everything runs inside the CRM your agents already use.",
  },
  {
    q: "Does it work with Follow Up Boss and Lofty?",
    a: "Yes. Ezomod builds directly inside Follow Up Boss, Lofty and Salesforce. Notes, tags, call recordings, transcripts and appointments land on the contact record, so agents see everything in one place.",
  },
  {
    q: "Which lead sources can it handle?",
    a: "Leads from Meta Ads, Google Local Services Ads, property portals, your IDX website and other sources with an API or webhook. Each lead is contacted in under 30 seconds and tagged with its source.",
  },
  {
    q: "Can the AI answer questions about properties and neighbourhoods?",
    a: "Yes. The AI can answer common local questions, such as HOA fees, tax rates and recent sales, using the information you provide, and hand over to an agent for anything it should not answer.",
  },
  {
    q: "How long does it take to go live?",
    a: "Most teams are live within a few weeks. We connect your CRM, phone numbers and lead sources, write the scripts with you, and your agents listen to test calls and sign off before launch.",
  },
];

export default function Page() {
  const services = ["ai-lead-follow-up", "ai-voice-agents", "crm-automation", "ai-lead-generation"]
    .map(getService)
    .filter((s): s is Service => Boolean(s));

  return (
    <>
      <JsonLd data={faqPage(FAQS)} />
      <Breadcrumbs items={[{ name: "Industries" }, { name: "Real Estate", path: "/industries/real-estate" }]} />

      <header className="relative isolate overflow-hidden border-b border-[#00A3FF]/10">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[rgba(0,123,255,0.08)] blur-3xl" />
          <div className="absolute -right-32 top-24 h-[480px] w-[480px] rounded-full bg-[rgba(34,197,94,0.08)] blur-3xl" />
        </div>
        <div className="container-x grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl">
              AI automation for <span className="text-brand">real estate teams</span>
            </h1>
            <p className="lead mt-6 max-w-xl">
              Ezomod builds AI systems for real estate teams and brokerages that call, text and email
              every new lead, follow up until they answer, and put qualified showings on your
              team&apos;s calendar, all inside the CRM you already use.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={CONSULTATION_HREF}>{CTA_LABEL}</ButtonLink>
              <ButtonLink href="/services/ai-lead-follow-up" variant="secondary">
                See AI lead follow-up
              </ButtonLink>
            </div>
          </div>
          <HeroTelemetry />
        </div>
      </header>

      <section className="section">
        <div className="container-x">
          <SectionIntro title="How can AI help a real estate team?">
            <p>
              AI helps real estate teams respond to every lead instantly, qualify buyers and sellers
              before an agent spends time on them, and keep the CRM complete without manual data
              entry.
            </p>
            <p>
              Real estate is where our lead follow-up work is most specialised. The system is built
              around how teams actually work: leads from portals and ads, agents who are out at showings, and
              CRMs like Follow Up Boss and Lofty that need to stay accurate. The rest of our
              services, from{" "}
              <Link href="/services/ai-voice-agents" className={LINK}>AI voice agents</Link> to{" "}
              <Link href="/services/crm-automation" className={LINK}>CRM automation</Link>, build on
              the same foundation.
            </p>
          </SectionIntro>
          <div className="mt-10">
            <ItemGrid items={PROBLEMS} columns={2} />
          </div>
        </div>
      </section>

      <OperationalShift />

      <section className="section">
        <div className="container-x">
          <SectionIntro title="Who is it for?">
            <p>Ezomod works with real estate businesses such as:</p>
          </SectionIntro>
          <div className="mt-8">
            <CheckList
              items={[
                "Real estate teams buying online leads from portals and ads",
                "Brokerages that want consistent follow-up across all agents",
                "Teams using Follow Up Boss, Lofty or Salesforce",
                "Agents who are out at showings and can't answer every call",
                "Teams with large databases of old leads to re-engage",
                "Investors and property managers handling many inquiries",
              ]}
            />
          </div>
        </div>
      </section>

      <Process />

      <section className="section">
        <div className="container-x">
          <SectionIntro title="Ezomod services for real estate">
            <p>The services real estate teams use most.</p>
          </SectionIntro>
          <div className="mt-10">
            <ServiceCards services={services} />
          </div>
        </div>
      </section>

      <section className="section border-y border-[#00A3FF]/10 bg-white/60">
        <div className="container-x">
          <SectionIntro title="Real estate AI: frequently asked questions" />
          <div className="mt-8 max-w-3xl">
            <FaqList faqs={FAQS} />
          </div>
        </div>
      </section>

      <ContactSection title="See what Ezomod would build for your team" />
    </>
  );
}
