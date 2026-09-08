"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  MapPin,
  Send,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import MaskedText from "@/components/ui/MaskedText";
import { setScrollLock } from "@/components/providers/LenisProvider";
import { cn } from "@/lib/utils";

type Status = "open" | "one-left" | "reserved";

interface Territory {
  metro: string;
  code: string;
  status: Status;
}

const TERRITORIES: Territory[] = [
  { metro: "Austin, TX", code: "ATX", status: "open" },
  { metro: "Phoenix, AZ", code: "PHX", status: "one-left" },
  { metro: "Tampa, FL", code: "TPA", status: "open" },
  { metro: "Charlotte, NC", code: "CLT", status: "open" },
  { metro: "Denver, CO", code: "DEN", status: "one-left" },
  { metro: "San Diego, CA", code: "SAN", status: "reserved" },
];

const PROFILES = [
  { label: "Inbound speed-to-lead", detail: "Sub-30s omnichannel blitz on every new inquiry" },
  { label: "Database reactivation", detail: "Dormant contacts re-opened across voice and WhatsApp" },
  { label: "Full lifecycle ops", detail: "Outreach, escalation, Tier-1 desk, and dunning" },
] as const;

const AGENDA = [
  "Watch the agent work a live objection end to end",
  "Map the escalation tree against your own household data",
  "Wire the CRM write-back into your existing pipeline stages",
  "Confirm territory exclusivity before anyone else in the metro",
] as const;

const STATUS_STYLES: Record<Status, string> = {
  open: "bg-spring/10 text-mint",
  "one-left": "bg-azure/10 text-azure",
  reserved: "bg-canvas-deep text-steel-faint",
};

const STATUS_LABEL: Record<Status, string> = {
  open: "Open",
  "one-left": "1 slot left",
  reserved: "Reserved",
};

const EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Lead {
  name: string;
  email: string;
  company: string;
}

const EMPTY_LEAD: Lead = { name: "", email: "", company: "" };

