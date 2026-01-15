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
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCityData, getCompetitors, cityDetails } from '@/lib/localData';

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
  GitCompare, // ✅ Added MapPin import
} from 'lucide-react';
import StickyCompareFooter from '@/components/StickyCompareFooter';

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
    // ✅ FIX 1: Updated Year to 2026
    title: `${bank.name} Home Loan in ${cityData.name} 2026: Rates & EMI`,
    description: `Applying for ${bank.name} loan in ${cityData.name}? Check interest rates starting @ ${bank.rate}%, branches near ${cityData.areas[0]}, and processing fees.`,
    alternates: {
      // ✅ VERIFIED: Has trailing slash (Correct)
      canonical: `https://fincado.com/bank-emi/${bank.slug}/${cityData.slug}/`,
    },
  };
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

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Banks', url: 'https://fincado.com/bank-emi/' },
          {
            name: bank.name,
            // ✅ VERIFIED: Has trailing slash
            url: `https://fincado.com/bank-emi/${bank.slug}/`,
          },
          {
            name: cityData.name,
            // ✅ VERIFIED: Has trailing slash
            url: `https://fincado.com/bank-emi/${bank.slug}/${resolvedParams.city}/`,
          },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* --- LEFT COLUMN --- */}
        <div className="lg:col-span-8 min-w-0 my-12">
          <header className="my-10">
            <Badge
              variant="secondary"
              className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1 font-bold uppercase tracking-wider"
            >
              {/* ✅ FIX 2: Dynamic Year Badge */}
              2026 {cityData.name} Local Edition
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
                  <strong> ${cityData.areas.join(', ')}</strong>.</p>`}
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

          {/* CALCULATOR SECTION */}
          <Card className="mb-12 border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <Percent className="h-5 w-5 text-emerald-600" />
                EMI Estimator for {cityData.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 bg-white">
              <EMIClient defaultRate={bank.rate} />

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

          {/* ✅ CROSS-LINKING COMPARISON SELECTOR */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <GitCompare className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-slate-900">
                Compare {bank.name} vs Others in {cityData.name}
              </h2>
            </div>
            <BankSelector />
          </section>

          {/* NEW SECTION: Local Market Insights */}
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

          {/* NEW SECTION: Documentation required locally */}
          <section className="mb-12 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-sky-600" />
              Documents for {bank.name} in {cityData.name}
            </h3>
            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed">
              <p>
                When applying for a loan at {bank.name} for a property in{' '}
                {cityData.name}, ensure you have the following local documents
                ready:
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                <li>Sales Deed or Allotment Letter</li>
                <li>Projects Approved by {cityData.authority}</li>
                <li>Last 3 months salary slips</li>
                <li>6 months bank statement</li>
                <li>Occupancy Certificate (for ready-to-move)</li>
                <li>Latest Property Tax Receipt</li>
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
