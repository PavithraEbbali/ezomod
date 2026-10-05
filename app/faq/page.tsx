import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import FaqList from "@/components/content/FaqList";
import PageHeader from "@/components/PageHeader";
import { FAQ_GROUPS } from "@/lib/faq";
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
      <Breadcrumbs items={[{ name: "FAQ" }]} />
      <PageHeader title="Frequently asked questions">
        <p>
          Short, direct answers about Ezomod, our AI automation services and how we work. Can&apos;t
          find your question?{" "}
          <Link href="/contact" className="font-medium text-[#007BFF] underline decoration-[#007BFF]/30 underline-offset-2">
            Ask us directly
          </Link>
          .
        </p>
      </PageHeader>

      <div className="container-x grid gap-10 py-12 sm:py-16 lg:grid-cols-[220px_1fr]">
        <nav aria-label="FAQ topics" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold text-slate-900">Topics</p>
          <ul className="mt-3 space-y-2 text-sm">
            {FAQ_GROUPS.map((group) => (
              <li key={group.title}>
                <a href={`#${slug(group.title)}`} className="text-slate-600 hover:text-[#007BFF]">
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

      <ContactSection />
    </>
  );
}
