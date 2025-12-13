import type { Metadata } from 'next';
import SWPClient from './SWPClient';
import LegalNote from '@/components/LegalNote';
import FinancialNavWidget from '@/components/FinancialNavWidget';

export const metadata: Metadata = {
  title: 'SWP Calculator – Systematic Withdrawal Plan | Fincado',
  description:
    'Calculate how long your corpus will last under a systematic withdrawal plan (SWP).',
};

export default function SWPPage() {
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
        <h1>SWP Calculator — Systematic Withdrawal Plan</h1>
        <p style={{ maxWidth: 700 }}>
          Use this SWP calculator to estimate how long your lump-sum corpus will
          last if you withdraw a fixed amount monthly, while the remaining
          corpus continues to grow at an expected annual return.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <SWPClient />

        <div className="ad-box">Ad will appear here (Mid content)</div>

        <section className="article">
          <h2>How SWP works</h2>
          <p>
            SWP lets you withdraw a fixed amount from your investment regularly
            (monthly) while the remaining corpus remains invested. This
            calculator simulates monthly compounding and withdrawals — real-life
            returns vary and fees/taxes are not modelled precisely here.
          </p>

          <LegalNote />
        </section>

        <div className="ad-box">Ad will appear here (Before footer)</div>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>
        <FinancialNavWidget />
      </aside>

      {/* JSON-LD FAQ for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is SWP?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'SWP (Systematic Withdrawal Plan) is a way to withdraw a fixed amount from your investment at regular intervals while the remaining corpus stays invested.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does SWP guarantee your corpus will last?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No — it depends on withdrawal amount, investment returns, and compounding. Use the calculator to simulate scenarios.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
