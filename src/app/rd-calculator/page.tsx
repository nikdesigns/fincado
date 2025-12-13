import type { Metadata } from 'next';
import RDClient from './RDClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';

export const metadata: Metadata = {
  title: 'RD Calculator – Recurring Deposit Calculator | Fincado',
  description:
    'RD Calculator to compute maturity value, total invested, and interest for monthly recurring deposits.',
};

export default function RDPage() {
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
        <h1>RD (Recurring Deposit) Calculator</h1>
        <p style={{ maxWidth: 700 }}>
          Calculate how much your monthly recurring deposits will become — enter
          monthly deposit, rate and duration to see maturity value, interest and
          schedule.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <RDClient />

        <div className="ad-box">Ad will appear here (Mid content)</div>

        <section className="article">
          <h2>What is RD?</h2>
          <p>
            A Recurring Deposit (RD) lets you deposit a fixed amount every month
            for a fixed tenure and earn interest compounded periodically. Use
            this tool to estimate maturity and returns.
          </p>

          <h2>Formula (monthly)</h2>
          <pre>FV = P × [((1 + r)^n − 1) / r] × (1 + r)</pre>

          <h2>Related Tools</h2>
          <ul>
            <li>
              <a href="/fd-calculator">FD Calculator</a>
            </li>
            <li>
              <a href="/sip-calculator">SIP Calculator</a>
            </li>
            <li>
              <a href="/ppf-calculator">PPF Calculator</a>
            </li>
          </ul>
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
