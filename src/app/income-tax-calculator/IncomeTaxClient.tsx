'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* ---------------- TYPES ---------------- */

type AssessmentYear = '2025-2026' | '2024-2025';
type AgeGroup = '0-60' | '60-80' | '80+';

interface LabelConfig {
  ayLabel: string;
  ageLabel: string;
  incomeLabel: string;
  deductionsLabel: string;
  deductionHint: string;
  recommendationLabel: string;
  saveLabel: string;
  oldRegimeLabel: string;
  newRegimeLabel: string;
  netIncomeLabel: string;
  ageOptions: {
    regular: string;
    senior: string;
    superSenior: string;
  };
}

interface IncomeTaxClientProps {
  labels?: LabelConfig;
}

/* ---------------- HELPERS ---------------- */

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------------- COMPONENT ---------------- */

export default function IncomeTaxClient({ labels }: IncomeTaxClientProps) {
  const t = {
    ayLabel: 'Assessment Year',
    ageLabel: 'Age Category',
    incomeLabel: 'Gross Annual Income (₹)',
    deductionsLabel: 'Total Deductions (80C, 80D etc.)',
    deductionHint: '*Deductions apply only in Old Regime',
    recommendationLabel: 'RECOMMENDED',
    saveLabel: 'Save',
    oldRegimeLabel: 'Old Regime Tax',
    newRegimeLabel: 'New Regime Tax',
    netIncomeLabel: 'Net In-Hand Income',
    ageOptions: {
      regular: 'Below 60',
      senior: '60 – 80',
      superSenior: '80+',
    },
    ...labels,
  };

  /* ---------------- STATE ---------------- */

  const [ay, setAy] = useState<AssessmentYear>('2025-2026');
  const [age, setAge] = useState<AgeGroup>('0-60');
  const [income, setIncome] = useState<number>(1200000);
  const [deductions, setDeductions] = useState<number>(150000);

  /* ---------------- CALCULATIONS ---------------- */

  const calc = useMemo(() => {
    const stdOld = 50000;
    const stdNew = ay === '2025-2026' ? 75000 : 50000;

    /* OLD REGIME */
    const slab1 = age === '60-80' ? 300000 : age === '80+' ? 500000 : 250000;
    const slab2 = 500000;
    const slab3 = 1000000;

    let taxOld = 0;
    const taxableOld = Math.max(0, income - stdOld - deductions);

    if (taxableOld > slab1) {
      taxOld += Math.min(taxableOld - slab1, slab2 - slab1) * 0.05;
      taxOld += Math.min(Math.max(taxableOld - slab2, 0), slab3 - slab2) * 0.2;
      taxOld += Math.max(taxableOld - slab3, 0) * 0.3;
    }

    if (taxableOld <= 500000) taxOld = 0;

    /* NEW REGIME */
    const taxableNew = Math.max(0, income - stdNew);
    let taxNew = 0;

    const slabs =
      ay === '2025-2026'
        ? [
            [300000, 700000, 0.05],
            [700000, 1000000, 0.1],
            [1000000, 1200000, 0.15],
            [1200000, 1500000, 0.2],
            [1500000, Infinity, 0.3],
          ]
        : [
            [300000, 600000, 0.05],
            [600000, 900000, 0.1],
            [900000, 1200000, 0.15],
            [1200000, 1500000, 0.2],
            [1500000, Infinity, 0.3],
          ];

    slabs.forEach(([min, max, rate]) => {
      taxNew += Math.max(0, Math.min(taxableNew, max) - min) * rate;
    });

    if (taxableNew <= 700000) taxNew = 0;

    const totalOld = Math.round(taxOld * 1.04);
    const totalNew = Math.round(taxNew * 1.04);

    const isNewBetter = totalNew <= totalOld;
    const activeTax = isNewBetter ? totalNew : totalOld;

    return {
      taxOld: totalOld,
      taxNew: totalNew,
      activeTax,
      netIncome: income - activeTax,
      savings: Math.abs(totalOld - totalNew),
      incomePct: Math.round(((income - activeTax) / income) * 100),
      taxPct: Math.round((activeTax / income) * 100),
      recommended: isNewBetter ? 'New Regime' : 'Old Regime',
    };
  }, [ay, age, income, deductions]);

  /* ---------------- UI ---------------- */

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* INPUTS */}
          <div className="space-y-6">
            {/* Assessment Year */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                {t.ayLabel}
              </label>
              <Select
                value={ay}
                onValueChange={(v) => setAy(v as AssessmentYear)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-2026">
                    FY 2025–26 (AY 26-27)
                  </SelectItem>
                  <SelectItem value="2024-2025">
                    FY 2024–25 (AY 25-26)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                {t.ageLabel}
              </label>
              <Select value={age} onValueChange={(v) => setAge(v as AgeGroup)}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-60">{t.ageOptions.regular}</SelectItem>
                  <SelectItem value="60-80">{t.ageOptions.senior}</SelectItem>
                  <SelectItem value="80+">
                    {t.ageOptions.superSenior}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CalculatorField
              label={t.incomeLabel}
              value={income}
              min={300000}
              max={5000000}
              step={50000}
              onChange={setIncome}
            />

            <CalculatorField
              label={t.deductionsLabel}
              value={deductions}
              min={0}
              max={1000000}
              step={10000}
              onChange={setDeductions}
            />
          </div>

          {/* VISUALS */}
          <div className="flex flex-col items-center justify-center">
            {/* Note: In this chart, Principal = Net Income, Interest = Tax */}
            <EMIPieChart
              principalPct={calc.incomePct}
              interestPct={calc.taxPct}
              size={220}
            />

            <div className="mt-6 text-center space-y-4 w-full max-w-sm">
              <div className="rounded-lg border border-lime-200 bg-lime-50 p-4">
                <div className="text-xs font-semibold text-lime-700 uppercase tracking-wide">
                  {t.recommendationLabel}
                </div>
                <div className="text-xl font-extrabold text-lime-800 mt-1">
                  {calc.recommended}
                </div>
                {calc.savings > 0 && (
                  <div className="text-sm text-lime-700 mt-1">
                    {t.saveLabel} <strong>{formatINR(calc.savings)}</strong>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <Card className="p-3 border-slate-200 bg-white">
                  <div className="text-xs font-semibold text-slate-500 mb-1">
                    {t.oldRegimeLabel}
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {formatINR(calc.taxOld)}
                  </div>
                </Card>

                <Card
                  className={`p-3 border transition-colors ${
                    calc.recommended === 'New Regime'
                      ? 'border-lime-300 bg-lime-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="text-xs font-semibold text-slate-500 mb-1">
                    {t.newRegimeLabel}
                  </div>
                  <div className="text-lg font-bold text-lime-700">
                    {formatINR(calc.taxNew)}
                  </div>
                </Card>
              </div>

              <div className="text-sm text-slate-600">
                {t.netIncomeLabel}: <strong>{formatINR(calc.netIncome)}</strong>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
