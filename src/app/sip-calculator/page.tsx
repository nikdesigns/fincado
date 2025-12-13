import type { Metadata } from 'next';
import SIPClient from './SIPClient';
import LegalNote from '@/components/LegalNote';
import FinancialNavWidget from '@/components/FinancialNavWidget';

export const metadata: Metadata = {
  title: 'SIP Calculator – Mutual Fund SIP Calculator | Fincado',
  description:
    'SIP Calculator: calculate future value of monthly SIPs, total invested, estimated returns, CAGR and time to reach your financial goals. India-focused guidance included.',
};

export default function SIPPage() {
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
        <h1>SIP Calculator — Plan Your Monthly SIPs & Target Goals</h1>

        <p style={{ maxWidth: 760 }}>
          Calculate how much your monthly SIP (Systematic Investment Plan) can
          grow to over time based on expected returns. Use the target planner to
          find the monthly SIP required to reach a financial goal.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <SIPClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>Notes for Indian investors</h2>
          <ul>
            <li>
              SIP returns are assumed as nominal annual returns. Adjust for
              inflation if you want real returns.
            </li>
            <li>
              For equity mutual funds, consider long-term capital gains tax
              rules (as of the time of writing) when planning withdrawals—this
              is only an estimate and not tax advice.
            </li>
            <li>Past returns are not indicative of future performance.</li>
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
