'use client';

import React, { useMemo, useState, useEffect } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  BookmarkIcon,
  Share2Icon,
  Sparkles,
  TrendingUp,
  Calendar,
  IndianRupee,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

interface SavedCalculation {
  id: number;
  amount: number;
  rate: number;
  tenure: number;
  emi: number;
  totalInterest: number;
  date: string;
}

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

export default function EducationLoanEMIClient() {
  // Education loan specific defaults
  const [amount, setAmount] = useState(1000000); // 10 lakhs
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(10);
  const [moratoriumPeriod, setMoratoriumPeriod] = useState(5); // Course duration in years
  const [taxBracket, setTaxBracket] = useState(30); // 30% tax bracket

  const [showTaxBenefit, setShowTaxBenefit] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    try {
      const saved = localStorage.getItem('education_loan_emi_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved calculations:', error);
    }
  }, []);

  const calculations = useMemo(() => {
    if (tenure === 0)
      return {
        emi: 0,
        totalInterest: 0,
        principalPct: 0,
        interestPct: 0,
        totalPayment: 0,
        moratoriumInterest: 0,
        effectiveRate: rate,
      };

    const r = rate / 12 / 100;
    const n = tenure * 12;

    // Calculate simple interest during moratorium
    const moratoriumMonths = moratoriumPeriod * 12;
    const moratoriumInterest = amount * (rate / 100) * moratoriumPeriod;

    // New principal after moratorium (if interest is capitalized)
    const principalAfterMoratorium = amount + moratoriumInterest;

    let emi = 0;
    if (rate === 0) {
      emi = principalAfterMoratorium / n;
    } else {
      emi =
        (principalAfterMoratorium * r * Math.pow(1 + r, n)) /
        (Math.pow(1 + r, n) - 1);
    }

    if (!isFinite(emi)) emi = 0;

    const totalPayment = emi * n;
    const totalInterest = totalPayment - amount; // Total interest including moratorium

    const principalPct =
      totalPayment > 0 ? Math.round((amount / totalPayment) * 100) : 0;
    const interestPct = 100 - principalPct;

    // Effective rate after tax benefit (Section 80E)
    const effectiveRate = rate * (1 - taxBracket / 100);

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPct,
      interestPct,
      moratoriumInterest: Math.round(moratoriumInterest),
      effectiveRate: effectiveRate.toFixed(2),
    };
  }, [amount, rate, tenure, moratoriumPeriod, taxBracket]);

  const taxBenefits = useMemo(() => {
    if (!showTaxBenefit) {
      return { annualTaxSaving: 0, totalTaxSaving: 0, effectiveCost: 0 };
    }

    // Average annual interest (approximation)
    const annualInterest = calculations.totalInterest / tenure;

    // Tax saving per year (Section 80E - 100% interest is deductible)
    const annualTaxSaving = Math.round(annualInterest * (taxBracket / 100));

    // Total tax saving over 8 years (max period for 80E)
    const yearsForTaxBenefit = Math.min(tenure, 8);
    const totalTaxSaving = Math.round(annualTaxSaving * yearsForTaxBenefit);

    // Effective cost after tax savings
    const effectiveCost = calculations.totalInterest - totalTaxSaving;

    return {
      annualTaxSaving,
      totalTaxSaving,
      effectiveCost: Math.max(0, effectiveCost),
    };
  }, [showTaxBenefit, calculations.totalInterest, tenure, taxBracket]);

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
      localStorage.setItem(
        'education_loan_emi_history',
        JSON.stringify(trimmed),
      );
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success('Calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'education_loan_emi_saved', {
        loan_amount: amount,
        interest_rate: rate,
        tenure_years: tenure,
      });
    }
  };

  const handleDeleteCalculation = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem(
        'education_loan_emi_history',
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('education_loan_emi_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');
  };

  const handleShare = () => {
    const message =
      `🎓 Education Loan EMI Calculation\n\n` +
      `Loan Amount: ${formatINR(amount)}\n` +
      `Interest Rate: ${rate}% p.a.\n` +
      `Tenure: ${tenure} years\n` +
      `Moratorium: ${moratoriumPeriod} years\n\n` +
      `📊 Monthly EMI: ${formatINR(calculations.emi)}\n` +
      `💸 Total Interest: ${formatINR(calculations.totalInterest)}\n` +
      `💰 Section 80E Tax Saving: ${formatINR(taxBenefits.totalTaxSaving)}\n\n` +
      `Calculate yours: https://fincado.com/emi-calculator/education-loan/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'education_loan_emi_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleLoadCalculation = (calc: SavedCalculation) => {
    setAmount(calc.amount);
    setRate(calc.rate);
    setTenure(calc.tenure);
    toast.success('Calculation loaded!');
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator */}
      <Card className="border-none shadow-none bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* INPUTS */}
            <div className="space-y-6">
              <CalculatorField
                label="Loan Amount (₹)"
                value={amount}
                min={100000}
                max={15000000}
                step={50000}
                onChange={setAmount}
              />

              <CalculatorField
                label="Interest Rate (% p.a)"
                value={rate}
                min={8}
                max={16}
                step={0.1}
                onChange={setRate}
              />

              <CalculatorField
                label="Repayment Tenure (Years)"
                value={tenure}
                min={5}
                max={15}
                step={1}
                onChange={setTenure}
              />

              <CalculatorField
                label="Moratorium Period (Years)"
                value={moratoriumPeriod}
                min={1}
                max={7}
                step={1}
                onChange={setMoratoriumPeriod}
              />

              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="text-xs text-indigo-900 font-medium mb-2">
                  Moratorium Interest (Simple Interest)
                </div>
                <div className="text-2xl font-bold text-indigo-700">
                  {formatINR(calculations.moratoriumInterest)}
                </div>
                <div className="text-xs text-indigo-600 mt-1">
                  Added to principal after course completion
                </div>
              </div>
            </div>

            {/* VISUALS */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={calculations.principalPct}
                interestPct={calculations.interestPct}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-muted-foreground">
                  Monthly EMI (After Moratorium)
                </div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-indigo-700">
                  {formatINR(calculations.emi)}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        Original Principal
                      </div>
                      <div className="mt-1 font-semibold text-foreground whitespace-nowrap">
                        {formatINR(amount)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900">
                    <CardContent className="p-4">
                      <div className="text-xs text-red-700 dark:text-red-400">
                        Total Interest
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

        <Button
          onClick={() => setShowTaxBenefit(!showTaxBenefit)}
          variant={showTaxBenefit ? 'default' : 'outline'}
          size="sm"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {showTaxBenefit ? 'Hide' : 'Show'} Section 80E Tax Benefits
        </Button>
      </div>

      {/* Section 80E Tax Benefits */}
      {showTaxBenefit && (
        <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              Section 80E Tax Benefits Calculator
            </CardTitle>
            <p className="text-sm text-slate-600 mt-2">
              100% of interest paid is tax deductible for 8 years (no maximum
              limit)
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Your Tax Bracket: {taxBracket}%
              </label>
              <Slider
                value={[taxBracket]}
                onValueChange={([value]) => setTaxBracket(value)}
                min={0}
                max={30}
                step={5}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>0% (No Tax)</span>
                <span>5%</span>
                <span>20%</span>
                <span>30%</span>
              </div>
            </div>

            <div className="p-5 bg-linear-to-br from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Tax Savings (Section 80E)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Annual Tax Saving
                  </div>
                  <div className="text-2xl font-bold text-emerald-700">
                    {formatINR(taxBenefits.annualTaxSaving)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    Total Tax Saving (8 yrs)
                  </div>
                  <div className="text-2xl font-bold text-emerald-700">
                    {formatINR(taxBenefits.totalTaxSaving)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Effective Interest Cost
                  </div>
                  <div className="text-2xl font-bold text-emerald-700">
                    {formatINR(taxBenefits.effectiveCost)}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white/70 rounded border border-emerald-200">
                <div className="text-sm font-semibold text-slate-900 mb-2">
                  Effective Interest Rate After Tax Benefit
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-emerald-700">
                    {calculations.effectiveRate}%
                  </span>
                  <span className="text-sm text-slate-600">
                    (Original: {rate}%)
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 mt-4 p-3 bg-white/70 rounded border border-emerald-200">
                💡 <strong>Pro Tip:</strong> With 30% tax bracket and 10% loan
                rate, your effective cost is only 7%. This makes education loans
                one of the cheapest loans in India. Don&apos;t rush to prepay if
                you can invest at higher returns!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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
