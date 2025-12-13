// ./src/app/loans/personal-loan/PersonalLoanClient.tsx
'use client';
import React, { useMemo, useRef, useState } from 'react';
// Assuming '@/lib/manualLoanRates' provides loanRates and rateLastUpdated

// Placeholder definitions for environment without external library imports
const loanRates = [
  {
    bank: 'Bank A',
    rate: '10.5% - 14.0%',
    fee: '1.0% - 2.0%',
    applyLink: '#bankA',
  },
  {
    bank: 'Bank B',
    rate: '11.0% - 15.5%',
    fee: '0.5% - 1.5%',
    applyLink: '#bankB',
  },
  {
    bank: 'Bank C',
    rate: '12.5% - 18.0%',
    fee: '2.0% - 4.0%',
    applyLink: '#bankC',
  },
];
const rateLastUpdated = 'Dec 2025';

function formatINR(v: number) {
  return '₹' + v.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

type AmortRow = {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
};

/* ---------- PieChart: thick donut with rounded arc (matches other pages) ---------- */
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
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#16a34a" // Standard site green
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 420ms ease' }}
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

export default function PersonalLoanClient() {
  // Defaults
  const [loanAmount, setLoanAmount] = useState<number>(300000); // ₹3L
  const [annualRate, setAnnualRate] = useState<number>(14.5);
  const [tenureYears, setTenureYears] = useState<number>(3);
  const [processingFeePct, setProcessingFeePct] = useState<number>(2);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(35000);
  const [extraEmiPercent, setExtraEmiPercent] = useState<number>(10);

  const printRef = useRef<HTMLDivElement | null>(null);

  // Derived
  const monthlyRate = useMemo(() => annualRate / 12 / 100, [annualRate]);
  const nMonths = useMemo(
    () => Math.max(1, Math.round(tenureYears * 12)),
    [tenureYears]
  );

  const emi = useMemo(() => {
    if (loanAmount <= 0 || monthlyRate <= 0) return 0;
    const r = monthlyRate;
    return (
      (loanAmount * r * Math.pow(1 + r, nMonths)) /
      (Math.pow(1 + r, nMonths) - 1)
    );
  }, [loanAmount, monthlyRate, nMonths]);

  const totalPayment = Math.round(emi * nMonths);
  const totalInterest = Math.round(Math.max(0, totalPayment - loanAmount));
  const processingFee = Math.round((processingFeePct / 100) * loanAmount);

  // Schedule
  const schedule: AmortRow[] = useMemo(() => {
    const rows: AmortRow[] = [];
    let balance = loanAmount;
    for (let m = 1; m <= nMonths; m++) {
      const interest = balance * monthlyRate;
      const principal = Math.max(0, emi - interest);
      balance = Math.max(0, balance - principal);
      rows.push({
        month: m,
        emi,
        principal,
        interest,
        balance,
      });
    }
    return rows;
  }, [loanAmount, monthlyRate, nMonths, emi]);

  // Pie percentages (principal vs interest) — use totals from schedule
  const totalPrincipalPaid = useMemo(
    () => schedule.reduce((s, r) => s + r.principal, 0),
    [schedule]
  );
  const totalInterestPaid = useMemo(
    () => schedule.reduce((s, r) => s + r.interest, 0),
    [schedule]
  );
  const totalRepayment = Math.max(
    1,
    Math.round(totalPrincipalPaid + totalInterestPaid)
  );
  const interestPct = useMemo(
    () =>
      Math.max(
        0,
        Math.min(100, Math.round((totalInterestPaid / totalRepayment) * 100))
      ),
    [totalInterestPaid, totalRepayment]
  );
  const principalPct = Math.max(0, 100 - interestPct);

  // FOIR check
  const maxSafeEMI = Math.round(monthlyIncome * 0.5);
  const affordable = Math.round(emi) <= maxSafeEMI;

  // Prepayment simulation
  const extraEmi = useMemo(
    () => emi * (1 + extraEmiPercent / 100),
    [emi, extraEmiPercent]
  );
  const prepayment = useMemo(() => {
    let bal = loanAmount;
    let months = 0;
    let totalInterestPaidLocal = 0;
    while (bal > 0 && months < 1000) {
      months++;
      const interest = bal * monthlyRate;
      const principal = Math.min(Math.max(0, extraEmi - interest), bal);
      if (principal <= 0) break;
      bal -= principal;
      totalInterestPaidLocal += interest;
    }
    const originalInterest = schedule.reduce((s, r) => s + r.interest, 0);
    const saved = Math.max(
      0,
      Math.round(originalInterest - totalInterestPaidLocal)
    );
    return {
      newMonths: months,
      saved,
      newInterest: Math.round(totalInterestPaidLocal),
    };
  }, [extraEmi, loanAmount, monthlyRate, schedule]);

  // CSV export
  function exportCSV() {
    const header = ['Month', 'EMI', 'Principal', 'Interest', 'Balance'];
    const lines = [header.join(',')].concat(
      schedule.map((r) =>
        [
          r.month,
          Math.round(r.emi),
          Math.round(r.principal),
          Math.round(r.interest),
          Math.round(r.balance),
        ].join(',')
      )
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personal-loan-schedule-${loanAmount}-${nMonths}m.csv`;
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
          <title>Personal Loan Repayment Schedule</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
            th, td { padding: 8px 10px; border: 1px solid #ddd; text-align: right; }
            th { background: #f7f7f7; text-align: left; }
            caption { font-weight: 700; margin-bottom: 8px; text-align: left; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  }

  // small setters
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="article">
      <div>
        <h1>💸 Personal Loan EMI Calculator</h1>

        {/* split: left inputs, right pie chart */}
        <div className="emi-split" style={{ marginTop: 12 }}>
          <div className="emi-left">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'grid', gap: 12 }}
            >
              <label>
                Loan Amount (₹)
                <input
                  type="number"
                  value={loanAmount}
                  onChange={setter(setLoanAmount)}
                  min={0}
                  step={1000}
                />
              </label>

              <label>
                Interest Rate (% p.a.)
                <input
                  type="number"
                  step="0.1"
                  value={annualRate}
                  onChange={setter(setAnnualRate)}
                />
              </label>

              <label>
                Tenure (Years)
                <input
                  type="number"
                  value={tenureYears}
                  onChange={setter(setTenureYears)}
                  min={1}
                />
              </label>

              <label>
                Processing Fee (%)
                <input
                  type="number"
                  step="0.1"
                  value={processingFeePct}
                  onChange={setter(setProcessingFeePct)}
                />
              </label>

              <label>
                Monthly Income (₹)
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={setter(setMonthlyIncome)}
                />
              </label>

              <label>
                Extra EMI % (optional)
                <input
                  type="number"
                  value={extraEmiPercent}
                  onChange={setter(setExtraEmiPercent)}
                />
              </label>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-cta">Calculate</button>
                <button
                  type="button"
                  onClick={() => {
                    setLoanAmount(300000);
                    setAnnualRate(14.5);
                    setTenureYears(3);
                    setProcessingFeePct(2);
                    setMonthlyIncome(35000);
                    setExtraEmiPercent(10);
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
                        background: '#16a34a', // Standard site green
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

      {/* results full width - REFINED STYLING */}
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
              Monthly EMI (Est.)
            </p>
            <p
              className="result-primary"
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#047857',
              }}
            >
              {formatINR(Math.round(emi))}
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
              <span role="img" aria-label="Total Interest">
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
              <span role="img" aria-label="Total Repayment">
                💵
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

          {/* Tertiary Result: Processing Fee */}
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
              <span role="img" aria-label="Fee">
                🪙
              </span>{' '}
              Processing Fee ({processingFeePct}%)
            </p>
            <p
              className="result-value"
              style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
            >
              {formatINR(processingFee)}
            </p>
          </div>
        </div>
      </div>

      {/* Eligibility */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>
          <span role="img" aria-label="Eligibility">
            ✅
          </span>{' '}
          Eligibility / FOIR Check
        </h3>
        <p>
          Your calculated EMI: <strong>{formatINR(Math.round(emi))}</strong>
        </p>
        <p>
          Safe EMI limit (50% of income):{' '}
          <strong>{formatINR(maxSafeEMI)}</strong>
        </p>
        <p style={{ marginTop: 8 }}>
          {affordable ? (
            <span style={{ color: 'green', fontWeight: 600 }}>
              Eligible — EMI is within the safe debt-to-income ratio (FOIR).
            </span>
          ) : (
            <span style={{ color: 'crimson', fontWeight: 600 }}>
              May be rejected — Your EMI exceeds the recommended FOIR limit.
            </span>
          )}
        </p>
      </div>

      {/* Extra EMI */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>
          <span role="img" aria-label="Savings">
            ⚡
          </span>{' '}
          Extra EMI Savings ({extraEmiPercent}% Prepayment)
        </h3>
        <p style={{ marginTop: 8 }}>
          New tenure: <strong>{prepayment.newMonths}</strong> months (
          {(prepayment.newMonths / 12).toFixed(1)} years)
        </p>
        <p>
          Interest saved: <strong>{formatINR(prepayment.saved)}</strong>
        </p>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Many banks let you prepay partially without penalty (check your
          lender). Prepayment significantly reduces total interest paid.
        </p>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-pl">🌟 What is a Personal Loan?</h2>
          <p>
            A **Personal Loan** is an unsecured loan provided by banks and NBFCs
            for various personal expenses, such as medical bills, weddings,
            travel, or debt consolidation. Unlike home or car loans, personal
            loans do not require collateral (security), which makes the interest
            rates typically higher.
          </p>
          <p>
            Because approval depends solely on the borrower&apos;s credit
            history and income stability, maintaining a strong credit score is
            vital for securing competitive rates. Repayment is via fixed monthly
            EMIs over a short to medium tenure (usually 1 to 5 years).
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who is Eligible for a Personal Loan?</h2>
          <p>The primary criteria for personal loan eligibility are:</p>
          <ul>
            <li>
              **Credit Score:** A CIBIL score, generally above 750, is
              essential.
            </li>
            <li>
              **Employment:** Salaried employees working at a reputable company
              or self-employed professionals with a consistent income history.
            </li>
            <li>
              **Income Level:** Must meet the minimum monthly income threshold
              set by the lender (e.g., ₹20,000 to ₹35,000+).
            </li>
            <li>
              **FOIR Check:** The borrower&apos;s existing debt and proposed EMI
              must not exceed the lender&apos;s Fixed Obligation to Income Ratio
              (FOIR), typically 40% to 50% of net income.
            </li>
          </ul>
        </section>

        {/* 3. How can the PL Calculator help you? */}
        <section>
          <h2 id="how-pl-helps">
            💡 How This Calculator Helps with Personal Loan Planning
          </h2>
          <p>
            This Personal Loan Calculator helps users determine the true cost of
            their unsecured debt and assess their affordability:
          </p>
          <ul>
            <li>
              **EMI Calculation:** Quickly generates the fixed monthly EMI
              required for the loan amount and tenure.
            </li>
            <li>
              **Affordability Test (FOIR):** Checks if the calculated EMI falls
              within the safe limit (50% of monthly income), flagging potential
              rejection risks.
            </li>
            <li>
              **Total Cost Analysis:** Clearly breaks down the Total Interest
              cost and the Processing Fee, helping compare lender offers.
            </li>
            <li>
              **Prepayment Simulation:** Quantifies the massive interest savings
              achieved by making small extra payments towards the principal.
            </li>
          </ul>
        </section>

        {/* 4. How does the PL EMI calculation work? */}
        <section>
          <h2 id="how-pl-works">⚙️ Personal Loan EMI Formula and Logic</h2>

          <h3>The Core EMI Formula</h3>
          <p>
            The EMI for a personal loan is calculated using the standard annuity
            formula, where the principal and interest are paid back over a fixed
            number of periods ($n$ months).
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
          <p>
            Where **P** is the Loan Amount, **r** is the Monthly Interest Rate
            (Annual Rate / 1200), and **n** is the tenure in months.
          </p>

          <h3>Amortization and Interest</h3>
          <p>
            Similar to other term loans, the interest portion of the EMI is
            highest in the initial months and gradually decreases as the
            outstanding principal is repaid. The schedule provides a precise
            breakdown of this amortization process.
          </p>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="pl-advantages">
            ✅ Key Advantages and Disadvantages of a Personal Loan
          </h2>
          <p>
            Personal loans offer quick access to liquidity but come with
            inherent risks due to their unsecured nature:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Quick Disbursal & Flexibility</h3>
              <p>
                Funds are often disbursed within 24-72 hours, and the money can
                be used for any purpose (unlike home/car loans).
              </p>
            </div>
            <div className="advantage-card">
              <h3>No Collateral Required</h3>
              <p>
                Being unsecured means you don&apos;t need to pledge any asset
                (like a house or car) to the bank.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Credit Improvement Potential</h3>
              <p>
                Successfully repaying the loan on time is excellent for boosting
                your CIBIL score.
              </p>
            </div>
            <div className="advantage-card" style={{ color: 'crimson' }}>
              <h3>❌ High Interest Rates</h3>
              <p>
                The biggest disadvantage is the high interest rate (often 10% to
                24%) compared to secured loans, making the total cost
                significant.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="pl-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                Why are personal loan interest rates so high?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Personal loans are unsecured, meaning the lender has no
                collateral to recover losses if the borrower defaults. To offset
                this higher risk, banks charge a premium in the form of a
                significantly higher interest rate compared to secured loans
                like home or car loans.
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
                Can I get a tax deduction for a Personal Loan?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Unlike home loans, personal loans generally do not qualify for
                tax benefits under Section 80C or 24. **However**, if the loan
                funds are explicitly used for specific purposes (like acquiring
                an asset or funding higher education), the interest may be
                deductible under relevant sections (e.g., against rental income
                or professional income). Consult a tax expert.
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
                }}
              >
                Are there foreclosure or prepayment charges?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Yes. Many lenders impose penalties for foreclosing (closing the
                loan early) or making partial prepayments, which can be a
                percentage of the outstanding principal. It&apos;s crucial to
                check your loan agreement, as these charges can negate the
                interest savings calculated above.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* Bank rates */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Popular Personal Loan Rates</h3>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Last updated: {rateLastUpdated}
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="rate-table">
            <thead>
              <tr>
                <th>Bank</th>
                <th>Interest Rate</th>
                <th>Processing Fee</th>
                <th>Apply</th>
              </tr>
            </thead>
            <tbody>
              {loanRates.map((bank) => (
                <tr key={bank.bank}>
                  <td>{bank.bank}</td>
                  <td>{bank.rate}</td>
                  <td>{bank.fee}</td>
                  <td>
                    <a
                      href={`/out?to=${encodeURIComponent(
                        bank.applyLink || 'https://example.com'
                      )}`}
                      className="apply-btn table-apply-btn"
                    >
                      Apply
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 8, fontSize: 13, color: '#64748b' }}>
          Rates vary by credit score, employer category, and city.
        </p>
      </div>

      {/* amortization */}
      <div className="article" style={{ marginTop: 24 }}>
        <h2>Amortization Schedule</h2>
        <div
          ref={printRef}
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
          <p style={{ marginTop: 8 }}>Only showing first 120 months.</p>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="table-apply-btn" onClick={exportCSV}>
            Export Schedule CSV
          </button>
          <button className="button" onClick={handlePrint}>
            Print Schedule
          </button>
          <button
            className="button"
            onClick={() => {
              const summary = `Personal Loan ${formatINR(
                loanAmount
              )} • ${annualRate}% p.a. • EMI ${formatINR(
                Math.round(emi)
              )} • Tenure ${tenureYears} yrs`;
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
