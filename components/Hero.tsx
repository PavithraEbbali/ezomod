"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Zap } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import MaskedText from "@/components/ui/MaskedText";
import OmnichannelSimulator from "@/components/OmnichannelSimulator";

const PROOF = [
  "Sub-30s first touch",
  "Voice · WhatsApp · SMS · Email",
  "Household escalation",
  "Tier-1 client desk",
] as const;

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-36 lg:pb-28">
      <div aria-hidden className="absolute inset-0 -z-30 bg-canvas" />

      <div
        aria-hidden
        className="grid-faint absolute inset-0 -z-20 opacity-50 [mask-image:radial-gradient(760px_520px_at_50%_12%,#000,transparent)]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-14%] -z-20 h-[520px] w-[860px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,163,255,0.20),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute right-[-10%] top-[24%] -z-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.22),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-20 h-56 bg-gradient-to-b from-transparent to-canvas"
      />

      <div className="container-x">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-10 xl:gap-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow"
            >
              <Zap className="h-3.5 w-3.5 text-aqua" />
              Autonomous omnichannel RevOps
            </motion.div>

            <MaskedText
              as="h1"
              className="mt-6 font-display text-[clamp(1.8rem,6.2vw,2.95rem)] font-extrabold leading-[1.06] tracking-tightest text-ink"
              lines={[
                <>Every Lead.</>,
                <>
                  <span className="text-gradient animate-shimmer bg-[length:200%_100%]">
                    Every Channel.
                  </span>
                </>,
                <>Contacted in Under 30 Seconds.</>,
              ]}
              delay={0.14}
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.52 }}
              className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-steel sm:text-[17.5px]"
            >
              EZOMOD deploys autonomous omnichannel AI agents that orchestrate neural voice
              calls, WhatsApp, SMS, and email to qualify buyers, handle complex objections,
              escalate ghosted contacts, and book pipeline 24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.64 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                href="#book"
                className="w-full justify-center sm:w-auto"
                icon={<Zap className="h-4 w-4" />}
              >
                Book Architecture Demo
              </MagneticButton>
              <MagneticButton
                href="#demo"
                variant="ghost"
                className="w-full justify-center sm:w-auto"
                icon={
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-swift group-hover:translate-x-1" />
                }
              >
                Watch the Engine Run
              </MagneticButton>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.78 }}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              {PROOF.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[13px] font-medium text-steel-light"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-azure to-spring" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="mt-7 inline-flex max-w-full items-center gap-2 rounded-full border border-spring/25 bg-white/70 px-3.5 py-2 backdrop-blur-xl"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-mint" />
              <span className="text-[12px] font-medium text-steel sm:text-[12.5px]">
                Territories opening in <span className="font-semibold text-ink">7 metros</span> ·
                one brokerage per zone
              </span>
            </motion.div>
          </div>

          <motion.div
            id="demo"
            initial={{ opacity: 0, y: 42, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
            className="relative scroll-mt-32"
          >
            <OmnichannelSimulator />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
