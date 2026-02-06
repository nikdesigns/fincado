'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCcw, Percent } from 'lucide-react';

/* ---------- TYPES ---------- */
interface SimpleInterestLabels {
  principal: string;
  rate: string;
  time: string;
  maturityVal: string;
  resultPrincipal: string;
  resultInterest: string;
}

const DEFAULT_LABELS: SimpleInterestLabels = {
  principal: 'Principal Amount (₹)',
  rate: 'Interest Rate (% p.a)',
  time: 'Time Period (Years)',
  maturityVal: 'Total Maturity Value',
  resultPrincipal: 'Invested Amount',
  resultInterest: 'Total Interest',
};

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------- COMPONENT ---------- */
export default function SICalculatorClient({
  labels = {},
}: {
  labels?: Partial<SimpleInterestLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [time, setTime] = useState(5);

  const results = useMemo(() => {
    // Formula: SI = (P * R * T) / 100
    const interest = Math.round((principal * rate * time) / 100);
    const totalAmount = principal + interest;

    const principalPct = Math.round((principal / totalAmount) * 100);
    const interestPct = 100 - principalPct;

    return { interest, totalAmount, principalPct, interestPct };
  }, [principal, rate, time]);

  return (
    <Card className="border-border shadow-sm bg-card">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Percent className="h-5 w-5 text-emerald-600" />
            Simple Interest
          </CardTitle>
          <button
            onClick={() => {
              setPrincipal(10000);
              setRate(8);
              setTime(5);
            }}
            className="text-xs text-slate-500 flex items-center gap-1 hover:text-emerald-600 transition-colors"
          >
            <RefreshCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-6">
            <CalculatorField
              label={t.principal}
              value={principal}
              min={1000}
              max={10000000}
              step={500}
              onChange={setPrincipal}
            />
            <CalculatorField
              label={t.rate}
              value={rate}
              min={1}
              max={50}
              step={0.1}
              onChange={setRate}
            />
            <CalculatorField
              label={t.time}
              value={time}
              min={1}
              max={30}
              step={1}
              onChange={setTime}
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={results.principalPct}
              interestPct={results.interestPct}
              size={200}
            />
            <div className="mt-6 w-full text-center">
              <div className="text-sm text-slate-500">{t.maturityVal}</div>
              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(results.totalAmount)}
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <Card className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="text-xs text-slate-500">
                      {t.resultPrincipal}
                    </div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(principal)}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-lime-200 bg-lime-50">
                  <CardContent className="p-4">
                    <div className="text-xs text-lime-700">
                      {t.resultInterest}
                    </div>
                    <div className="mt-1 font-semibold text-lime-700">
                      +{formatINR(results.interest)}
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
