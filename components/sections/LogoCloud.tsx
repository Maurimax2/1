'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Service compatibility strip.
 *
 * These are typographic wordmarks we set ourselves — we deliberately do not
 * reproduce anyone's actual logo files. Names are used nominatively to describe
 * the kind of content the platform covers, with an ownership notice below.
 */
const SERVICES = [
  { name: 'NETFLIX', className: 'font-semibold tracking-[0.24em]', color: '#e50914' },
  { name: 'Disney+', className: 'font-semibold tracking-[0.02em]', color: '#4b9bff' },
  { name: 'prime video', className: 'font-medium tracking-[0.06em]', color: '#31c8f5' },
  { name: 'Apple TV+', className: 'font-semibold tracking-[-0.02em]', color: '#f5f5f7' },
  { name: 'HBO Max', className: 'font-bold tracking-[0.04em]', color: '#a855f7' },
  { name: 'shahid', className: 'font-semibold tracking-[0.1em]', color: '#00d3a7' },
  { name: 'OSN+', className: 'font-bold tracking-[0.12em]', color: '#ffb020' },
  { name: 'beIN SPORTS', className: 'font-semibold tracking-[0.08em]', color: '#7c3aed' },
  { name: 'discovery+', className: 'font-medium tracking-[0.04em]', color: '#4fa3ff' },
  { name: 'PARAMOUNT+', className: 'font-semibold tracking-[0.14em]', color: '#3b82f6' },
] as const;

export function LogoCloud() {
  const reduce = useReducedMotion();
  const track = [...SERVICES, ...SERVICES];

  return (
    <section id="logos" className="relative py-20 sm:py-28" aria-labelledby="logos-title">
      <div className="container-x">
        <Reveal>
          <p
            id="logos-title"
            className="text-center text-[11px] font-medium uppercase tracking-[0.28em] text-white/35"
          >
            All the entertainment you know — in one place
          </p>
        </Reveal>
      </div>

      <div className="relative mt-12 overflow-hidden mask-fade-x">
        <div
          className={`flex w-max gap-4 sm:gap-5 ${reduce ? '' : 'animate-marquee'} hover:[animation-play-state:paused]`}
        >
          {track.map((service, i) => (
            <motion.div
              key={`${service.name}-${i}`}
              whileHover={reduce ? undefined : { y: -8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              className="group relative"
              aria-hidden={i >= SERVICES.length}
            >
              <div
                className="animate-float"
                style={{ animationDelay: `${(i % SERVICES.length) * 0.45}s`, animationDuration: '7s' }}
              >
                <div className="hairline relative flex h-[74px] w-[178px] items-center justify-center overflow-hidden rounded-2xl glass sm:w-[206px]">
                  {/* Brand-tinted glow on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-45"
                    style={{ background: `radial-gradient(circle at 50% 60%, ${service.color}, transparent 68%)` }}
                  />
                  <span
                    className={`relative text-[15px] text-white/70 transition-all duration-500 group-hover:text-white sm:text-[17px] ${service.className}`}
                    style={{ textShadow: '0 0 24px rgba(255,255,255,0.14)' }}
                  >
                    {service.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container-x">
        <p className="mx-auto mt-9 max-w-2xl text-center text-[11px] leading-relaxed text-white/25">
          All brand names and trademarks shown are the property of their respective owners and are
          referenced here only to describe the categories of content available. MOOR TV is an
          independent service and is not affiliated with, endorsed by, or sponsored by any of them.
        </p>
      </div>
    </section>
  );
}
