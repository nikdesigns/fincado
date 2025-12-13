import type { Metadata } from 'next';
import CalculatorsGrid from './CalculatorsGrid';
import LegalNote from '@/components/LegalNote';
import FinancialNavWidget from '@/components/FinancialNavWidget';

// --- 1. SEO METADATA (Retains the combined authority) ---
export const metadata: Metadata = {
  title:
    'Full List of Financial Calculators | EMI, SIP, FD, Retirement & Tax Tools',
  description:
    'Browse our complete suite of professional calculators for Indian investors: EMI, Home Loan, SIP, PPF, Retirement Planner, GST Calculator, and Credit Score Estimator. Plan your finance goals accurately.',
  keywords: [
    'all financial calculators',
    'online calculator list',
    'Indian finance tools',
    'EMI SIP PPF GST calculator',
    'Loan investment tax tools',
    // Added specific loan keywords
    'EMI Calculator',
    'Home Loan EMI',
    'Car Loan EMI',
  ],
  openGraph: {
    title: 'Full List of Financial Calculators | Plan Every Financial Goal',
    description:
      'Find every calculator you need for loans, investments, and retirement planning.',
    url: 'https://yourwebsite.com/calculators',
    type: 'website',
  },
};

// --- 2. PAGE COMPONENT (Server Component) ---
export default function CalculatorsPage() {
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
      <div style={{ minWidth: 0 }}>
        <div className="ad-box">Ad will appear here (Above the fold)</div>

        {/* Client Component renders the calculator hub grid */}
        <CalculatorsGrid />

        <div className="ad-box" style={{ marginTop: 24 }}>
          AdSense Slot: Mid Content Banner
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          {/* CONSOLIDATED SEO CONTENT FROM LOANS/PAGE.TSX */}
          <h2>Why Use Loan Calculators?</h2>
          <p>
            Loan calculators help you make informed borrowing decisions. By
            adjusting the loan amount, interest rate, and tenure, you can see
            how your EMI changes. This helps in budgeting and choosing the best
            loan option.
          </p>

          <h2>How Loan EMI Impacts Your Finances</h2>
          <p>
            Your monthly EMI directly affects your cash flow. Choosing a very
            short tenure increases EMI but reduces interest burden. Longer
            tenures reduce EMI but increase total interest paid.
          </p>

          <LegalNote />
        </section>

        <div className="ad-box" style={{ marginTop: 24 }}>
          AdSense Slot: Before Footer
        </div>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>

        {/* Use the sleek navigation widget */}
        <FinancialNavWidget />
      </aside>
    </main>
  );
}
