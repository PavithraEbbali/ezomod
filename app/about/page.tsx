import type { Metadata } from "next";
import {
  Building2,
  CalendarDays,
  Database,
  Globe,
  Home,
  Linkedin,
  Mail,
  MapPin,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import SectionIntro from "@/components/content/SectionIntro";
import ServiceIcon from "@/components/content/ServiceIcon";
import Differentiator from "@/components/Differentiator";
import PageHeader from "@/components/PageHeader";
import Process from "@/components/Process";
import JsonLd from "@/components/JsonLd";
import ButtonLink from "@/components/ui/ButtonLink";
import { HOW_WE_WORK } from "@/lib/company";
import { professionalService } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { SERVICES, servicePath } from "@/lib/services";
import { CONSULTATION_HREF, CONTACT_EMAIL, CONTACT_HREF, CTA_LABEL, LINKEDIN_URL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Ezomod | AI Automation Agency",
  description:
    "Ezomod is an AI automation agency that builds AI lead generation, follow-up, voice agents, workflows and websites. Learn what we do and how we work.",
  path: "/about",
});

const LINK = "font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]";

/** No photos until real ones are provided; the card shows an initials avatar. */
const TEAM = [
  {
    name: "Gowrav K M",
    initials: "GK",
    role: "Founder",
    bio: "Gowrav leads sales and marketing at Ezomod. After using AI to take control of his own clients, deals and follow-ups, he now builds AI agents that work like a member of a business's founding team, helping people grow rather than replacing them.",
  },
];

const PRINCIPLES: readonly { text: string; icon: LucideIcon }[] = [
  { text: "Built around your process, not a template", icon: Route },
  { text: "Works inside the CRM and tools you already use", icon: Database },
  { text: "Your team reviews and approves each stage", icon: UserCheck },
  { text: "Maintained and improved after launch", icon: Wrench },
  { text: "Plain-English communication, no jargon", icon: MessageSquareText },
  { text: "You keep ownership of your data", icon: ShieldCheck },
];

/** Longer facts span two columns so the 3-column grid has no half-empty row. */
const WIDE = new Set(["What we do", "Location"]);

const CARD_ACCENT =
  "h-fit rounded-2xl border border-l-4 border-[#00A3FF]/20 border-l-[#007BFF] bg-gradient-to-br from-[#F2F8FF] to-[#F0FBF4] p-6 shadow-[0_10px_30px_-12px_rgba(0,30,70,0.10)] sm:p-8";

