'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  IndianRupee,
  CalendarDays,
  TrendingUp,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function KVPClient() {
  const [investment, setInvestment] = useState<number>(100000);
  const [investmentDate, setInvestmentDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );

  const interestRate = 7.5; // Current KVP rate
  const monthsToDouble = 115; // Official 9 years 7 months

  const result = useMemo(() => {
    const maturityAmount = investment * 2;

    // Calculate exact maturity date
    const dateObj = new Date(investmentDate || new Date());
    dateObj.setMonth(dateObj.getMonth() + monthsToDouble);

    const maturityDate = dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Lock-in end date (2 years 6 months = 30 months)
    const lockInObj = new Date(investmentDate || new Date());
    lockInObj.setMonth(lockInObj.getMonth() + 30);
    const lockInDate = lockInObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return {
      maturityAmount,
      maturityDate,
      lockInDate,
      yearsToDouble: Math.floor(monthsToDouble / 12),
      remainingMonths: monthsToDouble % 12,
    };
  }, [investment, investmentDate]);

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
            {/* Investment Amount */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-slate-700 font-semibold text-base">
                  Investment Amount
                </Label>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium border border-emerald-100">
                  No Upper Limit
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  type="number"
                  value={investment || ''}
                  onChange={(e) =>
                    setInvestment(Number(e.target.value) || 1000)
                  }
                  className="pl-10 text-2xl font-semibold border-slate-300 h-14 text-slate-900"
                />
              </div>
              <Slider
                value={[investment]}
                min={1000}
                max={5000000}
                step={1000}
                onValueChange={(val) => setInvestment(val[0])}
                className="pt-3"
              />
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>₹1,000</span>
                <span>₹10 Lakhs</span>
                <span>₹50 Lakhs+</span>
              </div>
            </div>

            {/* Investment Date */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <Label className="text-slate-700 font-semibold text-base">
                Date of Investment
              </Label>
              <Input
                type="date"
                value={investmentDate}
                onChange={(e) => setInvestmentDate(e.target.value)}
                className="h-12 font-medium"
              />
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
              <div className="bg-[#F7FDF1] border border-[#B0EC70] rounded-2xl p-4 text-center">
                <div className="text-xs font-semibold text-[#577A30] tracking-wider">
                  INTEREST RATE
                </div>
                <div className="text-xl font-semibold text-[#577A30] mt-1">
                  {interestRate}% p.a.
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                <div className="text-xs font-semibold text-slate-600 tracking-wider">
                  DOUBLES IN
                </div>
                <div className="text-base font-semibold text-slate-900 leading-tight mt-1">
                  {result.yearsToDouble} Years, {result.remainingMonths} Months
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
              <TrendingUp className="w-4 h-4" /> Your Money Will Double To
            </p>
            <h3 className="text-5xl font-semibold text-slate-900 tracking-tighter">
              {formatCurrency(result.maturityAmount)}
            </h3>
            <p className="text-sm text-slate-600 mt-3 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Maturity Date: <strong>{result.maturityDate}</strong>
            </p>

            {/* Progress Bar - Doubling Visual */}
            <div className="mt-8">
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-slate-600">Invested Today</span>
                <span className="text-[#577A30]">Doubles On Maturity</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex relative">
                <div className="h-full bg-slate-300 w-1/2 transition-all" />
                <div className="h-full bg-[#74A046] w-1/2 transition-all relative">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-[shimmer_3s_infinite]" />
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Total Investment</span>
                <span className="font-semibold text-slate-900 text-lg">
                  {formatCurrency(investment)}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Total Interest Earned</span>
                <span className="font-semibold text-[#577A30] text-lg">
                  +{formatCurrency(investment)}
                </span>
              </div>

              <div className="flex justify-between items-center py-4 bg-emerald-50 rounded-2xl border border-emerald-100 px-5">
                <span className="font-semibold text-emerald-900">
                  Maturity Value
                </span>
                <span className="font-semibold text-emerald-700 text-2xl">
                  {formatCurrency(result.maturityAmount)}
                </span>
              </div>
            </div>

            {/* Lock-in & Guarantee Alerts */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Alert className="bg-blue-50 border-blue-100 text-blue-800 p-4">
                <ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5" />
                <AlertDescription className="ml-2 text-xs">
                  100% Safe: KVP is fully backed by the Government of India.
                </AlertDescription>
              </Alert>
              <Alert className="bg-amber-50 border-amber-100 text-amber-800 p-4">
                <Lock className="h-4 w-4 text-amber-600 mt-0.5" />
                <AlertDescription className="ml-2 text-xs">
                  Lock-in ends: <strong>{result.lockInDate}</strong> (2 years 6
                  months)
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
