/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import EMIClient from '../EMIClient';
import cities from '@/data/cities.json';
import AdSlot from '@/components/AdSlot';
import FinancialNavWidget from '@/components/FinancialNavWidget'; // ✅ Import the sidebar widget

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
    title: `EMI Calculator in ${cityName} | Fincado`,
    description: `Free EMI Calculator for users in ${cityName}. Calculate loan EMI, interest and total repayment instantly.`,
  };
}

export default async function CityEMIPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityName = formatCity(city);

  return (
    // ✅ Updated to use 'container' class for consistent width
    <main className="container" style={{ padding: '40px 20px' }}>
      <header style={{ marginBottom: 40 }}>
        <h1>EMI Calculator in {cityName}</h1>
        <p style={{ maxWidth: 700, color: 'var(--color-text-muted)' }}>
          Use our free EMI Calculator in {cityName} to calculate your home loan,
          car loan, or personal loan EMI instantly.
        </p>
      </header>

      {/* ✅ Added Grid Layout to support Sidebar */}
      <div className="layout-grid">
        {/* -------- MAIN CONTENT -------- */}
        <div className="main-content">
          <AdSlot type="leaderboard" label="Top Ad Slot" />

          <EMIClient />

          <section className="article" style={{ marginTop: 40 }}>
            <h2>Why Use EMI Calculator in {cityName}?</h2>
            <p>
              Many banks and financial institutions in {cityName} offer
              different interest rates. Using a location-based EMI calculator
              helps you estimate EMIs more accurately.
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

          <AdSlot type="rectangle" label="Bottom Ad Slot" />
        </div>

        {/* -------- SIDEBAR -------- */}
        <aside className="sidebar no-print">
          <div style={{ marginBottom: 24 }}>
            <AdSlot id="emi-sidebar" type="box" />
          </div>
          <FinancialNavWidget />
        </aside>
      </div>
    </main>
  );
}
