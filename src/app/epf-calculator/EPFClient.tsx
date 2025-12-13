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
  const strokeWidth = Math.max(12, Math.round(size * 0.18));
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const segments = slices.map((s) => {
    const len = (s.pct / 100) * circumference;
    const seg = { ...s, len, offset };
    // eslint-disable-next-line react-hooks/immutability
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
          {/* Using the first slice for primary text, assuming it's Contributions */}
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
    <section className="article">
      <div>
        <h1>🇮🇳 Employees&apos; Provident Fund (EPF) Calculator</h1>

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
                <span>
                  Include employer special contributions/bonus (manual)
                </span>
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

          <aside
            className="emi-right"
            style={{ width: 320, flex: '0 0 320px' }}
          >
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
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Interest
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ad-box" style={{ marginTop: 12 }}>
              Ad / tooltip
            </div>
          </aside>
        </div>

        {/* Results full width - REFINED STYLING */}
        <div className="emi-results-full" style={{ marginTop: 24 }}>
          <div
            className="result-grid emi-summary-strip"
            style={{
              backgroundColor: '#f0fff4', // Pale green background
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #d1fae5', // Light border
            }}
          >
            {/* Primary Result: Estimated EPF Corpus */}
            <div
              className="result-card"
              style={{
                padding: '10px',
                border: 'none',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow:
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)', // Lifted shadow
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Corpus">
                  💰
                </span>{' '}
                Estimated EPF Corpus
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#047857',
                }}
              >
                {formatINR(Math.round(maturity))}
              </p>
            </div>

            {/* Secondary Result: Total Contributions */}
            <div
              className="result-card"
              style={{
                padding: '10px',
                border: 'none',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Invested">
                  📥
                </span>{' '}
                Total Contributions
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(totalContributed)}
              </p>
            </div>

            {/* Secondary Result: Estimated Interest Earned */}
            <div
              className="result-card"
              style={{
                padding: '10px',
                border: 'none',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Interest">
                  📈
                </span>{' '}
                Estimated Interest Earned
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#059669' }}
              >
                {formatINR(Math.round(totalInterest))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-epf">
            🌟 What is the Employees&apos; Provident Fund (EPF)?
          </h2>
          <p>
            The **Employees&apos; Provident Fund (EPF)** is a mandatory social
            security scheme for salaried employees in India. It requires a joint
            contribution from both the employer and the employee, aiming to
            provide a lump-sum corpus upon retirement or resignation.
          </p>
          <p>
            EPF is highly attractive due to its **EEE (Exempt-Exempt-Exempt)**
            tax status: contributions (up to a limit) are tax-deductible,
            interest earned is tax-free, and the withdrawal upon maturity is
            also tax-free.
          </p>
          <p>
            **Quick Notes:** EPF interest is declared by the government and
            compounds annually. The approximation here assumes monthly
            contributions and annual compounding. Employer contribution may
            include part to EPS/pension — consult your payslip for the exact
            breakup.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who Contributes to EPF?</h2>
          <p>
            EPF coverage is mandated by the Employees&apos; Provident Funds and
            Miscellaneous Provisions Act, 1952.
          </p>
          <ul>
            <li>
              **Mandatory for Employees:** Employees earning a basic salary plus
              DA (Dearness Allowance) up to ₹15,000 per month are mandatorily
              covered.
            </li>
            <li>
              **Employee Contribution:** Typically 12% of basic salary + DA.
              This contribution is eligible for deduction under **Section 80C**.
            </li>
            <li>
              **Employer Contribution:** Also 12% of basic salary + DA, but this
              is split: 3.67% goes to EPF, and 8.33% goes to the Employees&apos;
              Pension Scheme (EPS).
            </li>
            <li>
              **Exemption:** The interest earned is tax-exempt only on
              contributions up to ₹2.5 Lakh per year (as per recent changes).
            </li>
          </ul>
        </section>

        {/* 3. How can the EPF Calculator help you? */}
        <section>
          <h2 id="how-epf-helps">💡 How This EPF Calculator Helps You</h2>
          <p>
            This calculator is crucial for retirement planning, allowing you to
            project your final EPF corpus:
          </p>
          <ul>
            <li>
              **Retirement Projection:** Estimates the total corpus available at
              the end of your service period based on your current salary and
              expected returns.
            </li>
            <li>
              **Compounding Visualization:** Clearly shows how the corpus grows
              exponentially over time, with interest becoming a larger component
              than contributions in later years.
            </li>
            <li>
              **Contribution Planning:** Helps you assess the value of voluntary
              contributions (VPF) if you choose to contribute more than the
              mandated 12%.
            </li>
          </ul>
        </section>

        {/* 4. How does the EPF calculation work? */}
        <section>
          <h2 id="how-epf-works">
            ⚙️ EPF Calculation Logic and Interest Crediting
          </h2>

          <h3>EPF Interest Mechanism</h3>
          <p>
            EPF interest is declared annually by the government and is
            calculated monthly on the opening balance. However, it is only
            **credited (compounded) annually** at the end of the financial year
            (March 31st).
          </p>

          <h4>The Calculator&apos;s Logic:</h4>
          <p>
            This calculator uses an **annual iterative simulation** where
            monthly contributions are accumulated, and then the full yearly
            interest is applied to the balance at the end of each year.
          </p>
          <p>For each year ($Y$), the logic is (approximation):</p>
          <ol>
            <li>
              **Annual Contribution:** Calculate total monthly contributions (C
              <sub>employee</sub> + C<sub>employer</sub>) for 12 months.
            </li>
            <li>
              **Balance Update:** Current Balance = (Previous Balance + Annual
              Contributions).
            </li>
            <li>
              **Interest:** Interest is calculated on this updated balance using
              the annual rate ($r$).
            </li>
            <li>**New Balance:** New Balance = Balance + Interest.</li>
          </ol>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="epf-advantages">✅ Key Advantages of EPF</h2>
          <p>
            EPF is a mandatory contribution scheme that offers critical benefits
            for long-term security:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Sovereign Guarantee</h3>
              <p>
                It is a government-backed scheme, ensuring the highest level of
                capital safety and security.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Triple EEE Status</h3>
              <p>
                Contributions, interest, and maturity are all tax-exempt,
                providing maximum tax efficiency (subject to the ₹2.5L interest
                limit on contributions).
              </p>
            </div>
            <div className="advantage-card">
              <h3>High, Stable Interest</h3>
              <p>
                EPF rates are usually competitive and generally higher than
                those offered by bank savings accounts and FDs.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Mandatory Discipline</h3>
              <p>
                The compulsory nature of the contribution enforces long-term
                saving discipline, building a substantial retirement corpus.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="epf-faqs">❓ Frequently Asked Questions (FAQs) about EPF</h2>
          <div
            className="faqs-accordion"
            style={{
              display: 'grid',
              gap: '10px',
            }}
          >
            <details
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '0 15px',
                backgroundColor: '#ffffff',
              }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  padding: '15px 0',
                  cursor: 'pointer',
                  outline: 'none',
                  color: '#1f2937',
                }}
              >
                Is the employer&apos;s contribution deducted from my salary?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                No. The employer&apos;s contribution (12%) is a separate cost
                borne by the employer, usually outside of your Cost-to-Company
                (CTC) or basic salary structure. Only the employee&apos;s 12% is
                deducted from the employee&apos;s gross salary.
              </p>
            </details>
            <details
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '0 15px',
                backgroundColor: '#ffffff',
              }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  padding: '15px 0',
                  cursor: 'pointer',
                  outline: 'none',
                  color: '#1f2937',
                }}
              >
                Does the entire 12% employer contribution go to EPF?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                No. Only **3.67%** of the employer&apos;s contribution goes into
                the EPF account. The remaining **8.33%** is diverted into the
                Employee Pension Scheme (EPS), which provides pension benefits
                after retirement.
              </p>
            </details>
            <details
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '0 15px',
                backgroundColor: '#ffffff',
              }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  padding: '15px 0',
                  cursor: 'pointer',
                  outline: 'none',
                  color: '#1f2937',
                }}
              >
                Is EPF interest always tax-free?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                For most employees, yes. However, under recent rules, if an
                employee&apos;s total annual contribution exceeds **₹2.5 Lakh**,
                the interest earned on the *excess* contribution becomes
                taxable.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* Yearly schedule + export/print */}
      <div className="article" style={{ marginTop: 16 }}>
        <h2>Yearly Schedule</h2>
        <div
          ref={printRef}
          className="schedule-wrapper"
          style={{ maxHeight: 360, overflow: 'auto', overflowX: 'auto' }}
        >
          <table className="rate-table" style={{ minWidth: '550px' }}>
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
