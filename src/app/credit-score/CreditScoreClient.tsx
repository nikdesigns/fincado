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
    <section className="card">
      <h2>Credit Score Estimator & Action Planner</h2>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'grid', gap: 12 }}
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

      {/* Estimated Score */}
      <div className="result-grid emi-summary-strip" style={{ marginTop: 12 }}>
        <div className="result-card">
          <p className="result-label">Estimated Credit Score</p>
          <p className="result-primary" style={{ fontSize: 28 }}>
            {scoreEstimate}
          </p>
          <p style={{ marginTop: 8 }}>{scoreBand}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Key Drivers (approx contribution)</p>
          <ul>
            <li>Payment history: {breakdown.payment} pts</li>
            <li>Utilisation: {breakdown.util} pts</li>
            <li>Length of history: {breakdown.length} pts</li>
            <li>Credit mix: {breakdown.mix} pts</li>
            <li>Enquiries: {breakdown.enquiries} pts</li>
            <li>Accounts bonus: {breakdown.accountsBonus} pts</li>
            {breakdown.defaults ? (
              <li>Defaults penalty: {breakdown.defaults} pts</li>
            ) : null}
            {breakdown.settlements ? (
              <li>Settlements penalty: {breakdown.settlements} pts</li>
            ) : null}
          </ul>
        </div>

        <div className="result-card">
          <p className="result-label">Affirmations</p>
          <p style={{ fontSize: 14 }}>
            On-time payments and low utilization are the fastest ways to improve
            score.
          </p>
          <ol style={{ marginTop: 8 }}>
            <li>Keep credit utilisation &lt; 30% (ideally &lt; 20%).</li>
            <li>Pay all EMI & card dues on time — automate if possible.</li>
            <li>Avoid multiple new loan applications within 6–12 months.</li>
            <li>Keep oldest accounts open to preserve length of history.</li>
          </ol>
        </div>
      </div>

      {/* What-if paydown */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>What-if: Pay down credit card balances</h3>
        <p>
          Current balance: <strong>₹{formatNumber(currentBalance)}</strong> —
          new balance after paydown:{' '}
          <strong>₹{formatNumber(newBalance)}</strong> ({newUtilPct}%
          utilisation)
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
          This delta only reflects utilization component change. Full score
          change may differ and takes time to reflect in bureau reports.
        </p>
      </div>

      {/* Action checklist with priorities */}
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

      {/* Small FAQ / Notes */}
      <div className="article" style={{ marginTop: 16 }}>
        <h2>FAQ & Notes</h2>
        <dl>
          <dt>How long to see score improvement?</dt>
          <dd>
            Minor changes (utilisation) may reflect in 1–2 billing cycles; major
            changes (fixing defaults) can take months after lenders update
            bureau.
          </dd>

          <dt>Is this the official CIBIL score?</dt>
          <dd>
            No — this is an estimator to show levers you can control. For the
            official score, request your report from CIBIL/Experian/Equifax.
          </dd>
        </dl>
      </div>
    </section>
  );
}
