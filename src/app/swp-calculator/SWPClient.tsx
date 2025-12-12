'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

/* ---------- PieChart: reusable, declared outside component ---------- */
function PieChart({
  principalPct,
  withdrawalsPct,
  size = 220,
}: {
  principalPct: number;
  withdrawalsPct: number;
  size?: number;
}) {
  const strokeWidth = Math.round(size * 0.18);
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const withdrawalsLength = (withdrawalsPct / 100) * circumference;

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Corpus vs withdrawals"
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
            strokeDasharray={`${withdrawalsLength} ${circumference}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 350ms ease' }}
          />
        </g>
        <circle cx={cx} cy={cy} r={r * 0.52} fill="#fff" />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontWeight={800}
          fontSize={16}
          fill="#081225"
        >
          {principalPct}% / {withdrawalsPct}%
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize={12}
          fill="#6b7280"
        >
          Corpus / Withdrawals
        </text>
      </svg>
    </div>
  );
}

/**
 * SWP (Systematic Withdrawal Plan) Client
 *
 * Assumptions:
 * - User starts with an initial corpus (lump sum).
 * - They withdraw a fixed amount at regular intervals (monthly).
 * - Remaining corpus continues to grow at expected annual return (compounded monthly).
 *
 * Outputs:
 * - How long the corpus lasts (months / years)
 * - Projected remaining corpus after given withdrawal horizon (if set)
 * - Schedule preview, CSV export, copy summary
 */
export default function SWPClient() {
  // Inputs
  const [initialCorpus, setInitialCorpus] = useState<number>(1000000); // ₹10L
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(10000); // ₹10k
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState<number>(8); // %
  const [withdrawalYears, setWithdrawalYears] = useState<number>(10); // If user wants horizon
  const [inflationPct, setInflationPct] = useState<number>(6); // optional
  const [startMonthOffset, setStartMonthOffset] = useState<number>(0); // months delay before first withdrawal

  const monthsHorizon = Math.max(1, Math.round(withdrawalYears * 12));
  const monthlyRate = expectedAnnualReturn / 12 / 100;
  const monthlyInflation = inflationPct / 12 / 100;

  // Simulate withdrawals month-by-month until corpus <= 0 or until horizon
  const schedule = useMemo(() => {
    const rows: {
      month: number;
      balance: number;
      withdrawal: number;
      interest: number;
    }[] = [];
    let bal = initialCorpus;
    const maxMonths = Math.max(1, monthsHorizon || 1200); // safety cap

    // allow optional start offset (e.g., delay while in moratorium or similar)
    for (let m = 1; m <= maxMonths; m++) {
      // grow by interest at month start
      const interest = bal * monthlyRate;
      bal += interest;

      // if this month is before first withdrawal, skip withdrawal
      if (m <= startMonthOffset) {
        rows.push({
          month: m,
          balance: Math.max(0, bal),
          withdrawal: 0,
          interest,
        });
        continue;
      }

      // withdraw fixed amount (but not more than balance)
      const withdrawal = Math.min(monthlyWithdrawal, bal);
      bal = Math.max(0, bal - withdrawal);

      rows.push({
        month: m,
        balance: Math.round(bal),
        withdrawal: Math.round(withdrawal),
        interest: Math.round(interest),
      });

      // if corpus exhausted, stop
      if (bal <= 0) {
        break;
      }
    }

    return rows;
  }, [
    initialCorpus,
    monthlyWithdrawal,
    monthlyRate,
    monthsHorizon,
    startMonthOffset,
  ]);

  // compute summary metrics
  const monthsUntilExhaustion = schedule.length;
  const yearsUntilExhaustion = (monthsUntilExhaustion / 12).toFixed(1);
  const lastBalance = schedule.length
    ? schedule[schedule.length - 1].balance
    : initialCorpus;
  const totalWithdrawn = schedule.reduce((s, r) => s + r.withdrawal, 0);
  const totalInterestEarned = schedule.reduce((s, r) => s + r.interest, 0);

  // If user set a horizon, compute projected remaining corpus after that horizon (schedule truncated to horizon)
  const projectedAfterHorizon = (() => {
    if (!monthsHorizon) return null;
    // if simulation ended earlier than horizon, corpus exhausted -> 0
    if (schedule.length < monthsHorizon) return 0;
    // else find balance at monthsHorizon
    const r = schedule[monthsHorizon - 1];
    return r ? r.balance : 0;
  })();

  // Pie chart percentages: withdrawals vs remaining corpus at horizon (or last month)
  const pieReferenceBalance =
    projectedAfterHorizon !== null
      ? (projectedAfterHorizon as number)
      : lastBalance;
  // compute withdrawals percentage relative to initial corpus + interest (simple)
  // We'll compute total withdrawn vs (initialCorpus + totalInterestEarned)
  const grossPool = Math.max(1, initialCorpus + totalInterestEarned);
  const withdrawalsPct = Math.round((totalWithdrawn / grossPool) * 100);
  const principalPct = Math.max(0, 100 - withdrawalsPct);

  // CSV export
  function exportCSV() {
    const header = [
      'Month',
      'Withdrawal',
      'InterestEarnedThisMonth',
      'Balance',
    ];
    const lines = [header.join(',')].concat(
      schedule.map((r) =>
        [r.month, r.withdrawal, r.interest, r.balance].join(',')
      )
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swp-schedule-${initialCorpus}-${monthlyWithdrawal}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // setters
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="card">
      <h2>SWP Calculator</h2>

      {/* Two-column split: left = inputs, right = pie chart */}
      <div className="emi-split" style={{ marginTop: 18 }}>
        <div className="emi-left">
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'grid', gap: 12 }}
          >
            <div className="form-row">
              <label>
                Initial Corpus (₹)
                <input
                  type="number"
                  value={initialCorpus}
                  onChange={setter(setInitialCorpus)}
                  min={0}
                  step={1000}
                />
              </label>

              <label>
                Monthly Withdrawal (₹)
                <input
                  type="number"
                  value={monthlyWithdrawal}
                  onChange={setter(setMonthlyWithdrawal)}
                  min={0}
                  step={500}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Expected Annual Return (%)
                <input
                  type="number"
                  step="0.1"
                  value={expectedAnnualReturn}
                  onChange={setter(setExpectedAnnualReturn)}
                />
              </label>

              <label>
                Withdrawal Horizon (Years)
                <input
                  type="number"
                  value={withdrawalYears}
                  onChange={setter(setWithdrawalYears)}
                  min={0}
                  step={0.5}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Inflation (% per year)
                <input
                  type="number"
                  step="0.1"
                  value={inflationPct}
                  onChange={setter(setInflationPct)}
                />
              </label>

              <label>
                Start Delay (months)
                <input
                  type="number"
                  value={startMonthOffset}
                  onChange={setter(setStartMonthOffset)}
                  min={0}
                />
              </label>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-cta">Update</button>
              <button
                type="button"
                onClick={() => {
                  setInitialCorpus(1000000);
                  setMonthlyWithdrawal(10000);
                  setExpectedAnnualReturn(8);
                  setWithdrawalYears(10);
                  setInflationPct(6);
                  setStartMonthOffset(0);
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
                withdrawalsPct={withdrawalsPct}
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
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>{principalPct}%</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Remaining
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
                    <div style={{ fontWeight: 800 }}>{withdrawalsPct}%</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Withdrawn
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

      {/* Results: full width */}
      <div className="emi-results-full" style={{ marginTop: 18 }}>
        <div className="result-grid emi-summary-strip">
          <div className="result-card">
            <p className="result-label">
              Months until corpus exhaustion (simulated)
            </p>
            <p className="result-primary">{monthsUntilExhaustion}</p>
            <p
              className="result-value"
              style={{ fontSize: 13, color: '#6b7280' }}
            >
              ≈ {yearsUntilExhaustion} years
            </p>
          </div>

          <div className="result-card">
            <p className="result-label">Total Withdrawn (so far)</p>
            <p className="result-value">
              {formatINR(Math.round(totalWithdrawn))}
            </p>
          </div>

          <div className="result-card">
            <p className="result-label">Projected Remaining Corpus</p>
            <p className="result-primary">
              {formatINR(Math.round(pieReferenceBalance || 0))}
            </p>
          </div>
        </div>
      </div>

      {/* Schedule preview */}
      <div className="article" style={{ marginTop: 18 }}>
        <h2>SWP Schedule Preview</h2>
        <div
          className="schedule-wrapper"
          style={{ maxHeight: 360, overflow: 'auto' }}
        >
          <table className="rate-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Withdrawal</th>
                <th>Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((r) => (
                <tr key={r.month}>
                  <td>{r.month}</td>
                  <td>{formatINR(r.withdrawal)}</td>
                  <td>{formatINR(r.interest)}</td>
                  <td>{formatINR(r.balance)}</td>
                </tr>
              ))}
              {schedule.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    No rows (check inputs)
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={exportCSV}>Export Schedule CSV</button>
          <button
            onClick={() => {
              const summary = `SWP from ${formatINR(
                initialCorpus
              )} withdrawing ${formatINR(
                monthlyWithdrawal
              )}/mo @ ${expectedAnnualReturn}% ⇒ projected remaining ${formatINR(
                Math.round(pieReferenceBalance || 0)
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
