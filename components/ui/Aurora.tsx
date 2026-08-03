/**
 * Layered aurora / cinematic lighting bed.
 * Pure CSS so it costs nothing on the main thread beyond compositing.
 */
export function Aurora({
  className = '',
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(47,123,255,0.22),transparent_60%)]" />

      {/* Drifting light bodies */}
      <div
        className="absolute -left-[18%] top-[-22%] h-[62vmax] w-[62vmax] rounded-full blur-[110px] animate-aurora"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(47,123,255,0.75), rgba(47,123,255,0) 62%)',
          opacity: 0.5 * intensity,
        }}
      />
      <div
        className="absolute -right-[16%] top-[-8%] h-[58vmax] w-[58vmax] rounded-full blur-[120px] animate-aurora"
        style={{
          background:
            'radial-gradient(circle at 60% 40%, rgba(168,85,247,0.72), rgba(168,85,247,0) 62%)',
          animationDelay: '-7s',
          opacity: 0.5 * intensity,
        }}
      />
      <div
        className="absolute bottom-[-28%] left-[26%] h-[54vmax] w-[54vmax] rounded-full blur-[130px] animate-aurora"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.55), rgba(34,211,238,0) 62%)',
          animationDelay: '-14s',
          opacity: 0.38 * intensity,
        }}
      />

      {/* Fine grid, faded out toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, #000 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, #000 20%, transparent 80%)',
        }}
      />

      {/* Vignette + floor fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,5,5,0.75)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}

/** Thin animated separator used between major sections. */
export function GlowDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`relative h-px w-full ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-24 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(47,123,255,0.28),transparent_70%)] blur-2xl" />
    </div>
  );
}
