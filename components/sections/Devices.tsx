'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AddToCart } from '@/components/ui/AddToCart';
import { TiltCard } from '@/components/ui/TiltCard';
import { Reveal } from '@/components/ui/Reveal';
import { PosterArt } from '@/components/art/PosterArt';
import { DEVICES, type Product } from '@/lib/products';
import { formatPrice } from '@/lib/site';

/** Deliberately deep so the hardware reads as a studio shot, not flat colour. */
const TONES: Record<string, [string, string]> = {
  stick: ['#9c1730', '#3d0c20'],
  box: ['#1c479c', '#2f1560'],
};

/** Brighter accents for the checkmarks and CTA glow on each card. */
const ACCENTS: Record<string, [string, string]> = {
  stick: ['#ef2b47', '#f4917a'],
  box: ['#2f7bff', '#a855f7'],
};

export function Devices() {
  return (
    <section id="boxes" className="relative scroll-mt-28 overflow-x-clip py-24 sm:py-32" aria-labelledby="boxes-title">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-32 h-[480px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(239,43,71,0.13),transparent_68%)] blur-3xl"
      />

      <div className="container-x relative">
        <SectionHeading
          align="left"
          eyebrow="TV Boxes & Sticks"
          title={
            <span id="boxes-title">
              Turn any screen into a <span className="text-gradient">smart TV</span>
            </span>
          }
          subtitle={
            <>
              <span dir="rtl" lang="ar" className="mb-2 block text-left font-arabic text-white/70">
                حول شاشتك لتلفاز ذكي
              </span>
              Both devices arrive pre-configured with MOORTV installed and a{' '}
              <span className="text-white/80">full year of subscription included</span>. Plug in,
              connect WiFi, start watching.
            </>
          }
        />

        <div className="perspective mt-16 grid gap-6 lg:grid-cols-2">
          {DEVICES.map((device, i) => (
            <DeviceCard key={device.id} device={device} index={i} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-[13px] text-white/35">
            Delivery available across Mauritania. We help you set it up on WhatsApp — free.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function DeviceCard({ device, index }: { device: Product; index: number }) {
  const reduce = useReducedMotion();
  const tone = TONES[device.art] ?? TONES.box;
  const accent = ACCENTS[device.art] ?? ACCENTS.box;
  const featured = device.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 54, rotateX: reduce ? 0 : -6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <TiltCard intensity={5} glow={`${accent[0]}26`} className="group h-full">
        <div
          className={[
            'relative flex h-full flex-col overflow-hidden rounded-[30px]',
            featured ? 'animated-border' : 'hairline',
          ].join(' ')}
        >
          <div className="relative flex h-full flex-col rounded-[30px] glass">
            {/* ——— Product shot ——— */}
            <div className="relative overflow-hidden rounded-t-[30px]">
              <PosterArt
                variant={device.art}
                tone={tone}
                className="aspect-[4/3] w-full transition-transform duration-[1200ms] ease-out sm:aspect-[16/11] group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0b12] to-transparent" />

              <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/55 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                {device.badge}
              </span>

              <span className="absolute right-5 top-5 rounded-full border border-emerald-400/30 bg-emerald-400/12 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300 backdrop-blur-md">
                1 Year Included
              </span>
            </div>

            {/* ——— Details ——— */}
            <div className="relative flex flex-1 flex-col p-7 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-[24px] font-semibold tracking-tight text-white">
                    {device.name}
                  </h3>
                  {device.nameAr && (
                    <p dir="rtl" lang="ar" className="mt-1.5 text-left font-arabic text-[12.5px] text-white/35">
                      {device.nameAr}
                    </p>
                  )}
                </div>

                <div className="shrink-0 sm:text-right">
                  <div className="flex items-end gap-1.5 sm:justify-end">
                    <span className="text-[32px] font-semibold leading-none tracking-[-0.035em] text-white">
                      {new Intl.NumberFormat('en-US').format(device.price)}
                    </span>
                    <span className="pb-1 text-[12px] font-medium text-white/40">MRU</span>
                  </div>
                  <p className="mt-1.5 text-[11.5px] text-white/30">one-time, year included</p>
                </div>
              </div>

              <p className="mt-4 text-[13.5px] leading-relaxed text-white/45">{device.blurb}</p>

              <ul className="mt-6 flex-1 space-y-3 border-t border-white/[0.07] pt-6">
                {device.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.05 }}
                    className="flex items-start gap-3 text-[13.5px] leading-snug text-white/65"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                      style={{ background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}
                    >
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                        <path d="m2.5 6.2 2.3 2.3L9.5 3.8" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex-1">
                  <AddToCart product={device} variant={featured ? 'primary' : 'glass'} size="lg" />
                </div>
                <motion.span
                  aria-hidden
                  animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden shrink-0 items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.14em] text-emerald-300/70 sm:flex"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  In stock
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}
