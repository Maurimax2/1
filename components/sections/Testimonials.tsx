'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Review = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  tone: [string, string];
};

const REVIEWS: Review[] = [
  {
    name: 'Mohamed Ould Ahmed',
    role: 'Nouakchott',
    initials: 'MA',
    tone: ['#2f7bff', '#a855f7'],
    quote:
      'I watch every Premier League and Champions League match in 4K without a single freeze. Activation took less than five minutes on WhatsApp.',
  },
  {
    name: 'Fatimetou Mint Sidi',
    role: 'Nouadhibou',
    initials: 'FS',
    tone: ['#ef2b47', '#f4917a'],
    quote:
      'The kids section is perfect and my husband gets his football. One subscription replaced three we were paying for separately.',
  },
  {
    name: 'Cheikh Diallo',
    role: 'Rosso',
    initials: 'CD',
    tone: ['#22d3ee', '#2f7bff'],
    quote:
      'I bought the stick for 3000 MRU with the year included. Plugged it into an old TV and it became a smart TV instantly.',
  },
  {
    name: 'Aminetou Mint Baba',
    role: 'Kiffa',
    initials: 'AB',
    tone: ['#a855f7', '#e879f9'],
    quote:
      'Every Turkish and Arabic series I follow is there, in high quality, and new episodes appear the same week. I have not been disappointed once.',
  },
  {
    name: 'Sidi Mohamed Vall',
    role: 'Atar',
    initials: 'SV',
    tone: ['#10b981', '#22d3ee'],
    quote:
      'What convinced me was the support. I sent a message at midnight and someone answered and fixed it right away.',
  },
  {
    name: 'Mariem Mint Ely',
    role: 'Nouakchott',
    initials: 'ME',
    tone: ['#f97316', '#ef2b47'],
    quote:
      'I use it on my phone, my tablet and the TV at home. Same account, no arguments about who gets the screen.',
  },
];

export function Testimonials() {
  const reduce = useReducedMotion();
  const track = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="relative scroll-mt-28 overflow-hidden py-24 sm:py-32" aria-labelledby="reviews-title">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[880px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.13),transparent_68%)] blur-3xl"
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <span id="reviews-title">
              Loved across <span className="text-gradient">Mauritania</span>
            </span>
          }
          subtitle="Thousands of households already watch with MOORTV. Here is what a few of them say."
        />
      </div>

      {/* Auto-scrolling marquee, paused on hover so reviews stay readable */}
      <div className="relative mt-16 overflow-hidden mask-fade-x">
        <div
          className={`flex w-max gap-5 ${reduce ? '' : 'animate-marquee'} hover:[animation-play-state:paused]`}
          style={{ animationDuration: '64s' }}
        >
          {track.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} muted={i >= REVIEWS.length} />
          ))}
        </div>
      </div>

      <div className="container-x relative mt-14">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          <Trust value="4.9/5" label="Average rating" />
          <span aria-hidden className="hidden h-8 w-px bg-white/10 sm:block" />
          <Trust value="5,000+" label="Active subscribers" />
          <span aria-hidden className="hidden h-8 w-px bg-white/10 sm:block" />
          <Trust value="< 5 min" label="Typical activation" />
        </div>
      </div>
    </section>
  );
}

function Trust({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-[12px] text-white/35">{label}</div>
    </div>
  );
}

function ReviewCard({ review, muted }: { review: Review; muted: boolean }) {
  return (
    <figure
      className="hairline group relative flex w-[320px] shrink-0 flex-col rounded-[26px] glass p-6 transition-transform duration-500 hover:-translate-y-2 sm:w-[380px]"
      aria-hidden={muted}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${review.tone[0]}, transparent 70%)` }}
      />

      <div className="relative flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
        <span className="sr-only">5 out of 5 stars</span>
      </div>

      <blockquote className="relative mt-5 flex-1 text-[14px] leading-relaxed text-white/65">
        “{review.quote}”
      </blockquote>

      <figcaption className="relative mt-6 flex items-center gap-3.5 border-t border-white/[0.07] pt-5">
        {/* Generated monogram avatar — no stock photos of real people */}
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
          style={{
            background: `linear-gradient(140deg, ${review.tone[0]}, ${review.tone[1]})`,
            boxShadow: `0 10px 26px -10px ${review.tone[0]}`,
          }}
          aria-hidden
        >
          {review.initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13.5px] font-medium text-white">{review.name}</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-white/35">
            <PinIcon />
            {review.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function StarIcon() {
  return (
    <motion.svg
      viewBox="0 0 20 20"
      className="h-[15px] w-[15px]"
      aria-hidden
      initial={{ opacity: 0.7 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <defs>
        <linearGradient id="star-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f4917a" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.6l2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5 2.7 1-5.6-4.1-3.9 5.6-.8L10 1.6Z"
        fill="url(#star-grad)"
      />
    </motion.svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
      <path
        d="M8 14s5-4.2 5-7.6A5 5 0 0 0 3 6.4C3 9.8 8 14 8 14Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="8" cy="6.4" r="1.7" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
