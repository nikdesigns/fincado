'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent } from '@/components/ui/card';

/* ---------- TYPES ---------- */
interface SIPLabels {
  monthlyInv: string;
  rate: string;
  timePeriod: string;
  maturityValue: string;
  invested: string;
  returns: string;
}

/* ---------- DEFAULT LABELS ---------- */
const DEFAULT_LABELS: SIPLabels = {
  monthlyInv: 'Monthly Investment (₹)',
  rate: 'Expected Return (% p.a)',
  timePeriod: 'Time Period (Years)',
  maturityValue: 'Total Maturity Value',
  invested: 'Total Invested',
  returns: 'Total Returns',
};

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function SIPClient({
  labels = {},
}: {
  labels?: Partial<SIPLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [lumpSum, setLumpSum] = useState(0);
  const [inflation, setInflation] = useState(6);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    const monthlyInflation = inflation / 12 / 100;

    let fvSIP = 0;
    if (monthlySIP > 0) {
      if (rate === 0) {
        fvSIP = monthlySIP * months;
      } else {
        fvSIP =
          monthlySIP *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);
      }
    }

    const fvLump = lumpSum * Math.pow(1 + monthlyRate, months);
    const futureValue = Math.round(fvSIP + fvLump);

    const totalInvested = Math.round(monthlySIP * months + lumpSum);
    const totalReturns = futureValue - totalInvested;

    const realValue = Math.round(
      futureValue / Math.pow(1 + monthlyInflation, months)
    );

    const investedPct =
      futureValue > 0 ? Math.round((totalInvested / futureValue) * 100) : 0;

    return {
      futureValue,
      totalInvested,
      totalReturns,
      realValue,
      investedPct,
      returnsPct: 100 - investedPct,
    };
  }, [monthlySIP, rate, years, lumpSum, inflation]);

  /* ---------- UI ---------- */
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ---------- INPUTS ---------- */}
          <div className="space-y-6">
            <CalculatorField
              label={t.monthlyInv}
              value={monthlySIP}
              min={500}
              max={200000}
              step={500}
              onChange={setMonthlySIP}
            />

            <CalculatorField
              label={t.rate}
              value={rate}
              min={1}
              max={30}
              step={0.1}
              onChange={setRate}
            />

            <CalculatorField
              label={t.timePeriod}
              value={years}
              min={1}
              max={40}
              step={1}
              onChange={setYears}
            />

            {/* ADVANCED OPTIONS */}
            <details className="pt-4 border-t">
              <summary className="cursor-pointer text-sm font-medium text-slate-600">
                Advanced Options
              </summary>

              <div className="mt-4 space-y-4">
                <CalculatorField
                  label="Initial Lump Sum (₹)"
                  value={lumpSum}
                  min={0}
                  max={10000000}
                  step={10000}
                  onChange={setLumpSum}
                />

                <CalculatorField
                  label="Inflation Rate (%)"
                  value={inflation}
                  min={0}
                  max={15}
                  step={0.1}
                  onChange={setInflation}
                />
              </div>
            </details>
          </div>

          {/* ---------- VISUAL ---------- */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={calculations.investedPct}
              interestPct={calculations.returnsPct}
            />

            <div className="mt-6 text-center">
              <div className="text-sm text-slate-500">{t.maturityValue}</div>

              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(calculations.futureValue)}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm text-left">
                <Card className="border-slate-200">
                  <CardContent>
                    <div className="text-xs text-slate-500">{t.invested}</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(calculations.totalInvested)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-lime-50">
                  <CardContent>
                    <div className="text-xs text-lime-700">{t.returns}</div>
                    <div className="mt-1 font-semibold text-lime-700">
                      +{formatINR(calculations.totalReturns)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4 inline-block rounded-md bg-slate-100 px-3 py-1 text-xs text-slate-600">
                Real Value (after {inflation}% inflation):{' '}
                <strong>{formatINR(calculations.realValue)}</strong>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
