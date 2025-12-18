'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

// 1. Define Label Interface
interface LabelConfig {
  monthlyInv: string;
  rate: string;
  timePeriod: string;
  maturityValue: string;
  invested: string;
  returns: string;
}

interface SIPClientProps {
  labels?: LabelConfig;
}

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function SIPClient({ labels }: SIPClientProps) {
  // --- STATE ---
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [lumpSum, setLumpSum] = useState(0);
  const [inflation, setInflation] = useState(6);
  const [targetAmount, setTargetAmount] = useState(0);

  // 2. Default Labels (English)
  const t = labels || {
    monthlyInv: 'Monthly Investment (₹)',
    rate: 'Expected Return (% p.a)',
    timePeriod: 'Time Period (Years)',
    maturityValue: 'Total Maturity Value',
    invested: 'Invested',
    returns: 'Returns',
  };

  // --- HELPER ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- LOGIC ---
  const calculations = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    const monthlyInflation = inflation / 12 / 100;

    let fvSIP = 0;
    if (monthlySIP > 0) {
      if (rate === 0) {
        fvSIP = monthlySIP * months;
      } else {
        fvSIP =
          monthlySIP *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);
      }
    }

    const fvLump = lumpSum * Math.pow(1 + monthlyRate, months);
    const futureValue = Math.round(fvSIP + fvLump);
    const totalInvested = Math.round(monthlySIP * months + lumpSum);
    const totalReturns = futureValue - totalInvested;

    const realValue = Math.round(
      futureValue / Math.pow(1 + monthlyInflation, months)
    );

    let requiredSIP = 0;
    if (targetAmount > 0) {
      const lumpSumGrowth = lumpSum * Math.pow(1 + monthlyRate, months);
      const shortfall = Math.max(0, targetAmount - lumpSumGrowth);

      if (shortfall > 0) {
        const annuityFactor =
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);
        requiredSIP = Math.ceil(shortfall / annuityFactor);
      }
    }

    const investedPct =
      futureValue > 0 ? Math.round((totalInvested / futureValue) * 100) : 0;
    const returnsPct = 100 - investedPct;

    return {
      futureValue,
      totalInvested,
      totalReturns,
      realValue,
      requiredSIP,
      investedPct,
      returnsPct,
    };
  }, [monthlySIP, rate, years, lumpSum, inflation, targetAmount]);

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
            <label>{t.monthlyInv}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={monthlySIP}
                onChange={safeSet(setMonthlySIP)}
              />
            </div>
            <input
              type="range"
              min="500"
              max="200000"
              step="500"
              value={monthlySIP}
              onChange={safeSet(setMonthlySIP)}
              style={{
                background: getRangeBackground(monthlySIP, 500, 200000),
              }}
            />
          </div>

          <div className="input-group">
            <label>{t.rate}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={rate}
                onChange={safeSet(setRate)}
                step="0.1"
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={rate}
              onChange={safeSet(setRate)}
              style={{ background: getRangeBackground(rate, 1, 30) }}
            />
          </div>

          <div className="input-group">
            <label>{t.timePeriod}</label>
            <div className="input-wrapper">
              <input type="number" value={years} onChange={safeSet(setYears)} />
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={safeSet(setYears)}
              style={{ background: getRangeBackground(years, 1, 40) }}
            />
          </div>

          {/* Details for Advanced (Keep in English or pass extra props if needed) */}
          <details
            style={{
              marginTop: 16,
              borderTop: '1px solid #eee',
              paddingTop: 12,
            }}
          >
            <summary
              style={{
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              Advanced Options (Lump Sum, Goal)
            </summary>
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div className="input-group">
                <label>Initial Lump Sum (₹)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    value={lumpSum}
                    onChange={safeSet(setLumpSum)}
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Inflation Rate (%)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    value={inflation}
                    onChange={safeSet(setInflation)}
                    step="0.1"
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Target Goal Amount (₹)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={safeSet(setTargetAmount)}
                  />
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* --- VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={calculations.investedPct}
            interestPct={calculations.returnsPct}
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%', textAlign: 'center' }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.maturityValue}
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(calculations.futureValue)}
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
                <div style={{ fontWeight: 600 }}>
                  {formatINR(calculations.totalInvested)}
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
                <div style={{ color: '#64748b', fontSize: 12 }}>
                  {t.returns}
                </div>
                <div
                  style={{ fontWeight: 600, color: 'var(--color-brand-green)' }}
                >
                  +{formatINR(calculations.totalReturns)}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                fontSize: 12,
                color: '#64748b',
                background: '#e2e8f0',
                padding: '4px 8px',
                borderRadius: 4,
                display: 'inline-block',
              }}
            >
              Real Value (~{inflation}% inflation):{' '}
              <strong>{formatINR(calculations.realValue)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
