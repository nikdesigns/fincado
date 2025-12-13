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

export default function SWPClient() {
  // --- STATE ---
  const [initialCorpus, setInitialCorpus] = useState<number>(1000000); // 10 Lakhs
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(10000); // 10k/mo
  const [annualRate, setAnnualRate] = useState<number>(8); // 8% Return
  const [years, setYears] = useState<number>(10); // 10 Years Horizon

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Teal theme for SWP (Income flow)
    return `linear-gradient(to right, #0d9488 0%, #0d9488 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
  };

  // --- CALCULATIONS (Simulation Logic) ---
  const results = useMemo(() => {
    const monthsHorizon = Math.round(years * 12);
    const monthlyRate = annualRate / 12 / 100;
    let balance = initialCorpus;
    let totalWithdrawn = 0;

    // Simulation
    for (let m = 1; m <= monthsHorizon; m++) {
      // 1. Add Interest
      const interest = balance * monthlyRate;
      balance += interest;

      // 2. Withdraw
      const withdrawal = Math.min(monthlyWithdrawal, balance);
      balance -= withdrawal;
      totalWithdrawn += withdrawal;

      if (balance <= 0) {
        balance = 0;
        break; // Corpus exhausted
      }
    }

    const finalBalance = Math.round(balance);
    const totalEarnings = Math.round(
      finalBalance + totalWithdrawn - initialCorpus
    );

    // Pie Chart: Remaining vs Withdrawn
    // Note: If corpus grows significantly, "Total Value" = Final Balance + Total Withdrawn
    const totalValue = finalBalance + totalWithdrawn;
    const remainingPct =
      totalValue > 0 ? Math.round((finalBalance / totalValue) * 100) : 0;
    const withdrawnPct = 100 - remainingPct;

    return {
      finalBalance,
      totalWithdrawn: Math.round(totalWithdrawn),
      totalEarnings,
      remainingPct,
      withdrawnPct,
    };
  }, [initialCorpus, monthlyWithdrawal, annualRate, years]);

  // --- ACTIONS ---
  const handleReset = () => {
    setInitialCorpus(1000000);
    setMonthlyWithdrawal(10000);
    setAnnualRate(8);
    setYears(10);
  };

  const handleCopy = () => {
    const summary = `SWP of ${formatINR(monthlyWithdrawal)}/mo from ${formatINR(
      initialCorpus
    )} @ ${annualRate}% for ${years} years.\nFinal Balance: ${formatINR(
      results.finalBalance
    )}`;
    navigator.clipboard.writeText(summary);
    alert('Summary copied to clipboard!');
  };

  // Safe Setter
  const numSetter =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* --- LEFT: INPUTS --- */}
        <div className="calc-inputs">
          {/* 1. Initial Corpus */}
          <div className="input-group">
            <label>Total Investment Amount (₹)</label>
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

          {/* 2. Withdrawal Amount */}
          <div className="input-group">
            <label>Monthly Withdrawal (₹)</label>
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

          {/* 3. Expected Return */}
          <div className="input-group">
            <label>Expected Return (% p.a)</label>
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

          {/* 4. Duration */}
          <div className="input-group">
            <label>Time Period (Years)</label>
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

          {/* Reset */}
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

        {/* --- RIGHT: VISUALS --- */}
        <div className="calc-visuals">
          {/* Pie Logic: 
             Principal = Remaining Balance
             Interest = Amount Withdrawn
             (Naming adapted for visual consistency: 'remaining' vs 'withdrawn')
          */}
          <PieChart
            principalPct={results.remainingPct} // Shows as "Principal" color (Balance)
            interestPct={results.withdrawnPct} // Shows as "Interest" color (Withdrawn)
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Projected Remaining Value
              </span>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#0d9488' }}>
                {formatINR(results.finalBalance)}
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
                <div style={{ color: '#64748b', fontSize: 12 }}>
                  Total Investment
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
                  Total Withdrawn
                </div>
                <div style={{ fontWeight: 600, color: '#0d9488' }}>
                  {formatINR(results.totalWithdrawn)}
                </div>
              </div>
            </div>

            {/* Warning if Corpus Depletes */}
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
                ⚠️ Corpus exhausted within the selected period. Consider
                lowering withdrawal amount.
              </div>
            )}

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              style={{
                marginTop: 16,
                width: '100%',
                padding: '10px',
                background: '#f0fdfa',
                color: '#0f766e',
                border: '1px solid #ccfbf1',
                borderRadius: 6,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Copy Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
