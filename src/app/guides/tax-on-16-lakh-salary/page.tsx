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
  salary: '16 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-16-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-16-lakh-salary-hero.webp',
};

// ==========================================
// 2. SEO METADATA
// ==========================================
export const metadata: Metadata = {
  title: 'Tax on ₹16 Lakh Salary (2025): New vs Old Regime + In-Hand Pay',
  description:
    'Earning ₹16 Lakhs? Calculate your exact tax liability for FY 2025-26. Compare New vs Old Regime tax, monthly in-hand salary, and break-even deductions.',
  keywords: [
    'Tax on 16 lakh salary',
    '16 LPA in hand salary',
    'tax on 16 lakh new regime',
    'income tax calculator 2025',
    '16 lakh salary tax old vs new',
  ],
  authors: [{ name: 'Fincado Team', url: 'https://www.fincado.com' }],
  alternates: {
    canonical: `https://www.fincado.com/guides/${CONFIG.slug}`,
  },
  openGraph: {
    title: 'Tax on ₹16 Lakh Salary: Complete 2025 Guide',
    description:
      'Earning ₹16 Lakhs? See your tax liability for FY 2025-26. We compare New vs Old Regime and calculate your monthly in-hand salary.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    authors: ['Fincado Team'],
    images: [CONFIG.heroImage],
  },
};

