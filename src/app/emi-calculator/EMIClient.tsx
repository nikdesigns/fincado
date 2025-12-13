'use client';
import React, { useMemo, useState } from 'react';

function formatINR(value: number) {
  return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

type AmortRow = {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
};

/* ---------- PieChart: thick donut with overlay arc ---------- */
function PieChart({
  principalPct,
  interestPct,
  size = 240,
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
  // round the dash caps visually by using stroke-linecap="round"

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
          stroke="#eff8e5" /* pale ring */
          strokeWidth={strokeWidth}
        />

        {/* Interest arc overlay (drawn on top). Rotate -90deg to start at top */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#16a34a" /* site green for interest */
            strokeWidth={strokeWidth}
            strokeDasharray={`${interestLength} ${circumference}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'stroke-dasharray 400ms ease' }}
          />
        </g>

        {/* Center hole (donut) */}
        <circle cx={cx} cy={cy} r={r * 0.52} fill="#fff" />

        {/* tidy center label */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontWeight={800}
          fontSize={18}
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

export default function EMIClient() {
  // Inputs (defaults similar to previous behavior)
  const [loanAmount, setLoanAmount] = useState<number>(500000); // ₹5 L
  const [annualRate, setAnnualRate] = useState<number>(10.0); // %
  const [tenureYears, setTenureYears] = useState<number>(5); // years
  const [monthlyIncome, setMonthlyIncome] = useState<number>(40000);
  const [extraPaymentPercent, setExtraPaymentPercent] = useState<number>(10); // 10% extra EMI simulation

  // Derived values
  const monthlyRate = useMemo(() => annualRate / 12 / 100, [annualRate]);
  const nMonths = useMemo(
    () => Math.max(1, Math.round(tenureYears * 12)),
    [tenureYears]
  );

  // EMI calculation
  const emi = useMemo(() => {
    if (loanAmount <= 0 || monthlyRate <= 0 || nMonths <= 0) return 0;
    const r = monthlyRate;
    const numerator = loanAmount * r * Math.pow(1 + r, nMonths);
    const denominator = Math.pow(1 + r, nMonths) - 1;
    return numerator / denominator;
  }, [loanAmount, monthlyRate, nMonths]);

  const totalPayment = useMemo(() => Math.round(emi * nMonths), [emi, nMonths]);
  const totalInterest = useMemo(
    () => Math.round(totalPayment - loanAmount),
    [totalPayment, loanAmount]
  );

  // Amortization schedule
  const schedule: AmortRow[] = useMemo(() => {
    if (loanAmount <= 0 || nMonths <= 0) return [];
    const rows: AmortRow[] = [];
    let balance = loanAmount;
    for (let m = 1; m <= nMonths; m++) {
      const interestPortion = balance * monthlyRate;
      const principalPortion = Math.max(0, emi - interestPortion);
      balance -= principalPortion;
      rows.push({
        month: m,
        emi,
        principal: principalPortion,
        interest: interestPortion,
        balance: Math.max(0, balance),
      });
    }
    return rows;
  }, [loanAmount, monthlyRate, nMonths, emi]);

  // Pie chart percentages
  const interestPercent = useMemo(() => {
    const tp = emi * nMonths;
    if (tp <= 0) return 0;
    // guard: round in 0..100
    return Math.max(
      0,
      Math.min(100, Math.round(((totalPayment - loanAmount) / tp) * 100))
    );
  }, [totalPayment, loanAmount, emi, nMonths]);

  const principalPercent = Math.max(0, 100 - interestPercent);

  // Affordability (FOIR) - safe rule 50%
  const foirAllowed = Math.round(monthlyIncome * 0.5);
  const monthlyEmi = Math.round(emi);
  const affordabilityOk = monthlyEmi <= foirAllowed;

  // Savings by paying extra EMI % (simulate paying extraPaymentPercent% more every month)
  const prepaymentEffect = useMemo(() => {
    if (loanAmount <= 0 || monthlyRate <= 0)
      return { newMonths: 0, interestSaved: 0, newTotalInterest: 0 };
    const extraEmi = emi * (1 + extraPaymentPercent / 100);
    let bal = loanAmount;
    let months = 0;
    let totalInterestPaid = 0;
    while (bal > 0 && months < 1000) {
      months++;
      const interestPortion = bal * monthlyRate;
      const principalPortion = Math.min(
        Math.max(0, extraEmi - interestPortion),
        bal
      );
      if (principalPortion <= 0) {
        break;
      }
      bal -= principalPortion;
      totalInterestPaid += interestPortion;
    }
    const originalTotalInterest = schedule.reduce((s, r) => s + r.interest, 0);
    const interestSaved = Math.max(
      0,
      Math.round(originalTotalInterest - totalInterestPaid)
    );
    return {
      newMonths: months,
      interestSaved,
      newTotalInterest: Math.round(totalInterestPaid),
    };
  }, [loanAmount, monthlyRate, emi, extraPaymentPercent, schedule]);

  // Small helpers
  const safeNumberSetter =
    (setter: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setter(v === '' ? 0 : Number(v));
    };

  return (
    <section className="article">
      <div>
        <h1>📊 Loan EMI Calculator (Equated Monthly Installment)</h1>

        {/* ===== Two-column split: left = inputs, right = chart ===== */}
        <div className="emi-split" style={{ marginTop: 18 }}>
          {/* LEFT: inputs */}
          <div className="emi-left">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              style={{ display: 'grid', gap: 12 }}
            >
              <label>
                Loan Amount (₹)
                <input
                  id="loan"
                  type="number"
                  value={loanAmount}
                  min={0}
                  step={1000}
                  onChange={safeNumberSetter(setLoanAmount)}
                />
              </label>

              <label>
                Interest Rate (% per year)
                <input
                  id="rate"
                  type="number"
                  step="0.01"
                  value={annualRate}
                  onChange={safeNumberSetter(setAnnualRate)}
                  min={0}
                />
              </label>

              <label>
                Loan Tenure (Years)
                <input
                  id="years"
                  type="number"
                  value={tenureYears}
                  onChange={safeNumberSetter(setTenureYears)}
                  min={0.5}
                  step={0.5}
                />
              </label>

              <label>
                Monthly Income (₹) — for FOIR check
                <input
                  id="income"
                  type="number"
                  value={monthlyIncome}
                  onChange={safeNumberSetter(setMonthlyIncome)}
                  min={0}
                />
              </label>

              <label>
                Extra EMI % (simulate paying X% more per month)
                <input
                  id="extra"
                  type="number"
                  step="1"
                  value={extraPaymentPercent}
                  onChange={safeNumberSetter(setExtraPaymentPercent)}
                  min={0}
                  max={200}
                />
              </label>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-cta" onClick={() => {}}>
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoanAmount(500000);
                    setAnnualRate(10.0);
                    setTenureYears(5);
                    setMonthlyIncome(40000);
                    setExtraPaymentPercent(10);
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: chart only */}
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
                  principalPct={principalPercent}
                  interestPct={interestPercent}
                  size={240}
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
                      <div style={{ fontWeight: 800 }}>{principalPercent}%</div>
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
                        background: '#16a34a', // Standard site green
                        display: 'inline-block',
                        borderRadius: 6,
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
              </div>
            </div>

            {/* optional side ad (kept small) */}
            <div className="ad-box" style={{ marginTop: 14 }}>
              Ad / Bank widget
            </div>
          </aside>
        </div>
      </div>

      {/* ===== RESULTS SECTION: full width below the split (REFINED STYLING) ===== */}
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
          {/* Primary Result: Monthly EMI */}
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
              <span role="img" aria-label="Monthly Payment">
                📅
              </span>{' '}
              Monthly EMI
            </p>
            <p
              className="result-primary"
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#047857',
              }}
            >
              {formatINR(monthlyEmi)}
            </p>
          </div>

          {/* Secondary Result: Loan Amount */}
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
              <span role="img" aria-label="Loan Principal">
                🏦
              </span>{' '}
              Loan Amount
            </p>
            <p
              className="result-value"
              style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
            >
              {formatINR(loanAmount)}
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
              {formatINR(totalInterest)}
            </p>
          </div>

          {/* Secondary Result: Total Payment */}
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
              <span role="img" aria-label="Total Cost">
                🏷️
              </span>{' '}
              Total Repayment
            </p>
            <p
              className="result-value"
              style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
            >
              {formatINR(totalPayment)}
            </p>
          </div>
        </div>
      </div>

      {/* LTV and Affordability Card */}
      <div className="card" style={{ marginTop: 18 }}>
        <h3>
          <span role="img" aria-label="Affordability">
            ⚖️
          </span>{' '}
          Affordability Check
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginTop: '12px',
          }}
        >
          <div>
            <h4>Debt-to-Income Ratio (FOIR)</h4>
            <p>Your Monthly EMI: **{formatINR(monthlyEmi)}**</p>
            <p>
              Recommended Max EMI (50% of income): **{formatINR(foirAllowed)}**
            </p>
            {affordabilityOk ? (
              <p style={{ color: 'green', fontWeight: 600 }}>
                ✅ EMI is within safe affordability limits.
              </p>
            ) : (
              <p style={{ color: 'crimson', fontWeight: 600 }}>
                🛑 FOIR exceeded. Consider reducing the loan amount or
                increasing tenure.
              </p>
            )}
          </div>
          <div>
            <h4>Prepayment Simulation ({extraPaymentPercent}% Extra)</h4>
            <p>
              New approximate tenure: **
              {(prepaymentEffect.newMonths / 12).toFixed(1)} years** (
              {prepaymentEffect.newMonths} months)
            </p>
            <p>
              Interest saved:{' '}
              <strong style={{ color: '#047857' }}>
                {formatINR(prepaymentEffect.interestSaved)}
              </strong>
            </p>
            <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
              Making extra payments reduces interest dramatically.
            </p>
          </div>
        </div>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-emi">
            🌟 What is an Equated Monthly Installment (EMI)?
          </h2>
          <p>
            An **Equated Monthly Installment (EMI)** is a fixed payment amount
            made by a borrower to a lender at a specified date each month. It
            consists of two components: the **principal** amount and the
            **interest** charge.
          </p>
          <p>
            EMIs ensure that the loan is fully repaid over a fixed time period
            (tenure). This calculator provides the exact EMI and the total
            interest burden for any common loan type (Home, Car, Personal) based
            on your inputs.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who Needs an EMI Calculator?</h2>
          <p>
            The EMI calculator is a universal tool for financial planning, used
            by:
          </p>
          <ul>
            <li>
              **Prospective Borrowers:** To check affordability and budget for
              monthly loan payments before applying.
            </li>
            <li>
              **Loan Comparison Shoppers:** To compare the total interest cost
              of different loan products (e.g., a short, high-rate personal loan
              vs. a long, low-rate home loan).
            </li>
            <li>
              **Financial Planners:** To determine the maximum loan amount
              affordable within a defined income limit (FOIR).
            </li>
          </ul>
        </section>

        {/* 3. How can the EMI Calculator help you? */}
        <section>
          <h2 id="how-emi-helps">💡 How This Calculator Optimizes Your Loan</h2>
          <p>
            This comprehensive tool helps you analyze three critical aspects of
            loan repayment:
          </p>
          <ul>
            <li>
              **Budgeting:** Calculates the fixed monthly commitment required.
            </li>
            <li>
              **Cost Analysis:** Shows the total interest paid, which often far
              exceeds the original loan principal.
            </li>
            <li>
              **Prepayment Strategy:** Quantifies the savings achieved by paying
              slightly more than the required EMI, shortening the tenure
              dramatically.
            </li>
            <li>
              **Affordability Check:** Determines if the EMI poses a risk to
              your household budget (FOIR check).
            </li>
          </ul>
        </section>

        {/* 4. How does the EMI calculation work? */}
        <section>
          <h2 id="how-emi-works">⚙️ EMI Calculation Logic and Amortization</h2>

          <h3>The Core EMI Formula</h3>
          <p>
            The EMI calculation is based on the general annuity formula for
            loans. The fixed monthly payment (EMI) required to repay a loan is
            calculated using the principal loan amount ($P$), the monthly
            interest rate ($r$), and the tenure in months ($n$).
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
            EMI = P &times; [r &times; (1 + r)<sup>n</sup> / ((1 + r)
            <sup>n</sup> - 1)]
          </div>

          <h3>Amortization Schedule</h3>
          <p>
            The loan schedule tracks how the EMI is split each month. In the
            initial years, the majority of the EMI goes towards **Interest**, as
            the principal outstanding is highest. Over time, the interest
            component decreases, and the **Principal** component increases.
          </p>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="emi-advantages">✅ Key Advantages of Using EMIs</h2>
          <p>EMIs offer structure and predictability to debt management:</p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Fixed Repayment</h3>
              <p>
                The payment amount remains constant throughout the tenure,
                simplifying monthly financial planning and budgeting.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Structured Debt Freedom</h3>
              <p>
                Guarantees that the debt will be fully cleared by the end of the
                specified loan term.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Trackable Progress</h3>
              <p>
                The amortization schedule clearly shows the monthly reduction in
                the loan principal and total interest paid.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Access to Capital</h3>
              <p>
                Provides access to large funds (for housing, education) that
                would otherwise be impossible to acquire instantly.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="emi-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                Does the interest rate change during the tenure?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                It depends on the loan type: fixed-rate loans lock in the
                interest rate for the entire tenure, while floating-rate loans
                (common for home loans) are tied to a market benchmark and the
                rate (and thus the EMI or tenure) will change over time.
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
                What is the ideal loan tenure?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                The ideal tenure balances monthly affordability (shorter tenure
                means higher EMI) against the total cost (longer tenure means
                significantly higher total interest). Experts recommend choosing
                the shortest tenure you can comfortably afford, ideally keeping
                your FOIR below 40% to 50%.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* AMORTIZATION TABLE */}
      <div className="article" style={{ marginTop: 28 }}>
        <h2>Loan Repayment Schedule</h2>
        <div
          className="schedule-wrapper"
          style={{ maxHeight: 420, overflow: 'auto' }}
        >
          <table className="rate-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>EMI</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.slice(0, 120).map((r) => (
                <tr key={r.month}>
                  <td>{r.month}</td>
                  <td>{formatINR(Math.round(r.emi))}</td>
                  <td>{formatINR(Math.round(r.principal))}</td>
                  <td>{formatINR(Math.round(r.interest))}</td>
                  <td>{formatINR(Math.round(r.balance))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {schedule.length > 120 && (
          <p style={{ marginTop: 8 }}>
            Showing first 120 months. Full schedule available via export.
          </p>
        )}
      </div>
    </section>
  );
}
