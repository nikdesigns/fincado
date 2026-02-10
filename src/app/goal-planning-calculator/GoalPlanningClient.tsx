'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Target,
  TrendingUp,
  IndianRupee,
  Calendar,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
interface GoalLabels {
  goalName: string;
  currentValue: string;
  yearsToGoal: string;
  inflationRate: string;
  expectedReturn: string;
  existingCorpus: string;
  optional: string;
  futureGoalValue: string;
  existingCorpusGrowth: string;
  gapToFill: string;
  requiredMonthlySIP: string;
  orLumpSumToday: string;
  totalSIPInvestment: string;
  finalMaturity: string;
  wealthGain: string;
  inflationNote: string;
  planningInsights: string;
  startEarly: string;
  startEarlyText: string;
  existingHelps: string;
  existingHelpsText: string;
  saveGoal: string;
  shareWhatsApp: string;
  savedGoals: string;
  clearAll: string;
  goalType: string;
  future: string;
  required: string;
  per: string;
  growth: string;
  gap: string;
  monthlyInvestment: string;
  lumpSumInvestment: string;
  selectGoalType: string;
  customGoal: string;
}

const DEFAULT_LABELS: GoalLabels = {
  goalName: 'Goal Name',
  currentValue: "Goal Amount (Today's Value) ₹",
  yearsToGoal: 'Time to Achieve Goal (Years)',
  inflationRate: 'Inflation Rate (%)',
  expectedReturn: 'Expected Annual Return (%)',
  existingCorpus: 'Existing Savings for This Goal ₹',
  optional: 'Optional',
  futureGoalValue: 'Inflation-Adjusted Goal Amount',
  existingCorpusGrowth: 'Growth of Existing Savings',
  gapToFill: 'Gap to Fill via Investments',
  requiredMonthlySIP: 'Required Monthly SIP',
  orLumpSumToday: 'OR Lump Sum Investment Today',
  totalSIPInvestment: 'Total SIP Investment Over Time',
  finalMaturity: 'Final Maturity (SIP + Existing Growth)',
  wealthGain: 'Wealth Gain (Returns)',
  inflationNote:
    'Your goal amount is adjusted for inflation. This is the actual amount you need to accumulate by your goal date.',
  planningInsights: 'Planning Insights',
  startEarly: 'Start Early Advantage',
  startEarlyText:
    'Starting 5 years earlier can reduce your required monthly SIP by 40-50% due to longer compounding period.',
  existingHelps: 'Existing Savings Matter',
  existingHelpsText:
    'Even ₹1-2 lakh invested today can significantly reduce your monthly burden. Your existing savings grow at the same return rate.',
  saveGoal: 'Save Goal',
  shareWhatsApp: 'Share via WhatsApp',
  savedGoals: 'Your Saved Goals',
  clearAll: 'Clear All',
  goalType: 'Goal Type',
  future: 'Future:',
  required: 'Required:',
  per: 'per month for',
  growth: 'Growth:',
  gap: 'Gap:',
  monthlyInvestment: 'Monthly Investment',
  lumpSumInvestment: 'Lump Sum Investment',
  selectGoalType: 'Select Goal Type (Optional)',
  customGoal: 'Custom Goal',
};

interface SavedGoal {
  id: number;
  goalType: string;
  currentValue: number;
  years: number;
  inflation: number;
  returnRate: number;
  existingCorpus: number;
  futureValue: number;
  monthlySip: number;
  lumpSum: number;
  date: string;
}

const GOAL_PRESETS = [
  { value: 'custom', label: 'Custom Goal', inflation: 6, icon: '🎯' },
  { value: 'retirement', label: 'Retirement', inflation: 6, icon: '🧓' },
  {
    value: 'education',
    label: 'Child Education',
    inflation: 9,
    icon: '🎓',
  },
  { value: 'house', label: 'House Purchase', inflation: 5, icon: '🏠' },
  { value: 'marriage', label: 'Marriage', inflation: 7, icon: '💍' },
  { value: 'vacation', label: 'Vacation', inflation: 5, icon: '✈️' },
  { value: 'car', label: 'Car', inflation: 4, icon: '🚗' },
];

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

