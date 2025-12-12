// ./src/app/investing/swp/SWPClient.tsx
'use client';

import React, { useMemo, useRef, useState } from 'react';

function formatINR(value: number) {
  return (
    '₹' + Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 })
  );
}

type SWPScheduleRow = {
  period: number; // 1..N
  withdrawn: number;
  returns: number;
  balance: number;
};

const FREQUENCIES = [
  { key: 'monthly', label: 'Monthly', periodsPerYear: 12 },
  { key: 'quarterly', label: 'Quarterly', periodsPerYear: 4 },
  { key: 'halfyearly', label: 'Half-Yearly', periodsPerYear: 2 },
  { key: 'yearly', label: 'Yearly', periodsPerYear: 1 },
] as const;

export default function SWPClient() {
  // Inputs
  const [initialCorpus, setInitialCorpus] = useState<number>(1000000); // ₹10L default
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState<number>(8.0); // %
  const [frequencyKey, setFrequencyKey] = useState<string>('monthly');
  const [durationYears, setDurationYears] = useState<number>(10);
  const [withdrawalMode, setWithdrawalMode] = useState<'amount' | 'percent'>(
    'amount'
  );
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(10000); // per period if amount
  const [withdrawalPercentAnnual, setWithdrawalPercentAnnual] =
    useState<number>(6); // % of initial corpus per year
  const [stopAtZero, setStopAtZero] = useState<boolean>(true);

  const printRef = useRef<HTMLDivElement | null>(null);

  // Derived
  const frequency =
    FREQUENCIES.find((f) => f.key === frequencyKey) || FREQUENCIES[0];
  const periodsPerYear = frequency.periodsPerYear;
  const totalPeriods = Math.max(1, Math.round(durationYears * periodsPerYear));
  const periodRate = expectedAnnualReturn / 100 / periodsPerYear;

  // withdrawal per period depending on mode:
  // - amount: user-provided withdrawalAmount (per period)
  // - percent: withdrawalPercentAnnual is annual percent of INITIAL corpus; per period = (pct/100)/periodsPerYear * initialCorpus
  const withdrawalPerPeriod = useMemo(() => {
    if (withdrawalMode === 'amount') return Math.max(0, withdrawalAmount);
    const annualPortion = (withdrawalPercentAnnual / 100) * initialCorpus;
    return annualPortion / periodsPerYear;
  }, [
    withdrawalMode,
    withdrawalAmount,
    withdrawalPercentAnnual,
    periodsPerYear,
    initialCorpus,
  ]);

  // Build schedule
  const schedule: SWPScheduleRow[] = useMemo(() => {
    const rows: SWPScheduleRow[] = [];
    let balance = initialCorpus;
    let stoppedEarly = false;
    for (let p = 1; p <= totalPeriods; p++) {
      if (balance <= 0 && stopAtZero) {
        stoppedEarly = true;
        break;
      }
      // interest earned this period (on opening balance)
      const returns = balance * periodRate;
      balance += returns;
      // withdraw
      const withdraw = Math.min(balance, withdrawalPerPeriod);
      balance = Math.max(0, balance - withdraw);

      rows.push({
        period: p,
        withdrawn: withdraw,
        returns,
        balance,
      });

      // if balance becomes 0 and stopAtZero, break next loop iteration will stop
      if (balance <= 0 && stopAtZero) {
        break;
      }
    }

    // If the plan is to continue even when <0 (rare), we already guard withdraw <= balance.
    return rows;
  }, [
    initialCorpus,
    periodRate,
    totalPeriods,
    withdrawalPerPeriod,
    stopAtZero,
  ]);

  const totalWithdrawn = useMemo(
    () => schedule.reduce((s, r) => s + r.withdrawn, 0),
    [schedule]
  );
  const totalReturns = useMemo(
    () => schedule.reduce((s, r) => s + r.returns, 0),
    [schedule]
  );
  const finalBalance = useMemo(
    () =>
      schedule.length > 0
        ? schedule[schedule.length - 1].balance
        : initialCorpus,
    [schedule, initialCorpus]
  );

  // Pie percentages (Withdrawn vs Remaining vs Returns could overlap; we'll show Withdrawn vs Remaining)
  const pieWithdrawnPct = useMemo(() => {
    const totalValue = Math.max(1, initialCorpus + totalReturns); // amount invested plus returns produced
    return Math.round((totalWithdrawn / totalValue) * 100);
  }, [initialCorpus, totalReturns, totalWithdrawn]);

  const pieRemainingPct = Math.max(0, 100 - pieWithdrawnPct);

  // CSV export
  function exportCSV() {
    const header = ['Period', 'Withdrawn', 'Returns', 'Balance'];
    const lines = [header.join(',')].concat(
      schedule.map((r) =>
        [
          r.period,
          Math.round(r.withdrawn),
          Math.round(r.returns),
          Math.round(r.balance),
        ].join(',')
      )
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swp-schedule-${initialCorpus}-${totalPeriods}p.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Print schedule area
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
          <title>SWP Schedule</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
            th, td { padding: 8px 10px; border: 1px solid #ddd; text-align: right; }
            th { background: #f7f7f7; text-align: left; }
            caption { font-weight: 700; margin-bottom: 8px; text-align: left; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  }

  // Small setters
  const setNumber =
    (setter: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value === '' ? 0 : Number(e.target.value));
    };

  // Pie (simple thick donut like others)
  function Pie({
    withdrawnPct,
    remainingPct,
    size = 200,
  }: {
    withdrawnPct: number;
    remainingPct: number;
    size?: number;
  }) {
    const strokeWidth = Math.round(size * 0.18);
    const r = (size - strokeWidth) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * r;
    const withdrawnLen = (withdrawnPct / 100) * circumference;
    const dash = `${withdrawnLen} ${Math.max(0, circumference - withdrawnLen)}`;

    return (
      <div style={{ width: size, height: size, position: 'relative' }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label="Withdrawn vs Remaining"
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
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#a0e870"
              strokeWidth={strokeWidth}
              strokeDasharray={dash}
              strokeLinecap="round"
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
            {withdrawnPct}% / {remainingPct}%
          </text>
          <text
            x={cx}
            y={cy + 16}
            textAnchor="middle"
            fontSize={12}
            fill="#6b7280"
          >
            Withdrawn / Remaining
          </text>
        </svg>
      </div>
    );
  }

  return (
    <section className="card">
      <h2>SWP (Systematic Withdrawal Plan) Calculator</h2>

      {/* split: inputs left, pie right */}
      <div className="emi-split" style={{ marginTop: 16 }}>
        <div className="emi-left">
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'grid', gap: 12 }}
          >
            <label>
              Initial Corpus (₹)
              <input
                type="number"
                value={initialCorpus}
                min={0}
                step={1000}
                onChange={setNumber(setInitialCorpus)}
              />
            </label>

            <label>
              Expected Annual Return (%)
              <input
                type="number"
                step="0.01"
                value={expectedAnnualReturn}
                onChange={setNumber(setExpectedAnnualReturn)}
              />
            </label>

            <label>
              Frequency
              <select
                value={frequencyKey}
                onChange={(e) => setFrequencyKey(e.target.value)}
              >
                {FREQUENCIES.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>

            <div style={{ display: 'flex', gap: 8 }}>
              <label style={{ flex: 1 }}>
                Duration (Years)
                <input
                  type="number"
                  value={durationYears}
                  min={1}
                  step={1}
                  onChange={setNumber(setDurationYears)}
                />
              </label>
            </div>

            <label
              style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <input
                style={{ marginLeft: 8 }}
                type="checkbox"
                checked={stopAtZero}
                onChange={() => setStopAtZero(!stopAtZero)}
              />
              Stop when corpus reaches zero
            </label>

            <label>
              Withdrawal Mode
              <select
                value={withdrawalMode}
                onChange={(e) => setWithdrawalMode(e.target.value as any)}
                style={{ marginTop: 6 }}
              >
                <option value="amount">Fixed amount per period</option>
                <option value="percent">
                  Annual % of initial corpus (converted to per-period)
                </option>
              </select>
            </label>

            {withdrawalMode === 'amount' ? (
              <label>
                Withdrawal per period (₹)
                <input
                  type="number"
                  value={withdrawalAmount}
                  min={0}
                  step={100}
                  onChange={setNumber(setWithdrawalAmount)}
                />
              </label>
            ) : (
              <label>
                Withdrawal (% of initial corpus per year)
                <input
                  type="number"
                  value={withdrawalPercentAnnual}
                  min={0}
                  step={0.1}
                  onChange={setNumber(setWithdrawalPercentAnnual)}
                />
                <div style={{ fontSize: 13, color: '#6b7280' }}>
                  This will be converted into per-period withdrawal:{' '}
                  {withdrawalPercentAnnual}% of initial corpus per year ÷{' '}
                  {periodsPerYear} periods.
                </div>
              </label>
            )}

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-cta">Update</button>
              <button
                type="button"
                onClick={() => {
                  // reset
                  setInitialCorpus(1000000);
                  setExpectedAnnualReturn(8.0);
                  setFrequencyKey('monthly');
                  setDurationYears(10);
                  setWithdrawalMode('amount');
                  setWithdrawalAmount(10000);
                  setWithdrawalPercentAnnual(6);
                  setStopAtZero(true);
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* right: pie */}
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
              <Pie
                withdrawnPct={pieWithdrawnPct}
                remainingPct={pieRemainingPct}
                size={220}
              />
              <div style={{ display: 'flex', gap: 18, marginTop: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      background: '#f1f5f9',
                      display: 'inline-block',
                      borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.02)',
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>{pieRemainingPct}%</div>
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
                      background: '#a0e870',
                      display: 'inline-block',
                      borderRadius: 6,
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>{pieWithdrawnPct}%</div>
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

      {/* full-width results below */}
      <div className="emi-results-full" style={{ marginTop: 18 }}>
        <div className="result-grid emi-summary-strip">
          <div className="result-card">
            <p className="result-label">Total Withdrawn</p>
            <p className="result-primary">
              {formatINR(Math.round(totalWithdrawn))}
            </p>
          </div>

          <div className="result-card">
            <p className="result-label">Total Returns Earned</p>
            <p className="result-value">
              {formatINR(Math.round(totalReturns))}
            </p>
          </div>

          <div className="result-card">
            <p className="result-label">Final Balance</p>
            <p className="result-value">
              {formatINR(Math.round(finalBalance))}
            </p>
          </div>
        </div>
      </div>

      {/* brief summary card */}
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Plan Summary</h3>
        <p style={{ margin: '6px 0' }}>
          <strong>Frequency:</strong> {frequency.label} •{' '}
          <strong>Duration:</strong> {durationYears} years ({totalPeriods}{' '}
          periods)
        </p>
        <p style={{ margin: '6px 0' }}>
          <strong>Withdrawal per period:</strong>{' '}
          {formatINR(Math.round(withdrawalPerPeriod))}
          {withdrawalMode === 'percent' && (
            <span style={{ marginLeft: 8, color: '#6b7280' }}>
              (derived from {withdrawalPercentAnnual}% p.a.)
            </span>
          )}
        </p>
        <p style={{ margin: '6px 0', color: '#6b7280' }}>
          This is a simplified projection that assumes returns are applied each
          period and withdrawals happen after returns are credited.
        </p>
      </div>

      {/* schedule */}
      <div className="article" style={{ marginTop: 18 }}>
        <h2>Withdrawal Schedule</h2>
        <div
          ref={printRef}
          className="schedule-wrapper"
          style={{ marginTop: 12 }}
        >
          <table className="rate-table" style={{ width: '100%' }}>
            <caption>
              SWP from {formatINR(initialCorpus)} • {expectedAnnualReturn}% p.a.
              • {frequency.label} withdrawals
            </caption>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Period</th>
                <th style={{ textAlign: 'right' }}>Withdrawn</th>
                <th style={{ textAlign: 'right' }}>Returns</th>
                <th style={{ textAlign: 'right' }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    No schedule (check inputs)
                  </td>
                </tr>
              ) : (
                schedule.map((r) => (
                  <tr key={r.period}>
                    <td style={{ textAlign: 'left' }}>{r.period}</td>
                    <td style={{ textAlign: 'right' }}>
                      {formatINR(Math.round(r.withdrawn))}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {formatINR(Math.round(r.returns))}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {formatINR(Math.round(r.balance))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="table-apply-btn" onClick={exportCSV}>
            Export Schedule CSV
          </button>
          <button className="button" onClick={handlePrint}>
            Print Schedule
          </button>
          <button
            className="button"
            onClick={() => {
              const summary = `SWP ${formatINR(
                initialCorpus
              )} @ ${expectedAnnualReturn}% → ${formatINR(
                Math.round(withdrawalPerPeriod)
              )} per ${frequency.label}`;
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
