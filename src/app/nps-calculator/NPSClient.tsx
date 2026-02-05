'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, RefreshCcw, Wallet, Coins } from 'lucide-react';

/* ---------- TYPES ---------- */
interface NPSLabels {
  investment: string;
  age: string;
  rate: string;
  maturityVal: string;
  totalInv: string;
  totalGains: string;
  lumpSum: string;
  pension: string;
  annuityRate: string;
}

const DEFAULT_LABELS: NPSLabels = {
  investment: 'Monthly Investment (₹)',
  age: 'Current Age (Years)',
  rate: 'Expected Return (ROI %)',
  maturityVal: 'Total Corpus at 60',
  totalInv: 'Total Invested',
  totalGains: 'Total Interest Earned',
  lumpSum: 'Lump Sum Amount (Tax Free)',
  pension: 'Est. Monthly Pension',
  annuityRate: 'Annuity Rate (%)', // New field for annuity returns
};

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function NPSClient({
  labels = {},
}: {
  labels?: Partial<NPSLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [contribution, setContribution] = useState(5000);
  const [currentAge, setCurrentAge] = useState(30);
  const [roi, setRoi] = useState(10);
  // Default annuity rate is typically 6% currently
  const [annuityRate, setAnnuityRate] = useState(6);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const retirementAge = 60;

    // Safety check
    if (currentAge >= retirementAge) {
      return {
        corpus: 0,
        invested: 0,
        gains: 0,
        lumpSum: 0,
        monthlyPension: 0,
        investedPct: 0,
        gainsPct: 0,
      };
    }

    const years = retirementAge - currentAge;
    const months = years * 12;
    const monthlyRate = roi / 12 / 100;

    let corpus = 0;
    const invested = contribution * months;

    // Future Value of SIP Formula
    if (monthlyRate === 0) {
      corpus = invested;
    } else {
      corpus =
        contribution *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }

    const gains = Math.max(0, corpus - invested);

    // 60% Withdrawal (Tax Free)
    const lumpSum = Math.round(corpus * 0.6);

    // 40% Annuity Investment
    const annuityCorpus = corpus * 0.4;

    // Monthly Pension based on annuity rate selected
    const monthlyPension = Math.round(annuityCorpus * (annuityRate / 100 / 12));

    const corpusRounded = Math.round(corpus);
    const investedPct =
      corpusRounded > 0 ? Math.round((invested / corpusRounded) * 100) : 0;
    const gainsPct = 100 - investedPct;

    return {
      corpus: corpusRounded,
      invested,
      gains: Math.round(gains),
      lumpSum,
      monthlyPension,
      investedPct,
      gainsPct,
    };
  }, [contribution, currentAge, roi, annuityRate]);

  const handleReset = () => {
    setContribution(5000);
    setCurrentAge(30);
    setRoi(10);
    setAnnuityRate(6);
  };

  /* ---------- UI ---------- */
  return (
    <Card className="border-border shadow-sm bg-card">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            NPS Calculator
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
          <div className="space-y-8">
            <CalculatorField
              label={t.investment}
              value={contribution}
              min={500}
              max={150000}
              step={500}
              onChange={setContribution}
            />

            <CalculatorField
              label={t.age}
              value={currentAge}
              min={18}
              max={59}
              step={1}
              onChange={setCurrentAge}
            />

            <CalculatorField
              label={t.rate}
              value={roi}
              min={5}
              max={15}
              step={0.5}
              onChange={setRoi}
            />

            {/* Advanced Toggle for Annuity Rate if needed, simplified here as field */}
            <CalculatorField
              label={t.annuityRate}
              value={annuityRate}
              min={4}
              max={10}
              step={0.5}
              onChange={setAnnuityRate}
            />
          </div>

          {/* ---------- VISUALS ---------- */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={calculations.investedPct}
              interestPct={calculations.gainsPct}
              size={200}
            />

            <div className="mt-6 text-center w-full">
              <div className="text-sm text-slate-500">{t.maturityVal}</div>
              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(calculations.corpus)}
              </div>

              {/* Summary Cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
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
                    <div className="text-xs text-lime-700">{t.totalGains}</div>
                    <div className="mt-1 font-semibold text-lime-700">
                      +{formatINR(calculations.gains)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Withdrawal Split */}
              <div className="mt-6 border-t border-slate-100 pt-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Withdrawal Distribution (60:40 Rule)
                </p>
                <div className="grid grid-cols-2 gap-4 text-left">
                  {/* Lump Sum */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Wallet className="w-4 h-4" />
                      <span className="text-xs font-semibold">Lump Sum</span>
                    </div>
                    <span className="text-lg font-bold text-emerald-900">
                      {formatINR(calculations.lumpSum)}
                    </span>
                    <Badge
                      variant="outline"
                      className="w-fit text-[10px] border-emerald-200 text-emerald-600"
                    >
                      Tax Free
                    </Badge>
                  </div>

                  {/* Pension */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-blue-700">
                      <Coins className="w-4 h-4" />
                      <span className="text-xs font-semibold">
                        Monthly Pension
                      </span>
                    </div>
                    <span className="text-lg font-bold text-blue-900">
                      {formatINR(calculations.monthlyPension)}
                    </span>
                    <Badge
                      variant="outline"
                      className="w-fit text-[10px] border-blue-200 text-blue-600"
                    >
                      Taxable
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
