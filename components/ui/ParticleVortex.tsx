"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ParticleVortexProps {
  className?: string;
  /** Multiplier on the auto-computed particle count. */
  density?: number;
  /** Radius in CSS pixels within which the cursor deflects particles. */
  pointerRadius?: number;
}

interface Particle {
  /** Polar angle in radians. */
  angle: number;
  /** Polar radius in CSS pixels from the vortex core. */
  radius: number;
  /** Angular velocity in radians per frame at unit distance. */
  spin: number;
  /** Inward drift per frame. */
  drift: number;
  /** Comet tail length in radians. */
  tail: number;
  width: number;
  color: string;
  alpha: number;
  /** Transient outward push accumulated from the cursor. */
  push: number;
}

const PALETTE = ["#007BFF", "#00A3FF", "#06B6D4", "#10B981", "#22C55E", "#84CC16"] as const;
const TWO_PI = Math.PI * 2;

function createParticle(min: number, max: number): Particle {
  const radius = min + Math.pow(Math.random(), 0.65) * (max - min);
  const depth = 1 - (radius - min) / Math.max(1, max - min);
  return {
    angle: Math.random() * TWO_PI,
    radius,
    spin: (0.0016 + Math.random() * 0.0032) * (Math.random() > 0.5 ? 1 : 0.72),
    drift: 0.06 + Math.random() * 0.22,
    tail: 0.05 + Math.random() * 0.16,
    width: 0.7 + depth * 2.2 + Math.random() * 0.9,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    alpha: 0.1 + depth * 0.34 + Math.random() * 0.12,
    push: 0,
  };
}

export default function ParticleVortex({
  className,
  density = 1,
  pointerRadius = 190,
}: ParticleVortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let minRadius = 40;
    let maxRadius = 320;
    let particles: Particle[] = [];

    // Vortex core: base position plus an eased offset that trails the cursor.
    let coreX = 0;
    let coreY = 0;
    let targetX = 0;
    let targetY = 0;
    let pointerX = Number.NaN;
    let pointerY = Number.NaN;

    let frame = 0;
    let visible = true;
    let running = false;

    const build = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      minRadius = Math.max(28, Math.min(width, height) * 0.06);
      maxRadius = Math.hypot(width, height) * 0.56;

      coreX = targetX = width * 0.5;
      coreY = targetY = height * 0.46;

      const area = width * height;
      const count = Math.round(
        Math.min(150, Math.max(34, (area / 13000) * density)) * (width < 640 ? 0.6 : 1),
      );
      particles = Array.from({ length: count }, () => createParticle(minRadius, maxRadius));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const hasPointer = !Number.isNaN(pointerX);
      coreX += (targetX - coreX) * 0.045;
      coreY += (targetY - coreY) * 0.045;

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        const effective = particle.radius + particle.push;
        const x = coreX + Math.cos(particle.angle) * effective;
        const y = coreY + Math.sin(particle.angle) * effective * 0.72;

        if (hasPointer) {
          const distance = Math.hypot(pointerX - x, pointerY - y);
          if (distance < pointerRadius) {
            const falloff = 1 - distance / pointerRadius;
            particle.push += falloff * falloff * 5.2;
            particle.angle += particle.spin * falloff * 26;
          }
        }

        context.beginPath();
        context.ellipse(
          coreX,
          coreY,
          effective,
          effective * 0.72,
          0,
          particle.angle - particle.tail,
          particle.angle,
        );
        context.strokeStyle = particle.color;
        context.globalAlpha = Math.min(0.62, particle.alpha + particle.push * 0.008);
        context.lineWidth = particle.width;
        context.lineCap = "round";
        context.stroke();

        // Leading head gives each streak a bright comet nose.
        context.beginPath();
        context.arc(x, y, particle.width * 0.72, 0, TWO_PI);
        context.fillStyle = particle.color;
        context.globalAlpha = Math.min(0.7, particle.alpha * 1.5);
        context.fill();

        particle.angle += particle.spin * (1 + 90 / Math.max(24, effective));
        if (particle.angle > TWO_PI) particle.angle -= TWO_PI;
        particle.radius -= particle.drift;
        particle.push *= 0.94;

        if (particle.radius < minRadius) {
          particles[i] = createParticle(maxRadius * 0.82, maxRadius);
        }
      }

      context.globalAlpha = 1;
    };

    const tick = () => {
      draw();
      if (running) frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      targetX = width * 0.5 + (pointerX - width * 0.5) * 0.16;
      targetY = height * 0.46 + (pointerY - height * 0.46) * 0.16;
    };

    const onPointerLeave = () => {
      pointerX = Number.NaN;
      pointerY = Number.NaN;
      targetX = width * 0.5;
      targetY = height * 0.46;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    build();

    if (reduced) {
      draw();
      return () => {
        context.clearRect(0, 0, width, height);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      build();
    });
    resizeObserver.observe(parent);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      context.clearRect(0, 0, width, height);
    };
  }, [density, pointerRadius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
