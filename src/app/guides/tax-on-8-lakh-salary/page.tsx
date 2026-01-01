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
  salary: '8 Lakhs',
  year: 'FY 2025-26',
  slug: 'tax-on-8-lakh-salary',
  heroImage: '/images/guides/tax/tax-on-8-lakh-salary-hero.webp',
};

export const metadata: Metadata = {
  title: 'Tax on ₹8 Lakh Salary (2025): The ₹7 Lakh Tax-Free Trap Explained',
  description:
    'Earning ₹8 Lakhs? Crossing the ₹7 Lakh limit removes the 87A rebate. See New vs Old tax, in-hand salary, and how to avoid losing ₹23,400.',
  keywords: [
    'Tax on 8 lakh salary',
    '8 LPA in hand salary',
    'tax on 8 lakh in new regime',
    'marginal relief on 8 lakh salary',
    'income tax calculator 2025',
  ],
  alternates: { canonical: `https://www.fincado.com/guides/${CONFIG.slug}` },
  openGraph: {
    title: 'Tax on ₹8 Lakh Salary (2025): The ₹7 Lakh Tax-Free Trap Explained',
    description:
      'Earning ₹8 Lakhs? Crossing the ₹7 Lakh limit removes the 87A rebate. See New vs Old tax, in-hand salary, and how to avoid losing ₹23,400.',
    url: `https://www.fincado.com/guides/${CONFIG.slug}`,
    type: 'article',
    images: [CONFIG.heroImage],
  },
};

