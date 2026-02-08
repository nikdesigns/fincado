'use client';

import React, { useMemo, useState, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import {
  Scale,
  TrendingDown,
  RefreshCcw,
  AlertCircle,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Calculator,
} from 'lucide-react';
import { toast } from 'sonner';

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

interface SavedCalculation {
  id: number;
  fy: string;
  age: string;
  income: number;
  deductions: number;
  taxOld: number;
  taxNew: number;
  recommended: string;
  date: string;
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

  /* ---------- SAVED CALCULATIONS STATE ---------- */
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  /* ---------- LOAD SAVED CALCULATIONS ---------- */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    try {
      const saved = localStorage.getItem('tax_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved calculations:', error);
    }
  }, []);

  /* ---------- TRACK CALCULATOR LOAD ---------- */
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'Income_Tax',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------------- CALCULATIONS ---------------- */
  const calc = useMemo(() => {
    const STD_OLD = 50_000;
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

    // Section 87A rebate for Old Regime
    if (taxableOld <= 500_000) taxOld = 0;

    /* ---------- NEW REGIME ---------- */
    const taxableNew = Math.max(0, income - STD_NEW);
    let taxNew = 0;

    const slabs = [
      [300_000, 700_000, 0.05],
      [700_000, 1_000_000, 0.1],
      [1_000_000, 1_200_000, 0.15],
      [1_200_000, 1_500_000, 0.2],
      [1_500_000, Infinity, 0.3]
    ];

    slabs.forEach(([min, max, rate]) => {
      taxNew += Math.max(0, Math.min(taxableNew, max) - min) * rate;
    });

    // Section 87A rebate for New Regime
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
      taxableOld,
      taxableNew,
    };
  }, [age, income, deductions]);

  const handleReset = () => {
    setIncome(1_200_000);
    setDeductions(150_000);
    setFy('2026-2027');
    setAge('0-60');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tax_reset', {
        calculator_type: 'Income_Tax',
      });
    }
  };

  /* ---------- SAVE CALCULATION ---------- */
  const handleSaveCalculation = () => {
    const calculation: SavedCalculation = {
      id: Date.now(),
      fy: fy,
      age: age,
      income: income,
      deductions: deductions,
      taxOld: calc.taxOld,
      taxNew: calc.taxNew,
      recommended: calc.recommended,
      date: new Date().toISOString(),
    };

    const saved = [...savedCalculations];
    saved.unshift(calculation);
    const trimmed = saved.slice(0, 10);

    setSavedCalculations(trimmed);

    try {
      localStorage.setItem('tax_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success(
      'Tax calculation saved! Access it anytime from your history.',
    );

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tax_saved', {
        income: income,
        recommended_regime: calc.recommended,
      });
    }
  };

  /* ---------- DELETE SINGLE CALCULATION ---------- */
  const handleDeleteCalculation = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('tax_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');
  };

  /* ---------- CLEAR ALL CALCULATIONS ---------- */
  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('tax_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');
  };

  /* ---------- SHARE VIA WHATSAPP ---------- */
  const handleShare = () => {
    const message =
      `💰 Income Tax Calculator Results (FY ${fy})\\n\\n` +
      `Gross Income: ${formatINR(income)}\\n` +
      `Deductions: ${formatINR(deductions)}\\n\\n` +
      `📊 Tax Comparison:\\n` +
      `Old Regime: ${formatINR(calc.taxOld)}\\n` +
      `New Regime: ${formatINR(calc.taxNew)}\\n\\n` +
      `✅ Recommended: ${calc.recommended}\\n` +
      `💵 Net Income: ${formatINR(calc.netIncome)}\\n\\n` +
      `Calculate yours: https://fincado.com/income-tax-calculator/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tax_shared', {
        method: 'whatsapp',
      });
    }
  };

  /* ---------- LOAD SAVED CALCULATION ---------- */
  const handleLoadCalculation = (calc: SavedCalculation) => {
    setFy(calc.fy as FinancialYear);
    setAge(calc.age as AgeGroup);
    setIncome(calc.income);
    setDeductions(calc.deductions);
    toast.success('Calculation loaded!');
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-6">
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
            <div className="space-y-6">
              {/* Financial Year */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  {t.fyLabel}
                </Label>
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
                <Label className="text-sm font-medium text-slate-700">
                  {t.ageLabel}
                </Label>
                <Select
                  value={age}
                  onValueChange={(v) => setAge(v as AgeGroup)}
                >
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
                <p className="text-xs text-slate-400 italic">
                  {t.deductionHint}
                </p>
              </div>
            </div>

            {/* --- RIGHT: VISUALS --- */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Recommendation Box */}
              <div
                className={`p-6 rounded-xl border-2 text-center transition-all ${
                  calc.recommended === 'New Regime'
                    ? 'border-emerald-200 bg-emerald-50 shadow-emerald-100 shadow-lg'
                    : 'border-blue-200 bg-blue-50 shadow-blue-100 shadow-lg'
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
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-medium shadow-sm text-slate-700">
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
                    <span className="font-semibold">
                      {formatINR(calc.taxOld)}
                    </span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
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
                    <span className="font-semibold">
                      {formatINR(calc.taxNew)}
                    </span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
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
              <div className="rounded-lg bg-slate-900 p-5 text-center text-white shadow-lg">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-1">
                  {t.netIncomeLabel}
                </p>
                <div className="text-3xl font-bold tracking-tight">
                  {formatINR(calc.netIncome)}
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  After {calc.recommended} tax
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-400">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  Calculations include Health & Education Cess (4%). Surcharge
                  applies if income exceeds ₹50 Lakhs.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✅ Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSaveCalculation} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          Save Calculation
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          Share via WhatsApp
        </Button>
      </div>

      {/* ✅ Tax Breakdown Card */}
      <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calculator className="h-5 w-5 text-purple-600" />
            Tax Breakdown
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Old Regime Details */}
              <div className="p-4 bg-white rounded-lg border-2 border-blue-200">
                <div className="text-sm font-semibold text-blue-700 mb-2">
                  Old Regime
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Gross Income:</span>
                    <span className="font-medium">{formatINR(income)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Std Deduction:</span>
                    <span className="font-medium">₹50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>80C/80D/etc:</span>
                    <span className="font-medium">{formatINR(deductions)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Taxable Income:</span>
                    <span>{formatINR(calc.taxableOld)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-blue-700">
                    <span>Tax + Cess:</span>
                    <span>{formatINR(calc.taxOld)}</span>
                  </div>
                </div>
              </div>

              {/* New Regime Details */}
              <div className="p-4 bg-white rounded-lg border-2 border-emerald-200">
                <div className="text-sm font-semibold text-emerald-700 mb-2">
                  New Regime
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Gross Income:</span>
                    <span className="font-medium">{formatINR(income)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Std Deduction:</span>
                    <span className="font-medium">₹75,000</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Deductions:</span>
                    <span>Not Allowed</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Taxable Income:</span>
                    <span>{formatINR(calc.taxableNew)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-emerald-700">
                    <span>Tax + Cess:</span>
                    <span>{formatINR(calc.taxNew)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✅ Saved Calculations History */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved Scenarios</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {savedCalculations.map((calc) => (
                <div
                  key={calc.id}
                  className="group p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition relative"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleLoadCalculation(calc)}
                  >
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <div className="font-semibold text-sm">
                          {calc.fy} | {calc.age} | Income:{' '}
                          {formatINR(calc.income)}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Recommended: {calc.recommended} | Old:{' '}
                          {formatINR(calc.taxOld)} | New:{' '}
                          {formatINR(calc.taxNew)}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(calc.date).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCalculation(calc.id);
                    }}
                    className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
