"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import { CONSULTATION_HREF } from "@/lib/site";

/**
 * Root-relative hashes so the links also work from the legal pages; on the home page the
 * browser treats them as same-document jumps and smooth-scrolls (see `html` in globals.css).
 */
const LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Setup Process", href: "/#setup-process" },
  { label: "Infrastructure", href: "/#infrastructure" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#00A3FF]/10 bg-white/80 backdrop-blur-md">
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            width={512}
            height={512}
            priority
            sizes="32px"
            className="h-8 w-8 rounded-md object-contain"
          />
          <span className="font-display text-lg font-bold tracking-tight text-[#0F172A]">
            EZO<span className="text-brand">MOD</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-[#334155] transition-colors hover:text-[#007BFF]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ButtonLink href={CONSULTATION_HREF} className="hidden px-4 py-2.5 sm:inline-flex">
            Book a Consultation
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-10 w-10 place-items-center rounded-xl border border-[#00A3FF]/25 bg-white text-[#0F172A] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-[#00A3FF]/10 bg-white/95 backdrop-blur-md md:hidden">
          <div className="container-x flex flex-col py-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-[#334155] transition-colors hover:bg-[#F0F7FF] hover:text-[#007BFF]"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink
              href={CONSULTATION_HREF}
              onClick={() => setOpen(false)}
              className="mt-3 w-full"
            >
              Book a Consultation
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
