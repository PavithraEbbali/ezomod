"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MaskedTextProps {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export default function MaskedText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  once = true,
}: MaskedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });

  return (
    <Tag className={className}>
      <span ref={ref} className="block">
        {lines.map((line, index) => (
          <span key={index} className={cn("block overflow-hidden pb-[0.12em]", lineClassName)}>
            <motion.span
              className="block will-change-transform"
              initial={{ y: "112%", clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
              animate={
                inView
                  ? { y: "0%", clipPath: "inset(0% 0% -6% 0%)", opacity: 1 }
                  : { y: "112%", clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }
              }
              transition={{
                duration: 0.92,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + index * stagger,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
