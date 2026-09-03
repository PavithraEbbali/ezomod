"use client";

import { motion, useInView } from "framer-motion";
import { Activity, Cpu, Signal, Waves } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NAV = [
  {
    heading: "Engine",
    links: [
      { label: "The Engine", href: "#engine" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Comparison", href: "#comparison" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    heading: "Use cases",
    links: [
      { label: "Buyer qualification", href: "#engine" },
      { label: "Seller appointments", href: "#engine" },
      { label: "Database reactivation", href: "#capabilities" },
      { label: "Open house follow-up", href: "#capabilities" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Live call demo", href: "#demo" },
      { label: "Reserve territory", href: "#book" },
      { label: "Security", href: "#book" },
      { label: "Contact", href: "#book" },
    ],
  },
] as const;

const DIAGNOSTICS = [
  { label: "Voice mesh", value: "operational", icon: Waves },
  { label: "Median dial latency", value: "412 ms", icon: Activity },
  { label: "CRM sync queue", value: "0 backlog", icon: Cpu },
  { label: "Carrier uptime", value: "99.98%", icon: Signal },
] as const;

function CallCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(2841);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      setCount((value) => value + Math.floor(Math.random() * 3) + 1);
    }, 4200);
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
        className="absolute left-1/2 top-0 h-[280px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,163,255,0.12),transparent)] blur-2xl"
      />

      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.85fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/ezomod logo.jpeg"
                alt="EZOMOD"
                width={248}
                height={224}
                className="h-9 w-9 rounded-lg object-cover"
              />
              <span className="text-[19px] font-bold tracking-tightest text-ink">
                EZO<span className="text-gradient">MOD</span>
              </span>
            </div>
            <p className="mt-4 max-w-[38ch] text-[14.5px] leading-relaxed text-steel">
              The autonomous agency for real estate lead generation and outbound voice
              qualification. Built for brokerages that refuse to lose a lead to a slow
              callback.
            </p>

            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-spring/25 bg-white/80 px-4 py-2.5 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-spring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-spring" />
              </span>
              <span className="text-[12.5px] text-steel">
                Platform live · <CallCounter /> calls handled today
              </span>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {NAV.map((column) => (
              <div key={column.heading}>
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-steel-faint">
                  {column.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-steel transition-colors duration-300 hover:text-ink"
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

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DIAGNOSTICS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-between rounded-2xl border border-[var(--edge)] bg-white/80 px-4 py-3.5 backdrop-blur-xl"
              >
                <span className="inline-flex items-center gap-2.5 text-[13px] font-medium text-steel">
                  <Icon className="h-3.5 w-3.5 text-aqua" />
                  {item.label}
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-mint">
                  {item.value}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--edge)] py-7 sm:flex-row">
          <p className="font-mono text-[11.5px] text-steel-faint">
            © {new Date().getFullYear()} EZOMOD. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "TCPA compliance", "Security"].map((item) => (
              <a
                key={item}
                href="#book"
                className="font-mono text-[11.5px] text-steel-faint transition-colors duration-300 hover:text-ink"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden"
      >
        <p className="translate-y-[26%] bg-brand bg-clip-text text-center font-display text-[clamp(4rem,17vw,15rem)] font-extrabold leading-none tracking-tightest text-transparent opacity-[0.10]">
          EZOMOD
        </p>
      </div>
    </footer>
  );
}
