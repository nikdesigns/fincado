import type { Metadata } from 'next';
import EMIClient from './EMIClient';

export const metadata: Metadata = {
  title: 'EMI Calculator – Calculate Loan EMI Online | Fincado',
  description:
    'Free EMI calculator to calculate monthly loan EMI, total interest and total repayment for home loan, car loan and personal loan. Fast, accurate & mobile-friendly.',
};

export default function EMIPage() {
  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 16, // ✅ reduced from 32 → 16
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h1>EMI Calculator – Calculate Loan EMI Instantly</h1>

        <p style={{ maxWidth: 700 }}>
          Use this free EMI Calculator to instantly calculate your monthly loan
          EMI, total interest payable, and total repayment amount for home loan,
          car loan and personal loan.
        </p>

        <div className="ad-box">
          <p>Ad will appear here (Above the fold)</p>
        </div>

        <EMIClient />

        <div className="ad-box">
          <p>Ad will appear here (Mid content)</p>
        </div>

        <section className="article">
          <h2>What is EMI?</h2>
          <p>
            EMI, or Equated Monthly Installment, is the fixed amount a borrower
            pays every month to repay a loan. It consists of two components –
            principal and interest.
          </p>

          <h2>How is EMI Calculated?</h2>
          <pre>EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)</pre>

          <p>
            Where P is the loan amount, r is the monthly interest rate, and n is
            the total number of monthly installments.
          </p>

          <h2>Related Loan Tools</h2>
          <ul>
            <li>
              <a href="/loans">All Loan Calculators</a>
            </li>
            <li>
              <a href="/emi-calculator">Home Loan EMI Calculator</a>
            </li>
            <li>
              <a href="/emi-calculator">Car Loan EMI Calculator</a>
            </li>
            <li>
              <a href="/emi-calculator">Personal Loan EMI Calculator</a>
            </li>
          </ul>

          <h2>Disclaimer</h2>
          <p>
            This EMI calculator provides approximate values for educational use
            only. Actual loan terms may vary according to your bank or lender.
          </p>
        </section>

        <div className="ad-box">
          <p>Ad will appear here (Before footer)</p>
        </div>
      </div>

      <aside style={{ position: 'sticky', top: 24 }}>
        <div className="ad-box">Sticky Sidebar Ad</div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3>Compare Loan Offers</h3>
          <ul>
            <li>
              <a href="#">Check Home Loan Rates</a>
            </li>
            <li>
              <a href="#">Best Personal Loan</a>
            </li>
            <li>
              <a href="#">Low Interest Car Loan</a>
            </li>
          </ul>
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3>People Also Use</h3>
          <ul>
            <li>
              <a href="/sip-calculator">SIP Calculator</a>
            </li>
            <li>
              <a href="/fd-calculator">FD Calculator</a>
            </li>
            <li>
              <a href="/home-loan-rates">Home Loan Rates</a>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  );
}
