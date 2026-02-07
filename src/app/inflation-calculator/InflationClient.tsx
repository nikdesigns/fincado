'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TrendingUp,
  RefreshCcw,
  TrendingDown,
  Info,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Calculator,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------------- HELPERS ---------------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------------- TYPES ---------------- */
interface InflationLabels {
  currentAmount: string;
  inflationRate: string;
  timePeriod: string;
  futureValueRequired: string;
  todaysValue: string;
  inflationImpact: string;
  disclaimer: string;
}

const DEFAULT_LABELS: InflationLabels = {
  currentAmount: 'Current Expense (₹)',
  inflationRate: 'Inflation Rate (% p.a)',
  timePeriod: 'Time Period (Years)',
  futureValueRequired: 'Future Cost',
  todaysValue: 'Value Today',
  inflationImpact: 'Extra Cost due to Inflation',
  disclaimer:
    '*Inflation rates are indicative. Actual cost of living may vary by category.',
};

interface SavedCalculation {
  id: number;
  mode: 'forward' | 'reverse';
  amount: number;
  rate: number;
  years: number;
  result: number;
  category: string;
  date: string;
}

/* ---------------- CHART COMPONENT ---------------- */
function FutureValueDonut({
  original,
  extra,
}: {
  original: number;
  extra: number;
}) {
  const total = original + extra;
  const originalPct = (original / total) * 100;
  const extraPct = (extra / total) * 100;

  const size = 200;
  const strokeWidth = 24;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  const dash1 = (originalPct / 100) * circumference;
  const dash2 = (extraPct / 100) * circumference;
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
          {/* Background */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Original (Emerald) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#10b981"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash1} ${circumference}`}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />

          {/* Inflation Impact (Red) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#ef4444"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash2} ${circumference}`}
            strokeDashoffset={offset2}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
            Total Future Cost
          </span>
          <span className="text-xl font-bold text-slate-900">
            {formatINR(total)}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-slate-600">
            Today&apos;s Value
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs font-medium text-slate-600">Inflation</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function InflationClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<InflationLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------------- STATE ---------------- */
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);
  const [category, setCategory] = useState('general');

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
      const saved = localStorage.getItem('inflation_history');
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
        calculator_type: 'Inflation',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------------- CALCULATIONS ---------------- */
  const result = useMemo(() => {
    if (mode === 'forward') {
      // Forward: Current → Future
      const futureValue = amount * Math.pow(1 + rate / 100, years);
      const extraCost = futureValue - amount;

      return {
        futureValue: Math.round(futureValue),
        extraCost: Math.round(extraCost),
        todayValue: amount,
      };
    } else {
      // Reverse: Future → Current (Present Value)
      const todayValue = amount / Math.pow(1 + rate / 100, years);
      const inflation = amount - todayValue;

      return {
        futureValue: amount,
        extraCost: Math.round(inflation),
        todayValue: Math.round(todayValue),
      };
    }
  }, [amount, rate, years, mode]);

  /* ---------- CATEGORY PRESETS ---------- */
  const categoryPresets: Record<
    string,
    { rate: number; label: string; icon: string }
  > = {
    general: { rate: 6, label: 'General (CPI)', icon: '🛒' },
    food: { rate: 7, label: 'Food & Groceries', icon: '🍎' },
    fuel: { rate: 8, label: 'Fuel & Transport', icon: '⛽' },
    education: { rate: 10, label: 'Education', icon: '🎓' },
    medical: { rate: 12, label: 'Healthcare', icon: '🏥' },
    realestate: { rate: 8, label: 'Real Estate', icon: '🏠' },
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setRate(categoryPresets[cat].rate);
  };

  const reset = () => {
    setMode('forward');
    setAmount(50000);
    setRate(6);
    setYears(10);
    setCategory('general');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'inflation_reset', {
        calculator_type: 'Inflation',
      });
    }
  };

  /* ---------- SAVE CALCULATION ---------- */
  const handleSaveCalculation = () => {
    const calculation: SavedCalculation = {
      id: Date.now(),
      mode,
      amount,
      rate,
      years,
      result: mode === 'forward' ? result.futureValue : result.todayValue,
      category: categoryPresets[category].label,
      date: new Date().toISOString(),
    };

    const saved = [...savedCalculations];
    saved.unshift(calculation);
    const trimmed = saved.slice(0, 10);

    setSavedCalculations(trimmed);

    try {
      localStorage.setItem('inflation_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success('Calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'inflation_saved', {
        mode: mode,
        category: category,
      });
    }
  };

  /* ---------- DELETE CALCULATION ---------- */
  const handleDeleteCalculation = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('inflation_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');
  };

  /* ---------- CLEAR ALL ---------- */
  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('inflation_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');
  };

  /* ---------- SHARE ---------- */
  const handleShare = () => {
    const message =
      mode === 'forward'
        ? `📊 Inflation Impact (${years} years)\\n\\n` +
          `Today: ${formatINR(amount)}\\n` +
          `Future Cost: ${formatINR(result.futureValue)}\\n` +
          `Inflation Rate: ${rate}%\\n` +
          `Category: ${categoryPresets[category].label}\\n\\n` +
          `Extra Cost: ${formatINR(result.extraCost)}\\n\\n` +
          `Calculate yours: https://fincado.com/inflation-calculator/`
        : `📊 Purchasing Power (${years} years ago)\\n\\n` +
          `Future Amount: ${formatINR(amount)}\\n` +
          `Value Today: ${formatINR(result.todayValue)}\\n` +
          `Inflation Rate: ${rate}%\\n\\n` +
          `Calculate yours: https://fincado.com/inflation-calculator/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'inflation_shared', {
        method: 'whatsapp',
        mode: mode,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* ============ MAIN CALCULATOR ============ */}
      <Card className="border-border shadow-sm bg-card">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              {mode === 'forward'
                ? 'Calculate Future Cost'
                : "Calculate Today's Value"}
            </CardTitle>
            <button
              onClick={reset}
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
              {/* Mode Toggle */}
              <div className="space-y-3">
                <Label>Calculation Mode</Label>
                <Tabs
                  value={mode}
                  onValueChange={(v) => setMode(v as 'forward' | 'reverse')}
                  className="w-full"
                >
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="forward">
                      <Calculator className="h-4 w-4 mr-2" />
                      Forward
                    </TabsTrigger>
                    <TabsTrigger value="reverse">
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Reverse
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <p className="text-xs text-slate-500">
                  {mode === 'forward'
                    ? 'Calculate what current expense will cost in future'
                    : "Calculate what today's value was needed years ago"}
                </p>
              </div>

              {/* Category Selection */}
              <div className="space-y-3">
                <Label>Expense Category</Label>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryPresets).map(([key, val]) => (
                      <SelectItem key={key} value={key}>
                        {val.icon} {val.label} ({val.rate}%)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>
                    {mode === 'forward' ? t.currentAmount : 'Future Amount (₹)'}
                  </Label>
                  <Badge
                    variant="secondary"
                    className="font-mono text-slate-700"
                  >
                    {formatINR(amount)}
                  </Badge>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                    ₹
                  </span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(Math.max(0, Number(e.target.value) || 0))
                    }
                    className="pl-8 h-11"
                  />
                </div>
                <Slider
                  value={[amount]}
                  min={1000}
                  max={1000000}
                  step={1000}
                  onValueChange={(v) => setAmount(v[0])}
                  className="text-emerald-600"
                />
              </div>

              {/* Inflation Rate */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>{t.inflationRate}</Label>
                  <Badge
                    variant="secondary"
                    className="font-mono text-slate-700"
                  >
                    {rate}%
                  </Badge>
                </div>
                <Slider
                  value={[rate]}
                  min={1}
                  max={15}
                  step={0.5}
                  onValueChange={(v) => setRate(v[0])}
                  className="text-emerald-600"
                />
                <div className="flex flex-wrap gap-2">
                  {[5, 6, 7, 10, 12].map((r) => (
                    <Badge
                      key={r}
                      variant={rate === r ? 'default' : 'outline'}
                      className={`cursor-pointer transition ${
                        rate === r
                          ? 'bg-emerald-600 hover:bg-emerald-700'
                          : 'hover:bg-slate-50'
                      }`}
                      onClick={() => setRate(r)}
                    >
                      {r}%
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Years */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>{t.timePeriod}</Label>
                  <Badge
                    variant="secondary"
                    className="font-mono text-slate-700"
                  >
                    {years} Years
                  </Badge>
                </div>
                <Slider
                  value={[years]}
                  min={1}
                  max={40}
                  step={1}
                  onValueChange={(v) => setYears(v[0])}
                  className="text-emerald-600"
                />
                <div className="flex flex-wrap gap-2">
                  {[5, 10, 15, 20, 30].map((y) => (
                    <Badge
                      key={y}
                      variant={years === y ? 'default' : 'outline'}
                      className={`cursor-pointer transition ${
                        years === y
                          ? 'bg-emerald-600 hover:bg-emerald-700'
                          : 'hover:bg-slate-50'
                      }`}
                      onClick={() => setYears(y)}
                    >
                      {y}y
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* --- RIGHT: RESULTS --- */}
            <div className="flex flex-col h-full">
              {/* Donut Chart */}
              {mode === 'forward' && (
                <FutureValueDonut original={amount} extra={result.extraCost} />
              )}

              {mode === 'reverse' && (
                <div className="py-6 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm text-slate-500 font-medium mb-2">
                      Value {years} Years Ago
                    </div>
                    <div className="text-4xl font-extrabold text-emerald-600 mb-2">
                      {formatINR(result.todayValue)}
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800">
                      Purchasing Power Equivalent
                    </Badge>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 w-full">
                    <p className="text-sm text-slate-700">
                      <strong>What this means:</strong> If you needed{' '}
                      {formatINR(amount)} in {new Date().getFullYear()}, you
                      would have needed only {formatINR(result.todayValue)} in{' '}
                      {new Date().getFullYear() - years} to buy the same thing.
                    </p>
                  </div>
                </div>
              )}

              {/* Result Breakdown */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs text-slate-500 font-medium">
                      {mode === 'forward' ? t.todaysValue : 'Value Years Ago'}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-slate-700">
                    {mode === 'forward'
                      ? formatINR(amount)
                      : formatINR(result.todayValue)}
                  </div>
                </div>

                <div
                  className={`${mode === 'forward' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'} border rounded-lg p-3`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown
                      className={`w-3 h-3 ${mode === 'forward' ? 'text-red-500' : 'text-orange-500'}`}
                    />
                    <span
                      className={`text-xs font-medium ${mode === 'forward' ? 'text-red-600' : 'text-orange-600'}`}
                    >
                      {t.inflationImpact}
                    </span>
                  </div>
                  <div
                    className={`text-lg font-bold ${mode === 'forward' ? 'text-red-600' : 'text-orange-600'}`}
                  >
                    +{formatINR(result.extraCost)}
                  </div>
                </div>
              </div>

              {/* Insight Box */}
              <div className="mt-4 flex gap-3 items-start p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  {mode === 'forward' ? (
                    <>
                      To maintain your current lifestyle in{' '}
                      <strong>{years} years</strong>, you will need{' '}
                      <strong>{formatINR(result.futureValue)}</strong> instead
                      of {formatINR(amount)}. Your savings must grow by at least{' '}
                      {rate}% annually to break even.
                    </>
                  ) : (
                    <>
                      The purchasing power of {formatINR(amount)} today was
                      equivalent to{' '}
                      <strong>{formatINR(result.todayValue)}</strong> {years}{' '}
                      years ago. Money lost{' '}
                      <strong>
                        {Math.round(
                          (result.extraCost / result.futureValue) * 100,
                        )}
                        %
                      </strong>{' '}
                      of its value due to {rate}% inflation.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center">{t.disclaimer}</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
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

      {/* Saved Calculations History */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved Calculations</CardTitle>
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
                  <div className="pr-8">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className={
                          calc.mode === 'forward'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }
                      >
                        {calc.mode === 'forward' ? 'Forward' : 'Reverse'}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {calc.category}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-slate-900">
                      {formatINR(calc.amount)} → {formatINR(calc.result)}
                    </div>

                    <div className="text-xs text-slate-600 mt-1">
                      {calc.rate}% over {calc.years} years •{' '}
                      {new Date(calc.date).toLocaleDateString('en-IN')}
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
