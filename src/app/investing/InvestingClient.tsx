'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// basic asset class return assumptions (nominal annual, editable by user below)
const DEFAULT_ASSET_RETURNS = {
  equity: 12, // %
  debt: 7,
  gold: 6,
  cash: 4,
};

type ScheduleRow = {
  month: number;
  invested: number;
  value: number;
  returns: number;
};

export default function InvestingClient() {
  // Inputs: mixed planning (SIP + lumpsum)
  const [monthlySIP, setMonthlySIP] = useState<number>(5000);
  const [lumpSum, setLumpSum] = useState<number>(0);
  const [years, setYears] = useState<number>(10);
  const [assetEquityPct, setAssetEquityPct] = useState<number>(60);
  const [assetDebtPct, setAssetDebtPct] = useState<number>(30);
  const [assetGoldPct, setAssetGoldPct] = useState<number>(5);
  const [assetCashPct, setAssetCashPct] = useState<number>(5);
  const [equityReturn, setEquityReturn] = useState<number>(
    DEFAULT_ASSET_RETURNS.equity
  );
  const [debtReturn, setDebtReturn] = useState<number>(
    DEFAULT_ASSET_RETURNS.debt
  );
  const [goldReturn, setGoldReturn] = useState<number>(
    DEFAULT_ASSET_RETURNS.gold
  );
  const [cashReturn, setCashReturn] = useState<number>(
    DEFAULT_ASSET_RETURNS.cash
  );
  const [inflationPct, setInflationPct] = useState<number>(6);

  // derived
  const months = Math.max(1, Math.round(years * 12));
  const monthlyRateEquity = equityReturn / 12 / 100;
  const monthlyRateDebt = debtReturn / 12 / 100;
  const monthlyRateGold = goldReturn / 12 / 100;
  const monthlyRateCash = cashReturn / 12 / 100;

  // normalize allocation so it sums to 100 (avoid divide by zero)
  const totalAlloc = Math.max(
    1,
    assetEquityPct + assetDebtPct + assetGoldPct + assetCashPct
  );
  const alloc = {
    equity: assetEquityPct / totalAlloc,
    debt: assetDebtPct / totalAlloc,
    gold: assetGoldPct / totalAlloc,
    cash: assetCashPct / totalAlloc,
  };

  // helper: future value of monthly SIP for single asset monthly rate
  function futureValueSIP(
    monthly: number,
    monthlyRate: number,
    monthsLocal: number
  ) {
    if (monthly <= 0) return 0;
    if (monthlyRate === 0) return monthly * monthsLocal;
    return (
      monthly *
      ((Math.pow(1 + monthlyRate, monthsLocal) - 1) / monthlyRate) *
      (1 + monthlyRate)
    );
  }

  // helper: future value of lumpsum for single asset monthly rate
  function futureValueLumpsum(
    lumpsum: number,
    monthlyRate: number,
    monthsLocal: number
  ) {
    if (lumpsum <= 0) return 0;
    return lumpsum * Math.pow(1 + monthlyRate, monthsLocal);
  }

  // compute per-asset future values and aggregate
  const perAssetFuture = useMemo(() => {
    const fv = {
      equity:
        futureValueSIP(monthlySIP * alloc.equity, monthlyRateEquity, months) +
        futureValueLumpsum(lumpSum * alloc.equity, monthlyRateEquity, months),
      debt:
        futureValueSIP(monthlySIP * alloc.debt, monthlyRateDebt, months) +
        futureValueLumpsum(lumpSum * alloc.debt, monthlyRateDebt, months),
      gold:
        futureValueSIP(monthlySIP * alloc.gold, monthlyRateGold, months) +
        futureValueLumpsum(lumpSum * alloc.gold, monthlyRateGold, months),
      cash:
        futureValueSIP(monthlySIP * alloc.cash, monthlyRateCash, months) +
        futureValueLumpsum(lumpSum * alloc.cash, monthlyRateCash, months),
    };
    const total = fv.equity + fv.debt + fv.gold + fv.cash;
    return { ...fv, total };
  }, [
    monthlySIP,
    lumpSum,
    alloc.equity,
    alloc.debt,
    alloc.gold,
    alloc.cash,
    monthlyRateEquity,
    monthlyRateDebt,
    monthlyRateGold,
    monthlyRateCash,
    months,
  ]);

  // invested amount
  const totalInvested = Math.round(monthlySIP * months + lumpSum);
  const totalFuture = Math.round(perAssetFuture.total);
  const totalReturns = Math.max(0, totalFuture - totalInvested);

  // approximate blended CAGR (annualized return) from invested flows -> using a simple approximation:
  // We compute approximate annualized return by solving for r in FV = sum_{k=1..n} cashflow_k*(1+r)^{(T-k)/12}
  // For simplicity and speed, approximate blended annual return as weighted average of asset returns by allocation.
  const approxBlendedAnnualReturn = useMemo(() => {
    const weighted =
      alloc.equity * equityReturn +
      alloc.debt * debtReturn +
      alloc.gold * goldReturn +
      alloc.cash * cashReturn;
    return Number(weighted.toFixed(2));
  }, [alloc, equityReturn, debtReturn, goldReturn, cashReturn]);

  // inflation adjusted value
  const realFutureValue = useMemo(() => {
    if (inflationPct <= 0) return totalFuture;
    const monthlyInflation = inflationPct / 12 / 100;
    return totalFuture / Math.pow(1 + monthlyInflation, months);
  }, [totalFuture, inflationPct, months]);

  // schedule preview: compute blended monthly growth by tracking a single portfolio value
  const schedule: ScheduleRow[] = useMemo(() => {
    const rows: ScheduleRow[] = [];
    // start with lumpsum split across assets
    let vEquity = lumpSum * alloc.equity;
    let vDebt = lumpSum * alloc.debt;
    let vGold = lumpSum * alloc.gold;
    let vCash = lumpSum * alloc.cash;

    for (let m = 1; m <= months; m++) {
      // add monthly SIP split
      vEquity = vEquity * (1 + monthlyRateEquity) + monthlySIP * alloc.equity;
      vDebt = vDebt * (1 + monthlyRateDebt) + monthlySIP * alloc.debt;
      vGold = vGold * (1 + monthlyRateGold) + monthlySIP * alloc.gold;
      vCash = vCash * (1 + monthlyRateCash) + monthlySIP * alloc.cash;

      const totalValue = vEquity + vDebt + vGold + vCash;
      const invested = monthlySIP * m + lumpSum;
      rows.push({
        month: m,
        invested: Math.round(invested),
        value: Math.round(totalValue),
        returns: Math.round(totalValue - invested),
      });
    }
    return rows;
  }, [
    months,
    lumpSum,
    monthlySIP,
    alloc.equity,
    alloc.debt,
    alloc.gold,
    alloc.cash,
    monthlyRateEquity,
    monthlyRateDebt,
    monthlyRateGold,
    monthlyRateCash,
  ]);

  // quick allocation advice based on age heuristic (rule of thumb)
  const allocationAdvice = useMemo(() => {
    // suggested equity % = 100 - age (but we don't have age). Use conservative heuristic based on years horizon:
    if (years >= 15)
      return 'Long horizon — consider higher equity allocation (60-80%) for growth.';
    if (years >= 7)
      return 'Medium-long horizon — balanced allocation (50-65% equity) is common.';
    if (years >= 3)
      return 'Medium horizon — consider 40-60% equity, blend with debt.';
    return 'Short horizon — favour safer instruments (debt/cash) to preserve capital.';
  }, [years]);

  // risk note based on equity weight
  const riskNote = useMemo(() => {
    const eq = alloc.equity * 100;
    if (eq >= 70)
      return 'High risk: portfolio is equity-heavy — expect higher volatility.';
    if (eq >= 50)
      return 'Moderate-High risk: good for growth but expect ups and downs.';
    if (eq >= 30) return 'Moderate risk: balanced mix of growth and stability.';
    return 'Low risk: conservative allocation prioritising capital preservation.';
  }, [alloc]);

  // CSV export
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
    a.download = 'investing-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // setters helper
  const setter =
    (set: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      set(e.target.value === '' ? 0 : Number(e.target.value));

  // quick preset allocations
  const applyPreset = (name: 'conservative' | 'balanced' | 'growth') => {
    if (name === 'conservative') {
      setAssetEquityPct(30);
      setAssetDebtPct(50);
      setAssetGoldPct(10);
      setAssetCashPct(10);
    } else if (name === 'balanced') {
      setAssetEquityPct(50);
      setAssetDebtPct(35);
      setAssetGoldPct(10);
      setAssetCashPct(5);
    } else {
      setAssetEquityPct(70);
      setAssetDebtPct(20);
      setAssetGoldPct(5);
      setAssetCashPct(5);
    }
  };

  return (
    <section className="card">
      <h2>Investing Planner</h2>

      {/* Inputs */}
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'grid', gap: 12 }}
      >
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          <label>
            Monthly SIP (₹)
            <input
              type="number"
              value={monthlySIP}
              onChange={setter(setMonthlySIP)}
              min={0}
            />
          </label>

          <label>
            Lumpsum Now (₹)
            <input
              type="number"
              value={lumpSum}
              onChange={setter(setLumpSum)}
              min={0}
            />
          </label>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          <label>
            Investment Horizon (Years)
            <input
              type="number"
              value={years}
              onChange={setter(setYears)}
              min={0.5}
              step={0.5}
            />
          </label>

          <label>
            Inflation (%)
            <input
              type="number"
              value={inflationPct}
              onChange={setter(setInflationPct)}
              min={0}
              step={0.1}
            />
          </label>
        </div>

        <div>
          <strong>Allocation Presets</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button type="button" onClick={() => applyPreset('conservative')}>
              Conservative
            </button>
            <button type="button" onClick={() => applyPreset('balanced')}>
              Balanced
            </button>
            <button type="button" onClick={() => applyPreset('growth')}>
              Growth
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
          <label>
            Equity %{' '}
            <input
              type="number"
              value={assetEquityPct}
              onChange={setter(setAssetEquityPct)}
              min={0}
              max={100}
            />
          </label>
          <label>
            Debt %{' '}
            <input
              type="number"
              value={assetDebtPct}
              onChange={setter(setAssetDebtPct)}
              min={0}
              max={100}
            />
          </label>
          <label>
            Gold %{' '}
            <input
              type="number"
              value={assetGoldPct}
              onChange={setter(setAssetGoldPct)}
              min={0}
              max={100}
            />
          </label>
          <label>
            Cash %{' '}
            <input
              type="number"
              value={assetCashPct}
              onChange={setter(setAssetCashPct)}
              min={0}
              max={100}
            />
          </label>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          <label>
            Expected Equity Return (% p.a.)
            <input
              type="number"
              value={equityReturn}
              onChange={setter(setEquityReturn)}
              step="0.1"
            />
          </label>
          <label>
            Expected Debt Return (% p.a.)
            <input
              type="number"
              value={debtReturn}
              onChange={setter(setDebtReturn)}
              step="0.1"
            />
          </label>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          <label>
            Expected Gold Return (% p.a.)
            <input
              type="number"
              value={goldReturn}
              onChange={setter(setGoldReturn)}
              step="0.1"
            />
          </label>
          <label>
            Expected Cash Return (% p.a.)
            <input
              type="number"
              value={cashReturn}
              onChange={setter(setCashReturn)}
              step="0.1"
            />
          </label>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="primary-cta">Update</button>
          <button
            type="button"
            onClick={() => {
              // reset defaults
              setMonthlySIP(5000);
              setLumpSum(0);
              setYears(10);
              setAssetEquityPct(60);
              setAssetDebtPct(30);
              setAssetGoldPct(5);
              setAssetCashPct(5);
              setEquityReturn(DEFAULT_ASSET_RETURNS.equity);
              setDebtReturn(DEFAULT_ASSET_RETURNS.debt);
              setGoldReturn(DEFAULT_ASSET_RETURNS.gold);
              setCashReturn(DEFAULT_ASSET_RETURNS.cash);
              setInflationPct(6);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Results */}
      <div className="result-grid emi-summary-strip" style={{ marginTop: 14 }}>
        <div className="result-card">
          <p className="result-label">Total Invested</p>
          <p className="result-primary">{formatINR(totalInvested)}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Estimated Portfolio Value</p>
          <p className="result-primary">{formatINR(totalFuture)}</p>
        </div>

        <div className="result-card">
          <p className="result-label">Estimated Returns</p>
          <p className="result-value">{formatINR(totalReturns)}</p>
        </div>
      </div>

      {/* Allocation breakdown */}
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Allocation Breakdown (Estimated Future Value)</h3>
        <table className="rate-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Allocation %</th>
              <th>Est. Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Equity</td>
              <td>{Math.round(alloc.equity * 100)}%</td>
              <td>{formatINR(Math.round(perAssetFuture.equity))}</td>
            </tr>
            <tr>
              <td>Debt</td>
              <td>{Math.round(alloc.debt * 100)}%</td>
              <td>{formatINR(Math.round(perAssetFuture.debt))}</td>
            </tr>
            <tr>
              <td>Gold</td>
              <td>{Math.round(alloc.gold * 100)}%</td>
              <td>{formatINR(Math.round(perAssetFuture.gold))}</td>
            </tr>
            <tr>
              <td>Cash</td>
              <td>{Math.round(alloc.cash * 100)}%</td>
              <td>{formatINR(Math.round(perAssetFuture.cash))}</td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>
          Approx blended annual return (by allocation):{' '}
          <strong>{approxBlendedAnnualReturn}%</strong>
        </p>
      </div>

      {/* Advice */}
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Quick Advice</h3>
        <p>{allocationAdvice}</p>
        <p style={{ fontWeight: 700 }}>{riskNote}</p>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          Rebalance annually to maintain target allocations and reduce drift.
        </p>
      </div>

      {/* Schedule preview */}
      <div className="article" style={{ marginTop: 12 }}>
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

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={exportCSV}>Export Schedule CSV</button>
          <button
            onClick={() => {
              const summary = `SIP ${formatINR(
                monthlySIP
              )}/mo + Lump ${formatINR(
                lumpSum
              )} for ${years}y @ blended ${approxBlendedAnnualReturn}% ⇒ ${formatINR(
                totalFuture
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
