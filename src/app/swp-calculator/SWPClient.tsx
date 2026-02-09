'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  AlertTriangle,
  Download,
  Target,
  LineChart,
  Flame,
  Receipt,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart as RechartsLineChart,
} from 'recharts';
import { cn } from '@/lib/utils';

/* ---------- TYPES ---------- */
export interface SWPLabels {
  calculatorMode: string;
  withdrawalMode: string;
  goalMode: string;
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
  targetYears: string;
  inflationRate: string;
  enableInflation: string;
  inflationAdjusted: string;
  remainingCorpus: string;
  initialCorpus: string;
  totalWithdrawn: string;
  annualWithdrawal: string;
  corpusWillLast: string;
  corpusExhausted: string;
  corpusExhaustedNote: string;
  exhaustedIn: string;
  considerReducing: string;
  yearwiseBreakdown: string;
  year: string;
  openingBalance: string;
  withdrawn: string;
  interestEarned: string;
  closingBalance: string;
  inflationNote: string;
  saveCalculation: string;
  shareWhatsApp: string;
  downloadReport: string;
  savedSWPPlans: string;
  clearAll: string;
  corpus: string;
  forYears: string;
  remaining: string;
  years: string;
  calculationSaved: string;
  calculationDeleted: string;
  allCleared: string;
  calculationLoaded: string;
  reportDownloaded: string;
  corpusDepletionChart: string;
  taxImpact: string;
  showTaxCalculator: string;
  hideTaxCalculator: string;
  fundType: string;
  equityFund: string;
  debtFund: string;
  estimatedTaxLiability: string;
  taxOnWithdrawals: string;
  netWithdrawal: string;
  taxNote: string;
  comparisonMode: string;
  compareStrategies: string;
  strategyA: string;
  strategyB: string;
  whichBetter: string;
  lastLonger: string;
  moreIncome: string;
  returnsDisclaimer: string;
  withInflation: string;
  withoutInflation: string;
  inflationImpact: string;
}

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
  mode?: 'withdrawal' | 'goal';
  inflationEnabled?: boolean;
  inflationRate?: number;
}

interface YearlyBreakdown {
  year: number;
  openingBalance: number;
  withdrawn: number;
  interestEarned: number;
  closingBalance: number;
  totalWithdrawn: number;
}

const DEFAULT_LABELS: SWPLabels = {
  calculatorMode: 'Calculator Mode',
  withdrawalMode: 'Withdrawal Planning',
  goalMode: 'Corpus Longevity',
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
  targetYears: 'Target Duration (Years)',
  inflationRate: 'Inflation Rate (% p.a)',
  enableInflation: 'Enable Inflation Adjustment',
  inflationAdjusted: 'Inflation-Adjusted Withdrawals',
  remainingCorpus: 'Remaining Corpus',
  initialCorpus: 'Initial Corpus',
  totalWithdrawn: 'Total Withdrawn',
  annualWithdrawal: 'Annual Withdrawal',
  corpusWillLast: 'Corpus Will Last',
  corpusExhausted: '⚠️ Corpus Exhausted',
  corpusExhaustedNote: 'Your corpus will be exhausted in',
  exhaustedIn: 'years',
  considerReducing:
    'Consider reducing withdrawal amount or increasing expected returns.',
  yearwiseBreakdown: 'Year-by-Year Breakdown',
  year: 'Year',
  openingBalance: 'Opening Balance',
  withdrawn: 'Withdrawn',
  interestEarned: 'Interest Earned',
  closingBalance: 'Closing Balance',
  inflationNote:
    'Assumes fixed withdrawal. Inflation reduces purchasing power over time.',
  saveCalculation: 'Save Calculation',
  shareWhatsApp: 'Share via WhatsApp',
  downloadReport: 'Download Report',
  savedSWPPlans: 'Your Saved SWP Plans',
  clearAll: 'Clear All',
  corpus: 'corpus',
  forYears: 'for',
  remaining: 'Remaining',
  years: 'years',
  calculationSaved: 'Calculation saved!',
  calculationDeleted: 'Calculation deleted!',
  allCleared: 'All calculations cleared!',
  calculationLoaded: 'Calculation loaded!',
  reportDownloaded: 'Report downloaded!',
  corpusDepletionChart: 'Corpus Depletion Over Time',
  taxImpact: 'Tax Impact Calculator',
  showTaxCalculator: 'Show Tax Calculator',
  hideTaxCalculator: 'Hide Tax Calculator',
  fundType: 'Fund Type',
  equityFund: 'Equity Fund',
  debtFund: 'Debt Fund',
  estimatedTaxLiability: 'Estimated Tax Liability',
  taxOnWithdrawals: 'Tax on Withdrawals',
  netWithdrawal: 'Net Withdrawal (After Tax)',
  taxNote:
    'Tax calculation is approximate. Actual tax may vary based on holding period and income slab.',
  comparisonMode: 'Compare Withdrawal Strategies',
  compareStrategies: 'Compare two SWP strategies side-by-side',
  strategyA: 'Strategy A - Current Plan',
  strategyB: 'Strategy B - Alternative',
  whichBetter: 'Which Strategy is Better?',
  lastLonger: 'Last Longer By',
  moreIncome: 'More Income',
  returnsDisclaimer:
    'Calculations are illustrative. Actual returns may vary based on market conditions.',
  withInflation: 'With Inflation',
  withoutInflation: 'Without Inflation',
  inflationImpact: 'Inflation Impact',
};

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

