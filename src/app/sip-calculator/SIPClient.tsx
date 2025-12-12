'use client';
import React, { useMemo } from 'react';

function formatINR(value: number) {
  return (
    '₹' + Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 })
  );
}

function round(value: number, digits = 0) {
  return Number(value.toFixed(digits));
}

type ScheduleRow = {
  month: number;
  invested: number;
  value: number;
  returns: number;
};

/* PieChart declared OUTSIDE component to avoid "created during render" issues */
function PieChart({
  principalPct,
  interestPct,
  size = 220,
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
        {/* base ring = principal (pale green) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#eff8e5"
          strokeWidth={strokeWidth}
        />
        {/* interest arc overlay (website green) */}
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
            style={{ transition: 'stroke-dasharray 350ms ease' }}
          />
        </g>

        {/* center hole */}
        <circle cx={cx} cy={cy} r={r * 0.52} fill="#fff" />

        {/* center text */}
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

export default function SIPClient() {
  // Inputs
  const [monthlySIP, setMonthlySIP] = React.useState<number>(5000);
  const [annualReturn, setAnnualReturn] = React.useState<number>(12); // %
  const [years, setYears] = React.useState<number>(10);
  const [lumpSumNow, setLumpSumNow] = React.useState<number>(0);
  const [inflationPct, setInflationPct] = React.useState<number>(6);
  const [targetAmount, setTargetAmount] = React.useState<number>(0);

  // Derived
  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = annualReturn / 12 / 100;
  const inflationMonthly = inflationPct / 12 / 100;

  const futureValue = useMemo(() => {
    if (monthlySIP <= 0 && lumpSumNow <= 0) return 0;
    let fvSIP = 0;
    if (monthlySIP > 0) {
      fvSIP =
        monthlySIP *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }
    const fvLump = lumpSumNow * Math.pow(1 + monthlyRate, months);
    return fvSIP + fvLump;
  }, [monthlySIP, monthlyRate, months, lumpSumNow]);

  const totalInvested = Math.round(monthlySIP * months + lumpSumNow);
  const totalReturns = Math.round(Math.max(0, futureValue - totalInvested));

  const realFutureValue = useMemo(() => {
    if (inflationPct <= 0) return futureValue;
    return futureValue / Math.pow(1 + inflationMonthly, months);
  }, [futureValue, inflationMonthly, months, inflationPct]);

  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let value = lumpSumNow;
    for (let m = 1; m <= months; m++) {
      value = value * (1 + monthlyRate) + monthlySIP;
      const invested = monthlySIP * m + lumpSumNow;
      rows.push({
        month: m,
        invested: Math.round(invested),
        value: Math.round(value),
        returns: Math.round(value - invested),
      });
    }
    return rows;
  }, [months, monthlyRate, monthlySIP, lumpSumNow]);

  const requiredSIPForTarget = useMemo(() => {
    if (targetAmount <= 0) return 0;
    const factor =
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const fvLump = lumpSumNow * Math.pow(1 + monthlyRate, months);
    const needFromSIP = Math.max(0, targetAmount - fvLump);
    if (factor <= 0) return 0;
    return Math.ceil(needFromSIP / factor);
  }, [targetAmount, monthlyRate, months, lumpSumNow]);

  // Pie chart percentages
  const interestPct = useMemo(() => {
    const tp = futureValue;
    if (tp <= 0) return 0;
    return Math.max(
      0,
      Math.min(100, Math.round(((futureValue - totalInvested) / tp) * 100))
    );
  }, [futureValue, totalInvested]);

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
    a.download = 'sip-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // safe setter helper
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="card">
      <h2>SIP Calculator</h2>

      {/* SPLIT: left = inputs, right = pie chart */}
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
                Expected Annual Return (%)
                <input
                  type="number"
                  value={annualReturn}
                  onChange={setter(setAnnualReturn)}
                  step="0.1"
                  min={-100}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Investment Duration (Years)
                <input
                  type="number"
                  value={years}
                  onChange={setter(setYears)}
                  min={0.1}
                  step={0.5}
                />
              </label>

              <label>
                Existing Lump Sum (₹)
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
                Inflation (% per year)
                <input
                  type="number"
                  value={inflationPct}
                  onChange={setter(setInflationPct)}
                  step="0.1"
                  min={0}
                />
              </label>

              <label>
                Target Amount (₹)
                <input
                  type="number"
                  value={targetAmount}
                  onChange={setter(setTargetAmount)}
                  min={0}
                />
              </label>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-cta">Update</button>
              <button
                type="button"
                onClick={() => {
                  setMonthlySIP(5000);
                  setAnnualReturn(12);
                  setYears(10);
                  setLumpSumNow(0);
                  setInflationPct(6);
                  setTargetAmount(0);
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
                      Returns
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

      {/* RESULTS: full width below the split */}
      <div className="emi-results-full" style={{ marginTop: 18 }}>
        <div className="result-grid emi-summary-strip">
          <div className="result-card">
            <p className="result-label">Estimated Value (Nominal)</p>
            <p className="result-primary">
              {formatINR(Math.round(futureValue))}
            </p>
          </div>

          <div className="result-card">
            <p className="result-label">Total Invested</p>
            <p className="result-value">{formatINR(totalInvested)}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Total Returns (Nominal)</p>
            <p className="result-value">{formatINR(totalReturns)}</p>
          </div>
        </div>
      </div>

      {/* Inflation-adjusted */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Inflation-adjusted value</h3>
        <p>
          Estimated future value in today&apos;s rupees:{' '}
          <strong>{formatINR(Math.round(realFutureValue))}</strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          Adjusted using the inflation rate you set; use this to gauge
          purchasing power.
        </p>
      </div>

      {/* Target planner */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Target Planner</h3>
        <p style={{ marginTop: 8 }}>
          Required monthly SIP to reach{' '}
          {targetAmount > 0 ? formatINR(targetAmount) : 'your target'} in{' '}
          {years} years: <strong>{formatINR(requiredSIPForTarget)}</strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          This assumes expected annual return = {annualReturn}% and existing
          lump sum = {formatINR(lumpSumNow)}.
        </p>
      </div>

      {/* Schedule preview */}
      <div className="article" style={{ marginTop: 18 }}>
        <h2>Schedule Preview</h2>
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

        {schedule.length > 120 && (
          <p style={{ marginTop: 8 }}>Showing first 120 months.</p>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <button onClick={exportCSV}>Export Schedule CSV</button>
        <button
          onClick={() => {
            const summary = `SIP ${formatINR(
              monthlySIP
            )} for ${years} years at ${annualReturn}% ⇒ ${formatINR(
              Math.round(futureValue)
            )} (Invested ${formatINR(totalInvested)})`;
            navigator.clipboard?.writeText(summary);
            alert('Summary copied to clipboard');
          }}
        >
          Copy Summary
        </button>
      </div>
    </section>
  );
}
