'use client';

import React, { useState, useMemo, useRef } from 'react';
import PieChart from '@/components/PieChart';

interface LabelConfig {
  modeLabel: string;
  monthlyInv: string;
  annualInv: string;
  rate: string;
  duration: string;
  maturity: string;
  totalInv: string;
  totalInt: string;
}

interface PPFClientProps {
  labels?: LabelConfig;
}

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function PPFClient({ labels }: PPFClientProps) {
  const [mode, setMode] = useState<'monthly' | 'annual'>('monthly');
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [annualContribution, setAnnualContribution] = useState<number>(12000);
  const [years, setYears] = useState<number>(15);
  const [annualRate, setAnnualRate] = useState<number>(7.1);

  // Default English Labels
  const t = labels || {
    modeLabel: 'Contribution Mode',
    monthlyInv: 'Monthly Investment (₹)',
    annualInv: 'Annual Investment (₹)',
    rate: 'Interest Rate (% p.a)',
    duration: 'Duration (Years)',
    maturity: 'Maturity Value (Tax Free)',
    totalInv: 'Total Investment',
    totalInt: 'Total Interest',
  };

  const max80CLimit = 150000;
  const printRef = useRef<HTMLDivElement | null>(null);

  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  const monthlyRate = annualRate / 12 / 100;
  const yearlyRate = annualRate / 100;
  const months = Math.max(1, Math.round(years * 12));

  const totalContributed = useMemo(() => {
    if (mode === 'monthly') return monthlyContribution * months;
    return annualContribution * years;
  }, [mode, monthlyContribution, annualContribution, months, years]);

  const maturity = useMemo(() => {
    if (mode === 'monthly') {
      if (monthlyContribution <= 0) return 0;
      const r = monthlyRate;
      const n = months;
      if (r === 0) return monthlyContribution * n;
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
  const principalPct =
    maturity === 0 ? 0 : Math.round((totalContributed / maturity) * 100);
  const interestPct = 100 - principalPct;
  const annualContributionForTax = useMemo(() => {
    const currentAnnual =
      mode === 'monthly' ? monthlyContribution * 12 : annualContribution;
    return Math.min(currentAnnual, max80CLimit);
  }, [mode, monthlyContribution, annualContribution, max80CLimit]);

  const handleReset = () => {
    setMode('monthly');
    setMonthlyContribution(1000);
    setAnnualContribution(12000);
    setYears(15);
    setAnnualRate(7.1);
  };

  const numSetter =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        <div className="calc-inputs">
          <div className="input-group">
            <label>{t.modeLabel}</label>
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

          <div className="input-group">
            <label>{mode === 'monthly' ? t.monthlyInv : t.annualInv}</label>
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
              min={500}
              max={mode === 'monthly' ? 12500 : 150000}
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
              min="4"
              max="12"
              step="0.1"
              value={annualRate}
              onChange={numSetter(setAnnualRate)}
              style={{ background: getRangeBackground(annualRate, 4, 12) }}
            />
          </div>

          <div className="input-group">
            <label>{t.duration}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={years}
                onChange={numSetter(setYears)}
                min={15}
              />
            </div>
            <input
              type="range"
              min="15"
              max="50"
              step="5"
              value={years}
              onChange={numSetter(setYears)}
              style={{ background: getRangeBackground(years, 15, 50) }}
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
            Reset
          </button>
        </div>

        <div className="calc-visuals">
          <PieChart
            principalPct={principalPct}
            interestPct={interestPct}
            size={200}
          />
          <div style={{ marginTop: 24, width: '100%' }}>
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.maturity}
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
                  {t.totalInt}
                </div>
                <div
                  style={{ fontWeight: 600, color: 'var(--color-brand-green)' }}
                >
                  +{formatINR(totalInterest)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
