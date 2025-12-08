'use client';
import { loanRates, rateLastUpdated } from '@/lib/manualLoanRates';

function formatINR(value: number): string {
  return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export default function EMIClient() {
  return (
    <section className="card">
      <h2>Loan EMI Calculator</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const P = Number(
            (document.getElementById('loan') as HTMLInputElement).value
          );
          const annualRate = Number(
            (document.getElementById('rate') as HTMLInputElement).value
          );
          const years = Number(
            (document.getElementById('years') as HTMLInputElement).value
          );

          if (P <= 0 || annualRate <= 0 || years <= 0) {
            alert('Please enter valid positive values');
            return;
          }

          const r = annualRate / 12 / 100;
          const n = years * 12;

          const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

          const totalPayment = emi * n;
          const totalInterest = totalPayment - P;

          const emiRounded = Math.round(emi);
          const interestRounded = Math.round(totalInterest);
          const totalRounded = Math.round(totalPayment);

          // ✅ Result Cards
          (document.getElementById('emi') as HTMLParagraphElement).textContent =
            formatINR(emiRounded);
          (
            document.getElementById('interest') as HTMLParagraphElement
          ).textContent = formatINR(interestRounded);
          (
            document.getElementById('total') as HTMLParagraphElement
          ).textContent = formatINR(totalRounded);

          // ✅ Donut Chart
          const interestPercent = (totalInterest / totalPayment) * 100;
          const principalPercent = 100 - interestPercent;

          const donut = document.getElementById('donut') as HTMLDivElement;
          donut.style.background = `conic-gradient(
            #16a34a 0% ${principalPercent}%,
            #ef4444 ${principalPercent}% 100%
          )`;

          // ✅ Amortization Table
          const table = document.getElementById('schedule') as HTMLTableElement;
          table.innerHTML = '';

          let balance = P;

          for (let i = 1; i <= n; i++) {
            const interestPortion = balance * r;
            const principalPortion = emi - interestPortion;
            balance -= principalPortion;

            const row = `
              <tr>
                <td>${i}</td>
                <td>${formatINR(Math.round(emi))}</td>
                <td>${formatINR(Math.round(principalPortion))}</td>
                <td>${formatINR(Math.round(interestPortion))}</td>
                <td>${formatINR(Math.abs(Math.round(balance)))}</td>
              </tr>
            `;
            table.innerHTML += row;
          }

          // ✅ Savings Insight
          const boostedEMI = emi * 1.1;
          const reducedTenure =
            Math.log(boostedEMI / (boostedEMI - P * r)) / Math.log(1 + r);

          const boostedMonths = Math.round(reducedTenure);
          const newTotal = boostedEMI * boostedMonths;
          const newInterest = newTotal - P;
          const saved = totalInterest - newInterest;

          (document.getElementById('savings') as HTMLSpanElement).textContent =
            formatINR(Math.round(saved));
        }}
      >
        <label>
          Loan Amount (₹)
          <input id="loan" type="number" required />
        </label>

        <label>
          Interest Rate (% per year)
          <input id="rate" type="number" step="0.1" required />
        </label>

        <label>
          Loan Tenure (Years)
          <input id="years" type="number" required />
        </label>

        <button className="primary-cta">Calculate EMI</button>
      </form>

      {/* ✅ RESULT CARDS */}
      <div className="result-grid emi-summary-strip">
        <div className="result-card">
          <p className="result-label">Monthly EMI</p>
          <p className="result-primary" id="emi">
            ₹0
          </p>
        </div>

        <div className="result-card">
          <p className="result-label">Total Interest</p>
          <p className="result-value" id="interest">
            ₹0
          </p>
        </div>

        <div className="result-card">
          <p className="result-label">Total Payment</p>
          <p className="result-value" id="total">
            ₹0
          </p>
        </div>
      </div>

      {/* ✅ LOAN ELIGIBILITY WIDGET */}
      <div className="card" style={{ marginTop: 32 }}>
        <h3>Check Your Loan Eligibility</h3>
        <p style={{ marginBottom: 16 }}>
          Enter your monthly income to estimate how much loan you may be
          eligible for.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            const income = Number(
              (document.getElementById('income') as HTMLInputElement).value
            );

            if (income <= 0) {
              alert('Please enter a valid income');
              return;
            }

            // Safe industry rule: 50% of income can go to EMI
            const eligibleEMI = income * 0.5;

            (
              document.getElementById('eligibleEmi') as HTMLSpanElement
            ).textContent = formatINR(Math.round(eligibleEMI));
          }}
        >
          <label>
            Monthly Income (₹)
            <input id="income" type="number" required />
          </label>

          <div className="loan-btn-row">
            <button>Check Eligibility</button>
            <button className="apply-btn">Apply for Loan</button>
          </div>
        </form>

        <p style={{ marginTop: 12 }}>
          Estimated Eligible EMI:
          <strong>
            {' '}
            <span id="eligibleEmi">₹0</span>
          </strong>
        </p>
      </div>

      {/* ✅ DONUT CHART */}
      <div className="card" style={{ marginTop: 32, textAlign: 'center' }}>
        <h3>Principal vs Interest</h3>
        <div id="donut" className="donut"></div>

        <div className="donut-legend">
          <span>🟢 Principal</span>
          <span>🔴 Interest</span>
        </div>
      </div>

      {/* ✅ SAVINGS INSIGHT */}
      <div className="savings-box">
        <h3>Smart Savings Tip 💡</h3>
        <p>
          If you increase your EMI by just <strong>10%</strong>, you can save
          <strong>
            {' '}
            <span id="savings">₹0</span>
          </strong>{' '}
          in total interest.
        </p>
      </div>

      {/* ✅ ✅ ✅ OPTION A — INLINE BANK COMPARISON (HIGH RPM BLOCK) */}
      {/* ✅ ✅ ✅ INLINE BANK COMPARISON – STATIC MANUAL RATES */}
      <div className="card" style={{ marginTop: 36 }}>
        <h3>Compare Best Loan Offers</h3>
        <p style={{ marginBottom: 6 }}>Updated from official bank websites.</p>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
          Last updated: {rateLastUpdated}
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="rate-table">
            <thead>
              <tr>
                <th>Bank</th>
                <th>Interest Rate</th>
                <th>Processing Fee</th>
                <th>Apply</th>
              </tr>
            </thead>
            <tbody>
              {loanRates.map((bank) => (
                <tr key={bank.bank}>
                  <td>{bank.bank}</td>
                  <td>{bank.rate}</td>
                  <td>{bank.fee}</td>
                  <td>
                    <a
                      href={`/out?to=https://example.com`}
                      className="apply-btn table-apply-btn"
                    >
                      Apply
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 12, fontSize: 13, color: '#64748b' }}>
          Rates shown are indicative and may change without notice. Final
          interest rate depends on your credit score, income, loan tenure, and
          city.
        </p>
      </div>

      {/* ✅ AMORTIZATION TABLE */}
      <div className="article" style={{ marginTop: 60 }}>
        <h2>Loan Repayment Schedule</h2>

        {/* ✅ FIXED HEIGHT + SCROLLABLE TABLE (ALWAYS VISIBLE) */}
        <div className="schedule-wrapper">
          <table className="rate-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>EMI</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody id="schedule"></tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
