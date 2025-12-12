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
    <section className="article">
      <div>
        <h1>🏦 Recurring Deposit (RD) Calculator</h1>

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
                  Compounding Frequency
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
                  Reset to Default
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
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
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

                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
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

        {/* results full width - STYLED FOR PROFESSIONALISM */}
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
            {/* Primary Result: Maturity Amount */}
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
                <span role="img" aria-label="Maturity">
                  💰
                </span>{' '}
                Maturity Amount
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#047857',
                }}
              >
                {formatINR(Math.round(maturity))}
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
                <span role="img" aria-label="Investment">
                  📥
                </span>{' '}
                Total Invested
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(totalInvested)}
              </p>
            </div>

            {/* Secondary Result: Total Interest */}
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
                <span role="img" aria-label="Interest">
                  📈
                </span>{' '}
                Total Interest
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

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-rd">🌟 What is a Recurring Deposit (RD)?</h2>
          <p>
            A **Recurring Deposit (RD)** is a unique term deposit offered by
            banks and post offices that allows individuals to deposit a fixed
            amount of money every month and earn interest at a fixed rate. RDs
            are considered one of the safest and most disciplined ways to save
            for short-to-medium-term goals (1 to 10 years) because the interest
            rate is guaranteed when the account is opened, regardless of future
            market fluctuations.
          </p>
          <p>
            Unlike a Fixed Deposit (FD) where a lump sum is invested once, an RD
            encourages monthly contribution, making it ideal for salaried
            individuals.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who Should Invest in an RD?</h2>
          <p>
            RDs are suitable for investors who prioritize safety, fixed returns,
            and financial discipline:
          </p>
          <ul>
            <li>
              **Regular Income Earners:** Individuals with stable monthly income
              looking for a commitment-based savings product.
            </li>
            <li>
              **Short-Term Goal Planners:** People saving for specific goals
              within 1 to 5 years, such as a down payment, foreign travel, or
              purchasing large appliances.
            </li>
            <li>
              **Risk-Averse Investors:** Those who want guaranteed returns and
              capital protection, similar to an FD, but prefer monthly
              investing.
            </li>
            <li>
              **Retirees:** Individuals seeking low-risk, secure avenues for a
              portion of their capital.
            </li>
          </ul>
        </section>

        {/* 3. How can RD Calculator help you? */}
        <section>
          <h2 id="how-rd-helps">💡 How Can This RD Calculator Help You?</h2>
          <p>
            This **RD Calculator** is essential for accurately forecasting the
            return on your recurring deposits, especially considering the
            different compounding frequencies offered by institutions (monthly,
            quarterly, or annually).
          </p>
          <ul>
            <li>
              **Maturity Projection:** Precisely estimate the final corpus you
              will receive at the end of the tenure.
            </li>
            <li>
              **Compounding Comparison:** Analyze how changes in the compounding
              frequency (monthly vs. quarterly) impact your total interest
              earned.
            </li>
            <li>
              **Goal Setting:** Determine the monthly RD amount needed to
              achieve a specific financial target by a fixed deadline.
            </li>
            <li>
              **Investment Breakdown:** Visualize the split between your own
              deposits (Principal) and the profit earned (Interest).
            </li>
          </ul>
        </section>

        {/* 4. How does RD work? (The calculation and formula) */}
        <section>
          <h2 id="how-rd-works">⚙️ RD Calculation Logic and Formula</h2>

          <h3>Calculation Method</h3>
          <p>
            The maturity amount for an RD is calculated using the Future Value
            of Annuity Due formula, adjusted for the compounding frequency
            chosen. The calculator simulates the growth month-by-month, treating
            the recurring deposit (P) as being invested at the start of the
            period.
          </p>

          <h4>The Core Formula (Future Value of Annuity Due):</h4>
          <p>
            The maturity value (FV) is calculated using the monthly deposit
            (**P**), the effective monthly rate (**r**), and the total number of
            deposits (**n**):
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
          <p>Where:</p>
          <ul>
            <li>**FV** = Maturity Value</li>
            <li>**P** = Monthly Deposit (e.g., ₹5,000)</li>
            <li>
              **r** = Monthly interest rate (based on annual rate and
              compounding frequency)
            </li>
            <li>**n** = Total number of deposits (Months of Tenure)</li>
          </ul>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="rd-advantages">✅ Key Advantages of a Recurring Deposit</h2>
          <p>
            RDs are a cornerstone of low-risk savings in India, offering
            distinct advantages:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Guaranteed Returns</h3>
              <p>
                The interest rate is locked in for the entire tenure at the time
                of opening the account, offering certainty.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Compounding Benefit</h3>
              <p>
                Interest is calculated and added periodically (usually
                quarterly), allowing your interest to earn more interest.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Low Starting Point</h3>
              <p>
                You can start an RD with a minimum monthly deposit, often as low
                as ₹100, making it highly accessible.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Loan Facility</h3>
              <p>
                Many banks allow you to take a loan against the security of your
                RD account balance.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="rd-faqs">❓ Frequently Asked Questions (FAQs) about RD</h2>
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
                Is Tax Deducted at Source (TDS) applicable on RD interest?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Yes. If the total interest earned from all your RDs and FDs
                across a single bank exceeds the specified limit in a financial
                year (currently ₹40,000 for general citizens, ₹50,000 for senior
                citizens), TDS is deducted.
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
                What is the minimum and maximum RD tenure?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                The minimum tenure for a Recurring Deposit is typically **6
                months**. The maximum tenure is usually **10 years** (120
                months). Deposits must be made monthly throughout the selected
                tenure.
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
                Can I withdraw money from an RD prematurely?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Yes, premature withdrawal is usually allowed, but it incurs a
                **penalty** (e.g., a 0.5% to 1% reduction in the applicable
                interest rate). If you withdraw too early, the bank may pay
                interest at the rate applicable for the period the deposit was
                held.
              </p>
            </details>
          </div>
        </section>
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
