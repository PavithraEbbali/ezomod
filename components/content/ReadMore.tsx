import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

/** Collapsible extra detail. Uses <details>, so the text is always in the static HTML. */
export default function ReadMore({ children }: { children: ReactNode }) {
  return (
    <details className="read-more group mt-3">
      <summary className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#0062CC] hover:text-[#007BFF]">
        <span className="group-open:hidden">Read more</span>
        <span className="hidden group-open:inline">Show less</span>
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="body mt-2 space-y-4">{children}</div>
    </details>
  );
}
