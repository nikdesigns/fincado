'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent } from '@/components/ui/card';

/* ---------- TYPES ---------- */
interface LabelConfig {
  totalInv: string;
  monthlyWithdrawal: string;
  rate: string;
  time: string;
  remainingVal: string;
  totalWithdrawn: string;
  warning: string;
}

interface SWPClientProps {
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
  totalInv: 'Initial Investment (₹)',
  monthlyWithdrawal: 'Monthly Withdrawal (₹)',
  rate: 'Expected Return (% p.a)',
  time: 'Time Period (Years)',
  remainingVal: 'Remaining Corpus',
  totalWithdrawn: 'Total Withdrawn',
  warning:
    '⚠️ Your corpus gets exhausted within the selected period. Consider lowering withdrawal amount or increasing returns.',
};

export default function SWPClient({ labels = {} }: SWPClientProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [initialCorpus, setInitialCorpus] = useState(10_00_000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(10_000);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(10);

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    let balance = initialCorpus;
    let withdrawn = 0;

    for (let i = 0; i < months; i++) {
      balance += balance * monthlyRate;
      const w = Math.min(monthlyWithdrawal, balance);
      balance -= w;
      withdrawn += w;
      if (balance <= 0) {
        balance = 0;
        break;
      }
    }

    const totalValue = withdrawn + balance;
    const remainingPct =
      totalValue > 0 ? Math.round((balance / totalValue) * 100) : 0;
    const withdrawnPct = 100 - remainingPct;

    return {
      remaining: Math.round(balance),
      withdrawn: Math.round(withdrawn),
      remainingPct,
      withdrawnPct,
    };
  }, [initialCorpus, monthlyWithdrawal, annualRate, years]);

  /* ---------- UI ---------- */
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ---------- INPUTS ---------- */}
          <div className="space-y-6">
            <CalculatorField
              label={t.totalInv}
              value={initialCorpus}
              min={100000}
              max={10000000}
              step={50000}
              onChange={setInitialCorpus}
            />

            <CalculatorField
              label={t.monthlyWithdrawal}
              value={monthlyWithdrawal}
              min={1000}
              max={200000}
              step={500}
              onChange={setMonthlyWithdrawal}
            />

            <CalculatorField
              label={t.rate}
              value={annualRate}
              min={1}
              max={20}
              step={0.1}
              onChange={setAnnualRate}
            />

            <CalculatorField
              label={t.time}
              value={years}
              min={1}
              max={30}
              step={1}
              onChange={setYears}
            />
          </div>

          {/* ---------- VISUALS ---------- */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={results.remainingPct}
              interestPct={results.withdrawnPct}
              size={200}
            />

            <div className="mt-6 text-center">
              <div className="text-sm text-slate-500">{t.remainingVal}</div>

              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(results.remaining)}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm text-left">
                <Card className="border-slate-200">
                  <CardContent>
                    <div className="text-xs text-slate-500">{t.totalInv}</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(initialCorpus)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-lime-50">
                  <CardContent>
                    <div className="text-xs text-lime-700">
                      {t.totalWithdrawn}
                    </div>
                    <div className="mt-1 font-semibold text-lime-700">
                      {formatINR(results.withdrawn)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {results.remaining === 0 && (
                <div className="mt-6 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
                  {t.warning}
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-slate-500">
          This calculator assumes a fixed withdrawal amount. Inflation may
          reduce purchasing power over time.
        </p>
      </CardContent>
    </Card>
  );
}
