// src/app/ssy-calculator/SSYClient.tsx
'use client';

import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

/* ---------- Pie/Donut chart component (declared outside render) ---------- */
function Donut({
  valuePercent,
  size = 220,
  innerLabel,
  outerLabel,
}: {
  valuePercent: number; // percent representing "interest" portion
  size?: number;
  innerLabel?: string;
  outerLabel?: string;
}) {
  const strokeWidth = Math.round(size * 0.18);
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const interestLength = (valuePercent / 100) * circumference;
  const principalLength = circumference - interestLength;

  // site green and complementary shade
  const principalColor = '#eff8e5'; // pale background for principal
  const interestColor = '#16a34a'; // site green
  // small accent for edge
  const accent = '#8bd16b';

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Maturity composition"
      >
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {/* principal base ring */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={principalColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* interest arc */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={interestColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${interestLength} ${principalLength}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 300ms ease' }}
          />
        </g>

        {/* center hole */}
        <circle cx={cx} cy={cy} r={r * 0.52} fill="#fff" />

        {/* labels in center */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontWeight={800}
          fontSize={16}
          fill="#081225"
        >
          {innerLabel}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fontSize={12}
          fill="#6b7280"
        >
          {outerLabel}
        </text>
      </svg>
    </div>
  );
}

/* ---------- Main SSY Client component ---------- */
export default function SSYClient() {
  // Inputs — typical SSY style inputs but adjustable
  const [currentAge, setCurrentAge] = useState<number>(5); // age of the girl
  const [depositMode, setDepositMode] = useState<'monthly' | 'yearly'>(
    'monthly'
  );
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(2500);
  const [yearlyDeposit, setYearlyDeposit] = useState<number>(30000);
  const [yearsToDeposit, setYearsToDeposit] = useState<number>(15); // typically 15 years allowed
  const [annualRate, setAnnualRate] = useState<number>(8.2); // example SSY rate (editable)

  // Basic derived values
  const MATURITY_AGE = 21;
  const monthsUntilMaturity = Math.max(0, (MATURITY_AGE - currentAge) * 12);
  const monthsToDeposit = Math.max(
    0,
    Math.min(monthsUntilMaturity, yearsToDeposit * 12)
  );
  const monthlyRate = annualRate / 100 / 12;

  // total deposits made (simple)
  const totalDeposited = useMemo(() => {
    if (depositMode === 'monthly') {
      return Math.round(monthlyDeposit * monthsToDeposit);
    } else {
      const years = Math.ceil(monthsToDeposit / 12);
      return Math.round(yearlyDeposit * years);
    }
  }, [depositMode, monthlyDeposit, yearlyDeposit, monthsToDeposit]);

  // Full month-by-month simulation to compute final maturity using monthly compounding
  const { maturityAmount, schedule } = useMemo(() => {
    const rows: {
      monthIndex: number;
      balance: number;
      deposited: number;
      interestThisMonth: number;
    }[] = [];
    if (monthsUntilMaturity <= 0) return { maturityAmount: 0, schedule: rows };

    let balance = 0;
    for (let m = 1; m <= monthsUntilMaturity; m++) {
      let depositedThisMonth = 0;
      if (m <= monthsToDeposit) {
        if (depositMode === 'monthly') {
          depositedThisMonth = monthlyDeposit;
          balance += monthlyDeposit;
        } else {
          if ((m - 1) % 12 === 0) {
            depositedThisMonth = yearlyDeposit;
            balance += yearlyDeposit;
          }
        }
      }

      const interestThisMonth = balance * monthlyRate;
      balance += interestThisMonth;

      rows.push({
        monthIndex: m,
        balance,
        deposited: depositedThisMonth,
        interestThisMonth,
      });
    }
    return { maturityAmount: Math.round(balance), schedule: rows };
  }, [
    monthsUntilMaturity,
    monthsToDeposit,
    depositMode,
    monthlyDeposit,
    yearlyDeposit,
    monthlyRate,
  ]);

  // Yearly snapshot aggregated from the month-by-month `schedule`
  const yearlyRows = useMemo(() => {
    const rows: {
      year: number;
      depositedThisYear: number;
      balanceAtYearEnd: number;
    }[] = [];
    if (!schedule || schedule.length === 0) return rows;

    let currentYear = 1;
    let depositedThisYear = 0;
    let lastBalance = 0;
    for (let i = 0; i < schedule.length; i++) {
      const m = schedule[i];
      const yearIndex = Math.ceil(m.monthIndex / 12);
      if (yearIndex !== currentYear) {
        rows.push({
          year: currentYear,
          depositedThisYear: Math.round(depositedThisYear),
          balanceAtYearEnd: Math.round(lastBalance),
        });
        currentYear = yearIndex;
        depositedThisYear = 0;
      }
      depositedThisYear += m.deposited;
      lastBalance = m.balance;
    }
    rows.push({
      year: currentYear,
      depositedThisYear: Math.round(depositedThisYear),
      balanceAtYearEnd: Math.round(lastBalance),
    });
    return rows;
  }, [schedule]);

  // compute interest portion percent for donut: interest = maturity - deposited
  const interestAmount = Math.max(0, maturityAmount - totalDeposited);
  const interestPercent =
    maturityAmount > 0
      ? Math.round((interestAmount / maturityAmount) * 100)
      : 0;
  const principalPercent = 100 - interestPercent;

  // CSV export uses yearlyRows
  function exportCSV() {
    if (!yearlyRows || yearlyRows.length === 0) {
      alert(
        'Nothing to export — check inputs (age, deposit window, or rates).'
      );
      return;
    }
    const header = ['Year', 'DepositedThisYear', 'BalanceAtYearEnd'];
    const lines = [header.join(',')].concat(
      yearlyRows.map((r) =>
        [r.year, r.depositedThisYear, r.balanceAtYearEnd].join(',')
      )
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ssy-yearly-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="card">
      <h2>Sukanya Samriddhi Yojana (SSY) Calculator</h2>

      {/* Two-column split: left = inputs, right = donut chart */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: 12,
          alignItems: 'start',
          marginTop: 14,
        }}
      >
        <div>
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
                Girl&apos;s current age (years)
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={currentAge}
                  onChange={setter(setCurrentAge)}
                />
              </label>

              <label>
                Deposit mode
                <select
                  value={depositMode}
                  onChange={(e) =>
                    setDepositMode(e.target.value as 'monthly' | 'yearly')
                  }
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </label>
            </div>

            {depositMode === 'monthly' ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  alignItems: 'end',
                }}
              >
                <label>
                  Monthly deposit (₹)
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={monthlyDeposit}
                    onChange={setter(setMonthlyDeposit)}
                  />
                </label>

                <label>
                  Years you will deposit (max 15)
                  <input
                    type="number"
                    min={0}
                    max={15}
                    value={yearsToDeposit}
                    onChange={setter(setYearsToDeposit)}
                  />
                </label>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  alignItems: 'end',
                }}
              >
                <label>
                  Yearly deposit (₹)
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={yearlyDeposit}
                    onChange={setter(setYearlyDeposit)}
                  />
                </label>

                <label>
                  Years you will deposit (max 15)
                  <input
                    type="number"
                    min={0}
                    max={15}
                    value={yearsToDeposit}
                    onChange={setter(setYearsToDeposit)}
                  />
                </label>
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <label>
                Expected annual interest rate (%)
                <input
                  type="number"
                  step="0.01"
                  value={annualRate}
                  onChange={setter(setAnnualRate)}
                />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button className="primary-cta">Update</button>
              <button
                type="button"
                onClick={() => {
                  setCurrentAge(5);
                  setDepositMode('monthly');
                  setMonthlyDeposit(2500);
                  setYearlyDeposit(30000);
                  setYearsToDeposit(15);
                  setAnnualRate(8.0);
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: Donut chart */}
        <aside
          aria-hidden={false}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: 12,
              boxShadow: 'none',
              border: 'none',
            }}
          >
            <Donut
              valuePercent={interestPercent}
              size={220}
              innerLabel={`${principalPercent}%`}
              outerLabel={`Principal / Interest`}
            />
            <div
              style={{
                display: 'flex',
                gap: 18,
                justifyContent: 'center',
                marginTop: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    background: '#eff8e5',
                    display: 'inline-block',
                    borderRadius: 6,
                    border: '1px solid rgba(0,0,0,0.03)',
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800 }}>{principalPercent}%</div>
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
                  <div style={{ fontWeight: 800 }}>{interestPercent}%</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Interest</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 10, fontSize: 13, color: '#6b7280' }}>
              Maturity: <strong>{formatINR(maturityAmount)}</strong>
              <div>
                Deposited: <strong>{formatINR(totalDeposited)}</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Results: full width (below split) */}
      <div className="result-grid emi-summary-strip" style={{ marginTop: 16 }}>
        <div className="result-card">
          <p className="result-label">Months until maturity (to age 21)</p>
          <p className="result-primary">{monthsUntilMaturity}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Months you will deposit</p>
          <p className="result-primary">{monthsToDeposit}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Total deposited (approx)</p>
          <p className="result-value">{formatINR(totalDeposited)}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Estimated maturity amount</p>
          <p className="result-value">{formatINR(maturityAmount)}</p>
        </div>
      </div>

      {/* Quick notes */}
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Notes</h3>
        <ul>
          <li>
            Calculator simulates month-by-month growth using the interest rate
            you set.
          </li>
          <li>
            Deposits cannot continue beyond maturity (age 21). Deposit window is
            capped at the years you choose (max 15).
          </li>
          <li>
            For yearly deposits, deposit assumed at the start of each year for
            simplicity.
          </li>
        </ul>
      </div>

      {/* Yearly snapshot / Export with fixed height scrollable table */}
      <div className="article" style={{ marginTop: 12 }}>
        <h2>Yearly snapshot / Export</h2>

        {yearlyRows.length === 0 ? (
          <div style={{ fontSize: 13, color: '#6b7280' }}>
            No yearly data to show — check that the girl&apos;s age and deposit
            window produce months until maturity.
          </div>
        ) : (
          <>
            <div style={{ overflowX: 'auto', marginTop: 8 }}>
              <div style={{ maxHeight: 360, overflow: 'auto' }}>
                <table className="rate-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Deposited This Year</th>
                      <th>Balance at Year End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyRows.map((r) => (
                      <tr key={r.year}>
                        <td style={{ textAlign: 'left' }}>{r.year}</td>
                        <td style={{ textAlign: 'right' }}>
                          {formatINR(r.depositedThisYear)}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {formatINR(r.balanceAtYearEnd)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td style={{ textAlign: 'left', fontWeight: 700 }}>
                        Total
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>
                        {formatINR(
                          yearlyRows.reduce(
                            (s, r) => s + r.depositedThisYear,
                            0
                          )
                        )}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>
                        {formatINR(
                          yearlyRows[yearlyRows.length - 1].balanceAtYearEnd
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={exportCSV}>Export Yearly CSV</button>
              <button
                onClick={() => {
                  const summary = `SSY: Maturity ${formatINR(
                    maturityAmount
                  )} — Deposited ${formatINR(totalDeposited)} @ ${annualRate}%`;
                  navigator.clipboard?.writeText(summary);
                  alert('Summary copied to clipboard');
                }}
              >
                Copy Summary
              </button>
            </div>
          </>
        )}
      </div>

      {/* Monthly schedule preview (fixed height scrollable) */}
      <div className="article" style={{ marginTop: 16 }}>
        <h2>Monthly schedule preview (first 60 months)</h2>
        <div
          className="schedule-wrapper"
          style={{ maxHeight: 360, overflow: 'auto' }}
        >
          <table className="rate-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Deposited</th>
                <th>Interest this month</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.slice(0, 60).map((r, i) => (
                <tr key={i}>
                  <td>{r.monthIndex}</td>
                  <td>{formatINR(Math.round(r.deposited))}</td>
                  <td>{formatINR(Math.round(r.interestThisMonth))}</td>
                  <td>{formatINR(Math.round(r.balance))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {schedule.length > 60 && (
          <p style={{ marginTop: 8 }}>Showing first 60 months.</p>
        )}
      </div>
    </section>
  );
}
