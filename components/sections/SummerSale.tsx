'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/** The sale runs to the end of the current month, recomputed on the client. */
function endOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0).getTime();
}

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function split(ms: number): Remaining {
  const clamped = Math.max(0, ms);
  return {
    days: Math.floor(clamped / 86_400_000),
    hours: Math.floor(clamped / 3_600_000) % 24,
    minutes: Math.floor(clamped / 60_000) % 60,
    seconds: Math.floor(clamped / 1000) % 60,
  };
}

export function SummerSale() {
  // Rendered empty on the server so SSR markup and first client paint agree.
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const target = endOfMonth();
    const tick = () => setRemaining(split(target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="offers" className="relative scroll-mt-28 py-16 sm:py-24" aria-labelledby="sale-title">
      <div className="container-x">
        <Reveal>
          <div className="animated-border relative overflow-hidden rounded-[34px]">
            <div className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(135deg,#0b0713_0%,#0a0f22_45%,#120a1e_100%)] px-6 py-14 sm:px-14 sm:py-16">
              {/* Sun-flare lighting */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-32 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.35),transparent_65%)] blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-40 -right-16 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.4),transparent_65%)] blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(115deg, rgba(255,255,255,0.7) 0 1px, transparent 1px 14px)',
                }}
              />

              <div className="relative flex flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
                <div className="max-w-xl">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                    className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200"
                  >
                    Limited Time Only
                  </motion.span>

                  <h2
                    id="sale-title"
                    className="mt-6 text-[clamp(2.2rem,6vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
                  >
                    <span className="inline-block animate-float" style={{ animationDuration: '5s' }}>
                      ☀️
                    </span>{' '}
                    <span className="bg-gradient-to-r from-amber-200 via-white to-neon-soft bg-clip-text text-transparent">
                      SUMMER SALE
                    </span>
                  </h2>

                  <p className="mt-5 text-[15px] leading-relaxed text-white/55 sm:text-base">
                    Every subscription and every box is discounted right now.{' '}
                    <span className="text-white/85">These prices won’t always be available.</span>
                  </p>

                  <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                    <Button href="#plans" size="lg">
                      Claim the offer
                    </Button>
                    <Button href="#boxes" variant="ghost" size="lg">
                      See TV boxes
                    </Button>
                  </div>
                </div>

                <Countdown remaining={remaining} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Countdown({ remaining }: { remaining: Remaining | null }) {
  const reduce = useReducedMotion();
  const units: Array<[string, number | null]> = [
    ['Days', remaining?.days ?? null],
    ['Hours', remaining?.hours ?? null],
    ['Minutes', remaining?.minutes ?? null],
    ['Seconds', remaining?.seconds ?? null],
  ];

  return (
    <div className="shrink-0">
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-white/35">
        Offer ends in
      </p>
      <div className="flex gap-2.5 sm:gap-3.5" role="timer" aria-live="off">
        {units.map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <div className="hairline relative flex h-[74px] w-[70px] items-center justify-center overflow-hidden rounded-2xl bg-white/[0.05] backdrop-blur-xl sm:h-[86px] sm:w-[82px]">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
              />
              {value === null ? (
                <span className="text-[26px] font-semibold tabular-nums text-white/25 sm:text-[32px]">--</span>
              ) : (
                <motion.span
                  key={`${label}-${value}`}
                  initial={reduce ? false : { y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[26px] font-semibold tabular-nums text-white sm:text-[32px]"
                >
                  {String(value).padStart(2, '0')}
                </motion.span>
              )}
            </div>
            <span className="mt-2.5 text-[10px] uppercase tracking-[0.18em] text-white/35">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
