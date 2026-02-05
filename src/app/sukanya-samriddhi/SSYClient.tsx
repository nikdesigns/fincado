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
import { RefreshCcw, Baby } from 'lucide-react';

/* ---------- TYPES ---------- */
interface LabelConfig {
  girlAge: string;
  depositFreq: string;
  monthlyInv: string;
  yearlyInv: string;
  rate: string;
  maturityVal: string;
  totalInv: string;
  totalInt: string;
  infoText: string;
}

interface SSYClientProps {
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
  girlAge: "Girl's Current Age (Years)",
  depositFreq: 'Deposit Frequency',
  monthlyInv: 'Monthly Investment (₹)',
  yearlyInv: 'Yearly Investment (₹)',
  rate: 'Interest Rate (% p.a)',
  maturityVal: 'Maturity Value (Tax Free)',
  totalInv: 'Total Investment',
  totalInt: 'Total Interest',
  infoText: 'Account can be opened until age 10.',
};

export default function SSYClient({ labels = {} }: SSYClientProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [currentAge, setCurrentAge] = useState(5);
  const [depositMode, setDepositMode] = useState<'monthly' | 'yearly'>(
    'monthly',
  );
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [yearlyDeposit, setYearlyDeposit] = useState(60000);
  const [annualRate, setAnnualRate] = useState(8.2);

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const maturityYears = 21;
    const depositYears = 15;
    const rate = annualRate / 100;

    let balance = 0;
    let totalInvested = 0;

    const annualInvestment =
      depositMode === 'monthly' ? monthlyDeposit * 12 : yearlyDeposit;

    for (let year = 1; year <= maturityYears; year++) {
      if (year <= depositYears) {
        balance += annualInvestment;
        totalInvested += annualInvestment;
      }
      balance += balance * rate;
    }

    const maturityAmount = Math.round(balance);
    const totalInterest = Math.max(0, maturityAmount - totalInvested);

    const totalValue = maturityAmount;
    const principalPct =
      totalValue > 0 ? Math.round((totalInvested / totalValue) * 100) : 0;
    const interestPct = 100 - principalPct;

    return {
      maturityAmount,
      totalInvested,
      totalInterest,
      principalPct,
      interestPct,
      maturityAge: currentAge + 21,
    };
  }, [currentAge, depositMode, monthlyDeposit, yearlyDeposit, annualRate]);

  const handleReset = () => {
    setCurrentAge(5);
    setDepositMode('monthly');
    setMonthlyDeposit(5000);
    setYearlyDeposit(60000);
    setAnnualRate(8.2);
  };

  /* ---------- UI ---------- */
  return (
    <Card className="border-slate-200 shadow-sm bg-card">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Baby className="h-5 w-5 text-emerald-600" />
            SSY Calculator
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
              label={t.girlAge}
              value={currentAge}
              min={0}
              max={10}
              step={1}
              onChange={setCurrentAge}
            />

            {/* Deposit Frequency */}
            <div className="space-y-2">
              <Label>{t.depositFreq}</Label>
              <Select
                value={depositMode}
                onValueChange={(v) => setDepositMode(v as 'monthly' | 'yearly')}
              >
                <SelectTrigger className="bg-white h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CalculatorField
              label={depositMode === 'monthly' ? t.monthlyInv : t.yearlyInv}
              value={depositMode === 'monthly' ? monthlyDeposit : yearlyDeposit}
              min={depositMode === 'monthly' ? 250 : 1000}
              max={depositMode === 'monthly' ? 12500 : 150000}
              step={depositMode === 'monthly' ? 250 : 1000}
              onChange={
                depositMode === 'monthly' ? setMonthlyDeposit : setYearlyDeposit
              }
            />

            <CalculatorField
              label={t.rate}
              value={annualRate}
              min={7}
              max={9}
              step={0.1}
              onChange={setAnnualRate}
            />
          </div>

          {/* ---------- VISUALS ---------- */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={results.principalPct}
              interestPct={results.interestPct}
              size={200}
            />

            <div className="mt-6 text-center">
              <div className="text-sm text-slate-500">{t.maturityVal}</div>

              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(results.maturityAmount)}
              </div>

              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                Maturity Year: {new Date().getFullYear() + 21} (Age:{' '}
                {results.maturityAge})
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-4">
                    <div className="text-xs text-slate-500">{t.totalInv}</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(results.totalInvested)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-lime-50 shadow-none">
                  <CardContent className="p-4">
                    <div className="text-xs text-lime-700">{t.totalInt}</div>
                    <div className="mt-1 font-semibold text-lime-700">
                      +{formatINR(results.totalInterest)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
