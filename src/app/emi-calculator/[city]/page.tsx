/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import EMIClient from '../EMIClient';
import cities from '@/data/cities.json';
import AdSlot from '@/components/AdSlot';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added Rate Table
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'; // ✅ Added Breadcrumbs
import WikiText from '@/components/WikiText'; // ✅ Added for better formatting
import Link from 'next/link';

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export const dynamic = 'force-static';

function formatCity(citySlug?: string): string {
  if (!citySlug) return 'India';
  const foundCity = cities.find((c) => c.slug === citySlug);
  return foundCity
    ? foundCity.name
    : decodeURIComponent(citySlug).replace(/-/g, ' ');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityName = formatCity(city);

  return {
    title: `EMI Calculator in ${cityName} - Check Loan Rates 2025`,
    description: `Calculate home, car, and personal loan EMI in ${cityName}. Compare interest rates from top banks in ${cityName} and view documents required.`,
  };
}

export default async function CityEMIPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityName = formatCity(city);

  // ✅ SEO: Dynamic FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the home loan interest rate in ${cityName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Home loan interest rates in ${cityName} typically start from 8.35% p.a., depending on your credit score and the bank.`,
        },
      },
      {
        '@type': 'Question',
        name: `How can I reduce my loan EMI in ${cityName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can reduce your EMI by making a higher down payment, choosing a longer tenure, or negotiating for a lower interest rate based on your credit score.',
        },
      },
    ],
  };

  return (
    <>
      {/* ✅ 1. Inject JSON-LD Schema for FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ✅ 2. Add Breadcrumb Structure for Google */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          {
            name: 'EMI Calculator',
            url: 'https://www.fincado.com/emi-calculator',
          },
          {
            name: cityName,
            url: `https://www.fincado.com/emi-calculator/${city}`,
          },
        ]}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 40 }}>
          <h1>EMI Calculator in {cityName}</h1>
          <p style={{ maxWidth: 700, color: 'var(--color-text-muted)' }}>
            Calculate your Home, Car, or Personal Loan EMI instantly. Compare
            interest rates from top banks in {cityName} and plan your repayment.
          </p>
        </header>

        <div className="layout-grid">
          {/* -------- MAIN CONTENT -------- */}
          <div className="main-content">
            <AdSlot type="leaderboard" label="City Top Ad" />

            <EMIClient />

            {/* ✅ 3. Added Live Rate Table to provide value */}
            <div style={{ marginTop: 48 }}>
              <h2>Current Home Loan Rates in {cityName}</h2>
              <p>
                Before applying, compare the latest interest rates offered by
                major banks to ensure you get the best deal.
              </p>
              <LiveRateTable type="homeLoan" />
            </div>

            <section className="article" style={{ marginTop: 40 }}>
              <h2>Why Use an EMI Calculator in {cityName}?</h2>
              <WikiText
                content={`
                <p>
                  Buying a home or car in <strong>${cityName}</strong> requires careful financial planning. 
                  Property prices and living costs vary by location, making it essential to know your exact monthly outflow.
                </p>
                <p>
                  This tool helps you:
                </p>
                <ul>
                  <li><strong>Budget accurately:</strong> Know exactly how much to set aside from your salary.</li>
                  <li><strong>Compare banks:</strong> See which lender in ${cityName} offers the best deal.</li>
                  <li><strong>Plan prepayments:</strong> Visualize how extra payments reduce your interest burden.</li>
                </ul>
              `}
              />

              <h3>Documents Required for Loans in {cityName}</h3>
              <p>Most banks in {cityName} will ask for the following:</p>
              <ul>
                <li>
                  <strong>Identity Proof:</strong> Aadhaar Card, PAN Card,
                  Passport.
                </li>
                <li>
                  <strong>Address Proof:</strong> Utility bills or Rent
                  agreement in {cityName}.
                </li>
                <li>
                  <strong>Income Proof:</strong> Last 3-6 months&apos; salary
                  slips and bank statements.
                </li>
                <li>
                  <strong>Property Documents:</strong> For home loans, past
                  ownership deeds and municipal approval plans.
                </li>
              </ul>

              {/* ✅ 4. Added "Pro Tip" Box for Expertise */}
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
                  💡 Pro Tip for {cityName} Residents
                </h4>
                <p style={{ margin: 0, fontSize: '15px', color: '#14532d' }}>
                  Many banks offer <strong>0.05% lower interest rates</strong>{' '}
                  for women borrowers. If you are buying a property in{' '}
                  {cityName}, consider co-applying with a female family member
                  to save on interest over the long term.
                </p>
              </div>
            </section>
            {/* ✅ NEW: Nearby/Popular Cities Section */}
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
                {[
                  'Mumbai',
                  'Delhi',
                  'Bangalore',
                  'Pune',
                  'Hyderabad',
                  'Chennai',
                  'Ahmedabad',
                  'Jaipur',
                ].map((city) => (
                  <Link
                    key={city}
                    href={`/emi-calculator/${city.toLowerCase()}`}
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
                    {city}
                  </Link>
                ))}
                <Link
                  href="/emi-calculator"
                  style={{
                    padding: '8px 16px',
                    background: '#fff',
                    borderRadius: '20px',
                    fontSize: '14px',
                    color: 'var(--color-brand-green)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    border: '1px solid var(--color-brand-green)',
                  }}
                >
                  View All Cities →
                </Link>
              </div>
            </div>

            <AdSlot type="rectangle" label="City Bottom Ad" />
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
