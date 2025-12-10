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

  // Donut chart percentages
  const interestPercent = useMemo(() => {
    const tp = emi * nMonths;
    if (tp <= 0) return 0;
    return Math.round(((totalPayment - loanAmount) / tp) * 100);
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
        // can't progress (very low extra emi) - break
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // reactive — values update automatically
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
          <button
            className="primary-cta"
            onClick={() => {
              /* reactive */
            }}
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={() => {
              // reset to defaults
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

      {/* RESULT CARDS */}
      <div className="result-grid emi-summary-strip" style={{ marginTop: 16 }}>
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

      {/* DONUT CHART */}
      <div className="card" style={{ marginTop: 18, textAlign: 'center' }}>
        <h3>Principal vs Interest</h3>
        <div
          id="donut"
          className="donut"
          style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            margin: '8px auto',
            background: `conic-gradient(#16a34a 0% ${principalPercent}%, #ef4444 ${principalPercent}% 100%)`,
          }}
        />
        <div
          className="donut-legend"
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 8,
          }}
        >
          <span>🟢 Principal {principalPercent}%</span>
          <span>🔴 Interest {interestPercent}%</span>
        </div>
      </div>

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
          <button
            onClick={() => {
              // nothing required, reactive
            }}
          >
            Update
          </button>
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
      <div className="savings-box" style={{ marginTop: 18 }}>
        <h3>Smart Savings Tip 💡</h3>
        <p>
          If you increase your EMI by <strong>{extraPaymentPercent}%</strong>,
          new tenure ≈ <strong>{prepaymentEffect.newMonths}</strong> months (
          {(prepaymentEffect.newMonths / 12).toFixed(1)} years), saving approx.{' '}
          <strong>{formatINR(prepaymentEffect.interestSaved)}</strong> in
          interest.
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          Note: This is a simplifed simulation; actual prepayment rules and
          charges vary by lender.
        </p>
      </div>

      {/* INLINE BANK COMPARISON */}
      <div className="card" style={{ marginTop: 24 }}>
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
