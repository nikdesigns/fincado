/* src/app/city/[city]/[type]/page.tsx */
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

import { getCityData, cityDetails } from '@/lib/localData';
import { banks } from '@/lib/banks';
import { getBankRates } from '@/lib/getBankRates';

import AdSlot from '@/components/AdSlot';
import EMIClient from '@/app/emi-calculator/EMIClient';
import AuthorBio from '@/components/AuthorBio';

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
import { Alert, AlertDescription } from '@/components/ui/alert';

import {
  Calculator,
  TrendingUp,
  FileText,
  Info,
  ArrowRight,
} from 'lucide-react';

const loanTypes: Record<string, string> = {
  'personal-loan': 'Personal Loan',
  'home-loan': 'Home Loan',
  'car-loan': 'Car Loan',
  'credit-score': 'Credit Score Check',
};

type LoanRateField = 'personalLoan' | 'homeLoan' | 'carLoan';

const loanRateFieldMap: Partial<Record<string, LoanRateField>> = {
  'personal-loan': 'personalLoan',
  'home-loan': 'homeLoan',
  'car-loan': 'carLoan',
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { city: string; type: string }[] = [];
  const supportedCities = Object.keys(cityDetails);

  supportedCities.forEach((citySlug) => {
    if (citySlug !== 'default') {
      Object.keys(loanTypes).forEach((type) => {
        params.push({ city: citySlug, type });
      });
    }
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; type: string }>;
}): Promise<Metadata> {
  const { city, type } = await params;
  const cityData = getCityData(city);
  const loanName = loanTypes[type as keyof typeof loanTypes];

  if (!cityData || !loanName) return {};

  const slug = `/city/${cityData.slug}/${type}/`;
  const canonical = `https://fincado.com${slug}`;

  return {
    title: `Best ${loanName} in ${cityData.name} 2026: Compare Top Rates & EMI`,
    description: `Compare ${loanName} interest rates in ${cityData.name} from top banks with updated data, local eligibility tips, and instant EMI calculation.`,
    alternates: { canonical },
    openGraph: {
      title: `Best ${loanName} in ${cityData.name} (2026)`,
      description: `Updated ${loanName} rates, lender comparison, and EMI planning for ${cityData.name}.`,
      url: canonical,
      type: 'article',
    },
  };
}

