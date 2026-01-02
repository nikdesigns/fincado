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
  salary: '11 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-11-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-11-lakh-salary-hero.webp', // Ensure you create/upload this image
};

// ==========================================
// 2. SEO METADATA
// ==========================================
export const metadata: Metadata = {
  title: 'Tax on ₹11 Lakh Salary (2025): New vs Old Regime + In-Hand Pay',
  description:
    'Earning ₹11 Lakhs? Calculate your exact tax liability for FY 2025-26. We compare New vs Old Regime tax, monthly in-hand salary, and the break-even deductions required.',
  keywords: [
    'Tax on 11 lakh salary',
    '11 LPA in hand salary',
    'tax on 11 lakh new regime',
    'income tax calculator 2025',
    '11 lakh salary tax old vs new',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://www.fincado.com' }],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹11 Lakh Salary: Complete 2025 Guide',
    description:
      'Earning ₹11 Lakhs? See your tax liability for FY 2025-26. We compare New vs Old Regime and calculate your monthly in-hand salary.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax11LakhGuide() {
  const pageTitle =
    'Tax on ₹11 Lakh Salary: New vs Old Tax Regime (FY 2025-26)';

  // ==========================================
  // 3. FAQS
  // ==========================================
  const faqData = [
    {
      question: 'How much tax do I pay on 11 LPA salary?',
      answer:
        'For a ₹11 Lakh salary, your tax under the New Regime (FY 2025-26) is approx ₹55,900. Under the Old Regime, it is significantly higher at ₹1,32,600 (without deductions).',
    },
    {
      question: 'What is the monthly in-hand salary for 11 LPA?',
      answer:
        'After deducting PF (~₹5,500), Professional Tax (₹200), and TDS (~₹4,650), your monthly take-home salary is approximately ₹81,300 under the New Regime.',
    },
    {
      question: 'Which tax regime is better for 11 Lakh package?',
      answer:
        'The New Tax Regime is better unless you have deductions (HRA, 80C, 80D, Home Loan) exceeding ₹4.00 Lakhs. If your total investments are lower than this, stick to the New Regime.',
    },
  ];

  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 11 Lakh Salary',
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
          • <span>7 Min Read</span>
        </div>
      </header>

      <ShareTools title={pageTitle} />

      <div className="guide-image-wrap">
        <Image
          src={CONFIG.heroImage}
          alt="11 Lakh Salary Tax Calculation FY 2025-26"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      <WikiText
        content={`Earning <strong>₹11 Lakhs (11 LPA)</strong> places you firmly in the mid-senior income bracket. Under the <strong>New Tax Regime (FY 2025-26)</strong>, your income now crosses into the 15% tax slab for the amount exceeding ₹10 Lakhs. However, despite this jump, the New Regime remains highly attractive compared to the Old Regime.`}
      />

      <div className="freshness-note">
        <strong>Status:</strong> Updated for Budget 2025-26
      </div>

      {/* --- VERDICT BOX --- */}
      <div className="short-answer-box">
        <h3>⚡ Quick Verdict</h3>
        <p>
          For a <strong>₹11 Lakh salary</strong>, the{' '}
          <strong>New Tax Regime</strong> is the clear winner for most
          employees. Your tax liability will be approximately{' '}
          <strong>₹55,900</strong>.
        </p>
        <p>
          The <strong>Old Tax Regime</strong> is very expensive, demanding a tax
          of <strong>₹1,32,600</strong> unless you can claim deductions
          exceeding <strong>₹4.00 Lakhs</strong>.
        </p>

        <p>
          You can use our <strong>₹11 lakh salary tax calculator</strong> below
          to check your specific numbers.
        </p>

        <InlineTaxCalculator defaultSalary={1100000} />
      </div>

      <AdSlot id="tax-11l-1" type="in-article" />

      {/* --- TAKE HOME --- */}
      <h2 id="take-home-salary">₹11 Lakh Salary – Monthly In-Hand Breakdown</h2>
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
                <strong>₹91,666</strong>
              </td>
              <td>
                <strong>₹91,666</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF (Est.)</td>
              <td style={{ color: '#dc2626' }}>- ₹5,500</td>
              <td style={{ color: '#dc2626' }}>- ₹5,500</td>
            </tr>
            <tr>
              <td>Less: Prof Tax</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
            </tr>
            <tr>
              <td>Less: TDS</td>
              <td style={{ color: '#dc2626' }}>- ₹4,658</td>
              <td style={{ color: '#dc2626' }}>- ₹11,050</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹81,308</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹74,916</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="caption-text" style={{ marginTop: '8px' }}>
        PF is assumed at 12% of Basic Salary (Basic assumed as 50% of CTC).
      </p>

      {/* --- SALARY FLOW --- */}
      <h2 id="salary-flow">Where Does Your ₹11,00,000 Go?</h2>
      <div className="strategy-grid">
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>💰 In Your Pocket (88.9%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹9.78 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Disposable income.</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #ea580c' }}
        >
          <h4 style={{ color: '#ea580c' }}>🏛️ Income Tax (5.1%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.56 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Tax paid (New Regime).</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #3b82f6' }}
        >
          <h4 style={{ color: '#3b82f6' }}>🏦 Retirals / PF (6.0%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹0.66 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Compulsory savings.</p>
        </div>
      </div>

      {/* --- CALCULATION --- */}
      <h2 id="new-regime">Tax Calculation (New Regime)</h2>
      <p>Standard Deduction: ₹75,000. Taxable Income: ₹10,25,000.</p>
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
              <td>10L - 10.25L</td>
              <td>15%</td>
              <td>₹3,750</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td>Total + Cess(4%)</td>
              <td></td>
              <td>₹55,900</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- BREAK EVEN --- */}
      <h2 id="break-even">Break-Even Point: ₹4.00 Lakhs</h2>
      <div className="callout-box info-box">
        <p>
          To benefit from the Old Regime, you need to claim total deductions
          greater than <strong>₹4,00,000</strong>.
        </p>
        <p>
          This is a high target. It usually requires 80C (₹1.5L) + 80D (₹25k) +
          a substantial Home Loan Interest or HRA claim of at least ₹2.25 Lakhs.
        </p>
      </div>

      {/* --- CONCLUSION --- */}
      <div className="conclusion-box">
        <p>
          For a ₹11 Lakh salary, the <strong>New Tax Regime</strong> is
          efficient and simple. It saves you nearly ₹76,000 compared to the Old
          Regime if you have no deductions. Switch to Old Regime only if you
          have heavy home loan interest or HRA.
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
            <Link href="/guides/tax-on-10-lakh-salary">
              Check Tax for ₹10 Lakhs
            </Link>
          </li>
          <li>
            <Link href="/guides/tax-on-12-lakh-salary">
              Check Tax for ₹12 Lakhs
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
