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

export default function RetirementCalculatorClient() {
  // --- STATE ---
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [currentSavings, setCurrentSavings] = useState<number>(500000);
  const [monthlyExpense, setMonthlyExpense] = useState<number>(30000);
  const [inflationPct, setInflationPct] = useState<number>(6);
  const [preRetireReturn, setPreRetireReturn] = useState<number>(12);
  const [postRetireReturn, setPostRetireReturn] = useState<number>(8);

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Purple theme for Retirement
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const retirementMonths = yearsToRetirement * 12;
    const yearsInRetirement = 25; // Assumption: Life expectancy ~85
    const monthlyRatePre = preRetireReturn / 12 / 100;
    const monthlyInflation = inflationPct / 12 / 100;

    // 1. Expense at Retirement (FV of current expense)
    const monthlyExpenseAtRetirement =
      monthlyExpense * Math.pow(1 + monthlyInflation, retirementMonths);
    const annualWithdrawalAtRetirement = monthlyExpenseAtRetirement * 12;

    // 2. Target Corpus Calculation (PV of Annuity for post-retirement)
    // Real Rate of Return during retirement = (1+Nominal)/(1+Inflation) - 1
    const rReal = (1 + postRetireReturn / 100) / (1 + inflationPct / 100) - 1;

    let targetCorpus = 0;
    if (rReal <= 0) {
      targetCorpus = annualWithdrawalAtRetirement * yearsInRetirement;
    } else {
      // PV = PMT * [1 - (1+r)^-n] / r
      const factor = (1 - Math.pow(1 + rReal, -yearsInRetirement)) / rReal;
      targetCorpus = Math.round(annualWithdrawalAtRetirement * factor);
    }

    // 3. Future Value of Current Savings
    const fvCurrentSavings = Math.round(
      currentSavings * Math.pow(1 + monthlyRatePre, retirementMonths)
    );

    // 4. Shortfall
    const shortfall = Math.max(0, targetCorpus - fvCurrentSavings);

    // 5. Required Monthly SIP to cover Shortfall
    let requiredSIP = 0;
    if (shortfall > 0 && retirementMonths > 0) {
      if (monthlyRatePre === 0) {
        requiredSIP = Math.round(shortfall / retirementMonths);
      } else {
        // SIP = FV / [ ((1+r)^n - 1)/r * (1+r) ]  (Annuity Due)
        const annuityFactor =
          ((Math.pow(1 + monthlyRatePre, retirementMonths) - 1) /
            monthlyRatePre) *
          (1 + monthlyRatePre);
        requiredSIP = Math.round(shortfall / annuityFactor);
      }
    }

    // 6. Pie Chart Data (Projected Corpus Breakdown)
    // Corpus comes from: FV of Existing Savings + FV of New SIPs
    // To visualize "How much you have" vs "Gap"
    const securedPct =
      targetCorpus > 0
        ? Math.min(100, Math.round((fvCurrentSavings / targetCorpus) * 100))
        : 0;
    const gapPct = 100 - securedPct;

    return {
      targetCorpus,
      monthlyExpenseAtRetirement,
      fvCurrentSavings,
      shortfall,
      requiredSIP,
      securedPct,
      gapPct,
      yearsToRetirement,
    };
  }, [
    currentAge,
    retirementAge,
    currentSavings,
    monthlyExpense,
    inflationPct,
    preRetireReturn,
    postRetireReturn,
  ]);

  // --- ACTIONS ---
  const handleReset = () => {
    setCurrentAge(30);
    setRetirementAge(60);
    setCurrentSavings(500000);
    setMonthlyExpense(30000);
    setInflationPct(6);
    setPreRetireReturn(12);
    setPostRetireReturn(8);
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
                  max={retirementAge - 1}
                />
              </div>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Retire Age</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={retirementAge}
                  onChange={numSetter(setRetirementAge)}
                  min={currentAge + 1}
                  max={100}
                />
              </div>
            </div>
          </div>

          {/* Current Financials */}
          <div className="input-group">
            <label>Current Monthly Expense (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={monthlyExpense}
                onChange={numSetter(setMonthlyExpense)}
              />
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={monthlyExpense}
              onChange={numSetter(setMonthlyExpense)}
              style={{
                background: getRangeBackground(monthlyExpense, 10000, 500000),
              }}
            />
          </div>

          <div className="input-group">
            <label>Current Savings (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={currentSavings}
                onChange={numSetter(setCurrentSavings)}
              />
            </div>
            <input
              type="range"
              min="0"
              max="10000000"
              step="50000"
              value={currentSavings}
              onChange={numSetter(setCurrentSavings)}
              style={{
                background: getRangeBackground(currentSavings, 0, 10000000),
              }}
            />
          </div>

          {/* Advanced Rates */}
          <details open className="advanced-options" style={{ marginTop: 16 }}>
            <summary
              style={{
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              Advanced Rates (Inflation, Returns)
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
                <label>Pre-Retire Return (%)</label>
                <input
                  className="input-small"
                  type="number"
                  value={preRetireReturn}
                  onChange={numSetter(setPreRetireReturn)}
                  step="0.1"
                />
              </div>
              <div className="input-group">
                <label>Post-Retire Return (%)</label>
                <input
                  className="input-small"
                  type="number"
                  value={postRetireReturn}
                  onChange={numSetter(setPostRetireReturn)}
                  step="0.1"
                />
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
            principalPct={results.securedPct} // Represents "Secured" by current savings
            interestPct={results.gapPct} // Represents "Gap" to be filled
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result: Target Corpus */}
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Target Retirement Corpus
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(results.targetCorpus)}
              </div>
            </div>

            {/* Main Result: Monthly SIP Needed */}
            <div
              style={{
                marginBottom: 16,
                padding: 12,
                background: '#f3e8ff',
                borderRadius: 8,
                border: '1px solid #d8b4fe',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 12, color: '#7e22ce', fontWeight: 600 }}>
                SIP Needed to Bridge Gap
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#6b21a8' }}>
                {formatINR(results.requiredSIP)}
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
                <div style={{ color: '#64748b' }}>Expense at 60</div>
                <div style={{ fontWeight: 600, color: '#dc2626' }}>
                  {formatINR(Math.round(results.monthlyExpenseAtRetirement))}
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
                <div style={{ color: '#64748b' }}>Current Savings FV</div>
                <div style={{ fontWeight: 600, color: '#16a34a' }}>
                  {formatINR(results.fvCurrentSavings)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
