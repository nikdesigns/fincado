/* src/app/city/[city]/[type]/page.tsx */
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCityData, cityDetails } from '@/lib/localData';
import { banks } from '@/lib/banks'; // ✅ Import Banks
import AdSlot from '@/components/AdSlot';

const loanTypes: Record<string, string> = {
  'personal-loan': 'Personal Loan',
  'home-loan': 'Home Loan',
  'car-loan': 'Car Loan',
  'credit-score': 'Credit Score Check',
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { city: string; type: string }[] = [];
  const supportedCities = Object.keys(cityDetails);

  supportedCities.forEach((citySlug) => {
    if (citySlug !== 'default') {
      Object.keys(loanTypes).forEach((type) => {
        params.push({ city: citySlug, type });
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
    title: `Best ${loanName} in ${cityData.name} 2025: Compare Top Rates`,
    description: `Compare ${loanName} interest rates in ${cityData.name} from top banks. Best offers for residents of ${cityData.areas[0]} & ${cityData.areas[1]}.`,
  };
}

export default async function CityLoanPage({
  params,
}: {
  params: Promise<{ city: string; type: string }>;
}) {
  const { city, type } = await params;
  const cityData = getCityData(city);
  const loanName = loanTypes[type as keyof typeof loanTypes];

  if (!cityData || !loanName) return notFound();

  // ✅ SORT BANKS BY RATE TO SHOW "BEST" OFFERS FIRST
  const topBanks = [...banks].sort((a, b) => a.rate - b.rate).slice(0, 6);

  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 320px', // Responsive check handled in CSS usually
        gap: 20,
        padding: '32px 16px',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h1>
          {loanName} in {cityData.name} – Compare Best Rates (2025)
        </h1>

        <p style={{ fontSize: '18px', color: '#555', lineHeight: 1.6 }}>
          Looking for a <strong>{loanName}</strong> in{' '}
          <strong>{cityData.name}</strong>? We have analyzed offers from top
          lenders for residents of{' '}
          <strong>{cityData.areas.slice(0, 3).join(', ')}</strong>. Compare
          interest rates and apply online.
        </p>

        <div style={{ margin: '24px 0' }}>
          <AdSlot type="leaderboard" label="Sponsored" />
        </div>

        {/* ✅ NEW: DATA-RICH TABLE (SEO GOLD) */}
        <section className="article">
          <h2>
            Top Banks for {loanName} in {cityData.name}
          </h2>
          <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {topBanks.map((bank) => (
                  <tr key={bank.slug}>
                    <td
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      <Link
                        href={`/bank-emi/${bank.slug}/${city}`}
                        style={{
                          color: '#2563eb',
                          fontWeight: 500,
                          textDecoration: 'none',
                        }}
                      >
                        {bank.name}
                      </Link>
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
                      <Link
                        href={`/bank-emi/${bank.slug}/${city}`}
                        style={{
                          fontSize: '14px',
                          color: '#16a34a',
                          fontWeight: 'bold',
                          textDecoration: 'none',
                        }}
                      >
                        Check EMI &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>
            Why Apply for {loanName} in {cityData.name}?
          </h2>
          <p>
            With property costs in {cityData.name} averaging around{' '}
            <strong>{cityData.avgPropertyRate}</strong>, securing a low-interest
            loan is vital. Banks servicing <strong>{cityData.name}</strong>
            (Pincodes starting with {cityData.pincodeStart}) often provide
            doorstep service.
          </p>

          <h3>Local Documents Required</h3>
          <ul>
            <li>
              <strong>ID Proof:</strong> Aadhaar / PAN.
            </li>
            <li>
              <strong>Address Proof:</strong> Utility bill from{' '}
              {cityData.authority} area.
            </li>
            <li>
              <strong>Income:</strong> Salary slips from employers in{' '}
              {cityData.name}.
            </li>
          </ul>

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
                href="/credit-score"
                className="btn-secondary"
                style={{
                  textDecoration: 'none',
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '8px 12px',
                  borderRadius: '6px',
                }}
              >
                📊 Check Credit Score
              </Link>
            </li>
          </ul>
        </section>

        <div style={{ margin: '32px 0' }}>
          <AdSlot type="rectangle" />
        </div>
      </div>

      <aside className="sidebar">
        <div style={{ position: 'sticky', top: '20px' }}>
          <AdSlot id="city-loan-sidebar" type="box" />
        </div>
      </aside>
    </main>
  );
}
