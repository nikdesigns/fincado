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
  salary: '18 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-18-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-18-lakh-salary-hero.webp',
};

// ==========================================
// 2. SEO METADATA
// ==========================================
export const metadata: Metadata = {
  title: 'Tax on ₹18 Lakh Salary (2025): New vs Old Regime + In-Hand Pay',
  description:
    'Earning ₹18 Lakhs? Calculate your tax for FY 2025-26. Compare New vs Old Regime, check monthly in-hand salary, and break-even deductions.',
  keywords: [
    'Tax on 18 lakh salary',
    '18 LPA in hand salary',
    'tax on 18 lakh new regime',
    'income tax calculator 2025',
    '18 lakh salary tax old vs new',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://www.fincado.com' }],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹18 Lakh Salary: Complete 2025 Guide',
    description:
      'Earning ₹18 Lakhs? See your tax liability for FY 2025-26. We compare New vs Old Regime and calculate your monthly in-hand salary.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax18LakhGuide() {
  const pageTitle =
    'Tax on ₹18 Lakh Salary: New vs Old Tax Regime (FY 2025-26)';

  // ==========================================
  // 3. FAQS
  // ==========================================
  const faqData = [
    {
      question: 'How much tax do I pay on 18 LPA salary?',
      answer:
        'For a ₹18 Lakh salary, your tax under the New Regime (FY 2025-26) is approx ₹2,15,800. Under the Old Regime, it is significantly higher at ₹3,51,000 (without deductions).',
    },
    {
      question: 'What is the monthly in-hand salary for 18 LPA?',
      answer:
        'After deducting PF (~₹9,000), Professional Tax (₹200), and TDS (~₹17,983), your monthly take-home salary is approximately ₹1,22,800 under the New Regime.',
    },
    {
      question: 'Which tax regime is better for 18 Lakh package?',
      answer:
        'The New Tax Regime is better unless you have total deductions (HRA, 80C, 80D, Home Loan) exceeding ₹4.85 Lakhs. Most employees save ~₹1.35 Lakhs by choosing the New Regime.',
    },
  ];

  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 18 Lakh Salary',
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
          alt="18 Lakh Salary Tax Calculation FY 2025-26"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      <WikiText
        content={`Earning <strong>₹18 Lakhs (18 LPA)</strong> puts you in the higher tax bracket. With the <strong>New Tax Regime (FY 2025-26)</strong>, income above ₹15 Lakhs is taxed at 30%. However, the slab structure still offers significant relief compared to the Old Regime, which applies the 30% rate on everything above ₹10 Lakhs.`}
      />

      <div className="freshness-note">
        <strong>Status:</strong> Updated for Budget 2025-26
      </div>

      {/* --- VERDICT BOX --- */}
      <div className="short-answer-box">
        <h3>⚡ Quick Verdict</h3>
        <p>
          For a <strong>₹18 Lakh salary</strong>, the{' '}
          <strong>New Tax Regime</strong> is the clear winner. Your total tax
          will be approx <strong>₹2,15,800</strong>.
        </p>
        <p>
          The <strong>Old Tax Regime</strong> is very expensive, demanding
          <strong> ₹3,51,000</strong> in tax. Choosing the New Regime saves you
          roughly <strong>₹1.35 Lakhs</strong>.
        </p>

        <p>
          Use our <strong>₹18 lakh salary tax calculator</strong> below to
          customize these numbers.
        </p>

        <InlineTaxCalculator defaultSalary={1800000} />
      </div>

      <AdSlot id="tax-18l-1" type="in-article" />

      {/* --- TAKE HOME --- */}
      <h2 id="take-home-salary">₹18 Lakh Salary – Monthly In-Hand Breakdown</h2>
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
                <strong>₹1,50,000</strong>
              </td>
              <td>
                <strong>₹1,50,000</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF (Est.)</td>
              <td style={{ color: '#dc2626' }}>- ₹9,000</td>
              <td style={{ color: '#dc2626' }}>- ₹9,000</td>
            </tr>
            <tr>
              <td>Less: Prof Tax</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
            </tr>
            <tr>
              <td>Less: TDS</td>
              <td style={{ color: '#dc2626' }}>- ₹17,983</td>
              <td style={{ color: '#dc2626' }}>- ₹29,250</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹1,22,817</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹1,11,550</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="caption-text" style={{ marginTop: '8px' }}>
        PF is assumed at 12% of Basic Salary (Basic assumed as 50% of CTC).
      </p>

      {/* --- SALARY FLOW --- */}
      <h2 id="salary-flow">Where Does Your ₹18,00,000 Go?</h2>
      <div className="strategy-grid">
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>💰 In Your Pocket (81.9%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹14.73 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Disposable income.</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #ea580c' }}
        >
          <h4 style={{ color: '#ea580c' }}>🏛️ Income Tax (12%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹2.16 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Tax paid (New Regime).</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #3b82f6' }}
        >
          <h4 style={{ color: '#3b82f6' }}>🏦 Retirals / PF (6.0%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹1.08 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Compulsory savings.</p>
        </div>
      </div>

      {/* --- CALCULATION --- */}
      <h2 id="new-regime">Tax Calculation (New Regime)</h2>
      <p>Standard Deduction: ₹75,000. Taxable Income: ₹17,25,000.</p>
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
              <td>15L - 17.25L</td>
              <td>30%</td>
              <td>₹67,500</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td>Total + Cess(4%)</td>
              <td></td>
              <td>₹2,15,800</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- BREAK EVEN --- */}
      <h2 id="break-even">Break-Even Point: ₹4.85 Lakhs</h2>
      <div className="callout-box info-box">
        <p>
          To benefit from the Old Regime, you need{' '}
          <strong>total deductions</strong> exceeding <strong>₹4,85,000</strong>
          .
        </p>
        <p>
          Achieving this usually requires maxing out 80C, 80D, and having a Home
          Loan Interest claim of ₹2 Lakhs plus HRA.
        </p>
      </div>

      {/* --- CONCLUSION --- */}
      <div className="conclusion-box">
        <p>
          For a ₹18 Lakh salary, the <strong>New Tax Regime</strong> is the most
          efficient option. It saves you ~₹1.35 Lakhs compared to the Old Regime
          without needing any investment proofs.
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
            <Link href="/guides/tax-on-15-lakh-salary">
              Check Tax for ₹15 Lakhs
            </Link>
          </li>
          <li>
            <Link href="/guides/tax-on-20-lakh-salary">
              Check Tax for ₹20 Lakhs
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
