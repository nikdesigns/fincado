'use client';
import React, { useMemo, useState } from 'react';
import { loanRates, rateLastUpdated } from '@/lib/manualLoanRates';

function formatINR(v: number) {
  return '₹' + v.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

type AmortRow = {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
};

export default function PersonalLoanClient() {
  // Default values (India common)
  const [loanAmount, setLoanAmount] = useState(300000); // ₹3L
  const [annualRate, setAnnualRate] = useState(14.5); // typical personal loan
  const [tenureYears, setTenureYears] = useState(3);
  const [processingFeePct, setProcessingFeePct] = useState(2);
  const [monthlyIncome, setMonthlyIncome] = useState(35000); // FOIR
  const [extraEmiPercent, setExtraEmiPercent] = useState(10);

  // Derived values
  const monthlyRate = annualRate / 12 / 100;
  const nMonths = Math.max(1, Math.round(tenureYears * 12));

  const emi = useMemo(() => {
    if (loanAmount <= 0 || monthlyRate <= 0) return 0;
    const r = monthlyRate;
    return (
      (loanAmount * r * Math.pow(1 + r, nMonths)) /
      (Math.pow(1 + r, nMonths) - 1)
    );
  }, [loanAmount, monthlyRate, nMonths]);

  const totalPayment = Math.round(emi * nMonths);
  const totalInterest = totalPayment - loanAmount;

  const processingFee = Math.round((processingFeePct / 100) * loanAmount);

  // Amortization table
  const schedule: AmortRow[] = useMemo(() => {
    const rows: AmortRow[] = [];
    let balance = loanAmount;
    for (let m = 1; m <= nMonths; m++) {
      const interest = balance * monthlyRate;
      const principal = emi - interest;
      balance -= principal;
      rows.push({
        month: m,
        emi,
        principal,
        interest,
        balance: Math.max(0, balance),
      });
    }
    return rows;
  }, [loanAmount, monthlyRate, nMonths, emi]);

  // FOIR (affordability)
  const maxSafeEMI = Math.round(monthlyIncome * 0.5);
  const affordable = Math.round(emi) <= maxSafeEMI;

  // Prepayment simulation — extra EMI%
  const extraEmi = emi * (1 + extraEmiPercent / 100);

  const prepayment = useMemo(() => {
    let bal = loanAmount;
    let months = 0;
    let totalInterestPaid = 0;
    while (bal > 0 && months < 1000) {
      months++;
      const interest = bal * monthlyRate;
      const principal = Math.min(extraEmi - interest, bal);
      if (principal <= 0) break;
      bal -= principal;
      totalInterestPaid += interest;
    }
    const originalInterest = schedule.reduce((s, r) => s + r.interest, 0);
    const saved = Math.max(0, Math.round(originalInterest - totalInterestPaid));

    return {
      newMonths: months,
      saved,
      newInterest: Math.round(totalInterestPaid),
    };
  }, [extraEmi, loanAmount, monthlyRate, schedule]);

  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="card">
      <h2>Personal Loan EMI Calculator</h2>

      {/* FORM */}
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'grid', gap: 12 }}
      >
        <label>
          Loan Amount (₹)
          <input
            type="number"
            value={loanAmount}
            onChange={setter(setLoanAmount)}
          />
        </label>

        <label>
          Interest Rate (% p.a.)
          <input
            type="number"
            step="0.1"
            value={annualRate}
            onChange={setter(setAnnualRate)}
          />
        </label>

        <label>
          Tenure (Years)
          <input
            type="number"
            value={tenureYears}
            onChange={setter(setTenureYears)}
          />
        </label>

        <label>
          Processing Fee (%)
          <input
            type="number"
            step="0.1"
            value={processingFeePct}
            onChange={setter(setProcessingFeePct)}
          />
        </label>

        <label>
          Monthly Income (₹)
          <input
            type="number"
            value={monthlyIncome}
            onChange={setter(setMonthlyIncome)}
          />
        </label>

        <label>
          Extra EMI % (optional)
          <input
            type="number"
            value={extraEmiPercent}
            onChange={setter(setExtraEmiPercent)}
          />
        </label>

        <button className="primary-cta">Calculate</button>
      </form>

      {/* RESULTS */}
      <div className="result-grid emi-summary-strip" style={{ marginTop: 16 }}>
        <div className="result-card">
          <p className="result-label">Monthly EMI</p>
          <p className="result-primary">{formatINR(Math.round(emi))}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Total Interest</p>
          <p className="result-value">{formatINR(totalInterest)}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Total Payment</p>
          <p className="result-value">
            {formatINR(totalPayment + processingFee)}
          </p>
        </div>
      </div>

      {/* AFFORDABILITY */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Eligibility / FOIR Check</h3>
        <p>
          Your EMI: <strong>{formatINR(Math.round(emi))}</strong>
        </p>
        <p>
          Safe EMI limit (50% of income):{' '}
          <strong>{formatINR(maxSafeEMI)}</strong>
        </p>
        <p>
          {affordable ? (
            <span style={{ color: 'green' }}>Eligible</span>
          ) : (
            <span style={{ color: 'crimson' }}>
              May be rejected — EMI too high
            </span>
          )}
        </p>
      </div>

      {/* EXTRA EMI */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Extra EMI Savings (Prepayment)</h3>
        <p>
          New tenure: <strong>{prepayment.newMonths}</strong> months (
          {(prepayment.newMonths / 12).toFixed(1)} years)
        </p>
        <p>
          Interest saved: <strong>{formatINR(prepayment.saved)}</strong>
        </p>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Many banks let you prepay partially without penalty (check your
          lender).
        </p>
      </div>

      {/* BANK RATE TABLE */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Popular Personal Loan Rates</h3>
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

        <p style={{ marginTop: 8, fontSize: 13, color: '#64748b' }}>
          Rates vary by credit score, employer category, and city.
        </p>
      </div>

      {/* AMORTIZATION */}
      <div className="article" style={{ marginTop: 24 }}>
        <h2>Amortization Schedule</h2>

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
          <p style={{ marginTop: 8 }}>Only showing first 120 months.</p>
        )}
      </div>
    </section>
  );
}