function SchedulingTerminal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [territory, setTerritory] = useState<Territory | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [lead, setLead] = useState<Lead>(EMPTY_LEAD);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  const submit = () => {
    if (!lead.name.trim()) return setError("Name is required.");
    if (!EMAIL_PATTERN.test(lead.email)) return setError("Enter a valid work email.");
    setError(null);
    const suffix = Math.floor(1000 + Math.random() * 9000);
    setReference(`EZO-${territory?.code ?? "GEN"}-${suffix}`);
    setStep(3);
  };

  const mailto = `mailto:ops@ezomod.ai?subject=${encodeURIComponent(
    `Architecture audit · ${territory?.metro ?? "territory"} · ${reference ?? ""}`,
  )}&body=${encodeURIComponent(
    [
      `Reference: ${reference ?? ""}`,
      `Territory: ${territory?.metro ?? ""}`,
      `Operations profile: ${profile ?? ""}`,
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Brokerage: ${lead.company || "—"}`,
    ].join("\n"),
  )}`;

  const stepLabel = Math.min(step + 1, 4);

  return (
    <motion.div
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-title"
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.38, ease: EASE }}
      onClick={(event) => event.stopPropagation()}
      className="relative w-full max-w-[560px] overflow-hidden rounded-[26px] border border-[var(--edge-strong)] bg-white shadow-halo-lg outline-none"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--edge)] bg-canvas-sunk px-4 py-3">
        <span className="flex min-w-0 items-center gap-2">
          <Terminal className="h-3.5 w-3.5 shrink-0 text-azure" />
          <span
            id="terminal-title"
            className="truncate font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-steel"
          >
            schedule --architecture-audit
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-[10.5px] text-steel-faint">{stepLabel} / 4</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close scheduling terminal"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--edge)] bg-white text-steel transition-colors hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </span>
      </div>

      <div className="h-1 w-full bg-canvas-deep">
        <motion.span
          className="block h-full bg-brand"
          animate={{ width: `${(stepLabel / 4) * 100}%` }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
        {/* Keyed remount rather than AnimatePresence: the step can never stall
            waiting on an exit frame that a backgrounded tab never renders. */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          {step === 0 ? (
            <div>
              <p className="font-mono text-[11px] text-steel-faint">
                <span className="text-mint">➜</span> select --territory
              </p>
              <h3 className="mt-2 text-[18px] font-bold tracking-[-0.02em] text-ink">
                Which metro are we deploying into?
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {TERRITORIES.map((item) => {
                  const disabled = item.status === "reserved";
                  return (
                    <button
                      key={item.code}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        setTerritory(item);
                        setStep(1);
                      }}
                      className={cn(
                        "rounded-2xl border px-4 py-3 text-left transition-all duration-300 ease-swift",
                        disabled
                          ? "cursor-not-allowed border-[var(--edge)] bg-canvas-sunk text-steel-faint"
                          : "border-[var(--edge)] bg-white text-ink hover:-translate-y-0.5 hover:border-[var(--edge-strong)] hover:shadow-halo",
                      )}
                    >
                      <span className="block text-[14px] font-medium">{item.metro}</span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-steel-faint">
                        {STATUS_LABEL[item.status]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div>
              <p className="font-mono text-[11px] text-steel-faint">
                <span className="text-mint">➜</span> set --ops-profile {territory?.code}
              </p>
              <h3 className="mt-2 text-[18px] font-bold tracking-[-0.02em] text-ink">
                What should the agent run first?
              </h3>
              <div className="mt-4 space-y-2">
                {PROFILES.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setProfile(item.label);
                      setStep(2);
                    }}
                    className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[var(--edge)] bg-white px-4 py-3.5 text-left transition-all duration-300 ease-swift hover:-translate-y-0.5 hover:border-[var(--edge-strong)] hover:shadow-halo"
                  >
                    <span className="min-w-0">
                      <span className="block text-[14px] font-medium text-ink">{item.label}</span>
                      <span className="mt-0.5 block text-[12.5px] text-steel-light">
                        {item.detail}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-steel-faint" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-light transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-3 w-3" />
                back
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submit();
              }}
            >
              <p className="font-mono text-[11px] text-steel-faint">
                <span className="text-mint">➜</span> auth --operator
              </p>
              <h3 className="mt-2 text-[18px] font-bold tracking-[-0.02em] text-ink">
                Where do we send the audit link?
              </h3>

              <div className="mt-4 space-y-3">
                {(
                  [
                    { key: "name", label: "Full name", type: "text", placeholder: "Dana Reyes" },
                    {
                      key: "email",
                      label: "Work email",
                      type: "email",
                      placeholder: "dana@ridgemontrealty.com",
                    },
                    {
                      key: "company",
                      label: "Brokerage or team (optional)",
                      type: "text",
                      placeholder: "Ridgemont Realty",
                    },
                  ] as const
                ).map((field) => (
                  <label key={field.key} className="block">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-steel-faint">
                      {field.label}
                    </span>
                    <input
                      type={field.type}
                      value={lead[field.key]}
                      onChange={(event) =>
                        setLead((current) => ({ ...current, [field.key]: event.target.value }))
                      }
                      placeholder={field.placeholder}
                      autoComplete={field.key === "email" ? "email" : "off"}
                      /* 16px on mobile stops iOS Safari zooming the page on focus. */
                      className="mt-1.5 w-full rounded-2xl border border-[var(--edge)] bg-canvas-sunk px-4 py-3 text-[16px] text-ink outline-none transition-all duration-300 placeholder:text-steel-faint focus:border-azure/45 focus:bg-white focus:shadow-halo sm:text-[14px]"
                    />
                  </label>
                ))}
              </div>

              {error ? (
                <p className="mt-3 font-mono text-[11px] text-azure-deep">{error}</p>
              ) : null}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[14px] font-semibold text-white shadow-glow transition-transform duration-300 ease-swift hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Reserve the slot
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-light transition-colors hover:text-ink"
                >
                  <ArrowLeft className="h-3 w-3" />
                  back
                </button>
              </div>
            </form>
          ) : null}

          {step === 3 ? (
            <div>
              <p className="font-mono text-[11px] text-steel-faint">
                <span className="text-mint">➜</span> hold --confirm
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-mint" />
                <h3 className="text-[18px] font-bold tracking-[-0.02em] text-ink">
                  Territory hold created
                </h3>
              </div>

              <dl className="mt-4 space-y-2 rounded-2xl border border-[var(--edge)] bg-canvas-sunk p-4">
                {[
                  { term: "Reference", value: reference ?? "" },
                  { term: "Territory", value: territory?.metro ?? "" },
                  { term: "Ops profile", value: profile ?? "" },
                  { term: "Operator", value: lead.name },
                  { term: "Audit link to", value: lead.email },
                ].map((row) => (
                  <div key={row.term} className="flex items-start justify-between gap-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.13em] text-steel-faint">
                      {row.term}
                    </dt>
                    <dd className="break-anywhere text-right text-[13px] font-semibold text-ink">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-[13.5px] leading-relaxed text-steel">
                The hold is provisional for 72 hours. Send it through and we will confirm the live
                architecture walkthrough for {territory?.metro}.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={mailto}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[14px] font-semibold text-white shadow-glow transition-transform duration-300 ease-swift hover:-translate-y-0.5"
                >
                  <Send className="h-4 w-4" />
                  Send to operations
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--edge-strong)] bg-white px-5 py-3 text-[14px] font-semibold text-ink transition-transform duration-300 ease-swift hover:-translate-y-0.5"
                >
                  Close terminal
                </button>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>

      <p className="border-t border-[var(--edge)] px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.13em] text-steel-faint">
        esc to close · no card, no commitment
      </p>
    </motion.div>
  );
}

export default function CtaSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setScrollLock(open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => setScrollLock(false), []);

  return (
    <section id="book" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-8 h-[520px] w-[980px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.16),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="grid-faint absolute inset-0 opacity-40 [mask-image:radial-gradient(700px_420px_at_50%_40%,#000,transparent)]"
      />

      <div className="container-x relative">
        <div className="overflow-hidden rounded-[28px] border border-[var(--edge)] bg-white/85 shadow-halo-lg backdrop-blur-xl sm:rounded-[36px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
            <div className="border-b border-[var(--edge)] p-6 sm:p-10 lg:border-b-0 lg:border-r">
              <span className="eyebrow">
                <Lock className="h-3.5 w-3.5 text-mint" />
                One brokerage per territory
              </span>

              <MaskedText
                as="h2"
                className="mt-5 font-display text-[clamp(1.7rem,4.4vw,2.75rem)] font-extrabold leading-[1.06] tracking-tightest text-ink"
                lines={[
                  <>Automate Your Pipeline.</>,
                  <>
                    <span className="text-gradient">Reserve Your Territory.</span>
                  </>,
                ]}
              />

              <p className="mt-5 max-w-[46ch] text-[15.5px] leading-relaxed text-steel sm:text-[16px]">
                We deploy a single autonomous engine per market so the lead pool stays
                uncontested. Book the live architecture demo, hear the agent work a real
                objection, and lock the zone in the same session.
              </p>

              <ul className="mt-7 space-y-2.5">
                {AGENDA.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                    <span className="text-[14px] leading-relaxed text-steel">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton
                  onClick={() => setOpen(true)}
                  className="w-full justify-center sm:w-auto"
                  icon={<Zap className="h-4 w-4" />}
                >
                  Open Scheduling Terminal
                </MagneticButton>
              </div>
            </div>

            <div className="bg-canvas-sunk p-6 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.15em] text-steel">
                  <Terminal className="h-3.5 w-3.5 text-azure" />
                  Territory register
                </span>
                <span className="chip border-spring/30 text-mint">
                  <span className="h-1.5 w-1.5 rounded-full bg-spring" />
                  live
                </span>
              </div>

              <div className="mt-5 space-y-2">
                {TERRITORIES.map((item, index) => (
                  <motion.div
                    key={item.code}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--edge)] bg-white px-4 py-3"
                  >
                    <span className="flex min-w-0 items-center gap-2.5 text-[14px] font-medium text-ink">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-steel-faint" />
                      <span className="truncate">{item.metro}</span>
                    </span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.11em]",
                        STATUS_STYLES[item.status],
                      )}
                    >
                      {STATUS_LABEL[item.status]}
                    </span>
                  </motion.div>
                ))}
              </div>

              <p className="mt-5 text-center font-mono text-[10.5px] uppercase tracking-[0.13em] text-steel-faint">
                Deployment window · 9 business days
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="terminal-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ink/25 px-3 py-6 backdrop-blur-md sm:px-6"
          >
            <SchedulingTerminal onClose={() => setOpen(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
