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

export default function SSYClient() {
  // --- STATE ---
  const [currentAge, setCurrentAge] = useState<number>(5); // Girl's age
  const [depositMode, setDepositMode] = useState<'monthly' | 'yearly'>(
    'monthly'
  );
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [yearlyDeposit, setYearlyDeposit] = useState<number>(60000);
  const [startYear] = useState<number>(new Date().getFullYear());
  const [annualRate, setAnnualRate] = useState<number>(8.2); // Default SSY Rate

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Pink/Rose theme for SSY
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATION LOGIC ---
  const results = useMemo(() => {
    // SSY Rules:
    // Maturity at 21 years from opening.
    // Deposits allowed for 15 years from opening.
    // Rate is compounded annually.

    const maturityYear = 21;
    const depositPeriod = 15;
    const rate = annualRate / 100;
    let balance = 0;
    let totalInvested = 0;

    const annualInvestment =
      depositMode === 'monthly' ? monthlyDeposit * 12 : yearlyDeposit;

    // Simulation loop for 21 years
    for (let i = 1; i <= maturityYear; i++) {
      let investmentThisYear = 0;

      // Deposits only happen for first 15 years
      if (i <= depositPeriod) {
        investmentThisYear = annualInvestment;
      }

      // Add investment to balance
      balance += investmentThisYear;
      totalInvested += investmentThisYear;

      // Add Interest (Compounded Annually)
      const interest = balance * rate;
      balance += interest;
    }

    const maturityAmount = Math.round(balance);
    const totalInterest = maturityAmount - totalInvested;

    // Pie Chart Data
    const investedPct =
      maturityAmount > 0
        ? Math.round((totalInvested / maturityAmount) * 100)
        : 0;
    const interestPct = 100 - investedPct;

    return {
      maturityAmount,
      totalInvested,
      totalInterest,
      investedPct,
      interestPct,
      maturityAge: currentAge + 21,
      maturityYearDate: startYear + 21,
    };
  }, [
    depositMode,
    monthlyDeposit,
    yearlyDeposit,
    annualRate,
    currentAge,
    startYear,
  ]);

  // --- ACTIONS ---
  const handleReset = () => {
    setCurrentAge(5);
    setDepositMode('monthly');
    setMonthlyDeposit(5000);
    setYearlyDeposit(60000);
    setAnnualRate(8.2);
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
          {/* 1. Girl's Age */}
          <div className="input-group">
            <label>Girl&apos;s Current Age (Years)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={currentAge}
                onChange={numSetter(setCurrentAge)}
                max={10} // SSY only openable till age 10
              />
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={currentAge}
              onChange={numSetter(setCurrentAge)}
              style={{ background: getRangeBackground(currentAge, 0, 10) }}
            />
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              Account can be opened until age 10.
            </div>
          </div>

          {/* 2. Deposit Mode */}
          <div className="input-group">
            <label>Deposit Frequency</label>
            <div className="input-wrapper">
              <select
                value={depositMode}
                onChange={(e) =>
                  setDepositMode(e.target.value as 'monthly' | 'yearly')
                }
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* 3. Investment Amount */}
          <div className="input-group">
            <label>
              {depositMode === 'monthly'
                ? 'Monthly Investment (₹)'
                : 'Yearly Investment (₹)'}
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                value={
                  depositMode === 'monthly' ? monthlyDeposit : yearlyDeposit
                }
                onChange={numSetter(
                  depositMode === 'monthly'
                    ? setMonthlyDeposit
                    : setYearlyDeposit
                )}
              />
            </div>
            <input
              type="range"
              min={depositMode === 'monthly' ? 250 : 250}
              max={depositMode === 'monthly' ? 12500 : 150000} // Capped at 1.5L/yr
              step={depositMode === 'monthly' ? 250 : 1000}
              value={depositMode === 'monthly' ? monthlyDeposit : yearlyDeposit}
              onChange={numSetter(
                depositMode === 'monthly' ? setMonthlyDeposit : setYearlyDeposit
              )}
              style={{
                background: getRangeBackground(
                  depositMode === 'monthly' ? monthlyDeposit : yearlyDeposit,
                  250,
                  depositMode === 'monthly' ? 12500 : 150000
                ),
              }}
            />
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              Max investment: ₹1.5 Lakh per year
            </div>
          </div>

          {/* 4. Interest Rate */}
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
              min="7"
              max="9"
              step="0.1"
              value={annualRate}
              onChange={numSetter(setAnnualRate)}
              style={{ background: getRangeBackground(annualRate, 7, 9) }}
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
          <PieChart
            principalPct={results.investedPct}
            interestPct={results.interestPct}
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
                {formatINR(results.maturityAmount)}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                Matures in {results.maturityYearDate} (Age {results.maturityAge}
                )
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
                  {formatINR(results.totalInvested)}
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
                  +{formatINR(results.totalInterest)}
                </div>
              </div>
            </div>

            {/* Info Badge */}
            <div
              style={{
                marginTop: 16,
                padding: 8,
                background: '#fdf2f8',
                borderRadius: 6,
                textAlign: 'center',
                fontSize: 12,
                color: '#be185d',
              }}
            >
              Deposit Period: <strong>15 Years</strong> | Maturity:{' '}
              <strong>21 Years</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
