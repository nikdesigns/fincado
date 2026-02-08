'use client';

import React, { useMemo, useState, useEffect } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  RefreshCcw,
  Lock,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Calculator,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
interface SavedCalculation {
  id: number;
  mode: 'monthly' | 'annual';
  monthlyContribution: number;
  annualContribution: number;
  years: number;
  annualRate: number;
  maturity: number;
  invested: number;
  interest: number;
  date: string;
}

interface PPFLabels {
  contributionMode: string;
  monthly: string;
  annual: string;
  annualLumpSum: string;
  monthlyInvestment: string;
  annualInvestment: string;
  noteLabel: string;
  noteText: string;
  warningText: string;
  interestRate: string;
  duration: string;
  showBreakdown: string;
  hideBreakdown: string;
  maturityValue: string;
  taxFree: string;
  totalInvestment: string;
  totalInterest: string;
  effectiveReturn: string;
  lockInInfo: string;
  yearwiseGrowth: string;
  year: string;
  balance: string;
  interest: string;
  moreYears: string;
  saveCalculation: string;
  shareWhatsApp: string;
  savedPPFPlans: string;
  clearAll: string;
  maturity: string;
  mode: string;
}

const DEFAULT_LABELS: PPFLabels = {
  contributionMode: 'Contribution Mode',
  monthly: 'Monthly',
  annual: 'Annual',
  annualLumpSum: 'Annual (Lump Sum)',
  monthlyInvestment: 'Monthly Investment (₹)',
  annualInvestment: 'Annual Investment (₹)',
  noteLabel: 'Note:',
  noteText: 'Maximum annual contribution is ₹1,50,000.',
  warningText: '⚠️ Your monthly contribution exceeds the annual limit!',
  interestRate: 'Interest Rate (% p.a)',
  duration: 'Duration (Years)',
  showBreakdown: 'Show Year-wise Breakdown',
  hideBreakdown: 'Hide Year-wise Breakdown',
  maturityValue: 'Maturity Value (Tax Free)',
  taxFree: 'Tax Free',
  totalInvestment: 'Total Investment',
  totalInterest: 'Total Interest',
  effectiveReturn: 'Effective Return:',
  lockInInfo: '15-year lock-in • 100% Tax-Free (EEE)',
  yearwiseGrowth: 'Year-wise Growth (First 5 Years)',
  year: 'Year',
  balance: 'Balance:',
  interest: 'Interest:',
  moreYears: 'more years to maturity',
  saveCalculation: 'Save Calculation',
  shareWhatsApp: 'Share via WhatsApp',
  savedPPFPlans: 'Your Saved PPF Plans',
  clearAll: 'Clear All',
  maturity: 'Maturity:',
  mode: 'Mode:',
};

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function PPFClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<PPFLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [mode, setMode] = useState<'monthly' | 'annual'>('monthly');
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [annualContribution, setAnnualContribution] = useState(12000);
  const [years, setYears] = useState(15);
  const [annualRate, setAnnualRate] = useState(7.1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  // Load saved calculations
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    try {
      const saved = localStorage.getItem('ppf_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved PPF calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'PPF',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const months = years * 12;
    const yearlyRate = annualRate / 100;

    let maturity = 0;
    let invested = 0;

    if (mode === 'monthly') {
      invested = monthlyContribution * months;
      const annualDeposit = monthlyContribution * 12;

      if (yearlyRate === 0) {
        maturity = invested;
      } else {
        // PPF formula: Future Value of Annuity Due (deposits at beginning of year)
        maturity =
          annualDeposit *
          ((Math.pow(1 + yearlyRate, years) - 1) / yearlyRate) *
          (1 + yearlyRate);
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

    // Calculate year-wise breakdown for advanced view
    const yearlyBreakdown = [];
    let runningBalance = 0;
    const deposit =
      mode === 'monthly' ? monthlyContribution * 12 : annualContribution;

    for (let year = 1; year <= Math.min(years, 5); year++) {
      runningBalance = (runningBalance + deposit) * (1 + yearlyRate);
      yearlyBreakdown.push({
        year,
        balance: Math.round(runningBalance),
        interestEarned: Math.round(runningBalance - deposit * year),
      });
    }

    return {
      maturity: Math.round(maturity),
      invested: Math.round(invested),
      interest: Math.round(interest),
      principalPct,
      interestPct: 100 - principalPct,
      yearlyBreakdown,
      effectiveReturn:
        invested > 0 ? ((interest / invested) * 100).toFixed(2) : '0',
    };
  }, [mode, monthlyContribution, annualContribution, years, annualRate]);

  /* ---------- HANDLERS ---------- */
  const handleReset = () => {
    setMode('monthly');
    setMonthlyContribution(1000);
    setAnnualContribution(12000);
    setYears(15);
    setAnnualRate(7.1);
    toast.success('Calculator reset to defaults!');
  };

  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      mode,
      monthlyContribution,
      annualContribution,
      years,
      annualRate,
      maturity: calculations.maturity,
      invested: calculations.invested,
      interest: calculations.interest,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('ppf_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving PPF calculation:', error);
    }

    toast.success('PPF calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ppf_calculation_saved', {
        mode,
        years,
        rate: annualRate,
      });
    }
  };

  const handleShare = () => {
    const amount =
      mode === 'monthly'
        ? `${formatINR(monthlyContribution)}/month`
        : `${formatINR(annualContribution)}/year`;

    const message =
      `🔒 PPF Calculation (Tax-Free Returns)\n\n` +
      `Investment Mode: ${mode === 'monthly' ? t.monthly : t.annual}\n` +
      `Amount: ${amount}\n` +
      `Interest Rate: ${annualRate}% p.a.\n` +
      `Duration: ${years} years\n\n` +
      `💰 Maturity Value: ${formatINR(calculations.maturity)}\n` +
      `📊 Total Investment: ${formatINR(calculations.invested)}\n` +
      `💵 Tax-Free Interest: ${formatINR(calculations.interest)}\n` +
      `🎯 Effective Return: ${calculations.effectiveReturn}%\n\n` +
      `✨ 100% Tax-Free under EEE Status\n` +
      `Calculate yours: https://fincado.com/ppf-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ppf_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('ppf_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating PPF history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('ppf_calculator_history');
    } catch (error) {
      console.error('Error clearing PPF history:', error);
    }
    toast.success('All PPF calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setMode(calc.mode);
    setMonthlyContribution(calc.monthlyContribution);
    setAnnualContribution(calc.annualContribution);
    setYears(calc.years);
    setAnnualRate(calc.annualRate);
    toast.success('Calculation loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* PPF Info Card */}
      <Card className="border-emerald-200 bg-linear-to-r from-emerald-50 to-green-50">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-emerald-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-emerald-900 mb-1">
                Tax-Free Returns • EEE Status • Government Backed
              </h3>
              <p className="text-xs text-slate-700">
                Current PPF rate:{' '}
                <strong className="text-emerald-700">{annualRate}%</strong> |
                15-year lock-in | Max investment: ₹1.5L/year | Section 80C
                benefit
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Calculator */}
      <Card className="border-border shadow-sm bg-card">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <Lock className="h-5 w-5 text-emerald-600" />
              PPF Calculator
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
            {/* ---------- INPUTS ---------- */}
            <div className="space-y-6">
              {/* Contribution Mode */}
              <div className="space-y-2">
                <Label>{t.contributionMode}</Label>
                <Select
                  value={mode}
                  onValueChange={(v) => setMode(v as 'monthly' | 'annual')}
                >
                  <SelectTrigger className="bg-white h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">{t.monthly}</SelectItem>
                    <SelectItem value="annual">{t.annualLumpSum}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Investment Amount */}
              <CalculatorField
                label={
                  mode === 'monthly' ? t.monthlyInvestment : t.annualInvestment
                }
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

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs text-slate-700">
                  <strong>{t.noteLabel}</strong> {t.noteText}
                  {mode === 'monthly' && monthlyContribution * 12 > 150000 && (
                    <span className="text-red-600 block mt-1">
                      {t.warningText}
                    </span>
                  )}
                </p>
              </div>

              {/* Interest Rate */}
              <CalculatorField
                label={t.interestRate}
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

              {/* Advanced Toggle */}
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  <Calculator className="mr-2 h-3 w-3" />
                  {showAdvanced ? t.hideBreakdown : t.showBreakdown}
                </Button>
              </div>
            </div>

            {/* ---------- VISUALS ---------- */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={calculations.principalPct}
                interestPct={calculations.interestPct}
                size={200}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-slate-500">{t.maturityValue}</div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                  {formatINR(calculations.maturity)}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="text-xs text-slate-500">
                        {t.totalInvestment}
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {formatINR(calculations.invested)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-lime-200 bg-lime-50">
                    <CardContent className="p-4">
                      <div className="text-xs text-lime-700">
                        {t.totalInterest}
                      </div>
                      <div className="mt-1 font-semibold text-lime-700">
                        +{formatINR(calculations.interest)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      {t.effectiveReturn}
                    </span>
                    <span className="font-bold text-emerald-700">
                      {calculations.effectiveReturn}%
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3 h-3" />
                  <span>{t.lockInInfo}</span>
                </div>

                {/* Year-wise Breakdown */}
                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-left">
                    <h4 className="text-xs font-semibold text-slate-900 mb-3">
                      {t.yearwiseGrowth}
                    </h4>
                    <div className="space-y-2">
                      {calculations.yearlyBreakdown.map((item) => (
                        <div
                          key={item.year}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-slate-600">
                            {t.year} {item.year}:
                          </span>
                          <div className="flex gap-3">
                            <span className="text-slate-700">
                              {t.balance}{' '}
                              <strong>{formatINR(item.balance)}</strong>
                            </span>
                            <span className="text-green-700">
                              {t.interest}{' '}
                              <strong>{formatINR(item.interestEarned)}</strong>
                            </span>
                          </div>
                        </div>
                      ))}
                      {years > 5 && (
                        <div className="text-[11px] text-slate-500 mt-2 pt-2 border-t">
                          + {years - 5} {t.moreYears}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          {t.saveCalculation}
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          {t.shareWhatsApp}
        </Button>
      </div>

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">{t.savedPPFPlans}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {t.clearAll}
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
                          {calc.mode === 'monthly'
                            ? `${formatINR(calc.monthlyContribution)}/month`
                            : `${formatINR(calc.annualContribution)}/year`}{' '}
                          @ {calc.annualRate}% for {calc.years}y
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {t.maturity} {formatINR(calc.maturity)} | {t.interest}
                          : {formatINR(calc.interest)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {t.mode}{' '}
                          {calc.mode === 'monthly' ? t.monthly : t.annual}
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
