'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

// 1. Define Labels Interface
interface LabelConfig {
  girlAge: string;
  depositFreq: string;
  monthlyInv: string;
  yearlyInv: string;
  rate: string;
  maturityVal: string;
  totalInv: string;
  totalInt: string;
  infoText: string;
}

interface SSYClientProps {
  labels?: LabelConfig;
}

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function SSYClient({ labels }: SSYClientProps) {
  // --- STATE ---
  const [currentAge, setCurrentAge] = useState<number>(5);
  const [depositMode, setDepositMode] = useState<'monthly' | 'yearly'>(
    'monthly'
  );
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [yearlyDeposit, setYearlyDeposit] = useState<number>(60000);
  const [startYear] = useState<number>(new Date().getFullYear());
  const [annualRate, setAnnualRate] = useState<number>(8.2);

  // 2. Default Labels (English)
  const t = labels || {
    girlAge: "Girl's Current Age (Years)",
    depositFreq: 'Deposit Frequency',
    monthlyInv: 'Monthly Investment (₹)',
    yearlyInv: 'Yearly Investment (₹)',
    rate: 'Interest Rate (% p.a)',
    maturityVal: 'Maturity Value (Tax Free)',
    totalInv: 'Total Investment',
    totalInt: 'Total Interest',
    infoText: 'Account can be opened until age 10.',
  };

  // --- HELPER ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATION LOGIC ---
  const results = useMemo(() => {
    const maturityYear = 21;
    const depositPeriod = 15;
    const rate = annualRate / 100;
    let balance = 0;
    let totalInvested = 0;

    const annualInvestment =
      depositMode === 'monthly' ? monthlyDeposit * 12 : yearlyDeposit;

    for (let i = 1; i <= maturityYear; i++) {
      let investmentThisYear = 0;
      if (i <= depositPeriod) {
        investmentThisYear = annualInvestment;
      }
      balance += investmentThisYear;
      totalInvested += investmentThisYear;
      const interest = balance * rate;
      balance += interest;
    }

    const maturityAmount = Math.round(balance);
    const totalInterest = maturityAmount - totalInvested;

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

  // Actions
  const handleReset = () => {
    setCurrentAge(5);
    setDepositMode('monthly');
    setMonthlyDeposit(5000);
    setYearlyDeposit(60000);
    setAnnualRate(8.2);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numSetter = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* --- INPUTS --- */}
        <div className="calc-inputs">
          <div className="input-group">
            <label>{t.girlAge}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={currentAge}
                onChange={numSetter(setCurrentAge)}
                max={10}
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
              {t.infoText}
            </div>
          </div>

          <div className="input-group">
            <label>{t.depositFreq}</label>
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
                }}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>
              {depositMode === 'monthly' ? t.monthlyInv : t.yearlyInv}
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
              min="250"
              max={depositMode === 'monthly' ? 12500 : 150000}
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
              min="7"
              max="9"
              step="0.1"
              value={annualRate}
              onChange={numSetter(setAnnualRate)}
              style={{ background: getRangeBackground(annualRate, 7, 9) }}
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

        {/* --- VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={results.investedPct}
            interestPct={results.interestPct}
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.maturityVal}
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
                Age {results.maturityAge}: Year {results.maturityYearDate}
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
                  {t.totalInt}
                </div>
                <div
                  style={{ fontWeight: 600, color: 'var(--color-brand-green)' }}
                >
                  +{formatINR(results.totalInterest)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
