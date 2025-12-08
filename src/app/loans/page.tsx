import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Loan Calculators – EMI, Home Loan, Car Loan | Fincado',
  description:
    'Free loan calculators including EMI calculator, home loan EMI, car loan EMI and personal loan EMI. Plan your loans with Fincado.',
};

export default function LoansCategoryPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h1>Loan Calculators</h1>

      <p style={{ maxWidth: 800 }}>
        Fincado offers a complete set of free loan calculators to help you plan
        your finances better. Whether you are taking a home loan, car loan, or
        personal loan, our tools help you calculate EMI, interest, and total
        repayment instantly.
      </p>

      <div className="ad-box">
        <p>Ad will appear here (Category page top)</p>
      </div>

      <section className="article">
        <h2>Available Loan Tools</h2>

        <ul>
          <li>
            <Link href="/emi-calculator">EMI Calculator</Link> – Calculate EMI,
            interest and total loan payment.
          </li>
          <li>
            <a href="/sip-calculator">SIP Calculator</a> – Estimate mutual fund
            SIP returns.
          </li>
          <li>
            <Link href="/emi-calculator">Home Loan EMI Calculator</Link> – Plan
            your housing loan EMIs.
          </li>
          <li>
            <a href="/fd-calculator">FD Calculator</a> – Calculate fixed deposit
            interest and maturity amount.
          </li>
          <li>
            <Link href="/emi-calculator">Car Loan EMI Calculator</Link> – Check
            monthly car loan payments.
          </li>
          <li>
            <Link href="/emi-calculator">Personal Loan EMI Calculator</Link> –
            Calculate high-interest personal loan EMIs.
          </li>
        </ul>

        <h2>Why Use Loan Calculators?</h2>
        <p>
          Loan calculators help you make informed borrowing decisions. By
          adjusting the loan amount, interest rate, and tenure, you can see how
          your EMI changes. This helps in budgeting and choosing the best loan
          option.
        </p>

        <h2>How Loan EMI Impacts Your Finances</h2>
        <p>
          Your monthly EMI directly affects your cash flow. Choosing a very
          short tenure increases EMI but reduces interest burden. Longer tenures
          reduce EMI but increase total interest paid.
        </p>

        <h2>Important Disclaimer</h2>
        <p>
          All loan calculators on Fincado are for educational purposes only.
          Actual loan offers may vary by lender based on your credit profile,
          processing fees, and other charges.
        </p>
      </section>

      <div className="ad-box">
        <p>Ad will appear here (Category page bottom)</p>
      </div>
    </main>
  );
}
