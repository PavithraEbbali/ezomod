"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  intensity?: number;
  glare?: boolean;
}

const SPRING = { stiffness: 200, damping: 20, mass: 0.5 } as const;

export default function TiltCard({
  children,
  className,
  intensity = 9,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);
  const lift = useSpring(useMotionValue(0), SPRING);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 140, damping: 22 });

  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(0,163,255,0.16), rgba(34,197,94,0.09) 42%, transparent 68%)`;

  const handleMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!node) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const rect = node.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const percentX = localX / rect.width;
      const percentY = localY / rect.height;

      // Normalised offset from the card centre, range [-0.5, 0.5].
      const offsetX = percentX - 0.5;
      const offsetY = percentY - 0.5;

      rotateY.set(offsetX * intensity * 2);
      rotateX.set(-offsetY * intensity * 2);
      glareX.set(percentX * 100);
      glareY.set(percentY * 100);
      glareOpacity.set(1);
      lift.set(-6);
    },
    [intensity, rotateX, rotateY, glareX, glareY, glareOpacity, lift],
  );

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
    lift.set(0);
  }, [rotateX, rotateY, glareOpacity, lift]);

  return (
    <div className="perspective h-full">
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, y: lift, transformPerspective: 1000 }}
        className={cn(
          "preserve-3d relative h-full overflow-hidden rounded-3xl bg-white/85 shadow-halo backdrop-blur-xl transition-shadow duration-500 ease-swift hover:shadow-halo-lg",
          "border border-[var(--edge)]",
          className,
        )}
      >
        {glare ? (
          <motion.span
            aria-hidden
            style={{ background: glareBackground, opacity: glareOpacity }}
            className="pointer-events-none absolute inset-0 z-10"
          />
        ) : null}
        <div className="preserve-3d relative z-20 h-full">{children}</div>
      </motion.div>
    </div>
  );
}
