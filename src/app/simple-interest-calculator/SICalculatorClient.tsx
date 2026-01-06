'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';

// ---------------- TYPES ----------------
interface LabelConfig {
  principal: string;
  rate: string;
  time: string;
  maturityVal: string;
  resultPrincipal: string;
  resultInterest: string;
}

interface SIClientProps {
  labels?: Partial<LabelConfig>;
}

// ---------------- HELPERS ----------------
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

// ---------------- DEFAULT LABELS ----------------
const DEFAULT_LABELS: LabelConfig = {
  principal: 'Principal Amount (₹)',
  rate: 'Annual Interest Rate (%)',
  time: 'Time Period (Years)',
  maturityVal: 'Total Maturity Amount',
  resultPrincipal: 'Principal',
  resultInterest: 'Total Interest',
};

// ---------------- COMPONENT ----------------
export default function SICalculatorClient({
  labels = DEFAULT_LABELS,
}: SIClientProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  // ---------------- STATE ----------------
  const [principal, setPrincipal] = useState(50000);
  const [annualRate, setAnnualRate] = useState(8);
  const [timeYears, setTimeYears] = useState(5);

  // ---------------- CALCULATIONS ----------------
  const results = useMemo(() => {
    const interestAmount = Math.round(
      (principal * annualRate * timeYears) / 100
    );
    const maturityAmount = principal + interestAmount;

    const total = Math.max(1, maturityAmount);
    const interestPct = Math.round((interestAmount / total) * 100);
    const principalPct = 100 - interestPct;

    return {
      interestAmount,
      maturityAmount,
      interestPct,
      principalPct,
    };
  }, [principal, annualRate, timeYears]);

  // ---------------- RESET ----------------
  const handleReset = () => {
    setPrincipal(50000);
    setAnnualRate(8);
    setTimeYears(5);
  };

  // ---------------- UI ----------------
  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* -------- INPUTS -------- */}
        <div className="calc-inputs space-y-6">
          <CalculatorField
            label={t.principal}
            value={principal}
            min={1000}
            max={1000000}
            step={1000}
            onChange={setPrincipal}
          />

          <CalculatorField
            label={t.rate}
            value={annualRate}
            min={1}
            max={50}
            step={0.1}
            onChange={setAnnualRate}
          />

          <CalculatorField
            label={t.time}
            value={timeYears}
            min={1}
            max={30}
            step={1}
            onChange={setTimeYears}
          />

          <button
            type="button"
            onClick={handleReset}
            className="mt-2 text-sm text-slate-500 underline hover:text-slate-700"
          >
            Reset Defaults
          </button>
        </div>

        {/* -------- VISUALS -------- */}
        <div className="calc-visuals flex flex-col items-center">
          <EMIPieChart
            principalPct={results.principalPct}
            interestPct={results.interestPct}
          />

          <div className="mt-6 w-full text-center">
            {/* Maturity */}
            <div className="mb-4">
              <span className="text-sm text-slate-500">{t.maturityVal}</span>
              <div className="text-3xl font-extrabold text-lime-600">
                {formatINR(results.maturityAmount)}
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-left text-sm">
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="text-slate-500">{t.resultPrincipal}</div>
                <div className="font-semibold text-slate-900">
                  {formatINR(principal)}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="text-slate-500">{t.resultInterest}</div>
                <div className="font-semibold text-emerald-600">
                  +{formatINR(results.interestAmount)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
