/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import React, { JSX } from 'react';
import Link from 'next/link';
import Icon, { IconName } from '@/components/Icon';
import AdSlot from '@/components/AdSlot';
import articlesData from '@/data/articles.json';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Fincado – India’s #1 Financial Calculators (EMI, SIP, PPF & Tax)',
  description:
    'Master your money with Fincado. Free, bank-grade calculators for Home Loan EMI, SIP Returns, Inflation, EPF, PPF, GST, and Retirement Planning. Updated for 2025.',
  keywords: [
    'Financial Calculators India',
    'EMI Calculator',
    'SIP Calculator',
    'Inflation Calculator',
    'Home Loan Interest Rates',
    'Retirement Planning',
    'Tax Saving Calculator',
    'Fincado',
  ],
  alternates: {
    canonical: 'https://www.fincado.com',
  },
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
  // ✅ LOGIC: Select specific high-quality guides for Home Page
  const featuredSlugs = [
    'sukanya-samriddhi-yojana-guide-2025',
    'elss-funds-guide-2025',
    'sovereign-gold-bond-sgb-guide',
    'health-insurance-buying-guide',
  ];

  // ✅ FIX: Filter for Slug AND Language='en' to avoid duplicates
  const featuredGuides = articlesData.filter(
    (a) =>
      featuredSlugs.includes(a.slug) && (a.language === 'en' || !a.language)
  );

  // Fallback if specific slugs aren't found yet
  const displayGuides =
    featuredGuides.length > 0
      ? featuredGuides
      : articlesData
          .filter((a) => a.language === 'en' || !a.language)
          .slice(0, 4);

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
            '@type': 'Organization',
            name: 'Fincado',
            url: 'https://www.fincado.com',
            logo: 'https://www.fincado.com/logo.png',
            sameAs: [
              'https://www.linkedin.com/company/fincado',
              'https://twitter.com/fincado',
            ],
          }),
        }}
      />

      <main className="container home-hero-wrap" id="main-content">
        {/* --- HERO SECTION --- */}
        <section
          className="home-hero hero-elevated"
          aria-labelledby="hero-title"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* Ambient Background Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '600px',
              maxWidth: '80vw',
              height: '600px',
              maxHeight: '80vw',
              background:
                'radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, rgba(255,255,255,0) 70%)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          <div
            className="hero-grid"
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* LEFT CONTENT */}
            <div className="hero-content">
              {/* Trust Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '100px',
                  color: '#065f46',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginBottom: '24px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#059669',
                  }}
                />
                Updated for FY 2025-26
              </div>

              <h1
                id="hero-title"
                style={{
                  fontSize: '3.5rem',
                  lineHeight: '1.1',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                  color: '#0f172a',
                }}
              >
                <span
                  style={{
                    background:
                      'linear-gradient(135deg, #065f46 0%, #059669 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  Master Your Money
                </span>{' '}
                <br />
                <span style={{ fontSize: '0.9em', color: '#334155' }}>
                  with Precision Tools.
                </span>
              </h1>

              <p
                className="hero-sub"
                style={{
                  fontSize: '1.125rem',
                  color: '#475569',
                  maxWidth: '540px',
                  lineHeight: '1.6',
                  marginBottom: '32px',
                }}
              >
                Make smarter decisions with 20+ bank-grade calculators for
                Loans, SIPs, Inflation, and Retirement.
                <span
                  style={{
                    display: 'flex',
                    gap: '16px',
                    marginTop: '12px',
                    fontSize: '0.9em',
                    color: '#64748b',
                    fontWeight: 500,
                  }}
                >
                  <span>✓ No login required</span>
                  <span>✓ 100% Free</span>
                  <span>✓ Data Private</span>
                </span>
              </p>

              <div className="hero-cta-row" style={{ gap: '16px' }}>
                <Link
                  href="/emi-calculator"
                  className="primary-cta"
                  style={{
                    padding: '14px 32px',
                    fontSize: '16px',
                    backgroundColor: '#80d843',
                    color: '#0e0e11',
                    boxShadow: '0 10px 15px -3px rgba(5, 150, 105, 0.2)',
                    borderRadius: '8px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  Check Loan EMI
                </Link>
                <Link
                  href="/sip-calculator"
                  className="secondary-cta"
                  style={{
                    padding: '14px 32px',
                    fontSize: '16px',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    color: '#0f172a',
                    borderRadius: '8px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  Start Investing
                </Link>
              </div>

              <div
                style={{ marginTop: 32, minHeight: 90, maxWidth: '728px' }}
                className="hero-ad"
              >
                <AdSlot id="home-hero-leaderboard" type="banner" />
              </div>
            </div>

            {/* RIGHT VISUALS */}
            <aside
              className="hero-visual"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '20px',
              }}
            >
              <div className="hero-stats">
                {/* Floating Card 1: Debt */}
                <div
                  className="stat-card"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '0',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow:
                      '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
                    transform: 'rotate(-3deg)',
                    zIndex: 1,
                    borderRadius: '16px',
                    padding: '16px 20px',
                    minWidth: '180px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}
                  >
                    <span
                      style={{
                        background: '#fee2e2',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                      }}
                    >
                      📉
                    </span>
                    <span
                      className="stat-label"
                      style={{ fontSize: '12px', color: '#64748b' }}
                    >
                      Monthly EMI
                    </span>
                  </div>
                  <span
                    className="stat-value"
                    style={{
                      fontSize: '20px',
                      color: '#1e293b',
                      fontWeight: 'bold',
                    }}
                  >
                    ₹12,450
                  </span>
                </div>

                {/* Floating Card 2: Wealth */}
                <div
                  className="stat-card"
                  style={{
                    position: 'absolute',
                    top: '50px',
                    right: '20px',
                    background: 'white',
                    border: '1px solid #d1fae5',
                    boxShadow:
                      '0 25px 50px -12px rgba(5, 150, 105, 0.15), 0 0 0 1px rgba(5, 150, 105, 0.1)',
                    transform: 'rotate(2deg)',
                    zIndex: 2,
                    borderRadius: '20px',
                    padding: '24px',
                    minWidth: '220px',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '20px',
                      background: '#059669',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '4px 8px',
                      borderRadius: '12px',
                    }}
                  >
                    +12% Growth
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        background: '#d1fae5',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                      }}
                    >
                      🚀
                    </span>
                    <span
                      className="stat-label"
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Projected Corpus
                    </span>
                  </div>
                  <span
                    className="stat-value"
                    style={{
                      fontSize: '36px',
                      fontWeight: 800,
                      color: '#065f46',
                    }}
                  >
                    ₹2.54 Cr
                  </span>
                </div>
              </div>

              <div
                className="hero-side-ad"
                style={{ transform: 'scale(0.95)' }}
              >
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
            <Link href="/calculators" className="secondary-cta">
              View All
            </Link>
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

        {/* --- AD BREAK --- */}
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
              href="/inflation-calculator"
              icon="investing"
              title="Inflation Calculator"
              desc="Calculate Future Value of Money"
            />
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

        {/* --- FEATURED GUIDES (UPDATED ROBUST VERSION) --- */}
        <section className="featured-guides" style={{ marginTop: 60 }}>
          <div
            className="tools-header container-inner"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 32,
            }}
          >
            <div>
              <h2 style={{ marginBottom: 4 }}>Financial Wisdom</h2>
              <p style={{ color: '#64748b', fontSize: 16 }}>
                Latest insights on Loans, Tax, and Investing.
              </p>
            </div>
            <Link
              href="/guides"
              style={{
                color: '#065f46',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              View All Guides <span>→</span>
            </Link>
          </div>

          <div
            className="guide-grid container-inner"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {displayGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                style={{ textDecoration: 'none' }}
                className="guide-hover-card"
              >
                <article
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 24,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ marginBottom: 16 }}>
                    <span
                      style={{
                        background: '#dcfce7',
                        color: '#166534',
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: 999,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {guide.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: 12,
                      lineHeight: 1.4,
                    }}
                  >
                    {guide.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 14,
                      color: '#64748b',
                      lineHeight: 1.6,
                      marginBottom: 16,
                      flexGrow: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Strip HTML if any, take substring */}
                    {guide.metaDescription
                      .replace(/<[^>]+>/g, '')
                      .substring(0, 120)}
                    ...
                  </p>

                  <div
                    style={{
                      paddingTop: 16,
                      borderTop: '1px solid #f1f5f9',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 12,
                      color: '#94a3b8',
                      fontWeight: 500,
                    }}
                  >
                    <span>
                      {guide.published
                        ? new Date(guide.published).toLocaleDateString(
                            'en-IN',
                            {
                              month: 'short',
                              year: 'numeric',
                            }
                          )
                        : 'Guide'}
                    </span>
                    <span style={{ color: '#059669', fontWeight: 600 }}>
                      Read Article
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* --- RICH SEO CONTENT --- */}
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
              <Link href="/emi-calculator" className="primary-cta">
                Calculate EMI
              </Link>
              <Link href="/sip-calculator" className="secondary-cta">
                Plan Investment
              </Link>
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
    <Link href={href} className="tool-tile">
      <div className="tool-icon-wrap">
        <Icon name={icon} className="tool-icon-svg" />
      </div>
      <h3 className="tool-title">{title}</h3>
      <p className="tool-desc">{desc}</p>
    </Link>
  );
}
