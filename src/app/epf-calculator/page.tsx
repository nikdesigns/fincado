import type { Metadata } from 'next';
import EPFClient from './EPFClient';
import LegalNote from '@/components/LegalNote';
import FinancialNavWidget from '@/components/FinancialNavWidget';

export const metadata: Metadata = {
  title: 'EPF Calculator – Employee Provident Fund Calculator | Fincado',
  description:
    'EPF calculator to estimate EPF corpus, contributions and interest. Supports custom salary, contribution rates and duration.',
};

export default function EPFPage() {
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
        <h1>EPF Calculator — Employee Provident Fund</h1>

        <p style={{ maxWidth: 700 }}>
          Estimate your EPF corpus by entering monthly salary, contribution
          percentages and expected annual interest. Useful for retirement
          planning and comparing scenarios.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <EPFClient />

        <div className="ad-box">Ad will appear here (Mid content)</div>

        <section className="article">
          <h2>About EPF</h2>
          <p>
            EPF (Employees&apos; Provident Fund) is a retirement savings scheme
            where both employee and employer contribute a percentage of basic
            salary + dearness allowance. EPF interest is declared by the
            Government and compounds annually.
          </p>

          <LegalNote />
        </section>

        <div className="ad-box">Ad will appear here (Before footer)</div>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>
        <FinancialNavWidget />
      </aside>
    </main>
  );
}
