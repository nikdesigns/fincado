// ./src/app/investing/swp/page.tsx
import type { Metadata } from 'next';
import SWPClient from './SWPClient';
import LoanCompareWidget from '@/components/LoanCompareWidget';
import LegalNote from '@/components/LegalNote';

export const metadata: Metadata = {
  title: 'SWP Calculator – Systematic Withdrawal Plan Calculator | Fincado',
  description:
    'Free SWP calculator to simulate systematic withdrawals from a corpus. Estimate total withdrawn, returns, and remaining balance for monthly, quarterly, half-yearly or yearly withdrawals.',
};

export default function SWPPage() {
  return (
    <>
      <main
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: 16,
        }}
      >
        {/* LEFT CONTENT */}
        <div style={{ minWidth: 0 }}>
          <h1>SWP Calculator — Systematic Withdrawal Plan</h1>

          <p style={{ maxWidth: 700 }}>
            Use this free SWP Calculator to simulate fixed or percentage-based
            withdrawals from a corpus and see how long your corpus will last,
            total withdrawals, returns earned and ending balance.
          </p>

          {/* ABOVE THE FOLD AD */}
          <div className="ad-box">Ad will appear here (Above the fold)</div>

          <SWPClient />

          {/* MID CONTENT AD */}
          <div className="ad-box" style={{ marginTop: 18 }}>
            Ad will appear here (Mid content)
          </div>

          <section className="article" style={{ marginTop: 18 }}>
            <h2>How SWP works</h2>
            <p>
              A Systematic Withdrawal Plan (SWP) lets you withdraw a fixed
              amount or a percentage of the initial corpus at a chosen frequency
              (monthly, quarterly, half-yearly, yearly). Returns are applied to
              the remaining corpus and withdrawals are made after returns are
              credited (this page uses that convention).
            </p>

            <h3>When to use</h3>
            <ul>
              <li>To generate regular income from your investments</li>
              <li>
                To model retirement withdrawals or income from an equity/fund
                corpus
              </li>
              <li>
                To test sustainability of withdrawals under assumed returns
              </li>
            </ul>

            <LegalNote />
          </section>

          {/* BEFORE FOOTER AD */}
          <div className="ad-box" style={{ marginTop: 18 }}>
            Ad will appear here (Before footer)
          </div>
        </div>

        {/* STICKY SIDEBAR */}
        <aside className="sidebar">
          <div className="ad-box">Sticky Sidebar Ad</div>
          <LoanCompareWidget />
        </aside>
      </main>

      {/* JSON-LD FAQ for SEO (FAQ schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is an SWP?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'An SWP (Systematic Withdrawal Plan) allows periodic withdrawals from a corpus. This calculator simulates withdrawals and shows projected balance and returns.',
                },
              },
              {
                '@type': 'Question',
                name: 'How often can I withdraw?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Common frequencies are monthly, quarterly, half-yearly and yearly. Choose the frequency in the calculator.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
