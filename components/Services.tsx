"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { CalendarClock, CheckCircle2, Headset, User } from "lucide-react";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const MAX_TILT = 4;

/** Tilt only on devices with a real hover-capable pointer; touch screens get a static card. */
function useCanTilt() {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFinePointer(query.matches);
    const onChange = (event: MediaQueryListEvent) => setFinePointer(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return finePointer && !reduceMotion;
}

function BentoCard({ className, children }: { className?: string; children: ReactNode }) {
  const canTilt = useCanTilt();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), spring);

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (!canTilt) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <motion.article
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={canTilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        whileHover={canTilt ? { y: -2 } : undefined}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 transition-shadow duration-300 sm:p-8 [@media(hover:hover)]:hover:shadow-[0_20px_40px_-15px_rgba(0,123,255,0.1)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,123,255,0.05),rgba(34,197,94,0.04)_55%,transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {children}
      </motion.article>
    </div>
  );
}

function CardText({ title, text }: { title: string; text: string }) {
  return (
    <div className="relative mt-auto pt-6">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 leading-relaxed text-slate-500">{text}</p>
    </div>
  );
}

const WAVE_HEIGHTS = [40, 70, 55, 90, 65, 100, 75, 50, 85, 60, 95, 45, 70, 55, 80, 40, 65, 90, 50, 70];

function CallMicroUI() {
  return (
    <div className="relative flex flex-col gap-4 rounded-xl border border-slate-200/70 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#007BFF_0%,#22C55E_100%)] text-white shadow-md shadow-[#0080FF]/20">
          <Headset className="h-5 w-5" aria-hidden />
        </span>
        <div aria-hidden className="flex h-10 items-center gap-[3px]">
          {WAVE_HEIGHTS.map((height, index) => (
            <span
              key={index}
              style={{ height: `${height}%`, animationDelay: `${(index % 7) * 0.12}s` }}
              className="w-[3px] origin-center animate-wave rounded-full bg-gradient-to-b from-[#007BFF] to-[#22C55E] motion-reduce:animate-none"
            />
          ))}
        </div>
      </div>
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/[0.08] px-3 py-1 text-xs font-semibold tabular-nums text-[#15803D]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" aria-hidden />
        Live Call: 00:00:24
      </span>
    </div>
  );
}

function TimelineMicroUI() {
  return (
    <div className="relative rounded-xl border border-slate-200/70 bg-slate-50/60 p-4">
      <div className="relative flex items-center justify-between px-1">
        <span aria-hidden className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-slate-200" />
        <span aria-hidden className="relative h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span aria-hidden className="relative h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span
          aria-hidden
          className="relative h-3.5 w-3.5 rounded-full bg-[linear-gradient(135deg,#007BFF_0%,#22C55E_100%)] ring-4 ring-[#007BFF]/10"
        />
        <span aria-hidden className="relative h-2.5 w-2.5 rounded-full bg-slate-200" />
      </div>
      <div className="mt-4 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-lg border border-[#007BFF]/20 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
          <CalendarClock className="h-3.5 w-3.5 text-[#007BFF]" aria-hidden />
          Oct 14: Follow-up Scheduled
        </span>
      </div>
    </div>
  );
}

function ContactGraphMicroUI() {
  return (
    <div
      aria-hidden
      className="relative flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/60 px-6 py-5"
    >
      <div className="flex flex-col items-center gap-1.5">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-slate-100 text-slate-400">
          <User className="h-5 w-5" />
        </span>
        <span className="text-[11px] font-medium text-slate-400">No reply</span>
      </div>
      <svg className="mx-2 h-2 flex-1" preserveAspectRatio="none" viewBox="0 0 100 2">
        <line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="url(#contact-line)"
          strokeWidth="2"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
          className="animate-dash motion-reduce:animate-none"
        />
        <defs>
          <linearGradient id="contact-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#007BFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col items-center gap-1.5">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#007BFF] text-white shadow-md shadow-[#007BFF]/30 ring-4 ring-[#007BFF]/10">
          <User className="h-5 w-5" />
        </span>
        <span className="text-[11px] font-medium text-[#007BFF]">Co-buyer</span>
      </div>
    </div>
  );
}

function SupportMicroUI() {
  return (
    <div className="relative flex min-h-[112px] items-center rounded-xl border border-slate-200/70 bg-slate-50/60 p-4">
      <div className="relative w-full max-w-sm">
        <span className="flex w-fit items-center gap-2 rounded-lg border border-[#007BFF]/20 bg-white px-3 py-2 text-xs font-semibold text-[#007BFF] shadow-sm">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
          Support Ticket Assessed
        </span>
        <span className="relative -mt-1 ml-10 flex w-fit items-center gap-2 rounded-lg border border-[#22C55E]/30 bg-white px-3 py-2 text-xs font-semibold text-[#15803D] shadow-md sm:ml-24">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]" aria-hidden />
          Payment Recovered: $1,250
        </span>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="h2">What we build for you</h2>
          <p className="lead mt-4">
            One system that covers the whole lead lifecycle, from the first inquiry to the client
            relationship after the contract is signed.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          <BentoCard className="md:col-span-2">
            <CallMicroUI />
            <CardText
              title="Instant first response"
              text="Every new inquiry gets a phone call within about thirty seconds, day or night, with a text and email sent if they don't pick up. Real estate questions like HOA dues, contingencies, and pre-approval are handled naturally on the call."
            />
          </BentoCard>

          <BentoCard>
            <TimelineMicroUI />
            <CardText
              title="Follow-up that remembers"
              text={"When a lead says “call me next month,” the system records the date and the reason, sends relevant listings in between, and calls back on the day it promised."}
            />
          </BentoCard>

          <BentoCard>
            <ContactGraphMicroUI />
            <CardText
              title="Reaching the right person"
              text="If a contact goes quiet across every channel, the system rotates call times and channels, and can reach a co-buyer or spouse already on file, referencing the original inquiry."
            />
          </BentoCard>

          <BentoCard className="md:col-span-2">
            <SupportMicroUI />
            <CardText
              title="Client support after signing"
              text="Routine service questions are answered with full account context, failed payments get a polite reminder with a secure update link, and anything complex goes straight to your team."
            />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
