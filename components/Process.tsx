"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import SectionIntro from "@/components/content/SectionIntro";
import { cn } from "@/lib/utils";

export type Step = { title: string; text: string };

const DEFAULT_STEPS: readonly Step[] = [
  {
    title: "Consultation",
    text: "We review your lead sources, CRM, pipeline stages, and how your team currently follows up. You get a clear written scope and timeline.",
  },
  {
    title: "Build and connect",
    text: "We connect your CRM, phone numbers, and lead sources, then write the call scripts, qualification questions, and handoff rules with you.",
  },
  {
    title: "Test with your team",
    text: "We run the system on test leads and a small share of live traffic. Your team listens to calls and signs off before anything goes wider.",
  },
  {
    title: "Launch and ongoing support",
    text: "We go live across all lead sources, review results with you each month, and keep tuning scripts and timing as your business changes.",
  },
];

/** Gradient stops at each node, so the laser reads as one continuous #007BFF → #22C55E sweep. */
const STOPS_4 = ["#007BFF", "#00A3FF", "#12B89A", "#22C55E"] as const;
const STOPS_5 = ["#007BFF", "#00A3FF", "#0AB2C4", "#16BC86", "#22C55E"] as const;

/** Seconds the laser takes to travel between two adjacent nodes. */
const SEGMENT = 0.55;

const laserX: Variants = {
  idle: { scaleX: 0 },
  lit: (i: number) => ({ scaleX: 1, transition: { delay: i * SEGMENT, duration: SEGMENT, ease: "linear" } }),
};

const laserY: Variants = {
  idle: { scaleY: 0 },
  lit: (i: number) => ({ scaleY: 1, transition: { delay: i * SEGMENT, duration: SEGMENT, ease: "linear" } }),
};

const nodeRing: Variants = {
  idle: { boxShadow: "0 0 0px rgba(0,123,255,0)" },
  lit: (i: number) => ({
    boxShadow: "0 0 15px rgba(0,123,255,0.3)",
    transition: { delay: i * SEGMENT, duration: 0.3 },
  }),
};

const nodeCore: Variants = {
  idle: { scale: 0.4 },
  lit: (i: number) => ({ scale: 1, transition: { delay: i * SEGMENT, duration: 0.3 } }),
};

export default function Process({
  steps = DEFAULT_STEPS,
  title = "How setup works",
  intro = "Most teams are live within a few weeks. We do the technical work; your team reviews and approves each stage.",
  id = "setup-process",
  eyebrow,
  dark = false,
  children,
}: {
  steps?: readonly Step[];
  title?: string;
  intro?: string;
  id?: string;
  eyebrow?: string;
  /** Renders as the page's dark navy band. */
  dark?: boolean;
  /** Rendered between the intro and the steps (e.g. a flow diagram). */
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const STOPS: readonly string[] = steps.length > 4 ? STOPS_5 : STOPS_4;

  return (
    <section id={id} className={cn("section", dark ? "bg-navy" : "bg-tint")}>
      <div className="container-x">
        <SectionIntro title={title} eyebrow={eyebrow} dark={dark}>
          <p>{intro}</p>
        </SectionIntro>
        {children}

        <motion.ol
          initial={reduceMotion ? "lit" : "idle"}
          whileInView="lit"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-12 flex flex-col md:flex-row"
        >
          {steps.map((step, index) => {
            const hasNext = index < steps.length - 1;
            const [from, to] = [STOPS[index], STOPS[index + 1] ?? STOPS[index]];

            return (
              <li
                key={step.title}
                className="relative flex gap-5 pb-10 last:pb-0 md:flex-1 md:flex-col md:gap-0 md:pb-0 md:pr-8"
              >
                {/* Track segment from this node's centre (11px, 35px) to the next node's centre. */}
                {hasNext ? (
                  <>
                    <span
                      aria-hidden
                      className={cn("absolute -bottom-[35px] left-[10px] top-[35px] w-0.5 md:hidden", dark ? "bg-white/15" : "bg-slate-200")}
                    />
                    <motion.span
                      aria-hidden
                      custom={index}
                      variants={laserY}
                      style={{ backgroundImage: `linear-gradient(to bottom, ${from}, ${to})` }}
                      className="absolute -bottom-[35px] left-[10px] top-[35px] w-0.5 origin-top md:hidden"
                    />
                    <span
                      aria-hidden
                      className={cn("absolute -right-[11px] left-[11px] top-[34px] hidden h-0.5 md:block", dark ? "bg-white/15" : "bg-slate-200")}
                    />
                    <motion.span
                      aria-hidden
                      custom={index}
                      variants={laserX}
                      style={{ backgroundImage: `linear-gradient(to right, ${from}, ${to})` }}
                      className="absolute -right-[11px] left-[11px] top-[34px] hidden h-0.5 origin-left md:block"
                    />
                  </>
                ) : null}

                <div className="relative flex w-[22px] shrink-0 flex-col items-center">
                  <span className={cn("mb-2 font-mono text-xs font-bold leading-4", dark ? "text-white" : "text-slate-900")}>
                    {index + 1}
                  </span>
                  <motion.span
                    aria-hidden
                    custom={index}
                    variants={nodeRing}
                    className={cn(
                      "grid h-[22px] w-[22px] place-items-center rounded-full border p-1 backdrop-blur-md",
                      dark ? "border-white/25 bg-white/10" : "border-slate-200 bg-white/50",
                    )}
                  >
                    <span className={cn("relative h-3 w-3 rounded-full", dark ? "bg-white/20" : "bg-slate-200")}>
                      <motion.span
                        custom={index}
                        variants={nodeCore}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#007BFF] to-[#22C55E]"
                      />
                    </span>
                  </motion.span>
                </div>

                <motion.div
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0"
                >
                  <h3 className={cn("mb-2 mt-6 text-lg font-semibold", dark ? "text-white" : "text-slate-900")}>{step.title}</h3>
                  <p className={cn("text-[15px] leading-relaxed", dark ? "text-white/75" : "text-slate-700")}>{step.text}</p>
                </motion.div>
              </li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
