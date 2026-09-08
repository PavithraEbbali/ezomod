"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Dispatched by overlays (modals, drawers) that need to freeze page scroll. */
export const SCROLL_LOCK_EVENT = "ezomod:scroll-lock";

export function setScrollLock(locked: boolean): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<boolean>(SCROLL_LOCK_EVENT, { detail: locked }));
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Native scroll still needs to be frozen for overlays when Lenis is disabled.
    const onLockFallback = (event: Event) => {
      const locked = (event as CustomEvent<boolean>).detail;
      document.documentElement.classList.toggle("lenis-stopped", locked);
      document.body.style.overflow = locked ? "hidden" : "";
    };

    if (reduced) {
      window.addEventListener(SCROLL_LOCK_EVENT, onLockFallback);
      ScrollTrigger.refresh();
      return () => {
        window.removeEventListener(SCROLL_LOCK_EVENT, onLockFallback);
        document.body.style.overflow = "";
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 1.7,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    const onLock = (event: Event) => {
      const locked = (event as CustomEvent<boolean>).detail;
      if (locked) {
        lenis.stop();
        document.body.style.overflow = "hidden";
      } else {
        lenis.start();
        document.body.style.overflow = "";
      }
    };
    window.addEventListener(SCROLL_LOCK_EVENT, onLock);

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) return;
      const section = document.querySelector(id);
      if (!section) return;
      event.preventDefault();
      lenis.scrollTo(section as HTMLElement, { offset: -96, duration: 1.4 });
    };
    document.addEventListener("click", onAnchorClick);

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(SCROLL_LOCK_EVENT, onLock);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      document.body.style.overflow = "";
    };
  }, []);

  return <>{children}</>;
}
