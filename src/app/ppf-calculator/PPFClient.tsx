'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Lock } from 'lucide-react';

/* ---------- TYPES ---------- */
interface LabelConfig {
  modeLabel: string;
  monthlyInv: string;
  annualInv: string;
  rate: string;
  duration: string;
  maturity: string;
  totalInv: string;
  totalInt: string;
}

interface PPFClientProps {
  labels?: Partial<LabelConfig>;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------- DEFAULT LABELS ---------- */
const DEFAULT_LABELS: LabelConfig = {
  modeLabel: 'Contribution Mode',
  monthlyInv: 'Monthly Investment (₹)',
  annualInv: 'Annual Investment (₹)',
  rate: 'Interest Rate (% p.a)',
  duration: 'Duration (Years)',
  maturity: 'Maturity Value (Tax Free)',
  totalInv: 'Total Investment',
  totalInt: 'Total Interest',
};

export default function PPFClient({ labels = {} }: PPFClientProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [mode, setMode] = useState<'monthly' | 'annual'>('monthly');
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [annualContribution, setAnnualContribution] = useState(12000);
  const [years, setYears] = useState(15);
  const [annualRate, setAnnualRate] = useState(7.1);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;
    const yearlyRate = annualRate / 100;

    let maturity = 0;
    let invested = 0;

    if (mode === 'monthly') {
      invested = monthlyContribution * months;
      if (monthlyRate === 0) {
        maturity = invested;
      } else {
        // Correct Formula for Monthly PPF (Payment at beginning of month)
        // A = P * [((1+i)^n - 1)/i] * (1+i)
        // But typical PPF calculator simplifies to yearly compounding of monthly deposits
        // For accurate comparison with standard online tools:
        const n = years;
        const i = annualRate / 100;
        const annualDeposit = monthlyContribution * 12;
        maturity = annualDeposit * ((Math.pow(1 + i, n) - 1) / i) * (1 + i); // Approximation for standard tools
      }
    } else {
      invested = annualContribution * years;
      if (yearlyRate === 0) {
        maturity = invested;
      } else {
        maturity =
          annualContribution *
          ((Math.pow(1 + yearlyRate, years) - 1) / yearlyRate) *
          (1 + yearlyRate);
      }
    }

    const interest = Math.max(0, maturity - invested);
    const principalPct =
      maturity > 0 ? Math.round((invested / maturity) * 100) : 0;

    return {
      maturity: Math.round(maturity),
      invested: Math.round(invested),
      interest: Math.round(interest),
      principalPct,
      interestPct: 100 - principalPct,
    };
  }, [mode, monthlyContribution, annualContribution, years, annualRate]);

  const handleReset = () => {
    setMode('monthly');
    setMonthlyContribution(1000);
    setAnnualContribution(12000);
    setYears(15);
    setAnnualRate(7.1);
  };

  /* ---------- UI ---------- */
  return (
    <Card className="border-border shadow-sm bg-card">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Lock className="h-5 w-5 text-emerald-600" />
            PPF Calculator
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
            {/* Contribution Mode */}
            <div className="space-y-2">
              <Label>{t.modeLabel}</Label>
              <Select
                value={mode}
                onValueChange={(v) => setMode(v as 'monthly' | 'annual')}
              >
                <SelectTrigger className="bg-white h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual (Lump Sum)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Investment Amount */}
            <CalculatorField
              label={mode === 'monthly' ? t.monthlyInv : t.annualInv}
              value={
                mode === 'monthly' ? monthlyContribution : annualContribution
              }
              min={500}
              max={mode === 'monthly' ? 12500 : 150000}
              step={mode === 'monthly' ? 500 : 1000}
              onChange={
                mode === 'monthly'
                  ? setMonthlyContribution
                  : setAnnualContribution
              }
            />

            {/* Interest Rate */}
            <CalculatorField
              label={t.rate}
              value={annualRate}
              min={4}
              max={12}
              step={0.1}
              onChange={setAnnualRate}
            />

            {/* Duration */}
            <CalculatorField
              label={t.duration}
              value={years}
              min={15}
              max={50}
              step={5}
              onChange={setYears}
            />
          </div>

          {/* ---------- VISUALS ---------- */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={calculations.principalPct}
              interestPct={calculations.interestPct}
              size={200}
            />

            <div className="mt-6 text-center">
              <div className="text-sm text-slate-500">{t.maturity}</div>

              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(calculations.maturity)}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm text-left">
                <Card className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="text-xs text-slate-500">{t.totalInv}</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(calculations.invested)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-lime-50">
                  <CardContent className="p-4">
                    <div className="text-xs text-lime-700">{t.totalInt}</div>
                    <div className="mt-1 font-semibold text-lime-700">
                      +{formatINR(calculations.interest)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock className="w-3 h-3" />
                <span>
                  Mandatory 15-year lock-in. Returns are 100% Tax-Free.
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
