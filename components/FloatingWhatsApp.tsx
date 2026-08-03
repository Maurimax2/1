'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { WhatsAppIcon } from '@/components/sections/FAQ';
import { SITE, waLink } from '@/lib/site';
import { useT } from '@/lib/i18n';

/** Persistent order button — the main conversion path for this business. */
export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  const t = useT();

  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 700));

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink(t.footer.waOrder)}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.7, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 24 }}
          transition={{ type: 'spring', stiffness: 340, damping: 24 }}
          className="group fixed bottom-5 z-40 ltr:right-5 rtl:left-5 flex items-center gap-0 overflow-hidden rounded-full bg-[linear-gradient(135deg,#059669,#10b981)] p-4 text-white shadow-[0_18px_45px_-14px_rgba(16,185,129,0.9)] transition-all duration-500 hover:gap-2.5 hover:pr-6 sm:bottom-7 ltr:sm:right-7 rtl:sm:left-7"
          aria-label={t.footer.orderAria(SITE.whatsappDisplay)}
        >
          <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400/40" />
          <WhatsAppIcon className="relative h-6 w-6" />
          <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-[13.5px] font-semibold transition-all duration-500 group-hover:max-w-[130px]">
            {t.footer.orderNow}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
