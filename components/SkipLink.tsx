'use client';

import { useT } from '@/lib/i18n';

export function SkipLink() {
  const t = useT();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-black ltr:focus:left-4 rtl:focus:right-4"
    >
      {t.nav.skip}
    </a>
  );
}
