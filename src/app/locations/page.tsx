import Link from 'next/link';
import { cityDetails } from '@/lib/localData';
import { MapPin, ArrowRight, Globe, Building2 } from 'lucide-react';
import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AdSlot from '@/components/AdSlot';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Fincado Locations - City-wise Financial Tools & Rates',
  description:
    'Explore home loan rates, EMI calculators, and bank branch networks for 50+ cities across India.',
  alternates: {
    canonical: 'https://fincado.com/locations/',
  },
};

export default function LocationsPage() {
  const cities = Object.values(cityDetails).filter((c) => c.slug !== 'default');

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Locations', url: 'https://fincado.com/locations/' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* --- LEFT COLUMN (Main Content) --- */}
        <div className="lg:col-span-8 min-w-0 my-12">
          <header className="mb-10">
            <Badge
              variant="secondary"
              className="mb-4 bg-lime-50 text-lime-700 hover:bg-lime-100 px-3 py-1 font-bold uppercase tracking-wider"
            >
              Pan-India Network
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Fincado <span className="text-lime-600">Local Editions</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              Access hyper-local financial data. Select your city to find
              updated property rates, bank branch contacts, and specialized EMI
              calculators tailored to your state&apos;s regulations.
            </p>
          </header>

          {/* Top Ad */}
          <div className="mb-12 flex justify-center bg-slate-50 border border-slate-100 rounded-lg p-4">
            <AdSlot
              id="locations-top-leaderboard"
              type="leaderboard"
              label="Sponsored"
            />
          </div>

          {/* Cities Grid */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Globe className="w-6 h-6 text-lime-600" />
              <h2 className="text-2xl font-bold text-slate-900">
                Explore by City
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/emi-calculator/${city.slug}/`}
                  className="group"
                >
                  <Card className="hover:border-lime-400 hover:shadow-md transition-all duration-300 border-slate-200">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-lime-50 transition-colors">
                          <MapPin className="w-5 h-5 text-slate-400 group-hover:text-lime-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 group-hover:text-lime-700">
                            {city.name}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5 group-hover:text-lime-600/80">
                            View Rates & Tools
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-lime-500 -translate-x-2 group-hover:translate-x-0 transition-transform" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Bottom Context */}
          <section className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-600" />
              Why Location Matters in Finance?
            </h3>
            <div className="prose prose-slate text-sm text-slate-600 max-w-none">
              <p>
                Financial products in India are often tied to geography.
                <strong>
                  {' '}
                  Property registration charges (Stamp Duty)
                </strong>{' '}
                vary by state,
                <strong> Legal documentation (RERA)</strong> differs between
                regions (e.g., MahaRERA vs TNRERA), and bank branch networks
                have different processing hubs.
              </p>
              <p className="mt-2">
                Fincado&apos;s Local Editions adjust calculators and guides to
                match the specific norms of your city, ensuring you get accurate
                estimates rather than generic national averages.
              </p>
            </div>
          </section>
        </div>

        {/* --- RIGHT SIDEBAR --- */}
        <aside className="lg:col-span-4 space-y-8 my-12">
          <div className="sticky top-28 space-y-8">
            {/* Sidebar Ad */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex justify-center p-4 min-h-62.5 items-center">
              <AdSlot id="locations-sidebar" type="box" />
            </div>

            {/* Navigation Widget */}
            <FinancialNavWidget />
          </div>
        </aside>
      </div>
    </main>
  );
}
