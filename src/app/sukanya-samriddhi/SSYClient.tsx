'use client';

import React, { useMemo, useState } from 'react';

// Utility function remains outside the main component for simplicity
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

      // NOTE: Using monthly rate on current balance.
      // This is a simplification of the SSY scheme which officially compounds annually.
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
    <section className="article">
      <div>
        <h1>🇮🇳 Sukanya Samriddhi Yojana (SSY) Calculator</h1>

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
                  alignItems: 'end',
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
                <button className="primary-cta">Calculate</button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentAge(5);
                    setDepositMode('monthly');
                    setMonthlyDeposit(2500);
                    setYearlyDeposit(30000);
                    setYearsToDeposit(15);
                    setAnnualRate(8.2);
                  }}
                >
                  Reset to Default
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
                innerLabel={`${interestPercent}%`}
                outerLabel={`Interest Portion`}
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
                      border: '1px solid rgba(0,0,0,0.03)',
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>{interestPercent}%</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Interest
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 10, fontSize: 13, color: '#6b7280' }}>
                <p>
                  **Total Principal**:{' '}
                  <strong>{formatINR(totalDeposited)}</strong>
                </p>
                <p>
                  **Estimated Interest**:{' '}
                  <strong>{formatINR(interestAmount)}</strong>
                </p>
                <p style={{ fontSize: 16, color: '#081225' }}>
                  **Estimated Maturity**:{' '}
                  <strong>{formatINR(maturityAmount)}</strong>
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Results: full width (below split) - REFINED FOR PROFESSIONALISM */}
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
            {/* Primary Result: Estimated Maturity Amount */}
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
                Estimated Maturity Amount
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#047857',
                }}
              >
                {formatINR(maturityAmount)}
              </p>
            </div>

            {/* Secondary Result: Months Until Maturity */}
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
                Months Until Maturity (Age 21)
              </p>
              <p
                className="result-primary"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {monthsUntilMaturity}
              </p>
            </div>

            {/* Secondary Result: Total Deposited */}
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
                <span role="img" aria-label="Deposit">
                  📥
                </span>{' '}
                Total Deposited (Approx)
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(totalDeposited)}
              </p>
            </div>

            {/* Secondary Result: Interest Earned */}
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
                {formatINR(interestAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick notes */}
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Notes on Calculation</h3>
        <ul>
          <li>
            This calculator simulates month-by-month growth using the interest
            rate you set.
          </li>
          <li>
            Deposits cannot continue beyond maturity (age 21). The deposit
            window is capped at the lesser of the years you choose (max 15) or
            the period until the girl reaches age 21.
          </li>
          <li>
            For yearly deposits, the deposit is assumed at the start of each
            year for simplicity.
          </li>
          <li>
            **Important**: The actual SSY interest is compounded annually
            (yearly). This calculator uses **monthly compounding** for general
            calculation purposes, which may result in a slightly higher estimate
            than the official scheme.
          </li>
        </ul>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-ssy">🌟 What is Sukanya Samriddhi Yojana (SSY)?</h2>
          <p>
            The **Sukanya Samriddhi Yojana (SSY)** is a small savings scheme
            launched by the Government of India as part of the **&apos;Beti
            Bachao, Beti Padhao&apos;** campaign. It is a dedicated, tax-free
            investment program designed to encourage parents to build a
            significant corpus for their daughter&apos;s future education and
            marriage expenses. It offers one of the highest interest rates among
            the government&apos;s small savings schemes and is a highly secure
            investment option.
          </p>
          <p>
            The scheme currently offers an interest rate set quarterly by the
            government, compounded annually, and provides exclusive **Triple EEE
            tax benefits** (Exempt-Exempt-Exempt).
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who Can Open an SSY Account?</h2>
          <p>
            The SSY scheme is specifically designed for the benefit of a girl
            child.
          </p>
          <ul>
            <li>
              **Guardian/Parent:** An SSY account must be opened by the natural
              or legal guardian of the girl child.
            </li>
            <li>
              **Girl Child Age:** The account can be opened anytime from the
              birth of the girl child until she attains the age of **10 years**.
            </li>
            <li>
              **Number of Accounts:** Only one account is allowed per girl
              child, and a maximum of two accounts are permitted per family (for
              two daughters). Exceptions are made for twins/triplets born in the
              second or subsequent birth order.
            </li>
            <li>**Residency:** The girl child must be an Indian resident.</li>
          </ul>
        </section>

        {/* 3. How can SSY Calculator help you? */}
        <section>
          <h2 id="how-ssy-helps">💡 How Can This SSY Calculator Help You?</h2>
          <p>
            Our online **Sukanya Samriddhi Yojana Calculator** is an essential
            tool for financial planning, allowing you to quickly estimate the
            maturity value of your investment.
          </p>
          <ul>
            <li>
              **Goal Setting:** Estimate the final corpus your daughter will
              receive at age 21 to set realistic savings goals.
            </li>
            <li>
              **Contribution Planning:** Easily compare the outcome of monthly
              vs. yearly contributions, and adjust the amount to see its impact
              on the maturity value.
            </li>
            <li>
              **Interest Projection:** See how compounding interest works over
              the long 21-year tenure of the scheme.
            </li>
            <li>
              **Transparency:** Get a year-by-year and month-by-month schedule
              of deposits, interest earned, and balance to track your investment
              growth.
            </li>
          </ul>
        </section>

        {/* 4. How does SSY work? (The scheme's working and the calculator's calculation) - FIXED SYNTAX */}
        <section>
          <h2 id="how-ssy-works">
            ⚙️ How Does the Sukanya Samriddhi Yojana (SSY) Scheme Work and How
            is the Maturity Calculated?
          </h2>

          <h3>SSY Scheme Mechanism</h3>
          <p>
            The scheme runs for 21 years from the date of account opening or
            until the marriage of the girl child after she turns 18. Deposits
            are required for the first 15 years only. The calculation is based
            on the following principles:
          </p>
          <ol>
            <li>
              **Interest Calculation:** Interest is calculated monthly on the
              lowest balance between the 5th day and the end of the month.
            </li>
            <li>
              **Compounding:** The calculated interest is compounded
              **annually** (at the end of the financial year).
            </li>
            <li>**Deposit Period:** 15 years maximum.</li>
            <li>**Lock-in/Maturity Period:** 21 years.</li>
          </ol>

          <h3>Understanding the Calculator Formula</h3>
          <p>
            This SSY calculator performs a **month-by-month iterative
            simulation** to provide the detailed schedule and final maturity
            amount.
          </p>

          <h4>The Core Formula (Future Value of an Annuity):</h4>
          <p>
            The theoretical maturity value (FV) for a recurring deposit scheme
            like SSY is often based on the Future Value of an Annuity formula.
            Using D (periodic deposit), i (rate per period), and n (total
            periods):
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
            FV = D &times; [((1 + i)<sup>n</sup> - 1) / i] &times; (1 + i)
          </div>
          <p>Where:</p>
          <ul>
            <li>**FV** = Future Value (Maturity Amount)</li>
            <li>**D** = Periodic Deposit (Monthly or Yearly)</li>
            <li>
              **i** = Interest rate per period (e.g., i = r<sub>annual</sub>/12
              for monthly compounding simulation)
            </li>
            <li>
              **n** = Number of periods (Total number of deposits, n = 15
              &times; 12 months)
            </li>
            <li>
              Note: This formula provides an estimate, while the calculator uses
              an iterative loop for detailed month-by-month tracking.
            </li>
          </ul>

          <h4>The Calculator&apos;s Iterative Approach:</h4>
          <p>
            Your calculator code performs a **precise month-by-month
            simulation** where the balance is updated, and interest is
            calculated based on the running balance.
          </p>
          <p>For each month (**m**), the simulation follows this logic:</p>
          <ol>
            <li>
              **Balance Update:** New deposit is added to the previous
              month&apos;s balance:
              <div
                style={{
                  fontFamily: 'monospace',
                  backgroundColor: '#eef2ff',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '4px',
                }}
              >
                **Balance<sub>m</sub>** = Balance<sub>m-1</sub> + Deposit
                <sub>m</sub>
              </div>
            </li>
            <li>
              **Interest Calculation:** Monthly interest is applied to the new
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
                **Interest<sub>m</sub>** = Balance<sub>m</sub> &times; (r
                <sub>annual</sub> / 1200)
              </div>
            </li>
            <li>
              **Final Balance:** Interest is added to the balance:
              <div
                style={{
                  fontFamily: 'monospace',
                  backgroundColor: '#eef2ff',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '4px',
                }}
              >
                **Balance<sub>Final</sub>** = Balance<sub>m</sub> + Interest
                <sub>m</sub>
              </div>
            </li>
          </ol>
          <p>
            This process continues for the entire duration (up to 21 years or
            252 months) and provides the detailed schedule visible in the tables
            below.
          </p>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="ssy-advantages">✅ Key Advantages of Investing in SSY</h2>
          <p>
            The SSY scheme is one of the most attractive investment options for
            a girl child due to its numerous benefits:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Triple Tax Benefits (EEE)</h3>
              <p>
                Contributions, interest earned, and the maturity amount are all
                exempt from tax under **Section 80C** of the Income Tax Act.
              </p>
            </div>
            <div className="advantage-card">
              <h3>High Interest Rate</h3>
              <p>
                It typically offers a higher interest rate compared to other
                fixed deposits and small savings schemes.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Sovereign Guarantee</h3>
              <p>
                As a government-backed scheme, your investment is completely
                safe and secure.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Annual Compounding</h3>
              <p>
                Interest is compounded annually, allowing your savings to grow
                exponentially over the long 21-year term.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's - REVISED FOR ELEGANCE AND PROFESSIONALISM */}
        <section>
          <h2 id="ssy-faqs">❓ Frequently Asked Questions (FAQs) about SSY</h2>
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
                  color: '#1f2937', // Darker text for professionalism
                }}
              >
                What is the current interest rate for SSY?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                The SSY interest rate is reviewed and announced **quarterly** by
                the Government of India, ensuring it remains competitive. You
                should check the official notifications from the Ministry of
                Finance for the exact current rate applicable for the current
                quarter.
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
                What is the maturity period of the SSY account?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                The SSY account matures after **21 years** from the date of
                opening. Alternatively, it can be prematurely closed upon the
                marriage of the girl child after she turns 18, subject to
                certain conditions.
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
                Is it mandatory to deposit for the full 21 years?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                No. Contributions are only mandatory for the **first 15 years**
                from the date of account opening. The account balance continues
                to earn the prevailing interest rate for the remaining 6 years
                until the final maturity at 21 years.
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
                What is the penalty if I miss the minimum yearly deposit?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                If the account is not credited with the minimum annual deposit
                (₹250) in a financial year, the account becomes defaulted. It
                can be regularized by paying a penalty of **₹50** along with the
                minimum deposit of ₹250 for each defaulted year.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* Yearly snapshot / Export with fixed height scrollable table */}
      <div className="article" style={{ marginTop: 24 }}>
        <h2>📊 Yearly Snapshot / Export</h2>

        {/* ... Rest of the original code for tables and export remains here ... */}
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
        <h2>🗓️ Monthly Schedule Preview (First 60 Months)</h2>
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
          <p style={{ marginTop: 8 }}>
            Showing first 60 months out of {schedule.length} total months.
          </p>
        )}
      </div>
    </section>
  );
}
