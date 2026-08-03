'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { AddToCart } from '@/components/ui/AddToCart';
import { Reveal } from '@/components/ui/Reveal';
import { PosterArt } from '@/components/art/PosterArt';
import { PLANS, type Product } from '@/lib/products';
import { formatPrice } from '@/lib/site';

export function Plans() {
  return (
    <section id="plans" className="relative scroll-mt-28 overflow-x-clip py-24 sm:py-32" aria-labelledby="plans-title">
      {/* Section lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.16),transparent_68%)] blur-3xl"
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Subscriptions"
          title={
            <span id="plans-title">
              Pick your plan. <span className="text-gradient">Watch everything.</span>
            </span>
          }
          subtitle="One subscription unlocks the entire MOORTV library — every movie, every series, every live channel, on every screen you own."
        />

        <div className="perspective mt-20 grid gap-6 lg:grid-cols-3 lg:items-center">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-[13px] text-white/35">
            All plans include instant activation and support on WhatsApp. Prices in Mauritanian
            ouguiya (MRU).
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PlanCard({ plan, index }: { plan: Product; index: number }) {
  const reduce = useReducedMotion();
  const featured = plan.featured;
  const popular = plan.badge === 'Most Popular';

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: reduce ? 0 : -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.95, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={featured ? 'lg:-my-8 lg:scale-[1.045] lg:z-10' : ''}
    >
      <TiltCard
        intensity={featured ? 7 : 5}
        glow={featured ? 'rgba(239,43,71,0.2)' : 'rgba(47,123,255,0.18)'}
        className="group h-full"
      >
        <div
          className={[
            'relative flex h-full flex-col overflow-hidden rounded-[30px]',
            featured ? 'animated-border' : 'hairline',
          ].join(' ')}
        >
          {/* Card body */}
          <div
            className={[
              'relative flex h-full flex-col rounded-[30px] p-7 sm:p-8',
              featured
                ? 'bg-[linear-gradient(165deg,rgba(74,16,48,0.72),rgba(12,10,24,0.94)_45%,rgba(8,8,14,0.97))]'
                : 'glass',
            ].join(' ')}
          >
            {/* Ambient glow inside the card */}
            <div
              aria-hidden
              className={[
                'pointer-events-none absolute -top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-700',
                featured
                  ? 'bg-[radial-gradient(circle,rgba(239,43,71,0.45),transparent_68%)] opacity-90'
                  : popular
                    ? 'bg-[radial-gradient(circle,rgba(168,85,247,0.35),transparent_68%)] opacity-70'
                    : 'bg-[radial-gradient(circle,rgba(47,123,255,0.3),transparent_68%)] opacity-0 group-hover:opacity-70',
              ].join(' ')}
            />

            {plan.badge && (
              <div className="relative mb-6 flex justify-center">
                <span
                  className={[
                    'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em]',
                    featured
                      ? 'bg-gradient-to-r from-ember to-ember-moon text-white shadow-[0_10px_30px_-8px_rgba(239,43,71,0.9)]'
                      : 'border border-neon/35 bg-neon/12 text-neon-soft',
                  ].join(' ')}
                >
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Plan artwork */}
            <div className="relative mx-auto mb-7 w-full max-w-[210px]">
              <div className="hairline relative overflow-hidden rounded-3xl">
                <PosterArt
                  variant={plan.art}
                  tone={featured ? ['#ef2b47', '#6b1839'] : popular ? ['#7c3aed', '#2f7bff'] : ['#2f7bff', '#22d3ee']}
                  className="aspect-[4/3] w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                />
              </div>
            </div>

            <div className="relative text-center">
              <h3 className="font-display text-[22px] font-semibold tracking-tight text-white">
                {plan.name}
              </h3>
              {plan.nameAr && (
                <p dir="rtl" lang="ar" className="mt-2 font-arabic text-[13px] text-white/40">
                  {plan.nameAr}
                </p>
              )}
              <p className="mt-2 text-[13px] text-white/40">{plan.blurb}</p>

              <div className="mt-6 flex items-end justify-center gap-2.5">
                <span
                  className={[
                    'text-[clamp(2.3rem,5vw,3.1rem)] font-semibold leading-none tracking-[-0.04em]',
                    featured ? 'text-white' : 'text-white',
                  ].join(' ')}
                >
                  {new Intl.NumberFormat('en-US').format(plan.price)}
                </span>
                <span className="pb-1.5 text-sm font-medium text-white/45">MRU</span>
              </div>

              {plan.compareAt && (
                <p className="mt-2.5 flex items-center justify-center gap-2 text-[12px]">
                  <span className="text-white/30 line-through">{formatPrice(plan.compareAt)}</span>
                  <span
                    className={[
                      'rounded-full px-2 py-0.5 font-semibold',
                      featured ? 'bg-ember/20 text-ember-moon' : 'bg-emerald-400/12 text-emerald-300',
                    ].join(' ')}
                  >
                    Save {Math.round((1 - plan.price / plan.compareAt) * 100)}%
                  </span>
                </p>
              )}
            </div>

            <ul className="relative mt-8 flex-1 space-y-3.5 border-t border-white/[0.07] pt-7">
              {plan.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.05 }}
                  className="flex items-start gap-3 text-[13.5px] leading-snug text-white/65"
                >
                  <Check featured={!!featured} />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="relative mt-8">
              <AddToCart product={plan} variant={featured || popular ? 'primary' : 'glass'} size="lg" />
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function Check({ featured }: { featured: boolean }) {
  return (
    <span
      className={[
        'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full',
        featured
          ? 'bg-gradient-to-br from-ember to-ember-moon'
          : 'bg-gradient-to-br from-electric to-neon',
      ].join(' ')}
      aria-hidden
    >
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
        <path
          d="m2.5 6.2 2.3 2.3L9.5 3.8"
          stroke="#fff"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
