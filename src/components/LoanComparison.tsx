// src/components/LoanComparison.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { IndianRupee, Percent, Calendar, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card'; // Assuming you have shadcn card
import { Input } from '@/components/ui/input'; // Assuming you have shadcn input
import { Label } from '@/components/ui/label'; // Assuming you have shadcn label

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
    // Handle edge cases for zero
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
    [loanA]
  );

  const resultsB = useMemo(
    () => calculateLoan(loanB.amount, loanB.rate, loanB.tenure),
    [loanB]
  );

  // --- COMPARISON LOGIC ---
  const difference = Math.abs(resultsA.totalPayment - resultsB.totalPayment);
  const monthlyDiff = Math.abs(resultsA.emi - resultsB.emi);
  const isAEconomical = resultsA.totalPayment < resultsB.totalPayment;
  const winnerName = isAEconomical ? 'Loan A' : 'Loan B';
  const loserName = isAEconomical ? 'Loan B' : 'Loan A';

  // Generic Change Handler
  const handleChange = (
    loan: 'A' | 'B',
    field: keyof LoanState,
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (loan === 'A') {
      setLoanA((prev) => ({ ...prev, [field]: numValue || 0 }));
    } else {
      setLoanB((prev) => ({ ...prev, [field]: numValue || 0 }));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* --- INPUT SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* LOAN A INPUTS */}
        <div className="p-6 bg-white border-b md:border-b-0 md:border-r border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
              A
            </div>
            <h3 className="font-bold text-slate-800">Loan Option A</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Loan Amount (₹)
              </Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="number"
                  value={loanA.amount}
                  onChange={(e) => handleChange('A', 'amount', e.target.value)}
                  className="pl-9 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Interest Rate (%)
              </Label>
              <div className="relative">
                <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="number"
                  step="0.05"
                  value={loanA.rate}
                  onChange={(e) => handleChange('A', 'rate', e.target.value)}
                  className="pl-9 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Tenure (Years)
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="number"
                  value={loanA.tenure}
                  onChange={(e) => handleChange('A', 'tenure', e.target.value)}
                  className="pl-9 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* LOAN B INPUTS */}
        <div className="p-6 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
              B
            </div>
            <h3 className="font-bold text-slate-800">Loan Option B</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Loan Amount (₹)
              </Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="number"
                  value={loanB.amount}
                  onChange={(e) => handleChange('B', 'amount', e.target.value)}
                  className="pl-9 font-medium bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Interest Rate (%)
              </Label>
              <div className="relative">
                <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="number"
                  step="0.05"
                  value={loanB.rate}
                  onChange={(e) => handleChange('B', 'rate', e.target.value)}
                  className="pl-9 font-medium bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Tenure (Years)
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="number"
                  value={loanB.tenure}
                  onChange={(e) => handleChange('B', 'tenure', e.target.value)}
                  className="pl-9 font-medium bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RESULTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Result A */}
        <Card
          className={`border shadow-sm transition-all ${
            isAEconomical
              ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/20'
              : 'border-slate-200'
          }`}
        >
          <CardContent className="p-5 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
              Loan A Result
            </span>
            <div
              className={`text-2xl font-bold mb-1 ${
                isAEconomical ? 'text-emerald-700' : 'text-slate-900'
              }`}
            >
              {formatINR(resultsA.emi)}
              <span className="text-xs font-normal text-slate-500 ml-1">
                /mo
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Total Interest:{' '}
              <span className="font-medium text-slate-700">
                {formatINR(resultsA.totalInterest)}
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Result B */}
        <Card
          className={`border shadow-sm transition-all ${
            !isAEconomical
              ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/20'
              : 'border-slate-200'
          }`}
        >
          <CardContent className="p-5 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
              Loan B Result
            </span>
            <div
              className={`text-2xl font-bold mb-1 ${
                !isAEconomical ? 'text-emerald-700' : 'text-slate-900'
              }`}
            >
              {formatINR(resultsB.emi)}
              <span className="text-xs font-normal text-slate-500 ml-1">
                /mo
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Total Interest:{' '}
              <span className="font-medium text-slate-700">
                {formatINR(resultsB.totalInterest)}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- VERDICT BANNER --- */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full shrink-0 mt-1">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-emerald-900">
              {winnerName} is the winner!
            </h4>
            <p className="text-emerald-800 text-sm mt-1">
              By choosing <strong>{winnerName}</strong> over {loserName}, you
              will save
              <span className="font-bold text-emerald-700 text-lg mx-1">
                {formatINR(difference)}
              </span>
              in total interest payments.
            </p>
            <p className="text-xs text-emerald-600/80 mt-2">
              Monthly savings: {formatINR(monthlyDiff)} per month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
