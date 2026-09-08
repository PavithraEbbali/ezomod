"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { setScrollLock } from "@/components/providers/LenisProvider";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Adaptive Engine", href: "#adaptive" },
  { label: "Pipeline Velocity", href: "#velocity" },
  { label: "Integrations", href: "#integrations" },
] as const;

const BASE_AGENTS = 2418;

/** `compact` trims the label to a dot + count between md and lg, where the
 *  three nav columns have no room to spare. */
function AgentTicker({ className, compact }: { className?: string; compact?: boolean }) {
  const [count, setCount] = useState(BASE_AGENTS);

  useEffect(() => {
    const id = window.setInterval(() => {
      // Bounded drift keeps the readout alive without ever wandering off the headline number.
      setCount((value) => {
        const next = value + (Math.floor(Math.random() * 7) - 2);
        return Math.min(BASE_AGENTS + 46, Math.max(BASE_AGENTS - 12, next));
      });
    }, 3800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-spring/25 bg-white/75 px-2.5 py-1",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-spring" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-spring" />
      </span>
      <span className="tabnum font-mono text-[9.5px] font-semibold uppercase tracking-[0.13em] text-steel">
        {count.toLocaleString("en-US")}
        <span className={compact ? "hidden lg:inline" : undefined}> agents active</span>
        {compact ? <span className="lg:hidden"> live</span> : null}
      </span>
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  useEffect(() => {
    setScrollLock(open);
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => () => setScrollLock(false), []);

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 lg:px-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "container-x flex items-center gap-2 rounded-full border px-3 py-2 transition-all duration-500 ease-swift sm:px-3.5 md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-3 lg:px-5",
            scrolled
              ? "border-[var(--edge-strong)] bg-white/85 shadow-halo backdrop-blur-xl"
              : "border-[var(--edge)] bg-white/60 backdrop-blur-xl",
          )}
        >
          {/* `-my-1` keeps the 44px hit area from growing the pill's height. */}
          <a href="#top" className="group -my-1 flex shrink-0 items-center gap-2.5 py-1">
            <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-[var(--edge)] bg-white">
              <Image
                src="/logo.png"
                alt="EZOMOD"
                width={512}
                height={512}
                priority
                sizes="36px"
                className="h-full w-full object-contain transition-transform duration-500 ease-swift group-hover:scale-110"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[16px] font-bold tracking-tightest text-ink sm:text-[17px]">
                EZO<span className="text-gradient">MOD</span>
              </span>
              <AgentTicker
                compact
                className="mt-1 hidden border-0 bg-transparent px-0 py-0 md:inline-flex"
              />
            </span>
          </a>

          <div className="hidden items-center justify-center gap-0 md:flex lg:gap-0.5">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative whitespace-nowrap rounded-full px-1 py-2 text-[12.5px] font-medium text-steel transition-colors duration-300 hover:text-ink lg:px-3 lg:text-[14px]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
            <MagneticButton
              href="#book"
              className="hidden px-3.5 py-2.5 text-[12.5px] sm:inline-flex lg:px-5 lg:text-[13.5px]"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              Book Strategy Session
            </MagneticButton>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--edge)] bg-white/75 text-ink transition-colors hover:border-[var(--edge-strong)] md:hidden"
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(false)}
              aria-hidden
              className="fixed inset-0 z-[60] bg-ink/20 backdrop-blur-md md:hidden"
            />
            <motion.nav
              key="sheet"
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ x: "104%" }}
              animate={{ x: 0 }}
              exit={{ x: "104%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.9 }}
              className="fixed inset-y-0 right-0 z-[61] flex w-[88%] max-w-[340px] flex-col border-l border-[var(--edge)] bg-white/95 shadow-halo-lg backdrop-blur-xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--edge)] px-5 py-4">
                <span className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-lg border border-[var(--edge)] bg-white">
                    <Image
                      src="/logo.png"
                      alt=""
                      width={512}
                      height={512}
                      sizes="32px"
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span className="text-[16px] font-bold tracking-tightest text-ink">
                    EZO<span className="text-gradient">MOD</span>
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--edge)] bg-white text-ink"
                >
                  <X className="h-[18px] w-[18px]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-5">
                <p className="px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-faint">
                  Navigate
                </p>
                <div className="mt-2 space-y-1">
                  {LINKS.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + index * 0.055,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-center justify-between rounded-2xl px-3 py-3.5 text-[15.5px] font-medium text-steel transition-colors hover:bg-canvas-sunk hover:text-ink"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4 text-steel-faint" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="border-t border-[var(--edge)] px-4 py-5">
                <AgentTicker className="w-full justify-center" />
                <a
                  href="#book"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-3.5 text-[15px] font-semibold text-white shadow-glow"
                >
                  Book Strategy Session
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
