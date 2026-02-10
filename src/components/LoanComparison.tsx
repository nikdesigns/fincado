// src/components/LoanComparison.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  IndianRupee,
  Percent,
  Calendar,
  Trophy,
  TrendingDown,
  Sparkles,
  Calculator,
  Info,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

// --- TYPES ---
interface LoanState {
  amount: number;
  rate: number;
  tenure: number;
}

// --- HELPER: Format Currency ---
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function LoanComparison() {
  // --- STATE ---
  const [loanA, setLoanA] = useState<LoanState>({
    amount: 5000000,
    rate: 8.5,
    tenure: 20,
  });

  const [loanB, setLoanB] = useState<LoanState>({
    amount: 5000000,
    rate: 9.0,
    tenure: 20,
  });

  // --- CALCULATION LOGIC ---
  const calculateLoan = (amount: number, rate: number, tenure: number) => {
    if (!amount || !rate || !tenure)
      return { emi: 0, totalInterest: 0, totalPayment: 0 };

    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;

    const emi =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - amount;

    return { emi, totalInterest, totalPayment };
  };

  const resultsA = useMemo(
    () => calculateLoan(loanA.amount, loanA.rate, loanA.tenure),
    [loanA],
  );

  const resultsB = useMemo(
    () => calculateLoan(loanB.amount, loanB.rate, loanB.tenure),
    [loanB],
  );

  // --- COMPARISON LOGIC ---
  const difference = Math.abs(resultsA.totalPayment - resultsB.totalPayment);
  const interestDiff = Math.abs(
    resultsA.totalInterest - resultsB.totalInterest,
  );
  const monthlyDiff = Math.abs(resultsA.emi - resultsB.emi);
  const isAEconomical = resultsA.totalPayment < resultsB.totalPayment;
  const winnerName = isAEconomical ? 'Loan A' : 'Loan B';
  const loserName = isAEconomical ? 'Loan B' : 'Loan A';
  const savingsPercent = (
    (difference /
      (isAEconomical ? resultsB.totalPayment : resultsA.totalPayment)) *
    100
  ).toFixed(2);

  // Generic Change Handler
  const handleChange = (
    loan: 'A' | 'B',
    field: keyof LoanState,
    value: string,
  ) => {
    const numValue = parseFloat(value);
    if (loan === 'A') {
      setLoanA((prev) => ({ ...prev, [field]: numValue || 0 }));
    } else {
      setLoanB((prev) => ({ ...prev, [field]: numValue || 0 }));
    }
  };

  // Quick preset buttons
  const applyPreset = (preset: 'home' | 'car' | 'personal') => {
    const presets = {
      home: { amount: 5000000, rate: 8.5, tenure: 20 },
      car: { amount: 1000000, rate: 9.5, tenure: 7 },
      personal: { amount: 500000, rate: 12.0, tenure: 5 },
    };
    setLoanA(presets[preset]);
    setLoanB({ ...presets[preset], rate: presets[preset].rate + 0.5 });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* --- QUICK PRESETS --- */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => applyPreset('home')}
          className="text-xs border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
        >
          <Sparkles className="w-3 h-3 mr-1.5" />
          Home Loan
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => applyPreset('car')}
          className="text-xs border-blue-200 hover:bg-blue-50 hover:border-blue-300"
        >
          <Sparkles className="w-3 h-3 mr-1.5" />
          Car Loan
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => applyPreset('personal')}
          className="text-xs border-purple-200 hover:bg-purple-50 hover:border-purple-300"
        >
          <Sparkles className="w-3 h-3 mr-1.5" />
          Personal Loan
        </Button>
      </div>

      {/* --- INPUT SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-slate-200 rounded-xl overflow-hidden shadow-md">
        {/* LOAN A INPUTS */}
        <div className="p-6 bg-linear-to-br from-blue-50/50 to-white border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                A
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Loan Option A</h3>
                <p className="text-xs text-slate-500">
                  Enter first loan details
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <IndianRupee className="w-3 h-3" />
                Loan Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm font-medium text-slate-500">
                  ₹
                </span>
                <Input
                  type="number"
                  value={loanA.amount}
                  onChange={(e) => handleChange('A', 'amount', e.target.value)}
                  className="pl-8 font-semibold text-base border-slate-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <Percent className="w-3 h-3" />
                Interest Rate (p.a.)
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.05"
                  value={loanA.rate}
                  onChange={(e) => handleChange('A', 'rate', e.target.value)}
                  className="font-semibold text-base border-slate-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                <span className="absolute right-3 top-2.5 text-sm font-medium text-slate-500">
                  %
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                Loan Tenure
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  value={loanA.tenure}
                  onChange={(e) => handleChange('A', 'tenure', e.target.value)}
                  className="font-semibold text-base border-slate-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                <span className="absolute right-3 top-2.5 text-sm font-medium text-slate-500">
                  Years
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LOAN B INPUTS */}
        <div className="p-6 bg-linear-to-br from-purple-50/50 to-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                B
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Loan Option B</h3>
                <p className="text-xs text-slate-500">
                  Enter second loan details
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <IndianRupee className="w-3 h-3" />
                Loan Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm font-medium text-slate-500">
                  ₹
                </span>
                <Input
                  type="number"
                  value={loanB.amount}
                  onChange={(e) => handleChange('B', 'amount', e.target.value)}
                  className="pl-8 font-semibold text-base border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <Percent className="w-3 h-3" />
                Interest Rate (p.a.)
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.05"
                  value={loanB.rate}
                  onChange={(e) => handleChange('B', 'rate', e.target.value)}
                  className="font-semibold text-base border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 bg-white"
                />
                <span className="absolute right-3 top-2.5 text-sm font-medium text-slate-500">
                  %
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                Loan Tenure
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  value={loanB.tenure}
                  onChange={(e) => handleChange('B', 'tenure', e.target.value)}
                  className="font-semibold text-base border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 bg-white"
                />
                <span className="absolute right-3 top-2.5 text-sm font-medium text-slate-500">
                  Years
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RESULTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Result A */}
        <Card
          className={`border-2 shadow-md transition-all duration-300 ${
            isAEconomical
              ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-linear-to-br from-emerald-50 to-white'
              : 'border-slate-200 bg-white'
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                  A
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Loan A Result
                </span>
              </div>
              {isAEconomical && (
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  <Trophy className="w-3 h-3" />
                  <span className="text-xs font-bold">Winner</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500 mb-1 font-medium">
                  Monthly EMI
                </p>
                <div
                  className={`text-3xl font-bold ${
                    isAEconomical ? 'text-emerald-700' : 'text-slate-900'
                  }`}
                >
                  {formatINR(resultsA.emi)}
                  <span className="text-sm font-normal text-slate-500 ml-1">
                    /month
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Principal:</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {formatINR(loanA.amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">
                    Total Interest:
                  </span>
                  <span className="text-sm font-semibold text-amber-700">
                    {formatINR(resultsA.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700">
                    Total Payment:
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    {formatINR(resultsA.totalPayment)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Result B */}
        <Card
          className={`border-2 shadow-md transition-all duration-300 ${
            !isAEconomical
              ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-linear-to-br from-emerald-50 to-white'
              : 'border-slate-200 bg-white'
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">
                  B
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Loan B Result
                </span>
              </div>
              {!isAEconomical && (
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  <Trophy className="w-3 h-3" />
                  <span className="text-xs font-bold">Winner</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500 mb-1 font-medium">
                  Monthly EMI
                </p>
                <div
                  className={`text-3xl font-bold ${
                    !isAEconomical ? 'text-emerald-700' : 'text-slate-900'
                  }`}
                >
                  {formatINR(resultsB.emi)}
                  <span className="text-sm font-normal text-slate-500 ml-1">
                    /month
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Principal:</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {formatINR(loanB.amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">
                    Total Interest:
                  </span>
                  <span className="text-sm font-semibold text-amber-700">
                    {formatINR(resultsB.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700">
                    Total Payment:
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    {formatINR(resultsB.totalPayment)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- ENHANCED VERDICT BANNER --- */}
      <div className="relative bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50/30 border-2 border-emerald-200 rounded-xl p-6 shadow-md overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute -right-8 -top-8 opacity-5">
          <Trophy className="w-48 h-48 text-emerald-600" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="p-3 bg-linear-to-br from-emerald-500 to-teal-500 text-white rounded-xl shrink-0 shadow-lg">
            <Trophy className="w-7 h-7" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-xl font-bold text-emerald-900">
                {winnerName} is the winner!
              </h4>
              <Badge className="bg-emerald-600 text-white text-xs">
                Save {savingsPercent}%
              </Badge>
            </div>

            <p className="text-emerald-800 text-sm leading-relaxed">
              By choosing{' '}
              <strong className="text-emerald-900">{winnerName}</strong> over{' '}
              {loserName}, you will save{' '}
              <span className="font-bold text-emerald-700 text-lg mx-1">
                {formatINR(interestDiff)}
              </span>{' '}
              in total interest payments over{' '}
              {isAEconomical ? loanA.tenure : loanB.tenure} years.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/80 rounded-lg p-3 border border-emerald-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs text-slate-600 font-medium">
                    Monthly Savings
                  </span>
                </div>
                <p className="text-base font-bold text-emerald-700">
                  {formatINR(monthlyDiff)}
                </p>
              </div>

              <div className="bg-white/80 rounded-lg p-3 border border-emerald-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs text-slate-600 font-medium">
                    Total Savings
                  </span>
                </div>
                <p className="text-base font-bold text-emerald-700">
                  {formatINR(difference)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- INFO BOX --- */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h5 className="text-sm font-semibold text-blue-900 mb-1">
            💡 Pro Tip
          </h5>
          <p className="text-sm text-blue-800 leading-relaxed">
            Even a 0.5% difference in interest rate can result in significant
            savings over the loan tenure. Always compare multiple lenders and
            negotiate for the best rate.
          </p>
        </div>
      </div>
    </div>
  );
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold ${className}`}
    >
      {children}
    </span>
  );
}
