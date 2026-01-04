'use client';

import React, { useState, useMemo } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent } from '@/components/ui/card';

/* ---------- TYPES ---------- */
interface LabelConfig {
  monthlyDeposit: string;
  rate: string;
  years: string;
  months: string;
  maturityAmount: string;
  totalInv: string;
  grossInt: string;
  netInt: string;
  taxDeducted: string;
  advancedParams: string;
  taxRate: string;
  ignoreTax: string;
}

interface RDClientProps {
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
  monthlyDeposit: 'Monthly Deposit (₹)',
  rate: 'Interest Rate (% p.a)',
  years: 'Tenure (Years)',
  months: 'Additional Months',
  maturityAmount: 'Maturity Amount',
  totalInv: 'Total Investment',
  grossInt: 'Gross Interest',
  netInt: 'Net Interest',
  taxDeducted: 'Tax Deducted',
  advancedParams: 'Advanced Options (Tax)',
  taxRate: 'Tax Rate (%)',
  ignoreTax: 'Show Gross Interest (Ignore Tax)',
};

export default function RDClient({ labels = {} }: RDClientProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(7.0);
  const [years, setYears] = useState(3);
  const [months, setMonths] = useState(0);
  const [taxRate, setTaxRate] = useState(10);
  const [showGrossOnly, setShowGrossOnly] = useState(false);

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const totalMonths = years * 12 + months;
    const r = rate / 100;
    const n = 4; // Quarterly compounding

    let maturityAmount = 0;

    if (rate === 0) {
      maturityAmount = monthlyDeposit * totalMonths;
    } else {
      for (let i = 0; i < totalMonths; i++) {
        const monthsRemaining = totalMonths - i;
        const t = monthsRemaining / 12;
        maturityAmount += monthlyDeposit * Math.pow(1 + r / n, n * t);
      }
    }

    const totalInvestment = monthlyDeposit * totalMonths;
    const totalInterest = maturityAmount - totalInvestment;

    const tax =
      !showGrossOnly && taxRate > 0 ? (totalInterest * taxRate) / 100 : 0;

    const netInterest = totalInterest - tax;
    const finalMaturity = totalInvestment + netInterest;

    const principalPct =
      finalMaturity > 0
        ? Math.round((totalInvestment / finalMaturity) * 100)
        : 0;

    return {
      maturity: Math.round(finalMaturity),
      investment: Math.round(totalInvestment),
      interest: Math.round(netInterest),
      tax: Math.round(tax),
      principalPct,
      interestPct: 100 - principalPct,
    };
  }, [monthlyDeposit, rate, years, months, taxRate, showGrossOnly]);

  /* ---------- UI ---------- */
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ---------- INPUTS ---------- */}
          <div className="space-y-6">
            <CalculatorField
              label={t.monthlyDeposit}
              value={monthlyDeposit}
              min={500}
              max={200000}
              step={500}
              onChange={setMonthlyDeposit}
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

            {/* Advanced Options */}
            <details className="rounded-md border border-slate-200 p-4">
              <summary className="cursor-pointer text-sm font-medium text-slate-700">
                {t.advancedParams}
              </summary>

              <div className="mt-4 space-y-4">
                <CalculatorField
                  label={t.taxRate}
                  value={taxRate}
                  min={0}
                  max={30}
                  step={1}
                  onChange={setTaxRate}
                />

                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={showGrossOnly}
                    onChange={(e) => setShowGrossOnly(e.target.checked)}
                  />
                  {t.ignoreTax}
                </label>
              </div>
            </details>
          </div>

          {/* ---------- VISUALS ---------- */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={results.principalPct}
              interestPct={results.interestPct}
            />

            <div className="mt-6 text-center">
              <div className="text-sm text-slate-500">{t.maturityAmount}</div>

              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(results.maturity)}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm text-left">
                <Card className="border-slate-200">
                  <CardContent>
                    <div className="text-xs text-slate-500">{t.totalInv}</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(results.investment)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-lime-50">
                  <CardContent>
                    <div className="text-xs text-lime-700">
                      {showGrossOnly ? t.grossInt : t.netInt}
                    </div>
                    <div className="mt-1 font-semibold text-lime-700">
                      +{formatINR(results.interest)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {!showGrossOnly && results.tax > 0 && (
                <div className="mt-4 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
                  {t.taxDeducted}: <strong>-{formatINR(results.tax)}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
