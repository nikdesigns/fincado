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

export default function SavingsClient() {
  // --- STATE ---
  const [monthlySave, setMonthlySave] = useState(5000);
  const [rate, setRate] = useState(6); // Savings Rate %
  const [years, setYears] = useState(5);

  // Advanced State
  const [lumpSum, setLumpSum] = useState(0);
  const [inflation, setInflation] = useState(6);
  const [targetAmount, setTargetAmount] = useState(0); // For Goal Planning

  // Emergency Fund State
  const [salaryMonthly, setSalaryMonthly] = useState(40000);
  const [emergencyMonths, setEmergencyMonths] = useState(6);

  // --- HELPER: Background for Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- LOGIC: Calculations ---
  const calculations = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    const monthlyInflation = inflation / 12 / 100;

    // 1. Future Value of Monthly Savings (Annuity Due)
    let fvMonthly = 0;
    if (monthlySave > 0) {
      if (rate === 0) {
        fvMonthly = monthlySave * months;
      } else {
        fvMonthly =
          monthlySave *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);
      }
    }

    // 2. Future Value of Lump Sum
    const fvLump = lumpSum * Math.pow(1 + monthlyRate, months);

    // Totals
    const futureValue = Math.round(fvMonthly + fvLump);
    const totalInvested = Math.round(monthlySave * months + lumpSum);
    const totalReturns = futureValue - totalInvested;

    // 3. Real Value (Inflation Adjusted)
    const realValue = Math.round(
      futureValue / Math.pow(1 + monthlyInflation, months)
    );

    // 4. Target Planner (Required Savings)
    let requiredMonthly = 0;
    if (targetAmount > 0) {
      const lumpSumGrowth = lumpSum * Math.pow(1 + monthlyRate, months);
      const shortfall = Math.max(0, targetAmount - lumpSumGrowth);

      if (shortfall > 0 && rate > 0) {
        const annuityFactor =
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);
        requiredMonthly = Math.ceil(shortfall / annuityFactor);
      } else if (shortfall > 0 && rate === 0) {
        requiredMonthly = Math.ceil(shortfall / months);
      }
    }

    // 5. Emergency Fund Calc
    const emergencyCorpus = salaryMonthly * emergencyMonths;

    // Chart Data
    const investedPct =
      futureValue > 0 ? Math.round((totalInvested / futureValue) * 100) : 0;
    const returnsPct = 100 - investedPct;

    return {
      futureValue,
      totalInvested,
      totalReturns,
      realValue,
      requiredMonthly,
      emergencyCorpus,
      investedPct,
      returnsPct,
    };
  }, [
    monthlySave,
    rate,
    years,
    lumpSum,
    inflation,
    targetAmount,
    salaryMonthly,
    emergencyMonths,
  ]);

  // Safe Setter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeSet = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* --- LEFT COLUMN: INPUTS --- */}
        <div className="calc-inputs">
          {/* Monthly Savings */}
          <div className="input-group">
            <label>Monthly Savings (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={monthlySave}
                onChange={safeSet(setMonthlySave)}
              />
            </div>
            <input
              type="range"
              min="500"
              max="200000"
              step="500"
              value={monthlySave}
              onChange={safeSet(setMonthlySave)}
              style={{
                background: getRangeBackground(monthlySave, 500, 200000),
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
              max="15"
              step="0.1"
              value={rate}
              onChange={safeSet(setRate)}
              style={{ background: getRangeBackground(rate, 1, 15) }}
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

          {/* --- ADVANCED OPTIONS --- */}
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
              Goal Planning & Emergency Fund
            </summary>

            <div
              style={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <h4 style={{ fontSize: 14, color: '#333', marginBottom: -8 }}>
                Investment Details
              </h4>
              {/* Initial Lump Sum */}
              <div className="input-group">
                <label>Existing Savings / Lump Sum (₹)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    value={lumpSum}
                    onChange={safeSet(setLumpSum)}
                  />
                </div>
              </div>

              {/* Inflation */}
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

              <h4
                style={{
                  fontSize: 14,
                  color: '#333',
                  marginTop: 8,
                  marginBottom: -8,
                }}
              >
                Goal Planner
              </h4>
              {/* Target Amount */}
              <div className="input-group">
                <label>Target Goal Amount (₹)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={safeSet(setTargetAmount)}
                    placeholder="E.g. 10 Lakhs"
                  />
                </div>
              </div>

              <h4
                style={{
                  fontSize: 14,
                  color: '#333',
                  marginTop: 8,
                  marginBottom: -8,
                }}
              >
                Emergency Fund Calculator
              </h4>
              {/* Salary */}
              <div className="input-group">
                <label>Monthly Net Salary (₹)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    value={salaryMonthly}
                    onChange={safeSet(setSalaryMonthly)}
                  />
                </div>
              </div>
              {/* Emergency Months */}
              <div className="input-group">
                <label>Months Coverage Needed</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    value={emergencyMonths}
                    onChange={safeSet(setEmergencyMonths)}
                    max={24}
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

          <div style={{ marginTop: 24, width: '100%', textAlign: 'center' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Est. Total Savings
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
                  Total Deposits
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
                  Interest Earned
                </div>
                <div
                  style={{ fontWeight: 600, color: 'var(--color-brand-green)' }}
                >
                  +{formatINR(calculations.totalReturns)}
                </div>
              </div>
            </div>

            {/* Real Value Badge */}
            <div
              style={{
                marginTop: 16,
                fontSize: 12,
                color: '#64748b',
                background: '#f1f5f9',
                padding: '6px 12px',
                borderRadius: 20,
                display: 'inline-block',
              }}
            >
              Purchasing Power ({inflation}% inflation):{' '}
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
                  To reach {formatINR(targetAmount)}:
                </div>
                <div
                  style={{ fontSize: 20, fontWeight: 800, color: '#059669' }}
                >
                  {formatINR(calculations.requiredMonthly)}
                  <span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span>
                </div>
              </div>
            )}

            {/* Emergency Fund Result */}
            {salaryMonthly > 0 && emergencyMonths > 0 && (
              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  background: '#fff7ed',
                  borderRadius: 8,
                  border: '1px solid #fed7aa',
                }}
              >
                <div
                  style={{ fontSize: 12, color: '#c2410c', fontWeight: 600 }}
                >
                  Recommended Emergency Fund:
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 800, color: '#ea580c' }}
                >
                  {formatINR(calculations.emergencyCorpus)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
