'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RefreshCw,
  TrendingUp,
  Landmark,
  Coins,
  Wallet,
  PieChart,
  ShieldCheck,
  Flame,
  Scale,
} from 'lucide-react';
import CalculatorField from '@/components/CalculatorField';

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------- TYPES ---------- */
interface BaseSlice {
  colorClass: string;
  pct: number;
  label?: string;
  bg?: string;
}

interface CalculatedSlice extends BaseSlice {
  strokeLength: number;
  offset: number;
}

interface ChartAccumulator {
  items: CalculatedSlice[];
  currentOffset: number;
}

/* ---------- LABELS INTERFACE ---------- */
export interface MFLabels {
  monthlySIP: string;
  lumpSum: string;
  horizon: string;
  strategy: string;
  conservative: string;
  balanced: string;
  growth: string;
  equity: string;
  debt: string;
  gold: string;
  cash: string;
  return: string;
  inflation: string;
  inflationSub: string;
  resetDefaults: string;
  portfolioValue: string;
  blendedReturn: string;
  totalInvested: string;
  wealthGained: string;
  realValue: string;
  realValueSub: string;
  assetMix: string;
}

/* ---------- DEFAULT LABELS ---------- */
const DEFAULT_LABELS: MFLabels = {
  monthlySIP: 'Monthly SIP',
  lumpSum: 'Lump Sum Investment',
  horizon: 'Investment Period',
  strategy: 'Asset Allocation Strategy',
  conservative: 'Conservative',
  balanced: 'Balanced',
  growth: 'Growth',
  equity: 'Equity',
  debt: 'Debt',
  gold: 'Gold',
  cash: 'Cash',
  return: 'Return',
  inflation: 'Inflation Adjustment',
  inflationSub: '(Real Value)',
  resetDefaults: 'Reset to defaults',
  portfolioValue: 'Expected Portfolio Value',
  blendedReturn: 'CAGR',
  totalInvested: 'Total Invested',
  wealthGained: 'Wealth Gained',
  realValue: 'Real Value',
  realValueSub: "Today's Terms",
  assetMix: 'Asset Mix',
};

