'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';

/* ------------------ Helpers ------------------ */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ------------------ Labels ------------------ */
interface EPFLabels {
  basicSalary: string;
  yourContribution: string;
  employerContribution: string;
  employmentPeriod: string;
  interestRate: string;
  resetDefaults: string;
  estimatedCorpus: string;
  yourShare: string;
  employerShare: string;
  totalInterest: string;
}

const DEFAULT_LABELS: EPFLabels = {
  basicSalary: 'Monthly Basic Salary + DA (₹)',
  yourContribution: 'Your Contribution (%)',
  employerContribution: 'Employer Contribution (%)',
  employmentPeriod: 'Employment Period (Years)',
  interestRate: 'EPF Interest Rate (% p.a)',
  resetDefaults: 'Reset Defaults',
  estimatedCorpus: 'Estimated EPF Corpus',
  yourShare: 'Your Contribution',
  employerShare: 'Employer Contribution',
  totalInterest: 'Total Interest Earned',
};

export default function EPFClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<EPFLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ------------------ State ------------------ */
  const [basicSalary, setBasicSalary] = useState(40000);
  const [employeePct, setEmployeePct] = useState(12);
  const [years, setYears] = useState(20);
  const [annualRate, setAnnualRate] = useState(8.25);

  /* ------------------ Calculation ------------------ */
  const results = useMemo(() => {
    const empMonthly = (basicSalary * employeePct) / 100;
    const employerMonthly = (basicSalary * 3.67) / 100;

    let balance = 0;
    let totalEmp = 0;
    let totalEmployer = 0;

    for (let y = 0; y < years; y++) {
      for (let m = 0; m < 12; m++) {
        balance += empMonthly + employerMonthly;
        balance += (balance * annualRate) / 100 / 12;
      }
      totalEmp += empMonthly * 12;
      totalEmployer += employerMonthly * 12;
    }

    const maturity = Math.round(balance);
    const invested = totalEmp + totalEmployer;
    const interest = maturity - invested;

    const principalPct =
      maturity > 0 ? Math.round((invested / maturity) * 100) : 0;

    return {
      maturity,
      totalEmp,
      totalEmployer,
      interest,
      principalPct,
      interestPct: 100 - principalPct,
    };
  }, [basicSalary, employeePct, years, annualRate]);

  /* ------------------ Reset ------------------ */
  const handleReset = () => {
    setBasicSalary(40000);
    setEmployeePct(12);
    setYears(20);
    setAnnualRate(8.25);
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* ---------- INPUTS ---------- */}
        <div className="calc-inputs space-y-6">
          <CalculatorField
            label={t.basicSalary}
            value={basicSalary}
            min={10000}
            max={500000}
            step={5000}
            onChange={setBasicSalary}
          />

          <CalculatorField
            label={t.yourContribution}
            value={employeePct}
            min={1}
            max={20}
            step={0.5}
            onChange={setEmployeePct}
          />

          <CalculatorField
            label={t.employmentPeriod}
            value={years}
            min={5}
            max={40}
            step={1}
            onChange={setYears}
          />

          <CalculatorField
            label={t.interestRate}
            value={annualRate}
            min={7}
            max={9}
            step={0.05}
            onChange={setAnnualRate}
          />

          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-slate-500 underline hover:text-slate-700 w-fit"
          >
            {t.resetDefaults}
          </button>
        </div>

        {/* ---------- VISUALS ---------- */}
        <div className="calc-visuals flex flex-col items-center justify-center">
          <EMIPieChart
            principalPct={results.principalPct}
            interestPct={results.interestPct}
          />

          <div className="mt-6 text-center w-full max-w-sm">
            <div className="text-sm text-slate-500">{t.estimatedCorpus}</div>

            <div className="mt-1 text-3xl font-extrabold text-lime-600">
              {formatINR(results.maturity)}
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="rounded-lg border border-slate-200 p-3 bg-white">
                <div className="text-xs text-slate-500">{t.yourShare}</div>
                <div className="font-semibold">
                  {formatINR(results.totalEmp)}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 p-3 bg-white">
                <div className="text-xs text-slate-500">{t.employerShare}</div>
                <div className="font-semibold">
                  {formatINR(results.totalEmployer)}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-lime-200 bg-lime-50 p-3 text-center">
              <div className="text-xs text-lime-700">{t.totalInterest}</div>
              <div className="font-semibold text-lime-700">
                +{formatINR(results.interest)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
