// src/app/loans/home-loan/HomeLoanClient.tsx
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

/* ---------- PieChart component (thick donut with rounded arc) ---------- */
function PieChart({
  principalPct,
  interestPct,
  size = 240,
}: {
  principalPct: number;
  interestPct: number;
  size?: number;
}) {
  const strokeWidth = Math.max(14, Math.round(size * 0.18));
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
            stroke="#16a34a" // Standard site green
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

export default function HomeLoanClient() {
  // Inputs
  const [propertyValue, setPropertyValue] = useState<number>(5000000); // ₹50 L
  const [downPayment, setDownPayment] = useState<number>(1000000); // ₹10 L
  const [annualRate, setAnnualRate] = useState<number>(8.5); // %
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [processingFeePercent, setProcessingFeePercent] = useState<number>(0.5); // %
  const [monthlyIncome, setMonthlyIncome] = useState<number>(60000);
  const [marginalTaxPercent, setMarginalTaxPercent] = useState<number>(30); // user's tax bracket
  const [extraPaymentPercent, setExtraPaymentPercent] = useState<number>(0); // % extra EMI

  // LTV rules (India common heuristic)
  const ltv = useMemo(() => {
    if (propertyValue <= 30_00_000) return 0.9;
    if (propertyValue <= 75_00_000) return 0.8;
    return 0.75;
  }, [propertyValue]);

  // Compute loan principal desired (property - down)
  const loanAmount = Math.max(0, propertyValue - downPayment);

  // Maximum permitted by LTV
  const maxLoanByLtv = Math.round(propertyValue * ltv);
  const minDownPaymentRequired = Math.max(
    0,
    Math.round(propertyValue - maxLoanByLtv)
  );

  // validate loan amount vs LTV
  const loanExceedsLtv = loanAmount > maxLoanByLtv;

  // EMI formula
  const monthlyRate = annualRate / 12 / 100;
  const nMonths = Math.max(1, Math.round(tenureYears * 12));

  const emi = useMemo(() => {
    if (loanAmount <= 0 || monthlyRate <= 0 || nMonths <= 0) return 0;
    const r = monthlyRate;
    const numerator = loanAmount * r * Math.pow(1 + r, nMonths);
    const denominator = Math.pow(1 + r, nMonths) - 1;
    return numerator / denominator;
  }, [loanAmount, monthlyRate, nMonths]);

  const processingFee = Math.round((processingFeePercent / 100) * loanAmount);

  // amortization schedule
  const schedule: AmortRow[] = useMemo(() => {
    if (loanAmount <= 0 || nMonths <= 0) return [];
    let bal = loanAmount;
    const rows: AmortRow[] = [];
    for (let m = 1; m <= nMonths; m++) {
      const interestPortion = bal * monthlyRate;
      const principalPortion = Math.max(0, emi - interestPortion);
      bal = bal - principalPortion;
      rows.push({
        month: m,
        emi,
        principal: principalPortion,
        interest: interestPortion,
        balance: Math.max(0, bal),
      });
    }
    return rows;
  }, [loanAmount, monthlyRate, nMonths, emi]);

  // tax benefit estimate for first 12 months
  const { section24Deduction, section80CDeduction } = useMemo(() => {
    const first12 = schedule.slice(0, 12);
    const interestSum = first12.reduce((s, r) => s + r.interest, 0);
    const principalSum = first12.reduce((s, r) => s + r.principal, 0);
    const section24 = Math.min(interestSum, 200000);
    const section80c = Math.min(principalSum, 150000);
    return {
      interestYear1: interestSum,
      principalYear1: principalSum,
      section24Deduction: section24,
      section80CDeduction: section80c,
    };
  }, [schedule]);

  // estimated tax savings (simple)
  const taxSavingsEstimate = useMemo(() => {
    const tax_from_interest = section24Deduction * (marginalTaxPercent / 100);
    const tax_from_principal = section80CDeduction * (marginalTaxPercent / 100);
    return Math.round(tax_from_interest + tax_from_principal);
  }, [section24Deduction, section80CDeduction, marginalTaxPercent]);

  // Affordability check: FOIR (50% safe)
  const monthlyEmi = Math.round(emi);
  const foirAllowed = monthlyIncome * 0.5;
  const affordabilityOk = monthlyEmi <= foirAllowed;

  // Extra EMI / prepayment effect (approx)
  const extraEmi = emi * (1 + extraPaymentPercent / 100);

  const prepaymentEffect = useMemo(() => {
    if (loanAmount <= 0 || monthlyRate <= 0)
      return { newMonths: 0, interestSaved: 0, newTotalInterest: 0 };
    let bal = loanAmount;
    let months = 0;
    let totalInterest = 0;
    while (bal > 0 && months < 1000) {
      months++;
      const interestPortion = bal * monthlyRate;
      const principalPortion = Math.min(extraEmi - interestPortion, bal);
      if (principalPortion <= 0) break;
      bal -= principalPortion;
      totalInterest += interestPortion;
    }
    const originalTotalInterest = schedule.reduce((s, r) => s + r.interest, 0);
    const interestSaved = Math.max(
      0,
      Math.round(originalTotalInterest - totalInterest)
    );
    return {
      newMonths: months,
      interestSaved,
      newTotalInterest: Math.round(totalInterest),
    };
  }, [loanAmount, monthlyRate, extraEmi, schedule]);

  // convenience derived values
  const totalPayment = Math.round(emi * nMonths);
  const totalInterest = Math.round(totalPayment - loanAmount);

  // pie percentages (principal vs interest) — denominator = totalPayment
  const interestPct = useMemo(() => {
    const tp = totalPayment;
    if (tp <= 0) return 0;
    return Math.max(0, Math.min(100, Math.round((totalInterest / tp) * 100)));
  }, [totalPayment, totalInterest]);

  const principalPct = Math.max(0, 100 - interestPct);

  // small helpers for inputs that are strings
  const safeSetNumber =
    (setter: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setter(v === '' ? 0 : Number(v));
    };

  // CSV Export Function
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
    a.download = `home-loan-schedule-${loanAmount}-${nMonths}m.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="article">
      <div>
        <h1>🏠 Home Loan EMI & Affordability Calculator (India)</h1>

        {/* ===== Two-column split: left = inputs, right = chart (only these two side-by-side) ===== */}
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
                Property Value (₹)
                <input
                  id="propertyValue"
                  type="number"
                  value={propertyValue}
                  onChange={safeSetNumber(setPropertyValue)}
                  min={0}
                  step={10000}
                />
              </label>

              <label>
                Down Payment (₹)
                <input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={safeSetNumber(setDownPayment)}
                  min={0}
                  step={10000}
                />
                <div style={{ fontSize: 13, color: '#6b7280' }}>
                  Min recommended down payment (LTV):{' '}
                  {formatINR(minDownPaymentRequired)}
                  {loanExceedsLtv ? (
                    <span style={{ color: 'crimson' }}>
                      {' '}
                      — Down payment too low for the LTV cap (
                      {Math.round(ltv * 100)}%).
                    </span>
                  ) : (
                    <span> — LTV OK at {Math.round(ltv * 100)}%.</span>
                  )}
                </div>
              </label>

              <label>
                Annual Interest Rate (%)
                <input
                  id="annualRate"
                  type="number"
                  step="0.01"
                  value={annualRate}
                  onChange={safeSetNumber(setAnnualRate)}
                  min={0}
                />
              </label>

              <label>
                Tenure (Years)
                <input
                  id="tenureYears"
                  type="number"
                  value={tenureYears}
                  onChange={safeSetNumber(setTenureYears)}
                  min={1}
                />
              </label>

              <label>
                Processing Fee (% of loan)
                <input
                  id="processingFee"
                  type="number"
                  step="0.1"
                  value={processingFeePercent}
                  onChange={safeSetNumber(setProcessingFeePercent)}
                  min={0}
                />
              </label>

              <label>
                Monthly Net Income (₹) — for FOIR check
                <input
                  id="monthlyIncome"
                  type="number"
                  value={monthlyIncome}
                  onChange={safeSetNumber(setMonthlyIncome)}
                  min={0}
                />
              </label>

              <label>
                Your Marginal Tax Rate (%) — for tax savings estimate
                <input
                  id="marginalTaxPercent"
                  type="number"
                  value={marginalTaxPercent}
                  onChange={safeSetNumber(setMarginalTaxPercent)}
                  min={0}
                  max={40}
                />
              </label>

              <label>
                Extra EMI % (simulate paying X% more each month)
                <input
                  id="extraPaymentPercent"
                  type="number"
                  step="1"
                  value={extraPaymentPercent}
                  onChange={safeSetNumber(setExtraPaymentPercent)}
                  min={0}
                  max={200}
                />
              </label>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-cta">Update</button>
                <button
                  type="button"
                  onClick={() => {
                    setPropertyValue(5000000);
                    setDownPayment(1000000);
                    setAnnualRate(8.5);
                    setTenureYears(20);
                    setProcessingFeePercent(0.5);
                    setMonthlyIncome(60000);
                    setMarginalTaxPercent(30);
                    setExtraPaymentPercent(0);
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

            <div className="ad-box" style={{ marginTop: 14 }}>
              Ad / Bank widget
            </div>
          </aside>
        </div>
      </div>

      {/* ===== RESULTS: full width below split (REFINED STYLING) ===== */}
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
          {/* Primary Result: Estimated EMI */}
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
              Estimated EMI / month
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
              Loan Amount (Principal)
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
              Total Interest (Approx)
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
            <p
              className="result-value"
              style={{ fontSize: 13, marginTop: 4, color: '#6b7280' }}
            >
              + Fee: {formatINR(processingFee)}
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
            <h4>Loan to Value (LTV) Status</h4>
            <p>LTV Rule Applied: **{Math.round(ltv * 100)}%**</p>
            <p>Max Loan Allowed: **{formatINR(maxLoanByLtv)}**</p>
            {loanExceedsLtv ? (
              <p style={{ color: 'crimson', fontWeight: 600 }}>
                ⚠️ Loan exceeds LTV. Down payment must be increased.
              </p>
            ) : (
              <p style={{ color: 'green', fontWeight: 600 }}>
                ✅ LTV requirement is met.
              </p>
            )}
          </div>
          <div>
            <h4>Fixed Obligation to Income Ratio (FOIR)</h4>
            <p>Your Monthly EMI: **{formatINR(monthlyEmi)}**</p>
            <p>
              Recommended Max EMI (50% of income): **
              {formatINR(Math.round(foirAllowed))}**
            </p>
            {affordabilityOk ? (
              <p style={{ color: 'green', fontWeight: 600 }}>
                ✅ EMI is within safe affordability limits.
              </p>
            ) : (
              <p style={{ color: 'crimson', fontWeight: 600 }}>
                🛑 FOIR exceeded. Consider lowering the loan or increasing
                tenure.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* TAX BENEFIT ESTIMATE */}
      <div className="card" style={{ marginTop: 18 }}>
        <h3>
          <span role="img" aria-label="Tax Savings">
            🪙
          </span>{' '}
          Estimated Annual Tax Savings (Year 1)
        </h3>
        <p>
          Estimated tax savings (approx):{' '}
          <strong style={{ color: '#047857', fontSize: '1.2em' }}>
            {formatINR(taxSavingsEstimate)}
          </strong>{' '}
          (at {marginalTaxPercent}%)
        </p>
        <div style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>
          <p>
            — Section 24 (Interest) Deduction Claimed:{' '}
            {formatINR(Math.round(section24Deduction))} (Cap: ₹2,00,000)
          </p>
          <p>
            — Section 80C (Principal) Deduction Claimed:{' '}
            {formatINR(Math.round(section80CDeduction))} (Part of ₹1.5 Lakh 80C
            limit)
          </p>
          <p>
            Note: This is an estimate for year-1 only and assumes self-occupied
            property rules. Consult a tax advisor.
          </p>
        </div>
      </div>

      {/* EXTRA EMI / PREPAYMENT EFFECT */}
      <div className="card" style={{ marginTop: 18 }}>
        <h3>
          <span role="img" aria-label="Prepayment">
            ⚡
          </span>{' '}
          Prepayment Simulation ({extraPaymentPercent}% Extra EMI)
        </h3>
        <p style={{ marginTop: 8 }}>
          New approximate tenure: **
          {(prepaymentEffect.newMonths / 12).toFixed(1)} years** (
          {prepaymentEffect.newMonths} months)
        </p>
        <p>
          Interest saved (approx):{' '}
          <strong style={{ color: '#047857' }}>
            {formatINR(prepaymentEffect.interestSaved)}
          </strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          Prepaying can drastically reduce your overall interest burden,
          especially early in the loan tenure.
        </p>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-home-loan">🌟 Understanding the Home Loan</h2>
          <p>
            A **Home Loan** is a secured financial product that allows an
            individual to purchase or construct residential property. Governed
            by a floating or fixed interest rate, these loans involve large sums
            of money and long repayment tenures (up to 30 years). Repayment
            occurs through Equated Monthly Installments (EMIs), consisting of
            both principal and interest components.
          </p>
          <p>
            In India, home loans are uniquely beneficial due to substantial
            income tax deductions available on both the principal and interest
            components, significantly reducing the borrower&apos;s effective
            cost.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who is Eligible for a Home Loan?</h2>
          <p>
            Eligibility criteria focus on financial stability and repayment
            capacity:
          </p>
          <ul>
            <li>**Age:** Typically between 18 and 65 years.</li>
            <li>
              **Income Source:** Stable income (salaried or self-employed) with
              documentary proof.
            </li>
            <li>
              **Credit Score:** A high CIBIL score (usually above 750) is
              necessary to secure favorable interest rates.
            </li>
            <li>
              **LTV (Loan-to-Value):** The loan amount is strictly capped based
              on the property value, as calculated above.
            </li>
          </ul>
        </section>

        {/* 3. How can the Home Loan Calculator help you? */}
        <section>
          <h2 id="how-home-loan-helps">
            💡 How This Calculator Optimizes Your Purchase
          </h2>
          <p>
            This comprehensive calculator is designed for advanced planning, not
            just simple EMI calculation:
          </p>
          <ul>
            <li>
              **Tax Optimization:** Provides a Year-1 estimate of deductible
              interest (Sec 24) and principal (Sec 80C) to quantify your
              immediate tax savings.
            </li>
            <li>
              **Affordability Check (FOIR):** Assesses the maximum EMI you can
              comfortably afford based on your declared monthly income (FOIR).
            </li>
            <li>
              **LTV Verification:** Checks if your Down Payment meets the
              regulatory Loan-to-Value requirement for your specific property
              price bracket.
            </li>
            <li>
              **Prepayment Strategy:** Simulates how making extra payments can
              dramatically reduce your interest cost and tenure.{' '}
            </li>
          </ul>
        </section>

        {/* 4. How does the Home Loan EMI calculation work? */}
        <section>
          <h2 id="how-home-loan-works">
            ⚙️ Home Loan EMI Formula and Amortization
          </h2>

          <h3>The Core EMI Formula</h3>
          <p>
            The EMI is calculated based on the loan amount ($P$), the monthly
            interest rate ($r$), and the total number of months ($n$).
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

          <h3>The Amortization Schedule</h3>
          <p>
            The loan schedule tracks how the EMI is split each month. In the
            early years, the majority of the EMI goes towards **Interest**, and
            only a small portion reduces the **Principal**. This proportion
            reverses over time. This calculator generates the full amortization
            schedule to show this exact breakdown.
          </p>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="home-loan-advantages">✅ Key Advantages of a Home Loan</h2>
          <p>
            Beyond acquiring property, a home loan offers significant financial
            benefits, especially in India:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Tax Shield</h3>
              <p>
                Deductions under Section 24 (interest, up to ₹2 Lakh for
                self-occupied) and 80C (principal, up to ₹1.5 Lakh)
                significantly reduce taxable income.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Leverage and Appreciation</h3>
              <p>
                Allows you to acquire an appreciating asset today using future
                income, leveraging your wealth growth.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Lower Interest Rates</h3>
              <p>
                Home loans usually carry lower interest rates than personal
                loans because they are secured against the property
                (collateral).
              </p>
            </div>
            <div className="advantage-card">
              <h3>Fixed Liability</h3>
              <p>
                Taking a fixed-rate loan locks in your payment, protecting you
                from future interest rate increases.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="home-loan-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                What is LTV (Loan-to-Value) and why does it matter?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                LTV is the ratio of the loan amount to the property’s market
                value. Banks adhere to strict LTV limits (e.g., 75% to 90%),
                meaning you must arrange the remaining portion as a down
                payment. This protects the bank in case of default.
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
                }}
              >
                How does prepayment reduce my loan cost?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                When you make a prepayment, the extra amount goes entirely
                toward reducing the principal. Since interest is calculated
                monthly on the outstanding principal, a reduced principal means
                less interest accrues over the remaining tenure, leading to
                significant interest savings and a shorter loan term.
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
                What is the Fixed Obligation to Income Ratio (FOIR)?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                FOIR is the ratio of a borrower&apos;s existing fixed monthly
                liabilities (EMIs, rent, etc.) plus the proposed new EMI,
                divided by their net monthly income. Lenders typically prefer
                this ratio to be below 50% to ensure the borrower can
                comfortably manage repayments.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* AMORTIZATION TABLE */}
      <div className="article" style={{ marginTop: 32 }}>
        <h2>Amortization Schedule (first 120 months shown)</h2>
        <div
          className="schedule-wrapper"
          style={{ maxHeight: 420, overflow: 'auto', overflowX: 'auto' }}
        >
          <table className="rate-table" style={{ minWidth: '650px' }}>
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
            Showing first 120 months. Full schedule available in CSV export.
          </p>
        )}

        {/* Export / Print actions below the schedule */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {/* FIXED: Link exportCSV function */}
          <button className="table-apply-btn" onClick={exportCSV}>
            Export Schedule CSV
          </button>
          <button
            className="button"
            onClick={() => {
              const summary = `Home Loan: ${formatINR(
                loanAmount
              )} @ ${annualRate}% p.a. • EMI ${formatINR(
                monthlyEmi
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
