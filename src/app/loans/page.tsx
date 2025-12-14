import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import Icon, { IconName } from '@/components/Icon'; // ✅ Correct Import

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: 'Compare Loans in India: Home, Personal & Car Loan Rates (2025)',
  description:
    'Find the best loan offers in India. Compare interest rates, calculate EMI, and check eligibility for Home Loans, Personal Loans, and Car Loans.',
  keywords: [
    'loans in India',
    'compare loan interest rates',
    'home loan eligibility',
    'personal loan interest rates',
    'car loan emi calculator',
    'education loan india',
    'loan against property',
  ],
  openGraph: {
    title: 'Smart Borrowing Starts Here | Fincado Loans Hub',
    description:
      'Compare rates, calculate EMIs, and apply for the best loans in India.',
    url: 'https://www.fincado.com/loans',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fincado.com/loans',
  },
};

// --- 2. LOAN DATA (Using your exact IconNames) ---
const LOAN_TYPES = [
  {
    title: 'Home Loan',
    path: '/loans/home-loan',
    icon: 'homeLoan' as IconName, // ✅ Matches Icon.tsx
    desc: 'Lowest rates from 8.35%. Tax benefits under Sec 24 & 80C.',
  },
  {
    title: 'Personal Loan',
    path: '/loans/personal-loan',
    icon: 'personalLoan' as IconName, // ✅ Matches Icon.tsx
    desc: 'Instant approval up to ₹40 Lakhs. No collateral required.',
  },
  {
    title: 'Car Loan',
    path: '/loans/car-loan',
    icon: 'carLoan' as IconName, // ✅ Matches Icon.tsx
    desc: 'Drive your dream car with up to 100% on-road funding.',
  },
  {
    title: 'Education Loan',
    path: '/loans/education-loan',
    icon: 'educationLoan' as IconName, // ✅ Matches Icon.tsx
    desc: 'Study in India or abroad with moratorium benefits.',
  },
  {
    title: 'Check Eligibility',
    path: '/emi-calculator',
    icon: 'emi' as IconName, // ✅ Matches Icon.tsx
    desc: 'Calculate your exact monthly EMI before applying.',
  },
];

