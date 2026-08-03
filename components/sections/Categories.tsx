'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Rail } from '@/components/ui/Rail';
import { Reveal } from '@/components/ui/Reveal';
import { PosterArt } from '@/components/art/PosterArt';
import { CATEGORIES, LEAGUES, type Category } from '@/lib/products';
import { useLang } from '@/lib/i18n';

/** Two rows, offset, so the section reads like a streaming home screen. */
const ROW_ONE = CATEGORIES.slice(0, 5);
const ROW_TWO = CATEGORIES.slice(5);

export function Categories() {
  const { t } = useLang();

  return (
    <section id="categories" className="relative scroll-mt-28 overflow-x-clip py-24 sm:py-32" aria-labelledby="categories-title">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-40 h-[500px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(47,123,255,0.14),transparent_68%)] blur-3xl"
      />

      <div className="container-x relative">
        <SectionHeading
          align="left"
          eyebrow={t.categories.eyebrow}
          title={
            <span id="categories-title">
              {t.categories.titleA} <span className="text-gradient">{t.categories.titleB}</span>
            </span>
          }
          subtitle={t.categories.subtitle}
        />
      </div>

      <div className="container-x relative mt-16 space-y-6">
        <Rail ariaLabel={t.categories.rowOne}>
          {ROW_ONE.map((c, i) => (
            <CategoryCard key={c.name} category={c} index={i} />
          ))}
        </Rail>

        <Rail ariaLabel={t.categories.rowTwo} className="lg:ps-16">
          {ROW_TWO.map((c, i) => (
            <CategoryCard key={c.name} category={c} index={i} />
          ))}
        </Rail>
      </div>

      {/* League strip — the football offer, spelled out */}
      <div className="container-x relative mt-16">
        <Reveal>
          <div className="hairline relative overflow-hidden rounded-[26px] glass px-6 py-7 sm:px-9">
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/35">
                  {t.categories.footballEyebrow}
                </p>
                <p className="mt-2.5 text-[17px] font-semibold text-white">
                  {t.categories.footballTitle}
                </p>
                <p className="mt-1 text-[13px] text-white/45">{t.categories.footballBody}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {LEAGUES.map((league, i) => (
                  <motion.span
                    key={league}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    dir="ltr"
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-medium text-white/60 transition-colors hover:border-emerald-400/35 hover:text-white"
                  >
                    {league}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }: { category: Category; index: number }) {
  const reduce = useReducedMotion();
  const { t, lang } = useLang();
  const name = lang === 'en' ? category.name : category.nameAr;
  const count = lang === 'en' ? category.count : category.countAr;

  return (
    <motion.a
      href="#plans"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: Math.min(index, 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { y: -10, scale: 1.035 }}
      className="group relative block w-[210px] sm:w-[248px]"
      aria-label={`${name} — ${count}`}
    >
      <div className="hairline relative aspect-[3/4] overflow-hidden rounded-[22px]">
        <PosterArt
          variant={category.art}
          tone={category.tone}
          className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.12]"
        />

        {/* Hover wash in the category's own colours */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(to top, ${category.tone[0]}55, transparent 55%)`,
          }}
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/92 via-black/45 to-transparent p-5 pt-16">
          {lang === 'en' && (
            <p
              dir="rtl"
              lang="ar"
              className="text-start font-arabic text-[13px] text-white/55 transition-colors group-hover:text-white/80"
            >
              {category.nameAr}
            </p>
          )}
          <h3 className="mt-1 font-display text-[19px] font-semibold tracking-tight text-white">
            {name}
          </h3>
          <p className="mt-1 text-[11.5px] text-white/45">{count}</p>

          {/* Slide-in CTA */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/0 transition-all duration-500 group-hover:text-white/85">
            {t.categories.explore}
            <svg viewBox="0 0 16 16" className="h-3 w-3 rtl:-scale-x-100" fill="none" aria-hidden>
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Neon rim on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 ring-1 ring-inset transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `0 0 50px -12px ${category.tone[0]}`, color: category.tone[1] }}
        />
      </div>
    </motion.a>
  );
}
