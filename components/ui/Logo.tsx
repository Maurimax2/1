import { SITE } from '@/lib/site';

/**
 * MOORTV mark — a faithful vector recreation of the brand logo:
 * a retro TV set framing a Mauritanian desert night (crimson dunes,
 * plum sky, coral crescent moon).
 *
 * `tone` switches between the crimson brand colourway and the cool
 * blue/violet variant the brand also uses on dark artwork.
 */
export function LogoMark({
  className = 'h-10 w-10',
  tone = 'ember',
  glow = true,
}: {
  className?: string;
  tone?: 'ember' | 'cool';
  glow?: boolean;
}) {
  const p = tone === 'cool'
    ? { skyA: '#1b2a63', skyB: '#12194a', duneA: '#2f7bff', duneB: '#5b9dff', dark: '#0a1020', moon: '#9fd0ff' }
    : { skyA: '#6b1839', skyB: '#4a1030', duneA: '#ef2b47', duneB: '#ff4d5f', dark: '#101c18', moon: '#f4917a' };

  const suffix = tone;

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`moor-sky-${suffix}`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={p.skyA} />
          <stop offset="100%" stopColor={p.skyB} />
        </linearGradient>
        <linearGradient id={`moor-dune-${suffix}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.duneB} />
          <stop offset="100%" stopColor={p.duneA} />
        </linearGradient>
        <clipPath id={`moor-screen-${suffix}`}>
          <rect x="9.5" y="16.5" width="45" height="33" rx="6.5" />
        </clipPath>
        {glow && (
          <filter id={`moor-glow-${suffix}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <g filter={glow ? `url(#moor-glow-${suffix})` : undefined}>
        {/* Rabbit-ear antennae */}
        <path
          d="M24.5 4.5 L33.5 17 M39.5 4.5 L30.5 17"
          stroke={p.dark}
          strokeWidth="3.4"
          strokeLinecap="round"
        />

        {/* Screen scene */}
        <g clipPath={`url(#moor-screen-${suffix})`}>
          <rect x="9.5" y="16.5" width="45" height="33" fill={`url(#moor-sky-${suffix})`} />

          {/* Stars */}
          <circle cx="20.5" cy="23.5" r="0.85" fill={p.moon} opacity="0.9" />
          <circle cx="29.5" cy="26" r="0.7" fill={p.moon} opacity="0.75" />

          {/* Crescent moon */}
          <g>
            <circle cx="45.5" cy="26" r="6" fill={p.moon} />
            <circle cx="42.8" cy="23.6" r="5.9" fill={p.skyA} />
          </g>

          {/* Dunes — back to front */}
          <path d="M9.5 49.5 L23 32 L30 49.5 Z" fill={`url(#moor-dune-${suffix})`} />
          <path d="M15 49.5 L29.5 27 L44 49.5 Z" fill={p.dark} />
          <path d="M34 49.5 L45 36.5 L54.5 45 L54.5 49.5 Z" fill={`url(#moor-dune-${suffix})`} />
          <path
            d="M9.5 43.5 C17 39.5 22 46.5 30 44 C38.5 41.3 46 47.5 54.5 43 L54.5 49.5 L9.5 49.5 Z"
            fill={p.duneA}
          />
          <path
            d="M9.5 45.8 C18 41.6 24 48.5 33 45.6 C41 43 47.5 48.6 54.5 45.4"
            fill="none"
            stroke={p.dark}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Bezel */}
        <rect
          x="7"
          y="14"
          width="50"
          height="38"
          rx="9"
          fill="none"
          stroke={p.dark}
          strokeWidth="5"
        />

        {/* Stand */}
        <path
          d="M27.5 52 L27.5 55 Q27.5 56.5 26 56.5 L38 56.5 Q36.5 56.5 36.5 55 L36.5 52 Z"
          fill={p.dark}
        />
        <rect x="24" y="54.5" width="16" height="4.6" rx="2.3" fill={p.dark} />
      </g>
    </svg>
  );
}

export function Logo({
  withTagline = false,
  className = '',
  size = 'md',
  tone = 'ember',
}: {
  withTagline?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'ember' | 'cool';
}) {
  const mark = size === 'lg' ? 'h-14 w-14' : size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const word = size === 'lg' ? 'text-[26px]' : size === 'sm' ? 'text-[15px]' : 'text-[19px]';

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className={`${mark} shrink-0`} tone={tone} glow={size !== 'sm'} />
      <span className="flex flex-col leading-none">
        <span className={`font-display font-bold tracking-[0.1em] text-white ${word}`}>
          MOOR<span className="text-gradient-static">TV</span>
        </span>
        {withTagline && (
          <span
            dir="rtl"
            lang="ar"
            className="mt-2 text-left font-arabic text-[11px] font-medium leading-snug tracking-normal text-white/45"
          >
            {SITE.taglineAr}
          </span>
        )}
      </span>
    </span>
  );
}
