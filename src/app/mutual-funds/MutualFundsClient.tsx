'use client';
import React, { useMemo, useRef, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

/* --- Reusable PieChart (declared outside render) --- */
function PieChart({
  slices,
  size = 220,
}: {
  slices: { color: string; pct: number }[];
  size?: number;
}) {
  const strokeWidth = Math.round(size * 0.18);
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  // assemble dasharray segments from slices
  const dashArrays = (() => {
    const arr: { offset: number; len: number; color: string }[] = [];
    let used = 0;
    for (const s of slices) {
      const len = (Math.max(0, Math.min(100, s.pct)) / 100) * circumference;
      arr.push({ offset: used, len, color: s.color });
      used += len;
    }
    return arr;
  })();

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Allocation"
      >
        {/* base pale ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f1f6ec"
          strokeWidth={strokeWidth}
        />
        {/* draw each slice as stroke dash segments on rotated circle */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {dashArrays.map((d, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${d.len} ${circumference - d.len}`}
              strokeDashoffset={-d.offset}
              strokeLinecap="round"
            />
          ))}
        </g>

        <circle cx={cx} cy={cy} r={r * 0.52} fill="#fff" />

        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontWeight={700}
          fontSize={14}
          fill="#081225"
        >
          Allocation
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize={11}
          fill="#6b7280"
        >
          by value (est.)
        </text>
      </svg>
    </div>
  );
}

type ScheduleRow = {
  month: number;
  invested: number;
  value: number;
  returns: number;
};

export default function MutualFundsClient() {
  // Inputs
  const [monthlySIP, setMonthlySIP] = useState<number>(5000);
  const [lumpSumNow, setLumpSumNow] = useState<number>(0);
  const [years, setYears] = useState<number>(10);

  // Asset allocation percentages (sum may be normalized)
  const [equityPct, setEquityPct] = useState<number>(60);
  const [debtPct, setDebtPct] = useState<number>(30);
  const [goldPct, setGoldPct] = useState<number>(5);
  const [cashPct, setCashPct] = useState<number>(5);

  // expected annual returns per asset
  const [equityReturn, setEquityReturn] = useState<number>(12);
  const [debtReturn, setDebtReturn] = useState<number>(7);
  const [goldReturn, setGoldReturn] = useState<number>(6);
  const [cashReturn, setCashReturn] = useState<number>(4);

  const [inflationPct, setInflationPct] = useState<number>(6);

  const printRef = useRef<HTMLDivElement | null>(null);

  // derived
  const months = Math.max(1, Math.round(years * 12));
  // convert to monthly rates
  const rEq = equityReturn / 12 / 100;
  const rDebt = debtReturn / 12 / 100;
  const rGold = goldReturn / 12 / 100;
  const rCash = cashReturn / 12 / 100;

  // normalize alloc
  const totalAllocInput = Math.max(1, equityPct + debtPct + goldPct + cashPct);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const alloc = {
    equity: equityPct / totalAllocInput,
    debt: debtPct / totalAllocInput,
    gold: goldPct / totalAllocInput,
    cash: cashPct / totalAllocInput,
  };

  // future value helpers
  function fvSIP(monthly: number, monthlyRate: number, monthsLocal: number) {
    if (monthly <= 0) return 0;
    if (monthlyRate === 0) return monthly * monthsLocal;
    return (
      monthly *
      ((Math.pow(1 + monthlyRate, monthsLocal) - 1) / monthlyRate) *
      (1 + monthlyRate)
    );
  }
  function fvLump(lump: number, monthlyRate: number, monthsLocal: number) {
    if (lump <= 0) return 0;
    return lump * Math.pow(1 + monthlyRate, monthsLocal);
  }

  // per-asset future values
  const perAssetFuture = useMemo(() => {
    const fvEq =
      fvSIP(monthlySIP * alloc.equity, rEq, months) +
      fvLump(lumpSumNow * alloc.equity, rEq, months);
    const fvDebt =
      fvSIP(monthlySIP * alloc.debt, rDebt, months) +
      fvLump(lumpSumNow * alloc.debt, rDebt, months);
    const fvGold =
      fvSIP(monthlySIP * alloc.gold, rGold, months) +
      fvLump(lumpSumNow * alloc.gold, rGold, months);
    const fvCash =
      fvSIP(monthlySIP * alloc.cash, rCash, months) +
      fvLump(lumpSumNow * alloc.cash, rCash, months);
    const total = fvEq + fvDebt + fvGold + fvCash;
    return { equity: fvEq, debt: fvDebt, gold: fvGold, cash: fvCash, total };
  }, [monthlySIP, lumpSumNow, alloc, rEq, rDebt, rGold, rCash, months]);

  const totalInvested = Math.round(monthlySIP * months + lumpSumNow);
  const totalFuture = Math.round(perAssetFuture.total);
  const totalReturns = Math.max(0, totalFuture - totalInvested);

  // blended approx annual return (weighted by allocation input)
  const approxBlendedReturn = useMemo(() => {
    const weighted =
      alloc.equity * equityReturn +
      alloc.debt * debtReturn +
      alloc.gold * goldReturn +
      alloc.cash * cashReturn;
    return Number(weighted.toFixed(2));
  }, [alloc, equityReturn, debtReturn, goldReturn, cashReturn]);

  // schedule preview (monthly) — single blended portfolio path
  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    // start with lump split
    let vEq = lumpSumNow * alloc.equity;
    let vDebt = lumpSumNow * alloc.debt;
    let vGold = lumpSumNow * alloc.gold;
    let vCash = lumpSumNow * alloc.cash;

    for (let m = 1; m <= months; m++) {
      vEq = vEq * (1 + rEq) + monthlySIP * alloc.equity;
      vDebt = vDebt * (1 + rDebt) + monthlySIP * alloc.debt;
      vGold = vGold * (1 + rGold) + monthlySIP * alloc.gold;
      vCash = vCash * (1 + rCash) + monthlySIP * alloc.cash;
      const totalValue = vEq + vDebt + vGold + vCash;
      const invested = monthlySIP * m + lumpSumNow;
      rows.push({
        month: m,
        invested: Math.round(invested),
        value: Math.round(totalValue),
        returns: Math.round(totalValue - invested),
      });
    }
    return rows;
  }, [months, lumpSumNow, monthlySIP, alloc, rEq, rDebt, rGold, rCash]);

  // inflation adjusted
  const realFuture = useMemo(() => {
    if (inflationPct <= 0) return totalFuture;
    const monthlyInflation = inflationPct / 12 / 100;
    return Math.round(totalFuture / Math.pow(1 + monthlyInflation, months));
  }, [totalFuture, inflationPct, months]);

  // Pie chart slices (use site green + complimentary shades)
  const pieSlices = useMemo(() => {
    const total = perAssetFuture.total;
    // Note: Colors correspond to Equity (darkest green) -> Cash (lightest green)
    return [
      {
        color: '#16a34a', // Equity
        pct: Math.round((perAssetFuture.equity / total) * 100 || 0),
      },
      {
        color: '#4ade80', // Debt
        pct: Math.round((perAssetFuture.debt / total) * 100 || 0),
      },
      {
        color: '#86efac', // Gold
        pct: Math.round((perAssetFuture.gold / total) * 100 || 0),
      },
      {
        color: '#d1fae5', // Cash
        pct: Math.round((perAssetFuture.cash / total) * 100 || 0),
      },
    ];
  }, [perAssetFuture]);

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
    a.download = 'mutual-funds-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Print schedule only
  function handlePrint() {
    if (!printRef.current) return window.print();
    const printContents = printRef.current.innerHTML;
    const w = window.open('', '_blank', 'width=900,height=700');
    if (!w) {
      alert('Popup blocked — allow popups to print.');
      return;
    }
    w.document.write(`
      <html><head><title>Schedule</title>
      <style>
        body{font-family:Arial, sans-serif; padding:20px}
        table{width:100%; border-collapse:collapse}
        th,td{padding:8px 10px; border:1px solid #ddd; text-align:right}
        th{text-align:left; background:#f7f7f7}
      </style>
      </head><body>${printContents}</body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 250);
  }

  // safe setter helper
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  // quick allocation presets
  const applyPreset = (name: 'conservative' | 'balanced' | 'growth') => {
    if (name === 'conservative') {
      setEquityPct(30);
      setDebtPct(50);
      setGoldPct(10);
      setCashPct(10);
    } else if (name === 'balanced') {
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

  return (
    <section className="article">
      <div>
        <h1>📊 Mutual Funds Portfolio Planner</h1>

        {/* split: inputs left, pie right */}
        <div className="emi-split" style={{ marginTop: 18 }}>
          <div className="emi-left">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'grid', gap: 12, alignItems: 'end' }}
            >
              <div className="form-row">
                <label>
                  Monthly SIP (₹)
                  <input
                    type="number"
                    value={monthlySIP}
                    onChange={setter(setMonthlySIP)}
                    min={0}
                    step={100}
                  />
                </label>

                <label>
                  Lump-sum now (₹)
                  <input
                    type="number"
                    value={lumpSumNow}
                    onChange={setter(setLumpSumNow)}
                    min={0}
                    step={1000}
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Investment Horizon (Years)
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
                <strong>Allocation Presets</strong>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => applyPreset('conservative')}
                  >
                    Conservative
                  </button>
                  <button type="button" onClick={() => applyPreset('balanced')}>
                    Balanced
                  </button>
                  <button type="button" onClick={() => applyPreset('growth')}>
                    Growth
                  </button>
                </div>
              </div>

              {/* Asset Allocation Inputs */}
              <div style={{ display: 'grid', gap: 8, alignItems: 'end' }}>
                <label>
                  Equity %
                  <input
                    type="number"
                    value={equityPct}
                    onChange={setter(setEquityPct)}
                    min={0}
                    max={100}
                  />
                </label>
                <label>
                  Debt %
                  <input
                    type="number"
                    value={debtPct}
                    onChange={setter(setDebtPct)}
                    min={0}
                    max={100}
                  />
                </label>
                <label>
                  Gold %
                  <input
                    type="number"
                    value={goldPct}
                    onChange={setter(setGoldPct)}
                    min={0}
                    max={100}
                  />
                </label>
                <label>
                  Cash %
                  <input
                    type="number"
                    value={cashPct}
                    onChange={setter(setCashPct)}
                    min={0}
                    max={100}
                  />
                </label>
              </div>

              {/* Returns Inputs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  alignItems: 'end',
                }}
              >
                <label>
                  Equity return (% p.a.)
                  <input
                    type="number"
                    value={equityReturn}
                    onChange={setter(setEquityReturn)}
                    step={0.1}
                  />
                </label>

                <label>
                  Debt return (% p.a.)
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
                  alignItems: 'end',
                }}
              >
                <label>
                  Gold return (% p.a.)
                  <input
                    type="number"
                    value={goldReturn}
                    onChange={setter(setGoldReturn)}
                    step={0.1}
                  />
                </label>

                <label>
                  Cash return (% p.a.)
                  <input
                    type="number"
                    value={cashReturn}
                    onChange={setter(setCashReturn)}
                    step={0.1}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-cta">Calculate</button>
                <button
                  type="button"
                  onClick={() => {
                    setMonthlySIP(5000);
                    setLumpSumNow(0);
                    setYears(10);
                    setEquityPct(60);
                    setDebtPct(30);
                    setGoldPct(5);
                    setCashPct(5);
                    setEquityReturn(12);
                    setDebtReturn(7);
                    setGoldReturn(6);
                    setCashReturn(4);
                    setInflationPct(6);
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          <aside className="emi-right" aria-hidden={false}>
            <div
              className="card"
              style={{
                textAlign: 'center',
                padding: 12,
                boxShadow: 'none',
                border: 'none',
              }}
            >
              <PieChart slices={pieSlices} size={220} />

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginTop: 12,
                  justifyContent: 'center',
                }}
              >
                {/* Equity */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      background: '#16a34a',
                      display: 'inline-block',
                      borderRadius: 4,
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>
                      {Math.round(
                        (perAssetFuture.equity / perAssetFuture.total) * 100 ||
                          0
                      )}
                      %
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Equity</div>
                  </div>
                </div>

                {/* Debt */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      background: '#4ade80',
                      display: 'inline-block',
                      borderRadius: 4,
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>
                      {Math.round(
                        (perAssetFuture.debt / perAssetFuture.total) * 100 || 0
                      )}
                      %
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Debt</div>
                  </div>
                </div>

                {/* Gold */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      background: '#86efac',
                      display: 'inline-block',
                      borderRadius: 4,
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>
                      {Math.round(
                        (perAssetFuture.gold / perAssetFuture.total) * 100 || 0
                      )}
                      %
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Gold</div>
                  </div>
                </div>

                {/* Cash */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      background: '#d1fae5',
                      display: 'inline-block',
                      borderRadius: 4,
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>
                      {Math.round(
                        (perAssetFuture.cash / perAssetFuture.total) * 100 || 0
                      )}
                      %
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Cash</div>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>
                *Allocations shown above are based on the **estimated future
                value** of each asset class.
              </p>
            </div>

            <div className="ad-box" style={{ marginTop: 12 }}>
              Ad / Widget
            </div>
          </aside>
        </div>

        {/* results full width - REFINED PROFESSIONAL SECTION */}
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
      </div>

      {/* Inflation-Adjusted Value */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>
          <span role="img" aria-label="Purchasing Power">
            💵
          </span>{' '}
          Real Value & Blended Return
        </h3>
        <p style={{ marginTop: 8 }}>
          Estimated **Real Future Value** (in today&apos;s rupees):{' '}
          <strong style={{ color: '#047857' }}>{formatINR(realFuture)}</strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          This value is adjusted by your {inflationPct}% inflation input to show
          the true purchasing power of your estimated returns.
        </p>
        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
          Approx blended annual return by allocation:{' '}
          <strong>{approxBlendedReturn}%</strong>
        </p>
      </div>

      {/* allocation table */}
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Allocation Breakdown (Estimated Future Value)</h3>
        <table className="rate-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Alloc % (normalized)</th>
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
          <h2 id="about-mf">🌟 What is Mutual Fund Portfolio Planning?</h2>
          <p>
            Mutual fund portfolio planning involves allocating your investment
            contributions across different asset classes (Equity, Debt, Gold,
            Cash) using mutual fund schemes. This calculator helps you model how
            combining these different funds—each with distinct risk and return
            profiles—can result in a single blended portfolio value tailored to
            your long-term goals. The core idea is **diversification** to
            maximize returns for a given risk level.
          </p>
          [Image of Asset Allocation Pie Chart]
          <p>
            The planner combines the power of SIP (Systematic Investment Plan)
            for recurring contributions and lump-sum investment for upfront
            capital, projecting the portfolio&apos;s worth at the end of your
            chosen horizon.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who is This Portfolio Planner For?</h2>
          <p>
            This planner is designed for medium- to long-term investors looking
            for comprehensive financial modeling:
          </p>
          <ul>
            <li>
              **Goal-Based Investors:** Individuals planning for major events
              like retirement, a child&apos;s education, or buying a house (5+
              years).
            </li>
            <li>
              **Risk Assessors:** Users trying to visualize how their preferred
              allocation (e.g., 70% Equity / 30% Debt) performs over time
              compared to a less aggressive split.
            </li>
            <li>
              **Portfolio Managers:** Those managing multiple mutual funds who
              want a quick, blended projection of their combined investment
              strategy.
            </li>
          </ul>
        </section>

        {/* 3. How can the MF Calculator help you? */}
        <section>
          <h2 id="how-mf-helps">💡 How This Portfolio Planner Helps You</h2>
          <p>
            This tool is crucial for transforming generic financial goals into
            actionable, quantifiable investment plans:
          </p>
          <ul>
            <li>
              **Projected Value:** Provides a total estimated future value based
              on the blended performance of your chosen allocation.
            </li>
            <li>
              **Inflation Check:** Gives you the &apos;Real Value&apos; of your
              future portfolio, showing its actual purchasing power in
              today&apos;s terms.
            </li>
            <li>
              **Risk Visualization:** By letting you adjust individual asset
              returns, you can run simple stress tests on your portfolio&apos;s
              expected performance.
            </li>
            <li>
              **Blended Return Insight:** Calculates a single weighted average
              return for your entire portfolio for quick decision-making.
            </li>
          </ul>
        </section>

        {/* 4. How does MF Planning work? (The calculation and formula) */}
        <section>
          <h2 id="how-mf-works">⚙️ Calculation Logic and Formula</h2>

          <h3>Calculation Method</h3>
          <p>
            The calculator determines the future value of your portfolio by
            calculating the Future Value (FV) of the SIP component and the FV of
            the lump-sum component **separately for each asset class**, and then
            summing the results.
          </p>
          <p>
            The calculation for each asset uses the Future Value of Annuity Due
            formula (for SIP) and the Compound Interest formula (for lump sum):
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
            FV<sub>A</sub> = FV<sub>SIP</sub> + FV<sub>Lump</sub>
          </div>
          <p>
            The final **Estimated Portfolio Value** is the sum of all individual
            asset FVs (FV<sub>Equity</sub> + FV<sub>Debt</sub> + FV
            <sub>Gold</sub> + FV<sub>Cash</sub>).
          </p>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="mf-advantages">✅ Key Advantages of Diversified Investing</h2>
          <p>
            A balanced portfolio structured across asset classes offers
            fundamental benefits over investing in a single fund:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Risk Mitigation</h3>
              <p>
                When one asset class (like Equity) performs poorly, another
                (like Debt or Gold) might stabilize the portfolio, lowering
                overall volatility.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Optimal Returns</h3>
              <p>
                Diversification increases the probability of capturing high
                returns from different market cycles, improving the
                risk-adjusted return.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Inflation Hedge</h3>
              <p>
                Including assets like Gold provides a hedge against inflation
                and economic uncertainty.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Tax Efficiency</h3>
              <p>
                Allocating between Equity and Debt funds allows tactical use of
                capital gains rules for improved tax efficiency over the long
                term.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="mf-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                What is Rupee Cost Averaging (RCA)?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                RCA is a core benefit of SIP investing. By investing a fixed sum
                regularly, you automatically buy more units when the price (NAV)
                is low and fewer units when the price is high, reducing your
                average acquisition cost over time.
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
                What is the most common allocation guideline?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                The most conservative rule is the **&quot;100 Minus Age&quot;**
                rule: the percentage of your portfolio invested in Equity should
                be 100 minus your current age. For instance, a 30-year-old would
                hold 70% in Equity and 30% in safer assets like Debt/Cash.
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
                How accurate are the &apos;Expected Returns&apos; inputs?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Expected returns are purely hypothetical inputs based on
                historical averages (e.g., Equity: 12-15%, Debt: 6-8%). Past
                performance is not a guarantee of future returns. You should
                adjust these rates based on your own risk tolerance and the
                current economic outlook.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* schedule preview */}
      <div className="article" style={{ marginTop: 12 }}>
        <h2>Schedule Preview (first 120 months)</h2>
        <div
          ref={printRef}
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
          <button onClick={handlePrint}>Print Schedule</button>
          <button
            onClick={() => {
              const summary = `Mutual funds: ${formatINR(
                monthlySIP
              )}/mo + Lump ${formatINR(
                lumpSumNow
              )} for ${years}y @ blended ${approxBlendedReturn}% ⇒ ${formatINR(
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
    </section>
  );
}
