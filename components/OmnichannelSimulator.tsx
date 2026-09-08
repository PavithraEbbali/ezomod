"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AudioLines,
  BadgeCheck,
  CalendarCheck,
  CheckCheck,
  DatabaseZap,
  FileText,
  Link2,
  MessageCircle,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";
import Waveform from "@/components/ui/Waveform";
import { cn } from "@/lib/utils";

type TabKey = "voice" | "whatsapp" | "sms" | "crm";

interface Tab {
  key: TabKey;
  label: string;
  short: string;
  icon: LucideIcon;
  meta: string;
}

const TABS: Tab[] = [
  { key: "voice", label: "Neural Voice Call", short: "Voice", icon: AudioLines, meta: "neural voice · live objection handling" },
  { key: "whatsapp", label: "WhatsApp API", short: "WhatsApp", icon: MessageCircle, meta: "rich media dispatched" },
  { key: "sms", label: "Dynamic SMS", short: "SMS", icon: MessageSquareText, meta: "fallback armed · T+00:42" },
  { key: "crm", label: "Unified CRM Sync", short: "CRM Sync", icon: DatabaseZap, meta: "writing before disconnect" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Drives a looping reveal. `step` is the number of revealed items; it holds one
 * tick at `length` before restarting so the final frame is readable.
 */
function useSequence(length: number, interval: number): [number, (value: number) => void] {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (length <= 0) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setStep((value) => (value >= length ? 0 : value + 1));
    }, interval);
    return () => window.clearInterval(id);
  }, [length, interval]);

  return [step, setStep];
}

/* ------------------------------------------------------------------ voice - */

type QualKey = "budget" | "location" | "timeline" | "preapproval";

interface VoiceLine {
  role: "agent" | "lead" | "system";
  text: string;
  unlocks?: QualKey[];
}

const QUALIFICATION: { key: QualKey; label: string }[] = [
  { key: "budget", label: "Budget band" },
  { key: "location", label: "Location" },
  { key: "timeline", label: "Timeline" },
  { key: "preapproval", label: "Pre-approval" },
];

const VOICE_SCRIPT: VoiceLine[] = [
  {
    role: "agent",
    text: "Marcus, this is the EZOMOD desk for Dana at Ridgemont Realty. You saved the four-bed on Ridgemont eleven seconds ago — still hunting that pocket?",
  },
  {
    role: "lead",
    text: "We are, but honestly everything on that street lists way above what we can stretch to.",
    unlocks: ["location"],
  },
  {
    role: "agent",
    text: "Fair — list is the ask, not the close. Three homes on Ridgemont settled under ask in the last sixty days. If we anchored an offer inside your approved band, does that street work again?",
  },
  {
    role: "lead",
    text: "It would. We're already pre-approved through Summit, so the band is set.",
    unlocks: ["budget", "preapproval"],
  },
  { role: "agent", text: "Good. How fast are you trying to be holding keys?" },
  {
    role: "lead",
    text: "Before the school year — call it under sixty days.",
    unlocks: ["timeline"],
  },
  {
    role: "agent",
    text: "Then let's walk it. Dana has Thursday 6:15pm or Saturday 10:00am. Which one do you want?",
  },
  { role: "lead", text: "Saturday morning." },
  { role: "system", text: "Tour confirmed · warm transfer to Dana R. live · CRM record written" },
];

const ROLE_STYLES: Record<VoiceLine["role"], string> = {
  agent: "border-azure/20 bg-azure/[0.055] text-ink",
  lead: "border-[var(--edge)] bg-white text-ink",
  system: "border-spring/25 bg-spring/[0.07] text-mint",
};

const ROLE_LABEL: Record<VoiceLine["role"], string> = {
  agent: "EZOMOD agent",
  lead: "Marcus W. · buyer",
  system: "System",
};

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

