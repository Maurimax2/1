'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Aurora } from '@/components/ui/Aurora';
import { Particles } from '@/components/ui/Particles';
import { Button } from '@/components/ui/Button';
import { PosterArt } from '@/components/art/PosterArt';
import { SITE } from '@/lib/site';
import { useLang, useT } from '@/lib/i18n';

/**
 * Collage tiles form two loose curtains down the left and right margins so the
 * headline column always stays clear.
 *
 * `pos` carries the full responsive position: on phones the four surviving
 * tiles sit mostly off-canvas (a sliver of colour at each edge), and they move
 * inward as the viewport widens. `lgOnly` drops the denser tiles below lg.
 */
const TILES = [
  // Left curtain
  { art: 'action', key: 'action', tone: ['#2f7bff', '#e879f9'], pos: 'left-[-6%] top-[24%] sm:left-[2%] lg:left-[8.5%] lg:top-[21%]', w: 'w-[96px] sm:w-[112px] xl:w-[132px]', depth: 1.6, delay: 0.1, rot: -8, lgOnly: false },
  { art: 'football', key: 'football', tone: ['#10b981', '#2f7bff'], pos: 'left-[18%] top-[54%]', w: 'w-[96px] xl:w-[114px]', depth: 2.5, delay: 0.22, rot: 6, lgOnly: true },
  { art: 'docs', key: 'docs', tone: ['#0ea5e9', '#14b8a6'], pos: 'left-[-7%] top-[78%] sm:left-[1%] lg:left-[8%] lg:top-[80%]', w: 'w-[84px] sm:w-[88px] xl:w-[104px]', depth: 3.1, delay: 0.34, rot: -12, lgOnly: false },
  { art: 'comedy', key: 'comedy', tone: ['#f97316', '#e879f9'], pos: 'left-[21%] top-[12%]', w: 'w-[78px] xl:w-[92px]', depth: 2.2, delay: 0.28, rot: 7, lgOnly: true },

  // Right curtain
  { art: 'scifi', key: 'scifi', tone: ['#7c3aed', '#22d3ee'], pos: 'left-[106%] top-[24%] sm:left-[98%] lg:left-[90.5%] lg:top-[20%]', w: 'w-[96px] sm:w-[112px] xl:w-[132px]', depth: 1.9, delay: 0.16, rot: 9, lgOnly: false },
  { art: 'kids', key: 'kids', tone: ['#22d3ee', '#a855f7'], pos: 'left-[82%] top-[53%]', w: 'w-[96px] xl:w-[114px]', depth: 2.9, delay: 0.3, rot: -6, lgOnly: true },
  { art: 'anime', key: 'anime', tone: ['#e879f9', '#2f7bff'], pos: 'left-[107%] top-[78%] sm:left-[99%] lg:left-[91%] lg:top-[79%]', w: 'w-[84px] sm:w-[88px] xl:w-[104px]', depth: 3.4, delay: 0.4, rot: 11, lgOnly: false },
  { art: 'drama', key: 'drama', tone: ['#a855f7', '#1450d8'], pos: 'left-[79%] top-[12%]', w: 'w-[78px] xl:w-[92px]', depth: 2.6, delay: 0.36, rot: -5, lgOnly: true },
] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { t, isRtl } = useLang();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '32%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const collageY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);

  // Mouse parallax — normalised to [-1, 1] then spring-smoothed
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 70, damping: 20, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 70, damping: 20, mass: 0.6 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden pt-28 pb-24"
      aria-label={t.hero.aria}
    >
      <Aurora />
      <Particles />

      {/* ——— Floating collage ——— */}
      <motion.div
        style={reduce ? undefined : { y: collageY }}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        {TILES.map((tile) => (
          <CollageTile
            key={tile.art}
            tile={tile}
            label={t.hero.tiles[tile.key]}
            px={px}
            py={py}
            reduce={!!reduce}
          />
        ))}
      </motion.div>

      {/* Keeps the centre column readable over the collage */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_46%_58%_at_50%_50%,rgba(5,5,5,0.94),rgba(5,5,5,0.72)_48%,transparent_76%)]"
        aria-hidden
      />

      {/* ——— Content ——— */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 flex flex-col items-center text-center"
      >
        <motion.a
          href="#offers"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="group relative inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] py-2 pl-2 pr-5 text-[12px] backdrop-blur-xl transition-colors hover:border-white/25"
        >
          <span className="relative flex h-6 items-center rounded-full bg-gradient-to-r from-electric to-neon px-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            {t.hero.saleBadge}
          </span>
          <span className="text-white/60 transition-colors group-hover:text-white/90">
            {t.hero.salePitch}
          </span>
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white rtl:-scale-x-100" fill="none" aria-hidden>
            <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 max-w-5xl text-[clamp(2.6rem,7.4vw,5.9rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
        >
          <AnimatedLine text={t.hero.titleA} delay={0.28} />
          {/*
            The gradient must sit on a block, not an inline wrapping an
            inline-block — otherwise background-clip:text has no box covering
            the second wrapped line and that line renders invisible.
          */}
          <span className="text-gradient block">
            <AnimatedLine text={t.hero.titleB} delay={0.5} />
          </span>
        </motion.h1>

        <motion.p
          dir="rtl"
          lang="ar"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 font-arabic text-[clamp(1rem,2.6vw,1.35rem)] font-medium text-white/65"
        >
          {SITE.taglineAr}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/55 sm:text-[17px]"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.02, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11 flex flex-col items-center gap-3.5 sm:flex-row"
        >
          <Button href="#plans" size="lg" className="w-full sm:w-auto">
            {t.hero.ctaPrimary}
            <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100" fill="none" aria-hidden>
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <Button href="#offers" size="lg" variant="glass" className="w-full sm:w-auto">
            {t.hero.ctaSecondary}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-white/35"
        >
          {t.hero.chips.map((chip) => (
            <span key={chip} className="inline-flex items-center gap-1.5">
              <Dot /> {chip}
            </span>
          ))}
        </motion.p>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-electric shadow-[0_0_8px_2px_rgba(47,123,255,0.8)]" />;
}

/** Word-by-word reveal, kept as one accessible string for screen readers. */
function AnimatedLine({ text, delay }: { text: string; delay: number }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) return <span>{text}</span>;

  return (
    <span className="inline-block" aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, delay: delay + i * 0.085, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function CollageTile({
  tile,
  label,
  px,
  py,
  reduce,
}: {
  tile: (typeof TILES)[number];
  label: string;
  px: ReturnType<typeof useSpring>;
  py: ReturnType<typeof useSpring>;
  reduce: boolean;
}) {
  const range = tile.depth * 11;
  const x = useTransform(px, [-1, 1], [range, -range]);
  const y = useTransform(py, [-1, 1], [range * 0.75, -range * 0.75]);

  return (
    <motion.div
      className={`absolute ${tile.pos} ${tile.w} -translate-x-1/2 -translate-y-1/2 ${
        tile.lgOnly ? 'hidden lg:block' : ''
      }`}
      style={reduce ? undefined : { x, y }}
      initial={{ opacity: 0, scale: 0.82, filter: 'blur(14px)' }}
      animate={{ opacity: 0.88, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.3, delay: tile.delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="animate-float-slow"
        style={{ animationDelay: `${tile.delay * 3}s`, animationDuration: `${9 + tile.depth}s` }}
      >
        <figure
          className="hairline group relative overflow-hidden rounded-[18px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)]"
          style={{ transform: `rotate(${tile.rot}deg)` }}
        >
          <PosterArt
            variant={tile.art}
            tone={tile.tone as unknown as [string, string]}
            className="aspect-[2/3] w-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/88 to-transparent px-2.5 pb-2 pt-7 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-white/70">
            {label}
          </figcaption>
        </figure>
      </div>
    </motion.div>
  );
}

function ScrollIndicator() {
  const t = useT();

  return (
    <motion.a
      href="#logos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.6 }}
      className="group absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2.5 sm:flex"
      aria-label={t.hero.scroll}
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 transition-colors group-hover:text-white/60">
        {t.hero.scroll}
      </span>
      <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/20 p-1.5 transition-colors group-hover:border-white/45">
        <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-scroll-dot" />
      </span>
    </motion.a>
  );
}
