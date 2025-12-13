/* eslint-disable @next/next/no-html-link-for-pages */
// src/app/page.tsx
import type { Metadata } from 'next';
import React, { JSX } from 'react';
import Icon, { IconName } from '@/components/Icon';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Fincado — India’s #1 Financial Calculators (EMI, SIP, PPF & Tax)',
  description:
    'Plan your financial future with Fincado. Free tools for Home Loan EMI, SIP Returns, FD Interest, EPF, PPF, GST and Retirement Planning. Accurate & Updated for 2025.',
  keywords: [
    'EMI Calculator',
    'SIP Calculator India',
    'Home Loan Interest Rates',
    'FD Calculator',
    'PPF Calculator',
    'EPF Calculator',
    'GST Calculator',
    'Retirement Planning India',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.fincado.com',
    title: 'Fincado — Master Your Money',
    description:
      'The most comprehensive financial toolkit for Indian investors.',
    siteName: 'Fincado',
  },
};

export default function Home(): JSX.Element {
  return (
    <>
      {/* --- STRUCTURED DATA (JSON-LD) --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Fincado',
            url: 'https://www.fincado.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://www.fincado.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Which calculator is best for loan planning?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The EMI Calculator is the best tool to plan your loans. It helps you calculate monthly installments based on principal, tenure, and interest rate.',
                },
              },
              {
                '@type': 'Question',
                name: 'How accurate are the SIP calculators?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Fincado SIP calculators use standard compound interest formulas (monthly compounding) to provide highly accurate estimates of your mutual fund returns.',
                },
              },
            ],
          }),
        }}
      />

      <main className="container home-hero-wrap" id="main-content">
        {/* --- HERO SECTION --- */}
        <section
          className="home-hero hero-elevated"
          aria-labelledby="hero-title"
        >
          <div className="hero-grid">
            <div className="hero-content">
              <h1 id="hero-title">
                <span style={{ color: 'var(--color-brand-green)' }}>
                  Master Your Money
                </span>{' '}
                <br />
                with India’s Best Financial Tools
              </h1>

              <p className="hero-sub">
                Make smarter decisions with 20+ free, bank-grade calculators for
                Loans, Investments, Taxes, and Retirement.
                <strong> No login required.</strong>
              </p>

              <div className="hero-cta-row">
                <a href="/emi-calculator" className="primary-cta">
                  Start with EMI Calculator
                </a>
                <a href="/sip-calculator" className="secondary-cta">
                  Plan Your SIP
                </a>
              </div>

              <div style={{ marginTop: 24, minHeight: 90 }} className="hero-ad">
                <AdSlot id="home-hero-leaderboard" type="banner" />
              </div>
            </div>

            <aside className="hero-visual">
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-value">₹12,450</span>
                  <span className="stat-label">Monthly EMI</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">₹25.4L</span>
                  <span className="stat-label">SIP Corpus</span>
                </div>
              </div>
              <div className="hero-side-ad">
                <AdSlot id="home-hero-sidebar" type="box" />
              </div>
            </aside>
          </div>
        </section>

        {/* --- 1. MOST POPULAR TOOLS --- */}
        <section className="tools-section">
          <div className="tools-header container-inner">
            <div>
              <h2>Essential Financial Tools</h2>
              <p className="tools-sub">
                Everyday calculators used by millions of Indians.
              </p>
            </div>
            <a href="/calculators" className="secondary-cta">
              View All
            </a>
          </div>

          <div className="tools-grid container-inner">
            <ToolCard
              href="/emi-calculator"
              icon="emi"
              title="EMI Calculator"
              desc="Calculate Loan EMI & Interest"
            />
            <ToolCard
              href="/sip-calculator"
              icon="sip"
              title="SIP Calculator"
              desc="Estimate Mutual Fund Returns"
            />
            <ToolCard
              href="/credit-score"
              icon="creditScore"
              title="Credit Score"
              desc="Check Loan Eligibility"
            />
            <ToolCard
              href="/gst-calculator"
              icon="tax"
              title="GST Calculator"
              desc="Calculate Inclusive/Exclusive Tax"
            />
          </div>
        </section>

        {/* --- AD BREAK (High RPM) --- */}
        <div className="midpage-ad">
          <AdSlot id="home-mid-1" type="leaderboard" />
        </div>

        {/* --- 2. LOAN PLANNING SECTION --- */}
        <section className="tools-section">
          <div className="tools-header container-inner">
            <div>
              <h2>Loan & Debt Planning</h2>
              <p className="tools-sub">
                Compare rates and plan your repayment strategy.
              </p>
            </div>
          </div>
          <div className="tools-grid container-inner">
            <ToolCard
              href="/loans/home-loan"
              icon="homeLoan"
              title="Home Loan EMI"
              desc="Check Affordability & Tax Benefits"
            />
            <ToolCard
              href="/loans/personal-loan"
              icon="personalLoan"
              title="Personal Loan"
              desc="Compare Interest Rates"
            />
            <ToolCard
              href="/loans/car-loan"
              icon="carLoan"
              title="Car Loan EMI"
              desc="Plan your dream car purchase"
            />
            <ToolCard
              href="/loans/education-loan"
              icon="educationLoan"
              title="Education Loan"
              desc="Calculate moratorium interest"
            />
          </div>
        </section>

        {/* --- TRUST BANNER --- */}
        <HeroWithStats
          imageSrc="/images/family.png"
          imageAlt="Indian family financial planning"
          eyebrow="Trusted by Indians"
          title="Helping you build wealth with transparency and precision."
          stats={[
            { value: '20+', label: 'Smart Calculators' },
            { value: '100%', label: 'Free & Unbiased' },
            { value: '4.9/5', label: 'User Rating' },
          ]}
        />

        {/* --- 3. INVESTMENT & WEALTH --- */}
        <section className="tools-section">
          <div className="tools-header container-inner">
            <div>
              <h2>Grow Your Wealth</h2>
              <p className="tools-sub">
                Maximize returns on your savings and investments.
              </p>
            </div>
          </div>
          <div className="tools-grid container-inner">
            <ToolCard
              href="/fd-calculator"
              icon="fd"
              title="FD Calculator"
              desc="Fixed Deposit Maturity Value"
            />
            <ToolCard
              href="/rd-calculator"
              icon="rd"
              title="RD Calculator"
              desc="Recurring Deposit Returns"
            />
            <ToolCard
              href="/lumpsum-calculator"
              icon="investing"
              title="Lumpsum Calculator"
              desc="One-time investment returns"
            />
            <ToolCard
              href="/swp-calculator"
              icon="saving"
              title="SWP Calculator"
              desc="Systematic Withdrawal Plan"
            />
          </div>
        </section>

        {/* --- AD BREAK --- */}
        <div className="midpage-ad">
          <AdSlot id="home-mid-2" type="leaderboard" />
        </div>

        {/* --- 4. RETIREMENT & TAX --- */}
        <section className="tools-section">
          <div className="tools-header container-inner">
            <div>
              <h2>Retirement & Tax Planning</h2>
              <p className="tools-sub">
                Secure your future with government-backed schemes.
              </p>
            </div>
          </div>
          <div className="tools-grid container-inner">
            <ToolCard
              href="/retirement-calculator"
              icon="retirement"
              title="Retirement Planner"
              desc="How much corpus do you need?"
            />
            <ToolCard
              href="/ppf-calculator"
              icon="ppf"
              title="PPF Calculator"
              desc="Public Provident Fund Returns"
            />
            <ToolCard
              href="/epf-calculator"
              icon="epf"
              title="EPF Calculator"
              desc="Employee Provident Fund Corpus"
            />
            <ToolCard
              href="/fire-calculator"
              icon="fire"
              title="FIRE Calculator"
              desc="Financial Independence Retire Early"
            />
          </div>
        </section>

        {/* --- FEATURED GUIDES --- */}
        <section className="featured-guides">
          <div className="tools-header container-inner">
            <h2>Financial Wisdom</h2>
          </div>
          <div className="guide-grid container-inner">
            <GuideCard
              href="/guides/home-loan-for-first-time-buyers"
              title="Home Loan Guide 2025"
              desc="Step-by-step guide for first-time homebuyers."
            />
            <GuideCard
              href="/guides/sip-vs-fd"
              title="SIP vs FD: Better Choice?"
              desc="Analysis of risk, returns, and taxation."
            />
            <GuideCard
              href="/guides/how-credit-score-affects-loans"
              title="Boost Your Credit Score"
              desc="7 proven ways to increase your CIBIL score above 750."
            />
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="final-cta">
          <div className="final-cta-inner">
            <h2>Ready to take control?</h2>
            <p>Join thousands of smart investors using Fincado daily.</p>
            <div className="final-cta-row">
              <a href="/emi-calculator" className="primary-cta">
                Calculate EMI
              </a>
              <a href="/sip-calculator" className="secondary-cta">
                Plan Investment
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// --- SUB-COMPONENTS ---
function ToolCard({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: IconName;
  title: string;
  desc: string;
}) {
  return (
    <a href={href} className="tool-tile">
      <div className="tool-icon-wrap">
        <Icon name={icon} className="tool-icon-svg" />
      </div>
      <h3 className="tool-title">{title}</h3>
      <p className="tool-desc">{desc}</p>
    </a>
  );
}

function GuideCard({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <a href={href} className="home-guide-card">
      <h3>{title}</h3>
      <p>{desc}</p>
    </a>
  );
}
