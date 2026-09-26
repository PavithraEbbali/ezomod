"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TAGS = ["Budget: $1.2M", "Timeline: 30 Days", "Pre-Approved: Yes"] as const;
const WAVE = [0.5, 1, 0.7, 0.85] as const;

/** `inline` renders the body on the title line instead of below it. */
type Node = { time: string; title?: string; inline?: boolean; active?: boolean; body: ReactNode };

const NODES: readonly Node[] = [
  {
    time: "00:00:15",
    title: "Outbound Neural Dial",
    inline: true,
    body: (
      <span aria-hidden className="flex h-3.5 items-center gap-[2px]">
        {WAVE.map((scale, bar) => (
          <span
            key={bar}
            style={{ height: `${scale * 100}%`, animationDelay: `${bar * 0.15}s` }}
            className="w-[3px] animate-wave rounded-full bg-gradient-to-b from-[#007BFF] to-[#22C55E] motion-reduce:animate-none"
          />
        ))}
      </span>
    ),
  },
  {
    time: "00:02:45",
    title: "Entity Extraction & Qualification",
    body: (
      <span className="flex flex-wrap gap-1">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-medium leading-tight text-slate-700"
          >
            {tag}
          </span>
        ))}
      </span>
    ),
  },
  {
    time: "00:04:10",
    active: true,
    body: (
      <span className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium leading-none text-white">
        <Check className="h-3.5 w-3.5 text-[#22C55E]" strokeWidth={3} aria-hidden />
        Calendar Showing Locked
      </span>
    ),
  },
];

export default function HeroTelemetry() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-slate-200/60 bg-white/70 shadow-[0_20px_40px_-15px_rgba(0,30,70,0.08)] backdrop-blur-2xl">
      <div className="relative flex h-8 items-center border-b border-slate-200/50 px-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
        </span>
        <span className="absolute inset-x-0 text-center font-mono text-[9px] tracking-widest text-slate-400">
          EZOMOD / LIVE EXECUTION
        </span>
      </div>

      <ol className="relative p-5">
        {NODES.map((node, index) => (
          <motion.li
            key={node.time}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.4 + index * 0.55 }}
            className="relative grid grid-cols-[4.5rem_11px_1fr] items-start gap-x-3 py-2.5"
          >
            {/* Rail segment from this node's dot (py-2.5 + half of h-4 = 18px) down to the next one's. */}
            {index < NODES.length - 1 ? (
              <span aria-hidden className="absolute -bottom-[18px] left-[89px] top-[18px] w-px bg-slate-200" />
            ) : null}
            <span className="pt-px font-mono text-xs leading-tight text-slate-400">{node.time}</span>
            <span className="flex h-4 items-center justify-center">
              <span
                className={cn(
                  "relative h-[7px] w-[7px] rounded-full",
                  node.active
                    ? "bg-gradient-to-br from-[#007BFF] to-[#22C55E] shadow-[0_0_0_3px_rgba(34,197,94,0.15),0_0_8px_rgba(0,163,255,0.5)]"
                    : "border border-slate-300 bg-white",
                )}
              />
            </span>
            <div className="min-w-0">
              {node.title ? (
                <div
                  className={cn(
                    "text-[13px] font-medium leading-tight text-slate-800",
                    node.inline && "flex items-center gap-2",
                  )}
                >
                  {node.title}
                  {node.inline ? node.body : null}
                </div>
              ) : null}
              {!node.inline ? <div className={node.title ? "mt-2" : undefined}>{node.body}</div> : null}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
