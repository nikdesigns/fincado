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
          Remaining / Withdrawn
        </text>
      </svg>
    </div>
  );
}

/**
 * SWP (Systematic Withdrawal Plan) Client
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
  // const monthlyInflation = inflationPct / 12 / 100; // Not currently used in simulation

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
      // 1. Grow by interest at month start
      const interest = bal * monthlyRate;
      bal += interest;

      const currentWithdrawal = monthlyWithdrawal;

      // 2. Perform withdrawal only after the delay
      if (m <= startMonthOffset) {
        rows.push({
          month: m,
          balance: Math.max(0, bal),
          withdrawal: 0,
          interest,
        });
        continue;
      }

      // 3. Withdraw fixed amount (but not more than balance)
      const withdrawal = Math.min(currentWithdrawal, bal);
      bal = Math.max(0, bal - withdrawal);

      rows.push({
        month: m,
        balance: Math.round(bal),
        withdrawal: Math.round(withdrawal),
        interest: Math.round(interest),
      });

      // 4. if corpus exhausted, stop
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
    if (monthsHorizon <= 0) return initialCorpus;
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
    <section className="article">
      <div>
        <h1>💰 Systematic Withdrawal Plan (SWP) Calculator</h1>

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
                <button className="primary-cta">Calculate</button>
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
                  withdrawalsPct={withdrawalsPct}
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
                      }}
                    />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 800 }}>{principalPct}%</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>
                        Remaining
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

        {/* Results: full width - REFINED STYLING */}
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
            {/* Primary Result: Projected Remaining Corpus */}
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
                <span role="img" aria-label="Remaining">
                  🌱
                </span>{' '}
                Projected Remaining Corpus
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#047857',
                }}
              >
                {formatINR(Math.round(pieReferenceBalance || 0))}
              </p>
              <p
                className="result-value"
                style={{ fontSize: 13, color: '#6b7280', marginTop: '4px' }}
              >
                After {withdrawalYears} years
              </p>
            </div>

            {/* Secondary Result: Months Until Exhaustion */}
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
                <span role="img" aria-label="Time">
                  ⏳
                </span>{' '}
                Months Until Exhaustion
              </p>
              <p
                className="result-primary"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {monthsUntilExhaustion}
              </p>
              <p
                className="result-value"
                style={{ fontSize: 13, color: '#6b7280', marginTop: '4px' }}
              >
                ≈ {yearsUntilExhaustion} years
              </p>
            </div>

            {/* Secondary Result: Total Withdrawn */}
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
                <span role="img" aria-label="Withdrawn">
                  💸
                </span>{' '}
                Total Withdrawn
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(Math.round(totalWithdrawn))}
              </p>
            </div>

            {/* Tertiary Result: Total Interest Earned */}
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
                Total Interest Earned
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#059669' }}
              >
                {formatINR(Math.round(totalInterestEarned))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-swp">🌟 What is a Systematic Withdrawal Plan (SWP)?</h2>
          <p>
            A **Systematic Withdrawal Plan (SWP)** is a strategy used by
            investors to receive regular cash flows from a lump sum investment,
            typically in mutual funds. Instead of redeeming the entire
            investment at once, an investor sets up a fixed amount or a fixed
            number of units to be withdrawn periodically (usually monthly or
            quarterly). This is particularly popular for retirement planning as
            it converts a large corpus into a steady stream of income.
          </p>
          <p>
            The main advantage is that the remaining investment continues to be
            invested and grows, potentially offsetting the impact of withdrawals
            through market returns (the concept of **capital appreciation**).
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who Can Use the SWP Strategy?</h2>
          <p>
            SWPs are best suited for individuals in the distribution phase of
            their financial lifecycle, primarily:
          </p>
          <ul>
            <li>
              **Retirees:** Individuals who need a predictable, supplemental
              monthly income stream from their accumulated retirement corpus.
            </li>
            <li>
              **Investors with a Large Corpus:** Those who have matured
              investments (like FDs, RDs, or other mutual funds) and want to
              convert them into a regular income without completely liquidating
              the principal.
            </li>
            <li>
              **Individuals Seeking Income in Transition:** People on a
              sabbatical, those taking an early retirement, or those awaiting a
              maturity payout from a different scheme.
            </li>
          </ul>
        </section>

        {/* 3. How can SWP Calculator help you? */}
        <section>
          <h2 id="how-swp-helps">💡 How Can This SWP Calculator Help You?</h2>
          <p>
            This **SWP Calculator** helps you stress-test your withdrawal
            strategy against expected returns and inflation, answering the most
            critical question in retirement planning: **How long will my money
            last?**
          </p>
          <ul>
            <li>
              **Corpus Longevity Check:** Determine the maximum period your
              initial corpus can sustain a given monthly withdrawal amount.
            </li>
            <li>
              **Safe Withdrawal Rate:** Find the optimal monthly withdrawal
              amount that allows the corpus to last for your desired retirement
              horizon.
            </li>
            <li>
              **Impact of Returns:** See how changes in the expected rate of
              return dramatically affect the longevity of your corpus.
            </li>
            <li>
              **Detailed Schedule:** Provides a month-by-month breakdown of
              withdrawals, interest earned, and the declining balance.
            </li>
          </ul>
        </section>

        {/* 4. How does SWP work? (The scheme's working and the calculator's calculation) */}
        <section>
          <h2 id="how-swp-works">⚙️ How Does the SWP Calculation Work?</h2>

          <h3>SWP Mechanism</h3>
          <p>
            The SWP calculator uses a **monthly compounding and withdrawal
            simulation** to project the corpus over time. The core principle is
            that the investment earns interest first, and then the withdrawal is
            made from the new balance.
          </p>
          <p>
            The simulation is run month-by-month for the specified horizon (or
            until exhaustion).
          </p>

          <h4>The Calculator&apos;s Iterative Approach:</h4>
          <p>For each month (**m**), the simulation follows this logic:</p>
          <ol>
            <li>
              **Interest Calculation:** The monthly interest is calculated on
              the previous month&apos;s balance, based on the annual return (r
              <sub>annual</sub>):
              <div
                style={{
                  fontFamily: 'monospace',
                  backgroundColor: '#eef2ff',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '4px',
                }}
              >
                **Interest<sub>m</sub>** = Balance<sub>m-1</sub> &times; (r
                <sub>annual</sub> / 1200)
              </div>
            </li>
            <li>
              **Balance Update (Pre-Withdrawal):** Interest is added to the
              balance:
              <div
                style={{
                  fontFamily: 'monospace',
                  backgroundColor: '#eef2ff',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '4px',
                }}
              >
                **Balance<sub>m-Pre</sub>** = Balance<sub>m-1</sub> + Interest
                <sub>m</sub>
              </div>
            </li>
            <li>
              **Withdrawal:** The fixed monthly withdrawal amount (**D**) is
              deducted:
              <div
                style={{
                  fontFamily: 'monospace',
                  backgroundColor: '#eef2ff',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '4px',
                }}
              >
                **Balance<sub>m-Final</sub>** = Balance<sub>m-Pre</sub> - D
              </div>
            </li>
          </ol>
          <p>
            This process is repeated until the **Balance<sub>m-Final</sub>**
            drops to zero or the withdrawal horizon is reached.
          </p>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="swp-advantages">✅ Key Advantages of an SWP</h2>
          <p>
            The SWP is a financially savvy strategy, offering several benefits
            over traditional fixed deposits for income generation:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Potential for Higher Returns</h3>
              <p>
                Unlike fixed income products, SWPs are typically linked to
                market instruments (Mutual Funds) offering the potential for
                higher inflation-beating returns.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Rupee Cost Averaging (in reverse)</h3>
              <p>
                When markets are down, more units are redeemed, but when markets
                are up, fewer units are redeemed to meet the fixed cash
                requirement.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Tax Efficiency (Debt Funds)</h3>
              <p>
                In debt mutual funds, SWPs can be highly tax-efficient if held
                for over 3 years, as withdrawals are often treated as Long-Term
                Capital Gains (LTCG) with indexation benefits.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Corpus Continues to Grow</h3>
              <p>
                The remaining principal stays invested, continuing to compound,
                which is crucial for managing longevity risk in retirement.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="swp-faqs">❓ Frequently Asked Questions (FAQs) about SWP</h2>
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
                Is the SWP withdrawal amount fixed?
              </summary>
              <p>
                Yes, in a basic SWP, the cash amount withdrawn (or the number of
                units) is fixed. You can, however, periodically step up the
                withdrawal amount to counter inflation, which would require
                manual adjustment or a custom plan.
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
                How is an SWP taxed in India?
              </summary>
              <p>Taxation depends on the type of fund:</p>

              <ul>
                <li>
                  <strong>Equity Funds (held &gt; 1 year):</strong> Taxed as
                  Long-Term Capital Gains (LTCG) at 10% (on gains over ₹1 lakh).
                </li>
                <li>
                  <strong>Debt Funds (held &gt; 3 years):</strong> Taxed as LTCG
                  with indexation benefits, making them highly tax-efficient.
                </li>
              </ul>
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
                What is the &quot;4% Rule&ldquo; and how does it relate to SWP?
              </summary>
              <p>
                The 4% Rule is a guideline suggesting you can safely withdraw 4%
                of your initial corpus (adjusted for inflation each year) for 30
                years without exhausting the fund. This rule is a foundational
                concept for SWP planning, though its applicability varies based
                on market conditions and geography.
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
                Is SWP safer than a Fixed Deposit (FD)?
              </summary>
              <p>
                An FD provides capital protection and guaranteed returns, making
                it safer in terms of principal. SWPs carry market risk. However,
                SWPs offer the potential to outpace inflation and maintain the
                purchasing power of the remaining corpus, making them superior
                for long-term income planning.
              </p>
            </details>
          </div>
        </section>
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
