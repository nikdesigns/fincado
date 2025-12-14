'use client';

import React, { useMemo, useState } from 'react';

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function GSTClient() {
  // --- STATE ---
  const [amount, setAmount] = useState<number>(10000); // Base or Total Amount
  const [gstRate, setGstRate] = useState<number>(18);
  const [mode, setMode] = useState<'add' | 'remove'>('add'); // 'add' = Exclusive -> Inclusive

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Blue theme for Tax
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    let netPrice = 0;
    let gstAmount = 0;
    let grossPrice = 0;

    if (mode === 'add') {
      // Input is Net Price (Exclusive)
      netPrice = amount;
      gstAmount = amount * (gstRate / 100);
      grossPrice = netPrice + gstAmount;
    } else {
      // Input is Gross Price (Inclusive)
      grossPrice = amount;
      netPrice = amount / (1 + gstRate / 100);
      gstAmount = grossPrice - netPrice;
    }

    // Split for CGST/SGST (Half each)
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;

    return {
      netPrice: Math.round(netPrice),
      gstAmount: Math.round(gstAmount),
      grossPrice: Math.round(grossPrice),
      cgst: Math.round(cgst),
      sgst: Math.round(sgst),
    };
  }, [amount, gstRate, mode]);

  // --- ACTIONS ---
  const handleReset = () => {
    setAmount(10000);
    setGstRate(18);
    setMode('add');
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
          {/* Mode Selection */}
          <div className="input-group">
            <label>Calculation Mode</label>
            <div
              className="input-wrapper"
              style={{ padding: 4, background: '#f1f5f9' }}
            >
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  type="button"
                  onClick={() => setMode('add')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 4,
                    border: 'none',
                    background: mode === 'add' ? '#fff' : 'transparent',
                    fontWeight: mode === 'add' ? 600 : 400,
                    boxShadow:
                      mode === 'add' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  Add GST (Exclusive)
                </button>
                <button
                  type="button"
                  onClick={() => setMode('remove')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 4,
                    border: 'none',
                    background: mode === 'remove' ? '#fff' : 'transparent',
                    fontWeight: mode === 'remove' ? 600 : 400,
                    boxShadow:
                      mode === 'remove' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  Remove GST (Inclusive)
                </button>
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="input-group">
            <label>
              {mode === 'add' ? 'Net Price (Pre-Tax)' : 'Gross Price (MRP)'} (₹)
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                value={amount}
                onChange={numSetter(setAmount)}
              />
            </div>
            <input
              type="range"
              min="100"
              max="1000000"
              step="100"
              value={amount}
              onChange={numSetter(setAmount)}
              style={{ background: getRangeBackground(amount, 100, 1000000) }}
            />
          </div>

          {/* GST Rate */}
          <div className="input-group">
            <label>GST Rate (%)</label>
            <div className="input-wrapper">
              <select
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <option value="0.25">0.25% (Rough Diamonds)</option>
                <option value="3">3% (Gold/Silver)</option>
                <option value="5">5% (Essentials)</option>
                <option value="12">12% (Standard 1)</option>
                <option value="18">18% (Standard 2 - Services)</option>
                <option value="28">28% (Luxury/Sin Goods)</option>
              </select>
            </div>
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
              }}
            >
              {[5, 12, 18, 28].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setGstRate(r)}
                  style={{
                    padding: '4px 10px',
                    fontSize: 12,
                    borderRadius: 12,
                    border: '1px solid #ddd',
                    background: gstRate === r ? '#eff6ff' : '#fff',
                    color: gstRate === r ? '#1d4ed8' : '#333',
                    cursor: 'pointer',
                  }}
                >
                  {r}%
                </button>
              ))}
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
          {/* No Pie Chart needed for GST usually, simple breakdown is clearer */}

          <div
            style={{
              width: '100%',
              padding: '20px',
              background: '#f8fafc',
              borderRadius: 12,
              textAlign: 'center',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>
              {mode === 'add' ? 'Final Gross Price' : 'Calculated Net Price'}
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: 'var(--color-brand-green)',
              }}
            >
              {formatINR(
                mode === 'add' ? results.grossPrice : results.netPrice
              )}
            </div>
          </div>

          <div style={{ marginTop: 24, width: '100%' }}>
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
                  padding: 10,
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b' }}>Total GST</div>
                <div style={{ fontWeight: 600, color: '#dc2626' }}>
                  {formatINR(results.gstAmount)}
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
                <div style={{ color: '#64748b' }}>Original Base</div>
                <div style={{ fontWeight: 600 }}>
                  {formatINR(results.netPrice)}
                </div>
              </div>
            </div>

            {/* Split Breakdown */}
            <div
              style={{
                marginTop: 12,
                padding: 10,
                background: '#fff',
                borderRadius: 8,
                border: '1px solid #e2e8f0',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: '#64748b',
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                Tax Split (Intra-State)
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  marginBottom: 4,
                }}
              >
                <span>CGST ({gstRate / 2}%)</span>
                <span>{formatINR(results.cgst)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 13,
                }}
              >
                <span>SGST ({gstRate / 2}%)</span>
                <span>{formatINR(results.sgst)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p
        style={{
          fontSize: 12,
          color: '#475569',
          paddingLeft: 20,
          marginTop: 10,
        }}
      >
        *This calculator is for informational purposes only. For filing GST
        returns or compliance decisions, consult a tax professional.
      </p>
    </div>
  );
}
