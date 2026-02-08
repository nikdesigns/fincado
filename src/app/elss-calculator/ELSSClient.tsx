'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  BookmarkIcon,
  Share2Icon,
  Trash2,
  TrendingUp,
  Shield,
  IndianRupee,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
interface ELSSLabels {
  monthlyInv: string;
  lumpsumInv: string;
  rate: string;
  timePeriod: string;
  taxBracket: string;
  maturityValue: string;
  invested: string;
  returns: string;
  taxSaved: string;
  lockInNote: string;
  toggleLabel: string;
  compareButton: string;
  hideButton: string;
  elssTitle: string;
  ppfTitle: string;
  maturity: string;
  lockIn: string;
  advantage: string;
  importantNote: string;
}

const DEFAULT_LABELS: ELSSLabels = {
  monthlyInv: 'Monthly SIP Amount (₹)',
  lumpsumInv: 'Lump Sum Amount (₹)',
  rate: 'Expected Return (% p.a)',
  timePeriod: 'Time Period (Years)',
  taxBracket: 'Your Tax Bracket',
  maturityValue: 'Total Maturity Value',
  invested: 'Total Invested',
  returns: 'Wealth Gain',
  taxSaved: 'Tax Saved (80C)',
  lockInNote: 'Minimum lock-in period for ELSS is 3 years',
  toggleLabel: 'Toggle investment mode',
  compareButton: 'Compare with',
  hideButton: 'Hide',
  elssTitle: 'ELSS (Your Selection)',
  ppfTitle: 'PPF (7.1% Fixed)',
  maturity: 'Maturity:',
  lockIn: 'Lock-in:',
  advantage: 'ELSS Advantage:',
  importantNote: 'Important Note',
};

