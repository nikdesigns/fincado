'use client';

import { useMemo, useState } from 'react';
import {
  Calendar,
  Calculator,
  IndianRupee,
  Info,
  Percent,
  Sparkles,
  TrendingDown,
  Trophy,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getLatestHomeRate } from '@/data/live-rates';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

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

const MIN_AMOUNT = 10000;
const MAX_AMOUNT = 50000000;
const MIN_RATE = 0;
const MAX_RATE = 40;
const MIN_TENURE = 1;
const MAX_TENURE = 40;

const PRESETS: Record<'home' | 'car' | 'personal', LoanState> = {
  home: { amount: 5000000, rate: getLatestHomeRate('sbi', 8.5), tenure: 20 },
  car: { amount: 1000000, rate: 9.5, tenure: 7 },
  personal: { amount: 500000, rate: 12.0, tenure: 5 },
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

export default function LoanComparison() {
  const currentDate = getCurrentMonthYearLabel();

  const [loanA, setLoanA] = useState<LoanState>({
    amount: 5000000,
    rate: getLatestHomeRate('sbi', 8.5),
    tenure: 20,
  });

  const [loanB, setLoanB] = useState<LoanState>({
    amount: 5000000,
    rate: getLatestHomeRate('hdfc', 8.7),
    tenure: 20,
  });

  const resultsA = useMemo(() => calculateLoan(loanA), [loanA]);
  const resultsB = useMemo(() => calculateLoan(loanB), [loanB]);

  const isTie = Math.abs(resultsA.totalPayment - resultsB.totalPayment) < 1;
  const isAEconomical = resultsA.totalPayment < resultsB.totalPayment;

  const winnerName = isTie
    ? 'Both are equal'
    : isAEconomical
      ? 'Loan A'
      : 'Loan B';
  const loserName = isAEconomical ? 'Loan B' : 'Loan A';

  const difference = Math.abs(resultsA.totalPayment - resultsB.totalPayment);
  const interestDiff = Math.abs(
    resultsA.totalInterest - resultsB.totalInterest,
  );
  const monthlyDiff = Math.abs(resultsA.emi - resultsB.emi);

  const basePayment = isAEconomical
    ? resultsB.totalPayment
    : resultsA.totalPayment;
  const savingsPercent =
    basePayment > 0 ? ((difference / basePayment) * 100).toFixed(2) : '0.00';

  const handleChange = (
    loan: 'A' | 'B',
    field: keyof LoanState,
    value: string,
  ) => {
    const parsed = toFiniteNumber(value);
    const previous = loan === 'A' ? loanA : loanB;

    const next: LoanState = {
      ...previous,
      [field]: parsed ?? previous[field],
    };

    if (loan === 'A') setLoanA(next);
    else setLoanB(next);
  };

  const applyPreset = (preset: 'home' | 'car' | 'personal') => {
    const selected = PRESETS[preset];
    setLoanA(selected);
    setLoanB({
      ...selected,
      rate: clamp(selected.rate + 0.5, MIN_RATE, MAX_RATE),
    });
  };

  const resetComparison = () => {
    setLoanA({
      amount: 5000000,
      rate: getLatestHomeRate('sbi', 8.5),
      tenure: 20,
    });
    setLoanB({
      amount: 5000000,
      rate: getLatestHomeRate('hdfc', 8.7),
      tenure: 20,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Preset Buttons + Updated Date */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => applyPreset('home')}
          className="border-[#DFF7C6] text-xs hover:border-[#D0F4A9] hover:bg-[#F7FDF1]"
        >
          <Sparkles className="mr-1.5 h-3 w-3" />
          Home Loan
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => applyPreset('car')}
          className="border-[#DFF7C6] text-xs hover:border-[#D0F4A9] hover:bg-[#F7FDF1]"
        >
          <Sparkles className="mr-1.5 h-3 w-3" />
          Car Loan
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => applyPreset('personal')}
          className="border-[#DFF7C6] text-xs hover:border-[#D0F4A9] hover:bg-[#F7FDF1]"
        >
          <Sparkles className="mr-1.5 h-3 w-3" />
          Personal Loan
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetComparison}
          className="text-xs"
        >
          Reset
        </Button>

        {/* Dynamic Updated Date */}
        <div className="ml-auto flex items-center gap-1 text-xs text-slate-500">
          <span className="font-medium">Updated</span>
          <span className="font-semibold text-[#577A30]">{currentDate}</span>
        </div>
      </div>

      {/* Two Column Comparison */}
      <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-xl border border-slate-200 shadow-md lg:grid-cols-2">
        {/* Loan A */}
        <div className="border-slate-200 bg-linear-to-br from-[#F7FDF1]/50 to-white p-6 lg:border-r">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#F7FDF1] to-[#577A30] text-sm font-semibold text-white shadow-md">
                A
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Loan Option A</h3>
                <p className="text-xs text-slate-500">
                  Enter first loan details
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="loan-a-amount"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-600 uppercase"
              >
                <IndianRupee className="h-3 w-3" />
                Loan Amount
              </Label>
              <div className="relative">
                <span className="absolute top-2.5 left-3 text-sm font-medium text-slate-500">
                  ₹
                </span>
                <Input
                  id="loan-a-amount"
                  type="number"
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  step="10000"
                  value={loanA.amount}
                  onChange={(e) => handleChange('A', 'amount', e.target.value)}
                  className="pl-8 text-base font-semibold focus:border-[#C0F08D] focus:ring-1 focus:ring-[#C0F08D]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="loan-a-rate"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-600 uppercase"
              >
                <Percent className="h-3 w-3" />
                Interest Rate (p.a.)
              </Label>
              <div className="relative">
                <Input
                  id="loan-a-rate"
                  type="number"
                  min={MIN_RATE}
                  max={MAX_RATE}
                  step="0.05"
                  value={loanA.rate}
                  onChange={(e) => handleChange('A', 'rate', e.target.value)}
                  className="text-base font-semibold focus:border-[#C0F08D] focus:ring-1 focus:ring-[#C0F08D]"
                />
                <span className="absolute top-2.5 right-3 text-sm font-medium text-slate-500">
                  %
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="loan-a-tenure"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-600 uppercase"
              >
                <Calendar className="h-3 w-3" />
                Loan Tenure
              </Label>
              <div className="relative">
                <Input
                  id="loan-a-tenure"
                  type="number"
                  min={MIN_TENURE}
                  max={MAX_TENURE}
                  step="1"
                  value={loanA.tenure}
                  onChange={(e) => handleChange('A', 'tenure', e.target.value)}
                  className="text-base font-semibold focus:border-[#C0F08D] focus:ring-1 focus:ring-[#C0F08D]"
                />
                <span className="absolute top-2.5 right-3 text-sm font-medium text-slate-500">
                  Years
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loan B */}
        <div className="bg-linear-to-br from-[#F7FDF1]/50 to-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#F7FDF1] to-[#92C65B] text-sm font-semibold text-white shadow-md">
                B
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Loan Option B</h3>
                <p className="text-xs text-slate-500">
                  Enter second loan details
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="loan-b-amount"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-600 uppercase"
              >
                <IndianRupee className="h-3 w-3" />
                Loan Amount
              </Label>
              <div className="relative">
                <span className="absolute top-2.5 left-3 text-sm font-medium text-slate-500">
                  ₹
                </span>
                <Input
                  id="loan-b-amount"
                  type="number"
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  step="10000"
                  value={loanB.amount}
                  onChange={(e) => handleChange('B', 'amount', e.target.value)}
                  className="pl-8 text-base font-semibold focus:border-[#C0F08D] focus:ring-1 focus:ring-[#C0F08D]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="loan-b-rate"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-600 uppercase"
              >
                <Percent className="h-3 w-3" />
                Interest Rate (p.a.)
              </Label>
              <div className="relative">
                <Input
                  id="loan-b-rate"
                  type="number"
                  min={MIN_RATE}
                  max={MAX_RATE}
                  step="0.05"
                  value={loanB.rate}
                  onChange={(e) => handleChange('B', 'rate', e.target.value)}
                  className="text-base font-semibold focus:border-[#C0F08D] focus:ring-1 focus:ring-[#C0F08D]"
                />
                <span className="absolute top-2.5 right-3 text-sm font-medium text-slate-500">
                  %
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="loan-b-tenure"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-600 uppercase"
              >
                <Calendar className="h-3 w-3" />
                Loan Tenure
              </Label>
              <div className="relative">
                <Input
                  id="loan-b-tenure"
                  type="number"
                  min={MIN_TENURE}
                  max={MAX_TENURE}
                  step="1"
                  value={loanB.tenure}
                  onChange={(e) => handleChange('B', 'tenure', e.target.value)}
                  className="text-base font-semibold focus:border-[#C0F08D] focus:ring-1 focus:ring-[#C0F08D]"
                />
                <span className="absolute top-2.5 right-3 text-sm font-medium text-slate-500">
                  Years
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Winner / Savings Card */}
      <div className="relative overflow-hidden rounded-xl border-2 border-[#DFF7C6] bg-linear-to-br from-[#F7FDF1] via-teal-50 to-cyan-50/30 p-6 shadow-md">
        <div className="absolute -top-8 -right-8 opacity-5">
          <Trophy className="h-48 w-48 text-[#577A30]" />
        </div>

        <div className="relative z-10 flex flex-col items-start gap-4 lg:flex-row lg:items-center">
          <div className="shrink-0 rounded-xl bg-linear-to-br from-[#F7FDF1] to-[#B0EC70] p-3 text-[#74A046] shadow-lg">
            <Trophy className="h-7 w-7" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-xl font-semibold text-[#1B2E06]">
                {isTie ? "It's a tie!" : `${winnerName} is the winner!`}
              </h4>
              {!isTie && (
                <Badge className="bg-[#577A30] text-xs text-white">
                  Save {savingsPercent}%
                </Badge>
              )}
            </div>

            {isTie ? (
              <p className="text-sm leading-relaxed text-[#577A30]">
                Both options result in nearly the same total payment. Compare
                non-rate factors like fees, service quality, and prepayment
                flexibility before choosing.
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-[#577A30]">
                By choosing{' '}
                <strong className="text-[#1B2E06]">{winnerName}</strong> over{' '}
                {loserName}, you save{' '}
                <span className="mx-1 text-lg font-semibold text-[#577A30]">
                  {formatINR(interestDiff)}
                </span>
                in total interest over{' '}
                {isAEconomical ? loanA.tenure : loanB.tenure} years.
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-lg border border-[#EFFBE2] bg-white/80 p-3">
                <div className="mb-1 flex items-center gap-1.5">
                  <TrendingDown className="h-3.5 w-3.5 text-[#577A30]" />
                  <span className="text-xs font-medium text-slate-600">
                    Monthly Savings
                  </span>
                </div>
                <p className="text-base font-semibold text-[#577A30]">
                  {formatINR(monthlyDiff)}
                </p>
              </div>

              <div className="rounded-lg border border-[#EFFBE2] bg-white/80 p-3">
                <div className="mb-1 flex items-center gap-1.5">
                  <Calculator className="h-3.5 w-3.5 text-[#577A30]" />
                  <span className="text-xs font-medium text-slate-600">
                    Total Savings
                  </span>
                </div>
                <p className="text-base font-semibold text-[#577A30]">
                  {formatINR(difference)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="flex items-start gap-3 rounded-lg border border-[#DFF7C6] bg-[#F7FDF1] p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#577A30]" />
        <div>
          <h5 className="mb-1 text-sm font-semibold text-[#1B2E06]">
            💡 Pro Tip
          </h5>
          <p className="text-sm leading-relaxed text-[#577A30]">
            A 0.5% rate difference can translate to major long-term savings.
            Always compare total repayment, not just EMI, and review fees and
            reset terms before finalizing a lender.
          </p>
        </div>
      </div>
    </div>
  );
}
