'use client';

import React, { useState, useMemo, useRef } from 'react';
import PieChart from '@/components/PieChart';

// --- Helper: Format Currency ---
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function PPFClient() {
  // --- STATE ---
  const [mode, setMode] = useState<'monthly' | 'annual'>('monthly');
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000); // ₹1k/mo
  const [annualContribution, setAnnualContribution] = useState<number>(12000); // fallback if annual
  const [years, setYears] = useState<number>(15); // PPF base tenure
  const [annualRate, setAnnualRate] = useState<number>(7.1); // Current Govt Rate

  const max80CLimit = 150000;
  const printRef = useRef<HTMLDivElement | null>(null);

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Orange theme for PPF (Govt/Post Office feel)
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS ---
  const monthlyRate = annualRate / 12 / 100;
  const yearlyRate = annualRate / 100;
  const months = Math.max(1, Math.round(years * 12));

  // 1. Total Contributed
  const totalContributed = useMemo(() => {
    if (mode === 'monthly') return monthlyContribution * months;
    return annualContribution * years;
  }, [mode, monthlyContribution, annualContribution, months, years]);

  // 2. Maturity Calculation (Annuity Due approximation)
  const maturity = useMemo(() => {
    if (mode === 'monthly') {
      if (monthlyContribution <= 0) return 0;
      const r = monthlyRate;
      const n = months;
      if (r === 0) return monthlyContribution * n;
      // FV = P * [ ((1+r)^n - 1) / r ] * (1+r)
      return monthlyContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    } else {
      if (annualContribution <= 0) return 0;
      const r = yearlyRate;
      const n = Math.max(1, years);
      if (r === 0) return annualContribution * n;
      return annualContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    }
  }, [
    mode,
    monthlyContribution,
    monthlyRate,
    months,
    annualContribution,
    yearlyRate,
    years,
  ]);

  const maturityRounded = Math.round(maturity);
  const totalInterest = Math.max(0, Math.round(maturity - totalContributed));

  // 3. Schedule Logic
  const schedule = useMemo(() => {
    const rows = [];
    let balance = 0;
    const monthlyDepositAmount = monthlyContribution;
    const annualDepositAmount = annualContribution;
    const ratePerYear = annualRate / 100;

    for (let y = 1; y <= years; y++) {
      let contributedThisYear = 0;
      if (mode === 'monthly') {
        contributedThisYear = monthlyDepositAmount * 12;
      } else {
        contributedThisYear = annualDepositAmount;
      }

      // Interest on opening balance + current year contribution
      const balanceBeforeInterest = balance + contributedThisYear;
      const interest = balanceBeforeInterest * ratePerYear;
      balance = balanceBeforeInterest + interest;

      rows.push({
        year: y,
        contributed: contributedThisYear,
        balance: Math.round(balance),
        interestThisYear: Math.round(interest),
      });
    }
    return rows;
  }, [mode, monthlyContribution, annualContribution, annualRate, years]);

  // 4. Pie Chart Data
  const principalPct =
    maturity === 0 ? 0 : Math.round((totalContributed / maturity) * 100);
  const interestPct = 100 - principalPct;

  // 5. Tax Limit Check
  const annualContributionForTax = useMemo(() => {
    const currentAnnual =
      mode === 'monthly' ? monthlyContribution * 12 : annualContribution;
    return Math.min(currentAnnual, max80CLimit);
  }, [mode, monthlyContribution, annualContribution, max80CLimit]);

  // --- ACTIONS ---
  const handleReset = () => {
    setMode('monthly');
    setMonthlyContribution(1000);
    setAnnualContribution(12000);
    setYears(15);
    setAnnualRate(7.1);
  };

  const exportCSV = () => {
    const header = ['Year,Contributed,Interest,Balance'];
    const lines = [header.join(',')].concat(
      schedule.map((r) =>
        [r.year, r.contributed, r.interestThisYear, r.balance].join(',')
      )
    );
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ppf-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
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
          {/* Mode Switcher */}
          <div className="input-group">
            <label>Contribution Mode</label>
            <div className="input-wrapper">
              <select
                value={mode}
                onChange={(e) =>
                  setMode(e.target.value as 'monthly' | 'annual')
                }
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <option value="monthly">Monthly</option>
                <option value="annual">Annual (Lump Sum)</option>
              </select>
            </div>
          </div>

          {/* Investment Amount */}
          <div className="input-group">
            <label>
              {mode === 'monthly'
                ? 'Monthly Investment (₹)'
                : 'Annual Investment (₹)'}
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                value={
                  mode === 'monthly' ? monthlyContribution : annualContribution
                }
                onChange={numSetter(
                  mode === 'monthly'
                    ? setMonthlyContribution
                    : setAnnualContribution
                )}
              />
            </div>
            <input
              type="range"
              min={mode === 'monthly' ? 500 : 500}
              max={mode === 'monthly' ? 12500 : 150000} // Capped at 1.5L/yr logic
              step={mode === 'monthly' ? 500 : 1000}
              value={
                mode === 'monthly' ? monthlyContribution : annualContribution
              }
              onChange={numSetter(
                mode === 'monthly'
                  ? setMonthlyContribution
                  : setAnnualContribution
              )}
              style={{
                background: getRangeBackground(
                  mode === 'monthly' ? monthlyContribution : annualContribution,
                  500,
                  mode === 'monthly' ? 12500 : 150000
                ),
              }}
            />
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              Max recommended: ₹1.5 Lakh/year
            </div>
          </div>

          {/* Interest Rate */}
          <div className="input-group">
            <label>Interest Rate (% p.a)</label>
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
              min="4"
              max="12"
              step="0.1"
              value={annualRate}
              onChange={numSetter(setAnnualRate)}
              style={{ background: getRangeBackground(annualRate, 4, 12) }}
            />
          </div>

          {/* Duration */}
          <div className="input-group">
            <label>Duration (Years)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={years}
                onChange={numSetter(setYears)}
                min={15} // PPF Min is 15
              />
            </div>
            <input
              type="range"
              min="15"
              max="50"
              step="5" // PPF extends in blocks of 5
              value={years}
              onChange={numSetter(setYears)}
              style={{ background: getRangeBackground(years, 15, 50) }}
            />
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              Min 15 years. Extendable in blocks of 5 years.
            </div>
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

        {/* --- RIGHT: VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={principalPct}
            interestPct={interestPct}
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Maturity Value (Tax Free)
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(maturityRounded)}
              </div>
            </div>

            {/* Grid */}
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
                  {formatINR(totalContributed)}
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
                  Total Interest
                </div>
                <div
                  style={{ fontWeight: 600, color: 'var(--color-brand-green)' }}
                >
                  +{formatINR(totalInterest)}
                </div>
              </div>
            </div>

            {/* Tax Benefit Badge */}
            <div
              style={{
                marginTop: 16,
                padding: 12,
                background: '#fff7ed',
                borderRadius: 8,
                border: '1px solid #fed7aa',
              }}
            >
              <div style={{ fontSize: 12, color: '#9a3412', fontWeight: 600 }}>
                Section 80C Benefit (Annual):
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#ea580c' }}>
                Max {formatINR(annualContributionForTax)}
              </div>
              <div style={{ fontSize: 11, color: '#9a3412', marginTop: 4 }}>
                (Deduction capped at ₹1.5L per FY)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SCHEDULE TABLE --- */}
      <div style={{ marginTop: 40 }}>
        <div className="table-header-row table-actions">
          <div>
            <h3>Yearly Growth Schedule</h3>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
              Compounding effect over {years} years
            </p>
          </div>
          <div className="table-actions">
            <button onClick={exportCSV} className="action-btn">
              Export CSV
            </button>
          </div>
        </div>

        <div
          className="schedule-wrapper"
          ref={printRef}
          style={{ maxHeight: 300, overflowY: 'auto' }}
        >
          <table className="rate-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Year</th>
                <th style={{ textAlign: 'right' }}>Invested</th>
                <th style={{ textAlign: 'right' }}>Interest</th>
                <th style={{ textAlign: 'right' }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr
                  key={row.year}
                  style={{ borderBottom: '1px solid #f1f5f9' }}
                >
                  <td style={{ color: '#64748b' }}>{row.year}</td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(row.contributed)}
                  </td>
                  <td style={{ textAlign: 'right', color: '#f97316' }}>
                    {formatINR(row.interestThisYear)}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>
                    {formatINR(row.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
