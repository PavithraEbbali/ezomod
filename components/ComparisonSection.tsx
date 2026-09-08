"use client";

import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { Gauge, ShieldX, Sparkles, Zap } from "lucide-react";
import { useRef } from "react";
import MaskedText from "@/components/ui/MaskedText";
import { cn } from "@/lib/utils";

interface Stream {
  title: string;
  detail: string;
}

interface Milestone {
  stamp: string;
  moment: string;
  legacy: Stream;
  engine: Stream;
}

const MILESTONES: Milestone[] = [
  {
    stamp: "T + 00:00",
    moment: "The inquiry lands",
    legacy: {
      title: "Notification buried",
      detail:
        "The lead drops into a shared inbox behind forty unread emails and a Slack channel nobody has open.",
    },
    engine: {
      title: "Signal scored in eight seconds",
      detail:
        "Source, intent language, and browsing depth are read the instant the record is created.",
    },
  },
  {
    stamp: "T + 00:30",
    moment: "First contact",
    legacy: {
      title: "Nobody has looked yet",
      detail:
        "The agent is mid-showing. The lead is still open in three other tabs, filling in three other forms.",
    },
    engine: {
      title: "Omnichannel blitz opens",
      detail:
        "Neural voice dials on local caller ID with WhatsApp and SMS already staged behind it.",
    },
  },
  {
    stamp: "T + 02:00",
    moment: "Qualification",
    legacy: {
      title: "Unstructured discovery",
      detail:
        "Whoever calls back eventually asks whatever they remember to ask, in whatever order they remember it.",
    },
    engine: {
      title: "Identical 4-point rigor",
      detail:
        "Budget band, location, timeline, pre-approval — the same four questions on every lead, every time.",
    },
  },
  {
    stamp: "T + 06:00",
    moment: "The objection",
    legacy: {
      title: "The objection ends the call",
      detail:
        "“It’s over our budget” earns a promise to send more listings. The listings never get sent.",
    },
    engine: {
      title: "Objection reframed live",
      detail:
        "The agent counters with settled-under-ask comps in that exact pocket and keeps the conversation open.",
    },
  },
  {
    stamp: "T + 11:00",
    moment: "Record hygiene",
    legacy: {
      title: "Scribbled notes",
      detail:
        "Half a page in a notebook, one partial CRM field, and context that never survives the drive home.",
    },
    engine: {
      title: "Instant CRM hygiene",
      detail:
        "Recording, transcript, intent score, and four tags are written before the call disconnects.",
    },
  },
  {
    stamp: "T + 15:00",
    moment: "The outcome",
    legacy: {
      title: "Weekend leads leak away",
      detail:
        "Friday-night and Sunday inquiries wait until Monday. By Monday, somebody else answered first.",
    },
    engine: {
      title: "Confirmed calendar appointment",
      detail:
        "The tour is held, the agent is warm-transferred or briefed, and the next touch is already scheduled.",
    },
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function MilestoneRow({ milestone, index }: { milestone: Milestone; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reached = useInView(ref, { once: true, margin: "-42% 0px -42% 0px" });

  return (
    <li
      ref={ref}
      className="relative grid grid-cols-[34px_minmax(0,1fr)] items-start gap-x-3 gap-y-3 lg:grid-cols-[minmax(0,1fr)_78px_minmax(0,1fr)] lg:gap-x-0 lg:gap-y-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.04 }}
        className={cn(
          "col-start-2 row-start-1 rounded-2xl border border-[var(--edge)] bg-white/60 p-4 transition-all duration-700 ease-swift sm:p-5",
          "lg:col-start-1 lg:mr-6 lg:text-right",
          reached ? "opacity-100" : "opacity-70",
        )}
      >
        <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.13em] text-steel-faint">
          <ShieldX className="h-3 w-3" />
          Legacy
        </span>
        <p className="mt-2 text-[15px] font-bold tracking-[-0.02em] text-steel">
          {milestone.legacy.title}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-steel-light">
          {milestone.legacy.detail}
        </p>
      </motion.div>

      <div className="col-start-1 row-start-1 flex justify-center lg:col-start-2 lg:row-start-1 lg:pt-4">
        <motion.span
          animate={
            reached
              ? { scale: 1, borderColor: "rgba(34,197,94,0.55)" }
              : { scale: 0.86, borderColor: "rgba(0,128,255,0.18)" }
          }
          transition={{ duration: 0.5, ease: EASE }}
          className={cn(
            "relative z-10 grid h-[34px] w-[34px] place-items-center rounded-full border-2 bg-white",
            reached ? "shadow-glow" : "shadow-[0_1px_2px_rgba(9,13,26,0.05)]",
          )}
        >
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors duration-500",
              reached ? "bg-brand" : "bg-canvas-deep",
            )}
          />
          <span className="absolute -bottom-6 hidden whitespace-nowrap font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-steel-faint lg:block">
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
        className={cn(
          "col-start-2 row-start-2 rounded-2xl border p-4 transition-all duration-700 ease-swift sm:p-5",
          "lg:col-start-3 lg:row-start-1 lg:ml-6",
          reached
            ? "border-spring/30 bg-white shadow-halo"
            : "border-[var(--edge)] bg-white/70",
        )}
      >
        <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.13em] text-mint">
          <Zap className="h-3 w-3" />
          EZOMOD
        </span>
        <p className="mt-2 text-[15px] font-bold tracking-[-0.02em] text-ink">
          {milestone.engine.title}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-steel">{milestone.engine.detail}</p>
      </motion.div>

      <div className="col-span-2 col-start-1 row-start-3 -mt-1 flex items-center gap-2 pl-[3px] lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:mt-4 lg:justify-center lg:pl-0">
        <span className="chip border-azure/25 text-azure">{milestone.stamp}</span>
        <span className="truncate text-[12.5px] font-medium text-steel-light">
          {milestone.moment}
        </span>
      </div>
    </li>
  );
}

