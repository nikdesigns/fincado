'use client';

import React, { useState, useMemo } from 'react';
import PieChart from '@/components/PieChart';

// --- Types ---
// RDs in India typically only offer Quarterly Compounding

// --- Helper: Format Currency ---
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function RDClient() {
  // --- STATE ---
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [rate, setRate] = useState<number>(7.0);
  const [years, setYears] = useState<number>(3);
  const [months, setMonths] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(10);
  const [showGrossOnly, setShowGrossOnly] = useState<boolean>(false);

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Purple/Indigo theme for RD
    return `linear-gradient(to right, var(--color-action-cta) 0%, var(--color-action-cta) ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
  };

  // --- ACTIONS ---
  const handleReset = () => {
    setMonthlyDeposit(5000);
    setRate(7.0);
    setYears(3);
    setMonths(0);
    setTaxRate(10);
    setShowGrossOnly(false);
  };

  // --- CALCULATION LOGIC ---
  const results = useMemo(() => {
    const totalMonths = years * 12 + months;
    const r = rate / 100;
    const n = 4; // Quarterly compounding is standard

    let maturityAmount = 0;

    // RD CALCULATION LOOP
    // For every installment i (from 0 to totalMonths-1):
    // Determine how many months this specific money stays in the bank.
    if (rate === 0) {
      maturityAmount = monthlyDeposit * totalMonths;
    } else {
      for (let i = 0; i < totalMonths; i++) {
        // The first installment stays for the full duration.
        // The last installment stays for 1 month (or depending on bank rules, usually 1 month).
        const monthsRemaining = totalMonths - i;
        const t = monthsRemaining / 12; // Time in years

        // Compound Interest for this specific installment
        const installmentMaturity = monthlyDeposit * Math.pow(1 + r / n, n * t);
        maturityAmount += installmentMaturity;
      }
    }

    const totalInvestment = monthlyDeposit * totalMonths;
    const totalInterest = maturityAmount - totalInvestment;

    // Tax Calculation
    let taxDeducted = 0;
    if (!showGrossOnly && taxRate > 0) {
      taxDeducted = (totalInterest * taxRate) / 100;
    }

    const netInterest = totalInterest - taxDeducted;
    const finalMaturity = totalInvestment + netInterest;

    // Pie Chart Data
    const principalPct =
      totalInvestment > 0
        ? Math.round((totalInvestment / finalMaturity) * 100)
        : 0;
    const interestPct = 100 - principalPct;

    return {
      maturity: Math.round(finalMaturity),
      investment: Math.round(totalInvestment),
      interest: Math.round(netInterest),
      grossInterest: Math.round(totalInterest),
      tax: Math.round(taxDeducted),
      principalPct,
      interestPct,
    };
  }, [monthlyDeposit, rate, years, months, taxRate, showGrossOnly]);

  // Safe Setter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numSetter = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* --- LEFT COLUMN: INPUTS --- */}
        <div className="calc-inputs">
          {/* Monthly Deposit */}
          <div className="input-group">
            <label>Monthly Deposit (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={monthlyDeposit}
                onChange={numSetter(setMonthlyDeposit)}
              />
            </div>
            <input
              type="range"
              min="500"
              max="200000"
              step="500"
              value={monthlyDeposit}
              onChange={numSetter(setMonthlyDeposit)}
              style={{
                background: getRangeBackground(monthlyDeposit, 500, 200000),
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

          {/* Tenure (Split Years + Months) */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Years</label>
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
              <label>Months</label>
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

          {/* Advanced Options (Tax) */}
          <details open className="advanced-options" style={{ marginTop: 16 }}>
            <summary
              style={{
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              Advanced Options (Tax)
            </summary>

            <div
              style={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {/* Tax Rate */}
              <div className="input-group">
                <label>
                  Tax Rate (%){' '}
                  <span
                    style={{ fontSize: 12, fontWeight: 400, color: '#666' }}
                  >
                    - TDS Estimate
                  </span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    value={taxRate}
                    onChange={numSetter(setTaxRate)}
                    disabled={showGrossOnly}
                    style={{ opacity: showGrossOnly ? 0.5 : 1 }}
                  />
                </div>
              </div>

              {/* Gross Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  id="grossCheck"
                  checked={showGrossOnly}
                  onChange={(e) => setShowGrossOnly(e.target.checked)}
                  style={{ width: 16, height: 16, cursor: 'pointer' }}
                />
                <label
                  htmlFor="grossCheck"
                  style={{
                    fontSize: 14,
                    cursor: 'pointer',
                    color: 'var(--color-text-main)',
                  }}
                >
                  Show Gross Interest (Ignore Tax)
                </label>
              </div>
            </div>
          </details>

          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            style={{
              marginTop: 10,
              background: 'none',
              border: 'none',
              textDecoration: 'underline',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              fontSize: 13,
              width: 'fit-content',
            }}
          >
            Reset Defaults
          </button>
        </div>

        {/* --- RIGHT COLUMN: VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={results.principalPct}
            interestPct={results.interestPct}
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Maturity Amount
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-blue, #6366f1)', // Indigo for RD
                }}
              >
                {formatINR(results.maturity)}
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
                  {formatINR(results.investment)}
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
                  {showGrossOnly ? 'Gross Int.' : 'Net Int.'}
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    color: 'var(--color-brand-blue, #6366f1)',
                  }}
                >
                  +{formatINR(results.interest)}
                </div>
              </div>
            </div>

            {/* Tax Note */}
            {!showGrossOnly && results.tax > 0 && (
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
                Tax Deducted: <strong>-{formatINR(results.tax)}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