export default function Tax8LakhGuide() {
  const pageTitle =
    'Tax on ₹8 Lakh Salary (2025): The ₹7 Lakh Tax-Free Trap Explained';

  const faqData = [
    {
      question: 'Is ₹8 lakh salary tax-free?',
      answer:
        'No. While income up to ₹7.75 Lakhs (Gross) is tax-free under the New Regime, earning ₹8 Lakhs attracts a tax of approx ₹23,400.',
    },
    {
      question: 'How much tax on 8 LPA under New Regime?',
      answer:
        'For ₹8 Lakhs, your taxable income is ₹7.25 Lakhs (after ₹75k std deduction). The tax payable is ₹23,400 (including cess).',
    },
    {
      question: 'What is the monthly in-hand salary for 8 LPA?',
      answer:
        'After deducting PF (~₹3,600) and Tax (~₹1,950), your monthly take-home is roughly ₹60,900.',
    },
    {
      question: 'Is there marginal relief on ₹8 lakh salary?',
      answer:
        'No. Marginal relief does not apply here. The tax arises because income exceeds ₹7 lakh, making you ineligible for the Section 87A rebate.',
    },
    {
      question: 'How can I avoid tax on ₹8 lakh salary?',
      answer:
        'You can reduce taxable income below ₹7 lakh using Old Regime deductions like 80C, HRA, or NPS, or restructure salary components.',
    },
  ];

  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          { name: 'Tax Planning', url: 'https://www.fincado.com/guides/tax' },
          {
            name: 'Tax on 8 Lakh Salary',
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
          • <span>7 Min Read</span>
        </div>
      </header>
      <ShareTools title={pageTitle} />

      <div className="guide-image-wrap">
        <Image
          src={CONFIG.heroImage}
          alt="Tax on 8 Lakh Salary Graph"
          width={1200}
          height={600}
          className="guide-image"
          priority
        />
      </div>

      <WikiText
        content={`Earning **₹8 Lakhs (8 LPA)** is a tricky spot in the Indian tax system. You are just barely above the tax-free limit. A difference of ₹25,000 in salary can suddenly trigger a tax bill of over ₹23,000.`}
      />

      <div className="freshness-note">
        <strong>Status:</strong> Updated for Budget 2025-26
      </div>

      {/* VERDICT BOX */}
      <div className="short-answer-box">
        <h3>⚡ Quick Verdict</h3>
        <p>
          For a <strong>₹8 Lakh salary</strong>, the{' '}
          <strong>New Tax Regime</strong> is the winner. You will pay approx{' '}
          <strong>₹23,400</strong> in tax.
        </p>
        <p
          style={{
            fontSize: '15px',
            fontStyle: 'italic',
            color: '#475569',
            margin: '0 0 16px 0',
          }}
        >
          If you earn ₹8 lakh per year, your take-home salary is roughly ₹61,000
          per month.
        </p>
        <p>
          The <strong>Old Regime</strong> demands a huge tax of{' '}
          <strong>₹65,000</strong> unless you have deductions exceeding{' '}
          <strong>₹2.60 Lakhs</strong>.
        </p>
        <InlineTaxCalculator defaultSalary={800000} />
      </div>

      <AdSlot id="tax-8l-1" type="in-article" />

      {/* THE 8 LAKH TRAP EXPLAINED */}
      <div
        style={{
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          padding: '24px',
          borderRadius: '12px',
          margin: '32px 0',
        }}
      >
        <h3 style={{ color: '#be123c', marginTop: 0 }}>
          ⚠️ The &quot;8 Lakh&quot; Trap
        </h3>
        <p>Why do you pay tax on ₹8 Lakhs when ₹7 Lakhs is free?</p>
        <ul className="checklist">
          <li>
            <strong>Salary ₹7.75 Lakhs:</strong> Minus ₹75k Std Deduction = Net
            Income ₹7.00 Lakhs. <br />
            <strong>Tax = ZERO</strong> (Due to 87A Rebate).
          </li>
          <li>
            <strong>Salary ₹8.00 Lakhs:</strong> Minus ₹75k Std Deduction = Net
            Income ₹7.25 Lakhs. <br />
            <strong>Tax = ₹23,400</strong>.
          </li>
        </ul>
        <p style={{ marginBottom: 0 }}>
          <strong>Result:</strong> Earning that extra ₹25,000 basically costs
          you ₹23,400 in taxes. You only keep ₹1,600 of your raise!
        </p>
        <p className="text-xs text-gray-500 mt-2">
          <strong>Note:</strong> This is not Marginal Relief. The tax arises due
          to loss of Section 87A rebate under the New Tax Regime.
        </p>
      </div>

      {/* TAKE HOME */}
      <h2 id="take-home-salary">₹8 Lakh Salary – Monthly In-Hand Breakdown</h2>
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
                <strong>₹66,666</strong>
              </td>
              <td>
                <strong>₹66,666</strong>
              </td>
            </tr>
            <tr>
              <td>Less: PF (Est.)</td>
              <td style={{ color: '#dc2626' }}>- ₹3,600</td>
              <td style={{ color: '#dc2626' }}>- ₹3,600</td>
            </tr>
            <tr>
              <td>Less: Prof Tax</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
              <td style={{ color: '#dc2626' }}>- ₹200</td>
            </tr>
            <tr>
              <td>Less: TDS</td>
              <td style={{ color: '#dc2626' }}>- ₹1,950</td>
              <td style={{ color: '#dc2626' }}>- ₹5,416</td>
            </tr>
            <tr style={{ background: '#f0fdf4', fontSize: '16px' }}>
              <td>
                <strong>In-Hand Salary</strong>
              </td>
              <td>
                <strong style={{ color: '#16a34a' }}>₹60,916</strong>
              </td>
              <td>
                <strong style={{ color: '#ea580c' }}>₹57,450</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CALCULATION */}
      <h2 id="new-regime">Tax Calculation (New Regime)</h2>
      <p>Standard Deduction: ₹75,000. Taxable Income: ₹7,25,000.</p>
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
              <td>7L - 7.25L</td>
              <td>10%</td>
              <td>₹2,500</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td>Total + Cess(4%)</td>
              <td></td>
              <td>₹23,400</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* BREAK EVEN */}
      <h2 id="break-even">Break-Even Point: ₹2.60 Lakhs</h2>
      <div className="callout-box info-box">
        <p>
          To beat the New Regime, you need Old Regime deductions {'>'}{' '}
          <strong>₹2,60,000</strong>.
        </p>
        <p>
          If you pay Rent (HRA) and invest in 80C, you might cross this.
          Otherwise, stick to New Regime.
        </p>
      </div>

      <AuthorBio />

      {/* INTERNAL LINKS */}
      <section className="sibling-links">
        <h3>Useful Tools & Guides</h3>
        <ul>
          <li>
            <Link href="/guides/tax-on-10-lakh-salary">
              Check Tax for ₹10 Lakhs
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
