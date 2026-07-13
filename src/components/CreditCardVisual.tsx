import type { CreditCard } from '@/lib/creditCards';

interface IssuerTheme {
  gradient: string;
  textClass: string;
  accentClass: string;
}

const ISSUER_THEMES: Record<string, IssuerTheme> = {
  'SBI Card': {
    gradient: 'from-slate-800 via-slate-700 to-slate-900',
    textClass: 'text-slate-100',
    accentClass: 'bg-amber-400',
  },
  'HDFC Bank': {
    gradient: 'from-red-800 via-red-700 to-red-950',
    textClass: 'text-red-50',
    accentClass: 'bg-amber-300',
  },
  'ICICI Bank': {
    gradient: 'from-orange-600 via-orange-500 to-amber-700',
    textClass: 'text-orange-50',
    accentClass: 'bg-slate-100',
  },
  'Axis Bank': {
    gradient: 'from-rose-950 via-rose-900 to-pink-950',
    textClass: 'text-rose-50',
    accentClass: 'bg-amber-300',
  },
};

const DEFAULT_THEME: IssuerTheme = {
  gradient: 'from-slate-700 via-slate-600 to-slate-800',
  textClass: 'text-slate-100',
  accentClass: 'bg-amber-300',
};

export default function CreditCardVisual({
  card,
  className = '',
}: {
  card: CreditCard;
  className?: string;
}) {
  const theme = ISSUER_THEMES[card.issuer] ?? DEFAULT_THEME;

  return (
    <div
      className={`relative aspect-[1.586/1] w-full max-w-60 overflow-hidden rounded-xl bg-linear-to-br ${theme.gradient} p-4 shadow-md sm:p-5 ${className}`}
      role="img"
      aria-label={`${card.name} card illustration`}
    >
      {/* decorative pattern, generic — not brand artwork */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/5" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className={`text-[11px] font-semibold uppercase tracking-wider ${theme.textClass} opacity-80 sm:text-xs`}>
            {card.issuer}
          </span>
          <div className={`h-6 w-8 rounded-sm ${theme.accentClass} opacity-90 sm:h-7 sm:w-9`}>
            <div className="h-full w-full rounded-sm border border-black/10 bg-linear-to-br from-white/40 to-transparent" />
          </div>
        </div>

        <div>
          <div className={`mb-2 font-mono text-sm tracking-[0.2em] ${theme.textClass} opacity-70 sm:text-base`}>
            •••• •••• •••• ••••
          </div>
          <span className={`block text-sm font-semibold leading-tight ${theme.textClass} sm:text-base`}>
            {card.name}
          </span>
        </div>
      </div>
    </div>
  );
}
