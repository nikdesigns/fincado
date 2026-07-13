import type { CarModel, BodyType } from '@/lib/carModels';

interface BodyTheme {
  gradient: string;
  silhouette: string;
}

const BODY_THEMES: Record<BodyType, BodyTheme> = {
  Hatchback: {
    gradient: 'from-slate-700 via-slate-600 to-slate-800',
    silhouette: 'text-slate-200/90',
  },
  Sedan: {
    gradient: 'from-stone-700 via-stone-600 to-stone-800',
    silhouette: 'text-stone-200/90',
  },
  'Compact SUV': {
    gradient: 'from-orange-700 via-orange-600 to-amber-800',
    silhouette: 'text-orange-50/90',
  },
  'Midsize SUV': {
    gradient: 'from-red-800 via-red-700 to-rose-900',
    silhouette: 'text-red-50/90',
  },
  'Off-Roader SUV': {
    gradient: 'from-amber-800 via-amber-700 to-stone-900',
    silhouette: 'text-amber-50/90',
  },
  MPV: {
    gradient: 'from-zinc-700 via-zinc-600 to-zinc-800',
    silhouette: 'text-zinc-200/90',
  },
};

// A single generic car-side-profile icon, reused across all models and tinted per body
// type. This is an original flat illustration, not a photo or brand-specific artwork.
function CarSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 62 C18 50 26 44 38 42 L52 24 C56 19 62 16 69 16 L128 16 C136 16 143 19 148 25 L162 42 C176 43 186 50 184 62 L182 66 C181 69 178 71 175 71 L166 71 C166 62 158 55 149 55 C140 55 132 62 132 71 L68 71 C68 62 60 55 51 55 C42 55 34 62 34 71 L25 71 C22 71 20 69 19 66 L20 62 Z"
        fill="currentColor"
        opacity="0.92"
      />
      <path
        d="M58 40 L68 24 C70 21 73 20 76 20 L120 20 C124 20 127 21 129 24 L140 40 Z"
        fill="currentColor"
        opacity="0.35"
      />
      <circle cx="51" cy="71" r="15" fill="currentColor" opacity="0.55" />
      <circle cx="51" cy="71" r="7" fill="currentColor" opacity="0.9" />
      <circle cx="149" cy="71" r="15" fill="currentColor" opacity="0.55" />
      <circle cx="149" cy="71" r="7" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export default function CarVisual({
  car,
  className = '',
}: {
  car: CarModel;
  className?: string;
}) {
  const theme = BODY_THEMES[car.bodyType];

  return (
    <div
      className={`relative w-full max-w-sm overflow-hidden rounded-xl bg-linear-to-br ${theme.gradient} p-5 shadow-md ${className}`}
      role="img"
      aria-label={`${car.name} illustration`}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />

      <div className="relative">
        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-white/70">
          {car.brand} • {car.bodyType}
        </div>
        <CarSilhouette className={`h-16 w-full ${theme.silhouette}`} />
        <div className="mt-2 text-base font-semibold leading-tight text-white">{car.name}</div>
      </div>
    </div>
  );
}
