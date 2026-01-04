'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';

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
    'monthly'
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

  /* ---------- UI ---------- */
  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* ---------- INPUTS ---------- */}
        <div className="calc-inputs space-y-6">
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
            <label className="text-sm font-medium text-slate-700">
              {t.depositFreq}
            </label>
            <select
              value={depositMode}
              onChange={(e) =>
                setDepositMode(e.target.value as 'monthly' | 'yearly')
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-lime-500"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
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
        <div className="calc-visuals flex flex-col items-center">
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

            <div className="mt-1 text-xs text-slate-500">
              Maturity Age: {results.maturityAge} years
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs text-slate-500">{t.totalInv}</div>
                <div className="mt-1 font-semibold text-slate-900">
                  {formatINR(results.totalInvested)}
                </div>
              </div>

              <div className="rounded-lg border border-lime-200 bg-lime-50 p-4">
                <div className="text-xs text-lime-700">{t.totalInt}</div>
                <div className="mt-1 font-semibold text-lime-700">
                  +{formatINR(results.totalInterest)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
