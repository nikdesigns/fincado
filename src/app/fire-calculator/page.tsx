import type { Metadata } from 'next';
import FIRECalculatorClient from './FIRECalculatorClient';
import LegalNote from '@/components/LegalNote'; // Assuming LegalNote exists
import FinancialNavWidget from '@/components/FinancialNavWidget'; // Assuming the sleek widget exists

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: 'FIRE Calculator India | Find Your FIRE Number & Monthly Savings Goal',
  description:
    'Use our specialized FIRE calculator to estimate the corpus needed for Financial Independence, Retire Early (FIRE). Calculates inflation-adjusted expense and required monthly SIP based on the 3.5% Safe Withdrawal Rate (SWR) recommended for India.',
  keywords: [
    'FIRE calculator',
    'financial independence retire early',
    'FIRE number India',
    '3.5% rule calculator',
    'early retirement corpus',
    'SIP for FIRE',
  ],
  openGraph: {
    title: 'FIRE Number Calculator | Early Retirement Planning',
    description:
      'Find your target FIRE number and the monthly investment needed to retire early.',
    url: 'https://yourwebsite.com/fire-calculator',
    type: 'website',
  },
};

// --- 2. PAGE COMPONENT (Server Component) ---
export default function FIRECalculatorPage() {
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

        {/* Client Component renders the calculator logic and SEO content */}
        <FIRECalculatorClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>Important Disclaimer for Financial Independence Planning</h2>
          <p style={{ color: '#dc2626', fontWeight: 600 }}>
            The FIRE movement relies on aggressive assumptions. The SWR and
            return rates are hypothetical estimates. This tool is for
            educational purposes only and does not constitute personalized
            financial advice.
          </p>
          <LegalNote />
        </section>

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Before footer)
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
