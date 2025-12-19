import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCityData, cityDetails } from '@/lib/localData';
import AdSlot from '@/components/AdSlot';

const loanTypes: Record<string, string> = {
  'personal-loan': 'Personal Loan',
  'home-loan': 'Home Loan',
  'car-loan': 'Car Loan',
  'credit-score': 'Credit Score Check',
};

// ✅ 1. RESTRICT TO RICH DATA CITIES ONLY
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { city: string; type: string }[] = [];
  const supportedCities = Object.keys(cityDetails);

  supportedCities.forEach((citySlug) => {
    if (citySlug !== 'default') {
      Object.keys(loanTypes).forEach((type) => {
        params.push({
          city: citySlug,
          type,
        });
      });
    }
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; type: string }>;
}) {
  const { city, type } = await params;
  const cityData = getCityData(city);
  const loanName = loanTypes[type as keyof typeof loanTypes];

  if (!cityData || !loanName) return {};

  return {
    title: `${loanName} in ${cityData.name} 2025: Rates & Agents`,
    description: `Apply for ${loanName} in ${cityData.name}. Best interest rates for residents of ${cityData.areas[0]} & ${cityData.areas[1]}. Check eligibility now.`,
  };
}

export default async function CityLoanPage({
  params,
}: {
  params: Promise<{ city: string; type: string }>;
}) {
  const { city, type } = await params;

  // ✅ 2. USE RICH DATA
  const cityData = getCityData(city);
  const loanName = loanTypes[type as keyof typeof loanTypes];

  if (!cityData || !loanName) return notFound();

  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 20,
        padding: '32px 16px',
      }}
    >
      {/* ✅ MAIN CONTENT */}
      <div style={{ minWidth: 0 }}>
        <h1>
          {loanName} in {cityData.name} – Best Rates 2025
        </h1>

        <p style={{ fontSize: '18px', color: '#555', lineHeight: 1.6 }}>
          Looking for a <strong>{loanName}</strong> in{' '}
          <strong>{cityData.name}</strong>? Since {cityData.name} is{' '}
          {cityData.description}, finding the right lender is crucial. We help
          residents of <strong>{cityData.areas.join(', ')}</strong> compare
          offers instantly.
        </p>

        {/* TOP ADS */}
        <div style={{ margin: '24px 0' }}>
          <AdSlot type="leaderboard" label="Sponsored" />
        </div>

        {/* RICH ARTICLE */}
        <section className="article">
          <h2>
            Why Apply for {loanName} in {cityData.name}?
          </h2>
          <p>
            With property and living costs in {cityData.name} averaging around{' '}
            <strong>{cityData.avgPropertyRate}</strong> (for real estate),
            financial liquidity is essential. Most banks servicing{' '}
            {cityData.name} (Pincodes starting with{' '}
            <strong>{cityData.pincodeStart}</strong>) offer specialized schemes
            for local residents.
          </p>

          <h3>Local Eligibility</h3>
          <ul>
            <li>
              <strong>Residency:</strong> Must be living in {cityData.name} or
              suburbs.
            </li>
            <li>
              <strong>Income:</strong> Stable income source in {cityData.name}.
            </li>
            <li>
              <strong>Documents:</strong> Rent agreement/Utility bill from{' '}
              {cityData.authority} area preferred.
            </li>
          </ul>

          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '8px',
              margin: '24px 0',
              borderLeft: '4px solid #2563eb',
            }}
          >
            <strong>💡 Local Insight:</strong> For {loanName}s in{' '}
            {cityData.name}, banks prefer applicants working in established hubs
            like {cityData.areas[0]}.
          </div>

          <h2>Interest Rates in {cityData.name}</h2>
          <p>
            Current {loanName} interest rates in {cityData.name} range between
            <strong> 8.50% to 16.99% </strong> depending on your profile.
          </p>

          <h3>Related Tools</h3>
          <ul
            style={{
              display: 'flex',
              gap: '12px',
              listStyle: 'none',
              padding: 0,
              flexWrap: 'wrap',
            }}
          >
            <li>
              <Link
                href="/emi-calculator"
                className="btn-secondary"
                style={{
                  textDecoration: 'none',
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '8px 12px',
                  borderRadius: '6px',
                }}
              >
                🔢 EMI Calculator
              </Link>
            </li>
            <li>
              <Link
                href={`/emi-calculator/${city}`}
                className="btn-secondary"
                style={{
                  textDecoration: 'none',
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '8px 12px',
                  borderRadius: '6px',
                }}
              >
                🏠 {cityData.name} EMI
              </Link>
            </li>
          </ul>
        </section>

        {/* BOTTOM ADS */}
        <div style={{ margin: '32px 0' }}>
          <AdSlot type="rectangle" />
        </div>
      </div>

      {/* ✅ SIDEBAR */}
      <aside className="sidebar">
        <div style={{ position: 'sticky', top: '20px' }}>
          <AdSlot id="city-loan-sidebar" type="box" />
        </div>

        <div
          className="side-card"
          style={{
            marginTop: 24,
            padding: '20px',
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Local Resources</h3>
          <ul className="side-links" style={{ paddingLeft: '20px', margin: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <Link href="/home-loan-rates" style={{ color: '#444' }}>
                Current Loan Rates
              </Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <Link href="/credit-score" style={{ color: '#444' }}>
                Check Credit Score
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  );
}