interface SavedCalculation {
  id: number;
  monthlySIP: number;
  rate: number;
  years: number;
  taxBracket: number;
  futureValue: number;
  totalInvested: number;
  totalReturns: number;
  totalTaxSaved: number;
  date: string;
  isLumpsum?: boolean;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

const TAX_BRACKETS = [
  { value: 0, label: 'No Tax (Income < ₹3L)' },
  { value: 0.05, label: '5% (Old Regime)' },
  { value: 0.2, label: '20%' },
  { value: 0.3, label: '30%' },
];

/* ---------- ELSS PIE CHART ---------- */
function ELSSPieChart({
  investedPct,
  returnsPct,
}: {
  investedPct: number;
  returnsPct: number;
}) {
  const size = 200;
  const strokeWidth = 24;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  const dash1 = (investedPct / 100) * circumference;
  const dash2 = (returnsPct / 100) * circumference;
  const offset2 = -dash1;

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      <div style={{ width: size, height: size }} className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Invested Amount (Slate/Grey) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#64748b"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash1} ${circumference}`}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />

          {/* Returns (Lime/Green) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#84cc16"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash2} ${circumference}`}
            strokeDashoffset={offset2}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Returns
          </span>
          <span className="text-2xl font-bold text-lime-600">
            {returnsPct}%
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-500" />
          <span className="text-xs font-medium text-slate-600">Invested</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-lime-500" />
          <span className="text-xs font-medium text-slate-600">Returns</span>
        </div>
      </div>
    </div>
  );
}

export default function ELSSClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<ELSSLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [monthlySIP, setMonthlySIP] = useState(12500);
  const [rate, setRate] = useState(14);
  const [years, setYears] = useState(3);
  const [taxBracket, setTaxBracket] = useState(0.3);
  const [isLumpsum, setIsLumpsum] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  // Load saved calculations
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    try {
      const saved = localStorage.getItem('elss_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved ELSS calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'ELSS',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- ELSS CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    let futureValue = 0;
    let totalInvested = 0;

    if (isLumpsum) {
      // Lump sum calculation
      const lumpsumAmount = monthlySIP;
      totalInvested = lumpsumAmount;
      const r = rate / 100;
      futureValue = lumpsumAmount * Math.pow(1 + r, years);
    } else {
      // SIP calculation
      const months = years * 12;
      const r = rate / 12 / 100;

      if (r === 0) {
        futureValue = monthlySIP * months;
      } else {
        futureValue =
          monthlySIP * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      }

      totalInvested = monthlySIP * months;
    }

    const totalReturns = futureValue - totalInvested;

    // Tax saving logic (₹1.5L limit per year)
    const annualInvestment = isLumpsum ? monthlySIP : monthlySIP * 12;
    const eligible = Math.min(annualInvestment, 150000);
    const yearlyTaxSaved = Math.round(eligible * taxBracket);
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
  }, [monthlySIP, rate, years, taxBracket, isLumpsum]);

  /* ---------- PPF COMPARISON ---------- */
  const ppfComparison = useMemo(() => {
    if (!showComparison) return null;

    const ppfRate = 0.071; // 7.1% p.a. for PPF
    let ppfMaturity = 0;
    let ppfInvested = 0;

    if (isLumpsum) {
      ppfInvested = monthlySIP;
      ppfMaturity = monthlySIP * Math.pow(1 + ppfRate, years);
    } else {
      const months = years * 12;
      const monthlyRate = ppfRate / 12;
      ppfMaturity =
        monthlySIP *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
      ppfInvested = monthlySIP * months;
    }

    const ppfReturns = ppfMaturity - ppfInvested;

    // PPF tax savings
    const annualInv = isLumpsum ? monthlySIP : monthlySIP * 12;
    const eligible = Math.min(annualInv, 150000);
    const ppfYearlyTax = Math.round(eligible * taxBracket);
    const ppfTotalTax = ppfYearlyTax * years;

    return {
      maturity: Math.round(ppfMaturity),
      invested: Math.round(ppfInvested),
      returns: Math.round(ppfReturns),
      taxSaved: ppfTotalTax,
      difference: Math.round(calculations.futureValue - ppfMaturity),
    };
  }, [
    showComparison,
    monthlySIP,
    years,
    taxBracket,
    isLumpsum,
    calculations.futureValue,
  ]);

  /* ---------- HANDLERS ---------- */
  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      monthlySIP,
      rate,
      years,
      taxBracket,
      futureValue: calculations.futureValue,
      totalInvested: calculations.totalInvested,
      totalReturns: calculations.totalReturns,
      totalTaxSaved: calculations.totalTaxSaved,
      date: new Date().toISOString(),
      isLumpsum,
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('elss_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving ELSS calculation:', error);
    }

    toast.success('ELSS calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'elss_calculation_saved', {
        investment: monthlySIP,
        rate,
        years,
        tax_bracket: taxBracket,
      });
    }
  };

  const handleShare = () => {
    const investmentLabel = isLumpsum ? 'Lump Sum' : 'Monthly SIP';
    const message =
      `💰 ELSS Tax Saving Investment\n\n` +
      `${investmentLabel}: ${formatINR(monthlySIP)}\n` +
      `Expected Return: ${rate}% p.a.\n` +
      `Investment Period: ${years} years\n\n` +
      `📊 Maturity Value: ${formatINR(calculations.futureValue)}\n` +
      `💼 Total Invested: ${formatINR(calculations.totalInvested)}\n` +
      `📈 Wealth Gain: ${formatINR(calculations.totalReturns)}\n` +
      `🎉 Tax Saved (Section 80C): ${formatINR(calculations.totalTaxSaved)}\n\n` +
      `Calculate yours: https://fincado.com/elss-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'elss_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('elss_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating ELSS history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('elss_calculator_history');
    } catch (error) {
      console.error('Error clearing ELSS history:', error);
    }
    toast.success('All ELSS calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setMonthlySIP(calc.monthlySIP);
    setRate(calc.rate);
    setYears(calc.years);
    setTaxBracket(calc.taxBracket);
    setIsLumpsum(calc.isLumpsum || false);
    toast.success('Calculation loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Investment Mode Toggle */}
      <Card className="border-lime-200 bg-linear-to-r from-lime-50 to-emerald-50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch
                checked={isLumpsum}
                onCheckedChange={setIsLumpsum}
                id="investment-mode"
              />
              <label
                htmlFor="investment-mode"
                className="text-sm font-semibold text-slate-900 cursor-pointer"
              >
                {isLumpsum ? t.lumpsumInv : t.monthlyInv}
              </label>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">
              {t.toggleLabel}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Main Calculator */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* ---------- INPUTS ---------- */}
            <div className="space-y-6">
              <CalculatorField
                label={isLumpsum ? t.lumpsumInv : t.monthlyInv}
                value={monthlySIP}
                min={500}
                max={isLumpsum ? 1500000 : 50000}
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

              {/* Tax Bracket Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  {t.taxBracket}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TAX_BRACKETS.map((bracket) => (
                    <button
                      key={bracket.value}
                      onClick={() => setTaxBracket(bracket.value)}
                      className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                        taxBracket === bracket.value
                          ? 'border-lime-600 bg-lime-50 text-lime-900 font-semibold'
                          : 'border-slate-200 hover:border-lime-300'
                      }`}
                    >
                      {bracket.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                🔒 {t.lockInNote}
              </div>
            </div>

            {/* ---------- VISUAL ---------- */}
            <div className="flex flex-col items-center justify-center">
              <ELSSPieChart
                investedPct={calculations.investedPct}
                returnsPct={calculations.returnsPct}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-slate-500">{t.maturityValue}</div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                  {formatINR(calculations.futureValue)}
                </div>

                {/* TAX SAVED */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm text-emerald-800">
                  <Shield className="h-4 w-4" />
                  Save ~
                  <strong>{formatINR(calculations.yearlyTaxSaved)}</strong>
                  tax every year
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="text-xs text-slate-500">{t.invested}</div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {formatINR(calculations.totalInvested)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-200 bg-emerald-50">
                    <CardContent className="p-4">
                      <div className="text-xs text-emerald-700">
                        {t.returns}
                      </div>
                      <div className="mt-1 font-semibold text-emerald-700">
                        +{formatINR(calculations.totalReturns)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">{t.taxSaved}:</span>
                    <span className="font-bold text-indigo-700">
                      {formatINR(calculations.totalTaxSaved)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-500 text-left">
            Tax savings shown are indicative and depend on your tax regime and
            slab. Section 80C benefits remain unchanged after Union Budget 2026.
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          Save Calculation
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          Share via WhatsApp
        </Button>

        <Button
          onClick={() => setShowComparison(!showComparison)}
          variant={showComparison ? 'default' : 'outline'}
          size="sm"
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          {showComparison ? t.hideButton : t.compareButton} PPF
        </Button>
      </div>

      {/* ELSS vs PPF Comparison */}
      {showComparison && ppfComparison && (
        <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              ELSS vs PPF Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ELSS Card */}
              <div className="p-5 bg-lime-50 rounded-lg border-2 border-lime-200">
                <h4 className="font-semibold text-lime-900 mb-3 flex items-center gap-2">
                  <IndianRupee className="h-5 w-5" />
                  {t.elssTitle}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t.maturity}</span>
                    <strong className="text-lime-700">
                      {formatINR(calculations.futureValue)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t.returns}:</span>
                    <strong className="text-lime-700">
                      {formatINR(calculations.totalReturns)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t.taxSaved}:</span>
                    <strong className="text-lime-700">
                      {formatINR(calculations.totalTaxSaved)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t.lockIn}</span>
                    <strong>3 Years</strong>
                  </div>
                </div>
              </div>

              {/* PPF Card */}
              <div className="p-5 bg-slate-50 rounded-lg border-2 border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {t.ppfTitle}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t.maturity}</span>
                    <strong className="text-slate-700">
                      {formatINR(ppfComparison.maturity)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t.returns}:</span>
                    <strong className="text-slate-700">
                      {formatINR(ppfComparison.returns)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t.taxSaved}:</span>
                    <strong className="text-slate-700">
                      {formatINR(ppfComparison.taxSaved)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t.lockIn}</span>
                    <strong>15 Years</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm text-slate-700">
                <strong>{t.advantage}</strong> You gain an extra{' '}
                <strong className="text-emerald-700">
                  {formatINR(Math.max(0, ppfComparison.difference))}
                </strong>{' '}
                with ELSS compared to PPF, plus enjoy a much shorter lock-in
                period of just 3 years vs 15 years!
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                <span>⚠️</span>
                {t.importantNote}
              </h4>
              <p className="text-xs text-slate-700">
                ELSS returns are market-linked and not guaranteed. PPF offers
                fixed returns with zero risk. PPF returns are also completely
                tax-free (EEE status), while ELSS gains above ₹1.25L are taxed
                at 12.5% LTCG.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved ELSS Plans</CardTitle>
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
                    onClick={() => handleLoad(calc)}
                  >
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <div className="font-semibold text-sm">
                          {formatINR(calc.monthlySIP)}{' '}
                          {calc.isLumpsum ? '(Lump Sum)' : '/ month'} @{' '}
                          {calc.rate}% for {calc.years} years
                          <span className="ml-2 text-xs text-lime-600 bg-lime-100 px-2 py-0.5 rounded">
                            Tax: {calc.taxBracket * 100}%
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Maturity: {formatINR(calc.futureValue)} | Tax Saved:{' '}
                          {formatINR(calc.totalTaxSaved)}
                        </div>
                        <div className="text-[11px] text-emerald-700 mt-0.5">
                          Returns: {formatINR(calc.totalReturns)}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(calc.date).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(calc.id);
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
