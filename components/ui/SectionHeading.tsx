import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
  action?: ReactNode;
}) {
  const centered = align === 'center';

  return (
    <div
      className={`flex flex-col gap-6 ${
        centered ? 'items-center text-center' : 'items-start text-left'
      } ${action ? 'md:flex-row md:items-end md:justify-between md:text-left' : ''} ${className}`}
    >
      <div className={`max-w-2xl ${centered && !action ? 'mx-auto' : ''}`}>
        {eyebrow && (
          <Reveal direction="down">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_10px_2px_rgba(47,123,255,0.9)]" />
              {eyebrow}
            </span>
          </Reveal>
        )}

        <Reveal delay={0.08}>
          <h2 className="mt-6 text-balance text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {title}
          </h2>
        </Reveal>

        {subtitle && (
          <Reveal delay={0.16}>
            <p
              className={`mt-5 text-[15px] leading-relaxed text-white/55 sm:text-base ${
                centered && !action ? 'mx-auto max-w-xl' : 'max-w-xl'
              }`}
            >
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>

      {action && (
        <Reveal delay={0.2} direction="left">
          <div className="shrink-0">{action}</div>
        </Reveal>
      )}
    </div>
  );
}
