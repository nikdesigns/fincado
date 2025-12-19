import { banks } from '@/lib/banks';
import { notFound } from 'next/navigation';
import EMIClient from '@/app/emi-calculator/EMIClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AdSlot from '@/components/AdSlot';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCityData, getCompetitors, cityDetails } from '@/lib/localData';

// ✅ 1. PREVENT DUPLICATE CONTENT
export const dynamicParams = false;

// ✅ 2. EXPLICITLY TYPED STATIC PARAMS (Fixes the build error)
export async function generateStaticParams(): Promise<
  { bank: string; city: string }[]
> {
  const params: { bank: string; city: string }[] = [];
  const supportedCities = Object.keys(cityDetails);

  for (const bank of banks) {
    for (const citySlug of supportedCities) {
      // Filter out 'default' key if present
      if (citySlug !== 'default') {
        params.push({ bank: bank.slug, city: citySlug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bank: string; city: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const bank = banks.find((b) => b.slug === resolvedParams.bank);

  // Note: getCityData handles fallback, but since dynamicParams=false,
  // we know the city exists in our list.
  const cityData = getCityData(resolvedParams.city);

  if (!bank) return {};

  return {
    title: `${bank.name} Home Loan in ${cityData.name} 2025: Rates & EMI`,
    description: `Applying for ${bank.name} loan in ${cityData.name}? Check interest rates starting @ ${bank.rate}%, branches near ${cityData.areas[0]}, and processing fees.`,
    alternates: {
      canonical: `https://www.fincado.com/bank-emi/${bank.slug}/${cityData.slug}`,
    },
  };
}

export default async function BankCityPage({
  params,
}: {
  params: Promise<{ bank: string; city: string }>;
}) {
  const resolvedParams = await params;
  const bank = banks.find((b) => b.slug === resolvedParams.bank);

  if (!bank) notFound();

  // 1. GET RICH LOCAL DATA
  const cityData = getCityData(resolvedParams.city);
  const competitorSlugs = getCompetitors(bank.slug);
  const competitorBanks = banks.filter((b) => competitorSlugs.includes(b.slug));

  // 2. DEFINE SCHEMA
  const areaServedSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Home Loan',
    provider: {
      '@type': 'BankOrCreditUnion',
      name: bank.name,
      image: `https://www.fincado.com/banks/${bank.slug}.svg`,
    },
    areaServed: {
      '@type': 'City',
      name: cityData.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${bank.name} Home Loan in ${cityData.name}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Loan Interest Rate',
          },
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: bank.rate,
            priceCurrency: 'INR',
            unitCode: 'ANN',
          },
        },
      ],
    },
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      {/* INJECT SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaServedSchema) }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Banks', url: 'https://www.fincado.com/bank-emi' },
          {
            name: bank.name,
            url: `https://www.fincado.com/bank-emi/${bank.slug}`,
          },
          {
            name: `${cityData.name}`,
            url: `https://www.fincado.com/bank-emi/${bank.slug}/${resolvedParams.city}`,
          },
        ]}
      />

      <CalculatorSchema
        name={`${bank.name} EMI Calculator ${cityData.name}`}
        description={`Calculate EMI for ${bank.name} loans in ${cityData.name} with rates starting at ${bank.rate}%.`}
        url={`https://www.fincado.com/bank-emi/${bank.slug}/${resolvedParams.city}`}
      />

      <div className="layout-grid">
        <div className="main-content">
          <header style={{ marginBottom: 32 }}>
            <span
              className="badge-flagship"
              style={{
                background: '#dbeafe',
                color: '#1e40af',
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
            >
              Local Loan Guide
            </span>
            <h1
              style={{
                fontSize: '28px',
                color: '#0f172a',
                marginBottom: '16px',
                marginTop: '12px',
              }}
            >
              {bank.name} Home Loan in {cityData.name}
            </h1>
            <ShareTools title={`${bank.name} Loan in ${cityData.name}`} />

            {/* UNIQUE INTRO */}
            <p
              style={{
                color: '#64748b',
                fontSize: '18px',
                marginTop: 16,
                lineHeight: 1.6,
              }}
            >
              Are you planning to buy a home in <strong>{cityData.name}</strong>
              , {cityData.description}? Get accurate details on{' '}
              <strong>{bank.name}</strong> home loans, including current
              interest rates starting at <strong>{bank.rate}%</strong>, and
              check eligibility for properties near
              <strong> {cityData.areas.join(', ')}</strong>.
            </p>
          </header>

          {/* ✅ AdSlot with Label (Make sure AdSlot.tsx is updated too!) */}
          <AdSlot type="leaderboard" label="Sponsored Loan Offers" />

          <div style={{ marginTop: 32 }}>
            <EMIClient defaultRate={bank.rate} />
          </div>

          <div className="article" style={{ marginTop: 40 }}>
            <h2>
              Why Choose {bank.name} in {cityData.name}?
            </h2>
            <p>
              With property rates in {cityData.name} averaging around{' '}
              <strong>{cityData.avgPropertyRate} per sq. ft.</strong>, choosing
              the right lender is crucial. {bank.name} is a popular choice for
              residents because of:
            </p>
            <ul>
              <li>
                <strong>Local Processing:</strong> Easy approval for properties
                approved by <strong>{cityData.authority}</strong>.
              </li>
              <li>
                <strong>Wide Network:</strong> Branches easily accessible in
                areas like{' '}
                <strong>
                  {cityData.areas[0]} and {cityData.areas[1]}
                </strong>
                .
              </li>
              <li>
                <strong>Doorstep Service:</strong> Available across{' '}
                {cityData.name} (Pincodes starting with {cityData.pincodeStart}
                ).
              </li>
            </ul>

            {/* UNIQUE COMPARISON TABLE */}
            <h3 style={{ marginTop: '32px' }}>
              Compare {bank.name} vs Others in {cityData.name}
            </h3>
            <p>
              See how {bank.name} stacks up against other lenders active in{' '}
              {cityData.name}:
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
                      Processing Fee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Main Bank */}
                  <tr style={{ background: '#f0fdf4' }}>
                    <td
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #e2e8f0',
                        fontWeight: 'bold',
                      }}
                    >
                      {bank.name}
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      {bank.rate}% Onwards
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      ~0.5%
                    </td>
                  </tr>
                  {/* Dynamic Competitors */}
                  {competitorBanks.map((comp) => (
                    <tr key={comp.slug}>
                      <td
                        style={{
                          padding: '12px',
                          borderBottom: '1px solid #e2e8f0',
                        }}
                      >
                        <Link
                          href={`/bank-emi/${comp.slug}/${resolvedParams.city}`}
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
                        Check Offer
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* UNIQUE FAQ */}
            <h3>Frequently Asked Questions</h3>
            <div className="faqs-accordion">
              <details
                style={{
                  marginBottom: '12px',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                }}
              >
                <summary style={{ fontWeight: 600, cursor: 'pointer' }}>
                  Is {bank.name} loan available for properties in{' '}
                  {cityData.areas[0]}?
                </summary>
                <p style={{ marginTop: '8px', color: '#555' }}>
                  Yes, {bank.name} provides loans for both under-construction
                  and ready-to-move properties in {cityData.areas[0]} and
                  surrounding areas.
                </p>
              </details>
              <details
                style={{
                  marginBottom: '12px',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                }}
              >
                <summary style={{ fontWeight: 600, cursor: 'pointer' }}>
                  Does {bank.name} cover {cityData.authority} approved flats?
                </summary>
                <p style={{ marginTop: '8px', color: '#555' }}>
                  Absolutely. Properties approved by {cityData.authority}{' '}
                  usually enjoy faster processing times with {bank.name}.
                </p>
              </details>
            </div>
          </div>
        </div>

        <aside className="sidebar">
          {/* Enhanced Sidebar */}
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
              Other Banks in {cityData.name}
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
                      href={`/bank-emi/${other.slug}/${resolvedParams.city}`}
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
            <AdSlot type="box" id="sidebar-sticky" />
          </div>
        </aside>
      </div>
    </main>
  );
}
