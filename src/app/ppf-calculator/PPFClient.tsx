'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent } from '@/components/ui/card';

/* ---------- TYPES ---------- */
interface LabelConfig {
  modeLabel: string;
  monthlyInv: string;
  annualInv: string;
  rate: string;
  duration: string;
  maturity: string;
  totalInv: string;
  totalInt: string;
}

interface PPFClientProps {
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
  modeLabel: 'Contribution Mode',
  monthlyInv: 'Monthly Investment (₹)',
  annualInv: 'Annual Investment (₹)',
  rate: 'Interest Rate (% p.a)',
  duration: 'Duration (Years)',
  maturity: 'Maturity Value (Tax Free)',
  totalInv: 'Total Investment',
  totalInt: 'Total Interest',
};

export default function PPFClient({ labels = {} }: PPFClientProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [mode, setMode] = useState<'monthly' | 'annual'>('monthly');
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [annualContribution, setAnnualContribution] = useState(12000);
  const [years, setYears] = useState(15);
  const [annualRate, setAnnualRate] = useState(7.1);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;
    const yearlyRate = annualRate / 100;

    let maturity = 0;
    let invested = 0;

    if (mode === 'monthly') {
      invested = monthlyContribution * months;
      if (monthlyRate === 0) {
        maturity = invested;
      } else {
        maturity =
          monthlyContribution *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);
      }
    } else {
      invested = annualContribution * years;
      if (yearlyRate === 0) {
        maturity = invested;
      } else {
        maturity =
          annualContribution *
          ((Math.pow(1 + yearlyRate, years) - 1) / yearlyRate) *
          (1 + yearlyRate);
      }
    }

    const interest = Math.max(0, maturity - invested);
    const principalPct =
      maturity > 0 ? Math.round((invested / maturity) * 100) : 0;

    return {
      maturity: Math.round(maturity),
      invested: Math.round(invested),
      interest: Math.round(interest),
      principalPct,
      interestPct: 100 - principalPct,
    };
  }, [mode, monthlyContribution, annualContribution, years, annualRate]);

  /* ---------- UI ---------- */
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ---------- INPUTS ---------- */}
          <div className="space-y-6">
            {/* Contribution Mode */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                {t.modeLabel}
              </label>
              <select
                value={mode}
                onChange={(e) =>
                  setMode(e.target.value as 'monthly' | 'annual')
                }
                className="
                  w-full rounded-md border border-slate-300
                  bg-white px-3 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-lime-500
                "
              >
                <option value="monthly">Monthly</option>
                <option value="annual">Annual (Lump Sum)</option>
              </select>
            </div>

            {/* Investment Amount */}
            <CalculatorField
              label={mode === 'monthly' ? t.monthlyInv : t.annualInv}
              value={
                mode === 'monthly' ? monthlyContribution : annualContribution
              }
              min={500}
              max={mode === 'monthly' ? 12500 : 150000}
              step={mode === 'monthly' ? 500 : 1000}
              onChange={
                mode === 'monthly'
                  ? setMonthlyContribution
                  : setAnnualContribution
              }
            />

            {/* Interest Rate */}
            <CalculatorField
              label={t.rate}
              value={annualRate}
              min={4}
              max={12}
              step={0.1}
              onChange={setAnnualRate}
            />

            {/* Duration */}
            <CalculatorField
              label={t.duration}
              value={years}
              min={15}
              max={50}
              step={5}
              onChange={setYears}
            />
          </div>

          {/* ---------- VISUALS ---------- */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={calculations.principalPct}
              interestPct={calculations.interestPct}
            />

            <div className="mt-6 text-center">
              <div className="text-sm text-slate-500">{t.maturity}</div>

              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(calculations.maturity)}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm text-left">
                <Card className="border-slate-200">
                  <CardContent>
                    <div className="text-xs text-slate-500">{t.totalInv}</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(calculations.invested)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-lime-50">
                  <CardContent>
                    <div className="text-xs text-lime-700">{t.totalInt}</div>
                    <div className="mt-1 font-semibold text-lime-700">
                      +{formatINR(calculations.interest)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                🔒 PPF has a mandatory 15-year lock-in. Returns are completely
                tax-free.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
