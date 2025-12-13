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
    // eslint-disable-next-line react-hooks/immutability
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
          {/* Note: This is an approximation/placeholder for the main asset share */}
          {slices.length > 0 ? `${Math.round(slices[0].pct)}%` : '—'}
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

      // FIX: Use vEquity instead of vEq
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

    return {
      equityPct: e,
      debtPct: d,
      goldPct: g,
      cashPct: Math.max(0, 100 - (e + d + g)),
    };
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
    <section className="article">
      <div>
        <h1>📈 Multi-Asset Portfolio Planner</h1>

        {/* SPLIT: inputs left, pie chart right */}
        <div
          className="emi-split" /* Use emi-split for standard two-column grid */
          style={{
            marginTop: 18,
            display: 'grid',
            gridTemplateColumns: '1fr 320px' /* Enforce two columns */,
            gap: 16,
            alignItems: 'flex-start',
          }}
        >
          <div
            className="emi-left"
            style={{ minWidth: 320 }} /* Allow form to take available space */
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
                  Inflation (% p.a.)
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

              {/* Returns Inputs */}
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

          {/* RIGHT: PIE CHART & LEGEND */}
          <aside className="emi-right" style={{ flex: '0 0 320px' }}>
            <div
              className="card"
              style={{ textAlign: 'center', padding: 16, boxShadow: 'none' }}
            >
              {/* palette: site green + complementary shades */}
              <PieChart
                slices={[
                  {
                    color: '#16a34a', // Equity
                    pct: pie.equityPct,
                  },
                  {
                    color: '#4ade80', // Debt
                    pct: pie.debtPct,
                  },
                  {
                    color: '#f59e0b', // Gold
                    pct: pie.goldPct,
                  },
                  {
                    color: '#94a3b8', // Cash
                    pct: pie.cashPct,
                  },
                ]}
                size={220}
              />

              {/* legend - styled for clarity */}
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  justifyContent: 'center',
                  marginTop: 16,
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { label: 'Equity', color: '#16a34a', pct: pie.equityPct },
                  { label: 'Debt', color: '#4ade80', pct: pie.debtPct },
                  { label: 'Gold', color: '#f59e0b', pct: pie.goldPct },
                  { label: 'Cash', color: '#94a3b8', pct: pie.cashPct },
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

        {/* Full width results below split - REFINED STYLING */}
        <div className="emi-results-full" style={{ marginTop: 24 }}>
          <div
            className="result-grid emi-summary-strip"
            style={{
              backgroundColor: '#f0fff4', // Pale green background
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #d1fae5', // Light border
            }}
          >
            {/* Primary Result: Estimated Portfolio Value */}
            <div
              className="result-card"
              style={{
                padding: '10px',
                border: 'none',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow:
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)', // Lifted shadow
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Portfolio">
                  🚀
                </span>{' '}
                Estimated Portfolio Value
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#047857',
                }}
              >
                {formatINR(totalFuture)}
              </p>
            </div>

            {/* Secondary Result: Total Invested */}
            <div
              className="result-card"
              style={{
                padding: '10px',
                border: 'none',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Invested">
                  📥
                </span>{' '}
                Total Invested (Principal)
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(totalInvested)}
              </p>
            </div>

            {/* Secondary Result: Estimated Returns */}
            <div
              className="result-card"
              style={{
                padding: '10px',
                border: 'none',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Returns">
                  📈
                </span>{' '}
                Estimated Returns (Profit)
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#059669' }}
              >
                {formatINR(totalReturns)}
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h3>
            <span role="img" aria-label="Strategy">
              💡
            </span>{' '}
            Strategy & Blended Return
          </h3>
          <p style={{ margin: '6px 0' }}>
            **Blended Annual Return:**{' '}
            <strong style={{ color: '#1f2937', fontSize: '1.1em' }}>
              {approxBlendedAnnualReturn}%
            </strong>
          </p>
          <p style={{ margin: '6px 0' }}>
            **Risk Assessment:**{' '}
            <strong style={{ fontWeight: 700 }}>
              {alloc.equity * 100 >= 70
                ? 'High Risk/High Growth Potential'
                : alloc.equity * 100 >= 50
                ? 'Moderate-High Risk/Balanced Growth'
                : alloc.equity * 100 >= 30
                ? 'Moderate Risk/Conservative Mix'
                : 'Low Risk/Conservative Allocation'}
            </strong>
          </p>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>
            Advice:{' '}
            {years >= 15
              ? 'Long horizon — consider higher equity allocation (60-80%) for maximum compounding growth.'
              : years >= 7
              ? 'Medium-long horizon — balanced allocation (50-65% equity) is common.'
              : years >= 3
              ? 'Medium horizon — consider 40-60% equity, blend with debt.'
              : 'Short horizon — favour safer instruments (debt/cash) to preserve capital.'}
          </p>

          <div style={{ marginTop: '16px' }}>
            <strong>Allocation Presets</strong>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button type="button" onClick={() => applyPreset('conservative')}>
                Conservative (30% Equity)
              </button>
              <button type="button" onClick={() => applyPreset('balanced')}>
                Balanced (50% Equity)
              </button>
              <button type="button" onClick={() => applyPreset('growth')}>
                Growth (70% Equity)
              </button>
            </div>
          </div>
        </div>

        {/* allocation table */}
        <div className="card" style={{ marginTop: 12 }}>
          <h3>Allocation Breakdown (Estimated Future Value)</h3>
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
        </div>

        {/* --- SEO Content Starts Here --- */}
        <div className="content-for-seo" style={{ marginTop: 20 }}>
          {/* 1. Brief about the program */}
          <section>
            <h2 id="about-multi-asset">🌟 What is Multi-Asset Investing?</h2>
            <p>
              Multi-asset investing involves spreading capital across different,
              non-correlated assets—like stocks (Equity), bonds (Debt),
              commodities (Gold), and cash—to mitigate risk and capture returns
              from various market cycles. This approach aims to create a
              smoother, more predictable wealth curve than single-asset
              investing.
            </p>
            <p>
              This planner helps model the outcome of disciplined SIP and
              lump-sum investments within a diversified portfolio structure.
            </p>
          </section>

          {/* 2. Who can use this */}
          <section>
            <h2 id="who-can-use">
              🎯 Who Needs a Multi-Asset Investment Strategy?
            </h2>
            <p>
              Anyone planning for substantial future goals (e.g., retirement,
              children&apos;s college fund) should use a multi-asset strategy:
            </p>
            <ul>
              <li>
                **Risk-Averse Investors:** Use Debt/Cash to buffer against
                Equity market downturns.
              </li>
              <li>
                **Mid-Career Individuals:** Use a Balanced strategy (50-60%
                Equity) to achieve growth while protecting principal.
              </li>
              <li>
                **Pre-Retirees:** Shift allocation towards Debt/Cash to reduce
                volatility as they approach their financial goals.
              </li>
            </ul>
          </section>

          {/* 3. How can the Calculator help you? */}
          <section>
            <h2 id="how-calculator-helps">
              💡 How This Planner Optimizes Your Portfolio
            </h2>
            <p>
              The calculator provides critical insights into how diversification
              works over time:
            </p>
            <ul>
              <li>
                **Risk/Reward Balance:** Instantly visualizes the weighted
                return and risk profile based on your asset mix.
              </li>
              <li>
                **Scenario Planning:** Allows adjustment of expected returns to
                stress-test the portfolio (e.g., what if Equity returns only
                8%?).
              </li>
              <li>
                **Discipline & Automation:** Models the combined effect of
                monthly SIPs and lump-sum capital, emphasizing disciplined
                investment.
              </li>
            </ul>
          </section>

          {/* 4. How does the calculation work? */}
          <section>
            <h2 id="how-calculation-works">
              ⚙️ Calculation Logic and Compounding
            </h2>

            <h3>Future Value Calculation</h3>
            <p>
              The portfolio&apos;s total future value is the sum of the future
              values of each asset class. For each asset, the contribution (SIP
              and lump-sum) is calculated separately based on its individual
              expected rate of return, compounding monthly.
            </p>
            <p>
              The formula used for the **SIP component** (Annuity Due) of each
              asset is:
            </p>
            <div
              style={{
                backgroundColor: '#f9fafb',
                padding: '15px',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                textAlign: 'center',
                fontSize: '1.1em',
                overflowX: 'auto',
              }}
            >
              FV = P &times; {`[((1 + r)^n - 1) / r]`} &times; (1 + r)
            </div>
            <p>
              Where P is the monthly SIP allocated to that asset, r is the
              monthly return rate, and n is the tenure in months.
            </p>

            <h3>Blended Return</h3>
            <p>
              The **Blended Annual Return** shown above is a weighted average
              calculated using your input allocation percentages and the
              expected return rates for each asset class.
            </p>
          </section>

          {/* 5. Advantage */}
          <section>
            <h2 id="multi-asset-advantages">
              ✅ Key Advantages of Multi-Asset Strategy
            </h2>
            <p>
              This method offers distinct advantages in managing long-term
              wealth:
            </p>
            <div className="advantage-grid">
              <div className="advantage-card">
                <h3>Non-Correlation</h3>
                <p>
                  When the stock market (Equity) falls, bonds (Debt) or Gold
                  often rise, smoothing out your portfolio&apos;s returns.
                </p>
              </div>
              <div className="advantage-card">
                <h3>Rebalancing Opportunity</h3>
                <p>
                  It creates automatic opportunities to &quot;sell high and buy
                  low&quot; by rebalancing the portfolio back to target
                  allocations annually.
                </p>
              </div>
              <div className="advantage-card">
                <h3>Goal Alignment</h3>
                <p>
                  The asset mix can be tailored precisely to the time horizon of
                  the goal (e.g., higher Debt for short-term goals).
                </p>
              </div>
              <div className="advantage-card">
                <h3>Inflation Protection</h3>
                <p>
                  Holding Gold and Equity provides long-term protection against
                  the erosion of purchasing power caused by inflation.
                </p>
              </div>
            </div>
          </section>

          {/* 6. FAQ's */}
          <section>
            <h2 id="multi-asset-faqs">❓ Frequently Asked Questions (FAQs)</h2>
            <div
              className="faqs-accordion"
              style={{
                display: 'grid',
                gap: '10px',
              }}
            >
              <details
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '0 15px',
                  backgroundColor: '#ffffff',
                }}
              >
                <summary
                  style={{
                    fontWeight: 600,
                    padding: '15px 0',
                    cursor: 'pointer',
                    outline: 'none',
                    color: '#1f2937',
                  }}
                >
                  What is the difference between this planner and a simple SIP
                  calculator?
                </summary>
                <p
                  style={{
                    padding: '10px 0 15px 0',
                    borderTop: '1px dashed #e5e7eb',
                    margin: 0,
                    color: '#6b7280',
                  }}
                >
                  A simple SIP calculator assumes one uniform rate of return for
                  the entire investment. This planner segments your
                  contributions by asset class and applies the specific return
                  rate for Equity, Debt, Gold, and Cash, providing a much more
                  realistic, blended view of your portfolio&apos;s future value.
                </p>
              </details>
              <details
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '0 15px',
                  backgroundColor: '#ffffff',
                }}
              >
                <summary
                  style={{
                    fontWeight: 600,
                    padding: '15px 0',
                    cursor: 'pointer',
                    outline: 'none',
                    color: '#1f2937',
                  }}
                >
                  Should I change my asset allocation as I age?
                </summary>
                <p
                  style={{
                    padding: '10px 0 15px 0',
                    borderTop: '1px dashed #e5e7eb',
                    margin: 0,
                    color: '#6b7280',
                  }}
                >
                  Yes. This is called **risk mitigation**. As you get closer to
                  your goal (e.g., retirement), you should gradually shift your
                  portfolio from higher-risk assets (Equity) to lower-risk
                  assets (Debt/Cash) to protect the accumulated corpus from
                  sudden market crashes.
                </p>
              </details>
            </div>
          </section>
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
