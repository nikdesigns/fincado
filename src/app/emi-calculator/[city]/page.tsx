/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import EMIClient from '../EMIClient';
import cities from '@/data/cities.json'; // ✅ CORRECT IMPORT (Points to the JSON data)
import AdSlot from '@/components/AdSlot'; // Ensure this is imported

export async function generateStaticParams() {
  // Now 'city' is an object { slug: string, name: string }
  return cities.map((city) => ({
    city: city.slug, // ✅ Works because it comes from the JSON file
  }));
}

export const dynamic = 'force-static';

/** ✅ Helper to format city names */
function formatCity(citySlug?: string): string {
  if (!citySlug) return 'India';

  // Find the city name from our data, or fallback to formatting the slug
  const foundCity = cities.find((c) => c.slug === citySlug);
  return foundCity
    ? foundCity.name
    : decodeURIComponent(citySlug).replace(/-/g, ' ');
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
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
      <h1>EMI Calculator in {cityName}</h1>

      <p>
        Use our free EMI Calculator in {cityName} to calculate your home loan,
        car loan, or personal loan EMI instantly.
      </p>

      <AdSlot type="leaderboard" label="City Top Ad" />

      <EMIClient />

      <section className="article" style={{ marginTop: 40 }}>
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

      <AdSlot type="rectangle" label="City Bottom Ad" />
    </main>
  );
}
