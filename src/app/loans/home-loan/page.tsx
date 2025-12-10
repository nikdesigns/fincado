import type { Metadata } from 'next';
import HomeLoanClient from './HomeLoanClient';
import LoanCompareWidget from '@/components/LoanCompareWidget';
import LegalNote from '@/components/LegalNote';

export const metadata: Metadata = {
  title:
    'Home Loan Calculator – Calculate Home Loan EMI, LTV & Tax Benefits | Fincado',
  description:
    'Free Home Loan calculator for India: compute EMI, maximum loan (LTV), required down payment, amortization schedule and estimated tax benefits under Sections 80C & 24.',
};

export default function HomeLoanCalculatorPage() {
  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 16,
      }}
    >
      {/* LEFT */}
      <div style={{ minWidth: 0 }}>
        <h1>Home Loan Calculator — EMI, LTV, Down Payment & Tax Benefits</h1>

        <p style={{ maxWidth: 760 }}>
          Use this India-focused Home Loan calculator to estimate monthly EMI,
          maximum possible loan (LTV rules), minimum down payment, amortization
          schedule, and potential tax deductions under Sections 80C and 24.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <HomeLoanClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 28 }}>
          <h2>How this calculator helps (India specific)</h2>
          <ul>
            <li>
              Computes EMI using monthly compounding formula used by Indian
              banks.
            </li>
            <li>
              Applies typical LTV rules used in India (90% for small loans,
              lower for larger tickets) to estimate max loan and down-payment.
            </li>
            <li>
              Estimates tax benefits for the first year (Section 80C principal,
              Section 24 interest) using the first 12 months of the amortization
              schedule.
            </li>
            <li>
              Shows amortization table so you can inspect principal vs interest
              for each month.
            </li>
          </ul>

          <LegalNote />
        </section>

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Before footer)
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>
        <LoanCompareWidget />
      </aside>
    </main>
  );
}
