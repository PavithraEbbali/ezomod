import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import SectionIntro from "@/components/content/SectionIntro";
import ServiceIcon from "@/components/content/ServiceIcon";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/ui/ButtonLink";
import ServiceMiniVisual from "@/components/visuals/ServiceMiniVisual";
import { serviceList } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { SERVICES, servicePath } from "@/lib/services";
import { CONSULTATION_HREF, CTA_LABEL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "AI Automation Services | Ezomod",
  description:
    "Explore Ezomod's AI automation services: AI lead generation, lead follow-up, voice agents, multi-agent workflows, CRM automation, chatbots and websites.",
  path: "/services",
});

const CHOOSER = [
  { need: "I need more leads", slug: "ai-lead-generation" },
  { need: "I have leads but respond too slowly", slug: "ai-lead-follow-up" },
  { need: "We miss calls or spend all day on the phone", slug: "ai-voice-agents" },
  { need: "My CRM is messy and nobody updates it", slug: "crm-automation" },
  { need: "My team wastes hours on repetitive admin", slug: "ai-automation" },
  { need: "Our process has many steps across many tools", slug: "multi-agent-ai-workflows" },
  { need: "Customers keep asking the same questions", slug: "ai-chatbots" },
  { need: "Our website is slow or doesn't bring enquiries", slug: "website-development" },
] as const;

export default function Page() {
  return (
    <>
      <JsonLd data={serviceList()} />
      <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
      <PageHeader
        eyebrow="8 services, one team"
        title="AI automation services"
        actions={
          <>
            <ButtonLink href={CONSULTATION_HREF}>{CTA_LABEL}</ButtonLink>
            <ButtonLink href="#which-service" variant="secondary">
              Which service do I need?
            </ButtonLink>
          </>
        }
        aside={
          <ul aria-hidden className="grid grid-cols-4 gap-3">
            {SERVICES.map((service, i) => (
              <li
                key={service.slug}
                className={`grid aspect-square place-items-center rounded-2xl border border-slate-200/70 bg-white text-[#0062CC] shadow-[0_10px_30px_-12px_rgba(0,30,70,0.12)] ${i % 3 === 0 ? "bg-gradient-to-br from-[#EBF5FF] to-[#ECFDF3]" : ""}`}
              >
                <ServiceIcon name={service.icon} className="h-7 w-7" />
              </li>
            ))}
          </ul>
        }
      >
        <p>
          Ezomod designs, builds and maintains AI systems that win more leads and remove repetitive
          work. Every service is built around your existing tools and process, and you can start
          with one and add more later.
        </p>
      </PageHeader>

      <section className="section bg-tint">
        <div className="container-x">
          <SectionIntro eyebrow="What services does Ezomod offer?" title="Win leads. Automate work. Grow online.">
            <p>Ezomod offers eight services, grouped around winning leads, automating work and your website.</p>
          </SectionIntro>
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {SERVICES.map((service) => (
              <li key={service.slug} className="card flex flex-col overflow-hidden">
                <ServiceMiniVisual icon={service.icon} />
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="icon-tile">
                      <ServiceIcon name={service.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-semibold leading-snug text-slate-900">
                      <Link href={servicePath(service.slug)} className="hover:text-[#007BFF]">
                        {service.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="mt-4 font-medium text-slate-900">{service.definition}</p>
                  <p className="mt-3 flex-1 leading-relaxed text-slate-700">{service.summary}</p>
                  <Link href={servicePath(service.slug)} className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-[#0062CC] hover:underline">
                    Learn more about {service.navLabel} →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="which-service" className="section bg-navy">
        <div className="container-x">
          <SectionIntro dark eyebrow="Which service do I need?" title="Find the right AI automation service for your problem.">
            <p>Start from the problem you want to solve. If several apply, we will help you decide what to do first on the call.</p>
          </SectionIntro>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {CHOOSER.map((row) => {
              const service = SERVICES.find((s) => s.slug === row.slug)!;
              return (
                <Link
                  key={row.slug}
                  href={servicePath(row.slug)}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-[#5CC8FF]">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-white/70">If this sounds like you… &ldquo;{row.need}&rdquo;</span>
                    <span className="mt-1 block font-semibold text-white">Start with {service.name}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/70 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
