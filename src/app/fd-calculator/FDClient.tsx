'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent } from '@/components/ui/card';
import EMIPieChart from '@/components/EMIPieChart';

/* ---------- TYPES ---------- */
type CompoundingFreq = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';

const FREQUENCY_MAP: Record<CompoundingFreq, number> = {
  monthly: 12,
  quarterly: 4,
  'half-yearly': 2,
  yearly: 1,
};

interface LabelConfig {
  principal: string;
  rate: string;
  years: string;
  months: string;
  freq: string;
  maturity: string;
  totalPrincipal: string;
  interest: string;
}

interface FDClientProps {
  labels?: Partial<LabelConfig>;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------- DEFAULT LABELS ---------- */
const DEFAULT_LABELS: LabelConfig = {
  principal: 'Deposit Amount (₹)',
  rate: 'Interest Rate (% p.a)',
  years: 'Tenure (Years)',
  months: 'Additional Months',
  freq: 'Compounding Frequency',
  maturity: 'Maturity Amount',
  totalPrincipal: 'Principal',
  interest: 'Total Interest',
};

export default function FDClient({ labels = {} }: FDClientProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.0);
  const [years, setYears] = useState(3);
  const [months, setMonths] = useState(0);
  const [frequency, setFrequency] = useState<CompoundingFreq>('quarterly');

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const timeInYears = years + months / 12;
    const n = FREQUENCY_MAP[frequency];
    const r = rate / 100;

    let maturityAmount = principal;
    if (rate > 0) {
      maturityAmount = principal * Math.pow(1 + r / n, n * timeInYears);
    }

    const totalInterest = maturityAmount - principal;
    const principalPct = Math.round((principal / maturityAmount) * 100);
    const interestPct = 100 - principalPct;

    return {
      maturity: Math.round(maturityAmount),
      interest: Math.round(totalInterest),
      principalPct,
      interestPct,
    };
  }, [principal, rate, years, months, frequency]);

  /* ---------- UI ---------- */
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ---------- INPUTS ---------- */}
          <div className="space-y-6">
            <CalculatorField
              label={t.principal}
              value={principal}
              min={5000}
              max={10000000}
              step={5000}
              onChange={setPrincipal}
            />

            <CalculatorField
              label={t.rate}
              value={rate}
              min={2}
              max={15}
              step={0.1}
              onChange={setRate}
            />

            <CalculatorField
              label={t.years}
              value={years}
              min={0}
              max={30}
              step={1}
              onChange={setYears}
            />

            <CalculatorField
              label={t.months}
              value={months}
              min={0}
              max={11}
              step={1}
              onChange={setMonths}
            />

            {/* Compounding Frequency */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                {t.freq}
              </label>
              <select
                value={frequency}
                onChange={(e) =>
                  setFrequency(e.target.value as CompoundingFreq)
                }
                className="
                  w-full rounded-md border border-slate-300
                  bg-white px-3 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-lime-500
                "
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half-yearly">Half-Yearly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* ---------- VISUALS ---------- */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={results.principalPct}
              interestPct={results.interestPct}
            />

            <div className="mt-6 text-center">
              <div className="text-sm text-slate-500">{t.maturity}</div>

              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(results.maturity)}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm text-left">
                <Card className="border-slate-200">
                  <CardContent>
                    <div className="text-xs text-slate-500">
                      {t.totalPrincipal}
                    </div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(principal)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-lime-50">
                  <CardContent>
                    <div className="text-xs text-lime-700">{t.interest}</div>
                    <div className="mt-1 font-semibold text-lime-700">
                      +{formatINR(results.interest)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
