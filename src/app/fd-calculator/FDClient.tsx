// src/app/fd-calculator/FDClient.tsx
'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

type ScheduleRow = {
  period: number;
  balance: number;
  interestThisPeriod: number;
};

const COMPOUND_OPTIONS = [
  { key: 'monthly', label: 'Monthly', periodsPerYear: 12 },
  { key: 'quarterly', label: 'Quarterly', periodsPerYear: 4 },
  { key: 'halfyearly', label: 'Half-Yearly', periodsPerYear: 2 },
  { key: 'yearly', label: 'Yearly', periodsPerYear: 1 },
] as const;

/* ---------- PieChart component (thick donut with rounded arc) ---------- */
function PieChart({
  principalPct,
  interestPct,
  size = 220,
}: {
  principalPct: number;
  interestPct: number;
  size?: number;
}) {
  const strokeWidth = Math.max(12, Math.round(size * 0.18));
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const interestLength = (interestPct / 100) * circumference;

  // If interestPct is 0, draw no arc; if 100, fill entire ring.
  const dashArray =
    interestPct <= 0
      ? `0 ${circumference}`
      : interestPct >= 100
      ? `${circumference} 0`
      : `${interestLength} ${Math.max(0, circumference - interestLength)}`;

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Principal vs interest"
      >
        {/* base (principal, pale) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f1f5f9" /* pale ring */
          strokeWidth={strokeWidth}
        />

        {/* interest arc overlay, start at top */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#60a5fa" /* interest color (blue) */
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 420ms ease' }}
          />
        </g>

        {/* donut hole */}
        <circle cx={cx} cy={cy} r={r * 0.5} fill="#fff" />

        {/* center label */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontWeight={700}
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

export default function FDClient() {
  const [principal, setPrincipal] = useState<number>(100000); // ₹1L
  const [annualRate, setAnnualRate] = useState<number>(7.0); // %
  const [years, setYears] = useState<number>(3);
  const [months, setMonths] = useState<number>(0);
  const [compoundKey, setCompoundKey] = useState<string>('quarterly');
  const [marginalTaxPct, setMarginalTaxPct] = useState<number>(20); // tax slab %
  const [showGrossOnly, setShowGrossOnly] = useState<boolean>(false);

  const totalMonths = Math.max(1, Math.round(years * 12 + months));
  const compound =
    COMPOUND_OPTIONS.find((c) => c.key === compoundKey) || COMPOUND_OPTIONS[1];
  const m = compound.periodsPerYear;

  const totalPeriods = useMemo(
    () => Math.ceil((totalMonths / 12) * m),
    [totalMonths, m]
  );

  const periodRate = useMemo(() => annualRate / 100 / m, [annualRate, m]);

  const maturity = useMemo(() => {
    if (principal <= 0 || annualRate <= 0 || totalPeriods <= 0)
      return principal;
    return principal * Math.pow(1 + periodRate, totalPeriods);
  }, [principal, periodRate, totalPeriods, annualRate]);

  const grossInterest = Math.max(0, maturity - principal);
  const taxOnInterest = Math.round(grossInterest * (marginalTaxPct / 100));
  const postTaxMaturity = Math.max(0, maturity - taxOnInterest);

  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let balance = principal;
    for (let p = 1; p <= totalPeriods; p++) {
      const interestThis = balance * periodRate;
      balance = balance + interestThis;
      rows.push({
        period: p,
        balance,
        interestThisPeriod: interestThis,
      });
    }
    return rows;
  }, [principal, periodRate, totalPeriods]);

  function exportCSV() {
    const header = ['Period', 'Balance', 'InterestThisPeriod'];
    const lines = [header.join(',')].concat(
      schedule.map((r) =>
        [
          r.period,
          Math.round(r.balance),
          Math.round(r.interestThisPeriod),
        ].join(',')
      )
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fd-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  // pie percentages (principal vs interest) — denominator = maturity (principal+interest)
  const interestPct = useMemo(() => {
    const denom = maturity > 0 ? maturity : principal;
    const p = denom <= 0 ? 0 : Math.round((grossInterest / denom) * 100);
    return Math.max(0, Math.min(100, p));
  }, [grossInterest, maturity, principal]);

  const principalPct = Math.max(0, 100 - interestPct);

  return (
    <section className="card">
      <h2>Fixed Deposit (FD) Calculator</h2>

      {/* Split: left inputs, right chart (re-using emi-split classes so your global.css works) */}
      <div className="emi-split" style={{ marginTop: 16 }}>
        <div className="emi-left">
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'grid', gap: 12 }}
          >
            <label>
              Principal (₹)
              <input
                type="number"
                value={principal}
                onChange={setter(setPrincipal)}
                min={0}
                step={1000}
              />
            </label>

            <label>
              Annual Interest Rate (%)
              <input
                type="number"
                step="0.01"
                value={annualRate}
                onChange={setter(setAnnualRate)}
                min={0}
              />
            </label>

            <div style={{ display: 'flex', gap: 8 }}>
              <label style={{ flex: 1 }}>
                Years
                <input
                  type="number"
                  value={years}
                  onChange={setter(setYears)}
                  min={0}
                  step={1}
                />
              </label>
              <label style={{ flex: 1 }}>
                Months
                <input
                  type="number"
                  value={months}
                  onChange={setter(setMonths)}
                  min={0}
                  max={11}
                />
              </label>
            </div>

            <label>
              Compounding Frequency
              <select
                value={compoundKey}
                onChange={(e) => setCompoundKey(e.target.value)}
              >
                {COMPOUND_OPTIONS.map((c) => (
                  <option value={c.key} key={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Marginal Tax Rate (%) — for tax estimate
              <input
                type="number"
                value={marginalTaxPct}
                onChange={setter(setMarginalTaxPct)}
                min={0}
                max={40}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={showGrossOnly}
                onChange={() => setShowGrossOnly(!showGrossOnly)}
              />
              Show gross interest only (do not subtract tax)
            </label>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-cta">Update</button>
              <button
                type="button"
                onClick={() => {
                  setPrincipal(100000);
                  setAnnualRate(7.0);
                  setYears(3);
                  setMonths(0);
                  setCompoundKey('quarterly');
                  setMarginalTaxPct(20);
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
              paddingBottom: 12,
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
                      background: '#fff',
                      display: 'inline-block',
                      borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.05)',
                      backgroundColor: '#fff',
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
                      background: '#60a5fa',
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
            Ad / Bank widget
          </div>
        </aside>
      </div>

      {/* Results — full width below split (re-using emi-results-full class) */}
      <div className="emi-results-full" style={{ marginTop: 16 }}>
        <div className="result-grid emi-summary-strip">
          <div className="result-card">
            <p className="result-label">Maturity Amount</p>
            <p className="result-primary">{formatINR(Math.round(maturity))}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Gross Interest</p>
            <p className="result-value">
              {formatINR(Math.round(grossInterest))}
            </p>
          </div>

          <div className="result-card">
            <p className="result-label">Estimated Tax on Interest</p>
            <p className="result-value">
              {formatINR(Math.round(taxOnInterest))}
            </p>
          </div>

          <div className="result-card">
            <p className="result-label">Post-tax Maturity</p>
            <p className="result-value">
              {formatINR(
                Math.round(showGrossOnly ? maturity : postTaxMaturity)
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Quick notes */}
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Quick Notes</h3>
        <ul>
          <li>
            Compounding frequency: {compound.label} — {m} compounding periods
            per year.
          </li>
          <li>Total compounding periods: {totalPeriods}.</li>
          <li>
            Estimate assumes interest credited and compounded as per frequency.
          </li>
          <li style={{ color: '#64748b' }}>
            Tax estimate is a simplification. Some banks deduct TDS at source;
            exemptions may apply. Consult a tax advisor.
          </li>
        </ul>
      </div>

      {/* Schedule preview */}
      <div className="article" style={{ marginTop: 16 }}>
        <h2>Compounding Schedule (periods)</h2>
        <div
          className="schedule-wrapper"
          style={{ maxHeight: 360, overflow: 'auto' }}
        >
          <table className="rate-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Interest this period</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((r) => (
                <tr key={r.period}>
                  <td>{r.period}</td>
                  <td>{formatINR(Math.round(r.interestThisPeriod))}</td>
                  <td>{formatINR(Math.round(r.balance))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={exportCSV}>Export Schedule CSV</button>
          <button
            onClick={() => {
              const summary = `FD ${formatINR(principal)} @ ${annualRate}% (${
                compound.label
              }) for ${years}y ${months}m ⇒ Maturity ${formatINR(
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
