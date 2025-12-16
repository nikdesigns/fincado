/* eslint-disable @next/next/no-html-link-for-pages */
import { cities } from '@/lib/cities';
import type { Metadata } from 'next';
import EMIClient from '../EMIClient';

export async function generateStaticParams() {
  const categories = Array.from(
    new Set((articles as Article[]).map((a) => a.category))
  );

  return categories.map((category) => ({
    category,
  }));
}

export const dynamic = 'force-static';

/** ✅ helper — NEVER throws */
function formatCity(city?: string): string {
  if (!city) return 'India';
  return decodeURIComponent(city).replace(/-/g, ' ');
}

export function generateMetadata({
  params,
}: {
  params: { city?: string };
}): Metadata {
  const cityName = formatCity(params?.city);

  return {
    title: `EMI Calculator in ${cityName} | Fincado`,
    description: `Free EMI Calculator for users in ${cityName}. Calculate loan EMI, interest and total repayment instantly.`,
  };
}

export default function CityEMIPage({ params }: { params: { city?: string } }) {
  const cityName = formatCity(params?.city);

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h1>EMI Calculator in {cityName}</h1>

      <p>
        Use our free EMI Calculator in {cityName} to calculate your home loan,
        car loan, or personal loan EMI instantly.
      </p>

      <div className="ad-box">Ad will appear here</div>

      <EMIClient />

      <section className="article">
        <h2>Why Use EMI Calculator in {cityName}?</h2>
        <p>
          Many banks and financial institutions in {cityName} offer different
          interest rates. Using a location-based EMI calculator helps you
          estimate EMIs more accurately.
        </p>

        <h2>Loan Options Available in {cityName}</h2>
        <ul>
          <li>Home Loans</li>
          <li>Car Loans</li>
          <li>Personal Loans</li>
        </ul>

        <h2>Related Tools</h2>
        <ul>
          <li>
            <a href="/emi-calculator">Main EMI Calculator</a>
          </li>
          <li>
            <a href="/loans">Loan Calculators</a>
          </li>
          <li>
            <a href="/sip-calculator">SIP Calculator</a>
          </li>
        </ul>
      </section>

      <div className="ad-box">Ad will appear here</div>
    </main>
  );
}
