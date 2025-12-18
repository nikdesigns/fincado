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

export async function generateStaticParams() {
  const params = [];
  for (const bank of banks) {
    for (const city of cities) {
      params.push({ bank: bank.slug, city: city.slug });
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
  const city = cities.find((c) => c.slug === resolvedParams.city);
  if (!bank || !city) return {};

  return {
    title: `${bank.name} Home Loan in ${city.name} - Interest Rates & EMI Calculator`,
    description: `Calculate ${bank.name} Home Loan EMI in ${city.name}. Check current interest rates in ${city.name} starting at ${bank.rate}%, branch contacts, and apply online.`,
    alternates: {
      canonical: `https://www.fincado.com/bank-emi/${bank.slug}/${city.slug}`,
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
  const city = cities.find((c) => c.slug === resolvedParams.city);

  if (!bank || !city) notFound();

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Banks', url: 'https://www.fincado.com/bank-emi' },
          {
            name: bank.name,
            url: `https://www.fincado.com/bank-emi/${bank.slug}`,
          },
          {
            name: `${city.name}`,
            url: `https://www.fincado.com/bank-emi/${bank.slug}/${city.slug}`,
          },
        ]}
      />

      <CalculatorSchema
        name={`${bank.name} EMI Calculator ${city.name}`}
        description={`Calculate EMI for ${bank.name} loans in ${city.name} with rates starting at ${bank.rate}%.`}
        url={`https://www.fincado.com/bank-emi/${bank.slug}/${city.slug}`}
      />

      <div className="layout-grid">
        <div className="main-content">
          <header style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontSize: '28px',
                color: '#0f172a',
                marginBottom: '16px',
              }}
            >
              {bank.name} Home Loan in {city.name}
            </h1>
            <ShareTools title={`${bank.name} Loan in ${city.name}`} />
            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              Looking for a loan from <strong>{bank.name}</strong> in{' '}
              <strong>{city.name}</strong>? Calculate your exact EMI based on
              local {city.name} rates starting from{' '}
              <strong>{bank.rate}%</strong>.
            </p>
          </header>

          <AdSlot type="leaderboard" label="Sponsored Loan Offers" />

          {/* Reusing your Calculator Component with presets */}
          <div style={{ marginTop: 32 }}>
            <EMIClient defaultRate={bank.rate} />
          </div>

          <div className="article" style={{ marginTop: 40 }}>
            <h2>
              Why Choose {bank.name} in {city.name}?
            </h2>
            <p>
              {bank.name} offers competitive interest rates starting at{' '}
              {bank.rate}% for residents of {city.name}. Whether you are buying
              a flat in {city.name} or constructing a home, their EMI options
              are flexible.
            </p>

            <div style={{ overflowX: 'auto', margin: '24px 0' }}>
              <table className="rate-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Interest Rate</strong>
                    </td>
                    <td>
                      {bank.rate}% - {(bank.rate + 2.5).toFixed(2)}% p.a.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Processing Fee</strong>
                    </td>
                    <td>0.5% to 1% (Often waived in {city.name})</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Max Tenure</strong>
                    </td>
                    <td>30 Years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="sidebar">
          <div
            style={{
              background: '#f8fafc',
              padding: '20px 16px',
              borderRadius: 12,
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                margin: '0 0 12px 0',
                fontSize: '16px',
                color: '#334155',
              }}
            >
              Compare in {city.name}
            </h3>
            <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
              {banks
                .filter((b) => b.slug !== bank.slug)
                .slice(0, 10)
                .map((other) => (
                  <li
                    key={other.slug}
                    style={{
                      marginBottom: 8,
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: 8,
                    }}
                  >
                    {/* ✅ REDUCED FONT SIZE HERE */}
                    <Link
                      href={`/bank-emi/${other.slug}/${city.slug}`}
                      style={{
                        color: '#16a34a',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '13px',
                        display: 'block',
                      }}
                    >
                      {other.name} Loan in {city.name}
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
