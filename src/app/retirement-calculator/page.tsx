import type { Metadata } from 'next';
import RetirementCalculatorClient from './RetirementCalculatorClient';
import LegalNote from '@/components/LegalNote'; // Assuming LegalNote exists
import FinancialNavWidget from '@/components/FinancialNavWidget'; // Using the sleek widget created earlier

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: 'Retirement Calculator India | Corpus Required & Monthly SIP Planner',
  description:
    'Plan your retirement corpus based on inflation and required post-retirement income. Calculate the exact monthly SIP needed to reach your retirement financial goals.',
  keywords: [
    'retirement calculator',
    'retirement corpus calculation',
    'monthly SIP for retirement',
    'future value of expenses calculator',
    'financial independence retire early FIRE',
  ],
  openGraph: {
    title: 'Retirement Corpus & SIP Planner',
    description:
      'Calculate your retirement corpus required considering inflation.',
    url: 'https://yourwebsite.com/retirement-calculator',
    type: 'website',
  },
};

// --- 2. PAGE COMPONENT (Server Component) ---
export default function RetirementPage() {
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
        {/* The client component handles the form, calculation, and main SEO text */}
        <RetirementCalculatorClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>Important Disclaimer for Retirement Planning</h2>
          <p style={{ color: '#dc2626', fontWeight: 600 }}>
            Retirement planning involves numerous assumptions (inflation, market
            returns, longevity). The figures provided here are estimates only.
            You must consult a certified financial planner before making
            investment decisions.
          </p>
          <LegalNote />
        </section>

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Before footer)
        </div>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>

        {/* Use the sleek navigation widget to boost internal linking and revenue */}
        <FinancialNavWidget />
      </aside>
    </main>
  );
}
