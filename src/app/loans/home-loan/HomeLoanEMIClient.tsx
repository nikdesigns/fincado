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
  Zap,
  TrendingDown,
  Calendar,
  IndianRupee,
  Trash2,
  PiggyBank,
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

export default function HomeLoanEMIClient() {
  // Home loan specific defaults
  const [amount, setAmount] = useState(3000000); // 30 lakhs
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const [showPrepayment, setShowPrepayment] = useState(false);
  const [prepaymentAmount, setPrepaymentAmount] = useState(100000);
  const [prepaymentMonth, setPrepaymentMonth] = useState(12);

  const [showTaxBenefits] = useState(true);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    try {
      const saved = localStorage.getItem('home_loan_emi_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved calculations:', error);
    }
  }, []);

  const calculations = useMemo(() => {
    if (tenure <= 0)
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

    if (!isFinite(emi) || emi < 0) emi = 0;

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

  // Tax benefits calculation (approximate yearly estimate)
  const taxBenefits = useMemo(() => {
    if (tenure <= 0) {
      return {
        principalDeduction: 0,
        interestDeduction: 0,
        totalDeduction: 0,
        taxSaved: 0,
      };
    }

    const yearlyEMI = calculations.emi * 12;
    const avgYearlyInterest = calculations.totalInterest / tenure;

    const yearlyInterest = Math.min(avgYearlyInterest, 200000); // Max 2L under 24(b)
    const yearlyPrincipal = Math.min(
      Math.max(0, yearlyEMI - avgYearlyInterest),
      150000,
    ); // Max 1.5L under 80C

    const totalDeduction = yearlyPrincipal + yearlyInterest;
    const taxSaved = totalDeduction * 0.3; // Assuming 30% tax bracket

    return {
      principalDeduction: Math.round(yearlyPrincipal),
      interestDeduction: Math.round(yearlyInterest),
      totalDeduction: Math.round(totalDeduction),
      taxSaved: Math.round(taxSaved),
    };
  }, [calculations, tenure]);

  const prepaymentImpact = useMemo(() => {
    if (!showPrepayment || prepaymentAmount <= 0 || tenure <= 0) {
      return { interestSaved: 0, tenureReduction: 0, newEmi: 0 };
    }

    const r = rate / 12 / 100;
    const n = tenure * 12;

    // Use exact EMI (not rounded) for simulation precision
    const emi =
      rate === 0
        ? amount / n
        : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    if (!isFinite(emi) || emi <= 0) {
      return { interestSaved: 0, tenureReduction: 0, newEmi: 0 };
    }

    const effectivePrepaymentMonth = Math.min(prepaymentMonth, n);
    let remainingPrincipal = amount;

    for (let i = 0; i < effectivePrepaymentMonth; i++) {
      if (remainingPrincipal <= 0) break;
      const interestForMonth = remainingPrincipal * r;
      const principalForMonth = Math.min(
        remainingPrincipal,
        emi - interestForMonth,
      );
      remainingPrincipal -= principalForMonth;
    }

    const newPrincipal = Math.max(0, remainingPrincipal - prepaymentAmount);
    const remainingMonths = Math.max(0, n - effectivePrepaymentMonth);

    let totalInterestWithout = 0;
    let balance = remainingPrincipal;
    for (let i = 0; i < remainingMonths; i++) {
      if (balance <= 0) break;
      const interest = balance * r;
      totalInterestWithout += interest;
      const principalPay = Math.min(balance, emi - interest);
      balance -= principalPay;
    }

    let totalInterestWith = 0;
    let balanceWith = newPrincipal;
    let monthsNeeded = 0;
    while (balanceWith > 0 && monthsNeeded < remainingMonths) {
      const interest = balanceWith * r;
      totalInterestWith += interest;
      const principalPay = Math.min(balanceWith, emi - interest);
      balanceWith -= principalPay;
      monthsNeeded++;
    }

    const interestSaved = Math.round(totalInterestWithout - totalInterestWith);
    const tenureReduction = remainingMonths - monthsNeeded;

    return {
      interestSaved: Math.max(0, interestSaved),
      tenureReduction: Math.max(0, tenureReduction),
      newEmi: Math.round(emi),
    };
  }, [showPrepayment, prepaymentAmount, prepaymentMonth, amount, rate, tenure]);

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
      localStorage.setItem('home_loan_emi_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success('Calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'home_loan_emi_saved', {
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
      localStorage.setItem('home_loan_emi_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('home_loan_emi_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');
  };

  const handleShare = () => {
    const message =
      `🏠 Home Loan EMI Calculation\n\n` +
      `Loan Amount: ${formatINR(amount)}\n` +
      `Interest Rate: ${rate}% p.a.\n` +
      `Tenure: ${tenure} years\n\n` +
      `📊 Monthly EMI: ${formatINR(calculations.emi)}\n` +
      `💸 Total Interest: ${formatINR(calculations.totalInterest)}\n` +
      `💰 Tax Saving: ${formatINR(taxBenefits.taxSaved)}/year\n\n` +
      `Calculate yours: https://fincado.com/loans/home-loan/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'home_loan_emi_shared', {
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
      <Card className="bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* INPUTS */}
            <div className="space-y-6">
              <CalculatorField
                label="Home Loan Amount (₹)"
                value={amount}
                min={500000}
                max={50000000}
                step={100000}
                onChange={setAmount}
              />

              <CalculatorField
                label="Interest Rate (% p.a)"
                value={rate}
                min={6}
                max={15}
                step={0.1}
                onChange={setRate}
              />

              <CalculatorField
                label="Loan Tenure (Years)"
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
                <div className="text-sm text-muted-foreground">Monthly EMI</div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-[#74A046]">
                  {formatINR(calculations.emi)}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        Principal Amount
                      </div>
                      <div className="mt-1 font-semibold text-foreground whitespace-nowrap">
                        {formatINR(amount)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <div className="text-xs text-red-700">Total Interest</div>
                      <div className="mt-1 font-semibold text-red-700 whitespace-nowrap">
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

      {/* Tax Benefits Section */}
      {showTaxBenefits && (
        <Card className="border-[#DFF7C6] bg-linear-to-br from-[#F7FDF1] to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <PiggyBank className="h-5 w-5 text-[#92C65B]" />
              Tax Benefits on Home Loan
            </CardTitle>
            <p className="text-sm text-slate-600 mt-2">
              Estimated annual tax savings under current tax laws
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-[#DFF7C6]">
                <div className="text-xs text-slate-600 mb-1">
                  Section 80C (Principal)
                </div>
                <div className="text-2xl font-semibold text-[#74A046]">
                  {formatINR(taxBenefits.principalDeduction)}
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-[#DFF7C6]">
                <div className="text-xs text-slate-600 mb-1">
                  Section 24(b) (Interest)
                </div>
                <div className="text-2xl font-semibold text-[#74A046]">
                  {formatINR(taxBenefits.interestDeduction)}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#EFFBE2] rounded-lg">
              <div className="text-sm text-[#1B2E06] mb-1 font-semibold">
                Total Annual Tax Saving (30% bracket)
              </div>
              <div className="text-3xl font-semibold text-[#74A046]">
                {formatINR(taxBenefits.taxSaved)}
              </div>
            </div>

            <p className="text-xs text-slate-600">
              *Actual tax benefits depend on your income tax slab and other
              deductions claimed
            </p>
          </CardContent>
        </Card>
      )}

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
          onClick={() => setShowPrepayment(!showPrepayment)}
          variant={showPrepayment ? 'default' : 'outline'}
          size="sm"
        >
          <Zap className="mr-2 h-4 w-4" />
          {showPrepayment ? 'Hide' : 'Show'} Prepayment Simulator
        </Button>
      </div>

      {/* Prepayment Impact Simulator */}
      {showPrepayment && (
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

            <div className="p-5 bg-linear-to-br from-[#F7FDF1] to-[#F7FDF1] rounded-lg border-2 border-[#DFF7C6]">
              <h4 className="font-semibold text-[#1B2E06] mb-4 flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Your Savings
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    Interest Saved
                  </div>
                  <div className="text-3xl font-semibold text-[#74A046]">
                    {formatINR(prepaymentImpact.interestSaved)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Tenure Reduced By
                  </div>
                  <div className="text-3xl font-semibold text-[#74A046]">
                    {prepaymentImpact.tenureReduction}{' '}
                    {prepaymentImpact.tenureReduction === 1
                      ? 'month'
                      : 'months'}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-700 mt-4 p-3 bg-white/70 rounded border border-[#DFF7C6]">
                💡 <strong>Tip:</strong> Making prepayments in the early years
                saves maximum interest because the principal is still high.
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
