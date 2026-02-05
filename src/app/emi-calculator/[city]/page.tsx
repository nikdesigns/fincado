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
import {
  getCityData,
  cityDetails,
  getStateInfo, // ✅ NEW
  parsePropertyRate, // ✅ NEW
} from '@/lib/localData';
import { banks } from '@/lib/banks'; // ✅ NEW (For internal linking)

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
  Calculator, // ✅ NEW
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
    title: `EMI Calculator in ${cityData.name} After Budget 2026`,
    description: `Calculate Home/Car Loan EMI in ${cityData.name}. Compare rates for properties in ${cityData.areas[0]}, ${cityData.areas[1]} and check ${cityData.authority} norms.`,
    alternates: {
      canonical: `https://fincado.com/emi-calculator/${city}/`,
    },
  };
}

/* ---------------- HELPER FUNCTIONS ---------------- */

function calculateEMI(principal: number, rate: number, years: number) {
  const r = rate / 12 / 100;
  const n = years * 12;
  return Math.round(
    (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1),
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/* ---------------- PAGE COMPONENT ---------------- */

export default async function CityEMIPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = getCityData(city);

  // ✅ NEW: Dynamic Data Calculation
  const stateInfo = getStateInfo(city);
  const rates = parsePropertyRate(cityData.avgPropertyRate);

  const avgHomeSize = 1000; // 1000 sqft standard
  const estimatedHomeCost = rates.avg * avgHomeSize;
  const loanAmount = Math.round(estimatedHomeCost * 0.8); // 80% LTV
  const estimatedEMI = calculateEMI(loanAmount, 8.75, 20); // Avg Rate 8.75%

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
              <ShareTools
                title={`EMI Calculator in ${cityData.name} After Budget 2026`}
              />
            </div>

            <div className="prose prose-slate max-w-none">
              <WikiText
                content={`<p class="text-xl text-slate-500 leading-relaxed">
                  Planning to buy a vehicle or property in <strong>${cityData.name}</strong>? 
                  With property rates averaging <strong>${cityData.avgPropertyRate} per sq. ft.</strong>, 
                  careful financial planning is key. Use this tool to calculate your monthly EMI specifically for the ${cityData.name} market.</p>`}
              />
            </div>
          </header>

          <div className="mb-10 no-print flex justify-center">
            <AdSlot id="city-top-leaderboard" type="leaderboard" />
          </div>

          {/* ✅ NEW: DYNAMIC AFFORDABILITY CARD (The SEO Winner) */}
          <Card className="mb-12 bg-white text-slate-800 border border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-slate-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-6 sm:p-8 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-6 w-6 text-slate-400" />
                <h3 className="text-xl font-bold">
                  Real Cost in {cityData.name}
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Avg. 2BHK Cost ({avgHomeSize} sqft)
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-800">
                    {formatCurrency(estimatedHomeCost)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Based on avg rate: {cityData.avgPropertyRate}/sqft
                  </p>
                </div>
                <div className="bg-lime/10 rounded-xl p-4 border border-lime/50">
                  <p className="text-emerald-500 text-xs uppercase tracking-wider mb-1 font-bold">
                    Est. Monthly EMI
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-800">
                    {formatCurrency(estimatedEMI)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    @ 8.75% Interest (20 Years)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CALCULATOR CARD */}
          <Card className="mb-12 border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Monthly Repayment Estimator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-8 bg-white">
              {/* ✅ UPDATE: Pre-fill calculator with City Values */}
              <EMIClient defaultPrincipal={loanAmount} defaultRate={8.75} />
              <Alert className="mt-6 bg-slate-50/50 border-slate-200 text-slate-600">
                <Info className="h-4 w-4 text-indigo-500 mt-0.5" />
                <AlertDescription className="ml-2 text-sm leading-relaxed">
                  As per Union Budget 2026, there are no changes to EMI
                  calculation rules or home loan repayment methods. EMIs in{' '}
                  {cityData.name} continue to be calculated using standard
                  reducing balance formulas followed by banks.
                </AlertDescription>
              </Alert>

              <Alert className="mt-8 bg-blue-50/50 border-blue-100 rounded-xl">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-xs text-blue-800 leading-relaxed italic">
                  Values Pre-filled: We have set the loan amount to{' '}
                  {formatCurrency(loanAmount)} based on {cityData.name} real
                  estate averages.
                  <strong className="block mt-1 text-rose-700">
                    Indicative estimate based on prevailing market rates after
                    Budget 2026. Actual EMI may vary by bank and borrower
                    profile.
                  </strong>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* ✅ NEW: INTERNAL LINKING GRID (Critical for SEO) */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-sky-600" />
              Bank Offers in {cityData.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {banks.slice(0, 6).map((bank) => (
                <Link key={bank.slug} href={`/bank-emi/${bank.slug}/${city}/`}>
                  <Card className="hover:border-emerald-300 transition-colors cursor-pointer h-full group">
                    <CardContent className="p-4 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-800 group-hover:text-emerald-700">
                          {bank.name}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {bank.rate}%
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">
                        View {cityData.name} Branch Rates &rarr;
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* LIVE RATES (General) */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                National Rate Comparison
              </h3>
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

            {/* ✅ UPDATED: Dynamic State Documents */}
            <Card className="bg-slate-50/50 border-slate-200 rounded-2xl mb-8">
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-sky-600" />
                  Required Documents ({stateInfo.state})
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-emerald-500" /> ID
                      Proof (Aadhaar/PAN)
                    </li>
                    {stateInfo.documents.map((doc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-emerald-500" />{' '}
                        {doc}
                      </li>
                    ))}
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
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-emerald-500" />{' '}
                      {stateInfo.regulator} Registration
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
          <Accordion
            type="single"
            collapsible
            className="w-full mt-6 bg-slate-50 border border-slate-200 rounded-lg"
          >
            <AccordionItem value="budget-2026" className="border-none px-4">
              <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline py-3 text-sm">
                Did Budget 2026 impact EMIs in {cityData.name}?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4">
                <strong className="text-emerald-700">No.</strong> The Union
                Budget 2026 did not announce any changes to standard EMI
                calculation formulas or repayment structures for home loans.
                Your EMI remains based on the bank&apos;s Repo Rate linkage.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
