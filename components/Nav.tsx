'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart';

const NAV_LINKS = [
  { label: 'Plans', href: '/#plans' },
  { label: 'TV Boxes', href: '/#boxes' },
  { label: 'Browse', href: '/#categories' },
  { label: 'Why Us', href: '/#why' },
  { label: 'FAQ', href: '/#faq' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  // Lock the page behind the mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <ScrollProgress />

      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-x">
          <div
            className={[
              'mt-3 flex items-center justify-between gap-4 rounded-full px-3 py-2.5 transition-all duration-500 sm:px-4',
              scrolled
                ? 'hairline glass-strong shadow-[0_20px_60px_-30px_rgba(0,0,0,1)]'
                : 'border border-transparent',
            ].join(' ')}
          >
            <a href="/#top" className="shrink-0 rounded-full pl-1" aria-label="MOORTV — home">
              <Logo size="sm" />
            </a>

            <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative rounded-full px-4 py-2 text-[13.5px] font-medium text-white/55 transition-colors hover:text-white"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    aria-hidden
                    className="absolute inset-0 scale-90 rounded-full bg-white/[0.06] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                  />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <CartButton count={count} onClick={openCart} />

              <div className="hidden sm:block">
                <Button href="/#plans" size="sm">
                  Start Watching
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-white/25 lg:hidden"
              >
                <span className="relative block h-3 w-4">
                  <motion.span
                    className="absolute left-0 top-0 block h-[1.6px] w-full rounded bg-current"
                    animate={menuOpen ? { rotate: 45, y: 5.2 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.span
                    className="absolute left-0 top-[5.2px] block h-[1.6px] w-full rounded bg-current"
                    animate={menuOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 block h-[1.6px] w-full rounded bg-current"
                    animate={menuOpen ? { rotate: -45, y: -5.2 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function CartButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={count > 0 ? `Open cart, ${count} item${count === 1 ? '' : 's'}` : 'Open cart'}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition-all duration-300 hover:border-white/25 hover:text-white"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
        <path
          d="M3 4h2.2l2.1 10.4a1.8 1.8 0 0 0 1.77 1.44h7.4a1.8 1.8 0 0 0 1.76-1.4L20 8H6.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="19.5" r="1.35" fill="currentColor" />
        <circle cx="17" cy="19.5" r="1.35" fill="currentColor" />
      </svg>

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 24 }}
            className="absolute -right-1 -top-1 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-gradient-to-br from-ember to-ember-soft px-1 text-[10.5px] font-bold text-white shadow-[0_4px_14px_-2px_rgba(239,43,71,0.9)]"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <div className="absolute inset-0 bg-void/92 backdrop-blur-2xl" onClick={onClose} />

          <motion.nav
            aria-label="Mobile"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="container-x relative flex h-full flex-col justify-center pb-20"
          >
            <ul className="space-y-1.5">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -26 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="block border-b border-white/[0.07] py-4 text-[26px] font-semibold tracking-tight text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="mt-10"
            >
              <Button href="/#plans" size="lg" full onClick={onClose}>
                Start Watching
              </Button>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[linear-gradient(90deg,#2f7bff,#a855f7,#ef2b47)]"
    />
  );
}
