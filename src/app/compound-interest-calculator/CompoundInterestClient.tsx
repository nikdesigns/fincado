'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TrendingUp, RefreshCcw } from 'lucide-react';

/* ------------------ Helpers ------------------ */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ------------------ Types ------------------ */
interface CompoundLabels {
  principal: string;
  rate: string;
  timePeriod: string;
  frequency: string;
  resetDefaults: string;
  totalAmount: string;
  investedAmount: string;
  interestEarned: string;
  yearly: string;
  halfYearly: string;
  quarterly: string;
  monthly: string;
}

const DEFAULT_LABELS: CompoundLabels = {
  principal: 'Principal Amount (₹)',
  rate: 'Annual Interest Rate (%)',
  timePeriod: 'Time Period (Years)',
  frequency: 'Compounding Frequency',
  resetDefaults: 'Reset',
  totalAmount: 'Maturity Amount',
  investedAmount: 'Invested Amount',
  interestEarned: 'Total Interest Earned',
  yearly: 'Yearly',
  halfYearly: 'Half-Yearly',
  quarterly: 'Quarterly',
  monthly: 'Monthly',
};

/* ---------------- CHART COMPONENT ---------------- */
function CompoundInterestDonut({
  principal,
  interest,
}: {
  principal: number;
  interest: number;
}) {
  const total = principal + interest;
  const principalPct = total > 0 ? (principal / total) * 100 : 0;
  const interestPct = total > 0 ? (interest / total) * 100 : 0;

  const size = 200;
  const strokeWidth = 24;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  // Segment 1: Principal (Slate/Gray)
  const dash1 = (principalPct / 100) * circumference;

  // Segment 2: Interest (Lime - Your Brand Color)
  const dash2 = (interestPct / 100) * circumference;
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

          {/* Principal (Slate-300) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash1} ${circumference}`}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />

          {/* Interest (Lime-600) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#65a30d"
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
            Total Value
          </span>
          <span className="text-xl font-bold text-slate-900">
            {formatINR(total)}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <span className="text-xs font-medium text-slate-600">Principal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-lime-600" />
          <span className="text-xs font-medium text-slate-600">Interest</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Component ------------------ */
export default function CompoundInterestClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<CompoundLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  // ------------------ State ------------------
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(1); // 1Y, 2HY, 4Q, 12M

  // ------------------ Calculations ------------------
  const results = useMemo(() => {
    const r = rate / 100;
    const n = frequency;
    const tYears = years;

    const maturity = principal * Math.pow(1 + r / n, n * tYears);
    const interest = maturity - principal;

    return {
      maturity: Math.round(maturity),
      interest: Math.round(interest),
    };
  }, [principal, rate, years, frequency]);

  // ------------------ Reset ------------------
  const handleReset = () => {
    setPrincipal(100000);
    setRate(10);
    setYears(10);
    setFrequency(1);
  };

  return (
    <Card className="border-border shadow-sm bg-card">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <TrendingUp className="h-5 w-5 text-lime-600" />
            Compound Interest
          </CardTitle>
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 flex items-center gap-1 hover:text-lime-600 transition-colors"
          >
            <RefreshCcw className="w-3 h-3" /> {t.resetDefaults}
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* ---------------- LEFT: INPUTS ---------------- */}
          <div className="space-y-8">
            {/* 1. Principal */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>{t.principal}</Label>
                <Badge variant="secondary" className="font-mono text-slate-700">
                  {formatINR(principal)}
                </Badge>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400">
                  ₹
                </span>
                <Input
                  type="number"
                  min={1000}
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="pl-7 h-11"
                />
              </div>
              <Slider
                value={[principal]}
                min={1000}
                max={10000000}
                step={1000}
                onValueChange={(v) => setPrincipal(v[0])}
                className="text-lime-600"
              />
            </div>

            {/* 2. Rate */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>{t.rate}</Label>
                <Badge variant="secondary" className="font-mono text-slate-700">
                  {rate}%
                </Badge>
              </div>
              <Slider
                value={[rate]}
                min={1}
                max={30}
                step={0.1}
                onValueChange={(v) => setRate(v[0])}
                className="text-lime-600"
              />
              <div className="flex gap-2 pt-1">
                {[7, 10, 12, 15].map((r) => (
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

            {/* 3. Time */}
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
                max={50}
                step={1}
                onValueChange={(v) => setYears(v[0])}
                className="text-lime-600"
              />
            </div>

            {/* 4. Frequency */}
            <div className="space-y-2">
              <Label>{t.frequency}</Label>
              <Select
                value={String(frequency)}
                onValueChange={(v) => setFrequency(Number(v))}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{t.yearly}</SelectItem>
                  <SelectItem value="2">{t.halfYearly}</SelectItem>
                  <SelectItem value="4">{t.quarterly}</SelectItem>
                  <SelectItem value="12">{t.monthly}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ---------------- RIGHT: RESULTS ---------------- */}
          <div className="flex flex-col h-full">
            <CompoundInterestDonut
              principal={principal}
              interest={results.interest}
            />

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-xs text-slate-500 font-medium mb-1">
                  {t.investedAmount}
                </div>
                <div className="text-lg font-semibold text-slate-700">
                  {formatINR(principal)}
                </div>
              </div>

              <div className="bg-lime-50 border border-lime-200 rounded-lg p-3">
                <div className="text-xs text-lime-700 font-medium mb-1">
                  {t.interestEarned}
                </div>
                <div className="text-lg font-bold text-lime-700">
                  +{formatINR(results.interest)}
                </div>
              </div>
            </div>

            {/* Maturity Summary */}
            <div className="mt-4 p-4 bg-slate-900 rounded-xl text-center text-white shadow-lg">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-1">
                {t.totalAmount}
              </p>
              <div className="text-2xl font-bold tracking-tight">
                {formatINR(results.maturity)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
