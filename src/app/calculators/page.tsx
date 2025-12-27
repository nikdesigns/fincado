/* eslint-disable @next/next/no-html-link-for-pages */
// src/app/calculators/page.tsx
import type { Metadata } from 'next';
import CalculatorsGrid from './CalculatorsGrid';
import LegalNote from '@/components/LegalNote';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AdSlot from '@/components/AdSlot';
import LanguageToggle from '@/components/LanguageToggle';

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: 'All Financial Calculators | EMI, SIP, Inflation & Tax Tools',
  description:
    'Browse our complete suite of professional calculators for Indian investors: EMI, Home Loan, SIP, Inflation, PPF, Retirement Planner, GST Calculator and more.',
  keywords: [
    'financial calculators',
    'EMI calculator',
    'SIP calculator',
    'inflation calculator',
    'loan calculators india',
    'investment calculators',
    'retirement planning tools',
  ],
  openGraph: {
    title: 'All Financial Calculators | Fincado',
    description:
      'Free calculators for loans, investments, inflation, taxes and retirement planning.',
    url: 'https://www.fincado.com/calculators',
    type: 'website',
  },
};

export default function CalculatorsPage() {
  return (
    <>
      {/* ✅ BREADCRUMB STRUCTURED DATA (Top-level) */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Calculators', url: 'https://www.fincado.com/calculators' },
        ]}
      />

      <main
        className="container"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: 24,
          padding: '20px',
        }}
      >
        {/* -------- MAIN CONTENT -------- */}
        <div style={{ minWidth: 0 }}>
          {/* ✅ H1 (Critical for SEO) */}
          <header style={{ marginBottom: 32 }}>
            <LanguageToggle path="/hi/calculators" />
            <h1>All Financial Calculators</h1>
            <p
              style={{
                maxWidth: 720,
                color: 'var(--color-text-muted)',
                fontSize: 16,
              }}
            >
              Use our free financial calculators to plan loans, investments,
              inflation impact, taxes, and retirement with clarity and
              confidence.
            </p>
          </header>

          {/* Top Ad */}
          <div className="no-print" style={{ marginBottom: 24 }}>
            <AdSlot id="calc-hub-top" type="leaderboard" />
          </div>

          {/* Calculator Grid */}
          <CalculatorsGrid />

          {/* Mid Ad */}
          <div className="no-print" style={{ margin: '32px 0' }}>
            <AdSlot id="calc-hub-mid" type="leaderboard" />
          </div>

          {/* -------- SEO CONTENT -------- */}
          <section className="article">
            <h2>Why Use Financial Calculators?</h2>
            <p>
              Financial calculators help you make informed money decisions by
              visualizing real outcomes. Whether you are comparing EMIs,
              planning investments, or estimating inflation impact, calculators
              remove guesswork.
            </p>

            <h3>Popular Calculators on Fincado</h3>
            <ul>
              <li>
                <a href="/emi-calculator">EMI Calculator</a> – plan loan
                repayments
              </li>
              <li>
                <a href="/sip-calculator">SIP Calculator</a> – grow wealth
                monthly
              </li>
              <li>
                <a href="/inflation-calculator">Inflation Calculator</a> –
                protect purchasing power
              </li>
              <li>
                <a href="/fd-calculator">FD Calculator</a> – fixed deposit
                returns
              </li>
              <li>
                <a href="/retirement-plan">Retirement Planner</a> – long-term
                security
              </li>
            </ul>

            <h2>How EMI & Loan Calculators Help</h2>
            <p>
              Loan calculators show how interest rate and tenure affect your
              monthly EMI and total interest. Shorter tenures reduce interest
              but increase EMI, while longer tenures improve cash flow at a
              higher total cost.
            </p>

            <LegalNote />
          </section>

          {/* Bottom Ad */}
          <div className="no-print" style={{ marginTop: 32 }}>
            <AdSlot id="calc-hub-bottom" type="leaderboard" />
          </div>
        </div>

        {/* -------- SIDEBAR -------- */}
        <aside className="sidebar">
          <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
            <AdSlot id="calc-hub-sidebar" type="box" />
          </div>
          <FinancialNavWidget />
        </aside>
      </main>
    </>
  );
}
