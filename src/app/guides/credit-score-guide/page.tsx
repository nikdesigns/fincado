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
  title: 'Increase CIBIL Score 650 to 750: Step-by-Step Guide',
  description:
    'How to improve CIBIL score fast: Convert settled to closed status, raise disputes, credit utilization hack, secured cards & step-by-step repair guide 2025.',
  keywords: [
    'improve cibil score 650 to 750',
    'remove settled status from cibil',
    'raise cibil dispute online',
    'credit utilization ratio hack',
    'secured credit card for cibil score',
    'cibil score repair india',
  ],
  openGraph: {
    title: 'How to Increase CIBIL Score from 650 to 750 (Step-by-Step)',
    description:
      'A low CIBIL score can cost you lakhs. Learn how to remove "Settled" status, fix errors, and boost your score fast.',
    url: 'https://www.fincado.com/guides/credit-score-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/credit-score/credit-score-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Graph showing CIBIL score rising from 650 to 750',
      },
    ],
  },
};

export default function CreditScoreGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'Credit Score Repair',
            url: 'https://www.fincado.com/guides/credit-score-guide',
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
              'How to Increase CIBIL Score from 650 to 750 (Step-by-Step)',
            description:
              'Complete guide to repairing credit score in India: Fixing "Settled" loans, disputing errors, and using secured cards.',
            image:
              'https://www.fincado.com/images/guides/credit-score/credit-score-guide-hero.webp',
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
            datePublished: '2025-01-30',
            dateModified: '2025-01-30',
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
                name: 'How can I improve my CIBIL score from 650 to 750 fast?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Pay all EMIs on time, reduce credit utilization below 30%, raise disputes for errors, and convert "Settled" accounts to "Closed" status. With discipline, you can see results in 6-12 months.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between "Settled" and "Closed" loan status?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '"Settled" means you paid less than the full amount, which hurts your score for 7 years. "Closed" means full repayment, which boosts your score. You can convert Settled to Closed by paying the difference.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the 30% credit utilization rule?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Keep your credit card usage below 30% of your limit. Pro tip: Pay your bill before the statement generation date so a low balance is reported to CIBIL.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="guide-header no-print">
        <span className="badge-flagship">Credit Repair</span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          How to Increase CIBIL Score from 650 to 750 (Step-by-Step)
        </h1>
        <div className="guide-meta">
          <span>
            By <strong>Fincado Team</strong>
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>15 Min Read</span>
        </div>
        <div style={{ marginTop: 20 }}>
          <ShareTools title="How to Increase CIBIL Score from 650 to 750" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          A <strong>CIBIL score below 650</strong> can block your loan applications, result in higher interest rates, or lead to outright rejections. But the good news is that improving your score to <strong>750+</strong> is absolutely achievable with the right strategy.

          Whether you need to fix a <strong>"Settled" loan status</strong>, raise a <strong>CIBIL dispute</strong>, or use the <strong>credit utilization hack</strong>, this guide covers everything you need to rebuild your creditworthiness in 2025.
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/credit-score/credit-score-guide-hero.webp"
          alt="Concept art of credit score meter rising"
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

      <h2>What is a CIBIL Score?</h2>
      <WikiText
        content={`
          A <strong>CIBIL score</strong> is a 3-digit number (300-900) summarizing your credit history. A score of <strong>750+</strong> is considered excellent and unlocks lower interest rates on loans.
        `}
      />

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Score Range</th>
              <th>Status</th>
              <th>Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>750 - 900</strong>
              </td>
              <td style={{ color: 'var(--color-brand-green)' }}>Excellent</td>
              <td>Lowest Rates, Instant Approval</td>
            </tr>
            <tr>
              <td>
                <strong>700 - 749</strong>
              </td>
              <td>Good</td>
              <td>Strong Approval Chances</td>
            </tr>
            <tr>
              <td>
                <strong>650 - 699</strong>
              </td>
              <td style={{ color: '#eab308' }}>Fair</td>
              <td>Higher Rates, Stricter Terms</td>
            </tr>
            <tr>
              <td>
                <strong>Below 650</strong>
              </td>
              <td style={{ color: '#dc2626' }}>Poor</td>
              <td>High Rejection Risk</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box no-print">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#settled-vs-closed">
              1. The &quot;Settled&quot; Status Trap
            </a>
          </li>
          <li>
            <a href="#dispute-guide">2. Raising a CIBIL Dispute</a>
          </li>
          <li>
            <a href="#utilization-hack">3. The 30% Utilization Hack</a>
          </li>
          <li>
            <a href="#secured-cards">4. Secured Cards for Repair</a>
          </li>
          <li>
            <a href="#action-plan">5. 12-Month Action Plan</a>
          </li>
          <li>
            <a href="#faqs">6. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-cibil-1" type="leaderboard" />
      </div>

      <h2 id="settled-vs-closed">
        The &quot;Settled&quot; vs &quot;Closed&quot; Status: Why It Matters
      </h2>
      <p>
        One of the most damaging mistakes is accepting a &quot;One-Time
        Settlement&quot; (OTS) from a bank.
      </p>

      <div className="example-box">
        <h3>Settled vs Closed</h3>
        <p>
          <strong>Scenario:</strong> You owe ₹2 Lakhs. You negotiate and pay
          ₹1.5 Lakhs.
        </p>
        <ul>
          <li>
            <strong>Bank Marks:</strong> &quot;Settled&quot;
          </li>
          <li>
            <strong>Impact:</strong> Score drops by 75-100 points. Stays for 7
            years.
          </li>
          <li>Future: Almost impossible to get a new loan.</li>
        </ul>
        <hr style={{ margin: '16px 0', borderColor: '#e2e8f0' }} />
        <p>
          <strong>The Fix:</strong> Contact the bank, pay the remaining ₹50,000,
          and get a <strong>No Objection Certificate (NOC)</strong>. Ask them to
          update status to <strong>&quot;Closed&quot;</strong>. Your score will
          bounce back.
        </p>
      </div>

      <h2 id="dispute-guide">Raising a CIBIL Dispute: Step-by-Step</h2>
      <p>
        If you find errors (wrong name, closed loan showing active, identity
        theft), you must dispute it immediately.
      </p>

      <h3>How to Raise a Dispute Online</h3>
      <ol>
        <li>
          <strong>Login:</strong> Go to cibil.com and access your report.
        </li>
        <li>
          <strong>Identify:</strong> Find the specific incorrect entry.
        </li>
        <li>
          <strong>Dispute:</strong> Click &quot;Raise a Dispute&quot; in the
          Dispute Center.
        </li>
        <li>
          <strong>Evidence:</strong> Upload proofs (NOC, payment receipts).
        </li>
        <li>
          <strong>Resolution:</strong> CIBIL contacts the lender. Correction
          takes up to <strong>30 days</strong>.
        </li>
      </ol>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-cibil-2" type="leaderboard" />
      </div>

      <h2 id="utilization-hack">
        Credit Utilization Hack: The &quot;30% Rule&quot;
      </h2>
      <WikiText
        content={`Your <strong>Credit Utilization Ratio</strong> (Credit Used / Total Limit) accounts for 30% of your score. Ideally, keep it below <strong>30%</strong>.`}
      />

      <div className="myth-container">
        <div className="myth-card">
          <div className="myth-header">The Secret Hack</div>
          <div className="myth-title">Pay BEFORE Statement Generation</div>
          <div style={{ padding: '0 20px 20px' }}>
            <p>
              Banks report your balance on the <strong>Statement Date</strong>,
              not the Due Date. If you max out your card (₹90k/₹1L), CIBIL sees
              90% utilization even if you pay in full later!
            </p>
          </div>
          <div className="reality-box">
            <strong>The Fix:</strong> Pay off your balance 2-3 days *before* the
            statement is generated. The bank will report a low balance (e.g.,
            ₹5k), boosting your score instantly.
          </div>
        </div>
      </div>

      <h2 id="secured-cards">Secured Credit Cards: Rebuilding from Scratch</h2>
      <p>
        If your score is too low (&lt;650), no bank will give you a loan. The
        solution is a <strong>Secured Credit Card</strong>.
      </p>

      <h3>How It Works</h3>
      <ul>
        <li>
          <strong>Deposit:</strong> Open an FD of ₹20,000 - ₹50,000.
        </li>
        <li>
          <strong>Card:</strong> Bank gives you a credit card with 80-90% limit
          of FD.
        </li>
        <li>
          <strong>Usage:</strong> Use it for small payments and pay back on
          time.
        </li>
        <li>
          <strong>Result:</strong> This builds positive history. After 6-12
          months, your score improves, and you can upgrade to a regular card.
        </li>
      </ul>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Bank / Card</th>
              <th>FD Amount</th>
              <th>Features</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IDFC WOW</td>
              <td>Min ₹2,000</td>
              <td>No Income Proof, Lifetime Free</td>
            </tr>
            <tr>
              <td>OneCard (Metal)</td>
              <td>Min ₹5,000</td>
              <td>Mobile-first, Metal Card</td>
            </tr>
            <tr>
              <td>Kotak 811</td>
              <td>Min ₹10,000</td>
              <td>Low Barrier Entry</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-cibil-3" type="leaderboard" />
      </div>

      <h2 id="action-plan">Step-by-Step Action Plan (6-12 Months)</h2>
      <div className="callout-box info-box">
        <ul className="checklist">
          <li>
            <strong>Month 1:</strong> Download CIBIL report. Identify
            errors/settled accounts.
          </li>
          <li>
            <strong>Month 2:</strong> Raise disputes. Pay off small dues. Start
            FD card if needed.
          </li>
          <li>
            <strong>Month 3-6:</strong> Keep utilization &lt;30%. NO new loan
            applications.
          </li>
          <li>
            <strong>Month 6-12:</strong> Maintain discipline. Score will cross
            750+.
          </li>
        </ul>
      </div>

      <h2 id="financial-impact">Financial Impact of 750+ Score</h2>
      <p>Why bother? Because it saves you lakhs.</p>

      <h3>Home Loan Example (₹50 Lakh, 20 Years)</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>CIBIL Score</th>
              <th>Interest Rate</th>
              <th>Total Interest Paid</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>650 (Fair)</strong>
              </td>
              <td>10.0%</td>
              <td>₹65.8 Lakhs</td>
            </tr>
            <tr>
              <td>
                <strong>750 (Excellent)</strong>
              </td>
              <td>8.5%</td>
              <td>₹54.1 Lakhs</td>
            </tr>
            <tr>
              <td>
                <strong>Savings</strong>
              </td>
              <td>-</td>
              <td
                style={{
                  color: 'var(--color-brand-green)',
                  fontWeight: 'bold',
                }}
              >
                ₹11.7 Lakhs Saved!
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>Can I remove &quot;Settled&quot; status from CIBIL?</summary>
          <p>
            Yes. You must contact the lender, pay the outstanding difference,
            and obtain an NOC. Once paid, the lender will update the status to
            &quot;Closed&quot;.
          </p>
        </details>
        <details>
          <summary>Does checking my CIBIL score reduce it?</summary>
          <p>
            No. Checking your own score is a &quot;Soft Inquiry&quot; and has
            zero impact. Only when banks check it (Hard Inquiry), it might dip
            slightly.
          </p>
        </details>
        <details>
          <summary>How fast can I increase my score?</summary>
          <p>
            It typically takes <strong>6 to 12 months</strong> of disciplined
            repayment and low utilization to see a significant jump (e.g., 100
            points).
          </p>
        </details>
        <details>
          <summary>Should I close old credit cards?</summary>
          <p>
            No! Closing old cards reduces your total credit limit (increasing
            utilization) and shortens your credit history length. Keep them
            active with small usage.
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>
          Improving your CIBIL score is a journey of discipline, not a quick
          fix.
        </p>
        <h4>Key Takeaways:</h4>
        <ul className="checklist">
          <li>
            Convert <strong>Settled</strong> to <strong>Closed</strong>.
          </li>
          <li>
            Keep utilization below <strong>30%</strong>.
          </li>
          <li>
            Use <strong>Secured Cards</strong> to rebuild.
          </li>
          <li>
            Be patient for <strong>6-12 months</strong>.
          </li>
        </ul>
        <p>
          Start today, and you&apos;ll save lakhs in interest over your
          lifetime.
        </p>
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
        <strong>Disclaimer:</strong> This guide is for educational purposes. We
        do not provide credit repair services. Always deal directly with CIBIL
        or your lender for disputes. Beware of agencies promising instant score
        hikes.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Check your financial health</h2>
          <p>Use our free tools to plan your loans and investments.</p>
          <div className="final-cta-row">
            <Link href="/credit-score" className="primary-cta">
              Check CIBIL Score
            </Link>
            <Link href="/loans/personal-loan" className="secondary-cta">
              Loan Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-cibil-4" type="leaderboard" />
      </div>
    </article>
  );
}