export default function LoansPage() {
  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 24,
        padding: '20px',
      }}
      className="container"
    >
      {/* --- STRUCTURED DATA (FAQ) --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the current Home Loan interest rate in India?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Current home loan interest rates in India start around 8.35% p.a. for eligible borrowers with a credit score above 750.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I get a Personal Loan without collateral?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Personal Loans are unsecured loans, meaning you do not need to pledge any collateral like gold or property to avail them.',
                },
              },
            ],
          }),
        }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Loans', url: 'https://www.fincado.com/loans' },
        ]}
      />

      {/* --- LEFT COLUMN: CONTENT --- */}
      <div style={{ minWidth: 0 }}>
        {/* Top Ad */}
        <div style={{ marginBottom: 24 }} className="no-print">
          <AdSlot id="loans-top-leaderboard" type="leaderboard" />
        </div>

        {/* --- HERO SECTION (Brand Green Theme) --- */}
        <section
          style={{
            padding: '48px 32px',
            textAlign: 'center',
            marginBottom: 32,
            background:
              'radial-gradient(circle at 50% 0%, rgba(72, 151, 25, 0.1) 0%, rgba(255,255,255,0) 80%)', // Brand Green Glow
            borderRadius: '20px',
            border: '1px solid var(--color-border)',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              background: 'var(--color-success-bg)',
              color: 'var(--color-brand-green)',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '100px',
              marginBottom: 16,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              border: '1px solid #dcfce7',
            }}
          >
            Smart Borrowing
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 42px)',
              fontWeight: 800,
              marginBottom: 16,
              color: 'var(--color-text-main)',
              lineHeight: 1.1,
            }}
          >
            Find the Perfect Loan for <br />
            <span style={{ color: 'var(--color-brand-green)' }}>
              Your Ambitions.
            </span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--color-text-muted)',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Compare interest rates, check eligibility, and calculate EMIs for
            Home, Personal, and Car loans in minutes.
          </p>
        </section>

        {/* --- LOAN GRID (Correct Icons & Colors) --- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginBottom: 40,
          }}
        >
          {LOAN_TYPES.map((loan) => (
            <Link
              key={loan.path}
              href={loan.path}
              className="loan-card"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid var(--color-border)',
                borderRadius: 16,
                padding: 24,
                background: 'var(--color-bg-white)',
                transition:
                  'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  background: 'var(--color-success-bg)', // Light Green Bg
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  color: 'var(--color-brand-green)', // Brand Green Icon
                }}
              >
                {/* ✅ Using Icon Component properly with className for size */}
                <Icon name={loan.icon} className="w-8 h-8" />
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: 'var(--color-text-main)',
                }}
              >
                {loan.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.5,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {loan.desc}
              </p>
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: '1px solid var(--color-bg-soft)',
                  color: 'var(--color-brand-green)',
                  fontSize: 13,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                Check Rates &rarr;
              </div>
            </Link>
          ))}
        </div>

        {/* Mid Content Ad */}
        <div style={{ margin: '40px 0' }} className="no-print">
          <AdSlot id="loans-mid-leaderboard" type="leaderboard" />
        </div>

        {/* --- RICH SEO CONTENT --- */}
        <article className="article">
          <h2>Understanding Loans in India</h2>
          <p>
            A loan is a sum of money that you borrow from a bank or financial
            institution (NBFC) with the promise to repay it over a specific
            period (tenure) along with interest. Loans are categorized broadly
            into two types:
          </p>

          <div
            style={{
              display: 'grid',
              gap: 16,
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              margin: '24px 0',
            }}
          >
            <div
              style={{
                padding: 20,
                background: 'var(--color-bg-soft)',
                borderRadius: 12,
                border: '1px solid var(--color-border)',
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  marginTop: 0,
                  color: 'var(--color-action-cta)',
                }}
              >
                1. Secured Loans
              </h3>
              <p style={{ fontSize: 14, marginBottom: 0 }}>
                Backed by collateral (e.g., House, Car, Gold). These generally
                have lower interest rates because the risk to the lender is
                lower. <br />
                <em>Examples: Home Loan, Car Loan.</em>
              </p>
            </div>
            <div
              style={{
                padding: 20,
                background: 'var(--color-bg-soft)',
                borderRadius: 12,
                border: '1px solid var(--color-border)',
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  marginTop: 0,
                  color: 'var(--color-action-cta)',
                }}
              >
                2. Unsecured Loans
              </h3>
              <p style={{ fontSize: 14, marginBottom: 0 }}>
                Given based on your creditworthiness (CIBIL Score) and income.
                No collateral is needed, but interest rates are higher.
                <br />
                <em>Examples: Personal Loan, Credit Cards.</em>
              </p>
            </div>
          </div>

          <h3>Key Factors Affecting Your EMI</h3>
          <ul>
            <li>
              <strong>Principal Amount:</strong> The total money borrowed.
              Higher principal directly increases EMI.
            </li>
            <li>
              <strong>Interest Rate:</strong> The cost of borrowing. Even a 0.5%
              difference can save you lakhs over 20 years.
            </li>
            <li>
              <strong>Tenure:</strong> The repayment duration. Longer tenure =
              Lower EMI but Higher Total Interest.
            </li>
          </ul>

          <h3>Checklist Before Applying</h3>
          <p>
            Before you submit a loan application, ensure you check your{' '}
            <Link href="/credit-score">Credit Score</Link>. A score above 750
            can help you negotiate better rates. Also, use our{' '}
            <Link href="/emi-calculator">EMI Calculator</Link> to ensure the
            monthly installment fits within 40% of your take-home salary.
          </p>
        </article>

        {/* Bottom Ad */}
        <div style={{ marginTop: 24 }} className="no-print">
          <AdSlot id="loans-bottom-leaderboard" type="leaderboard" />
        </div>
      </div>

      {/* --- RIGHT COLUMN: SIDEBAR --- */}
      <aside className="sidebar">
        {/* Sticky Ad Box */}
        <div style={{ marginBottom: 24 }}>
          <AdSlot id="loans-sidebar-sticky" type="box" />
        </div>

        {/* Navigation Widget */}
        <FinancialNavWidget />

        {/* Credit Score Promo (Themed) */}
        <div
          style={{
            marginTop: 24,
            padding: 24,
            background: 'var(--color-action-cta)', // Deep Teal/Black
            color: 'white',
            borderRadius: 16,
            textAlign: 'center',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
          <h3 style={{ fontSize: 16, color: 'white', marginBottom: 8 }}>
            Check Your Eligibility
          </h3>
          <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>
            A high CIBIL score is the secret to low-interest loans. Check yours
            for free.
          </p>
          <Link
            href="/credit-score"
            style={{
              display: 'block',
              padding: '12px',
              background: 'var(--color-brand-green)',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Check Credit Score
          </Link>
        </div>
      </aside>

      {/* Local Styles for Icon Sizing and Hover */}
      <style>{`
        .w-8 { width: 32px; }
        .h-8 { height: 32px; }
        .loan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
          border-color: var(--color-brand-light) !important;
        }
      `}</style>
    </main>
  );
}
