import type { Metadata } from "next";
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
      <PageHeader title="We couldn't find that page">
        <p>The link may be old or mistyped. Here are the main pages on the Ezomod site.</p>
      </PageHeader>
      <section className="section">
        <div className="container-x">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl border border-slate-200/60 bg-white px-5 py-4 font-medium text-slate-900 transition-colors hover:border-[#007BFF]/40 hover:text-[#007BFF]"
                >
                  {link.label}
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
