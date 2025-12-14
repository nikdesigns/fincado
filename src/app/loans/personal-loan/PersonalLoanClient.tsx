// src/app/loans/personal-loan/PersonalLoanClient.tsx
'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function PersonalLoanClient() {
  // --- STATE ---
  // Defaults suitable for Personal Loans (smaller amount, higher rate, shorter tenure)
  const [amount, setAmount] = useState(500000); // 5 Lakhs
  const [rate, setRate] = useState(11.0); // 11% (Avg PL Rate)
  const [tenure, setTenure] = useState(3); // 3 Years

  // --- LOGIC ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  const calculations = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    let emi = 0;

    if (amount > 0) {
      if (rate === 0) emi = amount / months;
      else
        emi =
          (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - amount;
    const interestPct =
      totalPayment > 0 ? Math.round((totalInterest / totalPayment) * 100) : 0;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      interestPct,
      principalPct: 100 - interestPct,
      months,
    };
  }, [amount, rate, tenure]);

  const schedule = useMemo(() => {
    let balance = amount;
    const monthlyRate = rate / 12 / 100;
    const data = [];
    const emiVal = calculations.emi;

    if (amount > 0) {
      for (let i = 1; i <= calculations.months; i++) {
        const interest = balance * monthlyRate;
        let principal = emiVal - interest;
        if (balance - principal < 0) principal = balance;
        balance -= principal;

        // Limit to 84 months (7 years is max for PL usually)
        if (i <= 84) {
          data.push({
            month: i,
            principal,
            interest,
            balance: Math.max(0, balance),
          });
        }
      }
    }
    return data;
  }, [amount, rate, calculations]);

  // --- ACTIONS ---
  const downloadCSV = () => {
    const headers = ['Month,Principal,Interest,Balance'];
    const rows = schedule.map(
      (r) =>
        `${r.month},${Math.round(r.principal)},${Math.round(
          r.interest
        )},${Math.round(r.balance)}`
    );
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = 'personal_loan_schedule.csv';
    link.click();
  };

  const copyToClipboard = () => {
    const text = schedule
      .map(
        (r) =>
          `${r.month}\t${Math.round(r.principal)}\t${Math.round(
            r.interest
          )}\t${Math.round(r.balance)}`
      )
      .join('\n');
    navigator.clipboard.writeText(
      `Month\tPrincipal\tInterest\tBalance\n${text}`
    );
    alert('Copied to clipboard!');
  };

  const printPage = () => window.print();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeSet = (setter: any) => (e: any) =>
    setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      {/* 1. INPUTS & CHART */}
      <div className="calc-grid">
        <div
          className="calc-inputs"
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          {/* Loan Amount */}
          <div className="input-group">
            <label>Loan Amount (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={amount}
                onChange={safeSet(setAmount)}
              />
            </div>
            <input
              type="range"
              min="50000"
              max="5000000"
              step="10000"
              value={amount}
              onChange={safeSet(setAmount)}
              style={{ background: getRangeBackground(amount, 50000, 5000000) }}
            />
          </div>

          {/* Interest Rate */}
          <div className="input-group">
            <label>Interest Rate (% p.a)</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={safeSet(setRate)}
              />
            </div>
            <input
              type="range"
              min="8"
              max="25"
              step="0.1"
              value={rate}
              onChange={safeSet(setRate)}
              style={{ background: getRangeBackground(rate, 8, 25) }}
            />
          </div>

          {/* Tenure */}
          <div className="input-group">
            <label>Tenure (Years)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={tenure}
                onChange={safeSet(setTenure)}
              />
            </div>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={tenure}
              onChange={safeSet(setTenure)}
              style={{ background: getRangeBackground(tenure, 1, 7) }}
            />
          </div>
        </div>

        {/* Visuals */}
        <div className="calc-visuals">
          <PieChart
            principalPct={calculations.principalPct}
            interestPct={calculations.interestPct}
            size={200}
          />
          <div style={{ marginTop: 24, width: '100%', textAlign: 'center' }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Monthly EMI
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(calculations.emi)}
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
                <div style={{ color: '#64748b', fontSize: 12 }}>Principal</div>
                <div style={{ fontWeight: 600 }}>{formatINR(amount)}</div>
              </div>
              <div
                style={{
                  padding: 10,
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b', fontSize: 12 }}>Interest</div>
                <div style={{ fontWeight: 600, color: '#dc2626' }}>
                  {formatINR(calculations.totalInterest)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TABLE */}
      <div style={{ marginTop: 40 }}>
        <div className="table-header-row table-actions">
          <div>
            <h3>Amortization Schedule</h3>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
              Monthly breakdown
            </p>
          </div>
          <div className="table-actions">
            <button onClick={copyToClipboard} className="action-btn">
              Copy
            </button>
            <button onClick={downloadCSV} className="action-btn">
              Export
            </button>
            <button onClick={printPage} className="action-btn">
              Print
            </button>
          </div>
        </div>

        <div className="schedule-wrapper">
          <table className="rate-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Month</th>
                <th style={{ textAlign: 'right' }}>Principal</th>
                <th style={{ textAlign: 'right' }}>Interest</th>
                <th style={{ textAlign: 'right' }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr
                  key={row.month}
                  style={{ borderBottom: '1px solid #f1f5f9' }}
                >
                  <td style={{ color: '#64748b' }}>{row.month}</td>
                  <td style={{ textAlign: 'right', fontWeight: 500 }}>
                    {formatINR(Math.round(row.principal))}
                  </td>
                  <td style={{ textAlign: 'right', color: '#dc2626' }}>
                    {formatINR(Math.round(row.interest))}
                  </td>
                  <td style={{ textAlign: 'right', color: '#0f172a' }}>
                    {formatINR(Math.round(row.balance))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          Showing first {schedule.length} months. Download CSV for full
          timeline.
        </div>
      </div>
    </div>
  );
}
