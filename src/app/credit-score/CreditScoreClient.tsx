'use client';

import React, { useMemo, useState } from 'react';

// Helper: Format Number
const formatNumber = (n: number) => n.toLocaleString('en-IN');

export default function CreditScoreClient() {
  // --- STATE ---
  const [onTimePaymentsPct, setOnTimePaymentsPct] = useState<number>(95);
  const [creditUtilizationPct, setCreditUtilizationPct] = useState<number>(45);
  const [numActiveCreditAccounts, setNumActiveCreditAccounts] =
    useState<number>(3);
  const [avgAccountAgeYears, setAvgAccountAgeYears] = useState<number>(5);
  const [numRecentEnquiries, setNumRecentEnquiries] = useState<number>(2);
  const [percentInstallmentLoans, setPercentInstallmentLoans] =
    useState<number>(50); // Mix

  const [hasDefaults, setHasDefaults] = useState<boolean>(false);
  const [hasSettlements, setHasSettlements] = useState<boolean>(false);

  // What-If Paydown State
  const [paydownAmount, setPaydownAmount] = useState<number>(0);
  const [totalCardLimit, setTotalCardLimit] = useState<number>(200000);

  // --- HELPER: Range Background ---
  const getRangeBackground = (
    val: number,
    min: number,
    max: number,
    color = '#2563eb'
  ) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS: Score Estimate ---
  const scoreEstimate = useMemo(() => {
    let score = 300; // Base

    // 1. Payment History (35%) -> Max ~210 pts
    const payFactor = onTimePaymentsPct / 100;
    score += Math.round(210 * payFactor);

    // 2. Utilization (30%) -> Max ~180 pts
    // Ideal < 30%. Linear decline as utilization goes up.
    const util = Math.min(100, Math.max(0, creditUtilizationPct));
    let utilScore = 0;
    if (util <= 20) utilScore = 180;
    else utilScore = Math.round(Math.max(0, 180 * (1 - (util - 20) / 80)));
    score += utilScore;

    // 3. Length of History (15%) -> Max ~90 pts
    // Max points at 10+ years
    const lengthScore = Math.round(Math.min(1, avgAccountAgeYears / 10) * 90);
    score += lengthScore;

    // 4. New Credit / Enquiries (10%) -> Penalty
    // Penalty up to 60 pts for >10 enquiries
    const enquiriesPenalty = Math.round(
      Math.min(1, numRecentEnquiries / 10) * 60
    );
    score -= enquiriesPenalty;

    // 5. Credit Mix (10%) -> Max ~60 pts
    // Higher installment % (secured) is generally better than 100% revolving
    const mixScore = Math.round((percentInstallmentLoans / 100) * 60);
    score += mixScore;

    // 6. Active Accounts Bonus/Penalty
    if (numActiveCreditAccounts >= 1 && numActiveCreditAccounts <= 5)
      score += 20;
    else if (numActiveCreditAccounts > 8) score -= 10;

    // 7. Negative Marks
    if (hasDefaults) score -= 150;
    if (hasSettlements) score -= 80;

    return Math.max(300, Math.min(900, score));
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

  // --- CALCULATIONS: What-If Paydown ---
  const paydownAnalysis = useMemo(() => {
    const currentBalance = Math.round(
      (creditUtilizationPct / 100) * totalCardLimit
    );
    const newBalance = Math.max(0, currentBalance - paydownAmount);
    const newUtilPct =
      totalCardLimit > 0 ? Math.round((newBalance / totalCardLimit) * 100) : 0;

    // Calculate Util Score Delta
    const getUtilScore = (u: number) =>
      u <= 20 ? 180 : Math.round(Math.max(0, 180 * (1 - (u - 20) / 80)));
    const currentUtilScore = getUtilScore(creditUtilizationPct);
    const newUtilScore = getUtilScore(newUtilPct);

    const scoreImprovement = newUtilScore - currentUtilScore;

    return { currentBalance, newBalance, newUtilPct, scoreImprovement };
  }, [creditUtilizationPct, totalCardLimit, paydownAmount]);

  // Helper score band color
  const getScoreColor = (s: number) => {
    if (s >= 750) return '#16a34a'; // Green
    if (s >= 650) return '#ea580c'; // Orange
    return '#dc2626'; // Red
  };

  // Safe Setter
  const numSetter =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(Number(e.target.value) || 0);

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* --- LEFT: INPUTS --- */}
        <div className="calc-inputs">
          {/* Payment History */}
          <div className="input-group">
            <label>
              On-Time Payments (%){' '}
              <span style={{ fontSize: 11, color: '#666' }}>(Last 24 mo)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                value={onTimePaymentsPct}
                onChange={numSetter(setOnTimePaymentsPct)}
                min={0}
                max={100}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={onTimePaymentsPct}
              onChange={numSetter(setOnTimePaymentsPct)}
              style={{
                background: getRangeBackground(
                  onTimePaymentsPct,
                  0,
                  100,
                  '#16a34a'
                ),
              }}
            />
          </div>

          {/* Utilization */}
          <div className="input-group">
            <label>
              Credit Utilization (%){' '}
              <span style={{ fontSize: 11, color: '#666' }}>
                (Total Used / Limit)
              </span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                value={creditUtilizationPct}
                onChange={numSetter(setCreditUtilizationPct)}
                min={0}
                max={100}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={creditUtilizationPct}
              onChange={numSetter(setCreditUtilizationPct)}
              style={{
                background: getRangeBackground(
                  creditUtilizationPct,
                  0,
                  100,
                  '#dc2626'
                ),
              }}
            />
          </div>

          {/* Account Details */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Avg Age (Yrs)</label>
              <input
                className="input-small"
                type="number"
                value={avgAccountAgeYears}
                onChange={numSetter(setAvgAccountAgeYears)}
              />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Active Accounts</label>
              <input
                className="input-small"
                type="number"
                value={numActiveCreditAccounts}
                onChange={numSetter(setNumActiveCreditAccounts)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Recent Enquiries</label>
              <input
                className="input-small"
                type="number"
                value={numRecentEnquiries}
                onChange={numSetter(setNumRecentEnquiries)}
              />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Loan Mix (%)</label>
              <input
                className="input-small"
                type="number"
                value={percentInstallmentLoans}
                onChange={numSetter(setPercentInstallmentLoans)}
                title="% of Installment loans vs Cards"
              />
            </div>
          </div>

          {/* Negative Marks */}
          <div
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={hasDefaults}
                onChange={(e) => setHasDefaults(e.target.checked)}
              />
              Has Defaults
            </label>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={hasSettlements}
                onChange={(e) => setHasSettlements(e.target.checked)}
              />
              Has Settlements
            </label>
          </div>
        </div>

        {/* --- RIGHT: VISUALS --- */}
        <div className="calc-visuals">
          {/* Score Guage / Display */}
          <div
            style={{
              textAlign: 'center',
              padding: 20,
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
              Estimated Score
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: getScoreColor(scoreEstimate),
                lineHeight: 1,
              }}
            >
              {scoreEstimate}
            </div>
            <div
              style={{
                marginTop: 8,
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 20,
                background: getScoreColor(scoreEstimate) + '20',
                color: getScoreColor(scoreEstimate),
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              {scoreEstimate >= 750
                ? 'Excellent'
                : scoreEstimate >= 650
                ? 'Good'
                : 'Poor'}
            </div>
          </div>

          {/* What-If Simulator */}
          <div
            style={{
              marginTop: 24,
              padding: 16,
              background: '#f8fafc',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#334155',
                marginBottom: 12,
              }}
            >
              ⚡ Improve Score Simulator
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div>
                <label style={{ fontSize: 11, color: '#64748b' }}>
                  Total Card Limit
                </label>
                <input
                  type="number"
                  value={totalCardLimit}
                  onChange={numSetter(setTotalCardLimit)}
                  style={{
                    width: '100%',
                    padding: 6,
                    borderRadius: 4,
                    border: '1px solid #cbd5e1',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 11, color: '#64748b' }}>
                  Pay Down Amount
                </label>
                <input
                  type="number"
                  value={paydownAmount}
                  onChange={numSetter(setPaydownAmount)}
                  style={{
                    width: '100%',
                    padding: 6,
                    borderRadius: 4,
                    border: '1px solid #cbd5e1',
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 13,
              }}
            >
              <div>
                New Util: <strong>{paydownAnalysis.newUtilPct}%</strong>
              </div>
              <div
                style={{
                  color:
                    paydownAnalysis.scoreImprovement > 0
                      ? '#16a34a'
                      : '#64748b',
                  fontWeight: 600,
                }}
              >
                {paydownAnalysis.scoreImprovement > 0
                  ? `+${paydownAnalysis.scoreImprovement} Points`
                  : 'No Change'}
              </div>
            </div>
          </div>

          {/* Action Checklist */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              Priority Actions:
            </div>
            <ul
              style={{
                fontSize: 12,
                color: '#475569',
                paddingLeft: 20,
                margin: 0,
              }}
            >
              {creditUtilizationPct > 30 && (
                <li>Reduce utilization below 30%</li>
              )}
              {numRecentEnquiries > 2 && <li>Avoid applying for new loans</li>}
              {onTimePaymentsPct < 100 && <li>Ensure 100% on-time payments</li>}
              {avgAccountAgeYears < 2 && <li>Keep old accounts open</li>}
              {creditUtilizationPct <= 30 &&
                numRecentEnquiries <= 2 &&
                onTimePaymentsPct === 100 && (
                  <li>Maintain current healthy habits!</li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
