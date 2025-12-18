'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

// 1. Labels Interface
interface LabelConfig {
  totalInv: string;
  monthlyWithdrawal: string;
  rate: string;
  time: string;
  remainingVal: string;
  totalWithdrawn: string;
  warning: string;
}

interface SWPClientProps {
  labels?: LabelConfig;
}

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function SWPClient({ labels }: SWPClientProps) {
  const [initialCorpus, setInitialCorpus] = useState<number>(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(10000);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [years, setYears] = useState<number>(10);

  // 2. Default Labels
  const t = labels || {
    totalInv: 'Total Investment Amount (₹)',
    monthlyWithdrawal: 'Monthly Withdrawal (₹)',
    rate: 'Expected Return (% p.a)',
    time: 'Time Period (Years)',
    remainingVal: 'Projected Remaining Value',
    totalWithdrawn: 'Total Withdrawn',
    warning:
      '⚠️ Corpus exhausted within the selected period. Consider lowering withdrawal amount.',
  };

  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  const results = useMemo(() => {
    const monthsHorizon = Math.round(years * 12);
    const monthlyRate = annualRate / 12 / 100;
    let balance = initialCorpus;
    let totalWithdrawn = 0;

    for (let m = 1; m <= monthsHorizon; m++) {
      const interest = balance * monthlyRate;
      balance += interest;
      const withdrawal = Math.min(monthlyWithdrawal, balance);
      balance -= withdrawal;
      totalWithdrawn += withdrawal;
      if (balance <= 0) {
        balance = 0;
        break;
      }
    }

    const finalBalance = Math.round(balance);
    const totalValue = finalBalance + totalWithdrawn;
    const remainingPct =
      totalValue > 0 ? Math.round((finalBalance / totalValue) * 100) : 0;
    const withdrawnPct = 100 - remainingPct;

    return {
      finalBalance,
      totalWithdrawn: Math.round(totalWithdrawn),
      remainingPct,
      withdrawnPct,
    };
  }, [initialCorpus, monthlyWithdrawal, annualRate, years]);

  const handleReset = () => {
    setInitialCorpus(1000000);
    setMonthlyWithdrawal(10000);
    setAnnualRate(8);
    setYears(10);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numSetter = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        <div className="calc-inputs">
          <div className="input-group">
            <label>{t.totalInv}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={initialCorpus}
                onChange={numSetter(setInitialCorpus)}
              />
            </div>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="50000"
              value={initialCorpus}
              onChange={numSetter(setInitialCorpus)}
              style={{
                background: getRangeBackground(initialCorpus, 100000, 10000000),
              }}
            />
          </div>
          <div className="input-group">
            <label>{t.monthlyWithdrawal}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={monthlyWithdrawal}
                onChange={numSetter(setMonthlyWithdrawal)}
              />
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="500"
              value={monthlyWithdrawal}
              onChange={numSetter(setMonthlyWithdrawal)}
              style={{
                background: getRangeBackground(monthlyWithdrawal, 1000, 200000),
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
              max="20"
              step="0.1"
              value={annualRate}
              onChange={numSetter(setAnnualRate)}
              style={{ background: getRangeBackground(annualRate, 1, 20) }}
            />
          </div>
          <div className="input-group">
            <label>{t.time}</label>
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
              max="30"
              step="1"
              value={years}
              onChange={numSetter(setYears)}
              style={{ background: getRangeBackground(years, 1, 30) }}
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
            principalPct={results.remainingPct}
            interestPct={results.withdrawnPct}
            size={200}
          />
          <div style={{ marginTop: 24, width: '100%' }}>
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.remainingVal}
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(results.finalBalance)}
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
                  {t.totalInv}
                </div>
                <div style={{ fontWeight: 600 }}>
                  {formatINR(initialCorpus)}
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
                  {t.totalWithdrawn}
                </div>
                <div
                  style={{ fontWeight: 600, color: 'var(--color-brand-green)' }}
                >
                  {formatINR(results.totalWithdrawn)}
                </div>
              </div>
            </div>
            {results.finalBalance === 0 && (
              <div
                style={{
                  marginTop: 16,
                  padding: 8,
                  background: '#fef2f2',
                  borderRadius: 6,
                  textAlign: 'center',
                  fontSize: 12,
                  color: '#991b1b',
                }}
              >
                {t.warning}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
