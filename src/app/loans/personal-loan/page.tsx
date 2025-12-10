import type { Metadata } from 'next';
import PersonalLoanClient from './PersonalLoanClient';
import LoanCompareWidget from '@/components/LoanCompareWidget';
import LegalNote from '@/components/LegalNote';

export const metadata: Metadata = {
  title:
    'Personal Loan Calculator – EMI, Eligibility & Interest Estimate | Fincado',
  description:
    'Free Personal Loan Calculator for India. Calculate EMI, total interest, affordability (FOIR), processing fees, and see amortization schedule with smart savings tips.',
};

export default function PersonalLoanCalculatorPage() {
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
      {/* LEFT SIDE */}
      <div style={{ minWidth: 0 }}>
        <h1>Personal Loan Calculator – Instant EMI & Eligibility Check</h1>

        <p style={{ maxWidth: 760 }}>
          Use this India-focused **Personal Loan Calculator** to estimate your
          EMI, total interest outgo, processing fees, and eligibility using FOIR
          rules. Includes a smart extra-EMI savings tool and amortization
          schedule.
        </p>

        <div className="ad-box">Ad will appear here (above the fold)</div>

        <PersonalLoanClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>How this calculator helps</h2>
          <ul>
            <li>
              Accurate EMI based on reducing balance method (used by Indian
              banks)
            </li>
            <li>FOIR-based loan affordability check</li>
            <li>Processing fee calculation (flat %)</li>
            <li>Amortization schedule month-wise</li>
            <li>Savings estimate if you increase EMI slightly</li>
          </ul>

          <LegalNote />
        </section>

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (before footer)
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
