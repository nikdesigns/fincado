'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

// 1. Define Labels
interface LabelConfig {
  investment: string;
  rate: string;
  time: string;
  frequency: string;
  futureVal: string;
  invested: string;
  wealthGained: string;
}

interface LumpsumClientProps {
  labels?: LabelConfig;
}

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function LumpsumClient({ labels }: LumpsumClientProps) {
  // --- STATE ---
  const [principal, setPrincipal] = useState<number>(100000);
  const [annualRate, setAnnualRate] = useState<number>(12);
  const [timeYears, setTimeYears] = useState<number>(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(1);

  // 2. Default Labels
  const t = labels || {
    investment: 'Investment Amount (₹)',
    rate: 'Expected Return (% p.a)',
    time: 'Time Period (Years)',
    frequency: 'Compounding Frequency',
    futureVal: 'Estimated Future Value',
    invested: 'Invested Amount',
    wealthGained: 'Wealth Gained',
  };

  // --- HELPER ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS ---
  const futureValue = useMemo(() => {
    const n = compoundingFrequency;
    const t = timeYears;
    const periodicRate = annualRate / 100 / n;
    const totalPeriods = n * t;

    if (principal <= 0 || totalPeriods <= 0) return 0;
    const fv = principal * Math.pow(1 + periodicRate, totalPeriods);
    return Math.round(fv);
  }, [principal, annualRate, timeYears, compoundingFrequency]);

  const totalReturns = Math.max(0, futureValue - principal);

  const principalPct =
    futureValue > 0 ? Math.round((principal / futureValue) * 100) : 0;
  const interestPct = 100 - principalPct;

  const handleReset = () => {
    setPrincipal(100000);
    setAnnualRate(12);
    setTimeYears(10);
    setCompoundingFrequency(1);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numSetter = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        <div className="calc-inputs">
          <div className="input-group">
            <label>{t.investment}</label>
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

          <div className="input-group">
            <label>{t.rate}</label>
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

          <div className="input-group">
            <label>{t.time}</label>
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

          <div className="input-group">
            <label>{t.frequency}</label>
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

        <div className="calc-visuals">
          <PieChart
            principalPct={principalPct}
            interestPct={interestPct}
            size={200}
          />
          <div style={{ marginTop: 24, width: '100%' }}>
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.futureVal}
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
                  {t.invested}
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
                  {t.wealthGained}
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
