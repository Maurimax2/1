'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LogoMark } from '@/components/ui/Logo';
import { SITE } from '@/lib/site';

const KEY = 'moortv.intro.seen';

/**
 * Brief cinematic intro. Shown once per browser session so returning to the
 * page (or navigating to checkout and back) never re-plays it.
 */
export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    let seen = true;
    try {
      seen = window.sessionStorage.getItem(KEY) === '1';
    } catch {
      seen = false;
    }

    if (seen || reduce) return;

    setVisible(true);
    document.body.style.overflow = 'hidden';

    const started = performance.now();
    const DURATION = 1500;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION);
      setProgress(Math.round(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          window.sessionStorage.setItem(KEY, '1');
        } catch {
          /* ignore */
        }
        setVisible(false);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = '';
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, filter: 'blur(14px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          aria-hidden
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(47,123,255,0.18),transparent_70%)]"
          />

          <motion.div
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 animate-pulse-ring rounded-full bg-ember/25 blur-2xl" />
            <LogoMark className="relative h-20 w-20" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative mt-7 font-display text-[19px] font-bold tracking-[0.16em] text-white"
          >
            MOOR<span className="text-gradient-static">TV</span>
          </motion.p>

          <motion.p
            dir="rtl"
            lang="ar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mt-2.5 font-arabic text-[12px] text-white/35"
          >
            {SITE.taglineAr}
          </motion.p>

          <div className="relative mt-9 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#2f7bff,#a855f7,#ef2b47)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
