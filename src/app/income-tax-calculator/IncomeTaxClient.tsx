'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Scale, TrendingDown, RefreshCcw, AlertCircle } from 'lucide-react';

/* ---------------- TYPES ---------------- */
type FinancialYear = '2026-2027' | '2025-2026';
type AgeGroup = '0-60' | '60-80' | '80+';

interface LabelConfig {
  fyLabel: string;
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
  labels?: Partial<LabelConfig>;
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
  const t: LabelConfig = {
    fyLabel: 'Financial Year',
    ageLabel: 'Age Category',
    incomeLabel: 'Gross Annual Income (₹)',
    deductionsLabel: 'Total Deductions (80C, 80D etc.)',
    deductionHint: '*Deductions apply only under Old Regime',
    recommendationLabel: 'RECOMMENDED',
    saveLabel: 'Save',
    oldRegimeLabel: 'Old Regime Tax',
    newRegimeLabel: 'New Regime Tax',
    netIncomeLabel: 'Income After Tax',
    ageOptions: {
      regular: 'Below 60',
      senior: '60 – 80',
      superSenior: '80+',
    },
    ...labels,
  };

  /* ---------------- STATE ---------------- */
  const [fy, setFy] = useState<FinancialYear>('2026-2027');
  const [age, setAge] = useState<AgeGroup>('0-60');
  const [income, setIncome] = useState(1_200_000);
  const [deductions, setDeductions] = useState(150_000);

  /* ---------------- CALCULATIONS ---------------- */
  const calc = useMemo(() => {
    const STD_OLD = 50_000;
    // Budget 2026: Std Deduction is 75k for both years in New Regime (assumed unchanged from 2025)
    const STD_NEW = 75_000;

    /* ---------- OLD REGIME ---------- */
    const slab1 = age === '80+' ? 500_000 : age === '60-80' ? 300_000 : 250_000;
    const slab2 = 500_000;
    const slab3 = 1_000_000;

    const taxableOld = Math.max(0, income - STD_OLD - deductions);
    let taxOld = 0;

    if (taxableOld > slab1) {
      taxOld += Math.min(taxableOld - slab1, slab2 - slab1) * 0.05;
      taxOld += Math.min(Math.max(taxableOld - slab2, 0), slab3 - slab2) * 0.2;
      taxOld += Math.max(taxableOld - slab3, 0) * 0.3;
    }

    // Section 87A rebate for Old Regime (Income <= 5L)
    if (taxableOld <= 500_000) taxOld = 0;

    /* ---------- NEW REGIME ---------- */
    const taxableNew = Math.max(0, income - STD_NEW);
    let taxNew = 0;

    // Slabs for 2025-26 and 2026-27 (Assumed stable per Budget 2026 prompt context)
    const slabs = [
      [300_000, 700_000, 0.05],
      [700_000, 1_000_000, 0.1],
      [1_000_000, 1_200_000, 0.15],
      [1_200_000, 1_500_000, 0.2],
      [1_500_000, Infinity, 0.3],
    ];

    slabs.forEach(([min, max, rate]) => {
      taxNew += Math.max(0, Math.min(taxableNew, max) - min) * rate;
    });

    // Section 87A rebate for New Regime (Income <= 7L)
    if (taxableNew <= 700_000) taxNew = 0;

    /* ---------- CESS ---------- */
    const totalOld = Math.round(taxOld * 1.04);
    const totalNew = Math.round(taxNew * 1.04);

    const recommended = totalNew <= totalOld ? 'New Regime' : 'Old Regime';
    const activeTax = recommended === 'New Regime' ? totalNew : totalOld;
    const savings = Math.abs(totalOld - totalNew);

    return {
      taxOld: totalOld,
      taxNew: totalNew,
      recommended,
      savings,
      netIncome: income - activeTax,
    };
  }, [age, income, deductions]); // ✅ Added 'fy' to dependency array

