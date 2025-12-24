// src/app/epf-calculator/EPFClient.tsx
'use client';

import React, { useMemo, useState, useRef } from 'react';
import PieChart from '@/components/PieChart';

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

// ✅ Interface for custom labels
interface EPFLabels {
  basicSalary: string;
  yourContribution: string;
  employerContribution: string;
  employmentPeriod: string;
  annualIncrease: string;
  currentInterestRate: string;
  resetDefaults: string;
  estimatedCorpus: string;
  yourShare: string;
  employerShare: string;
  totalInterest: string;
  yearlyGrowth: string;
  balanceAccumulation: string;
  exportCSV: string;
  year: string;
  youContrib: string;
  employerContrib: string;
  interest: string;
  balance: string;
}

const DEFAULT_LABELS: EPFLabels = {
  basicSalary: 'Monthly Basic Salary + DA (₹)',
  yourContribution: 'Your Contribution (%)',
  employerContribution: 'Employer Contrib (%)',
  employmentPeriod: 'Employment Period (Years)',
  annualIncrease: 'Expected Annual Increase (% p.a)',
  currentInterestRate: 'Current Interest Rate',
  resetDefaults: 'Reset Defaults',
  estimatedCorpus: 'Estimated EPF Corpus',
  yourShare: 'Your Share',
  employerShare: 'Employer Share',
  totalInterest: 'Total Interest Earned',
  yearlyGrowth: 'Yearly EPF Growth',
  balanceAccumulation: 'Balance accumulation over',
  exportCSV: 'Export CSV',
  year: 'Year',
  youContrib: 'You Contrib.',
  employerContrib: 'Employer Contrib.',
  interest: 'Interest',
  balance: 'Balance',
};

