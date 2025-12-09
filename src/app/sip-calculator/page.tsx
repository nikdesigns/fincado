import type { Metadata } from 'next';
import SIPClient from './SIPClient';
import CalculatorLayout from '@/components/CalculatorLayout';

export const metadata: Metadata = {
  title: 'SIP Calculator – Mutual Fund SIP Returns | Fincado',
  description:
    'Free SIP Calculator to calculate mutual fund SIP returns and maturity.',
};

export default function SIPPage() {
  return (
    <CalculatorLayout>
      <h1>SIP Calculator – Calculate Mutual Fund Returns</h1>

      <p style={{ maxWidth: 700 }}>
        Calculate your SIP maturity value and total returns instantly.
      </p>

      <div className="ad-box">Ad will appear here (Above the fold)</div>

      <SIPClient />

      <div className="ad-box">Ad will appear here (Mid content)</div>

      <section className="article">
        <h2>What is SIP?</h2>
        <p>SIP is a systematic investment method in mutual funds.</p>
      </section>

      <div className="ad-box">Ad will appear here (Before footer)</div>
    </CalculatorLayout>
  );
}
