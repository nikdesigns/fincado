'use client';

import React, { useMemo, useState, useEffect } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  BookmarkIcon,
  Share2Icon,
  Zap,
  TrendingDown,
  Calendar,
  IndianRupee,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
interface LabelConfig {
  loanAmount: string;
  rate: string;
  tenure: string;
  monthlyEMI: string;
  principal: string;
  totalInterest: string;
}

interface EMIClientProps {
  labels?: LabelConfig;
  defaultRate?: number;
  defaultPrincipal?: number;
  defaultTenure?: number;
}

interface SavedCalculation {
  id: number;
  amount: number;
  rate: number;
  tenure: number;
  emi: number;
  totalInterest: number;
  date: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

/* ---------- COMPONENT ---------- */
export default function EMIClient({
  labels,
  defaultRate = 8.5,
  defaultPrincipal = 5000000,
  defaultTenure = 20,
}: EMIClientProps) {
  // ✅ Main Calculator States
  const [amount, setAmount] = useState(defaultPrincipal);
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(defaultTenure);

  // ✅ Prepayment Simulator States
  const [showPrepayment, setShowPrepayment] = useState(false);
  const [prepaymentAmount, setPrepaymentAmount] = useState(100000);
  const [prepaymentMonth, setPrepaymentMonth] = useState(12);

  // ✅ Comparison Mode States
  const [comparisonMode, setComparisonMode] = useState(false);
  const [amount2, setAmount2] = useState(defaultPrincipal);
  const [rate2, setRate2] = useState(9.5);
  const [tenure2, setTenure2] = useState(defaultTenure);

  // ✅ Saved Calculations - Start empty to avoid hydration issues
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  // ✅ Load saved calculations after mount

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    try {
      const saved = localStorage.getItem('emi_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'EMI',
        page_path: window.location.pathname,
      });
    }
  }, []);

  const t: LabelConfig = labels || {
    loanAmount: 'Loan Amount (₹)',
    rate: 'Interest Rate (% p.a)',
    tenure: 'Loan Tenure (Years)',
    monthlyEMI: 'Monthly EMI',
    principal: 'Principal Amount',
    totalInterest: 'Total Interest',
  };

  // ✅ Main EMI Calculations
  const calculations = useMemo(() => {
    if (tenure === 0)
      return {
        emi: 0,
        totalInterest: 0,
        principalPct: 0,
        interestPct: 0,
        totalPayment: 0,
      };

    const r = rate / 12 / 100;
    const n = tenure * 12;

    let emi = 0;
    if (rate === 0) {
      emi = amount / n;
    } else {
      emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    if (!isFinite(emi)) emi = 0;

    const totalPayment = emi * n;
    const totalInterest = totalPayment - amount;

    const principalPct =
      totalPayment > 0 ? Math.round((amount / totalPayment) * 100) : 0;
    const interestPct = 100 - principalPct;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPct,
      interestPct,
    };
  }, [amount, rate, tenure]);

  // ✅ Comparison Calculations
  const calculations2 = useMemo(() => {
    if (!comparisonMode) return null;

    if (tenure2 === 0)
      return {
        emi: 0,
        totalInterest: 0,
        principalPct: 0,
        interestPct: 0,
        totalPayment: 0,
      };

    const r = rate2 / 12 / 100;
    const n = tenure2 * 12;

    let emi = 0;
    if (rate2 === 0) {
      emi = amount2 / n;
    } else {
      emi = (amount2 * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    if (!isFinite(emi)) emi = 0;

    const totalPayment = emi * n;
    const totalInterest = totalPayment - amount2;

    const principalPct =
      totalPayment > 0 ? Math.round((amount2 / totalPayment) * 100) : 0;
    const interestPct = 100 - principalPct;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPct,
      interestPct,
    };
  }, [comparisonMode, amount2, rate2, tenure2]);

  // ✅ Prepayment Calculations
  const prepaymentImpact = useMemo(() => {
    if (!showPrepayment || prepaymentAmount <= 0) {
      return { interestSaved: 0, tenureReduction: 0, newEmi: 0 };
    }

    const r = rate / 12 / 100;
    const n = tenure * 12;

    const emi = calculations.emi;
    let remainingPrincipal = amount;

    for (let i = 0; i < prepaymentMonth; i++) {
      const interestForMonth = remainingPrincipal * r;
      const principalForMonth = emi - interestForMonth;
      remainingPrincipal -= principalForMonth;
    }

    const newPrincipal = Math.max(0, remainingPrincipal - prepaymentAmount);
    const remainingMonths = n - prepaymentMonth;

    let totalInterestWithout = 0;
    let balance = remainingPrincipal;
    for (let i = 0; i < remainingMonths; i++) {
      const interest = balance * r;
      totalInterestWithout += interest;
      balance -= emi - interest;
      if (balance <= 0) break;
    }

    let totalInterestWith = 0;
    let balanceWith = newPrincipal;
    let monthsNeeded = 0;
    while (balanceWith > 0 && monthsNeeded < remainingMonths) {
      const interest = balanceWith * r;
      totalInterestWith += interest;
      balanceWith -= emi - interest;
      monthsNeeded++;
    }

    const interestSaved = Math.round(totalInterestWithout - totalInterestWith);
    const tenureReduction = remainingMonths - monthsNeeded;

    return {
      interestSaved: Math.max(0, interestSaved),
      tenureReduction: Math.max(0, tenureReduction),
      newEmi: emi,
    };
  }, [
    showPrepayment,
    prepaymentAmount,
    prepaymentMonth,
    amount,
    rate,
    tenure,
    calculations.emi,
  ]);

  // ✅ Save Calculation
  const handleSaveCalculation = () => {
    const calculation: SavedCalculation = {
      id: Date.now(),
      amount,
      rate,
      tenure,
      emi: calculations.emi,
      totalInterest: calculations.totalInterest,
      date: new Date().toISOString(),
    };

    const saved = [...savedCalculations];
    saved.unshift(calculation);
    const trimmed = saved.slice(0, 10);

    setSavedCalculations(trimmed);

    try {
      localStorage.setItem('emi_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success('Calculation saved! Access it anytime from your history.');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'emi_saved', {
        loan_amount: amount,
        interest_rate: rate,
        tenure_years: tenure,
      });
    }
  };

  // ✅ Delete Single Calculation
  const handleDeleteCalculation = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('emi_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'emi_calculation_deleted', {
        calculations_remaining: updated.length,
      });
    }
  };

  // ✅ Clear All Calculations
  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('emi_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'emi_history_cleared', {
        calculations_cleared: savedCalculations.length,
      });
    }
  };

  // ✅ Share via WhatsApp
  const handleShare = () => {
    const message =
      `💰 EMI Calculation Result\n\n` +
      `Loan Amount: ${formatINR(amount)}\n` +
      `Interest Rate: ${rate}% p.a.\n` +
      `Tenure: ${tenure} years\n\n` +
      `📊 Monthly EMI: ${formatINR(calculations.emi)}\n` +
      `💸 Total Interest: ${formatINR(calculations.totalInterest)}\n` +
      `💵 Total Payment: ${formatINR(calculations.totalPayment)}\n\n` +
      `Calculate yours: https://fincado.com/emi-calculator/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'emi_shared', {
        method: 'whatsapp',
      });
    }
  };

  // ✅ Load saved calculation
  const handleLoadCalculation = (calc: SavedCalculation) => {
    setAmount(calc.amount);
    setRate(calc.rate);
    setTenure(calc.tenure);
    toast.success('Calculation loaded!');
  };

  return (
    <div className="space-y-6">
      {/* ✅ Comparison Mode Toggle */}
      <Card className="border-slate-200 bg-linear-to-r from-blue-50 to-indigo-50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch
                checked={comparisonMode}
                onCheckedChange={setComparisonMode}
                id="comparison-mode"
              />
              <label
                htmlFor="comparison-mode"
                className="text-sm font-semibold text-slate-900 cursor-pointer"
              >
                Compare Two Loan Options
              </label>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">
              Compare banks side-by-side
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ✅ Main Calculator(s) */}
      {!comparisonMode ? (
        // Single Calculator
        <Card className="border-none shadow-none bg-card">
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* INPUTS */}
              <div className="space-y-6">
                <CalculatorField
                  label={t.loanAmount}
                  value={amount}
                  min={100000}
                  max={20000000}
                  step={50000}
                  onChange={setAmount}
                />

                <CalculatorField
                  label={t.rate}
                  value={rate}
                  min={1}
                  max={20}
                  step={0.1}
                  onChange={setRate}
                />

                <CalculatorField
                  label={t.tenure}
                  value={tenure}
                  min={1}
                  max={30}
                  step={1}
                  onChange={setTenure}
                />
              </div>

              {/* VISUALS */}
              <div className="flex flex-col items-center justify-center">
                <EMIPieChart
                  principalPct={calculations.principalPct}
                  interestPct={calculations.interestPct}
                />

                <div className="mt-6 text-center w-full">
                  <div className="text-sm text-muted-foreground">
                    {t.monthlyEMI}
                  </div>

                  <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-700">
                    {formatINR(calculations.emi)}
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                    <Card className="border-border">
                      <CardContent className="p-4">
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {t.principal}
                        </div>
                        <div className="mt-1 font-semibold text-foreground whitespace-nowrap">
                          {formatINR(amount)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900">
                      <CardContent className="p-4">
                        <div className="text-xs text-red-700 dark:text-red-400">
                          {t.totalInterest}
                        </div>
                        <div className="mt-1 font-semibold text-red-700 dark:text-red-400 whitespace-nowrap">
                          +{formatINR(calculations.totalInterest)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Comparison Mode - Two Calculators
        <div className="grid md:grid-cols-2 gap-6">
          {/* Calculator 1 */}
          <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                  A
                </span>
                Option A - Current Bank
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalculatorField
                label={t.loanAmount}
                value={amount}
                min={100000}
                max={20000000}
                step={50000}
                onChange={setAmount}
              />

              <CalculatorField
                label={t.rate}
                value={rate}
                min={1}
                max={20}
                step={0.1}
                onChange={setRate}
              />

              <CalculatorField
                label={t.tenure}
                value={tenure}
                min={1}
                max={30}
                step={1}
                onChange={setTenure}
              />

              <div className="pt-4 border-t border-emerald-200">
                <div className="text-center">
                  <div className="text-xs text-slate-600">Monthly EMI</div>
                  <div className="text-2xl font-bold text-emerald-700 mt-1">
                    {formatINR(calculations.emi)}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    Total Interest
                  </div>
                  <div className="text-lg font-semibold text-red-600">
                    {formatINR(calculations.totalInterest)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculator 2 */}
          <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                  B
                </span>
                Option B - New Offer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalculatorField
                label={t.loanAmount}
                value={amount2}
                min={100000}
                max={20000000}
                step={50000}
                onChange={setAmount2}
              />

              <CalculatorField
                label={t.rate}
                value={rate2}
                min={1}
                max={20}
                step={0.1}
                onChange={setRate2}
              />

              <CalculatorField
                label={t.tenure}
                value={tenure2}
                min={1}
                max={30}
                step={1}
                onChange={setTenure2}
              />

              <div className="pt-4 border-t border-blue-200">
                <div className="text-center">
                  <div className="text-xs text-slate-600">Monthly EMI</div>
                  <div className="text-2xl font-bold text-blue-700 mt-1">
                    {formatINR(calculations2?.emi || 0)}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    Total Interest
                  </div>
                  <div className="text-lg font-semibold text-red-600">
                    {formatINR(calculations2?.totalInterest || 0)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ✅ Comparison Summary */}
      {comparisonMode && calculations2 && (
        <Card className="border-purple-200 bg-linear-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-lg">Which Option is Better?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-slate-600 mb-1">
                  EMI Difference
                </div>
                <div
                  className={`text-xl font-bold ${calculations.emi < calculations2.emi ? 'text-emerald-600' : 'text-blue-600'}`}
                >
                  {formatINR(Math.abs(calculations.emi - calculations2.emi))}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-600 mb-1">
                  Interest Difference
                </div>
                <div
                  className={`text-xl font-bold ${calculations.totalInterest < calculations2.totalInterest ? 'text-emerald-600' : 'text-blue-600'}`}
                >
                  {formatINR(
                    Math.abs(
                      calculations.totalInterest - calculations2.totalInterest,
                    ),
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-600 mb-1">Winner</div>
                <div className="text-xl font-bold">
                  {calculations.totalInterest < calculations2.totalInterest ? (
                    <span className="text-emerald-600">Option A 🏆</span>
                  ) : (
                    <span className="text-blue-600">Option B 🏆</span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-slate-600 pt-2 border-t">
              {calculations.totalInterest < calculations2.totalInterest
                ? `Option A saves you ${formatINR(calculations2.totalInterest - calculations.totalInterest)} in interest`
                : `Option B saves you ${formatINR(calculations.totalInterest - calculations2.totalInterest)} in interest`}
            </p>
          </CardContent>
        </Card>
      )}

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

        <Button
          onClick={() => setShowPrepayment(!showPrepayment)}
          variant={showPrepayment ? 'default' : 'outline'}
          size="sm"
        >
          <Zap className="mr-2 h-4 w-4" />
          {showPrepayment ? 'Hide' : 'Show'} Prepayment Simulator
        </Button>
      </div>

      {/* ✅ Prepayment Impact Simulator */}
      {showPrepayment && !comparisonMode && (
        <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Zap className="h-5 w-5 text-purple-600" />
              Prepayment Impact Simulator
            </CardTitle>
            <p className="text-sm text-slate-600 mt-2">
              See how much you can save by making extra payments
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Extra Payment Amount
              </label>
              <CalculatorField
                label=""
                value={prepaymentAmount}
                min={10000}
                max={amount}
                step={10000}
                onChange={setPrepaymentAmount}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                When to Pay? (After {prepaymentMonth}{' '}
                {prepaymentMonth === 1 ? 'month' : 'months'})
              </label>
              <Slider
                value={[prepaymentMonth]}
                onValueChange={([value]) => setPrepaymentMonth(value)}
                min={1}
                max={tenure * 12}
                step={1}
                className="py-4"
              />
              <div className="text-xs text-slate-500">
                Make prepayment after month {prepaymentMonth} of {tenure * 12}
              </div>
            </div>

            <div className="p-5 bg-linear-to-br from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Your Savings
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    Interest Saved
                  </div>
                  <div className="text-3xl font-bold text-emerald-700">
                    {formatINR(prepaymentImpact.interestSaved)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Tenure Reduced By
                  </div>
                  <div className="text-3xl font-bold text-emerald-700">
                    {prepaymentImpact.tenureReduction}{' '}
                    {prepaymentImpact.tenureReduction === 1
                      ? 'month'
                      : 'months'}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-700 mt-4 p-3 bg-white/70 rounded border border-emerald-200">
                💡 <strong>Tip:</strong> Making prepayments in the early years
                saves maximum interest because the principal is still high.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ✅ Saved Calculations History - Only render after client mount */}
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
                  <div
                    className="cursor-pointer"
                    onClick={() => handleLoadCalculation(calc)}
                  >
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <div className="font-semibold text-sm">
                          {formatINR(calc.amount)} @ {calc.rate}% for{' '}
                          {calc.tenure} years
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          EMI: {formatINR(calc.emi)} | Interest:{' '}
                          {formatINR(calc.totalInterest)}
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
