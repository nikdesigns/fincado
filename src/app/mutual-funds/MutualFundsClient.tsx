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
    return [
      {
        color: '#16a34a',
        pct: Math.round(
          (perAssetFuture.equity / perAssetFuture.total) * 100 || 0
        ),
      },
      {
        color: '#4ade80',
        pct: Math.round(
          (perAssetFuture.debt / perAssetFuture.total) * 100 || 0
        ),
      },
      {
        color: '#86efac',
        pct: Math.round(
          (perAssetFuture.gold / perAssetFuture.total) * 100 || 0
        ),
      },
      {
        color: '#d1fae5',
        pct: Math.round(
          (perAssetFuture.cash / perAssetFuture.total) * 100 || 0
        ),
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
    <section className="card">
      <h2>Mutual Funds Planner</h2>

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
              <button className="primary-cta">Update</button>
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
                gap: 12,
                marginTop: 12,
                justifyContent: 'center',
              }}
            >
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
                      (perAssetFuture.equity / perAssetFuture.total) * 100 || 0
                    )}
                    %
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Equity</div>
                </div>
              </div>

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
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                marginTop: 8,
                justifyContent: 'center',
              }}
            >
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
          </div>

          <div className="ad-box" style={{ marginTop: 12 }}>
            Ad / Widget
          </div>
        </aside>
      </div>

      {/* results full width */}
      <div className="emi-results-full" style={{ marginTop: 18 }}>
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

        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>
          Approx blended annual return by allocation:{' '}
          <strong>{approxBlendedReturn}%</strong>
        </p>
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
