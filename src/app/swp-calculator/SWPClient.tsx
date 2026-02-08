'use client';

import React, { useMemo, useState, useEffect } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
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
  TrendingDown,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Calculator,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
interface SWPLabels {
  corpusExhausted: string;
  corpusExhaustedNote: string;
  exhaustedIn: string;
  considerReducing: string;
  swpCalculator: string;
  reset: string;
  initialInvestment: string;
  withdrawalAmount: string;
  withdrawalFrequency: string;
  monthly: string;
  quarterly: string;
  yearly: string;
  expectedReturn: string;
  timePeriod: string;
  showBreakdown: string;
  hideBreakdown: string;
  remainingCorpus: string;
  initialCorpus: string;
  totalWithdrawn: string;
  annualWithdrawal: string;
  yearwiseBreakdown: string;
  year: string;
  balance: string;
  withdrawn: string;
  moreYearsRemaining: string;
  inflationNote: string;
  saveCalculation: string;
  shareWhatsApp: string;
  savedSWPPlans: string;
  clearAll: string;
  corpus: string;
  forYears: string;
  remaining: string;
}

const DEFAULT_LABELS: SWPLabels = {
  corpusExhausted: '⚠️ Corpus Exhausted',
  corpusExhaustedNote: 'Your corpus will be exhausted in',
  exhaustedIn:
    'years. Consider reducing withdrawal amount or increasing expected returns.',
  considerReducing:
    'Consider reducing withdrawal amount or increasing expected returns.',
  swpCalculator: 'SWP Calculator',
  reset: 'Reset',
  initialInvestment: 'Initial Investment (₹)',
  withdrawalAmount: 'Withdrawal Amount (₹)',
  withdrawalFrequency: 'Withdrawal Frequency',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  yearly: 'Yearly',
  expectedReturn: 'Expected Return (% p.a)',
  timePeriod: 'Time Period (Years)',
  showBreakdown: 'Show Year-wise Breakdown',
  hideBreakdown: 'Hide Year-wise Breakdown',
  remainingCorpus: 'Remaining Corpus',
  initialCorpus: 'Initial Corpus',
  totalWithdrawn: 'Total Withdrawn',
  annualWithdrawal: 'Annual Withdrawal:',
  yearwiseBreakdown: 'Year-wise Breakdown (First 5 Years)',
  year: 'Year',
  balance: 'Balance:',
  withdrawn: 'Withdrawn:',
  moreYearsRemaining: 'more years remaining',
  inflationNote:
    'Assumes fixed withdrawal. Inflation reduces purchasing power over time.',
  saveCalculation: 'Save Calculation',
  shareWhatsApp: 'Share via WhatsApp',
  savedSWPPlans: 'Your Saved SWP Plans',
  clearAll: 'Clear All',
  corpus: 'corpus',
  forYears: 'for',
  remaining: 'Remaining:',
};

interface SavedCalculation {
  id: number;
  initialCorpus: number;
  monthlyWithdrawal: number;
  annualRate: number;
  years: number;
  frequency: string;
  remaining: number;
  withdrawn: number;
  date: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

const FREQUENCY_MAP: Record<string, { label: string; months: number }> = {
  monthly: { label: 'Monthly', months: 1 },
  quarterly: { label: 'Quarterly', months: 3 },
  yearly: { label: 'Yearly', months: 12 },
};

export default function SWPClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<SWPLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [initialCorpus, setInitialCorpus] = useState(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(10000);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState('monthly');
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
      const saved = localStorage.getItem('swp_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved SWP calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'SWP',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const totalMonths = years * 12;
    const withdrawalMonths = FREQUENCY_MAP[frequency].months;
    const monthlyRate = annualRate / 12 / 100;

    let balance = initialCorpus;
    let totalWithdrawn = 0;
    let monthsUntilExhausted = 0;

    // Year-wise breakdown for first 5 years
    const yearlyBreakdown: Array<{
      year: number;
      balance: number;
      withdrawn: number;
      totalWithdrawn: number;
    }> = [];

    for (let month = 1; month <= totalMonths; month++) {
      // Apply monthly growth
      balance += balance * monthlyRate;

      // Withdraw at specified frequency
      if (month % withdrawalMonths === 0) {
        const withdrawal = Math.min(monthlyWithdrawal, balance);
        balance -= withdrawal;
        totalWithdrawn += withdrawal;
      }

      // Track exhaustion point
      if (balance <= 0) {
        balance = 0;
        if (monthsUntilExhausted === 0) {
          monthsUntilExhausted = month;
        }
        break;
      }

      // Record year-end data for first 5 years
      if (month % 12 === 0 && month / 12 <= 5) {
        yearlyBreakdown.push({
          year: month / 12,
          balance: Math.round(balance),
          withdrawn: Math.round(
            totalWithdrawn -
              (month === 12
                ? 0
                : yearlyBreakdown[yearlyBreakdown.length - 1]?.totalWithdrawn ||
                  0),
          ),
          totalWithdrawn: Math.round(totalWithdrawn),
        });
      }
    }

    const remaining = Math.round(balance);
    const withdrawn = Math.round(totalWithdrawn);
    const totalValue = withdrawn + remaining;
    const remainingPct =
      totalValue > 0 ? Math.round((remaining / totalValue) * 100) : 0;
    const withdrawnPct = 100 - remainingPct;

    const isExhausted = remaining === 0;
    const exhaustedInYears =
      monthsUntilExhausted > 0 ? (monthsUntilExhausted / 12).toFixed(1) : null;

    return {
      remaining,
      withdrawn,
      remainingPct,
      withdrawnPct,
      isExhausted,
      exhaustedInYears,
      yearlyBreakdown,
      annualWithdrawal: monthlyWithdrawal * (12 / withdrawalMonths),
    };
  }, [initialCorpus, monthlyWithdrawal, annualRate, years, frequency]);

