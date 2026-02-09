'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookmarkIcon,
  Share2Icon,
  TrendingUp,
  Trash2,
  Percent,
  Download,
  Target,
  LineChart,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

/* ---------- TYPES ---------- */
export interface SIPLabels {
  investmentMode: string;
  goalBasedMode: string;
  monthlySIP: string;
  investmentPeriod: string;
  expectedReturn: string;
  stepUpSIP: string;
  noIncrease: string;
  perYear: string;
  stepUpNote: string;
  targetAmount: string;
  timeToAchieveGoal: string;
  requiredMonthlySIP: string;
  investThisAmount: string;
  yourTargetAmount: string;
  estimatedMaturityAmount: string;
  totalAmountInvested: string;
  wealthGain: string;
  withAnnualStepUp: string;
  returnsDisclaimer: string;
  investmentGrowthOverTime: string;
  year: string;
  yearByYearBreakdown: string;
  yearlyInvestment: string;
  cumulativeInvestment: string;
  interestEarned: string;
  maturityAmount: string;
  saveCalculation: string;
  shareWhatsApp: string;
  downloadReport: string;
  savedSIPPlans: string;
  clearAll: string;
  month: string;
  forYears: string;
  stepUpPercent: string;
  invested: string;
  maturity: string;
  gain: string;
  calculationSaved: string;
  reportDownloaded: string;
  calculationDeleted: string;
  allCalculationsCleared: string;
  calculationLoaded: string;
}

export interface SIPClientProps {
  labels?: Partial<SIPLabels>;
}

const DEFAULT_LABELS: SIPLabels = {
  investmentMode: 'Investment Mode',
  goalBasedMode: 'Goal-Based Mode',
  monthlySIP: 'Monthly SIP Amount (₹)',
  investmentPeriod: 'Investment Period (Years)',
  expectedReturn: 'Expected Annual Return (%)',
  stepUpSIP: 'Step-Up SIP (% increase per year)',
  noIncrease: '0% (No increase)',
  perYear: '% per year',
  stepUpNote:
    '✨ Your SIP will increase by {percent}% each year, helping you invest more as your income grows!',
  targetAmount: 'Target Amount (₹)',
  timeToAchieveGoal: 'Time to Achieve Goal (Years)',
  requiredMonthlySIP: 'Required Monthly SIP',
  investThisAmount: 'Invest this amount monthly to reach your goal of {amount}',
  yourTargetAmount: 'Your Target Amount',
  estimatedMaturityAmount: 'Estimated Maturity Amount',
  totalAmountInvested: 'Total Amount Invested',
  wealthGain: 'Wealth Gain (Profit)',
  withAnnualStepUp: 'With {percent}% annual step-up',
  returnsDisclaimer:
    'Returns are illustrative and subject to market conditions',
  investmentGrowthOverTime: 'Investment Growth Over Time',
  year: 'Year',
  yearByYearBreakdown: 'Year-by-Year Breakdown',
  yearlyInvestment: 'Yearly Investment',
  cumulativeInvestment: 'Cumulative Investment',
  interestEarned: 'Interest Earned',
  maturityAmount: 'Maturity Amount',
  saveCalculation: 'Save Calculation',
  shareWhatsApp: 'Share via WhatsApp',
  downloadReport: 'Download Report',
  savedSIPPlans: 'Your Saved SIP Plans',
  clearAll: 'Clear All',
  month: '/ month',
  forYears: 'for',
  stepUpPercent: 'Step-up {percent}%',
  invested: 'Invested:',
  maturity: 'Maturity:',
  gain: 'Gain:',
  calculationSaved: 'SIP calculation saved!',
  reportDownloaded: 'Report downloaded!',
  calculationDeleted: 'Calculation deleted!',
  allCalculationsCleared: 'All SIP calculations cleared!',
  calculationLoaded: 'Calculation loaded!',
};

interface SavedCalculation {
  id: number;
  monthlySip: number;
  rate: number;
  years: number;
  totalInvested: number;
  maturityAmount: number;
  wealthGain: number;
  date: string;
  stepUpPercent?: number;
}

interface YearlyBreakdown {
  year: number;
  yearlyInvestment: number;
  cumulativeInvestment: number;
  interestEarned: number;
  cumulativeMaturity: number;
}

interface CalculationResults {
  totalInvested: number;
  maturityAmount: number;
  wealthGain: number;
  yearlyBreakdown: YearlyBreakdown[];
  principalPct: number;
  gainPct: number;
  requiredSip?: number;
}

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

