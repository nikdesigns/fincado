'use client';
import React, { useMemo, useState } from 'react';

function formatNumber(n: number) {
  return n.toLocaleString('en-IN');
}

/**
 * NOTE: This is an illustrative estimator only.
 * Real credit scores are produced by bureaus using proprietary algorithms.
 */

export default function CreditScoreClient() {
  // Input factors (defaults chosen to demonstrate behavior)
  const [onTimePaymentsPct, setOnTimePaymentsPct] = useState<number>(95); // 0-100
  const [creditUtilizationPct, setCreditUtilizationPct] = useState<number>(45); // % of total credit used
  const [numActiveCreditAccounts, setNumActiveCreditAccounts] =
    useState<number>(3);
  const [avgAccountAgeYears, setAvgAccountAgeYears] = useState<number>(5);
  const [numRecentEnquiries, setNumRecentEnquiries] = useState<number>(2); // last 12 months
  const [percentInstallmentLoans, setPercentInstallmentLoans] =
    useState<number>(50); // share of installment (EMI) vs revolving (card)
  const [hasDefaults, setHasDefaults] = useState<boolean>(false);
  const [hasSettlements, setHasSettlements] = useState<boolean>(false);

  // Basic scoring weights inspired by common public guidance (illustrative)
  // Payment history (35%), Utilization (30%), Length (15%), New credit (10%), Mix (10%)
  const scoreEstimate = useMemo(() => {
    // start with base 300
    let score = 300;

    // Payment history (0-35% of 600 range roughly => up to +210)
    const payFactor = onTimePaymentsPct / 100; // 0..1
    score += Math.round(210 * payFactor);

    // Utilization: ideal <30% -> give full points at <=20%, linear decline to 0 at 100%
    const util = Math.min(100, Math.max(0, creditUtilizationPct));
    const utilScore =
      util <= 20 ? 180 : Math.round(Math.max(0, 180 * (1 - (util - 20) / 80)));
    // utilScore max 180
    score += utilScore;

    // Length of credit: scaled 0..90 (max for long avg age >=10 years)
    const age = Math.max(0, avgAccountAgeYears);
    const lengthScore = Math.round(Math.min(1, age / 10) * 90);
    score += lengthScore;

    // New credit (enquiries): score penalty up to 60 points if many enquiries (>=10)
    const enquiries = Math.max(0, numRecentEnquiries);
    const enquiriesPenalty = Math.round(Math.min(1, enquiries / 10) * 60);
    score -= enquiriesPenalty;

    // Credit mix (installments good): mixScore 0..60
    const mix = Math.max(0, Math.min(100, percentInstallmentLoans));
    const mixScore = Math.round((mix / 100) * 60);
    score += mixScore;

    // Active accounts: small penalty for too many (risk) or too few (no history)
    // reward 1-5 accounts; beyond that small penalty
    if (numActiveCreditAccounts >= 1 && numActiveCreditAccounts <= 5) {
      score += 20;
    } else if (numActiveCreditAccounts > 8) {
      score -= 10;
    }

    // Defaults and settlements are heavy penalties
    if (hasDefaults) score -= 150;
    if (hasSettlements) score -= 80;

    // clamp to 300..900
    score = Math.max(300, Math.min(900, score));
    return score;
  }, [
    onTimePaymentsPct,
    creditUtilizationPct,
    avgAccountAgeYears,
    numRecentEnquiries,
    percentInstallmentLoans,
    numActiveCreditAccounts,
    hasDefaults,
    hasSettlements,
  ]);

  // Breakdown for UI to show contribution
  const breakdown = useMemo(() => {
    const payment = Math.round((onTimePaymentsPct / 100) * 210);
    const util = (() => {
      const util = Math.min(100, Math.max(0, creditUtilizationPct));
      return util <= 20
        ? 180
        : Math.round(Math.max(0, 180 * (1 - (util - 20) / 80)));
    })();
    const length = Math.round(
      Math.min(1, Math.max(0, avgAccountAgeYears / 10)) * 90
    );
    const enquiries = -Math.round(
      Math.min(1, Math.max(0, numRecentEnquiries / 10)) * 60
    );
    const mix = Math.round(
      (Math.min(100, Math.max(0, percentInstallmentLoans)) / 100) * 60
    );
    const accountsBonus =
      numActiveCreditAccounts >= 1 && numActiveCreditAccounts <= 5
        ? 20
        : numActiveCreditAccounts > 8
        ? -10
        : 0;
    const defaults = hasDefaults ? -150 : 0;
    const settlements = hasSettlements ? -80 : 0;

    return {
      payment,
      util,
      length,
      enquiries,
      mix,
      accountsBonus,
      defaults,
      settlements,
    };
  }, [
    onTimePaymentsPct,
    creditUtilizationPct,
    avgAccountAgeYears,
    numRecentEnquiries,
    percentInstallmentLoans,
    numActiveCreditAccounts,
    hasDefaults,
    hasSettlements,
  ]);

  // "What if" paydown calculator: show new utilization if you pay X off credit cards
  const [paydownAmount, setPaydownAmount] = useState<number>(0);
  const [totalCardLimit, setTotalCardLimit] = useState<number>(200000); // total credit limit
  const currentBalance = useMemo(
    () => Math.round((creditUtilizationPct / 100) * totalCardLimit),
    [creditUtilizationPct, totalCardLimit]
  );
  const newBalance = useMemo(
    () => Math.max(0, currentBalance - paydownAmount),
    [currentBalance, paydownAmount]
  );
  const newUtilPct = useMemo(
    () =>
      totalCardLimit > 0 ? Math.round((newBalance / totalCardLimit) * 100) : 0,
    [newBalance, totalCardLimit]
  );

  // simulate score delta from the hypothetical new utilization (recompute util part)
  const utilScoreFor = (utilPct: number) => {
    const util = Math.min(100, Math.max(0, utilPct));
    return util <= 20
      ? 180
      : Math.round(Math.max(0, 180 * (1 - (util - 20) / 80)));
  };
  const currentUtilScore = useMemo(
    () => utilScoreFor(creditUtilizationPct),
    [creditUtilizationPct]
  );
  const newUtilScore = useMemo(() => utilScoreFor(newUtilPct), [newUtilPct]);

  const estimatedDelta = useMemo(() => {
    // delta from util change only (other factors unchanged)
    return newUtilScore - currentUtilScore;
  }, [newUtilScore, currentUtilScore]);

  // helper to describe score band
  const scoreBand = useMemo(() => {
    const s = scoreEstimate;
    if (s >= 800) return 'Excellent (800–900)';
    if (s >= 700) return 'Good (700–799)';
    if (s >= 650) return 'Fair (650–699)';
    return 'Poor (<650)';
  }, [scoreEstimate]);

  return (
    <section className="article">
      <div className="card">
        <h1>🔍 Credit Score Estimator & Action Planner</h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'grid', gap: 12, marginTop: '16px' }}
        >
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
          >
            <label>
              On-time payments (%) — last 24 months
              <input
                type="number"
                min={0}
                max={100}
                value={onTimePaymentsPct}
                onChange={(e) =>
                  setOnTimePaymentsPct(Number(e.target.value || 0))
                }
              />
            </label>

            <label>
              Credit utilization (%) — total across cards
              <input
                type="number"
                min={0}
                max={100}
                value={creditUtilizationPct}
                onChange={(e) =>
                  setCreditUtilizationPct(Number(e.target.value || 0))
                }
              />
            </label>
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
          >
            <label>
              Total card limit (₹)
              <input
                type="number"
                min={0}
                value={totalCardLimit}
                onChange={(e) => setTotalCardLimit(Number(e.target.value || 0))}
              />
            </label>

            <label>
              Current card balance (auto)
              <input
                type="text"
                readOnly
                value={`₹${formatNumber(currentBalance)}`}
              />
            </label>
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
          >
            <label>
              Number of active credit accounts
              <input
                type="number"
                min={0}
                value={numActiveCreditAccounts}
                onChange={(e) =>
                  setNumActiveCreditAccounts(Number(e.target.value || 0))
                }
              />
            </label>

            <label>
              Average account age (years)
              <input
                type="number"
                min={0}
                step="0.5"
                value={avgAccountAgeYears}
                onChange={(e) =>
                  setAvgAccountAgeYears(Number(e.target.value || 0))
                }
              />
            </label>
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
          >
            <label>
              Recent enquiries (last 12 months)
              <input
                type="number"
                min={0}
                value={numRecentEnquiries}
                onChange={(e) =>
                  setNumRecentEnquiries(Number(e.target.value || 0))
                }
              />
            </label>

            <label>
              % installment (EMI) loans vs cards
              <input
                type="number"
                min={0}
                max={100}
                value={percentInstallmentLoans}
                onChange={(e) =>
                  setPercentInstallmentLoans(Number(e.target.value || 0))
                }
              />
            </label>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={hasDefaults}
                onChange={(e) => setHasDefaults(e.target.checked)}
              />
              I have had defaults / missed payments
            </label>

            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={hasSettlements}
                onChange={(e) => setHasSettlements(e.target.checked)}
              />
              I have settled accounts (partial/settlement)
            </label>
          </div>
        </form>

        {/* Estimated Score Results - REFINED STYLING */}
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
            {/* Primary Result: Estimated Credit Score */}
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
                <span role="img" aria-label="Score">
                  ⭐
                </span>{' '}
                Estimated Credit Score
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: scoreEstimate >= 700 ? '#047857' : '#f59e0b',
                }}
              >
                {scoreEstimate}
              </p>
              <p style={{ marginTop: 4, fontWeight: 600 }}>{scoreBand}</p>
            </div>

            {/* Breakdown */}
            <div
              className="result-card"
              style={{
                gridColumn: 'span 2',
                padding: '10px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Key Drivers">
                  🔑
                </span>{' '}
                Key Drivers (Approximate Impact)
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginTop: '8px',
                  fontSize: '14px',
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  <p style={{ color: '#10b981' }}>
                    Payment History: +{breakdown.payment} pts
                  </p>
                  <p style={{ color: '#10b981' }}>
                    Utilization: +{breakdown.util} pts
                  </p>
                  <p style={{ color: '#10b981' }}>
                    Length of History: +{breakdown.length} pts
                  </p>
                </div>
                <div style={{ fontWeight: 600 }}>
                  <p style={{ color: '#10b981' }}>
                    Credit Mix: +{breakdown.mix} pts
                  </p>
                  <p
                    style={{
                      color: breakdown.enquiries < 0 ? 'crimson' : '#10b981',
                    }}
                  >
                    Enquiries/New Credit: {breakdown.enquiries} pts
                  </p>
                  {breakdown.defaults !== 0 && (
                    <p style={{ color: 'crimson' }}>
                      Defaults Penalty: {breakdown.defaults} pts
                    </p>
                  )}
                  {breakdown.settlements !== 0 && (
                    <p style={{ color: 'crimson' }}>
                      Settlements Penalty: {breakdown.settlements} pts
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Affirmations / Quick Wins */}
            <div
              className="result-card"
              style={{
                gridColumn: 'span 3',
                padding: '10px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Tips">
                  ✅
                </span>{' '}
                Quick Improvement Tips
              </p>
              <ol style={{ marginTop: 8, paddingLeft: 20 }}>
                <li>Keep utilization &lt; 30% (ideally &lt; 20%).</li>
                <li>Pay all dues on time — use auto-debit.</li>
                <li>
                  Avoid multiple new loan applications (hard enquiries) within 6
                  months.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* What-if paydown */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>
          <span role="img" aria-label="What If">
            🤔
          </span>{' '}
          What-if: Pay Down Utilization
        </h3>
        <p style={{ marginBottom: '10px' }}>
          Current balance: **₹{formatNumber(currentBalance)}** (at{' '}
          {creditUtilizationPct}% Util.). New balance after paydown: **₹
          {formatNumber(newBalance)}** ({newUtilPct}% Util.)
        </p>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          <label>
            Paydown amount (₹)
            <input
              type="number"
              min={0}
              value={paydownAmount}
              onChange={(e) => setPaydownAmount(Number(e.target.value || 0))}
            />
          </label>

          <label>
            Total card limit (₹)
            <input
              type="number"
              min={1}
              value={totalCardLimit}
              onChange={(e) => setTotalCardLimit(Number(e.target.value || 1))}
            />
          </label>
        </div>

        <p style={{ marginTop: 12 }}>
          Estimated score change from utilization improvement:{' '}
          <strong style={{ color: estimatedDelta >= 0 ? 'green' : 'crimson' }}>
            {estimatedDelta >= 0 ? '+' : ''}
            {estimatedDelta}
          </strong>{' '}
          pts
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          This change reflects the utilization component only. Reducing
          utilization is the fastest way to boost your score.
        </p>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-score">🌟 What is a Credit Score (CIBIL/Experian)?</h2>
          <p>
            A **Credit Score** is a three-digit number (ranging from 300 to 900
            in India) used by lenders to assess your creditworthiness. It
            summarizes your credit history, including repayment behavior and
            debt levels. A higher score indicates a lower risk to the lender,
            resulting in better interest rates and easier loan approval.
          </p>
          <p>
            In India, the most popular credit bureaus are CIBIL, Experian, and
            Equifax. This tool provides an estimate based on commonly accepted
            industry factors.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who Should Use This Estimator?</h2>
          <p>
            This calculator is essential for anyone planning a major financial
            application:
          </p>
          <ul>
            <li>
              **Future Loan Applicants:** To estimate their score before
              applying for a Home Loan, Car Loan, or Personal Loan.
            </li>
            <li>
              **Credit Card Users:** To monitor the impact of their spending
              habits (utilization) on their financial profile.
            </li>
            <li>
              **Individuals Improving Score:** To quantify the estimated point
              gain from fixing defaults or paying down debt.
            </li>
          </ul>
        </section>

        {/* 3. How can the Score Planner help you? */}
        <section>
          <h2 id="how-score-helps">💡 How This Score Planner Helps You</h2>
          <p>
            The planner gives you control over the levers that influence your
            score:
          </p>
          <ul>
            <li>
              **Factor Breakdown:** Shows which components (e.g., payment
              history, length of credit) are helping or hurting your score.
            </li>
            <li>
              **Actionable Advice:** Provides a prioritized checklist of steps
              needed to move into a &apos;Good&apos; or &apos;Excellent&apos;
              score band.
            </li>
            <li>
              **What-if Scenario:** The paydown tool directly links reducing
              credit card debt to a potential score increase, motivating
              immediate action.
            </li>
          </ul>
        </section>

        {/* 4. How the score is estimated (Formula/Logic) */}
        <section>
          <h2 id="how-score-works">
            ⚙️ Credit Score Estimation Logic (Key Factors)
          </h2>

          <p>
            Although the exact formulas are proprietary, credit scores are
            primarily based on these five weighted categories (approximated
            based on CIBIL guidance):
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            <div>
              <h4>Primary Factors (Highest Impact)</h4>
              <ul>
                <li>
                  **Payment History (Approx. 35%):** Timeliness of past loan and
                  card payments. *Impact in tool: +{breakdown.payment} pts*
                </li>
                <li>
                  **Credit Utilization (Approx. 30%):** The percentage of your
                  total available credit limit that you are currently using.
                  Keep this low (&lt;30%). *Impact in tool: +{breakdown.util}{' '}
                  pts*
                </li>
              </ul>
            </div>
            <div>
              <h4>Secondary Factors (Moderate Impact)</h4>
              <ul>
                <li>
                  **Length of Credit History (Approx. 15%):** How long your
                  oldest and newest accounts have been open.
                </li>
                <li>
                  **Credit Mix (Approx. 10%):** Having a healthy mix of secured
                  loans (home/auto) and unsecured loans (credit cards).
                </li>
                <li>
                  **New Credit/Enquiries (Approx. 10%):** Numerous loan
                  enquiries in a short time can signal higher risk.
                </li>
              </ul>
            </div>
          </div>

          <h4 style={{ marginTop: 12 }}>Scoring Calculation Basis</h4>
          <p>
            The calculator begins with a base score of 300 and adds points based
            on favorable factors (e.g., low utilization, long history) and
            subtracts heavy penalties for negative marks (defaults/settlements).
            The final score is clamped between 300 and 900.
          </p>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="score-advantages">
            ✅ Advantages of a High Credit Score (750+)
          </h2>
          <p>
            A good credit score is your passport to cheaper borrowing and better
            financial terms:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Lower Interest Rates</h3>
              <p>
                Lenders offer the lowest available interest rates on home loans,
                car loans, and personal loans to borrowers with high scores
                (750+).
              </p>
            </div>
            <div className="advantage-card">
              <h3>Faster Loan Approval</h3>
              <p>
                High scores often lead to quicker processing times and less
                scrutiny during the underwriting process.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Higher Loan Amounts</h3>
              <p>
                Banks are willing to sanction larger loan amounts and higher
                credit card limits to trustworthy borrowers.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Better Negotiation Power</h3>
              <p>
                A strong score gives you leverage to negotiate lower processing
                fees and more favorable repayment terms.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="score-faqs">❓ Frequently Asked Questions (FAQs)</h2>
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
                What is Credit Utilization and what is the ideal limit?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                Credit Utilization is the ratio of your outstanding credit card
                balance to your total available credit limit. The ideal
                utilization rate is **below 30%**, and keeping it below **20%**
                is often required for an excellent score.
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
                How do &apos;hard enquiries&apos; affect my score?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                A &apos;hard enquiry&apos; occurs when you formally apply for a
                new loan or credit card. Too many hard enquiries (more than 3-4)
                in a short period (6–12 months) suggest financial distress to
                lenders and can temporarily lower your score.
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
                If I pay off a loan, should I close the account?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                It is generally advised to keep your oldest, well-managed
                accounts (like credit cards) open, even if unused. Closing them
                reduces your total available credit (increasing utilization) and
                shortens the length of your credit history, both of which can
                negatively impact your score.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* Action checklist with priorities (moved to be full width at the bottom) */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Action Plan (prioritised)</h3>
        <ol>
          <li>
            <strong>Fix missed payments</strong> — contact lender to regularise;
            set up auto-debit.
          </li>
          <li>
            <strong>Lower utilisation</strong> — pay down high-balance cards or
            request higher limits (responsibly).
          </li>
          <li>
            <strong>Avoid new credit</strong> for a few months if you have
            multiple enquiries.
          </li>
          <li>
            <strong>Keep oldest accounts</strong> open; closing them can reduce
            average age.
          </li>
          <li>
            <strong>Mix credit</strong> responsibly — a combination of 1–2
            installment loans and 1–3 cards is healthy.
          </li>
        </ol>
      </div>
    </section>
  );
}
