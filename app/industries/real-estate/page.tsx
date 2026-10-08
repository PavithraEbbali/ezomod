import type { Metadata } from "next";
import { AlarmClockOff, Check, Database, Timer, UserSearch } from "lucide-react";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import FaqList from "@/components/content/FaqList";
import ReadMore from "@/components/content/ReadMore";
import SectionIntro from "@/components/content/SectionIntro";
import ServiceCards from "@/components/content/ServiceCards";
import JsonLd from "@/components/JsonLd";
import OperationalShift from "@/components/OperationalShift";
import { faqPage } from "@/lib/schema";
import Process from "@/components/Process";
import ButtonLink from "@/components/ui/ButtonLink";
import FollowUpVisual from "@/components/visuals/FollowUpVisual";
import { pageMetadata } from "@/lib/seo";
import { getService, type Service } from "@/lib/services";
import { CONSULTATION_HREF, CTA_LABEL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "AI Automation for Real Estate Teams | Ezomod",
  description:
    "Ezomod builds AI for real estate teams: instant lead follow-up, AI voice qualification, showing booking and Follow Up Boss, Lofty or Salesforce automation.",
  path: "/industries/real-estate",
});

const LINK = "font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]";

const WHO_FOR = [
  "Real estate teams buying online leads from portals and ads",
  "Brokerages that want consistent follow-up across all agents",
  "Teams using Follow Up Boss, Lofty or Salesforce",
  "Agents who are out at showings and can't answer every call",
  "Teams with large databases of old leads to re-engage",
  "Investors and property managers handling many inquiries",
];

const PROBLEM_ICONS = [Timer, UserSearch, AlarmClockOff, Database];

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
          <div className="absolute -left-56 -top-56 h-[760px] w-[760px] bg-[radial-gradient(closest-side,rgba(0,123,255,0.08),transparent)]" />
          <div className="absolute -right-48 top-8 h-[720px] w-[720px] bg-[radial-gradient(closest-side,rgba(34,197,94,0.08),transparent)]" />
        </div>
        <div className="container-x grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="eyebrow">Real estate</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl">
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
          <FollowUpVisual />
        </div>
      </header>

      <section className="section bg-plain">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <SectionIntro eyebrow="How can AI help a real estate team?" title="Every lead answered. Every showing booked.">
              <p>
                AI helps real estate teams respond to every lead instantly, qualify buyers and sellers
                before an agent spends time on them, and keep the CRM complete without manual data
                entry.
              </p>
            </SectionIntro>
            <ReadMore>
              <p>
                Real estate is where our lead follow-up work is most specialised. The system is built
                around how teams actually work: leads from portals and ads, agents who are out at showings, and
                CRMs like Follow Up Boss and Lofty that need to stay accurate. The rest of our
                services, from{" "}
                <Link href="/services/ai-voice-agents" className={LINK}>AI voice agents</Link> to{" "}
                <Link href="/services/crm-automation" className={LINK}>CRM automation</Link>, build on
                the same foundation.
              </p>
            </ReadMore>
          </div>
          <div className="h-fit rounded-2xl border border-l-4 border-[#00A3FF]/20 border-l-[#22C55E] bg-gradient-to-br from-[#F2F8FF] to-[#F0FBF4] p-6 shadow-[0_10px_30px_-12px_rgba(0,30,70,0.10)] sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Who is it for?</h2>
            <p className="mt-1 text-slate-700">Ezomod works with real estate businesses such as:</p>
            <ul className="mt-5 space-y-3">
              {WHO_FOR.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-slate-800">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#22C55E]/15 text-[#15803D]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="container-x">
          <SectionIntro eyebrow="Common problems we fix" title="Built for how real estate teams actually work.">
            <p>The problems real estate teams most often ask us to fix.</p>
          </SectionIntro>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((item, i) => {
              const Icon = PROBLEM_ICONS[i];
              return (
                <li key={item.title} className="lift-card">
                  <span className="icon-circle bg-[#22C55E]/15 text-[#15803D]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <OperationalShift />

      <Process
        dark
        eyebrow="How setup works"
        title="Live within weeks, with your team in control."
      />

      <section className="section bg-plain">
        <div className="container-x">
          <SectionIntro eyebrow="Ezomod services for real estate" title="The AI services real estate teams use most.">
            <p>The services real estate teams use most.</p>
          </SectionIntro>
          <div className="mt-10">
            <ServiceCards services={services} visual />
          </div>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <SectionIntro compact eyebrow="FAQ" title="Real estate AI: frequently asked questions" />
          <FaqList faqs={FAQS} />
        </div>
      </section>

      <ContactSection title="See what Ezomod would build for your team" />
    </>
  );
}
