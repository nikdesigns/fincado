'use client';

function formatINR(value: number): string {
  return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export default function SIPClient() {
  return (
    <section className="card">
      <h2>SIP Calculator</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const P = Number(
            (document.getElementById('monthly') as HTMLInputElement).value
          );
          const annualRate = Number(
            (document.getElementById('return') as HTMLInputElement).value
          );
          const years = Number(
            (document.getElementById('sipYears') as HTMLInputElement).value
          );

          const r = annualRate / 12 / 100;
          const n = years * 12;

          // SIP Future Value Formula
          const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

          const invested = P * n;
          const returns = fv - invested;

          (document.getElementById('maturity') as HTMLSpanElement).textContent =
            formatINR(Math.round(fv));

          (document.getElementById('invested') as HTMLSpanElement).textContent =
            formatINR(Math.round(invested));

          (document.getElementById('returns') as HTMLSpanElement).textContent =
            formatINR(Math.round(returns));
        }}
      >
        <label>
          Monthly Investment (₹)
          <input id="monthly" type="number" required />
        </label>

        <label>
          Expected Return (% per year)
          <input id="return" type="number" step="0.1" required />
        </label>

        <label>
          Investment Duration (Years)
          <input id="sipYears" type="number" required />
        </label>

        <button type="submit">Calculate SIP Returns</button>
      </form>

      <div style={{ marginTop: 20 }}>
        <p>
          Maturity Value:{' '}
          <strong>
            <span id="maturity">₹0</span>
          </strong>
        </p>
        <p>
          Amount Invested:{' '}
          <strong>
            <span id="invested">₹0</span>
          </strong>
        </p>
        <p>
          Total Returns:{' '}
          <strong>
            <span id="returns">₹0</span>
          </strong>
        </p>
      </div>
    </section>
  );
}
