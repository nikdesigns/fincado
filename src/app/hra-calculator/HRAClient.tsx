'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Building2, RefreshCcw, CheckCircle2, XCircle } from 'lucide-react';

/* ---------- TYPES ---------- */
interface HRALabels {
  basicSalary: string;
  da: string;
  hraReceived: string;
  rentPaid: string;
  cityType: string;
  exemptHRA: string;
  taxableHRA: string;
  metro: string;
  nonMetro: string;
}

const DEFAULT_LABELS: HRALabels = {
  basicSalary: 'Basic Salary (Yearly)',
  da: 'Dearness Allowance (Yearly)',
  hraReceived: 'HRA Received (Yearly)',
  rentPaid: 'Total Rent Paid (Yearly)',
  cityType: 'City Type',
  exemptHRA: 'Exempt HRA (Tax Free)',
  taxableHRA: 'Taxable HRA',
  metro: 'Metro (50%)',
  nonMetro: 'Non-Metro (40%)',
};

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function HRAClient({
  labels = {},
}: {
  labels?: Partial<HRALabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [basic, setBasic] = useState(600000);
  const [da, setDA] = useState(0);
  const [hraReceived, setHraReceived] = useState(240000);
  const [rentPaid, setRentPaid] = useState(180000);
  const [isMetro, setIsMetro] = useState<'yes' | 'no'>('yes');

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const salary = basic + da;

    // Condition 1: Actual HRA Received
    const cond1 = hraReceived;

    // Condition 2: 50% (Metro) or 40% (Non-Metro) of Salary
    const cond2 = salary * (isMetro === 'yes' ? 0.5 : 0.4);

    // Condition 3: Rent Paid - 10% of Salary
    const cond3 = Math.max(0, rentPaid - salary * 0.1);

    // Exempt is the least of the three
    const exemptHRA = Math.min(cond1, cond2, cond3);
    const taxableHRA = Math.max(0, hraReceived - exemptHRA);

    // Percentages for Pie Chart
    const total = hraReceived > 0 ? hraReceived : 1;
    const exemptPct = Math.round((exemptHRA / total) * 100);
    const taxablePct = 100 - exemptPct;

    return {
      exemptHRA,
      taxableHRA,
      exemptPct,
      taxablePct,
      breakdown: { cond1, cond2, cond3 },
    };
  }, [basic, da, hraReceived, rentPaid, isMetro]);

  const handleReset = () => {
    setBasic(600000);
    setDA(0);
    setHraReceived(240000);
    setRentPaid(180000);
    setIsMetro('yes');
  };

  /* ---------- UI ---------- */
  return (
    <Card className="border-border shadow-sm bg-card">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Building2 className="h-5 w-5 text-emerald-600" />
            HRA Calculator
          </CardTitle>
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 flex items-center gap-1 hover:text-emerald-600 transition-colors"
          >
            <RefreshCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* ---------- INPUTS ---------- */}
          <div className="space-y-6">
            <CalculatorField
              label={t.basicSalary}
              value={basic}
              min={100000}
              max={10000000}
              step={10000}
              onChange={setBasic}
            />

            <CalculatorField
              label={t.da}
              value={da}
              min={0}
              max={5000000}
              step={5000}
              onChange={setDA}
            />

            <CalculatorField
              label={t.hraReceived}
              value={hraReceived}
              min={10000}
              max={5000000}
              step={5000}
              onChange={setHraReceived}
            />

            <CalculatorField
              label={t.rentPaid}
              value={rentPaid}
              min={0}
              max={5000000}
              step={5000}
              onChange={setRentPaid}
            />

            {/* City Type Radio */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                {t.cityType}
              </Label>
              <RadioGroup
                value={isMetro}
                onValueChange={(v) => setIsMetro(v as 'yes' | 'no')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-md px-4 py-2 bg-white w-full hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="yes" id="m-yes" />
                  <Label htmlFor="m-yes" className="cursor-pointer flex-1">
                    {t.metro}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md px-4 py-2 bg-white w-full hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="no" id="m-no" />
                  <Label htmlFor="m-no" className="cursor-pointer flex-1">
                    {t.nonMetro}
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-[10px] text-slate-400">
                *Metro cities: Delhi, Mumbai, Kolkata, Chennai
              </p>
            </div>
          </div>

          {/* ---------- VISUALS ---------- */}
          <div className="flex flex-col items-center justify-center">
            {/* Using EMIPieChart to show Exempt vs Taxable split */}
            <EMIPieChart
              principalPct={results.exemptPct} // Green section (Exempt)
              interestPct={results.taxablePct} // Blue section (Taxable)
              size={200}
            />

            <div className="mt-6 w-full max-w-sm text-center">
              <div className="text-sm text-slate-500 mb-1">{t.exemptHRA}</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                {formatINR(results.exemptHRA)}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                <Card className="border-emerald-100 bg-emerald-50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-800">
                        Exempt
                      </span>
                    </div>
                    <div className="text-sm font-bold text-emerald-900">
                      {formatINR(results.exemptHRA)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 bg-white">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <XCircle className="w-3 h-3 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600">
                        Taxable
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      {formatINR(results.taxableHRA)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Calculation Breakdown Logic */}
              <div className="mt-6 border-t border-slate-100 pt-4 text-left">
                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                  Exemption Calculation (Lowest of 3):
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex justify-between">
                    <span>1. Actual HRA Received:</span>
                    <span className="font-mono">
                      {formatINR(results.breakdown.cond1)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>
                      2. {isMetro === 'yes' ? '50%' : '40%'} of Salary:
                    </span>
                    <span className="font-mono">
                      {formatINR(results.breakdown.cond2)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>3. Rent Paid - 10% Salary:</span>
                    <span className="font-mono">
                      {formatINR(results.breakdown.cond3)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
