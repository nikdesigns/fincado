import type { Metadata } from 'next';
import EMIClient from './EMIClient';
import LoanCompareWidget from '@/components/LoanCompareWidget';
import LegalNote from '@/components/LegalNote';

export const metadata: Metadata = {
  title: 'EMI Calculator – Calculate Loan EMI Online | Fincado',
  description:
    'Free EMI calculator to calculate monthly loan EMI, total interest and total repayment. Plan home loan, car loan & personal loan EMIs online.',
};

export default function EMIPage() {
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
      {/* LEFT CONTENT */}
      <div style={{ minWidth: 0 }}>
        <h1>EMI Calculator – Calculate Loan EMI Instantly</h1>

        <p style={{ maxWidth: 700 }}>
          Use this free EMI Calculator to instantly calculate your monthly loan
          EMI, total interest payable, and total repayment amount.
        </p>

        {/* ✅ ABOVE THE FOLD AD */}
        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <EMIClient />

        {/* ✅ MID CONTENT AD */}
        <div className="ad-box">Ad will appear here (Mid content)</div>

        <section className="article">
          <h2>What is EMI?</h2>
          <p>
            EMI (Equated Monthly Installment) is the fixed amount you pay every
            month to repay a loan. It includes both principal and interest.
          </p>

          <h2>EMI Formula</h2>
          <pre>EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)</pre>

          <h2>Related Tools</h2>
          <ul>
            <li>
              <a href="/sip-calculator">SIP Calculator</a>
            </li>
            <li>
              <a href="/fd-calculator">FD Calculator</a>
            </li>
            <li>
              <a href="/loans">Loan Calculators</a>
            </li>
          </ul>

          <LegalNote />
        </section>

        {/* ✅ BEFORE FOOTER AD */}
        <div className="ad-box">Ad will appear here (Before footer)</div>
      </div>

      {/* ✅ STICKY SIDEBAR */}
      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>
        <LoanCompareWidget />
      </aside>
    </main>
  );
}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How is EMI calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EMI is calculated using the formula EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)',
          },
        },
        {
          '@type': 'Question',
          name: 'Does checking EMI affect credit score?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, using an EMI calculator does not affect your credit score.',
          },
        },
      ],
    }),
  }}
/>;
