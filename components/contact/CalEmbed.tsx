"use client";

import { CalendarDays } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EVENTS, track } from "@/lib/analytics";

/**
 * Cal.com booking calendar, loaded only when it scrolls near the viewport or the visitor
 * clicks "Show available times". Space is reserved up front so loading causes no layout shift.
 * Rendered only when a booking URL is configured (see lib/config.ts).
 */
export default function CalEmbed({ src }: { src: string }) {
  const [load, setLoad] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (load || !boxRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) setLoad(true);
    }, { rootMargin: "300px" });
    observer.observe(boxRef.current);
    return () => observer.disconnect();
  }, [load]);

  // Cal.com posts messages from the embed; count a completed booking as a conversion too.
  useEffect(() => {
    if (!load) return;
    const onMessage = (event: MessageEvent) => {
      if (!/(^|\.)cal\.com$/.test(new URL(event.origin).hostname)) return;
      const type = (event.data as { type?: string } | null)?.type ?? "";
      if (/bookingSuccessful/i.test(type)) track(EVENTS.booking, { method: "calendar", stage: "booked" });
    };
    // Clicks inside a cross-origin iframe can't be observed directly; the page losing focus to
    // the iframe is the standard signal that the visitor started interacting with the calendar.
    let clicked = false;
    const onBlur = () => {
      if (!clicked && document.activeElement?.tagName === "IFRAME" && boxRef.current?.contains(document.activeElement)) {
        clicked = true;
        track(EVENTS.booking, { method: "calendar", stage: "interacted" });
      }
    };
    window.addEventListener("message", onMessage);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("blur", onBlur);
    };
  }, [load]);

  return (
    <div ref={boxRef} className="relative h-[680px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      {load ? (
        <iframe
          src={src}
          title="Book a free 30-minute call with Ezomod"
          loading="lazy"
          className="h-full w-full"
        />
      ) : (
        <div className="grid h-full place-items-center p-6 text-center">
          <div>
            <CalendarDays className="mx-auto h-10 w-10 text-[#0062CC]" aria-hidden />
            <p className="mt-4 font-medium text-slate-800">Pick a time that suits you</p>
            <button
              type="button"
              onClick={() => {
                track(EVENTS.booking, { method: "calendar", stage: "opened" });
                setLoad(true);
              }}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#007BFF] via-[#00A3FF] to-[#22C55E] px-6 py-3 text-sm font-semibold text-white shadow-md"
            >
              Show available times
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
