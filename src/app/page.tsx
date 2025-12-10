// src/app/page.tsx
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import AdSlot from '@/components/AdSlot'; // existing Ad component
import React from 'react';

export const metadata: Metadata = {
  title: 'Fincado — Smart Financial Calculators & Loan Tools for India',
  description:
    'Plan EMI, SIP, FD, Savings and loans with India-focused calculators and guides. Free, accurate tools to compare rates, calculate EMI and check credit score.',
  openGraph: {
    title: 'Fincado — Smart Financial Calculators & Loan Tools for India',
    description:
      'Plan EMI, SIP, FD, Savings and loans with India-focused calculators and guides. Free, accurate tools to compare rates, calculate EMI and check credit score.',
    url: 'https://www.yourdomain.com',
  },
};

export default function Home(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <>
      {/* JSON-LD: Organization + WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Fincado',
            url: 'https://www.yourdomain.com',
            logo: 'https://www.yourdomain.com/logo.png',
            sameAs: [],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: 'https://www.yourdomain.com',
            name: 'Fincado',
            potentialAction: {
              '@type': 'SearchAction',
              target:
                'https://www.yourdomain.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      <main className="container home-hero-wrap" id="content">
        {/* HERO */}
        <section
          className="home-hero hero-elevated"
          aria-labelledby="hero-title"
        >
          <div className="hero-grid">
            <div className="hero-content">
              <h1 id="hero-title">
                Smart Financial Calculators & Loan Tools for India
              </h1>

              <p className="hero-sub">
                Accurate, India-focused EMI, SIP, FD & Savings tools — built for
                Indian taxes, loan rules and realistic planning. Free to use —
                no signup required.
              </p>

              <div className="hero-cta-row">
                <a href="/emi-calculator" className="primary-cta" role="button">
                  Calculate EMI
                </a>

                <a href="/credit-score" className="secondary-cta" role="button">
                  Check Credit Score
                </a>
              </div>

              <ul className="hero-bullets" aria-hidden>
                <li>✅ No signup</li>
                <li>✅ Bank-grade accuracy</li>
                <li>✅ 100% free</li>
              </ul>

              {/* ABOVE-THE-FOLD AD (native to hero but non-intrusive) */}
              <div className="hero-ad">
                <AdSlot id="home-hero-abovefold" type="banner" />
              </div>
            </div>

            {/* HERO STATS & AD (right column) */}
            <aside className="hero-visual" aria-hidden>
              <div className="hero-stats">
                <div className="stat-card">
                  <div className="stat-value">₹12,450</div>
                  <div className="stat-label">Monthly EMI (sample)</div>
                </div>

                <div className="stat-card">
                  <div className="stat-value">₹6.8L</div>
                  <div className="stat-label">Total Interest Saved</div>
                </div>
              </div>

              <div className="hero-side-ad">
                <AdSlot id="home-hero-side" type="box" />
              </div>
            </aside>
          </div>
        </section>

        {/* TOOLS — high RPM placement next */}
        <section className="tools-section" aria-label="Tools">
          <div className="tools-header">
            <h2>Most Used Tools</h2>
            <p className="tools-sub">
              Quick links to the calculators people use the most.
            </p>
          </div>

          <div className="tools-grid">
            <a href="/emi-calculator" className="tool-tile">
              <div className="tool-icon-box">
                <Icon name="emi" className="tool-icon-svg" />
              </div>
              <h3>EMI Calculator</h3>
              <p>Plan your loan instantly</p>
            </a>

            <a href="/loans/home-loan" className="tool-tile">
              <div className="tool-icon-box">
                <Icon name="homeLoan" className="tool-icon-svg" />
              </div>
              <h3>Home Loan</h3>
              <p>Lowest rates & EMI planning</p>
            </a>

            <a href="/sip-calculator" className="tool-tile">
              <div className="tool-icon-box">
                <Icon name="sip" className="tool-icon-svg" />
              </div>
              <h3>SIP Calculator</h3>
              <p>Grow your wealth with SIP</p>
            </a>

            <a href="/fd-calculator" className="tool-tile">
              <div className="tool-icon-box">
                <Icon name="fd" className="tool-icon-svg" />
              </div>
              <h3>FD Calculator</h3>
              <p>Safe returns with compounding</p>
            </a>

            <a href="/savings" className="tool-tile">
              <div className="tool-icon-box">
                <Icon name="saving" className="tool-icon-svg" />
              </div>
              <h3>Savings Planner</h3>
              <p>Build your emergency fund</p>
            </a>

            <a href="/credit-score" className="tool-tile">
              <div className="tool-icon-box">
                <Icon name="creditScore" className="tool-icon-svg" />
              </div>
              <h3>Credit Score</h3>
              <p>Check your CIBIL & eligibility</p>
            </a>
          </div>
        </section>

        {/* Inline ad to increase RPM between content blocks — SEO friendly placement */}
        <div className="midpage-ad">
          <AdSlot id="home-mid-ad" type="leaderboard" />
        </div>

        {/* TRUST & STATS */}
        {/* Trust Strip — compact */}
        <section className="trust-strip compact" aria-label="Site stats">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-value">10+</div>
              <div className="trust-label">Tools</div>
            </div>

            <div className="trust-item">
              <div className="trust-value">5,000+</div>
              <div className="trust-label">Monthly Users</div>
            </div>

            <div className="trust-item">
              <div className="trust-value">₹500 Cr+</div>
              <div className="trust-label">EMIs Calculated</div>
            </div>

            <div className="trust-item">
              <div className="trust-value">100%</div>
              <div className="trust-label">Free & Secure</div>
            </div>
          </div>
        </section>

        {/* FEATURED GUIDES — internal linking & content discoverability */}
        <section className="featured-guides">
          <h2>Featured Finance Guides</h2>
          <p className="tools-sub">
            Short expert guides to help you make smarter money decisions.
          </p>

          <div className="guide-grid">
            <a
              href="/guides/home-loan-for-first-time-buyers"
              className="home-guide-card"
            >
              <h3>Home Loan Guide for First-Time Buyers</h3>
              <p>
                Everything you need before applying for your first home loan.
              </p>
            </a>

            <a href="/guides/sip-vs-fd" className="home-guide-card">
              <h3>SIP vs FD — Which Is Better?</h3>
              <p>Compare returns, risk and tax for smarter choices.</p>
            </a>

            <a
              href="/guides/how-credit-score-affects-loans"
              className="home-guide-card"
            >
              <h3>How Credit Score Affects Your Loan</h3>
              <p>Learn how your CIBIL impacts rates and approvals.</p>
            </a>
          </div>
        </section>

        {/* FINAL CTA — sticky footer has its own CTA too */}
        <section
          className="final-cta compact-cta"
          aria-labelledby="final-cta-title"
        >
          <div className="final-cta-inner">
            <h2 id="final-cta-title">Ready to plan your finances smarter?</h2>
            <p>
              Use India-specific calculators & expert guides before making any
              financial decision.
            </p>

            <div className="final-cta-row">
              <a href="/emi-calculator" className="primary-cta">
                Start with EMI Calculator
              </a>
              <a href="/guides" className="secondary-cta">
                Read Guides
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
