import type { ReactNode } from "react";

/** Section heading with an answer-first lead paragraph. */
export default function SectionIntro({ title, children, id }: { title: string; children?: ReactNode; id?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="h2">
        {title}
      </h2>
      {children ? <div className="lead mt-4 space-y-4">{children}</div> : null}
    </div>
  );
}
