// src/app/page.tsx
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import AdSlot from '@/components/AdSlot'; // existing Ad component
import React from 'react';
import HeroWithStats from '@/components/HeroWithStats';

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
        <section className="tools-section" aria-label="Most used calculators">
          <div className="tools-header container-inner">
            <div>
              <h2>Most Used Tools</h2>
              <p className="tools-sub">
                Quick links to the calculators people use the most.
              </p>
            </div>

            <div className="tools-cta">
              <a
                href="/tools"
                className="secondary-cta"
                aria-label="See all tools"
              >
                See all tools
              </a>
            </div>
          </div>

          <div className="tools-grid container-inner" role="list">
            <a
              role="listitem"
              href="/emi-calculator"
              className="tool-tile"
              aria-label="EMI Calculator — Plan your loan instantly"
              tabIndex={0}
            >
              <div className="tool-icon-wrap">
                <div className="tool-icon-circle">
                  <Icon name="emi" className="tool-icon-svg" />
                </div>
              </div>
              <h3 className="tool-title">EMI Calculator</h3>
              <p className="tool-desc">Plan your loan instantly</p>
            </a>

            <a
              role="listitem"
              href="/loans/home-loan"
              className="tool-tile"
              aria-label="Home Loan — Lowest rates & EMI planning"
              tabIndex={0}
            >
              <div className="tool-icon-wrap">
                <div className="tool-icon-circle">
                  <Icon name="homeLoan" className="tool-icon-svg" />
                </div>
              </div>
              <h3 className="tool-title">Home Loan</h3>
              <p className="tool-desc">Lowest rates & EMI planning</p>
            </a>

            <a
              role="listitem"
              href="/sip-calculator"
              className="tool-tile"
              aria-label="SIP Calculator — Grow your wealth with SIP"
              tabIndex={0}
            >
              <div className="tool-icon-wrap">
                <div className="tool-icon-circle">
                  <Icon name="sip" className="tool-icon-svg" />
                </div>
              </div>
              <h3 className="tool-title">SIP Calculator</h3>
              <p className="tool-desc">Grow your wealth with SIP</p>
            </a>

            <a
              role="listitem"
              href="/fd-calculator"
              className="tool-tile"
              aria-label="FD Calculator — Safe returns with compounding"
              tabIndex={0}
            >
              <div className="tool-icon-wrap">
                <div className="tool-icon-circle">
                  <Icon name="fd" className="tool-icon-svg" />
                </div>
              </div>
              <h3 className="tool-title">FD Calculator</h3>
              <p className="tool-desc">Safe returns with compounding</p>
            </a>

            <a
              role="listitem"
              href="/savings"
              className="tool-tile"
              aria-label="Savings Planner — Build your emergency fund"
              tabIndex={0}
            >
              <div className="tool-icon-wrap">
                <div className="tool-icon-circle">
                  <Icon name="saving" className="tool-icon-svg" />
                </div>
              </div>
              <h3 className="tool-title">Savings Planner</h3>
              <p className="tool-desc">Build your emergency fund</p>
            </a>

            <a
              role="listitem"
              href="/credit-score"
              className="tool-tile"
              aria-label="Credit Score — Check your CIBIL & eligibility"
              tabIndex={0}
            >
              <div className="tool-icon-wrap">
                <div className="tool-icon-circle">
                  <Icon name="creditScore" className="tool-icon-svg" />
                </div>
              </div>
              <h3 className="tool-title">Credit Score</h3>
              <p className="tool-desc">Check your CIBIL & eligibility</p>
            </a>
          </div>
        </section>

        {/* Inline ad to increase RPM between content blocks — SEO friendly placement */}
        <div className="midpage-ad">
          <AdSlot id="home-mid-ad" type="leaderboard" />
        </div>

        {/* Trust Strip — compact */}

        <HeroWithStats
          imageSrc="/images/family.png"
          imageAlt="Parent with child"
          eyebrow="Fincado Trust"
          title="Helping you understand your money with simple tools, transparent insights and smarter financial planning"
          stats={[
            { value: '49', label: 'Years in personal finance' },
            { value: '50+', label: 'In-house financial experts' },
            { value: '200+', label: 'Money tools & calculators' },
          ]}
        />

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
