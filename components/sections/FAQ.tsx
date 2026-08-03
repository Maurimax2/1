'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SITE, waLink } from '@/lib/site';

const FAQS = [
  {
    q: 'How do I get my subscription after ordering?',
    a: 'Add your plan to the cart and check out — the site opens WhatsApp with your order already written out. Send it, and we reply with your activation details. Most lines are live in under five minutes.',
  },
  {
    q: 'Which devices does MOORTV work on?',
    a: 'Smart TVs (Samsung, LG, Android TV), Android phones and boxes, iPhone and iPad, Windows and Mac laptops, and our own MOORTV Stick. One subscription covers your household — we will help you set up each device.',
  },
  {
    q: 'What is included in the library?',
    a: 'Over 20,000 movies, 10,000 series, and 9,000 live channels: all major football leagues, sports, kids programming, anime, documentaries, news, Arabic and Turkish drama, and content from the big international platforms.',
  },
  {
    q: 'Do I need a fast internet connection?',
    a: 'For 4K we recommend around 25 Mbps. Full HD works comfortably from about 10 Mbps, and the stream adapts automatically if your connection dips, so playback keeps going.',
  },
  {
    q: 'What is the difference between a subscription and a TV stick?',
    a: 'A subscription is the service itself, for devices you already own. The MOORTV Stick is hardware — 3000 MRU including a full year of subscription — which turns any HDMI screen into a smart TV, already configured.',
  },
  {
    q: 'How do I pay?',
    a: 'We arrange payment directly on WhatsApp using the methods common in Mauritania — Bankily, Masrvi, Sedad or cash. Nothing is charged through the website itself.',
  },
  {
    q: 'What happens when my subscription ends?',
    a: 'We message you before the end date so there is no interruption. Renewing is one message, and you keep the same line and settings.',
  },
  {
    q: 'What if something stops working?',
    a: 'Write to us on WhatsApp at any hour. Most issues are a quick settings fix; if a server needs changing we move you across immediately, at no cost.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-28 overflow-x-clip py-24 sm:py-32" aria-labelledby="faq-title">
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title={<span id="faq-title">Questions, answered</span>}
              subtitle="Everything you might want to know before you subscribe. Anything else — just ask us directly."
            />

            <Reveal delay={0.2}>
              <div className="mt-9 hairline rounded-3xl glass p-6">
                <p className="text-[13.5px] leading-relaxed text-white/55">
                  Still unsure? Message us on WhatsApp and we will answer in minutes.
                </p>
                <div className="mt-5">
                  <Button
                    href={waLink('Hello MOORTV, I have a question about your subscriptions.')}
                    target="_blank"
                    variant="whatsapp"
                    size="md"
                  >
                    <WhatsAppIcon />
                    {SITE.whatsappDisplay}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05} amount={0.1}>
                <AccordionItem
                  {...item}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${q.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <div
      className={[
        'hairline overflow-hidden rounded-[22px] transition-colors duration-500',
        isOpen ? 'glass-strong' : 'glass hover:bg-white/[0.05]',
      ].join(' ')}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
        >
          <span
            className={[
              'text-[15px] font-medium transition-colors duration-300',
              isOpen ? 'text-white' : 'text-white/75',
            ].join(' ')}
          >
            {q}
          </span>

          <span
            className={[
              'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
              isOpen
                ? 'rotate-180 border-transparent bg-gradient-to-br from-electric to-neon'
                : 'border-white/12 bg-white/[0.04]',
            ].join(' ')}
            aria-hidden
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white" fill="none">
              <path d="M4 6.5 8 10.5 12 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.42, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.28 } }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div aria-hidden className="mb-4 h-px w-full bg-gradient-to-r from-electric/40 via-neon/25 to-transparent" />
              <p className="text-[14px] leading-relaxed text-white/50">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WhatsAppIcon({ className = 'h-[17px] w-[17px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.6 2 2.17 6.43 2.16 11.88c0 1.74.46 3.44 1.32 4.94L2 22l5.32-1.39a9.86 9.86 0 0 0 4.71 1.2h.01c5.44 0 9.87-4.43 9.88-9.88a9.8 9.8 0 0 0-2.89-6.99A9.8 9.8 0 0 0 12.04 2Zm5.8 15.68a8.2 8.2 0 0 1-5.8 2.4h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.35c0-4.53 3.69-8.21 8.22-8.21a8.16 8.16 0 0 1 5.8 2.41 8.15 8.15 0 0 1 2.4 5.81c0 4.53-3.69 8.21-8.22 8.21Z" />
    </svg>
  );
}
