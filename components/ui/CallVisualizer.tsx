"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRightLeft,
  BadgeCheck,
  CalendarCheck,
  Gauge,
  PhoneCall,
  Radio,
  Waves,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Waveform from "@/components/ui/Waveform";
import { cn } from "@/lib/utils";

type Speaker = "ai" | "lead" | "system";
type Phase = "dialing" | "live" | "transferred";

interface ScriptLine {
  speaker: Speaker;
  text: string;
  pause?: number;
  tag?: string;
}

interface RenderedLine extends ScriptLine {
  id: number;
  typed: string;
  done: boolean;
}

const SCRIPT: ScriptLine[] = [
  {
    speaker: "ai",
    text: "Hi Marcus — this is Ava with Coastline Realty. You just pulled the details on 412 Willow Creek. Is now an okay moment?",
    pause: 380,
  },
  {
    speaker: "lead",
    text: "Honestly, I am just browsing. We are not ready to buy anything yet.",
    pause: 260,
    tag: "Objection · Not ready",
  },
  {
    speaker: "ai",
    text: "Completely fair — most people start there. Are you thinking inside the next 90 days, or more of a six-month horizon?",
    pause: 340,
  },
  {
    speaker: "lead",
    text: "Probably three months. Our lease is up in March.",
    pause: 240,
    tag: "Timeline · 90 days",
  },
  {
    speaker: "ai",
    text: "Perfect timing for spring inventory. Have you been pre-approved yet, or should our lender run the numbers first?",
    pause: 320,
  },
  {
    speaker: "lead",
    text: "We are pre-approved, up to about six-forty.",
    pause: 240,
    tag: "Budget · $640K · Pre-approved",
  },
  {
    speaker: "ai",
    text: "That opens Willow Creek plus two off-market builds in Northridge — no HOA, closing credits included. Thursday at 6:15 for a private tour?",
    pause: 360,
  },
  {
    speaker: "lead",
    text: "Thursday works. Send it over.",
    pause: 300,
    tag: "Showing booked",
  },
  {
    speaker: "system",
    text: "Qualified. Warm transfer to Danielle R. · Tour held Thu 6:15 PM · Recording, transcript and tags synced to Follow Up Boss.",
    pause: 900,
  },
];

const STAGES = [
  { label: "Lead ingested", icon: Radio },
  { label: "Outbound dialed", icon: PhoneCall },
  { label: "Deep qualification", icon: BadgeCheck },
  { label: "Warm transfer", icon: ArrowRightLeft },
] as const;

function formatTimer(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const rest = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return minutes + ":" + rest;
}

