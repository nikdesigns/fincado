import type { Metadata } from 'next';
import LegalNote from '@/components/LegalNote';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import CreditScoreClient from './CreditScoreClient';

export const metadata: Metadata = {
  title: 'Credit Score Checker & Planner – Improve CIBIL | Fincado',
  description:
    'Estimate and improve your CIBIL credit score with an interactive planner. Learn how payment history, credit utilisation, credit mix and enquiries impact your score in India.',
};

export default function CreditScorePage() {
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
        <h1>Credit Score Planner — Estimate & Improve Your CIBIL</h1>

        <p style={{ maxWidth: 760 }}>
          This interactive tool estimates your likely credit score range
          (CIBIL-style) and shows practical steps to improve it. Use the what-if
          sliders to see how lowering credit utilisation, fixing overdue
          payments, or reducing enquiries might increase your score.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <CreditScoreClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>About Credit Scores (India)</h2>
          <p>
            Credit bureaus (CIBIL, Experian, Equifax) produce a score typically
            between 300–900. Higher is better. Lenders use the score plus
            detailed report to make lending decisions.
          </p>
          <ul>
            <li>Excellent: 800–900</li>
            <li>Good: 700–799</li>
            <li>Fair: 650–699</li>
            <li>Poor: &lt;650</li>
          </ul>

          <LegalNote />
        </section>

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Before footer)
        </div>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>
        {/* This widget helps monetize the high-intent finance traffic */}
        <FinancialNavWidget />
      </aside>
    </main>
  );
}