export default function SIPCalculatorClient({ labels }: SIPClientProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  const [calculatorMode, setCalculatorMode] = useState<'investment' | 'goal'>(
    'investment',
  );

  // Investment mode inputs
  const [monthlySip, setMonthlySip] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [stepUpPercent, setStepUpPercent] = useState(0);

  // Goal mode inputs
  const [targetAmount, setTargetAmount] = useState(5000000);
  const [goalYears, setGoalYears] = useState(10);
  const [goalRate, setGoalRate] = useState(12);

  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const loadData = () => {
      try {
        const saved = localStorage.getItem('sip_calculator_history');
        if (saved) {
          setSavedCalculations(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading saved SIP calculations:', error);
      }
    };
    loadData();
  }, [isClient]);

  // Calculate Step-Up SIP with yearly breakdown
  const calculateStepUpSIP = (
    initialSip: number,
    annualRate: number,
    totalYears: number,
    stepUp: number,
  ) => {
    const monthlyRate = annualRate / 12 / 100;
    const yearlyBreakdown: YearlyBreakdown[] = [];
    let cumulativeInvestment = 0;
    let cumulativeMaturity = 0;

    for (let year = 1; year <= totalYears; year++) {
      const yearSipAmount = initialSip * Math.pow(1 + stepUp / 100, year - 1);
      const yearlyInvestment = yearSipAmount * 12;

      let yearMaturity = 0;
      const remainingMonths = (totalYears - year + 1) * 12;

      for (let month = 0; month < 12; month++) {
        const monthsToGrow = remainingMonths - month;
        if (monthlyRate === 0) {
          yearMaturity += yearSipAmount;
        } else {
          yearMaturity +=
            yearSipAmount * Math.pow(1 + monthlyRate, monthsToGrow);
        }
      }

      cumulativeInvestment += yearlyInvestment;
      cumulativeMaturity += yearMaturity;

      const interestEarned = cumulativeMaturity - cumulativeInvestment;

      yearlyBreakdown.push({
        year,
        yearlyInvestment: Math.round(yearlyInvestment),
        cumulativeInvestment: Math.round(cumulativeInvestment),
        interestEarned: Math.round(interestEarned),
        cumulativeMaturity: Math.round(cumulativeMaturity),
      });
    }

    return {
      totalInvested: Math.round(cumulativeInvestment),
      maturityAmount: Math.round(cumulativeMaturity),
      wealthGain: Math.round(cumulativeMaturity - cumulativeInvestment),
      yearlyBreakdown,
    };
  };

  // Standard SIP calculation (no step-up)
  const calculateStandardSIP = (
    sip: number,
    annualRate: number,
    totalYears: number,
  ) => {
    const months = totalYears * 12;
    const monthlyRate = annualRate / 12 / 100;

    let maturityAmount = 0;

    if (monthlyRate === 0) {
      maturityAmount = sip * months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);
      maturityAmount = sip * ((factor - 1) / monthlyRate) * (1 + monthlyRate);
    }

    if (!isFinite(maturityAmount)) maturityAmount = 0;

    const totalInvested = sip * months;
    const wealthGain = maturityAmount - totalInvested;

    const yearlyBreakdown: YearlyBreakdown[] = [];
    for (let year = 1; year <= totalYears; year++) {
      const monthsElapsed = year * 12;
      const yearlyInvestment = sip * 12;
      const cumulativeInvestment = sip * monthsElapsed;

      let yearlyMaturity = 0;
      if (monthlyRate === 0) {
        yearlyMaturity = cumulativeInvestment;
      } else {
        const factor = Math.pow(1 + monthlyRate, monthsElapsed);
        yearlyMaturity = sip * ((factor - 1) / monthlyRate) * (1 + monthlyRate);
      }

      yearlyBreakdown.push({
        year,
        yearlyInvestment: Math.round(yearlyInvestment),
        cumulativeInvestment: Math.round(cumulativeInvestment),
        interestEarned: Math.round(yearlyMaturity - cumulativeInvestment),
        cumulativeMaturity: Math.round(yearlyMaturity),
      });
    }

    return {
      totalInvested: Math.round(totalInvested),
      maturityAmount: Math.round(maturityAmount),
      wealthGain: Math.round(wealthGain),
      yearlyBreakdown,
    };
  };

  // Reverse SIP calculation (goal-based)
  const calculateReverseSIP = (
    target: number,
    annualRate: number,
    totalYears: number,
  ) => {
    const months = totalYears * 12;
    const monthlyRate = annualRate / 12 / 100;

    let requiredSip = 0;

    if (monthlyRate === 0) {
      requiredSip = target / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);
      requiredSip = target / (((factor - 1) / monthlyRate) * (1 + monthlyRate));
    }

    if (!isFinite(requiredSip)) requiredSip = 0;

    const totalInvested = requiredSip * months;
    const wealthGain = target - totalInvested;

    return {
      requiredSip: Math.round(requiredSip),
      totalInvested: Math.round(totalInvested),
      maturityAmount: Math.round(target),
      wealthGain: Math.round(wealthGain),
    };
  };

  const results: CalculationResults = useMemo(() => {
    if (calculatorMode === 'goal') {
      const goalResults = calculateReverseSIP(
        targetAmount,
        goalRate,
        goalYears,
      );
      const standardCalc = calculateStandardSIP(
        goalResults.requiredSip,
        goalRate,
        goalYears,
      );
      return {
        ...goalResults,
        yearlyBreakdown: standardCalc.yearlyBreakdown,
        principalPct:
          goalResults.maturityAmount > 0
            ? Math.round(
                (goalResults.totalInvested / goalResults.maturityAmount) * 100,
              )
            : 0,
        gainPct:
          goalResults.maturityAmount > 0
            ? Math.round(
                (goalResults.wealthGain / goalResults.maturityAmount) * 100,
              )
            : 0,
      };
    }

    if (stepUpPercent > 0) {
      const stepUpResults = calculateStepUpSIP(
        monthlySip,
        rate,
        years,
        stepUpPercent,
      );
      return {
        ...stepUpResults,
        principalPct:
          stepUpResults.maturityAmount > 0
            ? Math.round(
                (stepUpResults.totalInvested / stepUpResults.maturityAmount) *
                  100,
              )
            : 0,
        gainPct:
          stepUpResults.maturityAmount > 0
            ? Math.round(
                (stepUpResults.wealthGain / stepUpResults.maturityAmount) * 100,
              )
            : 0,
      };
    }

    const standardResults = calculateStandardSIP(monthlySip, rate, years);
    return {
      ...standardResults,
      principalPct:
        standardResults.maturityAmount > 0
          ? Math.round(
              (standardResults.totalInvested / standardResults.maturityAmount) *
                100,
            )
          : 0,
      gainPct:
        standardResults.maturityAmount > 0
          ? Math.round(
              (standardResults.wealthGain / standardResults.maturityAmount) *
                100,
            )
          : 0,
    };
  }, [
    monthlySip,
    years,
    rate,
    stepUpPercent,
    calculatorMode,
    targetAmount,
    goalYears,
    goalRate,
  ]);

  const handleSave = () => {
    const calc: SavedCalculation = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now(),
      monthlySip:
        calculatorMode === 'goal' ? results.requiredSip || 0 : monthlySip,
      rate: calculatorMode === 'goal' ? goalRate : rate,
      years: calculatorMode === 'goal' ? goalYears : years,
      totalInvested: results.totalInvested,
      maturityAmount: results.maturityAmount,
      wealthGain: results.wealthGain,
      date: new Date().toISOString(),
      stepUpPercent: calculatorMode === 'investment' ? stepUpPercent : 0,
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('sip_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving SIP calculation:', error);
    }

    toast.success(t.calculationSaved);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sip_calculation_saved', {
        monthly_sip: calc.monthlySip,
        rate: calc.rate,
        years: calc.years,
        mode: calculatorMode,
        step_up: stepUpPercent,
      });
    }
  };

  const handleShare = () => {
    const isGoalMode = calculatorMode === 'goal';
    const message =
      `📈 SIP Calculation ${isGoalMode ? '(Goal-Based)' : stepUpPercent > 0 ? '(Step-Up)' : ''}\n\n` +
      `${isGoalMode ? `🎯 Target Amount: ${formatINR(targetAmount)}\n` : ''}` +
      `Monthly SIP: ${formatINR(isGoalMode ? results.requiredSip || 0 : monthlySip)}\n` +
      `${stepUpPercent > 0 ? `Step-Up: ${stepUpPercent}% annually\n` : ''}` +
      `Expected Return: ${isGoalMode ? goalRate : rate}% p.a.\n` +
      `Investment Period: ${isGoalMode ? goalYears : years} years\n\n` +
      `💼 Total Invested: ${formatINR(results.totalInvested)}\n` +
      `📊 Maturity Amount: ${formatINR(results.maturityAmount)}\n` +
      `💰 Wealth Gain: ${formatINR(results.wealthGain)}\n\n` +
      `Calculate yours: https://fincado.com/sip-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sip_calculation_shared', {
        method: 'whatsapp',
        mode: calculatorMode,
      });
    }
  };

  const handleDownloadReport = () => {
    let csvContent =
      'Year,Yearly Investment,Cumulative Investment,Interest Earned,Maturity Amount\n';

    results.yearlyBreakdown.forEach((row) => {
      csvContent += `${row.year},${row.yearlyInvestment},${row.cumulativeInvestment},${row.interestEarned},${row.cumulativeMaturity}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sip-calculation-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success(t.reportDownloaded);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sip_report_downloaded', {
        mode: calculatorMode,
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('sip_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating SIP history:', error);
    }

    toast.success(t.calculationDeleted);
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('sip_calculator_history');
    } catch (error) {
      console.error('Error clearing SIP history:', error);
    }
    toast.success(t.allCalculationsCleared);
  };

  const handleLoad = (calc: SavedCalculation) => {
    setMonthlySip(calc.monthlySip);
    setRate(calc.rate);
    setYears(calc.years);
    if (calc.stepUpPercent !== undefined) {
      setStepUpPercent(calc.stepUpPercent);
    }
    setCalculatorMode('investment');
    toast.success(t.calculationLoaded);
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <Card className="bg-card">
        <CardContent className="p-4">
          <Tabs
            value={calculatorMode}
            onValueChange={(v) => setCalculatorMode(v as 'investment' | 'goal')}
          >
            <TabsList className="grid w-full grid-cols-2 h-14 p-1.5 bg-slate-100 rounded-xl">
              <TabsTrigger
                value="investment"
                className={cn(
                  'flex items-center justify-center gap-2 font-bold transition-all rounded-lg',
                  'data-[state=active]:bg-linear-to-r data-[state=active]:from-lime-500 data-[state=active]:to-lime-600',
                  'data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]',
                  'data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:bg-slate-200/50',
                )}
              >
                <TrendingUp className="h-5 w-5" />
                <span className="hidden sm:inline">{t.investmentMode}</span>
                <span className="sm:hidden">Investment</span>
              </TabsTrigger>
              <TabsTrigger
                value="goal"
                className={cn(
                  'flex items-center justify-center gap-2 font-bold transition-all rounded-lg',
                  'data-[state=active]:bg-linear-to-r data-[state=active]:from-lime-500 data-[state=active]:to-lime-600',
                  'data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]',
                  'data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:bg-slate-200/50',
                )}
              >
                <Target className="h-5 w-5" />
                <span className="hidden sm:inline">{t.goalBasedMode}</span>
                <span className="sm:hidden">Goal</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Main Calculator */}
      <Card className="bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* INPUTS */}
            <div className="space-y-6">
              {calculatorMode === 'investment' ? (
                <>
                  <CalculatorField
                    label={t.monthlySIP}
                    value={monthlySip}
                    min={500}
                    max={500000}
                    step={500}
                    onChange={setMonthlySip}
                  />

                  <CalculatorField
                    label={t.investmentPeriod}
                    value={years}
                    min={1}
                    max={40}
                    step={1}
                    onChange={setYears}
                  />

                  <CalculatorField
                    label={t.expectedReturn}
                    value={rate}
                    min={4}
                    max={20}
                    step={0.5}
                    onChange={setRate}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                      {t.stepUpSIP}
                      <Percent className="h-3 w-3 text-slate-400" />
                    </label>
                    <Slider
                      value={[stepUpPercent]}
                      min={0}
                      max={20}
                      step={1}
                      onValueChange={([v]) => setStepUpPercent(v)}
                      className="py-3"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{t.noIncrease}</span>
                      <span className="font-semibold text-indigo-600">
                        {stepUpPercent}
                        {t.perYear}
                      </span>
                    </div>
                    {stepUpPercent > 0 && (
                      <p className="text-xs text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded">
                        {t.stepUpNote.replace(
                          '{percent}',
                          String(stepUpPercent),
                        )}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <CalculatorField
                    label={t.targetAmount}
                    value={targetAmount}
                    min={100000}
                    max={100000000}
                    step={50000}
                    onChange={setTargetAmount}
                  />

                  <CalculatorField
                    label={t.timeToAchieveGoal}
                    value={goalYears}
                    min={1}
                    max={40}
                    step={1}
                    onChange={setGoalYears}
                  />

                  <CalculatorField
                    label={t.expectedReturn}
                    value={goalRate}
                    min={4}
                    max={20}
                    step={0.5}
                    onChange={setGoalRate}
                  />

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-sm font-medium text-blue-900 dark:text-blue-200">
                      {t.requiredMonthlySIP}
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                      {formatINR(results.requiredSip || 0)}
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                      {t.investThisAmount.replace(
                        '{amount}',
                        formatINR(targetAmount),
                      )}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* OUTPUT / VISUALS */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={results.principalPct}
                interestPct={results.gainPct}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-muted-foreground">
                  {calculatorMode === 'goal'
                    ? t.yourTargetAmount
                    : t.estimatedMaturityAmount}
                </div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-indigo-700">
                  {formatINR(results.maturityAmount)}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        {t.totalAmountInvested}
                      </div>
                      <div className="mt-1 font-semibold text-foreground whitespace-nowrap">
                        {formatINR(results.totalInvested)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-900/15 dark:border-emerald-900">
                    <CardContent className="p-4">
                      <div className="text-xs text-emerald-700 dark:text-emerald-400">
                        {t.wealthGain}
                      </div>
                      <div className="mt-1 font-semibold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                        +{formatINR(results.wealthGain)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-3 text-xs text-slate-500">
                  {stepUpPercent > 0 && calculatorMode === 'investment' && (
                    <span className="text-indigo-600 font-medium">
                      {t.withAnnualStepUp.replace(
                        '{percent}',
                        String(stepUpPercent),
                      )}{' '}
                      •{' '}
                    </span>
                  )}
                  {t.returnsDisclaimer}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Chart */}
      {isClient && results.yearlyBreakdown && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LineChart className="h-5 w-5 text-indigo-600" />
              {t.investmentGrowthOverTime}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={results.yearlyBreakdown}>
                <defs>
                  <linearGradient
                    id="colorInvested"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="cumulativeInvestment"
                  name={t.totalAmountInvested}
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorInvested)"
                />
                <Area
                  type="monotone"
                  dataKey="cumulativeMaturity"
                  name={t.maturityAmount}
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorReturns)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Year-by-Year Breakdown Table */}
      {isClient && results.yearlyBreakdown && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">{t.yearByYearBreakdown}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 font-semibold">{t.year}</th>
                    <th className="text-right p-3 font-semibold">
                      {t.yearlyInvestment}
                      {stepUpPercent > 0 && (
                        <span className="text-indigo-600 ml-1">↗</span>
                      )}
                    </th>
                    <th className="text-right p-3 font-semibold">
                      {t.cumulativeInvestment}
                    </th>
                    <th className="text-right p-3 font-semibold">
                      {t.interestEarned}
                    </th>
                    <th className="text-right p-3 font-semibold text-indigo-600">
                      {t.maturityAmount}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyBreakdown.map((row, idx) => (
                    <tr
                      key={row.year}
                      className={`border-b border-slate-100 ${
                        idx % 2 === 0 ? 'bg-slate-50/50' : ''
                      }`}
                    >
                      <td className="p-3 font-medium">{row.year}</td>
                      <td className="p-3 text-right">
                        {formatINR(row.yearlyInvestment)}
                        {stepUpPercent > 0 && idx > 0 && (
                          <span className="text-xs text-indigo-600 ml-1">
                            (+
                            {(
                              ((row.yearlyInvestment -
                                results.yearlyBreakdown[idx - 1]
                                  .yearlyInvestment) /
                                results.yearlyBreakdown[idx - 1]
                                  .yearlyInvestment) *
                              100
                            ).toFixed(0)}
                            %)
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {formatINR(row.cumulativeInvestment)}
                      </td>
                      <td className="p-3 text-right text-emerald-600">
                        {formatINR(row.interestEarned)}
                      </td>
                      <td className="p-3 text-right font-semibold text-indigo-600">
                        {formatINR(row.cumulativeMaturity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

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

        <Button onClick={handleDownloadReport} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          {t.downloadReport}
        </Button>
      </div>

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">{t.savedSIPPlans}</CardTitle>
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
                          {formatINR(calc.monthlySip)} {t.month} @ {calc.rate}%{' '}
                          {t.forYears} {calc.years} years
                          {calc.stepUpPercent && calc.stepUpPercent > 0 && (
                            <span className="text-xs text-indigo-600 ml-1">
                              (
                              {t.stepUpPercent.replace(
                                '{percent}',
                                String(calc.stepUpPercent),
                              )}
                              )
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {t.invested} {formatINR(calc.totalInvested)} |{' '}
                          {t.maturity} {formatINR(calc.maturityAmount)}
                        </div>
                        <div className="text-[11px] text-emerald-700 mt-0.5">
                          {t.gain} {formatINR(calc.wealthGain)}
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
