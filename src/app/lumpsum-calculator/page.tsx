import type { Metadata } from 'next';
import LumpsumClient from './LumpsumClient';
import LegalNote from '@/components/LegalNote'; // Assuming LegalNote exists
import FinancialNavWidget from '@/components/FinancialNavWidget'; // Assuming the sleek widget exists

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title:
    'Lumpsum Investment Calculator (FV) | Calculate Future Value & Returns',
  description:
    'Use our free Lumpsum Calculator to estimate the future value and total wealth gain of a one-time investment, factoring in expected CAGR and compounding frequency.',
  keywords: [
    'lumpsum calculator',
    'future value calculator',
    'FV calculator',
    'CAGR calculator',
    'one time investment calculator',
    'mutual fund lumpsum returns',
  ],
  openGraph: {
    title: 'Lumpsum FV Calculator | Calculate Future Value & Returns',
    description:
      'Find out how much your one-time investment will grow to over time.',
    url: 'https://yourwebsite.com/lumpsum-calculator',
    type: 'website',
  },
};

// --- 2. PAGE COMPONENT (Server Component) ---
export default function LumpsumCalculatorPage() {
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
        <LumpsumClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>Important Disclaimer for Investment Calculations</h2>
          <p style={{ color: '#dc2626', fontWeight: 600 }}>
            Mutual fund investments are subject to market risks. The returns
            calculated here are estimates based on assumed rates (CAGR) and are
            not guaranteed. Actual returns will vary.
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
