"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

export interface MagneticOptions {
  /** Pixels of proximity around the element bounding box that activate the pull. */
  radius?: number;
  /** 0 → no travel, 1 → element follows the cursor exactly. */
  strength?: number;
  /** Maximum translation in pixels on either axis. */
  maxTravel?: number;
}

export interface MagneticHandlers<T extends HTMLElement> {
  ref: RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** Inner layer travels further for a parallax depth effect. */
  innerX: MotionValue<number>;
  innerY: MotionValue<number>;
  proximity: MotionValue<number>;
}

const SPRING = { stiffness: 260, damping: 18, mass: 0.4 } as const;

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  options: MagneticOptions = {},
): MagneticHandlers<T> {
  const { radius = 45, strength = 0.42, maxTravel = 22 } = options;

  const ref = useRef<T>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawProximity = useMotionValue(0);

  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);
  const proximity = useSpring(rawProximity, { stiffness: 180, damping: 24, mass: 0.5 });
  const innerX = useTransform(x, (v) => v * 0.38);
  const innerY = useTransform(y, (v) => v * 0.38);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Distance from the cursor to the element's bounding box, expanded by `radius`.
        const overflowX = Math.max(rect.left - event.clientX, event.clientX - rect.right, 0);
        const overflowY = Math.max(rect.top - event.clientY, event.clientY - rect.bottom, 0);
        const distance = Math.hypot(overflowX, overflowY);

        if (distance > radius) {
          rawX.set(0);
          rawY.set(0);
          rawProximity.set(0);
          return;
        }

        const falloff = 1 - distance / radius;
        const dx = (event.clientX - centerX) * strength * falloff;
        const dy = (event.clientY - centerY) * strength * falloff;

        rawX.set(Math.max(-maxTravel, Math.min(maxTravel, dx)));
        rawY.set(Math.max(-maxTravel, Math.min(maxTravel, dy)));
        rawProximity.set(falloff);
      });
    };

    const reset = () => {
      rawX.set(0);
      rawY.set(0);
      rawProximity.set(0);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("pointerleave", reset);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("blur", reset);
      document.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [radius, strength, maxTravel, rawX, rawY, rawProximity]);

  return { ref, x, y, innerX, innerY, proximity };
}
