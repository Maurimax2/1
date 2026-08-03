'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';

/**
 * Arabic ⇄ English switch. Arabic is the default; the choice is remembered in
 * localStorage and applied to <html lang/dir> by the provider.
 */
export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, toggle, t } = useLang();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.switchLabel}
      className={`group relative flex h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-white/70 transition-all duration-300 hover:border-white/25 hover:text-white ${className}`}
    >
      <GlobeIcon />
      <span className="keep-tracking text-[12px] font-semibold tracking-[0.06em]" style={{ letterSpacing: '0.06em' }}>
        {lang === 'ar' ? 'EN' : 'ع'}
      </span>
      <motion.span
        aria-hidden
        key={lang}
        initial={{ opacity: 0.35, scale: 0.7 }}
        animate={{ opacity: 0, scale: 1.8 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 rounded-full bg-electric/40"
      />
    </button>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px]" aria-hidden>
      <circle cx="12" cy="12" r="8.6" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="3.6" ry="8.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.6 12h16.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