export default function Tax16LakhGuide() {
  const pageTitle =
    'Tax on ₹16 Lakh Salary: New vs Old Tax Regime (FY 2025-26)';

  // ==========================================
  // 3. FAQS
  // ==========================================
  const faqData = [
    {
      question: 'How much tax do I pay on 16 LPA salary?',
      answer:
        'For a ₹16 Lakh salary, your tax under the New Regime (FY 2025-26) is approx ₹1,13,100. Under the Old Regime, it is significantly higher at ₹2,88,600 (inclusive of cess and standard deduction).',
    },
    {
      question: 'What is the monthly in-hand salary for 16 LPA?',
      answer:
        'After deducting statutory capped PF (₹1,800), Professional Tax (₹200), and TDS (~₹9,425), your monthly take-home salary is approximately ₹1,21,900 under the New Regime.',
    },
    {
      question: 'Which tax regime is better for 16 Lakh package?',
      answer:
        'The New Tax Regime is generally better unless you have total deductions (HRA, 80C, 80D, Home Loan) exceeding ₹5.00 Lakhs. Most employees save ~₹1.75 Lakhs by choosing the New Regime.',
    },
  ];

  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 16 Lakh Salary',
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
          alt="16 Lakh Salary Tax Calculation FY 2025-26"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>
      <WikiText
        content={`Earning <strong>₹16 Lakhs (16 LPA)</strong> is a significant milestone. Under the <strong>New Tax Regime (FY 2025-26)</strong>, your taxable income (after standard deduction) falls within the <strong>15% tax slab</strong>. The 20% slab strictly applies only to income exceeding ₹16 Lakhs. This structure makes the New Regime far more efficient than the Old Regime, which levies a flat 30% tax on income above ₹10 Lakhs.`}
      />
      <div className="freshness-note">
        <strong>Status:</strong> Updated for Budget 2025-26
      </div>
      {/* --- VERDICT BOX --- */}
      <div className="short-answer-box">
        <h3>⚡ Quick Verdict</h3>
        <p>
          For a <strong>₹16 Lakh salary</strong>, the{' '}
          <strong>New Tax Regime</strong> is the more tax-efficient option. Your
          total tax will be approx <strong>₹1,13,100</strong>.
        </p>
        <p>
          The <strong>Old Tax Regime</strong> results in a much higher liability
          of
          <strong> ₹2,88,600</strong>. Choosing the New Regime saves you roughly{' '}
          <strong>₹1.75 Lakhs</strong> unless you have massive deductions.
        </p>

        <p>
          Use our <strong>₹16 lakh salary tax calculator</strong> below to
          customize these numbers.
        </p>

        <InlineTaxCalculator defaultSalary={1600000} />
      </div>
      <AdSlot id="tax-16l-1" type="in-article" />
      {/* --- TAKE HOME --- */}
      <h2 id="take-home-salary">₹16 Lakh Salary – Monthly In-Hand Breakdown</h2>
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
                <strong>₹1,33,333</strong>
              </td>
              <td>
                <strong>₹1,33,333</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF (Statutory Cap)</td>
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
              <td style={{ color: '#dc2626' }}>- ₹9,425</td>
              <td style={{ color: '#dc2626' }}>- ₹24,050</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹1,21,908</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹1,07,283</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="caption-text" style={{ marginTop: '8px' }}>
        <strong>Note:</strong> PF is calculated at the statutory cap of
        ₹1,800/month (₹21,600/year). If you opt for voluntary higher PF (12% of
        basic), your in-hand salary will decrease, but tax benefits (Old Regime)
        may increase.
      </p>
      {/* --- SALARY FLOW --- */}
      <h2 id="salary-flow">Where Does Your ₹16,00,000 Go?</h2>
      <div className="strategy-grid">
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>💰 In Your Pocket (91.4%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹14.62 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Disposable income.</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #ea580c' }}
        >
          <h4 style={{ color: '#ea580c' }}>🏛️ Income Tax (7.1%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹1.13 Lakhs
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>Tax paid (New Regime).</p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #3b82f6' }}
        >
          <h4 style={{ color: '#3b82f6' }}>🏦 Retirals / PF (1.5%)</h4>
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
      <p>
        Standard Deduction: ₹75,000. Taxable Income: ₹15,25,000.
        <br />
        <strong>Note:</strong> The 15% slab ends at ₹16 Lakhs, so your entire
        taxable income falls within the 15% bracket or lower.
      </p>
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
              <td>0 - 4L</td>
              <td>Nil</td>
              <td>0</td>
            </tr>
            <tr>
              <td>4L - 8L</td>
              <td>5%</td>
              <td>₹20,000</td>
            </tr>
            <tr>
              <td>8L - 12L</td>
              <td>10%</td>
              <td>₹40,000</td>
            </tr>
            <tr>
              <td>12L - 15.25L</td>
              <td>15%</td>
              <td>₹48,750</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td>Total + Cess(4%)</td>
              <td></td>
              <td>₹1,13,100</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* --- BREAK EVEN --- */}
      <h2 id="break-even">Break-Even Point: ₹5.00 Lakhs</h2>
      <div className="callout-box info-box">
        <p>
          To make the Old Regime beneficial, you need{' '}
          <strong>total deductions</strong> exceeding approximately{' '}
          <strong>₹5,00,000</strong>.
        </p>
        <p>
          Since Section 80C is capped at ₹1.5L, you would need significant
          additional claims to reach this target, such as:
          <br />✅ <strong>80D:</strong> Health Insurance (₹25k-₹50k)
          <br />✅ <strong>NPS (80CCD):</strong> ₹50,000
          <br />✅ <strong>HRA or Home Loan Interest:</strong> Approx ₹2.5 -
          ₹3.0 Lakhs
        </p>
      </div>
      {/* Break-even visualization can be added here */}
      {/* --- CONCLUSION --- */}
      <div className="conclusion-box">
        <p>
          For a ₹16 Lakh salary, the <strong>New Tax Regime</strong> is
          generally the more efficient choice. It keeps your tax liability low
          (~7%) and saves you nearly ₹1.75 Lakhs compared to the Old Regime
          unless you have very high HRA or Home Loan claims.
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
        resident individuals below 60 years. Old Regime tax calculation includes
        Standard Deduction of ₹50,000 and 4% Cess.
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
            <Link href="/guides/tax-on-18-lakh-salary">
              Check Tax for ₹18 Lakhs
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
