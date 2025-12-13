/* eslint-disable @next/next/no-html-link-for-pages */
import { banks } from '@/lib/banks';
import type { Metadata } from 'next';
import EMIClient from '../../emi-calculator/EMIClient';

export function generateStaticParams() {
  return banks.map((bank) => ({
    bank: bank.toLowerCase(),
  }));
}

export const dynamic = 'force-static';

/** ✅ SAFE helper — never throws */
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
    title: `${bankName} EMI Calculator | Fincado`,
    description: `Calculate EMI for ${bankName} home loan, car loan and personal loan instantly.`,
  };
}

export default function BankEMIPage({ params }: { params: { bank?: string } }) {
  const bankName = formatBank(params?.bank);

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h1>{bankName} EMI Calculator</h1>

      <p>
        Use this free {bankName} EMI Calculator to calculate your loan EMI and
        interest instantly.
      </p>

      <div className="ad-box">Ad will appear here</div>

      <EMIClient />

      <section className="article">
        <h2>{bankName} Loan Options</h2>
        <ul>
          <li>{bankName} Home Loan</li>
          <li>{bankName} Car Loan</li>
          <li>{bankName} Personal Loan</li>
        </ul>

        <h2>Related Tools</h2>
        <ul>
          <li>
            <a href="/emi-calculator">EMI Calculator</a>
          </li>
          <li>
            <a href="/sip-calculator">SIP Calculator</a>
          </li>
          <li>
            <a href="/fd-calculator">FD Calculator</a>
          </li>
        </ul>
      </section>

      <div className="ad-box">Ad will appear here</div>
    </main>
  );
}
