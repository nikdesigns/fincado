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

const CONFIG = {
  salary: '25 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-25-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-25-lakh-salary-hero.webp', // Placeholder
};

export const metadata: Metadata = {
  title:
    'Tax on ₹25 Lakh Salary (2025): You Lose ₹4.18L in Tax – Full Breakdown',
  description:
    'Earning ₹25 Lakhs? See your tax liability for FY 2025-26. Compare New vs Old Regime, check monthly in-hand salary, and tax saving options.',
  keywords: [
    'Tax on 25 lakh salary',
    '25 LPA in hand salary',
    'tax on 25 lakh new regime',
    'how to save tax on 25 lakh salary',
    'income tax calculator 2025',
  ],
  alternates: { canonical: `https://www.fincado.com/guides/${CONFIG.slug}` },
  openGraph: {
    title:
      'Tax on ₹25 Lakh Salary (2025): You Lose ₹4.18L in Tax – Full Breakdown',
    description:
      'Detailed breakdown of tax liability and monthly take-home pay for ₹25 LPA.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    images: [CONFIG.heroImage],
  },
};

export default function Tax25LakhGuide() {
  const pageTitle =
    'Tax on ₹25 Lakh Salary (2025): You Lose ₹4.18L in Tax – Full Breakdown';

  const faqData = [
    {
      question: 'How much tax on 25 LPA salary?',
      answer:
        'For a ₹25 Lakh salary, you pay approx ₹4,18,600 under the New Tax Regime (FY 2025-26). Under the Old Regime, the tax is significantly higher at ₹5,69,400 unless you have major deductions.',
    },
    {
      question: 'What is the monthly in-hand salary for 25 LPA?',
      answer:
        'After deducting PF (~₹12,500) and Tax (~₹34,883), your approximate monthly in-hand salary for 25 LPA is around ₹1.60 Lakhs.',
    },
    {
      question: 'Which regime is better for 25 Lakh package?',
      answer:
        'The New Tax Regime is generally better. To make the Old Regime beneficial, you need total deductions (HRA, 80C, Home Loan) exceeding ₹5.58 Lakhs.',
    },
    {
      question: 'Is ₹25 Lakh salary considered high income in India?',
      answer:
        'Yes. A ₹25 LPA salary places you in roughly the top 1–2% of Indian earners. Tax planning becomes critical as a large portion of income falls under the 30% slab.',
    },
  ];

  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 25 Lakh Salary',
            url: `https://www.fincado.com/guides/${CONFIG.slug}`,
          },
        ]}
      />
      <FAQSchema faqs={faqData} />

      {/* HEADER */}
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
            Updated: <strong>FY 2025-26</strong>
          </span>{' '}
          • <span>9 Min Read</span>
        </div>
      </header>
      <ShareTools title={pageTitle} />

      <div className="guide-image-wrap">
        <Image
          src={CONFIG.heroImage}
          alt="Tax on 25 Lakh Salary Graph"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      <WikiText
        content={`Earning <strong>₹25 Lakhs (25 LPA)</strong> puts you in the top tier of Indian income earners. However, a significant portion of your income falls into the highest <strong>30% tax bracket</strong>. For <strong>FY 2025-26</strong>, smart tax planning is crucial to minimize this outflow.`}
      />

      <div className="freshness-note">
        <strong>Status:</strong> Updated for Budget 2025-26
      </div>

      {/* VERDICT BOX */}
      <div className="short-answer-box">
        <h3>⚡ Quick Verdict</h3>
        <p>
          For a <strong>₹25 Lakh salary</strong>, the{' '}
          <strong>New Tax Regime</strong> is generally the winner. Your total
          tax will be approx <strong>₹4.18 Lakhs</strong>.
        </p>
        <p
          style={{
            fontSize: '15px',
            fontStyle: 'italic',
            color: '#475569',
            margin: '0 0 16px 0',
          }}
        >
          If you earn ₹25 lakh per year, your take-home salary is roughly ₹1.60
          Lakhs per month under the New Tax Regime.
        </p>
        <p>
          The <strong>Old Regime</strong> is expensive (Tax: ₹5.69 Lakhs) unless
          you claim total deductions exceeding <strong>₹5.58 Lakhs</strong>.
        </p>
        <InlineTaxCalculator defaultSalary={2500000} />
      </div>

      <AdSlot id="tax-25l-1" type="in-article" />

      {/* TAKE HOME */}
      <h2 id="take-home-salary">₹25 Lakh Salary – Monthly In-Hand Breakdown</h2>
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
                <strong>₹2,08,333</strong>
              </td>
              <td>
                <strong>₹2,08,333</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF (Est.)</td>
              <td style={{ color: '#dc2626' }}>- ₹12,500</td>
              <td style={{ color: '#dc2626' }}>- ₹12,500</td>
            </tr>
            <tr>
              <td>Less: Prof Tax</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
            </tr>
            <tr>
              <td>Less: TDS</td>
              <td style={{ color: '#dc2626' }}>- ₹34,883</td>
              <td style={{ color: '#dc2626' }}>- ₹47,450</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹1,60,750</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹1,48,183</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* VISUAL FLOW */}
      <h2 id="salary-flow">Where Does Your ₹25,00,000 Go?</h2>
      <div className="strategy-grid">
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #16a34a' }}
        >
          <h4 style={{ color: '#16a34a' }}>💰 In Your Pocket (77.3%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹19.31 Lakhs
          </p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #ea580c' }}
        >
          <h4 style={{ color: '#ea580c' }}>🏛️ Income Tax (16.7%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹4.18 Lakhs
          </p>
        </div>
        <div
          className="strategy-card"
          style={{ borderTop: '4px solid #3b82f6' }}
        >
          <h4 style={{ color: '#3b82f6' }}>🏦 Retirement / PF (6.0%)</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
            ₹1.50 Lakhs
          </p>
        </div>
      </div>

      {/* CALCULATION */}
      <h2 id="new-regime">Tax Calculation (New Regime)</h2>
      <p>Standard Deduction: ₹75,000. Taxable Income: ₹24,25,000.</p>
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
              <td>₹45,000</td>
            </tr>
            <tr>
              <td>15L - 24.25L</td>
              <td>30%</td>
              <td>₹2,77,500</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td>Total + Cess(4%)</td>
              <td></td>
              <td>₹4,18,600</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* BREAK EVEN */}
      <h2 id="break-even">Break-Even Point: ₹5.58 Lakhs</h2>
      <div className="callout-box info-box">
        <p>
          To beat the New Regime, you need Old Regime deductions {'>'}
          <strong>₹5,58,000</strong>.
        </p>
        <p>
          This is hard to achieve without a large Home Loan Interest claim (₹2L)
          + 80C (₹1.5L) + HRA.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          This includes ₹50,000 standard deduction + deductions like HRA, 80C,
          NPS, and Home Loan interest under the Old Regime.
        </p>
      </div>

      <AuthorBio />

      {/* INTERNAL LINKS */}
      <section className="sibling-links">
        <h3>Useful Tools & Guides</h3>
        <ul>
          <li>
            <Link href="/guides/tax-on-20-lakh-salary">
              Check Tax for ₹20 Lakhs
            </Link>
          </li>
          <li>
            <Link href="/rd-calculator">RD Calculator</Link>
          </li>
          <li>
            <Link href="/sip-calculator">SIP Calculator</Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
