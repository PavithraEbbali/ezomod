"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, PhoneCall, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "The Engine", href: "#engine" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Comparison", href: "#comparison" },
  { label: "Integrations", href: "#integrations" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      className="fixed inset-x-0 top-3 z-50 px-4 sm:top-5"
    >
      <nav
        aria-label="Primary"
        className={cn(
          "container-x flex items-center justify-between gap-4 rounded-full border px-3 py-2.5 transition-all duration-500 ease-swift sm:px-4",
          scrolled
            ? "border-[var(--edge-strong)] bg-white/85 shadow-halo backdrop-blur-xl"
            : "border-[var(--edge)] bg-white/60 backdrop-blur-xl",
        )}
      >
        <a href="#top" className="group flex shrink-0 items-center gap-2.5 pl-1">
          <Image
            src="/ezomod logo.jpeg"
            alt="EZOMOD"
            width={248}
            height={224}
            priority
            className="h-8 w-8 rounded-lg object-cover transition-transform duration-500 ease-swift group-hover:scale-110"
          />
          <span className="text-[17px] font-bold tracking-tightest text-ink">
            EZO<span className="text-gradient">MOD</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-full px-3.5 py-2 text-[14px] font-medium text-steel transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <span className="hidden items-center gap-2 rounded-full border border-[var(--edge)] bg-white/70 px-3 py-1.5 md:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-spring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-spring" />
            </span>
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-steel">
              14 agents live
            </span>
          </span>

          <MagneticButton
            href="#book"
            className="hidden px-5 py-2.5 text-[14px] sm:inline-flex"
            icon={<PhoneCall className="h-4 w-4" />}
          >
            Reserve Territory
          </MagneticButton>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--edge)] bg-white/70 text-ink lg:hidden"
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(false)}
            aria-hidden
            className="fixed inset-0 -z-10 bg-ink/10 backdrop-blur-md lg:hidden"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="container-x mt-2 lg:hidden"
          >
            <div className="glass rounded-3xl p-3 shadow-halo">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-steel transition-colors hover:bg-canvas-sunk hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-2xl bg-brand px-4 py-3 text-center text-[15px] font-semibold text-white shadow-glow"
              >
                Reserve Exclusive Territory
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
