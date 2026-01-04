'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent } from '@/components/ui/card';

/* ---------- TYPES ---------- */
interface LabelConfig {
  monthlyInv: string;
  rate: string;
  timePeriod: string;
  maturityValue: string;
  invested: string;
  returns: string;
  taxSaved: string;
}

interface ELSSClientProps {
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
  monthlyInv: 'Monthly Investment (₹)',
  rate: 'Expected Return (% p.a)',
  timePeriod: 'Time Period (Years)',
  maturityValue: 'Total Maturity Value',
  invested: 'Total Invested',
  returns: 'Wealth Gain',
  taxSaved: 'Tax Saved (Section 80C)',
};

export default function ELSSClient({ labels = {} }: ELSSClientProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [monthlySIP, setMonthlySIP] = useState(12500);
  const [rate, setRate] = useState(14);
  const [years, setYears] = useState(3);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const months = years * 12;
    const r = rate / 12 / 100;

    let futureValue = 0;
    if (r === 0) futureValue = monthlySIP * months;
    else
      futureValue = monthlySIP * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

    const totalInvested = monthlySIP * months;
    const totalReturns = futureValue - totalInvested;

    // Tax saving logic (₹1.5L limit)
    const annualInvestment = monthlySIP * 12;
    const eligible = Math.min(annualInvestment, 150000);
    const yearlyTaxSaved = Math.round(eligible * 0.312); // 30% + cess
    const totalTaxSaved = yearlyTaxSaved * years;

    const investedPct =
      futureValue > 0 ? Math.round((totalInvested / futureValue) * 100) : 0;

    return {
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      totalReturns: Math.round(totalReturns),
      yearlyTaxSaved,
      totalTaxSaved,
      investedPct,
      returnsPct: 100 - investedPct,
    };
  }, [monthlySIP, rate, years]);

  /* ---------- UI ---------- */
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ---------- INPUTS ---------- */}
          <div className="space-y-6">
            <CalculatorField
              label={t.monthlyInv}
              value={monthlySIP}
              min={500}
              max={50000}
              step={500}
              onChange={setMonthlySIP}
            />

            <CalculatorField
              label={t.rate}
              value={rate}
              min={8}
              max={25}
              step={0.1}
              onChange={setRate}
            />

            <CalculatorField
              label={t.timePeriod}
              value={years}
              min={3}
              max={30}
              step={1}
              onChange={setYears}
            />
            <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              🔒 Minimum lock-in period for ELSS is <strong>3 years</strong>
            </div>
          </div>

          {/* ---------- VISUAL ---------- */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={calculations.investedPct}
              interestPct={calculations.returnsPct}
            />

            <div className="mt-6 text-center">
              <div className="text-sm text-slate-500">{t.maturityValue}</div>

              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(calculations.futureValue)}
              </div>

              {/* TAX SAVED */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm text-emerald-800">
                🎉 Save ~
                <strong>{formatINR(calculations.yearlyTaxSaved)}</strong>
                tax every year
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm text-left">
                <Card className="border-slate-200">
                  <CardContent>
                    <div className="text-xs text-slate-500">{t.invested}</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(calculations.totalInvested)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-emerald-50">
                  <CardContent>
                    <div className="text-xs text-emerald-700">{t.returns}</div>
                    <div className="mt-1 font-semibold text-emerald-700">
                      +{formatINR(calculations.totalReturns)}
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