/* ---------- CUSTOM PIE CHART ---------- */
const PortfolioPieChart = ({
  slices,
  centerLabel,
  size = 240,
}: {
  slices: BaseSlice[];
  centerLabel: string;
  size?: number;
}) => {
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const chartData = slices.reduce<ChartAccumulator>(
    (acc, slice) => {
      const strokeLength = (slice.pct / 100) * circumference;
      const offset = acc.currentOffset;

      return {
        items: [...acc.items, { ...slice, strokeLength, offset }],
        currentOffset: acc.currentOffset + strokeLength,
      };
    },
    { items: [], currentOffset: 0 },
  ).items;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 transform transition-all duration-500 drop-shadow-sm"
      >
        {/* Background Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-slate-100"
          strokeWidth={strokeWidth}
        />

        {chartData.map((slice, i) => {
          if (slice.pct <= 0) return null;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              className={`${slice.colorClass} transition-all duration-1000 ease-out`}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={`${slice.strokeLength} ${circumference}`}
              strokeDashoffset={-slice.offset}
              strokeLinecap={
                chartData.filter((s) => s.pct > 0).length === 1
                  ? 'round'
                  : 'butt'
              }
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {centerLabel}
        </span>
        <PieChart className="w-5 h-5 text-slate-300 mt-1" />
      </div>
    </div>
  );
};

export default function MutualFundsClient({
  labels,
}: {
  labels?: Partial<MFLabels>;
}) {
  const t = useMemo(() => ({ ...DEFAULT_LABELS, ...labels }), [labels]);

  /* ---------- STATE ---------- */
  const [monthlySIP, setMonthlySIP] = useState<number>(10000);
  const [lumpSumNow, setLumpSumNow] = useState<number>(100000);
  const [years, setYears] = useState<number>(10);

  const [strategy, setStrategy] = useState<
    'conservative' | 'balanced' | 'growth' | 'custom'
  >('balanced');

  // Asset Allocation (%)
  const [equityPct, setEquityPct] = useState<number>(50);
  const [debtPct, setDebtPct] = useState<number>(30);
  const [goldPct, setGoldPct] = useState<number>(15);
  const [cashPct, setCashPct] = useState<number>(5);

  // Returns (% CAGR)
  const [equityReturn, setEquityReturn] = useState<number>(12);
  const [debtReturn, setDebtReturn] = useState<number>(7);
  const [goldReturn, setGoldReturn] = useState<number>(8);
  const [cashReturn, setCashReturn] = useState<number>(4);

  const [inflationPct, setInflationPct] = useState<number>(6);

  /* ---------- ACTIONS ---------- */
  const applyPreset = (type: 'conservative' | 'balanced' | 'growth') => {
    setStrategy(type);
    if (type === 'conservative') {
      setEquityPct(20);
      setDebtPct(60);
      setGoldPct(15);
      setCashPct(5);
    } else if (type === 'balanced') {
      setEquityPct(50);
      setDebtPct(30);
      setGoldPct(15);
      setCashPct(5);
    } else if (type === 'growth') {
      setEquityPct(75);
      setDebtPct(15);
      setGoldPct(5);
      setCashPct(5);
    }
  };

  const handleReset = () => {
    setMonthlySIP(10000);
    setLumpSumNow(100000);
    setYears(10);
    applyPreset('balanced');
    setEquityReturn(12);
    setDebtReturn(7);
    setGoldReturn(8);
    setCashReturn(4);
    setInflationPct(6);
  };

  // Switch to custom if user manually edits allocations
  const handleGridInput =
    (setter: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStrategy('custom');
      setter(Number(e.target.value) || 0);
    };

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const months = Math.round(years * 12);
    const totalAlloc = equityPct + debtPct + goldPct + cashPct || 1; // Prevent div by 0

    // Normalized allocations (ensures they always mathematically equal 100%)
    const alloc = {
      equity: equityPct / totalAlloc,
      debt: debtPct / totalAlloc,
      gold: goldPct / totalAlloc,
      cash: cashPct / totalAlloc,
    };

    const calcFutureValue = (ratio: number, annualRate: number) => {
      const monthlyRate = annualRate / 12 / 100;
      const sipPart = monthlySIP * ratio;
      const lumpPart = lumpSumNow * ratio;

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

    const fvEquity = calcFutureValue(alloc.equity, equityReturn);
    const fvDebt = calcFutureValue(alloc.debt, debtReturn);
    const fvGold = calcFutureValue(alloc.gold, goldReturn);
    const fvCash = calcFutureValue(alloc.cash, cashReturn);

    const totalFV = Math.round(fvEquity + fvDebt + fvGold + fvCash);
    const totalInvested = Math.round(monthlySIP * months + lumpSumNow);
    const wealthGained = totalFV - totalInvested;

    // Inflation Adjustment
    const monthlyInflation = inflationPct / 12 / 100;
    const realValue = Math.round(
      totalFV / Math.pow(1 + monthlyInflation, months),
    );

    // Weighted Average Return
    const blendedReturn = (
      equityReturn * alloc.equity +
      debtReturn * alloc.debt +
      goldReturn * alloc.gold +
      cashReturn * alloc.cash
    ).toFixed(1);

    // Slices for Pie Chart
    const pieSlices = [
      {
        colorClass: 'text-emerald-500',
        pct: alloc.equity * 100,
        label: t.equity,
        bg: 'bg-emerald-500',
      },
      {
        colorClass: 'text-blue-500',
        pct: alloc.debt * 100,
        label: t.debt,
        bg: 'bg-blue-500',
      },
      {
        colorClass: 'text-amber-400',
        pct: alloc.gold * 100,
        label: t.gold,
        bg: 'bg-amber-400',
      },
      {
        colorClass: 'text-slate-400',
        pct: alloc.cash * 100,
        label: t.cash,
        bg: 'bg-slate-400',
      }
    ];

    return {
      totalFV,
      totalInvested,
      wealthGained,
      realValue,
      blendedReturn,
      pieSlices,
    };
  }, [
    monthlySIP,
    lumpSumNow,
    years,
    equityPct,
    debtPct,
    goldPct,
    cashPct,
    equityReturn,
    debtReturn,
    goldReturn,
    cashReturn,
    inflationPct,
    t
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-12 mt-8">
      {/* --- LEFT: INPUTS --- */}
      <div className="lg:col-span-7 space-y-4">
        {/* Core Inputs */}
        <Card className="border-none shadow-none">
          <CardContent className="px-6 space-y-6">
            <CalculatorField
              label={t.monthlySIP}
              value={monthlySIP}
              onChange={setMonthlySIP}
              min={0}
              max={500000}
              step={500}
              prefix="₹"
            />
            <CalculatorField
              label={t.lumpSum}
              value={lumpSumNow}
              onChange={setLumpSumNow}
              min={0}
              max={10000000}
              step={5000}
              prefix="₹"
            />
            <CalculatorField
              label={t.horizon}
              value={years}
              onChange={setYears}
              min={1}
              max={50}
              step={1}
              suffix=" Years"
            />
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card className="border-none shadow-none">
          <CardContent className="px-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-base font-bold text-slate-900">
                {t.strategy}
              </h3>
            </div>

            {/* Segmented Control for Presets */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => applyPreset('conservative')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  strategy === 'conservative'
                    ? 'bg-white shadow text-emerald-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> {t.conservative}
              </button>
              <button
                onClick={() => applyPreset('balanced')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  strategy === 'balanced'
                    ? 'bg-white shadow text-emerald-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Scale className="w-4 h-4" /> {t.balanced}
              </button>
              <button
                onClick={() => applyPreset('growth')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  strategy === 'growth'
                    ? 'bg-white shadow text-emerald-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Flame className="w-4 h-4" /> {t.growth}
              </button>
            </div>

            {/* Granular Allocation Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  label: t.equity,
                  icon: TrendingUp,
                  pct: equityPct,
                  setPct: setEquityPct,
                  ret: equityReturn,
                  setRet: setEquityReturn,
                  color: 'text-emerald-600',
                  bg: 'bg-emerald-50 border-emerald-100',
                },
                {
                  label: t.debt,
                  icon: Landmark,
                  pct: debtPct,
                  setPct: setDebtPct,
                  ret: debtReturn,
                  setRet: setDebtReturn,
                  color: 'text-blue-600',
                  bg: 'bg-blue-50 border-blue-100',
                },
                {
                  label: t.gold,
                  icon: Coins,
                  pct: goldPct,
                  setPct: setGoldPct,
                  ret: goldReturn,
                  setRet: setGoldReturn,
                  color: 'text-amber-600',
                  bg: 'bg-amber-50 border-amber-100',
                },
                {
                  label: t.cash,
                  icon: Wallet,
                  pct: cashPct,
                  setPct: setCashPct,
                  ret: cashReturn,
                  setRet: setCashReturn,
                  color: 'text-slate-600',
                  bg: 'bg-slate-50 border-slate-200',
                }
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
                    <div className="flex gap-4">
                      <div className="flex-1 space-y-1.5">
                        <Label className="text-xs text-slate-500">
                          Allocation %
                        </Label>
                        <Input
                          type="number"
                          value={item.pct}
                          onChange={handleGridInput(item.setPct)}
                          className="h-9 bg-white font-semibold"
                        />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <Label className="text-xs text-slate-500">
                          Return %
                        </Label>
                        <Input
                          type="number"
                          value={item.ret}
                          onChange={handleGridInput(item.setRet)}
                          className="h-9 bg-white font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Inflation Setting & Reset */}
        <Card className="border-none shadow-none">
          <CardContent className="px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <CalculatorField
                label={t.inflation}
                value={inflationPct}
                onChange={setInflationPct}
                min={0}
                max={15}
                step={0.1}
                suffix="%"
              />
            </div>
          </CardContent>
        </Card>
        <button
          onClick={handleReset}
          className="text-sm font-semibold text-slate-500 hover:text-emerald-600 flex items-center justify-center gap-2 transition-colors py-2 px-4 rounded-lg hover:bg-emerald-50"
        >
          <RefreshCw className="w-4 h-4" /> {t.resetDefaults}
        </button>
      </div>

      {/* --- RIGHT: RESULTS --- */}
      <div className="lg:col-span-5">
        <Card className="sticky top-6 mr-5 border-brand-400 bg-white shadow-md overflow-hidden flex flex-col">
          <div className="bg-linear-to-br from-brand-50 to-white border-b border-brand-200 p-6 sm:p-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-brand-700 uppercase tracking-wider mb-2">
                {t.portfolioValue}
              </p>
              <h3 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                {formatINR(results.totalFV)}
              </h3>
              <div className="inline-flex items-center gap-1.5 mt-3 bg-white px-4 py-1.5 rounded-full border border-brand-200 shadow-sm">
                <span className="text-sm font-bold text-brand-700">
                  {results.blendedReturn}% Expected {t.blendedReturn}
                </span>
              </div>
            </div>
          </div>

          <CardContent className="p-6 sm:p-8 flex-1 flex flex-col">
            {/* Pie Chart */}
            <div className="flex justify-center mb-8">
              <PortfolioPieChart
                slices={results.pieSlices}
                centerLabel={t.assetMix}
              />
            </div>

            {/* Breakdown */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600 font-medium">
                  {t.totalInvested}
                </span>
                <span className="font-semibold text-slate-900 text-lg">
                  {formatINR(results.totalInvested)}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600 font-medium">
                  {t.wealthGained}
                </span>
                <span className="font-bold text-emerald-600 text-lg">
                  +{formatINR(results.wealthGained)}
                </span>
              </div>

              <div className="flex justify-between items-center py-4 mt-2 bg-slate-50 px-4 rounded-xl border border-slate-200">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">
                    {t.realValue}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {t.realValueSub}
                  </span>
                </div>
                <span className="font-bold text-slate-900 text-xl">
                  {formatINR(results.realValue)}
                </span>
              </div>
            </div>

            {/* Legend (Effective Allocation) */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Effective Allocation
              </p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                {results.pieSlices.map((slice, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span
                      className={`w-3 h-3 rounded-full ${slice.bg} shadow-sm`}
                    />
                    <span className="text-slate-600 font-medium">
                      {slice.label}:
                    </span>
                    <span className="font-bold text-slate-900">
                      {slice.pct.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