export default function GoalPlanningClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<GoalLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  const [goalType, setGoalType] = useState('custom');
  const [currentValue, setCurrentValue] = useState(5000000);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);
  const [returnRate, setReturnRate] = useState(10);
  const [existingCorpus, setExistingCorpus] = useState(0);

  const [isClient, setIsClient] = useState(false);
  const [savedGoals, setSavedGoals] = useState<SavedGoal[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    try {
      const saved = localStorage.getItem('goal_planning_history');
      if (saved) {
        setSavedGoals(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved goals:', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'Goal Planning',
        page_path: window.location.pathname,
      });
    }
  }, []);

  const handleGoalTypeChange = (value: string) => {
    setGoalType(value);
    const preset = GOAL_PRESETS.find((p) => p.value === value);
    if (preset && preset.inflation) {
      setInflation(preset.inflation);
    }
  };

  const results = useMemo(() => {
    const futureValue = currentValue * Math.pow(1 + inflation / 100, years);

    const existingGrowth =
      existingCorpus * Math.pow(1 + returnRate / 100, years);

    const gapToFill = futureValue - existingGrowth;

    const monthlyRate = returnRate / 12 / 100;
    const months = years * 12;

    let monthlySip = 0;
    let lumpSumToday = 0;

    if (gapToFill > 0) {
      if (monthlyRate === 0) {
        monthlySip = gapToFill / months;
      } else {
        const factor = Math.pow(1 + monthlyRate, months);
        const fvFactor = ((factor - 1) / monthlyRate) * (1 + monthlyRate);
        monthlySip = gapToFill / fvFactor;
      }

      lumpSumToday = gapToFill / Math.pow(1 + returnRate / 100, years);
    }

    if (!isFinite(monthlySip)) monthlySip = 0;
    if (!isFinite(lumpSumToday)) lumpSumToday = 0;

    const totalSIPInvestment = monthlySip * months;
    const finalMaturity = futureValue;
    const wealthGain = finalMaturity - totalSIPInvestment - existingCorpus;

    const investedPct =
      finalMaturity > 0
        ? Math.round(
            ((totalSIPInvestment + existingCorpus) / finalMaturity) * 100,
          )
        : 0;
    const gainPct = 100 - investedPct;

    return {
      futureValue: Math.round(futureValue),
      existingGrowth: Math.round(existingGrowth),
      gapToFill: Math.round(gapToFill),
      monthlySip: Math.round(monthlySip),
      lumpSumToday: Math.round(lumpSumToday),
      totalSIPInvestment: Math.round(totalSIPInvestment),
      finalMaturity: Math.round(finalMaturity),
      wealthGain: Math.round(wealthGain),
      investedPct,
      gainPct,
    };
  }, [currentValue, years, inflation, returnRate, existingCorpus]);

  const handleSave = () => {
    const goalLabel =
      GOAL_PRESETS.find((p) => p.value === goalType)?.label || 'Custom Goal';

    const goal: SavedGoal = {
      id: Date.now(),
      goalType: goalLabel,
      currentValue,
      years,
      inflation,
      returnRate,
      existingCorpus,
      futureValue: results.futureValue,
      monthlySip: results.monthlySip,
      lumpSum: results.lumpSumToday,
      date: new Date().toISOString(),
    };

    const updated = [goal, ...savedGoals].slice(0, 10);
    setSavedGoals(updated);

    try {
      localStorage.setItem('goal_planning_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving goal:', error);
    }

    toast.success('Goal saved successfully!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'goal_saved', {
        goal_type: goalLabel,
        years,
        current_value: currentValue,
      });
    }
  };

  const handleShare = () => {
    const goalLabel =
      GOAL_PRESETS.find((p) => p.value === goalType)?.label || 'Custom Goal';

    const message =
      `🎯 Goal Planning: ${goalLabel}\n\n` +
      `Current Goal Value: ${formatINR(currentValue)}\n` +
      `Time Period: ${years} years\n` +
      `Inflation: ${inflation}% p.a.\n` +
      `Expected Return: ${returnRate}% p.a.\n\n` +
      `📊 Future Goal Amount: ${formatINR(results.futureValue)}\n` +
      `💰 Required Monthly SIP: ${formatINR(results.monthlySip)}\n` +
      `OR Lump Sum Today: ${formatINR(results.lumpSumToday)}\n\n` +
      `Plan your goals: https://fincado.com/goal-planning-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'goal_shared', {
        method: 'whatsapp',
        goal_type: goalLabel,
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedGoals.filter((g) => g.id !== id);
    setSavedGoals(updated);

    try {
      localStorage.setItem('goal_planning_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating goal history:', error);
    }

    toast.success('Goal deleted!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'goal_deleted', {
        goals_remaining: updated.length,
      });
    }
  };

  const handleClearAll = () => {
    setSavedGoals([]);
    try {
      localStorage.removeItem('goal_planning_history');
    } catch (error) {
      console.error('Error clearing goal history:', error);
    }
    toast.success('All goals cleared!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'goals_cleared', {
        goals_cleared: savedGoals.length,
      });
    }
  };

  const handleLoad = (goal: SavedGoal) => {
    const preset = GOAL_PRESETS.find((p) => p.label === goal.goalType);
    setGoalType(preset?.value || 'custom');
    setCurrentValue(goal.currentValue);
    setYears(goal.years);
    setInflation(goal.inflation);
    setReturnRate(goal.returnRate);
    setExistingCorpus(goal.existingCorpus);
    toast.success('Goal loaded!');
  };

  return (
    <div className="space-y-6">
      {/* Goal Type Selection */}
      <Card className="border-indigo-200 bg-linear-to-r from-indigo-50 to-purple-50">
        <CardContent className="py-5">
          <label className="text-sm font-semibold text-slate-900 mb-3 block">
            {t.selectGoalType}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {GOAL_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handleGoalTypeChange(preset.value)}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  goalType === preset.value
                    ? 'border-indigo-600 bg-indigo-100 text-indigo-900 font-semibold'
                    : 'border-slate-200 bg-white hover:border-indigo-300'
                }`}
              >
                <div className="text-2xl mb-1">{preset.icon}</div>
                <div className="text-xs">{preset.label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Calculator */}
      <Card className="bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* INPUTS */}
            <div className="space-y-6">
              <CalculatorField
                label={t.currentValue}
                value={currentValue}
                min={100000}
                max={100000000}
                step={100000}
                onChange={setCurrentValue}
              />

              <CalculatorField
                label={t.yearsToGoal}
                value={years}
                min={1}
                max={40}
                step={1}
                onChange={setYears}
              />

              <CalculatorField
                label={t.inflationRate}
                value={inflation}
                min={3}
                max={15}
                step={0.5}
                onChange={setInflation}
              />

              <CalculatorField
                label={t.expectedReturn}
                value={returnRate}
                min={4}
                max={18}
                step={0.5}
                onChange={setReturnRate}
              />

              <CalculatorField
                label={`${t.existingCorpus} (${t.optional})`}
                value={existingCorpus}
                min={0}
                max={50000000}
                step={50000}
                onChange={setExistingCorpus}
              />
            </div>

            {/* OUTPUT / VISUALS */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={results.investedPct}
                interestPct={results.gainPct}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-muted-foreground">
                  {t.futureGoalValue}
                </div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-indigo-700">
                  {formatINR(results.futureValue)}
                </div>

                <div className="mt-6 space-y-3 w-full max-w-md mx-auto">
                  <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-900/15 dark:border-emerald-900">
                    <CardContent className="p-4">
                      <div className="text-xs text-emerald-700 dark:text-emerald-400 mb-1">
                        {t.requiredMonthlySIP}
                      </div>
                      <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                        {formatINR(results.monthlySip)}
                      </div>
                      <div className="text-[10px] text-slate-600 mt-1">
                        for {years} years @ {returnRate}% return
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/15 dark:border-blue-900">
                    <CardContent className="p-4">
                      <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">
                        {t.orLumpSumToday}
                      </div>
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                        {formatINR(results.lumpSumToday)}
                      </div>
                      <div className="text-[10px] text-slate-600 mt-1">
                        One-time investment today @ {returnRate}% return
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 text-xs text-slate-500 max-w-md mx-auto">
                  {t.inflationNote}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Tabs */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-indigo-600" />
            Goal Breakdown & Investment Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="breakdown" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="breakdown">Goal Breakdown</TabsTrigger>
              <TabsTrigger value="comparison">SIP vs Lump Sum</TabsTrigger>
            </TabsList>

            <TabsContent value="breakdown" className="space-y-4 mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-indigo-200">
                  <CardContent className="p-4">
                    <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {t.futureGoalValue}
                    </div>
                    <div className="text-2xl font-bold text-indigo-700">
                      {formatINR(results.futureValue)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      After {years} years @ {inflation}% inflation
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardContent className="p-4">
                    <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {t.existingCorpusGrowth}
                    </div>
                    <div className="text-2xl font-bold text-purple-700">
                      {formatINR(results.existingGrowth)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      From {formatINR(existingCorpus)} @ {returnRate}% return
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 sm:col-span-2">
                  <CardContent className="p-4">
                    <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />
                      {t.gapToFill}
                    </div>
                    <div className="text-3xl font-bold text-amber-700">
                      {formatINR(results.gapToFill)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Amount to be accumulated via SIP or lump sum
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4 mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-5 w-5 text-emerald-700" />
                      <h4 className="font-semibold text-emerald-900">
                        {t.monthlyInvestment}
                      </h4>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-600 mb-1">
                          Monthly SIP Required
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          {formatINR(results.monthlySip)}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-emerald-200">
                        <div className="text-xs text-slate-600 mb-1">
                          Total Investment
                        </div>
                        <div className="text-lg font-semibold text-slate-700">
                          {formatINR(results.totalSIPInvestment)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Over {years} years ({years * 12} installments)
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded border border-emerald-200">
                        <p className="text-xs text-slate-700">
                          ✅ <strong>Best for:</strong> Regular income earners,
                          disciplined investing, rupee cost averaging
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <IndianRupee className="h-5 w-5 text-blue-700" />
                      <h4 className="font-semibold text-blue-900">
                        {t.lumpSumInvestment}
                      </h4>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-600 mb-1">
                          One-Time Investment Today
                        </div>
                        <div className="text-3xl font-bold text-blue-700">
                          {formatINR(results.lumpSumToday)}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-blue-200">
                        <div className="text-xs text-slate-600 mb-1">
                          Future Value
                        </div>
                        <div className="text-lg font-semibold text-slate-700">
                          {formatINR(results.gapToFill)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          After {years} years @ {returnRate}% return
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded border border-blue-200">
                        <p className="text-xs text-slate-700">
                          ✅ <strong>Best for:</strong> Large idle corpus,
                          windfall gains, immediate investment capacity
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                  <span>💡</span>
                  Pro Tip: Combine Both!
                </h4>
                <p className="text-sm text-slate-700">
                  For best results, invest available lump sum immediately and
                  continue monthly SIPs. This maximizes compounding while
                  maintaining investment discipline. You can start with a
                  partial lump sum and lower monthly SIP.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Planning Insights */}
      <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            {t.planningInsights}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                <span>⏰</span>
                {t.startEarly}
              </h4>
              <p className="text-sm text-slate-700">{t.startEarlyText}</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <span>💰</span>
                {t.existingHelps}
              </h4>
              <p className="text-sm text-slate-700">{t.existingHelpsText}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          {t.saveGoal}
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          {t.shareWhatsApp}
        </Button>
      </div>

      {/* Saved Goals */}
      {isClient && savedGoals.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">{t.savedGoals}</CardTitle>
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
              {savedGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="group p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition relative"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleLoad(goal)}
                  >
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <div className="font-semibold text-sm">
                          {goal.goalType} • {formatINR(goal.currentValue)} →{' '}
                          {formatINR(goal.futureValue)}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {t.required} {formatINR(goal.monthlySip)} {t.per}{' '}
                          {goal.years} years
                        </div>
                        <div className="text-[11px] text-blue-700 mt-0.5">
                          OR Lump Sum: {formatINR(goal.lumpSum)}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(goal.date).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(goal.id);
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
