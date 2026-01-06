'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';

// Helper
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

// Define the shape of the labels object
interface LabelConfig {
  currentAge: string;
  fireAge: string;
  currentAnnualExpense: string;
  currentCorpus: string;
  advancedAssumptions: string;
  inflation: string;
  returnRate: string;
  safeWithdrawalRate: string;
  multiplier: string;
  recommendedSWR: string;
  resetDefaults: string;
  fireNumber: string;
  monthlySavingsNeeded: string;
  perMonth: string;
  futureAnnualExp: string;
  currentCorpusFV: string;
}

interface FIRECalculatorClientProps {
  labels?: LabelConfig;
}

export default function FIRECalculatorClient({
  labels,
}: FIRECalculatorClientProps) {
  // --- STATE ---
  const [currentAge, setCurrentAge] = useState(30);
  const [fireAge, setFireAge] = useState(45);
  const [annualExpense, setAnnualExpense] = useState(1_000_000);
  const [currentCorpus, setCurrentCorpus] = useState(2_000_000);

  const [inflation, setInflation] = useState(6);
  const [returnRate, setReturnRate] = useState(12);
  const [swr, setSwr] = useState(3.5);

  // --- DEFAULT LABELS (English) ---
  const t: LabelConfig = labels || {
    currentAge: 'Current Age',
    fireAge: 'Target FIRE Age',
    currentAnnualExpense: 'Current Annual Expense (₹)',
    currentCorpus: 'Current Savings / Corpus (₹)',
    advancedAssumptions: 'Advanced Assumptions',
    inflation: 'Inflation Rate (%)',
    returnRate: 'Expected Return (%)',
    safeWithdrawalRate: 'Safe Withdrawal Rate (%)',
    multiplier: 'Multiplier',
    recommendedSWR: 'Recommended for India: 3–3.5%',
    resetDefaults: 'Reset Defaults',
    fireNumber: 'Your FIRE Number',
    monthlySavingsNeeded: 'Monthly Savings Needed',
    perMonth: '/mo',
    futureAnnualExp: 'Future Annual Expense',
    currentCorpusFV: 'Current Corpus FV',
  };

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    const yearsToFire = Math.max(1, fireAge - currentAge);
    const months = yearsToFire * 12;

    const futureExpense = Math.round(
      annualExpense * Math.pow(1 + inflation / 100, yearsToFire)
    );

    const multiplierVal = 100 / swr;
    const fireNumber = Math.round(futureExpense * multiplierVal);

    const monthlyRate = returnRate / 12 / 100;
    const futureCorpus = Math.round(
      currentCorpus * Math.pow(1 + monthlyRate, months)
    );

    const gap = Math.max(0, fireNumber - futureCorpus);

    let monthlySIP = 0;
    if (gap > 0) {
      const factor =
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
      monthlySIP = Math.round(gap / factor);
    }

    const achievedPct =
      fireNumber > 0
        ? Math.min(100, Math.round((futureCorpus / fireNumber) * 100))
        : 0;

    return {
      yearsToFire,
      futureExpense,
      fireNumber,
      futureCorpus,
      monthlySIP,
      achievedPct,
      gapPct: 100 - achievedPct,
      multiplier: multiplierVal.toFixed(1),
    };
  }, [
    currentAge,
    fireAge,
    annualExpense,
    currentCorpus,
    inflation,
    returnRate,
    swr,
  ]);

  const reset = () => {
    setCurrentAge(30);
    setFireAge(45);
    setAnnualExpense(1_000_000);
    setCurrentCorpus(2_000_000);
    setInflation(6);
    setReturnRate(12);
    setSwr(3.5);
  };

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* LEFT */}
        <div className="calc-inputs space-y-6">
          <CalculatorField
            label={t.currentAge}
            value={currentAge}
            min={18}
            max={fireAge - 1}
            step={1}
            onChange={setCurrentAge}
          />

          <CalculatorField
            label={t.fireAge}
            value={fireAge}
            min={currentAge + 1}
            max={70}
            step={1}
            onChange={setFireAge}
          />

          <CalculatorField
            label={t.currentAnnualExpense}
            value={annualExpense}
            min={300000}
            max={5000000}
            step={50000}
            onChange={setAnnualExpense}
          />

          <CalculatorField
            label={t.currentCorpus}
            value={currentCorpus}
            min={0}
            max={50000000}
            step={100000}
            onChange={setCurrentCorpus}
          />

          <details className="advanced-options">
            <summary className="cursor-pointer text-sm font-medium text-slate-600">
              {t.advancedAssumptions}
            </summary>

            <div className="mt-4 space-y-4">
              <CalculatorField
                label={t.inflation}
                value={inflation}
                min={3}
                max={10}
                step={0.1}
                onChange={setInflation}
              />

              <CalculatorField
                label={t.returnRate}
                value={returnRate}
                min={6}
                max={15}
                step={0.1}
                onChange={setReturnRate}
              />

              <CalculatorField
                label={t.safeWithdrawalRate}
                value={swr}
                min={2}
                max={6}
                step={0.1}
                onChange={setSwr}
              />

              <p className="text-xs text-slate-500">
                {t.multiplier} ≈ {results.multiplier}× · {t.recommendedSWR}
              </p>
            </div>
          </details>

          <button
            onClick={reset}
            className="text-sm text-slate-500 underline underline-offset-4 hover:text-slate-700"
          >
            {t.resetDefaults}
          </button>
        </div>

        {/* RIGHT */}
        <div className="calc-visuals flex flex-col items-center">
          <EMIPieChart
            principalPct={results.achievedPct}
            interestPct={results.gapPct}
          />

          <div className="mt-6 space-y-4">
            <div className="text-center">
              <p className="text-xs text-slate-500">{t.fireNumber}</p>
              <p className="text-2xl font-bold text-lime-600">
                {formatINR(results.fireNumber)}
              </p>
            </div>

            <div className="rounded-lg border border-lime-200 bg-lime-50 p-4 text-center">
              <p className="text-xs font-semibold text-lime-700">
                {t.monthlySavingsNeeded}
              </p>
              <p className="text-xl font-bold text-lime-700">
                {formatINR(results.monthlySIP)} {t.perMonth}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md border p-3">
                <p className="text-slate-500">{t.futureAnnualExp}</p>
                <p className="font-semibold text-red-600">
                  {formatINR(results.futureExpense)}
                </p>
              </div>

              <div className="rounded-md border p-3">
                <p className="text-slate-500">{t.currentCorpusFV}</p>
                <p className="font-semibold text-emerald-600">
                  {formatINR(results.futureCorpus)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