  const handleReset = () => {
    setIncome(1_200_000);
    setDeductions(150_000);
    setFy('2026-2027');
  };

  /* ---------------- UI ---------------- */
  return (
    <Card className="border-border shadow-sm bg-card">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Scale className="h-5 w-5 text-emerald-600" />
            Tax Estimator
          </CardTitle>
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 flex items-center gap-1 hover:text-emerald-600 transition-colors"
          >
            <RefreshCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* --- LEFT: INPUTS --- */}
          <div className="space-y-8">
            {/* Financial Year */}
            <div className="space-y-2">
              <Label>{t.fyLabel}</Label>
              <Select
                value={fy}
                onValueChange={(v) => setFy(v as FinancialYear)}
              >
                <SelectTrigger className="bg-white h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-2027">
                    FY 2026–27 (AY 2027–28)
                  </SelectItem>
                  <SelectItem value="2025-2026">
                    FY 2025–26 (AY 2026–27)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label>{t.ageLabel}</Label>
              <Select value={age} onValueChange={(v) => setAge(v as AgeGroup)}>
                <SelectTrigger className="bg-white h-11">
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
              min={300_000}
              max={10_000_000}
              step={50_000}
              onChange={setIncome}
            />

            <div className="space-y-1">
              <CalculatorField
                label={t.deductionsLabel}
                value={deductions}
                min={0}
                max={1_500_000}
                step={5_000}
                onChange={setDeductions}
              />
              <p className="text-xs text-slate-400 italic">{t.deductionHint}</p>
            </div>
          </div>

          {/* --- RIGHT: VISUALS --- */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Recommendation Box */}
            <div
              className={`p-6 rounded-xl border-2 text-center ${
                calc.recommended === 'New Regime'
                  ? 'border-emerald-100 bg-emerald-50'
                  : 'border-blue-100 bg-blue-50'
              }`}
            >
              <p
                className={`text-xs font-bold tracking-widest uppercase mb-2 ${
                  calc.recommended === 'New Regime'
                    ? 'text-emerald-600'
                    : 'text-blue-600'
                }`}
              >
                {t.recommendationLabel}
              </p>
              <h3 className="text-2xl font-black text-slate-800">
                {calc.recommended}
              </h3>
              {calc.savings > 0 ? (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-medium shadow-sm text-slate-700">
                  <TrendingDown className="h-4 w-4 text-emerald-600" />
                  Save <strong>{formatINR(calc.savings)}</strong>
                </div>
              ) : (
                <div className="mt-2 text-sm text-slate-500">
                  Tax liability is identical in both regimes.
                </div>
              )}
            </div>

            {/* Bar Chart Comparison */}
            <div className="space-y-3">
              {/* Old Regime Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Old Regime</span>
                  <span>{formatINR(calc.taxOld)}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      calc.recommended === 'Old Regime'
                        ? 'bg-blue-500'
                        : 'bg-slate-300'
                    }`}
                    style={{
                      width: `${
                        Math.min(
                          (calc.taxOld / Math.max(calc.taxOld, calc.taxNew)) *
                            100,
                          100,
                        ) || 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* New Regime Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>New Regime</span>
                  <span>{formatINR(calc.taxNew)}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      calc.recommended === 'New Regime'
                        ? 'bg-emerald-500'
                        : 'bg-slate-300'
                    }`}
                    style={{
                      width: `${
                        Math.min(
                          (calc.taxNew / Math.max(calc.taxOld, calc.taxNew)) *
                            100,
                          100,
                        ) || 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Final Takehome */}
            <div className="rounded-lg bg-slate-900 p-4 text-center text-white shadow-lg">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-1">
                {t.netIncomeLabel}
              </p>
              <div className="text-2xl font-bold tracking-tight">
                {formatINR(calc.netIncome)}
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                Calculations include Health & Education Cess (4%). Surcharge is
                applicable if income exceeds ₹50 Lakhs.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
