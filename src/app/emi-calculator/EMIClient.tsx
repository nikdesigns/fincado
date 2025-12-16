/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import PieChart from '@/components/PieChart';

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function EMIClient() {
  // --- STATE ---
  const [amount, setAmount] = useState(5000000); // 50 Lakhs
  const [rate, setRate] = useState(8.5); // Interest Rate %
  const [tenure, setTenure] = useState(20); // Years

  // --- HELPER: Background for Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- LOGIC: Calculations ---
  const calculations = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;

    let emi = 0;
    if (r === 0) {
      emi = amount / n;
    } else {
      emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - amount;

    // Chart Data
    const principalPct = Math.round((amount / totalPayment) * 100);
    const interestPct = 100 - principalPct;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principalPct,
      interestPct,
    };
  }, [amount, rate, tenure]);

  // Safe Setter
  const safeSet = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* --- LEFT COLUMN: INPUTS --- */}
        <div className="calc-inputs">
          {/* Loan Amount */}
          <div className="input-group">
            <label>Loan Amount (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={amount}
                onChange={safeSet(setAmount)}
              />
            </div>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="50000"
              value={amount}
              onChange={safeSet(setAmount)}
              style={{
                background: getRangeBackground(amount, 100000, 10000000),
              }}
            />
          </div>

          {/* Interest Rate */}
          <div className="input-group">
            <label>Interest Rate (% p.a)</label>
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
              max="20"
              step="0.1"
              value={rate}
              onChange={safeSet(setRate)}
              style={{ background: getRangeBackground(rate, 1, 20) }}
            />
          </div>

          {/* Tenure */}
          <div className="input-group">
            <label>Loan Tenure (Years)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={tenure}
                onChange={safeSet(setTenure)}
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenure}
              onChange={safeSet(setTenure)}
              style={{ background: getRangeBackground(tenure, 1, 30) }}
            />
          </div>
        </div>

        {/* --- RIGHT COLUMN: VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={calculations.principalPct}
            interestPct={calculations.interestPct}
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%', textAlign: 'center' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Monthly EMI
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(calculations.emi)}
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
                <div style={{ color: '#64748b', fontSize: 12 }}>Principal</div>
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
                  Total Interest
                </div>
                <div
                  style={{ fontWeight: 600, color: 'var(--color-brand-green)' }}
                >
                  +{formatINR(calculations.totalInterest)}
                </div>
              </div>
            </div>

            {/* SEO Internal Link */}
            <div style={{ marginTop: 20, fontSize: 14 }}>
              <Link
                href="/guides/emi-calculator-guide"
                style={{
                  color: 'var(--color-brand-green)',
                  fontWeight: 500,
                  textDecoration: 'underline',
                }}
              >
                Read: How to reduce your EMI burden?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
