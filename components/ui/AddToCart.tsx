'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './Button';
import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/products';
import { pick } from '@/lib/products';
import { useLang } from '@/lib/i18n';

export function AddToCart({
  product,
  variant = 'primary',
  size = 'md',
  full = true,
  label,
}: {
  product: Product;
  variant?: 'primary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
  label?: string;
}) {
  const { add, lastAdded } = useCart();
  const { t, lang } = useLang();
  const justAdded = lastAdded === product.id;

  return (
    <Button
      variant={variant}
      size={size}
      full={full}
      onClick={() => add(product.id)}
      aria-label={t.cart.addAria(pick(product, 'name', lang))}
    >
      <span className="relative inline-flex items-center justify-center gap-2">
        <AnimatePresence mode="wait" initial={false}>
          {justAdded ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="inline-flex items-center gap-2"
            >
              <CheckIcon />
              {t.cart.added}
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="inline-flex items-center gap-2"
            >
              <CartIcon />
              {label ?? t.cart.addToCart}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Button>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px]" aria-hidden>
      <path
        d="M3 4h2.2l2.1 10.4a1.8 1.8 0 0 0 1.77 1.44h7.4a1.8 1.8 0 0 0 1.76-1.4L20 8H6.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19.5" r="1.4" fill="currentColor" />
      <circle cx="17" cy="19.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px]" aria-hidden>
      <motion.path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
      />
    </svg>
  );
}
