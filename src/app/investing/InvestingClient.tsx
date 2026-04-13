'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  TrendingUp,
  Wallet,
  RefreshCcw,
  PieChart,
  ShieldCheck,
  Flame,
  Scale,
  Landmark,
  Coins,
  Info,
} from 'lucide-react';
import CalculatorField from '@/components/CalculatorField';
import { Alert, AlertDescription } from '@/components/ui/alert';

// --- Utility: Format Currency ---
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

// --- Constants ---
const DEFAULT_RETURNS = { equity: 12, debt: 7, gold: 8 };

// --- Custom Donut Chart ---
function PortfolioChart({
  slices,
  totalValue,
}: {
  slices: { colorClass: string; pct: number; label: string; bgClass: string }[];
  totalValue: string;
}) {
  const size = 240;
  const strokeWidth = 24;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  const { segments } = slices.reduce(
    (acc, slice) => {
      const dashArray = (slice.pct / 100) * circumference;
      const dashOffset = -acc.offset;

      acc.segments.push({
        ...slice,
        dashArray,
        dashOffset,
      });

      acc.offset += dashArray;
      return acc;
    },
    {
      segments: [] as Array<
        (typeof slices)[0] & { dashArray: number; dashOffset: number }
      >,
      offset: 0,
    },
  );

  return (
    <div className="relative flex flex-col items-center justify-center py-4">
      <div
        style={{ width: size, height: size }}
        className="relative drop-shadow-sm"
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90 transform transition-all duration-500"
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            className="stroke-slate-100"
            strokeWidth={strokeWidth}
          />
          {/* Slices */}
          {segments.map((segment, i) => {
            if (segment.pct <= 0) return null;
            return (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                className={`${segment.colorClass} transition-all duration-1000 ease-out`}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={`${segment.dashArray} ${circumference}`}
                strokeDashoffset={segment.dashOffset}
                strokeLinecap={
                  segments.filter((s) => s.pct > 0).length === 1
                    ? 'round'
                    : 'butt'
                }
              />
            );
          })}
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            Total Value
          </span>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            {totalValue}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function InvestingClient() {
  // --- Standard Inputs ---
  const [monthlySIP, setMonthlySIP] = useState(10000);
  const [lumpSum, setLumpSum] = useState(100000);
  const [years, setYears] = useState(15);
  const [inflation, setInflation] = useState(6);

  // --- Asset Allocation State ---
  const [strategy, setStrategy] = useState<
    'safe' | 'balanced' | 'aggressive' | 'custom'
  >('balanced');

  const [equityPct, setEquityPct] = useState(50);
  const [debtPct, setDebtPct] = useState(40);
  const [goldPct, setGoldPct] = useState(10);

  // --- Expected Returns State ---
  const [equityRet, setEquityRet] = useState(DEFAULT_RETURNS.equity);
  const [debtRet, setDebtRet] = useState(DEFAULT_RETURNS.debt);
  const [goldRet, setGoldRet] = useState(DEFAULT_RETURNS.gold);

  // --- Actions ---
  const applyPreset = (type: 'safe' | 'balanced' | 'aggressive') => {
    setStrategy(type);
    if (type === 'safe') {
      setEquityPct(20);
      setDebtPct(70);
      setGoldPct(10);
    } else if (type === 'balanced') {
      setEquityPct(50);
      setDebtPct(40);
      setGoldPct(10);
    } else if (type === 'aggressive') {
      setEquityPct(80);
      setDebtPct(15);
      setGoldPct(5);
    }
  };

  const handleReset = () => {
    setMonthlySIP(10000);
    setLumpSum(100000);
    setYears(15);
    applyPreset('balanced');
    setEquityRet(DEFAULT_RETURNS.equity);
    setDebtRet(DEFAULT_RETURNS.debt);
    setGoldRet(DEFAULT_RETURNS.gold);
    setInflation(6);
  };

  const handleCustomInput =
    (setter: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStrategy('custom');
      setter(Number(e.target.value) || 0);
    };

  // --- Math Engine ---
  const results = useMemo(() => {
    const months = years * 12;

    // Normalize percentages to ensure they always equal exactly 100% in math
    const totalAlloc = equityPct + debtPct + goldPct || 1;
    const alloc = {
      equity: equityPct / totalAlloc,
      debt: debtPct / totalAlloc,
      gold: goldPct / totalAlloc,
    };

    const calculateFV = (ratio: number, annualRate: number) => {
      const monthlyRate = annualRate / 12 / 100;
      const sipPart = monthlySIP * ratio;
      const lumpPart = lumpSum * ratio;

      let fvSip = 0;
      if (monthlyRate === 0) fvSip = sipPart * months;
      else
        fvSip =
          sipPart *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);

      const fvLump = lumpPart * Math.pow(1 + monthlyRate, months);
      return fvSip + fvLump;
    };

    const fvEquity = calculateFV(alloc.equity, equityRet);
    const fvDebt = calculateFV(alloc.debt, debtRet);
    const fvGold = calculateFV(alloc.gold, goldRet);

    const totalFV = Math.round(fvEquity + fvDebt + fvGold);
    const totalInvested = Math.round(monthlySIP * months + lumpSum);
    const totalProfit = totalFV - totalInvested;

    // Inflation Adjusted (Real) Value
    const realValue = Math.round(
      totalFV / Math.pow(1 + inflation / 100, years),
    );

    // Weighted Average Return (CAGR)
    const blendedReturn = (
      equityRet * alloc.equity +
      debtRet * alloc.debt +
      goldRet * alloc.gold
    ).toFixed(1);

    // Chart Data
    const pieSlices = [
      {
        label: 'Equity',
        pct: alloc.equity * 100,
        colorClass: 'text-emerald-500',
        bgClass: 'bg-emerald-500',
        value: fvEquity,
      },
      {
        label: 'Debt',
        pct: alloc.debt * 100,
        colorClass: 'text-blue-500',
        bgClass: 'bg-blue-500',
        value: fvDebt,
      },
      {
        label: 'Gold',
        pct: alloc.gold * 100,
        colorClass: 'text-amber-400',
        bgClass: 'bg-amber-400',
        value: fvGold,
      },
    ];

    return {
      totalFV,
      totalInvested,
      totalProfit,
      realValue,
      blendedReturn,
      pieSlices,
      alloc,
    };
  }, [
    monthlySIP,
    lumpSum,
    years,
    equityPct,
    debtPct,
    goldPct,
    equityRet,
    debtRet,
    goldRet,
    inflation,
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-12 mt-8">
      {/* --- LEFT COLUMN: INPUTS --- */}
      <div className="lg:col-span-7 space-y-8">
        {/* Section 1: Core Investment */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <CalculatorField
              label="Monthly SIP Amount"
              value={monthlySIP}
              min={0}
              max={500000}
              step={500}
              onChange={setMonthlySIP}
              prefix="₹"
            />
            <CalculatorField
              label="Lumpsum Investment (One-time)"
              value={lumpSum}
              min={0}
              max={10000000}
              step={5000}
              onChange={setLumpSum}
              prefix="₹"
            />
            <CalculatorField
              label="Investment Duration"
              value={years}
              min={1}
              max={40}
              step={1}
              onChange={setYears}
              suffix=" Years"
            />
          </CardContent>
        </Card>

        {/* Section 2: Asset Allocation */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-base font-bold text-slate-900">
                Asset Allocation Strategy
              </h3>
            </div>

            {/* Segmented Control for Presets */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => applyPreset('safe')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  strategy === 'safe'
                    ? 'bg-white shadow text-indigo-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Safe
              </button>
              <button
                onClick={() => applyPreset('balanced')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  strategy === 'balanced'
                    ? 'bg-white shadow text-indigo-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Scale className="w-4 h-4" /> Balanced
              </button>
              <button
                onClick={() => applyPreset('aggressive')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  strategy === 'aggressive'
                    ? 'bg-white shadow text-indigo-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Flame className="w-4 h-4" /> Aggressive
              </button>
            </div>

            {/* Granular Allocation Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: 'Equity',
                  icon: TrendingUp,
                  pct: equityPct,
                  setPct: setEquityPct,
                  ret: equityRet,
                  setRet: setEquityRet,
                  color: 'text-emerald-700',
                  bg: 'bg-emerald-50/50 border-emerald-100',
                },
                {
                  label: 'Debt',
                  icon: Landmark,
                  pct: debtPct,
                  setPct: setDebtPct,
                  ret: debtRet,
                  setRet: setDebtRet,
                  color: 'text-blue-700',
                  bg: 'bg-blue-50/50 border-blue-100',
                },
                {
                  label: 'Gold',
                  icon: Coins,
                  pct: goldPct,
                  setPct: setGoldPct,
                  ret: goldRet,
                  setRet: setGoldRet,
                  color: 'text-amber-700',
                  bg: 'bg-amber-50/50 border-amber-100',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border ${item.bg} transition-all`}
                  >
                    <div
                      className={`flex items-center gap-2 font-bold uppercase tracking-wider mb-4 ${item.color}`}
                    >
                      <Icon className="w-4 h-4" /> {item.label}
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-500 font-semibold">
                          Allocation %
                        </Label>
                        <Input
                          type="number"
                          value={item.pct}
                          onChange={handleCustomInput(item.setPct)}
                          className="h-10 bg-white font-bold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-500 font-semibold">
                          Expected Return %
                        </Label>
                        <Input
                          type="number"
                          value={item.ret}
                          onChange={handleCustomInput(item.setRet)}
                          className="h-10 bg-white font-bold"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {equityPct + debtPct + goldPct !== 100 && (
              <Alert className="bg-slate-50 border-slate-200 py-2">
                <Info className="h-4 w-4 text-slate-500 mt-0.5" />
                <AlertDescription className="ml-2 text-xs text-slate-600">
                  Values don&apos;t equal 100%. Don&apos;t worry, we
                  automatically normalize the math to exactly 100% for the
                  calculation.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Section 3: Inflation Setting & Reset */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <CalculatorField
                label="Expected Inflation Rate"
                value={inflation}
                onChange={setInflation}
                min={0}
                max={15}
                step={0.1}
                suffix="%"
              />
            </div>
            <button
              onClick={handleReset}
              className="text-sm font-semibold text-slate-500 hover:text-indigo-600 flex items-center justify-center gap-2 transition-colors py-2 px-4 rounded-lg hover:bg-indigo-50 shrink-0"
            >
              <RefreshCcw className="w-4 h-4" /> Reset Defaults
            </button>
          </CardContent>
        </Card>
      </div>

      {/* --- RIGHT COLUMN: VISUALS --- */}
      <div className="lg:col-span-5">
        <Card className="sticky top-6 border-[#B0EC70] bg-white shadow-md overflow-hidden flex flex-col">
          {/* Header Metric */}
          <div className="bg-linear-to-br from-[#F7FDF1] to-white border-b border-[#DFF7C6] p-6 sm:p-8 text-center">
            <p className="text-sm font-semibold text-[#577A30] uppercase tracking-wider mb-2">
              Expected Portfolio Value
            </p>
            <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {formatINR(results.totalFV)}
            </h3>
            <div className="inline-flex items-center gap-1.5 mt-4 bg-white px-4 py-1.5 rounded-full border border-[#DFF7C6] shadow-sm">
              <span className="text-sm font-bold text-[#577A30]">
                {results.blendedReturn}% Blended CAGR
              </span>
            </div>
          </div>

          <CardContent className="p-6 sm:p-8 flex-1 flex flex-col">
            {/* Chart */}
            <PortfolioChart
              slices={results.pieSlices}
              totalValue={formatINR(results.totalInvested)}
            />

            {/* Primary Results */}
            <div className="space-y-4 pt-4 mt-2 border-t border-slate-100">
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600 font-medium flex items-center gap-2">
                  <Wallet className="w-4 h-4" /> Total Invested
                </span>
                <span className="font-semibold text-slate-900 text-lg">
                  {formatINR(results.totalInvested)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600 font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" /> Wealth
                  Gained
                </span>
                <span className="font-bold text-emerald-600 text-lg">
                  +{formatINR(results.totalProfit)}
                </span>
              </div>

              <div className="flex justify-between items-center py-4 mt-2 bg-slate-50 px-4 rounded-xl border border-slate-200">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">Real Value</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Inflation Adjusted (Today&apos;s Value)
                  </span>
                </div>
                <span className="font-bold text-slate-900 text-xl">
                  {formatINR(results.realValue)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- BOTTOM SECTION: DATA TABLE --- */}
      <div className="lg:col-span-12 mt-4">
        <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-indigo-600" /> Detailed Portfolio
          Breakdown
        </h4>
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Asset Class</th>
                  <th className="px-6 py-4">Effective Allocation</th>
                  <th className="px-6 py-4">Expected Return</th>
                  <th className="px-6 py-4 text-right">Future Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.pieSlices.map((slice, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
                      <span
                        className={`w-3 h-3 rounded-full ${slice.bgClass} shadow-sm`}
                      />
                      {slice.label}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">
                      {slice.pct.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">
                      {slice.label === 'Equity'
                        ? equityRet
                        : slice.label === 'Debt'
                          ? debtRet
                          : goldRet}
                      %
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                      {formatINR(slice.value)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">
                    Total Portfolio
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">100%</td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {results.blendedReturn}% (CAGR)
                  </td>
                  <td className="px-6 py-4 text-right font-black text-emerald-700 text-lg">
                    {formatINR(results.totalFV)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
