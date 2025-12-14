'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

// Helper: Format Currency (₹ 1,00,000)
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function InflationClient() {
  // --- STATE ---
  const [amount, setAmount] = useState(100000); // ₹1 Lakh
  const [rate, setRate] = useState(6); // Avg India inflation
  const [years, setYears] = useState(10);

  // --- HELPER: Green Fill Background ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(
      to right,
      var(--color-action-cta) 0%,
      var(--color-action-cta) ${percentage}%,
      #e2e8f0 ${percentage}%,
      #e2e8f0 100%
    )`;
  };

  // --- LOGIC ---
  const calculations = useMemo(() => {
    const futureValue = amount * Math.pow(1 + rate / 100, years);
    const inflationLoss = futureValue - amount;

    const lossPct =
      futureValue > 0 ? Math.round((inflationLoss / futureValue) * 100) : 0;

    const purchasingPct = 100 - lossPct;

    return {
      futureValue: Math.round(futureValue),
      inflationLoss: Math.round(inflationLoss),
      lossPct,
      purchasingPct,
    };
  }, [amount, rate, years]);

  // --- SAFE SETTER ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeSet = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      {/* GRID */}
      <div className="calc-grid">
        {/* INPUTS */}
        <div
          className="calc-inputs"
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          {/* Current Amount */}
          <div className="input-group">
            <label>Current Amount (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={amount}
                onChange={safeSet(setAmount)}
              />
            </div>
            <input
              type="range"
              min="1000"
              max="10000000"
              step="5000"
              value={amount}
              onChange={safeSet(setAmount)}
              style={{
                background: getRangeBackground(amount, 1000, 10000000),
              }}
            />
          </div>

          {/* Inflation Rate */}
          <div className="input-group">
            <label>Inflation Rate (% p.a)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={rate}
                step="0.1"
                onChange={safeSet(setRate)}
              />
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={rate}
              onChange={safeSet(setRate)}
              style={{
                background: getRangeBackground(rate, 1, 15),
              }}
            />
          </div>

          {/* Years */}
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
              style={{
                background: getRangeBackground(years, 1, 40),
              }}
            />
          </div>
        </div>

        {/* CHART & RESULTS */}
        <div className="calc-visuals">
          <PieChart
            principalPct={calculations.purchasingPct}
            interestPct={calculations.lossPct}
            size={200}
          />

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Future Value Required
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
                  Today&apos;s Value
                </div>
                <div style={{ fontWeight: 600 }}>{formatINR(amount)}</div>
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
                  Inflation Impact
                </div>
                <div style={{ fontWeight: 600, color: '#dc2626' }}>
                  {formatINR(calculations.inflationLoss)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
