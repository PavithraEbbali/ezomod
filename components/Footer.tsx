"use client";

import { motion, useInView } from "framer-motion";
import { Activity, Cpu, Radio, Signal, Waves, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NAV = [
  {
    heading: "Engine",
    links: [
      { label: "Capabilities", href: "#capabilities" },
      { label: "Adaptive Engine", href: "#adaptive" },
      { label: "Pipeline Velocity", href: "#velocity" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    heading: "Lifecycle",
    links: [
      { label: "Speed-to-lead blitz", href: "#capabilities" },
      { label: "Household escalation", href: "#adaptive" },
      { label: "Tier-1 client desk", href: "#adaptive" },
      { label: "Payment dunning", href: "#adaptive" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Live engine demo", href: "#demo" },
      { label: "Reserve territory", href: "#book" },
      { label: "Security", href: "#book" },
      { label: "Contact", href: "#book" },
    ],
  },
] as const;

const DIAGNOSTICS: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Voice mesh", value: "operational", icon: Waves },
  { label: "Median first touch", value: "27 s", icon: Activity },
  { label: "Channel failover", value: "armed", icon: Radio },
  { label: "CRM sync queue", value: "0 backlog", icon: Cpu },
];

const LEGAL = ["Privacy", "Terms", "TCPA compliance", "Security"] as const;

function ConversationCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(11482);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      setCount((value) => value + Math.floor(Math.random() * 4) + 1);
    }, 3600);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <span ref={ref} className="tabnum font-semibold text-ink">
      {count.toLocaleString("en-US")}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--edge)] bg-canvas-sunk pt-16">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[280px] w-[820px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,163,255,0.12),transparent)] blur-2xl"
      />

      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-[var(--edge)] bg-white">
                <Image
                  src="/logo.png"
                  alt="EZOMOD"
                  width={512}
                  height={512}
                  sizes="40px"
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-[19px] font-bold tracking-tightest text-ink">
                EZO<span className="text-gradient">MOD</span>
              </span>
            </div>
            <p className="mt-4 max-w-[40ch] text-[14.5px] leading-relaxed text-steel">
              The autonomous revenue operations engine for real estate. Neural voice, WhatsApp,
              SMS, and email orchestrated end to end — from the first inbound signal to the
              post-close client desk.
            </p>

            <div className="mt-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-spring/25 bg-white/80 px-4 py-2.5 backdrop-blur-xl">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-spring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-spring" />
              </span>
              <span className="text-[12px] text-steel sm:text-[12.5px]">
                Platform live · <ConversationCounter /> conversations today
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {NAV.map((column) => (
              <div key={column.heading}>
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-steel-faint">
                  {column.heading}
                </p>
                <ul className="mt-3 space-y-0.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="-mx-2 block rounded-lg px-2 py-2.5 text-[14px] text-steel transition-colors duration-300 hover:bg-white/70 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DIAGNOSTICS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--edge)] bg-white/80 px-4 py-3.5 backdrop-blur-xl"
              >
                <span className="inline-flex min-w-0 items-center gap-2.5 text-[13px] font-medium text-steel">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-aqua" />
                  <span className="truncate">{item.label}</span>
                </span>
                <span className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-mint">
                  {item.value}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--edge)] py-7 sm:flex-row">
          <p className="flex items-center gap-2 font-mono text-[11.5px] text-steel-faint">
            <Signal className="h-3.5 w-3.5 text-steel-faint" />© {new Date().getFullYear()} EZOMOD.
            All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0">
            {LEGAL.map((item) => (
              <a
                key={item}
                href="#book"
                className="rounded-lg px-2.5 py-3 font-mono text-[11.5px] text-steel-faint transition-colors duration-300 hover:bg-white/70 hover:text-ink"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="translate-y-[26%] bg-brand bg-clip-text text-center font-display text-[clamp(4rem,17vw,15rem)] font-extrabold leading-none tracking-tightest text-transparent opacity-[0.10]">
          EZOMOD
        </p>
      </div>
    </footer>
  );
}
