'use client';
import React, { useState, useMemo } from 'react';

interface Props {
  defaultSip?: number;
  defaultRate?: number;
  defaultYears?: number;
}

export default function InlineSipCalculator({
  defaultSip = 43041, // Default fallback (matches 1 Cr in 10 Years)
  defaultRate = 12,
  defaultYears = 10,
}: Props) {
  // Initialize state with the passed props
  const [monthlyInvestment, setMonthlyInvestment] = useState(defaultSip);
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState(defaultYears);

  // ✅ Calculate result directly (Derived State)
  const result = useMemo(() => {
    const r = rate / 12 / 100; // Monthly rate
    const n = years * 12; // Total months

    if (rate === 0 || years === 0) {
      return monthlyInvestment * n;
    }

    const fv = ((monthlyInvestment * (Math.pow(1 + r, n) - 1)) / r) * (1 + r);
    return Math.round(fv);
  }, [monthlyInvestment, rate, years]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="inline-calc-widget no-print">
      {/* Header */}
      <div className="widget-header">
        <span>⚡</span> Quick Check: Verify the Math
      </div>

      <div className="widget-body">
        {/* Input Row */}
        <div className="inputs-row">
          <div className="input-group">
            <label>Monthly SIP (₹)</label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            />
          </div>
          <div className="input-group">
            <label>Return Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>
          <div className="input-group">
            <label>Years</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Result Display */}
        <div className="result-box">
          <div className="result-row">
            <span className="result-label">Invested:</span>
            <span className="result-val-small">
              {formatCurrency(monthlyInvestment * years * 12)}
            </span>
          </div>
          <div className="result-row main">
            <span className="result-label">Projected Corpus:</span>
            <span className="result-value">{formatCurrency(result)}</span>
          </div>
        </div>

        <p className="widget-note">
          *Change the values above to see how small tweaks affect your goal.
        </p>
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        .inline-calc-widget {
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          margin: 40px 0;
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
          font-family: var(--font-rubik), sans-serif;
        }
        .widget-header {
          background: #f0fdf4;
          color: #166534;
          padding: 12px 24px;
          font-weight: 700;
          font-size: 15px;
          border-bottom: 1px solid #dcfce7;
          display: flex;
          align-items: center;
          gap: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .widget-body {
          padding: 24px;
        }
        .inputs-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
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
          outline: none;
          transition: all 0.2s;
          background: #f8fafc;
        }
        .input-group input:focus {
          border-color: #16a34a;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }
        .result-box {
          background: #0f172a;
          color: white;
          padding: 20px 24px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .result-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .result-row.main {
          padding-top: 8px;
          border-top: 1px solid #334155;
          margin-top: 4px;
        }
        .result-label {
          font-size: 14px;
          color: #94a3b8;
        }
        .result-val-small {
          font-size: 14px;
          color: #cbd5e1;
          font-weight: 500;
        }
        .result-value {
          font-size: 24px;
          font-weight: 700;
          color: #4ade80;
        }
        .widget-note {
          font-size: 12px;
          color: #94a3b8;
          margin: 12px 0 0 0;
          text-align: center;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
