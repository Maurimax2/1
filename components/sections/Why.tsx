'use client';

import type { ReactElement } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';

type Feature = {
  title: string;
  titleAr: string;
  body: string;
  icon: (p: { className?: string }) => ReactElement;
  tone: string;
};

const FEATURES: Feature[] = [
  {
    title: 'Ultra HD Streaming',
    titleAr: 'جودة فائقة',
    body: 'True 4K UHD with adaptive bitrate, so the picture stays sharp even when the connection dips.',
    icon: SparkIcon,
    tone: '#2f7bff',
  },
  {
    title: 'Fast Activation',
    titleAr: 'تفعيل فوري',
    body: 'Order on WhatsApp and your line is live in minutes — not hours, not tomorrow.',
    icon: BoltIcon,
    tone: '#a855f7',
  },
  {
    title: 'Massive Library',
    titleAr: 'مكتبة ضخمة',
    body: 'Over 20,000 movies, 10,000 series and 9,000 live channels in one single place.',
    icon: LayersIcon,
    tone: '#22d3ee',
  },
  {
    title: 'Works Everywhere',
    titleAr: 'على كل الأجهزة',
    body: 'Smart TV, Android, iPhone, iPad, laptop or our own stick. One account covers them all.',
    icon: DevicesIcon,
    tone: '#ef2b47',
  },
  {
    title: 'Affordable Prices',
    titleAr: 'أسعار مناسبة',
    body: 'A fraction of what the individual platforms cost separately, with no hidden fees.',
    icon: TagIcon,
    tone: '#10b981',
  },
  {
    title: 'Reliable Support',
    titleAr: 'دعم موثوق',
    body: 'Real people on WhatsApp who answer quickly and actually fix things.',
    icon: SupportIcon,
    tone: '#f4917a',
  },
  {
    title: 'Premium Quality',
    titleAr: 'جودة ممتازة',
    body: 'Stable servers with anti-freeze technology built for Mauritanian networks.',
    icon: ShieldIcon,
    tone: '#7c3aed',
  },
  {
    title: 'Always Growing',
    titleAr: 'تحديث مستمر',
    body: 'New films, new seasons and new channels added every single week.',
    icon: RefreshIcon,
    tone: '#f97316',
  },
];

export function Why() {
  return (
    <section id="why" className="relative scroll-mt-28 overflow-x-clip py-24 sm:py-32" aria-labelledby="why-title">
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Why MOORTV"
          title={
            <span id="why-title">
              Built to be the <span className="text-gradient">best in Mauritania</span>
            </span>
          }
          subtitle="Not just a bigger catalogue — a better experience, end to end."
        />

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.title}>
              <FeatureCard feature={feature} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const reduce = useReducedMotion();
  const Icon = feature.icon;

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative h-full"
    >
      <div className="hairline relative flex h-full flex-col overflow-hidden rounded-[24px] glass p-6">
        {/* Corner glow keyed to the feature colour */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
          style={{ background: `radial-gradient(circle, ${feature.tone}, transparent 68%)` }}
        />

        <span
          className="relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110"
          style={{
            borderColor: `${feature.tone}44`,
            background: `linear-gradient(145deg, ${feature.tone}26, transparent)`,
            boxShadow: `0 12px 34px -14px ${feature.tone}`,
          }}
        >
          <Icon className="h-[22px] w-[22px]" />
        </span>

        <h3 className="relative font-display text-[16px] font-semibold tracking-tight text-white">
          {feature.title}
        </h3>
        <p dir="rtl" lang="ar" className="relative mt-1.5 text-left font-arabic text-[12px] text-white/35">
          {feature.titleAr}
        </p>
        <p className="relative mt-3 text-[13px] leading-relaxed text-white/45">{feature.body}</p>

        <span
          aria-hidden
          className="relative mt-6 block h-px w-10 transition-all duration-500 group-hover:w-20"
          style={{ background: `linear-gradient(90deg, ${feature.tone}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

/* ——— Icons ——— */
type P = { className?: string };
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function SparkIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden style={{ color: '#5b9dff' }}>
      <path d="M12 3.2 13.9 9l5.9 1.9-5.9 1.9L12 18.8l-1.9-5.9L4.2 11 10.1 9 12 3.2Z" {...stroke} />
      <path d="M18.6 3.4 19.3 5.4l2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" {...stroke} />
    </svg>
  );
}

function BoltIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden style={{ color: '#c084fc' }}>
      <path d="M13.2 2.5 5 13.4h5.5l-.8 8.1L18.9 10.4H13.4l-.2-7.9Z" {...stroke} />
    </svg>
  );
}

function LayersIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden style={{ color: '#67e8f9' }}>
      <path d="m12 3 8.5 4.4L12 11.8 3.5 7.4 12 3Z" {...stroke} />
      <path d="m3.5 12 8.5 4.4 8.5-4.4M3.5 16.6 12 21l8.5-4.4" {...stroke} />
    </svg>
  );
}

function DevicesIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden style={{ color: '#ff7a88' }}>
      <rect x="2.5" y="5" width="13" height="10" rx="1.8" {...stroke} />
      <rect x="16.5" y="9" width="5" height="10" rx="1.6" {...stroke} />
      <path d="M6.5 18.5h5" {...stroke} />
      <path d="M9 15v3.5" {...stroke} />
    </svg>
  );
}

function TagIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden style={{ color: '#34d399' }}>
      <path d="M11.2 3.2H20a.8.8 0 0 1 .8.8v8.8a2 2 0 0 1-.6 1.4l-6.4 6.4a1.6 1.6 0 0 1-2.3 0l-7.9-7.9a1.6 1.6 0 0 1 0-2.3l6.4-6.4a2 2 0 0 1 1.2-.8Z" {...stroke} />
      <circle cx="16.4" cy="7.6" r="1.5" {...stroke} />
    </svg>
  );
}

function SupportIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden style={{ color: '#f4917a' }}>
      <path d="M4.5 13v-1a7.5 7.5 0 0 1 15 0v1" {...stroke} />
      <rect x="2.6" y="12.6" width="4" height="6.4" rx="2" {...stroke} />
      <rect x="17.4" y="12.6" width="4" height="6.4" rx="2" {...stroke} />
      <path d="M19.4 19v.6a2.4 2.4 0 0 1-2.4 2.4h-2.6" {...stroke} />
    </svg>
  );
}

function ShieldIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden style={{ color: '#c4b5fd' }}>
      <path d="M12 2.8 4.8 5.8v5.6c0 4.4 3 8.1 7.2 9.8 4.2-1.7 7.2-5.4 7.2-9.8V5.8L12 2.8Z" {...stroke} />
      <path d="m8.8 11.8 2.3 2.3 4.1-4.6" {...stroke} />
    </svg>
  );
}

function RefreshIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden style={{ color: '#fdba74' }}>
      <path d="M20.2 11.2a8.2 8.2 0 1 0-1.3 5.6" {...stroke} />
      <path d="M20.6 5.6v5.6H15" {...stroke} />
    </svg>
  );
}
