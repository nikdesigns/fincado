'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// schedule row type
type Row = {
  month: number;
  invested: number;
  value: number;
  returns: number;
};

/* PieChart: reusable, declared outside component */
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

export default function SavingsClient() {
  // Inputs
  const [monthlySave, setMonthlySave] = useState<number>(5000);
  const [annualReturn, setAnnualReturn] = useState<number>(6); // % typical savings acct or small MF
  const [years, setYears] = useState<number>(5);
  const [lumpNow, setLumpNow] = useState<number>(0);
  const [inflationPct, setInflationPct] = useState<number>(6);
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [salaryMonthly, setSalaryMonthly] = useState<number>(40000);
  const [emergencyMonths, setEmergencyMonths] = useState<number>(6);

  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = annualReturn / 12 / 100;
  const inflationMonthly = inflationPct / 12 / 100;

  // Future value of recurring monthly savings (SIP-like)
  const futureValue = useMemo(() => {
    if (monthlySave <= 0 && lumpNow <= 0) return 0;
    let fvMonthly = 0;
    if (monthlySave > 0) {
      // standard FV for monthly deposits at period-end (Annuity Due)
      fvMonthly =
        monthlySave *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }
    const fvLump = lumpNow * Math.pow(1 + monthlyRate, months);
    return fvMonthly + fvLump;
  }, [monthlySave, monthlyRate, months, lumpNow]);

  const totalInvested = Math.round(monthlySave * months + lumpNow);
  const totalReturns = Math.round(Math.max(0, futureValue - totalInvested));

  const realFutureValue = useMemo(() => {
    if (inflationPct <= 0) return futureValue;
    return futureValue / Math.pow(1 + inflationMonthly, months);
  }, [futureValue, inflationMonthly, months, inflationPct]);

  // Target planner: required monthly savings to reach target
  const requiredMonthlyForTarget = useMemo(() => {
    if (targetAmount <= 0) return 0;
    const factor =
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const fvLump = lumpNow * Math.pow(1 + monthlyRate, months);
    const need = Math.max(0, targetAmount - fvLump);
    if (factor <= 0) return 0;
    return Math.ceil(need / factor);
  }, [targetAmount, monthlyRate, months, lumpNow]);

  // Emergency fund calculation
  const emergencyFund = useMemo(() => {
    return Math.round(salaryMonthly * Math.max(1, emergencyMonths));
  }, [salaryMonthly, emergencyMonths]);

  // schedule preview
  const schedule: Row[] = useMemo(() => {
    const rows: Row[] = [];
    let value = lumpNow;
    for (let m = 1; m <= months; m++) {
      value = value * (1 + monthlyRate) + monthlySave;
      const invested = monthlySave * m + lumpNow;
      rows.push({
        month: m,
        invested: Math.round(invested),
        value: Math.round(value),
        returns: Math.round(value - invested),
      });
    }
    return rows;
  }, [months, monthlyRate, monthlySave, lumpNow]);

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

  // Export CSV
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
    a.download = 'savings-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // small setter helper
  const setter =
    (set: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      set(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="article">
      <div>
        <h1>💵 Savings & Financial Goal Calculator</h1>

        {/* SPLIT: left = inputs, right = pie chart */}
        <div className="emi-split" style={{ marginTop: 18 }}>
          <div className="emi-left">
            {/* INPUTS FORM */}
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'grid', gap: 12 }}
            >
              <label>
                Monthly Savings (₹)
                <input
                  type="number"
                  value={monthlySave}
                  onChange={setter(setMonthlySave)}
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

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <label>
                  Duration (Years)
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
                    value={lumpNow}
                    onChange={setter(setLumpNow)}
                    min={0}
                    step={1000}
                  />
                </label>
              </div>

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

              <hr />

              <label>
                Target Amount (Goal) (₹)
                <input
                  type="number"
                  value={targetAmount}
                  onChange={setter(setTargetAmount)}
                  min={0}
                />
              </label>

              <hr />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <label>
                  Monthly Net Salary (₹) — for emergency fund calc
                  <input
                    type="number"
                    value={salaryMonthly}
                    onChange={setter(setSalaryMonthly)}
                    min={0}
                  />
                </label>

                <label>
                  Emergency Fund Months (e.g., 3 to 12)
                  <input
                    type="number"
                    value={emergencyMonths}
                    onChange={setter(setEmergencyMonths)}
                    min={1}
                    max={24}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-cta">Calculate / Update</button>
                <button
                  type="button"
                  onClick={() => {
                    setMonthlySave(5000);
                    setAnnualReturn(6);
                    setYears(5);
                    setLumpNow(0);
                    setInflationPct(6);
                    setTargetAmount(0);
                    setSalaryMonthly(40000);
                    setEmergencyMonths(6);
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Pie Chart and Summary Box */}
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

        {/* RESULTS - STYLED FOR PROFESSIONALISM */}
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
            {/* Primary Result: Estimated Future Value (Nominal) */}
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
                <span role="img" aria-label="Future Value">
                  🚀
                </span>{' '}
                Est. Future Value (Nominal)
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#047857',
                }}
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
                  💰
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
            💲
          </span>{' '}
          Inflation-Adjusted Value
        </h3>
        <p>
          Estimated future value in **today&apos;s rupees**:{' '}
          <strong style={{ color: '#047857' }}>
            {formatINR(Math.round(realFutureValue))}
          </strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          This value is adjusted using the inflation rate entered above, showing
          the true purchasing power of your savings in the future.
        </p>
      </div>

      {/* Target planner - CONDITIONAL DISPLAY */}
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
            required monthly savings.
          </p>
        ) : (
          <>
            <p>
              Required monthly savings to reach{' '}
              <strong style={{ color: '#1f2937' }}>
                {formatINR(targetAmount)}
              </strong>{' '}
              in {years} years:
            </p>
            <p style={{ fontSize: 18 }}>
              <strong style={{ color: '#047857', fontSize: '1.4em' }}>
                {formatINR(requiredMonthlyForTarget)}
              </strong>
            </p>
            <p style={{ fontSize: 13, color: '#6b7280' }}>
              This assumes expected annual return = {annualReturn}% and existing
              lump sum = {formatINR(lumpNow)}.
            </p>
          </>
        )}
      </div>

      {/* Emergency Fund */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>
          <span role="img" aria-label="Shield">
            🛡️
          </span>{' '}
          Emergency Fund Goal
        </h3>
        <p>
          Recommended emergency corpus ({emergencyMonths} months of salary):{' '}
          <strong style={{ color: '#047857', fontSize: '1.2em' }}>
            {formatINR(emergencyFund)}
          </strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          This fund should cover essential expenses if your income stops. It
          should be kept in highly liquid and safe instruments (Savings account,
          Liquid Fund, or FD).
        </p>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-savings">🏦 General Savings and Goal Planning</h2>
          <p>
            A **General Savings Plan** is the foundation of personal finance,
            covering both short-term needs (like a down payment or a vacation)
            and crucial long-term financial security (like an emergency fund).
            This tool helps you simulate the growth of regular savings and lump
            sum investments in low-risk avenues, such as high-yield savings
            accounts, fixed deposits (FDs), or liquid mutual funds.
          </p>
          <p>
            The goal is to move beyond simple saving and engage in calculated
            financial goal setting, taking into account the erosion of
            purchasing power due to inflation.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who is This Calculator For?</h2>
          <p>
            This calculator is designed for anyone prioritizing financial
            stability and short-to-medium term goals:
          </p>
          <ul>
            <li>
              **Budget Planners:** Individuals defining how much of their
              monthly income should go toward liquid savings.
            </li>
            <li>
              **Emergency Fund Builders:** Users calculating the necessary size
              of their safety net based on their monthly expenses.
            </li>
            <li>
              **Short-Term Goal Setters:** People planning for goals within a
              1-5 year horizon, such as buying a new vehicle or saving for a
              wedding.
            </li>
            <li>
              **Beginner Investors:** Those looking to understand the basic
              impact of interest/return and inflation on their savings corpus.
            </li>
          </ul>
        </section>

        {/* 3. How can the Savings Calculator help you? */}
        <section>
          <h2 id="how-calculator-helps">
            💡 How Can This Savings Calculator Help You?
          </h2>
          <p>
            This integrated tool goes beyond simple interest calculation by
            addressing three critical aspects of savings:
          </p>
          <ul>
            <li>
              **Future Growth Projection:** Accurately estimates how much your
              regular monthly savings will grow given an expected rate of return
              (Nominal Value).
            </li>
            <li>
              **Inflation Reality Check:** Calculates the true value of your
              future savings in today&apos;s money (Real Value), crucial for
              setting realistic goals.
            </li>
            <li>
              **Targeted Monthly Requirement:** Quickly determines the precise
              amount you need to save each month to achieve a specific financial
              target by a set date.
            </li>
            <li>
              **Emergency Fund Benchmark:** Provides a personalized benchmark
              for your essential financial safety net.
            </li>
          </ul>
        </section>

        {/* 4. How does Savings Planning work? (The calculation and formula) */}
        <section>
          <h2 id="how-savings-work">⚙️ Calculation Logic and Formulas</h2>

          <h3>Maturity Value Calculation (Monthly Compounding)</h3>
          <p>
            The estimated future value (FV) of your savings is calculated by
            combining the Future Value of your recurring monthly deposits
            (Annuity Due) and the Future Value of your initial Lump Sum
            (Compound Interest).
          </p>
          <p>
            The core formula for the future value of the recurring monthly
            savings (**P**) is:
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
            FV<sub>Monthly</sub> = P &times; {`[((1 + i)^n - 1) / i]`} &times;
            (1 + i)
          </div>
          <p>
            Where **i** is the monthly rate and **n** is the total number of
            months.
          </p>

          <h3>Inflation Adjustment (Real Value)</h3>
          <p>
            The **Inflation-Adjusted Value** is found by deflating the Nominal
            Future Value by the inflation rate over the entire period to reflect
            current purchasing power:
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
          <h2 id="savings-advantages">
            ✅ Key Advantages of Dedicated Savings
          </h2>
          <p>
            Dedicated saving is vital for financial health, offering benefits
            far beyond simple accumulation:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Security and Liquidity</h3>
              <p>
                Savings accounts and liquid funds ensure your money is safe and
                immediately accessible for emergencies.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Debt Avoidance</h3>
              <p>
                A strong savings habit prevents the need to take on
                high-interest debt when unexpected expenses arise.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Peace of Mind</h3>
              <p>
                Financial stability drastically reduces stress and improves
                overall quality of life.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Opportunity Fund</h3>
              <p>
                Having a cash reserve allows you to seize investment
                opportunities when the market is down.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="savings-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                What is the best instrument for an Emergency Fund?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                The primary goal of an Emergency Fund is safety and liquidity,
                not high returns. Ideal instruments are high-yield savings
                accounts, sweep-in Fixed Deposits (FDs), or liquid mutual funds.
                Avoid anything volatile like equity funds.
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
                How much should I save monthly?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                A common guideline is the **50/30/20 Rule**: dedicate 50% of
                your income to needs (rent, bills), 30% to wants (dining,
                entertainment), and **20% to savings and debt repayment**.
                Adjust this percentage based on your financial goals.
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
                Does inflation really matter for short-term savings?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Yes. While compounding interest is smaller over the short term,
                inflation is immediately relevant. If your savings interest rate
                is 6% and inflation is 6%, your real return is 0%. Accounting
                for inflation is essential to know the true purchasing power of
                your money.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* Schedule preview */}
      <div className="article" style={{ marginTop: 16 }}>
        <h2>Schedule Preview (first 120 months)</h2>
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

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={exportCSV}>Export Schedule CSV</button>
          <button
            onClick={() => {
              const summary = `Save ${formatINR(
                monthlySave
              )}/mo for ${years}y @${annualReturn}% ⇒ ${formatINR(
                Math.round(futureValue)
              )} (Invested ${formatINR(totalInvested)})`;
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
