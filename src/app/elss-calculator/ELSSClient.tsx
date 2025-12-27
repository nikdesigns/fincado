'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

// 1. Label Interface
interface LabelConfig {
  monthlyInv: string;
  rate: string;
  timePeriod: string;
  maturityValue: string;
  invested: string;
  returns: string;
  taxSaved: string;
}

interface ELSSClientProps {
  labels?: LabelConfig;
}

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function ELSSClient({ labels }: ELSSClientProps) {
  // --- STATE ---
  const [monthlySIP, setMonthlySIP] = useState(12500); // 1.5L / 12 ~ 12500
  const [rate, setRate] = useState(14); // ELSS usually has higher alpha
  const [years, setYears] = useState(3); // Min lock-in is 3 years

  // 2. Default Labels
  const t = labels || {
    monthlyInv: 'Monthly Investment (₹)',
    rate: 'Expected Return (% p.a)',
    timePeriod: 'Time Period (Years)',
    maturityValue: 'Total Maturity Value',
    invested: 'Invested Amount',
    returns: 'Wealth Gain',
    taxSaved: 'Tax Saved (Max)',
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

    // SIP Future Value Formula
    let futureValue = 0;
    if (monthlySIP > 0) {
      if (rate === 0) {
        futureValue = monthlySIP * months;
      } else {
        futureValue =
          monthlySIP *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);
      }
    }

    const totalInvested = monthlySIP * months;
    const totalReturns = futureValue - totalInvested;

    // Tax Saving Logic (80C Limit: 1.5L)
    const annualInvestment = monthlySIP * 12;
    const eligibleAmount = Math.min(annualInvestment, 150000);
    // Assuming 30% slab + 4% cess = 31.2% savings
    const yearlyTaxSaved = Math.round(eligibleAmount * 0.312);
    const totalTaxSaved = yearlyTaxSaved * years;

    const investedPct =
      futureValue > 0 ? Math.round((totalInvested / futureValue) * 100) : 0;
    const returnsPct = 100 - investedPct;

    return {
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      totalReturns: Math.round(totalReturns),
      yearlyTaxSaved,
      totalTaxSaved,
      investedPct,
      returnsPct,
    };
  }, [monthlySIP, rate, years]);

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
              max="50000"
              step="500"
              value={monthlySIP}
              onChange={safeSet(setMonthlySIP)}
              style={{
                background: getRangeBackground(monthlySIP, 500, 50000),
              }}
            />
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
              💡 Invest ₹12,500/mo to fully utilize ₹1.5L limit.
            </p>
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
              min="8"
              max="25"
              step="0.1"
              value={rate}
              onChange={safeSet(setRate)}
              style={{ background: getRangeBackground(rate, 8, 25) }}
            />
          </div>

          <div className="input-group">
            <label>{t.timePeriod}</label>
            <div className="input-wrapper">
              <input type="number" value={years} onChange={safeSet(setYears)} />
            </div>
            <input
              type="range"
              min="3"
              max="30"
              step="1"
              value={years}
              onChange={safeSet(setYears)}
              style={{ background: getRangeBackground(years, 3, 30) }}
            />
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
              🔒 Minimum lock-in period for ELSS is 3 years.
            </p>
          </div>
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

            {/* Tax Saved Badge */}
            <div
              style={{
                background: '#f0fdf4',
                border: '1px dashed #bbf7d0',
                borderRadius: '8px',
                padding: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                color: '#166534',
              }}
            >
              🎉 You save approx{' '}
              <strong>{formatINR(calculations.yearlyTaxSaved)}</strong> in taxes
              every year!
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
          </div>
        </div>
      </div>
    </div>
  );
}
