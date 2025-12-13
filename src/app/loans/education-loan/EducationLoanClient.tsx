'use client';

import React, { useMemo, useRef, useState } from 'react';

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

/* ---------- PieChart: thick donut with rounded arc (matches other calculators) ---------- */
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

export default function EducationLoanClient() {
  // inputs
  const [loanAmount, setLoanAmount] = useState<number>(800000);
  const [annualRate, setAnnualRate] = useState<number>(10.5);
  const [repayYears, setRepayYears] = useState<number>(7);
  const [moratoriumMonths, setMoratoriumMonths] = useState<number>(24);
  const [processingFeePct, setProcessingFeePct] = useState<number>(0.5);
  const [moratoriumMode, setMoratoriumMode] = useState<
    'capitalise' | 'interest-only' | 'no-pay'
  >('capitalise');

  const printRef = useRef<HTMLDivElement | null>(null);

  // derived memoized values
  const monthlyRate = useMemo(() => annualRate / 100 / 12, [annualRate]);
  const repaymentMonths = useMemo(
    () => Math.max(1, repayYears * 12),
    [repayYears]
  );
  const processingFeeAmount = useMemo(
    () => (processingFeePct / 100) * loanAmount,
    [processingFeePct, loanAmount]
  );

  // principal after moratorium and moratorium interest bookkeeping
  const {
    principalAfterMoratorium,
    moratoriumAccruedInterest,
    moratoriumInterestPaid,
  } = useMemo(() => {
    const principal = loanAmount;
    let accrued = 0;
    let interestPaid = 0;

    if (moratoriumMonths > 0 && monthlyRate > 0) {
      let temp = loanAmount;
      for (let m = 0; m < moratoriumMonths; m++) {
        const interestThisMonth = temp * monthlyRate;
        if (moratoriumMode === 'interest-only') {
          interestPaid += interestThisMonth;
        } else {
          // capitalise or no-pay both accrue onto balance
          accrued += interestThisMonth;
          temp += interestThisMonth;
        }
      }
      return {
        principalAfterMoratorium: Math.max(0, temp),
        moratoriumAccruedInterest: accrued,
        moratoriumInterestPaid: interestPaid,
      };
    }

    return {
      principalAfterMoratorium: principal,
      moratoriumAccruedInterest: 0,
      moratoriumInterestPaid: 0,
    };
  }, [loanAmount, moratoriumMonths, monthlyRate, moratoriumMode]);

  // EMI for repayment period (post-moratorium principal)
  const emi = useMemo(() => {
    const P = principalAfterMoratorium;
    const n = repaymentMonths;
    const r = monthlyRate;
    if (P <= 0 || n <= 0) return 0;
    if (r === 0) return P / n;
    const pow = Math.pow(1 + r, n);
    return (P * r * pow) / (pow - 1);
  }, [principalAfterMoratorium, repaymentMonths, monthlyRate]);

  // build amortization schedule for repaymentMonths
  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let balance = principalAfterMoratorium;
    for (let m = 1; m <= repaymentMonths; m++) {
      const interestPortion = balance * monthlyRate;
      const principalPortion = Math.min(
        balance,
        Math.max(0, emi - interestPortion)
      );
      balance = Math.max(0, balance - principalPortion);
      rows.push({
        month: m,
        emi,
        principal: principalPortion,
        interest: interestPortion,
        balance,
      });
    }
    return rows;
  }, [principalAfterMoratorium, repaymentMonths, monthlyRate, emi]);

  // totals
  const totalRepayment = useMemo(() => {
    // If interest-only during moratorium, user pays moratoriumInterestPaid up front (included)
    const moratoriumPaid =
      moratoriumMode === 'interest-only' ? moratoriumInterestPaid : 0;
    return Math.round(emi * repaymentMonths + moratoriumPaid);
  }, [emi, repaymentMonths, moratoriumMode, moratoriumInterestPaid]);

  const totalInterest = useMemo(
    () => Math.max(0, totalRepayment - loanAmount - processingFeeAmount),
    [totalRepayment, loanAmount, processingFeeAmount]
  );

  // pie percentages
  const { principalPct, interestPct } = useMemo(() => {
    const principalPaid = schedule.reduce((s, r) => s + r.principal, 0);
    const interestPaid =
      schedule.reduce((s, r) => s + r.interest, 0) +
      (moratoriumMode === 'interest-only' ? moratoriumInterestPaid : 0) +
      (moratoriumMode !== 'interest-only' ? moratoriumAccruedInterest : 0);
    const total = Math.max(
      1,
      principalPaid + interestPaid + processingFeeAmount
    ); // avoid divide by zero
    const ip = Math.round((interestPaid / total) * 100);
    const pp = Math.max(0, 100 - ip);
    return { principalPct: pp, interestPct: ip };
  }, [
    schedule,
    moratoriumInterestPaid,
    moratoriumAccruedInterest,
    processingFeeAmount,
  ]);

  // small setters
  const setNumber =
    (setter: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value === '' ? 0 : Number(e.target.value));
    };

  // CSV export
  function exportCsv() {
    const headers = ['Month', 'EMI', 'Principal', 'Interest', 'Balance'];
    const rows = schedule.map((r) => [
      r.month.toString(),
      Math.round(r.emi).toString(),
      Math.round(r.principal).toString(),
      Math.round(r.interest).toString(),
      Math.round(r.balance).toString(),
    ]);
    const csvContent = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `education-loan-schedule-${loanAmount}-${repaymentMonths}m.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // Print handler prints only the schedule area
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
          <title>Repayment Schedule</title>
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

  return (
    <section className="article">
      <div>
        <h1>🎓 Education Loan EMI Calculator</h1>

        {/* split: inputs left, pie chart right */}
        <div className="emi-split" style={{ marginTop: 12 }}>
          <div className="emi-left">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'grid', gap: 12 }}
            >
              <label>
                Loan Amount (₹)
                <input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={setNumber(setLoanAmount)}
                  required
                />
              </label>

              <label>
                Interest Rate (p.a. %)
                <input
                  id="annualRate"
                  type="number"
                  step="0.01"
                  value={annualRate}
                  onChange={setNumber(setAnnualRate)}
                  required
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
                  Moratorium months
                  <input
                    id="moratoriumMonths"
                    type="number"
                    min={0}
                    value={moratoriumMonths}
                    onChange={(e) =>
                      setMoratoriumMonths(
                        Math.max(0, Number(e.target.value || 0))
                      )
                    }
                  />
                </label>

                <label>
                  Repayment years
                  <input
                    id="repayYears"
                    type="number"
                    min={1}
                    value={repayYears}
                    onChange={(e) =>
                      setRepayYears(Math.max(1, Number(e.target.value || 0)))
                    }
                  />
                </label>
              </div>

              <label>
                Moratorium mode
                <select
                  value={moratoriumMode}
                  onChange={(e) => setMoratoriumMode(e.target.value as never)}
                  style={{ marginTop: 6 }}
                >
                  <option value="capitalise">
                    Capitalise unpaid interest (adds to principal)
                  </option>
                  <option value="interest-only">
                    Interest-only (you pay interest during moratorium)
                  </option>
                  <option value="no-pay">
                    No-pay (interest accrues and is capitalised)
                  </option>
                </select>
              </label>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <label>
                  Processing Fee (%)
                  <input
                    id="processingFeePct"
                    type="number"
                    step="0.01"
                    value={processingFeePct}
                    onChange={setNumber(setProcessingFeePct)}
                  />
                </label>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <button
                  className="primary-cta"
                  type="button"
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
                    setLoanAmount(800000);
                    setAnnualRate(10.5);
                    setRepayYears(7);
                    setMoratoriumMonths(24);
                    setMoratoriumMode('capitalise');
                    setProcessingFeePct(0.5);
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

        {/* results full width below split - REFINED STYLING */}
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
                Monthly EMI (Post-Moratorium)
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

            {/* Secondary Result: Adjusted Principal */}
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
                Principal After Moratorium
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(Math.round(principalAfterMoratorium))}
              </p>
              <p
                className="result-value"
                style={{ fontSize: 13, marginTop: 4, color: '#6b7280' }}
              >
                (Original loan: {formatINR(loanAmount)})
              </p>
            </div>

            {/* Secondary Result: Total Estimated Interest */}
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
                Total Estimated Interest
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#059669' }}
              >
                {formatINR(Math.max(0, Math.round(totalInterest)))}
              </p>
            </div>

            {/* Secondary Result: Total Repayment */}
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
                {formatINR(totalRepayment)}
              </p>
              <p
                className="result-value"
                style={{ fontSize: 13, marginTop: 4, color: '#6b7280' }}
              >
                (Moratorium paid:{' '}
                {formatINR(Math.round(moratoriumInterestPaid))})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary of Moratorium and Processing Fee */}
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Moratorium & Fee Breakdown</h3>
        <p style={{ margin: '6px 0' }}>
          <strong>Moratorium period:</strong> {moratoriumMonths} months. Mode:{' '}
          {moratoriumMode === 'capitalise'
            ? 'Interest is Capitalized'
            : moratoriumMode === 'interest-only'
            ? 'Interest-only payments'
            : 'Interest accrues (No-pay)'}
        </p>
        <p style={{ margin: '6px 0' }}>
          <strong>Interest Capitalized/Paid:</strong>{' '}
          {moratoriumMode === 'interest-only'
            ? formatINR(Math.round(moratoriumInterestPaid)) + ' (Paid by you)'
            : formatINR(Math.round(moratoriumAccruedInterest)) +
              ' (Added to principal)'}
        </p>
        <p style={{ margin: '6px 0' }}>
          <strong>Processing Fee:</strong> {processingFeePct}% or{' '}
          {formatINR(processingFeeAmount)}
        </p>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-edu-loan">🌟 What is an Education Loan?</h2>
          <p>
            An **Education Loan** is a financial facility offered by banks and
            non-banking financial companies (NBFCs) to help students fund their
            higher education, both domestically and abroad. These loans cover
            major expenses including tuition fees, accommodation, books, and
            sometimes travel costs.
          </p>
          <p>
            A key feature is the **moratorium period**—a repayment holiday
            typically granted for the duration of the course plus a few months
            afterward, recognizing that the student will only start earning
            after graduation. This calculator is vital for navigating the cost
            implications of that moratorium.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who is Eligible and Who Can Repay?</h2>
          <p>
            Education loans are generally available to Indian residents who have
            secured admission to a recognized course.
          </p>
          <ul>
            <li>**Applicant:** The student is the primary borrower.</li>
            <li>
              **Co-Applicant/Guarantor:** A parent or guardian is usually
              mandatory as a co-borrower to secure the loan, especially for
              loans above a certain limit (e.g., ₹4 Lakh).
            </li>
            <li>
              **Age:** Typically requires the student to be between 16 and 35
              years old at the time of loan application.
            </li>
            <li>
              **Security/Collateral:** Loans above a limit (e.g., ₹7.5 Lakh)
              often require tangible collateral (house, property, FDs).
            </li>
          </ul>
        </section>

        {/* 3. How can the Education Loan Calculator help you? */}
        <section>
          <h2 id="how-edu-loan-helps">
            💡 How This Calculator Helps with Moratorium Planning
          </h2>
          <p>
            The major financial decision in an education loan revolves around
            the moratorium period and the subsequent EMI. This calculator
            empowers you to:
          </p>
          <ul>
            <li>
              **Calculate Adjusted Principal:** Determine the exact principal
              amount that accrues after the moratorium, depending on whether you
              paid interest or let it capitalize.
            </li>
            <li>
              **Find the True EMI:** Calculate the precise EMI required during
              the repayment phase based on the inflated principal
              (capitalization).
            </li>
            <li>
              **Compare Moratorium Modes:** Visualize the difference in your
              final EMI and total interest paid if you choose
              &apos;Interest-Only&apos; payments versus &apos;Capitalizing&apos;
              the interest.{' '}
            </li>
            <li>
              **Total Cost Analysis:** Quickly understand the final interest
              burden over the entire loan lifecycle.
            </li>
          </ul>
        </section>

        {/* 4. How does the Education Loan EMI calculation work? */}
        <section>
          <h2 id="how-edu-loan-works">
            ⚙️ EMI Calculation with Moratorium Interest
          </h2>

          <h3>Step 1: Moratorium Interest Calculation</h3>
          <p>
            During the moratorium (N<sub>m</sub> months), interest accrues on
            the outstanding loan amount ($P_0$) monthly.
          </p>
          <p>
            **If Capitalized (or No-Pay):** The interest is added to the
            principal monthly. The new principal after moratorium ($P_f$) is:
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
            P<sub>f</sub> = P<sub>0</sub> &times; (1 + r)
            <sup>
              N<sub>m</sub>
            </sup>
          </div>
          <p>
            **If Interest-Only:** Interest is paid monthly and does not
            capitalize. $P_f$ remains $P_0$.
          </p>

          <h3>Step 2: Post-Moratorium EMI Calculation</h3>
          <p>
            The final EMI is calculated based on the resulting principal ($P_f$)
            and the repayment tenure ($N$ months), using the standard annuity
            EMI formula:
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
            EMI = P<sub>f</sub> &times; [r &times; (1 + r)<sup>N</sup> / ((1 +
            r)<sup>N</sup> - 1)]
          </div>
          <p>
            Where **r** is the monthly interest rate, and **N** is the repayment
            tenure in months.
          </p>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="edu-loan-advantages">
            ✅ Key Advantages of an Education Loan
          </h2>
          <p>
            Education loans are structured to maximize student benefit and
            parental support:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Income Tax Deduction (80E)</h3>
              <p>
                The entire interest paid on the education loan is fully
                deductible from taxable income under **Section 80E** of the
                Income Tax Act.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Moratorium Benefit</h3>
              <p>
                The repayment holiday allows the student to focus entirely on
                studies and find a job before starting the EMI burden.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Covering Comprehensive Costs</h3>
              <p>
                Loans cover not just fees but also living expenses, equipment,
                and sometimes caution money and travel costs.
              </p>
            </div>
            <div className="advantage-card">
              <h3>No Collateral for Small Loans</h3>
              <p>
                Loans up to a certain threshold (e.g., ₹4 Lakh or ₹7.5 Lakh,
                varying by bank) often do not require physical collateral.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="edu-loan-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                Is paying interest during the moratorium mandatory?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                No, it is usually optional (Moratorium mode is
                &apos;No-pay&apos; or &apos;Capitalise&apos; by default).
                However, paying interest during this period (Interest-Only mode)
                is highly recommended as it significantly reduces the overall
                principal and saves on total interest paid over the long term.
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
                What is the maximum loan repayment period?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                While the typical repayment tenure is 5-7 years, many banks
                allow repayment periods up to **10 or 15 years** after the
                moratorium period ends. A longer term lowers your EMI but
                increases the total interest cost.
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
                Is there a tax deduction limit under Section 80E?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                No. Unlike Section 80C, which has a limit on the principal
                repayment, **Section 80E allows the entire interest paid** on
                the education loan in a financial year to be claimed as a
                deduction, without any upper limit.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* Amortization schedule */}
      <div className="article" style={{ marginTop: 22 }}>
        <h2>Repayment Schedule (post-moratorium)</h2>
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
              Loan: {formatINR(loanAmount)} • Rate: {annualRate}% p.a. •
              Moratorium: {moratoriumMonths} months ({moratoriumMode})
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
              {schedule.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    No repayment months (check inputs)
                  </td>
                </tr>
              ) : (
                schedule.map((r) => (
                  <tr key={r.month}>
                    <td style={{ textAlign: 'left' }}>{r.month}</td>
                    <td style={{ textAlign: 'right' }}>
                      {formatINR(Math.round(r.emi))}
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Export / Print actions below the schedule */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="table-apply-btn" onClick={exportCsv}>
            Export Schedule CSV
          </button>
          <button className="button" onClick={handlePrint}>
            Print Schedule
          </button>
          <button
            className="button"
            onClick={() => {
              const summary = `Education Loan ${formatINR(
                loanAmount
              )} • ${annualRate}% p.a. • EMI ${formatINR(
                Math.round(emi)
              )} • Tenure ${repayYears} yrs`;
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
