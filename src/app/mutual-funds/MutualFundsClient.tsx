/* eslint-disable react/no-unescaped-entities */
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

// Helper: Simple Pie for Allocation Visualization
// (We reuse the main PieChart but map the data format)
const AllocPieChart = ({
  slices,
}: {
  slices: { color: string; pct: number }[];
}) => {
  // Mapping to PieChart props: principalPct/interestPct isn't enough for 4 slices.
  // Assuming PieChart component can handle generic slices or we adapt.
  // For this specific complex chart, using a custom svg implementation here or adapting the existing one.
  // Since the instruction is "similar way", I'll implement a simple multi-slice donut here visually matching the design.

  const size = 220;
  const strokeWidth = 40;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedOffset = 0;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        margin: '0 auto',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {slices.map((slice, i) => {
          const strokeLength = (slice.pct / 100) * circumference;
          const offset = accumulatedOffset;
          // eslint-disable-next-line react-hooks/immutability
          accumulatedOffset += strokeLength;

          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${strokeLength} ${
                circumference - strokeLength
              }`}
              strokeDashoffset={-offset}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <span style={{ fontSize: '12px', color: '#6b7280' }}>Asset Mix</span>
      </div>
    </div>
  );
};

export default function MutualFundsClient() {
  // --- STATE ---
  const [monthlySIP, setMonthlySIP] = useState<number>(10000);
  const [lumpSumNow, setLumpSumNow] = useState<number>(100000);
  const [years, setYears] = useState<number>(10);
  const [inflationPct, setInflationPct] = useState<number>(6);

  // Allocations (0-100)
  const [equityPct, setEquityPct] = useState<number>(60);
  const [debtPct, setDebtPct] = useState<number>(30);
  const [goldPct, setGoldPct] = useState<number>(5);
  const [cashPct, setCashPct] = useState<number>(5);

  // Expected Returns (% p.a.)
  const [equityReturn, setEquityReturn] = useState<number>(12);
  const [debtReturn, setDebtReturn] = useState<number>(7);
  const [goldReturn, setGoldReturn] = useState<number>(6);
  const [cashReturn, setCashReturn] = useState<number>(4);

  const printRef = useRef<HTMLDivElement | null>(null);

  // --- ACTIONS ---
  const applyPreset = (type: 'conservative' | 'balanced' | 'growth') => {
    if (type === 'conservative') {
      setEquityPct(30);
      setDebtPct(50);
      setGoldPct(10);
      setCashPct(10);
    } else if (type === 'balanced') {
      setEquityPct(50);
      setDebtPct(35);
      setGoldPct(10);
      setCashPct(5);
    } else {
      setEquityPct(70);
      setDebtPct(20);
      setGoldPct(5);
      setCashPct(5);
    }
  };

  const handleReset = () => {
    setMonthlySIP(10000);
    setLumpSumNow(100000);
    setYears(10);
    applyPreset('balanced');
    setEquityReturn(12);
    setDebtReturn(7);
    setGoldReturn(6);
    setCashReturn(4);
    setInflationPct(6);
  };

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    const months = Math.round(years * 12);
    const totalAlloc = equityPct + debtPct + goldPct + cashPct || 1; // Avoid divide by zero

    // Normalize allocations to ratios (0-1)
    const alloc = {
      equity: equityPct / totalAlloc,
      debt: debtPct / totalAlloc,
      gold: goldPct / totalAlloc,
      cash: cashPct / totalAlloc,
    };

    // Calculate FV for each asset class
    // FV = FV_SIP + FV_LumpSum
    const calcFV = (ratio: number, rate: number) => {
      const monthlyRate = rate / 12 / 100;
      const sipAmount = monthlySIP * ratio;
      const lumpAmount = lumpSumNow * ratio;

      // SIP FV (Annuity Due)
      let fvSip = 0;
      if (monthlyRate === 0) fvSip = sipAmount * months;
      else
        fvSip =
          sipAmount *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);

      // LumpSum FV
      const fvLump = lumpAmount * Math.pow(1 + monthlyRate, months);

      return fvSip + fvLump;
    };

    const fvEquity = calcFV(alloc.equity, equityReturn);
    const fvDebt = calcFV(alloc.debt, debtReturn);
    const fvGold = calcFV(alloc.gold, goldReturn);
    const fvCash = calcFV(alloc.cash, cashReturn);

    const totalFutureValue = Math.round(fvEquity + fvDebt + fvGold + fvCash);
    const totalInvested = Math.round(monthlySIP * months + lumpSumNow);
    const totalReturns = totalFutureValue - totalInvested;

    // Blended Return (Approx weighted average)
    const blendedReturn = (
      equityReturn * alloc.equity +
      debtReturn * alloc.debt +
      goldReturn * alloc.gold +
      cashReturn * alloc.cash
    ).toFixed(1);

    // Inflation Adjustment
    const monthlyInflation = inflationPct / 12 / 100;
    const realValue = Math.round(
      totalFutureValue / Math.pow(1 + monthlyInflation, months)
    );

    // Pie Slices for Visualization (Future Value breakdown)
    const pieSlices = [
      {
        color: '#16a34a',
        pct: Math.round((fvEquity / totalFutureValue) * 100) || 0,
        label: 'Equity',
      }, // Green
      {
        color: '#3b82f6',
        pct: Math.round((fvDebt / totalFutureValue) * 100) || 0,
        label: 'Debt',
      }, // Blue
      {
        color: '#eab308',
        pct: Math.round((fvGold / totalFutureValue) * 100) || 0,
        label: 'Gold',
      }, // Yellow
      {
        color: '#94a3b8',
        pct: Math.round((fvCash / totalFutureValue) * 100) || 0,
        label: 'Cash',
      }, // Grey
    ];

    return {
      totalFutureValue,
      totalInvested,
      totalReturns,
      realValue,
      blendedReturn,
      pieSlices,
      fvEquity,
      fvDebt,
      fvGold,
      fvCash,
    };
  }, [
    monthlySIP,
    lumpSumNow,
    years,
    equityPct,
    debtPct,
    goldPct,
    cashPct,
    equityReturn,
    debtReturn,
    goldReturn,
    cashReturn,
    inflationPct,
  ]);

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
          {/* 1. Basic Inputs */}
          <div className="input-group">
            <label>Monthly SIP Amount (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={monthlySIP}
                onChange={numSetter(setMonthlySIP)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Lump Sum Investment (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={lumpSumNow}
                onChange={numSetter(setLumpSumNow)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Investment Horizon (Years)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={years}
                onChange={numSetter(setYears)}
              />
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={numSetter(setYears)}
              style={{
                background: `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${
                  (years / 40) * 100
                }%, var(--color-slider-grey) ${
                  (years / 40) * 100
                }%, var(--color-slider-grey) 100%)`,
              }}
            />
          </div>

          {/* 2. Allocation Presets */}
          <div style={{ marginTop: 24 }}>
            <label
              style={{
                fontSize: 14,
                fontWeight: 600,
                display: 'block',
                marginBottom: 8,
              }}
            >
              Asset Allocation Strategy
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => applyPreset('conservative')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #ddd',
                  borderRadius: 20,
                  background: '#fff',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Conservative
              </button>
              <button
                type="button"
                onClick={() => applyPreset('balanced')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #ddd',
                  borderRadius: 20,
                  background: '#fff',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Balanced
              </button>
              <button
                type="button"
                onClick={() => applyPreset('growth')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #ddd',
                  borderRadius: 20,
                  background: '#fff',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Growth
              </button>
            </div>
          </div>

          {/* 3. Detailed Allocation & Returns Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              marginTop: 16,
            }}
          >
            {/* Equity */}
            <div>
              <label
                style={{ fontSize: 12, fontWeight: 600, color: '#16a34a' }}
              >
                Equity (%)
              </label>
              <input
                type="number"
                value={equityPct}
                onChange={numSetter(setEquityPct)}
                style={{
                  width: '100%',
                  padding: 6,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  marginTop: 4,
                }}
              />
              <label
                style={{
                  fontSize: 11,
                  color: '#666',
                  marginTop: 4,
                  display: 'block',
                }}
              >
                Return: {equityReturn}%
              </label>
            </div>

            {/* Debt */}
            <div>
              <label
                style={{ fontSize: 12, fontWeight: 600, color: '#3b82f6' }}
              >
                Debt (%)
              </label>
              <input
                type="number"
                value={debtPct}
                onChange={numSetter(setDebtPct)}
                style={{
                  width: '100%',
                  padding: 6,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  marginTop: 4,
                }}
              />
              <label
                style={{
                  fontSize: 11,
                  color: '#666',
                  marginTop: 4,
                  display: 'block',
                }}
              >
                Return: {debtReturn}%
              </label>
            </div>

            {/* Gold */}
            <div>
              <label
                style={{ fontSize: 12, fontWeight: 600, color: '#eab308' }}
              >
                Gold (%)
              </label>
              <input
                type="number"
                value={goldPct}
                onChange={numSetter(setGoldPct)}
                style={{
                  width: '100%',
                  padding: 6,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  marginTop: 4,
                }}
              />
              <label
                style={{
                  fontSize: 11,
                  color: '#666',
                  marginTop: 4,
                  display: 'block',
                }}
              >
                Return: {goldReturn}%
              </label>
            </div>

            {/* Cash */}
            <div>
              <label
                style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}
              >
                Cash (%)
              </label>
              <input
                type="number"
                value={cashPct}
                onChange={numSetter(setCashPct)}
                style={{
                  width: '100%',
                  padding: 6,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  marginTop: 4,
                }}
              />
              <label
                style={{
                  fontSize: 11,
                  color: '#666',
                  marginTop: 4,
                  display: 'block',
                }}
              >
                Return: {cashReturn}%
              </label>
            </div>
          </div>

          <div className="input-group" style={{ marginTop: 16 }}>
            <label>
              Inflation Rate (%){' '}
              <span style={{ fontWeight: 400, fontSize: 12, color: '#666' }}>
                - for real value adjustment
              </span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                value={inflationPct}
                onChange={numSetter(setInflationPct)}
                step="0.1"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            style={{
              marginTop: 16,
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
          <AllocPieChart slices={results.pieSlices} />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result */}
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                Estimated Portfolio Value
              </span>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#4f46e5' }}>
                {formatINR(results.totalFutureValue)}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                Blended Return: <strong>{results.blendedReturn}%</strong>
              </div>
            </div>

            {/* Grid Breakdown */}
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
                  Total Invested
                </div>
                <div style={{ fontWeight: 600 }}>
                  {formatINR(results.totalInvested)}
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
                  Wealth Gained
                </div>
                <div style={{ fontWeight: 600, color: '#16a34a' }}>
                  +{formatINR(results.totalReturns)}
                </div>
              </div>
            </div>

            {/* Inflation Badge */}
            <div
              style={{
                marginTop: 16,
                padding: 8,
                background: '#f8fafc',
                borderRadius: 6,
                textAlign: 'center',
                fontSize: 12,
                color: '#475569',
                border: '1px solid #e2e8f0',
              }}
            >
              Real Value (Today's Terms):{' '}
              <strong>{formatINR(results.realValue)}</strong>
            </div>

            {/* Asset Breakdown Mini Table */}
            <div style={{ marginTop: 16 }}>
              <table
                style={{
                  width: '100%',
                  fontSize: 12,
                  borderCollapse: 'collapse',
                }}
              >
                <tbody>
                  {results.pieSlices.map((slice) => (
                    <tr
                      key={slice.label}
                      style={{ borderBottom: '1px solid #f1f5f9' }}
                    >
                      <td
                        style={{
                          padding: 4,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: slice.color,
                          }}
                        ></span>
                        {slice.label}
                      </td>
                      <td
                        style={{
                          padding: 4,
                          textAlign: 'right',
                          fontWeight: 600,
                        }}
                      >
                        {slice.pct}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
