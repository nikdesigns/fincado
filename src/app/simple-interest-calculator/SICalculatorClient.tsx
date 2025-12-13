// src/app/simple-interest-calculator/SICalculatorClient.tsx
'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

/* ---------- PieChart: thick donut with overlay arc (Reusable) ---------- */
function PieChart({
  principalPct,
  interestPct,
  size = 220,
}: {
  principalPct: number;
  interestPct: number;
  size?: number;
}) {
  const strokeWidth = Math.round(size * 0.18); // thick ring
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
        {/* Base ring = principal (pale) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#eff8e5" /* pale ring (Principal base) */
          strokeWidth={strokeWidth}
        />

        {/* Interest arc overlay. Rotate -90deg to start at top */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#16a34a" /* Site green for Interest */
            strokeWidth={strokeWidth}
            strokeDasharray={`${interestLength} ${circumference}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'stroke-dasharray 400ms ease' }}
          />
        </g>

        {/* Center hole (donut) */}
        <circle cx={cx} cy={cy} r={r * 0.52} fill="#fff" />

        {/* Center label */}
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
/* ---------- End PieChart ---------- */

export default function SICalculatorClient() {
  // Inputs
  const [principal, setPrincipal] = useState<number>(50000); // Principal amount (P)
  const [annualRate, setAnnualRate] = useState<number>(8); // Annual rate (R)
  const [timeYears, setTimeYears] = useState<number>(5); // Time period in years (T)
  const [includePrincipal, setIncludePrincipal] = useState<boolean>(true); // Option to display just interest or final amount

  // Derived Values
  const interestAmount = useMemo(() => {
    // Simple Interest Formula: I = (P * R * T) / 100
    const P = principal;
    const R = annualRate;
    const T = timeYears;
    const interest = (P * R * T) / 100;
    return Math.round(interest);
  }, [principal, annualRate, timeYears]);

  const maturityAmount = useMemo(() => {
    return principal + interestAmount;
  }, [principal, interestAmount]);

  const totalFund = Math.max(1, maturityAmount);

  // Pie percentages (Principal vs Interest)
  const interestPct = Math.round((interestAmount / totalFund) * 100);
  const principalPct = Math.max(0, 100 - interestPct);

  // Helper setter
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="article">
      <div>
        <h1>💲 Simple Interest Calculator</h1>

        <div className="emi-split" style={{ marginTop: 16 }}>
          <div className="emi-left" style={{ flex: '1 1 50%' }}>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'grid', gap: 12 }}
            >
              <label>
                Principal Amount (₹)
                <input
                  type="number"
                  value={principal}
                  onChange={setter(setPrincipal)}
                  min={0}
                  step={1000}
                  required
                />
              </label>

              <label>
                Annual Interest Rate (%)
                <input
                  type="number"
                  value={annualRate}
                  onChange={setter(setAnnualRate)}
                  min={0}
                  step={0.1}
                  required
                />
              </label>

              <label>
                Time Period (Years)
                <input
                  type="number"
                  value={timeYears}
                  onChange={setter(setTimeYears)}
                  min={0}
                  step={0.5}
                  required
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                  type="checkbox"
                  checked={includePrincipal}
                  onChange={(e) => setIncludePrincipal(e.target.checked)}
                />
                Include Principal in Final Amount
              </label>

              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button className="primary-cta">Calculate</button>
                <button
                  type="button"
                  onClick={() => {
                    setPrincipal(50000);
                    setAnnualRate(8);
                    setTimeYears(5);
                    setIncludePrincipal(true);
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Pie Chart and Legend */}
          <aside
            className="emi-right"
            aria-hidden={false}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
          </aside>
        </div>

        {/* RESULTS: full width below split - REFINED STYLING */}
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
                gridColumn: 'span 2',
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Maturity">
                  📈
                </span>{' '}
                Total Maturity Value
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '30px',
                  fontWeight: 800,
                  color: '#047857',
                }}
              >
                {formatINR(maturityAmount)}
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
                  💵
                </span>{' '}
                Interest Earned (I)
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(interestAmount)}
              </p>
            </div>

            {/* Secondary Result: Principal Invested */}
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
                <span role="img" aria-label="Principal">
                  🏦
                </span>{' '}
                Principal Amount (P)
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(principal)}
              </p>
            </div>

            {/* Secondary Result: Rate & Time */}
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
                <span role="img" aria-label="Rate">
                  ⚙️
                </span>{' '}
                Rate & Time
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {annualRate}% p.a.
              </p>
              <p
                className="result-value"
                style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}
              >
                for {timeYears} years
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-si">🌟 What is Simple Interest?</h2>
          <p>
            **Simple Interest (SI)** is the quickest and most fundamental method
            of calculating interest on a principal amount. It is determined by
            multiplying the principal amount by the interest rate and the time
            period. Crucially, simple interest is **only** calculated on the
            **original principal amount**; it does not compound (earn interest
            on previously accumulated interest).
          </p>
          <p>
            Simple Interest is typically used for short-term loans, basic
            savings accounts, or calculating quick, approximate interest
            earnings.
          </p>
        </section>

        {/* 2. Simple Interest vs Compound Interest */}
        <section>
          <h2 id="vs-compound">⚖️ Simple Interest vs. Compound Interest</h2>
          <p>
            The difference between simple and compound interest is fundamental
            to long-term finance: [Image of Simple Interest vs Compound Interest
            Chart]
          </p>
          <div className="advantage-grid">
            <div
              className="advantage-card"
              style={{ borderLeft: '3px solid #047857' }}
            >
              <h3>Simple Interest (SI)</h3>
              <ul>
                <li>**Calculated On:** Original Principal only.</li>
                <li>**Growth:** Linear growth over time.</li>
                <li>
                  **Used For:** Short-term loans, basic receipts, quick
                  calculations.
                </li>
              </ul>
            </div>
            <div
              className="advantage-card"
              style={{ borderLeft: '3px solid #1d4ed8' }}
            >
              <h3>Compound Interest (CI)</h3>
              <ul>
                <li>**Calculated On:** Principal + Accumulated Interest.</li>
                <li>**Growth:** Exponential growth over time.</li>
                <li>
                  **Used For:** Savings accounts, SIPs, FDs, long-term
                  investments, and most loans.
                </li>
              </ul>
            </div>
          </div>
          <p style={{ marginTop: 10, fontSize: 13, color: '#6b7280' }}>
            *For long-term wealth creation, compounding interest is always
            superior, as the interest earned begins to generate its own
            returns.*
          </p>
        </section>

        {/* 3. How can the SI Calculator help you? */}
        <section>
          <h2 id="how-si-helps">
            💡 How This Simple Interest Calculator Helps You
          </h2>
          <p>
            This calculator is a straightforward tool for anyone needing to
            quickly calculate a financial transaction without the complexity of
            compounding:
          </p>
          <ul>
            <li>
              **Quick Estimates:** Instantly find the interest on short-term
              deposits or fixed-rate transactions.
            </li>
            <li>
              **Lump Sum Planning:** Ideal for calculating interest earnings on
              a single, one-time investment over a specific tenure.
            </li>
            <li>
              **Student Loans:** Useful for approximating interest on certain
              educational loans where interest is calculated simply before the
              repayment phase begins.
            </li>
          </ul>
        </section>

        {/* 4. How does the SI calculation work? */}
        <section>
          <h2 id="how-si-works">⚙️ Simple Interest Formula and Logic</h2>

          <h3>The Simple Interest Formula</h3>
          <p>
            Simple Interest (I) is directly proportional to the Principal (P),
            Rate (R), and Time (T).
          </p>
          <div
            style={{
              fontFamily: 'monospace',
              backgroundColor: '#eef2ff',
              padding: '12px',
              margin: '10px 0',
              borderRadius: '4px',
              textAlign: 'center',
              fontSize: '1.2em',
            }}
          >
            I = (P &times; R &times; T) / 100
          </div>
          <p>Where:</p>
          <ul>
            <li>**I** = Simple Interest Amount</li>
            <li>**P** = Principal Amount (Initial Sum)</li>
            <li>**R** = Annual Interest Rate (as a percentage, e.g., 8)</li>
            <li>**T** = Time Period (in years)</li>
          </ul>

          <h3>Maturity Value Formula</h3>
          <p>
            The final maturity amount (A) is simply the sum of the principal and
            the total simple interest earned:
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
            A = P + I
          </div>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="si-advantages">✅ Key Applications of Simple Interest</h2>
          <p>
            While often superseded by compound interest, simple interest remains
            relevant in certain applications:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Fast Calculation</h3>
              <p>
                The straightforward formula is easy to calculate manually or
                quickly verify complex statements.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Short-Term Lending</h3>
              <p>
                Often used for loans under one year, pawn shop loans, or basic
                trade credit where compounding is unnecessary.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Government Bonds</h3>
              <p>
                The interest (coupon payment) on certain government bonds and
                securities is often calculated using simple interest on the face
                value.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Transparent Cost</h3>
              <p>
                Borrowers find it easier to understand the total interest cost
                upfront, as it doesn&apos;t change based on payment schedules.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="si-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                Is interest on savings accounts calculated using simple
                interest?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                No. While some banks previously used simple interest, today,
                interest on most savings accounts and all FDs is calculated
                using **compound interest**, typically compounded quarterly or
                annually.
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
                What happens if the time period is less than a year?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                When the time period is less than a year, T in the formula is
                represented as a fraction of the year (e.g., 6 months = $6/12$
                or 0.5 years). You should always input the time period in terms
                of years or decimals of a year into the calculator.
              </p>
            </details>
          </div>
        </section>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          className="primary-cta"
          onClick={() => {
            const summary = `SI: Principal ${formatINR(
              principal
            )} @ ${annualRate}% for ${timeYears} years => Interest: ${formatINR(
              interestAmount
            )}, Maturity: ${formatINR(maturityAmount)}`;
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
