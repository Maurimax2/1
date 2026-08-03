'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/site';
import { PosterArt } from '@/components/art/PosterArt';
import { Button } from '@/components/ui/Button';

const TONES: Record<string, [string, string]> = {
  starter: ['#2f7bff', '#22d3ee'],
  popular: ['#7c3aed', '#2f7bff'],
  best: ['#ef2b47', '#6b1839'],
  stick: ['#ef2b47', '#6b1839'],
  box: ['#2f7bff', '#7c3aed'],
  pro: ['#a855f7', '#1450d8'],
  bundle: ['#22d3ee', '#2f7bff'],
  remote: ['#f4917a', '#6b1839'],
};

export function CartDrawer() {
  const { items, count, subtotal, savings, total, isOpen, closeCart, remove, setQty } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Focus management + scroll lock + escape to close
  useEffect(() => {
    if (!isOpen) return;

    lastFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => panelRef.current?.focus(), 60);

    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
      document.body.style.overflow = '';
      lastFocused.current?.focus?.();
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={closeCart}
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-white/[0.08] bg-[linear-gradient(160deg,#0c0d14,#08080d)] outline-none"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(47,123,255,0.3),transparent_70%)] blur-2xl"
              />
              <div className="relative">
                <h2 className="font-display text-lg font-semibold text-white">Your Cart</h2>
                <p className="mt-0.5 text-[12px] text-white/35">
                  {count === 0 ? 'Nothing here yet' : `${count} item${count === 1 ? '' : 's'}`}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition-colors hover:border-white/25 hover:text-white"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                  <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <EmptyState onClose={closeCart} />
              ) : (
                <ul className="space-y-3.5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="hairline relative overflow-hidden rounded-2xl glass p-3.5"
                      >
                        <div className="flex gap-3.5">
                          <div className="h-[74px] w-[74px] shrink-0 overflow-hidden rounded-xl">
                            <PosterArt
                              variant={item.product.art}
                              tone={TONES[item.product.art] ?? TONES.box}
                              className="h-full w-full"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="truncate text-[13.5px] font-medium text-white">
                                {item.product.name}
                              </h3>
                              <button
                                type="button"
                                onClick={() => remove(item.product.id)}
                                aria-label={`Remove ${item.product.name}`}
                                className="shrink-0 rounded-md p-1 text-white/30 transition-colors hover:text-ember-soft"
                              >
                                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                                  <path d="M3 4.5h10M6.5 4.5V3.2h3v1.3M4.4 4.5l.5 8h6.2l.5-8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </div>

                            <p className="mt-0.5 text-[11.5px] capitalize text-white/30">
                              {item.product.kind}
                            </p>

                            <div className="mt-3 flex items-center justify-between gap-2">
                              <QtyStepper
                                qty={item.qty}
                                name={item.product.name}
                                onChange={(q) => setQty(item.product.id, q)}
                              />
                              <span className="text-[13.5px] font-semibold text-white">
                                {formatPrice(item.lineTotal)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="border-t border-white/[0.07] bg-black/30 px-6 py-5">
                <dl className="space-y-2.5 text-[13.5px]">
                  <div className="flex justify-between text-white/50">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-emerald-300/90">
                      <dt>Summer sale savings</dt>
                      <dd className="tabular-nums">−{formatPrice(savings)}</dd>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between border-t border-white/[0.07] pt-3.5">
                    <dt className="text-[15px] font-medium text-white">Total</dt>
                    <dd className="text-[21px] font-semibold tabular-nums text-white">
                      {formatPrice(total)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5">
                  <Button href="/checkout/" size="lg" full onClick={closeCart}>
                    Proceed to Checkout
                    <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden>
                      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Button>
                </div>

                <p className="mt-3.5 text-center text-[11.5px] text-white/30">
                  You confirm and pay on WhatsApp — nothing is charged here.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function QtyStepper({
  qty,
  name,
  onChange,
}: {
  qty: number;
  name: string;
  onChange: (qty: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-0.5">
      <StepButton label={`Decrease quantity of ${name}`} onClick={() => onChange(qty - 1)}>
        <path d="M3.5 8h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </StepButton>

      <span
        aria-live="polite"
        className="min-w-[26px] text-center text-[13px] font-semibold tabular-nums text-white"
      >
        {qty}
      </span>

      <StepButton label={`Increase quantity of ${name}`} onClick={() => onChange(qty + 1)}>
        <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </StepButton>
    </div>
  );
}

function StepButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full text-white/55 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-90"
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
        {children}
      </svg>
    </button>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(47,123,255,0.35),transparent_68%)] blur-2xl"
        />
        <svg viewBox="0 0 24 24" className="relative h-14 w-14 text-white/20" fill="none" aria-hidden>
          <path
            d="M3 4h2.2l2.1 10.4a1.8 1.8 0 0 0 1.77 1.44h7.4a1.8 1.8 0 0 0 1.76-1.4L20 8H6.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="19.5" r="1.3" fill="currentColor" />
          <circle cx="17" cy="19.5" r="1.3" fill="currentColor" />
        </svg>
      </div>

      <p className="text-[15px] font-medium text-white/70">Your cart is empty</p>
      <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed text-white/35">
        Add a subscription or a TV stick and it will show up here.
      </p>

      <div className="mt-7">
        <Button href="/#plans" variant="glass" onClick={onClose}>
          Browse plans
        </Button>
      </div>
    </div>
  );
}
