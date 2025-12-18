'use client';

import React, { useState, useMemo } from 'react';
import PieChart from '@/components/PieChart';

type CompoundingFreq = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
const FREQUENCY_MAP: Record<CompoundingFreq, number> = {
  monthly: 12,
  quarterly: 4,
  'half-yearly': 2,
  yearly: 1,
};

interface LabelConfig {
  principal: string;
  rate: string;
  years: string;
  months: string;
  freq: string;
  maturity: string;
  totalPrincipal: string;
  interest: string;
}

interface FDClientProps {
  labels?: LabelConfig;
}

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function FDClient({ labels }: FDClientProps) {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.0);
  const [years, setYears] = useState(3);
  const [months, setMonths] = useState(0);
  const [frequency, setFrequency] = useState<CompoundingFreq>('quarterly');
  const [showGrossOnly, setShowGrossOnly] = useState(false);

  // Default English Labels
  const t = labels || {
    principal: 'Principal Amount (₹)',
    rate: 'Interest Rate (% p.a)',
    years: 'Years',
    months: 'Months',
    freq: 'Compounding Frequency',
    maturity: 'Maturity Amount',
    totalPrincipal: 'Principal',
    interest: 'Total Interest',
  };

  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  const results = useMemo(() => {
    const timeInYears = years + months / 12;
    const n = FREQUENCY_MAP[frequency];
    const r = rate / 100;
    let maturityAmount = 0;
    if (rate === 0) maturityAmount = principal;
    else maturityAmount = principal * Math.pow(1 + r / n, n * timeInYears);

    const totalInterest = maturityAmount - principal;
    const finalMaturity = principal + totalInterest;
    const principalPct = Math.round((principal / finalMaturity) * 100);
    const interestPct = 100 - principalPct;

    return {
      maturity: Math.round(finalMaturity),
      interest: Math.round(totalInterest),
      principalPct,
      interestPct,
    };
  }, [principal, rate, years, months, frequency]);

  const numSetter =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
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

          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>{t.years}</label>
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
              <label>{t.months}</label>
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

          <div className="input-group">
            <label>{t.freq}</label>
            <div className="input-wrapper">
              <select
                value={frequency}
                onChange={(e) =>
                  setFrequency(e.target.value as CompoundingFreq)
                }
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                }}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half-yearly">Half-Yearly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
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
                {t.maturity}
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
                <div style={{ color: '#64748b', fontSize: 12 }}>
                  {t.totalPrincipal}
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
                  {t.interest}
                </div>
                <div
                  style={{ fontWeight: 600, color: 'var(--color-brand-green)' }}
                >
                  +{formatINR(results.interest)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
