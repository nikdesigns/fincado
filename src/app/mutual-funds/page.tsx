import type { Metadata } from 'next';
import MutualFundsClient from './MutualFundsClient';
import LoanCompareWidget from '@/components/LoanCompareWidget';
import LegalNote from '@/components/LegalNote';

export const metadata: Metadata = {
  title: 'Mutual Funds Calculator – SIP & Lump Sum Planner | Fincado',
  description:
    'Mutual funds calculator: simulate SIP and lump-sum investments across a multi-asset portfolio. Choose expected returns, horizon and allocation to estimate future value and see a schedule preview.',
};

export default function MutualFundsPage() {
  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 16,
        padding: 16,
      }}
    >
      {/* LEFT - main content */}
      <div style={{ minWidth: 0 }}>
        <h1>Mutual Funds Calculator</h1>

        <p style={{ maxWidth: 760 }}>
          Plan SIPs and lump-sum investments across a multi-asset portfolio.
          Choose expected returns, horizon and allocation to estimate future
          value and see a schedule preview.
        </p>

        {/* Above-the-fold ad placeholder */}
        <div className="ad-box" style={{ marginTop: 12 }}>
          Ad will appear here (Above the fold)
        </div>

        {/* Client component (left column) */}
        <div style={{ marginTop: 12 }}>
          <MutualFundsClient />
        </div>

        {/* mid-content ad */}
        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>About this calculator</h2>
          <p>
            This is a simplified planner — it assumes constant nominal returns
            for each asset class and monthly compounding. It does not model
            taxes, expense ratios, lumpsum entry timing beyond now, or market
            volatility. Use this for quick planning and comparisons.
          </p>

          <LegalNote />
        </section>

        {/* before-footer ad */}
        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Before footer)
        </div>
      </div>

      {/* RIGHT - sticky sidebar */}
      <aside className="sidebar" style={{ alignSelf: 'start' }}>
        <div className="ad-box">Sticky Sidebar Ad</div>
        <LoanCompareWidget />
      </aside>
    </main>
  );
}
