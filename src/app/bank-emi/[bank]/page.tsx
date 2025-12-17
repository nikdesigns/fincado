/* eslint-disable @next/next/no-html-link-for-pages */
import { banks } from '@/lib/banks';
import type { Metadata } from 'next';
import EMIClient from '../../emi-calculator/EMIClient';
import AdSlot from '@/components/AdSlot'; // ✅ Revenue
import FinancialNavWidget from '@/components/FinancialNavWidget'; // ✅ Engagement
import LiveRateTable from '@/components/LiveRateTable';

export function generateStaticParams() {
  return banks.map((bank) => ({
    bank: bank.toLowerCase(),
  }));
}

export const dynamic = 'force-static';

function formatBank(bank?: string): string {
  if (!bank) return 'Bank';
  return decodeURIComponent(bank).toUpperCase();
}

export function generateMetadata({
  params,
}: {
  params: { bank?: string };
}): Metadata {
  const bankName = formatBank(params?.bank);
  return {
    title: `${bankName} EMI Calculator 2025 - Check Interest Rates`,
    description: `Calculate ${bankName} Home Loan, Car Loan & Personal Loan EMI instantly. Compare ${bankName} interest rates and plan your repayment.`,
  };
}

export default function BankEMIPage({ params }: { params: { bank?: string } }) {
  const bankName = formatBank(params?.bank);

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <header style={{ marginBottom: 40 }}>
        <h1>{bankName} EMI Calculator</h1>
        <p style={{ maxWidth: 700, color: 'var(--color-text-muted)' }}>
          Calculate your {bankName} loan EMI instantly. Check the latest
          interest rates and plan your monthly budget efficiently.
        </p>
      </header>

      {/* ✅ Grid Layout for Higher Ad Visibility */}
      <div className="layout-grid">
        {/* Main Content */}
        <div className="main-content">
          <AdSlot type="leaderboard" label={`${bankName} Top Ad`} />

          <EMIClient />

          <div style={{ marginTop: 48 }}>
            <h2>{bankName} Interest Rates 2025</h2>
            <p>
              Compare how {bankName} rates stack up against the market average:
            </p>
            <LiveRateTable />
          </div>

          <section className="article" style={{ marginTop: 40 }}>
            <h2>Why Choose {bankName} for Loans?</h2>
            <ul>
              <li>
                <strong>Transparency:</strong> {bankName} is known for clear
                documentation and no hidden charges.
              </li>
              <li>
                <strong>Digital Process:</strong> Most {bankName} loans can be
                applied for and tracked online.
              </li>
              <li>
                <strong>Pre-approved Offers:</strong> Existing {bankName}{' '}
                customers often get lower interest rates.
              </li>
            </ul>

            <h3>Documents Required by {bankName}</h3>
            <ul>
              <li>KYC Documents (Aadhaar/PAN)</li>
              <li>Last 6 months bank statement</li>
              <li>
                Latest Salary Slips (for salaried) or ITR (for self-employed)
              </li>
            </ul>
          </section>

          <AdSlot type="rectangle" label={`${bankName} Bottom Ad`} />
        </div>

        {/* Sidebar (High Revenue Spot) */}
        <aside className="sidebar no-print">
          <FinancialNavWidget />
          <div style={{ marginTop: 24, position: 'sticky', top: '20px' }}>
            <AdSlot id={`bank-sidebar-${params?.bank}`} type="box" />
          </div>
        </aside>
      </div>
    </main>
  );
}
