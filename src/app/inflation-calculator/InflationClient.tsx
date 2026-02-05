'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, RefreshCcw, TrendingDown, Info } from 'lucide-react';

/* ---------------- HELPERS ---------------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------------- TYPES ---------------- */
interface InflationLabels {
  currentAmount: string;
  inflationRate: string;
  timePeriod: string;
  futureValueRequired: string;
  todaysValue: string;
  inflationImpact: string;
  disclaimer: string;
}

const DEFAULT_LABELS: InflationLabels = {
  currentAmount: 'Current Expense (₹)',
  inflationRate: 'Inflation Rate (% p.a)',
  timePeriod: 'Time Period (Years)',
  futureValueRequired: 'Future Cost',
  todaysValue: 'Value Today',
  inflationImpact: 'Extra Cost due to Inflation',
  disclaimer:
    '*Inflation rates are indicative. Actual cost of living may vary.',
};

/* ---------------- CHART COMPONENT ---------------- */
function FutureValueDonut({
  original,
  extra,
}: {
  original: number;
  extra: number;
}) {
  const total = original + extra;
  const originalPct = (original / total) * 100;
  const extraPct = (extra / total) * 100;

  const size = 200;
  const strokeWidth = 24;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  // Segment 1: Original Amount (Lime - Your Brand Color)
  const dash1 = (originalPct / 100) * circumference;

  // Segment 2: Inflation Impact (Red - Warning)
  const dash2 = (extraPct / 100) * circumference;
  const offset2 = -dash1;

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      <div style={{ width: size, height: size }} className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Original (Lime-600) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#65a30d"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash1} ${circumference}`}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />

          {/* Inflation Impact (Red-500) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#ef4444"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash2} ${circumference}`}
            strokeDashoffset={offset2}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
            Total Future Cost
          </span>
          <span className="text-xl font-bold text-slate-900">
            {formatINR(total)}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-lime-600" />
          <span className="text-xs font-medium text-slate-600">Original</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs font-medium text-slate-600">Inflation</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function InflationClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<InflationLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const futureValue = amount * Math.pow(1 + rate / 100, years);
    const extraCost = futureValue - amount;

    return {
      futureValue: Math.round(futureValue),
      extraCost: Math.round(extraCost),
    };
  }, [amount, rate, years]);

  const reset = () => {
    setAmount(50000);
    setRate(6);
    setYears(10);
  };

  return (
    <Card className="border-border shadow-sm bg-card">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <TrendingUp className="h-5 w-5 text-lime-600" />
            Calculate Impact
          </CardTitle>
          <button
            onClick={reset}
            className="text-xs text-slate-500 flex items-center gap-1 hover:text-lime-600 transition-colors"
          >
            <RefreshCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* --- LEFT: INPUTS --- */}
          <div className="space-y-8">
            {/* 1. Amount */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>{t.currentAmount}</Label>
                <Badge variant="secondary" className="font-mono text-slate-700">
                  {formatINR(amount)}
                </Badge>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400">
                  ₹
                </span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="pl-7 h-11"
                />
              </div>
              <Slider
                value={[amount]}
                min={1000}
                max={500000}
                step={1000}
                onValueChange={(v) => setAmount(v[0])}
                className="text-lime-600"
              />
            </div>

            {/* 2. Inflation Rate */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>{t.inflationRate}</Label>
                <Badge variant="secondary" className="font-mono text-slate-700">
                  {rate}%
                </Badge>
              </div>
              <Slider
                value={[rate]}
                min={1}
                max={15}
                step={0.5}
                onValueChange={(v) => setRate(v[0])}
                className="text-lime-600"
              />
              <div className="flex gap-2">
                {[5, 6, 7, 10, 12].map((r) => (
                  <Badge
                    key={r}
                    variant="outline"
                    className="cursor-pointer hover:bg-slate-100"
                    onClick={() => setRate(r)}
                  >
                    {r}%
                  </Badge>
                ))}
              </div>
            </div>

            {/* 3. Years */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>{t.timePeriod}</Label>
                <Badge variant="secondary" className="font-mono text-slate-700">
                  {years} Years
                </Badge>
              </div>
              <Slider
                value={[years]}
                min={1}
                max={40}
                step={1}
                onValueChange={(v) => setYears(v[0])}
                className="text-lime-600"
              />
            </div>
          </div>

          {/* --- RIGHT: VISUALS --- */}
          <div className="flex flex-col h-full">
            {/* Donut Chart (LIME COLOR) */}
            <FutureValueDonut original={amount} extra={result.extraCost} />

            {/* Result Breakdown */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-lime-600"></span>
                  <span className="text-xs text-slate-500 font-medium">
                    {t.todaysValue}
                  </span>
                </div>
                <div className="text-lg font-semibold text-slate-700">
                  {formatINR(amount)}
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="w-3 h-3 text-red-500" />
                  <span className="text-xs text-red-600 font-medium">
                    {t.inflationImpact}
                  </span>
                </div>
                <div className="text-lg font-bold text-red-600">
                  +{formatINR(result.extraCost)}
                </div>
              </div>
            </div>

            {/* Insight Box */}
            <div className="mt-4 flex gap-3 items-start p-3 bg-lime-50 border border-lime-100 rounded-lg text-xs text-lime-800">
              <Info className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
              <p>
                To maintain your current lifestyle in{' '}
                <strong>{years} years</strong>, you will need{' '}
                <strong>{formatINR(result.futureValue)}</strong> instead of
                {formatINR(amount)}. Your savings must grow by at least {rate}%
                annually to break even.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">{t.disclaimer}</p>
        </div>
      </CardContent>
    </Card>
  );
}
