import { banks } from '@/lib/banks';
import { notFound } from 'next/navigation';
import EMIClient from '@/app/emi-calculator/EMIClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AdSlot from '@/components/AdSlot';
import ShareTools from '@/components/ShareTools';
import WikiText from '@/components/WikiText';
import LegalNote from '@/components/LegalNote';
import AuthorBio from '@/components/AuthorBio';
import BankSelector from '@/components/BankSelector';
import StickyCompareFooter from '@/components/StickyCompareFooter';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getCityData,
  getCompetitors,
  cityDetails,
  getStateInfo, // ✅ NEW: For State-specific text
  parsePropertyRate, // ✅ NEW: For Real Math
} from '@/lib/localData';

// --- UI COMPONENTS ---
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  TrendingUp,
  HelpCircle,
  ArrowRight,
  Percent,
  ShieldCheck,
  FileText,
  Home,
  Info,
  GitCompare,
  Calculator, // ✅ NEW Icon
} from 'lucide-react';

/* ---------------- LOGIC ---------------- */

export const dynamicParams = false;

export async function generateStaticParams(): Promise<
  { bank: string; city: string }[]
> {
  const params: { bank: string; city: string }[] = [];
  const supportedCities = Object.keys(cityDetails);

  for (const bank of banks) {
    for (const citySlug of supportedCities) {
      if (citySlug !== 'default') {
        params.push({ bank: bank.slug, city: citySlug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bank: string; city: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const bank = banks.find((b) => b.slug === resolvedParams.bank);
  const cityData = getCityData(resolvedParams.city);

  if (!bank) return {};

  return {
    title: `${bank.name} Home Loan in ${cityData.name} 2026: Rates & EMI`,
    description: `Applying for ${bank.name} loan in ${cityData.name}? Check interest rates starting @ ${bank.rate}%, branches near ${cityData.areas[0]}, and ${cityData.authority} approval norms.`,
    alternates: {
      canonical: `https://fincado.com/bank-emi/${bank.slug}/${cityData.slug}/`,
    },
  };
}

/* ---------------- HELPER FUNCTIONS (For Unique Content) ---------------- */

function calculateEMI(principal: number, rate: number, years: number) {
  const r = rate / 12 / 100;
  const n = years * 12;
  return Math.round(
    (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
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

export default async function BankCityPage({
  params,
}: {
  params: Promise<{ bank: string; city: string }>;
}) {
  const resolvedParams = await params;
  const bank = banks.find((b) => b.slug === resolvedParams.bank);

  if (!bank) notFound();

  const cityData = getCityData(resolvedParams.city);
  const competitorSlugs = getCompetitors(bank.slug);
  const competitorBanks = banks.filter((b) => competitorSlugs.includes(b.slug));

  // ✅ NEW: Fetch Dynamic Data for Content Injection
  const stateInfo = getStateInfo(resolvedParams.city);
  const rates = parsePropertyRate(cityData.avgPropertyRate);

  // Real Estate Math
  const avgHomeSize = 1000; // 1000 sqft standard
  const estimatedHomeCost = rates.avg * avgHomeSize;
  const loanAmount = Math.round(estimatedHomeCost * 0.8); // 80% LTV
  const estimatedEMI = calculateEMI(loanAmount, bank.rate, 20);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Banks', url: 'https://fincado.com/bank-emi/' },
          {
            name: bank.name,
            url: `https://fincado.com/bank-emi/${bank.slug}/`,
          },
          {
            name: cityData.name,
            url: `https://fincado.com/bank-emi/${bank.slug}/${resolvedParams.city}/`,
          }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* --- LEFT COLUMN --- */}
        <div className="lg:col-span-8 min-w-0 my-12">
          {/* HEADER */}
          <header className="my-10">
            <Badge
              variant="secondary"
              className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1 font-bold uppercase tracking-wider"
            >
              2026 {cityData.name} Edition
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {bank.name} Home Loan in {cityData.name}
            </h1>

            <div className="mb-6">
              <ShareTools title={`${bank.name} Loan in ${cityData.name}`} />
            </div>

            <div className="prose prose-slate max-w-none">
              <WikiText
                content={`<p class="text-lg text-slate-600 leading-relaxed">
                  Securing a property in <strong>${
                    cityData.name
                  }</strong> requires a lender with strong local presence. 
                  <strong>${
                    bank.name
                  }</strong> offers tailored home loan solutions with interest rates starting at 
                  <strong class="text-emerald-600">${
                    bank.rate
                  }%</strong>, covering key residential hubs including 
                  <strong> ${cityData.areas.join(', ')}</strong>. 
                  Properties approved by <strong>${
                    cityData.authority
                  }</strong> often get faster sanctioning.</p>`}
              />
            </div>
          </header>

          <div className="mb-10 bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-center no-print">
            <AdSlot
              id="bank-city-top-ad"
              type="leaderboard"
              label="Sponsored"
            />
          </div>

          {/* ✅ NEW: DYNAMIC AFFORDABILITY CARD (Fixes Thin Content) */}
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
                    Est. EMI with {bank.name}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-800">
                    {formatCurrency(estimatedEMI)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    @ {bank.rate}% for 20 Years (80% Loan)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CALCULATOR SECTION */}
          <Card className="mb-12 border-slate-200 shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <Percent className="h-5 w-5 text-emerald-600" />
                EMI Estimator for {cityData.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 bg-white">
              <EMIClient
                defaultRate={bank.rate}
                defaultPrincipal={loanAmount}
                defaultTenure={20}
              />

              <Alert className="mt-6 bg-blue-50/50 border-blue-100 rounded-xl">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-xs text-blue-800 leading-relaxed italic">
                  <strong>Note:</strong> Interest rates vary based on the
                  specific property location in {cityData.name} and your credit
                  profile.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* CROSS-LINKING COMPARISON SELECTOR */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <GitCompare className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-slate-900">
                Compare {bank.name} vs Others in {cityData.name}
              </h2>
            </div>
            <BankSelector />
          </section>

          {/* LOCAL MARKET INSIGHTS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Home className="h-6 w-6 text-emerald-600" />
              {cityData.name} Real Estate Insights
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-5">
                  <h4 className="font-bold text-slate-900 text-sm mb-2 uppercase tracking-wide">
                    Avg. Property Price
                  </h4>
                  <p className="text-2xl font-black text-emerald-700">
                    {cityData.avgPropertyRate}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Per square foot in {cityData.name}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-5">
                  <h4 className="font-bold text-slate-900 text-sm mb-2 uppercase tracking-wide">
                    Approved Authority
                  </h4>
                  <p className="text-xl font-bold text-slate-800">
                    {cityData.authority}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Primary planning body for approvals
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ✅ UPDATED: DOCUMENTATION SECTION (State Specific) */}
          <section className="mb-12 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-sky-600" />
              Documents for {stateInfo.state}
            </h3>
            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed">
              <p>
                When applying for a loan at {bank.name} for a property in{' '}
                <strong>{cityData.name}</strong>, you must adhere to{' '}
                <strong>{stateInfo.regulator}</strong> norms. Ensure you have
                these documents:
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">
                {stateInfo.documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                    {doc}
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                  {cityData.authority} Approved Plan
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                  Latest Property Tax Receipt
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                  6 Months Bank Statement
                </li>
              </ul>
            </div>
          </section>

          {/* COMPARISON TABLE */}
          <section className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              ROI Comparison in {cityData.name}
            </h3>
            <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-bold text-slate-700">
                      Lender
                    </TableHead>
                    <TableHead className="font-bold text-slate-700">
                      Interest Rate
                    </TableHead>
                    <TableHead className="font-bold text-slate-700">
                      Network
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-emerald-50/60 hover:bg-emerald-50">
                    <TableCell className="font-bold text-slate-900">
                      {bank.name}
                    </TableCell>
                    <TableCell className="font-bold text-emerald-700">
                      {bank.rate}% Onwards
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      Pan-{cityData.name}
                    </TableCell>
                  </TableRow>
                  {competitorBanks.map((comp) => (
                    <TableRow key={comp.slug}>
                      <TableCell>
                        <Link
                          // ✅ VERIFIED: Has trailing slash. Good.
                          href={`/bank-emi/${comp.slug}/${resolvedParams.city}/`}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          {comp.name}
                        </Link>
                      </TableCell>
                      <TableCell>{comp.rate}% Onwards</TableCell>
                      <TableCell className="text-xs text-slate-400">
                        Available
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* FAQS */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-amber-500" />
              {cityData.name} Loan FAQs
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="item-1"
                className="bg-white border rounded-lg mb-3 px-4"
              >
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  📍 Where are {bank.name} branches in {cityData.name}?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                  {bank.name} has major processing hubs near {cityData.areas[0]}{' '}
                  and {cityData.areas[1]} to assist with property valuation and
                  legal checks.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className="bg-white border rounded-lg mb-3 px-4"
              >
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  🏢 Does {bank.name} provide loans for {cityData.authority}{' '}
                  properties?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                  Yes, projects approved by the {cityData.authority} are
                  pre-verified by {bank.name}, leading to faster disbursement.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <LegalNote />
          <AuthorBio />
        </div>

        {/* --- RIGHT COLUMN --- */}
        <aside className="lg:col-span-4 space-y-8 my-12">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-800">
                Top Banks in {cityData.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <ul className="divide-y divide-slate-100">
                {banks
                  .filter((b) => b.slug !== bank.slug)
                  .slice(0, 10)
                  .map((other) => (
                    <li key={other.slug}>
                      <Link
                        // ✅ VERIFIED: Has trailing slash. Good.
                        href={`/bank-emi/${other.slug}/${resolvedParams.city}/`}
                        className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors group"
                      >
                        <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">
                          {other.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-emerald-50 text-emerald-700 border-none font-bold"
                          >
                            {other.rate}%
                          </Badge>
                          <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-blue-500" />
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          <div className="sticky top-24 z-10 no-print space-y-6">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mb-3" />
              <h4 className="font-bold text-emerald-900 text-sm mb-1">
                RBI Regulated Rates
              </h4>
              <p className="text-xs text-emerald-700/80 leading-relaxed italic">
                Rates for {cityData.name} properties follow current repo-rate
                adjustments.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex justify-center p-4 min-h-62.5 items-center">
              <AdSlot id="bank-city-sidebar-sticky" type="box" />
            </div>
          </div>
        </aside>
      </div>
      {/* ✅ Sticky Footer for City Pages */}
      <StickyCompareFooter bankName={bank.name} bankSlug={bank.slug} />
    </main>
  );
}
