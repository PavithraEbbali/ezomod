"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import { CONSULTATION_HREF } from "@/lib/site";

const LINKS = [
  { label: "Industries", href: "/industries/real-estate" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
] as const;

const LINK_CLASS = "rounded-md px-3 py-2 text-sm font-medium text-[#334155] transition-colors hover:text-[#007BFF]";

export type NavService = { href: string; name: string };

/** `services` is passed from the server layout so the full service content stays out of the client bundle. */
export default function Navbar({ services }: { services: NavService[] }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  // Close menus on navigation.
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open && !servicesOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, servicesOpen]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#00A3FF]/10 bg-white/80 backdrop-blur-md">
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Ezomod home" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={512} height={512} priority sizes="32px" className="h-8 w-8 rounded-md object-contain" />
          <span className="font-display text-lg font-bold tracking-tight text-[#0F172A]">
            EZO<span className="text-brand">MOD</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {/* Services dropdown: links are always in the HTML; shown on hover, focus or click. */}
          <div className="group relative" onMouseLeave={() => setServicesOpen(false)}>
            <div className="flex items-center">
              <Link href="/services" className={LINK_CLASS}>
                Services
              </Link>
              <button
                type="button"
                aria-label="Show services menu"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((value) => !value)}
                className="-ml-2 grid h-9 w-7 place-items-center rounded-md text-[#334155] hover:text-[#007BFF]"
              >
                <ChevronDown className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div
              id="services-menu"
              className={`absolute left-0 top-full w-[34rem] pt-2 transition ${
                servicesOpen
                  ? "visible opacity-100"
                  : "invisible opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
              }`}
            >
              <ul className="grid grid-cols-2 gap-1 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_20px_40px_-15px_rgba(0,30,70,0.15)]">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#F0F7FF] hover:text-[#007BFF]"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
                <li className="col-span-2 border-t border-slate-100 pt-1">
                  <Link href="/services" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#007BFF] hover:bg-[#F0F7FF]">
                    All services →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={LINK_CLASS}>
              {link.label}
            </Link>
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
            className="grid h-11 w-11 place-items-center rounded-xl border border-[#00A3FF]/25 bg-white text-[#0F172A] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[#00A3FF]/10 bg-white/95 backdrop-blur-md lg:hidden">
          <div className="container-x flex flex-col py-3">
            <Link href="/services" className="rounded-md px-2 py-3 text-base font-semibold text-[#0F172A]">
              Services
            </Link>
            <ul className="mb-2 border-l border-slate-200 pl-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="block rounded-md px-2 py-2.5 text-sm text-[#334155] hover:text-[#007BFF]">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-3 text-base font-medium text-[#334155] transition-colors hover:bg-[#F0F7FF] hover:text-[#007BFF]"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href={CONSULTATION_HREF} className="mt-3 w-full">
              Book a Consultation
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
