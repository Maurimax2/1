'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Counter } from '@/components/ui/Counter';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { GlowDivider } from '@/components/ui/Aurora';

const STATS = [
  { value: 20000, suffix: '+', label: 'Movies', hint: 'Blockbusters to hidden gems' },
  { value: 10000, suffix: '+', label: 'TV Shows', hint: 'Full seasons, always updated' },
  { value: 9000, suffix: '+', label: 'Live Channels', hint: 'From every continent' },
  { text: '4K UHD', label: 'Streaming Quality', hint: 'Crystal clear on every screen' },
] as const;

const DEVICES = [
  { name: 'Smart TV', icon: TvIcon },
  { name: 'Android', icon: AndroidIcon },
  { name: 'iPhone', icon: PhoneIcon },
  { name: 'Tablet', icon: TabletIcon },
  { name: 'PC', icon: LaptopIcon },
] as const;

export function Stats() {
  const reduce = useReducedMotion();

  return (
    <section id="stats" className="relative overflow-x-clip py-24 sm:py-32" aria-labelledby="stats-title">
      <div className="container-x">
        <h2 id="stats-title" className="sr-only">
          MOOR TV by the numbers
        </h2>

        <div className="hairline relative overflow-hidden rounded-[32px] glass p-8 sm:p-12 lg:p-16">
          {/* Interior lighting */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(47,123,255,0.28),transparent_70%)] blur-3xl"
          />

          <Stagger className="relative grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="group relative text-center lg:text-left">
                  <div className="text-[clamp(2.1rem,5.2vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                    {'value' in stat ? (
                      <span className="text-gradient">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </span>
                    ) : (
                      <span className="text-gradient">{stat.text}</span>
                    )}
                  </div>
                  <div className="mt-3.5 text-sm font-medium text-white/85">{stat.label}</div>
                  <div className="mt-1.5 text-[12px] leading-relaxed text-white/35">{stat.hint}</div>
                  <span
                    aria-hidden
                    className="mx-auto mt-5 block h-px w-14 bg-gradient-to-r from-electric to-neon opacity-45 transition-all duration-500 group-hover:w-24 group-hover:opacity-100 lg:mx-0"
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <GlowDivider className="my-12" />

          <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            <Reveal direction="right">
              <div className="text-center lg:text-left">
                <p className="font-display text-lg font-medium text-white">Works Everywhere</p>
                <p className="mt-1.5 text-[13px] text-white/40">
                  One account. Every screen in your home.
                </p>
              </div>
            </Reveal>

            <Stagger className="flex flex-wrap items-center justify-center gap-3">
              {DEVICES.map(({ name, icon: Icon }) => (
                <StaggerItem key={name}>
                  <motion.div
                    whileHover={reduce ? undefined : { y: -5 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 20 }}
                    className="group flex items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <Icon className="h-[18px] w-[18px] text-white/45 transition-colors group-hover:text-electric-soft" />
                    <span className="text-[13px] font-medium text-white/70 transition-colors group-hover:text-white">
                      {name}
                    </span>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Icons (stroked, 24px grid) ——— */
type IconProps = { className?: string };

function TvIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="4" width="19" height="13" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 20.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 17v3.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function AndroidIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 11.5a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4.5 11.5h15v5.2a2.3 2.3 0 0 1-2.3 2.3H6.8a2.3 2.3 0 0 1-2.3-2.3v-5.2Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="m7.4 5.4-1-1.7M16.6 5.4l1-1.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="9.3" cy="8.6" r="0.9" fill="currentColor" />
      <circle cx="14.7" cy="8.6" r="0.9" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 5.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10.8 18.6h2.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function TabletIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="4" y="2.5" width="16" height="19" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.6 18.4h2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LaptopIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="4" y="5" width="16" height="11" rx="1.9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 19h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
