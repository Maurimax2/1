/**
 * Original, procedurally-composed SVG artwork.
 *
 * Every visual on this site is drawn here from scratch — no stock photography,
 * no scraped promo art, no third-party posters. That keeps the site fully
 * licence-clean while still reading as cinematic key art.
 */

type Props = {
  variant: string;
  tone?: [string, string];
  className?: string;
  /** Decorative by default; pass a label when the art carries meaning. */
  label?: string;
};

/**
 * Ids are derived from the props rather than a counter so server and client
 * markup match byte-for-byte. Two tiles sharing a variant+tone also share
 * identical `<defs>`, so the collision is harmless.
 */
function artId(variant: string, tone: [string, string]) {
  return `art-${variant}-${tone.join('').replace(/[^a-z0-9]/gi, '')}`;
}

export function PosterArt({ variant, tone = ['#2f7bff', '#a855f7'], className, label }: Props) {
  const id = artId(variant, tone);
  const [a, b] = tone;

  return (
    <svg
      viewBox="0 0 400 560"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        {/* Deep, cinematic bed — the colour reads as lighting, not as flat paint. */}
        <linearGradient id={`${id}-bg`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={a} stopOpacity="0.62" />
          <stop offset="42%" stopColor={b} stopOpacity="0.42" />
          <stop offset="100%" stopColor="#040407" stopOpacity="1" />
        </linearGradient>

        <radialGradient id={`${id}-glow`} cx="50%" cy="26%" r="66%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.26" />
          <stop offset="38%" stopColor={a} stopOpacity="0.2" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0" />
        </radialGradient>

        {/* Corner falloff keeps the frame dark so the subject pops */}
        <radialGradient id={`${id}-vig`} cx="50%" cy="46%" r="72%">
          <stop offset="55%" stopColor="#050505" stopOpacity="0" />
          <stop offset="100%" stopColor="#030305" stopOpacity="0.85" />
        </radialGradient>

        <linearGradient id={`${id}-veil`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="38%" stopColor="#050505" stopOpacity="0" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0.95" />
        </linearGradient>

        <filter id={`${id}-noise`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        <filter id={`${id}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      <rect width="400" height="560" fill="#050505" />
      <rect width="400" height="560" fill={`url(#${id}-bg)`} />
      <rect width="400" height="560" fill={`url(#${id}-glow)`} />

      <g opacity="0.92">
        <Composition variant={variant} id={id} a={a} b={b} />
      </g>

      {/* Cinematic falloff so overlaid text always stays legible */}
      <rect width="400" height="560" fill={`url(#${id}-vig)`} />
      <rect width="400" height="560" fill={`url(#${id}-veil)`} />

      {/* Film grain */}
      <rect
        width="400"
        height="560"
        filter={`url(#${id}-noise)`}
        opacity="0.07"
        style={{ mixBlendMode: 'overlay' }}
      />
    </svg>
  );
}

function Composition({ variant, id, a, b }: { variant: string; id: string; a: string; b: string }) {
  const white = 'rgba(255,255,255,0.9)';

  switch (variant) {
    /* ——— Categories ——— */
    case 'movies':
      return (
        <g>
          <circle cx="200" cy="210" r="120" fill={b} opacity="0.35" filter={`url(#${id}-soft)`} />
          {/* Film strip sweeping across */}
          <g transform="rotate(-18 200 250)">
            <rect x="-40" y="190" width="480" height="120" rx="10" fill="#050505" opacity="0.55" />
            <rect x="-40" y="190" width="480" height="120" rx="10" fill="none" stroke={white} strokeOpacity="0.25" />
            {Array.from({ length: 14 }).map((_, i) => (
              <g key={i}>
                <rect x={-30 + i * 35} y="200" width="18" height="14" rx="3" fill={white} opacity="0.35" />
                <rect x={-30 + i * 35} y="286" width="18" height="14" rx="3" fill={white} opacity="0.35" />
              </g>
            ))}
          </g>
          <circle cx="200" cy="250" r="46" fill="rgba(255,255,255,0.14)" stroke={white} strokeOpacity="0.5" />
          <path d="M188 230 L224 250 L188 270 Z" fill={white} />
        </g>
      );

    case 'series':
      return (
        <g>
          <circle cx="120" cy="160" r="130" fill={a} opacity="0.4" filter={`url(#${id}-soft)`} />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={60 + i * 26}
              y={170 - i * 16}
              width="220"
              height="150"
              rx="16"
              fill="rgba(255,255,255,0.08)"
              stroke={white}
              strokeOpacity={0.14 + i * 0.12}
            />
          ))}
          <rect x="112" y="138" width="220" height="150" rx="16" fill="rgba(5,5,5,0.5)" />
          <path d="M205 190 L245 213 L205 236 Z" fill={white} opacity="0.92" />
        </g>
      );

    case 'football':
      return (
        <g>
          <ellipse cx="200" cy="330" rx="230" ry="120" fill={a} opacity="0.28" />
          <ellipse cx="200" cy="330" rx="230" ry="120" fill="none" stroke={white} strokeOpacity="0.28" />
          <ellipse cx="200" cy="330" rx="120" ry="62" fill="none" stroke={white} strokeOpacity="0.28" />
          <line x1="-30" y1="330" x2="430" y2="330" stroke={white} strokeOpacity="0.28" />
          <g transform="translate(200 176)">
            <circle r="58" fill="rgba(255,255,255,0.95)" />
            <path
              d="M0 -34 L30 -12 L18 24 L-18 24 L-30 -12 Z"
              fill="#0b0b12"
            />
            {[0, 72, 144, 216, 288].map((deg) => (
              <path
                key={deg}
                transform={`rotate(${deg})`}
                d="M0 -58 L14 -40 L-14 -40 Z"
                fill="#0b0b12"
                opacity="0.85"
              />
            ))}
          </g>
        </g>
      );

    case 'sports':
      return (
        <g>
          <circle cx="290" cy="150" r="120" fill={b} opacity="0.38" filter={`url(#${id}-soft)`} />
          {Array.from({ length: 5 }).map((_, i) => (
            <path
              key={i}
              d={`M-20 ${420 - i * 58} Q 200 ${330 - i * 62} 420 ${400 - i * 58}`}
              fill="none"
              stroke={white}
              strokeOpacity={0.35 - i * 0.05}
              strokeWidth={3 - i * 0.35}
            />
          ))}
          <g transform="translate(200 240)">
            <path d="M-52 40 L-18 -46 L18 -46 L52 40 Z" fill="rgba(255,255,255,0.12)" stroke={white} strokeOpacity="0.55" />
            <rect x="-10" y="40" width="20" height="34" fill={white} opacity="0.8" />
            <rect x="-34" y="72" width="68" height="12" rx="6" fill={white} opacity="0.8" />
            <path d="M-18 -46 L18 -46 L14 -8 L-14 -8 Z" fill={white} opacity="0.35" />
          </g>
        </g>
      );

    case 'kids':
      return (
        <g>
          {[
            [90, 180, 52],
            [280, 140, 40],
            [320, 300, 62],
            [110, 340, 46],
            [200, 240, 78],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={i % 2 ? a : b}
              opacity={0.55}
              stroke="rgba(255,255,255,0.5)"
            />
          ))}
          <g transform="translate(200 240)" fill="#fff" opacity="0.95">
            <path d="M0 -46 L13 -14 L48 -14 L20 8 L31 42 L0 21 L-31 42 L-20 8 L-48 -14 L-13 -14 Z" />
          </g>
        </g>
      );

    case 'anime':
      return (
        <g>
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = (i / 30) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={200 + Math.cos(angle) * 70}
                y1={240 + Math.sin(angle) * 70}
                x2={200 + Math.cos(angle) * 330}
                y2={240 + Math.sin(angle) * 330}
                stroke={white}
                strokeOpacity={i % 3 === 0 ? 0.3 : 0.12}
                strokeWidth={i % 3 === 0 ? 3 : 1.5}
              />
            );
          })}
          <circle cx="200" cy="240" r="76" fill="rgba(5,5,5,0.55)" stroke={white} strokeOpacity="0.6" />
          <ellipse cx="200" cy="240" rx="52" ry="34" fill="rgba(255,255,255,0.94)" />
          <circle cx="200" cy="240" r="20" fill={b} />
          <circle cx="192" cy="232" r="7" fill="#fff" />
        </g>
      );

    case 'entertainment':
      return (
        <g>
          <circle cx="200" cy="200" r="140" fill={a} opacity="0.3" filter={`url(#${id}-soft)`} />
          {/* Stage lights */}
          {[-1, 0, 1].map((k) => (
            <path
              key={k}
              d={`M${200 + k * 92} 40 L${140 + k * 150} 420 L${260 + k * 150} 420 Z`}
              fill={k === 0 ? b : a}
              opacity="0.22"
            />
          ))}
          <g transform="translate(200 250)">
            <rect x="-16" y="-70" width="32" height="86" rx="16" fill="rgba(255,255,255,0.92)" />
            <path d="M-34 -8 A34 34 0 0 0 34 -8" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
            <rect x="-4" y="26" width="8" height="30" fill="#fff" />
            <rect x="-26" y="56" width="52" height="9" rx="4.5" fill="#fff" />
          </g>
        </g>
      );

    case 'docs':
      return (
        <g>
          <path d="M-20 400 L110 250 L200 330 L300 190 L420 300 L420 560 L-20 560 Z" fill="#050505" opacity="0.55" />
          <path d="M-20 440 L120 320 L215 385 L320 260 L420 350" fill="none" stroke={white} strokeOpacity="0.45" strokeWidth="2" />
          <circle cx="300" cy="130" r="46" fill="rgba(255,255,255,0.9)" opacity="0.85" />
          <circle cx="286" cy="122" r="46" fill={b} opacity="0.75" />
          {Array.from({ length: 20 }).map((_, i) => (
            <circle key={i} cx={(i * 97) % 400} cy={(i * 53) % 240} r="1.6" fill="#fff" opacity="0.5" />
          ))}
        </g>
      );

    case 'news':
      return (
        <g>
          <circle cx="200" cy="230" r="118" fill="none" stroke={white} strokeOpacity="0.35" />
          <ellipse cx="200" cy="230" rx="52" ry="118" fill="none" stroke={white} strokeOpacity="0.3" />
          <ellipse cx="200" cy="230" rx="100" ry="118" fill="none" stroke={white} strokeOpacity="0.18" />
          <line x1="82" y1="230" x2="318" y2="230" stroke={white} strokeOpacity="0.35" />
          <line x1="96" y1="172" x2="304" y2="172" stroke={white} strokeOpacity="0.22" />
          <line x1="96" y1="288" x2="304" y2="288" stroke={white} strokeOpacity="0.22" />
          <rect x="60" y="382" width="280" height="44" rx="8" fill="rgba(239,68,68,0.85)" />
          <rect x="76" y="398" width="150" height="12" rx="6" fill="#fff" opacity="0.9" />
          <rect x="238" y="398" width="66" height="12" rx="6" fill="#fff" opacity="0.5" />
        </g>
      );

    case 'live':
      return (
        <g>
          <rect x="52" y="140" width="296" height="186" rx="18" fill="rgba(5,5,5,0.6)" stroke={white} strokeOpacity="0.4" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x={68 + (i % 3) * 96}
              y={156 + Math.floor(i / 3) * 88}
              width="80"
              height="72"
              rx="10"
              fill={i % 2 ? a : b}
              opacity={0.35 + (i % 3) * 0.12}
            />
          ))}
          <rect x="176" y="326" width="48" height="30" fill={white} opacity="0.35" />
          <rect x="128" y="356" width="144" height="12" rx="6" fill={white} opacity="0.55" />
          <g transform="translate(300 118)">
            <circle r="9" fill="#ef4444" />
            <circle r="9" fill="#ef4444" opacity="0.4" className="animate-pulse-ring" />
          </g>
        </g>
      );

    /* ——— Subscription plan art ——— */
    case 'starter':
      return (
        <g>
          <circle cx="200" cy="230" r="110" fill="none" stroke={white} strokeOpacity="0.3" strokeDasharray="6 10" />
          <circle cx="200" cy="230" r="74" fill="rgba(255,255,255,0.08)" stroke={white} strokeOpacity="0.4" />
          <path d="M200 168 L200 292 M138 230 L262 230" stroke={white} strokeOpacity="0.25" />
          <text x="200" y="248" textAnchor="middle" fill="#fff" fontSize="52" fontWeight="700" opacity="0.95">
            3
          </text>
        </g>
      );

    case 'popular':
      return (
        <g>
          <circle cx="200" cy="230" r="130" fill={b} opacity="0.3" filter={`url(#${id}-soft)`} />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="200" cy="230" r={62 + i * 26} fill="none" stroke={white} strokeOpacity={0.4 - i * 0.11} />
          ))}
          <text x="200" y="250" textAnchor="middle" fill="#fff" fontSize="56" fontWeight="700">
            6
          </text>
        </g>
      );

    case 'best':
      return (
        <g>
          <circle cx="200" cy="220" r="150" fill={b} opacity="0.35" filter={`url(#${id}-soft)`} />
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              transform={`rotate(${i * 30} 200 230)`}
              d="M200 74 L210 130 L190 130 Z"
              fill={white}
              opacity={i % 2 ? 0.35 : 0.6}
            />
          ))}
          <circle cx="200" cy="230" r="86" fill="rgba(5,5,5,0.5)" stroke={white} strokeOpacity="0.55" />
          <text x="200" y="240" textAnchor="middle" fill="#fff" fontSize="44" fontWeight="800">
            15
          </text>
          <text x="200" y="268" textAnchor="middle" fill="#fff" fontSize="15" opacity="0.75" letterSpacing="3">
            MONTHS
          </text>
        </g>
      );

    /* ——— Hero collage tiles ——— */
    case 'action':
      return (
        <g>
          {Array.from({ length: 7 }).map((_, i) => (
            <path
              key={i}
              d={`M${-40 + i * 30} 560 L${120 + i * 46} 0`}
              stroke={white}
              strokeOpacity={0.1 + (i % 3) * 0.1}
              strokeWidth={i % 2 ? 8 : 2}
            />
          ))}
          <circle cx="210" cy="230" r="80" fill="rgba(255,255,255,0.1)" stroke={white} strokeOpacity="0.5" />
          <path d="M170 190 L250 270 M250 190 L170 270" stroke="#fff" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
        </g>
      );

    case 'comedy':
      return (
        <g>
          <circle cx="200" cy="240" r="112" fill="rgba(255,255,255,0.14)" stroke={white} strokeOpacity="0.5" />
          <circle cx="164" cy="212" r="12" fill="#fff" />
          <circle cx="236" cy="212" r="12" fill="#fff" />
          <path d="M146 262 A58 58 0 0 0 254 262 Z" fill="#fff" opacity="0.92" />
        </g>
      );

    case 'drama':
      return (
        <g>
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={i * 46} y="0" width="22" height="560" fill={i % 2 ? a : b} opacity="0.16" />
          ))}
          <ellipse cx="200" cy="250" rx="96" ry="128" fill="rgba(5,5,5,0.55)" stroke={white} strokeOpacity="0.4" />
          <ellipse cx="200" cy="212" rx="44" ry="52" fill={white} opacity="0.25" />
        </g>
      );

    case 'scifi':
      return (
        <g>
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={(i * 137) % 400} cy={(i * 71) % 420} r={i % 5 === 0 ? 2.6 : 1.3} fill="#fff" opacity="0.6" />
          ))}
          <ellipse cx="200" cy="250" rx="120" ry="26" fill="none" stroke={white} strokeOpacity="0.5" />
          <circle cx="200" cy="230" r="66" fill={b} opacity="0.85" />
          <circle cx="180" cy="212" r="14" fill="#fff" opacity="0.25" />
          <ellipse cx="200" cy="250" rx="150" ry="34" fill="none" stroke={white} strokeOpacity="0.2" />
        </g>
      );

    /* ——— Devices ——— */
    case 'box':
    case 'pro':
    case 'bundle':
      return <BoxArt id={id} a={a} b={b} twin={variant === 'bundle'} tall={variant === 'pro'} />;

    case 'stick':
      return (
        <g>
          <circle cx="200" cy="250" r="140" fill={a} opacity="0.3" filter={`url(#${id}-soft)`} />
          <g transform="rotate(-14 200 260)">
            <rect x="118" y="222" width="180" height="66" rx="20" fill="#0c0d14" stroke={white} strokeOpacity="0.35" />
            <rect x="298" y="240" width="34" height="30" rx="6" fill="#8b8f9c" />
            <circle cx="160" cy="255" r="9" fill={b} />
            <rect x="182" y="248" width="70" height="6" rx="3" fill="#fff" opacity="0.25" />
            <rect x="182" y="262" width="42" height="6" rx="3" fill="#fff" opacity="0.15" />
          </g>
        </g>
      );

    case 'remote':
      return (
        <g>
          <circle cx="200" cy="250" r="130" fill={b} opacity="0.28" filter={`url(#${id}-soft)`} />
          <g transform="rotate(10 200 270)">
            <rect x="152" y="90" width="96" height="360" rx="46" fill="#0c0d14" stroke={white} strokeOpacity="0.35" />
            <circle cx="200" cy="150" r="17" fill={a} />
            <circle cx="200" cy="240" r="42" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="9" />
            <circle cx="200" cy="240" r="15" fill="#fff" opacity="0.85" />
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={168 + c * 24}
                  y={310 + r * 34}
                  width="18"
                  height="18"
                  rx="9"
                  fill="#fff"
                  opacity="0.22"
                />
              )),
            )}
          </g>
        </g>
      );

    default:
      return (
        <g>
          <circle cx="200" cy="230" r="120" fill={b} opacity="0.35" filter={`url(#${id}-soft)`} />
          <circle cx="200" cy="230" r="70" fill="rgba(255,255,255,0.1)" stroke={white} strokeOpacity="0.4" />
        </g>
      );
  }
}

