'use client';

function formatINR(value: number): string {
  return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export default function FDClient() {
  return (
    <section className="card">
      <h2>Fixed Deposit (FD) Calculator</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const P = Number(
            (document.getElementById('fdAmount') as HTMLInputElement).value
          );
          const annualRate = Number(
            (document.getElementById('fdRate') as HTMLInputElement).value
          );
          const years = Number(
            (document.getElementById('fdYears') as HTMLInputElement).value
          );

          const r = annualRate / 100;
          const n = 4; // Quarterly compounding (standard for most FDs)

          const maturity = P * Math.pow(1 + r / n, n * years);

          const interest = maturity - P;

          (
            document.getElementById('fdMaturity') as HTMLSpanElement
          ).textContent = formatINR(Math.round(maturity));

          (
            document.getElementById('fdInterest') as HTMLSpanElement
          ).textContent = formatINR(Math.round(interest));

          (
            document.getElementById('fdInvested') as HTMLSpanElement
          ).textContent = formatINR(Math.round(P));
        }}
      >
        <label>
          Deposit Amount (₹)
          <input id="fdAmount" type="number" required />
        </label>

        <label>
          Interest Rate (% per year)
          <input id="fdRate" type="number" step="0.1" required />
        </label>

        <label>
          Investment Duration (Years)
          <input id="fdYears" type="number" required />
        </label>

        <button type="submit">Calculate FD Maturity</button>
      </form>

      <div style={{ marginTop: 20 }}>
        <p>
          Maturity Amount:{' '}
          <strong>
            <span id="fdMaturity">₹0</span>
          </strong>
        </p>
        <p>
          Total Interest:{' '}
          <strong>
            <span id="fdInterest">₹0</span>
          </strong>
        </p>
        <p>
          Amount Invested:{' '}
          <strong>
            <span id="fdInvested">₹0</span>
          </strong>
        </p>
      </div>
    </section>
  );
}
