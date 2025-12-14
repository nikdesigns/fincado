// src/components/LoanComparison.tsx
'use client';

import React, { useState, useMemo } from 'react';

// Format Helper
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function LoanComparison() {
  // State for Loan A
  const [loanA, setLoanA] = useState({
    amount: 5000000,
    rate: 8.5,
    tenure: 20,
  });
  // State for Loan B
  const [loanB, setLoanB] = useState({
    amount: 5000000,
    rate: 9.0,
    tenure: 20,
  });

  // Calculation Helper
  const calculateLoan = (amount: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emi =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - amount;
    return { emi, totalInterest, totalPayment };
  };

  const resultsA = useMemo(
    () => calculateLoan(loanA.amount, loanA.rate, loanA.tenure),
    [loanA]
  );
  const resultsB = useMemo(
    () => calculateLoan(loanB.amount, loanB.rate, loanB.tenure),
    [loanB]
  );

  const difference = Math.abs(resultsA.totalPayment - resultsB.totalPayment);
  const winner =
    resultsA.totalPayment < resultsB.totalPayment ? 'Loan A' : 'Loan B';

  const handleChange = (loan: 'A' | 'B', field: string, value: number) => {
    if (loan === 'A') setLoanA({ ...loanA, [field]: value });
    else setLoanB({ ...loanB, [field]: value });
  };

  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
      <div
        style={{
          background: '#f2fce9',
          padding: '20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h3 style={{ color: '#000', margin: 0 }}>Loan Comparison Tool</h3>
        <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '14px' }}>
          Compare two offers to see your savings
        </p>
      </div>

      <div
        className="calc-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        {/* --- LOAN A INPUTS --- */}
        <div style={{ padding: '24px', borderRight: '1px solid #e2e8f0' }}>
          <h4
            style={{ color: 'var(--color-brand-green)', marginBottom: '16px' }}
          >
            Loan Option A
          </h4>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div>
              <label style={{ fontSize: '12px' }}>Loan Amount</label>
              <input
                type="number"
                value={loanA.amount}
                onChange={(e) =>
                  handleChange('A', 'amount', Number(e.target.value))
                }
              />
            </div>
            <div>
              <label style={{ fontSize: '12px' }}>Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={loanA.rate}
                onChange={(e) =>
                  handleChange('A', 'rate', Number(e.target.value))
                }
              />
            </div>
            <div>
              <label style={{ fontSize: '12px' }}>Tenure (Years)</label>
              <input
                type="number"
                value={loanA.tenure}
                onChange={(e) =>
                  handleChange('A', 'tenure', Number(e.target.value))
                }
              />
            </div>
          </div>
        </div>

        {/* --- LOAN B INPUTS --- */}
        <div style={{ padding: '24px', background: '#f8fafc' }}>
          <h4 style={{ color: '#64748b', marginBottom: '16px' }}>
            Loan Option B
          </h4>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div>
              <label style={{ fontSize: '12px' }}>Loan Amount</label>
              <input
                type="number"
                value={loanB.amount}
                onChange={(e) =>
                  handleChange('B', 'amount', Number(e.target.value))
                }
              />
            </div>
            <div>
              <label style={{ fontSize: '12px' }}>Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={loanB.rate}
                onChange={(e) =>
                  handleChange('B', 'rate', Number(e.target.value))
                }
              />
            </div>
            <div>
              <label style={{ fontSize: '12px' }}>Tenure (Years)</label>
              <input
                type="number"
                value={loanB.tenure}
                onChange={(e) =>
                  handleChange('B', 'tenure', Number(e.target.value))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- RESULTS COMPARISON --- */}
      <div style={{ padding: '24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          {/* Result A */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: '#64748b' }}>
              Monthly EMI
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: resultsA.emi < resultsB.emi ? '#16a34a' : '#0f172a',
              }}
            >
              {formatINR(resultsA.emi)}
            </div>
            <div
              style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}
            >
              Interest: {formatINR(resultsA.totalInterest)}
            </div>
          </div>

          {/* Result B */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: '#64748b' }}>
              Monthly EMI
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: resultsB.emi < resultsA.emi ? '#16a34a' : '#0f172a',
              }}
            >
              {formatINR(resultsB.emi)}
            </div>
            <div
              style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}
            >
              Interest: {formatINR(resultsB.totalInterest)}
            </div>
          </div>
        </div>

        {/* VERDICT */}
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <strong
            style={{ color: '#166534', display: 'block', fontSize: '18px' }}
          >
            🏆 {winner} is better!
          </strong>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#14532d' }}>
            You save <strong>{formatINR(difference)}</strong> in total repayment
            by choosing this option.
          </p>
        </div>
      </div>
    </div>
  );
}
