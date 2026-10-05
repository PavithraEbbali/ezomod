import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import SectionIntro from "@/components/content/SectionIntro";
import ServiceIcon from "@/components/content/ServiceIcon";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { serviceList } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { SERVICES, servicePath } from "@/lib/services";

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
      <PageHeader title="AI automation services">
        <p>
          Ezomod designs, builds and maintains AI systems that win more leads and remove repetitive
          work. Every service is built around your existing tools and process, and you can start
          with one and add more later.
        </p>
      </PageHeader>

      <section className="section">
        <div className="container-x">
          <SectionIntro title="What services does Ezomod offer?">
            <p>Ezomod offers eight services, grouped around winning leads, automating work and your website.</p>
          </SectionIntro>
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {SERVICES.map((service) => (
              <li key={service.slug} className="card flex flex-col p-6 sm:p-8">
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
                <p className="mt-4 font-medium text-slate-800">{service.definition}</p>
                <p className="mt-3 flex-1 leading-relaxed text-slate-600">{service.summary}</p>
                <Link href={servicePath(service.slug)} className="mt-5 text-sm font-medium text-[#0062CC] hover:underline">
                  Learn more about {service.navLabel} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-y border-[#00A3FF]/10 bg-white/60">
        <div className="container-x">
          <SectionIntro title="Which service do I need?">
            <p>Start from the problem you want to solve. If several apply, we will help you decide what to do first on the call.</p>
          </SectionIntro>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
            <table className="w-full min-w-[520px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">If this sounds like you…</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Start with</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80">
                {CHOOSER.map((row) => {
                  const service = SERVICES.find((s) => s.slug === row.slug)!;
                  return (
                    <tr key={row.slug}>
                      <td className="px-5 py-4 text-slate-700">{row.need}</td>
                      <td className="px-5 py-4">
                        <Link href={servicePath(row.slug)} className="font-medium text-[#0062CC] hover:underline">
                          {service.name}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
