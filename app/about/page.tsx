import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import CheckList from "@/components/content/CheckList";
import SectionIntro from "@/components/content/SectionIntro";
import Differentiator from "@/components/Differentiator";
import PageHeader from "@/components/PageHeader";
import Process from "@/components/Process";
import { HOW_WE_WORK } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";
import { SERVICES, servicePath } from "@/lib/services";
import { CONTACT_EMAIL, CONTACT_HREF, LINKEDIN_URL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Ezomod | AI Automation Agency",
  description:
    "Ezomod is an AI automation agency that builds AI lead generation, follow-up, voice agents, workflows and websites. Learn what we do and how we work.",
  path: "/about",
});

const LINK = "font-medium text-[#007BFF] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]";

const TEAM = [
  { name: "{{TODO: founder name}}", role: "{{TODO: role, e.g. Founder}}", bio: "{{TODO: one or two sentences about background}}" },
  { name: "{{TODO: team member name}}", role: "{{TODO: role}}", bio: "{{TODO: one or two sentences about background}}" },
];

const PRINCIPLES = [
  "Built around your process, not a template",
  "Works inside the CRM and tools you already use",
  "Your team reviews and approves each stage",
  "Maintained and improved after launch",
  "Plain-English communication, no jargon",
  "You keep ownership of your data",
];

export default function Page() {
  const facts: [string, ReactNode][] = [
    ["Company name", "Ezomod (also written EZOMOD)"],
    ["What we are", "An AI automation agency"],
    ["What we do", "Design, build and maintain AI systems for lead generation, lead follow-up, phone calls, workflows, CRMs, customer support and websites"],
    ["Specialisation", "AI lead follow-up for real estate teams and brokerages"],
    ["Founded", "{{TODO: year founded}}"],
    ["Founder", "{{TODO: founder name}}"],
    ["Location", "{{TODO: city, country}}. We work with clients remotely."],
    ["Website", <a key="w" href={SITE_URL} className={LINK}>www.ezomod.com</a>],
    ["Email", <a key="e" href={CONTACT_HREF} className={`${LINK} break-all`}>{CONTACT_EMAIL}</a>],
    ["LinkedIn", <a key="l" href={LINKEDIN_URL} className={LINK} rel="noopener">linkedin.com/company/ezomod</a>],
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "About" }]} />
      <PageHeader title="About Ezomod">
        <p>
          Ezomod is an AI automation agency that designs, builds and maintains AI systems for
          businesses, so they can respond to every lead faster and spend less time on repetitive
          work.
        </p>
      </PageHeader>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <SectionIntro title="What is Ezomod?">
            <p>
              Ezomod builds custom AI systems that work inside the tools a business already uses. We
              don&apos;t sell another software subscription. Instead, we map how your team works,
              build the system around it, and keep it running after launch.
            </p>
            <p>Ezomod&apos;s services are:</p>
            <ul className="list-disc space-y-1 pl-5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={servicePath(s.slug)} className={LINK}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              Our AI lead follow-up service started with real estate teams, and real estate is still
              where it is most specialised. See{" "}
              <Link href="/industries/real-estate" className={LINK}>
                AI automation for real estate
              </Link>
              .
            </p>
          </SectionIntro>

          <div className="h-fit rounded-2xl border border-slate-200/80 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Ezomod at a glance</h2>
            <dl className="mt-4 divide-y divide-slate-200/80 text-sm">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[110px_1fr] gap-4 py-3">
                  <dt className="font-medium text-slate-500">{label}</dt>
                  <dd className="text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section border-y border-[#00A3FF]/10 bg-white/60">
        <div className="container-x">
          <SectionIntro title="What is Ezomod's mission?">
            <p>
              Our mission is to make AI genuinely useful for everyday businesses: systems that answer
              every lead quickly, take repetitive work off people&apos;s plates, and fit the way a
              team already works instead of forcing a new one.
            </p>
          </SectionIntro>
          <div className="mt-8">
            <CheckList items={PRINCIPLES} />
          </div>
        </div>
      </section>

      <Differentiator />

      <Process
        id="how-we-work"
        title="How does Ezomod work with clients?"
        intro="Every project follows the same clear steps. We do the technical work; your team reviews and approves each stage."
        steps={HOW_WE_WORK}
      />

      <section className="section">
        <div className="container-x">
          <SectionIntro title="Who is on the Ezomod team?">
            <p>{"{{TODO: one sentence about the team, e.g. size and background}}"}</p>
          </SectionIntro>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <li key={member.name} className="rounded-2xl border border-slate-200/80 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="text-sm font-medium text-[#007BFF]">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-[#00A3FF]/10 bg-white/60">
        <div className="container-x">
          <SectionIntro title="How can I contact Ezomod?">
            <p>
              Email <a href={CONTACT_HREF} className={`${LINK} break-all`}>{CONTACT_EMAIL}</a>,
              follow Ezomod on{" "}
              <a href={LINKEDIN_URL} className={LINK} rel="noopener">
                LinkedIn
              </a>
              , or{" "}
              <Link href="/contact" className={LINK}>
                book a free 30-minute call
              </Link>
              . You can also read the{" "}
              <Link href="/faq" className={LINK}>
                Ezomod FAQ
              </Link>
              .
            </p>
          </SectionIntro>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
