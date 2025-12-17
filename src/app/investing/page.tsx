import type { Metadata } from 'next';
import InvestingClient from './InvestingClient';
import LegalNote from '@/components/LegalNote';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import WikiText from '@/components/WikiText';
import CalculatorSchema from '@/components/CalculatorSchema'; // ✅ SEO Rich Result
import ShareTools from '@/components/ShareTools'; // ✅ Viral Sharing
import AuthorBio from '@/components/AuthorBio'; // ✅ E-E-A-T Authority

export const metadata: Metadata = {
  title:
    'Investing Planner – SIP & Lumpsum Planner, Allocation & CAGR | Fincado',
  description:
    'Investing planner for India: plan SIPs and lumpsum investments, get future value, allocation suggestions, CAGR estimate and diversification guidance.',
  keywords: [
    'Investment Planner',
    'SIP Calculator India',
    'Asset Allocation Tool',
    'CAGR Calculator',
    'Lumpsum Calculator',
    'Financial Goal Planner',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/investing',
  },
  openGraph: {
    title: 'Investing Planner – Plan Your Financial Freedom',
    description:
      'Plan your SIPs, check asset allocation (Equity vs Debt), and calculate portfolio growth with inflation adjustments.',
    url: 'https://www.fincado.com/investing',
    type: 'website',
  },
};

export default function InvestingPage() {
  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      {/* ✅ 1. SEO: Structured Data for Google */}
      <CalculatorSchema
        name="Investment Planner India"
        description="Plan SIPs, lumpsum investments, and asset allocation (Equity/Debt/Gold). Calculate CAGR and future portfolio value."
        url="https://www.fincado.com/investing"
      />

      {/* ✅ 2. Breadcrumbs for Navigation */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Calculators', url: 'https://www.fincado.com/calculators' },
          {
            name: 'Investing Planner',
            url: 'https://www.fincado.com/investing',
          },
        ]}
      />

      {/* Header Section */}
      <header style={{ marginBottom: 40 }}>
        <h1>Investing Planner — SIP, Lumpsum & Allocation Guide</h1>

        {/* ✅ 3. Share Buttons (WhatsApp/Print) */}
        <ShareTools title="Investing Planner" />

        <p
          style={{
            maxWidth: 760,
            color: 'var(--color-text-muted)',
            marginTop: 24,
          }}
        >
          Plan SIPs and lumpsum investments, test different allocation mixes
          (Equity / Debt / Gold / Cash), see estimated future values and CAGR,
          and get simple diversification advice.
        </p>
      </header>

      {/* ✅ 4. Professional Grid Layout */}
      <div className="layout-grid">
        {/* -------- LEFT COLUMN: Calculator & Content -------- */}
        <div className="main-content">
          {/* Top Ad */}
          <AdSlot type="leaderboard" label="Top Ad" />

          {/* THE CALCULATOR APP */}
          <InvestingClient />

          {/* Mid Content Ad */}
          <div style={{ margin: '32px 0' }}>
            <AdSlot type="leaderboard" label="Mid Content Ad" />
          </div>

          <section className="article" style={{ marginTop: 24 }}>
            <h2>Notes for Indian Investors</h2>
            <WikiText
              content={`
              <ul>
                <li>
                  <strong>Nominal vs Real:</strong> Estimates use nominal annual return assumptions by asset class.
                  Remember to adjust for inflation to understand your real purchasing power.
                </li>
                <li>
                  <strong>Generic Advice:</strong> Allocation suggestions are based on standard financial rules of thumb 
                  and do not constitute personalised financial advice.
                </li>
                <li>
                  <strong>Hidden Costs:</strong> Taxes (LTCG/STCG), expense ratios, and transaction costs are not modelled
                  explicitly in this tool—these will slightly reduce your net returns.
                </li>
              </ul>
              `}
            />

            <LegalNote />

            {/* ✅ 5. Author Bio for Trust/Authority */}
            <AuthorBio />
          </section>

          {/* Bottom Ad */}
          <AdSlot type="rectangle" label="Bottom Ad" />
        </div>

        {/* -------- RIGHT COLUMN: Sidebar -------- */}
        <aside className="sidebar no-print">
          <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
            <AdSlot id="investing-sidebar" type="box" />
          </div>
          <FinancialNavWidget />
          {/* Sticky Sidebar Ad (High Revenue) */}
        </aside>
      </div>
    </main>
  );
}
