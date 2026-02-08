'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CalculatorField from '@/components/CalculatorField';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Settings2,
  TrendingUp,
  Wallet,
  RefreshCcw,
  PieChart,
} from 'lucide-react';

// --- Utility: Format Currency ---
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

// --- Constants ---
const DEFAULT_RETURNS = { equity: 12, debt: 7, gold: 8 };

// --- Donut Chart (Fixed Immutability Issue) ---
function MultiAssetChart({
  slices,
  totalValue,
}: {
  slices: { color: string; pct: number; label: string }[];
  totalValue: string;
}) {
  const size = 220;
  const strokeWidth = 24;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  // ✅ FIX: Use reduce to avoid mutating a variable inside map
  const { segments: chartSegments } = slices.reduce(
    (acc, slice) => {
      const dashArray = (slice.pct / 100) * circumference;
      const dashOffset = -acc.offset;

      acc.segments.push({
        color: slice.color,
        dashArray,
        dashOffset,
      });

      acc.offset += dashArray;
      return acc;
    },
    {
      segments: [] as {
        color: string;
        dashArray: number;
        dashOffset: number;
      }[],
      offset: 0,
    }
  );

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      <div style={{ width: size, height: size }} className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Segments */}
          {chartSegments.map((segment, i) => (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segment.dashArray} ${circumference}`}
              strokeDashoffset={segment.dashOffset}
              strokeLinecap="butt"
              className="transition-all duration-500 ease-out"
            />
          ))}
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
            Total Value
          </span>
          <span className="text-2xl font-bold text-slate-900">
            {totalValue}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {slices.map((slice, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: slice.color }}
            />
            <span className="text-sm font-medium text-slate-600">
              {slice.label}
            </span>
            <span className="text-xs text-slate-400">
              ({Math.round(slice.pct)}%)
            </span>
          </div>
        ))}
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

  // --- Asset Allocation (0-100) ---
  const [equityPct, setEquityPct] = useState(60);
  const [debtPct, setDebtPct] = useState(30);
  const [goldPct, setGoldPct] = useState(10);

  // --- Expected Returns ---
  const [equityRet, setEquityRet] = useState(DEFAULT_RETURNS.equity);
  const [debtRet, setDebtRet] = useState(DEFAULT_RETURNS.debt);
  const [goldRet, setGoldRet] = useState(DEFAULT_RETURNS.gold);

  // --- Logic ---
  const totalAlloc = equityPct + debtPct + goldPct || 1;
  const alloc = {
    equity: equityPct / totalAlloc,
    debt: debtPct / totalAlloc,
    gold: goldPct / totalAlloc,
  };

  const months = years * 12;

  const calculateFV = (
    p: number,
    r: number,
    n: number,
    type: 'sip' | 'lumpsum'
  ) => {
    const monthlyRate = r / 12 / 100;
    if (monthlyRate === 0) return p * (type === 'sip' ? n : 1);
    if (type === 'lumpsum') return p * Math.pow(1 + monthlyRate, n);
    return (
      p * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate)
    );
  };

  const equityFV =
    calculateFV(monthlySIP * alloc.equity, equityRet, months, 'sip') +
    calculateFV(lumpSum * alloc.equity, equityRet, months, 'lumpsum');
  const debtFV =
    calculateFV(monthlySIP * alloc.debt, debtRet, months, 'sip') +
    calculateFV(lumpSum * alloc.debt, debtRet, months, 'lumpsum');
  const goldFV =
    calculateFV(monthlySIP * alloc.gold, goldRet, months, 'sip') +
    calculateFV(lumpSum * alloc.gold, goldRet, months, 'lumpsum');

  const totalFutureValue = Math.round(equityFV + debtFV + goldFV);
  const totalInvested = Math.round(monthlySIP * months + lumpSum);
  const totalProfit = totalFutureValue - totalInvested;

  // Real Value (Inflation Adjusted)
  const realValue = Math.round(
    totalFutureValue / Math.pow(1 + inflation / 100, years)
  );

  const resetDefaults = () => {
    setAsset(60, 30, 10);
    setMonthlySIP(10000);
    setLumpSum(100000);
    setYears(15);
  };

  const setAsset = (e: number, d: number, g: number) => {
    setEquityPct(e);
    setDebtPct(d);
    setGoldPct(g);
  };

  return (
    <Card className="border-border shadow-sm bg-card">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Settings2 className="h-5 w-5 text-indigo-600" />
            Portfolio Configuration
          </CardTitle>
          <button
            onClick={resetDefaults}
            className="text-xs text-slate-500 flex items-center gap-1 hover:text-indigo-600 transition-colors"
          >
            <RefreshCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* --- LEFT COLUMN: INPUTS --- */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Core Inputs using CalculatorField */}
            <div className="space-y-6">
              <CalculatorField
                label="Monthly SIP Amount"
                value={monthlySIP}
                min={0}
                max={500000}
                step={500}
                onChange={setMonthlySIP}
              />

              <CalculatorField
                label="Lumpsum Investment"
                value={lumpSum}
                min={0}
                max={10000000}
                step={5000}
                onChange={setLumpSum}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <CalculatorField
                  label="Duration (Years)"
                  value={years}
                  min={1}
                  max={40}
                  step={1}
                  onChange={setYears}
                />
                <CalculatorField
                  label="Expected Inflation (%)"
                  value={inflation}
                  min={0}
                  max={15}
                  step={0.5}
                  onChange={setInflation}
                />
              </div>
            </div>

            {/* 2. Asset Allocation Mixer */}
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50 space-y-5">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-bold text-slate-700">
                  Asset Allocation Strategy
                </Label>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 bg-white"
                    onClick={() => setAsset(80, 15, 5)}
                  >
                    Aggressive
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 hover:text-blue-700 bg-white"
                    onClick={() => setAsset(50, 40, 10)}
                  >
                    Balanced
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-amber-50 hover:text-amber-700 bg-white"
                    onClick={() => setAsset(20, 70, 10)}
                  >
                    Safe
                  </Badge>
                </div>
              </div>

              {/* Compact Sliders for Asset Mix */}
              <div className="space-y-4">
                {/* Equity */}
                <div className="grid grid-cols-[80px_1fr_60px] gap-3 items-center">
                  <span className="text-xs font-bold text-emerald-700">
                    Equity
                  </span>
                  <Slider
                    className="text-emerald-600"
                    value={[equityPct]}
                    max={100}
                    step={5}
                    onValueChange={(v) => setEquityPct(v[0])}
                  />
                  <div className="relative">
                    <Input
                      className="h-7 text-xs pr-4 text-right"
                      value={equityRet}
                      onChange={(e) => setEquityRet(Number(e.target.value))}
                    />
                    <span className="absolute right-1.5 top-1.5 text-[10px] text-slate-400">
                      %
                    </span>
                  </div>
                </div>

                {/* Debt */}
                <div className="grid grid-cols-[80px_1fr_60px] gap-3 items-center">
                  <span className="text-xs font-bold text-blue-700">Debt</span>
                  <Slider
                    className="text-blue-600"
                    value={[debtPct]}
                    max={100}
                    step={5}
                    onValueChange={(v) => setDebtPct(v[0])}
                  />
                  <div className="relative">
                    <Input
                      className="h-7 text-xs pr-4 text-right"
                      value={debtRet}
                      onChange={(e) => setDebtRet(Number(e.target.value))}
                    />
                    <span className="absolute right-1.5 top-1.5 text-[10px] text-slate-400">
                      %
                    </span>
                  </div>
                </div>

                {/* Gold */}
                <div className="grid grid-cols-[80px_1fr_60px] gap-3 items-center">
                  <span className="text-xs font-bold text-amber-700">Gold</span>
                  <Slider
                    className="text-amber-600"
                    value={[goldPct]}
                    max={100}
                    step={5}
                    onValueChange={(v) => setGoldPct(v[0])}
                  />
                  <div className="relative">
                    <Input
                      className="h-7 text-xs pr-4 text-right"
                      value={goldRet}
                      onChange={(e) => setGoldRet(Number(e.target.value))}
                    />
                    <span className="absolute right-1.5 top-1.5 text-[10px] text-slate-400">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: VISUALS --- */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            {/* Chart */}
            <MultiAssetChart
              totalValue={formatINR(totalFutureValue)}
              slices={[
                { label: 'Equity', color: '#10b981', pct: alloc.equity * 100 },
                { label: 'Debt', color: '#3b82f6', pct: alloc.debt * 100 },
                { label: 'Gold', color: '#f59e0b', pct: alloc.gold * 100 }
              ]}
            />

            {/* Results Grid */}
            <div className="space-y-4">
              <Card className="border-slate-200 bg-slate-50">
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-slate-500" />
                    <span className="text-sm font-medium text-slate-600">
                      Total Investment
                    </span>
                  </div>
                  <span className="font-bold text-slate-900">
                    {formatINR(totalInvested)}
                  </span>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-900">
                      Total Profit
                    </span>
                  </div>
                  <span className="font-bold text-emerald-700">
                    +{formatINR(totalProfit)}
                  </span>
                </CardContent>
              </Card>

              <div className="pt-4 border-t border-slate-100 mt-2">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                  <span>Inflation Adjusted Value (Real Value)</span>
                  <span className="font-medium text-slate-700">
                    {formatINR(realValue)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Assuming {inflation}% annual inflation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM TABLE --- */}
        <div className="mt-12">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-indigo-500" /> Breakdown by Asset
            Class
          </h4>
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-4 py-3">Asset</th>
                  <th className="px-4 py-3">Allocation</th>
                  <th className="px-4 py-3 text-right">Future Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="px-4 py-3 font-medium text-emerald-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />{' '}
                    Equity
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {Math.round(alloc.equity * 100)}%
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">
                    {formatINR(Math.round(equityFV))}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-blue-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" /> Debt
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {Math.round(alloc.debt * 100)}%
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">
                    {formatINR(Math.round(debtFV))}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-amber-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full" /> Gold
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {Math.round(alloc.gold * 100)}%
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">
                    {formatINR(Math.round(goldFV))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
