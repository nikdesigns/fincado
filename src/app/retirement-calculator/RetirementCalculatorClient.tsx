'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent } from '@/components/ui/card';

/* ------------------ HELPERS ------------------ */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ------------------ LABELS ------------------ */
interface RetirementLabels {
  currentAge: string;
  retireAge: string;
  monthlyExpense: string;
  currentSavings: string;
  inflation: string;
  preReturn: string;
  postReturn: string;
  targetCorpus: string;
  sipRequired: string;
  expenseAtRetirement: string;
  savingsFutureValue: string;
}

const DEFAULT_LABELS: RetirementLabels = {
  currentAge: 'Current Age',
  retireAge: 'Retirement Age',
  monthlyExpense: 'Current Monthly Expense (₹)',
  currentSavings: 'Current Savings (₹)',
  inflation: 'Inflation Rate (%)',
  preReturn: 'Pre-Retirement Return (%)',
  postReturn: 'Post-Retirement Return (%)',
  targetCorpus: 'Target Retirement Corpus',
  sipRequired: 'Monthly SIP Required',
  expenseAtRetirement: 'Expense at Retirement',
  savingsFutureValue: 'Future Value of Savings',
};

/* ------------------ COMPONENT ------------------ */
export default function RetirementCalculatorClient({
  labels = {},
}: {
  labels?: Partial<RetirementLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ------------------ STATE ------------------ */
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(30000);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [inflation, setInflation] = useState(6);
  const [preReturn, setPreReturn] = useState(12);
  const [postReturn, setPostReturn] = useState(8);

  /* ------------------ CALCULATIONS ------------------ */
  const results = useMemo(() => {
    const yearsToRetire = Math.max(0, retireAge - currentAge);
    const monthsToRetire = yearsToRetire * 12;

    const monthlyInflation = inflation / 12 / 100;
    const monthlyPreReturn = preReturn / 12 / 100;

    const expenseAtRetirement =
      monthlyExpense * Math.pow(1 + monthlyInflation, monthsToRetire);

    const annualExpenseAtRetirement = expenseAtRetirement * 12;
    const retirementYears = 25;

    const realReturn = (1 + postReturn / 100) / (1 + inflation / 100) - 1;

    const targetCorpus =
      realReturn <= 0
        ? annualExpenseAtRetirement * retirementYears
        : annualExpenseAtRetirement *
          ((1 - Math.pow(1 + realReturn, -retirementYears)) / realReturn);

    const savingsFV =
      currentSavings * Math.pow(1 + monthlyPreReturn, monthsToRetire);

    const gap = Math.max(0, targetCorpus - savingsFV);

    const sip =
      gap > 0 && monthsToRetire > 0
        ? gap /
          (((Math.pow(1 + monthlyPreReturn, monthsToRetire) - 1) /
            monthlyPreReturn) *
            (1 + monthlyPreReturn))
        : 0;

    const securedPct =
      targetCorpus > 0
        ? Math.min(100, Math.round((savingsFV / targetCorpus) * 100))
        : 0;

    return {
      targetCorpus: Math.round(targetCorpus),
      expenseAtRetirement: Math.round(expenseAtRetirement),
      savingsFV: Math.round(savingsFV),
      sip: Math.round(sip),
      securedPct,
      gapPct: 100 - securedPct,
    };
  }, [
    currentAge,
    retireAge,
    monthlyExpense,
    currentSavings,
    inflation,
    preReturn,
    postReturn,
  ]);

  /* ------------------ UI ------------------ */
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ---------------- INPUTS ---------------- */}
          <div className="space-y-6">
            <CalculatorField
              label={t.currentAge}
              value={currentAge}
              min={18}
              max={retireAge - 1}
              step={1}
              onChange={setCurrentAge}
            />

            <CalculatorField
              label={t.retireAge}
              value={retireAge}
              min={currentAge + 1}
              max={75}
              step={1}
              onChange={setRetireAge}
            />

            <CalculatorField
              label={t.monthlyExpense}
              value={monthlyExpense}
              min={10000}
              max={500000}
              step={5000}
              onChange={setMonthlyExpense}
            />

            <CalculatorField
              label={t.currentSavings}
              value={currentSavings}
              min={0}
              max={10000000}
              step={50000}
              onChange={setCurrentSavings}
            />

            {/* ADVANCED RATES */}
            <details className="rounded-lg border bg-slate-50 px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium text-slate-600">
                Advanced Rates
              </summary>

              <div className="mt-4 space-y-4">
                <CalculatorField
                  label={t.inflation}
                  value={inflation}
                  min={2}
                  max={10}
                  step={0.1}
                  onChange={setInflation}
                />
                <CalculatorField
                  label={t.preReturn}
                  value={preReturn}
                  min={4}
                  max={18}
                  step={0.1}
                  onChange={setPreReturn}
                />
                <CalculatorField
                  label={t.postReturn}
                  value={postReturn}
                  min={3}
                  max={12}
                  step={0.1}
                  onChange={setPostReturn}
                />
              </div>
            </details>
          </div>

          {/* ---------------- VISUALS ---------------- */}
          <div className="flex flex-col items-center text-center space-y-8">
            <EMIPieChart
              principalPct={results.securedPct}
              interestPct={results.gapPct}
            />

            <div>
              <div className="text-sm text-slate-500">{t.targetCorpus}</div>
              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(results.targetCorpus)}
              </div>
            </div>

            <div className="rounded-xl border border-lime-300 bg-lime-50 px-6 py-4 w-full max-w-xs">
              <div className="text-xs font-semibold text-lime-700">
                {t.sipRequired}
              </div>
              <div className="mt-1 text-2xl font-extrabold text-lime-800">
                {formatINR(results.sip)}
                <span className="text-sm font-medium"> / month</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
              <div className="rounded-lg border p-3 text-left">
                <div className="text-xs text-slate-500">
                  {t.expenseAtRetirement}
                </div>
                <div className="font-semibold text-red-600">
                  {formatINR(results.expenseAtRetirement)}
                </div>
              </div>

              <div className="rounded-lg border p-3 text-left">
                <div className="text-xs text-slate-500">
                  {t.savingsFutureValue}
                </div>
                <div className="font-semibold text-emerald-700">
                  {formatINR(results.savingsFV)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
