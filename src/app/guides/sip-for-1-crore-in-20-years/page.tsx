import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import FAQSchema from '@/components/FAQSchema';
import InlineSipCalculator from '@/components/InlineSipCalculator';

// ==========================================
// 1. CONFIGURATION
// ==========================================
const CONFIG = {
  amount: '1 Crore',
  years: '20',
  monthlySIP: '10,009',
  sipNumber: 10009,
  returnRate: '12',

  totalInvested: '24.0 Lakhs',
  wealthGained: '76.0 Lakhs',

  slug: 'sip-for-1-crore-in-20-years',
  heroImage: '/images/guides/mf/mutual-fund-guide-hero.webp',

  difficulty: 'Easy',
  difficultyColor: '#16a34a',

  introText: `Becoming a Crorepati in 20 years is mathematically easy for almost anyone who starts early. With just ~₹10,000 per month, the compounding effect does 75% of the work for you.`,

  scenarioInsight: {
    title: 'Wealth on Autopilot',
    text: `In a 20-year horizon, you only invest ₹24 Lakhs from your pocket to get ₹1 Crore. The remaining ₹76 Lakhs comes purely from market returns. This is the ultimate "Wealth on Autopilot" strategy.`,
  },

  siblingLinks: [
    {
      label: 'Can you invest more? Finish in 10 Years',
      url: '/guides/sip-for-1-crore-in-10-years',
    },
    { label: 'Finish in 15 Years', url: '/guides/sip-for-1-crore-in-15-years' },
  ],
};

// ==========================================
// 2. SEO METADATA
// ==========================================
export const metadata: Metadata = {
  title: `How much SIP is needed for ₹${CONFIG.amount} in ${CONFIG.years} Years? (2025)`,
  description: `Want to build ₹${CONFIG.amount} in ${CONFIG.years} years? See the exact monthly SIP required, expected returns, and the best mutual fund strategy.`,
  keywords: [
    `SIP for ${CONFIG.amount} in ${CONFIG.years} years`,
    'sip calculator',
    'mutual fund returns',
  ],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: `How much SIP for ₹${CONFIG.amount} in ${CONFIG.years} Years?`,
    description: 'Detailed breakdown: Monthly SIP needed and Asset allocation.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    images: [CONFIG.heroImage],
  },
};

