'use client';

import { useMemo, useState } from 'react';
import {
  Calendar,
  Car,
  CheckCircle2,
  Home,
  IndianRupee,
  Percent,
  RotateCcw,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getLatestHomeRate } from '@/data/live-rates';

interface LoanState {
  amount: number;
  rate: number;
  tenure: number;
}

interface LoanResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

type LoanKey = 'A' | 'B';
type PresetKey = 'home' | 'car' | 'personal';

const MIN_AMOUNT = 10000;
const MAX_AMOUNT = 50000000;
const MIN_RATE = 0;
const MAX_RATE = 40;
const MIN_TENURE = 1;
const MAX_TENURE = 40;

const PRESETS: Record<PresetKey, LoanState> = {
  home: { amount: 5000000, rate: getLatestHomeRate('sbi', 8.5), tenure: 20 },
  car: { amount: 1000000, rate: 9.5, tenure: 7 },
  personal: { amount: 500000, rate: 12.0, tenure: 5 },
};

const PRESET_BUTTONS: { key: PresetKey; label: string; icon: LucideIcon }[] = [
  { key: 'home', label: 'Home loan', icon: Home },
  { key: 'car', label: 'Car loan', icon: Car },
  { key: 'personal', label: 'Personal loan', icon: Wallet },
];

const DEFAULT_A: LoanState = {
  amount: 5000000,
  rate: getLatestHomeRate('sbi', 8.5),
  tenure: 20,
};

