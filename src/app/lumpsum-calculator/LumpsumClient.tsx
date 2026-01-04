'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent } from '@/components/ui/card';

/* ---------- TYPES ---------- */
interface LabelConfig {
  investment: string;
  rate: string;
  time: string;
  frequency: string;
  futureVal: string;
  invested: string;
  wealthGained: string;
}

interface LumpsumClientProps {
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
  investment: 'Investment Amount (₹)',
  rate: 'Expected Return (% p.a)',
  time: 'Time Period (Years)',
  frequency: 'Compounding Frequency',
  futureVal: 'Estimated Future Value',
  invested: 'Invested Amount',
  wealthGained: 'Wealth Gained',
};

export default function LumpsumClient({ labels = {} }: LumpsumClientProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [principal, setPrincipal] = useState(100000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(1);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const r = annualRate / 100 / frequency;
    const n = frequency * years;

    if (principal <= 0 || n <= 0) {
      return {
        futureValue: 0,
        wealthGained: 0,
        principalPct: 0,
        interestPct: 0,
      };
    }

    const futureValue = Math.round(principal * Math.pow(1 + r, n));

    const wealthGained = futureValue - principal;

    const principalPct = Math.round((principal / futureValue) * 100);
    const interestPct = 100 - principalPct;

    return {
      futureValue,
      wealthGained,
      principalPct,
      interestPct,
    };
  }, [principal, annualRate, years, frequency]);

  /* ---------- UI ---------- */
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ---------- INPUTS ---------- */}
          <div className="space-y-6">
            <CalculatorField
              label={t.investment}
              value={principal}
              min={5000}
              max={10000000}
              step={5000}
              onChange={setPrincipal}
            />

            <CalculatorField
              label={t.rate}
              value={annualRate}
              min={1}
              max={30}
              step={0.1}
              onChange={setAnnualRate}
            />

            <CalculatorField
              label={t.time}
              value={years}
              min={1}
              max={40}
              step={1}
              onChange={setYears}
            />

            {/* Compounding Frequency */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                {t.frequency}
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="
                  w-full rounded-md border border-slate-300
                  bg-white px-3 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-lime-500
                "
              >
                <option value={1}>Annually (Standard)</option>
                <option value={2}>Half-Yearly</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
              </select>
            </div>
          </div>

          {/* ---------- VISUALS ---------- */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={calculations.principalPct}
              interestPct={calculations.interestPct}
              size={200}
            />

            <div className="mt-6 text-center">
              <div className="text-sm text-slate-500">{t.futureVal}</div>

              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(calculations.futureValue)}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm text-left">
                <Card className="border-slate-200">
                  <CardContent>
                    <div className="text-xs text-slate-500">{t.invested}</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(principal)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-lime-50">
                  <CardContent>
                    <div className="text-xs text-lime-700">
                      {t.wealthGained}
                    </div>
                    <div className="mt-1 font-semibold text-lime-700">
                      +{formatINR(calculations.wealthGained)}
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
