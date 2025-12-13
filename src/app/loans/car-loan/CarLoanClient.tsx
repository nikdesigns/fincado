// src/app/loans/car-loan/CarLoanClient.tsx
'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function CarLoanClient() {
  // --- STATE ---
  const [vehiclePrice, setVehiclePrice] = useState(1500000); // 15 Lakhs
  const [downPayment, setDownPayment] = useState(300000); // 3 Lakhs
  const [tradeInValue, setTradeInValue] = useState(0); // 0 Trade-in
  const [rate, setRate] = useState(9.5); // 9.5% Auto Loan
  const [tenure, setTenure] = useState(5); // 5 Years
  const [balloonPayment, setBalloonPayment] = useState(0); // Optional Balloon

  // Derived Loan Amount
  const loanAmount = Math.max(0, vehiclePrice - downPayment - tradeInValue);

  // --- LOGIC ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-action-cta) 0%, var(--color-action-cta) ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
  };

  const calculations = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    let emi = 0;

    // Standard EMI formula modified for Balloon Payment
    if (loanAmount > 0) {
      if (rate === 0) {
        emi = (loanAmount - balloonPayment) / months;
      } else {
        const presentValueBalloon =
          balloonPayment / Math.pow(1 + monthlyRate, months);
        const adjustablePrincipal = loanAmount - presentValueBalloon;
        emi =
          (adjustablePrincipal *
            monthlyRate *
            Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
      }
    }

    const totalPayment = emi * months + balloonPayment;
    const totalInterest = totalPayment - loanAmount;
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
  }, [loanAmount, rate, tenure, balloonPayment]);

  const schedule = useMemo(() => {
    let balance = loanAmount;
    const monthlyRate = rate / 12 / 100;
    const data = [];
    const emiVal = calculations.emi;

    if (loanAmount > 0) {
      for (let i = 1; i <= calculations.months; i++) {
        const interest = balance * monthlyRate;
        let principal = emiVal - interest;

        // Adjust for Balloon Payment in last month
        if (i === calculations.months) {
          principal = balance - balloonPayment;
        }

        if (balance - principal < 0 && balloonPayment === 0)
          principal = balance;

        balance -= principal;

        if (i <= 84) {
          // Car loans rarely exceed 7 years
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
  }, [loanAmount, rate, calculations, balloonPayment]);

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
    link.download = 'car_loan_schedule.csv';
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
            <label>Vehicle Price (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={vehiclePrice}
                onChange={safeSet(setVehiclePrice)}
              />
            </div>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="50000"
              value={vehiclePrice}
              onChange={safeSet(setVehiclePrice)}
              style={{
                background: getRangeBackground(vehiclePrice, 100000, 10000000),
              }}
            />
          </div>

          <div className="input-group">
            <label>Down Payment (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={downPayment}
                onChange={safeSet(setDownPayment)}
              />
            </div>
            <input
              type="range"
              min="0"
              max={vehiclePrice}
              step="10000"
              value={downPayment}
              onChange={safeSet(setDownPayment)}
              style={{
                background: getRangeBackground(downPayment, 0, vehiclePrice),
              }}
            />
          </div>

          <div className="input-group">
            <label>Trade-In Value (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={tradeInValue}
                onChange={safeSet(setTradeInValue)}
              />
            </div>
            <input
              type="range"
              min="0"
              max={vehiclePrice / 2}
              step="10000"
              value={tradeInValue}
              onChange={safeSet(setTradeInValue)}
              style={{
                background: getRangeBackground(
                  tradeInValue,
                  0,
                  vehiclePrice / 2
                ),
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
              min="5"
              max="20"
              step="0.1"
              value={rate}
              onChange={safeSet(setRate)}
              style={{ background: getRangeBackground(rate, 5, 20) }}
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
              max="10"
              step="1"
              value={tenure}
              onChange={safeSet(setTenure)}
              style={{ background: getRangeBackground(tenure, 1, 10) }}
            />
          </div>
        </div>

        {/* Visuals */}
        <div
          className="calc-visuals"
          style={{
            background: '#f8fafc',
            borderRadius: 16,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <PieChart
            principalPct={calculations.principalPct}
            interestPct={calculations.interestPct}
            size={200}
          />
          <div style={{ marginTop: 24, width: '100%' }}>
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
                <div style={{ fontWeight: 600 }}>{formatINR(loanAmount)}</div>
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