export default function Page() {
  const facts: [string, ReactNode, LucideIcon][] = [
    ["Company name", "Ezomod (also written EZOMOD)", Building2],
    ["What we are", "An AI automation agency", Sparkles],
    ["What we do", "Design, build and maintain AI systems for lead generation, lead follow-up, phone calls, workflows, CRMs, customer support and websites", Wrench],
    ["Specialisation", "AI lead follow-up for real estate teams and brokerages", Home],
    ["Founded", "2026", CalendarDays],
    ["Founder", "Gowrav K M", UserRound],
    ["Location", "Mysuru, Karnataka, India. We work with clients remotely.", MapPin],
    ["Website", <a key="w" href={SITE_URL} className={LINK}>www.ezomod.com</a>, Globe],
    ["Email", <a key="e" href={CONTACT_HREF} className={`${LINK} break-all`}>{CONTACT_EMAIL}</a>, Mail],
    ["LinkedIn", <a key="l" href={LINKEDIN_URL} className={LINK} rel="noopener">linkedin.com/company/ezomod</a>, Linkedin],
  ];

  return (
    <>
      <JsonLd data={professionalService()} />
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      <PageHeader
        eyebrow="AI automation agency"
        title="About Ezomod"
        actions={
          <>
            <ButtonLink href={CONSULTATION_HREF}>{CTA_LABEL}</ButtonLink>
            <ButtonLink href="#at-a-glance" variant="secondary">
              Company facts
            </ButtonLink>
          </>
        }
      >
        <p>
          Ezomod is an AI automation agency that designs, builds and maintains AI systems for
          businesses, so they can respond to every lead faster and spend less time on repetitive
          work.
        </p>
      </PageHeader>

      <section className="section bg-plain">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <SectionIntro eyebrow="What is Ezomod?" title="Custom AI systems, built and run for you.">
            <p>
              Ezomod builds custom AI systems that work inside the tools a business already uses. We
              don&apos;t sell another software subscription. Instead, we map how your team works,
              build the system around it, and keep it running after launch.
            </p>
            <p>
              Real estate is where our lead follow-up work is most specialised. See{" "}
              <Link href="/industries/real-estate" className={LINK}>
                AI automation for real estate
              </Link>
              .
            </p>
          </SectionIntro>
          <div className={CARD_ACCENT}>
            <p className="font-semibold text-slate-900">Ezomod&apos;s services are:</p>
            <ul className="mt-3 space-y-1">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={servicePath(s.slug)}
                    className="flex min-h-11 items-center gap-3 rounded-lg px-2 py-1.5 font-medium text-slate-800 hover:bg-white hover:text-[#0062CC]"
                  >
                    <span className="icon-tile shrink-0 p-2">
                      <ServiceIcon name={s.icon} className="h-4 w-4" />
                    </span>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="at-a-glance" className="section bg-tint">
        <div className="container-x">
          <SectionIntro eyebrow="Company facts" title="Ezomod at a glance" />
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-flow-row-dense lg:grid-cols-3">
            {facts.map(([label, value, Icon]) => (
              <div key={label} className={`lift-card p-6 ${WIDE.has(label) ? "lg:col-span-2" : ""}`}>
                <dt className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-slate-600">
                  <span className="icon-circle h-10 w-10 bg-[#007BFF]/10 text-[#0062CC]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  {label}
                </dt>
                <dd className="mt-3 min-w-0 leading-relaxed text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-brandwash">
        <div className="container-x">
          <SectionIntro eyebrow="What is Ezomod's mission?" title="Make AI genuinely useful for everyday businesses.">
            <p>
              Our mission is to make AI genuinely useful for everyday businesses: systems that answer
              every lead quickly, take repetitive work off people&apos;s plates, and fit the way a
              team already works instead of forcing a new one.
            </p>
          </SectionIntro>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map(({ text, icon: Icon }) => (
              <li key={text} className="lift-card flex items-center gap-4 p-6">
                <span className="icon-circle bg-gradient-to-br from-[#007BFF] to-[#22C55E] text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-semibold leading-snug text-slate-900">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Differentiator />

      <Process
        id="how-we-work"
        dark
        eyebrow="How does Ezomod work with clients?"
        title="Four clear steps. You approve each one."
        intro="Every project follows the same clear steps. We do the technical work; your team reviews and approves each stage."
        steps={HOW_WE_WORK}
      />

      <section className="section bg-plain">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <SectionIntro eyebrow="Who is on the Ezomod team?" title="The people who build your system.">
            <p>A small team of AI engineers and automation specialists based in Mysuru, India, working with clients remotely.</p>
          </SectionIntro>
          <ul>
            {TEAM.map((member) => (
              <li key={member.name} className="lift-card p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#007BFF] to-[#22C55E] font-display text-xl font-bold text-white shadow-md shadow-[#0080FF]/25"
                  >
                    {member.initials}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-sm font-semibold text-[#0062CC]">{member.role}</p>
                  </div>
                </div>
                <p className="mt-5 leading-relaxed text-slate-700">{member.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-14">
          <SectionIntro eyebrow="How can I contact Ezomod?" title="Talk to the team directly.">
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
          <div aria-hidden className="grid grid-cols-3 gap-3">
            {[Mail, Linkedin, CalendarDays].map((Icon, i) => (
              <span
                key={i}
                className="grid aspect-square place-items-center rounded-2xl border border-slate-200/70 bg-white text-[#0062CC] shadow-[0_10px_30px_-12px_rgba(0,30,70,0.12)]"
              >
                <Icon className="h-8 w-8" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
