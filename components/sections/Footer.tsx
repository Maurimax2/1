'use client';

import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/sections/FAQ';
import { SITE, waLink } from '@/lib/site';
import { useLang } from '@/lib/i18n';

const LINK_GROUPS = [
  {
    heading: 'explore' as const,
    items: [
      { key: 'subscriptions' as const, href: '/#plans' },
      { key: 'boxes' as const, href: '/#boxes' },
      { key: 'categories' as const, href: '/#categories' },
      { key: 'why' as const, href: '/#why' },
    ],
  },
  {
    heading: 'support' as const,
    items: [
      { key: 'faq' as const, href: '/#faq' },
      { key: 'reviews' as const, href: '/#reviews' },
      { key: 'sale' as const, href: '/#offers' },
      { key: 'checkout' as const, href: '/checkout/' },
    ],
  },
];

export function Footer() {
  const year = 2026;
  const { t } = useLang();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] pt-20">
      {/* Floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(47,123,255,0.15),transparent_68%)] blur-3xl"
      />

      <div className="container-x relative">
        {/* Final CTA */}
        <Reveal>
          <div className="animated-border relative mb-20 overflow-hidden rounded-[32px]">
            <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,rgba(74,16,48,0.55),rgba(10,10,20,0.95)_50%,rgba(20,12,40,0.85))] px-7 py-14 text-center lg:flex-row lg:justify-between lg:px-14 lg:text-left">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(239,43,71,0.35),transparent_66%)] blur-3xl"
              />
              <div className="relative max-w-xl">
                <h2 className="text-[clamp(1.8rem,4.2vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
                  {t.footer.ctaTitleA} <span className="text-gradient">{t.footer.ctaTitleB}</span>
                </h2>
                <p className="mt-4 text-[15px] text-white/55">{t.footer.ctaSub}</p>
              </div>

              <div className="relative flex flex-col gap-3 sm:flex-row">
                <Button href="/#plans" size="lg">
                  {t.footer.ctaPrimary}
                </Button>
                <Button
                  href={waLink(t.footer.waLearnMore)}
                  target="_blank"
                  variant="whatsapp"
                  size="lg"
                >
                  <WhatsAppIcon />
                  {t.footer.ctaWhatsApp}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Columns */}
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Logo withTagline size="lg" />
            <p className="mt-6 max-w-sm text-[13.5px] leading-relaxed text-white/40">
              {t.footer.about}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <SocialLink href={waLink(t.footer.waGreeting)} label="WhatsApp" tone="#25D366">
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </SocialLink>
              <SocialLink href={SITE.snapchatUrl} label="Snapchat" tone="#FFFC00">
                <SnapchatIcon />
              </SocialLink>
            </div>
          </div>

          {LINK_GROUPS.map((column) => (
            <nav key={column.heading} aria-label={t.footer[column.heading]}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                {t.footer[column.heading]}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.items.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-[13.5px] text-white/50 transition-colors hover:text-white"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-gradient-to-r from-electric to-neon transition-all duration-300 group-hover:w-4"
                      />
                      {t.footer.links[item.key]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
              {t.footer.contact}
            </h3>
            <ul className="mt-5 space-y-4 text-[13.5px]">
              <li>
                <a
                  href={waLink(t.footer.waGreeting)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-white/50 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="mt-0.5 h-4 w-4 text-emerald-400/80" />
                  <span>
                    <span dir="ltr" className="block font-medium text-white/80 group-hover:text-white">
                      {SITE.whatsappDisplay}
                    </span>
                    <span className="text-[12px] text-white/35">{t.footer.waLine}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.snapchatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-white/50 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 text-yellow-300/80">
                    <SnapchatIcon />
                  </span>
                  <span>
                    <span dir="ltr" className="block font-medium text-white/80 group-hover:text-white">
                      {SITE.snapchat}
                    </span>
                    <span className="text-[12px] text-white/35">{t.footer.snapLine}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/50">
                <PinIcon />
                <span>
                  <span className="block font-medium text-white/80">{t.footer.country}</span>
                  <span className="text-[12px] text-white/35">{t.footer.countryLine}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-8 text-center sm:flex-row sm:text-left">
          <p className="text-[12px] text-white/30">
            © {year} {SITE.name}. {t.footer.rights}
          </p>
          <p className="max-w-md text-[11px] leading-relaxed text-white/25">
            {t.footer.trademarks}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  tone,
  children,
}: {
  href: string;
  label: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/60 transition-all duration-300 hover:-translate-y-1 hover:text-white"
      style={{ ['--tone' as string]: tone }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-60"
        style={{ background: tone }}
      />
      <span className="relative">{children}</span>
    </a>
  );
}

function SnapchatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M12.02 2c2.7 0 4.42 1.9 4.55 4.6.04.83-.02 1.63-.06 2.28.24.1.55.13.85.02.24-.09.5-.13.7-.13.5 0 .95.31.95.79 0 .45-.35.73-.9.95-.13.05-.31.1-.5.17-.5.16-1.05.35-1.2.7-.09.2-.05.46.12.78l.01.02c.05.1 1.24 2.4 3.48 2.77.28.05.48.3.46.58-.05.7-1.44 1.13-2.5 1.3-.11.02-.2.15-.26.44-.03.12-.06.27-.1.43-.06.24-.24.4-.5.4h-.03c-.16 0-.38-.03-.67-.09a5.4 5.4 0 0 0-1.1-.12c-.27 0-.54.02-.82.07-.54.09-1 .43-1.53.82-.76.56-1.62 1.2-2.93 1.2h-.12c-1.3 0-2.15-.64-2.9-1.2-.53-.4-1-.73-1.54-.82a5.1 5.1 0 0 0-.82-.07c-.47 0-.85.07-1.13.13-.26.05-.47.09-.63.09-.34 0-.5-.2-.56-.42-.04-.16-.07-.3-.1-.43-.06-.28-.15-.42-.26-.44-1.06-.16-2.45-.6-2.5-1.3a.55.55 0 0 1 .46-.58c2.24-.37 3.43-2.67 3.48-2.77l.01-.02c.17-.32.21-.58.12-.78-.15-.35-.7-.54-1.2-.7-.19-.06-.37-.12-.5-.17-.7-.28-.94-.6-.9-.99.04-.42.5-.71.94-.71.2 0 .43.04.66.13.32.12.6.15.85.06-.04-.65-.1-1.45-.06-2.28C7.6 3.9 9.32 2 12.02 2Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 text-electric-soft/80" fill="none" aria-hidden>
      <path d="M8 14.5s5-4.4 5-8A5 5 0 0 0 3 6.5c0 3.6 5 8 5 8Z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="6.5" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
