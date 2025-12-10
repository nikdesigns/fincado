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

export default function EducationLoanClient() {
  // inputs
  const [loanAmount, setLoanAmount] = useState<number>(800000);
  const [annualRate, setAnnualRate] = useState<number>(10.5);
  const [repayYears, setRepayYears] = useState<number>(7);
  const [moratoriumMonths, setMoratoriumMonths] = useState<number>(24);
  const [processingFeePct, setProcessingFeePct] = useState<number>(0.5);
  const [moratoriumMode, setMoratoriumMode] = useState<
    'capitalise' | 'interest-only' | 'no-pay'
  >('capitalise');

  const printRef = useRef<HTMLDivElement | null>(null);

  const monthlyRate = annualRate / 100 / 12;
  const repaymentMonths = Math.max(1, repayYears * 12);
  const processingFeeAmount = (processingFeePct / 100) * loanAmount;

  // compute principal after moratorium & accrued interest
  let principalAfterMoratorium = loanAmount;
  let moratoriumAccruedInterest = 0;
  let moratoriumInterestPaid = 0;

  if (moratoriumMonths > 0) {
    let tempBal = loanAmount;
    for (let m = 0; m < moratoriumMonths; m++) {
      const interestThisMonth = tempBal * monthlyRate;
      if (moratoriumMode === 'capitalise' || moratoriumMode === 'no-pay') {
        tempBal += interestThisMonth;
        moratoriumAccruedInterest += interestThisMonth;
      } else {
        // interest-only
        moratoriumInterestPaid += interestThisMonth;
      }
    }
    principalAfterMoratorium = tempBal;
  } else {
    principalAfterMoratorium = loanAmount;
  }

  // EMI for repayment period
  let emi = 0;
  if (monthlyRate === 0) {
    emi = principalAfterMoratorium / repaymentMonths;
  } else {
    const pow = Math.pow(1 + monthlyRate, repaymentMonths);
    emi = (principalAfterMoratorium * monthlyRate * pow) / (pow - 1);
  }

  // build amortization schedule
  const schedule: ScheduleRow[] = [];
  let balance = principalAfterMoratorium;
  for (let m = 1; m <= repaymentMonths; m++) {
    const interestPortion = balance * monthlyRate;
    const principalPortion = Math.min(balance, emi - interestPortion || 0);
    balance = Math.max(0, balance - principalPortion);

    schedule.push({
      month: m,
      emi,
      principal: principalPortion,
      interest: interestPortion,
      balance,
    });
  }

  const totalRepayment =
    emi * repaymentMonths +
    (moratoriumMode === 'interest-only' ? moratoriumInterestPaid : 0);
  const totalInterest = totalRepayment - loanAmount - processingFeeAmount;

  // CSV export (same pattern as your SIP)
  function exportCsv() {
    const headers = ['Month', 'EMI', 'Principal', 'Interest', 'Balance'];
    const rows = schedule.map((r) => [
      r.month.toString(),
      Math.round(r.emi).toString(),
      Math.round(r.principal).toString(),
      Math.round(r.interest).toString(),
      Math.round(r.balance).toString(),
    ]);
    const csvContent = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `education-loan-schedule-${loanAmount}-${repaymentMonths}m.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // Print handler prints only the schedule area (printRef)
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
          <title>Repayment Schedule</title>
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
      <h2>Education Loan Calculator</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="form-row">
            <label>
              Loan Amount (₹)
              <input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value || 0))}
                required
              />
            </label>

            <label>
              Interest Rate (p.a. %)
              <input
                id="annualRate"
                type="number"
                step="0.01"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value || 0))}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Moratorium (study) months
              <input
                id="moratoriumMonths"
                type="number"
                min={0}
                value={moratoriumMonths}
                onChange={(e) =>
                  setMoratoriumMonths(Math.max(0, Number(e.target.value || 0)))
                }
              />
            </label>

            <label>
              Moratorium Mode
              <select
                value={moratoriumMode}
                onChange={(e) =>
                  setMoratoriumMode(
                    e.target.value as 'capitalise' | 'interest-only' | 'no-pay'
                  )
                }
                style={{ marginTop: 6 }}
              >
                <option value="capitalise">
                  Capitalise unpaid interest (adds to principal)
                </option>
                <option value="interest-only">
                  Interest-only (you pay interest during moratorium)
                </option>
                <option value="no-pay">
                  No-pay (interest accrues and is capitalised at end)
                </option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Repayment Tenure (Years)
              <input
                id="repayYears"
                type="number"
                min={1}
                value={repayYears}
                onChange={(e) =>
                  setRepayYears(Math.max(1, Number(e.target.value || 0)))
                }
                required
              />
            </label>

            <label>
              Processing Fee (%)
              <input
                id="processingFeePct"
                type="number"
                step="0.01"
                value={processingFeePct}
                onChange={(e) =>
                  setProcessingFeePct(Number(e.target.value || 0))
                }
              />
            </label>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
            <button
              className="primary-cta"
              type="button"
              onClick={() => {
                /* calculations reactive */
              }}
            >
              Calculate
            </button>

            <button
              type="button"
              className="apply-btn"
              onClick={() => {
                setLoanAmount(800000);
                setAnnualRate(10.5);
                setRepayYears(7);
                setMoratoriumMonths(24);
                setMoratoriumMode('capitalise');
                setProcessingFeePct(0.5);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Results */}
      <div className="result-grid" style={{ marginTop: 18 }}>
        <div className="result-card">
          <p className="result-label">Principal (after moratorium)</p>
          <p className="result-primary">
            {formatINR(Math.round(principalAfterMoratorium))}
          </p>
        </div>

        <div className="result-card">
          <p className="result-label">Monthly EMI</p>
          <p className="result-primary">{formatINR(Math.round(emi))}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Total Est. Interest</p>
          <p className="result-value">
            {formatINR(Math.max(0, Math.round(totalRepayment - loanAmount)))}
          </p>
        </div>
      </div>

      {/* Donut + summary */}
      <div
        style={{
          display: 'flex',
          gap: 18,
          marginTop: 18,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ textAlign: 'center', flex: '0 0 160px' }}>
          <div
            className="donut"
            style={{
              background: 'conic-gradient(#16a34a 0% 60%, #ef4444 60% 100%)',
            }}
          />
          <div className="donut-legend" style={{ marginTop: 8 }}>
            <span>🟢 Principal</span>
            <span>🔴 Interest</span>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 240 }}>
          <h3 style={{ marginTop: 0 }}>Summary</h3>

          <p style={{ margin: '6px 0' }}>
            <strong>Moratorium mode:</strong>{' '}
            {moratoriumMode === 'capitalise'
              ? 'Capitalise unpaid interest'
              : moratoriumMode === 'interest-only'
              ? 'Interest-only payments'
              : 'No-pay (interest accrues)'}
          </p>

          <p style={{ margin: '6px 0' }}>
            <strong>Moratorium accrued interest (informal):</strong>{' '}
            {moratoriumMode === 'interest-only'
              ? formatINR(Math.round(moratoriumInterestPaid))
              : formatINR(Math.round(moratoriumAccruedInterest))}
          </p>

          <p style={{ margin: '6px 0' }}>
            <strong>Repayment months:</strong> {repaymentMonths}
          </p>
        </div>
      </div>

      {/* Amortization schedule (printable area) */}
      <div className="article" style={{ marginTop: 22 }}>
        <h2>Repayment Schedule (post-moratorium)</h2>
        <div
          ref={printRef}
          className="schedule-wrapper"
          style={{ marginTop: 12 }}
        >
          <table className="rate-table" style={{ width: '100%' }}>
            <caption>
              Loan: {formatINR(loanAmount)} • Rate: {annualRate}% p.a. •
              Moratorium: {moratoriumMonths} months ({moratoriumMode})
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
                    {formatINR(Math.round(r.emi))}
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
              {schedule.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    No repayment months (check inputs)
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Export / Print actions below the schedule (moved as requested) */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="table-apply-btn" onClick={exportCsv}>
            Export Schedule CSV
          </button>

          <button className="button" onClick={handlePrint}>
            Print Schedule
          </button>

          <button
            className="button"
            onClick={() => {
              const summary = `Education Loan ₹${loanAmount} • ${annualRate}% p.a. • EMI ${formatINR(
                Math.round(emi)
              )} • Tenure ${repayYears} years`;
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
