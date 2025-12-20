import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title:
    'GST Explained 2025: Complete Guide for Individuals & Small Businesses',
  description:
    'Goods and Services Tax (GST) simplified. Learn about GST slabs, Reverse Charge Mechanism (RCM), Input Tax Credit (ITC), and calculation examples for freelancers and business owners.',
  keywords: [
    'GST explained India',
    'GST for small business',
    'GST slabs 2025',
    'Reverse Charge Mechanism RCM',
    'Input Tax Credit explained',
    'GST calculation examples',
    'freelancer GST rules',
    'GST registration limit',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/guides/gst-explained',
  },
  openGraph: {
    title: 'GST Explained: The Ultimate Guide for Indian Businesses',
    description:
      'Confused by GST? We break down slabs, calculations, RCM, and common mistakes in simple language.',
    url: 'https://www.fincado.com/guides/gst-explained',
    type: 'article',
  },
};

export default function GstGuidePage() {
  return (
    <article className="article guide-body">
      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            '@id': 'https://www.fincado.com/guides/gst-explained#article',
            headline:
              'GST Explained for Individuals & Small Businesses: Complete Guide With Examples',
            description:
              'A comprehensive guide to Goods and Services Tax (GST) covering slabs, services, RCM, and calculations.',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.fincado.com/guides/gst-explained',
            },
            image: {
              '@type': 'ImageObject',
              url: 'https://www.fincado.com/images/og/gst-explained.webp',
              width: 1200,
              height: 630,
            },
            author: {
              '@type': 'Organization',
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
            datePublished: '2025-12-21',
            dateModified: '2025-12-21',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.fincado.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Guides',
                item: 'https://www.fincado.com/guides',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'GST Explained',
                item: 'https://www.fincado.com/guides/gst-explained',
              },
            ],
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
                name: 'What is the full form of GST?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'GST stands for Goods and Services Tax. It is a destination-based indirect tax levied on the supply of goods and services.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the 3 types of GST?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The three main components are CGST (Central GST), SGST (State GST), and IGST (Integrated GST for inter-state supplies).',
                },
              },
              {
                '@type': 'Question',
                name: 'What is Reverse Charge Mechanism (RCM)?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Under RCM, the recipient of goods/services is liable to pay GST instead of the supplier. This applies to specific categories like legal services or imports.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do freelancers need to pay GST?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, if their aggregate turnover exceeds the threshold (usually ₹20 Lakhs for services, though limits vary by state). Voluntary registration is also possible.',
                },
              },
            ],
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header
        style={{
          marginBottom: 32,
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: 24,
        }}
      >
        <span className="badge-flagship">Business Guide</span>
        <h1
          itemProp="headline"
          style={{
            fontSize: 'clamp(30px, 4vw, 42px)',
            marginTop: 16,
            lineHeight: 1.2,
            color: 'var(--color-text-main)',
          }}
        >
          GST Explained 2025-26: Guide for Individuals & Businesses
        </h1>
        <div
          style={{
            fontSize: 14,
            color: 'var(--color-text-muted)',
            marginTop: 12,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <span>
            Last Updated: <strong>Dec 21, 2025</strong>
          </span>
          <span>•</span>
          <span>15 Min Read</span>
          <span>•</span>
          <span style={{ color: 'var(--color-brand-green)' }}>
            Expert Reviewed
          </span>
        </div>
      </header>

      {/* --- INTRO --- */}
      <WikiText
        content={`Goods and Services Tax (GST) has transformed how taxes are collected in India, but for many individuals and small businesses it still feels confusing and intimidating. This single-page guide breaks down GST in simple language, using real-world examples, common mistakes, and practical tips so you can understand, comply, and optimize your tax position effectively.`}
      />

      {/* 💰 AD SLOT 1 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gst-1" type="leaderboard" />
      </div>

      {/* --- WHAT IS GST --- */}
      <h2 id="what-is-gst">What Is GST?</h2>
      <WikiText
        content={`Goods and Services Tax (GST) is a destination-based, indirect tax levied on the supply of goods and services in India. It replaced multiple indirect taxes such as VAT, service tax, excise duty, octroi, and entry tax to create a unified tax system across the country. GST is collected at every stage of the supply chain, but thanks to input tax credit (ITC), tax is ultimately borne by the final consumer while businesses mainly act as tax collectors on behalf of the government.`}
      />

      <p>
        From a structure standpoint, GST in India has three main components:
      </p>
      <ul>
        <li>
          <strong>CGST (Central GST)</strong>: Collected by the Central
          Government on intra-state supplies.
        </li>
        <li>
          <strong>SGST/UTGST (State/Union Territory GST)</strong>: Collected by
          the respective State or Union Territory on intra-state supplies.
        </li>
        <li>
          <strong>IGST (Integrated GST)</strong>: Collected by the Central
          Government on inter-state supplies and imports.
        </li>
      </ul>

      {/* Image: GST Structure - Intra vs Inter State */}
      <div className="guide-image-wrap">
        <Image
          src="/images/guides/gst/gst-structure-intra-vs-inter.webp"
          alt="Infographic showing difference between Intra-state (CGST+SGST) and Inter-state (IGST) supply"
          width={1200}
          height={600}
          className="guide-image"
        />
      </div>

      <p>
        For example, if a seller in Maharashtra sells goods worth ₹1,00,000 to a
        buyer in Maharashtra at 18% GST, the tax is split as 9% CGST + 9% SGST.
        For a sale from Maharashtra to Karnataka at 18%, the entire 18% is
        charged as IGST and later apportioned between Centre and State.
      </p>

      <p>For individuals and small businesses, GST impacts:</p>
      <ul>
        <li>
          Freelancers and service providers (designers, consultants, developers,
          trainers).
        </li>
        <li>E-commerce sellers and D2C brands.</li>
        <li>Retail shop owners and small manufacturers.</li>
        <li>Professionals crossing the aggregate turnover threshold.</li>
      </ul>
      <p>
        Understanding whether you need GST registration and how to invoice
        correctly is the first step to staying compliant and avoiding penalties.
      </p>

      <hr className="divider" />

      {/* 💰 AD SLOT 2 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gst-2" type="rectangle" />
      </div>

      {/* --- GST SLABS --- */}
      <h2 id="gst-slabs">GST Slabs in India</h2>
      <p>
        GST is not a flat tax – different goods and services fall under
        different tax slabs. Knowing the slab for your product or service is
        critical for pricing and invoicing.
      </p>

      <h3>Main GST Slabs</h3>
      <p>India currently follows multiple GST rate slabs:</p>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Rate</th>
              <th>Description & Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>0% (Nil Rated)</strong>
              </td>
              <td>
                Essential items such as fresh fruits and vegetables, unbranded
                atta, certain healthcare and educational services, and specific
                essential medicines.
              </td>
            </tr>
            <tr>
              <td>
                <strong>5%</strong>
              </td>
              <td>
                Essential or mass-consumption goods like certain food items,
                life-saving medicines, railways transportation (non-AC), and
                economy travel.
              </td>
            </tr>
            <tr>
              <td>
                <strong>12%</strong>
              </td>
              <td>
                Processed foods, certain business services, some capital goods,
                and mid-range products.
              </td>
            </tr>
            <tr>
              <td>
                <strong>18%</strong>
              </td>
              <td>
                <strong>Most Common Slab:</strong> Professional services, IT
                services, subscriptions, branded food, electronics, and most B2B
                services.
              </td>
            </tr>
            <tr>
              <td>
                <strong>28%</strong>
              </td>
              <td>
                Luxury and sin goods such as high-end cars, consumer durables,
                and tobacco (may attract additional cess).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        On top of these, certain items may attract{' '}
        <strong>compensation cess</strong>, particularly luxury goods and sin
        goods like tobacco, aerated drinks, and high-end cars.
      </p>

      <h3>Intra-state vs Inter-state Slab Application</h3>
      <p>
        The GST slab (5%, 12%, 18%, 28%) remains the same regardless of supply
        being intra-state (within a state) or inter-state (between two states).
        The only difference is:
      </p>
      <ul>
        <li>
          Intra-state: GST is split into <strong>CGST + SGST</strong>.
        </li>
        <li>
          Inter-state: Entire amount is charged as <strong>IGST</strong>.
        </li>
      </ul>
      <p>
        This distinction matters for how you show tax on invoices and how you
        claim input tax credit.
      </p>

      <hr className="divider" />

      {/* 💰 AD SLOT 3 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gst-3" type="banner" />
      </div>

      {/* --- GST ON SERVICES --- */}
      <h2 id="gst-services">GST on Services</h2>
      <p>
        Services are fully integrated into GST, which is a major shift from the
        pre-GST era where &quot;service tax&quot; was separate. Under GST, both
        goods and services are treated similarly with respect to tax slabs,
        invoicing, and ITC rules (with some specific exceptions and conditions).
      </p>

      <h3>Common Services Covered Under GST</h3>
      <p>
        For individuals and small businesses, these services commonly fall under
        GST:
      </p>
      <ul>
        <li>
          Freelancing and consulting (IT, marketing, design, content writing,
          coaching).
        </li>
        <li>Professional services (CA, CS, legal, architectural services).</li>
        <li>Digital marketing, web development, SEO, and app development.</li>
        <li>Training, workshops, webinars (paid).</li>
        <li>Renting of commercial property.</li>
        <li>E-commerce aggregators and marketplace services.</li>
      </ul>
      <p>
        Most professional and IT-related services typically fall under the{' '}
        <strong>18% GST slab</strong>, unless specifically notified differently.
      </p>

      <h3>Place of Supply for Services</h3>
      <p>
        For services, <strong>place of supply</strong> becomes crucial because
        it decides whether CGST+SGST or IGST applies:
      </p>
      <ul>
        <li>
          If the service provider and recipient are in the same state →{' '}
          <strong>CGST + SGST</strong>.
        </li>
        <li>
          If they are in different states → <strong>IGST</strong>.
        </li>
        <li>
          Export of services (with foreign clients and conditions met) can be
          treated as <strong>zero-rated supplies</strong>, enabling
          refund/credit rather than tax payment.
        </li>
      </ul>
      <p>
        If you are a freelancer in Delhi providing services to a client in
        Maharashtra and you are registered under GST, you typically charge IGST
        at the relevant rate (e.g., 18%), and the client can claim input tax
        credit if eligible.
      </p>

      <h3>GST for Unregistered Individuals</h3>
      <p>
        If your total aggregate turnover is below the threshold limit (e.g., ₹20
        lakh / ₹40 lakh / ₹10 lakh depending on category and business type as
        per the current norms applicable), you may not need to register under
        GST. However:
      </p>
      <ul>
        <li>You cannot charge GST on your invoices.</li>
        <li>You also cannot claim input tax credit.</li>
        <li>
          Some categories (like inter-state services, e-commerce operators, or
          notified categories) may require compulsory registration regardless of
          turnover.
        </li>
      </ul>
      <p>
        Always verify current thresholds and notification-based exceptions
        applicable to your category.
      </p>

      <hr className="divider" />

      {/* 💰 AD SLOT 4 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gst-4" type="rectangle" />
      </div>

      {/* --- RCM --- */}
      <h2 id="rcm">Reverse Charge Mechanism (RCM)</h2>
      <p>
        Reverse Charge Mechanism (RCM) under GST flips the typical tax
        responsibility. Normally, the supplier collects GST and pays it to the
        government. Under RCM, the <strong>recipient</strong> of goods or
        services is liable to pay GST directly.
      </p>

      <h3>When Does Reverse Charge Apply?</h3>
      <p>RCM applies in several scenarios, such as:</p>
      <ol>
        <li>
          <strong>Specified Goods/Services Notified by Government</strong>
          <br />
          For certain categories of goods or services (like GTA – Goods
          Transport Agency, legal services by advocates, sponsorship services,
          etc.), GST must be paid by the recipient.
        </li>
        <li>
          <strong>
            Supplies from Unregistered to Registered Person (in Certain Notified
            Cases)
          </strong>
          <br />
          Originally, broad RCM applied to purchases from unregistered
          suppliers, but over time it has been restricted and is now limited to
          specific notified categories. However, small businesses must stay
          alert to any updates in this area.
        </li>
        <li>
          <strong>Import of Services</strong>
          <br />
          When a business in India imports services from a foreign entity (e.g.,
          software subscriptions, consulting), GST under RCM may apply. The
          recipient must pay IGST under RCM and can usually claim ITC if used
          for business.
        </li>
      </ol>

      <h3>How RCM Works in Practice</h3>
      <p>
        Assume a registered business receives legal services from an independent
        advocate:
      </p>
      <ul>
        <li>
          The advocate issues an invoice <strong>without charging GST</strong>{' '}
          (since GST must be paid by the recipient under RCM).
        </li>
        <li>
          The recipient business calculates GST at the applicable rate on the
          invoice value and pays it in cash in the GST return.
        </li>
        <li>
          The same amount can typically be claimed as input tax credit (subject
          to conditions) in the same or subsequent period, making it tax-neutral
          in terms of cash outflow over the long term but affecting working
          capital.
        </li>
      </ul>

      <div className="callout-box info-box">
        <strong>Compliance Tip:</strong> Businesses must track all RCM-eligible
        expenses, self-invoice or record RCM entries, pay tax under RCM via cash
        ledger, and reflect RCM details correctly in GST returns.
      </div>

      <hr className="divider" />

      {/* 💰 AD SLOT 5 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gst-5" type="banner" />
      </div>

      {/* --- CALCULATIONS --- */}
      <h2 id="calculations">GST Calculation Examples</h2>
      <p>
        Understanding GST becomes much easier with concrete calculation
        examples. Below are simple and slightly advanced scenarios for
        individuals and small businesses.
      </p>

      <div className="example-box">
        <h3>
          Example 1: Sale of Goods Within the Same State (Intra-State Supply)
        </h3>
        <p>
          <strong>Scenario:</strong> Product value ₹50,000 | GST rate 18% |
          Supply within state.
        </p>
        <div
          className="calculation-breakdown"
          style={{ background: '#fff', padding: 16, borderRadius: 8 }}
        >
          <p>• GST amount = 18% of ₹50,000 = ₹9,000</p>
          <p>• CGST = 9% of ₹50,000 = ₹4,500</p>
          <p>• SGST = 9% of ₹50,000 = ₹4,500</p>
          <p>
            <strong>• Invoice Value = ₹50,000 + ₹9,000 = ₹59,000</strong>
          </p>
        </div>
        <p style={{ marginTop: 10 }}>
          <strong>On Invoice:</strong> Taxable value ₹50,000 | CGST @ 9%: ₹4,500
          | SGST @ 9%: ₹4,500 | Total: ₹59,000
        </p>
      </div>

      <div className="example-box">
        <h3>Example 2: Inter-State Supply of Services</h3>
        <p>
          <strong>Scenario:</strong> Service value ₹80,000 | GST rate 18% |
          Client in different state.
        </p>
        <div
          className="calculation-breakdown"
          style={{ background: '#fff', padding: 16, borderRadius: 8 }}
        >
          <p>• IGST = 18% of ₹80,000 = ₹14,400</p>
          <p>
            <strong>• Invoice Value = ₹80,000 + ₹14,400 = ₹94,400</strong>
          </p>
        </div>
        <p style={{ marginTop: 10 }}>
          <strong>On Invoice:</strong> Taxable value ₹80,000 | IGST @ 18%:
          ₹14,400 | Total: ₹94,400
        </p>
      </div>

      <div className="example-box">
        <h3>Example 3: Input Tax Credit for a Small Business</h3>

        {/* Image: Input Tax Credit Flow */}
        <div className="guide-image-wrap">
          <Image
            src="/images/guides/gst/gst-input-tax-credit-flow.webp"
            alt="Flowchart explaining how Input Tax Credit reduces final tax liability"
            width={1200}
            height={600}
            className="guide-image"
          />
        </div>

        <p>Suppose in a particular month:</p>
        <ul>
          <li>
            <strong>Purchased goods:</strong> ₹2,00,000 + 18% GST. GST Paid
            (Input Tax) = <strong>₹36,000</strong>.
          </li>
          <li>
            <strong>Sold goods:</strong> ₹3,00,000 + 18% GST. GST Collected
            (Output Tax) = <strong>₹54,000</strong>.
          </li>
        </ul>
        <div
          className="calculation-breakdown"
          style={{ background: '#fff', padding: 16, borderRadius: 8 }}
        >
          <p>
            <strong>Net GST Payable = Output Tax – Input Tax</strong>
          </p>
          <p>
            = ₹54,000 − ₹36,000 = <strong>₹18,000</strong>
          </p>
        </div>
        <p style={{ marginTop: 10 }}>
          You pay ₹18,000 to the government instead of the full ₹54,000 because
          input tax credit allows you to adjust taxes paid on purchases.
        </p>
      </div>

      <div className="example-box">
        <h3>Example 4: Reverse Charge on Imported Services</h3>
        <p>
          <strong>Scenario:</strong> You subscribe to a foreign SaaS tool for
          your business. Subscription value ₹50,000. Applicable GST (IGST under
          RCM) 18% = ₹9,000.
        </p>
        <p>
          <strong>Action:</strong>
        </p>
        <ul>
          <li>Pay ₹9,000 as IGST under RCM.</li>
          <li>
            Claim ₹9,000 as input tax credit (if used for business and
            conditions are met).
          </li>
        </ul>
        <p>
          Net effect over time is generally neutral for tax but impacts cash
          flow and must be reported correctly.
        </p>
      </div>

      <hr className="divider" />

      {/* 💰 AD SLOT 6 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gst-6" type="rectangle" />
      </div>

      {/* --- MISTAKES --- */}
      <h2 id="mistakes">
        Common GST Mistakes Made by Individuals & Small Businesses
      </h2>
      <p>
        Even well-meaning taxpayers often make mistakes under GST due to
        complexity and frequent updates. Knowing the common pitfalls helps you
        avoid penalties, notices, and financial loss.
      </p>

      <div className="rejection-grid">
        <div className="rejection-card">
          <div className="rejection-title">1. Not Registering on Time</div>
          <p>
            Assuming &quot;small business&quot; means exempt. Ignoring aggregate
            turnover from multiple sources or mandatory registration categories
            leads to penalties and interest.
          </p>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">2. Incorrect GST Rate or Codes</div>
          <p>
            Using wrong HSN/SAC codes or GST rates. Undercharging leads to
            liability out of pocket; overcharging leads to disputes.
          </p>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">3. Poor Documentation</div>
          <p>
            Missing GSTINs, incorrect sequence numbers, or not specifying place
            of supply makes invoices ineligible for ITC.
          </p>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">4. No Reconciliation</div>
          <p>
            Filing returns without reconciling GSTR-1 (Sales), GSTR-3B
            (Payment), and Books leads to mismatches and notices.
          </p>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">5. Misusing Input Tax Credit</div>
          <p>
            Claiming ITC on personal expenses or blocked credits (like cars for
            personal use) results in reversal with interest.
          </p>
        </div>

        <div className="rejection-card">
          <div className="rejection-title">6. Ignoring RCM</div>
          <p>
            Forgetting to pay tax on RCM supplies (like legal fees or imports)
            leads to non-compliance and interest.
          </p>
        </div>

        <div className="rejection-card" style={{ gridColumn: '1 / -1' }}>
          <div className="rejection-title">7. Late Filing</div>
          <p>
            Missing due dates for GSTR-3B and GSTR-1 results in late fees,
            interest, and even blocking of e-way bill generation.
          </p>
        </div>
      </div>

      <hr className="divider" />

      {/* 💰 AD SLOT 7 */}
      <div className="ad-spacer no-print">
        <AdSlot id="guide-gst-7" type="banner" />
      </div>

      {/* --- CONCLUSION --- */}
      <h2>Final Thoughts: Make GST Work For You, Not Against You</h2>
      <div className="conclusion-box">
        <p>
          GST is not just a tax burden; when understood and used correctly, it
          becomes a structured framework that can actually benefit compliant
          businesses. With proper registration, correct invoicing, and
          disciplined input tax credit management, you can:
        </p>
        <ul className="checklist">
          <li>✅ Avoid double taxation and cascading taxes.</li>
          <li>✅ Price your products and services more efficiently.</li>
          <li>✅ Compete fairly across states thanks to uniform tax rules.</li>
          <li>
            ✅ Maintain clean records that make funding, audits, and growth
            easier.
          </li>
        </ul>
        <p>
          <strong>For individuals and small businesses, the keys are:</strong>
          <br />
          Learn the basics of GST structure (CGST, SGST, IGST), identify your
          applicable GST slab, understand GST on services, respect reverse
          charge rules, practice accurate calculation, and avoid common
          mistakes.
        </p>
        <p>
          By approaching GST systematically, you transform it from a source of
          confusion and stress into a manageable and predictable part of your
          business operations.
        </p>
      </div>

      {/* --- AUTHOR BOX --- */}
      <section className="author-box">
        <div className="author-row">
          <span className="author-label">Written By</span>
          <span className="author-name">Fincado Research Team</span>
        </div>
        <div className="author-row">
          <span className="author-label">Reviewed By</span>
          <span className="author-name">
            Chartered Accountant (India)
            <span
              className="verified-icon"
              title="Verified Expert"
              style={{
                display: 'inline-flex',
                marginLeft: 6,
                background: 'var(--color-success-bg)',
                color: 'var(--color-brand-green)',
                width: 16,
                height: 16,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                fontSize: 10,
              }}
            >
              ✓
            </span>
          </span>
        </div>
        <p className="author-disclaimer">
          Tax laws are subject to change. Information updated as per GST Council
          Notifications up to 2025. Consult a tax professional for specific
          advice.
        </p>
      </section>

      <p className="legal-disclaimer">
        Disclaimer: This content is for educational purposes only and does not
        constitute professional tax advice.
      </p>

      {/* --- FINAL CTA --- */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <h2>Need to Calculate Tax Quickly?</h2>
          <p>
            Use our GST Calculator to determine inclusive/exclusive tax amounts
            instantly.
          </p>
          <div className="final-cta-row">
            <Link href="/gst-calculator" className="primary-cta">
              Use GST Calculator
            </Link>
            <Link href="/income-tax-calculator" className="secondary-cta">
              Income Tax Tools
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
