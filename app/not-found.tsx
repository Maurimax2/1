'use client';

import { Button } from '@/components/ui/Button';
import { Aurora } from '@/components/ui/Aurora';
import { useT } from '@/lib/i18n';

export default function NotFound() {
  const t = useT();

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Aurora intensity={0.7} />
      <p className="relative text-[clamp(5rem,18vw,11rem)] font-semibold leading-none tracking-[-0.05em] text-gradient">
        404
      </p>
      <h1 className="relative mt-4 text-[clamp(1.4rem,4vw,2.2rem)] font-semibold tracking-tight">
        {t.notFound.title}
      </h1>
      <p className="relative mt-4 max-w-md text-[15px] leading-relaxed text-white/45">
        {t.notFound.body}
      </p>
      <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="lg">
          {t.notFound.home}
        </Button>
        <Button href="/#plans" variant="glass" size="lg">
          {t.notFound.plans}
        </Button>
      </div>
    </div>
  );
}
