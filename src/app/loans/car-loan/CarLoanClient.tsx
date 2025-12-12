// ./src/app/loans/car-loan/CarLoanClient.tsx
'use client';

import React, { useRef, useState, useMemo } from 'react';

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

/* ---------- PieChart: thick donut with rounded arc (same look as other pages) ---------- */
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
        {/* base ring = principal (pale) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />

        {/* interest arc overlay (drawn on top). Rotate -90deg to start at top */}
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

        {/* Center hole */}
        <circle cx={cx} cy={cy} r={r * 0.5} fill="#fff" />

        {/* center labels */}
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
  let emi = 0;
  if (monthlyRate === 0) {
    const principalAdjusted = loanPrincipal - balloonValue;
    emi = principalAdjusted > 0 ? principalAdjusted / months : 0;
  } else {
    const pow = Math.pow(1 + monthlyRate, months);
    const presentValueBalloon = balloonValue / pow;
    const principalAdjusted = loanPrincipal - presentValueBalloon;
    if (principalAdjusted <= 0) emi = 0;
    else emi = (principalAdjusted * monthlyRate * pow) / (pow - 1);
  }

  // Build amortization schedule:
  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let balance = loanPrincipal;
    for (let m = 1; m <= months; m++) {
      const interestPortion = balance * monthlyRate;
      let principalPortion = emi - interestPortion;
      if (principalPortion < 0) principalPortion = 0;

      if (m === months) {
        const neededPrincipalReduction = Math.max(0, balance - balloonValue);
        principalPortion = neededPrincipalReduction;
        balance = Math.max(0, balance - principalPortion);
      } else {
        balance = Math.max(0, balance - principalPortion);
      }

      rows.push({
        month: m,
        emi,
        principal: principalPortion,
        interest: interestPortion,
        balance,
      });
    }
    return rows;
  }, [loanPrincipal, months, monthlyRate, emi, balloonValue]);

  // Totals
  const totalPrincipalPaid = useMemo(
    () => schedule.reduce((s, r) => s + r.principal, 0),
    [schedule]
  );
  const totalInterestPaid = useMemo(
    () => schedule.reduce((s, r) => s + r.interest, 0),
    [schedule]
  );

  // If balloon exists and is payable at end, include it as principal (buyer cost)
  const totalRepayment = Math.round(
    totalPrincipalPaid + totalInterestPaid + (balloonValue || 0)
  );
  const totalCostToBuyer = Math.round(totalRepayment + processingFeeAmount);

  // Percentages for pie: treat balloon as principal (not interest). Denominator = totalRepayment (principal+interest+balloon)
  const interestPercent = useMemo(() => {
    if (totalRepayment <= 0) return 0;
    return Math.max(
      0,
      Math.min(100, Math.round((totalInterestPaid / totalRepayment) * 100))
    );
  }, [totalInterestPaid, totalRepayment]);

  const principalPercent = Math.max(0, 100 - interestPercent);

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

  // safe setters to avoid NaN
  const safeNumber =
    (setter: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="card" style={{ marginTop: 18 }}>
      <h2>Car Loan Calculator</h2>

      {/* ===== Two-column split: left = inputs, right = chart (only these two side-by-side) ===== */}
      <div className="emi-split" style={{ marginTop: 12 }}>
        {/* LEFT: inputs */}
        <div className="emi-left">
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'grid', gap: 12 }}>
              <div className="form-row">
                <label>
                  Vehicle Price (₹)
                  <input
                    type="number"
                    value={vehiclePrice}
                    onChange={safeNumber(setVehiclePrice)}
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
                    onChange={safeNumber(setDownPayment)}
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
                    onChange={safeNumber(setTradeInValue)}
                    min={0}
                    step={1000}
                  />
                </label>

                <label>
                  Balloon / Residual at end (₹)
                  <input
                    type="number"
                    value={balloonValue}
                    onChange={safeNumber(setBalloonValue)}
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
                    onChange={safeNumber(setAnnualRate)}
                    required
                  />
                </label>

                <label>
                  Tenure (Years)
                  <input
                    type="number"
                    min={1}
                    value={tenureYears}
                    onChange={safeNumber(setTenureYears)}
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
                    onChange={safeNumber(setProcessingFeePct)}
                  />
                </label>

                <div
                  style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}
                >
                  <button
                    type="button"
                    className="primary-cta"
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
        </div>

        {/* RIGHT: chart only */}
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

          <div className="ad-box" style={{ marginTop: 14 }}>
            Ad / Bank widget
          </div>
        </aside>
      </div>

      {/* ===== RESULTS SECTION: full width below the split ===== */}
      <div className="emi-results-full" style={{ marginTop: 18 }}>
        <div className="result-grid" style={{ gap: 12 }}>
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
      </div>

      {/* Repayment schedule (printable area) */}
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
