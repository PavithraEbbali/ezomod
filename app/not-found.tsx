import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/ui/ButtonLink";
import { CONSULTATION_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Ezomod" },
  description: "The page you were looking for doesn't exist. Find Ezomod's AI automation services, or book a consultation.",
};

const LINKS = [
  { label: "Home", href: "/" },
  { label: "All services", href: "/services" },
  { label: "AI lead follow-up", href: "/services/ai-lead-follow-up" },
  { label: "Real estate", href: "/industries/real-estate" },
  { label: "About Ezomod", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Book a consultation", href: "/contact" },
] as const;

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="Error 404" title="We couldn't find that page">
        <p>The link may be old or mistyped. Here are the main pages on the Ezomod site.</p>
      </PageHeader>
      <section className="section bg-tint">
        <div className="container-x">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="lift-card flex items-center justify-between gap-3 p-5 font-semibold text-slate-900 hover:text-[#0062CC]"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#0062CC]" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href={CONSULTATION_HREF}>Book a free 30-minute call</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
