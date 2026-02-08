'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, TrendingUp } from 'lucide-react';
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
  strategy: 'Asset Allocation',
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

/* ---------- CUSTOM PIE CHART (Internal) ---------- */
const PortfolioPieChart = ({
  slices,
  centerLabel,
  size = 220,
}: {
  slices: BaseSlice[];
  centerLabel: string;
  size?: number;
}) => {
  const strokeWidth = 22;
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
    { items: [], currentOffset: 0 }
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
        className="-rotate-90 transform transition-all duration-500"
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
              className={`${slice.colorClass} transition-all duration-700 ease-out`}
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
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {centerLabel}
        </span>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
        </div>
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

  // ✅ New State to track active strategy
  const [strategy, setStrategy] = useState<
    'conservative' | 'balanced' | 'growth'
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
    setStrategy(type); // ✅ Update active state
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
    } else {
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
    applyPreset('balanced'); // This sets strategy to 'balanced'
    setEquityReturn(12);
    setDebtReturn(7);
    setGoldReturn(8);
    setCashReturn(4);
    setInflationPct(6);
  };

  // Safe Input Handler for the custom grid inputs
  const handleGridInput =
    (setter: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value) || 0);
      // Optional: If user manually changes percentages, you might want to set strategy to null or 'custom'
      // setStrategy('custom');
    };

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const months = Math.round(years * 12);
    const totalAlloc = equityPct + debtPct + goldPct + cashPct || 1;
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
      totalFV / Math.pow(1 + monthlyInflation, months)
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

  // Helper for dynamic badge styling
  const getBadgeStyle = (type: 'conservative' | 'balanced' | 'growth') => {
    const isActive = strategy === type;
    return `cursor-pointer transition-colors ${
      isActive
        ? 'bg-emerald-50 text-emerald-700 border-emerald-500 font-semibold'
        : 'bg-white text-slate-600 hover:bg-white hover:border-emerald-300'
    }`;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* --- LEFT: INPUTS --- */}
      <div className="lg:col-span-7 space-y-8">
        <section className="space-y-6 bg-white rounded-xl ml-4">
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
        </section>

        {/* Asset Allocation */}
        <section className="ml-4 p-6 rounded-xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              {t.strategy}
            </h3>
          </div>

          <div className="flex gap-2 mb-6 mt-2">
            <Badge
              variant="outline"
              onClick={() => applyPreset('conservative')}
              className={getBadgeStyle('conservative')}
            >
              {t.conservative}
            </Badge>
            <Badge
              variant="outline"
              onClick={() => applyPreset('balanced')}
              className={getBadgeStyle('balanced')}
            >
              {t.balanced}
            </Badge>
            <Badge
              variant="outline"
              onClick={() => applyPreset('growth')}
              className={getBadgeStyle('growth')}
            >
              {t.growth}
            </Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                label: t.equity,
                pct: equityPct,
                setPct: setEquityPct,
                ret: equityReturn,
                setRet: setEquityReturn,
                color: 'text-emerald-700',
              },
              {
                label: t.debt,
                pct: debtPct,
                setPct: setDebtPct,
                ret: debtReturn,
                setRet: setDebtReturn,
                color: 'text-blue-700',
              },
              {
                label: t.gold,
                pct: goldPct,
                setPct: setGoldPct,
                ret: goldReturn,
                setRet: setGoldReturn,
                color: 'text-amber-700',
              },
              {
                label: t.cash,
                pct: cashPct,
                setPct: setCashPct,
                ret: cashReturn,
                setRet: setCashReturn,
                color: 'text-slate-700',
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"
              >
                <div
                  className={`text-xs font-bold uppercase tracking-wider mb-2 ${item.color}`}
                >
                  {item.label}
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Allocation (%)
                    </label>
                    <input
                      type="number"
                      value={item.pct}
                      onChange={handleGridInput(item.setPct)}
                      className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 block mb-1">
                      {t.return} (%)
                    </label>
                    <input
                      type="number"
                      value={item.ret}
                      onChange={handleGridInput(item.setRet)}
                      className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inflation Setting */}
        <section className="ml-4 p-4 rounded-xl border border-slate-200">
          <CalculatorField
            label={t.inflation}
            value={inflationPct}
            onChange={setInflationPct}
            min={0}
            max={15}
            step={0.1}
            suffix="%"
          />
        </section>

        <button
          onClick={handleReset}
          className="ml-4 text-sm text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> {t.resetDefaults}
        </button>
      </div>

      {/* --- RIGHT: RESULTS --- */}
      <div className="lg:col-span-5 mr-4">
        <Card className="sticky top-6 border-none shadow-none overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-lg text-center text-slate-800">
              {t.portfolioValue}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 px-6 pb-6">
            {/* Pie Chart */}
            <div className="mb-8 flex justify-center">
              <PortfolioPieChart
                slices={results.pieSlices}
                centerLabel={t.assetMix}
              />
            </div>

            {/* Big Numbers */}
            <div className="text-center mb-8">
              <div className="text-2xl sm:text-2xl font-black text-emerald-600 tracking-tight">
                {formatINR(results.totalFV)}
              </div>
              <div className="inline-flex items-center gap-1.5 mt-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <span className="text-xs font-bold text-emerald-800">
                  {results.blendedReturn}% {t.blendedReturn}
                </span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{t.totalInvested}</span>
                <span className="font-semibold text-slate-900">
                  {formatINR(results.totalInvested)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{t.wealthGained}</span>
                <span className="font-bold text-emerald-600">
                  +{formatINR(results.wealthGained)}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-slate-500 flex items-center gap-1">
                  {t.realValue}{' '}
                  <span className="text-[10px] bg-slate-100 px-1 rounded">
                    {t.realValueSub}
                  </span>
                </span>
                <span className="font-bold text-slate-700">
                  {formatINR(results.realValue)}
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-100">
              {results.pieSlices.map((slice, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className={`w-2.5 h-2.5 rounded-full ${slice.bg}`} />
                  <span className="text-slate-600">{slice.label}:</span>
                  <span className="font-bold text-slate-900">
                    {Math.round(slice.pct)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
