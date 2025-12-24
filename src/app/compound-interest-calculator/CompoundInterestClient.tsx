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
interface CompoundLabels {
  principal: string;
  rate: string;
  timePeriod: string;
  frequency: string;
  resetDefaults: string;
  totalAmount: string;
  interestEarned: string;
  investedAmount: string;
  yearly: string;
  halfYearly: string;
  quarterly: string;
  monthly: string;
  breakdown: string;
}

const DEFAULT_LABELS: CompoundLabels = {
  principal: 'Principal Amount (₹)',
  rate: 'Annual Interest Rate (%)',
  timePeriod: 'Time Period (Years)',
  frequency: 'Compounding Frequency',
  resetDefaults: 'Reset Defaults',
  totalAmount: 'Maturity Amount',
  interestEarned: 'Total Interest',
  investedAmount: 'Invested Amount',
  yearly: 'Yearly',
  halfYearly: 'Half-Yearly',
  quarterly: 'Quarterly',
  monthly: 'Monthly',
  breakdown: 'Growth Breakdown',
};

export default function CompoundInterestClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<CompoundLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  // --- STATE ---
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(10);
  const [years, setYears] = useState<number>(10);
  const [frequency, setFrequency] = useState<number>(1); // 1 = Yearly, 12 = Monthly

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    // Formula: A = P(1 + r/n)^(nt)
    // r = rate/100, n = frequency, t = years
    const r = rate / 100;
    const n = frequency;
    const t = years;

    const amount = principal * Math.pow(1 + r / n, n * t);
    const totalInterest = amount - principal;

    // Pie Chart Data
    const principalPct =
      amount > 0 ? Math.round((principal / amount) * 100) : 100;
    const interestPct = 100 - principalPct;

    return {
      totalAmount: Math.round(amount),
      totalInterest: Math.round(totalInterest),
      principalPct,
      interestPct,
    };
  }, [principal, rate, years, frequency]);

  // --- ACTIONS ---
  const handleReset = () => {
    setPrincipal(100000);
    setRate(10);
    setYears(10);
    setFrequency(1);
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
            <label>{t.principal}</label>
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
              max="10000000"
              step="1000"
              value={principal}
              onChange={numSetter(setPrincipal)}
              style={{
                background: getRangeBackground(principal, 1000, 10000000),
              }}
            />
          </div>

          {/* 2. Rate */}
          <div className="input-group">
            <label>{t.rate}</label>
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
              min="1"
              max="30"
              step="0.1"
              value={rate}
              onChange={numSetter(setRate)}
              style={{
                background: getRangeBackground(rate, 1, 30),
              }}
            />
          </div>

          {/* 3. Time */}
          <div className="input-group">
            <label>{t.timePeriod}</label>
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
          </div>

          {/* 4. Frequency Dropdown */}
          <div className="input-group">
            <label>{t.frequency}</label>
            <div className="input-wrapper">
              <select
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1e293b',
                }}
              >
                <option value={1}>{t.yearly}</option>
                <option value={2}>{t.halfYearly}</option>
                <option value={4}>{t.quarterly}</option>
                <option value={12}>{t.monthly}</option>
              </select>
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
            principalPct={results.principalPct}
            interestPct={results.interestPct}
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.totalAmount}
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(results.totalAmount)}
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
                <div style={{ color: '#64748b' }}>{t.investedAmount}</div>
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
                <div style={{ color: '#64748b' }}>{t.interestEarned}</div>
                <div style={{ fontWeight: 600, color: '#16a34a' }}>
                  +{formatINR(results.totalInterest)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
