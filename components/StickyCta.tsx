"use client";

import { usePathname } from "next/navigation";
import ButtonLink from "@/components/ui/ButtonLink";
import { CONSULTATION_HREF, CTA_LABEL } from "@/lib/site";

/** Bottom call-to-action bar on phones (the navbar button covers larger screens). Hidden on /contact. */
export default function StickyCta() {
  const pathname = usePathname();
  if (pathname === CONSULTATION_HREF) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#00A3FF]/15 bg-white/95 p-3 backdrop-blur-md sm:hidden">
      <ButtonLink href={CONSULTATION_HREF} className="w-full">
        {CTA_LABEL}
      </ButtonLink>
    </div>
  );
}
