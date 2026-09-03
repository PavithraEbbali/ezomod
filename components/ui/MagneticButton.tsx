"use client";

import { motion, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

export interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  radius?: number;
  ariaLabel?: string;
}

const SURFACE: Record<Variant, string> = {
  primary: "bg-brand shadow-glow",
  ghost:
    "bg-white/85 backdrop-blur-xl border border-[var(--edge)] shadow-halo group-hover:border-[var(--edge-strong)]",
  outline: "bg-white/60 backdrop-blur-xl border border-[var(--edge-strong)]",
};

const LABEL: Record<Variant, string> = {
  primary: "text-white",
  ghost: "text-ink",
  outline: "text-ink",
};

const HALO: Record<Variant, string> = {
  primary: "bg-brand",
  ghost: "bg-brand-soft",
  outline: "bg-brand-soft",
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  icon,
  radius = 45,
  ariaLabel,
}: MagneticButtonProps) {
  const { ref, x, y, innerX, innerY, proximity } = useMagnetic<HTMLAnchorElement>({ radius });
  const haloOpacity = useTransform(proximity, [0, 1], [0, 0.6]);
  const haloScale = useTransform(proximity, [0, 1], [0.88, 1.14]);

  const classes = cn(
    "group relative isolate inline-flex select-none items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold tracking-[-0.01em] will-change-transform",
    LABEL[variant],
    className,
  );

  const layers = (
    <>
      <motion.span
        aria-hidden
        style={{ opacity: haloOpacity, scale: haloScale }}
        className={cn("pointer-events-none absolute -inset-3 rounded-full blur-xl", HALO[variant])}
      />
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full transition-shadow duration-300 ease-swift",
          SURFACE[variant],
        )}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      >
        <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/35 opacity-0 transition-all duration-700 ease-swift group-hover:translate-x-[260%] group-hover:opacity-100" />
      </span>
      <motion.span
        style={{ x: innerX, y: innerY }}
        className="relative inline-flex items-center gap-2.5"
      >
        {children}
        {icon}
      </motion.span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        style={{ x, y }}
        whileTap={{ scale: 0.96 }}
        className={classes}
      >
        {layers}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as unknown as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={classes}
    >
      {layers}
    </motion.button>
  );
}
