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
import InlineTaxCalculator from '@/components/InlineTaxCalculator';

// ==========================================
// 1. CONFIGURATION
// ==========================================
const CONFIG = {
  salary: '30 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-30-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-30-lakh-salary-hero.webp',
};

// ==========================================
// 2. SEO METADATA
// ==========================================
export const metadata: Metadata = {
  title: 'Tax on ₹30 Lakh Salary (2025): New vs Old Regime + In-Hand Pay',
  description:
    'Earning ₹30 Lakhs? Calculate your tax liability for FY 2025-26. Compare New vs Old Regime, check monthly in-hand salary, and tax saving options.',
  keywords: [
    'Tax on 30 lakh salary',
    '30 LPA in hand salary',
    'tax on 30 lakh new regime',
    'income tax calculator 2025',
    'how to save tax on 30 lakh salary',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://www.fincado.com' }],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹30 Lakh Salary: Complete 2025 Guide',
    description:
      'Earning ₹30 Lakhs? See your tax liability for FY 2025-26. We compare New vs Old Regime and calculate your monthly in-hand salary.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax30LakhGuide() {
  const pageTitle =
    'Tax on ₹30 Lakh Salary: New vs Old Tax Regime (FY 2025-26)';

  // ==========================================
  // 3. FAQS
  // ==========================================
  const faqData = [
    {
      question: 'How much tax do I pay on 30 LPA salary?',
      answer:
        'For a ₹30 Lakh salary, your tax under the New Regime (FY 2025-26) is approx ₹5,90,200. Under the Old Regime, it is significantly higher at ₹7,25,400 (without deductions).',
    },
    {
      question: 'What is the monthly in-hand salary for 30 LPA?',
      answer:
        'After deducting Capped PF (₹1,800), Professional Tax (₹200), and TDS (~₹49,183), your monthly take-home salary is approximately ₹1,98,800 under the New Regime.',
    },
    {
      question: 'Which tax regime is better for 30 Lakh package?',
      answer:
        'The New Tax Regime is better unless you have total deductions (HRA, 80C, 80D, Home Loan) exceeding ₹5.00 Lakhs. Most high-income earners find the New Regime more efficient.',
    },
    {
      question: 'Is ₹30 lakh salary considered high income in India?',
      answer:
        'Yes. A ₹30 Lakh salary places you among the top ~1% of income earners in India, making tax efficiency and regime selection especially important.',
    },
  ];

  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 30 Lakh Salary',
            url: `https://www.fincado.com/guides/${CONFIG.slug}`,
          },
        ]}
      />

      <FAQSchema faqs={faqData} />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: pageTitle,
            image: [CONFIG.heroImage],
            inLanguage: 'en-IN',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://www.fincado.com/guides/${CONFIG.slug}`,
            },
            author: {
              '@type': 'Person',
              name: 'Fincado Research Team',
              url: 'https://www.fincado.com/about',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-02-15',
            dateModified: '2025-02-15',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header
        style={{
          marginBottom: 24,
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: 24,
        }}
      >
        <span className="badge-flagship">Income Tax Guide</span>
        <h1
          itemProp="headline"
          style={{
            fontSize: 'clamp(24px, 4vw, 34px)',
            marginTop: 16,
            lineHeight: 1.3,
            color: 'var(--color-text-main)',
            letterSpacing: '-0.02em',
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
            Updated: <strong>FY 2025-26</strong>
          </span>{' '}
          • <span>8 Min Read</span>
        </div>
      </header>

      <ShareTools title={pageTitle} />

      <div className="guide-image-wrap">
        <Image
          src={CONFIG.heroImage}
          alt="30 Lakh Salary Tax Calculation FY 2025-26"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      <WikiText
        content={`Earning <strong>₹30 Lakhs (30 LPA)</strong> places you in the high-income bracket where tax planning becomes critical. Under the <strong>New Tax Regime (FY 2025-26)</strong>, roughly 50% of your income falls into the 30% slab, yet the streamlined structure often results in lower tax outflow compared to the Old Regime.`}
      />

      <div className="freshness-note">
        <strong>Status:</strong> Updated for Budget 2025-26
      </div>

      {/* --- VERDICT BOX --- */}
      <div className="short-answer-box">
        <h3>⚡ Quick Verdict</h3>
        <p>
          For a <strong>₹30 Lakh salary</strong>, the{' '}
          <strong>New Tax Regime</strong> is generally the winner. Your total
          tax will be approx <strong>₹5,90,200</strong>.
        </p>
        <p>
          The <strong>Old Tax Regime</strong> is expensive, demanding
          <strong> ₹7,25,400</strong> in tax. Choosing the New Regime saves you
          roughly <strong>₹1.35 Lakhs</strong>.
        </p>

        <p>
          Use our <strong>₹30 lakh salary tax calculator</strong> below to
          customize these numbers.
        </p>

        <InlineTaxCalculator defaultSalary={3000000} />
      </div>

      <AdSlot id="tax-30l-1" type="in-article" />

      {/* --- TAKE HOME --- */}
      <h2 id="take-home-salary">₹30 Lakh Salary – Monthly In-Hand Breakdown</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>New Regime</th>
              <th>Old Regime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Gross Salary</strong>
              </td>
              <td>
                <strong>₹2,50,000</strong>
              </td>
              <td>
                <strong>₹2,50,000</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF (Capped Limit)</td>
              <td style={{ color: '#dc2626' }}>- ₹1,800</td>
              <td style={{ color: '#dc2626' }}>- ₹1,800</td>
            </tr>
            <tr>
              <td>Less: Prof Tax</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
            </tr>
            <tr>
              <td>Less: TDS</td>
              <td style={{ color: '#dc2626' }}>- ₹49,183</td>
              <td style={{ color: '#dc2626' }}>- ₹60,450</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹1,98,817</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹1,87,550</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* High-Income Disclaimer (EEAT BOOST) */}
      <p className="caption-text" style={{ marginTop: '8px' }}>
        <strong>Note:</strong> PF is capped at the statutory limit of
        ₹1,800/month. Calculations assume a salaried resident individual below
        60 years. Actual take-home may vary based on your specific
        employer&apos;s PF policy and allowances.
      </p>

      {/* --- SALARY FLOW --- */}
      <h2 id="salary-flow">Where Does Your ₹30,00,000 Go?</h2>
      <div className="strategy-grid">
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>💰 In Your Pocket (79.5%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹23.85 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Disposable income.</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #ea580c' }}
        >
          <h4 style={{ color: '#ea580c' }}>🏛️ Income Tax (19.7%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹5.90 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Tax paid (New Regime).</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #3b82f6' }}
        >
          <h4 style={{ color: '#3b82f6' }}>🏦 Retirals / PF (0.8%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.24 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>
            Compulsory savings (Capped).
          </p>
        </div>
      </div>

      {/* --- CALCULATION --- */}
      <h2 id="new-regime">Tax Calculation (New Regime)</h2>
      <p>Standard Deduction: ₹75,000. Taxable Income: ₹29,25,000.</p>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Slab</th>
              <th>Rate</th>
              <th>Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0 - 3L</td>
              <td>Nil</td>
              <td>0</td>
            </tr>
            <tr>
              <td>3L - 7L</td>
              <td>5%</td>
              <td>₹20,000</td>
            </tr>
            <tr>
              <td>7L - 10L</td>
              <td>10%</td>
              <td>₹30,000</td>
            </tr>
            <tr>
              <td>10L - 12L</td>
              <td>15%</td>
              <td>₹30,000</td>
            </tr>
            <tr>
              <td>12L - 15L</td>
              <td>20%</td>
              <td>₹60,000</td>
            </tr>
            <tr>
              <td>15L - 29.25L</td>
              <td>30%</td>
              <td>₹4,27,500</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td>Total + Cess(4%)</td>
              <td></td>
              <td>₹5,90,200</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- BREAK EVEN --- */}
      <h2 id="break-even">Break-Even Point: ₹5.00 Lakhs</h2>
      <div className="callout-box info-box">
        <p>
          To benefit from the Old Regime, you need{' '}
          <strong>total deductions</strong> exceeding <strong>₹5,00,000</strong>
          .
        </p>
        <p>
          Since 80C is capped at ₹1.5L, you would need substantial HRA or Home
          Loan Interest claims (approx ₹3.5 Lakhs) to bridge this gap.
        </p>
      </div>

      {/* --- CONCLUSION --- */}
      <div className="conclusion-box">
        <p>
          For a ₹30 Lakh salary, the <strong>New Tax Regime</strong> remains the
          default winner. It keeps your tax liability under ₹6 Lakhs and
          maximizes your monthly cash flow.
        </p>
      </div>

      <p
        style={{
          fontSize: '13px',
          color: '#64748b',
          fontStyle: 'italic',
          marginTop: '16px',
        }}
      >
        Calculations are based on income tax slabs for FY 2025-26 applicable to
        resident individuals below 60 years.
      </p>

      <AuthorBio />

      {/* --- LINKS --- */}
      <section className="sibling-links">
        <h3>Useful Tools & Guides</h3>
        <ul>
          <li>
            <Link href="/guides/tax-on-20-lakh-salary">
              Check Tax for ₹20 Lakhs
            </Link>
          </li>
          <li>
            <Link href="/guides/tax-on-25-lakh-salary">
              Check Tax for ₹25 Lakhs
            </Link>
          </li>
          <li>
            <Link href="/guides/new-vs-old-tax-regime-2025">
              New vs Old Tax Regime Explained (2025)
            </Link>
          </li>
        </ul>
      </section>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions</h2>
      <div className="faqs-accordion">
        {faqData.map((faq, index) => (
          <details key={index}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </article>
  );
}
