import type { Metadata } from 'next';
import Link from 'next/link';
import EMIClient from '../EMIClient';
import citiesData from '@/data/cities.json';
import AdSlot from '@/components/AdSlot';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import LiveRateTable from '@/components/LiveRateTable';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import WikiText from '@/components/WikiText';
import LegalNote from '@/components/LegalNote';
import ShareTools from '@/components/ShareTools';
import { getCityData, cityDetails } from '@/lib/localData';

// --- UI COMPONENTS ---
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  CheckCircle2,
  Info,
  FileText,
  TrendingUp,
  ChevronRight,
  Building2,
  Lightbulb,
} from 'lucide-react';

/* ---------------- TYPES ---------------- */

interface CityType {
  name: string;
  slug: string;
}

/* ---------------- LOGIC ---------------- */

export async function generateStaticParams() {
  const supportedCities = Object.keys(cityDetails);
  return supportedCities
    .filter((slug) => slug !== 'default')
    .map((slug) => ({ city: slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityData(city);

  return {
    title: `EMI Calculator in ${cityData.name} 2025: Check Rates & Eligibility`,
    description: `Calculate Home/Car Loan EMI in ${cityData.name}. Compare rates for properties in ${cityData.areas[0]}, ${cityData.areas[1]} and check ${cityData.authority} norms.`,
    alternates: {
      canonical: `https://fincado.com/emi-calculator/${city}/`,
    },
  };
}

/* ---------------- PAGE COMPONENT ---------------- */

export default async function CityEMIPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = getCityData(city);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* SCHEMAS */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          {
            name: 'EMI Calculator',
            url: 'https://fincado.com/emi-calculator/',
          },
          {
            name: cityData.name,
            url: `https://fincado.com/emi-calculator/${city}/`,
          },
        ]}
      />

      {/* Visible Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 no-print">
        <Link href="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href="/emi-calculator/"
          className="hover:text-emerald-600 transition-colors"
        >
          EMI Calculator
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-medium">{cityData.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* --- LEFT COLUMN --- */}
        <div className="lg:col-span-8 min-w-0 my-12">
          <header className="mb-10">
            <Badge
              variant="secondary"
              className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1 font-bold uppercase tracking-wider text-[10px]"
            >
              {cityData.name} Local Finance Guide
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              EMI Calculator in{' '}
              <span className="text-emerald-600">{cityData.name}</span>
            </h1>

            <div className="mb-8 pt-4 border-t border-slate-100">
              <ShareTools title={`EMI Calculator in ${cityData.name}`} />
            </div>

            <div className="prose prose-slate max-w-none">
              <WikiText
                content={`<p class="text-xl text-slate-500 leading-relaxed">
                  Planning to buy a vehicle or property in <strong>${cityData.name}</strong>? Given that ${cityData.name} is ${cityData.description}, 
                  careful financial planning is key. Use this tool to calculate your monthly EMI specifically for the ${cityData.name} market.</p>`}
              />
            </div>
          </header>

          <div className="mb-10 no-print flex justify-center">
            <AdSlot id="city-top-leaderboard" type="leaderboard" />
          </div>

          {/* CALCULATOR CARD */}
          <Card className="mb-12 border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Monthly Repayment Estimator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-8 bg-white">
              <EMIClient />

              <Alert className="mt-8 bg-blue-50/50 border-blue-100 rounded-xl">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-xs text-blue-800 leading-relaxed italic">
                  <strong>Important:</strong> Interest rates in {cityData.name}{' '}
                  typically range from 8.50% to 9.50% depending on the lender
                  and your credit score.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* RATES SECTION */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-sky-600" />
              Latest Interest Rates in {cityData.name}
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 mb-6">
              <p>
                Compare offerings from major lenders active in areas like{' '}
                {cityData.areas.slice(0, 3).join(', ')}:
              </p>
            </div>
            <LiveRateTable type="homeLoan" />
          </section>

          {/* ELIGIBILITY & DOCUMENTATION */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              Loan Eligibility in {cityData.name}
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 mb-8">
              <p>
                To avail a loan in {cityData.name}, banks look at your income
                stability and credit score. Since property rates average around{' '}
                <strong>{cityData.avgPropertyRate} per sq. ft.</strong>,
                planning your down payment is crucial.
              </p>
            </div>

            <Card className="bg-slate-50/50 border-slate-200 rounded-2xl mb-8">
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-sky-600" /> Required
                  Documents
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-emerald-500" /> ID
                      Proof (Aadhaar/PAN)
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-emerald-500" />{' '}
                      Address Proof
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-emerald-500" />{' '}
                      {cityData.authority} Sanctioned Plan
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-emerald-500" />{' '}
                      Salary slips or ITR
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-emerald-900">
                  Pro Tip for {cityData.name} Buyers
                </h4>
              </div>
              <p className="text-sm text-emerald-800 leading-relaxed">
                Buying in <strong>{cityData.areas[0]}</strong>? Look for
                projects with <strong>APF numbers</strong>. These are
                pre-verified by banks, which can speed up your loan processing
                significantly.
              </p>
            </div>
          </section>

          {/* CITY LINKS */}
          <section className="mb-12 border-t border-slate-100 pt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              Explore Other Major Cities
            </h3>
            <div className="flex flex-wrap gap-3">
              {citiesData.slice(0, 12).map((c: CityType) => (
                <Link key={c.slug} href={`/emi-calculator/${c.slug}/`}>
                  <Button
                    variant="outline"
                    className="rounded-full bg-white hover:border-emerald-500 hover:text-emerald-700 transition-all text-xs h-9"
                  >
                    {c.name}
                  </Button>
                </Link>
              ))}
            </div>
          </section>

          <LegalNote />
        </div>

        {/* --- SIDEBAR --- */}
        <aside className="lg:col-span-4 space-y-8 my-12">
          <div className="sticky top-28 space-y-8 no-print">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex justify-center p-4 min-h-62.5 items-center">
              <AdSlot id="city-sidebar" type="box" />
            </div>

            <FinancialNavWidget />
          </div>
        </aside>
      </div>
    </main>
  );
}
