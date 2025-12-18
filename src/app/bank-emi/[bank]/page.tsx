import { banks } from '@/lib/banks';
import { notFound } from 'next/navigation';
import EMIClient from '@/app/emi-calculator/EMIClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AdSlot from '@/components/AdSlot';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import type { Metadata } from 'next';

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
    title: `${bank.name} EMI Calculator - Check Home Loan EMI`,
    description: `Calculate your ${bank.name} Home Loan EMI. Current interest rate: ${bank.rate}%. Get instant amortization schedule.`,
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
        ]}
      />

      <CalculatorSchema
        name={`${bank.name} EMI Calculator`}
        description={`Official style EMI calculator for ${bank.name} loans.`}
        url={`https://www.fincado.com/bank-emi/${bank.slug}`}
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
              {bank.name} EMI Calculator
            </h1>
            <ShareTools title={`${bank.name} EMI Calculator`} />
            <p style={{ color: '#64748b', fontSize: '18px', marginTop: 16 }}>
              Plan your loan with <strong>{bank.name}</strong>. The current home
              loan interest rate starts at <strong>{bank.rate}%</strong> p.a.
            </p>
          </header>

          <AdSlot type="leaderboard" />

          <div style={{ marginTop: 32 }}>
            <EMIClient defaultRate={bank.rate} />
          </div>
        </div>

        <aside className="sidebar">
          <div
            style={{
              background: '#f8fafc',
              padding: 20,
              borderRadius: 12,
              border: '1px solid #e2e8f0',
            }}
          >
            <h3 style={{ margin: '0 0 16px 0' }}>Other Banks</h3>
            <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
              {banks
                .filter((b) => b.slug !== bank.slug)
                .map((other) => (
                  <li key={other.slug} style={{ marginBottom: 12 }}>
                    <a
                      href={`/bank-emi/${other.slug}`}
                      style={{ color: '#16a34a', textDecoration: 'none' }}
                    >
                      {other.name} EMI Calculator
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div style={{ marginTop: 24, position: 'sticky', top: 20 }}>
            <AdSlot type="box" />
          </div>
        </aside>
      </div>
    </main>
  );
}
