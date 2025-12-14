// src/app/compare-loans/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import LoanComparison from '@/components/LoanComparison';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Loan Comparison Tool – Compare Interest Rates & EMI | Fincado',
  description:
    'Compare two loan offers side-by-side. Check which loan saves you more money on interest and EMI. Best for Home Loan and Personal Loan comparison.',
  keywords: [
    'Loan Comparison',
    'Compare Loans',
    'Home Loan Comparison',
    'Loan Calculator',
  ],
};

export default function CompareLoansPage() {
  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <header style={{ marginBottom: 40, textAlign: 'center' }}>
        <h1>Compare Loan Offers</h1>
        <p
          style={{
            maxWidth: 600,
            margin: '0 auto',
            color: 'var(--color-text-muted)',
          }}
        >
          Confused between two bank offers? Enter the details below to see which
          loan is actually cheaper in the long run.
        </p>
      </header>

      <div className="layout-grid">
        <div className="main-content">
          {/* THE NEW WIDGET */}
          <LoanComparison />

          <div style={{ margin: '40px 0' }}>
            <AdSlot id="compare-mid" type="leaderboard" />
          </div>

          <article className="article content-for-seo">
            <h2>Why Compare Loans?</h2>
            <p>
              Even a small difference in interest rates (e.g., 8.5% vs 8.75%)
              can result in a difference of lakhs over a 20-year tenure.
            </p>
            <p>
              <strong>Key things to look for:</strong>
            </p>
            <ul>
              <li>
                <strong>Total Interest Payable:</strong> The actual cost of the
                loan. Lower is better.
              </li>
              <li>
                <strong>Processing Fees:</strong> Some low-rate loans have high
                hidden fees.
              </li>
              <li>
                <strong>Prepayment Charges:</strong> Ensure your loan allows you
                to pay early without penalty (Floating rate home loans have zero
                penalty).
              </li>
            </ul>
          </article>
        </div>

        <aside className="sidebar">
          <FinancialNavWidget />
          <div style={{ marginTop: 24 }}>
            <AdSlot id="compare-sidebar" type="box" />
          </div>
        </aside>
      </div>
    </main>
  );
}
