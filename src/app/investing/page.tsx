import type { Metadata } from 'next';
import InvestingClient from './InvestingClient';
import LoanCompareWidget from '@/components/LoanCompareWidget';
import LegalNote from '@/components/LegalNote';

export const metadata: Metadata = {
  title:
    'Investing Planner – SIP & Lumpsum Planner, Allocation & CAGR | Fincado',
  description:
    'Investing planner for India: plan SIPs and lumpsum investments, get future value, allocation suggestions, CAGR estimate and diversification guidance.',
};

export default function InvestingPage() {
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
        <h1>Investing Planner — SIP, Lumpsum & Allocation Guide</h1>

        <p style={{ maxWidth: 760 }}>
          Plan SIPs and lumpsum investments, test different allocation mixes
          (Equity / Debt / Gold / Cash), see estimated future values and CAGR,
          and get simple diversification advice.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <InvestingClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>Notes for Indian investors</h2>
          <ul>
            <li>
              Estimates use nominal annual return assumptions by asset class.
              Adjust for inflation for real returns.
            </li>
            <li>
              Allocation suggestions are generic and not personalised financial
              advice.
            </li>
            <li>
              Taxes, expense ratios and transaction costs are not modelled
              explicitly—these reduce net returns.
            </li>
          </ul>

          <LegalNote />
        </section>

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Before footer)
        </div>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>
        <LoanCompareWidget />
      </aside>
    </main>
  );
}
