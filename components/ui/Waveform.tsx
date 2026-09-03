"use client";

import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface WaveformProps {
  /** 0 → idle line, 1 → full amplitude speech. */
  intensity: number;
  bars?: number;
  className?: string;
}

function WaveformBase({ intensity, bars = 36, className }: WaveformProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const intensityRef = useRef(intensity);
  const barsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = barsRef.current.filter(Boolean);
    if (nodes.length === 0) return;

    if (reduced) {
      nodes.forEach((node, index) => {
        const envelope = Math.sin((index / (nodes.length - 1)) * Math.PI);
        node.style.height = `${18 + envelope * 46}%`;
      });
      return;
    }

    const seeds = nodes.map(() => Math.random() * Math.PI * 2);
    const values = new Float32Array(nodes.length).fill(0.1);
    let frame = 0;
    let running = true;
    let time = 0;

    const tick = () => {
      time += 0.052;
      const level = intensityRef.current;
      for (let i = 0; i < nodes.length; i += 1) {
        const envelope = Math.sin((i / (nodes.length - 1)) * Math.PI) ** 0.7;
        const wave =
          Math.sin(time * 2.1 + seeds[i]) * 0.5 +
          Math.sin(time * 4.7 + seeds[i] * 1.9) * 0.32 +
          Math.sin(time * 9.3 + i * 0.6) * 0.18;
        const target = 0.08 + envelope * (0.14 + level * (0.42 + Math.abs(wave) * 0.58));
        values[i] += (target - values[i]) * 0.22;
        nodes[i].style.height = `${Math.max(6, values[i] * 100)}%`;
        nodes[i].style.opacity = `${0.42 + values[i] * 1.1}`;
      }
      if (running) frame = window.requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
      } else if (!running) {
        running = true;
        frame = window.requestAnimationFrame(tick);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    frame = window.requestAnimationFrame(tick);

    return () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [bars]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("flex h-14 w-full items-center justify-between gap-[3px]", className)}
    >
      {Array.from({ length: bars }).map((_, index) => (
        <span
          key={index}
          ref={(node) => {
            if (node) barsRef.current[index] = node;
          }}
          className="w-full flex-1 rounded-full bg-gradient-to-b from-azure-light via-aqua to-spring"
          style={{ height: "10%" }}
        />
      ))}
    </div>
  );
}

const Waveform = memo(WaveformBase);
export default Waveform;
