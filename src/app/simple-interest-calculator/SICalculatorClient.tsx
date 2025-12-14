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

export default function SICalculatorClient() {
  // --- STATE ---
  const [principal, setPrincipal] = useState<number>(50000);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [timeYears, setTimeYears] = useState<number>(5);

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Green theme for Basic Money tools
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    // Formula: I = (P * R * T) / 100
    const interestAmount = Math.round(
      (principal * annualRate * timeYears) / 100
    );
    const maturityAmount = principal + interestAmount;

    // Pie Chart Data
    const totalFund = Math.max(1, maturityAmount);
    const interestPct = Math.round((interestAmount / totalFund) * 100);
    const principalPct = 100 - interestPct;

    return {
      interestAmount,
      maturityAmount,
      interestPct,
      principalPct,
    };
  }, [principal, annualRate, timeYears]);

  // --- ACTIONS ---
  const handleReset = () => {
    setPrincipal(50000);
    setAnnualRate(8);
    setTimeYears(5);
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
          {/* 1. Principal */}
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
              min="1000"
              max="1000000"
              step="1000"
              value={principal}
              onChange={numSetter(setPrincipal)}
              style={{
                background: getRangeBackground(principal, 1000, 1000000),
              }}
            />
          </div>

          {/* 2. Rate */}
          <div className="input-group">
            <label>Annual Interest Rate (%)</label>
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
              max="50"
              step="0.1"
              value={annualRate}
              onChange={numSetter(setAnnualRate)}
              style={{ background: getRangeBackground(annualRate, 1, 50) }}
            />
          </div>

          {/* 3. Time */}
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
              max="30"
              step="1"
              value={timeYears}
              onChange={numSetter(setTimeYears)}
              style={{ background: getRangeBackground(timeYears, 1, 30) }}
            />
          </div>

          {/* Reset */}
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
            principalPct={results.principalPct}
            interestPct={results.interestPct}
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result: Total Amount */}
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Total Maturity Amount
              </span>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a' }}>
                {formatINR(results.maturityAmount)}
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
                  padding: 8,
                  background: '#fff',
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b' }}>Principal</div>
                <div style={{ fontWeight: 600 }}>{formatINR(principal)}</div>
              </div>
              <div
                style={{
                  padding: 8,
                  background: '#fff',
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b' }}>Total Interest</div>
                <div style={{ fontWeight: 600, color: '#16a34a' }}>
                  +{formatINR(results.interestAmount)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
