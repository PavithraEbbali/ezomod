import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section heading: optional small eyebrow (often the plain-English question), a short
 * punchy H2 and an answer-first lead paragraph.
 */
export default function SectionIntro({
  title,
  eyebrow,
  children,
  id,
  dark = false,
  compact = false,
  className,
}: {
  title: ReactNode;
  eyebrow?: string;
  children?: ReactNode;
  id?: string;
  dark?: boolean;
  /** Smaller heading for narrow side columns. */
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <p className={cn("eyebrow mb-3", dark && "text-[#5CC8FF]")}>{eyebrow}</p> : null}
      <h2 id={id} className={cn("h2", compact && "sm:text-[2rem]", dark && "text-white")}>
        {title}
      </h2>
      {children ? <div className={cn("lead mt-4 space-y-4", dark && "text-white/80")}>{children}</div> : null}
    </div>
  );
}
