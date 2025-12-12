// src/app/investing/InvestingClient.tsx
'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

const DEFAULT_ASSET_RETURNS = {
  equity: 12,
  debt: 7,
  gold: 6,
  cash: 4,
};

type ScheduleRow = {
  month: number;
  invested: number;
  value: number;
  returns: number;
};

// ----------------- PieChart declared at top-level (outside component) -----------------
type PieSlice = { color: string; pct: number };
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

  // build dasharray segments in order
  let offset = 0;
  const segments = slices.map((s) => {
    const len = (s.pct / 100) * circumference;
    const seg = { ...s, len, offset };
    offset += len;
    return seg;
  });

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
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
          stroke="#f3f4f6"
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
          fontSize={16}
          fill="#081225"
        >
          {slices.reduce((s, x) => s + x.pct, 0) === 0
            ? '—'
            : `${slices[0].pct + slices[1].pct}%`}
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize={11}
          fill="#6b7280"
        >
          Allocation (FV share)
        </text>
      </svg>
    </div>
  );
}
// ----------------- end PieChart -----------------

export default function InvestingClient() {
  // Inputs
  const [monthlySIP, setMonthlySIP] = useState<number>(5000);
  const [lumpSum, setLumpSum] = useState<number>(0);
  const [years, setYears] = useState<number>(10);
  const [assetEquityPct, setAssetEquityPct] = useState<number>(60);
  const [assetDebtPct, setAssetDebtPct] = useState<number>(30);
  const [assetGoldPct, setAssetGoldPct] = useState<number>(5);
  const [assetCashPct, setAssetCashPct] = useState<number>(5);
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
  const [inflationPct, setInflationPct] = useState<number>(6);

  // derived
  const months = Math.max(1, Math.round(Math.max(0.1, years) * 12));
  const monthlyRateEquity = equityReturn / 12 / 100;
  const monthlyRateDebt = debtReturn / 12 / 100;
  const monthlyRateGold = goldReturn / 12 / 100;
  const monthlyRateCash = cashReturn / 12 / 100;

  // normalize allocation
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

  function futureValueSIP(
    monthly: number,
    monthlyRate: number,
    monthsLocal: number
  ) {
    if (monthly <= 0) return 0;
    if (monthlyRate === 0) return monthly * monthsLocal;
    return (
      monthly *
      ((Math.pow(1 + monthlyRate, monthsLocal) - 1) / monthlyRate) *
      (1 + monthlyRate)
    );
  }
  function futureValueLumpsum(
    lumpsum: number,
    monthlyRate: number,
    monthsLocal: number
  ) {
    if (lumpsum <= 0) return 0;
    if (monthlyRate === 0) return lumpsum;
    return lumpsum * Math.pow(1 + monthlyRate, monthsLocal);
  }

  // per-asset future values
  const perAssetFuture = useMemo(() => {
    const equity =
      futureValueSIP(monthlySIP * alloc.equity, monthlyRateEquity, months) +
      futureValueLumpsum(lumpSum * alloc.equity, monthlyRateEquity, months);
    const debt =
      futureValueSIP(monthlySIP * alloc.debt, monthlyRateDebt, months) +
      futureValueLumpsum(lumpSum * alloc.debt, monthlyRateDebt, months);
    const gold =
      futureValueSIP(monthlySIP * alloc.gold, monthlyRateGold, months) +
      futureValueLumpsum(lumpSum * alloc.gold, monthlyRateGold, months);
    const cash =
      futureValueSIP(monthlySIP * alloc.cash, monthlyRateCash, months) +
      futureValueLumpsum(lumpSum * alloc.cash, monthlyRateCash, months);
    const total = equity + debt + gold + cash;
    return { equity, debt, gold, cash, total: Math.max(0, total) };
  }, [
    monthlySIP,
    lumpSum,
    alloc,
    monthlyRateEquity,
    monthlyRateDebt,
    monthlyRateGold,
    monthlyRateCash,
    months,
  ]);

  const totalInvested = Math.round(monthlySIP * months + lumpSum);
  const totalFuture = Math.round(perAssetFuture.total);
  const totalReturns = Math.max(0, totalFuture - totalInvested);

  // schedule preview (monthly blended)
  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let vEquity = lumpSum * alloc.equity;
    let vDebt = lumpSum * alloc.debt;
    let vGold = lumpSum * alloc.gold;
    let vCash = lumpSum * alloc.cash;

    for (let m = 1; m <= months; m++) {
      vEquity = vEquity * (1 + monthlyRateEquity) + monthlySIP * alloc.equity;
      vDebt = vDebt * (1 + monthlyRateDebt) + monthlySIP * alloc.debt;
      vGold = vGold * (1 + monthlyRateGold) + monthlySIP * alloc.gold;
      vCash = vCash * (1 + monthlyRateCash) + monthlySIP * alloc.cash;
      const totalValue = vEquity + vDebt + vGold + vCash;
      const invested = monthlySIP * m + lumpSum;
      rows.push({
        month: m,
        invested: Math.round(invested),
        value: Math.round(totalValue),
        returns: Math.round(totalValue - invested),
      });
    }
    return rows;
  }, [
    months,
    lumpSum,
    monthlySIP,
    alloc.equity,
    alloc.debt,
    alloc.gold,
    alloc.cash,
    monthlyRateEquity,
    monthlyRateDebt,
    monthlyRateGold,
    monthlyRateCash,
  ]);

  // pie percentages from per-asset future value (guard zeros)
  const pie = useMemo(() => {
    const t = perAssetFuture.total || 1;
    const e = Math.round((perAssetFuture.equity / t) * 100);
    const d = Math.round((perAssetFuture.debt / t) * 100);
    const g = Math.round((perAssetFuture.gold / t) * 100);
    const c = Math.max(0, 100 - (e + d + g));
    return { equityPct: e, debtPct: d, goldPct: g, cashPct: c };
  }, [perAssetFuture]);

  const approxBlendedAnnualReturn = useMemo(() => {
    const weighted =
      alloc.equity * equityReturn +
      alloc.debt * debtReturn +
      alloc.gold * goldReturn +
      alloc.cash * cashReturn;
    return Number(weighted.toFixed(2));
  }, [alloc, equityReturn, debtReturn, goldReturn, cashReturn]);

  // CSV export
  function exportCSV() {
    const header = ['Month', 'Invested', 'Value', 'Returns'];
    const lines = [header.join(',')].concat(
      schedule.map((r) => [r.month, r.invested, r.value, r.returns].join(','))
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'investing-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // small setter helper
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  // quick preset allocations
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
    <section className="card">
      <h2>Investing Planner</h2>

      {/* SPLIT: inputs left, pie chart right */}
      <div
        className="invest-split"
        style={{
          marginTop: 12,
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <div
          className="invest-left"
          style={{ flex: '1 1 420px', minWidth: 320 }}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'grid', gap: 12 }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <label>
                Monthly SIP (₹)
                <input
                  type="number"
                  value={monthlySIP}
                  onChange={setter(setMonthlySIP)}
                  min={0}
                />
              </label>
              <label>
                Lumpsum Now (₹)
                <input
                  type="number"
                  value={lumpSum}
                  onChange={setter(setLumpSum)}
                  min={0}
                />
              </label>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <label>
                Horizon (Years)
                <input
                  type="number"
                  value={years}
                  onChange={setter(setYears)}
                  min={0.5}
                  step={0.5}
                />
              </label>
              <label>
                Inflation (%)
                <input
                  type="number"
                  value={inflationPct}
                  onChange={setter(setInflationPct)}
                  min={0}
                  step={0.1}
                />
              </label>
            </div>

            <div>
              <strong>Allocation % (will be normalized)</strong>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 8,
                  marginTop: 8,
                }}
              >
                <label>
                  Equity %
                  <input
                    type="number"
                    value={assetEquityPct}
                    onChange={setter(setAssetEquityPct)}
                    min={0}
                    max={100}
                  />
                </label>
                <label>
                  Debt %
                  <input
                    type="number"
                    value={assetDebtPct}
                    onChange={setter(setAssetDebtPct)}
                    min={0}
                    max={100}
                  />
                </label>
                <label>
                  Gold %
                  <input
                    type="number"
                    value={assetGoldPct}
                    onChange={setter(setAssetGoldPct)}
                    min={0}
                    max={100}
                  />
                </label>
                <label>
                  Cash %
                  <input
                    type="number"
                    value={assetCashPct}
                    onChange={setter(setAssetCashPct)}
                    min={0}
                    max={100}
                  />
                </label>
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>
                Raw allocation sum:{' '}
                <strong>{Math.round(rawTotalAlloc)}%</strong> — values will be
                normalized for calculation.
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <label>
                Equity Return (% p.a.)
                <input
                  type="number"
                  value={equityReturn}
                  onChange={setter(setEquityReturn)}
                  step={0.1}
                />
              </label>
              <label>
                Debt Return (% p.a.)
                <input
                  type="number"
                  value={debtReturn}
                  onChange={setter(setDebtReturn)}
                  step={0.1}
                />
              </label>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <label>
                Gold Return (% p.a.)
                <input
                  type="number"
                  value={goldReturn}
                  onChange={setter(setGoldReturn)}
                  step={0.1}
                />
              </label>
              <label>
                Cash Return (% p.a.)
                <input
                  type="number"
                  value={cashReturn}
                  onChange={setter(setCashReturn)}
                  step={0.1}
                />
              </label>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-cta">Update</button>
              <button
                type="button"
                onClick={() => {
                  setMonthlySIP(5000);
                  setLumpSum(0);
                  setYears(10);
                  setAssetEquityPct(60);
                  setAssetDebtPct(30);
                  setAssetGoldPct(5);
                  setAssetCashPct(5);
                  setEquityReturn(DEFAULT_ASSET_RETURNS.equity);
                  setDebtReturn(DEFAULT_ASSET_RETURNS.debt);
                  setGoldReturn(DEFAULT_ASSET_RETURNS.gold);
                  setCashReturn(DEFAULT_ASSET_RETURNS.cash);
                  setInflationPct(6);
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Replace the existing <aside className="invest-right"> ... </aside> with this */}
        <aside className="invest-right" style={{ flex: '0 0 320px' }}>
          <div
            className="card"
            style={{ textAlign: 'center', padding: 16, boxShadow: 'none' }}
          >
            {/* palette: site green + complementary shades */}
            <PieChart
              slices={[
                {
                  color: '#eff8e5',
                  pct: Math.max(
                    0,
                    Math.round(
                      (perAssetFuture.equity / (perAssetFuture.total || 1)) *
                        100
                    )
                  ),
                }, // main green
                {
                  color: '#4ade80',
                  pct: Math.max(
                    0,
                    Math.round(
                      (perAssetFuture.debt / (perAssetFuture.total || 1)) * 100
                    )
                  ),
                }, // lighter green
                {
                  color: '#f59e0b',
                  pct: Math.max(
                    0,
                    Math.round(
                      (perAssetFuture.gold / (perAssetFuture.total || 1)) * 100
                    )
                  ),
                }, // gold
                {
                  color: '#94a3b8',
                  pct: Math.max(
                    0,
                    Math.round(
                      (perAssetFuture.cash / (perAssetFuture.total || 1)) * 100
                    )
                  ),
                }, // neutral grey
              ]}
              size={220}
            />

            {/* legend - aligned and distinct colors */}
            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                marginTop: 12,
                flexWrap: 'wrap',
              }}
            >
              {[
                {
                  label: 'Equity',
                  color: '#16a34a',
                  pct: Math.round(
                    (perAssetFuture.equity / (perAssetFuture.total || 1)) * 100
                  ),
                },
                {
                  label: 'Debt',
                  color: '#4ade80',
                  pct: Math.round(
                    (perAssetFuture.debt / (perAssetFuture.total || 1)) * 100
                  ),
                },
                {
                  label: 'Gold',
                  color: '#f59e0b',
                  pct: Math.round(
                    (perAssetFuture.gold / (perAssetFuture.total || 1)) * 100
                  ),
                },
                {
                  label: 'Cash',
                  color: '#94a3b8',
                  pct: Math.round(
                    (perAssetFuture.cash / (perAssetFuture.total || 1)) * 100
                  ),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                    minWidth: 88,
                  }}
                >
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      background: item.color,
                      display: 'inline-block',
                      borderRadius: 4,
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700 }}>{item.pct}%</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ad-box" style={{ marginTop: 12 }}>
            Ad / widget
          </div>
        </aside>
      </div>

      {/* Full width results below split */}
      <div style={{ marginTop: 16 }}>
        <div className="result-grid emi-summary-strip">
          <div className="result-card">
            <p className="result-label">Total Invested</p>
            <p className="result-primary">{formatINR(totalInvested)}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Estimated Portfolio Value</p>
            <p className="result-primary">{formatINR(totalFuture)}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Estimated Returns</p>
            <p className="result-value">{formatINR(totalReturns)}</p>
          </div>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <h3>Allocation Breakdown (Estimated FV)</h3>
          <table className="rate-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Allocation %</th>
                <th>Est. Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Equity</td>
                <td>{Math.round(alloc.equity * 100)}%</td>
                <td>{formatINR(Math.round(perAssetFuture.equity))}</td>
              </tr>
              <tr>
                <td>Debt</td>
                <td>{Math.round(alloc.debt * 100)}%</td>
                <td>{formatINR(Math.round(perAssetFuture.debt))}</td>
              </tr>
              <tr>
                <td>Gold</td>
                <td>{Math.round(alloc.gold * 100)}%</td>
                <td>{formatINR(Math.round(perAssetFuture.gold))}</td>
              </tr>
              <tr>
                <td>Cash</td>
                <td>{Math.round(alloc.cash * 100)}%</td>
                <td>{formatINR(Math.round(perAssetFuture.cash))}</td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>
            Approx blended annual return:{' '}
            <strong>{approxBlendedAnnualReturn}%</strong>
          </p>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <h3>Quick Advice</h3>
          <p>
            {years >= 15
              ? 'Long horizon — consider higher equity allocation (60-80%) for growth.'
              : years >= 7
              ? 'Medium-long horizon — balanced allocation (50-65% equity) is common.'
              : years >= 3
              ? 'Medium horizon — consider 40-60% equity, blend with debt.'
              : 'Short horizon — favour safer instruments (debt/cash) to preserve capital.'}
          </p>
          <p style={{ fontWeight: 700 }}>
            {alloc.equity * 100 >= 70
              ? 'High risk: equity-heavy — expect higher volatility.'
              : alloc.equity * 100 >= 50
              ? 'Moderate-High risk: good for growth but expect ups and downs.'
              : alloc.equity * 100 >= 30
              ? 'Moderate risk: balanced mix.'
              : 'Low risk: conservative allocation.'}
          </p>
          <p style={{ fontSize: 13, color: '#6b7280' }}>
            Rebalance annually to maintain targets.
          </p>
        </div>

        <div className="article" style={{ marginTop: 12 }}>
          <h2>Schedule Preview (first 120 months)</h2>
          <div
            className="schedule-wrapper"
            style={{ maxHeight: 360, overflow: 'auto' }}
          >
            <table className="rate-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Invested</th>
                  <th>Value</th>
                  <th>Returns</th>
                </tr>
              </thead>
              <tbody>
                {schedule.slice(0, 120).map((r) => (
                  <tr key={r.month}>
                    <td>{r.month}</td>
                    <td>{formatINR(r.invested)}</td>
                    <td>{formatINR(r.value)}</td>
                    <td>{formatINR(r.returns)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={exportCSV}>Export Schedule CSV</button>
            <button
              onClick={() => {
                const summary = `SIP ${formatINR(
                  monthlySIP
                )}/mo + Lump ${formatINR(
                  lumpSum
                )} for ${years}y @ blended ${approxBlendedAnnualReturn}% ⇒ ${formatINR(
                  totalFuture
                )}`;
                navigator.clipboard?.writeText(summary);
                alert('Summary copied to clipboard');
              }}
            >
              Copy Summary
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
