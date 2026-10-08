import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Page hero for non-home pages. With `aside`, it becomes two columns (text + coded visual)
 * on desktop; `actions` renders buttons under the intro.
 */
export default function PageHeader({
  title,
  eyebrow,
  children,
  actions,
  aside,
}: {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-[#00A3FF]/10">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(640px_340px_at_15%_0%,rgba(0,123,255,0.10),transparent),radial-gradient(560px_340px_at_85%_80%,rgba(34,197,94,0.10),transparent)]"
      />
      <div className={cn("container-x py-12 sm:py-16", aside && "grid items-center gap-10 lg:grid-cols-2 lg:gap-12")}>
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className={cn("max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl", eyebrow && "mt-3")}>
            {title}
          </h1>
          {children ? <div className="lead mt-5 max-w-2xl space-y-4">{children}</div> : null}
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
        </div>
        {aside}
      </div>
    </header>
  );
}
