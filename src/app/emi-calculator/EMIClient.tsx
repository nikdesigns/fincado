// src/app/emi-calculator/EMIClient.tsx
'use client';
import React, { useMemo, useState } from 'react';
import { loanRates, rateLastUpdated } from '@/lib/manualLoanRates';

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

/* ---------- NEW PieChart: thick donut with overlay arc ---------- */
function PieChart({
  principalPct,
  interestPct,
  size = 240,
}: {
  principalPct: number;
  interestPct: number;
  size?: number;
}) {
  const strokeWidth = Math.round(size * 0.18); // thick ring
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const interestLength = (interestPct / 100) * circumference;
  // round the dash caps visually by using stroke-linecap="round"

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Principal vs interest"
      >
        {/* Base ring = principal (pale) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#eff8e5" /* pale ring */
          strokeWidth={strokeWidth}
        />

        {/* Interest arc overlay (drawn on top). Rotate -90deg to start at top */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#a0e870" /* bright blue for interest */
            strokeWidth={strokeWidth}
            strokeDasharray={`${interestLength} ${circumference}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'stroke-dasharray 400ms ease' }}
          />
        </g>

        {/* Center hole (donut) */}
        <circle cx={cx} cy={cy} r={r * 0.52} fill="#fff" />

        {/* (Optional) tidy center label */}
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

export default function EMIClient() {
  // Inputs (defaults similar to previous behavior)
  const [loanAmount, setLoanAmount] = useState<number>(500000); // ₹5 L
  const [annualRate, setAnnualRate] = useState<number>(10.0); // %
  const [tenureYears, setTenureYears] = useState<number>(5); // years
  const [monthlyIncome, setMonthlyIncome] = useState<number>(40000);
  const [extraPaymentPercent, setExtraPaymentPercent] = useState<number>(10); // 10% extra EMI simulation

  // Derived values
  const monthlyRate = useMemo(() => annualRate / 12 / 100, [annualRate]);
  const nMonths = useMemo(
    () => Math.max(1, Math.round(tenureYears * 12)),
    [tenureYears]
  );

  // EMI calculation
  const emi = useMemo(() => {
    if (loanAmount <= 0 || monthlyRate <= 0 || nMonths <= 0) return 0;
    const r = monthlyRate;
    const numerator = loanAmount * r * Math.pow(1 + r, nMonths);
    const denominator = Math.pow(1 + r, nMonths) - 1;
    return numerator / denominator;
  }, [loanAmount, monthlyRate, nMonths]);

  const totalPayment = useMemo(() => Math.round(emi * nMonths), [emi, nMonths]);
  const totalInterest = useMemo(
    () => Math.round(totalPayment - loanAmount),
    [totalPayment, loanAmount]
  );

  // Amortization schedule
  const schedule: AmortRow[] = useMemo(() => {
    if (loanAmount <= 0 || nMonths <= 0) return [];
    const rows: AmortRow[] = [];
    let balance = loanAmount;
    for (let m = 1; m <= nMonths; m++) {
      const interestPortion = balance * monthlyRate;
      const principalPortion = Math.max(0, emi - interestPortion);
      balance -= principalPortion;
      rows.push({
        month: m,
        emi,
        principal: principalPortion,
        interest: interestPortion,
        balance: Math.max(0, balance),
      });
    }
    return rows;
  }, [loanAmount, monthlyRate, nMonths, emi]);

  // Pie chart percentages
  const interestPercent = useMemo(() => {
    const tp = emi * nMonths;
    if (tp <= 0) return 0;
    // guard: round in 0..100
    return Math.max(
      0,
      Math.min(100, Math.round(((totalPayment - loanAmount) / tp) * 100))
    );
  }, [totalPayment, loanAmount, emi, nMonths]);

  const principalPercent = Math.max(0, 100 - interestPercent);

  // Affordability (FOIR) - safe rule 50%
  const foirAllowed = Math.round(monthlyIncome * 0.5);
  const affordabilityOk = Math.round(emi) <= foirAllowed;

  // Savings by paying extra EMI % (simulate paying extraPaymentPercent% more every month)
  const prepaymentEffect = useMemo(() => {
    if (loanAmount <= 0 || monthlyRate <= 0)
      return { newMonths: 0, interestSaved: 0, newTotalInterest: 0 };
    const extraEmi = emi * (1 + extraPaymentPercent / 100);
    let bal = loanAmount;
    let months = 0;
    let totalInterestPaid = 0;
    while (bal > 0 && months < 1000) {
      months++;
      const interestPortion = bal * monthlyRate;
      const principalPortion = Math.min(
        Math.max(0, extraEmi - interestPortion),
        bal
      );
      if (principalPortion <= 0) {
        break;
      }
      bal -= principalPortion;
      totalInterestPaid += interestPortion;
    }
    const originalTotalInterest = schedule.reduce((s, r) => s + r.interest, 0);
    const interestSaved = Math.max(
      0,
      Math.round(originalTotalInterest - totalInterestPaid)
    );
    return {
      newMonths: months,
      interestSaved,
      newTotalInterest: Math.round(totalInterestPaid),
    };
  }, [loanAmount, monthlyRate, emi, extraPaymentPercent, schedule]);

  // Small helpers
  const safeNumberSetter =
    (setter: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setter(v === '' ? 0 : Number(v));
    };

  return (
    <section className="card">
      <h2>Loan EMI Calculator</h2>

      {/* ===== Two-column split: left = inputs, right = chart (only these two are side-by-side) ===== */}
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
              Loan Amount (₹)
              <input
                id="loan"
                type="number"
                value={loanAmount}
                min={0}
                step={1000}
                onChange={safeNumberSetter(setLoanAmount)}
              />
            </label>

            <label>
              Interest Rate (% per year)
              <input
                id="rate"
                type="number"
                step="0.01"
                value={annualRate}
                onChange={safeNumberSetter(setAnnualRate)}
                min={0}
              />
            </label>

            <label>
              Loan Tenure (Years)
              <input
                id="years"
                type="number"
                value={tenureYears}
                onChange={safeNumberSetter(setTenureYears)}
                min={0.5}
                step={0.5}
              />
            </label>

            <label>
              Monthly Income (₹) — for FOIR check
              <input
                id="income"
                type="number"
                value={monthlyIncome}
                onChange={safeNumberSetter(setMonthlyIncome)}
                min={0}
              />
            </label>

            <label>
              Extra EMI % (simulate paying X% more per month)
              <input
                id="extra"
                type="number"
                step="1"
                value={extraPaymentPercent}
                onChange={safeNumberSetter(setExtraPaymentPercent)}
                min={0}
                max={200}
              />
            </label>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-cta" onClick={() => {}}>
                Calculate
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoanAmount(500000);
                  setAnnualRate(10.0);
                  setTenureYears(5);
                  setMonthlyIncome(40000);
                  setExtraPaymentPercent(10);
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: chart only (sparkline removed) */}
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
                principalPct={principalPercent}
                interestPct={interestPercent}
                size={240}
              />

              <div style={{ display: 'flex', gap: 18, marginTop: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      background: '#eff8e5',
                      display: 'inline-block',
                      borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.02)',
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>{principalPercent}%</div>
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
                      background: '#a0e870',
                      display: 'inline-block',
                      borderRadius: 6,
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>{interestPercent}%</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Interest
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* optional side ad (kept small) */}
          <div className="ad-box" style={{ marginTop: 14 }}>
            Ad / Bank widget
          </div>
        </aside>
      </div>

      {/* ===== RESULTS SECTION: full width below the split ===== */}
      <div className="emi-results-full" style={{ marginTop: 18 }}>
        <div className="result-grid emi-summary-strip">
          <div className="result-card">
            <p className="result-label">Monthly EMI</p>
            <p className="result-primary" id="emi">
              {formatINR(Math.round(emi))}
            </p>
          </div>

          <div className="result-card">
            <p className="result-label">Total Interest</p>
            <p className="result-value" id="interest">
              {formatINR(totalInterest)}
            </p>
          </div>

          <div className="result-card">
            <p className="result-label">Total Payment</p>
            <p className="result-value" id="total">
              {formatINR(totalPayment)}
            </p>
          </div>
        </div>
      </div>

      {/* ... rest unchanged (eligibility, savings, bank table, amortization table) ... */}

      {/* ELIGIBILITY */}
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Check Your Loan Eligibility</h3>
        <p style={{ marginBottom: 8 }}>
          Enter monthly income to estimate safe EMI.
        </p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            id="incomeInline"
            type="number"
            value={monthlyIncome}
            onChange={safeNumberSetter(setMonthlyIncome)}
          />
          <button onClick={() => {}}>Update</button>
        </div>
        <p style={{ marginTop: 12 }}>
          Estimated safe EMI (50% of income):{' '}
          <strong>{formatINR(foirAllowed)}</strong>
        </p>
        <p>
          Your EMI: <strong>{formatINR(Math.round(emi))}</strong> —{' '}
          {affordabilityOk ? (
            <span style={{ color: 'green' }}>Looks affordable</span>
          ) : (
            <span style={{ color: 'crimson' }}>May be unaffordable</span>
          )}
        </p>
      </div>

      {/* SAVINGS INSIGHT */}
      <div className="savings-box card" style={{ marginTop: 18 }}>
        <h3>Smart Savings Tip 💡</h3>
        <p>
          If you increase your EMI by <strong>{extraPaymentPercent}%</strong>,
          new tenure ≈ <strong>{prepaymentEffect.newMonths}</strong> months (
          {(prepaymentEffect.newMonths / 12).toFixed(1)} years), saving approx.{' '}
          <strong>{formatINR(prepaymentEffect.interestSaved)}</strong> in
          interest.
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          Note: This is a simulation; actual prepayment rules and charges vary
          by lender.
        </p>
      </div>

      {/* INLINE BANK COMPARISON */}
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Compare Popular Loan Offers</h3>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Last updated: {rateLastUpdated}
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="rate-table">
            <thead>
              <tr>
                <th>Bank</th>
                <th>Interest Rate</th>
                <th>Processing Fee</th>
                <th>Apply</th>
              </tr>
            </thead>
            <tbody>
              {loanRates.map((bank) => (
                <tr key={bank.bank}>
                  <td>{bank.bank}</td>
                  <td>{bank.rate}</td>
                  <td>{bank.fee}</td>
                  <td>
                    <a
                      href={`/out?to=${encodeURIComponent(
                        bank.applyLink || 'https://example.com'
                      )}`}
                      className="apply-btn table-apply-btn"
                    >
                      Apply
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 12, fontSize: 13, color: '#64748b' }}>
          Rates shown are indicative and may change without notice. Final rate
          depends on credit score, income, tenure, and city.
        </p>
      </div>

      {/* AMORTIZATION TABLE */}
      <div className="article" style={{ marginTop: 28 }}>
        <h2>Loan Repayment Schedule</h2>
        <div
          className="schedule-wrapper"
          style={{ maxHeight: 420, overflow: 'auto' }}
        >
          <table className="rate-table">
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
      </div>
    </section>
  );
}