const DEFAULT_B: LoanState = {
  amount: 5000000,
  rate: getLatestHomeRate('hdfc', 8.7),
  tenure: 20,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toFiniteNumber(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatINR(value: number): string {
  if (!Number.isFinite(value)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function calculateLoan(input: LoanState): LoanResult {
  const amount = clamp(input.amount, MIN_AMOUNT, MAX_AMOUNT);
  const rate = clamp(input.rate, MIN_RATE, MAX_RATE);
  const tenure = clamp(input.tenure, MIN_TENURE, MAX_TENURE);

  const months = tenure * 12;
  if (months <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };

  if (rate === 0) {
    const emi = amount / months;
    return { emi, totalInterest: 0, totalPayment: amount };
  }

  const monthlyRate = rate / (12 * 100);
  const growth = Math.pow(1 + monthlyRate, months);
  const denominator = growth - 1;

  if (!Number.isFinite(growth) || denominator <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: 0 };
  }

  const emi = (amount * monthlyRate * growth) / denominator;
  const totalPayment = emi * months;
  const totalInterest = totalPayment - amount;

  return { emi, totalInterest, totalPayment };
}

const FIELD_LABEL =
  'flex items-center gap-1.5 text-xs font-medium text-slate-500';
const FIELD_INPUT =
  'h-11 rounded-lg border-slate-200 bg-white text-base font-semibold text-slate-900 focus-visible:border-brand-500 focus-visible:ring-brand-400/40';

export default function LoanComparison() {
  const [loanA, setLoanA] = useState<LoanState>(DEFAULT_A);
  const [loanB, setLoanB] = useState<LoanState>(DEFAULT_B);
  const [activePreset, setActivePreset] = useState<PresetKey | null>('home');

  const resultsA = useMemo(() => calculateLoan(loanA), [loanA]);
  const resultsB = useMemo(() => calculateLoan(loanB), [loanB]);

  const isTie = Math.abs(resultsA.totalPayment - resultsB.totalPayment) < 1;
  const winner: LoanKey | null = isTie
    ? null
    : resultsA.totalPayment < resultsB.totalPayment
      ? 'A'
      : 'B';
  const loser: LoanKey | null = winner ? (winner === 'A' ? 'B' : 'A') : null;

  const difference = Math.abs(resultsA.totalPayment - resultsB.totalPayment);
  const interestDiff = Math.abs(
    resultsA.totalInterest - resultsB.totalInterest,
  );
  const monthlyDiff = Math.abs(resultsA.emi - resultsB.emi);
  const lowerEmi: LoanKey | null =
    monthlyDiff < 1 ? null : resultsA.emi < resultsB.emi ? 'A' : 'B';

  const maxTotal = Math.max(resultsA.totalPayment, resultsB.totalPayment, 1);
  const higherPayment = Math.max(resultsA.totalPayment, resultsB.totalPayment);
  const savingsPercent =
    higherPayment > 0 ? ((difference / higherPayment) * 100).toFixed(1) : '0.0';

  const handleChange = (
    loan: LoanKey,
    field: keyof LoanState,
    value: string,
  ) => {
    const parsed = toFiniteNumber(value);
    const previous = loan === 'A' ? loanA : loanB;
    const next: LoanState = { ...previous, [field]: parsed ?? previous[field] };

    setActivePreset(null);
    if (loan === 'A') setLoanA(next);
    else setLoanB(next);
  };

  const applyPreset = (preset: PresetKey) => {
    const selected = PRESETS[preset];
    setActivePreset(preset);
    setLoanA(selected);
    setLoanB({
      ...selected,
      rate: clamp(selected.rate + 0.5, MIN_RATE, MAX_RATE),
    });
  };

  const resetComparison = () => {
    setActivePreset('home');
    setLoanA(DEFAULT_A);
    setLoanB(DEFAULT_B);
  };

  const loans: {
    key: LoanKey;
    state: LoanState;
    results: LoanResult;
  }[] = [
    { key: 'A', state: loanA, results: resultsA },
    { key: 'B', state: loanB, results: resultsB },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-slate-500">
          Start with
        </span>
        {PRESET_BUTTONS.map((preset) => {
          const isActive = activePreset === preset.key;
          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => applyPreset(preset.key)}
              aria-pressed={isActive}
              className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-colors ${
                isActive
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-900'
              }`}
            >
              <preset.icon className="h-4 w-4" />
              {preset.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={resetComparison}
          className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {/* Two loans side by side: inputs + results */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {loans.map(({ key, state, results }) => {
          const isWinner = winner === key;
          const id = `loan-${key.toLowerCase()}`;
          return (
            <div
              key={key}
              className={`flex flex-col rounded-2xl border bg-white p-5 transition-colors sm:p-6 ${
                isWinner
                  ? 'border-brand-500 ring-4 ring-brand-100'
                  : 'border-slate-200'
              }`}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-brand-400">
                    {key}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900">
                    Loan {key}
                  </h3>
                </div>
                {isWinner && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-400 px-2.5 py-1 text-[11px] font-semibold text-slate-900">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Costs less
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="space-y-1.5 sm:col-span-3 lg:col-span-1 xl:col-span-3">
                  <Label htmlFor={`${id}-amount`} className={FIELD_LABEL}>
                    <IndianRupee className="h-3.5 w-3.5" />
                    Loan amount
                  </Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium text-slate-400">
                      ₹
                    </span>
                    <Input
                      id={`${id}-amount`}
                      type="number"
                      inputMode="numeric"
                      min={MIN_AMOUNT}
                      max={MAX_AMOUNT}
                      step="10000"
                      value={state.amount}
                      onChange={(e) =>
                        handleChange(key, 'amount', e.target.value)
                      }
                      className={`${FIELD_INPUT} pl-8`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  <Label htmlFor={`${id}-rate`} className={FIELD_LABEL}>
                    <Percent className="h-3.5 w-3.5" />
                    Interest rate (p.a.)
                  </Label>
                  <div className="relative">
                    <Input
                      id={`${id}-rate`}
                      type="number"
                      inputMode="decimal"
                      min={MIN_RATE}
                      max={MAX_RATE}
                      step="0.05"
                      value={state.rate}
                      onChange={(e) =>
                        handleChange(key, 'rate', e.target.value)
                      }
                      className={`${FIELD_INPUT} pr-9`}
                    />
                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium text-slate-400">
                      %
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor={`${id}-tenure`} className={FIELD_LABEL}>
                    <Calendar className="h-3.5 w-3.5" />
                    Tenure
                  </Label>
                  <div className="relative">
                    <Input
                      id={`${id}-tenure`}
                      type="number"
                      inputMode="numeric"
                      min={MIN_TENURE}
                      max={MAX_TENURE}
                      step="1"
                      value={state.tenure}
                      onChange={(e) =>
                        handleChange(key, 'tenure', e.target.value)
                      }
                      className={`${FIELD_INPUT} pr-11`}
                    />
                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium text-slate-400">
                      yrs
                    </span>
                  </div>
                </div>
              </div>

              {/* This loan's numbers */}
              <dl className="mt-6 border-t border-slate-100 pt-5">
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Monthly EMI
                </dt>
                <dd className="mt-1 text-3xl font-bold leading-none tracking-tight text-slate-900 tabular-nums">
                  {formatINR(results.emi)}
                </dd>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                    <dt className="text-xs text-slate-500">Total interest</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-slate-900 tabular-nums">
                      {formatINR(results.totalInterest)}
                    </dd>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                    <dt className="text-xs text-slate-500">Total repayment</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-slate-900 tabular-nums">
                      {formatINR(results.totalPayment)}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          );
        })}
      </div>

      {/* Verdict */}
      <div
        className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 sm:p-8"
        aria-live="polite"
      >
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-400/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
              The verdict
            </p>
            <h4 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
              {isTie ? (
                'Both loans cost the same overall'
              ) : (
                <>
                  Loan {winner} costs{' '}
                  <span className="text-brand-400 tabular-nums">
                    {formatINR(difference)}
                  </span>{' '}
                  less
                </>
              )}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {isTie
                ? 'Total repayment is effectively identical. Decide on fees, prepayment terms and service instead.'
                : `That is ${savingsPercent}% less than Loan ${loser} over the full tenure, before any processing fees or other charges.`}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <dt className="text-xs text-slate-400">Interest saved</dt>
                <dd className="mt-1 text-lg font-bold text-white tabular-nums">
                  {formatINR(interestDiff)}
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <dt className="text-xs text-slate-400">
                  {lowerEmi ? `Loan ${lowerEmi} EMI is lower by` : 'EMI difference'}
                </dt>
                <dd className="mt-1 text-lg font-bold text-white tabular-nums">
                  {formatINR(monthlyDiff)}
                  <span className="ml-1 text-xs font-medium text-slate-400">
                    / month
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Total repayment bars: principal + interest */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total repayment
            </p>
            <div className="space-y-5">
              {loans.map(({ key, state, results }) => {
                const principal = clamp(state.amount, MIN_AMOUNT, MAX_AMOUNT);
                const principalPct = (principal / maxTotal) * 100;
                const interestPct = (results.totalInterest / maxTotal) * 100;
                return (
                  <div key={key}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-sm font-semibold text-white">
                        Loan {key}
                      </span>
                      <span className="text-sm font-semibold text-white tabular-nums">
                        {formatINR(results.totalPayment)}
                      </span>
                    </div>
                    <div
                      className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-white/10"
                      role="img"
                      aria-label={`Loan ${key}: principal ${formatINR(principal)}, interest ${formatINR(results.totalInterest)}`}
                    >
                      <div
                        className="h-full rounded-l-full bg-slate-400 transition-all duration-300"
                        style={{ width: `${principalPct}%` }}
                      />
                      <div
                        className="h-full rounded-r-full bg-brand-400 transition-all duration-300"
                        style={{ width: `${interestPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-5 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                Principal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-400" />
                Interest
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
