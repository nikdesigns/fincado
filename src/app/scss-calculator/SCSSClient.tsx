'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { IndianRupee, ShieldCheck, Wallet } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SCSSClient() {
  const [investment, setInvestment] = useState<number>(1500000);

  const interestRate = 8.2; // Current SCSS rate (FY 2025-26)
  const tenureYears = 5;

  const result = useMemo(() => {
    const quarterlyInterest = (investment * (interestRate / 100)) / 4;
    const totalInterest = quarterlyInterest * (tenureYears * 4); // 20 quarters
    const totalAmount = investment + totalInterest;

    return {
      quarterlyInterest,
      annualInterest: quarterlyInterest * 4,
      totalInterest,
      totalAmount,
    };
  }, [investment]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  const principalPercentage = (investment / result.totalAmount) * 100;
  const interestPercentage = 100 - principalPercentage;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
      {/* INPUT SECTION */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <Label className="text-slate-700 font-semibold text-base">
                  Investment Amount
                </Label>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                  Max ₹30 Lakhs
                </span>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  type="number"
                  value={investment || ''}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setInvestment(Math.min(Math.max(val, 1000), 3000000));
                  }}
                  className="pl-10 text-2xl font-semibold border-slate-300 h-14 text-slate-900"
                />
              </div>

              <Slider
                value={[investment]}
                min={1000}
                max={3000000}
                step={1000}
                onValueChange={(val) => setInvestment(val[0])}
                className="pt-3"
              />

              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>₹1,000</span>
                <span>₹15 Lakhs</span>
                <span>₹30 Lakhs</span>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
              <div className="bg-brand-50 border border-brand-400 rounded-2xl p-4">
                <div className="text-xs font-semibold text-brand-700 tracking-wider">
                  INTEREST RATE
                </div>
                <div className="text-xl font-semibold text-brand-700 mt-1">
                  {interestRate}% p.a.
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-xs font-semibold text-slate-600 tracking-wider">
                  TENURE
                </div>
                <div className="text-xl font-semibold text-slate-900 mt-1">
                  {tenureYears} Years
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RESULTS SECTION */}
      <div className="lg:col-span-7">
        <Card className="border-brand-400 bg-white shadow-md overflow-hidden h-full flex flex-col">
          {/* Header */}
          <div className="bg-linear-to-br from-brand-50 to-white border-b border-brand-200 p-6 sm:p-8">
            <p className="text-sm font-semibold text-brand-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Quarterly Income
            </p>
            <h3 className="text-5xl font-semibold text-slate-900 tracking-tighter">
              {formatCurrency(result.quarterlyInterest)}
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Credited every 3 months • Guaranteed
            </p>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-slate-600">Principal</span>
                <span className="text-brand-600">Total Interest</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-slate-400 transition-all"
                  style={{ width: `${principalPercentage}%` }}
                />
                <div
                  className="h-full bg-brand-600 transition-all"
                  style={{ width: `${interestPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <CardContent className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600">Total Investment</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(investment)}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600">Total Interest (5 Years)</span>
                <span className="font-semibold text-brand-700">
                  +{formatCurrency(result.totalInterest)}
                </span>
              </div>

              <div className="flex justify-between py-4 bg-emerald-50 rounded-2xl border border-emerald-100 px-5">
                <span className="font-semibold text-emerald-900">
                  Maturity Amount
                </span>
                <span className="font-semibold text-emerald-700 text-2xl">
                  {formatCurrency(result.totalAmount)}
                </span>
              </div>
            </div>

            {/* Government Guarantee */}
            <Alert className="mt-8 bg-blue-50 border-blue-100">
              <ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5" />
              <AlertDescription className="ml-2 text-xs leading-relaxed">
                <strong>100% Government Guaranteed</strong> • Senior Citizens
                Savings Scheme is backed by the Government of India.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
