import Image from "next/image";
import Link from "next/link";
import { SERVICES, servicePath } from "@/lib/services";
import { CONTACT_EMAIL, CONTACT_HREF, LINKEDIN_URL } from "@/lib/site";

const COLUMNS = [
  {
    title: "Services",
    links: SERVICES.map((service) => ({ label: service.name, href: servicePath(service.slug) })),
  },
  {
    title: "Company",
    links: [
      { label: "About Ezomod", href: "/about" },
      { label: "Real estate", href: "/industries/real-estate" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Book a consultation", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const LINK_CLASS = "text-sm text-slate-600 transition-colors duration-200 hover:text-[#007BFF]";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-[#F8FAFC] text-slate-600">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.3fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" aria-label="Ezomod home" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={512} height={512} sizes="32px" className="h-8 w-8 rounded-md object-contain" />
            <span className="font-display text-lg font-bold tracking-tight text-[#0F172A]">
              EZO<span className="text-brand">MOD</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Ezomod is an AI automation agency. We build AI lead generation, lead follow-up, voice
            agents, multi-agent workflows, CRM automation, chatbots and websites.
          </p>
          <a
            href={CONTACT_HREF}
            className="mt-4 inline-block break-all text-sm font-medium text-[#007BFF] transition-colors hover:text-[#0060CC]"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-2">
            <a href={LINKEDIN_URL} rel="noopener" className={LINK_CLASS}>
              Ezomod on LinkedIn
            </a>
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold text-[#0F172A]">{column.title}</h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200/80">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ezomod. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors duration-200 hover:text-[#007BFF]">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors duration-200 hover:text-[#007BFF]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
