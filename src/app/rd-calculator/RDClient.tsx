'use client';
import React, { useMemo, useRef, useState } from 'react';

/* Helper formatting */
function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

/* PieChart declared outside component to avoid "created during render" issues */
function PieChart({
  principalPct,
  interestPct,
  size = 200,
}: {
  principalPct: number;
  interestPct: number;
  size?: number;
}) {
  const strokeWidth = Math.round(size * 0.18);
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const interestLength = (interestPct / 100) * circumference;

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Principal vs interest"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#eff8e5"
          strokeWidth={strokeWidth}
        />
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#16a34a"
            strokeWidth={strokeWidth}
            strokeDasharray={`${interestLength} ${circumference}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 400ms ease' }}
          />
        </g>
        <circle cx={cx} cy={cy} r={r * 0.5} fill="#fff" />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontWeight={800}
          fontSize={16}
          fill="#081225"
        >
          {principalPct}% / {interestPct}%
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize={12}
          fill="#6b7280"
        >
          Principal / Interest
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

export default function RDClient() {
  // Inputs
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [annualRate, setAnnualRate] = useState<number>(6.5); // %
  const [years, setYears] = useState<number>(5);
  const [compounding, setCompounding] = useState<
    'monthly' | 'quarterly' | 'yearly'
  >('monthly');
  const [showGrossOnly, setShowGrossOnly] = useState<boolean>(false); // placeholder for gross display
  const printRef = useRef<HTMLDivElement | null>(null);

  // Derived
  const months = Math.max(1, Math.round(years * 12));
  const mPerYear =
    compounding === 'monthly' ? 12 : compounding === 'quarterly' ? 4 : 1;
  const periodRate = annualRate / 100 / mPerYear;

  // For RD (monthly deposit) we treat monthly contributions with monthly compounding.
  // If compounding !== monthly, approximate by converting annual rate to monthly equivalent:
  const monthlyRate = useMemo(() => {
    if (compounding === 'monthly') return annualRate / 12 / 100;
    // approximate monthly equivalent by (1+annual/m)^(m/12)-1 but simpler:
    const effectiveAnnual = Math.pow(1 + periodRate, mPerYear) - 1;
    return Math.pow(1 + effectiveAnnual, 1 / 12) - 1;
  }, [annualRate, compounding, periodRate, mPerYear]);

  // Future value of monthly recurring deposit (monthly compounding)
  const maturity = useMemo(() => {
    const P = monthlyDeposit;
    const r = monthlyRate;
    const n = months;
    if (P <= 0) return 0;
    if (r === 0) return P * n;
    // FV = P * [ ((1+r)^n - 1) / r ] * (1+r)
    return P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  }, [monthlyDeposit, monthlyRate, months]);

  const totalInvested = Math.round(monthlyDeposit * months);
  const totalReturns = Math.round(Math.max(0, maturity - totalInvested));

  // schedule preview (monthly)
  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let value = 0;
    for (let m = 1; m <= months; m++) {
      // deposit at start of month then compound
      value = value * (1 + monthlyRate) + monthlyDeposit;
      const invested = monthlyDeposit * m;
      rows.push({
        month: m,
        invested: Math.round(invested),
        value: Math.round(value),
        returns: Math.round(value - invested),
      });
    }
    return rows;
  }, [monthlyDeposit, monthlyRate, months]);

  // Pie chart percentages principal vs interest
  const interestPct = useMemo(() => {
    const tp = maturity;
    if (tp <= 0) return 0;
    return Math.max(
      0,
      Math.min(100, Math.round(((maturity - totalInvested) / tp) * 100))
    );
  }, [maturity, totalInvested]);

  const principalPct = Math.max(0, 100 - interestPct);

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
    a.download = `rd-schedule-${monthlyDeposit}-${months}m.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Print schedule
  function handlePrint() {
    if (!printRef.current) {
      window.print();
      return;
    }
    const printContents = printRef.current.innerHTML;
    const w = window.open('', '_blank', 'width=900,height=700');
    if (!w) {
      alert('Popup blocked — allow popups to print.');
      return;
    }
    w.document.write(`
      <html>
        <head>
          <title>RD Schedule</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #111 }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px }
            th, td { padding: 8px 10px; border: 1px solid #ddd; text-align: right }
            th { background: #f7f7f7; text-align: left }
            caption { font-weight: 700; margin-bottom: 8px; text-align: left }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  }

  /* safe setters */
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="card">
      <h2>RD (Recurring Deposit) Calculator</h2>

      {/* split: left inputs, right chart */}
      <div className="emi-split" style={{ marginTop: 18 }}>
        <div className="emi-left">
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'grid', gap: 12 }}
          >
            <div className="form-row">
              <label>
                Monthly Deposit (₹)
                <input
                  type="number"
                  value={monthlyDeposit}
                  onChange={setter(setMonthlyDeposit)}
                  min={0}
                  step={100}
                />
              </label>

              <label>
                Annual Rate (%)
                <input
                  type="number"
                  step="0.01"
                  value={annualRate}
                  onChange={setter(setAnnualRate)}
                  min={0}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Tenure (Years)
                <input
                  type="number"
                  value={years}
                  onChange={setter(setYears)}
                  min={0.25}
                  step={0.25}
                />
              </label>

              <label>
                Compounding
                <select
                  value={compounding}
                  onChange={(e) => setCompounding(e.target.value as any)}
                  style={{ marginTop: 6 }}
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </label>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="primary-cta"
                onClick={() => {
                  /* reactive */
                }}
              >
                Calculate
              </button>
              <button
                type="button"
                onClick={() => {
                  setMonthlyDeposit(5000);
                  setAnnualRate(6.5);
                  setYears(5);
                  setCompounding('monthly');
                  setShowGrossOnly(false);
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <PieChart
                principalPct={principalPct}
                interestPct={interestPct}
                size={220}
              />
              <div style={{ display: 'flex', gap: 18, marginTop: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      background: '#eff8e5',
                      display: 'inline-block',
                      borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.02)',
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>{principalPct}%</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Principal
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      background: '#16a34a',
                      display: 'inline-block',
                      borderRadius: 6,
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>{interestPct}%</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Interest
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ad-box" style={{ marginTop: 14 }}>
            Ad / Widget
          </div>
        </aside>
      </div>

      {/* results full width */}
      <div className="emi-results-full" style={{ marginTop: 18 }}>
        <div className="result-grid emi-summary-strip">
          <div className="result-card">
            <p className="result-label">Maturity Amount</p>
            <p className="result-primary">{formatINR(Math.round(maturity))}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Total Invested</p>
            <p className="result-value">{formatINR(totalInvested)}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Total Interest</p>
            <p className="result-value">{formatINR(totalReturns)}</p>
          </div>
        </div>
      </div>

      {/* schedule & actions */}
      <div className="article" style={{ marginTop: 18 }}>
        <h2>Schedule Preview</h2>
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
              const summary = `RD ${formatINR(
                monthlyDeposit
              )}/mo for ${years}y @ ${annualRate}% ⇒ ${formatINR(
                Math.round(maturity)
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
