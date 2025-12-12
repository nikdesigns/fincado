'use client';
import React, { useMemo } from 'react';

function formatINR(value: number) {
  return (
    '₹' + Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 })
  );
}

// Function round not used in final calculation, kept for completeness
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
          Principal / Returns
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
      // Future Value of Annuity Due (SIP at start of month)
      fvSIP =
        monthlySIP *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }
    // Future Value of Lump Sum
    const fvLump = lumpSumNow * Math.pow(1 + monthlyRate, months);
    return fvSIP + fvLump;
  }, [monthlySIP, monthlyRate, months, lumpSumNow]);

  const totalInvested = Math.round(monthlySIP * months + lumpSumNow);
  const totalReturns = Math.round(Math.max(0, futureValue - totalInvested));

  const realFutureValue = useMemo(() => {
    if (inflationPct <= 0) return futureValue;
    // Real FV = Nominal FV / (1 + inflation_monthly)^months
    return futureValue / Math.pow(1 + inflationMonthly, months);
  }, [futureValue, inflationMonthly, months, inflationPct]);

  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let value = lumpSumNow;
    for (let m = 1; m <= months; m++) {
      // 1. Grow existing value (Compounding)
      value = value * (1 + monthlyRate);
      // 2. Add new SIP deposit (At the start of the next month, hence Annuity Due simulation)
      value += monthlySIP;

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
    // FV Annuity Due Factor
    const factor =
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const fvLump = lumpSumNow * Math.pow(1 + monthlyRate, months);
    const needFromSIP = Math.max(0, targetAmount - fvLump);
    if (factor <= 0) return 0;
    // Required SIP = (Target FV - FV of Lump Sum) / Annuity Factor
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
    <section className="article">
      <div className="card">
        <h1>📈 Systematic Investment Plan (SIP) Calculator</h1>

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
                <button className="primary-cta">Calculate</button>
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

        {/* RESULTS: full width below the split - REFINED FOR PROFESSIONALISM */}
        <div className="emi-results-full" style={{ marginTop: 24 }}>
          <div
            className="result-grid emi-summary-strip"
            style={{
              backgroundColor: '#f0fff4', // Pale green background for the results block
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #d1fae5', // Light border for definition
            }}
          >
            {/* Primary Result: Estimated Value */}
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
                <span role="img" aria-label="Target">
                  🎯
                </span>{' '}
                Estimated Value (Nominal)
              </p>
              <p
                className="result-primary"
                style={{ fontSize: '24px', fontWeight: 800, color: '#047857' }}
              >
                {formatINR(Math.round(futureValue))}
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

            {/* Secondary Result: Total Returns */}
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
                <span role="img" aria-label="Profit">
                  📈
                </span>{' '}
                Total Returns (Nominal)
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

      {/* Inflation-adjusted */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>
          <span role="img" aria-label="Money">
            💵
          </span>{' '}
          Inflation-adjusted value
        </h3>
        <p>
          Estimated future value in today&apos;s rupees:{' '}
          <strong style={{ color: '#047857' }}>
            {formatINR(Math.round(realFutureValue))}
          </strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          Adjusted using the inflation rate you set; use this to gauge
          purchasing power.
        </p>
      </div>

      {/* Target planner - REFINED FOR CLARITY */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>
          <span role="img" aria-label="Goal">
            🎯
          </span>{' '}
          Target Planner
        </h3>
        {targetAmount <= 0 ? (
          <p style={{ marginTop: 8, color: '#b91c1c', fontWeight: 600 }}>
            ⚠️ Enter a specific Target Amount (₹) above to calculate the
            required monthly SIP.
          </p>
        ) : (
          <>
            <p style={{ marginTop: 8 }}>
              Required monthly SIP to reach {formatINR(targetAmount)} in {years}{' '}
              years:{' '}
              <strong style={{ color: '#047857', fontSize: '1.2em' }}>
                {formatINR(requiredSIPForTarget)}
              </strong>
            </p>
            <p style={{ fontSize: 13, color: '#6b7280' }}>
              This assumes expected annual return = {annualReturn}% and existing
              lump sum = {formatINR(lumpSumNow)}.
            </p>
          </>
        )}
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-sip">🌟 What is a Systematic Investment Plan (SIP)?</h2>
          <p>
            A **Systematic Investment Plan (SIP)** is a method of investing a
            fixed sum of money at regular intervals (usually monthly) in a
            mutual fund scheme. It is essentially an automated tool that helps
            retail investors participate in the market without timing it. SIPs
            are popular because they encourage disciplined saving and leverage
            the power of compounding and Rupee Cost Averaging.{' '}
          </p>
          <p>
            SIPs help minimize the risk of investing a lump sum at market peaks
            and ensure steady growth toward long-term financial goals.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who is the SIP Strategy Ideal For?</h2>
          <p>
            SIPs are suitable for almost all investors but are particularly
            beneficial for:
          </p>
          <ul>
            <li>
              **Salaried Individuals:** Those with a steady monthly income who
              can dedicate a fixed sum for investment without disrupting their
              budget.
            </li>
            <li>
              **Long-Term Goal Seekers:** People planning for retirement,
              children's education, or buying a house, where the investment
              horizon is 5 years or more.
            </li>
            <li>
              **Beginner Investors:** Individuals new to the stock market who
              want a low-risk way to benefit from market volatility through
              rupee cost averaging.
            </li>
          </ul>
        </section>

        {/* 3. How can SIP Calculator help you? */}
        <section>
          <h2 id="how-sip-helps">💡 How Can This SIP Calculator Help You?</h2>
          <p>
            This **SIP Calculator** is a powerful tool for goal planning. It
            allows you to project the future value of your investments,
            providing clarity and motivation for financial discipline.
          </p>
          <ul>
            <li>
              **Estimate Maturity Value:** Project the final corpus you will
              accumulate by the end of your investment tenure.
            </li>
            <li>
              **Goal Planning (Target Planner):** Determine the exact monthly
              SIP required to achieve a specific financial goal (e.g., ₹50 Lakhs
              for a down payment).
            </li>
            <li>
              **Impact of Compounding:** Visually demonstrate how much of your
              final corpus is due to your own contributions (Principal) versus
              market returns (Interest).
            </li>
            <li>
              **Inflation Adjustment:** Shows the real value of your future
              wealth in today's terms, ensuring your goals are realistic.
            </li>
          </ul>
        </section>

        {/* 4. How does SIP work? (The calculation and formula) */}
        <section>
          <h2 id="how-sip-works">⚙️ SIP Calculation: Formula and Logic</h2>

          <h3>The SIP Formula (Future Value of Annuity Due)</h3>
          <p>
            The calculator determines the future value (FV) of your recurring
            monthly investments using the Future Value of Annuity Due formula,
            as SIP payments are generally made at the beginning of the month:
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
            FV = P &times; {`[((1 + i)^n - 1) / i]`} &times; (1 + i)
          </div>
          <p>Where:</p>
          <ul>
            <li>**FV** = Future Value (Maturity Amount)</li>
            <li>**P** = Periodic Investment (Monthly SIP)</li>
            <li>**i** = Monthly Interest rate (i = Annual Rate / 1200)</li>
            <li>**n** = Number of Payments (Total Months)</li>
          </ul>

          <h3>Lump Sum and Real Value</h3>
          <p>
            The total estimated value is the sum of the Future Value of the SIP
            component and the Future Value of the initial Lump Sum (if any,
            calculated as a simple compound interest growth).
          </p>
          <p>
            The **Inflation-Adjusted Value** is calculated by deflating the
            Nominal Future Value by the inflation factor to show its equivalent
            purchasing power today:
          </p>
          <div
            style={{
              fontFamily: 'monospace',
              backgroundColor: '#eef2ff',
              padding: '8px',
              margin: '5px 0',
              borderRadius: '4px',
            }}
          >
            Real FV = Nominal FV / (1 + i<sub>inflation</sub>)<sup>n</sup>
          </div>
          <p>
            Where i<sub>inflation</sub> is the monthly inflation rate and $n$ is
            the total number of months.
          </p>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="sip-advantages">
            ✅ Key Advantages of Investing through SIP
          </h2>
          <p>
            SIP offers superior long-term wealth creation opportunities,
            primarily due to these advantages:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Power of Compounding</h3>
              <p>
                Returns earned on your investment start earning their own
                returns, creating exponential wealth over a long horizon.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Rupee Cost Averaging (RCA)</h3>
              <p>
                Since you buy fewer units when prices are high and more units
                when prices are low, your average cost per unit decreases over
                time, mitigating market timing risk.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Financial Discipline</h3>
              <p>
                SIPs automate your investment, ensuring you remain committed to
                your goals regardless of market sentiment.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Flexibility and Low Barriers</h3>
              <p>
                You can start an SIP with amounts as low as ₹100 or ₹500, making
                it accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="sip-faqs">❓ Frequently Asked Questions (FAQs) about SIP</h2>
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
                Is SIP guaranteed to give high returns?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                No. SIP is a *method* of investment, not a product. Returns
                depend entirely on the performance of the underlying mutual fund
                scheme, which is subject to market risks. The calculator uses
                *expected* returns, not guaranteed returns.
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
                Can I stop my SIP anytime?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Yes. You can usually stop or pause an ongoing SIP anytime by
                informing the Asset Management Company (AMC) or through your
                investment platform. There are typically no penalties for
                stopping an SIP, although you may incur exit load fees if you
                redeem the units before the fund's specific lock-in period.
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
                What is the difference between SIP and Lump Sum?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                A **Lump Sum** is a one-time, large investment. An **SIP**
                involves smaller, regular investments over a long period. SIP
                helps mitigate market timing risk, whereas Lump Sum relies on
                your conviction about the market's immediate upward trend.
              </p>
            </details>
          </div>
        </section>
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
