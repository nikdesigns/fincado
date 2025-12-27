'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

// --- TYPES ---
type AssessmentYear = '2025-2026' | '2024-2025';
type AgeGroup = '0-60' | '60-80' | '80+';

// 1. Define Labels Interface
interface LabelConfig {
  ayLabel: string;
  ageLabel: string;
  incomeLabel: string;
  deductionsLabel: string;
  deductionHint: string;
  recommendationLabel: string;
  saveLabel: string;
  oldRegimeLabel: string;
  newRegimeLabel: string;
  netIncomeLabel: string;
  ageOptions: {
    regular: string;
    senior: string;
    superSenior: string;
  };
}

interface IncomeTaxClientProps {
  labels?: LabelConfig;
}

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function IncomeTaxClient({ labels }: IncomeTaxClientProps) {
  // --- STATE ---
  const [ay, setAy] = useState<AssessmentYear>('2025-2026');
  const [age, setAge] = useState<AgeGroup>('0-60');
  const [income, setIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000);

  // 2. Default English Labels (Memoized to prevent re-renders)
  const t = useMemo(
    () =>
      labels || {
        ayLabel: 'Assessment Year (AY)',
        ageLabel: 'Age Category',
        incomeLabel: 'Gross Annual Income (₹)',
        deductionsLabel: 'Total Deductions (80C, 80D, etc.)',
        deductionHint: '*Deductions are only applicable for Old Regime.',
        recommendationLabel: 'RECOMMENDATION',
        saveLabel: 'Save',
        oldRegimeLabel: 'OLD REGIME TAX',
        newRegimeLabel: 'NEW REGIME TAX',
        netIncomeLabel: 'Net In-Hand Income',
        ageOptions: {
          regular: 'Below 60 (Regular)',
          senior: '60 - 80 (Senior)',
          superSenior: 'Above 80 (Super Senior)',
        },
      },
    [labels]
  );

  // --- HELPER: RANGE BACKGROUND ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- TAX LOGIC ---
  const calculations = useMemo(() => {
    const stdDedOld = 50000;
    const stdDedNew = ay === '2025-2026' ? 75000 : 50000;

    // --- OLD REGIME ---
    const taxableIncomeOld = Math.max(0, income - stdDedOld - deductions);
    let taxOld = 0;

    let slab1 = 250000;
    const slab2 = 500000;
    const slab3 = 1000000;

    if (age === '60-80') slab1 = 300000;
    if (age === '80+') slab1 = 500000;

    if (taxableIncomeOld > slab1) {
      if (taxableIncomeOld <= slab2) {
        taxOld += (taxableIncomeOld - slab1) * 0.05;
      } else {
        taxOld += (slab2 - slab1) * 0.05;
        if (taxableIncomeOld <= slab3) {
          taxOld += (taxableIncomeOld - slab2) * 0.2;
        } else {
          taxOld += (slab3 - slab2) * 0.2;
          taxOld += (taxableIncomeOld - slab3) * 0.3;
        }
      }
    }
    if (taxableIncomeOld <= 500000) taxOld = 0;

    // --- NEW REGIME ---
    const taxableIncomeNew = Math.max(0, income - stdDedNew);
    let taxNew = 0;

    if (ay === '2025-2026') {
      if (taxableIncomeNew > 300000) {
        taxNew +=
          Math.max(0, Math.min(taxableIncomeNew, 700000) - 300000) * 0.05;
        taxNew +=
          Math.max(0, Math.min(taxableIncomeNew, 1000000) - 700000) * 0.1;
        taxNew +=
          Math.max(0, Math.min(taxableIncomeNew, 1200000) - 1000000) * 0.15;
        taxNew +=
          Math.max(0, Math.min(taxableIncomeNew, 1500000) - 1200000) * 0.2;
        taxNew += Math.max(0, taxableIncomeNew - 1500000) * 0.3;
      }
      if (taxableIncomeNew <= 700000) taxNew = 0;
    } else {
      if (taxableIncomeNew > 300000) {
        taxNew +=
          Math.max(0, Math.min(taxableIncomeNew, 600000) - 300000) * 0.05;
        taxNew +=
          Math.max(0, Math.min(taxableIncomeNew, 900000) - 600000) * 0.1;
        taxNew +=
          Math.max(0, Math.min(taxableIncomeNew, 1200000) - 900000) * 0.15;
        taxNew +=
          Math.max(0, Math.min(taxableIncomeNew, 1500000) - 1200000) * 0.2;
        taxNew += Math.max(0, taxableIncomeNew - 1500000) * 0.3;
      }
      if (taxableIncomeNew <= 700000) taxNew = 0;
    }

    const totalTaxOld = Math.round(taxOld * 1.04);
    const totalTaxNew = Math.round(taxNew * 1.04);

    const savings = Math.abs(totalTaxOld - totalTaxNew);
    const isNewBetter = totalTaxNew <= totalTaxOld;

    // Use t.newRegimeLabel/oldRegimeLabel but strip " TAX" for the cleaner recommendation text
    const recommendation = isNewBetter
      ? labels
        ? t.newRegimeLabel.replace(' TAX', '')
        : 'New Regime'
      : labels
      ? t.oldRegimeLabel.replace(' TAX', '')
      : 'Old Regime';

    const activeTax = isNewBetter ? totalTaxNew : totalTaxOld;
    const netIncome = income - activeTax;
    const taxPct = Math.round((activeTax / income) * 100) || 0;
    const incomePct = 100 - taxPct;

    return {
      taxOld: totalTaxOld,
      taxNew: totalTaxNew,
      savings,
      recommendation,
      activeTax,
      netIncome,
      taxPct,
      incomePct,
      isNewBetter,
    };
  }, [ay, age, income, deductions, labels, t]);

  // Safe Setter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeSet = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* --- INPUTS --- */}
        <div className="calc-inputs">
          <div className="input-group">
            <label>{t.ayLabel}</label>
            <div className="input-wrapper">
              <select
                value={ay}
                onChange={(e) => setAy(e.target.value as AssessmentYear)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>{t.ageLabel}</label>
            <div className="input-wrapper">
              <select
                value={age}
                onChange={(e) => setAge(e.target.value as AgeGroup)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <option value="0-60">{t.ageOptions.regular}</option>
                <option value="60-80">{t.ageOptions.senior}</option>
                <option value="80+">{t.ageOptions.superSenior}</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>{t.incomeLabel}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={income}
                onChange={safeSet(setIncome)}
              />
            </div>
            <input
              type="range"
              min="300000"
              max="5000000"
              step="50000"
              value={income}
              onChange={safeSet(setIncome)}
              style={{
                background: getRangeBackground(income, 300000, 5000000),
              }}
            />
          </div>

          <div className="input-group">
            <label>{t.deductionsLabel}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={deductions}
                onChange={safeSet(setDeductions)}
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={deductions}
              onChange={safeSet(setDeductions)}
              style={{ background: getRangeBackground(deductions, 0, 1000000) }}
            />
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
              {t.deductionHint}
            </p>
          </div>
        </div>

        {/* --- VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={calculations.incomePct}
            interestPct={calculations.taxPct}
            size={180}
            centerLabel="Tax"
          />

          <div style={{ marginTop: 24, width: '100%', textAlign: 'center' }}>
            {/* Recommendation */}
            <div
              style={{
                background: '#f0fdf4',
                border: '1px dashed #bbf7d0',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
              }}
            >
              <span
                style={{ fontSize: '13px', color: '#166534', fontWeight: 600 }}
              >
                {t.recommendationLabel}
              </span>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                  marginTop: '4px',
                }}
              >
                {calculations.recommendation}
              </div>
              <div
                style={{ fontSize: '13px', color: '#166534', marginTop: '4px' }}
              >
                {t.saveLabel} <strong>{formatINR(calculations.savings)}</strong>
              </div>
            </div>

            {/* Comparison */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                fontSize: 14,
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  padding: 12,
                  background: !calculations.isNewBetter ? '#ecfccb' : '#fff',
                  borderRadius: 8,
                  border: !calculations.isNewBetter
                    ? '1px solid #84cc16'
                    : '1px solid #e2e8f0',
                }}
              >
                <div
                  style={{
                    color: '#64748b',
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {t.oldRegimeLabel}
                </div>
                <div style={{ fontWeight: 700, fontSize: '16px' }}>
                  {formatINR(calculations.taxOld)}
                </div>
              </div>

              <div
                style={{
                  padding: 12,
                  background: calculations.isNewBetter ? '#ecfccb' : '#fff',
                  borderRadius: 8,
                  border: calculations.isNewBetter
                    ? '1px solid #84cc16'
                    : '1px solid #e2e8f0',
                }}
              >
                <div
                  style={{
                    color: '#64748b',
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {t.newRegimeLabel}
                </div>
                <div style={{ fontWeight: 700, fontSize: '16px' }}>
                  {formatINR(calculations.taxNew)}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, fontSize: 12, color: '#64748b' }}>
              {t.netIncomeLabel}:{' '}
              <strong>{formatINR(calculations.netIncome)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
