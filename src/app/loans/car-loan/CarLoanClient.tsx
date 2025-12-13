// ./src/app/loans/car-loan/CarLoanClient.tsx
'use client';

import React, { useRef, useState, useMemo } from 'react';

function formatINR(value: number) {
  return (
    '₹' + Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 })
  );
}

type ScheduleRow = {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
};

/* ---------- PieChart: thick donut with rounded arc (same look as other pages) ---------- */
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
        {/* base ring = principal (pale) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />

        {/* interest arc overlay (drawn on top). Rotate -90deg to start at top */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#16a34a" /* Consistent site green */
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 420ms ease' }}
          />
        </g>

        {/* Center hole */}
        <circle cx={cx} cy={cy} r={r * 0.5} fill="#fff" />

        {/* center labels */}
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

/**
 * Car loan calculator client component
 */
export default function CarLoanClient() {
  // Inputs (defaults chosen to typical values)
  const [vehiclePrice, setVehiclePrice] = useState<number>(1000000); // ₹10L
  const [downPayment, setDownPayment] = useState<number>(200000); // ₹2L
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [annualRate, setAnnualRate] = useState<number>(9.5); // %
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [processingFeePct, setProcessingFeePct] = useState<number>(0.5); // %
  const [balloonValue, setBalloonValue] = useState<number>(0); // final residual amount (₹)
  const printRef = useRef<HTMLDivElement | null>(null);

  // Derived
  const months = Math.max(1, Math.round(tenureYears * 12));
  const monthlyRate = annualRate / 12 / 100;
  const processingFeeAmount = (processingFeePct / 100) * vehiclePrice;

  // Loan principal = vehiclePrice - downPayment - tradeIn + processingFee
  const loanPrincipal = Math.max(
    0,
    vehiclePrice -
      (downPayment || 0) -
      (tradeInValue || 0) +
      processingFeeAmount
  );

  // EMI calculation with balloon (residual) handling:
  let emi = 0;
  if (monthlyRate === 0) {
    const principalAdjusted = loanPrincipal - balloonValue;
    emi = principalAdjusted > 0 ? principalAdjusted / months : 0;
  } else {
    const pow = Math.pow(1 + monthlyRate, months);
    const presentValueBalloon = balloonValue / pow;
    const principalAdjusted = loanPrincipal - presentValueBalloon;
    if (principalAdjusted <= 0) emi = 0;
    else emi = (principalAdjusted * monthlyRate * pow) / (pow - 1);
  }

  // Build amortization schedule:
  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let balance = loanPrincipal;
    for (let m = 1; m <= months; m++) {
      const interestPortion = balance * monthlyRate;
      let principalPortion = emi - interestPortion;
      if (principalPortion < 0) principalPortion = 0;

      if (m === months) {
        const neededPrincipalReduction = Math.max(0, balance - balloonValue);
        principalPortion = neededPrincipalReduction;
        balance = Math.max(0, balance - principalPortion);
      } else {
        balance = Math.max(0, balance - principalPortion);
      }

      rows.push({
        month: m,
        emi,
        principal: principalPortion,
        interest: interestPortion,
        balance,
      });
    }
    return rows;
  }, [loanPrincipal, months, monthlyRate, emi, balloonValue]);

  // Totals
  const totalPrincipalPaid = useMemo(
    () => schedule.reduce((s, r) => s + r.principal, 0),
    [schedule]
  );
  const totalInterestPaid = useMemo(
    () => schedule.reduce((s, r) => s + r.interest, 0),
    [schedule]
  );

  // If balloon exists and is payable at end, include it as principal (buyer cost)
  const totalRepayment = Math.round(
    totalPrincipalPaid + totalInterestPaid + (balloonValue || 0)
  );
  // Total cost to buyer is the loan repayment + processing fee (already included in loanPrincipal) + downpayment + trade-in

  // Percentages for pie: interest vs (principal + interest)
  const denominatorForPie = Math.round(totalPrincipalPaid + totalInterestPaid);

  const interestPercent = useMemo(() => {
    if (denominatorForPie <= 0) return 0;
    return Math.max(
      0,
      Math.min(100, Math.round((totalInterestPaid / denominatorForPie) * 100))
    );
  }, [totalInterestPaid, denominatorForPie]);

  const principalPercent = Math.max(0, 100 - interestPercent);

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
    a.download = `car-loan-schedule-${vehiclePrice}-${months}m.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Print: print only the schedule area
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
          <title>Car Loan Repayment Schedule</title>
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

  // safe setters to avoid NaN
  const safeNumber =
    (setter: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="article">
      <div>
        <h1>🚗 Comprehensive Car Loan EMI Calculator</h1>

        {/* ===== Two-column split: left = inputs, right = chart (only these two side-by-side) ===== */}
        <div className="emi-split" style={{ marginTop: 12 }}>
          {/* LEFT: inputs */}
          <div className="emi-left">
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: 'grid', gap: 12 }}>
                <div className="form-row">
                  <label>
                    Vehicle Price (₹)
                    <input
                      type="number"
                      value={vehiclePrice}
                      onChange={safeNumber(setVehiclePrice)}
                      min={0}
                      step={1000}
                      required
                    />
                  </label>

                  <label>
                    Down Payment (₹)
                    <input
                      type="number"
                      value={downPayment}
                      onChange={safeNumber(setDownPayment)}
                      min={0}
                      step={1000}
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Trade-in Value (₹)
                    <input
                      type="number"
                      value={tradeInValue}
                      onChange={safeNumber(setTradeInValue)}
                      min={0}
                      step={1000}
                    />
                  </label>

                  <label>
                    Balloon / Residual at end (₹)
                    <input
                      type="number"
                      value={balloonValue}
                      onChange={safeNumber(setBalloonValue)}
                      min={0}
                      step={1000}
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Interest Rate (p.a. %)
                    <input
                      type="number"
                      step="0.01"
                      value={annualRate}
                      onChange={safeNumber(setAnnualRate)}
                      required
                    />
                  </label>

                  <label>
                    Tenure (Years)
                    <input
                      type="number"
                      min={1}
                      value={tenureYears}
                      onChange={safeNumber(setTenureYears)}
                      required
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Processing Fee (% of price)
                    <input
                      type="number"
                      step="0.01"
                      value={processingFeePct}
                      onChange={safeNumber(setProcessingFeePct)}
                    />
                  </label>
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}
                >
                  <button
                    type="button"
                    className="primary-cta"
                    onClick={() => {
                      /* reactive */
                    }}
                  >
                    Calculate
                  </button>

                  <button
                    type="button"
                    className="apply-btn"
                    onClick={() => {
                      setVehiclePrice(1000000);
                      setDownPayment(200000);
                      setTradeInValue(0);
                      setBalloonValue(0);
                      setAnnualRate(9.5);
                      setTenureYears(5);
                      setProcessingFeePct(0.5);
                    }}
                  >
                    Reset
                  </button>
                </div>
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
                        background: '#16a34a',
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

            <div className="ad-box" style={{ marginTop: 14 }}>
              Ad / Bank widget
            </div>
          </aside>
        </div>

        {/* ===== RESULTS SECTION: full width below the split - REFINED STYLES ===== */}
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
                {emi > 0 ? formatINR(Math.round(emi)) : '—'}
              </p>
            </div>

            {/* Secondary Result: Loan Principal */}
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
                Loan Principal
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(Math.round(loanPrincipal))}
              </p>
              <p
                className="result-value"
                style={{ fontSize: 13, marginTop: 4, color: '#6b7280' }}
              >
                (Incl. fee: {formatINR(Math.round(processingFeeAmount))})
              </p>
            </div>

            {/* Secondary Result: Total Interest Paid */}
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
                Total Interest Paid
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#059669' }}
              >
                {formatINR(Math.round(totalInterestPaid))}
              </p>
            </div>

            {/* Secondary Result: Total Cost of Loan */}
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
                {formatINR(Math.round(totalRepayment))}
              </p>
              {balloonValue > 0 && (
                <p
                  className="result-value"
                  style={{ fontSize: 13, marginTop: 4, color: '#6b7280' }}
                >
                  (Includes balloon: {formatINR(balloonValue)})
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-car-loan">🌟 What is a Car Loan?</h2>
          <p>
            A **Car Loan** is a secured loan provided by financial institutions
            to fund the purchase of a new or used vehicle. The vehicle itself
            acts as collateral. Car loans typically require a down payment and
            are repaid through fixed monthly installments, known as Equated
            Monthly Installments (EMIs), over a fixed tenure (usually 1 to 7
            years).
          </p>
          <p>
            This calculator helps you understand your monthly repayment burden
            and the total interest cost for your specific vehicle price, down
            payment, trade-in value, and interest rate.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who is Eligible for a Car Loan?</h2>
          <p>
            Eligibility criteria for a car loan are primarily based on the
            borrower&apos;s stability and income:
          </p>
          <ul>
            <li>**Age:** Typically between 21 and 65 years.</li>
            <li>
              **Income:** Salaried individuals, self-employed professionals, and
              business owners with a minimum annual income (varying by lender).
            </li>
            <li>
              **Credit Score:** A good credit score (CIBIL score above 750) is
              crucial for securing the best interest rates.
            </li>
            <li>**Residency:** Must be a resident of India.</li>
          </ul>
        </section>

        {/* 3. How can the Car Loan Calculator help you? */}
        <section>
          <h2 id="how-car-loan-helps">
            💡 How Can This Car Loan EMI Calculator Help You?
          </h2>
          <p>
            Using a car loan calculator is essential for pre-purchase financial
            planning:
          </p>
          <ul>
            <li>
              **Budgeting the EMI:** Instantly calculate the exact monthly EMI
              to ensure it fits within your budget.
            </li>
            <li>
              **Total Cost Analysis:** Determine the total interest outflow over
              the loan tenure, helping you compare different loan offers.
            </li>
            <li>
              **Tenure Optimization:** Analyze the trade-off between a longer
              tenure (lower EMI, higher total interest) and a shorter tenure
              (higher EMI, lower total interest).
            </li>
            <li>
              **Down Payment Strategy:** See how increasing your down payment or
              trade-in value instantly reduces your loan principal and total
              interest burden.
            </li>
          </ul>
        </section>

        {/* 4. How does the Car Loan EMI calculation work? */}
        <section>
          <h2 id="how-car-loan-works">⚙️ Car Loan EMI Calculation Logic</h2>

          <h3>The EMI Formula (General Annuity)</h3>
          <p>
            The monthly Equated Monthly Installment (EMI) for a standard
            amortizing loan is calculated using the following formula. This
            calculation determines the fixed monthly amount required to fully
            repay the principal (P) and interest (I) over the tenure (N).
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
          <p>Where:</p>
          <ul>
            <li>**P** = Loan Principal amount (Loan Amount)</li>
            <li>**r** = Monthly interest rate (Annual Rate / 1200)</li>
            <li>**n** = Loan tenure in months</li>
          </ul>

          <h3>Handling Balloon Payments</h3>
          <p>
            This calculator supports **Balloon/Residual Payments**, which means
            a large lump sum is paid at the very end of the tenure. When a
            balloon payment exists, the EMI is calculated only to amortize the
            principal *minus* the present value of the balloon amount. The final
            principal payment in the schedule equals the remaining balance plus
            the balloon amount.
          </p>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="car-loan-advantages">✅ Advantages of Taking a Car Loan</h2>
          <p>A car loan offers financial flexibility and access to mobility:</p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Immediate Mobility</h3>
              <p>
                Allows you to acquire the vehicle immediately without having to
                save the entire cost upfront.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Preserve Capital</h3>
              <p>
                You can keep your savings or emergency fund intact for
                higher-yield investments or unexpected needs.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Fixed Budgeting</h3>
              <p>
                Fixed EMIs simplify monthly budgeting, allowing for consistent
                financial planning throughout the loan period.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Credit Building</h3>
              <p>
                Consistent, timely EMI payments help improve your credit score,
                which is beneficial for future, larger loans (like home loans).
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="car-loan-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                What is Amortization in a Car Loan?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Amortization is the process of gradually paying off a loan
                principal over time. In a car loan, early EMIs primarily cover
                the interest, while later EMIs are weighted heavily toward
                repaying the principal. The schedule shows this process
                month-by-month.
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
                Is it better to take a longer or shorter loan tenure?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                A **shorter tenure** results in a lower total interest paid and
                faster debt freedom, but the monthly EMI is higher. A **longer
                tenure** means a lower EMI but a significantly higher total
                interest cost. The choice depends entirely on your monthly
                budget comfort level versus the desire to minimize interest
                outflow.
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
                What is the benefit of a Balloon Payment?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                A Balloon Payment reduces your **monthly EMI significantly**
                because a large portion of the principal is deferred until the
                final payment. This can make expensive vehicles more affordable
                on a monthly basis, but requires you to plan for the large
                lump-sum payment at the end of the loan term.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* Repayment schedule (printable area) */}
      <div className="article" style={{ marginTop: 22 }}>
        <h2>Repayment Schedule</h2>

        <div
          ref={printRef}
          className="schedule-wrapper"
          style={{ marginTop: 12, overflowX: 'auto' }}
        >
          <table
            className="rate-table"
            style={{ width: '100%', minWidth: '600px' }}
          >
            <caption>
              Loan: {formatINR(loanPrincipal)} • Rate: {annualRate}% p.a. •
              Tenure: {tenureYears} years
            </caption>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Month</th>
                <th style={{ textAlign: 'right' }}>EMI</th>
                <th style={{ textAlign: 'right' }}>Principal</th>
                <th style={{ textAlign: 'right' }}>Interest</th>
                <th style={{ textAlign: 'right' }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((r) => (
                <tr key={r.month}>
                  <td style={{ textAlign: 'left' }}>{r.month}</td>
                  <td style={{ textAlign: 'right' }}>
                    {emi > 0 ? formatINR(Math.round(r.emi)) : '—'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(Math.round(r.principal))}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(Math.round(r.interest))}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(Math.round(r.balance))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {balloonValue > 0 && (
            <div style={{ marginTop: 8, fontSize: 13, color: '#6b7280' }}>
              Note: Final balloon/residual of {formatINR(balloonValue)} is
              payable at the end of the term (not included in monthly EMI rows).
            </div>
          )}
        </div>

        {/* Export / Print actions below the schedule */}
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
              const summary = `Car Loan: ${formatINR(
                loanPrincipal
              )} • ${annualRate}% p.a. • EMI ${
                emi > 0 ? formatINR(Math.round(emi)) : '—'
              } • Tenure ${tenureYears} yrs`;
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
