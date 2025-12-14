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

export default function LumpsumClient() {
  // --- STATE ---
  const [principal, setPrincipal] = useState<number>(100000);
  const [annualRate, setAnnualRate] = useState<number>(12);
  const [timeYears, setTimeYears] = useState<number>(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(1); // Default 1 (Annual)

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Blue/Indigo theme for Lumpsum
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS ---
  const futureValue = useMemo(() => {
    const n = compoundingFrequency;
    const t = timeYears;
    const periodicRate = annualRate / 100 / n;
    const totalPeriods = n * t;

    if (principal <= 0 || totalPeriods <= 0) return 0;

    // Formula: P * (1 + r/n)^(nt)
    const fv = principal * Math.pow(1 + periodicRate, totalPeriods);
    return Math.round(fv);
  }, [principal, annualRate, timeYears, compoundingFrequency]);

  const totalReturns = Math.max(0, futureValue - principal);

  // Pie Chart Data
  const principalPct =
    futureValue > 0 ? Math.round((principal / futureValue) * 100) : 0;
  const interestPct = 100 - principalPct;

  // --- ACTIONS ---
  const handleReset = () => {
    setPrincipal(100000);
    setAnnualRate(12);
    setTimeYears(10);
    setCompoundingFrequency(1);
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
          {/* Principal */}
          <div className="input-group">
            <label>Investment Amount (₹)</label>
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

          {/* Rate */}
          <div className="input-group">
            <label>Expected Return (% p.a)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={annualRate}
                onChange={numSetter(setAnnualRate)}
                step="0.1"
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={annualRate}
              onChange={numSetter(setAnnualRate)}
              style={{ background: getRangeBackground(annualRate, 1, 30) }}
            />
          </div>

          {/* Tenure */}
          <div className="input-group">
            <label>Time Period (Years)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={timeYears}
                onChange={numSetter(setTimeYears)}
              />
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={timeYears}
              onChange={numSetter(setTimeYears)}
              style={{ background: getRangeBackground(timeYears, 1, 40) }}
            />
          </div>

          {/* Compounding Frequency */}
          <div className="input-group">
            <label>Compounding Frequency</label>
            <div className="input-wrapper">
              <select
                value={compoundingFrequency}
                onChange={(e) =>
                  setCompoundingFrequency(Number(e.target.value))
                }
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <option value={1}>Annually (Standard)</option>
                <option value={2}>Half-Yearly</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
              </select>
            </div>
          </div>

          {/* Reset Action */}
          <button
            type="button"
            onClick={handleReset}
            style={{
              marginTop: 10,
              background: 'none',
              border: 'none',
              textDecoration: 'underline',
              color: '#666',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Reset Defaults
          </button>
        </div>

        {/* --- RIGHT: VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={principalPct}
            interestPct={interestPct}
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Estimated Future Value
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(futureValue)}
              </div>
            </div>

            {/* Grid Breakdown */}
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
                <div style={{ color: '#64748b', fontSize: 12 }}>
                  Invested Amount
                </div>
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
                  Wealth Gained
                </div>
                <div style={{ fontWeight: 600, color: '#16a34a' }}>
                  +{formatINR(totalReturns)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
