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

export default function SIPClient() {
  // --- STATE ---
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [rate, setRate] = useState(12); // Expected Annual Return
  const [years, setYears] = useState(10);
  const [lumpSum, setLumpSum] = useState(0); // Initial Investment
  const [inflation, setInflation] = useState(6); // Inflation Rate
  const [targetAmount, setTargetAmount] = useState(0); // For Goal Planning

  // --- HELPER: Background for Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Green theme for Wealth/SIP
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- LOGIC: Calculations ---
  const calculations = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    const monthlyInflation = inflation / 12 / 100;

    // 1. Future Value of SIP (Annuity Due)
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

    // 2. Future Value of Lump Sum
    const fvLump = lumpSum * Math.pow(1 + monthlyRate, months);

    // Total Maturity Value
    const futureValue = Math.round(fvSIP + fvLump);
    const totalInvested = Math.round(monthlySIP * months + lumpSum);
    const totalReturns = futureValue - totalInvested;

    // 3. Real Value (Inflation Adjusted)
    const realValue = Math.round(
      futureValue / Math.pow(1 + monthlyInflation, months)
    );

    // 4. Target Planner (Reverse Calc)
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

    // Chart Data
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
        {/* --- LEFT COLUMN: INPUTS --- */}
        <div className="calc-inputs">
          {/* Monthly SIP */}
          <div className="input-group">
            <label>Monthly Investment (₹)</label>
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

          {/* Expected Return */}
          <div className="input-group">
            <label>Expected Return (% p.a)</label>
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

          {/* Time Period */}
          <div className="input-group">
            <label>Time Period (Years)</label>
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

          {/* --- ADVANCED FIELDS (Native HTML Details/Summary for compatibility) --- */}
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
              Advanced Options (Lump Sum, Goal, Inflation)
            </summary>

            <div
              style={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {/* Initial Lump Sum */}
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

              {/* Inflation Rate */}
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

              {/* Target Amount */}
              <div className="input-group">
                <label>Target Goal Amount (₹)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={safeSet(setTargetAmount)}
                    placeholder="E.g. 10000000"
                  />
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* --- RIGHT COLUMN: VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={calculations.investedPct}
            interestPct={calculations.returnsPct}
            size={200}
          />

          {/* Inline Styles exactly matching EMIClient example */}
          <div style={{ marginTop: 24, width: '100%', textAlign: 'center' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Total Maturity Value
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)', // Green for SIP Wealth
                }}
              >
                {formatINR(calculations.futureValue)}
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
                <div style={{ color: '#64748b', fontSize: 12 }}>Invested</div>
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
                <div style={{ color: '#64748b', fontSize: 12 }}>Returns</div>
                <div
                  style={{ fontWeight: 600, color: 'var(--color-brand-green)' }}
                >
                  +{formatINR(calculations.totalReturns)}
                </div>
              </div>
            </div>

            {/* Inflation Badge */}
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

            {/* Goal Planner Result */}
            {targetAmount > 0 && (
              <div
                style={{
                  marginTop: 16,
                  padding: 12,
                  background: '#ecfdf5',
                  borderRadius: 8,
                  border: '1px solid #a7f3d0',
                }}
              >
                <div
                  style={{ fontSize: 12, color: '#047857', fontWeight: 600 }}
                >
                  Required SIP for Goal:
                </div>
                <div
                  style={{ fontSize: 20, fontWeight: 800, color: '#059669' }}
                >
                  {formatINR(calculations.requiredSIP)}
                  <span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
