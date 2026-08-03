'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * 3D tilt + a spotlight that tracks the cursor.
 * Falls back to a plain container when the user prefers reduced motion.
 */
export function TiltCard({
  children,
  className = '',
  intensity = 8,
  glow = 'rgba(47,123,255,0.22)',
  spotlight = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glow?: string;
  spotlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.4 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.4 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const spot = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, ${glow}, transparent 62%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * intensity * 2);
    ry.set((px - 0.5) * intensity * 2);
    mx.set(px * 100);
    my.set(py * 100);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className={`preserve-3d relative will-change-transform ${className}`}
    >
      {spotlight && !reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-500 hover:opacity-100 group-hover:opacity-100"
          style={{ backgroundImage: spot }}
        />
      )}
      {children}
    </motion.div>
  );
}
