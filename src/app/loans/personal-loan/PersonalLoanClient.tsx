// ./src/app/loans/personal-loan/PersonalLoanClient.tsx
'use client';
import React, { useMemo, useRef, useState } from 'react';
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

/* ---------- PieChart: thick donut with rounded arc (matches other pages) ---------- */
function PieChart({
  principalPct,
  interestPct,
  size = 220,
}: {
  principalPct: number;
  interestPct: number;
  size?: number;
}) {
  const strokeWidth = Math.max(12, Math.round(size * 0.18));
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const interestLength = (interestPct / 100) * circumference;

  const dashArray =
    interestPct <= 0
      ? `0 ${circumference}`
      : interestPct >= 100
      ? `${circumference} 0`
      : `${interestLength} ${Math.max(0, circumference - interestLength)}`;

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Principal vs interest"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#a0e870"
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 420ms ease' }}
          />
        </g>
        <circle cx={cx} cy={cy} r={r * 0.5} fill="#fff" />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontWeight={800}
          fontSize={16}
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

export default function PersonalLoanClient() {
  // Defaults
  const [loanAmount, setLoanAmount] = useState<number>(300000); // ₹3L
  const [annualRate, setAnnualRate] = useState<number>(14.5);
  const [tenureYears, setTenureYears] = useState<number>(3);
  const [processingFeePct, setProcessingFeePct] = useState<number>(2);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(35000);
  const [extraEmiPercent, setExtraEmiPercent] = useState<number>(10);

  const printRef = useRef<HTMLDivElement | null>(null);

  // Derived
  const monthlyRate = useMemo(() => annualRate / 12 / 100, [annualRate]);
  const nMonths = useMemo(
    () => Math.max(1, Math.round(tenureYears * 12)),
    [tenureYears]
  );

  const emi = useMemo(() => {
    if (loanAmount <= 0 || monthlyRate <= 0) return 0;
    const r = monthlyRate;
    return (
      (loanAmount * r * Math.pow(1 + r, nMonths)) /
      (Math.pow(1 + r, nMonths) - 1)
    );
  }, [loanAmount, monthlyRate, nMonths]);

  const totalPayment = Math.round(emi * nMonths);
  const totalInterest = Math.round(Math.max(0, totalPayment - loanAmount));
  const processingFee = Math.round((processingFeePct / 100) * loanAmount);

  // Schedule
  const schedule: AmortRow[] = useMemo(() => {
    const rows: AmortRow[] = [];
    let balance = loanAmount;
    for (let m = 1; m <= nMonths; m++) {
      const interest = balance * monthlyRate;
      const principal = Math.max(0, emi - interest);
      balance = Math.max(0, balance - principal);
      rows.push({
        month: m,
        emi,
        principal,
        interest,
        balance,
      });
    }
    return rows;
  }, [loanAmount, monthlyRate, nMonths, emi]);

  // Pie percentages (principal vs interest) — use totals from schedule
  const totalPrincipalPaid = useMemo(
    () => schedule.reduce((s, r) => s + r.principal, 0),
    [schedule]
  );
  const totalInterestPaid = useMemo(
    () => schedule.reduce((s, r) => s + r.interest, 0),
    [schedule]
  );
  const totalRepayment = Math.max(
    1,
    Math.round(totalPrincipalPaid + totalInterestPaid + processingFee)
  );
  const interestPct = useMemo(
    () =>
      Math.max(
        0,
        Math.min(100, Math.round((totalInterestPaid / totalRepayment) * 100))
      ),
    [totalInterestPaid, totalRepayment]
  );
  const principalPct = Math.max(0, 100 - interestPct);

  // FOIR check
  const maxSafeEMI = Math.round(monthlyIncome * 0.5);
  const affordable = Math.round(emi) <= maxSafeEMI;

  // Prepayment simulation
  const extraEmi = useMemo(
    () => emi * (1 + extraEmiPercent / 100),
    [emi, extraEmiPercent]
  );
  const prepayment = useMemo(() => {
    let bal = loanAmount;
    let months = 0;
    let totalInterestPaidLocal = 0;
    while (bal > 0 && months < 1000) {
      months++;
      const interest = bal * monthlyRate;
      const principal = Math.min(Math.max(0, extraEmi - interest), bal);
      if (principal <= 0) break;
      bal -= principal;
      totalInterestPaidLocal += interest;
    }
    const originalInterest = schedule.reduce((s, r) => s + r.interest, 0);
    const saved = Math.max(
      0,
      Math.round(originalInterest - totalInterestPaidLocal)
    );
    return {
      newMonths: months,
      saved,
      newInterest: Math.round(totalInterestPaidLocal),
    };
  }, [extraEmi, loanAmount, monthlyRate, schedule]);

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
    a.download = `personal-loan-schedule-${loanAmount}-${nMonths}m.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Print schedule
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
          <title>Personal Loan Repayment Schedule</title>
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

  // small setters
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="card">
      <h2>Personal Loan EMI Calculator</h2>

      {/* split: left inputs, right pie chart */}
      <div className="emi-split" style={{ marginTop: 12 }}>
        <div className="emi-left">
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
                min={0}
                step={1000}
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
                min={1}
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

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-cta">Calculate</button>
              <button
                type="button"
                onClick={() => {
                  setLoanAmount(300000);
                  setAnnualRate(14.5);
                  setTenureYears(3);
                  setProcessingFeePct(2);
                  setMonthlyIncome(35000);
                  setExtraEmiPercent(10);
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

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
                principalPct={principalPct}
                interestPct={interestPct}
                size={220}
              />
              <div style={{ display: 'flex', gap: 18, marginTop: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      background: '#f1f5f9',
                      display: 'inline-block',
                      borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.02)',
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>{principalPct}%</div>
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
                    <div style={{ fontWeight: 800 }}>{interestPct}%</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Interest
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ad-box" style={{ marginTop: 14 }}>
            Ad / Bank widget
          </div>
        </aside>
      </div>

      {/* results full width */}
      <div className="emi-results-full" style={{ marginTop: 18 }}>
        <div className="result-grid emi-summary-strip">
          <div className="result-card">
            <p className="result-label">Monthly EMI</p>
            <p className="result-primary">{formatINR(Math.round(emi))}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Total Interest</p>
            <p className="result-value">{formatINR(totalInterest)}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Total Payment (incl. fee)</p>
            <p className="result-value">
              {formatINR(totalPayment + processingFee)}
            </p>
          </div>
        </div>
      </div>

      {/* Eligibility */}
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

      {/* Extra EMI */}
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

      {/* Bank rates */}
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

      {/* amortization */}
      <div className="article" style={{ marginTop: 24 }}>
        <h2>Amortization Schedule</h2>
        <div
          ref={printRef}
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

        {/* Actions */}
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
              const summary = `Personal Loan ${formatINR(
                loanAmount
              )} • ${annualRate}% p.a. • EMI ${formatINR(
                Math.round(emi)
              )} • Tenure ${tenureYears} yrs`;
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
