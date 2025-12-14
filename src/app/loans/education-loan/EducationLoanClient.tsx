// src/app/loans/education-loan/EducationLoanClient.tsx
'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function EducationLoanClient() {
  // --- STATE ---
  const [loanAmount, setLoanAmount] = useState(1000000); // 10 Lakhs
  const [rate, setRate] = useState(10.5); // 10.5% Avg
  const [repayYears, setRepayYears] = useState(10); // 10 Years
  const [moratoriumMonths, setMoratoriumMonths] = useState(24); // 2 Years Study
  const [payInterestDuringMoratorium, setPayInterestDuringMoratorium] =
    useState(false); // Mode

  // --- LOGIC ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  const calculations = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const repayMonths = repayYears * 12;

    // 1. Calculate Interest during Moratorium
    // Simple Interest Formula usually applies during moratorium for capitalization
    const moratoriumInterest = Math.round(
      loanAmount * (rate / 100) * (moratoriumMonths / 12)
    );

    let principalAtRepaymentStart = loanAmount;

    if (!payInterestDuringMoratorium) {
      // Capitalize interest if not paid
      principalAtRepaymentStart += moratoriumInterest;
    }

    // 2. Calculate EMI based on New Principal
    let emi = 0;
    if (principalAtRepaymentStart > 0) {
      if (rate === 0) emi = principalAtRepaymentStart / repayMonths;
      else
        emi =
          (principalAtRepaymentStart *
            monthlyRate *
            Math.pow(1 + monthlyRate, repayMonths)) /
          (Math.pow(1 + monthlyRate, repayMonths) - 1);
    }

    const totalRepayment = emi * repayMonths;
    const totalInterest =
      totalRepayment -
      principalAtRepaymentStart +
      (payInterestDuringMoratorium ? moratoriumInterest : 0);

    // Interest % logic
    const totalCost =
      totalRepayment + (payInterestDuringMoratorium ? moratoriumInterest : 0);
    const interestPct =
      totalCost > 0 ? Math.round((totalInterest / totalCost) * 100) : 0;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalCost),
      moratoriumInterest: Math.round(moratoriumInterest),
      interestPct,
      principalPct: 100 - interestPct,
      months: repayMonths,
      principalAtRepaymentStart,
    };
  }, [
    loanAmount,
    rate,
    repayYears,
    moratoriumMonths,
    payInterestDuringMoratorium,
  ]);

  const schedule = useMemo(() => {
    let balance = calculations.principalAtRepaymentStart;
    const monthlyRate = rate / 12 / 100;
    const data = [];
    const emiVal = calculations.emi;

    for (let i = 1; i <= calculations.months; i++) {
      const interest = balance * monthlyRate;
      let principal = emiVal - interest;
      if (balance - principal < 0) principal = balance;
      balance -= principal;

      if (i <= 120) {
        // Limit rows
        data.push({
          month: i,
          principal,
          interest,
          balance: Math.max(0, balance),
        });
      }
    }
    return data;
  }, [calculations, rate]);

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
    link.download = 'education_loan_schedule.csv';
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
          <div className="input-group">
            <label>Loan Amount (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={loanAmount}
                onChange={safeSet(setLoanAmount)}
              />
            </div>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="50000"
              value={loanAmount}
              onChange={safeSet(setLoanAmount)}
              style={{
                background: getRangeBackground(loanAmount, 100000, 10000000),
              }}
            />
          </div>

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
              min="6"
              max="18"
              step="0.1"
              value={rate}
              onChange={safeSet(setRate)}
              style={{ background: getRangeBackground(rate, 6, 18) }}
            />
          </div>

          <div className="input-group">
            <label>Course Moratorium (Months)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={moratoriumMonths}
                onChange={safeSet(setMoratoriumMonths)}
              />
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="1"
              value={moratoriumMonths}
              onChange={safeSet(setMoratoriumMonths)}
              style={{
                background: getRangeBackground(moratoriumMonths, 0, 60),
              }}
            />
          </div>

          <div className="input-group">
            <label>Repayment Tenure (Years)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={repayYears}
                onChange={safeSet(setRepayYears)}
              />
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={repayYears}
              onChange={safeSet(setRepayYears)}
              style={{ background: getRangeBackground(repayYears, 1, 15) }}
            />
          </div>

          {/* Toggle for Interest Payment */}
          <div
            className="input-group"
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <input
              type="checkbox"
              id="payInterest"
              checked={payInterestDuringMoratorium}
              onChange={(e) => setPayInterestDuringMoratorium(e.target.checked)}
              style={{ width: 'auto', marginTop: 0 }}
            />
            <label
              htmlFor="payInterest"
              style={{ marginBottom: 0, fontWeight: 500, cursor: 'pointer' }}
            >
              Pay Interest during Moratorium?
            </label>
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
                gridTemplateColumns: '1fr',
                gap: 8,
                fontSize: 13,
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              <div style={{ color: '#64748b' }}>
                {payInterestDuringMoratorium
                  ? `✅ You save interest on principal!`
                  : `⚠️ Interest of ${formatINR(
                      calculations.moratoriumInterest
                    )} added to principal`}
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
                  Principal + Cap.
                </div>
                <div style={{ fontWeight: 600 }}>
                  {formatINR(calculations.principalAtRepaymentStart)}
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
            <h3>Repayment Schedule</h3>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
              Starts after moratorium period
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
          Showing first 10 years. Download CSV for full timeline.
        </div>
      </div>
    </div>
  );
}
