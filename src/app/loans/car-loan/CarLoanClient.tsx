// ./src/app/loans/car-loan/CarLoanClient.tsx
'use client';

import React, { useRef, useState } from 'react';

function formatINR(value: number) {
  return (
    '₹' + Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 })
  );
}

type ScheduleRow = {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
};

/**
 * Car loan calculator client component
 * - supports downpayment, trade-in, balloon/residual, processing fee
 * - CSV export + printable schedule (buttons below table)
 */
export default function CarLoanClient() {
  // Inputs (defaults chosen to typical values)
  const [vehiclePrice, setVehiclePrice] = useState<number>(1000000); // ₹10L
  const [downPayment, setDownPayment] = useState<number>(200000); // ₹2L
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [annualRate, setAnnualRate] = useState<number>(9.5); // %
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [processingFeePct, setProcessingFeePct] = useState<number>(0.5); // %
  const [balloonValue, setBalloonValue] = useState<number>(0); // final residual amount (₹)
  const printRef = useRef<HTMLDivElement | null>(null);

  // Derived
  const months = Math.max(1, Math.round(tenureYears * 12));
  const monthlyRate = annualRate / 12 / 100;
  const processingFeeAmount = (processingFeePct / 100) * vehiclePrice;

  // Loan principal = vehiclePrice - downPayment - tradeIn + processingFee
  const loanPrincipal = Math.max(
    0,
    vehiclePrice -
      (downPayment || 0) -
      (tradeInValue || 0) +
      processingFeeAmount
  );

  // EMI calculation with balloon (residual) handling:
  // We amortize a principal such that at the end of n months the remaining balance = balloonValue.
  // Using present value adjustment: principalAdjusted = loanPrincipal - balloon/(1+r)^n
  // then EMI computed using standard annuity formula on principalAdjusted.
  let emi = 0;
  if (monthlyRate === 0) {
    // zero-interest: monthly repay principal except final balloon
    const principalAdjusted = loanPrincipal - balloonValue;
    emi = principalAdjusted / months;
  } else {
    const pow = Math.pow(1 + monthlyRate, months);
    const presentValueBalloon = balloonValue / pow;
    const principalAdjusted = loanPrincipal - presentValueBalloon;
    if (principalAdjusted <= 0) {
      // balloon covers most of principal => minimal EMI
      emi = 0;
    } else {
      emi = (principalAdjusted * monthlyRate * pow) / (pow - 1);
    }
  }

  // Build amortization schedule:
  const schedule: ScheduleRow[] = [];
  let balance = loanPrincipal;
  for (let m = 1; m <= months; m++) {
    const interestPortion = balance * monthlyRate;
    let principalPortion = emi - interestPortion;
    // Guard for negative principal portion (can happen if EMI is 0)
    if (principalPortion < 0) principalPortion = 0;

    // If we're at final scheduled month, the visible balance after EMI should equal balloonValue
    if (m === months) {
      // compute what principal we need to reduce to reach balloon
      const neededPrincipalReduction = Math.max(0, balance - balloonValue);
      // last principal portion is the needed reduction (could be slightly different due to rounding)
      principalPortion = neededPrincipalReduction;
      // EMI visible to user in last row is principal + interest; final actual payment may include balloon separately
      // We'll show EMI (regular) and the balloon separately in summary/action if balloon > 0
      balance = Math.max(0, balance - principalPortion);
    } else {
      balance = Math.max(0, balance - principalPortion);
    }

    schedule.push({
      month: m,
      emi,
      principal: principalPortion,
      interest: interestPortion,
      balance,
    });
  }

  // Totals
  const totalPrincipalPaid = schedule.reduce((s, r) => s + r.principal, 0);
  const totalInterestPaid = schedule.reduce((s, r) => s + r.interest, 0);
  // If balloon exists and is treated as final payment, include it in total repayment/interest calculations as needed
  const totalRepayment =
    totalPrincipalPaid + totalInterestPaid + (balloonValue || 0);
  const totalCostToBuyer = totalRepayment + processingFeeAmount; // rough

  // CSV export
  function exportCSV() {
    const header = ['Month', 'EMI', 'Principal', 'Interest', 'Balance'];
    const lines = [header.join(',')].concat(
      schedule.map((r) =>
        [
          r.month,
          Math.round(r.emi),
          Math.round(r.principal),
          Math.round(r.interest),
          Math.round(r.balance),
        ].join(',')
      )
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `car-loan-schedule-${vehiclePrice}-${months}m.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Print: print only the schedule area
  function handlePrint() {
    if (!printRef.current) {
      window.print();
      return;
    }
    const printContents = printRef.current.innerHTML;
    const w = window.open('', '_blank', 'width=900,height=700');
    if (!w) {
      alert('Popup blocked — allow popups to print.');
      return;
    }
    w.document.write(`
      <html>
        <head>
          <title>Car Loan Repayment Schedule</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
            th, td { padding: 8px 10px; border: 1px solid #ddd; text-align: right; }
            th { background: #f7f7f7; text-align: left; }
            caption { font-weight: 700; margin-bottom: 8px; text-align: left; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  }

  return (
    <section className="card" style={{ marginTop: 18 }}>
      <h2>Car Loan Calculator</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="form-row">
            <label>
              Vehicle Price (₹)
              <input
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value || 0))}
                min={0}
                step={1000}
                required
              />
            </label>

            <label>
              Down Payment (₹)
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value || 0))}
                min={0}
                step={1000}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Trade-in Value (₹)
              <input
                type="number"
                value={tradeInValue}
                onChange={(e) => setTradeInValue(Number(e.target.value || 0))}
                min={0}
                step={1000}
              />
            </label>

            <label>
              Balloon / Residual at end (₹)
              <input
                type="number"
                value={balloonValue}
                onChange={(e) => setBalloonValue(Number(e.target.value || 0))}
                min={0}
                step={1000}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Interest Rate (p.a. %)
              <input
                type="number"
                step="0.01"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value || 0))}
                required
              />
            </label>

            <label>
              Tenure (Years)
              <input
                type="number"
                min={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value || 0))}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Processing Fee (% of price)
              <input
                type="number"
                step="0.01"
                value={processingFeePct}
                onChange={(e) =>
                  setProcessingFeePct(Number(e.target.value || 0))
                }
              />
            </label>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <button
                type="button"
                className="primary-cta"
                onClick={() => {
                  // calculations are reactive — no extra action required
                }}
              >
                Calculate
              </button>

              <button
                type="button"
                className="apply-btn"
                onClick={() => {
                  setVehiclePrice(1000000);
                  setDownPayment(200000);
                  setTradeInValue(0);
                  setBalloonValue(0);
                  setAnnualRate(9.5);
                  setTenureYears(5);
                  setProcessingFeePct(0.5);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Results */}
      <div className="result-grid" style={{ marginTop: 18 }}>
        <div className="result-card">
          <p className="result-label">Loan Principal</p>
          <p className="result-primary">
            {formatINR(Math.round(loanPrincipal))}
          </p>
          <p className="result-value" style={{ fontSize: 13, marginTop: 6 }}>
            (Includes processing fee{' '}
            {formatINR(Math.round(processingFeeAmount))})
          </p>
        </div>

        <div className="result-card">
          <p className="result-label">Monthly EMI (est.)</p>
          <p className="result-primary">
            {emi > 0 ? formatINR(Math.round(emi)) : '—'}
          </p>
        </div>

        <div className="result-card">
          <p className="result-label">Total Payment (incl. balloon)</p>
          <p className="result-value">
            {formatINR(Math.round(totalRepayment))}
          </p>
          <p
            className="result-value"
            style={{ fontSize: 13, color: '#6b7280' }}
          >
            Total interest ≈ {formatINR(Math.round(totalInterestPaid))}
          </p>
        </div>
      </div>

      {/* Donut + short summary */}
      <div
        style={{
          display: 'flex',
          gap: 18,
          marginTop: 18,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ textAlign: 'center', flex: '0 0 140px' }}>
          <div
            className="donut"
            style={{ width: 120, height: 120, borderRadius: '50%' }}
          />
          <div className="donut-legend" style={{ marginTop: 8 }}>
            <span>Principal</span>
            <span>Interest</span>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 240 }}>
          <h3 style={{ marginTop: 0 }}>Summary</h3>
          <p style={{ margin: '6px 0' }}>
            <strong>Vehicle:</strong> {formatINR(vehiclePrice)} •{' '}
            <strong>Down:</strong> {formatINR(downPayment)}
          </p>
          <p style={{ margin: '6px 0' }}>
            <strong>Balloon:</strong> {formatINR(balloonValue)} •{' '}
            <strong>Tenure:</strong> {tenureYears} yrs
          </p>
        </div>
      </div>

      {/* Amortization schedule (printable area) */}
      <div className="article" style={{ marginTop: 22 }}>
        <h2>Repayment Schedule</h2>

        <div
          ref={printRef}
          className="schedule-wrapper"
          style={{ marginTop: 12 }}
        >
          <table className="rate-table" style={{ width: '100%' }}>
            <caption>
              Loan: {formatINR(loanPrincipal)} • Rate: {annualRate}% p.a. •
              Tenure: {tenureYears} years
            </caption>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Month</th>
                <th style={{ textAlign: 'right' }}>EMI</th>
                <th style={{ textAlign: 'right' }}>Principal</th>
                <th style={{ textAlign: 'right' }}>Interest</th>
                <th style={{ textAlign: 'right' }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((r) => (
                <tr key={r.month}>
                  <td style={{ textAlign: 'left' }}>{r.month}</td>
                  <td style={{ textAlign: 'right' }}>
                    {emi > 0 ? formatINR(Math.round(r.emi)) : '—'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(Math.round(r.principal))}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(Math.round(r.interest))}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(Math.round(r.balance))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {balloonValue > 0 && (
            <div style={{ marginTop: 8, fontSize: 13, color: '#6b7280' }}>
              Note: Final balloon/residual of {formatINR(balloonValue)} is
              payable at the end of the term (not included in monthly EMI rows).
            </div>
          )}
        </div>

        {/* Export / Print actions below the schedule */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="table-apply-btn" onClick={exportCSV}>
            Export Schedule CSV
          </button>

          <button className="button" onClick={handlePrint}>
            Print Schedule
          </button>

          <button
            className="button"
            onClick={() => {
              const summary = `Car Loan: ${formatINR(
                loanPrincipal
              )} • ${annualRate}% p.a. • EMI ${
                emi > 0 ? formatINR(Math.round(emi)) : '—'
              } • Tenure ${tenureYears} yrs`;
              navigator.clipboard?.writeText(summary);
              alert('Summary copied to clipboard');
            }}
          >
            Copy Summary
          </button>
        </div>
      </div>
    </section>
  );
}