export default function GuideTemplate() {
  const pageTitle = `How much SIP is needed for ₹${CONFIG.amount} in ${CONFIG.years} Years?`;

  const faqData = [
    {
      question: `Is ₹${CONFIG.amount} realistic in ${CONFIG.years} years?`,
      answer: `Yes, investing ₹${CONFIG.monthlySIP} monthly at ${CONFIG.returnRate}% returns will help you reach ₹${CONFIG.amount}. It requires discipline.`,
    },
    {
      question: 'What return rate should I expect?',
      answer: `A ${CONFIG.returnRate}% annualized return is a standard, conservative estimate for equity mutual funds over the long term.`,
    },
    {
      question: 'Is SIP safe for this goal?',
      answer:
        'SIP is safer than lump sum investing because it averages out market volatility over time.',
    },
  ];

  return (
    <article className="article guide-body">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: `${CONFIG.amount} in ${CONFIG.years} Years`,
            url: `https://www.fincado.com/guides/${CONFIG.slug}`,
          },
        ]}
      />

      <FAQSchema faqs={faqData} />

      {/* Schema Script Omitted for brevity (Keep yours) */}

      {/* --- HEADER --- */}
      <header
        style={{
          marginBottom: 24,
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: 24,
        }}
      >
        <span className="badge-flagship">Wealth Goal</span>
        <h1
          itemProp="headline"
          style={{
            fontSize: 'clamp(30px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
            color: 'var(--color-text-main)',
          }}
        >
          {pageTitle}
        </h1>
        <div
          style={{
            fontSize: 14,
            color: 'var(--color-text-muted)',
            marginTop: 12,
          }}
        >
          <span>
            Updated: <strong>2025</strong>
          </span>{' '}
          • <span>5 Min Read</span> •{' '}
          <span style={{ color: 'var(--color-brand-green)' }}>
            Calculated @ {CONFIG.returnRate}%
          </span>
        </div>
      </header>

      <ShareTools title={pageTitle} />

      {/* --- HERO IMAGE --- */}
      <div className="guide-image-wrap">
        <Image
          src={CONFIG.heroImage}
          alt="Wealth Goal Illustration"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      {/* --- INTRO --- */}
      <WikiText content={CONFIG.introText} />

      <p className="freshness-note">
        <strong>Updated for 2025:</strong> All calculations use current market
        return assumptions.
      </p>

      {/* --- DIRECT ANSWER BOX --- */}
      <div className="short-answer-box">
        <h3>The Short Answer</h3>
        <p>
          To reach{' '}
          <strong>
            ₹{CONFIG.amount} in {CONFIG.years} Years
          </strong>
          , assuming a {CONFIG.returnRate}% annual return, you need to start a
          monthly SIP of roughly <strong>₹{CONFIG.monthlySIP}</strong>.
        </p>

        {/* ✅ Dynamic Calculator Values */}
        <InlineSipCalculator
          defaultSip={CONFIG.sipNumber}
          defaultYears={parseInt(CONFIG.years)}
          defaultRate={parseFloat(CONFIG.returnRate)}
        />

        <div className="methodology-box">
          <h4>Calculation Logic</h4>
          <p>
            Based on monthly investments compounded monthly at{' '}
            {CONFIG.returnRate}% p.a. for {parseInt(CONFIG.years) * 12} months.
          </p>
        </div>

        <Link
          href="/sip-calculator"
          className="secondary-cta"
          style={{ fontSize: '14px', padding: '10px 20px', marginTop: 16 }}
        >
          Check Your Own Goal →
        </Link>
      </div>

      <AdSlot id="guide-template-1" type="in-article" />

      {/* --- THE MATH --- */}
      <h2 id="math">The Math Behind the Goal</h2>
      <p>Here is the exact breakdown of how your money grows:</p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Target Amount</strong>
              </td>
              <td>₹{CONFIG.amount}</td>
            </tr>
            <tr>
              <td>
                <strong>Time Period</strong>
              </td>
              <td>{CONFIG.years} Years</td>
            </tr>
            <tr>
              <td>
                <strong>Expected Return</strong>
              </td>
              <td style={{ color: 'var(--color-brand-green)' }}>
                {CONFIG.returnRate}%
              </td>
            </tr>
            <tr>
              <td>
                <strong>Monthly SIP</strong>
              </td>
              <td>
                <strong>₹{CONFIG.monthlySIP}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Total Invested</strong>
              </td>
              <td>₹{CONFIG.totalInvested}</td>
            </tr>
            <tr>
              <td>
                <strong>Wealth Gained</strong>
              </td>
              <td>₹{CONFIG.wealthGained}</td>
            </tr>
            <tr>
              <td>
                <strong>Difficulty</strong>
              </td>
              <td style={{ color: CONFIG.difficultyColor, fontWeight: 'bold' }}>
                {CONFIG.difficulty}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ✅ Scenario Insight (Dynamic Rendering) */}
      <div className="callout-box info-box" style={{ marginTop: '32px' }}>
        <h3>💡 {CONFIG.scenarioInsight.title}</h3>
        <WikiText content={CONFIG.scenarioInsight.text} />
      </div>

      {/* --- STRATEGY --- */}
      <h2 id="strategy">Where should you invest?</h2>
      <p>
        For a {CONFIG.years}-year horizon, <strong>Equity Mutual Funds</strong>{' '}
        are the best vehicle.
      </p>

      <div className="strategy-grid">
        <div className="strategy-card">
          <h4>Recommended Portfolio</h4>
          <p style={{ fontSize: '14px', margin: 0 }}>
            <span className="highlight-green">Aim: 12-14% Return</span>
            <br />
            <br />
            • 50% Nifty 50 Index Fund
            <br />
            • 30% Flexi Cap Fund
            <br />• 20% Mid Cap Fund
          </p>
        </div>
      </div>

      <AdSlot id="guide-template-2" type="in-article" />

      {/* ✅ Sibling Links (Dynamic Rendering) */}
      <section className="sibling-links">
        <h3>Can you make this goal easier?</h3>
        <ul>
          {CONFIG.siblingLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* --- CONCLUSION --- */}
      <h2>Conclusion</h2>
      <div className="conclusion-box">
        <p>
          Reaching ₹{CONFIG.amount} is possible with a SIP of ₹
          {CONFIG.monthlySIP}. The key is to start immediately and stay
          consistent.
        </p>
      </div>

      <p className="legal-disclaimer">
        This content is for educational purposes only. Mutual fund investments
        are subject to market risks. Please consult a financial advisor before
        investing.
      </p>

      <AuthorBio />

      <section className="final-cta">
        <div className="final-cta-inner">
          <h2>Calculate Your Own Path</h2>
          <div className="final-cta-row">
            <Link href="/sip-calculator" className="primary-cta">
              Open SIP Calculator
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
