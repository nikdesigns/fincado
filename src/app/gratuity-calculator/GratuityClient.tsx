'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

// ✅ Interface for custom labels
interface GratuityLabels {
  basicSalary: string;
  yearsOfService: string;
  isCovered: string;
  coveredOption: string;
  notCoveredOption: string;
  resetDefaults: string;
  totalGratuity: string;
  exemptGratuity: string;
  taxableGratuity: string;
  formulaNote: string;
}

const DEFAULT_LABELS: GratuityLabels = {
  basicSalary: 'Monthly Basic Salary + DA (₹)',
  yearsOfService: 'Years of Service',
  isCovered: 'Covered under Gratuity Act?',
  coveredOption: 'Yes',
  notCoveredOption: 'No',
  resetDefaults: 'Reset Defaults',
  totalGratuity: 'Total Gratuity Payable',
  exemptGratuity: 'Tax Exempt Amount',
  taxableGratuity: 'Taxable Amount',
  formulaNote: 'Formula: (Basic + DA) × 15/26 × Years',
};

export default function GratuityClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<GratuityLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  // --- STATE ---
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [years, setYears] = useState<number>(5);
  const [isCovered, setIsCovered] = useState<boolean>(true);

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    let gratuityAmount = 0;

    if (years >= 5) {
      if (isCovered) {
        // Formula: (Last Drawn Salary * 15 / 26) * Years
        gratuityAmount = Math.round((basicSalary * 15 * years) / 26);
      } else {
        // Formula: (Last Drawn Salary * 15 / 30) * Years
        gratuityAmount = Math.round((basicSalary * 15 * years) / 30);
      }
    } else {
      gratuityAmount = 0; // Not eligible if < 5 years
    }

    // Tax Exemption Limit (₹20 Lakhs)
    const MAX_EXEMPTION = 2000000;
    const exemptAmount = Math.min(gratuityAmount, MAX_EXEMPTION);
    const taxableAmount = Math.max(0, gratuityAmount - MAX_EXEMPTION);

    // Pie Data (Exempt vs Taxable)
    const exemptPct =
      gratuityAmount > 0
        ? Math.round((exemptAmount / gratuityAmount) * 100)
        : 100;
    const taxablePct = 100 - exemptPct;

    return {
      gratuityAmount,
      exemptAmount,
      taxableAmount,
      exemptPct,
      taxablePct,
    };
  }, [basicSalary, years, isCovered]);

  // --- ACTIONS ---
  const handleReset = () => {
    setBasicSalary(50000);
    setYears(5);
    setIsCovered(true);
  };

  // Safe Setter
  const numSetter =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* --- LEFT: INPUTS --- */}
        <div className="calc-inputs">
          {/* 1. Basic Salary */}
          <div className="input-group">
            <label>{t.basicSalary}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={basicSalary}
                onChange={numSetter(setBasicSalary)}
              />
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="1000"
              value={basicSalary}
              onChange={numSetter(setBasicSalary)}
              style={{
                background: getRangeBackground(basicSalary, 10000, 500000),
              }}
            />
          </div>

          {/* 2. Years of Service */}
          <div className="input-group">
            <label>{t.yearsOfService}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={years}
                onChange={numSetter(setYears)}
              />
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={years}
              onChange={numSetter(setYears)}
              style={{
                background: getRangeBackground(years, 1, 50),
              }}
            />
            {years < 5 && (
              <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>
                *Minimum 5 years required for eligibility.
              </p>
            )}
          </div>

          {/* 3. Covered Status Toggle */}
          <div className="input-group">
            <label>{t.isCovered}</label>
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  checked={isCovered}
                  onChange={() => setIsCovered(true)}
                />
                {t.coveredOption}
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  checked={!isCovered}
                  onChange={() => setIsCovered(false)}
                />
                {t.notCoveredOption}
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            style={{
              marginTop: 16,
              background: 'none',
              border: 'none',
              textDecoration: 'underline',
              color: '#666',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            {t.resetDefaults}
          </button>
        </div>

        {/* --- RIGHT: VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={results.exemptPct} // Green: Exempt
            interestPct={results.taxablePct} // Red: Taxable
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.totalGratuity}
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(results.gratuityAmount)}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                {isCovered
                  ? '(Basic + DA) × 15/26 × Years'
                  : '(Basic + DA) × 15/30 × Years'}
              </div>
            </div>

            {/* Grid Breakdown */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                fontSize: 13,
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  padding: 10,
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b' }}>{t.exemptGratuity}</div>
                <div style={{ fontWeight: 600, color: '#16a34a' }}>
                  {formatINR(results.exemptAmount)}
                </div>
              </div>
              <div
                style={{
                  padding: 10,
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b' }}>{t.taxableGratuity}</div>
                <div style={{ fontWeight: 600, color: '#dc2626' }}>
                  {formatINR(results.taxableAmount)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
