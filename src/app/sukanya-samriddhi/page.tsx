import type { Metadata } from 'next';
import SSYClient from './SSYClient';
import LoanCompareWidget from '@/components/LoanCompareWidget';
import LegalNote from '@/components/LegalNote';

export const metadata: Metadata = {
  title: 'Sukanya Samriddhi Yojana (SSY) Calculator | Fincado',
  description:
    'SSY calculator — estimate maturity value, interest earned, and yearly deposits for Sukanya Samriddhi Yojana (government small savings scheme for girl child).',
};

export default function SSYPage() {
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
        <h1>Sukanya Samriddhi Yojana Calculator</h1>
        <p style={{ maxWidth: 700 }}>
          Estimate maturity amount, interest earned and yearly deposits for a
          Sukanya Samriddhi Yojana account. Default interest rate is set to the
          latest notified rate (editable below).
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <SSYClient />

        <div className="ad-box">Ad will appear here (Mid content)</div>

        <section className="article">
          <h2>Quick Notes</h2>
          <ul>
            <li>
              Accounts can be opened for a girl child up to age 10; deposits are
              allowed for 15 years from account opening; maturity is at 21 years
              of the girl (check latest rules before applying).
            </li>
            <li>
              Deposits: minimum ₹250 per year, maximum ₹1,50,000 per financial
              year (subject to updates).
            </li>
            <li>
              Interest rate is notified quarterly by the Government; I used the
              currently-notified value as default (editable in the calculator).
            </li>
          </ul>
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
