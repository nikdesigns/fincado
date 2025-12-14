// src/app/loans/home-loan/HomeLoanClient.tsx
'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function HomeLoanClient() {
  const [amount, setAmount] = useState(5000000); // Default 50 Lakhs
  const [rate, setRate] = useState(8.5); // Default 8.5%
  const [tenure, setTenure] = useState(20); // Default 20 Years

  // Green Fill Helper
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-action-cta) 0%, var(--color-action-cta) ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
  };

  const calculations = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    let emi = 0;

    if (rate === 0) emi = amount / months;
    else
      emi =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

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

    for (let i = 1; i <= calculations.months; i++) {
      const interest = balance * monthlyRate;
      let principal = emiVal - interest;
      if (balance - principal < 0) principal = balance;
      balance -= principal;

      // Limit 360 months (30 years) for DOM performance
      if (i <= 360) {
        data.push({
          month: i,
          principal,
          interest,
          balance: Math.max(0, balance),
        });
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
    link.download = 'home_loan_schedule.csv';
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
      {/* 1. INPUTS */}
      <div className="calc-grid">
        <div
          className="calc-inputs"
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
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
              min="500000"
              max="50000000"
              step="100000"
              value={amount}
              onChange={safeSet(setAmount)}
              style={{
                background: getRangeBackground(amount, 500000, 50000000),
              }}
            />
          </div>

          <div className="input-group">
            <label>Interest Rate (% p.a)</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="0.05"
                value={rate}
                onChange={safeSet(setRate)}
              />
            </div>
            <input
              type="range"
              min="6"
              max="15"
              step="0.05"
              value={rate}
              onChange={safeSet(setRate)}
              style={{ background: getRangeBackground(rate, 6, 15) }}
            />
          </div>

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
              max="30"
              step="1"
              value={tenure}
              onChange={safeSet(setTenure)}
              style={{ background: getRangeBackground(tenure, 1, 30) }}
            />
          </div>
        </div>

        {/* 2. CHART */}
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

      {/* 3. TABLE SECTION */}
      <div style={{ marginTop: 40 }}>
        <div className="table-header-row table-actions">
          <div>
            <h3>Amortization Schedule</h3>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
              Yearly breakdown
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
