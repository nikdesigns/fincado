// src/components/calculators/HomeLoanCalculatorEmbed.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp, IndianRupee, Clock } from 'lucide-react';

const HomeLoanCalculatorEmbed: React.FC = () => {
  // State
  const [loanAmount, setLoanAmount] = useState(5000000); // ₹50L
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  // Calculate EMI
  useEffect(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;

    const calculatedEMI =
      (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = calculatedEMI * n;
    const interest = totalPayment - P;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmi(Math.round(calculatedEMI));
    setTotalInterest(Math.round(interest));
  }, [loanAmount, interestRate, tenure]);

  // Format currency
  const formatAmount = (amount: number): string => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Calculator className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xl">
                Calculate Your EMI
              </h3>
              <p className="text-sm text-slate-600">
                Adjust values to see instant results
              </p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-8 mb-8">
          {/* Loan Amount */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <Label className="text-sm font-semibold text-slate-700">
                Loan Amount
              </Label>
              <span className="text-lg font-bold text-slate-900">
                {formatAmount(loanAmount)}
              </span>
            </div>
            <Slider
              value={[loanAmount]}
              onValueChange={(val) => setLoanAmount(val[0])}
              min={500000}
              max={10000000}
              step={100000}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>₹5 Lakh</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <Label className="text-sm font-semibold text-slate-700">
                Interest Rate (per annum)
              </Label>
              <span className="text-lg font-bold text-slate-900">
                {interestRate.toFixed(2)}%
              </span>
            </div>
            <Slider
              value={[interestRate]}
              onValueChange={(val) => setInterestRate(val[0])}
              min={6.5}
              max={12}
              step={0.1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>6.5%</span>
              <span>12%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <Label className="text-sm font-semibold text-slate-700">
                Loan Tenure
              </Label>
              <span className="text-lg font-bold text-slate-900">
                {tenure} years
              </span>
            </div>
            <Slider
              value={[tenure]}
              onValueChange={(val) => setTenure(val[0])}
              min={5}
              max={30}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>5 years</span>
              <span>30 years</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-100" />

        {/* Results */}
        <div className="space-y-6">
          {/* Primary EMI Result */}
          <div className="bg-linear-to-br from-emerald-50 via-emerald-50/50 to-white border border-emerald-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee className="h-4 w-4 text-emerald-600" />
                  <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                    Monthly EMI
                  </p>
                </div>
                <p className="text-4xl font-bold text-emerald-700 mb-1">
                  {formatAmount(emi)}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {tenure} years • {tenure * 12} monthly payments
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Total Interest */}
            <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
              <p className="text-xs text-slate-600 font-medium mb-2">
                Total Interest
              </p>
              <p className="text-xl font-bold text-slate-900">
                {formatAmount(totalInterest)}
              </p>
            </div>

            {/* Total Payment */}
            <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
              <p className="text-xs text-slate-600 font-medium mb-2">
                Total Payment
              </p>
              <p className="text-xl font-bold text-slate-900">
                {formatAmount(emi * tenure * 12)}
              </p>
            </div>
          </div>

          {/* Payment Breakdown Bar */}
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-3">
              Payment Breakdown
            </p>
            <div className="relative h-10 w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
              <div
                className="absolute top-0 left-0 h-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center transition-all duration-300"
                style={{
                  width: `${(loanAmount / (emi * tenure * 12)) * 100}%`,
                }}
              >
                <span className="text-white text-xs font-semibold">
                  Principal{' '}
                  {((loanAmount / (emi * tenure * 12)) * 100).toFixed(0)}%
                </span>
              </div>
              <div
                className="absolute top-0 h-full bg-linear-to-r from-amber-500 to-amber-600 flex items-center justify-center transition-all duration-300"
                style={{
                  left: `${(loanAmount / (emi * tenure * 12)) * 100}%`,
                  width: `${(totalInterest / (emi * tenure * 12)) * 100}%`,
                }}
              >
                <span className="text-white text-xs font-semibold">
                  Interest{' '}
                  {((totalInterest / (emi * tenure * 12)) * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-linear-to-r from-blue-500 to-blue-600" />
                <span>Principal: {formatAmount(loanAmount)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-linear-to-r from-amber-500 to-amber-600" />
                <span>Interest: {formatAmount(totalInterest)}</span>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-blue-100 rounded-lg shrink-0 mt-0.5">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">Pro Tip: </span>
                Reducing your loan tenure from {tenure} to{' '}
                {Math.max(5, tenure - 5)} years saves{' '}
                <span className="font-bold text-blue-700">
                  {formatAmount(
                    totalInterest -
                      (((loanAmount *
                        (interestRate / 12 / 100) *
                        Math.pow(
                          1 + interestRate / 12 / 100,
                          Math.max(5, tenure - 5) * 12,
                        )) /
                        (Math.pow(
                          1 + interestRate / 12 / 100,
                          Math.max(5, tenure - 5) * 12,
                        ) -
                          1)) *
                        Math.max(5, tenure - 5) *
                        12 -
                        loanAmount),
                  )}
                </span>{' '}
                in total interest, though your monthly EMI will increase.
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <a
              href="/loans/home-loan/"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors text-sm shadow-sm"
            >
              <Calculator className="h-4 w-4" />
              View Detailed Amortization Schedule
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeLoanCalculatorEmbed;
