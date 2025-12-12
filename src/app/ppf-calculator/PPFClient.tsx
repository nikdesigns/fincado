'use client';
import React, { useMemo, useRef, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

/* Small PieChart component (declared outside main render) */
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

  // build segments
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
        aria-label="Principal vs interest"
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
          {slices.reduce((s, x) => s + x.pct, 0) === 0
            ? '—'
            : `${Math.round(slices[0].pct)}%`}
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize={11}
          fill="#6b7280"
        >
          Principal / Interest share
        </text>
      </svg>
    </div>
  );
}

type ScheduleRow = {
  year: number;
  contributed: number;
  balance: number;
  interestThisYear: number;
};

export default function PPFClient() {
  // inputs
  const [mode, setMode] = useState<'monthly' | 'annual'>('monthly');
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000); // ₹1k/mo
  const [annualContribution, setAnnualContribution] = useState<number>(12000); // fallback if annual mode
  const [years, setYears] = useState<number>(15); // PPF base tenure
  const [annualRate, setAnnualRate] = useState<number>(7.1); // editable; current govt rate may differ
  const [max80CLimit, setMax80CLimit] = useState<number>(150000); // 80C limit
  const [showGrossOnly, setShowGrossOnly] = useState<boolean>(false);

  const printRef = useRef<HTMLDivElement | null>(null);

  // derived
  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = annualRate / 12 / 100;
  const yearlyRate = annualRate / 100;

  // Effective contributions per year depending on mode
  // For monthly mode we treat monthly contributions as happening each month and interest compounding monthly (approx).
  // For annual mode we assume a single contribution each year (at start of year) — annuity due assumption.
  const totalContributed = useMemo(() => {
    if (mode === 'monthly') return monthlyContribution * months;
    return annualContribution * years;
  }, [mode, monthlyContribution, annualContribution, months, years]);

  // Maturity calculations:
  // - monthly mode: use monthly SIP FV formula (annuity due approximation used in other calculators)
  // - annual mode: use annual annuity-due formula (deposit at year start) to approximate PPF yearly crediting
  const maturity = useMemo(() => {
    if (mode === 'monthly') {
      if (monthlyContribution <= 0) return 0;
      const r = monthlyRate;
      const n = months;
      if (r === 0) return monthlyContribution * n;
      const fvSIP =
        monthlyContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r); // annuity due
      return fvSIP;
    } else {
      // annual mode: use annuity due formula for contributions at year start
      if (annualContribution <= 0) return 0;
      const r = yearlyRate;
      const n = Math.max(1, years);
      if (r === 0) return annualContribution * n;
      // FV of annuity due: P * ( ( (1+r)^n - 1 ) / r ) * (1 + r)
      const fvAnnual =
        annualContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      return fvAnnual;
    }
  }, [
    mode,
    monthlyContribution,
    monthlyRate,
    months,
    annualContribution,
    yearlyRate,
    years,
  ]);

  const totalInterest = Math.max(0, Math.round(maturity - totalContributed));
  const maturityRounded = Math.round(maturity);

  // Schedule: produce per-year rows (show contribution per year and end-year balance)
  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let balance = 0;
    for (let y = 1; y <= years; y++) {
      if (mode === 'monthly') {
        // simulate 12 months for this year
        for (let m = 1; m <= 12; m++) {
          // contribution at start of month (annuity due style)
          balance += monthlyContribution;
          // monthly interest
          balance = balance * (1 + monthlyRate);
        }
        const contributedThisYear = monthlyContribution * 12;
        const interestThisYear = Math.max(
          0,
          balance -
            (rows.reduce((s, r) => s + r.contributed, 0) + contributedThisYear)
        );
        rows.push({
          year: y,
          contributed: contributedThisYear,
          balance: Math.round(balance),
          interestThisYear: Math.round(interestThisYear),
        });
      } else {
        // annual mode: deposit at year start then compound yearly
        balance += annualContribution; // deposit at start
        const before = balance;
        balance = balance * (1 + yearlyRate);
        const interestThisYear = Math.round(balance - before);
        rows.push({
          year: y,
          contributed: annualContribution,
          balance: Math.round(balance),
          interestThisYear,
        });
      }
    }
    return rows;
  }, [
    mode,
    monthlyContribution,
    monthlyRate,
    annualContribution,
    yearlyRate,
    years,
  ]);

  // Pie chart percentages: principal vs interest share
  const principalPct = useMemo(() => {
    const total = maturity === 0 ? 1 : maturity;
    return Math.max(
      0,
      Math.min(100, Math.round((totalContributed / total) * 100))
    );
  }, [maturity, totalContributed]);

  const interestPct = Math.max(0, 100 - principalPct);

  // Tax benefit under 80C (simple)
  const taxEligible = Math.min(totalContributed, max80CLimit);

  // CSV export
  function exportCSV() {
    const header = ['Year', 'Contributed', 'InterestThisYear', 'Balance'];
    const lines = [header.join(',')].concat(
      schedule.map((r) =>
        [r.year, r.contributed, r.interestThisYear, r.balance].join(',')
      )
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ppf-schedule-${years}y.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Print schedule (print area)
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
          <title>PPF Maturity Schedule</title>
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

  // setter helpers
  const setter =
    (fn: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="card">
      <h2>PPF (Public Provident Fund) Calculator</h2>

      {/* Two-column split: inputs left, pie chart right */}
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
              Contribution Mode
              <select
                value={mode}
                onChange={(e) =>
                  setMode(e.target.value as 'monthly' | 'annual')
                }
              >
                <option value="monthly">Monthly contributions</option>
                <option value="annual">Annual lump-sum (once a year)</option>
              </select>
            </label>

            {mode === 'monthly' ? (
              <label>
                Monthly Contribution (₹)
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={setter(setMonthlyContribution)}
                  min={0}
                  step={100}
                />
              </label>
            ) : (
              <label>
                Annual Contribution (₹)
                <input
                  type="number"
                  value={annualContribution}
                  onChange={setter(setAnnualContribution)}
                  min={0}
                  step={1000}
                />
                <div style={{ fontSize: 13, color: '#6b7280' }}>
                  Note: max contribution to PPF per financial year currently
                  capped by government (often ₹1.5L).
                </div>
              </label>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <label>
                Investment Period (Years)
                <input
                  type="number"
                  value={years}
                  onChange={setter((v) => setYears(Math.max(1, v)))}
                  min={1}
                />
              </label>

              <label>
                Interest Rate (% p.a.)
                <input
                  type="number"
                  value={annualRate}
                  onChange={setter(setAnnualRate)}
                  step="0.01"
                  min={0}
                />
              </label>
            </div>

            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={showGrossOnly}
                onChange={() => setShowGrossOnly(!showGrossOnly)}
              />
              <span>Show gross maturity only (ignore 80C tax note)</span>
            </label>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-cta" onClick={() => {}}>
                Calculate
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('monthly');
                  setMonthlyContribution(1000);
                  setAnnualContribution(12000);
                  setYears(15);
                  setAnnualRate(7.1);
                  setShowGrossOnly(false);
                }}
              >
                Reset
              </button>
            </div>
          </form>

          {/* Results (full width after split) will be below; keep inputs compact */}
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
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Interest</div>
                </div>
              </div>
            </div>
          </div>

          <div className="ad-box" style={{ marginTop: 12 }}>
            Ad / widget
          </div>
        </aside>
      </div>

      {/* Results: full width under split */}
      <div className="emi-results-full" style={{ marginTop: 18 }}>
        <div className="result-grid emi-summary-strip">
          <div className="result-card">
            <p className="result-label">Total Contributed</p>
            <p className="result-primary">{formatINR(totalContributed)}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Estimated Maturity</p>
            <p className="result-primary">{formatINR(maturityRounded)}</p>
          </div>

          <div className="result-card">
            <p className="result-label">Estimated Interest Earned</p>
            <p className="result-value">{formatINR(totalInterest)}</p>
          </div>
        </div>
      </div>

      {/* Quick notes */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Quick Notes</h3>
        <ul>
          <li>
            PPF interest is compounded annually. This calculator uses simple
            monthly/annual approximations to estimate growth.
          </li>
          <li>
            Contributions up to the 80C limit are tax-deductible (₹{max80CLimit}
            ).
          </li>
          <li>
            PPF maturity and rules are set by the government and may change —
            check official sources for current rates & limits.
          </li>
        </ul>
      </div>

      {/* Schedule Preview */}
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
                <th>Contributed</th>
                <th>Interest (this year)</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((r) => (
                <tr key={r.year}>
                  <td>{r.year}</td>
                  <td>{formatINR(r.contributed)}</td>
                  <td>{formatINR(r.interestThisYear)}</td>
                  <td>{formatINR(r.balance)}</td>
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
              const summary = `PPF ${
                mode === 'monthly'
                  ? `${formatINR(monthlyContribution)}/mo`
                  : `${formatINR(annualContribution)}/yr`
              } for ${years}y @ ${annualRate}% ⇒ ${formatINR(maturityRounded)}`;
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
