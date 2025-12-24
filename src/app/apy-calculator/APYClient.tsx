// src/app/apy-calculator/APYClient.tsx
'use client';

import React, { useMemo, useState } from 'react';
import PieChart from '@/components/PieChart';

// Helper: Format Currency
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

// --- APY LOOKUP DATA (Approximate for 5k Pension) ---
const APY_CONTRIBUTION_5000_PENSION: Record<number, number> = {
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

const PENSION_SLABS = [1000, 2000, 3000, 4000, 5000];

// ✅ Interface for custom labels
interface APYLabels {
  joiningAge: string;
  desiredPension: string;
  contributionFreq: string;
  contributionYears: string;
  pensionStartsAt: string;
  resetDefaults: string;
  youNeedToPay: string;
  totalInvestment: string;
  corpusToNominee: string;
  guaranteedPension: string;
  forSpouse: string;
  per: string;
  monthly: string;
  quarterly: string;
  halfYearly: string;
  years: string;
}

const DEFAULT_LABELS: APYLabels = {
  joiningAge: 'Joining Age (18-40 Yrs)',
  desiredPension: 'Desired Monthly Pension (₹)',
  contributionFreq: 'Contribution Frequency',
  contributionYears: 'Contribution Years:',
  pensionStartsAt: 'Pension Starts At:',
  resetDefaults: 'Reset Defaults',
  youNeedToPay: 'You Need To Pay',
  totalInvestment: 'Total Investment',
  corpusToNominee: 'Corpus to Nominee',
  guaranteedPension: 'Guaranteed Monthly Pension',
  forSpouse: '(For you & your spouse)',
  per: '/',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  halfYearly: 'Half-Yearly',
  years: 'Years',
};

export default function APYClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<APYLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  // --- STATE ---
  const [joiningAge, setJoiningAge] = useState<number>(25);
  const [desiredPension, setDesiredPension] = useState<number>(5000);
  const [frequency, setFrequency] = useState<
    'Monthly' | 'Quarterly' | 'Half-Yearly'
  >('Monthly');

  // --- HELPER: Background for Range Sliders ---
  const getRangeBackground = (val: number, min: number, max: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    // Orange/Red theme for Government Scheme
    return `linear-gradient(to right, var(--color-slider-light) 0%, var(--color-slider-light) ${percentage}%, var(--color-slider-grey) ${percentage}%, var(--color-slider-grey) 100%)`;
  };

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    const retirementAge = 60;
    const yearsOfContribution = Math.max(0, retirementAge - joiningAge);
    const totalMonths = yearsOfContribution * 12;

    // 1. Get Base Contribution for 5000
    const baseContrib5000 = APY_CONTRIBUTION_5000_PENSION[joiningAge] || 0;

    // 2. Scale for selected slab
    const scaleFactor = desiredPension / 5000;
    const monthlyBase = Math.round(baseContrib5000 * scaleFactor);

    // 3. Adjust for Frequency
    let periodicContribution = 0;
    if (frequency === 'Monthly') {
      periodicContribution = monthlyBase;
    } else if (frequency === 'Quarterly') {
      periodicContribution = Math.round(monthlyBase * 3 * 1.01); // Slight adjustment
    } else {
      periodicContribution = Math.round(monthlyBase * 6 * 1.03); // Slight adjustment
    }

    // 4. Total Investment
    const totalInvestment = Math.round(monthlyBase * totalMonths); // Approximation of total cost

    // 5. Corpus to Nominee
    // 5k Pension -> 8.5 Lakhs
    const nomineeCorpus = Math.round(850000 * scaleFactor);

    // 6. Pie Chart (Invested vs Return/Growth)
    const investedPct = Math.round((totalInvestment / nomineeCorpus) * 100);
    const returnPct = 100 - investedPct;

    return {
      periodicContribution,
      totalInvestment,
      nomineeCorpus,
      yearsOfContribution,
      investedPct,
      returnPct,
    };
  }, [joiningAge, desiredPension, frequency]);

  // --- ACTIONS ---
  const handleReset = () => {
    setJoiningAge(25);
    setDesiredPension(5000);
    setFrequency('Monthly');
  };

  // Safe Setter
  const numSetter =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(Number(e.target.value) || 0);

  // Helper to translate frequency value for display
  const getFrequencyLabel = (freq: string) => {
    if (freq === 'Monthly') return t.monthly;
    if (freq === 'Quarterly') return t.quarterly;
    if (freq === 'Half-Yearly') return t.halfYearly;
    return freq;
  };

  return (
    <div className="card calculator-card">
      <div className="calc-grid">
        {/* --- LEFT: INPUTS --- */}
        <div className="calc-inputs">
          {/* 1. Age */}
          <div className="input-group">
            <label>{t.joiningAge}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={joiningAge}
                onChange={numSetter(setJoiningAge)}
                min={18}
                max={40}
              />
            </div>
            <input
              type="range"
              min="18"
              max="40"
              step="1"
              value={joiningAge}
              onChange={numSetter(setJoiningAge)}
              style={{ background: getRangeBackground(joiningAge, 18, 40) }}
            />
          </div>

          {/* 2. Pension Slab */}
          <div className="input-group">
            <label>{t.desiredPension}</label>
            <div className="input-wrapper">
              <select
                value={desiredPension}
                onChange={(e) => setDesiredPension(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                }}
              >
                {PENSION_SLABS.map((slab) => (
                  <option key={slab} value={slab}>
                    {formatINR(slab)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Frequency */}
          <div className="input-group">
            <label>{t.contributionFreq}</label>
            <div className="input-wrapper">
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as never)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <option value="Monthly">{t.monthly}</option>
                <option value="Quarterly">{t.quarterly}</option>
                <option value="Half-Yearly">{t.halfYearly}</option>
              </select>
            </div>
          </div>

          {/* Fixed Info */}
          <div
            style={{
              padding: 12,
              background: '#f8fafc',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.contributionYears}
              </span>
              <span style={{ fontWeight: 600 }}>
                {results.yearsOfContribution} {t.years}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.pensionStartsAt}
              </span>
              <span style={{ fontWeight: 600 }}>Age 60</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            style={{
              marginTop: 10,
              background: 'none',
              border: 'none',
              textDecoration: 'underline',
              color: '#666',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            {t.resetDefaults}
          </button>
        </div>

        {/* --- RIGHT: VISUALS --- */}
        <div className="calc-visuals">
          <PieChart
            principalPct={results.investedPct} // Total paid by user
            interestPct={results.returnPct} // Value added (Govt guarantee/growth)
            size={200}
          />

          <div style={{ marginTop: 24, width: '100%' }}>
            {/* Main Result: Required Contribution */}
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>
                {t.youNeedToPay}
              </span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'var(--color-brand-green)',
                }}
              >
                {formatINR(results.periodicContribution)}
                <span
                  style={{ fontSize: 16, fontWeight: 500, color: '#64748b' }}
                >
                  {' '}
                  {t.per} {getFrequencyLabel(frequency)}
                </span>
              </div>
            </div>

            {/* Grid Breakdown */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                fontSize: 12,
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  padding: 8,
                  background: '#fff',
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b' }}>{t.totalInvestment}</div>
                <div style={{ fontWeight: 600 }}>
                  {formatINR(results.totalInvestment)}
                </div>
              </div>
              <div
                style={{
                  padding: 8,
                  background: '#fff',
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ color: '#64748b' }}>{t.corpusToNominee}</div>
                <div style={{ fontWeight: 600, color: '#16a34a' }}>
                  {formatINR(results.nomineeCorpus)}
                </div>
              </div>
            </div>

            {/* Pension Info Badge */}
            <div
              style={{
                marginTop: 16,
                padding: 10,
                background: '#fff7ed',
                borderRadius: 8,
                border: '1px solid #fed7aa',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 12, color: '#9a3412', marginBottom: 4 }}>
                {t.guaranteedPension}
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#c2410c' }}>
                {formatINR(desiredPension)}
              </div>
              <div style={{ fontSize: 11, color: '#9a3412', marginTop: 2 }}>
                {t.forSpouse}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
