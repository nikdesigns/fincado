import type { Metadata } from 'next';
import FDClient from './FDClient';
import LegalNote from '@/components/LegalNote';
import FinancialNavWidget from '@/components/FinancialNavWidget';

export const metadata: Metadata = {
  title: 'FD Calculator – Fixed Deposit Maturity Calculator | Fincado',
  description:
    'FD Calculator for India: compute maturity amount, gross interest, tax impact, and post-tax payout for various compounding frequencies (monthly, quarterly, annually).',
};

export default function FDCalculatorPage() {
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
        <h1>FD Calculator — Compute Maturity Amount & Post-tax Payout</h1>

        <p style={{ maxWidth: 760 }}>
          Calculate how much your Fixed Deposit (FD) will mature to, compare
          different compounding frequencies, and estimate the tax impact based
          on your marginal tax rate.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <FDClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>Notes for Indian investors</h2>
          <ul>
            <li>
              Banks may deduct TDS on interest if interest &gt; ₹40,000 (check
              current thresholds and exemptions). This tool shows estimated tax
              only — consult a tax advisor.
            </li>
            <li>
              Compounding frequency effect can change your effective yield
              slightly — choose monthly/quarterly/annual as offered by the bank.
            </li>
            <li>
              Premature withdrawal typically attracts a lower rate — this is not
              modelled here (use with full-term assumptions).
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
        <FinancialNavWidget />
      </aside>
    </main>
  );
}
