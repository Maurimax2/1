'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  down: { x: 0, y: -34 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Cache motion components by tag. Calling `motion(tag)` during render would
 * mint a new component type each pass, remounting the subtree every time.
 */
const motionCache = new Map<string, ReturnType<typeof motion>>();

function motionFor(tag: ElementType) {
  if (typeof tag !== 'string') return motion(tag);
  const cached = motionCache.get(tag);
  if (cached) return cached;
  const created = motion(tag);
  motionCache.set(tag, created);
  return created;
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  as = 'div',
  amount = 0.25,
  blur = true,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  as?: ElementType;
  amount?: number;
  blur?: boolean;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motionFor(as);
  const { x, y } = reduce ? OFFSET.none : OFFSET[direction];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y, filter: blur && !reduce ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduce ? 0.01 : 0.85, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers its <RevealItem> children. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Stagger({
  children,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
