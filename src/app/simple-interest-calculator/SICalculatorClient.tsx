'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

// 1. Define Labels
interface LabelConfig {
  principal: string;
  rate: string;
  time: string;
  maturityVal: string;
  resultPrincipal: string;
  resultInterest: string;
}

interface SIClientProps {
  labels?: LabelConfig;
}

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function SICalculatorClient({ labels }: SIClientProps) {
  const [principal, setPrincipal] = useState<number>(50000);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [timeYears, setTimeYears] = useState<number>(5);

  // 2. Default Labels
  const t = labels || {
    principal: 'Principal Amount (₹)',
    rate: 'Annual Interest Rate (%)',
    time: 'Time Period (Years)',
    maturityVal: 'Total Maturity Amount',
    resultPrincipal: 'Principal',
    resultInterest: 'Total Interest',
  };

  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  const results = useMemo(() => {
    const interestAmount = Math.round(
      (principal * annualRate * timeYears) / 100
    );
    const maturityAmount = principal + interestAmount;
    const totalFund = Math.max(1, maturityAmount);
    const interestPct = Math.round((interestAmount / totalFund) * 100);
    const principalPct = 100 - interestPct;

    return { interestAmount, maturityAmount, interestPct, principalPct };
  }, [principal, annualRate, timeYears]);

  const handleReset = () => {
    setPrincipal(50000);
    setAnnualRate(8);
    setTimeYears(5);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numSetter = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        <div className="calc-inputs">
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
              max="1000000"
              step="1000"
              value={principal}
              onChange={numSetter(setPrincipal)}
              style={{
                background: getRangeBackground(principal, 1000, 1000000),
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
              max="50"
              step="0.1"
              value={annualRate}
              onChange={numSetter(setAnnualRate)}
              style={{ background: getRangeBackground(annualRate, 1, 50) }}
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
              max="30"
              step="1"
              value={timeYears}
              onChange={numSetter(setTimeYears)}
              style={{ background: getRangeBackground(timeYears, 1, 30) }}
            />
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
            principalPct={results.principalPct}
            interestPct={results.interestPct}
            size={200}
          />
          <div style={{ marginTop: 24, width: '100%' }}>
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.maturityVal}
              </span>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a' }}>
                {formatINR(results.maturityAmount)}
              </div>
            </div>
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
                <div style={{ color: '#64748b' }}>{t.resultPrincipal}</div>
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
                <div style={{ color: '#64748b' }}>{t.resultInterest}</div>
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