function BoxArt({
  id,
  a,
  b,
  twin,
  tall,
}: {
  id: string;
  a: string;
  b: string;
  twin?: boolean;
  tall?: boolean;
}) {
  const white = 'rgba(255,255,255,0.9)';
  const h = tall ? 116 : 88;

  return (
    <g>
      <circle cx="200" cy="220" r="150" fill={a} opacity="0.3" filter={`url(#${id}-soft)`} />
      <ellipse cx="200" cy="404" rx="150" ry="26" fill="#000" opacity="0.5" />

      {twin && (
        <g transform="translate(-58 38) scale(0.82)" opacity="0.7">
          <rect x="88" y={330 - h} width="224" height={h} rx="18" fill="#101119" stroke={white} strokeOpacity="0.3" />
          <rect x="106" y={330 - h + 18} width="52" height="8" rx="4" fill={b} />
        </g>
      )}

      <g transform={twin ? 'translate(40 0)' : undefined}>
        {/* Body */}
        <rect x="88" y={356 - h} width="224" height={h} rx="20" fill="#0d0e16" stroke={white} strokeOpacity="0.35" />
        {/* Top face highlight */}
        <rect x="88" y={356 - h} width="224" height="18" rx="9" fill="#fff" opacity="0.06" />
        {/* Front detailing */}
        <rect x="112" y={356 - h + 26} width="64" height="8" rx="4" fill={b} />
        <circle cx="284" cy={356 - 20} r="6" fill="#22d3ee" />
        <rect x="112" y={356 - 26} width="120" height="6" rx="3" fill="#fff" opacity="0.18" />
        {tall && <rect x="112" y={356 - h + 46} width="42" height="6" rx="3" fill="#fff" opacity="0.14" />}
        {/* Glow strip beneath */}
        <rect x="112" y={358} width="176" height="4" rx="2" fill={a} opacity="0.9" />
      </g>

      {/* Floating remote */}
      <g transform="translate(292 176) rotate(16)" opacity="0.95">
        <rect x="0" y="0" width="46" height="150" rx="22" fill="#12131c" stroke={white} strokeOpacity="0.3" />
        <circle cx="23" cy="26" r="7" fill={b} />
        <circle cx="23" cy="66" r="15" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="4" />
        <rect x="13" y="98" width="20" height="6" rx="3" fill="#fff" opacity="0.2" />
        <rect x="13" y="114" width="20" height="6" rx="3" fill="#fff" opacity="0.2" />
      </g>
    </g>
  );
}