export default function ComparisonSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 78%", "end 65%"],
  });

  const beam = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const puckTop = useTransform(beam, (value) => `${value * 100}%`);
  const puckOpacity = useTransform(beam, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  return (
    <section id="velocity" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-24 h-[560px] w-[900px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,163,255,0.10),transparent)] blur-2xl"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="eyebrow">
            <Gauge className="h-3.5 w-3.5 text-azure" />
            Pipeline velocity
          </span>
          <MaskedText
            as="h2"
            className="mt-5 font-display text-[clamp(1.75rem,4.6vw,2.95rem)] font-extrabold leading-[1.07] tracking-tightest text-ink"
            lines={[
              <>The gap is not effort.</>,
              <>
                It is <span className="text-gradient">response time.</span>
              </>,
            ]}
          />
          <p className="mx-auto mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-steel sm:text-[16.5px]">
            Two pipelines, the same inbound lead, the first fifteen minutes side by side. Nothing
            below is about working harder.
          </p>
        </div>

        <div className="mt-12 hidden grid-cols-[minmax(0,1fr)_78px_minmax(0,1fr)] lg:grid">
          <div className="mr-6 rounded-2xl border border-[var(--edge)] bg-white/60 px-5 py-3.5 text-right">
            <p className="text-[15px] font-bold tracking-[-0.02em] text-steel">
              The Fragmented Legacy Way
            </p>
            <p className="mt-0.5 text-[12.5px] text-steel-faint">
              Human memory, human hours, human gaps
            </p>
          </div>
          <div aria-hidden />
          <div className="ml-6 rounded-2xl border border-spring/30 bg-white px-5 py-3.5 shadow-halo">
            <p className="flex items-center gap-2 text-[15px] font-bold tracking-[-0.02em] text-ink">
              <Sparkles className="h-4 w-4 text-mint" />
              The EZOMOD Autonomous Engine
            </p>
            <p className="mt-0.5 text-[12.5px] text-steel-light">
              One orchestrator, four channels, no gaps
            </p>
          </div>
        </div>

        <div ref={trackRef} className="relative mt-8 lg:mt-10">
          <span
            aria-hidden
            className="absolute bottom-0 left-4 top-0 w-[2px] rounded-full bg-[var(--edge-strong)] opacity-40 lg:left-1/2 lg:-ml-px"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: beam }}
            className="absolute bottom-0 left-4 top-0 w-[2px] origin-top rounded-full bg-gradient-to-b from-azure via-aqua to-spring lg:left-1/2 lg:-ml-px"
          />
          <motion.span
            aria-hidden
            style={{ top: puckTop, opacity: puckOpacity }}
            className="absolute left-4 z-0 -ml-[9px] h-5 w-5 rounded-full bg-brand opacity-90 blur-[3px] lg:left-1/2"
          />

          <ol className="relative space-y-10 lg:space-y-14">
            {MILESTONES.map((milestone, index) => (
              <MilestoneRow key={milestone.stamp} milestone={milestone} index={index} />
            ))}
          </ol>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mt-14 max-w-[600px] text-balance text-center text-[15.5px] leading-relaxed text-steel"
        >
          Same lead. Same market. Same four questions. The only variable that moved was how many
          seconds passed before somebody answered.
        </motion.p>
      </div>
    </section>
  );
}
