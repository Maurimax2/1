'use client';

import { useEffect, useRef } from 'react';

type P = { x: number; y: number; z: number; r: number; vx: number; vy: number; hue: number };

/**
 * Lightweight canvas particle field.
 * - Caps DPR at 2 and particle count by viewport width so mobile stays smooth.
 * - Pauses entirely when off-screen or when the tab is hidden.
 * - Renders nothing for users who prefer reduced motion.
 */
export function Particles({ className = '', density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let particles: P[] = [];
    const pointer = { x: -9999, y: -9999 };

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    function build() {
      const parent = canvas!.parentElement;
      w = parent?.clientWidth ?? window.innerWidth;
      h = parent?.clientHeight ?? window.innerHeight;
      const ratio = dpr();
      canvas!.width = Math.floor(w * ratio);
      canvas!.height = Math.floor(h * ratio);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.round(Math.min(110, Math.max(28, (w * h) / 16000)) * density);
      particles = Array.from({ length: count }, () => {
        const z = Math.random() * 0.8 + 0.2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: z * 1.9 + 0.4,
          vx: (Math.random() - 0.5) * 0.16 * z,
          vy: -(Math.random() * 0.22 + 0.05) * z,
          hue: Math.random() > 0.55 ? 268 : 216,
        };
      });
    }

    function frame() {
      if (!running) return;
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Gentle cursor repulsion
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const f = (1 - d2 / 16000) * 0.9;
          p.x += (dx / (Math.sqrt(d2) || 1)) * f;
          p.y += (dy / (Math.sqrt(d2) || 1)) * f;
        }

        if (p.y < -12) {
          p.y = h + 12;
          p.x = Math.random() * w;
        }
        if (p.x < -12) p.x = w + 12;
        if (p.x > w + 12) p.x = -12;

        const alpha = 0.14 + p.z * 0.5;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue}, 100%, ${72 + p.z * 12}%, ${alpha})`;
        ctx!.shadowBlur = 12 * p.z;
        ctx!.shadowColor = `hsla(${p.hue}, 100%, 68%, ${alpha})`;
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;

      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    build();
    start();

    const ro = new ResizeObserver(build);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density]);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden />;
}
