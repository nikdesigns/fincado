'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// schedule row type
type Row = {
  month: number;
  invested: number;
  value: number;
  returns: number;
};

export default function SavingsClient() {
  // Inputs
  const [monthlySave, setMonthlySave] = useState<number>(5000);
  const [annualReturn, setAnnualReturn] = useState<number>(6); // % typical savings acct or small MF
  const [years, setYears] = useState<number>(5);
  const [lumpNow, setLumpNow] = useState<number>(0);
  const [inflationPct, setInflationPct] = useState<number>(6);
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [salaryMonthly, setSalaryMonthly] = useState<number>(40000);
  const [emergencyMonths, setEmergencyMonths] = useState<number>(6);

  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = annualReturn / 12 / 100;
  const inflationMonthly = inflationPct / 12 / 100;

  // Future value of recurring monthly savings (SIP-like)
  const futureValue = useMemo(() => {
    if (monthlySave <= 0 && lumpNow <= 0) return 0;
    let fvMonthly = 0;
    if (monthlySave > 0) {
      // standard FV for monthly deposits at period-end
      fvMonthly =
        monthlySave *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }
    const fvLump = lumpNow * Math.pow(1 + monthlyRate, months);
    return fvMonthly + fvLump;
  }, [monthlySave, monthlyRate, months, lumpNow]);

  const totalInvested = Math.round(monthlySave * months + lumpNow);
  const totalReturns = Math.round(Math.max(0, futureValue - totalInvested));

  const realFutureValue = useMemo(() => {
    if (inflationPct <= 0) return futureValue;
    return futureValue / Math.pow(1 + inflationMonthly, months);
  }, [futureValue, inflationMonthly, months, inflationPct]);

  // Target planner: required monthly savings to reach target
  const requiredMonthlyForTarget = useMemo(() => {
    if (targetAmount <= 0) return 0;
    const factor =
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const fvLump = lumpNow * Math.pow(1 + monthlyRate, months);
    const need = Math.max(0, targetAmount - fvLump);
    if (factor <= 0) return 0;
    return Math.ceil(need / factor);
  }, [targetAmount, monthlyRate, months, lumpNow]);

  // Emergency fund calculation
  const emergencyFund = useMemo(() => {
    return Math.round(salaryMonthly * Math.max(1, emergencyMonths));
  }, [salaryMonthly, emergencyMonths]);

  // schedule preview
  const schedule: Row[] = useMemo(() => {
    const rows: Row[] = [];
    let value = lumpNow;
    for (let m = 1; m <= months; m++) {
      value = value * (1 + monthlyRate) + monthlySave;
      const invested = monthlySave * m + lumpNow;
      rows.push({
        month: m,
        invested: Math.round(invested),
        value: Math.round(value),
        returns: Math.round(value - invested),
      });
    }
    return rows;
  }, [months, monthlyRate, monthlySave, lumpNow]);

  // Export CSV
  function exportCSV() {
    const header = ['Month', 'Invested', 'Value', 'Returns'];
    const lines = [header.join(',')].concat(
      schedule.map((r) => [r.month, r.invested, r.value, r.returns].join(','))
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'savings-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // small setter helper
  const setter =
    (set: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      set(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="card">
      <h2>Savings Planner & Calculator</h2>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'grid', gap: 12 }}
      >
        <label>
          Monthly Savings (₹)
          <input
            type="number"
            value={monthlySave}
            onChange={setter(setMonthlySave)}
            min={0}
            step={100}
          />
        </label>

        <label>
          Expected Annual Return (%) — savings account / liquid fund
          <input
            type="number"
            value={annualReturn}
            onChange={setter(setAnnualReturn)}
            step="0.1"
            min={-100}
          />
        </label>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          <label>
            Duration (Years)
            <input
              type="number"
              value={years}
              onChange={setter(setYears)}
              min={0.1}
              step={0.5}
            />
          </label>
          <label>
            Existing Lump Sum (₹)
            <input
              type="number"
              value={lumpNow}
              onChange={setter(setLumpNow)}
              min={0}
              step={1000}
            />
          </label>
        </div>

        <label>
          Inflation (% per year)
          <input
            type="number"
            value={inflationPct}
            onChange={setter(setInflationPct)}
            step="0.1"
            min={0}
          />
        </label>

        <hr />

        <label>
          Target Amount (optional) (₹)
          <input
            type="number"
            value={targetAmount}
            onChange={setter(setTargetAmount)}
            min={0}
          />
        </label>

        <hr />

        <label>
          Monthly Net Salary (₹) — for emergency fund calc
          <input
            type="number"
            value={salaryMonthly}
            onChange={setter(setSalaryMonthly)}
            min={0}
          />
        </label>

        <label>
          Emergency Fund Months (e.g., 3 to 12)
          <input
            type="number"
            value={emergencyMonths}
            onChange={setter(setEmergencyMonths)}
            min={1}
            max={24}
          />
        </label>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="primary-cta">Update</button>
          <button
            type="button"
            onClick={() => {
              setMonthlySave(5000);
              setAnnualReturn(6);
              setYears(5);
              setLumpNow(0);
              setInflationPct(6);
              setTargetAmount(0);
              setSalaryMonthly(40000);
              setEmergencyMonths(6);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* RESULTS */}
      <div className="result-grid emi-summary-strip" style={{ marginTop: 12 }}>
        <div className="result-card">
          <p className="result-label">Estimated Future Value (Nominal)</p>
          <p className="result-primary">{formatINR(Math.round(futureValue))}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Total Invested</p>
          <p className="result-value">{formatINR(totalInvested)}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Total Returns (Nominal)</p>
          <p className="result-value">{formatINR(totalReturns)}</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h3>Inflation-adjusted (real) value</h3>
        <p>
          Future value in today's rupees:{' '}
          <strong>{formatINR(Math.round(realFutureValue))}</strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          Adjusted using the inflation rate entered.
        </p>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h3>Target Planner</h3>
        <p>
          Required monthly savings to reach{' '}
          <strong>
            {targetAmount > 0 ? formatINR(targetAmount) : 'your target'}
          </strong>{' '}
          in {years} years:
        </p>
        <p style={{ fontSize: 18 }}>
          <strong>{formatINR(requiredMonthlyForTarget)}</strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          This assumes expected annual return = {annualReturn}% and existing
          lump sum = {formatINR(lumpNow)}.
        </p>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h3>Emergency Fund</h3>
        <p>
          Recommended emergency corpus ({emergencyMonths} months of salary):{' '}
          <strong>{formatINR(emergencyFund)}</strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          Keep at least 3-6 months; increase if employment is uncertain or
          expenses are high.
        </p>
      </div>

      {/* Schedule preview */}
      <div className="article" style={{ marginTop: 16 }}>
        <h2>Schedule Preview (first 120 months)</h2>
        <div
          className="schedule-wrapper"
          style={{ maxHeight: 360, overflow: 'auto' }}
        >
          <table className="rate-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Invested</th>
                <th>Value</th>
                <th>Returns</th>
              </tr>
            </thead>
            <tbody>
              {schedule.slice(0, 120).map((r) => (
                <tr key={r.month}>
                  <td>{r.month}</td>
                  <td>{formatINR(r.invested)}</td>
                  <td>{formatINR(r.value)}</td>
                  <td>{formatINR(r.returns)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {schedule.length > 120 && (
          <p style={{ marginTop: 8 }}>Showing first 120 months.</p>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={exportCSV}>Export Schedule CSV</button>
          <button
            onClick={() => {
              const summary = `Save ${formatINR(
                monthlySave
              )}/mo for ${years}y @${annualReturn}% ⇒ ${formatINR(
                Math.round(futureValue)
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
