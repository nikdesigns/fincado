import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'NPS 2025: 10-12% Returns, ₹50K Tax Bonus & 80-20 Rule',
  description:
    'NPS 2025 guide: 10-12% returns, ₹2L tax deduction (80CCD 1B ₹50K bonus), Tier 1 vs Tier 2, new 80-20 withdrawal rule, lifecycle funds & NPS vs PPF comparison.',
  keywords: [
    'nps tier 1 vs tier 2',
    'section 80ccd(1b) deduction',
    'nps withdrawal rules 2025',
    'nps interest rate history',
    'best pension scheme india',
    'nps vs ppf tax benefit',
  ],
  openGraph: {
    title: 'NPS Guide 2025: Returns, Tax Benefits (80CCD) & Withdrawal Rules',
    description:
      'Unlock ₹50,000 extra tax deduction. Learn how NPS builds a multi-crore retirement corpus with market-linked returns.',
    url: 'https://www.fincado.com/guides/nps-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/nps/nps-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Growth chart showing NPS outperforming traditional savings',
      },
    ],
  },
};

export default function NPSGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'NPS Guide 2025',
            url: 'https://www.fincado.com/guides/nps-guide',
          },
        ]}
      />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline:
              'NPS Guide 2025: Returns, Tax Benefits (80CCD) & Withdrawal Rules',
            description:
              'Comprehensive guide to the National Pension System (NPS): Tier 1 vs Tier 2 accounts, 80CCD(1B) tax benefits, asset allocation, and new withdrawal rules.',
            image:
              'https://www.fincado.com/images/guides/nps/nps-guide-hero.webp',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-02-20',
            dateModified: '2025-02-20',
          }),
        }}
      />

      {/* --- FAQ SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the additional tax benefit in NPS?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'NPS offers an exclusive deduction of ₹50,000 under Section 80CCD(1B), over and above the ₹1.5 Lakh limit of Section 80C. This brings the total possible deduction to ₹2 Lakh.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I withdraw my entire NPS corpus at 60?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. You can withdraw up to 60% of the corpus as a tax-free lump sum. The remaining 40% must be used to purchase an annuity plan for monthly pension.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is NPS better than PPF?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'NPS has higher return potential (10-12%) due to equity exposure compared to PPF (7.1%). However, PPF offers guaranteed returns and EEE tax status, while NPS pension is taxable.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="guide-header no-print">
        <span className="badge-flagship">Retirement Planning</span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          NPS Guide 2025: Returns, Tax Benefits (80CCD) & Withdrawal Rules
        </h1>
        <div className="guide-meta">
          <span>
            By <strong>Fincado Team</strong>
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>14 Min Read</span>
        </div>
        <div style={{ marginTop: 20 }}>
          <ShareTools title="NPS Guide 2025" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          Understanding the <strong>National Pension System (NPS)</strong> is crucial for maximizing retirement savings. With <strong>returns averaging 10-12%</strong> and an exclusive <strong>₹50,000 tax deduction</strong> (Section 80CCD 1B), NPS is a powerful tool.

          However, nuances like <strong>Tier 1 vs Tier 2</strong>, mandatory annuity, and <strong>Lifecycle Funds</strong> can be confusing. This guide simplifies NPS rules, tax benefits, and withdrawal norms for 2025.
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/nps/nps-guide-hero.webp"
          alt="Concept art of retirement planning with NPS"
          width={1200}
          height={675}
          priority
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        />
      </div>

      <h2>What is NPS (National Pension System)?</h2>
      <WikiText
        content={`
          <strong>NPS</strong> is a voluntary, market-linked retirement savings scheme regulated by the <strong>PFRDA</strong>. It is designed to provide a retirement corpus and a monthly pension.
        `}
      />

      <div className="callout-box info-box">
        <h3>Why Choose NPS?</h3>
        <ul>
          <li>
            <strong>Low Cost:</strong> One of the cheapest pension products
            globally.
          </li>
          <li>
            <strong>Flexible:</strong> Choose your own asset allocation
            (Equity/Debt).
          </li>
          <li>
            <strong>Tax Efficient:</strong> Additional ₹50,000 deduction.
          </li>
          <li>
            <strong>Portable:</strong> Account stays with you even if you change
            jobs.
          </li>
        </ul>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box no-print">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#tier1-vs-tier2">1. Tier 1 vs Tier 2 Accounts</a>
          </li>
          <li>
            <a href="#investment-choices">
              2. Investment Choices (Auto vs Active)
            </a>
          </li>
          <li>
            <a href="#tax-benefits">3. The ₹50,000 Tax Bonus</a>
          </li>
          <li>
            <a href="#withdrawal-rules">4. Withdrawal & Exit Rules</a>
          </li>
          <li>
            <a href="#nps-vs-alternatives">5. NPS vs PPF vs EPF</a>
          </li>
          <li>
            <a href="#faqs">6. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-nps-1" type="leaderboard" />
      </div>

      <h2 id="tier1-vs-tier2">
        Tier 1 vs Tier 2 Accounts: The Critical Difference
      </h2>
      <p>
        NPS offers two types of accounts. Tier 1 is mandatory for pension; Tier
        2 is optional.
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Tier 1 (Pension Account)</th>
              <th>Tier 2 (Investment Account)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Status</strong>
              </td>
              <td>
                <strong>Mandatory</strong>
              </td>
              <td>Optional (Add-on)</td>
            </tr>
            <tr>
              <td>
                <strong>Lock-In</strong>
              </td>
              <td>Until Age 60</td>
              <td>
                <strong>No Lock-In (Liquid)</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Tax Benefit</strong>
              </td>
              <td>✅ Yes (80C + 80CCD 1B)</td>
              <td>❌ No Tax Benefit</td>
            </tr>
            <tr>
              <td>
                <strong>Min Contribution</strong>
              </td>
              <td>₹1,000 / Year</td>
              <td>No minimum balance</td>
            </tr>
            <tr>
              <td>
                <strong>Withdrawal</strong>
              </td>
              <td>Restricted</td>
              <td>Anytime</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box info-box">
        <strong>Verdict:</strong> Open <strong>Tier 1</strong> for retirement
        and tax saving. Use <strong>Tier 2</strong> only if you want a low-cost
        mutual fund alternative with liquidity.
      </div>

      <h2 id="investment-choices">How NPS Works: Investment Choices</h2>
      <p>NPS allows you to invest in 4 asset classes:</p>
      <ul>
        <li>
          <strong>E (Equity):</strong> Stocks (High Risk, High Return). Max 75%.{' '}
        </li>
        <li>
          <strong>C (Corporate Bonds):</strong> Fixed Income (Moderate Risk).
        </li>
        <li>
          <strong>G (Govt Securities):</strong> G-Secs (Low Risk).
        </li>
        <li>
          <strong>A (Alternative):</strong> REITs/InvITs (Max 5%).
        </li>
      </ul>

      <h3>Choice 1: Active Choice (Do It Yourself)</h3>
      <p>
        You decide the percentage allocation. E.g., 50% Equity, 30% Corporate
        Bonds, 20% G-Secs.
      </p>

      <h3>Choice 2: Auto Choice (Lifecycle Funds)</h3>
      <p>
        The system automatically reduces equity exposure as you age to protect
        your corpus.
      </p>
      <ul>
        <li>
          <strong>LC75 (Aggressive):</strong> Starts with 75% Equity.
        </li>
        <li>
          <strong>LC50 (Moderate):</strong> Starts with 50% Equity.
        </li>
        <li>
          <strong>LC25 (Conservative):</strong> Starts with 25% Equity.
        </li>
      </ul>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-nps-2" type="leaderboard" />
      </div>

      <h2 id="tax-benefits">Tax Benefits: The ₹50,000 Bonus</h2>
      <WikiText
        content={`NPS is the only scheme that offers tax deductions <strong>above the ₹1.5 Lakh limit</strong> of Section 80C.`}
      />

      <div className="example-box">
        <h3>Total Tax Deduction: Up to ₹2 Lakh</h3>
        <ul>
          <li>
            <strong>Section 80CCD(1):</strong> Investment up to ₹1.5 Lakh (Part
            of 80C limit).
          </li>
          <li>
            <strong>Section 80CCD(1B):</strong>{' '}
            <strong>Additional ₹50,000</strong> deduction (Exclusive to NPS).
          </li>
        </ul>
        <p style={{ marginTop: 12 }}>
          <strong>For Corporate Employees:</strong> Under{' '}
          <strong>Section 80CCD(2)</strong>, employer&apos;s contribution (up to
          10% of Basic+DA) is tax-free *over and above* the ₹2 Lakh limit.
        </p>
      </div>

      <h2 id="withdrawal-rules">Withdrawal & Exit Rules (Maturity)</h2>
      <p>At age 60, your corpus is divided into two parts:</p>

      <div className="myth-container">
        <div className="myth-card">
          <div className="myth-header">The 60-40 Rule</div>
          <div className="myth-title">Lump Sum vs Annuity</div>
          <div style={{ padding: '0 20px 20px' }}>
            <p>
              You can withdraw <strong>60%</strong> of your corpus as a tax-free
              lump sum.
            </p>
            <p>
              The remaining <strong>40%</strong> MUST be used to buy an annuity
              (monthly pension plan) from an insurance provider.
            </p>
          </div>
          <div className="reality-box">
            <strong>Note:</strong> The 60% lump sum is tax-free. The monthly
            pension you receive from the annuity is <strong>taxable</strong> as
            per your income slab.
          </div>
        </div>
      </div>

      <h3>Premature Exit (Before 60)</h3>
      <ul>
        <li>
          Allowed only after <strong>10 years</strong>.
        </li>
        <li>
          You must use <strong>80%</strong> of the corpus to buy an annuity.
        </li>
        <li>
          Only <strong>20%</strong> can be withdrawn as lump sum.
        </li>
      </ul>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-nps-3" type="leaderboard" />
      </div>

      <h2 id="nps-vs-alternatives">NPS vs PPF vs EPF Comparison</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>NPS</th>
              <th>PPF</th>
              <th>EPF</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Returns</strong>
              </td>
              <td>10-12% (Market)</td>
              <td>7.1% (Fixed)</td>
              <td>8.25% (Fixed)</td>
            </tr>
            <tr>
              <td>
                <strong>Lock-In</strong>
              </td>
              <td>Age 60</td>
              <td>15 Years</td>
              <td>Retirement</td>
            </tr>
            <tr>
              <td>
                <strong>Tax Benefit</strong>
              </td>
              <td>
                <strong>₹2 Lakh</strong> (Total)
              </td>
              <td>₹1.5 Lakh</td>
              <td>₹1.5 Lakh</td>
            </tr>
            <tr>
              <td>
                <strong>Maturity Tax</strong>
              </td>
              <td>60% Tax-Free</td>
              <td>
                <strong>100% Tax-Free</strong>
              </td>
              <td>
                <strong>100% Tax-Free</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Risk</strong>
              </td>
              <td>Moderate (Equity)</td>
              <td>Zero (Govt)</td>
              <td>Zero (Govt)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box info-box">
        <strong>Verdict:</strong> Choose <strong>NPS</strong> for higher returns
        and extra tax saving. Choose <strong>PPF/EPF</strong> for 100% tax-free
        maturity and safety. A mix of both is ideal.
      </div>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>Can I switch between fund managers?</summary>
          <p>
            Yes. You can change your Pension Fund Manager (e.g., from SBI to
            HDFC) once in a financial year. You can also change your investment
            choice (Active/Auto) twice a year.
          </p>
        </details>
        <details>
          <summary>What happens to NPS corpus upon death?</summary>
          <p>
            In case of the subscriber&apos;s death, the{' '}
            <strong>entire corpus (100%)</strong>
            is paid to the nominee/legal heir. The annuity purchase is not
            mandatory for the nominee.
          </p>
        </details>
        <details>
          <summary>Is the monthly pension taxable?</summary>
          <p>
            Yes. The monthly annuity income you receive after retirement is
            treated as salary/income and taxed according to your applicable tax
            slab in that year.
          </p>
        </details>
        <details>
          <summary>Can I open an NPS account online?</summary>
          <p>
            Yes, you can open an eNPS account online using your Aadhaar and PAN
            card at the NSDL or Karvy CRA websites. The process is paperless and
            quick.
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>
          NPS is the best tool for retirement if you want equity exposure with
          tax benefits.
        </p>
        <h4>Your Action Plan:</h4>
        <ul className="checklist">
          <li>
            Open <strong>Tier 1</strong> Account.
          </li>
          <li>
            Invest <strong>₹50,000</strong> for 80CCD(1B) benefit.
          </li>
          <li>
            Choose <strong>Active Choice</strong> if you understand asset
            allocation.
          </li>
          <li>
            Choose <strong>Auto Choice</strong> for hands-off management.
          </li>
        </ul>
      </div>

      {/* --- AUTHOR BIO --- */}
      <div
        style={{
          marginTop: 40,
          borderTop: '1px solid var(--color-border)',
          paddingTop: 24,
        }}
      >
        <AuthorBio />
      </div>

      <div className="legal-disclaimer">
        <strong>Disclaimer:</strong> NPS returns are market-linked and not
        guaranteed. Tax laws are subject to change. This guide is for
        educational purposes. Please consult a financial advisor before
        investing.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Plan your retirement</h2>
          <p>Calculate your NPS corpus and monthly pension.</p>
          <div className="final-cta-row">
            <Link href="/retirement-calculator" className="primary-cta">
              Retirement Planner
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-nps-4" type="leaderboard" />
      </div>
    </article>
  );
}
