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
  title: 'GST Returns Guide: GSTR-1, 3B & ITC Rules 2025',
  description:
    'How to file GST return: GSTR-1 vs GSTR-3B, input tax credit golden rule, composition scheme, QRMP quarterly filing & step-by-step filing guide India 2025.',
  keywords: [
    'gst returns filing india',
    'gstr-1 vs gstr-3b',
    'input tax credit rules 2025',
    'gst composition scheme limit',
    'qrmp scheme explained',
    'how to claim itc in gst',
  ],
  openGraph: {
    title: 'GST Returns Explained: GSTR-1 vs GSTR-3B & Input Tax Credit',
    description:
      'Master GST compliance. Learn the "Golden Rule" of ITC, filing process, and how to save taxes legitimately.',
    url: 'https://www.fincado.com/guides/gst-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/gst/gst-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Business owner filing GST returns online',
      },
    ],
  },
};

export default function GSTReturnsGuidePage() {
  return (
    <article className="article guide-body">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'GST Returns Guide',
            url: 'https://www.fincado.com/guides/gst-guide',
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
              'GST Returns Explained: GSTR-1 vs GSTR-3B & Input Tax Credit',
            description:
              'Comprehensive guide on GST Returns: Step-by-step filing process, ITC rules, Composition Scheme, and QRMP scheme.',
            image:
              'https://www.fincado.com/images/guides/gst/gst-guide-hero.webp',
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
            datePublished: '2025-02-08',
            dateModified: '2025-02-08',
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
                name: 'What is the difference between GSTR-1 and GSTR-3B?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'GSTR-1 contains detailed sales invoices, while GSTR-3B is a summary return showing total sales, purchases, ITC claimed, and tax payment.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I claim ITC if my supplier has not filed GST return?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. The "Golden Rule" of ITC states you can only claim credit if the invoice appears in your GSTR-2B, which happens only when your supplier files their GSTR-1.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who is eligible for the Composition Scheme?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Small businesses with an annual turnover up to ₹1.5 Crore (₹75 Lakh for service providers) can opt for the Composition Scheme to pay lower tax rates without ITC benefit.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="guide-header no-print">
        <span className="badge-flagship">Business Tax</span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          GST Returns Explained: GSTR-1 vs GSTR-3B & Input Tax Credit
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
          <ShareTools title="GST Returns Guide" />
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`
          Filing <strong>GST returns</strong> can feel overwhelming, but understanding the difference between <strong>GSTR-1 (sales)</strong>, <strong>GSTR-2B (purchases)</strong>, and <strong>GSTR-3B (payment)</strong> is the foundation of tax compliance in India.

          Mastering <strong>Input Tax Credit (ITC)</strong> rules—especially the "Golden Rule" that you can only claim ITC if your vendor has filed their return—can save thousands in taxes. This guide explains the filing process, Composition Scheme, and QRMP option to simplify your GST journey.
        `}
      />

      <div className="guide-image-wrap">
        <Image
          src="/images/guides/gst/gst-guide-hero.webp"
          alt="GST portal dashboard on laptop screen"
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

      <h2>What is GST Return Filing?</h2>
      <WikiText
        content={`
          A <strong>GST Return</strong> is a document containing details of your income (sales), expenses (purchases), and tax liability. Every registered dealer must file returns to the government.
        `}
      />

      <div className="callout-box info-box">
        <h3>Core Components:</h3>
        <ul>
          <li>
            <strong>Outward Supplies:</strong> Your Sales.
          </li>
          <li>
            <strong>Inward Supplies:</strong> Your Purchases.
          </li>
          <li>
            <strong>ITC (Input Tax Credit):</strong> GST paid on purchases
            (Asset).
          </li>
          <li>
            <strong>Output Tax Liability:</strong> GST collected on sales
            (Liability).
          </li>
        </ul>
      </div>

      {/* --- TOC --- */}
      <nav className="toc-box no-print">
        <p className="toc-title">Table of Contents</p>
        <ul className="toc-list">
          <li>
            <a href="#filing-process">1. How to File Returns (Step-by-Step)</a>
          </li>
          <li>
            <a href="#return-types">2. GSTR-1 vs GSTR-3B Differences</a>
          </li>
          <li>
            <a href="#itc-rules">3. Input Tax Credit &quot;Golden Rule&quot;</a>
          </li>
          <li>
            <a href="#composition-scheme">4. Composition Scheme</a>
          </li>
          <li>
            <a href="#qrmp-scheme">5. QRMP Scheme (Quarterly Filing)</a>
          </li>
          <li>
            <a href="#faqs">6. FAQs</a>
          </li>
        </ul>
      </nav>

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gst-1" type="leaderboard" />
      </div>

      <h2 id="filing-process">How to File GST Return (Step-by-Step)</h2>

      <div
        className="alt-options-box"
        style={{ background: '#fff', marginTop: 24 }}
      >
        <h3 style={{ marginTop: 0 }}>The Process</h3>
        <ul className="checklist">
          <li>
            <strong>Step 1: Log in</strong>
            <br />
            Visit <strong>www.gst.gov.in</strong> and log in with your
            credentials.
          </li>
          <li>
            <strong>Step 2: Dashboard</strong>
            <br />
            Navigate to &apos;Services&apos; &gt; &apos;Returns&apos; &gt;
            &apos;Returns Dashboard&apos;. Select Month/Year.
          </li>
          <li>
            <strong>Step 3: GSTR-1 (Sales)</strong>
            <br />
            Enter details of all sales invoices. Submit by the 11th of the next
            month.
          </li>
          <li>
            <strong>Step 4: GSTR-2B (View Only)</strong>
            <br />
            Check this auto-generated statement on the 14th to see eligible ITC.
          </li>
          <li>
            <strong>Step 5: GSTR-3B (Payment)</strong>
            <br />
            Verify auto-populated data, offset liability with ITC, pay balance
            tax, and file by the 20th.
          </li>
        </ul>
      </div>

      <h2 id="return-types">GST Return Types: GSTR-1 vs GSTR-3B</h2>
      <p>Understanding these forms is critical for compliance.</p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>GSTR-1</th>
              <th>GSTR-3B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Purpose</strong>
              </td>
              <td>
                Details of <strong>Sales</strong> (Outward Supplies)
              </td>
              <td>
                <strong>Summary Return</strong> & Tax Payment
              </td>
            </tr>
            <tr>
              <td>
                <strong>Content</strong>
              </td>
              <td>Invoice-wise details</td>
              <td>Consolidated Sales, ITC, Liability</td>
            </tr>
            <tr>
              <td>
                <strong>Due Date</strong>
              </td>
              <td>11th of Next Month</td>
              <td>20th of Next Month</td>
            </tr>
            <tr>
              <td>
                <strong>Payment</strong>
              </td>
              <td>No Tax Payment</td>
              <td>
                <strong>Tax Paid Here</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box info-box">
        <strong>Pro Tip:</strong> Always file GSTR-1 on time. If you delay, your
        buyers won&apos;t see the ITC in their GSTR-2B, damaging your business
        relationships.
      </div>

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gst-2" type="leaderboard" />
      </div>

      <h2 id="itc-rules">Input Tax Credit (ITC): The Golden Rule</h2>
      <WikiText
        content={`<strong>ITC</strong> is the tax you paid on business purchases, which you can subtract from the tax you collect on sales. 
        
        <strong>Formula:</strong> Net GST Payable = Output Tax (Sales) - Input Tax (Purchases)`}
      />

      <div className="myth-container">
        <div className="myth-card">
          <div className="myth-header">The Golden Rule</div>
          <div className="myth-title">Supplier Compliance = Your ITC</div>
          <div style={{ padding: '0 20px 20px' }}>
            <p>
              You can ONLY claim ITC if your supplier has filed their{' '}
              <strong>GSTR-1 </strong>
              and the invoice appears in your <strong>GSTR-2B</strong>.
            </p>
          </div>
          <div className="reality-box">
            <strong>Impact:</strong> If your vendor doesn&apos;t file returns,
            you cannot claim the credit, increasing your cash outflow. Always
            work with GST-compliant vendors.
          </div>
        </div>
      </div>

      <h3>Conditions to Claim ITC</h3>
      <ul>
        <li>✅ You possess a valid Tax Invoice.</li>
        <li>✅ Goods/Services have been received.</li>
        <li>✅ Supplier has paid tax to the government.</li>
        <li>✅ You have filed your GSTR-3B.</li>
        <li>✅ Payment to supplier made within 180 days.</li>
      </ul>

      <h2 id="composition-scheme">Composition Scheme: For Small Businesses</h2>
      <p>
        A simplified scheme for businesses with turnover up to{' '}
        <strong>₹1.5 Crore</strong>.
      </p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Pros</th>
              <th>Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>✅ Quarterly Filing (GSTR-4)</td>
              <td>
                ❌ <strong>No ITC Allowed</strong>
              </td>
            </tr>
            <tr>
              <td>✅ Low Tax Rate (1% Traders/Mfrs)</td>
              <td>❌ Cannot collect GST from customers</td>
            </tr>
            <tr>
              <td>✅ Less Compliance Burden</td>
              <td>❌ No Inter-State Sales allowed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="qrmp-scheme">QRMP Scheme (Quarterly Return Monthly Payment)</h2>
      <p>
        For taxpayers with turnover up to <strong>₹5 Crore</strong>.
      </p>
      <ul>
        <li>
          <strong>Filing:</strong> File returns (GSTR-1/3B) once a{' '}
          <strong>Quarter</strong>.
        </li>
        <li>
          <strong>Payment:</strong> Pay tax <strong>Monthly</strong> via a
          simple challan (PMT-06).
        </li>
        <li>
          <strong>Benefit:</strong> Reduces the number of returns from 24 to 8
          per year.
        </li>
      </ul>

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gst-3" type="leaderboard" />
      </div>

      <h2 id="risks">Risks of Non-Compliance</h2>
      <ul>
        <li>
          ⚠️ <strong>Late Fees:</strong> ₹50/day (Nil returns: ₹20/day).
        </li>
        <li>
          ⚠️ <strong>Interest:</strong> 18% p.a. on unpaid tax liability.
        </li>
        <li>
          ⚠️ <strong>ITC Blockage:</strong> E-Way Bill generation blocked if
          returns pending for 2 months.
        </li>
        <li>
          ⚠️ <strong>Cancellation:</strong> GST Registration can be cancelled by
          authorities.
        </li>
      </ul>

      {/* --- FAQs --- */}
      <h2 id="faqs">Frequently Asked Questions (FAQs)</h2>
      <div className="faqs-accordion">
        <details>
          <summary>How do I check my GST Return status?</summary>
          <p>
            Log in to the GST portal &gt; Services &gt; Returns &gt; Track
            Return Status. You can search using your ARN (Application Reference
            Number) or Return Filing Period.
          </p>
        </details>
        <details>
          <summary>Can I revise a filed GST return?</summary>
          <p>
            No. GST returns cannot be revised once filed. However, you can
            rectify errors in the *next month&apos;s* return under the
            &apos;Amendment&apos; section.
          </p>
        </details>
        <details>
          <summary>What is Nil Return filing?</summary>
          <p>
            If you have no sales and no purchases in a month, you must file a
            <strong>Nil Return</strong>. Failure to do so attracts late fees.
            You can file Nil returns via SMS.
          </p>
        </details>
        <details>
          <summary>
            Who pays the tax under Reverse Charge Mechanism (RCM)?
          </summary>
          <p>
            Under RCM, the <strong>recipient</strong> of goods/services pays the
            GST directly to the government instead of the supplier (e.g., GTA
            services, Legal services).
          </p>
        </details>
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Verdict</h2>
      <div className="conclusion-box">
        <p>
          GST compliance is non-negotiable. Timely filing not only saves
          penalties but ensures smooth working capital flow via ITC.
        </p>
        <h4>Your Checklist:</h4>
        <ul className="checklist">
          <li>
            File <strong>GSTR-1</strong> by 11th.
          </li>
          <li>
            Check <strong>GSTR-2B</strong> on 14th.
          </li>
          <li>
            File <strong>GSTR-3B</strong> & Pay Tax by 20th.
          </li>
          <li>Reconcile Purchase Register with GSTR-2B monthly.</li>
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
        <strong>Disclaimer:</strong> GST laws and due dates are subject to
        change. This guide is for informational purposes only. Please consult a
        Chartered Accountant (CA) or tax professional for specific business
        advice.
      </div>

      {/* --- FINAL CTA --- */}
      <section className="final-cta no-print">
        <div className="final-cta-inner">
          <h2>Managing a business?</h2>
          <p>Use our tools to calculate GST liability and plan finances.</p>
          <div className="final-cta-row">
            <Link href="/calculators/gst-calculator" className="primary-cta">
              GST Calculator
            </Link>
            <Link
              href="/calculators/simple-interest-calculator"
              className="secondary-cta"
            >
              Interest Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gst-4" type="leaderboard" />
      </div>
    </article>
  );
}
