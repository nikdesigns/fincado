'use client';

import React, { useMemo, useState, useEffect } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RefreshCcw,
  Palmtree,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Calculator,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

/* ---------- TYPES ---------- */
interface SavedCalculation {
  id: number;
  currentAge: number;
  retireAge: number;
  monthlyExpense: number;
  currentSavings: number;
  inflation: number;
  preReturn: number;
  postReturn: number;
  targetCorpus: number;
  sipRequired: number;
  date: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function RetirementCalculatorClient() {
  /* ---------- STATE ---------- */
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(30000);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [inflation, setInflation] = useState(6);
  const [preReturn, setPreReturn] = useState(12);
  const [postReturn, setPostReturn] = useState(8);
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
      const saved = localStorage.getItem('retirement_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved retirement calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'Retirement',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const yearsToRetire = Math.max(0, retireAge - currentAge);
    const monthsToRetire = yearsToRetire * 12;

    const monthlyInflation = inflation / 12 / 100;
    const monthlyPreReturn = preReturn / 12 / 100;

    // Future expense at retirement
    const expenseAtRetirement =
      monthlyExpense * Math.pow(1 + monthlyInflation, monthsToRetire);

    const annualExpenseAtRetirement = expenseAtRetirement * 12;
    const retirementYears = 25; // Assumed retirement duration

    // Real return adjusted for inflation
    const realReturn = (1 + postReturn / 100) / (1 + inflation / 100) - 1;

    // Target corpus using annuity formula
    const targetCorpus =
      realReturn <= 0
        ? annualExpenseAtRetirement * retirementYears
        : annualExpenseAtRetirement *
          ((1 - Math.pow(1 + realReturn, -retirementYears)) / realReturn);

    // Future value of current savings
    const savingsFV =
      currentSavings * Math.pow(1 + monthlyPreReturn, monthsToRetire);

    // Gap to fill
    const gap = Math.max(0, targetCorpus - savingsFV);

    // Required monthly SIP
    const sip =
      gap > 0 && monthsToRetire > 0
        ? gap /
          (((Math.pow(1 + monthlyPreReturn, monthsToRetire) - 1) /
            monthlyPreReturn) *
            (1 + monthlyPreReturn))
        : 0;

    const securedPct =
      targetCorpus > 0
        ? Math.min(100, Math.round((savingsFV / targetCorpus) * 100))
        : 0;

    const gapPct = 100 - securedPct;

    // Monthly corpus breakdown
    const totalSIPInvestment = sip * monthsToRetire;
    const sipGrowth = gap - totalSIPInvestment;

    const isShortfall = gap > 0;
    const shortfallMessage = isShortfall
      ? `You need to invest ${formatINR(sip)}/month to reach your goal`
      : 'Your current savings are sufficient!';

    return {
      targetCorpus: Math.round(targetCorpus),
      expenseAtRetirement: Math.round(expenseAtRetirement),
      savingsFV: Math.round(savingsFV),
      sip: Math.round(sip),
      securedPct,
      gapPct,
      gap: Math.round(gap),
      yearsToRetire,
      isShortfall,
      shortfallMessage,
      totalSIPInvestment: Math.round(totalSIPInvestment),
      sipGrowth: Math.round(sipGrowth),
      annualExpenseAtRetirement: Math.round(annualExpenseAtRetirement),
    };
  }, [
    currentAge,
    retireAge,
    monthlyExpense,
    currentSavings,
    inflation,
    preReturn,
    postReturn
  ]);

  /* ---------- HANDLERS ---------- */
  const handleReset = () => {
    setCurrentAge(30);
    setRetireAge(60);
    setMonthlyExpense(30000);
    setCurrentSavings(500000);
    setInflation(6);
    setPreReturn(12);
    setPostReturn(8);
    toast.success('Calculator reset to defaults!');
  };

  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      currentAge,
      retireAge,
      monthlyExpense,
      currentSavings,
      inflation,
      preReturn,
      postReturn,
      targetCorpus: results.targetCorpus,
      sipRequired: results.sip,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem(
        'retirement_calculator_history',
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error('Error saving retirement calculation:', error);
    }

