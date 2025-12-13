/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import React, { JSX } from 'react';
import Icon, { IconName } from '@/components/Icon';
import AdSlot from '@/components/AdSlot';
import HeroWithStats from '@/components/HeroWithStats';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Fincado – India’s #1 Financial Calculators (EMI, SIP, PPF & Tax)',
  description:
    'Master your money with Fincado. Free, bank-grade calculators for Home Loan EMI, SIP Returns, FD Interest, EPF, PPF, GST, and Retirement Planning. Updated for 2025.',
  keywords: [
    'Financial Calculators India',
    'EMI Calculator',
    'SIP Calculator',
    'Home Loan Interest Rates',
    'FD vs SIP',
    'Retirement Planning',
    'Tax Saving Calculator',
    'Investment Planner',
    'Fincado',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.fincado.com',
    title: 'Fincado – Master Your Money',
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
              {
                '@type': 'Question',
                name: 'Do I need to login to use Fincado?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. All calculators on Fincado are 100% free and do not require any login or personal information.',
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
                  Check Loan EMI
                </a>
                <a href="/sip-calculator" className="secondary-cta">
                  Start SIP
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

        {/* --- RICH SEO CONTENT (NEW: Boosts Ranking) --- */}
        <article
          className="article content-for-seo container-inner"
          style={{ marginTop: 60, marginBottom: 60 }}
        >
          <h2>Your All-In-One Financial Planning Platform</h2>
          <p>
            Financial freedom isn&apos;t a dream; it&apos;s a calculation.
            Whether you are a fresh graduate starting your first job, a parent
            planning for your child&apos;s education, or someone nearing
            retirement, <strong>Fincado</strong> provides the mathematical
            clarity you need to make the right choices.
          </p>

          <h3>Why Use Online Financial Calculators?</h3>
          <p>
            Manual calculations are prone to errors, especially when dealing
            with compound interest, tax slabs, and inflation. Our calculators
            offer:
          </p>
          <ul>
            <li>
              <strong>Precision:</strong> We use bank-grade formulas used by
              institutions like SBI, HDFC, and ICICI.
            </li>
            <li>
              <strong>Speed:</strong> Get answers in milliseconds—no complex
              Excel sheets required.
            </li>
            <li>
              <strong>Visualization:</strong> Our interactive charts help you
              &quot;see&quot; your money grow or your debt reduce.
            </li>
          </ul>

          <h3>Core Pillars of Personal Finance</h3>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h4>Debt Management</h4>
              <p>
                Use our <strong>EMI Calculators</strong> to keep your
                Debt-to-Income ratio below 40%. Smartly plan prepayments to
                become debt-free faster.
              </p>
            </div>
            <div className="advantage-card">
              <h4>Wealth Creation</h4>
              <p>
                Start a <strong>SIP</strong> today. Even ₹500/month compounded
                at 12% over 30 years can create a significant corpus.
              </p>
            </div>
            <div className="advantage-card">
              <h4>Tax Saving</h4>
              <p>
                Maximize Section 80C limits with <strong>PPF</strong>,{' '}
                <strong>EPF</strong>, and ELSS funds. Don&apos;t let taxes eat
                into your retirement nest egg.
              </p>
            </div>
          </div>

          <h3>Frequently Asked Questions</h3>
          <div className="faqs-accordion">
            <details>
              <summary>
                Are these calculators accurate for Indian banks?
              </summary>
              <p>
                Yes. All our tools (EMI, FD, RD) are calibrated for the Indian
                banking system, including quarterly compounding for FDs and
                reducing balance method for Loans.
              </p>
            </details>
            <details>
              <summary>How can I save tax on my salary?</summary>
              <p>
                You can use our EPF and PPF calculators to plan your Section 80C
                investments (Limit: ₹1.5 Lakh). Additionally, Home Loan interest
                (Section 24b) and NPS (Section 80CCD) offer further deductions.
              </p>
            </details>
            <details>
              <summary>What is the best way to become a Crorepati?</summary>
              <p>
                Consistent investing. Use the SIP Calculator to see how a
                ₹15,000 monthly investment at 12% return makes you a Crorepati
                in 15 years.
              </p>
            </details>
          </div>
        </article>

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
