import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import FaqList from "@/components/content/FaqList";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/ui/ButtonLink";
import { CONSULTATION_HREF, CTA_LABEL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { ALL_FAQS, FAQ_GROUPS } from "@/lib/faq";
import { faqPage } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ: AI Automation, Lead Follow-Up & More | Ezomod",
  description:
    "Answers to common questions about Ezomod: what we do, our AI automation services, setup time, supported CRMs, data ownership and how to get started.",
  path: "/faq",
});

const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function Page() {
  return (
    <>
      <JsonLd data={faqPage(ALL_FAQS)} />
      <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
      <PageHeader
        eyebrow="Ezomod FAQ"
        title="Frequently asked questions"
        actions={<ButtonLink href={CONSULTATION_HREF}>{CTA_LABEL}</ButtonLink>}
      >
        <p>
          Short, direct answers about Ezomod, our AI automation services and how we work. Can&apos;t
          find your question?{" "}
          <Link href="/contact" className="font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2">
            Ask us directly
          </Link>
          .
        </p>
      </PageHeader>

      <div className="section bg-tint">
      <div className="container-x grid gap-10 lg:grid-cols-[240px_1fr]">
        <nav aria-label="FAQ topics" className="h-fit rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-12px_rgba(0,30,70,0.10)] lg:sticky lg:top-24">
          <p className="eyebrow">Topics</p>
          <ul className="mt-3 flex flex-wrap gap-2 lg:block lg:space-y-1">
            {FAQ_GROUPS.map((group) => (
              <li key={group.title}>
                <a
                  href={`#${slug(group.title)}`}
                  className="flex min-h-11 items-center rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-[#F0F7FF] hover:text-[#0062CC] lg:border-0"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-12">
          {FAQ_GROUPS.map((group) => (
            <section key={group.title} aria-labelledby={slug(group.title)}>
              <h2 id={slug(group.title)} className="h2 scroll-mt-24 !text-2xl sm:!text-3xl">
                {group.title}
              </h2>
              <div className="mt-6">
                <FaqList faqs={group.items} />
              </div>
            </section>
          ))}
        </div>
      </div>
      </div>

      <ContactSection />
    </>
  );
}
