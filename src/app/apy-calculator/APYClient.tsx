// src/app/apy-calculator/APYClient.tsx
'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// --- APY Contribution Lookup Data (Approximate values for ₹5000 pension at age 60) ---
// Note: Actual contributions vary slightly based on bank/date, but these illustrate the concept.
// Source: Based on official APY charts assuming standard monthly payment frequency.
const APY_CONTRIBUTION_5000_PENSION = {
  18: 210,
  19: 228,
  20: 248,
  21: 269,
  22: 292,
  23: 318,
  24: 346,
  25: 376,
  26: 409,
  27: 446,
  28: 485,
  29: 529,
  30: 577,
  31: 630,
  32: 689,
  33: 752,
  34: 824,
  35: 902,
  36: 990,
  37: 1090,
  38: 1198,
  39: 1318,
  40: 1454,
};

// Fixed pension slabs
const PENSION_SLABS = [5000, 4000, 3000, 2000, 1000];

export default function APYClient() {
  // Inputs
  const [joiningAge, setJoiningAge] = useState<number>(30); // Must be 18-40
  const [desiredPension, setDesiredPension] = useState<number>(5000); // 1k-5k slab
  const [contributionFrequency, setContributionFrequency] = useState<
    'Monthly' | 'Quarterly' | 'Half-Yearly'
  >('Monthly');

  // Fixed EPF parameters for calculation illustration
  const RETIREMENT_AGE = 60;
  const ASSUMED_RETURN_PCT = 8; // APY calculation uses assumed returns, currently around 8%

  // Derived Values
  const yearsOfContribution = Math.max(0, RETIREMENT_AGE - joiningAge);
  const monthlyRate = ASSUMED_RETURN_PCT / 12 / 100;

  // --- Step 1: Determine Required Monthly Contribution ---
  const requiredMonthlyContribution = useMemo(() => {
    // Get the base monthly contribution for the 5000 slab
    const baseContrib5000 =
      APY_CONTRIBUTION_5000_PENSION[
        joiningAge as keyof typeof APY_CONTRIBUTION_5000_PENSION
      ] || 0;

    // Scale it down based on the desired pension slab
    const scaleFactor = desiredPension / 5000;
    const monthly = Math.round(baseContrib5000 * scaleFactor);

    if (contributionFrequency === 'Monthly') return monthly;
    if (contributionFrequency === 'Quarterly')
      return Math.round(monthly * 3 * 1.01); // Small adjustment factor for higher frequency
    if (contributionFrequency === 'Half-Yearly')
      return Math.round(monthly * 6 * 1.03); // Larger adjustment factor

    return monthly;
  }, [joiningAge, desiredPension, contributionFrequency]);

  // --- Step 2: Calculate Total Contribution and Pension Wealth ---
  const { totalContribution, estimatedPensionWealth } = useMemo(() => {
    const totalMonths = yearsOfContribution * 12;
    const periodicContribution = requiredMonthlyContribution;

    // Use monthly contributions for simple sum
    const totalC = Math.round(requiredMonthlyContribution * totalMonths);

    // Pension Wealth is calculated using FV of Annuity (simplified)
    // FV = P * [ ((1+r)^n - 1) / r ] * (1+r) -- using monthly inputs for illustration
    const r = monthlyRate;
    const n = totalMonths;
    let wealth = 0;

    if (n > 0) {
      if (r === 0) {
        wealth = totalC;
      } else {
        // Annuity Due Formula (payments at start of period)
        const annuityFactor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        wealth = periodicContribution * annuityFactor;
      }
    }

    // The guaranteed APY exit corpus is:
    // ₹1.7 Lakh for 1k pension, up to ₹8.5 Lakh for 5k pension (approx)
    const guaranteedWealth = desiredPension * 170; // 170 factor is a standard APY multiplier

    return {
      totalContribution: totalC,
      // The scheme guarantees a return, so we show the greater of the estimated or guaranteed wealth
      estimatedPensionWealth: Math.max(Math.round(wealth), guaranteedWealth),
    };
  }, [
    requiredMonthlyContribution,
    yearsOfContribution,
    monthlyRate,
    desiredPension,
  ]);

  // --- Step 3: Calculate Lump Sum Nominee Receives (at 60) ---
  const lumpSumNominee = useMemo(() => {
    // Nominee corpus is fixed by APY chart based on pension slab.
    // ₹5000 pension = ~₹8.5 Lakh
    const baseLumpSum = 850000;
    return Math.round(baseLumpSum * (desiredPension / 5000));
  }, [desiredPension]);

  // --- Final Output Summary ---
  const finalCorpus = estimatedPensionWealth;

  // Helper setter
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let v = Number(e.target.value || 0);
      if (e.target.id === 'joiningAge') v = Math.max(18, Math.min(40, v));
      fn(v);
    };

  return (
    <section className="article">
      <div>
        <h1>🇮🇳 Atal Pension Yojana (APY) Calculator</h1>

        {/* INPUTS AND CHART SPLIT */}
        <div className="emi-split" style={{ marginTop: 18 }}>
          <div className="emi-left">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'grid', gap: 12 }}
            >
              <div className="form-row">
                <label>
                  Age at Joining (18-40 years)
                  <input
                    id="joiningAge"
                    type="number"
                    value={joiningAge}
                    onChange={setter(setJoiningAge)}
                    min={18}
                    max={40}
                    required
                  />
                </label>

                <label>
                  Desired Monthly Pension (₹)
                  <select
                    value={desiredPension}
                    onChange={(e) => setDesiredPension(Number(e.target.value))}
                    required
                  >
                    {PENSION_SLABS.map((p) => (
                      <option key={p} value={p}>
                        {formatINR(p)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Contribution Frequency
                  <select
                    value={contributionFrequency}
                    onChange={(e) =>
                      setContributionFrequency(e.target.value as never)
                    }
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half-Yearly">Half-Yearly</option>
                  </select>
                </label>

                <label>
                  Years of Contribution (Fixed)
                  <input
                    type="number"
                    value={yearsOfContribution}
                    readOnly
                    style={{
                      backgroundColor: '#f3f4f6',
                      cursor: 'not-allowed',
                    }}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-cta">Calculate</button>
                <button
                  type="button"
                  onClick={() => {
                    setJoiningAge(30);
                    setDesiredPension(5000);
                    setContributionFrequency('Monthly');
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: APY Summary Box (No chart needed due to guaranteed return structure) */}
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
              className="summary-box"
              style={{
                width: '100%',
                maxWidth: '300px',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#fff',
                border: '2px solid #a0e870',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  margin: '0 0 10px',
                  fontSize: '18px',
                  color: '#1f2937',
                }}
              >
                Required Contribution
              </h3>
              <div
                style={{ padding: '8px 0', borderBottom: '1px dashed #eee' }}
              >
                <p style={{ margin: 0, color: '#6b7280' }}>
                  Monthly Contribution (Est.)
                </p>
                <strong style={{ fontSize: '1.6em', color: '#dc2626' }}>
                  {formatINR(requiredMonthlyContribution)}
                </strong>
              </div>
              <div style={{ padding: '8px 0', border: 'none' }}>
                <p style={{ margin: 0, color: '#6b7280' }}>
                  Total Contribution over {yearsOfContribution} years
                </p>
                <strong style={{ fontSize: '1.2em' }}>
                  {formatINR(totalContribution)}
                </strong>
              </div>
            </div>
          </aside>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h3>Key Scheme Details</h3>
          <ul>
            <li>
              **Minimum Contribution Period:** {yearsOfContribution} years
            </li>
            <li>**Pension Start Age:** 60 years</li>
            <li>
              **Tax Benefit:** Contributions are eligible under **Section
              80CCD(1)**.
            </li>
          </ul>
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
            {/* Primary Result: Guaranteed Pension */}
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
                <span role="img" aria-label="Pension">
                  ✅
                </span>{' '}
                Guaranteed Monthly Pension
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#1d4ed8', // Primary focus
                }}
              >
                {formatINR(desiredPension)}
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: '4px' }}>
                Paid from age 60 until death
              </p>
            </div>

            {/* Secondary Result: Pension Wealth */}
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
                <span role="img" aria-label="Corpus">
                  🏦
                </span>{' '}
                Pension Wealth at Age 60
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(finalCorpus)}
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: '4px' }}>
                (Lump sum returned to nominee/spouse after both demise)
              </p>
            </div>

            {/* Secondary Result: Spouse Pension */}
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
                <span role="img" aria-label="Spouse">
                  🧡
                </span>{' '}
                Spouse Pension Guarantee
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#047857' }}
              >
                {formatINR(desiredPension)}
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: '4px' }}>
                Continues until spouse&apos;s death
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-apy">🌟 What is Atal Pension Yojana (APY)?</h2>
          <p>
            The **Atal Pension Yojana (APY)** is a social security scheme
            launched by the Government of India, primarily aimed at providing
            guaranteed pension income to workers in the **unorganized sector**.
            It offers a minimum guaranteed pension of ₹1,000 to ₹5,000 per month
            starting at age 60, regardless of the scheme&apos;s actual returns.
          </p>
          <p>
            The scheme is designed to address longevity risk and encourage
            voluntary saving for retirement. **Contributions are fixed** based
            on the age of joining and the chosen pension slab. [Image
            illustrating the APY Triple Guarantee]
          </p>
        </section>

        {/* 2. Key Challenges */}
        <section>
          <h2 id="eligibility">🎯 Eligibility and Contribution Rules</h2>
          <p>
            APY is open to all citizens, provided they meet strict age and tax
            criteria:
          </p>
          <ul>
            <li>
              **Joining Age:** Must be between **18 and 40 years**. Joining
              later requires a significantly higher monthly contribution.
            </li>
            <li>
              **Contribution Period:** Fixed contribution period until the age
              of 60, guaranteeing a minimum of 20 years of contribution.
            </li>
            <li>
              **Exclusion:** Individuals who are or have been income tax payers
              are **not eligible** to join APY (effective from Oct 1, 2022).
            </li>
            <li>
              **Auto-Debit:** Contributions must be made via auto-debit from a
              savings bank account (monthly, quarterly, or half-yearly).
            </li>
          </ul>
        </section>

        {/* 3. Benefits and Tax Advantages */}
        <section>
          <h2 id="benefits">✅ Guaranteed Benefits and Tax Advantages</h2>
          <p>
            APY provides financial security through defined benefits and
            government backing:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Government Guarantee</h3>
              <p>
                The minimum pension amount (₹1k–₹5k) is guaranteed by the
                Government of India. Any shortfall in returns is covered by the
                government.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Guaranteed Family Pension</h3>
              <p>
                Upon the subscriber&apos;s death, the **spouse** is guaranteed
                to receive the same pension amount until their death.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Tax Benefit (80CCD)</h3>
              <p>
                Contributions are eligible for tax deduction under **Section
                80CCD(1)** of the Income Tax Act.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Nominee Corpus</h3>
              <p>
                After the demise of both the subscriber and spouse, the nominee
                receives the entire accumulated **Pension Wealth** (the lump sum
                corpus).{' '}
              </p>
            </div>
          </div>
        </section>

        {/* 4. How the Calculator works */}
        <section>
          <h2 id="how-apy-works">⚙️ APY Contribution and Wealth Calculation</h2>

          <p>
            The APY is a defined benefit scheme, meaning the contributions are
            determined by the desired outcome (pension amount) and the risk
            taken by the government.
          </p>

          <h4>Determining Monthly Contribution:</h4>
          <p>
            The monthly contribution is fixed according to official charts
            (which assume an underlying rate, historically around 8%). The
            earlier the joining age, the lower the required monthly
            contribution.
          </p>

          <h4>Nominee Wealth Calculation (Simplified):</h4>
          <p>
            The pension wealth is guaranteed to be sufficient to provide the
            monthly pension. The simplified lump-sum return to the nominee is
            approximately:
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
            Nominee Corpus ≈ Monthly Pension &times; 170
          </div>
          <p>
            *Example: A ₹5,000 monthly pension corresponds to a corpus of
            roughly ₹8.5 Lakhs returned to the nominee.*
          </p>
        </section>

        {/* 5. FAQ's */}
        <section>
          <h2 id="apy-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                What happens if I miss a monthly contribution?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                The account will be treated as defaulted. You must pay
                contributions for the overdue period along with a small penalty
                (ranging from ₹1 to ₹10 per month, depending on the contribution
                amount) to regularize the account.
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
                Can I exit the scheme before age 60?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Voluntary exit before age 60 is generally **not permitted**,
                except in the case of the subscriber&apos;s death or terminal
                illness. If voluntary exit is allowed, you will only receive
                your contributions plus the net accrued interest, and you lose
                the government guarantee.
              </p>
            </details>
          </div>
        </section>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          className="primary-cta"
          onClick={() => {
            const summary = `APY: Age ${joiningAge}, Pension ${formatINR(
              desiredPension
            )}, Contrib ${formatINR(
              requiredMonthlyContribution
            )}/${contributionFrequency} for ${yearsOfContribution} years.`;
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
