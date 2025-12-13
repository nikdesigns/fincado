// src/app/lumpsum-calculator/LumpsumClient.tsx
'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

/* ---------- PieChart: thick donut showing Principal vs Interest ---------- */
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
        {/* Base ring = principal (pale) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#eff8e5"
          strokeWidth={strokeWidth}
        />

        {/* Interest arc overlay. Rotate -90deg to start at top */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#1d4ed8" /* Primary Blue for Interest/Growth */
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
          Principal / Returns
        </text>
      </svg>
    </div>
  );
}
/* ---------- End PieChart ---------- */

export default function LumpsumClient() {
  // Inputs
  const [principal, setPrincipal] = useState<number>(100000); // Initial investment (P)
  const [annualRate, setAnnualRate] = useState<number>(12); // Expected CAGR (r)
  const [timeYears, setTimeYears] = useState<number>(10); // Investment tenure (t)
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(1); // 1=Annual, 12=Monthly

  // Derived Values
  const n = compoundingFrequency;
  const t = timeYears;
  const periodicRate = annualRate / 100 / n;
  const totalPeriods = n * t;

  // Future Value Calculation: FV = P * (1 + r/n)^(n*t)
  const futureValue = useMemo(() => {
    if (principal <= 0 || totalPeriods <= 0) return 0;

    const fv = principal * Math.pow(1 + periodicRate, totalPeriods);
    return Math.round(fv);
  }, [principal, periodicRate, totalPeriods]);

  const totalReturns = Math.max(0, futureValue - principal);

  // Pie percentages (Principal vs Returns)
  const totalFund = Math.max(1, futureValue);
  const interestPct = Math.round((totalReturns / totalFund) * 100);
  const principalPct = Math.max(0, 100 - interestPct);

  // Helper setter
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="article">
      <div>
        <h1>📈 Lumpsum Investment Calculator (Future Value)</h1>

        <div className="emi-split" style={{ marginTop: 16 }}>
          <div className="emi-left">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'grid', gap: 12 }}
            >
              <label>
                Initial Investment Amount (₹) — *Lump Sum (P)*
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
                Expected Annual Rate of Return (%) — *CAGR (r)*
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
                Investment Tenure (Years) — *(t)*
                <input
                  type="number"
                  value={timeYears}
                  onChange={setter(setTimeYears)}
                  min={1}
                  step={0.5}
                  required
                />
              </label>

              <label>
                Compounding Frequency (per year) — *(n)*
                <select
                  value={compoundingFrequency}
                  onChange={(e) =>
                    setCompoundingFrequency(Number(e.target.value))
                  }
                  required
                >
                  <option value={1}>Annually (1)</option>
                  <option value={2}>Half-Yearly (2)</option>
                  <option value={4}>Quarterly (4)</option>
                  <option value={12}>Monthly (12)</option>
                </select>
              </label>

              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button className="primary-cta">Calculate</button>
                <button
                  type="button"
                  onClick={() => {
                    setPrincipal(100000);
                    setAnnualRate(12);
                    setTimeYears(10);
                    setCompoundingFrequency(1);
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
                        background: '#1d4ed8',
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
          </aside>
        </div>

        {/* RESULTS: full width below split - REFINED STYLING */}
        <div className="emi-results-full" style={{ marginTop: 24 }}>
          <div
            className="result-grid emi-summary-strip"
            style={{
              backgroundColor: '#e0f2fe', // Pale blue background
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #93c5fd', // Light blue border
            }}
          >
            {/* Primary Result: Future Value */}
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
                Estimated Future Value (FV)
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#1d4ed8', // Strong blue
                }}
              >
                {formatINR(futureValue)}
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
                <span role="img" aria-label="Returns">
                  📈
                </span>{' '}
                Total Wealth Gained
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#047857' }}
              >
                {formatINR(totalReturns)}
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
                Principal Invested (PV)
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(principal)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-lumpsum">🌟 What is a Lumpsum Investment?</h2>
          <p>
            A **Lumpsum Investment** involves investing a significant, one-time
            amount into a financial instrument (like a Mutual Fund, FD, or
            stock) and allowing it to grow over time. It is the opposite of a
            Systematic Investment Plan (SIP).
          </p>
          <p>
            The biggest advantage of a lumpsum investment is that the entire
            amount starts earning compound returns immediately, which is highly
            beneficial over long investment horizons.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 When Should You Use a Lumpsum Calculator?</h2>
          <p>
            This calculator is essential when you have immediate, surplus funds:
          </p>
          <ul>
            <li>
              **Bonus or Inheritance:** To estimate the long-term wealth
              creation potential of unexpected large sums of money.
            </li>
            <li>
              **Market Timing:** Investors who believe the market is near a low
              point may prefer lumpsum investing to maximize returns from the
              subsequent market rebound.
            </li>
            <li>
              **Long-Term Goals:** For goals like retirement or child&apos;s
              education where the long tenure allows the initial investment to
              compound heavily.
            </li>
          </ul>
        </section>

        {/* 3. How does the calculation work? */}
        <section>
          <h2 id="how-calculation-works">
            ⚙️ Lumpsum Calculation Logic (Compound Interest)
          </h2>

          <h3>The Future Value (FV) Formula</h3>
          <p>
            The estimated future value (FV) is calculated using the **Compound
            Interest Formula**, which accounts for the initial principal, the
            interest rate, and how often the interest is added back (compounding
            frequency, $n$).
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
            FV = P &times; (1 + r/n)<sup>n &times; t</sup>
          </div>
          <p>Where:</p>
          <ul>
            <li>**FV** = Future Value (Maturity Amount)</li>
            <li>**P** = Principal (Initial Lumpsum Amount)</li>
            <li>**r** = Annual Rate of Return (CAGR)</li>
            <li>
              **n** = Compounding Frequency per year (e.g., 1 for annually, 12
              for monthly)
            </li>
            <li>**t** = Investment Tenure in years</li>
          </ul>
        </section>

        {/* 4. Advantage */}
        <section>
          <h2 id="lumpsum-advantages">
            ✅ Lumpsum vs. SIP: Key Advantages of Lumpsum
          </h2>
          <p>
            While SIP offers Rupee Cost Averaging, Lumpsum offers benefits
            related to time and compounding:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Maximum Compounding</h3>
              <p>
                The entire investment starts compounding immediately, maximizing
                the power of &quot;interest on interest.&quot;
              </p>
            </div>
            <div className="advantage-card">
              <h3>Immediate Deployment</h3>
              <p>
                Ensures that no money is sitting idle in a low-interest savings
                account, putting all capital to work instantly.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Simplified Tracking</h3>
              <p>
                Since it is a one-time transaction, tracking and documentation
                are simpler compared to 12 monthly SIP transactions.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Timing Advantage (Market Lows)</h3>
              <p>
                Provides exceptional returns if executed successfully after a
                significant market correction or crash.
              </p>
            </div>
          </div>
        </section>

        {/* 5. FAQ's */}
        <section>
          <h2 id="lumpsum-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                Is Lumpsum safer than SIP?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                No. Lumpsum is riskier than SIP because if the market corrects
                sharply right after your investment, your entire capital is
                exposed. SIP mitigates this risk through Rupee Cost Averaging.
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
                What is CAGR in Lumpsum calculation?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                CAGR (Compounded Annual Growth Rate) is the annualized rate of
                return earned on your investment over the specified period. It
                is used as the &apos;r&apos; (Rate) input in the future value
                formula, representing the assumed average geometric return.
              </p>
            </details>
          </div>
        </section>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          className="primary-cta"
          onClick={() => {
            const summary = `Lumpsum ${formatINR(
              principal
            )} @ ${annualRate}% for ${timeYears} years => FV: ${formatINR(
              futureValue
            )}, Returns: ${formatINR(totalReturns)}.`;
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
