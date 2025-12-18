'use client';

import React, { useState, useMemo } from 'react';
import PieChart from '@/components/PieChart';

// 1. Define Labels
interface LabelConfig {
  monthlyDeposit: string;
  rate: string;
  years: string;
  months: string;
  maturityAmount: string;
  totalInv: string;
  grossInt: string;
  netInt: string;
  taxDeducted: string;
  advancedParams: string;
  taxRate: string;
  ignoreTax: string;
}

interface RDClientProps {
  labels?: LabelConfig;
}

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function RDClient({ labels }: RDClientProps) {
  // --- STATE ---
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [rate, setRate] = useState<number>(7.0);
  const [years, setYears] = useState<number>(3);
  const [months, setMonths] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(10);
  const [showGrossOnly, setShowGrossOnly] = useState<boolean>(false);

  // 2. Default Labels
  const t = labels || {
    monthlyDeposit: 'Monthly Deposit (₹)',
    rate: 'Interest Rate (% p.a)',
    years: 'Years',
    months: 'Months',
    maturityAmount: 'Maturity Amount',
    totalInv: 'Total Investment',
    grossInt: 'Gross Int.',
    netInt: 'Net Int.',
    taxDeducted: 'Tax Deducted',
    advancedParams: 'Advanced Options (Tax)',
    taxRate: 'Tax Rate (%)',
    ignoreTax: 'Show Gross Interest (Ignore Tax)',
  };

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  const handleReset = () => {
    setMonthlyDeposit(5000);
    setRate(7.0);
    setYears(3);
    setMonths(0);
    setTaxRate(10);
    setShowGrossOnly(false);
  };

  const results = useMemo(() => {
    const totalMonths = years * 12 + months;
    const r = rate / 100;
    const n = 4; // Quarterly compounding

    let maturityAmount = 0;

    if (rate === 0) {
      maturityAmount = monthlyDeposit * totalMonths;
    } else {
      for (let i = 0; i < totalMonths; i++) {
        const monthsRemaining = totalMonths - i;
        const t = monthsRemaining / 12;
        const installmentMaturity = monthlyDeposit * Math.pow(1 + r / n, n * t);
        maturityAmount += installmentMaturity;
      }
    }

    const totalInvestment = monthlyDeposit * totalMonths;
    const totalInterest = maturityAmount - totalInvestment;

    let taxCalc = 0;
    if (!showGrossOnly && taxRate > 0) {
      taxCalc = (totalInterest * taxRate) / 100;
    }

    const netInterest = totalInterest - taxCalc;
    const finalMaturity = totalInvestment + netInterest;

    const principalPct =
      totalInvestment > 0
        ? Math.round((totalInvestment / finalMaturity) * 100)
        : 0;
    const interestPct = 100 - principalPct;

    return {
      maturity: Math.round(finalMaturity),
      investment: Math.round(totalInvestment),
      interest: Math.round(netInterest),
      tax: Math.round(taxCalc),
      principalPct,
      interestPct,
    };
  }, [monthlyDeposit, rate, years, months, taxRate, showGrossOnly]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numSetter = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        <div className="calc-inputs">
          {/* Monthly Deposit */}
          <div className="input-group">
            <label>{t.monthlyDeposit}</label>
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

          {/* Rate */}
          <div className="input-group">
            <label>{t.rate}</label>
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

          {/* Tenure */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>{t.years}</label>
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
              <label>{t.months}</label>
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

          {/* Advanced Tax */}
          <details className="advanced-options" style={{ marginTop: 16 }}>
            <summary
              style={{
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              {t.advancedParams}
            </summary>
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div className="input-group">
                <label>{t.taxRate}</label>
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
                  {t.ignoreTax}
                </label>
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
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              fontSize: 13,
              width: 'fit-content',
            }}
          >
            Reset Defaults
          </button>
        </div>

        <div className="calc-visuals">
          <PieChart
            principalPct={results.principalPct}
            interestPct={results.interestPct}
            size={200}
          />
          <div style={{ marginTop: 24, width: '100%' }}>
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.maturityAmount}
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green, #6366f1)',
                }}
              >
                {formatINR(results.maturity)}
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
                  {showGrossOnly ? t.grossInt : t.netInt}
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    color: 'var(--color-brand-green, #6366f1)',
                  }}
                >
                  +{formatINR(results.interest)}
                </div>
              </div>
            </div>
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
                {t.taxDeducted}: <strong>-{formatINR(results.tax)}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