function VoicePanel() {
  const [step] = useSequence(VOICE_SCRIPT.length, 2400);
  const [seconds, setSeconds] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (step === 0) setSeconds(0);
    const node = scrollRef.current;
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [step]);

  const visible = VOICE_SCRIPT.slice(0, step);
  const current = visible[visible.length - 1];
  const intensity = current?.role === "agent" ? 0.95 : current?.role === "lead" ? 0.5 : 0.12;
  const unlocked = new Set<QualKey>(visible.flatMap((line) => line.unlocks ?? []));

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--edge)] bg-white px-3.5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-glow">
            <PhoneCall className="h-4 w-4" />
            <span className="absolute inset-0 animate-pulseRing rounded-xl border border-spring/50" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-semibold tracking-[-0.01em] text-ink">
              Marcus Webb
            </span>
            <span className="block truncate font-mono text-[10.5px] uppercase tracking-[0.12em] text-steel-faint">
              inbound IDX · Ridgemont
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="chip border-spring/30 text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-spring" />
            live
          </span>
          <span className="tabnum font-mono text-[12px] font-semibold text-ink">
            {pad(Math.floor(seconds / 60))}:{pad(seconds % 60)}
          </span>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-[var(--edge)] bg-canvas-sunk px-3.5 py-2.5">
        <Waveform intensity={intensity} bars={40} className="h-10" />
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5"
      >
        <AnimatePresence initial={false}>
          {visible.map((line, index) => (
            <motion.div
              key={`${index}-${line.role}`}
              initial={{ opacity: 0, y: 12, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: EASE }}
              className={cn(
                "rounded-2xl border px-3.5 py-2.5",
                ROLE_STYLES[line.role],
                line.role === "lead" && "ml-4",
                line.role === "agent" && "mr-4",
              )}
            >
              <span className="mb-1 block font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-steel-faint">
                {ROLE_LABEL[line.role]}
              </span>
              <p className="text-[13px] leading-relaxed">{line.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {QUALIFICATION.map((point) => {
          const done = unlocked.has(point.key);
          return (
            <div
              key={point.key}
              className={cn(
                "flex items-center gap-1.5 rounded-xl border px-2.5 py-2 transition-all duration-500 ease-swift",
                done
                  ? "border-spring/30 bg-spring/[0.08] text-ink"
                  : "border-[var(--edge)] bg-white text-steel-faint",
              )}
            >
              <BadgeCheck
                className={cn("h-3.5 w-3.5 shrink-0", done ? "text-mint" : "text-steel-faint/60")}
              />
              <span className="truncate text-[11px] font-semibold tracking-[-0.01em]">
                {point.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- whatsapp - */

type WaMessage =
  | { kind: "out" | "in"; text: string; time: string }
  | { kind: "media"; text: string; time: string }
  | { kind: "cta"; text: string; time: string };

const WA_THREAD: WaMessage[] = [
  {
    kind: "out",
    text: "Marcus — floor plan and HOA sheet for 214 Ridgemont, straight from the listing feed.",
    time: "10:41",
  },
  { kind: "media", text: "214-Ridgemont · floor plan + HOA sheet", time: "10:41" },
  { kind: "in", text: "Perfect. Is the garage converted or original?", time: "10:42" },
  {
    kind: "out",
    text: "Original two-car, permits on file. Dana can walk it Saturday 10:00am — one tap and it's held.",
    time: "10:42",
  },
  { kind: "cta", text: "Confirm tour · Saturday 10:00am", time: "10:42" },
  { kind: "in", text: "Booked it 🙌", time: "10:43" },
];

function FloorPlan() {
  return (
    <svg viewBox="0 0 200 116" className="h-[92px] w-full" role="img" aria-label="Floor plan preview">
      <rect x="0" y="0" width="200" height="116" fill="#F3F7FA" />
      <g stroke="#007BFF" strokeOpacity="0.34" strokeWidth="1.6" fill="rgba(0,123,255,0.05)">
        <rect x="12" y="12" width="78" height="52" rx="2" />
        <rect x="98" y="12" width="90" height="34" rx="2" />
        <rect x="98" y="54" width="42" height="50" rx="2" />
        <rect x="148" y="54" width="40" height="50" rx="2" />
        <rect x="12" y="72" width="78" height="32" rx="2" />
      </g>
      <g stroke="#22C55E" strokeOpacity="0.6" strokeWidth="1.4" fill="none">
        <path d="M52 64 A 10 10 0 0 1 62 74" />
        <path d="M98 30 A 10 10 0 0 0 108 40" />
      </g>
      <g fill="#475569" fontSize="6.5" fontFamily="var(--font-mono)">
        <text x="18" y="24">GREAT ROOM</text>
        <text x="104" y="24">KITCHEN</text>
        <text x="104" y="66">BED 1</text>
        <text x="154" y="66">BED 2</text>
        <text x="18" y="84">GARAGE</text>
      </g>
    </svg>
  );
}

function WhatsAppPanel() {
  const [step, setStep] = useSequence(WA_THREAD.length, 1500);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [step]);

  const visible = WA_THREAD.slice(0, step);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between rounded-2xl border border-[var(--edge)] bg-white px-3.5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-spring/12 text-mint">
            <MessageCircle className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-[14px] font-semibold tracking-[-0.01em] text-ink">
              WhatsApp Business
              <ShieldCheck className="h-3.5 w-3.5 text-aqua" />
            </span>
            <span className="block font-mono text-[10.5px] uppercase tracking-[0.12em] text-steel-faint">
              verified sender · template approved
            </span>
          </span>
        </div>
        <span className="chip hidden border-aqua/25 text-aqua sm:inline-flex">rich media</span>
      </div>

      <div ref={scrollRef} className="no-scrollbar mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
        <AnimatePresence initial={false}>
          {visible.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={cn("flex", message.kind === "in" ? "justify-start" : "justify-end")}
            >
              <div
                className={cn(
                  "max-w-[86%] rounded-2xl border px-3 py-2.5",
                  message.kind === "in"
                    ? "rounded-bl-md border-[var(--edge)] bg-white"
                    : "rounded-br-md border-spring/25 bg-spring/[0.08]",
                )}
              >
                {message.kind === "media" ? (
                  <div className="w-[210px] max-w-full">
                    <div className="overflow-hidden rounded-xl border border-[var(--edge)]">
                      <FloorPlan />
                    </div>
                    <span className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-ink">
                      <FileText className="h-3.5 w-3.5 shrink-0 text-azure" />
                      <span className="truncate">{message.text}</span>
                    </span>
                  </div>
                ) : message.kind === "cta" ? (
                  <button
                    type="button"
                    onClick={() => setStep(WA_THREAD.length)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-3.5 py-2.5 text-[12.5px] font-semibold text-white shadow-glow transition-transform duration-300 ease-swift hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    {message.text}
                  </button>
                ) : (
                  <p className="text-[13px] leading-relaxed text-ink">{message.text}</p>
                )}
                <span className="mt-1.5 flex items-center justify-end gap-1 font-mono text-[9.5px] text-steel-faint">
                  {message.time}
                  {message.kind !== "in" ? <CheckCheck className="h-3 w-3 text-aqua" /> : null}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="mt-3 flex items-center gap-2 rounded-2xl border border-[var(--edge)] bg-canvas-sunk px-3.5 py-2.5 text-[11.5px] text-steel">
        <CalendarCheck className="h-3.5 w-3.5 shrink-0 text-mint" />
        One-tap Cal.com booking writes straight to the agent calendar — no form, no callback.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------- sms - */

interface SmsMessage {
  dir: "out" | "in";
  text: string;
  link?: string;
  stamp: string;
}

const SMS_LADDER = [
  { label: "Neural voice", detail: "no answer", state: "done" },
  { label: "SMS fallback", detail: "T+00:42", state: "active" },
  { label: "WhatsApp", detail: "T+06:00", state: "queued" },
  { label: "Email brief", detail: "T+02:00h", state: "queued" },
] as const;

const SMS_THREAD: SmsMessage[] = [
  {
    dir: "out",
    text: "Marcus — EZOMOD for Dana at Ridgemont Realty. Missed you just now. Here are the three Ridgemont four-beds still active this morning:",
    link: "ezomod.link/mls/ridgemont-4bd",
    stamp: "T+00:42",
  },
  { dir: "in", text: "Sorry, was driving. Any of them three bed instead?", stamp: "T+01:58" },
  {
    dir: "out",
    text: "Two, both under the same HOA. Live MLS set, refreshes every 15 minutes:",
    link: "ezomod.link/mls/ridgemont-3bd",
    stamp: "T+02:04",
  },
  { dir: "in", text: "The second one. Can someone show it Saturday?", stamp: "T+02:31" },
  { dir: "out", text: "Holding Saturday 10:00am with Dana. Confirmed — calendar invite sent.", stamp: "T+02:33" },
];

const LADDER_STYLES: Record<string, string> = {
  done: "border-[var(--edge)] bg-white text-steel-faint",
  active: "border-azure/30 bg-azure/[0.07] text-ink shadow-halo",
  queued: "border-dashed border-[var(--edge)] bg-canvas-sunk text-steel-faint",
};

function SmsPanel() {
  const [step] = useSequence(SMS_THREAD.length, 1700);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [step]);

  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {SMS_LADDER.map((item) => (
          <div
            key={item.label}
            className={cn(
              "rounded-xl border px-2.5 py-2 transition-all duration-500 ease-swift",
              LADDER_STYLES[item.state],
            )}
          >
            <span className="block truncate text-[11.5px] font-semibold tracking-[-0.01em]">
              {item.label}
            </span>
            <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.12em]">
              {item.detail}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-azure/25 bg-azure/[0.055] px-3.5 py-2.5">
        <Timer className="h-3.5 w-3.5 shrink-0 text-azure" />
        <p className="text-[11.5px] font-medium text-ink">
          Voice went unanswered — SMS fired <span className="font-semibold">42 seconds</span> later
          with live MLS links keyed to the exact search.
        </p>
      </div>

      <div ref={scrollRef} className="no-scrollbar mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
        <AnimatePresence initial={false}>
          {SMS_THREAD.slice(0, step).map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={cn("flex", message.dir === "in" ? "justify-start" : "justify-end")}
            >
              <div
                className={cn(
                  "max-w-[88%] rounded-2xl border px-3.5 py-2.5",
                  message.dir === "in"
                    ? "rounded-bl-md border-[var(--edge)] bg-white"
                    : "rounded-br-md border-azure/20 bg-azure/[0.055]",
                )}
              >
                <p className="text-[13px] leading-relaxed text-ink">{message.text}</p>
                {message.link ? (
                  <span className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-lg border border-[var(--edge)] bg-white px-2.5 py-1.5">
                    <Link2 className="h-3 w-3 shrink-0 text-aqua" />
                    <span className="break-anywhere font-mono text-[10.5px] font-medium text-azure">
                      {message.link}
                    </span>
                  </span>
                ) : null}
                <span className="mt-1.5 block text-right font-mono text-[9.5px] text-steel-faint">
                  {message.stamp}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- crm - */

interface JsonLine {
  indent: number;
  key?: string;
  value?: string;
  kind: "brace" | "string" | "number" | "bool";
}

const CRM_PAYLOAD: JsonLine[] = [
  { indent: 0, value: "{", kind: "brace" },
  { indent: 1, key: "lead_id", value: '"FUB-88412"', kind: "string" },
  { indent: 1, key: "channel", value: '"neural_voice"', kind: "string" },
  { indent: 1, key: "duration_sec", value: "214", kind: "number" },
  { indent: 1, key: "recording", value: '"cdn.ezomod.ai/rec/88412.mp3"', kind: "string" },
  { indent: 1, key: "transcript", value: '"attached · full turn-by-turn"', kind: "string" },
  { indent: 1, key: "qualification", value: "{", kind: "brace" },
  { indent: 2, key: "budget_band", value: '"verified · inside approved range"', kind: "string" },
  { indent: 2, key: "location", value: '"Ridgemont / Travis Heights"', kind: "string" },
  { indent: 2, key: "timeline", value: '"under 60 days"', kind: "string" },
  { indent: 2, key: "pre_approved", value: "true", kind: "bool" },
  { indent: 1, value: "},", kind: "brace" },
  { indent: 1, key: "objections_handled", value: '["list_price_ceiling"]', kind: "string" },
  { indent: 1, key: "intent_score", value: "92", kind: "number" },
  { indent: 1, key: "outcome", value: '"tour_booked"', kind: "string" },
  { indent: 1, key: "next_action", value: '"warm_transfer → Dana R."', kind: "string" },
  { indent: 1, key: "synced", value: '["Follow Up Boss", "HubSpot"]', kind: "string" },
  { indent: 0, value: "}", kind: "brace" },
];

const VALUE_COLOR: Record<JsonLine["kind"], string> = {
  brace: "text-steel-faint",
  string: "text-mint",
  number: "text-azure",
  bool: "text-aqua",
};

const CRM_TARGETS = [
  { name: "Follow Up Boss", detail: "record + tags" },
  { name: "HubSpot", detail: "deal stage" },
  { name: "Google Calendar", detail: "tour held" },
] as const;

function CrmPanel() {
  const [step] = useSequence(CRM_PAYLOAD.length, 190);
  const scrollRef = useRef<HTMLDivElement>(null);
  const complete = step >= CRM_PAYLOAD.length;

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [step]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[var(--edge)] bg-white px-3.5 py-3">
        <span className="flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-steel">
          <DatabaseZap className="h-3.5 w-3.5 text-azure" />
          POST /v2/leads/88412/telemetry
        </span>
        <span
          className={cn(
            "chip transition-colors duration-500",
            complete ? "border-spring/30 text-mint" : "border-azure/25 text-azure",
          )}
        >
          {complete ? "200 OK · 0.8s pre-disconnect" : "streaming"}
        </span>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar mt-3 min-h-0 flex-1 overflow-auto rounded-2xl border border-[var(--edge)] bg-canvas-sunk px-3 py-3"
      >
        <pre className="font-mono text-[11px] leading-[1.75]">
          {CRM_PAYLOAD.slice(0, step).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.24, ease: EASE }}
              className="whitespace-pre-wrap break-anywhere"
            >
              <span>{"  ".repeat(line.indent)}</span>
              {line.key ? <span className="text-ink">&quot;{line.key}&quot;</span> : null}
              {line.key ? <span className="text-steel-faint">: </span> : null}
              <span className={VALUE_COLOR[line.kind]}>{line.value}</span>
              {line.key && index < CRM_PAYLOAD.length - 2 && line.value !== "{" ? (
                <span className="text-steel-faint">,</span>
              ) : null}
            </motion.div>
          ))}
          {!complete ? (
            <span className="inline-block h-[13px] w-[7px] translate-y-[2px] animate-pulse bg-azure" />
          ) : null}
        </pre>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-3">
        {CRM_TARGETS.map((target, index) => {
          const pushed = step > CRM_PAYLOAD.length - 3 - index;
          return (
            <div
              key={target.name}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-2.5 py-2 transition-all duration-500 ease-swift",
                pushed
                  ? "border-spring/30 bg-spring/[0.08]"
                  : "border-[var(--edge)] bg-white opacity-60",
              )}
            >
              <CheckCheck
                className={cn("h-3.5 w-3.5 shrink-0", pushed ? "text-mint" : "text-steel-faint")}
              />
              <span className="min-w-0">
                <span className="block truncate text-[11.5px] font-semibold text-ink">
                  {target.name}
                </span>
                <span className="block truncate font-mono text-[9.5px] uppercase tracking-[0.1em] text-steel-faint">
                  {target.detail}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- shell - */

const PANELS: Record<TabKey, ComponentType> = {
  voice: VoicePanel,
  whatsapp: WhatsAppPanel,
  sms: SmsPanel,
  crm: CrmPanel,
};

export default function OmnichannelSimulator() {
  const [active, setActive] = useState<TabKey>("voice");
  const Panel = PANELS[active];
  const meta = TABS.find((tab) => tab.key === active)?.meta ?? "";

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[44px] bg-[radial-gradient(closest-side,rgba(0,163,255,0.16),transparent)] blur-2xl"
      />
      <div className="overflow-hidden rounded-[28px] border border-[var(--edge)] bg-white/85 shadow-halo-lg backdrop-blur-xl sm:rounded-[32px]">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--edge)] bg-canvas-sunk/80 px-4 py-3">
          <span className="flex items-center gap-1.5">
            {["#FF5F57", "#FEBC2E", "#28C840"].map((dot) => (
              <span key={dot} className="h-2.5 w-2.5 rounded-full" style={{ background: dot }} />
            ))}
          </span>
          <span className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-steel-faint">
            omnichannel mission control
          </span>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-spring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-spring" />
            </span>
            <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.12em] text-mint sm:inline">
              live
            </span>
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Omnichannel surfaces"
          className="no-scrollbar flex gap-1 overflow-x-auto border-b border-[var(--edge)] bg-white/70 px-2 py-2"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const selected = active === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.key)}
                className={cn(
                  "relative flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold tracking-[-0.01em] transition-colors duration-300",
                  selected ? "text-white" : "text-steel hover:text-ink",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="omni-tab"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    className="absolute inset-0 rounded-full bg-brand shadow-glow"
                  />
                ) : null}
                <Icon className="relative h-3.5 w-3.5" />
                <span className="relative whitespace-nowrap sm:hidden">{tab.short}</span>
                <span className="relative hidden whitespace-nowrap sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
          <div className="h-[440px] sm:h-[470px]">
            {/* Keyed remount, not AnimatePresence: a tab switch can never stall
                waiting on an exit frame that a backgrounded tab never renders. */}
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, ease: EASE }}
              className="h-full"
            >
              <Panel />
            </motion.div>
          </div>

          <p className="mt-3 truncate border-t border-[var(--edge)] pt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-steel-faint">
            {meta}
          </p>
        </div>
      </div>
    </div>
  );
}
