/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import Link from 'next/link';
import EMIClient from '../EMIClient';
import cities from '@/data/cities.json';
import AdSlot from '@/components/AdSlot';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import LiveRateTable from '@/components/LiveRateTable';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { getCityData, cityDetails } from '@/lib/localData';

// ✅ 1. Only build pages for cities we have rich data for
export async function generateStaticParams() {
  const supportedCities = Object.keys(cityDetails);
  const params = [];

  for (const slug of supportedCities) {
    if (slug !== 'default') {
      params.push({ city: slug });
    }
  }
  return params;
}

// ✅ 2. Prevent 404 Fallback pages (Kills duplicate content)
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityData(city);

  return {
    title: `EMI Calculator in ${cityData.name} 2025: Check Rates & Eligibility`,
    description: `Calculate Home/Car Loan EMI in ${cityData.name}. Compare rates for properties in ${cityData.areas[0]}, ${cityData.areas[1]} and check ${cityData.authority} norms.`,
    alternates: {
      canonical: `https://www.fincado.com/emi-calculator/${city}`,
    },
  };
}

export default async function CityEMIPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = getCityData(city);

  // 1. FAQ Schema (Dynamic per City)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the average home loan rate in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Home loan rates in ${cityData.name} typically range from 8.50% to 9.50%, depending on the lender and your credit score.`,
        },
      },
      {
        '@type': 'Question',
        name: `Do I need ${cityData.authority} approval for a loan in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, for home loans, banks prefer properties approved by ${cityData.authority} or local municipal bodies to ensure legal compliance.`,
        },
      },
    ],
  };

  // 2. Service Schema (AreaServed)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculation',
    provider: {
      '@type': 'Organization',
      name: 'Fincado',
      url: 'https://www.fincado.com',
      logo: 'https://www.fincado.com/logo.png',
    },
    areaServed: {
      '@type': 'City',
      name: cityData.name,
    },
    description: `Professional EMI calculation and loan planning services for residents of ${
      cityData.name
    }, covering areas like ${cityData.areas.join(', ')}.`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Loan Services in ${cityData.name}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Loan EMI Calculator',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Personal Loan Eligibility Check',
          },
        },
      ],
    },
  };

  return (
    <>
      {/* INJECT SCHEMAS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          {
            name: 'EMI Calculator',
            url: 'https://www.fincado.com/emi-calculator',
          },
          {
            name: cityData.name,
            url: `https://www.fincado.com/emi-calculator/${city}`,
          },
        ]}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Visible Breadcrumbs for User Navigation */}
        <nav
          style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: '#64748b' }}>
            Home
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link
            href="/emi-calculator"
            style={{ textDecoration: 'none', color: '#64748b' }}
          >
            EMI Calculator
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#0f172a', fontWeight: 500 }}>
            {cityData.name}
          </span>
        </nav>

        <header style={{ marginBottom: 40 }}>
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
            {cityData.name} Finance Guide
          </span>
          <h1
            style={{
              fontSize: '32px',
              marginBottom: '16px',
              marginTop: '12px',
              lineHeight: 1.2,
            }}
          >
            EMI Calculator in {cityData.name}
          </h1>
          <p
            style={{
              maxWidth: 750,
              color: 'var(--color-text-muted)',
              fontSize: '18px',
              lineHeight: 1.6,
            }}
          >
            Planning to buy a vehicle or property in{' '}
            <strong>{cityData.name}</strong>? Given that {cityData.name} is{' '}
            {cityData.description}, careful financial planning is key. Use this
            tool to calculate your monthly EMI specifically for the{' '}
            {cityData.name} market.
          </p>
        </header>

        <div className="layout-grid">
          {/* -------- MAIN CONTENT -------- */}
          <div className="main-content">
            {/* ✅ FIXED: Added unique ID for top ad */}
            <AdSlot
              id="city-top-leaderboard"
              type="leaderboard"
              label="City Top Ad"
            />

            <div
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '8px',
                border: '1px solid #e2e8f0',
                marginTop: '24px',
              }}
            >
              <EMIClient />
            </div>

            <div style={{ marginTop: 48 }}>
              <h2>Latest Interest Rates in {cityData.name}</h2>
              <p>
                Compare offerings from major lenders active in{' '}
                {cityData.areas.slice(0, 3).join(', ')}:
              </p>
              <LiveRateTable type="homeLoan" />
            </div>

            <section className="article" style={{ marginTop: 40 }}>
              <h2>Loan Eligibility for {cityData.name} Residents</h2>
              <p>
                To avail a loan in {cityData.name}, banks look at your income
                stability and credit score. Since property rates here average
                around <strong>{cityData.avgPropertyRate} per sq. ft.</strong>,
                lenders may require a higher down payment compared to smaller
                towns.
              </p>

              <h3>Required Documents</h3>
              <ul className="checklist">
                <li>
                  <strong>ID Proof:</strong> Aadhaar / PAN / Passport.
                </li>
                <li>
                  <strong>Address Proof:</strong> Rent Agreement (Registered in{' '}
                  {cityData.name}) or Utility Bill.
                </li>
                <li>
                  <strong>Property Docs:</strong>{' '}
                  <strong>{cityData.authority}</strong> sanctioned plan and Sale
                  Deed.
                </li>
                <li>
                  <strong>Income:</strong> Salary slips or ITR (for
                  self-employed in {cityData.name}).
                </li>
              </ul>

              {/* UNIQUE PRO TIP */}
              <div
                style={{
                  background: '#f0fdf4',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0',
                  marginTop: '32px',
                }}
              >
                <h4 style={{ margin: '0 0 8px 0', color: '#166534' }}>
                  💡 Pro Tip for {cityData.name} Home Buyers
                </h4>
                <p style={{ margin: 0, fontSize: '15px', color: '#14532d' }}>
                  If you are buying a property in areas like{' '}
                  <strong>
                    {cityData.areas[0]} or {cityData.areas[1]}
                  </strong>
                  , check if the project is pre-approved by major banks (APF
                  numbers). This can speed up your loan processing by 7-10 days
                  as legal verification is already done.
                </p>
              </div>
            </section>

            {/* Links to Other Cities */}
            <div
              style={{
                marginTop: 48,
                borderTop: '1px solid #e2e8f0',
                paddingTop: 32,
              }}
            >
              <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>
                Explore Other Cities
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {cities.slice(0, 10).map((c: any) => (
                  <Link
                    key={c.slug}
                    href={`/emi-calculator/${c.slug}`}
                    style={{
                      padding: '8px 16px',
                      background: '#f8fafc',
                      borderRadius: '20px',
                      fontSize: '14px',
                      color: '#334155',
                      textDecoration: 'none',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* ✅ FIXED: Added unique ID for bottom ad */}
            <AdSlot
              id="city-bottom-rectangle"
              type="rectangle"
              label="City Bottom Ad"
            />
          </div>

          {/* -------- SIDEBAR -------- */}
          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="city-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
