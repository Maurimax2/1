'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Rail } from '@/components/ui/Rail';
import { AddToCart } from '@/components/ui/AddToCart';
import { TiltCard } from '@/components/ui/TiltCard';
import { PosterArt } from '@/components/art/PosterArt';
import { DEVICES, type Product } from '@/lib/products';
import { formatPrice } from '@/lib/site';

const TONES: Record<string, [string, string]> = {
  stick: ['#ef2b47', '#6b1839'],
  box: ['#2f7bff', '#7c3aed'],
  pro: ['#a855f7', '#1450d8'],
  bundle: ['#22d3ee', '#2f7bff'],
  remote: ['#f4917a', '#6b1839'],
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
              Every device ships pre-configured with MOORTV installed and a full year of
              subscription included. Plug it in, connect WiFi, start watching.
            </>
          }
        />

        <div className="mt-16">
          <Rail ariaLabel="MOORTV devices">
            {DEVICES.map((device, i) => (
              <DeviceCard key={device.id} device={device} index={i} />
            ))}
          </Rail>
        </div>
      </div>
    </section>
  );
}

function DeviceCard({ device, index }: { device: Product; index: number }) {
  const reduce = useReducedMotion();
  const tone = TONES[device.art] ?? TONES.box;

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: Math.min(index, 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="w-[290px] sm:w-[330px]"
    >
      <TiltCard intensity={6} glow={`${tone[0]}30`} className="group h-full">
        <div className="hairline relative flex h-full flex-col overflow-hidden rounded-[28px] glass">
          {/* Product image */}
          <div className="relative overflow-hidden">
            <PosterArt
              variant={device.art}
              tone={tone}
              className="aspect-[4/3.4] w-full transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a10] to-transparent" />

            {device.badge && (
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                {device.badge}
              </span>
            )}

            {device.compareAt && (
              <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-ember to-ember-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_24px_-6px_rgba(239,43,71,0.9)]">
                −{Math.round((1 - device.price / device.compareAt) * 100)}%
              </span>
            )}
          </div>

          <div className="relative flex flex-1 flex-col p-6">
            <h3 className="font-display text-[19px] font-semibold tracking-tight text-white">
              {device.name}
            </h3>
            {device.nameAr && (
              <p dir="rtl" lang="ar" className="mt-1.5 text-left font-arabic text-[12px] text-white/35">
                {device.nameAr}
              </p>
            )}

            <p className="mt-3 text-[13px] leading-relaxed text-white/45">{device.blurb}</p>

            <ul className="mt-5 space-y-2.5">
              {device.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[12.5px] leading-snug text-white/60">
                  <span
                    aria-hidden
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                    style={{ background: tone[0], boxShadow: `0 0 8px 1px ${tone[0]}` }}
                  />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-end justify-between border-t border-white/[0.07] pt-5">
              <div>
                {device.compareAt && (
                  <div className="text-[12px] text-white/30 line-through">
                    {formatPrice(device.compareAt)}
                  </div>
                )}
                <div className="flex items-end gap-1.5">
                  <span className="text-[27px] font-semibold leading-none tracking-[-0.03em] text-white">
                    {new Intl.NumberFormat('en-US').format(device.price)}
                  </span>
                  <span className="pb-0.5 text-[12px] font-medium text-white/40">MRU</span>
                </div>
              </div>

              <motion.span
                aria-hidden
                animate={reduce ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/25"
              >
                In stock
              </motion.span>
            </div>

            <div className="mt-5">
              <AddToCart product={device} variant="glass" />
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}
