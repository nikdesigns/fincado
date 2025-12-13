'use client';
import React, { useMemo, useRef, useState } from 'react';

/* Helper formatting */
function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

/* Small PieChart component (declared outside main render) */
type PieSlice = { color: string; pct: number };
function PieChart({
  slices,
  size = 220,
}: {
  slices: PieSlice[];
  size?: number;
}) {
  const strokeWidth = Math.round(size * 0.18);
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  // FIX: Use .reduce to calculate the cumulative offsets safely.
  const safeSegments = slices.reduce((acc, s) => {
    const len = (s.pct / 100) * circumference;
    const offset =
      acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].len : 0;

    acc.push({ ...s, len, offset });
    return acc;
  }, [] as (PieSlice & { len: number; offset: number })[]);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
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
          stroke="#f0fdf4"
          strokeWidth={strokeWidth}
        />
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {safeSegments.map((seg, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${seg.len} ${Math.max(
                0,
                circumference - seg.len
              )}`}
              strokeDashoffset={-seg.offset}
              strokeLinecap="round"
              style={{
                transition:
                  'stroke-dasharray 350ms ease, stroke-dashoffset 350ms ease',
              }}
            />
          ))}
        </g>
        <circle cx={cx} cy={cy} r={r * 0.52} fill="#fff" />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontWeight={700}
          fontSize={16}
          fill="#081225"
        >
          {safeSegments.reduce((s, x) => s + x.pct, 0) === 0
            ? '—'
            : `${Math.round(safeSegments[0].pct)}%`}
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize={11}
          fill="#6b7280"
        >
          Principal / Interest share
        </text>
      </svg>
    </div>
  );
}

type ScheduleRow = {
  year: number;
  contributed: number;
  balance: number;
  interestThisYear: number;
};

export default function PPFClient() {
  // inputs
  const [mode, setMode] = useState<'monthly' | 'annual'>('monthly');
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000); // ₹1k/mo
  const [annualContribution, setAnnualContribution] = useState<number>(12000); // fallback if annual mode
  const [years, setYears] = useState<number>(15); // PPF base tenure
  const [annualRate, setAnnualRate] = useState<number>(7.1); // editable; current govt rate may differ
  const [max80CLimit, setMax80CLimit] = useState<number>(150000); // 80C limit
  const [showGrossOnly, setShowGrossOnly] = useState<boolean>(false);

  const printRef = useRef<HTMLDivElement | null>(null);

  // derived
  const months = Math.max(1, Math.round(years * 12));

  // PPF uses ANNUAL compounding and calculation.
  const monthlyRate = useMemo(() => {
    // This is the rate used for monthly contribution compounding approximation
    return annualRate / 12 / 100;
  }, [annualRate]);

  const yearlyRate = annualRate / 100;

  // Effective contributions per year depending on mode
  const totalContributed = useMemo(() => {
    if (mode === 'monthly') return monthlyContribution * months;
    return annualContribution * years;
  }, [mode, monthlyContribution, annualContribution, months, years]);

  // Maturity calculations:
  // We use the standard FV of Annuity Due formula, which is an approximation
  // for PPF, as official PPF interest is calculated monthly but credited annually.
  const maturity = useMemo(() => {
    if (mode === 'monthly') {
      if (monthlyContribution <= 0) return 0;
      const r = monthlyRate;
      const n = months;
      if (r === 0) return monthlyContribution * n;
      // FV = P * [ ((1+r)^n - 1) / r ] * (1+r)
      const fvSIP =
        monthlyContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r); // annuity due
      return fvSIP;
    } else {
      // annual mode: use annual annuity-due formula (deposit at year start)
      if (annualContribution <= 0) return 0;
      const r = yearlyRate;
      const n = Math.max(1, years);
      if (r === 0) return annualContribution * n;
      // FV of annuity due: P * ( ( (1+r)^n - 1 ) / r ) * (1 + r)
      const fvAnnual =
        annualContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      return fvAnnual;
    }
  }, [
    mode,
    monthlyContribution,
    monthlyRate,
    months,
    annualContribution,
    yearlyRate,
    years,
  ]);

  const totalInterest = Math.max(0, Math.round(maturity - totalContributed));
  const maturityRounded = Math.round(maturity);

  // Schedule: produce per-year rows (more accurate reflection of PPF)
  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let balance = 0;

    const monthlyDepositAmount = monthlyContribution;
    const annualDepositAmount = annualContribution;
    const ratePerYear = annualRate / 100;

    for (let y = 1; y <= years; y++) {
      let contributedThisYear = 0;

      if (mode === 'monthly') {
        // Simulation for monthly deposits with annual interest crediting (approximation):
        contributedThisYear = monthlyDepositAmount * 12;
      } else {
        // annual mode: deposit at year start
        contributedThisYear = annualDepositAmount;
      }

      // Calculate interest on the *total* balance at the start of the year plus the year's contribution (approximation)
      const balanceBeforeInterest = balance + contributedThisYear;
      const interest = balanceBeforeInterest * ratePerYear;

      balance = balanceBeforeInterest + interest; // New balance at year end

      rows.push({
        year: y,
        contributed: contributedThisYear,
        balance: Math.round(balance),
        interestThisYear: Math.round(interest),
      });
    }
    return rows;
  }, [mode, monthlyContribution, annualContribution, annualRate, years]);

  // Pie chart percentages: principal vs interest share
  const principalPct = useMemo(() => {
    const total = maturity === 0 ? 1 : maturity;
    return Math.max(
      0,
      Math.min(100, Math.round((totalContributed / total) * 100))
    );
  }, [maturity, totalContributed]);

  const interestPct = Math.max(0, 100 - principalPct);

  // Corrected Tax Eligible Calculation: Max annual contribution eligible for 80C
  const annualContributionForTax = useMemo(() => {
    const currentAnnualContribution =
      mode === 'monthly' ? monthlyContribution * 12 : annualContribution;
    return Math.min(currentAnnualContribution, max80CLimit);
  }, [mode, monthlyContribution, annualContribution, max80CLimit]);

  // CSV export
  function exportCSV() {
    const header = ['Year', 'Contributed', 'InterestThisYear', 'Balance'];
    const lines = [header.join(',')].concat(
      schedule.map((r) =>
        [r.year, r.contributed, r.interestThisYear, r.balance].join(',')
      )
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ppf-schedule-${years}y.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Print schedule (print area)
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
          <title>PPF Maturity Schedule</title>
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

  // setter helpers
  const setter =
    (fn: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="article">
      <div>
        <h1>🇮🇳 Public Provident Fund (PPF) Calculator</h1>

        {/* Two-column split: inputs left, pie chart right */}
        <div
          className="emi-split"
          style={{
            marginTop: 18,
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
          }}
        >
          <div className="emi-left" style={{ flex: 1 }}>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'grid', gap: 12 }}
            >
              <label>
                Contribution Mode
                <select
                  value={mode}
                  onChange={(e) =>
                    setMode(e.target.value as 'monthly' | 'annual')
                  }
                >
                  <option value="monthly">Monthly contributions</option>
                  <option value="annual">Annual lump-sum (once a year)</option>
                </select>
              </label>

              {mode === 'monthly' ? (
                <label>
                  Monthly Contribution (₹)
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={setter(setMonthlyContribution)}
                    min={0}
                    step={100}
                  />
                </label>
              ) : (
                <label>
                  Annual Contribution (₹)
                  <input
                    type="number"
                    value={annualContribution}
                    onChange={setter(setAnnualContribution)}
                    min={0}
                    step={1000}
                  />
                  <div style={{ fontSize: 13, color: '#6b7280' }}>
                    Note: max contribution to PPF per financial year currently
                    capped by government (₹{formatINR(max80CLimit)}).
                  </div>
                </label>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <label>
                  Investment Period (Years)
                  <input
                    type="number"
                    value={years}
                    onChange={setter((v) => setYears(Math.max(1, v)))}
                    min={1}
                  />
                  <div style={{ fontSize: 13, color: '#6b7280' }}>
                    PPF initial lock-in is 15 years.
                  </div>
                </label>

                <label>
                  Interest Rate (% p.a.)
                  <input
                    type="number"
                    value={annualRate}
                    onChange={setter(setAnnualRate)}
                    step="0.01"
                    min={0}
                  />
                  <div style={{ fontSize: 13, color: '#6b7280' }}>
                    Rate is set quarterly by the Government of India.
                  </div>
                </label>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-cta" onClick={() => {}}>
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('monthly');
                    setMonthlyContribution(1000);
                    setAnnualContribution(12000);
                    setYears(15);
                    setAnnualRate(7.1);
                    setShowGrossOnly(false);
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          <aside
            className="emi-right"
            style={{ width: 320, flex: '0 0 320px' }}
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
              <PieChart
                slices={[
                  { color: '#f0fdf4', pct: principalPct },
                  { color: '#16a34a', pct: interestPct },
                ]}
                size={220}
              />

              <div
                style={{
                  display: 'flex',
                  gap: 18,
                  marginTop: 12,
                  justifyContent: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      background: '#f0fdf4',
                      display: 'inline-block',
                      borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.03)',
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>{principalPct}%</div>
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

            <div className="ad-box" style={{ marginTop: 12 }}>
              Ad / widget
            </div>
          </aside>
        </div>
        {/* END of Two-column split */}

        {/* RESULTS: full width under split - STYLED FOR PROFESSIONALISM */}
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
            {/* Primary Result: Estimated Maturity */}
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
                Estimated Maturity
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#047857',
                }}
              >
                {formatINR(maturityRounded)}
              </p>
            </div>

            {/* Secondary Result: Total Contributed */}
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
                Total Contributed
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(totalContributed)}
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
          </div>
        </div>
        {/* END of Results */}

        {/* TAX BENEFIT SUMMARY - FULL WIDTH */}
        <div className="card" style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: '18px' }}>
            <span role="img" aria-label="Tax Benefit">
              🪙
            </span>{' '}
            Section 80C Tax Benefit (Annual)
          </h3>
          <p style={{ marginTop: 8 }}>
            Maximum annual contribution eligible for **Section 80C** deduction:
            <strong style={{ color: '#047857' }}>
              {' '}
              {formatINR(annualContributionForTax)}
            </strong>
          </p>
          <p style={{ fontSize: 13, color: '#6b7280' }}>
            (The statutory deduction limit under Section 80C is currently capped
            at ₹{formatINR(max80CLimit)} per financial year. PPF falls under the
            EEE regime: Investment, interest, and maturity are all tax-exempt.)
          </p>
        </div>

        {/* --- SEO Content Starts Here --- */}
        <div className="content-for-seo" style={{ marginTop: 20 }}>
          {/* 1. Brief about the program */}
          <section>
            <h2 id="about-ppf">🌟 What is the Public Provident Fund (PPF)?</h2>
            <p>
              The **Public Provident Fund (PPF)** is a popular,
              government-backed, long-term savings cum tax saving scheme in
              India. It is highly valued for its **Triple EEE
              (Exempt-Exempt-Exempt)** status: contributions are tax-deductible
              (under Section 80C), interest earned is tax-exempt, and the
              maturity amount is also tax-exempt. It&apos;s one of the safest
              avenues for long-term goal planning like retirement.
            </p>
            <p>
              The PPF has an initial lock-in period of 15 years, but it can be
              extended indefinitely in blocks of five years.
            </p>
          </section>

          {/* 2. Who can use this */}
          <section>
            <h2 id="who-can-use">🎯 Who is Eligible for a PPF Account?</h2>
            <p>
              Any resident Indian individual can open a PPF account for
              themselves or on behalf of a minor.
            </p>
            <ul>
              <li>
                **Eligibility:** Resident Indians only (NRIs cannot open a new
                account, though existing accounts can be maintained until
                maturity).
              </li>
              <li>
                **Accounts:** Only one PPF account per individual is allowed.
              </li>
              <li>
                **Minimum/Maximum Deposit:** The minimum annual deposit is ₹500,
                and the maximum is ₹1.5 Lakh per financial year.
              </li>
              <li>
                **Deposit Mode:** Contributions can be made as a lump sum (once
                a year) or in up to 12 installments (monthly).
              </li>
            </ul>
          </section>

          {/* 3. How can PPF Calculator help you? */}
          <section>
            <h2 id="how-ppf-helps">💡 How Can This PPF Calculator Help You?</h2>
            <p>
              This **PPF Calculator** is a vital tool for understanding the
              substantial, tax-free wealth that a disciplined 15-year
              contribution can build.
            </p>
            <ul>
              <li>
                **Long-Term Corpus Projection:** Estimate the tax-free lump sum
                you will receive upon maturity after 15 years (or more).
              </li>
              <li>
                **Mode Comparison:** Compare the outcome of monthly vs. annual
                contributions (timing matters in PPF).
              </li>
              <li>
                **Tax Planning:** Easily determine how much of your total annual
                investment falls within the Section 80C tax deduction limit.
              </li>
              <li>
                **Schedule Tracking:** Provides a clear yearly schedule of
                growth, showing the powerful effect of compounding interest over
                decades.{' '}
              </li>
            </ul>
          </section>

          {/* 4. How does PPF work? (The calculation and formula) */}
          <section>
            <h2 id="how-ppf-works">⚙️ PPF Calculation Logic and Formula</h2>

            <h3>PPF Interest Mechanism (Key Difference)</h3>
            <p>
              While the rate is annual, PPF interest is calculated monthly on
              the minimum balance between the 5th day and the end of the month.
              However, the accumulated interest is compounded and credited to
              the account only **at the end of the financial year (March
              31st)**. This makes the timing of your deposit crucial—depositing
              before the 5th of the month maximizes interest earned for that
              month.
            </p>

            <h4>The Calculator&apos;s Formula (Future Value Approximation):</h4>
            <p>
              To estimate the maturity amount, the calculator uses the standard
              Future Value of Annuity Due formula, which assumes deposits at the
              start of the period and continuous compounding/crediting (a
              standard approximation for long-term growth analysis):
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
              FV = P &times; {`[((1 + r)^n - 1) / r]`} &times; (1 + r)
            </div>
            <p>
              Where **P** is the periodic contribution (monthly or annual),
              **r** is the rate per period, and **n** is the total number of
              periods.
            </p>
          </section>

          {/* 5. Advantage */}
          <section>
            <h2 id="ppf-advantages">✅ Key Advantages of PPF</h2>
            <p>
              The PPF scheme is unmatched for risk-averse, tax-efficient,
              long-term savings:
            </p>
            <div className="advantage-grid">
              <div className="advantage-card">
                <h3>Triple EEE Tax Benefit</h3>
                <p>
                  Contribution, interest, and maturity are all tax-exempt,
                  offering the highest level of tax efficiency available for
                  savings.
                </p>
              </div>
              <div className="advantage-card">
                <h3>Government Guarantee</h3>
                <p>
                  As a government scheme, the capital is entirely safe,
                  providing a sovereign guarantee against default risk.
                </p>
              </div>
              <div className="advantage-card">
                <h3>Attractive Interest Rate</h3>
                <p>
                  The PPF rate is typically higher than most Fixed Deposit
                  rates, especially when accounting for its tax-free status.
                </p>
              </div>
              <div className="advantage-card">
                <h3>Flexibility in Extension</h3>
                <p>
                  After the initial 15 years, the account can be extended in
                  5-year blocks, continuing the tax and interest benefits.
                </p>
              </div>
            </div>
          </section>

          {/* 6. FAQ's */}
          <section>
            <h2 id="ppf-faqs">
              ❓ Frequently Asked Questions (FAQs) about PPF
            </h2>
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
                  When is the best time to make a PPF contribution?
                </summary>
                <p
                  style={{
                    padding: '10px 0 15px 0',
                    borderTop: '1px dashed #e5e7eb',
                    margin: 0,
                    color: '#6b7280',
                  }}
                >
                  For both annual and monthly modes, the best time to deposit is
                  **before the 5th of the month** (or before April 5th for the
                  annual lump sum). This ensures the deposit is included in the
                  minimum monthly balance for the interest calculation period.
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
                  Can I withdraw money before 15 years?
                </summary>
                <p
                  style={{
                    padding: '10px 0 15px 0',
                    borderTop: '1px dashed #e5e7eb',
                    margin: 0,
                    color: '#6b7280',
                  }}
                >
                  Partial withdrawals are permitted after the expiry of **5
                  financial years** from the end of the year the account was
                  opened. Full premature closure is allowed only under specific
                  conditions, such as treatment of critical illness or financing
                  the higher education of the account holder/child.
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
                  Is the PPF interest rate fixed for 15 years?
                </summary>
                <p
                  style={{
                    padding: '10px 0 15px 0',
                    borderTop: '1px dashed #e5e7eb',
                    margin: 0,
                    color: '#6b7280',
                  }}
                >
                  No. The PPF interest rate is not fixed. It is reviewed and
                  announced by the Ministry of Finance every **quarter**. The
                  returns you receive will vary depending on the prevailing rate
                  during each financial year.
                </p>
              </details>
            </div>
          </section>
        </div>

        {/* Schedule Preview */}
        <div className="article" style={{ marginTop: 16 }}>
          <h2>Yearly Schedule</h2>
          <div
            ref={printRef}
            className="schedule-wrapper"
            style={{ maxHeight: 360, overflow: 'auto' }}
          >
            <table className="rate-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Contributed</th>
                  <th>Interest (this year)</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((r) => (
                  <tr key={r.year}>
                    <td>{r.year}</td>
                    <td>{formatINR(r.contributed)}</td>
                    <td>{formatINR(r.interestThisYear)}</td>
                    <td>{formatINR(r.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={exportCSV}>Export Schedule CSV</button>
            <button onClick={handlePrint}>Print Schedule</button>
            <button
              onClick={() => {
                const summary = `PPF ${
                  mode === 'monthly'
                    ? `${formatINR(monthlyContribution)}/mo`
                    : `${formatINR(annualContribution)}/yr`
                } for ${years}y @ ${annualRate}% ⇒ ${formatINR(
                  maturityRounded
                )}`;
                navigator.clipboard?.writeText(summary);
                alert('Summary copied to clipboard');
              }}
            >
              Copy Summary
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
