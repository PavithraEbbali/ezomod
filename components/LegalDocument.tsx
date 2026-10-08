import type { ReactNode } from "react";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import PageHeader from "@/components/PageHeader";

export type LegalSection = { heading: string; body: ReactNode };

export default function LegalDocument({
  title,
  path,
  updated,
  sections,
}: {
  title: string;
  path: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: title, path }]} />
      <PageHeader eyebrow="Legal" title={title}>
        <p>Last updated: {updated}</p>
      </PageHeader>
      <div className="section bg-tint">
        <div className="container-x">
        <div className="max-w-3xl space-y-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(0,30,70,0.10)] sm:p-10">
          {sections.map((section, index) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-semibold text-[#0F172A] sm:text-2xl">
                {index + 1}. {section.heading}
              </h2>
              <div className="mt-3 space-y-4 leading-relaxed text-slate-700 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
                {section.body}
              </div>
            </section>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}
