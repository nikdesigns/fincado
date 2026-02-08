'use client';
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Zap, Calculator } from 'lucide-react';

interface Props {
  defaultSalary?: number;
}

export default function InlineTaxCalculator({
  defaultSalary = 1500000,
}: Props) {
  const [income, setIncome] = useState(defaultSalary);
  const [deductions, setDeductions] = useState(0);

  // Logic for Tax Calculation
  const { taxNew, taxOld } = useMemo(() => {
    // --- NEW REGIME (FY 2025-26) ---
    // Std Deduction: 75k
    const taxableNew = Math.max(0, income - 75000);
    let tNew = 0;

    // Slabs 2025-26
    const slabsNew = [
      { limit: 300000, rate: 0 },
      { limit: 700000, rate: 0.05 },
      { limit: 1000000, rate: 0.1 },
      { limit: 1200000, rate: 0.15 },
      { limit: 1500000, rate: 0.2 },
      { limit: Infinity, rate: 0.3 }
    ];

    const tempInc = taxableNew;
    let prevLimit = 0;

    for (let i = 0; i < slabsNew.length; i++) {
      const slab = slabsNew[i];
      if (tempInc > prevLimit) {
        const taxableAtThisSlab = Math.min(tempInc, slab.limit) - prevLimit;
        tNew += taxableAtThisSlab * slab.rate;
        prevLimit = slab.limit;
      }
    }

    // Rebate 87A New Regime (Income <= 7L)
    if (taxableNew <= 700000) tNew = 0;

    // --- OLD REGIME ---
    // Std Deduction: 50k
    const taxableOld = Math.max(0, income - 50000 - deductions);
    let tOld = 0;

    const slabsOld = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.2 },
      { limit: Infinity, rate: 0.3 }
    ];

    const tempIncOld = taxableOld;
    let prevLimitOld = 0;

    for (let i = 0; i < slabsOld.length; i++) {
      const slab = slabsOld[i];
      if (tempIncOld > prevLimitOld) {
        const taxableAtThisSlab =
          Math.min(tempIncOld, slab.limit) - prevLimitOld;
        tOld += taxableAtThisSlab * slab.rate;
        prevLimitOld = slab.limit;
      }
    }

    // Rebate 87A Old Regime (Income <= 5L)
    if (taxableOld <= 500000) tOld = 0;

    // Add 4% Cess
    tNew = Math.round(tNew * 1.04);
    tOld = Math.round(tOld * 1.04);

    return { taxNew: tNew, taxOld: tOld };
  }, [income, deductions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const savings = taxOld - taxNew;
  const isNewBetter = savings >= 0;

  return (
    <Card className="border-2 border-slate-200 shadow-lg my-8 no-print overflow-hidden bg-white">
      <CardHeader className="bg-lime-50/80 border-b border-lime-100 py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lime-800 font-bold text-sm uppercase tracking-wide">
            <Zap className="h-4 w-4" /> Quick Tax Check (FY 25-26)
          </div>
          <Badge
            variant="outline"
            className="bg-white text-lime-700 border-lime-200 text-[10px] uppercase font-bold"
          >
            Budget 2025
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label
              htmlFor="income"
              className="text-slate-600 font-semibold text-xs uppercase tracking-wide"
            >
              Annual Salary (₹)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                ₹
              </span>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                step={50000}
                className="pl-7 bg-slate-50 border-slate-200 focus-visible:ring-lime-500 font-bold text-slate-900"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="deductions"
              className="text-slate-600 font-semibold text-xs uppercase tracking-wide"
            >
              Total Deductions (Old Regime)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                ₹
              </span>
              <Input
                id="deductions"
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(Number(e.target.value))}
                placeholder="e.g. 150000"
                className="pl-7 bg-slate-50 border-slate-200 focus-visible:ring-lime-500 font-bold text-slate-900"
              />
            </div>
            <p className="text-[10px] text-slate-500">
              Includes 80C, 80D, HRA, Home Loan Interest etc.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div
            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
              isNewBetter
                ? 'bg-lime-50 border-lime-200 shadow-sm'
                : 'bg-slate-50 border-slate-200 opacity-70'
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">
              New Regime Tax
            </span>
            <span
              className={`text-xl sm:text-2xl font-black ${
                isNewBetter ? 'text-lime-700' : 'text-slate-700'
              }`}
            >
              {formatCurrency(taxNew)}
            </span>
            {isNewBetter && (
              <CheckCircle2 className="h-4 w-4 text-lime-600 mt-2" />
            )}
          </div>

          <div
            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
              !isNewBetter
                ? 'bg-blue-50 border-blue-200 shadow-sm'
                : 'bg-slate-50 border-slate-200 opacity-70'
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">
              Old Regime Tax
            </span>
            <span
              className={`text-xl sm:text-2xl font-black ${
                !isNewBetter ? 'text-blue-700' : 'text-slate-700'
              }`}
            >
              {formatCurrency(taxOld)}
            </span>
            {!isNewBetter && (
              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-2" />
            )}
          </div>
        </div>

        <div
          className={`text-center py-3 px-4 rounded-lg border-2 border-dashed ${
            isNewBetter
              ? 'bg-lime-50/50 border-lime-100 text-lime-900'
              : 'bg-blue-50/50 border-blue-100 text-blue-900'
          }`}
        >
          {isNewBetter ? (
            <p className="font-medium flex items-center justify-center gap-2">
              <Calculator className="h-4 w-4 text-lime-600" />
              New Regime saves you{' '}
              <span className="font-bold text-lime-700">
                {formatCurrency(savings)}
              </span>{' '}
              🎉
            </p>
          ) : (
            <p className="font-medium flex items-center justify-center gap-2">
              <Calculator className="h-4 w-4 text-blue-600" />
              Old Regime saves you{' '}
              <span className="font-bold text-blue-700">
                {formatCurrency(Math.abs(savings))}
              </span>{' '}
              ✅
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
