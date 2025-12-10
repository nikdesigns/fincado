'use client';
import React, { useMemo, useState } from 'react';

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

export default function HomeLoanClient() {
  // Inputs
  const [propertyValue, setPropertyValue] = useState<number>(5000000); // ₹50 L
  const [downPayment, setDownPayment] = useState<number>(1000000); // ₹10 L
  const [annualRate, setAnnualRate] = useState<number>(8.5); // %
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [processingFeePercent, setProcessingFeePercent] = useState<number>(0.5); // %
  const [monthlyIncome, setMonthlyIncome] = useState<number>(60000);
  const [marginalTaxPercent, setMarginalTaxPercent] = useState<number>(30); // user's tax bracket
  const [extraPaymentPercent, setExtraPaymentPercent] = useState<number>(0); // % extra EMI

  // LTV rules (India common heuristic)
  const ltv = useMemo(() => {
    // thresholds in INR
    if (propertyValue <= 30_00_000) return 0.9; // <= 30L => 90%
    if (propertyValue <= 75_00_000) return 0.8; // 30-75L => 80%
    return 0.75; // >75L => 75%
  }, [propertyValue]);

  // Compute loan principal desired (property - down)
  const loanAmount = Math.max(0, propertyValue - downPayment);

  // Maximum permitted by LTV
  const maxLoanByLtv = Math.round(propertyValue * ltv);
  const minDownPaymentRequired = Math.max(
    0,
    Math.round(propertyValue - maxLoanByLtv)
  );

  // validate loan amount vs LTV
  const loanExceedsLtv = loanAmount > maxLoanByLtv;

  // EMI formula
  const monthlyRate = annualRate / 12 / 100;
  const nMonths = Math.max(1, Math.round(tenureYears * 12));

  const emi = useMemo(() => {
    if (loanAmount <= 0 || monthlyRate <= 0 || nMonths <= 0) return 0;
    const r = monthlyRate;
    const numerator = loanAmount * r * Math.pow(1 + r, nMonths);
    const denominator = Math.pow(1 + r, nMonths) - 1;
    return numerator / denominator;
  }, [loanAmount, monthlyRate, nMonths]);

  const processingFee = Math.round((processingFeePercent / 100) * loanAmount);

  // amortization schedule
  const schedule: AmortRow[] = useMemo(() => {
    if (loanAmount <= 0 || nMonths <= 0) return [];
    let bal = loanAmount;
    const rows: AmortRow[] = [];
    for (let m = 1; m <= nMonths; m++) {
      const interestPortion = bal * monthlyRate;
      const principalPortion = Math.max(0, emi - interestPortion);
      bal = bal - principalPortion;
      rows.push({
        month: m,
        emi,
        principal: principalPortion,
        interest: interestPortion,
        balance: Math.max(0, bal),
      });
    }
    return rows;
  }, [loanAmount, monthlyRate, nMonths, emi]);

  // tax benefit estimate for first 12 months
  const {
    interestYear1,
    principalYear1,
    section24Deduction,
    section80CDeduction,
  } = useMemo(() => {
    const first12 = schedule.slice(0, 12);
    const interestSum = first12.reduce((s, r) => s + r.interest, 0);
    const principalSum = first12.reduce((s, r) => s + r.principal, 0);
    // Section 24 interest deduction capped at ₹2,00,000 for self-occupied property
    const section24 = Math.min(interestSum, 200000);
    // Section 80C principal deduction upto 1.5L (combined with other 80C investments)
    const section80c = Math.min(principalSum, 150000);
    return {
      interestYear1: interestSum,
      principalYear1: principalSum,
      section24Deduction: section24,
      section80CDeduction: section80c,
    };
  }, [schedule]);

  // estimated tax savings (simple)
  const taxSavingsEstimate = useMemo(() => {
    const tax_from_interest = section24Deduction * (marginalTaxPercent / 100);
    const tax_from_principal = section80CDeduction * (marginalTaxPercent / 100);
    return Math.round(tax_from_interest + tax_from_principal);
  }, [section24Deduction, section80CDeduction, marginalTaxPercent]);

  // Affordability check: FOIR (50% safe)
  const monthlyEmi = Math.round(emi);
  const foirAllowed = monthlyIncome * 0.5;
  const affordabilityOk = monthlyEmi <= foirAllowed;

  // Extra EMI / prepayment effect (approx): increase emi by X% and compute reduced tenure
  const extraEmi = emi * (1 + extraPaymentPercent / 100);

  const prepaymentEffect = useMemo(() => {
    if (loanAmount <= 0 || monthlyRate <= 0)
      return { newMonths: 0, interestSaved: 0, newTotalInterest: 0 };
    // simulate with extraEmi until balance <= 0
    let bal = loanAmount;
    let months = 0;
    let totalInterest = 0;
    while (bal > 0 && months < 1000) {
      months++;
      const interestPortion = bal * monthlyRate;
      const principalPortion = Math.min(extraEmi - interestPortion, bal);
      if (principalPortion <= 0) {
        // extraEMI too small to cover interest (shouldn't happen in normal ranges)
        break;
      }
      bal -= principalPortion;
      totalInterest += interestPortion;
    }
    const originalTotalInterest = schedule.reduce((s, r) => s + r.interest, 0);
    const interestSaved = Math.max(
      0,
      Math.round(originalTotalInterest - totalInterest)
    );
    return {
      newMonths: months,
      interestSaved,
      newTotalInterest: Math.round(totalInterest),
    };
  }, [loanAmount, monthlyRate, extraEmi, schedule]);

  // convenience derived values
  const totalPayment = Math.round(emi * nMonths);
  const totalInterest = Math.round(totalPayment - loanAmount);

  // small helpers for inputs that are strings
  const safeSetNumber =
    (setter: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setter(v === '' ? 0 : Number(v));
    };

  return (
    <section className="card">
      <h2>Home Loan Calculator (India)</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // nothing to do — all reactive
        }}
        style={{ display: 'grid', gap: 12 }}
      >
        <label>
          Property Value (₹)
          <input
            id="propertyValue"
            type="number"
            value={propertyValue}
            onChange={(e) => setPropertyValue(Number(e.target.value))}
            min={0}
            step={10000}
          />
        </label>

        <label>
          Down Payment (₹)
          <input
            id="downPayment"
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            min={0}
            step={10000}
          />
          <div style={{ fontSize: 13, color: '#6b7280' }}>
            Min recommended down payment (to satisfy typical LTV):{' '}
            {formatINR(minDownPaymentRequired)}
            {loanExceedsLtv ? (
              <span>
                {' '}
                — Your current down payment is too low for the LTV cap.
              </span>
            ) : (
              <span> — LTV OK at {Math.round(ltv * 100)}%.</span>
            )}
          </div>
        </label>

        <label>
          Annual Interest Rate (%)
          <input
            id="annualRate"
            type="number"
            step="0.01"
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            min={0}
          />
        </label>

        <label>
          Tenure (Years)
          <input
            id="tenureYears"
            type="number"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            min={1}
          />
        </label>

        <label>
          Processing Fee (% of loan)
          <input
            id="processingFee"
            type="number"
            step="0.1"
            value={processingFeePercent}
            onChange={(e) => setProcessingFeePercent(Number(e.target.value))}
            min={0}
          />
        </label>

        <label>
          Monthly Net Income (₹) — for FOIR check
          <input
            id="monthlyIncome"
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            min={0}
          />
        </label>

        <label>
          Your Marginal Tax Rate (%) — for tax savings estimate
          <input
            id="marginalTaxPercent"
            type="number"
            value={marginalTaxPercent}
            onChange={(e) => setMarginalTaxPercent(Number(e.target.value))}
            min={0}
            max={40}
          />
        </label>

        <label>
          Extra EMI % (simulate paying X% more each month)
          <input
            id="extraPaymentPercent"
            type="number"
            step="1"
            value={extraPaymentPercent}
            onChange={(e) => setExtraPaymentPercent(Number(e.target.value))}
            min={0}
            max={200}
          />
        </label>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="primary-cta"
            onClick={() => {
              /* reactive form - nothing needed */
            }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => {
              // reset to defaults
              setPropertyValue(5000000);
              setDownPayment(1000000);
              setAnnualRate(8.5);
              setTenureYears(20);
              setProcessingFeePercent(0.5);
              setMonthlyIncome(60000);
              setMarginalTaxPercent(30);
              setExtraPaymentPercent(0);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* RESULTS */}
      <div className="result-grid emi-summary-strip" style={{ marginTop: 16 }}>
        <div className="result-card">
          <p className="result-label">Loan Amount</p>
          <p className="result-primary">{formatINR(Math.round(loanAmount))}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Estimated EMI / month</p>
          <p className="result-primary" id="emi">
            {formatINR(Math.round(emi))}
          </p>
        </div>

        <div className="result-card">
          <p className="result-label">Total Interest (approx)</p>
          <p className="result-value">{formatINR(totalInterest)}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Total Payment</p>
          <p className="result-value">
            {formatINR(totalPayment + processingFee)}
          </p>
        </div>
      </div>

      {/* LTV, Processing Fee and Affordability */}
      <div className="card" style={{ marginTop: 18 }}>
        <h3>LTV & Down Payment</h3>
        <p>Typical LTV used: {Math.round(ltv * 100)}%</p>
        <p>Max loan permitted by LTV: {formatINR(maxLoanByLtv)}</p>
        <p>
          Minimum down payment required (to meet LTV):{' '}
          {formatINR(minDownPaymentRequired)}
        </p>
        {loanExceedsLtv && (
          <p style={{ color: 'crimson' }}>
            Your chosen down payment is below LTV requirement — increase down
            payment or reduce loan.
          </p>
        )}
        <p>Processing fee (approx): {formatINR(processingFee)}</p>

        <h4 style={{ marginTop: 12 }}>Affordability (FOIR)</h4>
        <p>
          Your monthly EMI: <strong>{formatINR(monthlyEmi)}</strong>
        </p>
        <p>
          Recommended max EMI (50% of income):{' '}
          <strong>{formatINR(Math.round(foirAllowed))}</strong>
        </p>
        <p>
          {affordabilityOk ? (
            <span style={{ color: 'green' }}>Looks affordable</span>
          ) : (
            <span style={{ color: 'crimson' }}>
              May be unaffordable — consider higher down payment or longer
              tenure
            </span>
          )}
        </p>
      </div>

      {/* TAX BENEFIT ESTIMATE */}
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Estimated Tax Benefits (Year 1)</h3>
        <p>
          Interest paid in first 12 months:{' '}
          {formatINR(Math.round(interestYear1))}
        </p>
        <p>
          Principal repaid in first 12 months:{' '}
          {formatINR(Math.round(principalYear1))}
        </p>
        <p>
          Section 24 (interest) deduction claimed:{' '}
          {formatINR(Math.round(section24Deduction))} (capped at ₹2,00,000)
        </p>
        <p>
          Section 80C (principal) deduction claimed:{' '}
          {formatINR(Math.round(section80CDeduction))} (part of ₹1.5 Lakh 80C
          limit)
        </p>
        <p>
          Estimated tax savings (approx):{' '}
          <strong>{formatINR(taxSavingsEstimate)}</strong> (at{' '}
          {marginalTaxPercent}%)
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          Note: This is an estimate for year-1 only and assumes self-occupied
          property rules for Section 24. Consult a tax advisor for precise
          filing guidance.
        </p>
      </div>

      {/* EXTRA EMI / PREPAYMENT EFFECT */}
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Extra EMI / Prepayment Simulation</h3>
        <p>
          You're simulating paying <strong>{extraPaymentPercent}%</strong> more
          than the regular EMI each month.
        </p>
        <p>
          New approximate tenure: <strong>{prepaymentEffect.newMonths}</strong>{' '}
          months ({(prepaymentEffect.newMonths / 12).toFixed(1)} years)
        </p>
        <p>
          Interest saved (approx):{' '}
          <strong>{formatINR(prepaymentEffect.interestSaved)}</strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          This is a simple simulation — actual prepayment outcomes will depend
          on lender rules (part prepayment fees, recalculation method).
        </p>
      </div>

      {/* AMORTIZATION TABLE */}
      <div className="article" style={{ marginTop: 32 }}>
        <h2>Amortization Schedule (first 120 months shown)</h2>
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

        {schedule.length > 120 && (
          <p style={{ marginTop: 8 }}>
            Showing first 120 months. Full schedule available in CSV export
            (coming soon).
          </p>
        )}
      </div>
    </section>
  );
}