    toast.success('Retirement plan saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'retirement_calculation_saved', {
        current_age: currentAge,
        retire_age: retireAge,
        target_corpus: results.targetCorpus,
      });
    }
  };

  const handleShare = () => {
    const message =
      `🏖️ Retirement Planning Calculation\n\n` +
      `Current Age: ${currentAge} | Retirement Age: ${retireAge}\n` +
      `Years to Retire: ${results.yearsToRetire} years\n` +
      `Current Monthly Expense: ${formatINR(monthlyExpense)}\n\n` +
      `📊 Retirement Goals:\n` +
      `Target Corpus: ${formatINR(results.targetCorpus)}\n` +
      `Monthly Expense at Retirement: ${formatINR(results.expenseAtRetirement)}\n` +
      `Current Savings Future Value: ${formatINR(results.savingsFV)}\n\n` +
      `💰 Action Required:\n` +
      `${results.shortfallMessage}\n\n` +
      `Plan your retirement: https://fincado.com/retirement-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'retirement_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem(
        'retirement_calculator_history',
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error('Error updating retirement history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('retirement_calculator_history');
    } catch (error) {
      console.error('Error clearing retirement history:', error);
    }
    toast.success('All retirement plans cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setCurrentAge(calc.currentAge);
    setRetireAge(calc.retireAge);
    setMonthlyExpense(calc.monthlyExpense);
    setCurrentSavings(calc.currentSavings);
    setInflation(calc.inflation);
    setPreReturn(calc.preReturn);
    setPostReturn(calc.postReturn);
    toast.success('Retirement plan loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Shortfall Warning */}
      {results.isShortfall && results.sip > monthlyExpense * 0.5 && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="ml-2 text-sm text-amber-800">
            <strong>High SIP Required:</strong> Your required monthly SIP (
            {formatINR(results.sip)}) is quite high. Consider increasing
            retirement age, reducing expenses, or boosting current savings.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Calculator */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <Palmtree className="h-5 w-5 text-emerald-600" />
              Retirement Planning Calculator
            </CardTitle>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <RefreshCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* ---------- INPUTS ---------- */}
            <div className="space-y-6">
              <CalculatorField
                label="Current Age (Years)"
                value={currentAge}
                min={18}
                max={retireAge - 1}
                step={1}
                onChange={setCurrentAge}
              />

              <CalculatorField
                label="Retirement Age (Years)"
                value={retireAge}
                min={currentAge + 1}
                max={75}
                step={1}
                onChange={setRetireAge}
              />

              <CalculatorField
                label="Current Monthly Expense (₹)"
                value={monthlyExpense}
                min={10000}
                max={500000}
                step={5000}
                onChange={setMonthlyExpense}
              />

              <CalculatorField
                label="Current Savings (₹)"
                value={currentSavings}
                min={0}
                max={10000000}
                step={50000}
                onChange={setCurrentSavings}
              />

              {/* Advanced Rates */}
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  <Calculator className="mr-2 h-3 w-3" />
                  {showAdvanced ? 'Hide' : 'Show'} Advanced Rates
                </Button>
              </div>

              {showAdvanced && (
                <div className="space-y-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <CalculatorField
                    label="Inflation Rate (% p.a.)"
                    value={inflation}
                    min={2}
                    max={10}
                    step={0.1}
                    onChange={setInflation}
                  />
                  <CalculatorField
                    label="Pre-Retirement Return (% p.a.)"
                    value={preReturn}
                    min={4}
                    max={18}
                    step={0.1}
                    onChange={setPreReturn}
                  />
                  <CalculatorField
                    label="Post-Retirement Return (% p.a.)"
                    value={postReturn}
                    min={3}
                    max={12}
                    step={0.1}
                    onChange={setPostReturn}
                  />
                </div>
              )}
            </div>

            {/* ---------- VISUALS ---------- */}
            <div className="flex flex-col items-center text-center space-y-6">
              <EMIPieChart
                principalPct={results.securedPct}
                interestPct={results.gapPct}
                size={200}
              />

              <div>
                <div className="text-sm text-slate-500">
                  Target Retirement Corpus
                </div>
                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                  {formatINR(results.targetCorpus)}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  For 25 years of retirement
                </div>
              </div>

              <div className="rounded-xl border-2 border-lime-300 bg-lime-50 px-6 py-4 w-full max-w-xs">
                <div className="text-xs font-semibold text-lime-700">
                  Monthly SIP Required
                </div>
                <div className="mt-1 text-2xl font-extrabold text-lime-800">
                  {formatINR(results.sip)}
                  <span className="text-sm font-medium"> / month</span>
                </div>
                <div className="text-[11px] text-lime-600 mt-1">
                  for next {results.yearsToRetire} years
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-4">
                    <div className="text-xs text-slate-500">
                      Expense at Retirement
                    </div>
                    <div className="mt-1 font-semibold text-red-600">
                      {formatINR(results.expenseAtRetirement)}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      /month (inflation adjusted)
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-emerald-50 shadow-none">
                  <CardContent className="p-4">
                    <div className="text-xs text-emerald-700">
                      Current Savings FV
                    </div>
                    <div className="mt-1 font-semibold text-emerald-700">
                      {formatINR(results.savingsFV)}
                    </div>
                    <div className="text-[11px] text-emerald-600 mt-0.5">
                      {results.securedPct}% of target
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Breakdown */}
              {results.isShortfall && (
                <div className="w-full p-4 bg-blue-50 rounded-lg border border-blue-200 text-left">
                  <h4 className="text-xs font-semibold text-blue-900 mb-2">
                    Investment Breakdown
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-700">Gap to Fill:</span>
                      <strong className="text-blue-700">
                        {formatINR(results.gap)}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">
                        Total SIP Investment:
                      </span>
                      <strong className="text-slate-900">
                        {formatINR(results.totalSIPInvestment)}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Expected Returns:</span>
                      <strong className="text-emerald-700">
                        {formatINR(results.sipGrowth)}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-400 italic">
                Assumes 25-year retirement period. Adjust based on life
                expectancy and lifestyle.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          Save Plan
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          Share via WhatsApp
        </Button>
      </div>

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">
              Your Saved Retirement Plans
            </CardTitle>
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
                          Age {calc.currentAge}→{calc.retireAge} | Corpus:{' '}
                          {formatINR(calc.targetCorpus)}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          SIP: {formatINR(calc.sipRequired)}/mo | Expense:{' '}
                          {formatINR(calc.monthlyExpense)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Savings: {formatINR(calc.currentSavings)} | Returns:{' '}
                          {calc.preReturn}%/{calc.postReturn}%
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
