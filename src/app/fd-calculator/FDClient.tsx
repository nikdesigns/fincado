'use client';

import React, { useState, useMemo } from 'react';
import PieChart from '@/components/PieChart';

// --- Types ---
type CompoundingFreq = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';

const FREQUENCY_MAP: Record<CompoundingFreq, number> = {
  monthly: 12,
  quarterly: 4,
  'half-yearly': 2,
  yearly: 1,
};

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function FDClient() {
  // --- STATE ---
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(7.0);
  const [years, setYears] = useState<number>(3);
  const [months, setMonths] = useState<number>(0);
  const [frequency, setFrequency] = useState<CompoundingFreq>('quarterly');
  const [taxRate, setTaxRate] = useState<number>(10);
  const [showGrossOnly, setShowGrossOnly] = useState<boolean>(false);

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-action-cta) 0%, var(--color-action-cta) ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
  };

  // --- ACTIONS ---
  const handleReset = () => {
    setPrincipal(100000);
    setRate(7.0);
    setYears(3);
    setMonths(0);
    setFrequency('quarterly');
    setTaxRate(10);
    setShowGrossOnly(false);
  };

  // --- CALCULATION LOGIC ---
  const results = useMemo(() => {
    const timeInYears = years + months / 12;
    const n = FREQUENCY_MAP[frequency];
    const r = rate / 100;

    let maturityAmount = 0;
    if (rate === 0) {
      maturityAmount = principal;
    } else {
      maturityAmount = principal * Math.pow(1 + r / n, n * timeInYears);
    }

    const totalInterest = maturityAmount - principal;

    let taxDeducted = 0;
    if (!showGrossOnly && taxRate > 0) {
      taxDeducted = (totalInterest * taxRate) / 100;
    }

    const netInterest = totalInterest - taxDeducted;
    const finalMaturity = principal + netInterest;

    // Pie Chart Data: Principal vs Net Earnings
    const principalPct = Math.round((principal / finalMaturity) * 100);
    const interestPct = 100 - principalPct;

    return {
      maturity: Math.round(finalMaturity),
      interest: Math.round(netInterest),
      tax: Math.round(taxDeducted),
      principalPct,
      interestPct,
    };
  }, [principal, rate, years, months, frequency, taxRate, showGrossOnly]);

  // Safe Setter
  const numSetter =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* --- LEFT COLUMN: INPUTS --- */}
        <div className="calc-inputs">
          {/* Principal */}
          <div className="input-group">
            <label>Principal Amount (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={principal}
                onChange={numSetter(setPrincipal)}
              />
            </div>
            <input
              type="range"
              min="5000"
              max="10000000"
              step="5000"
              value={principal}
              onChange={numSetter(setPrincipal)}
              style={{
                background: getRangeBackground(principal, 5000, 10000000),
              }}
            />
          </div>

          {/* Interest Rate */}
          <div className="input-group">
            <label>Interest Rate (% p.a)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={rate}
                onChange={numSetter(setRate)}
                step="0.1"
              />
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="0.1"
              value={rate}
              onChange={numSetter(setRate)}
              style={{ background: getRangeBackground(rate, 2, 15) }}
            />
          </div>

          {/* Split Tenure (Years & Months) */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Years</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={years}
                  onChange={numSetter(setYears)}
                  min={0}
                />
              </div>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Months</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={months}
                  onChange={numSetter(setMonths)}
                  min={0}
                  max={11}
                />
              </div>
            </div>
          </div>

          {/* Compounding Frequency */}
          <div className="input-group">
            <label>Compounding Frequency</label>
            <div className="input-wrapper">
              <select
                value={frequency}
                onChange={(e) =>
                  setFrequency(e.target.value as CompoundingFreq)
                }
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                }}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly (Standard)</option>
                <option value="half-yearly">Half-Yearly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Tax Rate */}
          <div className="input-group">
            <label>Tax Rate (%)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={taxRate}
                onChange={numSetter(setTaxRate)}
                disabled={showGrossOnly}
                style={{ opacity: showGrossOnly ? 0.5 : 1 }}
              />
            </div>
          </div>

          {/* Checkbox & Reset */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={showGrossOnly}
                onChange={(e) => setShowGrossOnly(e.target.checked)}
              />
              Show Gross Interest
            </label>
            <button
              type="button"
              onClick={handleReset}
              style={{
                background: 'none',
                border: 'none',
                textDecoration: 'underline',
                color: '#666',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={results.principalPct}
            interestPct={results.interestPct}
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Maturity Amount
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(results.maturity)}
              </div>
            </div>

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
                  padding: 10,
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b', fontSize: 12 }}>Principal</div>
                <div style={{ fontWeight: 600 }}>{formatINR(principal)}</div>
              </div>
              <div
                style={{
                  padding: 10,
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b', fontSize: 12 }}>
                  {showGrossOnly ? 'Gross Int.' : 'Net Int.'}
                </div>
                <div
                  style={{ fontWeight: 600, color: 'var(--color-brand-green)' }}
                >
                  +{formatINR(results.interest)}
                </div>
              </div>
            </div>

            {/* Tax Hint */}
            {!showGrossOnly && results.tax > 0 && (
              <div
                style={{
                  marginTop: '12px',
                  fontSize: '12px',
                  color: '#991b1b',
                  background: '#fef2f2',
                  padding: '6px',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                Tax Deducted: -{formatINR(results.tax)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
