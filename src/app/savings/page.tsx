import type { Metadata } from 'next';
import LegalNote from '@/components/LegalNote';
import SavingsClient from './SavingsClient';
import LoanComparison from '@/components/LoanComparison';

export const metadata: Metadata = {
  title: 'Savings Calculator – Monthly Savings & Goal Planner | Fincado',
  description:
    'Savings calculator to estimate monthly savings required for a target, emergency fund planner, and future value of monthly savings. India-friendly guidance included.',
};

export default function SavingsCalculatorPage() {
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
        <h1>Savings Calculator — Goal Planner & Emergency Fund</h1>

        <p style={{ maxWidth: 760 }}>
          Plan goals, compute how much to save monthly, and build an emergency
          fund. This India-friendly calculator supports inflation adjustment and
          shows a schedule preview.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <SavingsClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>How to use</h2>
          <ul>
            <li>
              Use the Target Planner to find monthly SIP-style savings required
              to reach a goal.
            </li>
            <li>
              Emergency fund: set months of salary (3-12) to compute recommended
              corpus.
            </li>
            <li>
              Adjust expected annual interest and inflation for real-value
              planning.
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
        <LoanComparison />
      </aside>
    </main>
  );
}