export default function CallVisualizer() {
  const [phase, setPhase] = useState<Phase>("dialing");
  const [lines, setLines] = useState<RenderedLine[]>([]);
  const [speaking, setSpeaking] = useState<Speaker | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [stage, setStage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const timers = new Set<number>();

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });

    const run = async () => {
      while (!cancelled) {
        setPhase("dialing");
        setLines([]);
        setElapsed(0);
        setStage(0);
        setSpeaking(null);
        await wait(900);
        if (cancelled) return;
        setStage(1);
        await wait(1100);
        if (cancelled) return;
        setPhase("live");

        for (let index = 0; index < SCRIPT.length; index += 1) {
          if (cancelled) return;
          const line = SCRIPT[index];

          if (line.speaker === "system") {
            setPhase("transferred");
            setStage(3);
            setSpeaking(null);
          } else {
            setSpeaking(line.speaker);
            if (index >= 4) setStage(2);
          }

          const id = index;
          setLines((prev) => [...prev, { ...line, id, typed: "", done: false }]);

          const chunk = line.speaker === "lead" ? 2 : 3;
          const rate = line.speaker === "lead" ? 26 : 18;

          for (let cursor = chunk; cursor < line.text.length + chunk; cursor += chunk) {
            if (cancelled) return;
            const slice = line.text.slice(0, Math.min(cursor, line.text.length));
            setLines((prev) =>
              prev.map((entry) => (entry.id === id ? { ...entry, typed: slice } : entry)),
            );
            await wait(rate);
          }

          setLines((prev) =>
            prev.map((entry) =>
              entry.id === id ? { ...entry, typed: line.text, done: true } : entry,
            ),
          );
          setSpeaking(null);
          await wait(line.pause ?? 420);
        }

        await wait(4400);
      }
    };

    void run();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
    };
  }, []);

  useEffect(() => {
    if (phase === "dialing") return;
    const id = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const intensity = speaking === "ai" ? 1 : speaking === "lead" ? 0.55 : 0.12;
  const statusLabel =
    phase === "dialing"
      ? "Outbound · dialing"
      : phase === "live"
        ? "Live call · qualifying"
        : "Warm transfer · complete";

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[var(--edge)] bg-white/85 p-2 shadow-halo-lg backdrop-blur-xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-spring/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-azure/20 blur-3xl"
      />

      <div className="relative rounded-[22px] border border-[var(--edge)] bg-canvas/80">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--edge)] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-spring" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-spring" />
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steel">
              {statusLabel}
            </span>
          </div>
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-steel-light">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 hairline">
              <Gauge className="h-3 w-3 text-aqua" />
              412ms
            </span>
            <span className="tabnum rounded-full bg-white px-2.5 py-1 hairline">
              {formatTimer(elapsed)}
            </span>
          </div>
        </header>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <div className="border-b border-[var(--edge)] p-5 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand text-sm font-bold text-white shadow-glow">
                MR
              </div>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold tracking-[-0.01em] text-ink">
                  Marcus Rivera
                </p>
                <p className="font-mono text-[11px] text-steel-light">+1 (512) 704-8829</p>
              </div>
            </div>

            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {["Zillow Premier", "Buyer", "Austin · 78704"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-steel hairline"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--edge)] bg-white px-4 py-3.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-light">
                  <Waves className="h-3 w-3 text-aqua" />
                  {speaking === "lead" ? "Lead audio" : "Agent audio"}
                </span>
                <span className="font-mono text-[10px] text-steel-faint">48kHz</span>
              </div>
              <Waveform intensity={intensity} className="mt-2.5" />
            </div>

            <ol className="mt-5 space-y-2.5">
              {STAGES.map((item, index) => {
                const active = stage >= index;
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-all duration-500 ease-swift",
                        active
                          ? "bg-brand text-white shadow-glow"
                          : "bg-canvas-sunk text-steel-faint hairline",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span
                      className={cn(
                        "text-[13px] font-medium transition-colors duration-500",
                        active ? "text-ink" : "text-steel-faint",
                      )}
                    >
                      {item.label}
                    </span>
                    {active && index === stage ? (
                      <motion.span
                        layoutId="call-stage-pill"
                        className="ml-auto rounded-full bg-spring/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-mint"
                      >
                        now
                      </motion.span>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex min-h-[352px] flex-col p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-light">
                Live transcript
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-steel-faint">
                <CalendarCheck className="h-3 w-3 text-mint" />
                auto-logged
              </span>
            </div>

            <div
              ref={scrollRef}
              className="mask-fade-b mt-3 max-h-[296px] flex-1 space-y-3 overflow-y-auto pr-1"
            >
              <AnimatePresence initial={false}>
                {lines.map((line) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed",
                      line.speaker === "ai" && "bg-white text-ink hairline",
                      line.speaker === "lead" && "ml-6 bg-canvas-sunk text-steel",
                      line.speaker === "system" &&
                        "border border-spring/30 bg-spring/5 text-mint",
                    )}
                  >
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "font-mono text-[10px] font-bold uppercase tracking-[0.16em]",
                          line.speaker === "ai" && "text-gradient",
                          line.speaker === "lead" && "text-steel-faint",
                          line.speaker === "system" && "text-mint",
                        )}
                      >
                        {line.speaker === "ai"
                          ? "EZOMOD Voice"
                          : line.speaker === "lead"
                            ? "Marcus"
                            : "System"}
                      </span>
                      {line.tag ? (
                        <span className="rounded-full bg-azure/10 px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-azure">
                          {line.tag}
                        </span>
                      ) : null}
                    </div>
                    <p>
                      {line.typed}
                      {!line.done ? (
                        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-aqua align-middle" />
                      ) : null}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {phase === "transferred" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-brand px-4 py-3 text-white shadow-glow"
                >
                  <span className="text-[13px] font-semibold">
                    Warm transfer live · Danielle R.
                  </span>
                  <span className="font-mono text-[11px] opacity-90">00:41 to booked</span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
