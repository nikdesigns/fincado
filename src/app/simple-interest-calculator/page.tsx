import type { Metadata } from 'next';
import SICalculatorClient from './SICalculatorClient';
import LegalNote from '@/components/LegalNote'; // Assuming LegalNote exists
import FinancialNavWidget from '@/components/FinancialNavWidget';

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: 'Simple Interest Calculator | Find Principal, Rate, & Maturity Value',
  description:
    'Use our simple interest calculator to find the interest amount (I), principal (P), or maturity value (A) for short-term investments and loans using the I=PRT formula.',
  keywords: [
    'simple interest calculator',
    'simple interest formula',
    'I=PRT calculator',
    'calculate simple interest amount',
    'simple interest vs compound interest',
  ],
  openGraph: {
    title: 'Simple Interest Calculator | Find Maturity Value',
    description:
      'Quickly calculate interest and final maturity using the simple interest method.',
    url: 'https://yourwebsite.com/simple-interest-calculator',
    type: 'website',
  },
};

// --- 2. PAGE COMPONENT (Server Component) ---
export default function SimpleInterestPage() {
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
        {/* Client Component renders the calculator logic and SEO content */}
        <SICalculatorClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <LegalNote />
        </section>

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Before footer)
        </div>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>
        {/* Placeholder for your FinancialNavWidget or LoanCompareWidget */}
        {<FinancialNavWidget />}
      </aside>
    </main>
  );
}
