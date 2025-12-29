'use client';
import React, { useState, useMemo } from 'react';

interface Props {
  defaultSalary?: number;
}

export default function InlineTaxCalculator({
  defaultSalary = 1500000,
}: Props) {
  const [income, setIncome] = useState(defaultSalary);
  const [deductions, setDeductions] = useState(0);

  // Logic for Tax Calculation
  const { taxNew, taxOld } = useMemo(() => {
    // --- NEW REGIME (FY 2025-26) ---
    // Std Deduction: 75k
    const taxableNew = Math.max(0, income - 75000);
    let tNew = 0;

    // Slabs 2025-26
    const slabsNew = [
      { limit: 300000, rate: 0 },
      { limit: 700000, rate: 0.05 },
      { limit: 1000000, rate: 0.1 },
      { limit: 1200000, rate: 0.15 },
      { limit: 1500000, rate: 0.2 },
      { limit: Infinity, rate: 0.3 },
    ];

    const tempInc = taxableNew;
    let prevLimit = 0;

    for (let i = 0; i < slabsNew.length; i++) {
      const slab = slabsNew[i];
      if (tempInc > prevLimit) {
        const taxableAtThisSlab = Math.min(tempInc, slab.limit) - prevLimit;
        tNew += taxableAtThisSlab * slab.rate;
        prevLimit = slab.limit;
      }
    }

    // Rebate 87A New Regime (Income <= 12L? No, limit is 7L)
    if (taxableNew <= 700000) tNew = 0;

    // --- OLD REGIME ---
    // Std Deduction: 50k
    const taxableOld = Math.max(0, income - 50000 - deductions);
    let tOld = 0;

    const slabsOld = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.2 },
      { limit: Infinity, rate: 0.3 },
    ];

    const tempIncOld = taxableOld;
    let prevLimitOld = 0;

    for (let i = 0; i < slabsOld.length; i++) {
      const slab = slabsOld[i];
      if (tempIncOld > prevLimitOld) {
        const taxableAtThisSlab =
          Math.min(tempIncOld, slab.limit) - prevLimitOld;
        tOld += taxableAtThisSlab * slab.rate;
        prevLimitOld = slab.limit;
      }
    }

    // Rebate 87A Old Regime (Income <= 5L)
    if (taxableOld <= 500000) tOld = 0;

    // Add 4% Cess
    tNew = Math.round(tNew * 1.04);
    tOld = Math.round(tOld * 1.04);

    return { taxNew: tNew, taxOld: tOld };
  }, [income, deductions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const savings = taxOld - taxNew;
  const isNewBetter = savings >= 0;

  return (
    <div className="inline-calc-widget no-print">
      <div className="widget-header">
        <span>⚡</span> Quick Tax Check (FY 25-26)
      </div>

      <div className="widget-body">
        <div className="inputs-row">
          <div className="input-group">
            <label>Annual Salary (₹)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              step={50000}
            />
          </div>
          <div className="input-group">
            <label>Total Deductions (Old Regime)</label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(Number(e.target.value))}
              placeholder="e.g. 150000"
            />
            <small
              style={{
                color: '#94a3b8',
                fontSize: '11px',
                display: 'block',
                marginTop: '4px',
              }}
            >
              Includes 80C, 80D, HRA etc.
            </small>
          </div>
        </div>

        <div className="comparison-grid">
          <div className={`result-card ${isNewBetter ? 'winner' : 'loser'}`}>
            <span className="regime-label">New Regime Tax</span>
            <span className="tax-value">{formatCurrency(taxNew)}</span>
          </div>
          <div className={`result-card ${!isNewBetter ? 'winner' : 'loser'}`}>
            <span className="regime-label">Old Regime Tax</span>
            <span className="tax-value">{formatCurrency(taxOld)}</span>
          </div>
        </div>

        <div className="verdict-banner">
          {isNewBetter ? (
            <>
              New Regime saves you <strong>{formatCurrency(savings)}</strong> 🎉
            </>
          ) : (
            <>
              Old Regime saves you{' '}
              <strong>{formatCurrency(Math.abs(savings))}</strong> ✅
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .inline-calc-widget {
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          margin: 32px 0;
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
          font-family: var(--font-rubik), sans-serif;
        }
        .widget-header {
          background: #f0fdf4;
          color: #166534;
          padding: 12px 24px;
          font-weight: 700;
          font-size: 14px;
          border-bottom: 1px solid #dcfce7;
          display: flex;
          align-items: center;
          gap: 8px;
          text-transform: uppercase;
        }
        .widget-body {
          padding: 24px;
        }
        .inputs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (max-width: 640px) {
          .inputs-row {
            grid-template-columns: 1fr;
          }
        }
        .input-group label {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 8px;
          display: block;
        }
        .input-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
          background: #f8fafc;
        }
        .input-group input:focus {
          outline: 2px solid #16a34a;
          border-color: #16a34a;
          background: #fff;
        }
        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }
        .result-card {
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid transparent;
        }
        .result-card.winner {
          background: #f0fdf4;
          border-color: #bbf7d0;
          color: #166534;
        }
        .result-card.loser {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #94a3b8;
          opacity: 0.8;
        }
        .regime-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 4px;
          text-transform: uppercase;
        }
        .tax-value {
          font-size: 20px;
          font-weight: 800;
        }
        .verdict-banner {
          text-align: center;
          font-size: 15px;
          color: #0f172a;
          padding-top: 12px;
          border-top: 1px dashed #e2e8f0;
        }
        .verdict-banner strong {
          color: #16a34a;
        }
      `}</style>
    </div>
  );
}
