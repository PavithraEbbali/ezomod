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
      <PageHeader title={title}>
        <p>Last updated: {updated}</p>
      </PageHeader>
      <div className="container-x py-12 sm:py-16">
        <div className="max-w-3xl space-y-10">
          {sections.map((section, index) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-semibold text-[#0F172A] sm:text-2xl">
                {index + 1}. {section.heading}
              </h2>
              <div className="mt-3 space-y-4 leading-relaxed text-steel [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
