import { BRAND } from "@/lib/site";

/**
 * Rizely mark — Direction A "Sunrise Dot" (VISUAL-IDENTITY.md):
 * a sun rising over a horizon, painted in the sunrise gradient.
 * The gradient id is shared and identical across instances, which is safe.
 */
export function RizelyMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient
          id="rizely-sunrise"
          x1="0"
          y1="64"
          x2="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#C2703F" />
          <stop offset="0.42" stopColor="#F05100" />
          <stop offset="0.78" stopColor="#F99C00" />
          <stop offset="1" stopColor="#FCBB00" />
        </linearGradient>
        <clipPath id="rizely-horizon">
          <rect x="0" y="0" width="64" height="39" />
        </clipPath>
      </defs>
      {/* rays */}
      <g stroke="#F99C00" strokeWidth="2.6" strokeLinecap="round">
        <line x1="32" y1="4" x2="32" y2="12" />
        <line x1="18" y1="10" x2="22.5" y2="16" />
        <line x1="46" y1="10" x2="41.5" y2="16" />
      </g>
      {/* rising sun disc, clipped at the horizon */}
      <g clipPath="url(#rizely-horizon)">
        <circle cx="32" cy="34" r="14" fill="url(#rizely-sunrise)" />
      </g>
      {/* horizon line */}
      <rect x="6" y="38" width="52" height="3.4" rx="1.7" fill="currentColor" />
    </svg>
  );
}

/**
 * Full lockup: sunrise mark + two-tone wordmark (ink/off-white "R" + terracotta "izely").
 */
export function RizelyLogo({
  className = "",
  markClassName = "h-6 w-6 sm:h-7 sm:w-7",
  wordClassName = "text-xl sm:text-2xl",
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 text-foreground ${className}`}>
      <RizelyMark className={markClassName} />
      <span className={`font-heading font-bold tracking-tight ${wordClassName}`}>
        {BRAND.charAt(0)}
        <span className="text-primary">{BRAND.slice(1)}</span>
      </span>
    </span>
  );
}
