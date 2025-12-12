// ./src/app/loans/education-loan/EducationLoanClient.tsx
'use client';

import React, { useMemo, useRef, useState } from 'react';

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

/* ---------- PieChart: thick donut with rounded arc (matches other calculators) ---------- */
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

  // derived memoized values
  const monthlyRate = useMemo(() => annualRate / 100 / 12, [annualRate]);
  const repaymentMonths = useMemo(
    () => Math.max(1, repayYears * 12),
    [repayYears]
  );
  const processingFeeAmount = useMemo(
    () => (processingFeePct / 100) * loanAmount,
    [processingFeePct, loanAmount]
  );

  // principal after moratorium and moratorium interest bookkeeping
  const {
    principalAfterMoratorium,
    moratoriumAccruedInterest,
    moratoriumInterestPaid,
  } = useMemo(() => {
    let principal = loanAmount;
    let accrued = 0;
    let interestPaid = 0;

    if (moratoriumMonths > 0 && monthlyRate > 0) {
      let temp = loanAmount;
      for (let m = 0; m < moratoriumMonths; m++) {
        const interestThisMonth = temp * monthlyRate;
        if (moratoriumMode === 'interest-only') {
          interestPaid += interestThisMonth;
        } else {
          // capitalise or no-pay both accrue onto balance
          accrued += interestThisMonth;
          temp += interestThisMonth;
        }
      }
      return {
        principalAfterMoratorium: Math.max(0, temp),
        moratoriumAccruedInterest: accrued,
        moratoriumInterestPaid: interestPaid,
      };
    }

    return {
      principalAfterMoratorium: principal,
      moratoriumAccruedInterest: 0,
      moratoriumInterestPaid: 0,
    };
  }, [loanAmount, moratoriumMonths, monthlyRate, moratoriumMode]);

  // EMI for repayment period (post-moratorium principal)
  const emi = useMemo(() => {
    const P = principalAfterMoratorium;
    const n = repaymentMonths;
    const r = monthlyRate;
    if (P <= 0 || n <= 0) return 0;
    if (r === 0) return P / n;
    const pow = Math.pow(1 + r, n);
    return (P * r * pow) / (pow - 1);
  }, [principalAfterMoratorium, repaymentMonths, monthlyRate]);

  // build amortization schedule for repaymentMonths
  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let balance = principalAfterMoratorium;
    for (let m = 1; m <= repaymentMonths; m++) {
      const interestPortion = balance * monthlyRate;
      const principalPortion = Math.min(
        balance,
        Math.max(0, emi - interestPortion)
      );
      balance = Math.max(0, balance - principalPortion);
      rows.push({
        month: m,
        emi,
        principal: principalPortion,
        interest: interestPortion,
        balance,
      });
    }
    return rows;
  }, [principalAfterMoratorium, repaymentMonths, monthlyRate, emi]);

  // totals
  const totalRepayment = useMemo(() => {
    // If interest-only during moratorium, user pays moratoriumInterestPaid up front (included)
    const moratoriumPaid =
      moratoriumMode === 'interest-only' ? moratoriumInterestPaid : 0;
    return Math.round(emi * repaymentMonths + moratoriumPaid);
  }, [emi, repaymentMonths, moratoriumMode, moratoriumInterestPaid]);

  const totalInterest = useMemo(
    () => Math.max(0, totalRepayment - loanAmount - processingFeeAmount),
    [totalRepayment, loanAmount, processingFeeAmount]
  );

  // pie percentages
  const { principalPct, interestPct } = useMemo(() => {
    const principalPaid = schedule.reduce((s, r) => s + r.principal, 0);
    const interestPaid =
      schedule.reduce((s, r) => s + r.interest, 0) +
      (moratoriumMode === 'interest-only' ? moratoriumInterestPaid : 0) +
      (moratoriumMode !== 'interest-only' ? moratoriumAccruedInterest : 0);
    const total = Math.max(
      1,
      principalPaid + interestPaid + processingFeeAmount
    ); // avoid divide by zero
    const ip = Math.round((interestPaid / total) * 100);
    const pp = Math.max(0, 100 - ip);
    return { principalPct: pp, interestPct: ip };
  }, [
    schedule,
    moratoriumInterestPaid,
    moratoriumAccruedInterest,
    processingFeeAmount,
  ]);

  // small setters
  const setNumber =
    (setter: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value === '' ? 0 : Number(e.target.value));
    };

  // CSV export
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

  // Print handler prints only the schedule area
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

      {/* split: inputs left, pie chart right */}
      <div className="emi-split" style={{ marginTop: 12 }}>
        <div className="emi-left">
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'grid', gap: 12 }}
          >
            <label>
              Loan Amount (₹)
              <input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={setNumber(setLoanAmount)}
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
                onChange={setNumber(setAnnualRate)}
                required
              />
            </label>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <label>
                Moratorium months
                <input
                  id="moratoriumMonths"
                  type="number"
                  min={0}
                  value={moratoriumMonths}
                  onChange={(e) =>
                    setMoratoriumMonths(
                      Math.max(0, Number(e.target.value || 0))
                    )
                  }
                />
              </label>

              <label>
                Repayment years
                <input
                  id="repayYears"
                  type="number"
                  min={1}
                  value={repayYears}
                  onChange={(e) =>
                    setRepayYears(Math.max(1, Number(e.target.value || 0)))
                  }
                />
              </label>
            </div>

            <label>
              Moratorium mode
              <select
                value={moratoriumMode}
                onChange={(e) => setMoratoriumMode(e.target.value as any)}
                style={{ marginTop: 6 }}
              >
                <option value="capitalise">
                  Capitalise unpaid interest (adds to principal)
                </option>
                <option value="interest-only">
                  Interest-only (you pay interest during moratorium)
                </option>
                <option value="no-pay">
                  No-pay (interest accrues and is capitalised)
                </option>
              </select>
            </label>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <label>
                Processing Fee (%)
                <input
                  id="processingFeePct"
                  type="number"
                  step="0.01"
                  value={processingFeePct}
                  onChange={setNumber(setProcessingFeePct)}
                />
              </label>

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <button
                  className="primary-cta"
                  type="button"
                  onClick={() => {
                    /* reactive */
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

      {/* results full width below split */}
      <div className="emi-results-full" style={{ marginTop: 18 }}>
        <div className="result-grid emi-summary-strip">
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
            <p className="result-label">Total Estimated Interest</p>
            <p className="result-value">
              {formatINR(Math.max(0, Math.round(totalInterest)))}
            </p>
          </div>
        </div>
      </div>

      {/* compact summary card (keeps flow consistent with other calculators) */}
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Summary</h3>
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

      {/* Amortization schedule */}
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
              {schedule.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    No repayment months (check inputs)
                  </td>
                </tr>
              ) : (
                schedule.map((r) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Export / Print actions below the schedule */}
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
              const summary = `Education Loan ${formatINR(
                loanAmount
              )} • ${annualRate}% p.a. • EMI ${formatINR(
                Math.round(emi)
              )} • Tenure ${repayYears} yrs`;
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
