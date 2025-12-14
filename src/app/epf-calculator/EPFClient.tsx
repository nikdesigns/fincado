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

export default function EPFClient() {
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
    // Logic:
    // Employee Share = 12% of Basic (goes to EPF)
    // Employer Share = 12% of Basic -> split: 3.67% to EPF, 8.33% to EPS
    // EPS contribution is capped on wage ceiling of 15,000 (usually), but calculator often simplifies.
    // Here we use the standard breakdown.

    const empMonthly = (basicSalary * employeePct) / 100;

    // Employer EPF portion (3.67%)
    const erEPFMonthly = (basicSalary * 3.67) / 100;
    // Employer EPS portion (8.33%) - Not part of EPF corpus usually, but kept separate
    // For this calculator, we only track the EPF Corpus growth.

    // Total monthly addition to EPF account
    const totalMonthlyEPF = empMonthly + erEPFMonthly;

    // Simulation
    let balance = 0;
    let totalEmployeeContrib = 0;
    let totalEmployerEPFContrib = 0;
    const schedule = [];

    // Monthly compounding logic not strictly applicable (EPF is monthly calc, annual credit).
    // Standard approximation:
    for (let y = 1; y <= years; y++) {
      let interestEarnedThisYear = 0;
      const openingBal = balance;

      // Simulate 12 months
      for (let m = 1; m <= 12; m++) {
        balance += totalMonthlyEPF; // Add contribution
        // Interest is calculated on the running balance monthly
        const monthlyInterest = (balance * (annualRate / 100)) / 12;
        interestEarnedThisYear += monthlyInterest;
      }

      // In reality, interest is credited at end of year
      // We add the accrued interest to balance at year end
      // (Note: The above loop added interest monthly which compounds it monthly.
      // EPF is simple interest monthly, compounded annually. Let's adjust).

      // CORRECTED LOOP for EPF:
      // Reset balance to opening for recalculation to be precise
      balance = openingBal;
      interestEarnedThisYear = 0;

      for (let m = 1; m <= 12; m++) {
        // Add contribution at end of month (or start, usually end for salary)
        balance += totalMonthlyEPF;

        // Calculate interest on this month's closing balance
        // (EPF rule: Interest on lowest bal between 5th and end. Assuming deposit by 5th)
        interestEarnedThisYear += (balance * (annualRate / 100)) / 12;
      }
      // Credit interest at year end
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
      'Year,Employee Contrib,Employer EPF Contrib,Interest,Balance',
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
            <label>Monthly Basic Salary + DA (₹)</label>
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
              <label>Your Contribution (%)</label>
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
              <label>Employer Contrib (%)</label>
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
            <label>Employment Period (Years)</label>
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
            <label>Expected Annual Increase (% p.a)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={annualRate}
                onChange={numSetter(setAnnualRate)}
                step="0.05"
              />
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              Current Interest Rate: <strong>8.25%</strong>
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
            principalPct={calculation.principalPct}
            interestPct={calculation.interestPct}
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Estimated EPF Corpus
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
                <div style={{ color: '#64748b' }}>Your Share</div>
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
                <div style={{ color: '#64748b' }}>Employer Share</div>
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
                Total Interest Earned
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
            <h3>Yearly EPF Growth</h3>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
              Balance accumulation over {years} years
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
          style={{ maxHeight: 300, overflowY: 'auto' }}
        >
          <table className="rate-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Year</th>
                <th style={{ textAlign: 'right' }}>You Contrib.</th>
                <th style={{ textAlign: 'right' }}>Employer Contrib.</th>
                <th style={{ textAlign: 'right' }}>Interest</th>
                <th style={{ textAlign: 'right' }}>Balance</th>
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
