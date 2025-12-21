import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AuthorBio from '@/components/AuthorBio';

export const metadata: Metadata = {
  title: 'Sukanya Samriddhi Yojana (SSY) Guide 2025: Interest Rate & Rules',
  description:
    'Complete guide to SSY 2025. Check current 8.2% interest rate, eligibility, withdrawal rules, tax benefits (80C), and calculator.',
  alternates: {
    canonical:
      'https://www.fincado.com/guides/sukanya-samriddhi-yojana-guide-2025',
  },
  openGraph: {
    title: 'Sukanya Samriddhi Yojana (SSY) Guide 2025',
    description:
      "Invest in your daughter's future with SSY. 8.2% Interest, EEE Tax Benefits, and complete safety. Read the 2025 rules here.",
    type: 'article',
    url: 'https://www.fincado.com/guides/sukanya-samriddhi-yojana-guide-2025',
    images: [
      {
        url: '/images/guides/ssy/ssy-guide-hero.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function SSYGuide() {
  // 1. FAQ Schema Data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can NRI parents open an SSY account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, only resident Indians can open SSY accounts. If the girl child or guardian becomes an NRI after opening the account, it must be closed.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I have an SSY account for 3 daughters?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Generally, the limit is 2 accounts per family. However, a third account is allowed if the second delivery results in twins or triplets, supported by medical proof.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if I deposit more than ₹1.5 lakh in a year?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Any amount deposited exceeding the ₹1.5 lakh limit in a financial year will not be accepted or will be returned to you without earning any interest.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I transfer my SSY account to another bank?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, SSY accounts can be transferred easily from a Post Office to a Bank or vice versa, and between branches anywhere in India.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is SSY better than FD for a girl child?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, SSY is generally better because it offers a higher interest rate (8.2%), complete tax exemption (EEE status), and sovereign guarantee, unlike FDs which have taxable interest.',
        },
      },
    ],
  };

  // 2. Article Schema Data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sukanya Samriddhi Yojana (SSY) Guide 2025: Rules & Interest',
    description:
      'Complete guide to SSY 2025: Eligibility, 8.2% interest rate, calculator, withdrawal rules, and tax benefits.',
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
    datePublished: '2025-01-05',
    dateModified: '2025-01-05',
    image: 'https://www.fincado.com/images/guides/ssy/ssy-guide-hero.webp',
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'SSY Guide 2025',
            url: 'https://www.fincado.com/guides/sukanya-samriddhi-yojana-guide-2025',
          },
        ]}
      />

      {/* Inject Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="article">
        <header
          style={{
            marginBottom: 32,
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--color-brand-green)',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Government Schemes
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Sukanya Samriddhi Yojana 2025: Rules, Interest & Benefits
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
            }}
          >
            Sukanya Samriddhi Yojana (SSY) is one of India&apos;s most trusted
            and tax-efficient savings schemes specifically designed for the girl
            child. Launched under the Beti Bachao Beti Padhao campaign, SSY
            offers an attractive interest rate, complete tax exemption, and
            guaranteed returns backed by the Government of India.
          </p>
        </header>

        {/* AD SLOT 1 */}
        <div className="no-print" style={{ marginBottom: 32 }}>
          <AdSlot id="ssy-guide-top" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>What is Sukanya Samriddhi Yojana?</h2>
          <p>Sukanya Samriddhi Yojana is a government-backed small savings scheme launched in 2015 to promote the welfare and financial security of girl children. It encourages parents and guardians to build a substantial corpus for their daughter's education and marriage expenses through systematic savings with attractive, risk-free returns.</p>

          <h3>Key Highlights of SSY</h3>
          <ul>
            <li><strong>Current Interest Rate:</strong> 8.2% per annum (compounded annually) for Q4 FY 2024-25.</li>
            <li><strong>Tenure:</strong> 21 years from the date of account opening or until the girl child gets married after turning 18.</li>
            <li><strong>Minimum Deposit:</strong> ₹250 per year.</li>
            <li><strong>Maximum Deposit:</strong> ₹1,50,000 per financial year.</li>
            <li><strong>Tax Benefit:</strong> EEE (Exempt-Exempt-Exempt) status – deposits, interest, and maturity amount all tax-free.</li>
            <li><strong>Government Guarantee:</strong> Backed by Government of India, making it one of the safest investment options.</li>
          </ul>
        `}
        />

        {/* 🖼️ IMAGE 1: HERO CONCEPT */}
        <figure style={{ margin: '32px 0' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#fef2f2',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #fee2e2',
            }}
          >
            <Image
              src="/images/guides/ssy/ssy-concept-hero.webp"
              alt="Sukanya Samriddhi Yojana Benefits Illustration"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <figcaption
            style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#64748b',
              marginTop: '8px',
            }}
          >
            Secure your daughter&apos;s future with tax-free returns and
            government guarantee.
          </figcaption>
        </figure>

        <WikiText
          content={`
          <h2>Sukanya Samriddhi Yojana Eligibility: Age Limit & Account Rules</h2>
          <p>Understanding eligibility criteria is crucial before opening an SSY account. Here are the complete rules:</p>

          <h3>Age Limit for Girl Child</h3>
          <ul>
            <li>The account can be opened <strong>from the birth of a girl child until she turns 10 years old</strong>.</li>
            <li>Example: If your daughter turns 10 on January 15, 2026, you must open the account before that date.</li>
          </ul>

          <h3>Who Can Open the Account?</h3>
          <ul>
            <li><strong>Parent or legal guardian</strong> of the girl child can open and operate the SSY account.</li>
            <li>Only one account can be opened in the name of one girl child.</li>
            <li>The girl child can operate the account herself after turning 18 years.</li>
          </ul>

          <h3>Maximum Number of Accounts</h3>
          <p>A family can open a <strong>maximum of two SSY accounts</strong> – one for each girl child. <strong>Exception:</strong> Three accounts are permitted in case of twins or triplets born in the second delivery (with medical certificate proof).</p>
        `}
        />

        {/* AD SLOT 2 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="ssy-guide-eligibility-rect" type="box" />
        </div>

        <WikiText
          content={`
          <h2>Minimum and Maximum Deposit Limits</h2>
          <p>SSY offers flexibility in contribution amounts while maintaining discipline through defined limits.</p>

          <h3>Minimum Annual Deposit: ₹250</h3>
          <ul>
            <li><strong>Minimum deposit required:</strong> ₹250 per financial year (April to March).</li>
            <li>You can deposit this amount in a single installment or multiple installments.</li>
            <li><strong>Penalty for Default:</strong> If minimum deposit isn't made, the account becomes "inactive". To reactivate, you must pay a penalty of ₹50 per year of default plus the minimum deposit of ₹250 for those years.</li>
          </ul>

          <h3>Maximum Annual Deposit: ₹1,50,000</h3>
          <ul>
            <li><strong>Maximum limit:</strong> ₹1,50,000 per financial year.</li>
            <li>This limit qualifies for full tax deduction under Section 80C.</li>
            <li>Any amount deposited above ₹1.5 lakh in a year will not earn interest and may be returned.</li>
          </ul>

          <div class="callout-box info-box">
            <strong>Deposit Period:</strong> You need to make deposits for <strong>15 years</strong> from the date of account opening. After 15 years, no further deposits are required, but the account continues to earn interest until maturity (21 years).
          </div>
        `}
        />

        {/* 🖼️ IMAGE 2: DEPOSIT LIMITS */}
        <figure style={{ margin: '32px 0' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#f8fafc',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
            }}
          >
            <Image
              src="/images/guides/ssy/ssy-deposit-rules.webp"
              alt="SSY Deposit Limits and Tenure Explained"
              fill
              style={{ objectFit: 'contain', padding: '16px' }}
            />
          </div>
        </figure>

        {/* AD SLOT 3 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="ssy-guide-mid-banner" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>Sukanya Samriddhi Yojana Interest Rate</h2>
          <p>The interest rate on SSY is revised quarterly by the Government of India and is generally higher than most other small savings schemes.</p>

          <h3>Current Interest Rate (Q4 FY 2024-25)</h3>
          <p><strong>8.2% per annum</strong> (compounded annually). This rate is applicable from January 1, 2025, to March 31, 2025.</p>

          <h3>Historical Interest Rate Trends</h3>
          <div class="table-container">
            <table class="rate-table">
              <thead><tr><th>Period</th><th>Interest Rate (% p.a.)</th></tr></thead>
              <tbody>
                <tr><td>Q4 FY 2024-25 (Jan-Mar)</td><td>8.2%</td></tr>
                <tr><td>Q3 FY 2024-25 (Oct-Dec)</td><td>8.2%</td></tr>
                <tr><td>FY 2023-24</td><td>8.0%</td></tr>
                <tr><td>FY 2022-23</td><td>7.6%</td></tr>
              </tbody>
            </table>
          </div>
          <p>The interest rate for SSY is typically <strong>0.4-0.8% higher than PPF</strong>, making it one of the most attractive government-backed schemes.</p>

          <h3>Example Calculation</h3>
          <p>If you deposit ₹1,50,000 every year for 15 years at 8.2% interest:</p>
          <ul>
            <li>Total deposits: ₹22,50,000</li>
            <li>Estimated maturity amount: ~₹69-72 lakh</li>
            <li><strong>Earnings: ~₹47-50 lakh through interest alone – completely tax-free.</strong></li>
          </ul>
        `}
        />

        <div
          style={{
            margin: '32px 0',
            padding: '24px',
            background: '#f0fdf4',
            borderRadius: '12px',
            border: '1px solid #bbf7d0',
            textAlign: 'center',
          }}
        >
          <h3 style={{ marginTop: 0, color: '#166534' }}>
            Want to check your exact returns?
          </h3>
          <p style={{ color: '#166534', marginBottom: '16px' }}>
            Use our free calculator to plan your investments based on your
            daughter&apos;s age.
          </p>
          <Link href="/hi/sukanya-samriddhi" className="primary-cta">
            Open SSY Calculator
          </Link>
        </div>

        <WikiText
          content={`
          <h2>Partial Withdrawal Rules for Higher Education</h2>
          <p>One of the most valuable features of SSY is the provision for partial withdrawal for the girl child's higher education expenses.</p>

          <h3>When & How Much Can You Withdraw?</h3>
          <ul>
            <li><strong>Timing:</strong> After the girl child turns 18 years or passes 10th standard (whichever is earlier).</li>
            <li><strong>Limit:</strong> Up to <strong>50% of the balance</strong> at the end of the preceding financial year.</li>
            <li><strong>Purpose:</strong> Must be used for higher education fees (admission, college fees, hostel).</li>
          </ul>
          <p>After partial withdrawal, you cannot make further deposits, but the remaining balance continues to earn interest.</p>
        `}
        />

        {/* AD SLOT 4 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="ssy-guide-withdrawal-rect" type="box" />
        </div>

        <WikiText
          content={`
          <h2>Premature Account Closure Rules</h2>
          <p>While designed for 21 years, premature closure is allowed under specific circumstances:</p>
          <ol>
            <li><strong>Marriage of the Girl Child (After 18):</strong> The account can be closed for marriage purposes. Proof is required.</li>
            <li><strong>Compassionate Grounds:</strong> In case of life-threatening illness of the girl child or death of the guardian, premature closure may be approved.</li>
            <li><strong>Death of Account Holder:</strong> In the unfortunate event of the girl child's death, the account is closed immediately and balance paid to the guardian.</li>
          </ol>
          <p><strong>Note:</strong> Premature closure for general reasons is NOT allowed and defeats the purpose of long-term compounding.</p>

          <h2>Tax Benefits of SSY (EEE Status)</h2>
          <p>SSY enjoys the <strong>EEE (Exempt-Exempt-Exempt)</strong> status, making it highly tax-efficient:</p>
          <ul>
            <li><strong>Exempt at Investment:</strong> Deposits up to ₹1.5 Lakh/year qualify for Section 80C deduction.</li>
            <li><strong>Exempt at Earning:</strong> Interest earned is completely tax-free.</li>
            <li><strong>Exempt at Maturity:</strong> The final maturity amount is 100% tax-free.</li>
          </ul>
        `}
        />

        {/* 🖼️ IMAGE 3: EEE TAX BENEFIT */}
        <figure style={{ margin: '32px 0' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#ecfccb',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #d9f99d',
            }}
          >
            <Image
              src="/images/guides/ssy/ssy-eee-tax-benefit.webp"
              alt="EEE Tax Benefit Explained for Sukanya Samriddhi"
              fill
              style={{ objectFit: 'contain', padding: '16px' }}
            />
          </div>
        </figure>

        {/* AD SLOT 5 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="ssy-guide-tax-banner" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>How to Open a Sukanya Samriddhi Yojana Account</h2>
          <p>You can open an SSY account at any <strong>Post Office</strong> or authorized branches of commercial banks (SBI, HDFC, ICICI, etc.).</p>
          
          <h3>Documents Required</h3>
          <ul>
            <li><strong>Birth Certificate</strong> of the girl child (Mandatory).</li>
            <li>Identity & Address Proof of parent/guardian (Aadhaar, PAN, Passport).</li>
            <li>Passport-size photographs of both parent and child.</li>
            <li>Initial deposit of ₹250 (Cash/Cheque/DD).</li>
          </ul>

          <h2>Maturity and Account Closure</h2>
          <p>The account matures <strong>21 years from the date of opening</strong>. At maturity, you receive the Principal + Accumulated Interest tax-free. The account can also be closed earlier for marriage expenses after the girl turns 18.</p>
        `}
        />

        {/* AD SLOT 6 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="ssy-guide-maturity-rect" type="box" />
        </div>

        <WikiText
          content={`
          <h2>Sukanya Samriddhi Yojana vs Other Options</h2>
          <div class="table-container">
            <table class="rate-table">
              <thead><tr><th>Feature</th><th>SSY</th><th>PPF</th><th>FD (Tax Saver)</th><th>ELSS</th></tr></thead>
              <tbody>
                <tr><td><strong>Interest</strong></td><td>8.2% (Govt Backed)</td><td>7.1%</td><td>6-7%</td><td>10-15% (Market)</td></tr>
                <tr><td><strong>Lock-in</strong></td><td>21 Years</td><td>15 Years</td><td>5 Years</td><td>3 Years</td></tr>
                <tr><td><strong>Tax Status</strong></td><td><strong>EEE</strong></td><td>EEE</td><td>Taxable Interest</td><td>LTCG Taxable</td></tr>
                <tr><td><strong>Min Invest</strong></td><td>₹250</td><td>₹500</td><td>Varies</td><td>₹500</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Key Takeaway:</strong> SSY is unbeatable for girl child-focused long-term savings with guaranteed returns and full tax exemption.</p>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Not Making Annual Deposits:</strong> Missing the ₹250 minimum deposit leads to penalties and loss of active status.</li>
            <li><strong>Opening Late:</strong> Don't wait! Open the account as early as possible (before age 10) to maximize the compounding period.</li>
            <li><strong>Premature Closure:</strong> Closing without a valid reason (like marriage/education) results in lower interest rates.</li>
          </ul>
        `}
        />

        {/* --- FAQ SECTION --- */}
        <div style={{ marginTop: 40 }}>
          <h2 style={{ marginBottom: 20 }}>FAQs: Sukanya Samriddhi Yojana</h2>

          <div className="faqs-accordion">
            <details>
              <summary>Can NRI parents open SSY account?</summary>
              <p>
                No, only resident Indians can open SSY accounts. If the girl
                child or guardian becomes NRI after opening, the account must be
                closed.
              </p>
            </details>

            <details>
              <summary>Can I have SSY for 3 daughters?</summary>
              <p>
                Generally, maximum 2 accounts per family. However, 3 accounts
                are allowed if the second delivery results in twins or triplets
                (medical proof required).
              </p>
            </details>

            <details>
              <summary>
                What happens if I deposit more than ₹1.5 lakh in a year?
              </summary>
              <p>
                The excess amount will be returned without interest. The maximum
                limit is strictly enforced.
              </p>
            </details>

            <details>
              <summary>Can I change the bank/post office?</summary>
              <p>
                Yes, SSY accounts are transferable across post offices and banks
                in India free of cost.
              </p>
            </details>

            <details>
              <summary>Is SSY better than FD for girl child?</summary>
              <p>
                Yes, SSY offers higher interest (8.2% vs 6-7%), complete tax
                exemption (EEE status), and government guarantee.
              </p>
            </details>

            <details>
              <summary>Can the girl child operate the account?</summary>
              <p>
                Yes, after turning 18 years, the girl child can operate the SSY
                account herself.
              </p>
            </details>

            <details>
              <summary>
                What if the girl child becomes NRI after marriage?
              </summary>
              <p>
                If she gets married and becomes NRI, the account can be closed
                prematurely and the balance paid out.
              </p>
            </details>
          </div>
        </div>

        <section className="conclusion-box">
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>
            Conclusion: Is SSY Worth It?
          </h2>
          <p style={{ marginBottom: 16 }}>
            If you have a daughter below 10 years,{' '}
            <strong>SSY should be your first choice</strong>. It offers the
            highest government-backed interest rate (8.2%), complete tax freedom
            (EEE), and zero risk.
          </p>
          <p>
            Even a small deposit of ₹1,000/month can grow into ~₹5.5 Lakh
            tax-free corpus over 21 years. Start today to secure her education
            and marriage goals.
          </p>
        </section>

        {/* AD SLOT 7 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="ssy-guide-bottom" type="leaderboard" />
        </div>

        {/* --- AUTHOR BIO --- */}
        <AuthorBio />

        {/* --- LEGAL DISCLAIMER --- */}
        <div className="legal-disclaimer">
          <p>
            <strong>
              Information provided on this page is for educational purposes only
              and does not constitute financial advice.
            </strong>{' '}
            <br />
            Interest rates and rules for Sukanya Samriddhi Yojana are subject to
            change by the Government of India. Please verify current rates with
            your bank or post office before investing. Fincado is not a
            government entity.
          </p>
        </div>
      </article>
    </>
  );
}
