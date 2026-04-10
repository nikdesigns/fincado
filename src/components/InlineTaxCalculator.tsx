'use client';
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Zap, Calculator } from 'lucide-react';

import { getCurrentFiscalYear, getBudgetYearText } from '@/lib/fiscalYear';

interface Props {
  defaultSalary?: number;
}

const STANDARD_DEDUCTION_NEW = 75000;
const STANDARD_DEDUCTION_OLD = 50000;
const REBATE_LIMIT_NEW = 1200000;
const REBATE_MAX_NEW = 60000;
const REBATE_LIMIT_OLD = 500000;
const REBATE_MAX_OLD = 12500;
const CESS_RATE = 0.04;

const NEW_REGIME_SLABS = [
  { limit: 400000, rate: 0 },
  { limit: 800000, rate: 0.05 },
  { limit: 1200000, rate: 0.1 },
  { limit: 1600000, rate: 0.15 },
  { limit: 2000000, rate: 0.2 },
  { limit: 2400000, rate: 0.25 },
  { limit: Infinity, rate: 0.3 },
];

const OLD_REGIME_SLABS = [
  { limit: 250000, rate: 0 },
  { limit: 500000, rate: 0.05 },
  { limit: 1000000, rate: 0.2 },
  { limit: Infinity, rate: 0.3 },
];

const calculateSlabTax = (
  taxableIncome: number,
  slabs: Array<{ limit: number; rate: number }>,
) => {
  let tax = 0;
  let prevLimit = 0;

  for (const slab of slabs) {
    if (taxableIncome <= prevLimit) break;
    const taxableAtThisSlab = Math.min(taxableIncome, slab.limit) - prevLimit;
    tax += taxableAtThisSlab * slab.rate;
    prevLimit = slab.limit;
  }

  return tax;
};

export default function InlineTaxCalculator({
  defaultSalary = 1500000,
}: Props) {
  const [income, setIncome] = useState(defaultSalary);
  const [deductions, setDeductions] = useState(0);

  const fy = getCurrentFiscalYear();
  const budgetText = getBudgetYearText();

  // Logic for Tax Calculation
  const { taxNew, taxOld } = useMemo(() => {
    // --- NEW REGIME (FY 2025-26) ---
    const taxableNew = Math.max(0, income - STANDARD_DEDUCTION_NEW);
    const taxBeforeRebateNew = calculateSlabTax(taxableNew, NEW_REGIME_SLABS);
    const rebateNew =
      taxableNew <= REBATE_LIMIT_NEW
        ? Math.min(taxBeforeRebateNew, REBATE_MAX_NEW)
        : 0;
    let tNew = Math.max(0, taxBeforeRebateNew - rebateNew);

    // Marginal relief: incremental tax should not exceed incremental income above rebate limit
    if (taxableNew > REBATE_LIMIT_NEW) {
      const reliefCap = taxableNew - REBATE_LIMIT_NEW;
      tNew = Math.min(tNew, reliefCap);
    }

    // --- OLD REGIME ---
    const taxableOld = Math.max(
      0,
      income - STANDARD_DEDUCTION_OLD - deductions,
    );
    const taxBeforeRebateOld = calculateSlabTax(taxableOld, OLD_REGIME_SLABS);
    const rebateOld =
      taxableOld <= REBATE_LIMIT_OLD
        ? Math.min(taxBeforeRebateOld, REBATE_MAX_OLD)
        : 0;
    let tOld = Math.max(0, taxBeforeRebateOld - rebateOld);

    // Add 4% cess after rebate/relief
    tNew = Math.round(tNew * (1 + CESS_RATE));
    tOld = Math.round(tOld * (1 + CESS_RATE));

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
    <Card className="border-none shadow-none border-slate-200 my-8 no-print overflow-hidden bg-white">
      <CardHeader className="bg-[#F7FDF1] border-none border-[#EFFBE2] py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#577A30] font-semibold text-sm uppercase tracking-wide">
            <Zap className="h-4 w-4" /> Quick Tax Check ({fy.fullFormat})
          </div>
          <Badge
            variant="outline"
            className="bg-white text-[#577A30] border-[#DFF7C6] text-[10px] uppercase font-semibold"
          >
            {budgetText}
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
                onChange={(e) =>
                  setIncome(Math.max(0, Number(e.target.value) || 0))
                }
                step={50000}
                className="pl-7 bg-slate-50 border-slate-200 focus-visible:ring-[#B0EC70] font-semibold text-slate-900"
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
                onChange={(e) =>
                  setDeductions(Math.max(0, Number(e.target.value) || 0))
                }
                placeholder="e.g. 150000"
                className="pl-7 bg-slate-50 border-slate-200 focus-visible:ring-[#B0EC70] font-semibold text-slate-900"
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
                ? 'bg-[#F7FDF1] border-[#DFF7C6]'
                : 'bg-slate-50 border-slate-200 opacity-70'
            }`}
          >
            <span className="text-[10px] uppercase font-semibold text-slate-500 mb-1">
              New Regime Tax
            </span>
            <span
              className={`text-xl sm:text-2xl font-black ${
                isNewBetter ? 'text-[#577A30]' : 'text-slate-700'
              }`}
            >
              {formatCurrency(taxNew)}
            </span>
            {isNewBetter && (
              <CheckCircle2 className="h-4 w-4 text-[#577A30] mt-2" />
            )}
          </div>

          <div
            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
              !isNewBetter
                ? 'bg-blue-50 border-blue-200'
                : 'bg-slate-50 border-slate-200 opacity-70'
            }`}
          >
            <span className="text-[10px] uppercase font-semibold text-slate-500 mb-1">
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
              ? 'bg-[#F7FDF1]/50 border-[#EFFBE2] text-[#1B2E06]'
              : 'bg-blue-50/50 border-blue-100 text-blue-900'
          }`}
        >
          {isNewBetter ? (
            <p className="font-medium flex items-center justify-center gap-2">
              <Calculator className="h-4 w-4 text-[#577A30]" />
              New Regime saves you{' '}
              <span className="font-semibold text-[#577A30]">
                {formatCurrency(savings)}
              </span>{' '}
              🎉
            </p>
          ) : (
            <p className="font-medium flex items-center justify-center gap-2">
              <Calculator className="h-4 w-4 text-blue-600" />
              Old Regime saves you{' '}
              <span className="font-semibold text-blue-700">
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
