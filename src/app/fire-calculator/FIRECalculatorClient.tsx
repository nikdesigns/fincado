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

export default function FIRECalculatorClient() {
  // --- STATE ---
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [targetRetirementAge, setTargetRetirementAge] = useState<number>(45);
  const [currentAnnualExpense, setCurrentAnnualExpense] =
    useState<number>(1000000);
  const [currentCorpus, setCurrentCorpus] = useState<number>(2000000);

  const [preRetireReturn, setPreRetireReturn] = useState<number>(12);
  const [inflationPct, setInflationPct] = useState<number>(6);
  const [safeWithdrawalRate, setSafeWithdrawalRate] = useState<number>(3.5);

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Orange/Flame theme for FIRE
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    const yearsToFIRE = Math.max(1, targetRetirementAge - currentAge);
    const monthsToFIRE = yearsToFIRE * 12;
    const monthlyRatePre = preRetireReturn / 12 / 100;

    // 1. Future Expense at FIRE Age
    const annualExpenseAtFIRE = Math.round(
      currentAnnualExpense * Math.pow(1 + inflationPct / 100, yearsToFIRE)
    );

    // 2. FIRE Number (Corpus Required)
    // Formula: Expense / SWR (e.g. Expense / 0.04)
    const multiplier = 100 / safeWithdrawalRate;
    const fireNumberCorpus = Math.round(annualExpenseAtFIRE * multiplier);

    // 3. Future Value of Current Corpus
    // FV = P * (1+r)^n
    const futureValueOfCurrentCorpus = Math.round(
      currentCorpus * Math.pow(1 + monthlyRatePre, monthsToFIRE)
    );

    // 4. Shortfall & Required SIP
    const requiredShortfall = Math.max(
      0,
      fireNumberCorpus - futureValueOfCurrentCorpus
    );
    let requiredMonthlySIP = 0;

    if (requiredShortfall > 0) {
      if (monthlyRatePre === 0) {
        requiredMonthlySIP = Math.round(requiredShortfall / monthsToFIRE);
      } else {
        // SIP = FV / [ ((1+r)^n - 1)/r * (1+r) ]
        const annuityFactor =
          ((Math.pow(1 + monthlyRatePre, monthsToFIRE) - 1) / monthlyRatePre) *
          (1 + monthlyRatePre);
        requiredMonthlySIP = Math.round(requiredShortfall / annuityFactor);
      }
    }

    // 5. Pie Chart Data (Progress)
    // "Achieved" = Future Value of Current Corpus
    // "Gap" = Shortfall to reach FIRE Number
    // Cap achieved at 100% if they are already FI
    const achievedPct =
      fireNumberCorpus > 0
        ? Math.min(
            100,
            Math.round((futureValueOfCurrentCorpus / fireNumberCorpus) * 100)
          )
        : 0;
    const gapPct = 100 - achievedPct;

    return {
      annualExpenseAtFIRE,
      fireNumberCorpus,
      futureValueOfCurrentCorpus,
      requiredShortfall,
      requiredMonthlySIP,
      yearsToFIRE,
      multiplier: multiplier.toFixed(1),
      achievedPct,
      gapPct,
    };
  }, [
    currentAge,
    targetRetirementAge,
    currentAnnualExpense,
    currentCorpus,
    preRetireReturn,
    inflationPct,
    safeWithdrawalRate,
  ]);

  // --- ACTIONS ---
  const handleReset = () => {
    setCurrentAge(30);
    setTargetRetirementAge(45);
    setCurrentAnnualExpense(1000000);
    setCurrentCorpus(2000000);
    setPreRetireReturn(12);
    setInflationPct(6);
    setSafeWithdrawalRate(3.5);
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
          {/* Ages */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Current Age</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={currentAge}
                  onChange={numSetter(setCurrentAge)}
                  min={18}
                  max={targetRetirementAge - 1}
                />
              </div>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>FIRE Age</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={targetRetirementAge}
                  onChange={numSetter(setTargetRetirementAge)}
                  min={currentAge + 1}
                  max={100}
                />
              </div>
            </div>
          </div>

          {/* Finances */}
          <div className="input-group">
            <label>Current Annual Expense (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={currentAnnualExpense}
                onChange={numSetter(setCurrentAnnualExpense)}
              />
            </div>
            <input
              type="range"
              min="300000"
              max="5000000"
              step="50000"
              value={currentAnnualExpense}
              onChange={numSetter(setCurrentAnnualExpense)}
              style={{
                background: getRangeBackground(
                  currentAnnualExpense,
                  300000,
                  5000000
                ),
              }}
            />
          </div>

          <div className="input-group">
            <label>Current Savings / Corpus (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={currentCorpus}
                onChange={numSetter(setCurrentCorpus)}
              />
            </div>
            <input
              type="range"
              min="0"
              max="20000000"
              step="100000"
              value={currentCorpus}
              onChange={numSetter(setCurrentCorpus)}
              style={{
                background: getRangeBackground(currentCorpus, 0, 20000000),
              }}
            />
          </div>

          {/* Advanced Assumptions */}
          <details open className="advanced-options" style={{ marginTop: 16 }}>
            <summary
              style={{
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              Advanced Assumptions (SWR, Inflation)
            </summary>
            <div
              style={{
                marginTop: 16,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              <div className="input-group">
                <label>Inflation (%)</label>
                <input
                  className="input-small"
                  type="number"
                  value={inflationPct}
                  onChange={numSetter(setInflationPct)}
                  step="0.1"
                />
              </div>
              <div className="input-group">
                <label>Return Rate (%)</label>
                <input
                  className="input-small"
                  type="number"
                  value={preRetireReturn}
                  onChange={numSetter(setPreRetireReturn)}
                  step="0.1"
                />
              </div>
              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <label>Safe Withdrawal Rate (%)</label>
                  <span style={{ fontSize: 11, color: '#666' }}>
                    Multiplier: {results.multiplier}x
                  </span>
                </div>
                <input
                  className="input-small"
                  type="number"
                  value={safeWithdrawalRate}
                  onChange={numSetter(setSafeWithdrawalRate)}
                  step="0.1"
                  min={2}
                  max={6}
                />
                <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>
                  Recommended for India: 3.0% - 3.5%
                </div>
              </div>
            </div>
          </details>

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
            principalPct={results.achievedPct} // Represents "Achieved" via current savings
            interestPct={results.gapPct} // Represents "Gap" to fill
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result: FIRE Number */}
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Your FIRE Number
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(results.fireNumberCorpus)}
              </div>
            </div>

            {/* Main Result: SIP Required */}
            <div
              style={{
                marginBottom: 16,
                padding: 12,
                background: '#fff7ed',
                borderRadius: 8,
                border: '1px solid #fed7aa',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 12, color: '#c2410c', fontWeight: 600 }}>
                Monthly Savings Needed
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#ea580c' }}>
                {formatINR(results.requiredMonthlySIP)}
                <span style={{ fontSize: 14 }}>/mo</span>
              </div>
            </div>

            {/* Grid Breakdown */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                fontSize: 12,
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  padding: 8,
                  background: '#fff',
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b' }}>Future Annual Exp.</div>
                <div style={{ fontWeight: 600, color: '#dc2626' }}>
                  {formatINR(results.annualExpenseAtFIRE)}
                </div>
              </div>
              <div
                style={{
                  padding: 8,
                  background: '#fff',
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b' }}>Current Corpus FV</div>
                <div style={{ fontWeight: 600, color: '#16a34a' }}>
                  {formatINR(results.futureValueOfCurrentCorpus)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
