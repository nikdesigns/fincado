'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  IndianRupee,
  Wallet,
  ShieldCheck,
  AlertTriangle,
  Users,
  User,
} from 'lucide-react';

export default function POMISClient() {
  const [accountType, setAccountType] = useState<'single' | 'joint'>('single');
  const [investment, setInvestment] = useState<number>(900000);
  const [closureYear, setClosureYear] = useState<number>(5);

  const interestRate = 7.4;
  const tenureYears = 5;
  const maxLimit = accountType === 'single' ? 900000 : 1500000;

  // Clamp investment value
  const clampedInvestment = useMemo(() => {
    return Math.min(Math.max(investment, 1000), maxLimit);
  }, [investment, maxLimit]);

  const result = useMemo(() => {
    const monthlyIncome = (clampedInvestment * (interestRate / 100)) / 12;
    const totalInterest = monthlyIncome * (tenureYears * 12);
    const maturityAmount = clampedInvestment;

    // Premature closure penalty
    let penaltyRate = 0;
    let penaltyAmount = 0;
    let finalPrincipalReturned = clampedInvestment;

    if (closureYear >= 1 && closureYear < 3) {
      penaltyRate = 2;
      penaltyAmount = clampedInvestment * 0.02;
      finalPrincipalReturned = clampedInvestment - penaltyAmount;
    } else if (closureYear >= 3 && closureYear < 5) {
      penaltyRate = 1;
      penaltyAmount = clampedInvestment * 0.01;
      finalPrincipalReturned = clampedInvestment - penaltyAmount;
    }

    return {
      monthlyIncome,
      totalInterest,
      maturityAmount,
      penaltyRate,
      penaltyAmount,
      finalPrincipalReturned,
    };
  }, [clampedInvestment, closureYear]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
      {/* INPUTS SECTION */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-8">
            {/* Account Type Toggle */}
            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold text-base">
                Account Type
              </Label>
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button
                  onClick={() => setAccountType('single')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl transition-all ${
                    accountType === 'single'
                      ? 'bg-white shadow text-slate-900'
                      : 'text-slate-500'
                  }`}
                >
                  <User className="w-4 h-4" /> Single
                </button>
                <button
                  onClick={() => setAccountType('joint')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl transition-all ${
                    accountType === 'joint'
                      ? 'bg-white shadow text-slate-900'
                      : 'text-slate-500'
                  }`}
                >
                  <Users className="w-4 h-4" /> Joint (Up to 3)
                </button>
              </div>
            </div>

            {/* Investment Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-slate-700 font-semibold text-base">
                  Deposit Amount
                </Label>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                  Max: {formatCurrency(maxLimit)}
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
                    setInvestment(Math.min(Math.max(val, 1000), maxLimit));
                  }}
                  className="pl-10 text-2xl font-semibold border-slate-300 h-14 text-slate-900"
                />
              </div>
              <Slider
                value={[clampedInvestment]}
                min={1000}
                max={maxLimit}
                step={1000}
                onValueChange={(val) => setInvestment(val[0])}
                className="pt-3"
              />
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>₹1,000</span>
                <span>₹4,50,000</span>
                <span>{formatCurrency(maxLimit)}</span>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
              <div className="bg-[#F7FDF1] border border-[#B0EC70] rounded-2xl p-4">
                <div className="text-xs font-semibold text-[#577A30] tracking-wider">
                  INTEREST RATE
                </div>
                <div className="text-xl font-semibold text-[#577A30] mt-1">
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
        <Card className="border-[#B0EC70] bg-white shadow-md overflow-hidden h-full flex flex-col">
          <div className="bg-linear-to-br from-[#F7FDF1] to-white border-b border-[#DFF7C6] p-6 sm:p-8">
            <p className="text-sm font-semibold text-[#577A30] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Guaranteed Monthly Income
            </p>
            <h3 className="text-5xl font-semibold text-slate-900 tracking-tighter">
              {formatCurrency(result.monthlyIncome)}
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Credited every month • Government Backed
            </p>
          </div>

          <CardContent className="p-6 sm:p-8 flex-1 flex flex-col">
            <div className="space-y-5">
              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600">Total Investment</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(clampedInvestment)}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600">Total Interest (5 Years)</span>
                <span className="font-semibold text-[#577A30]">
                  +{formatCurrency(result.totalInterest)}
                </span>
              </div>

              <div className="flex justify-between py-4 bg-emerald-50 rounded-2xl border border-emerald-100 px-5">
                <span className="font-semibold text-emerald-900">
                  Maturity Amount
                </span>
                <span className="font-semibold text-emerald-700 text-2xl">
                  {formatCurrency(result.maturityAmount)}
                </span>
              </div>
            </div>

            {/* Premature Closure Simulator */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Premature
                Closure Penalty
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Choose the year you want to close the account
              </p>

              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((year) => (
                  <button
                    key={year}
                    onClick={() => setClosureYear(year)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-md border transition-all ${
                      closureYear === year
                        ? year === 5
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                          : 'bg-rose-100 border-rose-300 text-rose-800'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Year {year}
                  </button>
                ))}
              </div>

              {closureYear === 5 ? (
                <div className="bg-emerald-50 text-sm text-emerald-800 p-4 rounded-xl flex items-center gap-2 border border-emerald-100">
                  <ShieldCheck className="w-4 h-4" />
                  No Penalty at Maturity — Full principal returned.
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-rose-800 font-medium">
                      Penalty Rate
                    </span>
                    <span className="font-semibold text-rose-900">
                      {result.penaltyRate}% of Principal
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-rose-800 font-medium">
                      Penalty Amount
                    </span>
                    <span className="font-semibold text-rose-600">
                      -{formatCurrency(result.penaltyAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-rose-200 pt-2">
                    <span className="text-rose-900 font-semibold">
                      Principal Returned
                    </span>
                    <span className="font-semibold text-rose-900">
                      {formatCurrency(result.finalPrincipalReturned)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
