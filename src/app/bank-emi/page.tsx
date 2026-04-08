import type { Metadata } from 'next';
import Link from 'next/link';
import { banks } from '@/lib/banks';
import cities from '@/data/cities.json';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import TaxUpdateBanner from '@/components/TaxUpdateBanner';
import AuthorBio from '@/components/AuthorBio';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Building2, MapPin, Percent } from 'lucide-react';

export const dynamic = 'force-static';
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Bank EMI Calculator Comparison – Tax Year 2026-27 | Fincado',
  description:
    'Compare home loan EMI calculators across 21 top banks in India. Check live rate ranges, processing fees, and city-wise EMI calculators for Tax Year 2026-27.',
  alternates: {
    canonical: 'https://fincado.com/bank-emi/',
  },
  openGraph: {
    title: 'Bank EMI Calculator Comparison – Tax Year 2026-27 | Fincado',
    description:
      'Compare live home loan rates from SBI, HDFC, ICICI and 18 more banks. Updated for Tax Year 2026-27.',
    url: 'https://fincado.com/bank-emi/',
    type: 'website',
    siteName: 'Fincado',
  },
};

export default function BankEmiHubPage() {
  const topCities = cities.slice(0, 12);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Banks', url: 'https://fincado.com/bank-emi/' },
        ]}
      />

      <header className="my-10">
        <Badge
          variant="secondary"
          className="mb-4 bg-[#F7FDF1] text-[#577A30] px-3 py-1 font-semibold uppercase tracking-wider"
        >
          Updated for Tax Year 2026-27
        </Badge>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-4">
          Bank EMI Calculator Comparison
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
          Compare home loan EMI calculators across 21 top Indian banks. Check
          live rate ranges, processing fees, and city-wise pages for Tax Year
          2026-27.
        </p>
      </header>

      {/* Bank Grid */}
      <section className="mb-12">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Building2 className="h-5 w-5 text-[#577A30]" />
              Explore by Bank
            </CardTitle>
            <CardDescription>
              Choose a bank to view its dedicated EMI calculator, rate range,
              and city-wise pages.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {banks.map((bank) => (
                <Link
                  key={bank.slug}
                  href={`/bank-emi/${bank.slug}/`}
                  className="group rounded-lg border border-slate-200 bg-white p-4 hover:border-[#B0EC70] hover:bg-[#F7FDF1] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-slate-900 group-hover:text-[#577A30]">
                        {bank.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Indicative rate range
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#577A30] mt-1" />
                  </div>

                  <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#EFFBE2] text-[#577A30] px-2.5 py-1 text-xs font-semibold">
                    <Percent className="h-3.5 w-3.5" />
                    {bank.rate}% – {bank.maxRate}%
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Popular Cities */}
      <section className="mb-12">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MapPin className="h-5 w-5 text-[#577A30]" />
              Popular City-wise Pages
            </CardTitle>
            <CardDescription>
              Jump to city-specific EMI calculators for local affordability and
              branch insights.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {topCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/bank-emi/sbi/${city.slug}/`}
                  className="group"
                >
                  <Button
                    variant="outline"
                    className="w-full justify-center text-slate-700 hover:border-[#B0EC70]"
                  >
                    {city.name}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How to use section */}
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 my-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          How to use this hub
        </h2>
        <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5 mb-6">
          <li>Select a bank to open its dedicated EMI calculator page.</li>
          <li>Compare indicative rate bands before shortlisting lenders.</li>
          <li>
            Open city pages from each bank page for local affordability context.
          </li>
        </ul>
        <TaxUpdateBanner />
        <AuthorBio />
      </section>

      {/* New: Tax Banner + AuthorBio */}
    </main>
  );
}