export default function EPFClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<EPFLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  // --- STATE ---
  const [basicSalary, setBasicSalary] = useState<number>(40000); // Monthly Basic + DA
  const [employeePct, setEmployeePct] = useState<number>(12); // Employee Contrib %
  const [employerPct, setEmployerPct] = useState<number>(12); // Employer Contrib %
  const [years, setYears] = useState<number>(20);
  const [annualRate, setAnnualRate] = useState<number>(8.25); // Current Rate
  const [includeBonus, setIncludeBonus] = useState<boolean>(false); // Placeholder for VPF logic

  const printRef = useRef<HTMLDivElement | null>(null);

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Blue/Teal theme for EPF
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS ---
  const calculation = useMemo(() => {
    const empMonthly = (basicSalary * employeePct) / 100;
    const erEPFMonthly = (basicSalary * 3.67) / 100;
    const totalMonthlyEPF = empMonthly + erEPFMonthly;

    let balance = 0;
    let totalEmployeeContrib = 0;
    let totalEmployerEPFContrib = 0;
    const schedule = [];

    for (let y = 1; y <= years; y++) {
      let interestEarnedThisYear = 0;
      const openingBal = balance;

      // Reset balance to opening for recalculation to be precise
      balance = openingBal;
      interestEarnedThisYear = 0;

      for (let m = 1; m <= 12; m++) {
        balance += totalMonthlyEPF;
        interestEarnedThisYear += (balance * (annualRate / 100)) / 12;
      }
      balance += interestEarnedThisYear;

      totalEmployeeContrib += empMonthly * 12;
      totalEmployerEPFContrib += erEPFMonthly * 12;

      schedule.push({
        year: y,
        empContrib: Math.round(empMonthly * 12),
        erContrib: Math.round(erEPFMonthly * 12),
        interest: Math.round(interestEarnedThisYear),
        balance: Math.round(balance),
      });
    }

    const maturityAmount = Math.round(balance);
    const totalInvested = Math.round(
      totalEmployeeContrib + totalEmployerEPFContrib
    );
    const totalInterest = maturityAmount - totalInvested;

    // Pie Data
    const principalPct = Math.round((totalInvested / maturityAmount) * 100);
    const interestPct = 100 - principalPct;

    return {
      maturityAmount,
      totalEmployeeContrib: Math.round(totalEmployeeContrib),
      totalEmployerEPFContrib: Math.round(totalEmployerEPFContrib),
      totalInterest,
      principalPct,
      interestPct,
      schedule,
    };
  }, [basicSalary, employeePct, years, annualRate]);

  // --- ACTIONS ---
  const handleReset = () => {
    setBasicSalary(40000);
    setEmployeePct(12);
    setEmployerPct(12);
    setYears(20);
    setAnnualRate(8.25);
  };

  const exportCSV = () => {
    const header = [
      `${t.year},${t.youContrib},${t.employerContrib},${t.interest},${t.balance}`,
    ];
    const lines = [header.join(',')].concat(
      calculation.schedule.map((r) =>
        [r.year, r.empContrib, r.erContrib, r.interest, r.balance].join(',')
      )
    );
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'epf-schedule.csv';
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
          {/* 1. Basic Salary */}
          <div className="input-group">
            <label>{t.basicSalary}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={basicSalary}
                onChange={numSetter(setBasicSalary)}
              />
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={basicSalary}
              onChange={numSetter(setBasicSalary)}
              style={{
                background: getRangeBackground(basicSalary, 10000, 500000),
              }}
            />
          </div>

          {/* 2. Contributions */}
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            <div className="input-group">
              <label>{t.yourContribution}</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={employeePct}
                  onChange={numSetter(setEmployeePct)}
                  max={100}
                />
              </div>
            </div>
            <div className="input-group">
              <label>{t.employerContribution}</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={employerPct}
                  onChange={numSetter(setEmployerPct)}
                  max={100}
                />
              </div>
            </div>
          </div>

          {/* 3. Tenure & Rate */}
          <div className="input-group">
            <label>{t.employmentPeriod}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={years}
                onChange={numSetter(setYears)}
              />
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={years}
              onChange={numSetter(setYears)}
              style={{ background: getRangeBackground(years, 5, 40) }}
            />
          </div>

          <div className="input-group">
            <label>{t.annualIncrease}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={annualRate}
                onChange={numSetter(setAnnualRate)}
                step="0.05"
              />
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              {t.currentInterestRate}: <strong>8.25%</strong>
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
            {t.resetDefaults}
          </button>
        </div>

        {/* --- RIGHT: VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={calculation.principalPct}
            interestPct={calculation.interestPct}
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.estimatedCorpus}
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(calculation.maturityAmount)}
              </div>
            </div>

            {/* Grid Breakdown */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                fontSize: 13,
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
                <div style={{ color: '#64748b' }}>{t.yourShare}</div>
                <div style={{ fontWeight: 600 }}>
                  {formatINR(calculation.totalEmployeeContrib)}
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
                <div style={{ color: '#64748b' }}>{t.employerShare}</div>
                <div style={{ fontWeight: 600 }}>
                  {formatINR(calculation.totalEmployerEPFContrib)}
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 8,
                padding: 8,
                background: '#fff',
                borderRadius: 6,
                border: '1px solid #e2e8f0',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#64748b', fontSize: 13 }}>
                {t.totalInterest}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  color: 'var(--color-brand-green)',
                  fontSize: 16,
                }}
              >
                +{formatINR(calculation.totalInterest)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SCHEDULE --- */}
      <div style={{ marginTop: 40 }}>
        <div className="table-header-row table-actions">
          <div>
            <h3>{t.yearlyGrowth}</h3>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
              {t.balanceAccumulation} {years}{' '}
              {t.year === 'वर्ष' ? 'वर्ष' : 'years'}
            </p>
          </div>
          <div className="table-actions">
            <button onClick={exportCSV} className="action-btn">
              {t.exportCSV}
            </button>
          </div>
        </div>

        <div
          className="schedule-wrapper"
          style={{ maxHeight: 300, overflowY: 'auto' }}
        >
          <table className="rate-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>{t.year}</th>
                <th style={{ textAlign: 'right' }}>{t.youContrib}</th>
                <th style={{ textAlign: 'right' }}>{t.employerContrib}</th>
                <th style={{ textAlign: 'right' }}>{t.interest}</th>
                <th style={{ textAlign: 'right' }}>{t.balance}</th>
              </tr>
            </thead>
            <tbody>
              {calculation.schedule.map((row) => (
                <tr
                  key={row.year}
                  style={{ borderBottom: '1px solid #f1f5f9' }}
                >
                  <td style={{ color: '#64748b' }}>{row.year}</td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(row.empContrib)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(row.erContrib)}
                  </td>
                  <td style={{ textAlign: 'right', color: '#0891b2' }}>
                    {formatINR(row.interest)}
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
