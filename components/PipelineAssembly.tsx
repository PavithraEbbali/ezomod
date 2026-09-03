"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  CalendarSync,
  PhoneOutgoing,
  Radar,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MaskedText from "@/components/ui/MaskedText";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Step {
  index: string;
  title: string;
  description: string;
  chips: string[];
  icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    index: "01",
    title: "Multi-Channel Ingestion",
    description:
      "Every buyer and seller signal lands in one stream the instant it fires, deduplicated and enriched before the phone rings.",
    chips: ["Meta Ads", "Google LSA", "Zillow", "Website IDX"],
    icon: Radar,
  },
  {
    index: "02",
    title: "Instant Neural Voice Call",
    description:
      "An outbound dial launches in under 45 seconds, day or night, while the lead is still on your listing page.",
    chips: ["< 45s dial", "24/7 coverage", "Local caller ID"],
    icon: PhoneOutgoing,
  },
  {
    index: "03",
    title: "Deep Qualification",
    description:
      "The agent works objections and confirms the four things your ISA would ask, then scores intent on the fly.",
    chips: ["Budget", "Location", "Timeline", "Pre-Approval"],
    icon: BadgeCheck,
  },
  {
    index: "04",
    title: "Live Warm Transfer & Calendar Sync",
    description:
      "Qualified buyers are transferred to your agent on the same call, with the tour booked and the record already written.",
    chips: ["Follow Up Boss", "Lofty", "Google Calendar"],
    icon: CalendarSync,
  },
];

const TRAJECTORY =
  "M 150 170 C 270 170, 330 90, 450 90 C 570 90, 630 170, 750 170 C 870 170, 930 90, 1050 90";

const NODES = [
  { x: 150, y: 170 },
  { x: 450, y: 90 },
  { x: 750, y: 170 },
  { x: 1050, y: 90 },
] as const;

export default function PipelineAssembly() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)",
        () => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

          const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=2600",
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const eased = self.progress;
              gsap.set(path, { strokeDashoffset: length * (1 - eased) });
              setProgress(eased);
              const next = Math.min(STEPS.length - 1, Math.floor(eased * STEPS.length * 1.06));
              setActive((current) => (current === next ? current : next));
            },
          });

          return () => {
            trigger.kill();
            gsap.set(path, { clearProps: "strokeDasharray,strokeDashoffset" });
          };
        },
      );

      media.add(
        "(max-width: 1023px), (max-height: 759px), (prefers-reduced-motion: reduce)",
        () => {
          gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
          setProgress(1);
          setActive(STEPS.length - 1);
          return () => undefined;
        },
      );

      return () => media.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="engine"
      className="relative flex min-h-screen scroll-mt-24 flex-col justify-center overflow-hidden bg-canvas-sunk py-20 lg:py-0"
    >
      <div
        aria-hidden
        className="grid-faint absolute inset-0 opacity-50 [mask-image:radial-gradient(900px_520px_at_50%_50%,#000,transparent)]"
      />
      <div
        aria-hidden
        className="absolute left-[-8%] top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(0,123,255,0.16),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute right-[-6%] bottom-1/4 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.18),transparent)] blur-2xl"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="eyebrow">
            <Radar className="h-3.5 w-3.5 text-azure" />
            The autonomous engine
          </span>
          <MaskedText
            as="h2"
            className="mt-4 font-display text-[clamp(1.8rem,3.5vw,2.7rem)] font-extrabold leading-[1.07] tracking-tightest text-ink"
            lines={[
              <>Four moves between a click</>,
              <>
                and a <span className="text-gradient">booked showing</span>.
              </>,
            ]}
          />
          <p className="mx-auto mt-4 max-w-[540px] text-[15.5px] leading-relaxed text-steel">
            The whole pipeline assembles itself. No dialer queues, no lead round-robin, no
            Monday morning catch-up on Friday night inquiries.
          </p>
        </div>

        <div className="relative mt-6 hidden lg:block">
          <svg
            viewBox="0 0 1200 240"
            fill="none"
            className="h-[130px] w-full"
            aria-hidden
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="pipeline-stroke" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#007BFF" />
                <stop offset="0.4" stopColor="#06B6D4" />
                <stop offset="0.72" stopColor="#10B981" />
                <stop offset="1" stopColor="#84CC16" />
              </linearGradient>
              <filter id="pipeline-glow" x="-30%" y="-120%" width="160%" height="340%">
                <feGaussianBlur stdDeviation="9" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={TRAJECTORY}
              stroke="rgba(0,123,255,0.14)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 9"
            />
            <path
              ref={pathRef}
              d={TRAJECTORY}
              stroke="url(#pipeline-stroke)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#pipeline-glow)"
            />

            {NODES.map((node, index) => {
              const reached = progress >= index / STEPS.length;
              return (
                <g key={node.x} className="transition-opacity duration-500">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={reached ? 22 : 16}
                    fill="#FFFFFF"
                    stroke={reached ? "url(#pipeline-stroke)" : "rgba(0,123,255,0.18)"}
                    strokeWidth={reached ? 3 : 2}
                    className="transition-all duration-500"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={reached ? 7 : 4}
                    fill={reached ? "#22C55E" : "rgba(0,123,255,0.28)"}
                    className="transition-all duration-500"
                  />
                  <text
                    x={node.x}
                    y={node.y - 38}
                    textAnchor="middle"
                    className="fill-steel-light font-mono text-[13px] font-semibold uppercase"
                  >
                    {STEPS[index].index}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="mt-4 grid grid-cols-4 gap-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = active >= index;
              return (
                <div
                  key={step.title}
                  className={cn(
                    "rounded-3xl border p-5 transition-all duration-700 ease-swift",
                    isActive
                      ? "border-[var(--edge-strong)] bg-white/90 shadow-halo backdrop-blur-xl"
                      : "border-[var(--edge)] bg-white/45 opacity-55",
                    active === index && "shadow-halo-lg",
                  )}
                  style={{
                    transform: active === index ? "translateY(-8px)" : "translateY(0)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-xl transition-all duration-500",
                        isActive ? "bg-brand text-white shadow-glow" : "bg-canvas-deep text-steel-faint",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-steel-faint">
                      Step {step.index}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[17px] font-bold leading-snug tracking-[-0.02em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-steel-light">
                    {step.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {step.chips.map((chip) => (
                      <span
                        key={chip}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-500",
                          isActive
                            ? "bg-brand-soft text-azure"
                            : "bg-canvas-deep text-steel-faint",
                        )}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-12 space-y-4 lg:hidden">
          <span
            aria-hidden
            className="absolute left-[27px] top-4 h-[calc(100%-2rem)] w-[2px] rounded-full bg-gradient-to-b from-azure via-aqua to-spring opacity-30"
          />
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                className="relative flex gap-4"
              >
                <span className="relative z-10 mt-1 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 rounded-3xl border border-[var(--edge)] bg-white/85 p-5 shadow-halo backdrop-blur-xl">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-steel-faint">
                    Step {step.index}
                  </span>
                  <h3 className="mt-2 text-[17px] font-bold leading-snug tracking-[-0.02em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-steel-light">
                    {step.description}
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {step.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-medium text-azure"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
