'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/lib/cart';
import { formatPrice, SITE, waLink } from '@/lib/site';
import { PosterArt } from '@/components/art/PosterArt';
import { pick } from '@/lib/products';
import { useLang, type Dict } from '@/lib/i18n';
import { Aurora } from '@/components/ui/Aurora';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { QtyStepper } from '@/components/CartDrawer';
import { WhatsAppIcon } from '@/components/sections/FAQ';

const TONES: Record<string, [string, string]> = {
  starter: ['#2f7bff', '#22d3ee'],
  popular: ['#7c3aed', '#2f7bff'],
  best: ['#ef2b47', '#6b1839'],
  stick: ['#ef2b47', '#6b1839'],
  box: ['#2f7bff', '#7c3aed'],
};

type Form = { name: string; phone: string; address: string; notes: string };
type Errors = Partial<Record<'name' | 'phone', string>>;

export function CheckoutView() {
  const { items, count, subtotal, savings, total, hydrated, remove, setQty } = useCart();
  const { t, lang, isRtl } = useLang();
  const [form, setForm] = useState<Form>({ name: '', phone: '', address: '', notes: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const message = useMemo(
    () => buildMessage(form, items, total, savings, t, lang),
    [form, items, total, savings, t, lang],
  );

  /** Editing a field clears its error immediately — no stale red borders. */
  function update(key: keyof Form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (key === 'name' || key === 'phone') {
      setErrors((e) => {
        if (!e[key]) return e;
        const next = { ...e };
        delete next[key];
        return next;
      });
    }
  }

  function validate(): boolean {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = t.checkout.nameError;
    // Mauritanian numbers are 8 digits; allow an optional +222 and separators.
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 8) next.phone = t.checkout.phoneError;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0 || !validate()) return;

    // Opened from a real user gesture, so popup blockers stay happy.
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return (
    <div className="relative min-h-screen overflow-hidden pb-24 pt-32 sm:pt-40">
      <Aurora intensity={0.55} />

      <div className="container-x relative">
        <Reveal>
          <a
            href="/#plans"
            className="group inline-flex items-center gap-2 text-[13px] text-white/40 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1 rtl:-scale-x-100" fill="none" aria-hidden>
              <path d="M13 8H4M7.5 4.5 4 8l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.checkout.back}
          </a>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-7 text-[clamp(2.1rem,5.5vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            {t.checkout.titleA} <span className="text-gradient">{t.checkout.titleB}</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/50">{t.checkout.intro}</p>
        </Reveal>

        {hydrated && items.length === 0 ? (
          <EmptyCheckout />
        ) : (
          <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
            {/* ——— Form ——— */}
            <Reveal delay={0.1} direction="right">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="hairline relative overflow-hidden rounded-[30px] glass p-6 sm:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-white">
                  {t.checkout.detailsTitle}
                </h2>
                <p className="mt-1.5 text-[13px] text-white/40">{t.checkout.detailsHint}</p>

                <div className="mt-8 space-y-5">
                  <Field
                    id="name"
                    label={t.checkout.name}
                    required
                    value={form.name}
                    onChange={(v) => update('name', v)}
                    error={errors.name}
                    placeholder={t.checkout.namePlaceholder}
                    autoComplete="name"
                  />

                  <Field
                    id="phone"
                    label={t.checkout.phone}
                    required
                    type="tel"
                    inputMode="tel"
                    dir="ltr"
                    value={form.phone}
                    onChange={(v) => update('phone', v)}
                    error={errors.phone}
                    placeholder={t.checkout.phonePlaceholder}
                    autoComplete="tel"
                    hint={t.checkout.phoneHint}
                  />

                  <Field
                    id="address"
                    label={t.checkout.address}
                    optional
                    value={form.address}
                    onChange={(v) => update('address', v)}
                    placeholder={t.checkout.addressPlaceholder}
                    autoComplete="street-address"
                    hint={t.checkout.addressHint}
                  />

                  <Field
                    id="notes"
                    label={t.checkout.notes}
                    optional
                    multiline
                    value={form.notes}
                    onChange={(v) => update('notes', v)}
                    placeholder={t.checkout.notesPlaceholder}
                  />
                </div>

                <div className="mt-8 border-t border-white/[0.07] pt-7">
                  <Button type="submit" variant="whatsapp" size="lg" full>
                    <WhatsAppIcon className="h-5 w-5" />
                    {t.checkout.submit}
                  </Button>

                  <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-white/35">
                    <LockIcon />
                    {t.checkout.noCharge(SITE.whatsappDisplay)}
                  </p>
                </div>

                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-5"
                      role="status"
                    >
                      <p className="flex items-center gap-2.5 text-[14px] font-medium text-emerald-300">
                        <CheckCircle />
                        {t.checkout.sentTitle}
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                        {t.checkout.sentBody}{' '}
                        <a
                          href={waLink(message)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-emerald-300 underline underline-offset-2"
                        >
                          {t.checkout.sentLink}
                        </a>
                        .
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Reveal>

            {/* ——— Order summary ——— */}
            <Reveal delay={0.16} direction="left">
              <div className="lg:sticky lg:top-28">
                <div className="hairline relative overflow-hidden rounded-[30px] glass-strong p-6 sm:p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.3),transparent_70%)] blur-3xl"
                  />

                  <div className="relative flex items-baseline justify-between">
                    <h2 className="font-display text-lg font-semibold text-white">
                      {t.checkout.summary}
                    </h2>
                    <span className="text-[12px] text-white/35">{t.cart.itemCount(count)}</span>
                  </div>

                  <ul className="relative mt-6 space-y-3">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.li
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: isRtl ? -30 : 30, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3"
                        >
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                            <PosterArt
                              variant={item.product.art}
                              tone={TONES[item.product.art] ?? TONES.box}
                              className="h-full w-full"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="truncate text-[13.5px] font-medium text-white">
                                {pick(item.product, 'name', lang)}
                              </p>
                              <button
                                type="button"
                                onClick={() => remove(item.product.id)}
                                aria-label={t.cart.remove(pick(item.product, 'name', lang))}
                                className="shrink-0 rounded p-0.5 text-white/25 transition-colors hover:text-ember-soft"
                              >
                                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                                  <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </button>
                            </div>

                            <div className="mt-2.5 flex items-center justify-between gap-2">
                              <QtyStepper
                                qty={item.qty}
                                name={pick(item.product, 'name', lang)}
                                onChange={(q) => setQty(item.product.id, q)}
                              />
                              <span className="text-[13px] font-semibold tabular-nums text-white">
                                {formatPrice(item.lineTotal)}
                              </span>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  <dl className="relative mt-6 space-y-2.5 border-t border-white/[0.07] pt-5 text-[13.5px]">
                    <div className="flex justify-between text-white/50">
                      <dt>{t.cart.subtotal}</dt>
                      <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-emerald-300/90">
                        <dt>{t.cart.savings}</dt>
                        <dd dir="ltr" className="tabular-nums">−{formatPrice(savings)}</dd>
                      </div>
                    )}
                    <div className="flex justify-between text-white/50">
                      <dt>{t.checkout.activation}</dt>
                      <dd className="text-emerald-300/90">{t.checkout.free}</dd>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-white/[0.07] pt-4">
                      <dt className="text-[15px] font-medium text-white">{t.cart.total}</dt>
                      <dd className="text-[24px] font-semibold tabular-nums text-white">
                        {formatPrice(total)}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Message preview — no surprises about what gets sent */}
                <details className="group mt-4 hairline overflow-hidden rounded-[22px] glass">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-[13px] font-medium text-white/60 transition-colors hover:text-white">
                    {t.checkout.preview}
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-180" fill="none" aria-hidden>
                      <path d="M4 6.5 8 10.5 12 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <pre className="max-h-64 overflow-auto whitespace-pre-wrap border-t border-white/[0.07] px-5 py-4 text-start font-sans text-[12.5px] leading-relaxed text-white/45">
                    {message}
                  </pre>
                </details>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </div>
  );
}

/** Builds the order message exactly as it will arrive on WhatsApp. */
function buildMessage(
  form: Form,
  items: ReturnType<typeof useCart>['items'],
  total: number,
  savings: number,
  t: Dict,
  lang: 'ar' | 'en',
) {
  const m = t.checkout.msg;
  const lines: string[] = [
    m.greeting,
    '',
    m.intro,
    '',
    `${m.name}: ${form.name.trim() || '—'}`,
    `${m.phone}: ${form.phone.trim() || '—'}`,
  ];

  if (form.address.trim()) lines.push(`${m.address}: ${form.address.trim()}`);

  lines.push('', m.products);

  if (items.length === 0) {
    lines.push(m.emptyList);
  } else {
    for (const item of items) {
      lines.push(
        `• ${pick(item.product, 'name', lang)} — ${m.qty}: ${item.qty} — ${formatPrice(item.lineTotal)}`,
      );
    }
  }

  if (savings > 0) lines.push('', `${m.savings}: ${formatPrice(savings)}`);

  lines.push('', `${m.total}: ${formatPrice(total)}`);

  if (form.notes.trim()) lines.push('', `${m.notes}: ${form.notes.trim()}`);

  lines.push('', m.closing);

  return lines.join('\n');
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
  required,
  optional,
  multiline,
  type = 'text',
  inputMode,
  autoComplete,
  dir,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  multiline?: boolean;
  type?: string;
  inputMode?: 'tel' | 'text';
  autoComplete?: string;
  dir?: 'ltr' | 'rtl';
}) {
  const { t } = useLang();
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ');

  const shared = {
    id,
    value,
    placeholder,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy || undefined,
    autoComplete,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    className: [
      'w-full rounded-2xl border bg-white/[0.03] px-4 py-3.5 text-[14.5px] text-white',
      'placeholder:text-white/22 transition-all duration-300 outline-none',
      'focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(47,123,255,0.12)]',
      error
        ? 'border-ember/60 focus:border-ember'
        : 'border-white/10 hover:border-white/20 focus:border-electric/70',
    ].join(' '),
  };

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-medium text-white/75">
          {label}
          {required && <span className="ml-1 text-ember-soft">*</span>}
        </label>
        {optional && <span className="text-[11.5px] text-white/25">{t.checkout.optional}</span>}
      </div>

      {multiline ? (
        <textarea {...shared} rows={3} className={`${shared.className} resize-none`} />
      ) : (
        <input {...shared} type={type} inputMode={inputMode} dir={dir} />
      )}

      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[11.5px] text-white/25">
          {hint}
        </p>
      )}
      {error && (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-[11.5px] text-ember-soft"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function EmptyCheckout() {
  const { t } = useLang();

  return (
    <Reveal delay={0.1}>
      <div className="mt-16 hairline flex flex-col items-center rounded-[30px] glass px-6 py-20 text-center">
        <div className="relative mb-7">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(47,123,255,0.3),transparent_68%)] blur-2xl"
          />
          <svg viewBox="0 0 24 24" className="relative h-16 w-16 text-white/20" fill="none" aria-hidden>
            <path d="M3 4h2.2l2.1 10.4a1.8 1.8 0 0 0 1.77 1.44h7.4a1.8 1.8 0 0 0 1.76-1.4L20 8H6.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="19.5" r="1.3" fill="currentColor" />
            <circle cx="17" cy="19.5" r="1.3" fill="currentColor" />
          </svg>
        </div>
        <h2 className="font-display text-xl font-semibold text-white">{t.checkout.emptyTitle}</h2>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/40">
          {t.checkout.emptyBody}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/#plans" size="lg">
            {t.checkout.emptyPlans}
          </Button>
          <Button href="/#boxes" variant="glass" size="lg">
            {t.checkout.emptyBoxes}
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/30" fill="none" aria-hidden>
      <rect x="3.2" y="7" width="9.6" height="6.4" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.6 7V5.2a2.4 2.4 0 0 1 4.8 0V7" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6.4 10.3 2.4 2.4 4.8-5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
