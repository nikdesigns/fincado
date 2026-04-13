'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { IndianRupee, TrendingUp, PiggyBank, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function HindiPrepaymentClient() {
  // Current Loan Details
  const [outstandingPrincipal, setOutstandingPrincipal] =
    useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [remainingYears, setRemainingYears] = useState<number>(15);
  const [remainingMonths, setRemainingMonths] = useState<number>(0);

  // Prepayment Strategy
  const [lumpsum, setLumpsum] = useState<number>(500000);
  const [extraMonthly, setExtraMonthly] = useState<number>(0);

  const result = useMemo(() => {
    const totalRemainingMonths = remainingYears * 12 + remainingMonths;
    const monthlyRate = interestRate / 12 / 100;

    if (totalRemainingMonths <= 0 || outstandingPrincipal <= 0) return null;

    // Original EMI without prepayment
    const baseEmi =
      (outstandingPrincipal *
        monthlyRate *
        Math.pow(1 + monthlyRate, totalRemainingMonths)) /
      (Math.pow(1 + monthlyRate, totalRemainingMonths) - 1);

    const originalTotalInterest =
      baseEmi * totalRemainingMonths - outstandingPrincipal;

    // Simulate prepayment scenario
    let currentBalance = outstandingPrincipal;
    let newMonthCount = 0;
    let newTotalInterest = 0;

    // Apply lumpsum immediately
    if (lumpsum > 0) currentBalance -= lumpsum;

    while (currentBalance > 0 && newMonthCount < totalRemainingMonths) {
      newMonthCount++;
      const interestForMonth = currentBalance * monthlyRate;
      newTotalInterest += interestForMonth;

      const principalFromEmi = baseEmi - interestForMonth;
      const totalPrincipalPaidThisMonth = principalFromEmi + extraMonthly;

      currentBalance -= totalPrincipalPaidThisMonth;

      if (newMonthCount > 600) break; // safety
    }

    const tenureSavedMonths = totalRemainingMonths - newMonthCount;
    const interestSaved = originalTotalInterest - newTotalInterest;

    return {
      baseEmi,
      originalTotalInterest,
      newTotalInterest,
      interestSaved,
      originalTenure: totalRemainingMonths,
      newTenure: newMonthCount,
      tenureSavedMonths,
    };
  }, [
    outstandingPrincipal,
    interestRate,
    remainingYears,
    remainingMonths,
    lumpsum,
    extraMonthly,
  ]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  const formatTenure = (totalMonths: number) => {
    const y = Math.floor(totalMonths / 12);
    const m = totalMonths % 12;
    if (y === 0) return `${m} महीने`;
    if (m === 0) return `${y} वर्ष`;
    return `${y} वर्ष, ${m} महीने`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
      {/* INPUTS SECTION */}
      <div className="lg:col-span-5 space-y-6">
        {/* Current Loan Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider border-b pb-2">
              1. आपका वर्तमान लोन (Current Loan)
            </h3>

            <div className="space-y-4">
              <Label className="text-slate-700 font-semibold">
                बचा हुआ मूलधन (Outstanding Balance)
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  type="number"
                  value={outstandingPrincipal || ''}
                  onChange={(e) =>
                    setOutstandingPrincipal(Number(e.target.value))
                  }
                  className="pl-10 text-xl font-semibold border-slate-300 h-12"
                />
              </div>
              <Slider
                value={[outstandingPrincipal]}
                min={100000}
                max={50000000}
                step={100000}
                onValueChange={(val) => setOutstandingPrincipal(val[0])}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">
                  ब्याज दर (Interest Rate %)
                </Label>
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  step={0.1}
                  className="h-11 font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">
                  बची हुई अवधि (Remaining Tenure)
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={remainingYears}
                    onChange={(e) => setRemainingYears(Number(e.target.value))}
                    placeholder="वर्ष"
                    className="h-11 font-medium"
                  />
                  <Input
                    type="number"
                    value={remainingMonths}
                    onChange={(e) => setRemainingMonths(Number(e.target.value))}
                    placeholder="महीने"
                    className="h-11 font-medium"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prepayment Strategy Card */}
        <Card className="border-emerald-200 shadow-sm bg-linear-to-b from-white to-emerald-50/30">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-sm font-semibold text-emerald-800 uppercase tracking-wider border-b border-emerald-100 pb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> 2. आपकी प्रीपेमेंट रणनीति
            </h3>

            <div className="space-y-4">
              <Label className="text-slate-700 font-semibold">
                एकमुश्त भुगतान (One-Time Lumpsum)
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-emerald-600" />
                </div>
                <Input
                  type="number"
                  value={lumpsum || ''}
                  onChange={(e) => setLumpsum(Number(e.target.value))}
                  className="pl-10 text-lg font-semibold border-emerald-200 h-12 bg-white"
                  placeholder="उदाहरण: 5,00,000"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-slate-700 font-semibold">
                अतिरिक्त मासिक भुगतान (Extra EMI per month)
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-blue-600" />
                </div>
                <Input
                  type="number"
                  value={extraMonthly || ''}
                  onChange={(e) => setExtraMonthly(Number(e.target.value))}
                  className="pl-10 text-lg font-semibold border-blue-200 h-12 bg-white"
                  placeholder="उदाहरण: 5,000"
                />
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
              <PiggyBank className="w-4 h-4" /> आपकी कुल बचत (You Will Save)
            </p>
            <h3 className="text-5xl font-semibold text-slate-900 tracking-tighter">
              {formatCurrency(result?.interestSaved || 0)}
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              ब्याज (Interest) में +{' '}
              <strong className="text-emerald-700">
                {result ? formatTenure(result.tenureSavedMonths) : '0 महीने'}
              </strong>{' '}
              लोन अवधि (Tenure) में
            </p>
          </div>

          <CardContent className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">
                  मूल कुल ब्याज (Original Interest)
                </span>
                <span className="font-semibold text-slate-900 text-lg">
                  {formatCurrency(result?.originalTotalInterest || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">
                  प्रीपेमेंट के बाद नया ब्याज (New Interest)
                </span>
                <span className="font-semibold text-emerald-700 text-lg">
                  {formatCurrency(result?.newTotalInterest || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center py-4 bg-emerald-50 rounded-2xl border border-emerald-100 px-5">
                <span className="font-semibold text-emerald-900">
                  बचाया गया ब्याज (Interest Saved)
                </span>
                <span className="font-semibold text-emerald-700 text-2xl">
                  {formatCurrency(result?.interestSaved || 0)}
                </span>
              </div>
            </div>

            <Alert className="mt-8 bg-blue-50 border-blue-100">
              <ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5" />
              <AlertDescription className="ml-2 text-xs leading-relaxed text-blue-800">
                अपने लोन का प्रीपेमेंट (Part-payment) करना सबसे स्मार्ट वित्तीय
                कदमों में से एक है — यह आपको आपकी लोन ब्याज दर के बराबर गारंटीड
                और <strong>टैक्स-फ्री रिटर्न</strong> देता है।
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