  /* ---------- HANDLERS ---------- */
  const handleReset = () => {
    setInitialCorpus(1000000);
    setMonthlyWithdrawal(10000);
    setAnnualRate(8);
    setYears(10);
    setFrequency('monthly');
    toast.success('Calculator reset to defaults!');
  };

  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      initialCorpus,
      monthlyWithdrawal,
      annualRate,
      years,
      frequency,
      remaining: results.remaining,
      withdrawn: results.withdrawn,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('swp_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving SWP calculation:', error);
    }

    toast.success('SWP calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'swp_calculation_saved', {
        corpus: initialCorpus,
        withdrawal: monthlyWithdrawal,
        years,
      });
    }
  };

  const handleShare = () => {
    const message =
      `💰 Systematic Withdrawal Plan (SWP) Calculation\n\n` +
      `Initial Corpus: ${formatINR(initialCorpus)}\n` +
      `${FREQUENCY_MAP[frequency].label} Withdrawal: ${formatINR(monthlyWithdrawal)}\n` +
      `Expected Return: ${annualRate}% p.a.\n` +
      `Time Period: ${years} years\n\n` +
      `📊 Results:\n` +
      `Total Withdrawn: ${formatINR(results.withdrawn)}\n` +
      `Remaining Corpus: ${formatINR(results.remaining)}\n` +
      `${results.isExhausted ? `⚠️ Corpus exhausted in ${results.exhaustedInYears} years` : '✅ Corpus sustains full period'}\n\n` +
      `Calculate yours: https://fincado.com/swp-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'swp_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('swp_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating SWP history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('swp_calculator_history');
    } catch (error) {
      console.error('Error clearing SWP history:', error);
    }
    toast.success('All SWP calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setInitialCorpus(calc.initialCorpus);
    setMonthlyWithdrawal(calc.monthlyWithdrawal);
    setAnnualRate(calc.annualRate);
    setYears(calc.years);
    setFrequency(calc.frequency);
    toast.success('Calculation loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      {results.isExhausted && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-900 mb-1">
                  {t.corpusExhausted}
                </h3>
                <p className="text-xs text-slate-700">
                  {t.corpusExhaustedNote}{' '}
                  <strong>{results.exhaustedInYears} years</strong>.{' '}
                  {t.considerReducing}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Calculator */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <TrendingDown className="h-5 w-5 text-lime-600" />
              {t.swpCalculator}
            </CardTitle>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 flex items-center gap-1 hover:text-lime-600 transition-colors"
            >
              <RefreshCcw className="w-3 h-3" /> {t.reset}
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* ---------- INPUTS ---------- */}
            <div className="space-y-6">
              <CalculatorField
                label={t.initialInvestment}
                value={initialCorpus}
                min={100000}
                max={10000000}
                step={50000}
                onChange={setInitialCorpus}
              />

              <CalculatorField
                label={t.withdrawalAmount}
                value={monthlyWithdrawal}
                min={1000}
                max={200000}
                step={500}
                onChange={setMonthlyWithdrawal}
              />

              <div className="space-y-2">
                <Label>{t.withdrawalFrequency}</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">{t.monthly}</SelectItem>
                    <SelectItem value="quarterly">{t.quarterly}</SelectItem>
                    <SelectItem value="yearly">{t.yearly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <CalculatorField
                label={t.expectedReturn}
                value={annualRate}
                min={1}
                max={20}
                step={0.1}
                onChange={setAnnualRate}
              />

              <CalculatorField
                label={t.timePeriod}
                value={years}
                min={1}
                max={30}
                step={1}
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
                principalPct={results.remainingPct}
                interestPct={results.withdrawnPct}
                size={200}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-slate-500">
                  {t.remainingCorpus}
                </div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                  {formatINR(results.remaining)}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="text-xs text-slate-500">
                        {t.initialCorpus}
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {formatINR(initialCorpus)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-lime-200 bg-lime-50">
                    <CardContent className="p-4">
                      <div className="text-xs text-lime-700">
                        {t.totalWithdrawn}
                      </div>
                      <div className="mt-1 font-semibold text-lime-700">
                        {formatINR(results.withdrawn)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">{t.annualWithdrawal}</span>
                    <span className="font-bold text-blue-700">
                      {formatINR(results.annualWithdrawal)}
                    </span>
                  </div>
                </div>

                {/* Year-wise Breakdown */}
                {showAdvanced && results.yearlyBreakdown.length > 0 && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-left">
                    <h4 className="text-xs font-semibold text-slate-900 mb-3">
                      {t.yearwiseBreakdown}
                    </h4>
                    <div className="space-y-2">
                      {results.yearlyBreakdown.map((item) => (
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
                            <span className="text-lime-700">
                              {t.withdrawn}{' '}
                              <strong>{formatINR(item.totalWithdrawn)}</strong>
                            </span>
                          </div>
                        </div>
                      ))}
                      {years > 5 && !results.isExhausted && (
                        <div className="text-[11px] text-slate-500 mt-2 pt-2 border-t">
                          + {years - 5} {t.moreYearsRemaining}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <p className="mt-4 text-xs text-center text-slate-400">
                  {t.inflationNote}
                </p>
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
            <CardTitle className="text-lg">{t.savedSWPPlans}</CardTitle>
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
                          {formatINR(calc.initialCorpus)} {t.corpus} |{' '}
                          {formatINR(calc.monthlyWithdrawal)}/
                          {FREQUENCY_MAP[calc.frequency].label}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {calc.annualRate}% {t.forYears} {calc.years}y |{' '}
                          {t.remaining} {formatINR(calc.remaining)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {t.withdrawn} {formatINR(calc.withdrawn)}
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
