"use client";

import { animate, motion, useInView } from "framer-motion";
import { Gauge, PhoneOff, Radio, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";

interface Metric {
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  detail: string;
  icon: ComponentType<{ className?: string }>;
}

const METRICS: Metric[] = [
  {
    prefix: "< ",
    value: 30,
    suffix: "s",
    decimals: 0,
    label: "First Touch",
    detail: "Median seconds from inbound signal to live outbound contact",
    icon: Gauge,
  },
  {
    prefix: "",
    value: 4,
    suffix: "",
    decimals: 0,
    label: "Orchestrated Channels",
    detail: "Voice, WhatsApp, SMS and email running as one cadence",
    icon: Radio,
  },
  {
    prefix: "",
    value: 100,
    suffix: "%",
    decimals: 0,
    label: "Lifecycle Coverage",
    detail: "Nights, weekends and post-close ops — nothing queued to Monday",
    icon: TrendingUp,
  },
  {
    prefix: "",
    value: 0,
    suffix: "",
    decimals: 0,
    label: "Human Chasing Hours",
    detail: "Your team stops dialing and starts closing contracts",
    icon: PhoneOff,
  },
];

function Counter({ metric, active }: { metric: Metric; active: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (metric.value === 0) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, metric.value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [active, metric.value]);

  return (
    <span className="tabnum">
      {metric.prefix}
      {display.toFixed(metric.decimals)}
      {metric.suffix}
    </span>
  );
}

export default function MetricsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px -18% 0px" });

  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <div className="container-x">
        <div
          ref={ref}
          className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {METRICS.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 34 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
                transition={{
                  duration: 0.78,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.09,
                }}
                className="group relative overflow-hidden rounded-3xl border border-[var(--edge)] bg-white/85 p-6 shadow-halo backdrop-blur-xl transition-shadow duration-500 ease-swift hover:shadow-halo-lg"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-start justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-azure">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-faint">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-6 font-display text-[clamp(2rem,4.4vw,2.65rem)] font-extrabold leading-none tracking-tightest text-gradient">
                  <Counter metric={metric} active={inView} />
                </p>
                <p className="mt-2.5 text-[15px] font-semibold tracking-[-0.01em] text-ink">
                  {metric.label}
                </p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-steel-light">
                  {metric.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
