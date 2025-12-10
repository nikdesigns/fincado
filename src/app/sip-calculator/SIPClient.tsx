'use client';
import React, { useMemo, useState } from 'react';

function formatINR(value: number) {
  return (
    '₹' + Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 })
  );
}

function round(value: number, digits = 0) {
  return Number(value.toFixed(digits));
}

type ScheduleRow = {
  month: number;
  invested: number;
  value: number;
  returns: number;
};

export default function SIPClient() {
  // Inputs
  const [monthlySIP, setMonthlySIP] = useState<number>(5000);
  const [annualReturn, setAnnualReturn] = useState<number>(12); // %
  const [years, setYears] = useState<number>(10);
  const [lumpSumNow, setLumpSumNow] = useState<number>(0); // optional existing corpus
  const [inflationPct, setInflationPct] = useState<number>(6); // optional
  const [targetAmount, setTargetAmount] = useState<number>(0); // optional target planner

  // Derived
  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = annualReturn / 12 / 100;
  const inflationMonthly = inflationPct / 12 / 100;

  // Future Value of SIP formula:
  // FV = P * [ ( (1 + r)^n - 1 ) / r ] * (1 + r)
  const futureValue = useMemo(() => {
    if (monthlySIP <= 0 && lumpSumNow <= 0) return 0;
    let fvSIP = 0;
    if (monthlySIP > 0) {
      fvSIP =
        monthlySIP *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }
    // future value of lump sum now
    const fvLump = lumpSumNow * Math.pow(1 + monthlyRate, months);
    return fvSIP + fvLump;
  }, [monthlySIP, monthlyRate, months, lumpSumNow]);

  const totalInvested = Math.round(monthlySIP * months + lumpSumNow);
  const totalReturns = Math.round(Math.max(0, futureValue - totalInvested));

  // CAGR (effective annualized return) computed from FV = PV*(1+R)^years
  const cagr = useMemo(() => {
    if (totalInvested <= 0) return 0;
    // totalInvested here isn't the correct PV for SIP; better to compute XIRR-ish estimate.
    // For simple approximation, derive annualized r from FV and invested timeline using IRR is complex.
    // We'll compute approximate annualized return by solving (FV) = invested_monthly * factor -> approximate using internal rate is expensive.
    // Instead compute nominal annualized return = given annualReturn (user input) — show that separately.
    return annualReturn;
  }, [annualReturn, totalInvested]);

  // Inflation-adjusted (real) value
  const realFutureValue = useMemo(() => {
    if (inflationPct <= 0) return futureValue;
    return futureValue / Math.pow(1 + inflationMonthly, months);
  }, [futureValue, inflationMonthly, months, inflationPct]);

  // schedule preview (monthly) — show first N months and last few
  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let value = lumpSumNow;
    for (let m = 1; m <= months; m++) {
      // add monthly SIP at start of period
      value = value * (1 + monthlyRate) + monthlySIP;
      const invested = monthlySIP * m + lumpSumNow;
      rows.push({
        month: m,
        invested: Math.round(invested),
        value: Math.round(value),
        returns: Math.round(value - invested),
      });
    }
    return rows;
  }, [months, monthlyRate, monthlySIP, lumpSumNow]);

  // Target planner: if user sets targetAmount >0, compute required monthly SIP to reach target in given years
  const requiredSIPForTarget = useMemo(() => {
    if (targetAmount <= 0) return 0;
    // Let x = required monthly SIP. FV from monthly SIP + lumpSumNow must equal targetAmount:
    // x * ((1+r)^n -1)/r * (1+r) + lumpSumNow*(1+r)^n = target
    const factor =
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const fvLump = lumpSumNow * Math.pow(1 + monthlyRate, months);
    const needFromSIP = Math.max(0, targetAmount - fvLump);
    if (factor <= 0) return 0;
    return Math.ceil(needFromSIP / factor);
  }, [targetAmount, monthlyRate, months, lumpSumNow]);

  // Function to export schedule CSV
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
    a.download = 'sip-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Small safe setter
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  return (
    <section className="card">
      <h2>SIP Calculator</h2>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'grid', gap: 12 }}
      >
        <label>
          Monthly SIP (₹)
          <input
            type="number"
            value={monthlySIP}
            onChange={setter(setMonthlySIP)}
            min={0}
            step={100}
          />
        </label>

        <label>
          Expected Annual Return (%)
          <input
            type="number"
            value={annualReturn}
            onChange={setter(setAnnualReturn)}
            step="0.1"
            min={-100}
          />
        </label>

        <label>
          Investment Duration (Years)
          <input
            type="number"
            value={years}
            onChange={setter(setYears)}
            min={0.1}
            step={0.5}
          />
        </label>

        <label>
          Existing Lump Sum (optional) (₹)
          <input
            type="number"
            value={lumpSumNow}
            onChange={setter(setLumpSumNow)}
            min={0}
            step={1000}
          />
        </label>

        <label>
          Inflation (% per year, optional)
          <input
            type="number"
            value={inflationPct}
            onChange={setter(setInflationPct)}
            step="0.1"
            min={0}
          />
        </label>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="primary-cta">Update</button>
          <button
            type="button"
            onClick={() => {
              setMonthlySIP(5000);
              setAnnualReturn(12);
              setYears(10);
              setLumpSumNow(0);
              setInflationPct(6);
              setTargetAmount(0);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Results */}
      <div className="result-grid emi-summary-strip" style={{ marginTop: 16 }}>
        <div className="result-card">
          <p className="result-label">Estimated Value (Nominal)</p>
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

      {/* Real / Inflation-adjusted */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Inflation-adjusted value</h3>
        <p>
          Estimated future value in today's rupees:{' '}
          <strong>{formatINR(Math.round(realFutureValue))}</strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          Adjusted using the inflation rate you set; use this to gauge
          purchasing power.
        </p>
      </div>

      {/* Target planner */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Target Planner</h3>
        <label>
          Target Amount (₹)
          <input
            type="number"
            value={targetAmount}
            onChange={setter(setTargetAmount)}
            min={0}
          />
        </label>
        <p style={{ marginTop: 8 }}>
          Required monthly SIP to reach{' '}
          {targetAmount > 0 ? formatINR(targetAmount) : 'your target'} in{' '}
          {years} years: <strong>{formatINR(requiredSIPForTarget)}</strong>
        </p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          This assumes expected annual return = {annualReturn}% and existing
          lump sum = {formatINR(lumpSumNow)}.
        </p>
      </div>

      {/* Schedule preview */}
      <div className="article" style={{ marginTop: 18 }}>
        <h2>Schedule Preview</h2>
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
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <button onClick={exportCSV}>Export Schedule CSV</button>
        <button
          onClick={() => {
            // quick copy summary
            const summary = `SIP ${formatINR(
              monthlySIP
            )} for ${years} years at ${annualReturn}% ⇒ ${formatINR(
              Math.round(futureValue)
            )} (Invested ${formatINR(totalInvested)})`;
            navigator.clipboard?.writeText(summary);
            alert('Summary copied to clipboard');
          }}
        >
          Copy Summary
        </button>
      </div>
    </section>
  );
}
