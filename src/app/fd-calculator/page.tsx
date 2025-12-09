import type { Metadata } from 'next';
import FDClient from './FDClient';
import CalculatorLayout from '@/components/CalculatorLayout';

export const metadata: Metadata = {
  title: 'FD Calculator – Fixed Deposit Maturity | Fincado',
  description:
    'Free FD Calculator to calculate fixed deposit maturity value and interest.',
};

export default function FDPage() {
  return (
    <CalculatorLayout>
      <h1>FD Calculator – Calculate Fixed Deposit Maturity Instantly</h1>

      <p style={{ maxWidth: 700 }}>
        Estimate your FD maturity value, interest earned and total return.
      </p>

      <div className="ad-box">Ad will appear here (Above the fold)</div>

      <FDClient />

      <div className="ad-box">Ad will appear here (Mid content)</div>

      <section className="article">
        <h2>What is a Fixed Deposit?</h2>
        <p>
          Fixed Deposit is a low-risk deposit investment with guaranteed
          returns.
        </p>
      </section>

      <div className="ad-box">Ad will appear here (Before footer)</div>
    </CalculatorLayout>
  );
}