const FREQUENCY_MAP: Record<string, { label: string; months: number }> = {
  monthly: { label: 'Monthly', months: 1 },
  quarterly: { label: 'Quarterly', months: 3 },
  yearly: { label: 'Yearly', months: 12 },
};

/* ---------- COMPONENT ---------- */
export default function SWPClient({ labels }: { labels?: Partial<SWPLabels> }) {
  const t = useMemo(() => ({ ...DEFAULT_LABELS, ...labels }), [labels]);

  // ✅ Calculator Mode
  const [calculatorMode, setCalculatorMode] = useState<'withdrawal' | 'goal'>(
    'withdrawal',
  );

  // ✅ Withdrawal Mode States
  const [initialCorpus, setInitialCorpus] = useState(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(10000);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState('monthly');

  // ✅ Inflation States
  const [inflationEnabled, setInflationEnabled] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);

  // ✅ Tax Calculator States
  const [showTaxCalculator, setShowTaxCalculator] = useState(false);
  const [fundType, setFundType] = useState<'equity' | 'debt'>('equity');

  // ✅ Comparison Mode States
  const [comparisonMode, setComparisonMode] = useState(false);
  const [corpus2, setCorpus2] = useState(1000000);
  const [withdrawal2, setWithdrawal2] = useState(8000);
  const [rate2, setRate2] = useState(10);
  const [years2, setYears2] = useState(10);

  // ✅ Saved Calculations
  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  // ✅ Load saved calculations
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

  // ✅ Calculate Year-by-Year Breakdown with Inflation - FIXED
  const calculateYearlyBreakdown = useCallback(
    (
      corpus: number,
      withdrawal: number,
      rate: number,
      duration: number,
      freq: string,
      withInflation: boolean,
      inflation: number,
    ): {
      yearlyData: YearlyBreakdown[];
      finalBalance: number;
      totalWithdrawn: number;
      exhaustedInYears: number | null;
    } => {
      const monthlyRate = rate / 12 / 100;
      const withdrawalMonths = FREQUENCY_MAP[freq].months;
      const annualInflation = withInflation ? inflation / 100 : 0;

      let balance = corpus;
      let totalWithdrawn = 0;
      let currentWithdrawal = withdrawal;
      let exhaustedInYears: number | null = null;

      const yearlyData: YearlyBreakdown[] = [];

      for (let year = 1; year <= duration; year++) {
        const openingBalance = balance;
        let yearlyWithdrawn = 0;
        let yearlyInterest = 0;

        for (let month = 1; month <= 12; month++) {
          if (balance <= 0) {
            if (exhaustedInYears === null) {
              exhaustedInYears = year - 1 + (month - 1) / 12;
            }
            break;
          }

          // Apply monthly growth
          const interest = balance * monthlyRate;
          balance += interest;
          yearlyInterest += interest;

          // Withdraw at specified frequency
          if (month % withdrawalMonths === 0) {
            const actualWithdrawal = Math.min(currentWithdrawal, balance);
            balance -= actualWithdrawal;
            yearlyWithdrawn += actualWithdrawal;
            totalWithdrawn += actualWithdrawal;
          }
        }

        yearlyData.push({
          year,
          openingBalance: Math.round(openingBalance),
          withdrawn: Math.round(yearlyWithdrawn),
          interestEarned: Math.round(yearlyInterest),
          closingBalance: Math.round(Math.max(0, balance)),
          totalWithdrawn: Math.round(totalWithdrawn),
        });

        // ✅ Apply inflation adjustment at END of year for NEXT year's withdrawals
        if (withInflation && year < duration) {
          currentWithdrawal *= 1 + annualInflation;
        }

        if (balance <= 0) {
          if (exhaustedInYears === null) {
            exhaustedInYears = year;
          }
          break;
        }
      }

      return {
        yearlyData,
        finalBalance: Math.round(Math.max(0, balance)),
        totalWithdrawn: Math.round(totalWithdrawn),
        exhaustedInYears,
      };
    },
    [],
  );

  // ✅ Main Calculations
  const results = useMemo(() => {
    const breakdown = calculateYearlyBreakdown(
      initialCorpus,
      monthlyWithdrawal,
      annualRate,
      years,
      frequency,
      inflationEnabled,
      inflationRate,
    );

    const totalValue = breakdown.totalWithdrawn + breakdown.finalBalance;
    const remainingPct =
      totalValue > 0
        ? Math.round((breakdown.finalBalance / totalValue) * 100)
        : 0;
    const withdrawnPct = 100 - remainingPct;

    const annualWithdrawal =
      monthlyWithdrawal * (12 / FREQUENCY_MAP[frequency].months);

    return {
      ...breakdown,
      remainingPct,
      withdrawnPct,
      annualWithdrawal,
      isExhausted: breakdown.finalBalance === 0,
    };
  }, [
    initialCorpus,
    monthlyWithdrawal,
    annualRate,
    years,
    frequency,
    inflationEnabled,
    inflationRate,
    calculateYearlyBreakdown,
  ]);

  // ✅ Comparison Calculations
  const results2 = useMemo(() => {
    if (!comparisonMode) return null;

    const breakdown = calculateYearlyBreakdown(
      corpus2,
      withdrawal2,
      rate2,
      years2,
      frequency,
      inflationEnabled,
      inflationRate,
    );

    const totalValue = breakdown.totalWithdrawn + breakdown.finalBalance;
    const remainingPct =
      totalValue > 0
        ? Math.round((breakdown.finalBalance / totalValue) * 100)
        : 0;
    const withdrawnPct = 100 - remainingPct;

    return {
      ...breakdown,
      remainingPct,
      withdrawnPct,
      isExhausted: breakdown.finalBalance === 0,
    };
  }, [
    comparisonMode,
    corpus2,
    withdrawal2,
    rate2,
    years2,
    frequency,
    inflationEnabled,
    inflationRate,
    calculateYearlyBreakdown,
  ]);

  // ✅ Tax Calculations - FIXED
  const taxCalculations = useMemo(() => {
    if (!showTaxCalculator) return null;

    // ✅ Use results.totalWithdrawn / years directly instead of storing in variable
    let taxLiability = 0;

    if (fundType === 'equity') {
      // Assume 50% is capital gains, 50% is capital returned
      const capitalGains = results.totalWithdrawn * 0.5;
      const annualGains = capitalGains / years;
      const taxableGains = Math.max(0, annualGains - 125000);
      taxLiability = taxableGains * 0.125 * years;
    } else {
      // Debt: Assume 30% tax slab
      const capitalGains = results.totalWithdrawn * 0.5;
      taxLiability = capitalGains * 0.3;
    }

    const netWithdrawal = results.totalWithdrawn - taxLiability;

    return {
      taxLiability: Math.round(taxLiability),
      netWithdrawal: Math.round(netWithdrawal),
      effectiveTaxRate:
        results.totalWithdrawn > 0
          ? (taxLiability / results.totalWithdrawn) * 100
          : 0,
    };
  }, [showTaxCalculator, results.totalWithdrawn, years, fundType]);

  // ✅ Memoized callback functions
  const handleReset = useCallback(() => {
    setInitialCorpus(1000000);
    setMonthlyWithdrawal(10000);
    setAnnualRate(8);
    setYears(10);
    setFrequency('monthly');
    setInflationEnabled(false);
    setInflationRate(6);
    toast.success('Calculator reset to defaults!');
  }, []);

  const handleSave = useCallback(() => {
    const calc: SavedCalculation = {
      id: Date.now(),
      initialCorpus,
      monthlyWithdrawal,
      annualRate,
      years,
      frequency,
      remaining: results.finalBalance,
      withdrawn: results.totalWithdrawn,
      date: new Date().toISOString(),
      mode: calculatorMode,
      inflationEnabled,
      inflationRate,
    };

    setSavedCalculations((prev) => {
      const updated = [calc, ...prev].slice(0, 10);
      try {
        localStorage.setItem('swp_calculator_history', JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving SWP calculation:', error);
      }
      return updated;
    });

    toast.success(t.calculationSaved);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'swp_calculation_saved', {
        corpus: initialCorpus,
        withdrawal: monthlyWithdrawal,
        years,
        mode: calculatorMode,
      });
    }
  }, [
    initialCorpus,
    monthlyWithdrawal,
    annualRate,
    years,
    frequency,
    results.finalBalance,
    results.totalWithdrawn,
    calculatorMode,
    inflationEnabled,
    inflationRate,
    t.calculationSaved,
  ]);

  const handleShare = useCallback(() => {
    const message =
      `💰 Systematic Withdrawal Plan (SWP) Calculation\n\n` +
      `Initial Corpus: ${formatINR(initialCorpus)}\n` +
      `${FREQUENCY_MAP[frequency].label} Withdrawal: ${formatINR(monthlyWithdrawal)}\n` +
      `Expected Return: ${annualRate}% p.a.\n` +
      `Time Period: ${years} years\n` +
      `${inflationEnabled ? `Inflation-Adjusted @ ${inflationRate}%\n` : ''}\n` +
      `📊 Results:\n` +
      `Total Withdrawn: ${formatINR(results.totalWithdrawn)}\n` +
      `Remaining Corpus: ${formatINR(results.finalBalance)}\n` +
      `${results.isExhausted ? `⚠️ Corpus exhausted in ${results.exhaustedInYears?.toFixed(1)} years` : '✅ Corpus sustains full period'}\n\n` +
      `Calculate yours: https://fincado.com/swp-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'swp_calculation_shared', {
        method: 'whatsapp',
      });
    }
  }, [
    initialCorpus,
    monthlyWithdrawal,
    annualRate,
    years,
    frequency,
    inflationEnabled,
    inflationRate,
    results.totalWithdrawn,
    results.finalBalance,
    results.isExhausted,
    results.exhaustedInYears,
  ]);

  const handleDownloadReport = useCallback(() => {
    let csvContent =
      'Year,Opening Balance,Withdrawn,Interest Earned,Closing Balance,Total Withdrawn\n';

    results.yearlyData.forEach((row) => {
      csvContent += `${row.year},${row.openingBalance},${row.withdrawn},${row.interestEarned},${row.closingBalance},${row.totalWithdrawn}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swp-breakdown-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success(t.reportDownloaded);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'swp_report_downloaded', {
        mode: calculatorMode,
      });
    }
  }, [results.yearlyData, calculatorMode, t.reportDownloaded]);

  const handleDelete = useCallback(
    (id: number) => {
      setSavedCalculations((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        try {
          localStorage.setItem(
            'swp_calculator_history',
            JSON.stringify(updated),
          );
        } catch (error) {
          console.error('Error updating SWP history:', error);
        }
        return updated;
      });

      toast.success(t.calculationDeleted);
    },
    [t.calculationDeleted],
  );

  const handleClearAll = useCallback(() => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('swp_calculator_history');
    } catch (error) {
      console.error('Error clearing SWP history:', error);
    }
    toast.success(t.allCleared);
  }, [t.allCleared]);

  const handleLoad = useCallback(
    (calc: SavedCalculation) => {
      setCalculatorMode(calc.mode || 'withdrawal');
      setInitialCorpus(calc.initialCorpus);
      setMonthlyWithdrawal(calc.monthlyWithdrawal);
      setAnnualRate(calc.annualRate);
      setYears(calc.years);
      setFrequency(calc.frequency);
      setInflationEnabled(calc.inflationEnabled || false);
      setInflationRate(calc.inflationRate || 6);
      toast.success(t.calculationLoaded);
    },
    [t.calculationLoaded],
  );

  return (
    <div className="space-y-6">
      {/* ✅ Mode Selector */}
      <Card className="bg-card">
        <CardContent className="p-4">
          <Tabs
            value={calculatorMode}
            onValueChange={(v) => setCalculatorMode(v as 'withdrawal' | 'goal')}
          >
            <TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-slate-100">
              <TabsTrigger
                value="withdrawal"
                className={cn(
                  'flex items-center gap-2 font-semibold transition-all',
                  'data-[state=active]:bg-lime-600 data-[state=active]:text-white data-[state=active]:shadow-md',
                  'data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-900',
                )}
              >
                <TrendingDown className="h-4 w-4" />
                <span className="hidden sm:inline">{t.withdrawalMode}</span>
                <span className="sm:hidden">Withdrawal</span>
              </TabsTrigger>
              <TabsTrigger
                value="goal"
                className={cn(
                  'flex items-center gap-2 font-semibold transition-all',
                  'data-[state=active]:bg-lime-600 data-[state=active]:text-white data-[state=active]:shadow-md',
                  'data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-900',
                )}
              >
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">{t.goalMode}</span>
                <span className="sm:hidden">Longevity</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* ✅ Comparison Mode Toggle */}
      {calculatorMode === 'withdrawal' && (
        <Card className="border-2 border-slate-200 bg-white">
          <CardContent className="py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className={cn(
                      'absolute inset-0 rounded-full blur-md transition-all',
                      comparisonMode ? 'bg-purple-300' : 'bg-slate-200',
                    )}
                  />
                  <Switch
                    checked={comparisonMode}
                    onCheckedChange={setComparisonMode}
                    id="comparison-mode"
                    className={cn(
                      'relative scale-125',
                      'data-[state=checked]:bg-purple-600',
                      'data-[state=unchecked]:bg-slate-400',
                      'shadow-lg',
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="comparison-mode"
                    className="text-base font-bold text-slate-900 cursor-pointer flex items-center gap-2"
                  >
                    <span>{t.comparisonMode}</span>
                  </label>
                  <p className="text-xs text-slate-600">
                    {t.compareStrategies}
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                  comparisonMode
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-200'
                    : 'bg-slate-100 text-slate-500 border-2 border-slate-200',
                )}
              >
                {comparisonMode ? '✓ Active' : 'Inactive'}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Warning Banner */}
      {results.isExhausted && !comparisonMode && (
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
                  <strong>
                    {results.exhaustedInYears?.toFixed(1)} {t.exhaustedIn}
                  </strong>
                  . {t.considerReducing}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ✅ Main Calculator(s) */}
      {!comparisonMode ? (
        // Single Calculator
        <Card className="bg-card">
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
              {/* INPUTS */}
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
                  label={
                    calculatorMode === 'goal' ? t.targetYears : t.timePeriod
                  }
                  value={years}
                  min={1}
                  max={30}
                  step={1}
                  onChange={setYears}
                />

                {/* ✅ Inflation Toggle - SUBTLE BUT VISIBLE */}
                <Card className="border-orange-200 bg-linear-to-r from-orange-50/50 to-amber-50/50">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={inflationEnabled}
                          onCheckedChange={setInflationEnabled}
                          id="inflation-toggle"
                          className={cn(
                            'scale-110',
                            'data-[state=checked]:bg-orange-600',
                            'data-[state=unchecked]:bg-slate-400',
                            'shadow-md',
                          )}
                        />

                        <label
                          htmlFor="inflation-toggle"
                          className="text-sm font-semibold text-slate-900 cursor-pointer flex items-center gap-2"
                        >
                          <Flame className="h-4 w-4 text-orange-600" />
                          <span>{t.inflationAdjusted}</span>
                        </label>
                      </div>

                      {inflationEnabled && (
                        <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
                          Active
                        </span>
                      )}
                    </div>

                    {inflationEnabled && (
                      <div className="mt-3 pt-3 border-t border-orange-200">
                        <CalculatorField
                          label={t.inflationRate}
                          value={inflationRate}
                          min={1}
                          max={15}
                          step={0.1}
                          onChange={setInflationRate}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* VISUALS */}
              <div className="flex flex-col items-center justify-center">
                <EMIPieChart
                  principalPct={results.remainingPct}
                  interestPct={results.withdrawnPct}
                  size={200}
                />

                <div className="mt-6 text-center w-full">
                  <div className="text-sm text-muted-foreground">
                    {t.remainingCorpus}
                  </div>

                  <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-700">
                    {formatINR(results.finalBalance)}
                  </div>

                  {results.isExhausted && (
                    <div className="mt-2 text-sm font-semibold text-red-600">
                      {t.corpusWillLast}: {results.exhaustedInYears?.toFixed(1)}{' '}
                      {t.years}
                    </div>
                  )}

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                    <Card className="border-border">
                      <CardContent className="p-4">
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {t.initialCorpus}
                        </div>
                        <div className="mt-1 font-semibold text-foreground whitespace-nowrap">
                          {formatINR(initialCorpus)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-lime-200 bg-lime-50 dark:bg-lime-900/20 dark:border-lime-900">
                      <CardContent className="p-4">
                        <div className="text-xs text-lime-700 dark:text-lime-400">
                          {t.totalWithdrawn}
                        </div>
                        <div className="mt-1 font-semibold text-lime-700 dark:text-lime-400 whitespace-nowrap">
                          {formatINR(results.totalWithdrawn)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* ✅ ANNUAL WITHDRAWAL DISPLAY - FIXED */}
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-700">
                        {t.annualWithdrawal}:
                      </span>
                      <span className="font-bold text-blue-700">
                        {formatINR(results.annualWithdrawal)}
                      </span>
                    </div>
                    {inflationEnabled && (
                      <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-blue-200">
                        💡 {t.inflationImpact}: Year 1:{' '}
                        {formatINR(results.annualWithdrawal)} → Year {years}:{' '}
                        {formatINR(
                          results.annualWithdrawal *
                            Math.pow(1 + inflationRate / 100, years - 1),
                        )}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 text-xs text-slate-500">
                    {t.returnsDisclaimer}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Comparison Mode - Two Calculators
        <div className="grid md:grid-cols-2 gap-6">
          {/* Strategy A */}
          <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                  A
                </span>
                {t.strategyA}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className="pt-4 border-t border-emerald-200">
                <div className="text-center">
                  <div className="text-xs text-slate-600">
                    {t.remainingCorpus}
                  </div>
                  <div className="text-2xl font-bold text-emerald-700 mt-1">
                    {formatINR(results.finalBalance)}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    {t.totalWithdrawn}
                  </div>
                  <div className="text-lg font-semibold text-lime-600">
                    {formatINR(results.totalWithdrawn)}
                  </div>
                  {results.isExhausted && (
                    <div className="text-xs text-red-600 mt-2">
                      Exhausted in {results.exhaustedInYears?.toFixed(1)}y
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategy B */}
          <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                  B
                </span>
                {t.strategyB}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalculatorField
                label={t.initialInvestment}
                value={corpus2}
                min={100000}
                max={10000000}
                step={50000}
                onChange={setCorpus2}
              />

              <CalculatorField
                label={t.withdrawalAmount}
                value={withdrawal2}
                min={1000}
                max={200000}
                step={500}
                onChange={setWithdrawal2}
              />

              <CalculatorField
                label={t.expectedReturn}
                value={rate2}
                min={1}
                max={20}
                step={0.1}
                onChange={setRate2}
              />

              <CalculatorField
                label={t.timePeriod}
                value={years2}
                min={1}
                max={30}
                step={1}
                onChange={setYears2}
              />

              <div className="pt-4 border-t border-blue-200">
                <div className="text-center">
                  <div className="text-xs text-slate-600">
                    {t.remainingCorpus}
                  </div>
                  <div className="text-2xl font-bold text-blue-700 mt-1">
                    {formatINR(results2?.finalBalance || 0)}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    {t.totalWithdrawn}
                  </div>
                  <div className="text-lg font-semibold text-lime-600">
                    {formatINR(results2?.totalWithdrawn || 0)}
                  </div>
                  {results2?.isExhausted && (
                    <div className="text-xs text-red-600 mt-2">
                      Exhausted in {results2.exhaustedInYears?.toFixed(1)}y
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ✅ Comparison Summary */}
      {comparisonMode && results2 && (
        <Card className="border-purple-200 bg-linear-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-lg">{t.whichBetter}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-slate-600 mb-1">
                  {t.totalWithdrawn}
                </div>
                <div
                  className={`text-xl font-bold ${results.totalWithdrawn > results2.totalWithdrawn ? 'text-emerald-600' : 'text-blue-600'}`}
                >
                  {formatINR(
                    Math.abs(results.totalWithdrawn - results2.totalWithdrawn),
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {t.moreIncome}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-600 mb-1">
                  {t.remainingCorpus}
                </div>
                <div
                  className={`text-xl font-bold ${results.finalBalance > results2.finalBalance ? 'text-emerald-600' : 'text-blue-600'}`}
                >
                  {formatINR(
                    Math.abs(results.finalBalance - results2.finalBalance),
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-600 mb-1">Winner</div>
                <div className="text-xl font-bold">
                  {results.finalBalance > results2.finalBalance ? (
                    <span className="text-emerald-600">{t.strategyA} 🏆</span>
                  ) : (
                    <span className="text-blue-600">{t.strategyB} 🏆</span>
                  )}
                </div>
              </div>
            </div>

            {results.exhaustedInYears && results2.exhaustedInYears && (
              <p className="text-xs text-center text-slate-600 pt-2 border-t">
                {results.exhaustedInYears > results2.exhaustedInYears
                  ? `${t.strategyA} ${t.lastLonger} ${(results.exhaustedInYears - results2.exhaustedInYears).toFixed(1)} ${t.years}`
                  : `${t.strategyB} ${t.lastLonger} ${(results2.exhaustedInYears - results.exhaustedInYears).toFixed(1)} ${t.years}`}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* ✅ Corpus Depletion Chart */}
      {isClient && results.yearlyData && results.yearlyData.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LineChart className="h-5 w-5 text-purple-600" />
              {t.corpusDepletionChart}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={results.yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="year"
                  label={{
                    value: t.year,
                    position: 'insideBottom',
                    offset: -5,
                  }}
                />
                <YAxis
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  formatter={(value: number | undefined) =>
                    value !== undefined ? formatINR(value) : 'N/A'
                  }
                  labelFormatter={(label) => `${t.year} ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="closingBalance"
                  name={t.remainingCorpus}
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="totalWithdrawn"
                  name={t.totalWithdrawn}
                  stroke="#84cc16"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* ✅ Year-by-Year Breakdown Table */}
      {isClient && results.yearlyData && results.yearlyData.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">{t.yearwiseBreakdown}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 font-semibold">{t.year}</th>
                    <th className="text-right p-3 font-semibold">
                      {t.openingBalance}
                    </th>
                    <th className="text-right p-3 font-semibold text-red-600">
                      {t.withdrawn}
                    </th>
                    <th className="text-right p-3 font-semibold">
                      {t.interestEarned}
                    </th>
                    <th className="text-right p-3 font-semibold text-emerald-600">
                      {t.closingBalance}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyData.map((row, idx) => (
                    <tr
                      key={row.year}
                      className={`border-b border-slate-100 ${
                        idx % 2 === 0 ? 'bg-slate-50/50' : ''
                      }`}
                    >
                      <td className="p-3 font-medium">{row.year}</td>
                      <td className="p-3 text-right">
                        {formatINR(row.openingBalance)}
                      </td>
                      <td className="p-3 text-right text-red-600">
                        {formatINR(row.withdrawn)}
                      </td>
                      <td className="p-3 text-right text-emerald-600">
                        {formatINR(row.interestEarned)}
                      </td>
                      <td className="p-3 text-right font-semibold text-emerald-600">
                        {formatINR(row.closingBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ✅ Tax Calculator */}
      {!comparisonMode && (
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Receipt className="h-5 w-5 text-indigo-600" />
                {t.taxImpact}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTaxCalculator(!showTaxCalculator)}
                className="text-xs"
              >
                {showTaxCalculator ? t.hideTaxCalculator : t.showTaxCalculator}
              </Button>
            </div>
          </CardHeader>

          {showTaxCalculator && (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t.fundType}</Label>
                <Select
                  value={fundType}
                  onValueChange={(v) => setFundType(v as 'equity' | 'debt')}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equity">{t.equityFund}</SelectItem>
                    <SelectItem value="debt">{t.debtFund}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {taxCalculations && (
                <>
                  {/* ✅ ADD THIS - Shows Annual Withdrawal in Tax Section */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-700">
                        {t.annualWithdrawal}:
                      </span>
                      <span className="font-bold text-blue-700">
                        {formatINR(results.totalWithdrawn / years)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="border-indigo-200 bg-white">
                      <CardContent className="p-4">
                        <div className="text-xs text-slate-600">
                          {t.totalWithdrawn}
                        </div>
                        <div className="mt-1 font-bold text-slate-900">
                          {formatINR(results.totalWithdrawn)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="text-xs text-red-700">
                          {t.taxOnWithdrawals}
                        </div>
                        <div className="mt-1 font-bold text-red-700">
                          -{formatINR(taxCalculations.taxLiability)}
                        </div>
                        <div className="text-[10px] text-red-600 mt-0.5">
                          ({taxCalculations.effectiveTaxRate.toFixed(1)}%)
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-emerald-200 bg-emerald-50">
                      <CardContent className="p-4">
                        <div className="text-xs text-emerald-700">
                          {t.netWithdrawal}
                        </div>
                        <div className="mt-1 font-bold text-emerald-700">
                          {formatINR(taxCalculations.netWithdrawal)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              <p className="text-xs text-slate-500 mt-3 p-3 bg-slate-50 rounded border border-slate-200">
                💡 {t.taxNote}
              </p>
            </CardContent>
          )}
        </Card>
      )}

      {/* ✅ Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          {t.saveCalculation}
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          {t.shareWhatsApp}
        </Button>

        <Button onClick={handleDownloadReport} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          {t.downloadReport}
        </Button>
      </div>

      {/* ✅ Saved Calculations History */}
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
                          {calc.inflationEnabled && (
                            <span className="text-xs text-orange-600 ml-1">
                              ({t.withInflation})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {calc.annualRate}% {t.forYears} {calc.years}y |{' '}
                          {t.remaining} {formatINR(calc.remaining)}
                        </div>
                        <div className="text-[11px] text-red-600 mt-0.5">
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
