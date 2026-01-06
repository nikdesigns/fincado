'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ------------------ Helpers ------------------
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

// ------------------ Labels ------------------
interface CompoundLabels {
  principal: string;
  rate: string;
  timePeriod: string;
  frequency: string;
  resetDefaults: string;
  totalAmount: string;
  investedAmount: string;
  interestEarned: string;
  yearly: string;
  halfYearly: string;
  quarterly: string;
  monthly: string;
}

const DEFAULT_LABELS: CompoundLabels = {
  principal: 'Principal Amount (₹)',
  rate: 'Annual Interest Rate (%)',
  timePeriod: 'Time Period (Years)',
  frequency: 'Compounding Frequency',
  resetDefaults: 'Reset Defaults',
  totalAmount: 'Maturity Amount',
  investedAmount: 'Invested Amount',
  interestEarned: 'Total Interest Earned',
  yearly: 'Yearly',
  halfYearly: 'Half-Yearly',
  quarterly: 'Quarterly',
  monthly: 'Monthly',
};

// ------------------ Component ------------------
export default function CompoundInterestClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<CompoundLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  // ------------------ State ------------------
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(1); // 1Y, 2HY, 4Q, 12M

  // ------------------ Calculations ------------------
  const results = useMemo(() => {
    const r = rate / 100;
    const n = frequency;
    const tYears = years;

    const maturity = principal * Math.pow(1 + r / n, n * tYears);

    const interest = maturity - principal;

    const interestPct =
      maturity > 0 ? Math.round((interest / maturity) * 100) : 0;

    return {
      maturity: Math.round(maturity),
      interest: Math.round(interest),
      principalPct: 100 - interestPct,
      interestPct,
    };
  }, [principal, rate, years, frequency]);

  // ------------------ Reset ------------------
  const handleReset = () => {
    setPrincipal(100000);
    setRate(10);
    setYears(10);
    setFrequency(1);
  };

  // ------------------ UI ------------------
  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* ---------------- LEFT: INPUTS ---------------- */}
        <div className="calc-inputs">
          <CalculatorField
            label={t.principal}
            value={principal}
            min={1000}
            max={10000000}
            step={1000}
            onChange={setPrincipal}
          />

          <CalculatorField
            label={t.rate}
            value={rate}
            min={1}
            max={30}
            step={0.1}
            onChange={setRate}
          />

          <CalculatorField
            label={t.timePeriod}
            value={years}
            min={1}
            max={50}
            step={1}
            onChange={setYears}
          />

          {/* Compounding Frequency */}
          <div className="field mt-4">
            <label className="field-label text-sm text-slate-700 font-medium mb-1 block">
              {t.frequency}
            </label>

            <Select
              value={String(frequency)}
              onValueChange={(v) => setFrequency(Number(v))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t.yearly}</SelectItem>
                <SelectItem value="2">{t.halfYearly}</SelectItem>
                <SelectItem value="4">{t.quarterly}</SelectItem>
                <SelectItem value="12">{t.monthly}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="reset-link mt-12 text-slate-500 font-normal"
          >
            {t.resetDefaults}
          </button>
        </div>

        {/* ---------------- RIGHT: RESULTS ---------------- */}
        <div className="calc-visuals flex flex-col items-center">
          <EMIPieChart
            principalPct={results.principalPct}
            interestPct={results.interestPct}
            size={200}
          />

          <div className="mt-6 w-full">
            {/* Maturity */}
            <div className="text-center mb-4">
              <span className="text-sm text-slate-500">{t.totalAmount}</span>
              <div className="text-3xl font-extrabold text-lime-600">
                {formatINR(results.maturity)}
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border bg-white p-3">
                <div className="text-slate-500">{t.investedAmount}</div>
                <div className="font-semibold">{formatINR(principal)}</div>
              </div>

              <div className="rounded-lg border bg-white p-3 ">
                <div className="text-slate-500">{t.interestEarned}</div>
                <div className="font-semibold text-emerald-600 ">
                  +{formatINR(results.interest)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
