'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';

/* ------------------ HELPERS ------------------ */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ------------------ DATA ------------------ */

// Approx monthly contribution for ₹5,000 pension
const APY_BASE_5000: Record<number, number> = {
  18: 210,
  20: 248,
  25: 376,
  30: 577,
  35: 902,
  40: 1454,
};

const PENSION_SLABS = [1000, 2000, 3000, 4000, 5000] as const;
type Frequency = 'Monthly' | 'Quarterly' | 'Half-Yearly';

/* ------------------ COMPONENT ------------------ */

export default function APYClient() {
  /* ---------- STATE ---------- */
  const [joiningAge, setJoiningAge] = useState<number>(25);
  const [pension, setPension] = useState<number>(5000);
  const [frequency, setFrequency] = useState<Frequency>('Monthly');

  /* ---------- CALCULATION ---------- */
  const result = useMemo(() => {
    const retirementAge = 60;
    const years = Math.max(0, retirementAge - joiningAge);
    const months = years * 12;

    const base5000 = APY_BASE_5000[joiningAge] ?? 0;
    const scale = pension / 5000;

    const monthlyBase = Math.round(base5000 * scale);

    let periodicContribution = monthlyBase;
    if (frequency === 'Quarterly') periodicContribution = monthlyBase * 3;
    if (frequency === 'Half-Yearly') periodicContribution = monthlyBase * 6;

    const totalInvestment = monthlyBase * months;
    const nomineeCorpus = Math.round(850000 * scale);

    const investedPct =
      nomineeCorpus > 0
        ? Math.round((totalInvestment / nomineeCorpus) * 100)
        : 0;

    return {
      years,
      periodicContribution,
      totalInvestment,
      nomineeCorpus,
      investedPct,
      growthPct: 100 - investedPct,
    };
  }, [joiningAge, pension, frequency]);

  /* ---------- RESET ---------- */
  const resetDefaults = () => {
    setJoiningAge(25);
    setPension(5000);
    setFrequency('Monthly');
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* ================= INPUTS ================= */}
        <div className="calc-inputs space-y-6">
          <CalculatorField
            label="Joining Age (18–40 years)"
            value={joiningAge}
            min={18}
            max={40}
            step={1}
            onChange={setJoiningAge}
          />

          {/* Pension slab */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              Desired Monthly Pension (₹)
            </label>
            <select
              value={pension}
              onChange={(e) => setPension(Number(e.target.value))}
              className="
                w-full rounded-lg border border-slate-300 bg-white
                px-4 py-2 text-base font-semibold text-slate-900
                focus:border-lime-500 focus:ring-2 focus:ring-lime-200
                outline-none
              "
            >
              {PENSION_SLABS.map((v) => (
                <option key={v} value={v}>
                  {formatINR(v)}
                </option>
              ))}
            </select>
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              Contribution Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Frequency)}
              className="
                w-full rounded-lg border border-slate-300 bg-white
                px-4 py-2 text-base font-semibold text-slate-900
                focus:border-lime-500 focus:ring-2 focus:ring-lime-200
                outline-none
              "
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Half-Yearly">Half-Yearly</option>
            </select>
          </div>

          {/* Info */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Contribution Years</span>
              <span className="font-semibold text-slate-900">
                {result.years} years
              </span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-slate-500">Pension Starts</span>
              <span className="font-semibold text-slate-900">Age 60</span>
            </div>
          </div>

          <button
            onClick={resetDefaults}
            className="w-fit text-sm font-medium text-slate-500 underline hover:text-slate-700"
          >
            Reset defaults
          </button>
        </div>

        {/* ================= VISUALS ================= */}
        <div className="calc-visuals flex flex-col items-center">
          <EMIPieChart
            principalPct={result.investedPct}
            interestPct={result.growthPct}
            size={200}
          />

          <div className="mt-6 w-full space-y-4">
            <div className="text-center">
              <div className="text-sm text-slate-500">You need to pay</div>
              <div className="text-3xl font-extrabold text-lime-600">
                {formatINR(result.periodicContribution)}
                <span className="ml-1 text-base font-medium text-slate-500">
                  / {frequency}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="text-slate-500">Total Investment</div>
                <div className="font-semibold">
                  {formatINR(result.totalInvestment)}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="text-slate-500">Corpus to Nominee</div>
                <div className="font-semibold text-emerald-600">
                  {formatINR(result.nomineeCorpus)}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-lime-200 bg-lime-50 p-4 text-center">
              <div className="text-xs font-semibold text-lime-700">
                Guaranteed Monthly Pension
              </div>
              <div className="text-xl font-bold text-lime-800">
                {formatINR(pension)}
              </div>
              <div className="text-xs text-lime-600">(for you & spouse)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
