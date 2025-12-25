import { banks } from '@/lib/banks';
import cities from '@/data/cities.json';
import { notFound } from 'next/navigation';
import EMIClient from '@/app/emi-calculator/EMIClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AdSlot from '@/components/AdSlot';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCompetitors } from '@/lib/localData';

export async function generateStaticParams() {
  return banks.map((bank) => ({ bank: bank.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bank: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const bank = banks.find((b) => b.slug === resolvedParams.bank);
  if (!bank) return {};

  return {
    title: `${bank.name} EMI Calculator 2025: Check Home Loan Rates`,
    description: `Calculate ${bank.name} Home Loan EMI instantly. Current interest rates start at ${bank.rate}%. Compare repayment schedules and processing fees.`,
    alternates: {
      canonical: `https://www.fincado.com/bank-emi/${bank.slug}`,
    },
  };
}

export default async function BankPage({
  params,
}: {
  params: Promise<{ bank: string }>;
}) {
  const resolvedParams = await params;
  const bank = banks.find((b) => b.slug === resolvedParams.bank);

  if (!bank) notFound();

  // 1. Get Competitor Data for Comparison Table
  const competitorSlugs = getCompetitors(bank.slug);
  const competitorBanks = banks.filter((b) => competitorSlugs.includes(b.slug));

  // 2. Select Top Cities for Internal Linking (Boosts SEO for city pages)
  const topCities = cities.slice(0, 12);

  // 3. Dynamic Schema for FAQs
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the current home loan interest rate of ${bank.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${bank.name} home loan interest rates currently start from ${bank.rate}% per annum for eligible borrowers.`,
        },
      },
      {
        '@type': 'Question',
        name: `How can I reduce my ${bank.name} EMI?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can reduce your EMI by making a partial prepayment, opting for a longer tenure, or negotiating a lower interest rate if your credit score has improved.',
        },
      },
    ],
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Banks', url: 'https://www.fincado.com/bank-emi' },
          {
            name: bank.name,
            url: `https://www.fincado.com/bank-emi/${bank.slug}`,
          },
        ]}
      />
      <CalculatorSchema
        name={`${bank.name} EMI Calculator`}
        description={`Official style EMI calculator for ${bank.name} loans with amortization schedule.`}
        url={`https://www.fincado.com/bank-emi/${bank.slug}`}
      />

      <div className="layout-grid">
        <div className="main-content">
          <header style={{ marginBottom: 32 }}>
            <span
              className="badge-flagship"
              style={{
                background: '#e0f2fe',
                color: '#0284c7',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              Updated for 2025
            </span>
            <h1
              style={{
                fontSize: 'clamp(24px, 4vw, 32px)',
                color: '#0f172a',
                marginTop: '12px',
                marginBottom: '16px',
                lineHeight: 1.2,
              }}
            >
              {bank.name} EMI Calculator
            </h1>
            <ShareTools title={`${bank.name} EMI Calculator`} />
            <p
              style={{
                color: '#475569',
                fontSize: '18px',
                marginTop: 16,
                lineHeight: 1.6,
              }}
            >
              Planning to take a loan from <strong>{bank.name}</strong>? Use
              this tool to calculate your monthly EMI instantly. With interest
              rates starting at <strong>{bank.rate}%</strong>, {bank.name} is a
              top choice for borrowers looking for flexible repayment options.
            </p>
          </header>

          {/* ✅ FIXED: Added unique ID */}
          <AdSlot
            id="bank-top-leaderboard"
            type="leaderboard"
            label="Bank Top Ad"
          />

          {/* CALCULATOR SECTION */}
          <div
            style={{
              marginTop: 32,
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '4px', // Wrapper for calculator
            }}
          >
            <EMIClient defaultRate={bank.rate} />
          </div>

          {/* CONTENT SECTION 1: Features */}
          <section className="article" style={{ marginTop: 48 }}>
            <h2>Why Choose {bank.name} for Your Home Loan?</h2>
            <p>
              {bank.name} is one of the leading lenders in India, offering
              competitive rates and transparent processing. Key benefits
              include:
            </p>
            <ul className="checklist">
              <li>
                <strong>Low Interest Rates:</strong> Starting from {bank.rate}%
                p.a. based on CIBIL score.
              </li>
              <li>
                <strong>Long Tenure:</strong> Repayment options up to 30 years
                to reduce monthly burden.
              </li>
              <li>
                <strong>No Hidden Charges:</strong> Transparent processing fees
                (typically 0.5% - 1%).
              </li>
              <li>
                <strong>Digital Sanction:</strong> Quick online approval
                capability for pre-approved customers.
              </li>
            </ul>

            {/* CONTENT SECTION 2: Comparison Table */}
            <h3 style={{ marginTop: 40 }}>
              Compare {bank.name} vs Other Banks
            </h3>
            <p>
              See how {bank.name} stacks up against its main competitors in the
              market:
            </p>
            <div style={{ overflowX: 'auto', margin: '24px 0' }}>
              <table
                className="rate-table"
                style={{ width: '100%', borderCollapse: 'collapse' }}
              >
                <thead>
                  <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                    <th
                      style={{
                        padding: '12px',
                        borderBottom: '2px solid #e2e8f0',
                      }}
                    >
                      Bank
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        borderBottom: '2px solid #e2e8f0',
                      }}
                    >
                      Interest Rate
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        borderBottom: '2px solid #e2e8f0',
                      }}
                    >
                      Max Tenure
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Current Bank Row */}
                  <tr style={{ background: '#f0fdf4' }}>
                    <td
                      style={{
                        padding: '12px',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      {bank.name}
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      {bank.rate}% - {(bank.rate + 2).toFixed(2)}%
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      30 Years
                    </td>
                  </tr>
                  {/* Competitor Rows */}
                  {competitorBanks.map((comp) => (
                    <tr key={comp.slug}>
                      <td
                        style={{
                          padding: '12px',
                          borderBottom: '1px solid #e2e8f0',
                        }}
                      >
                        <Link
                          href={`/bank-emi/${comp.slug}`}
                          style={{ color: '#2563eb', textDecoration: 'none' }}
                        >
                          {comp.name}
                        </Link>
                      </td>
                      <td
                        style={{
                          padding: '12px',
                          borderBottom: '1px solid #e2e8f0',
                        }}
                      >
                        {comp.rate}% Onwards
                      </td>
                      <td
                        style={{
                          padding: '12px',
                          borderBottom: '1px solid #e2e8f0',
                        }}
                      >
                        30 Years
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              *Interest rates are subject to change and depend on credit
              profile.
            </p>
          </section>

          {/* ✅ FIXED: Added unique ID */}
          <AdSlot
            id="bank-mid-rectangle"
            type="rectangle"
            label="Bank Mid Ad"
          />

          {/* CONTENT SECTION 3: Localized Links (Hub & Spoke Strategy) */}
          <div
            style={{
              marginTop: 48,
              padding: '24px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3 style={{ marginTop: 0, fontSize: '20px' }}>
              Calculate {bank.name} EMI for Your City
            </h3>
            <p style={{ fontSize: '15px', color: '#475569' }}>
              Interest rates and property norms can vary by location. Select
              your city to get precise details:
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '12px',
                marginTop: '16px',
              }}
            >
              {topCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/bank-emi/${bank.slug}/${city.slug}`}
                  style={{
                    display: 'block',
                    padding: '8px 12px',
                    background: '#fff',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    color: '#334155',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontWeight: 500,
                  }}
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTENT SECTION 4: FAQs */}
          <section style={{ marginTop: 40 }}>
            <h3>Frequently Asked Questions</h3>
            <div className="faqs-accordion">
              <details
                style={{
                  marginBottom: '12px',
                  padding: '16px',
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              >
                <summary
                  style={{
                    fontWeight: 600,
                    cursor: 'pointer',
                    listStyle: 'none',
                  }}
                >
                  📉 What is the current interest rate for {bank.name}?
                </summary>
                <p
                  style={{
                    marginTop: '12px',
                    color: '#475569',
                    lineHeight: 1.6,
                  }}
                >
                  As of 2025, {bank.name} offers home loan interest rates
                  starting from <strong>{bank.rate}% p.a.</strong> for salaried
                  employees with a credit score above 750. Rates may be slightly
                  higher for self-employed applicants.
                </p>
              </details>
              <details
                style={{
                  marginBottom: '12px',
                  padding: '16px',
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              >
                <summary
                  style={{
                    fontWeight: 600,
                    cursor: 'pointer',
                    listStyle: 'none',
                  }}
                >
                  📄 What documents are required for {bank.name} loan?
                </summary>
                <p
                  style={{
                    marginTop: '12px',
                    color: '#475569',
                    lineHeight: 1.6,
                  }}
                >
                  Standard documents include KYC (Aadhaar/PAN), Income Proof
                  (Salary Slips/ITR), Bank Statements (last 6 months), and
                  Property Documents (Agreement to Sell, Chain Deeds).
                </p>
              </details>
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: 12,
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            }}
          >
            <h3
              style={{
                margin: '0 0 16px 0',
                fontSize: '18px',
                color: '#1e293b',
              }}
            >
              Compare with Others
            </h3>
            <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
              {banks
                .filter((b) => b.slug !== bank.slug)
                .slice(0, 8)
                .map((other) => (
                  <li
                    key={other.slug}
                    style={{
                      marginBottom: 10,
                      paddingBottom: 10,
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <Link
                      href={`/bank-emi/${other.slug}`}
                      style={{
                        color: '#475569',
                        textDecoration: 'none',
                        fontSize: '14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{other.name}</span>
                      <span style={{ color: '#16a34a', fontWeight: 600 }}>
                        {other.rate}%
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div style={{ marginTop: 24, position: 'sticky', top: 20 }}>
            {/* Sidebar already had ID, kept it */}
            <AdSlot type="box" id="bank-sidebar" />
          </div>
        </aside>
      </div>
    </main>
  );
}
