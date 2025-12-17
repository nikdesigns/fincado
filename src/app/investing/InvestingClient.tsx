'use client';
import React, { useMemo, useState } from 'react';

// --- Utility: Format Currency ---
function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// --- Constants ---
const DEFAULT_ASSET_RETURNS = {
  equity: 12,
  debt: 7,
  gold: 6,
  cash: 4,
};

type PieSlice = { color: string; pct: number };

// --- Sub-Component: Pie Chart ---
function PieChart({
  slices,
  size = 220,
}: {
  slices: PieSlice[];
  size?: number;
}) {
  const strokeWidth = Math.round(size * 0.18);
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const segments = slices.map((s) => {
    const len = (s.pct / 100) * circumference;
    const seg = { ...s, len, offset };
    // eslint-disable-next-line react-hooks/immutability
    offset += len;
    return seg;
  });

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
        role="img"
        aria-label="Allocation chart"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${seg.len} ${Math.max(
                0,
                circumference - seg.len
              )}`}
              strokeDashoffset={-seg.offset}
              strokeLinecap="round"
              style={{
                transition:
                  'stroke-dasharray 350ms ease, stroke-dashoffset 350ms ease',
              }}
            />
          ))}
        </g>
        <circle cx={cx} cy={cy} r={r * 0.52} fill="#fff" />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontWeight={700}
          fontSize={18}
          fill="#0f172a"
        >
          {slices.length > 0 ? `${Math.round(slices[0].pct)}%` : '—'}
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize={12}
          fill="#64748b"
        >
          Equity
        </text>
      </svg>
    </div>
  );
}

// --- Main Component ---
export default function InvestingClient() {
  // --- State ---
  const [monthlySIP, setMonthlySIP] = useState<number>(5000);
  const [lumpSum, setLumpSum] = useState<number>(50000);
  const [years, setYears] = useState<number>(10);
  const [inflationPct, setInflationPct] = useState<number>(6);

  // Asset Mix (0-100)
  const [assetEquityPct, setAssetEquityPct] = useState<number>(60);
  const [assetDebtPct, setAssetDebtPct] = useState<number>(30);
  const [assetGoldPct, setAssetGoldPct] = useState<number>(5);
  const [assetCashPct, setAssetCashPct] = useState<number>(5);

  // Return Assumptions
  const [equityReturn, setEquityReturn] = useState<number>(
    DEFAULT_ASSET_RETURNS.equity
  );
  const [debtReturn, setDebtReturn] = useState<number>(
    DEFAULT_ASSET_RETURNS.debt
  );
  const [goldReturn, setGoldReturn] = useState<number>(
    DEFAULT_ASSET_RETURNS.gold
  );
  const [cashReturn, setCashReturn] = useState<number>(
    DEFAULT_ASSET_RETURNS.cash
  );

  // --- Derived Calculations ---
  const months = Math.max(1, Math.round(Math.max(0.1, years) * 12));

  // Normalize allocation to ensure it sums to 1 (100%)
  const rawTotalAlloc =
    Math.max(0, assetEquityPct) +
    Math.max(0, assetDebtPct) +
    Math.max(0, assetGoldPct) +
    Math.max(0, assetCashPct);

  const alloc = useMemo(() => {
    if (rawTotalAlloc <= 0)
      return { equity: 0.6, debt: 0.3, gold: 0.05, cash: 0.05 };
    return {
      equity: Math.max(0, assetEquityPct) / rawTotalAlloc,
      debt: Math.max(0, assetDebtPct) / rawTotalAlloc,
      gold: Math.max(0, assetGoldPct) / rawTotalAlloc,
      cash: Math.max(0, assetCashPct) / rawTotalAlloc,
    };
  }, [assetEquityPct, assetDebtPct, assetGoldPct, assetCashPct, rawTotalAlloc]);

  // Future Value Logic
  function calculateFV(
    p: number,
    r: number,
    n: number,
    type: 'sip' | 'lumpsum'
  ) {
    if (p <= 0) return 0;
    const monthlyRate = r / 12 / 100;
    if (monthlyRate === 0) return p * (type === 'sip' ? n : 1);

    if (type === 'lumpsum') {
      return p * Math.pow(1 + monthlyRate, n);
    } else {
      // SIP Formula (Annuity Due)
      return (
        p *
        ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) *
        (1 + monthlyRate)
      );
    }
  }

  const perAssetFuture = useMemo(() => {
    const calc = (ratio: number, rate: number) => {
      const sipPart = calculateFV(monthlySIP * ratio, rate, months, 'sip');
      const lumpPart = calculateFV(lumpSum * ratio, rate, months, 'lumpsum');
      return sipPart + lumpPart;
    };

    const equity = calc(alloc.equity, equityReturn);
    const debt = calc(alloc.debt, debtReturn);
    const gold = calc(alloc.gold, goldReturn);
    const cash = calc(alloc.cash, cashReturn);

    return { equity, debt, gold, cash, total: equity + debt + gold + cash };
  }, [
    monthlySIP,
    lumpSum,
    alloc,
    equityReturn,
    debtReturn,
    goldReturn,
    cashReturn,
    months,
  ]);

  const totalInvested = Math.round(monthlySIP * months + lumpSum);
  const totalFuture = Math.round(perAssetFuture.total);
  const totalReturns = Math.max(0, totalFuture - totalInvested);

  // Pie Chart Data
  const pie = useMemo(() => {
    const t = perAssetFuture.total || 1;
    return {
      equityPct: Math.round((perAssetFuture.equity / t) * 100),
      debtPct: Math.round((perAssetFuture.debt / t) * 100),
      goldPct: Math.round((perAssetFuture.gold / t) * 100),
      cashPct: Math.round((perAssetFuture.cash / t) * 100), // Approximate remainder
    };
  }, [perAssetFuture]);

  // Blended Return
  const blendedReturn = Number(
    (
      alloc.equity * equityReturn +
      alloc.debt * debtReturn +
      alloc.gold * goldReturn +
      alloc.cash * cashReturn
    ).toFixed(2)
  );

  // --- Helpers ---
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  const applyPreset = (name: 'conservative' | 'balanced' | 'growth') => {
    if (name === 'conservative') {
      setAssetEquityPct(30);
      setAssetDebtPct(50);
      setAssetGoldPct(10);
      setAssetCashPct(10);
    } else if (name === 'balanced') {
      setAssetEquityPct(50);
      setAssetDebtPct(35);
      setAssetGoldPct(10);
      setAssetCashPct(5);
    } else {
      setAssetEquityPct(70);
      setAssetDebtPct(20);
      setAssetGoldPct(5);
      setAssetCashPct(5);
    }
  };

  return (
    <div
      className="calculator-card"
      style={{ boxShadow: 'none', padding: 20, border: 'none' }}
    >
      {/* ✅ 1. Standard Calculator Grid Layout */}
      <div className="calc-grid">
        {/* --- LEFT: INPUTS --- */}
        <div className="calc-inputs">
          {/* Section 1: Money & Time */}
          <div className="input-group">
            <h3
              style={{
                fontSize: '16px',
                marginBottom: '16px',
                color: '#1e293b',
              }}
            >
              Investment Details
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
              }}
            >
              <div>
                <label>Monthly SIP (₹)</label>
                <input
                  type="number"
                  value={monthlySIP}
                  onChange={setter(setMonthlySIP)}
                />
              </div>
              <div>
                <label>Lumpsum (₹)</label>
                <input
                  type="number"
                  value={lumpSum}
                  onChange={setter(setLumpSum)}
                />
              </div>
              <div>
                <label>Period (Years)</label>
                <input
                  type="number"
                  value={years}
                  onChange={setter(setYears)}
                  step={0.5}
                />
              </div>
              <div>
                <label>Inflation (%)</label>
                <input
                  type="number"
                  value={inflationPct}
                  onChange={setter(setInflationPct)}
                  step={0.1}
                />
              </div>
            </div>
          </div>

          <hr
            style={{
              margin: '24px 0',
              border: 'none',
              borderTop: '1px solid #e2e8f0',
            }}
          />

          {/* Section 2: Allocation */}
          <div className="input-group">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3 style={{ fontSize: '16px', margin: 0, color: '#1e293b' }}>
                Asset Allocation
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => applyPreset('conservative')}
                  style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Safe
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('balanced')}
                  style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Balanced
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('growth')}
                  style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Aggressive
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
              }}
            >
              <div>
                <label>Equity %</label>
                <input
                  type="number"
                  value={assetEquityPct}
                  onChange={setter(setAssetEquityPct)}
                />
              </div>
              <div>
                <label>Debt %</label>
                <input
                  type="number"
                  value={assetDebtPct}
                  onChange={setter(setAssetDebtPct)}
                />
              </div>
              <div>
                <label>Gold %</label>
                <input
                  type="number"
                  value={assetGoldPct}
                  onChange={setter(setAssetGoldPct)}
                />
              </div>
              <div>
                <label>Cash %</label>
                <input
                  type="number"
                  value={assetCashPct}
                  onChange={setter(setAssetCashPct)}
                />
              </div>
            </div>

            {/* Rate Assumptions (Compact) */}
            <div
              style={{
                marginTop: '20px',
                background: '#f8fafc',
                padding: '12px',
                borderRadius: '8px',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#64748b',
                }}
              >
                EXPECTED RETURNS (P.A.)
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px',
                }}
              >
                <input
                  type="number"
                  value={equityReturn}
                  onChange={setter(setEquityReturn)}
                  style={{ fontSize: '13px', padding: '8px' }}
                  title="Equity Return"
                />
                <input
                  type="number"
                  value={debtReturn}
                  onChange={setter(setDebtReturn)}
                  style={{ fontSize: '13px', padding: '8px' }}
                  title="Debt Return"
                />
                <input
                  type="number"
                  value={goldReturn}
                  onChange={setter(setGoldReturn)}
                  style={{ fontSize: '13px', padding: '8px' }}
                  title="Gold Return"
                />
                <input
                  type="number"
                  value={cashReturn}
                  onChange={setter(setCashReturn)}
                  style={{ fontSize: '13px', padding: '8px' }}
                  title="Cash Return"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: CHART --- */}
        <div className="calc-visuals" style={{ textAlign: 'center' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #e2e8f0',
            }}
          >
            <PieChart
              slices={[
                { color: '#16a34a', pct: pie.equityPct },
                { color: '#60a5fa', pct: pie.debtPct },
                { color: '#f59e0b', pct: pie.goldPct },
                { color: '#94a3b8', pct: pie.cashPct },
              ]}
            />

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center',
                marginTop: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#16a34a',
                  }}
                ></span>{' '}
                Equity
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#60a5fa',
                  }}
                ></span>{' '}
                Debt
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#f59e0b',
                  }}
                ></span>{' '}
                Gold
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#94a3b8',
                  }}
                ></span>{' '}
                Cash
              </div>
            </div>

            <div
              style={{
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px dashed #e2e8f0',
              }}
            >
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                Blended Annual Return
              </div>
              <div
                style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}
              >
                {blendedReturn}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ 2. Standard Results Grid (Matches other calculators) */}
      <div className="result-grid" style={{ marginTop: '40px' }}>
        <div className="result-card">
          <span className="result-label">Invested Amount</span>
          <span className="result-value">{formatINR(totalInvested)}</span>
        </div>

        <div className="result-card highlight">
          <span className="result-label">Total Portfolio Value</span>
          <span className="result-primary">{formatINR(totalFuture)}</span>
        </div>

        <div className="result-card">
          <span className="result-label">Total Gain</span>
          <span
            className="result-value"
            style={{ color: 'var(--color-brand-green)' }}
          >
            {formatINR(totalReturns)}
          </span>
        </div>
      </div>

      {/* Breakdown Table */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
          Projected Asset Breakdown
        </h3>
        <div className="schedule-wrapper">
          <table className="rate-table">
            <thead>
              <tr>
                <th>Asset Class</th>
                <th>Allocation</th>
                <th>Future Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 500 }}>Equity (Stocks)</td>
                <td>{Math.round(alloc.equity * 100)}%</td>
                <td style={{ fontWeight: 600 }}>
                  {formatINR(Math.round(perAssetFuture.equity))}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>Debt (Bonds/FD)</td>
                <td>{Math.round(alloc.debt * 100)}%</td>
                <td style={{ fontWeight: 600 }}>
                  {formatINR(Math.round(perAssetFuture.debt))}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>Gold</td>
                <td>{Math.round(alloc.gold * 100)}%</td>
                <td style={{ fontWeight: 600 }}>
                  {formatINR(Math.round(perAssetFuture.gold))}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>Cash / Liquid</td>
                <td>{Math.round(alloc.cash * 100)}%</td>
                <td style={{ fontWeight: 600 }}>
                  {formatINR(Math.round(perAssetFuture.cash))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
