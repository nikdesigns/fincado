/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import PieChart from '@/components/PieChart';

// 1. Define Labels
interface LabelConfig {
  loanAmount: string;
  rate: string;
  tenure: string;
  monthlyEMI: string;
  principal: string;
  totalInterest: string;
}

interface EMIClientProps {
  labels?: LabelConfig;
  defaultRate?: number; // Keep this prop for Bank Pages
}

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function EMIClient({ labels, defaultRate }: EMIClientProps) {
  const [amount, setAmount] = useState(5000000);
  // Initialize with prop if available
  const [rate, setRate] = useState(defaultRate || 8.5);
  const [tenure, setTenure] = useState(20);

  // 2. Default English Labels
  const t = labels || {
    loanAmount: 'Loan Amount (₹)',
    rate: 'Interest Rate (% p.a)',
    tenure: 'Loan Tenure (Years)',
    monthlyEMI: 'Monthly EMI',
    principal: 'Principal Amount',
    totalInterest: 'Total Interest',
  };

  // Logic to handle prop change safely during render
  const [prevDefaultRate, setPrevDefaultRate] = useState(defaultRate);
  if (defaultRate !== prevDefaultRate) {
    setPrevDefaultRate(defaultRate);
    if (defaultRate) setRate(defaultRate);
  }

  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

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

  const safeSet = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        <div className="calc-inputs">
          <div className="input-group">
            <label>{t.loanAmount}</label>
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
              max="20"
              step="0.1"
              value={rate}
              onChange={safeSet(setRate)}
              style={{ background: getRangeBackground(rate, 1, 20) }}
            />
          </div>

          <div className="input-group">
            <label>{t.tenure}</label>
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

        <div className="calc-visuals">
          <PieChart
            principalPct={calculations.principalPct}
            interestPct={calculations.interestPct}
            size={200}
          />
          <div style={{ marginTop: 24, width: '100%', textAlign: 'center' }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.monthlyEMI}
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
                  {t.principal}
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
                  {t.totalInterest}
                </div>
                <div
                  style={{ fontWeight: 600, color: 'var(--color-brand-green)' }}
                >
                  +{formatINR(calculations.totalInterest)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
