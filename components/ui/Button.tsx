'use client';

import { useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Variant = 'primary' | 'ghost' | 'glass' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, string> = {
  sm: 'h-10 px-5 text-[13px]',
  md: 'h-12 px-7 text-sm',
  lg: 'h-14 px-9 text-[15px]',
};

const VARIANTS: Record<Variant, string> = {
  primary:
    'text-white shadow-[0_18px_50px_-18px_rgba(47,123,255,0.85)] hover:shadow-[0_22px_65px_-16px_rgba(168,85,247,0.9)]',
  glass: 'glass text-white/90 hover:text-white hover:border-white/25',
  ghost: 'text-white/70 hover:text-white border border-white/10 hover:border-white/25 bg-white/[0.02]',
  whatsapp:
    'text-white shadow-[0_18px_50px_-18px_rgba(16,185,129,0.85)] hover:shadow-[0_22px_60px_-16px_rgba(16,185,129,0.95)]',
};

type Ripple = { id: number; x: number; y: number };

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  target?: string;
  rel?: string;
  full?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  target,
  rel,
  full,
  onClick,
  ...rest
}: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const seed = useRef(0);
  const reduce = useReducedMotion();

  const spawnRipple = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const id = (seed.current += 1);
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 650);
  };

  const base = [
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full',
    'font-medium tracking-tight transition-all duration-300 will-change-transform',
    'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
    SIZES[size],
    VARIANTS[variant],
    full ? 'w-full' : '',
    className,
  ].join(' ');

  const inner = (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#1450d8,#2f7bff_28%,#a855f7_62%,#22d3ee)] bg-[length:220%_auto] transition-[background-position] duration-700 group-hover:bg-[position:100%_50%]"
        />
      )}
      {variant === 'whatsapp' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#059669,#10b981_45%,#34d399)] bg-[length:200%_auto] transition-[background-position] duration-700 group-hover:bg-[position:100%_50%]"
        />
      )}

      {/* Sheen sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] transition-transform duration-700 group-hover:translate-x-full"
      />

      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white/35"
          style={{ left: r.x, top: r.y }}
          initial={{ width: 0, height: 0, x: '-50%', y: '-50%', opacity: 0.55 }}
          animate={{ width: 420, height: 420, opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        />
      ))}

      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? rel ?? 'noopener noreferrer' : rel}
        className={base}
        onClick={(e) => {
          spawnRipple(e);
          onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={base}
      onClick={(e) => {
        spawnRipple(e);
        onClick?.(e);
      }}
      {...rest}
    >
      {inner}
    </button>
  );
}
