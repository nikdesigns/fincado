'use client';
import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Wallet } from 'lucide-react';

interface Props {
  defaultSip?: number;
  defaultRate?: number;
  defaultYears?: number;
}

export default function InlineSipCalculator({
  defaultSip = 43041,
  defaultRate = 12,
  defaultYears = 10,
}: Props) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(defaultSip);
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState(defaultYears);

  // --- LOGIC ---
  const { invested, wealthGained, totalValue } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const investedAmount = monthlyInvestment * n;

    let fv = 0;
    if (rate === 0 || years === 0) {
      fv = investedAmount;
    } else {
      fv = ((monthlyInvestment * (Math.pow(1 + r, n) - 1)) / r) * (1 + r);
    }

    return {
      invested: Math.round(investedAmount),
      wealthGained: Math.round(fv - investedAmount),
      totalValue: Math.round(fv),
    };
  }, [monthlyInvestment, rate, years]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate percentages for the visual bar
  const investedPercent = Math.min((invested / totalValue) * 100, 100);
  const gainedPercent = 100 - investedPercent;

  return (
    <div className="no-print my-8 border border-slate-200 rounded-2xl shadow-sm bg-white overflow-hidden max-w-2xl mx-auto">
      {/* --- HEADER --- */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center gap-2">
        <div className="p-1.5 bg-emerald-100 rounded text-emerald-600">
          <Calculator className="w-4 h-4" />
        </div>
        <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">
          Quick Check: Verify the Math
        </span>
      </div>

      <div className="p-6 sm:p-8">
        {/* --- INPUTS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Monthly Investment */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Monthly SIP
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                ₹
              </span>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold text-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Rate */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Return Rate (%)
            </label>
            <div className="relative">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold text-slate-900 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                %
              </span>
            </div>
          </div>

          {/* Years */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Time Period
            </label>
            <div className="relative">
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold text-slate-900 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                Yrs
              </span>
            </div>
          </div>
        </div>

        {/* --- RESULTS BOX --- */}
        <div className="bg-slate-900 rounded-xl p-6 text-white relative overflow-hidden">
          {/* Background Glow Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-20 pointer-events-none"></div>

          <div className="grid grid-cols-2 gap-y-6 relative z-10">
            {/* Invested */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-1 text-slate-400 text-xs uppercase font-bold tracking-wider">
                <Wallet className="w-3 h-3" /> Invested Amount
              </div>
              <div className="text-xl font-medium text-slate-200">
                {formatCurrency(invested)}
              </div>
            </div>

            {/* Gains */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-1 text-emerald-400 text-xs uppercase font-bold tracking-wider">
                <TrendingUp className="w-3 h-3" /> Wealth Gained
              </div>
              <div className="text-xl font-medium text-emerald-300">
                +{formatCurrency(wealthGained)}
              </div>
            </div>

            {/* Divider */}
            <div className="col-span-2 h-px bg-slate-700/50 my-2"></div>

            {/* Total Corpus */}
            <div className="col-span-2">
              <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                Total Projected Corpus
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                {formatCurrency(totalValue)}
              </div>
            </div>
          </div>

          {/* --- VISUAL BAR --- */}
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${investedPercent}%` }}
                className="h-full bg-slate-500 transition-all duration-500"
              ></div>
              <div
                style={{ width: `${gainedPercent}%` }}
                className="h-full bg-emerald-500 transition-all duration-500"
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-400 uppercase tracking-wide">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-500"></div>{' '}
                Invested
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>{' '}
                Profit
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-slate-400 mt-4 italic">
          *Tweaking these numbers helps you find a comfortable monthly goal.
        </p>
      </div>
    </div>
  );
}
