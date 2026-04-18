'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp, Clock, ShieldCheck } from 'lucide-react';
import { getLatestHomeRate } from '@/data/live-rates';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

const HomeLoanCalculatorEmbed: React.FC = () => {
  // Input states
  const [loanAmount, setLoanAmount] = useState(5000000); // ₹50 Lakh default
  const [interestRate, setInterestRate] = useState(
    getLatestHomeRate('sbi', 8.5),
  );
  const [tenure, setTenure] = useState(20);

  const currentDate = getCurrentMonthYearLabel();

  // Pure calculation using useMemo (removes the lint error)
  const { emi, totalInterest } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;

    if (P <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalInterest: 0 };
    }

    const calculatedEMI =
      (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = calculatedEMI * n;
    const interest = totalPayment - P;

    return {
      emi: Math.round(calculatedEMI),
      totalInterest: Math.round(interest),
    };
  }, [loanAmount, interestRate, tenure]);

  // Format currency helper
  const formatAmount = (amount: number): string => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Pro Tip: Savings by reducing tenure by 5 years
  const proTipSavings = useMemo(() => {
    const shortTenure = Math.max(5, tenure - 5);
    const r = interestRate / 12 / 100;
    const nShort = shortTenure * 12;

    const shortEMI =
      (loanAmount * r * Math.pow(1 + r, nShort)) /
      (Math.pow(1 + r, nShort) - 1);
    const shortTotalInterest = shortEMI * nShort - loanAmount;

    return Math.max(0, totalInterest - shortTotalInterest);
  }, [loanAmount, interestRate, tenure, totalInterest]);

  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-50 rounded-lg">
              <Calculator className="h-5 w-5 text-brand-700" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-xl">
                Home Loan EMI Calculator
              </h3>
              <p className="text-sm text-slate-600 flex items-center gap-1">
                Updated {currentDate}
                <ShieldCheck className="h-3 w-3 text-brand-600" />
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
              <span className="text-lg font-semibold text-slate-900">
                {formatAmount(loanAmount)}
              </span>
            </div>
            <Slider
              value={[loanAmount]}
              onValueChange={(val) => setLoanAmount(val[0])}
              min={500000}
              max={10000000}
              step={100000}
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
                Interest Rate (p.a.)
              </Label>
              <span className="text-lg font-semibold text-slate-900">
                {interestRate.toFixed(2)}%
              </span>
            </div>
            <Slider
              value={[interestRate]}
              onValueChange={(val) => setInterestRate(val[0])}
              min={6.5}
              max={12}
              step={0.1}
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
              <span className="text-lg font-semibold text-slate-900">
                {tenure} years
              </span>
            </div>
            <Slider
              value={[tenure]}
              onValueChange={(val) => setTenure(val[0])}
              min={5}
              max={30}
              step={1}
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>5 years</span>
              <span>30 years</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-linear-to-br from-brand-50 to-white border border-brand-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-brand-700 uppercase tracking-wide">
                  Monthly EMI
                </p>
                <p className="text-4xl font-semibold text-brand-700">
                  {formatAmount(emi)}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {tenure} years • {tenure * 12} EMIs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
              <p className="text-xs text-slate-600">Total Interest</p>
              <p className="text-xl font-semibold text-slate-900">
                {formatAmount(totalInterest)}
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
              <p className="text-xs text-slate-600">Total Payment</p>
              <p className="text-xl font-semibold text-slate-900">
                {formatAmount(emi * tenure * 12)}
              </p>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-brand-50 border border-brand-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-brand-700 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-semibold">Pro Tip:</span> Reducing tenure
                by 5 years could save you{' '}
                <span className="font-semibold text-brand-700">
                  {formatAmount(proTipSavings)}
                </span>{' '}
                in total interest.
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-slate-500 border-t border-slate-100 pt-4">
            Rates are indicative. Actual EMI depends on your credit score and
            bank policy. Tax benefits available only in Old Regime (Tax Year
            2026-27).
          </div>

          {/* CTA */}
          <a
            href="/loans/home-loan/"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-brand-400 text-[#111827] rounded-lg font-semibold hover:bg-brand-500 transition-colors text-sm shadow-sm"
          >
            <Calculator className="h-4 w-4" />
            View Full Home Loan Calculator
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeLoanCalculatorEmbed;
