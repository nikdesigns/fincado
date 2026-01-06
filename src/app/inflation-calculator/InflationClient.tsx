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

interface InflationLabels {
  currentAmount: string;
  inflationRate: string;
  timePeriod: string;
  futureValueRequired: string;
  todaysValue: string;
  inflationImpact: string;
  disclaimer: string;
}

const DEFAULT_LABELS: InflationLabels = {
  currentAmount: 'Current Amount (₹)',
  inflationRate: 'Inflation Rate (% p.a)',
  timePeriod: 'Time Period (Years)',
  futureValueRequired: 'Future Value Required',
  todaysValue: "Today's Value",
  inflationImpact: 'Inflation Impact',
  disclaimer:
    '*Inflation rates are indicative averages. Actual inflation may vary.',
};

export default function InflationClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<InflationLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const futureValue = amount * Math.pow(1 + rate / 100, years);
    const loss = futureValue - amount;

    const lossPct =
      futureValue > 0 ? Math.round((loss / futureValue) * 100) : 0;

    return {
      futureValue: Math.round(futureValue),
      loss: Math.round(loss),
      principalPct: 100 - lossPct, // purchasing power
      interestPct: lossPct, // inflation erosion
    };
  }, [amount, rate, years]);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* INPUTS */}
        <div className="calc-inputs space-y-6">
          <CalculatorField
            label={t.currentAmount}
            value={amount}
            min={1000}
            max={10000000}
            step={5000}
            onChange={setAmount}
          />

          <CalculatorField
            label={t.inflationRate}
            value={rate}
            min={1}
            max={15}
            step={0.1}
            onChange={setRate}
          />

          <CalculatorField
            label={t.timePeriod}
            value={years}
            min={1}
            max={40}
            step={1}
            onChange={setYears}
          />
        </div>

        {/* VISUALS */}
        <div className="calc-visuals flex flex-col items-center">
          <EMIPieChart
            principalPct={result.principalPct}
            interestPct={result.interestPct}
          />

          <div className="mt-6 space-y-4 text-center">
            <div>
              <div className="text-sm text-slate-500">
                {t.futureValueRequired}
              </div>
              <div className="text-2xl font-extrabold text-lime-600">
                {formatINR(result.futureValue)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="rounded-lg border bg-white p-4">
                <div className="text-xs text-slate-500">{t.todaysValue}</div>
                <div className="font-semibold">{formatINR(amount)}</div>
              </div>

              <div className="rounded-lg border bg-white p-4">
                <div className="text-xs text-slate-500">
                  {t.inflationImpact}
                </div>
                <div className="font-semibold text-red-600">
                  {formatINR(result.loss)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 px-5 text-xs text-slate-500">{t.disclaimer}</p>
    </div>
  );
}
