'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { IndianRupee, Building2, Landmark } from 'lucide-react';

export default function SalaryClient() {
  const [ctc, setCtc] = useState<number>(1200000);
  const [isMetro, setIsMetro] = useState<boolean>(true);
  const [includePt, setIncludePt] = useState<boolean>(true);
  const [isMonthlyView, setIsMonthlyView] = useState<boolean>(true);
  const [taxRegime, setTaxRegime] = useState<'new' | 'old'>('new');

  const calculateTax = (grossAnnual: number, regime: 'new' | 'old'): number => {
    const stdDeduction = regime === 'new' ? 75000 : 50000;
    const taxableIncome = Math.max(0, grossAnnual - stdDeduction);
    let baseTax = 0;

    if (regime === 'new') {
      if (taxableIncome > 400000)
        baseTax += Math.min(taxableIncome - 400000, 400000) * 0.05;
      if (taxableIncome > 800000)
        baseTax += Math.min(taxableIncome - 800000, 400000) * 0.1;
      if (taxableIncome > 1200000)
        baseTax += Math.min(taxableIncome - 1200000, 400000) * 0.15;
      if (taxableIncome > 1600000)
        baseTax += Math.min(taxableIncome - 1600000, 400000) * 0.2;
      if (taxableIncome > 2000000)
        baseTax += Math.min(taxableIncome - 2000000, 400000) * 0.25;
      if (taxableIncome > 2400000)
        baseTax += (taxableIncome - 2400000) * 0.3;

      // Section 87A (new regime): full rebate up to ₹12 lakh taxable income.
      if (taxableIncome <= 1200000) {
        return 0;
      }

      // Add cess first, then apply marginal relief near rebate threshold.
      let totalTax = baseTax * 1.04;
      totalTax = Math.min(totalTax, taxableIncome - 1200000);
      return Math.max(0, Math.round(totalTax));
    } else {
      if (taxableIncome > 250000)
        baseTax += Math.min(taxableIncome - 250000, 250000) * 0.05;
      if (taxableIncome > 500000)
        baseTax += Math.min(taxableIncome - 500000, 500000) * 0.2;
      if (taxableIncome > 1000000) baseTax += (taxableIncome - 1000000) * 0.3;

      // Section 87A (old regime): full rebate up to ₹5 lakh taxable income.
      if (taxableIncome <= 500000) {
        return 0;
      }

      return Math.max(0, Math.round(baseTax * 1.04));
    }
  };

  const breakdown = useMemo(() => {
    const basic = ctc * 0.5;
    const hra = basic * (isMetro ? 0.5 : 0.4);
    const employerPf = basic * 0.12;
    const specialAllowance = Math.max(0, ctc - basic - hra - employerPf);
    const grossSalary = ctc - employerPf;

    const employeePf = basic * 0.12;
    const pt = includePt ? 2400 : 0;
    const totalTax = calculateTax(grossSalary, taxRegime);
    const totalDeductions = employeePf + pt + totalTax;
    const takeHome = grossSalary - totalDeductions;

    return {
      annual: {
        basic,
        hra,
        specialAllowance,
        employerPf,
        grossSalary,
        employeePf,
        pt,
        totalTax,
        totalDeductions,
        takeHome,
      },
      monthly: {
        basic: basic / 12,
        hra: hra / 12,
        specialAllowance: specialAllowance / 12,
        employerPf: employerPf / 12,
        grossSalary: grossSalary / 12,
        employeePf: employeePf / 12,
        pt: pt / 12,
        totalTax: totalTax / 12,
        totalDeductions: totalDeductions / 12,
        takeHome: takeHome / 12,
      },
    };
  }, [ctc, isMetro, includePt, taxRegime]);

  const view = isMonthlyView ? breakdown.monthly : breakdown.annual;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
      {/* Input Section */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold text-base">
                Cost to Company (CTC) per year
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  type="number"
                  value={ctc}
                  onChange={(e) => setCtc(Number(e.target.value) || 0)}
                  className="pl-10 text-lg font-semibold border-slate-300 h-12"
                />
              </div>
              <Slider
                value={[ctc]}
                min={100000}
                max={10000000}
                step={50000}
                onValueChange={(val) => setCtc(val[0])}
                className="pt-4"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="space-y-0.5">
                <Label className="text-slate-700 font-medium">
                  Metro City Resident?
                </Label>
                <p className="text-xs text-slate-500">
                  Affects HRA (50% vs 40% of Basic)
                </p>
              </div>
              <Switch checked={isMetro} onCheckedChange={setIsMetro} />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="space-y-0.5">
                <Label className="text-slate-700 font-medium">
                  Include Professional Tax?
                </Label>
                <p className="text-xs text-slate-500">
                  ₹200/month in most states
                </p>
              </div>
              <Switch checked={includePt} onCheckedChange={setIncludePt} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-7">
        <Card className="border-brand-400 bg-white shadow-md overflow-hidden h-full">
          <div className="bg-brand-50 border-b border-brand-200 p-6 flex flex-col  items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-brand-700 uppercase tracking-wider mb-1">
                {isMonthlyView ? 'Monthly Take Home' : 'Annual Take Home'}
              </p>
              <h3 className="text-4xl font-bold text-slate-900">
                {formatCurrency(view.takeHome)}
              </h3>
            </div>

            {/* Regime Toggle */}
            <div className="flex bg-white rounded-3xl p-1 border border-slate-200 shadow-sm">
              <button
                onClick={() => setTaxRegime('new')}
                className={`px-6 py-2 text-sm font-semibold rounded-3xl transition-all ${taxRegime === 'new' ? 'bg-brand-700 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                New Regime
              </button>
              <button
                onClick={() => setTaxRegime('old')}
                className={`px-6 py-2 text-sm font-semibold rounded-3xl transition-all ${taxRegime === 'old' ? 'bg-brand-700 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Old Regime
              </button>
            </div>

            {/* Monthly / Yearly Toggle */}
            <div className="flex bg-white rounded-lg p-1 border border-slate-200">
              <button
                onClick={() => setIsMonthlyView(true)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${isMonthlyView ? 'bg-brand-700 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsMonthlyView(false)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${!isMonthlyView ? 'bg-brand-700 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Yearly
              </button>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Earnings */}
              <div>
                <h4 className="flex items-center gap-2 text-slate-800 font-semibold mb-3 border-b pb-2">
                  <Building2 className="w-4 h-4 text-emerald-600" /> Earnings
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Basic Salary</span>
                    <span className="font-medium text-slate-900">
                      {formatCurrency(view.basic)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>House Rent Allowance (HRA)</span>
                    <span className="font-medium text-slate-900">
                      {formatCurrency(view.hra)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Special Allowance</span>
                    <span className="font-medium text-slate-900">
                      {formatCurrency(view.specialAllowance)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 mt-2 border-t font-semibold text-slate-800">
                    <span>Gross Salary</span>
                    <span>{formatCurrency(view.grossSalary)}</span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div>
                <h4 className="flex items-center gap-2 text-slate-800 font-semibold mb-3 border-b pb-2 mt-6">
                  <Landmark className="w-4 h-4 text-rose-500" /> Deductions
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Employee PF (12% of Basic)</span>
                    <span className="font-medium text-rose-600">
                      -{formatCurrency(view.employeePf)}
                    </span>
                  </div>
                  {includePt && (
                    <div className="flex justify-between text-slate-600">
                      <span>Professional Tax (PT)</span>
                      <span className="font-medium text-rose-600">
                        -{formatCurrency(view.pt)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>
                      Income Tax (Est. {taxRegime === 'new' ? 'New' : 'Old'}{' '}
                      Regime)
                    </span>
                    <span className="font-medium text-rose-600">
                      -{formatCurrency(view.totalTax)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 mt-2 border-t font-semibold text-slate-800">
                    <span>Total Deductions</span>
                    <span className="text-rose-600">
                      -{formatCurrency(view.totalDeductions)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg mt-6 border border-slate-200 text-xs leading-relaxed">
                <strong>Note:</strong> Employer PF (
                {formatCurrency(view.employerPf)}) is part of CTC but not paid
                to you. Tax uses the {taxRegime === 'new' ? 'New' : 'Old'}{' '}
                Regime with ₹{taxRegime === 'new' ? '75,000' : '50,000'}{' '}
                standard deduction.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
