'use client';
import React, { useMemo, useRef, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

/* Simple PieChart component declared outside main render to avoid React error */
type PieSlice = { color: string; pct: number };
function PieChart({
  slices,
  size = 220,
}: {
  slices: PieSlice[];
  size?: number;
}) {
  const strokeWidth = Math.round(size * 0.18);
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const segments = slices.map((s) => {
    const len = (s.pct / 100) * circumference;
    const seg = { ...s, len, offset };
    offset += len;
    return seg;
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Contributions vs interest"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f0fdf4"
          strokeWidth={strokeWidth}
        />
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${seg.len} ${Math.max(
                0,
                circumference - seg.len
              )}`}
              strokeDashoffset={-seg.offset}
              strokeLinecap="round"
              style={{
                transition:
                  'stroke-dasharray 350ms ease, stroke-dashoffset 350ms ease',
              }}
            />
          ))}
        </g>
        <circle cx={cx} cy={cy} r={r * 0.52} fill="#fff" />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontWeight={700}
          fontSize={16}
          fill="#081225"
        >
          {slices.length ? `${Math.round(slices[0].pct)}%` : '—'}
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize={11}
          fill="#6b7280"
        >
          Contributions / Interest
        </text>
      </svg>
    </div>
  );
}

/* ---------------- EPF Client component ---------------- */
type YearRow = {
  year: number;
  employee: number;
  employer: number;
  interest: number;
  balance: number;
};

export default function EPFClient() {
  // Inputs
  const [basicSalary, setBasicSalary] = useState<number>(40000); // monthly basic + DA
  const [employeePct, setEmployeePct] = useState<number>(12); // default EPF employee contribution %
  const [employerPct, setEmployerPct] = useState<number>(12); // employer EPF contribution % (part may go to EPS)
  const [years, setYears] = useState<number>(20);
  const [annualRate, setAnnualRate] = useState<number>(8.15); // EPF interest (example)
  const [includeBonusInContribution, setIncludeBonusInContribution] =
    useState<boolean>(false);

  const printRef = useRef<HTMLDivElement | null>(null);

  // Derived
  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = annualRate / 12 / 100;
  const yearlyRate = annualRate / 100;

  // monthly contribution amounts
  const employeeMonthly = useMemo(
    () => (basicSalary * employeePct) / 100,
    [basicSalary, employeePct]
  );
  const employerMonthly = useMemo(
    () => (basicSalary * employerPct) / 100,
    [basicSalary, employerPct]
  );

  // total contributed over period
  const totalEmployeeContrib = Math.round(employeeMonthly * months);
  const totalEmployerContrib = Math.round(employerMonthly * months);

  // Build yearly schedule (EPF typically credited annually with annual interest)
  const schedule: YearRow[] = useMemo(() => {
    const rows: YearRow[] = [];
    let balance = 0;
    for (let y = 1; y <= years; y++) {
      // simulate 12 months: contributions each month, interest applied annually on running balance at year end
      for (let m = 1; m <= 12; m++) {
        balance += employeeMonthly + employerMonthly;
      }
      const beforeInterest = balance;
      balance = balance * (1 + yearlyRate); // annual interest compounding
      const interestThisYear = balance - beforeInterest;
      rows.push({
        year: y,
        employee: Math.round(employeeMonthly * 12),
        employer: Math.round(employerMonthly * 12),
        interest: Math.round(interestThisYear),
        balance: Math.round(balance),
      });
    }
    return rows;
  }, [years, employeeMonthly, employerMonthly, yearlyRate]);

  const totalContributed = Math.round(
    totalEmployeeContrib + totalEmployerContrib
  );
  const maturity = schedule.length ? schedule[schedule.length - 1].balance : 0;
  const totalInterest = Math.max(0, maturity - totalContributed);

  // Pie chart percentages
  const principalPct = Math.max(
    0,
    Math.min(100, Math.round((totalContributed / Math.max(1, maturity)) * 100))
  );
  const interestPct = Math.max(0, 100 - principalPct);

  // CSV export
  function exportCSV() {
    const header = [
      'Year',
      'EmployeeContribution',
      'EmployerContribution',
      'InterestThisYear',
      'Balance',
    ];
    const lines = [header.join(',')].concat(
      schedule.map((r) =>
        [r.year, r.employee, r.employer, r.interest, r.balance].join(',')
      )
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `epf-schedule-${years}y.csv`;
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
          <title>EPF Schedule</title>
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

  const setter =
    (fn: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="card">
      <h2>EPF Calculator</h2>

      {/* split: inputs left, pie chart right */}
      <div
        className="emi-split"
        style={{
          marginTop: 18,
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}
      >
        <div className="emi-left" style={{ flex: 1 }}>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'grid', gap: 12 }}
          >
            <label>
              Monthly Basic + DA (₹)
              <input
                type="number"
                value={basicSalary}
                onChange={setter(setBasicSalary)}
                min={0}
                step={500}
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
                Employee contribution (%)
                <input
                  type="number"
                  value={employeePct}
                  onChange={setter(setEmployeePct)}
                  min={0}
                  max={100}
                  step={0.1}
                />
              </label>

              <label>
                Employer contribution (%)
                <input
                  type="number"
                  value={employerPct}
                  onChange={setter(setEmployerPct)}
                  min={0}
                  max={100}
                  step={0.1}
                />
              </label>
            </div>

            <div
              style={{
                display: 'grid',
                alignItems: 'end',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <label>
                Years of contribution
                <input
                  type="number"
                  value={years}
                  onChange={setter((v) => setYears(Math.max(1, v)))}
                  min={1}
                />
              </label>

              <label>
                Expected EPF annual interest (%)
                <input
                  type="number"
                  step="0.01"
                  value={annualRate}
                  onChange={setter(setAnnualRate)}
                  min={0}
                />
              </label>
            </div>

            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={includeBonusInContribution}
                onChange={() =>
                  setIncludeBonusInContribution(!includeBonusInContribution)
                }
              />
              <span>Include employer special contributions/bonus (manual)</span>
            </label>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-cta" onClick={() => {}}>
                Calculate
              </button>
              <button
                type="button"
                onClick={() => {
                  setBasicSalary(40000);
                  setEmployeePct(12);
                  setEmployerPct(12);
                  setYears(20);
                  setAnnualRate(8.15);
                  setIncludeBonusInContribution(false);
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <aside className="emi-right" style={{ width: 320, flex: '0 0 320px' }}>
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: 12,
              boxShadow: 'none',
              border: 'none',
            }}
          >
            <PieChart
              slices={[
                { color: '#f0fdf4', pct: principalPct },
                { color: '#a0e870', pct: interestPct },
              ]}
              size={220}
            />

            <div
              style={{
                display: 'flex',
                gap: 18,
                marginTop: 12,
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    background: '#f0fdf4',
                    display: 'inline-block',
                    borderRadius: 6,
                    border: '1px solid rgba(0,0,0,0.03)',
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800 }}>{principalPct}%</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>
                    Contributions
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
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Interest</div>
                </div>
              </div>
            </div>
          </div>

          <div className="ad-box" style={{ marginTop: 12 }}>
            Ad / tooltip
          </div>
        </aside>
      </div>

      {/* Results full width */}
      <div className="emi-results-full" style={{ marginTop: 18 }}>
        <div className="result-grid emi-summary-strip">
          <div className="result-card">
            <p className="result-label">Total Contributions</p>
            <p className="result-primary">{formatINR(totalContributed)}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Estimated EPF Corpus</p>
            <p className="result-primary">{formatINR(Math.round(maturity))}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Estimated Interest Earned</p>
            <p className="result-value">
              {formatINR(Math.round(totalInterest))}
            </p>
          </div>
        </div>
      </div>

      {/* Quick notes */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Quick Notes</h3>
        <ul>
          <li>
            EPF interest is declared by the government and compounds annually.
          </li>
          <li>
            This calculator approximates monthly contributions and annual
            compounding.
          </li>
          <li>
            Employer contribution may include part to EPS/pension — consult
            payslip for exact breakup.
          </li>
        </ul>
      </div>

      {/* Yearly schedule + export/print */}
      <div className="article" style={{ marginTop: 16 }}>
        <h2>Yearly Schedule</h2>
        <div
          ref={printRef}
          className="schedule-wrapper"
          style={{ maxHeight: 360, overflow: 'auto' }}
        >
          <table className="rate-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Employee (yr)</th>
                <th>Employer (yr)</th>
                <th>Interest (yr)</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((r) => (
                <tr key={r.year}>
                  <td style={{ textAlign: 'left' }}>{r.year}</td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(r.employee)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(r.employer)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {formatINR(r.interest)}
                  </td>
                  <td style={{ textAlign: 'right' }}>{formatINR(r.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={exportCSV}>Export Schedule CSV</button>
          <button onClick={handlePrint}>Print Schedule</button>
          <button
            onClick={() => {
              const summary = `EPF ${formatINR(
                employeeMonthly
              )}/mo (emp) + ${formatINR(
                employerMonthly
              )}/mo (er) for ${years}y @ ${annualRate}% ⇒ ${formatINR(
                Math.round(maturity)
              )}`;
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