export default async function CityLoanPage({
  params,
}: {
  params: Promise<{ city: string; type: string }>;
}) {
  const { city, type } = await params;
  const cityData = getCityData(city);
  const loanName = loanTypes[type as keyof typeof loanTypes];

  if (!cityData || !loanName) return notFound();

  const liveRates = await getBankRates();
  const rateField = loanRateFieldMap[type];

  const getLatestRate = (slug: string, fallback: number): number => {
    const bankRates = liveRates.find((rate) => rate.bank === slug);
    if (!bankRates || !rateField) return fallback;
    return bankRates[rateField] ?? fallback;
  };

  const latestUpdatedAt =
    liveRates.length > 0
      ? [...liveRates].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
          .updatedAt
      : 'N/A';

  const topBanks = [...banks]
    .sort(
      (a, b) => getLatestRate(a.slug, a.rate) - getLatestRate(b.slug, b.rate),
    )
    .slice(0, 6);

  const bestRate = getLatestRate(topBanks[0]?.slug || 'sbi', 8.5);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Main Content */}
        <section className="lg:col-span-8 min-w-0">
          <header className="mb-8">
            <Badge
              variant="secondary"
              className="mb-4 bg-[#EFFBE2] text-[#577A30] hover:bg-[#DFF7C6] px-3 py-1 font-semibold uppercase tracking-wider"
            >
              2026 {cityData.name} Update
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
              {loanName} in {cityData.name} – Compare Best Rates
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Looking for a <strong>{loanName}</strong> in{' '}
              <strong>{cityData.name}</strong>? We analyzed offers from top
              lenders for borrowers across{' '}
              <strong>{cityData.areas.slice(0, 3).join(', ')}</strong>. Compare
              rates, estimate EMI, and choose the right lender faster.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Latest tracked rate refresh: {latestUpdatedAt}
            </p>
          </header>

          <div className="mb-8 rounded-lg border border-slate-100 bg-slate-50 p-2 flex justify-center no-print">
            <AdSlot
              id="city-loan-type-top"
              type="leaderboard"
              label="Sponsored"
            />
          </div>

          {/* EMI Card */}
          <Card className="mb-8 border-slate-200 shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-800">
                <Calculator className="h-5 w-5 text-[#577A30]" />
                Interactive EMI Calculator for {cityData.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-2 sm:p-6">
              <EMIClient defaultRate={bestRate} />
              <Alert className="mt-6 bg-blue-50/50 border-blue-100 rounded-xl">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-xs text-blue-800 leading-relaxed">
                  Tip: Try calculations at both best-rate and upper-rate
                  scenarios to estimate safe monthly cash flow.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Bank Comparison Table */}
          <Card className="mb-10 border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Top Banks for {loanName} in {cityData.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-semibold text-slate-700">
                        Bank
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700">
                        Interest Range
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topBanks.map((bank) => {
                      const currentRate = getLatestRate(bank.slug, bank.rate);
                      const upperRate = Math.max(bank.maxRate, currentRate);

                      return (
                        <TableRow key={bank.slug}>
                          <TableCell>
                            <Link
                              href={`/bank-emi/${bank.slug}/${city}/`}
                              className="font-medium text-blue-600 hover:underline"
                            >
                              {bank.name}
                            </Link>
                          </TableCell>
                          <TableCell className="font-medium text-slate-700">
                            {currentRate}% - {upperRate}%
                          </TableCell>
                          <TableCell>
                            <Link
                              href={`/bank-emi/${bank.slug}/${city}/`}
                              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                            >
                              Check EMI <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Content Section */}
          <Card className="mb-10 border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900">
                Why Apply for {loanName} in {cityData.name}?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed">
              <p>
                With property costs in {cityData.name} averaging around{' '}
                <strong>{cityData.avgPropertyRate}</strong>, securing a
                low-interest loan is important for long-term affordability.
                Banks serving <strong>{cityData.name}</strong> (pincodes
                starting with <strong>{cityData.pincodeStart}</strong>) often
                offer local branch and doorstep support.
              </p>

              <h3 className="mt-6! mb-3! flex items-center gap-2 text-slate-900">
                <FileText className="h-4 w-4 text-sky-600" />
                Local Documents Required
              </h3>
              <ul>
                <li>
                  <strong>ID Proof:</strong> Aadhaar / PAN.
                </li>
                <li>
                  <strong>Address Proof:</strong> Utility bill from{' '}
                  {cityData.authority} area.
                </li>
                <li>
                  <strong>Income Proof:</strong> Salary slips from employers in{' '}
                  {cityData.name}.
                </li>
              </ul>

              <h3 className="mt-6! mb-3! text-slate-900">Related Tools</h3>
              <div className="flex flex-wrap gap-3 not-prose">
                <Link
                  href="/emi-calculator/"
                  className="inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  🔢 EMI Calculator
                </Link>
                <Link
                  href="/credit-score/"
                  className="inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  📊 Check Credit Score
                </Link>
              </div>
            </CardContent>
          </Card>

          <AuthorBio />

          <div className="mt-8 flex justify-center no-print">
            <AdSlot id="city-loan-type-bottom" type="rectangle" />
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-800">
                  City Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 space-y-2">
                <p>
                  <strong className="text-slate-800">City:</strong>{' '}
                  {cityData.name}
                </p>
                <p>
                  <strong className="text-slate-800">Avg Rate:</strong>{' '}
                  {cityData.avgPropertyRate}
                </p>
                <p>
                  <strong className="text-slate-800">Authority:</strong>{' '}
                  {cityData.authority}
                </p>
                <p>
                  <strong className="text-slate-800">Top Areas:</strong>{' '}
                  {cityData.areas.slice(0, 3).join(', ')}
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm no-print">
              <AdSlot id="city-loan-sidebar" type="box" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
