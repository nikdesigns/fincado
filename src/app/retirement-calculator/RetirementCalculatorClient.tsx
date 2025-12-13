// src/app/retirement-calculator/RetirementCalculatorClient.tsx
'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export default function RetirementCalculatorClient() {
  // Inputs
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [currentSavings, setCurrentSavings] = useState<number>(500000); // Lump sum saved now
  const [monthlyExpense, setMonthlyExpense] = useState<number>(30000); // Monthly expense today
  const [inflationPct, setInflationPct] = useState<number>(6); // Pre-retirement inflation
  const [preRetireReturn, setPreRetireReturn] = useState<number>(12); // Expected return pre-retirement
  const [postRetireReturn, setPostRetireReturn] = useState<number>(8); // Expected return post-retirement

  // Derived Timing Variables
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const retirementMonths = yearsToRetirement * 12;
  const yearsInRetirement = 25; // Assumption for longevity
  const retirementExpenseYears = yearsInRetirement;

  // Monthly Rates
  const monthlyRatePre = preRetireReturn / 12 / 100;
  const monthlyInflation = inflationPct / 12 / 100;

  // --- Step 1: Calculate Expense at Retirement ---
  // Future Value of Current Monthly Expense using inflation
  const monthlyExpenseAtRetirement = useMemo(() => {
    if (inflationPct === 0) return monthlyExpense;
    return monthlyExpense * Math.pow(1 + monthlyInflation, retirementMonths);
  }, [monthlyExpense, monthlyInflation, retirementMonths, inflationPct]);

  // --- Step 2: Calculate Total Corpus Required at Retirement ---
  const annualWithdrawalAtRetirement = monthlyExpenseAtRetirement * 12;

  const targetCorpus = useMemo(() => {
    const rReal = (1 + postRetireReturn / 100) / (1 + inflationPct / 100) - 1;

    if (rReal <= 0) {
      // If returns <= inflation, simple multiplication is safer/conservative
      return annualWithdrawalAtRetirement * retirementExpenseYears;
    }

    // Annuity Factor (for withdrawals) based on Real Rate
    const factor = (1 - Math.pow(1 + rReal, -retirementExpenseYears)) / rReal;

    return Math.round(annualWithdrawalAtRetirement * factor);
  }, [
    annualWithdrawalAtRetirement,
    postRetireReturn,
    inflationPct,
    retirementExpenseYears,
  ]);

  // --- Step 3: Calculate Corpus from Current Savings ---
  // Future Value of Current Savings using Pre-Retirement Return
  const futureValueCurrentSavings = useMemo(() => {
    if (monthlyRatePre === 0) return currentSavings;
    return Math.round(
      currentSavings * Math.pow(1 + monthlyRatePre, retirementMonths)
    );
  }, [currentSavings, monthlyRatePre, retirementMonths]);

  // --- Step 4: Calculate Required Corpus/Shortfall ---
  const requiredAdditionalCorpus = Math.max(
    0,
    targetCorpus - futureValueCurrentSavings
  );

  // --- Step 5: Calculate Required Monthly SIP to cover Shortfall ---
  const requiredMonthlySIP = useMemo(() => {
    if (requiredAdditionalCorpus <= 0 || retirementMonths <= 0) return 0;

    const FV = requiredAdditionalCorpus;
    const r = monthlyRatePre;
    const n = retirementMonths;

    if (r === 0) return Math.round(FV / n);

    // SIP = FV / [((1+r)^n - 1) / r] * (1+r)
    const annuityFactor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    return Math.round(FV / annuityFactor);
  }, [requiredAdditionalCorpus, monthlyRatePre, retirementMonths]);

  // Helper setter
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="article">
      <div>
        <h1>👵👴 Retirement Corpus Planning Calculator</h1>

        {/* INPUTS AND ACTION BOX SPLIT */}
        <div style={{ marginTop: 18 }}>
          <div className="emi-left">
            <form onSubmit={(e) => e.preventDefault()}>
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
                  Retirement Age
                  <input
                    type="number"
                    value={retirementAge}
                    onChange={setter(setRetirementAge)}
                    min={currentAge + 1}
                  />
                </label>
              </div>

              <label>
                Current Monthly Expense (₹) — *Today&apos;s value*
                <input
                  type="number"
                  value={monthlyExpense}
                  onChange={setter(setMonthlyExpense)}
                  min={100}
                  step={1000}
                />
              </label>

              <label>
                Current Retirement Savings (₹) — *Lump Sum now*
                <input
                  type="number"
                  value={currentSavings}
                  onChange={setter(setCurrentSavings)}
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
                  Pre-Retirement Return (% p.a.)
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
                Post-Retirement Return (% p.a.) — *On remaining corpus*
                <input
                  type="number"
                  value={postRetireReturn}
                  onChange={setter(setPostRetireReturn)}
                  min={0}
                  step={0.1}
                />
              </label>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-cta">Calculate</button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentAge(30);
                    setRetirementAge(60);
                    setCurrentSavings(500000);
                    setMonthlyExpense(30000);
                    setInflationPct(6);
                    setPreRetireReturn(12);
                    setPostRetireReturn(8);
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
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
            {/* Primary Result: Target Corpus Required */}
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
                Target Corpus Required at Age {retirementAge}
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#1d4ed8', // Strong blue
                }}
              >
                {formatINR(targetCorpus)}
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: '4px' }}>
                (For {retirementExpenseYears} years of expense)
              </p>
            </div>

            {/* Secondary Result: Monthly Expense at Retirement */}
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
                Monthly Expense at Retirement
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#dc2626' }}
              >
                {formatINR(Math.round(monthlyExpenseAtRetirement))}
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: '4px' }}>
                (Inflated by {inflationPct}% over {yearsToRetirement} yrs)
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
                style={{ fontSize: '20px', fontWeight: 700, color: '#047857' }}
              >
                {formatINR(
                  requiredAdditionalCorpus > 0 ? requiredMonthlySIP : 0
                )}
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: '4px' }}>
                (To cover shortfall of {formatINR(requiredAdditionalCorpus)})
              </p>
            </div>

            {/* Secondary Result: Future Value of Current Savings */}
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
                Future Value of Current Savings
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(futureValueCurrentSavings)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-retirement">🌟 Understanding Retirement Planning</h2>
          <p>
            **Retirement planning** is the process of determining your income
            goals and the actions (savings, investments) necessary to achieve
            them after you stop working. The goal is to build a retirement
            **corpus**—a large sum of money—that is sufficient to sustain your
            desired lifestyle, adjusted for inflation, for the rest of your
            life.
          </p>
          <p>
            This calculator solves for the **Corpus Requirement** first, and
            then back-calculates the **Monthly SIP** needed to bridge the gap
            (shortfall) between your goal and your current savings potential.
          </p>
        </section>

        {/* 2. Key Challenges */}
        <section>
          <h2 id="challenges">
            ⚖️ The Two Main Challenges: Inflation & Longevity
          </h2>
          <p>Retirement planning must account for two major risks:</p>
          <div className="advantage-grid">
            <div
              className="advantage-card"
              style={{ borderLeft: '3px solid #dc2626' }}
            >
              <h3>1. Inflation Risk</h3>
              <p>
                Inflation causes your money to lose purchasing power. Your
                current monthly expense of **{formatINR(monthlyExpense)}** is
                expected to become **
                {formatINR(Math.round(monthlyExpenseAtRetirement))}** by the
                time you retire, meaning you need a much larger corpus to cover
                the same expenses.
              </p>
            </div>
            <div
              className="advantage-card"
              style={{ borderLeft: '3px solid #047857' }}
            >
              <h3>2. Longevity Risk</h3>
              <p>
                This is the risk of outliving your savings. By assuming a
                retirement period of **{retirementExpenseYears} years** (until
                age {retirementAge + retirementExpenseYears}), the calculator
                helps ensure your corpus lasts long enough while continuing to
                earn post-retirement returns.
              </p>
            </div>
          </div>
        </section>

        {/* 3. How the Calculator works */}
        <section>
          <h2 id="how-retirement-works">
            ⚙️ Calculation Logic: From Expense to SIP
          </h2>

          <p>The calculation follows a five-step financial modeling process:</p>

          <ol>
            <li>
              <strong>Future Expense (FE):</strong> Inflate today’s monthly
              expense (P) to the monthly expense needed at retirement age{' '}
              {'($E_{ret}$)'} using the inflation rate {'($r_{inf}$)'} over the
              years to retirement {'($T_{pre}$)'}.
            </li>

            <li>
              <strong>Target Corpus {'($C_{target}$)'}:</strong> Calculate the
              lump sum needed at retirement age to fund the inflated expense{' '}
              {'($E_{ret}$)'} for the full {retirementExpenseYears} years of
              retirement, factoring in the post-retirement return{' '}
              {'($r_{post}$)'}.
            </li>

            <li>
              <strong>
                Future Value of Current Savings {'($FV_{current}$)'}:
              </strong>
              Project how much your existing savings will grow by retirement age
              using the pre-retirement return rate {'($r_{pre}$)'}.
            </li>

            <li>
              <strong>Shortfall:</strong> Calculate the required additional
              savings needed: {'$C_{shortfall} = C_{target} - FV_{current}$'}.
            </li>

            <li>
              <strong>Required Monthly SIP:</strong> Back-calculate the fixed
              monthly SIP required to achieve the {'$C_{shortfall}$'} target
              over the {yearsToRetirement} years until retirement.
            </li>
          </ol>
        </section>

        {/* 4. Actionable Steps and Investment Mix */}
        <section>
          <h2 id="actions">📈 Actionable Steps for Achieving Your Corpus</h2>
          <p>
            To meet your **{formatINR(targetCorpus)}** target corpus, you must
            focus on maximizing returns and minimizing risk exposure as you age.
          </p>

          <h4>Investment Strategy:</h4>
          <ul>
            <li>
              **Early Years ({currentAge} - {retirementAge - 15}):** Focus
              heavily on high-growth, high-risk assets like Equity (70-80%
              allocation) to benefit from long-term compounding.
            </li>
            <li>
              **Mid Years (Last 15 Years):** Gradually de-risk by shifting
              allocation towards safer assets like Debt and Hybrid Funds (Equity
              50-60%).
            </li>
            <li>
              **Post-Retirement:** Shift aggressively into conservative
              instruments (Debt, Annuities, FDs) to protect the principal from
              market volatility.
            </li>
          </ul>
        </section>

        {/* 5. FAQ's */}
        <section>
          <h2 id="retirement-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                What is the Safe Withdrawal Rate (SWR)?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                The SWR is typically quoted as **4%** of the initial corpus
                (adjusted for inflation annually) that can be withdrawn in the
                first year of retirement while ensuring the fund lasts for 30
                years. Our calculator uses a modified approach based on real
                return rates to determine the necessary corpus.
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
                What return rate should I assume?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                This depends on your asset allocation. For long-term portfolios
                heavily skewed towards Equity (70%+), you may assume 12-14%. For
                a balanced portfolio, 10-12% is safer. Post-retirement, returns
                are typically conservative, around 6-8%.
              </p>
            </details>
          </div>
        </section>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          className="primary-cta"
          onClick={() => {
            const summary = `Retirement Plan: Age ${currentAge}, Goal ${retirementAge}. Target Corpus ${formatINR(
              targetCorpus
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
