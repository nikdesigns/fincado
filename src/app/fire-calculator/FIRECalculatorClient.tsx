// src/app/fire-calculator/FIRECalculatorClient.tsx
'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export default function FIRECalculatorClient() {
  // --- Core Inputs ---
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [targetRetirementAge, setTargetRetirementAge] = useState<number>(45); // Early retirement focus
  const [currentAnnualExpense, setCurrentAnnualExpense] =
    useState<number>(1000000); // ₹10 Lakhs/year
  const [currentCorpus, setCurrentCorpus] = useState<number>(2000000); // ₹20 Lakhs saved

  // --- Assumption Inputs ---
  const [preRetireReturn, setPreRetireReturn] = useState<number>(12); // Expected return pre-retirement
  const [inflationPct, setInflationPct] = useState<number>(6); // Expected long-term inflation
  const [safeWithdrawalRate, setSafeWithdrawalRate] = useState<number>(3.5); // SWR for India (3% to 3.5% recommended)

  // Derived Timing Variables
  const yearsToFIRE = Math.max(1, targetRetirementAge - currentAge);
  const monthsToFIRE = yearsToFIRE * 12;

  // Monthly Rates
  const monthlyRatePre = preRetireReturn / 12 / 100;
  const monthlyInflation = inflationPct / 12 / 100;

  // --- Step 1: Calculate Expense at Retirement (Future Expense) ---
  const annualExpenseAtFIRE = useMemo(() => {
    if (inflationPct === 0) return currentAnnualExpense;
    // FV = PV * (1 + r)^t
    const futureExpense =
      currentAnnualExpense * Math.pow(1 + inflationPct / 100, yearsToFIRE);
    return Math.round(futureExpense);
  }, [currentAnnualExpense, inflationPct, yearsToFIRE]);

  // --- Step 2: Calculate the FIRE Number (Corpus Required) ---
  const fireNumberCorpus = useMemo(() => {
    if (safeWithdrawalRate <= 0) return 0;
    // FIRE Corpus = Future Annual Expense / Safe Withdrawal Rate (SWR)
    // Multiplier = 100 / SWR (e.g., 3.5% SWR = 28.57x annual expense)
    const multiplier = 100 / safeWithdrawalRate;
    const fireCorpus = annualExpenseAtFIRE * multiplier;
    return Math.round(fireCorpus);
  }, [annualExpenseAtFIRE, safeWithdrawalRate]);

  // --- Step 3: Calculate Future Value of Current Corpus ---
  const futureValueOfCurrentCorpus = useMemo(() => {
    if (monthlyRatePre === 0) return currentCorpus;
    // FV = P * (1 + r/12)^n
    const futureValue =
      currentCorpus * Math.pow(1 + monthlyRatePre, monthsToFIRE);
    return Math.round(futureValue);
  }, [currentCorpus, monthlyRatePre, monthsToFIRE]);

  // --- Step 4: Calculate Required Shortfall & Monthly SIP to Bridge the Gap ---
  const requiredShortfall = Math.max(
    0,
    fireNumberCorpus - futureValueOfCurrentCorpus
  );

  const requiredMonthlySIP = useMemo(() => {
    if (requiredShortfall <= 0 || monthsToFIRE <= 0) return 0;

    const FV = requiredShortfall;
    const r = monthlyRatePre;
    const n = monthsToFIRE;

    if (r === 0) return Math.round(FV / n);

    // Reverse FV of Annuity Due formula (payments at start of month)
    const annuityFactor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    return Math.round(FV / annuityFactor);
  }, [requiredShortfall, monthlyRatePre, monthsToFIRE]);

  // Helper setter
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  // Helper to describe the SWR/Multiplier
  const multiplierText = (100 / safeWithdrawalRate).toFixed(2);

  return (
    <section className="article">
      <div>
        <h1>🔥 Financial Independence, Retire Early (FIRE) Calculator</h1>

        {/* INPUTS AND CHART SPLIT */}
        <div className="emi-split" style={{ marginTop: 18 }}>
          <div className="emi-left">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'grid', gap: 12 }}
            >
              <div className="form-row">
                <label>
                  Current Age
                  <input
                    type="number"
                    value={currentAge}
                    onChange={setter(setCurrentAge)}
                    min={18}
                  />
                </label>

                <label>
                  Target FIRE Age
                  <input
                    type="number"
                    value={targetRetirementAge}
                    onChange={setter(setTargetRetirementAge)}
                    min={currentAge + 1}
                  />
                </label>
              </div>

              <label>
                Current Annual Expenses (₹)
                <input
                  type="number"
                  value={currentAnnualExpense}
                  onChange={setter(setCurrentAnnualExpense)}
                  min={1000}
                  step={10000}
                />
              </label>

              <label>
                Current FIRE Corpus / Savings (₹)
                <input
                  type="number"
                  value={currentCorpus}
                  onChange={setter(setCurrentCorpus)}
                  min={0}
                  step={10000}
                />
              </label>

              <div className="form-row">
                <label>
                  Expected Inflation (% p.a.)
                  <input
                    type="number"
                    value={inflationPct}
                    onChange={setter(setInflationPct)}
                    min={0}
                    step={0.1}
                  />
                </label>

                <label>
                  Expected Return (Pre-FIRE) % p.a.
                  <input
                    type="number"
                    value={preRetireReturn}
                    onChange={setter(setPreRetireReturn)}
                    min={0}
                    step={0.1}
                  />
                </label>
              </div>

              <label>
                Safe Withdrawal Rate (SWR) % p.a.
                <input
                  type="number"
                  value={safeWithdrawalRate}
                  onChange={setter(setSafeWithdrawalRate)}
                  min={1}
                  step={0.1}
                />
                <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
                  *Recommended SWR for India is 3.0% - 3.5% (Multiplier:{' '}
                  {multiplierText}x)
                </p>
              </label>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-cta">Calculate FIRE</button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentAge(30);
                    setTargetRetirementAge(45);
                    setCurrentAnnualExpense(1000000);
                    setCurrentCorpus(2000000);
                    setPreRetireReturn(12);
                    setInflationPct(6);
                    setSafeWithdrawalRate(3.5);
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

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
              className="retirement-action-box"
              style={{
                width: '100%',
                maxWidth: '300px',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#fff',
                border: '2px solid #dc2626' /* Action color */,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  margin: '0 0 10px',
                  fontSize: '18px',
                  color: '#dc2626',
                }}
              >
                Years to Financial Freedom
              </h3>
              <p
                style={{
                  margin: '0 0 15px',
                  fontSize: '60px',
                  fontWeight: 800,
                  color: '#1f2937',
                }}
              >
                {yearsToFIRE}
              </p>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                years remaining until age {targetRetirementAge}
              </p>
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
            {/* Primary Result: FIRE Number */}
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
                <span role="img" aria-label="Goal">
                  🎯
                </span>{' '}
                Your Estimated FIRE Number
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#047857', // Primary success color
                }}
              >
                {formatINR(fireNumberCorpus)}
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: '4px' }}>
                (Annual Expense &times; {multiplierText})
              </p>
            </div>

            {/* Secondary Result: Future Annual Expense */}
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
                <span role="img" aria-label="Expense">
                  💸
                </span>{' '}
                Annual Expense at FIRE Age
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#dc2626' }}
              >
                {formatINR(annualExpenseAtFIRE)}
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: '4px' }}>
                (Inflated by {inflationPct}% over {yearsToFIRE} yrs)
              </p>
            </div>

            {/* Secondary Result: Required Monthly SIP */}
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
                <span role="img" aria-label="SIP">
                  🚀
                </span>{' '}
                Required Monthly SIP
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(requiredMonthlySIP)}
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: '4px' }}>
                (To cover shortfall of {formatINR(requiredShortfall)})
              </p>
            </div>

            {/* Secondary Result: Future Value of Current Corpus */}
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
                <span role="img" aria-label="Savings">
                  🏦
                </span>{' '}
                Projected Corpus from Current Savings
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(futureValueOfCurrentCorpus)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-fire">
            🔥 What is Financial Independence, Retire Early (FIRE)?
          </h2>
          <p>
            **FIRE** is a financial movement dedicated to achieving **Financial
            Independence** and having the option to **Retire Early**. The core
            idea is to aggressively save and invest a substantial portion of
            income—often 50% to 70%—to build a large investment **corpus (the
            FIRE Number)** sufficient to cover all annual living expenses
            indefinitely, typically by generating passive income.
          </p>
          <p>
            The benchmark for the **FIRE Number** is often based on the **4%
            Rule**, requiring 25 to 33 times your estimated annual expenses at
            retirement. [Image illustrating the FIRE Number Multiplier]
          </p>
        </section>

        {/* 2. Key Challenges */}
        <section>
          <h2 id="fire-india">🎯 The FIRE Number & The Indian Context</h2>
          <p>
            The traditional 4% Rule (25x annual expense) was derived from US
            market data. Due to **higher structural inflation** in India and
            higher market volatility, a more conservative approach is often
            needed:
          </p>
          <ul>
            <li>
              **Safe Withdrawal Rate (SWR):** Many Indian financial planners
              recommend a starting SWR of **3.0% to 3.5%** instead of 4%.
            </li>
            <li>
              **Required Corpus Multiplier:** This translates to a required
              corpus of **28x to 33x** your future annual expenses.
            </li>
            <li>
              **Longevity:** Retiring at 45 means your corpus must last 40+
              years, demanding careful planning.
            </li>
          </ul>
        </section>

        {/* 3. How the Calculator works */}
        <section>
          <h2 id="how-calculation-works">
            ⚙️ FIRE Calculation Logic and Key Steps
          </h2>
          <p>The calculator uses a three-stage financial model:</p>
          <ol>
            <li>
              **Future Expense Projection:** Your current expense is inflated by
              the expected rate of inflation ({inflationPct}%) over the **
              {yearsToFIRE} years** until your FIRE date.
            </li>
            <li>
              **FIRE Number Calculation:** The inflated future expense is
              multiplied by your chosen multiplier (100 / SWR) to determine the
              corpus required for perpetual withdrawal.
            </li>
            <li>
              **SIP Gap Analysis:** The calculator finds the difference
              (shortfall) between the projected value of your existing savings
              and your required FIRE Number, and calculates the monthly SIP
              needed to cover that exact shortfall.
            </li>
          </ol>
          [Image of FIRE planning cash flow model]
        </section>

        {/* 4. Actionable Steps */}
        <section>
          <h2 id="actions">📈 Strategy for Accelerating Your FIRE Journey</h2>
          <p>
            The fastest way to lower your time to financial independence is by
            managing these three levers:
          </p>

          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Maximize Savings Rate</h3>
              <p>
                The **Savings Rate** (Savings / Net Income) is the most powerful
                variable. Aim for 50-70% to dramatically reduce the time needed
                to reach your FIRE Number.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Optimize SWR</h3>
              <p>
                A small increase in your **investment returns** or a small
                reduction in your **safe withdrawal rate** can shave years off
                your timeline.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Minimize Lifestyle Inflation</h3>
              <p>
                Control **lifestyle creep**. Keeping your core annual expenses
                low directly reduces your final required FIRE Number, making the
                goal easier to achieve.
              </p>
            </div>
          </div>
        </section>

        {/* 5. FAQ's */}
        <section>
          <h2 id="fire-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                Why is the Safe Withdrawal Rate lower for India?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                The SWR is lower because India has historically faced higher
                inflation (6%+), which erodes the corpus faster, and higher
                market volatility compared to the US data used to derive the
                original 4% rule. A 3% to 3.5% SWR is generally safer here.
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
                Does this calculator account for taxes?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                This calculator provides a **gross** estimate. A true FIRE plan
                must account for taxes on long-term capital gains (LTCG) and
                dividends, which reduce your real return. It is advised to
                assume a lower **net** return rate in the input to be more
                conservative.
              </p>
            </details>
          </div>
        </section>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          className="primary-cta"
          onClick={() => {
            const summary = `FIRE Plan: Goal ${targetRetirementAge}, Target Corpus ${formatINR(
              fireNumberCorpus
            )}, Required SIP: ${formatINR(requiredMonthlySIP)}/mo.`;
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
