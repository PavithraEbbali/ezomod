import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "inverse";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[#007BFF] via-[#00A3FF] to-[#22C55E] font-medium text-white shadow-md shadow-[#0080FF]/25 hover:shadow-lg hover:shadow-[#0080FF]/35",
  secondary:
    "border border-[#00A3FF]/25 bg-white/80 font-medium text-[#0F172A] backdrop-blur-sm hover:bg-[#F0F7FF]",
  inverse: "bg-white font-semibold text-[#0B1528] shadow-lg hover:bg-slate-50",
};

export default function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  onClick,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A3FF]",
    VARIANTS[variant],
    className,
  );

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
