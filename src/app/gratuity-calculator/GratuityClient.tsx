'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

interface GratuityLabels {
  basicSalary: string;
  yearsOfService: string;
  coveredFlag: string;
  resetDefaults: string;
  totalGratuity: string;
  exemptGratuity: string;
  taxableGratuity: string;
}

const DEFAULT_LABELS: GratuityLabels = {
  basicSalary: 'Monthly Basic Salary + DA (₹)',
  yearsOfService: 'Years of Service',
  coveredFlag: 'Covered under Gratuity Act? (1 = Yes, 0 = No)',
  resetDefaults: 'Reset Defaults',
  totalGratuity: 'Total Gratuity Payable',
  exemptGratuity: 'Tax Exempt Amount',
  taxableGratuity: 'Taxable Amount',
};

export default function GratuityClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<GratuityLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  const [basicSalary, setBasicSalary] = useState(50000);
  const [years, setYears] = useState(5);
  const [coveredFlag, setCoveredFlag] = useState(1); // 1 = Yes, 0 = No

  const result = useMemo(() => {
    let gratuity = 0;

    if (years >= 5) {
      gratuity =
        coveredFlag === 1
          ? Math.round((basicSalary * 15 * years) / 26)
          : Math.round((basicSalary * 15 * years) / 30);
    }

    const MAX_EXEMPT = 2000000;
    const exempt = Math.min(gratuity, MAX_EXEMPT);
    const taxable = Math.max(0, gratuity - MAX_EXEMPT);

    const exemptPct = gratuity ? Math.round((exempt / gratuity) * 100) : 100;

    return {
      gratuity,
      exempt,
      taxable,
      exemptPct,
      taxablePct: 100 - exemptPct,
    };
  }, [basicSalary, years, coveredFlag]);

  const handleReset = () => {
    setBasicSalary(50000);
    setYears(5);
    setCoveredFlag(1);
  };

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* INPUTS */}
        <div className="calc-inputs">
          <CalculatorField
            label={t.basicSalary}
            value={basicSalary}
            min={10000}
            max={500000}
            step={1000}
            onChange={setBasicSalary}
          />

          <CalculatorField
            label={t.yearsOfService}
            value={years}
            min={1}
            max={50}
            step={1}
            onChange={setYears}
          />

          {years < 5 && (
            <p className="text-xs text-red-600 -mt-2">
              Minimum 5 years required to be eligible for gratuity
            </p>
          )}

          <CalculatorField
            label={t.coveredFlag}
            value={coveredFlag}
            min={0}
            max={1}
            step={1}
            onChange={setCoveredFlag}
          />

          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-slate-500 underline hover:text-slate-700"
          >
            {t.resetDefaults}
          </button>
        </div>

        {/* VISUALS */}
        <div className="calc-visuals">
          <EMIPieChart
            principalPct={result.exemptPct}
            interestPct={result.taxablePct}
          />

          <div className="mt-6 text-center">
            <div className="text-xs text-slate-500">{t.totalGratuity}</div>
            <div className="text-2xl font-extrabold text-emerald-600">
              {formatINR(result.gratuity)}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {coveredFlag === 1
                ? '(Basic + DA) × 15 / 26 × Years'
                : '(Basic + DA) × 15 / 30 × Years'}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border bg-white p-3">
              <div className="text-xs text-slate-500">{t.exemptGratuity}</div>
              <div className="font-semibold text-emerald-600">
                {formatINR(result.exempt)}
              </div>
            </div>

            <div className="rounded-lg border bg-white p-3">
              <div className="text-xs text-slate-500">{t.taxableGratuity}</div>
              <div className="font-semibold text-red-600">
                {formatINR(result.taxable)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
