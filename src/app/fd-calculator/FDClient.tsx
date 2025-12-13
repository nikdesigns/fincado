'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

type ScheduleRow = {
  period: number;
  balance: number;
  interestThisPeriod: number;
};

const COMPOUND_OPTIONS = [
  { key: 'monthly', label: 'Monthly', periodsPerYear: 12 },
  { key: 'quarterly', label: 'Quarterly', periodsPerYear: 4 },
  { key: 'halfyearly', label: 'Half-Yearly', periodsPerYear: 2 },
  { key: 'yearly', label: 'Yearly', periodsPerYear: 1 },
] as const;

/* ---------- PieChart component (thick donut with rounded arc) ---------- */
function PieChart({
  principalPct,
  interestPct,
  size = 220,
}: {
  principalPct: number;
  interestPct: number;
  size?: number;
}) {
  const strokeWidth = Math.max(12, Math.round(size * 0.18));
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const interestLength = (interestPct / 100) * circumference;

  // If interestPct is 0, draw no arc; if 100, fill entire ring.
  const dashArray =
    interestPct <= 0
      ? `0 ${circumference}`
      : interestPct >= 100
      ? `${circumference} 0`
      : `${interestLength} ${Math.max(0, circumference - interestLength)}`;

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Principal vs interest"
      >
        {/* base (principal, pale) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f1f5f9" /* pale ring */
          strokeWidth={strokeWidth}
        />

        {/* interest arc overlay, start at top */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#60a5fa" /* interest color (blue) */
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 420ms ease' }}
          />
        </g>

        {/* donut hole */}
        <circle cx={cx} cy={cy} r={r * 0.5} fill="#fff" />

        {/* center label */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontWeight={700}
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

export default function FDClient() {
  const [principal, setPrincipal] = useState<number>(100000); // ₹1L
  const [annualRate, setAnnualRate] = useState<number>(7.0); // %
  const [years, setYears] = useState<number>(3);
  const [months, setMonths] = useState<number>(0);
  const [compoundKey, setCompoundKey] = useState<string>('quarterly');
  const [marginalTaxPct, setMarginalTaxPct] = useState<number>(20); // tax slab %
  const [showGrossOnly, setShowGrossOnly] = useState<boolean>(false);

  const totalMonths = Math.max(1, Math.round(years * 12 + months));
  const compound =
    COMPOUND_OPTIONS.find((c) => c.key === compoundKey) || COMPOUND_OPTIONS[1];
  const m = compound.periodsPerYear;

  const totalPeriods = useMemo(
    () => Math.ceil((totalMonths / 12) * m),
    [totalMonths, m]
  );

  const periodRate = useMemo(() => annualRate / 100 / m, [annualRate, m]);

  const maturity = useMemo(() => {
    if (principal <= 0 || annualRate <= 0 || totalPeriods <= 0)
      return principal;
    return principal * Math.pow(1 + periodRate, totalPeriods);
  }, [principal, periodRate, totalPeriods, annualRate]);

  const grossInterest = Math.max(0, maturity - principal);
  const taxOnInterest = Math.round(grossInterest * (marginalTaxPct / 100));
  const postTaxMaturity = Math.max(0, maturity - taxOnInterest);

  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let balance = principal;
    for (let p = 1; p <= totalPeriods; p++) {
      const interestThis = balance * periodRate;
      balance = balance + interestThis;
      rows.push({
        period: p,
        balance,
        interestThisPeriod: interestThis,
      });
    }
    return rows;
  }, [principal, periodRate, totalPeriods]);

  function exportCSV() {
    const header = ['Period', 'Balance', 'InterestThisPeriod'];
    const lines = [header.join(',')].concat(
      schedule.map((r) =>
        [
          r.period,
          Math.round(r.balance),
          Math.round(r.interestThisPeriod),
        ].join(',')
      )
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fd-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  // pie percentages (principal vs interest) — denominator = maturity (principal+interest)
  const interestPct = useMemo(() => {
    const denom = maturity > 0 ? maturity : principal;
    const p = denom <= 0 ? 0 : Math.round((grossInterest / denom) * 100);
    return Math.max(0, Math.min(100, p));
  }, [grossInterest, maturity, principal]);

  const principalPct = Math.max(0, 100 - interestPct);

  return (
    <section className="article">
      <div>
        <h1>💵 Fixed Deposit (FD) Calculator</h1>

        {/* Split: left inputs, right chart (re-using emi-split classes so your global.css works) */}
        <div className="emi-split" style={{ marginTop: 16 }}>
          <div className="emi-left">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'grid', gap: 12 }}
            >
              <label>
                Principal (₹)
                <input
                  type="number"
                  value={principal}
                  onChange={setter(setPrincipal)}
                  min={0}
                  step={1000}
                />
              </label>

              <label>
                Annual Interest Rate (%)
                <input
                  type="number"
                  step="0.01"
                  value={annualRate}
                  onChange={setter(setAnnualRate)}
                  min={0}
                />
              </label>

              <div style={{ display: 'flex', gap: 8 }}>
                <label style={{ flex: 1 }}>
                  Years
                  <input
                    type="number"
                    value={years}
                    onChange={setter(setYears)}
                    min={0}
                    step={1}
                  />
                </label>
                <label style={{ flex: 1 }}>
                  Months
                  <input
                    type="number"
                    value={months}
                    onChange={setter(setMonths)}
                    min={0}
                    max={11}
                  />
                </label>
              </div>

              <label>
                Compounding Frequency
                <select
                  value={compoundKey}
                  onChange={(e) => setCompoundKey(e.target.value)}
                >
                  {COMPOUND_OPTIONS.map((c) => (
                    <option value={c.key} key={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Marginal Tax Rate (%) — for tax estimate
                <input
                  type="number"
                  value={marginalTaxPct}
                  onChange={setter(setMarginalTaxPct)}
                  min={0}
                  max={40}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={showGrossOnly}
                  onChange={() => setShowGrossOnly(!showGrossOnly)}
                />
                Show gross interest only (do not subtract tax)
              </label>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-cta">Update</button>
                <button
                  type="button"
                  onClick={() => {
                    setPrincipal(100000);
                    setAnnualRate(7.0);
                    setYears(3);
                    setMonths(0);
                    setCompoundKey('quarterly');
                    setMarginalTaxPct(20);
                    setShowGrossOnly(false);
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
                        background: '#f1f5f9',
                        display: 'inline-block',
                        borderRadius: 6,
                        border: '1px solid rgba(0,0,0,0.05)',
                        backgroundColor: '#f1f5f9',
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
                        background: '#60a5fa',
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
              Ad / Bank widget
            </div>
          </aside>
        </div>
      </div>

      {/* Results — full width below split (re-using emi-results-full class) - REFINED STYLING */}
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
          {/* Primary Result: Post-tax Maturity */}
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
              Post-tax Maturity
            </p>
            <p
              className="result-primary"
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#1d4ed8', // Strong blue
              }}
            >
              {formatINR(
                Math.round(showGrossOnly ? maturity : postTaxMaturity)
              )}
            </p>
          </div>

          {/* Secondary Result: Gross Interest */}
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
              Gross Interest Earned
            </p>
            <p
              className="result-value"
              style={{ fontSize: '20px', fontWeight: 700, color: '#10b981' }}
            >
              {formatINR(Math.round(grossInterest))}
            </p>
          </div>

          {/* Secondary Result: Estimated Tax on Interest */}
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
              <span role="img" aria-label="Tax">
                💸
              </span>{' '}
              Estimated Tax ({marginalTaxPct}%)
            </p>
            <p
              className="result-value"
              style={{ fontSize: '20px', fontWeight: 700, color: '#dc2626' }}
            >
              {formatINR(Math.round(taxOnInterest))}
            </p>
          </div>

          {/* Secondary Result: Total Compounding Periods */}
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
                ⏰
              </span>{' '}
              Total Compounding Periods
            </p>
            <p
              className="result-value"
              style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
            >
              {totalPeriods}
            </p>
            <p
              className="result-value"
              style={{ fontSize: 13, marginTop: 4, color: '#6b7280' }}
            >
              ({compound.label} compounding)
            </p>
          </div>
        </div>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-fd">🌟 What is a Fixed Deposit (FD)?</h2>
          <p>
            A **Fixed Deposit (FD)** is a type of financial instrument provided
            by banks and financial institutions that offers investors a higher
            rate of interest than a regular savings account. The key feature is
            that the funds are locked in for a fixed period (tenure), ranging
            from 7 days to 10 years, and the interest rate is guaranteed for the
            entire period, regardless of market fluctuations.
          </p>
          <p>
            FDs are highly popular among risk-averse investors, especially
            senior citizens, as they guarantee capital safety and stable
            returns.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who Should Invest in an FD?</h2>
          <p>
            FDs are best suited for individuals who prioritize capital security
            and need predictable returns:
          </p>
          <ul>
            <li>
              **Risk-Averse Investors:** Those who cannot tolerate market
              volatility and prefer guaranteed returns.
            </li>
            <li>
              **Senior Citizens:** Banks typically offer an additional interest
              rate benefit (0.25% to 0.50%) to senior citizens.
            </li>
            <li>
              **Short-to-Medium Term Goals:** Ideal for parking funds needed in
              the near future (1 to 5 years), such as a house down payment or
              tuition fees, where safety is paramount.
            </li>
            <li>
              **Tax Planners:** Specific Tax-Saver FDs qualify for deduction
              under **Section 80C** of the Income Tax Act (with a 5-year
              lock-in).
            </li>
          </ul>
        </section>

        {/* 3. How can the FD Calculator help you? */}
        <section>
          <h2 id="how-fd-helps">💡 How This FD Calculator Helps You</h2>
          <p>
            This FD calculator is critical because it helps model the impact of
            the three main factors affecting your final return: the rate, the
            tenure, and, most importantly, the **compounding frequency**.
          </p>
          <ul>
            <li>
              **Maturity Projection:** Accurately estimates the gross maturity
              value based on the chosen interest rate and compounding method.
            </li>
            <li>
              **Compounding Comparison:** Allows you to see how often interest
              is calculated (monthly, quarterly, etc.) and how this frequency
              increases the final corpus.
            </li>
            <li>
              **Post-Tax Analysis:** Provides the actual usable return by
              calculating and subtracting tax based on your marginal tax slab.
            </li>
            <li>
              **TDS Threshold:** Helps investors monitor their annual interest
              earnings to manage potential Tax Deducted at Source (TDS)
              obligations.
            </li>
          </ul>
        </section>

        {/* 4. How does the FD calculation work? */}
        <section>
          <h2 id="how-fd-works">⚙️ FD Calculation Logic and Compounding</h2>

          <h3>The Compound Interest Formula</h3>
          <p>
            The maturity value (A) of a Fixed Deposit is calculated using the
            compound interest formula, adjusted for the compounding frequency
            ($m$):
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
            A = P &times; (1 + r/m)<sup>m &times; t</sup>
          </div>
          <p>Where:</p>
          <ul>
            <li>**A** = Maturity Amount</li>
            <li>**P** = Principal (initial investment)</li>
            <li>**r** = Annual interest rate (decimal)</li>
            <li>
              **m** = Compounding periods per year (e.g., 4 for quarterly)
            </li>
            <li>**t** = Total tenure in years (e.g., 3)</li>
          </ul>

          <h3>Taxation Note</h3>
          <p>
            Interest earned on FDs is fully taxable under the head &quot;Income
            from Other Sources&quot; based on the investor&apos;s marginal tax
            slab. Banks deduct **TDS (Tax Deducted at Source)** if the annual
            interest exceeds a statutory limit (currently ₹40,000 for general
            citizens / ₹50,000 for senior citizens).
          </p>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="fd-advantages">✅ Key Advantages of a Fixed Deposit</h2>
          <p>FDs are a preferred option for stability and predictability:</p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Guaranteed Rate of Return</h3>
              <p>
                The interest rate is locked in when you invest, protecting your
                returns from market volatility for the entire tenure.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Capital Protection</h3>
              <p>
                FDs are generally considered the safest form of investment, with
                the principal amount entirely protected by the bank/institution.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Loan Facility</h3>
              <p>
                You can often avail a loan against your FD (up to 90% of the
                principal) without needing to prematurely break the deposit.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Flexible Interest Payout</h3>
              <p>
                You can choose to receive interest monthly/quarterly (for
                income) or reinvest it (compound) for growth.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="fd-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                What is the minimum FD lock-in period?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Most banks offer a minimum FD lock-in period of **7 days**.
                However, for a Tax-Saver FD, the minimum lock-in period required
                for tax benefits under Section 80C is 5 years.
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
                What happens if I break an FD prematurely?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Banks usually permit premature withdrawal but levy a penalty
                (often 0.5% to 1% reduction in the applicable interest rate).
                The interest rate paid will be the rate applicable for the
                actual period the deposit was held.
              </p>
            </details>
            <details
              style={{
                fontWeight: 600,
                padding: '15px 0',
                cursor: 'pointer',
                outline: 'none',
                color: '#1f2937',
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
                Does higher compounding frequency (monthly vs. quarterly) make a
                big difference?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Yes, but the difference is small. More frequent compounding
                (e.g., monthly) means you start earning interest on your
                interest sooner. However, banks account for this by adjusting
                the effective interest rate. The difference usually amounts to a
                few hundred rupees on a large corpus over a long tenure.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* Schedule preview */}
      <div className="article" style={{ marginTop: 16 }}>
        <h2>Compounding Schedule (periods)</h2>
        <div
          className="schedule-wrapper"
          style={{ maxHeight: 360, overflow: 'auto' }}
        >
          <table className="rate-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Interest this period</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((r) => (
                <tr key={r.period}>
                  <td>{r.period}</td>
                  <td>{formatINR(Math.round(r.interestThisPeriod))}</td>
                  <td>{formatINR(Math.round(r.balance))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={exportCSV}>Export Schedule CSV</button>
          <button
            onClick={() => {
              const summary = `FD ${formatINR(principal)} @ ${annualRate}% (${
                compound.label
              }) for ${years}y ${months}m ⇒ Maturity ${formatINR(
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
