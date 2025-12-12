import type { Metadata } from 'next';
import PPFClient from './PPFClient';
import LoanCompareWidget from '@/components/LoanCompareWidget';
import LegalNote from '@/components/LegalNote';

export const metadata: Metadata = {
  title: 'PPF Calculator – Public Provident Fund Calculator | Fincado',
  description:
    'PPF Calculator: estimate maturity, interest earned and tax benefit for Public Provident Fund (PPF). Supports monthly/annual contributions and term extensions.',
};

export default function PPFPage() {
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
        <h1>PPF Calculator — Public Provident Fund</h1>

        <p style={{ maxWidth: 700 }}>
          Use this PPF calculator to estimate maturity value, total interest and
          tax benefits for Public Provident Fund (PPF). Supports both monthly
          and annual contributions and lets you view a yearly schedule.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <PPFClient />

        <div className="ad-box">Ad will appear here (Mid content)</div>

        <section className="article">
          <h2>About PPF</h2>
          <p>
            PPF is a long-term government-backed savings instrument in India
            with tax-free maturity and tax deductions under Section 80C (subject
            to limit). Minimum tenure is 15 years, with optional extensions.
          </p>

          <LegalNote />
        </section>

        <div className="ad-box">Ad will appear here (Before footer)</div>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>
        <LoanCompareWidget />
      </aside>
    </main>
  );
}
