'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Horizontal scroll rail with arrow controls.
 * Native scrolling (so touch + trackpad feel right) plus buttons for desktop.
 */
export function Rail({
  children,
  className = '',
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', sync);
      ro.disconnect();
    };
  }, [sync]);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        className={`rail no-scrollbar -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 ${className}`}
      >
        {children}
      </div>

      <RailButton dir="prev" disabled={atStart} onClick={() => scrollBy(-1)} />
      <RailButton dir="next" disabled={atEnd} onClick={() => scrollBy(1)} />
    </div>
  );
}

function RailButton({
  dir,
  disabled,
  onClick,
}: {
  dir: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  const isNext = dir === 'next';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isNext ? 'Scroll right' : 'Scroll left'}
      className={[
        'absolute top-[38%] z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full',
        'glass text-white/70 transition-all duration-300',
        'hover:scale-110 hover:text-white hover:shadow-[0_0_36px_-6px_rgba(47,123,255,0.85)]',
        'disabled:pointer-events-none disabled:opacity-0',
        isNext ? '-right-2 lg:-right-5' : '-left-2 lg:-left-5',
        'lg:flex',
      ].join(' ')}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d={isNext ? 'M6 3.5 10.5 8 6 12.5' : 'M10 3.5 5.5 8 10 12.5'}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
