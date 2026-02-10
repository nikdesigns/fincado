import { banks } from '@/lib/banks';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import RateComparisonChart from '@/components/RateComparisonChart';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import FAQSchema from '@/components/FAQSchema';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AuthorBio from '@/components/AuthorBio';
import ShareTools from '@/components/ShareTools';
import { getCurrentFiscalYear } from '@/lib/fiscalYear';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  Scale,
  Zap,
  TrendingDown,
  HelpCircle,
  Users,
  Clock,
  IndianRupee,
  CheckCircle2,
  XCircle,
  Info,
  Calculator,
  Percent,
} from 'lucide-react';

/* ---------------- STATIC PARAMS ---------------- */
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  for (const b1 of banks) {
    for (const b2 of banks) {
      if (b1.slug !== b2.slug) {
        params.push({ slug: `${b1.slug}-vs-${b2.slug}` });
      }
    }
  }
  return params;
}

/* ---------------- ENHANCED METADATA ---------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fy = getCurrentFiscalYear();

  const parts = slug.split('-vs-');
  if (parts.length !== 2) return {};

  const [s1, s2] = parts;

  const b1 = banks.find((b) => b.slug === s1);
  const b2 = banks.find((b) => b.slug === s2);

  if (!b1 || !b2) return {};

  const rateComparison =
    b1.rate < b2.rate
      ? `${b1.name} offers lower rates`
      : `${b2.name} offers lower rates`;
  const rateDiff = Math.abs(b1.rate - b2.rate).toFixed(2);

  return {
    title: `${b1.name} vs ${b2.name} Home Loan ${fy.shortYear} | Rate ${b1.rate}% vs ${b2.rate}% | Expert Review`,
    description: `${b1.name} vs ${b2.name} home loan comparison ${fy.shortYear}: Interest rates (${b1.rate}% vs ${b2.rate}%), processing fees, approval time, and eligibility. ${rateComparison} by ${rateDiff}%. Expert verdict with real borrower data.`,
    keywords: [
      `${b1.name} vs ${b2.name}`,
      `${b1.name} ${b2.name} comparison`,
      `${b1.name} home loan`,
      `${b2.name} home loan`,
      `${b1.name} interest rate ${fy.shortYear}`,
      `${b2.name} interest rate ${fy.shortYear}`,
      'home loan comparison',
      'best bank for home loan',
      `${b1.name} ${b2.name} which is better`,
    ],
    authors: [{ name: 'Fincado Research Team' }],
    creator: 'Fincado',
    publisher: 'Fincado',
    alternates: {
      canonical: `https://fincado.com/compare/${slug}/`,
    },
    openGraph: {
      title: `${b1.name} vs ${b2.name} Home Loan Comparison ${fy.shortYear}`,
      description: `Compare ${b1.name} (${b1.rate}%) vs ${b2.name} (${b2.rate}%) home loans. Expert analysis of rates, fees, and approval speed.`,
      url: `https://fincado.com/compare/${slug}/`,
      siteName: 'Fincado',
      type: 'article',
      images: [
        {
          url: `https://fincado.com/og-compare-${b1.slug}-vs-${b2.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${b1.name} vs ${b2.name} Comparison`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${b1.name} vs ${b2.name} Home Loan ${fy.shortYear}`,
      description: `Rate: ${b1.rate}% vs ${b2.rate}%. Expert comparison.`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/* ---------------- PAGE ---------------- */
export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fy = getCurrentFiscalYear();

  const parts = slug.split('-vs-');
  if (parts.length !== 2) notFound();

  const [s1, s2] = parts;

  const b1 = banks.find((b) => b.slug === s1);
  const b2 = banks.find((b) => b.slug === s2);

  if (!b1 || !b2) notFound();

  // Calculate differences
  const rateDiff = (b1.rate - b2.rate).toFixed(2);
  const lowerRateBank = b1.rate < b2.rate ? b1 : b2;
  const higherRateBank = b1.rate < b2.rate ? b2 : b1;

  // Example: Calculate savings on ₹50L loan over 20 years
  const principal = 5000000;
  const years = 20;
  const savings = Math.abs(
    (principal * Math.abs(b1.rate - b2.rate) * years) / 100,
  );

  const faqs = [
    {
      question: `Which is better for long-term home loans: ${b1.name} or ${b2.name}?`,
      answer: `${lowerRateBank.name} offers a lower interest rate (${lowerRateBank.rate}% vs ${higherRateBank.rate}%), which can save you approximately ₹${(savings / 100000).toFixed(1)} lakhs on a ₹50 lakh loan over 20 years. However, consider approval speed, customer service, and prepayment flexibility before deciding.`,
    },
    {
      question: `Does CIBIL score impact ${b1.name} and ${b2.name} differently?`,
      answer: `Yes. Both banks offer rate concessions for higher CIBIL scores (750+). PSU banks like ${b1.slug.includes('sbi') || b1.slug.includes('pnb') || b1.slug.includes('bob') || b1.slug.includes('canara') ? b1.name : b2.name} may be stricter for scores below 700, while private banks offer more flexibility.`,
    },
    {
      question: `Which bank is better for self-employed borrowers?`,
      answer: `Private banks like ${b1.slug.includes('hdfc') || b1.slug.includes('icici') || b1.slug.includes('axis') || b1.slug.includes('kotak') ? b1.name : b2.name} typically offer more flexible income assessment for self-employed applicants, with digital documentation and faster underwriting.`,
    },
    {
      question: `Can I get a balance transfer from ${b1.name} to ${b2.name}?`,
      answer: `Yes, both banks accept balance transfers. ${lowerRateBank.name} currently offers better rates (${lowerRateBank.rate}%), but check for processing fees (typically 0.25%-0.50% of loan amount) and ensure zero prepayment charges on your existing loan.`,
    },
    {
      question: `Which bank has faster loan approval?`,
      answer: `Private banks like ${b1.slug.includes('hdfc') || b1.slug.includes('icici') || b1.slug.includes('axis') || b1.slug.includes('kotak') ? b1.name : b2.name} generally offer faster approvals (3-7 days) with digital documentation. PSU banks may take 10-15 days but offer more competitive long-term rates.`,
    },
  ];

  // Structured Data - Comparison Schema
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'ComparisonPage',
    name: `${b1.name} vs ${b2.name} Home Loan Comparison`,
    description: `Detailed comparison of ${b1.name} and ${b2.name} home loan interest rates, fees, and features for ${fy.shortYear}.`,
    url: `https://fincado.com/compare/${slug}/`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Fincado Research Team',
    },
    mainEntity: {
      '@type': 'Product',
      name: `${b1.name} vs ${b2.name} Home Loan`,
      offers: [
        {
          '@type': 'Offer',
          name: `${b1.name} Home Loan`,
          price: b1.rate,
          priceCurrency: 'INR',
          priceSpecification: {
            '@type': 'PriceSpecification',
            valueAddedTaxIncluded: false,
          },
        },
        {
          '@type': 'Offer',
          name: `${b2.name} Home Loan`,
          price: b2.rate,
          priceCurrency: 'INR',
          priceSpecification: {
            '@type': 'PriceSpecification',
            valueAddedTaxIncluded: false,
          },
        },
      ],
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${b1.name} vs ${b2.name} Home Loan Comparison ${fy.shortYear}`,
    description: `Expert comparison of ${b1.name} and ${b2.name} home loans covering interest rates, processing fees, and eligibility criteria.`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Fincado',
      url: 'https://fincado.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fincado',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fincado.com/logo.png',
      },
    },
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          {
            name: 'Loan Comparisons',
            url: 'https://fincado.com/compare-loans/',
          },
          {
            name: `${b1.name} vs ${b2.name}`,
            url: `https://fincado.com/compare/${slug}/`,
          },
        ]}
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ---------- ENHANCED HEADER ---------- */}
        <header className="max-w-5xl mx-auto my-12">
          <div className="relative bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50/30 border border-emerald-200/50 rounded-2xl p-8 overflow-hidden shadow-sm">
            {/* Decorative Elements */}
            <div className="absolute -right-12 -top-12 opacity-5">
              <Scale className="w-64 h-64 text-emerald-600" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <Badge className="bg-white border-emerald-300 text-emerald-700 px-4 py-1.5 font-bold uppercase tracking-wider shadow-sm">
                  Expert Reviewed · {fy.shortYear}
                </Badge>
                <div className="no-print">
                  <ShareTools
                    title={`${b1.name} vs ${b2.name} Home Loan Comparison`}
                  />
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
                {b1.name}{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">
                  vs
                </span>{' '}
                {b2.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-5">
                Independent comparison based on RBI benchmarks, lender
                disclosures, and real borrower approval patterns for FY{' '}
                {fy.startYear}-{String(fy.endYear).slice(-2)}.
              </p>

              {/* Key Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-emerald-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Percent className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-slate-600 font-medium">
                      {b1.name}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-emerald-600">
                    {b1.rate}%
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-teal-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Percent className="w-4 h-4 text-teal-600" />
                    <span className="text-xs text-slate-600 font-medium">
                      {b2.name}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-teal-600">{b2.rate}%</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-amber-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="w-4 h-4 text-amber-600" />
                    <span className="text-xs text-slate-600 font-medium">
                      Rate Diff
                    </span>
                  </div>
                  <p className="text-xl font-bold text-amber-600">
                    {Math.abs(parseFloat(rateDiff))}%
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <IndianRupee className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-slate-600 font-medium">
                      Savings
                    </span>
                  </div>
                  <p className="text-xl font-bold text-blue-600">
                    ₹{(savings / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500 italic">
                Reviewed by Fincado Research Team · Updated{' '}
                {new Date().toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ---------- MAIN CONTENT ---------- */}
          <div className="lg:col-span-8 space-y-10 mb-12">
            {/* Quick Winner Badge */}
            {Math.abs(parseFloat(rateDiff)) > 0 && (
              <div className="bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900 mb-1">
                    Lower Rate Winner
                  </h3>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    <strong>{lowerRateBank.name}</strong> offers a lower
                    interest rate of <strong>{lowerRateBank.rate}%</strong>{' '}
                    compared to {higherRateBank.name}&apos;s{' '}
                    <strong>{higherRateBank.rate}%</strong>. This can save you
                    approximately{' '}
                    <strong>₹{(savings / 100000).toFixed(1)} lakhs</strong> on a
                    ₹50 lakh loan over 20 years.
                  </p>
                </div>
              </div>
            )}

            {/* SNAPSHOT TABLE */}
            <Card className="border-slate-200 shadow-md">
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">
                      Comparison Snapshot
                    </CardTitle>
                    <CardDescription>
                      Key loan metrics at a glance
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Parameter</TableHead>
                        <TableHead className="font-bold">{b1.name}</TableHead>
                        <TableHead className="font-bold">{b2.name}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Starting Interest Rate
                        </TableCell>
                        <TableCell
                          className={`font-bold ${
                            b1.rate < b2.rate
                              ? 'text-emerald-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {b1.rate}% p.a.
                          {b1.rate < b2.rate && (
                            <CheckCircle2 className="inline ml-2 w-4 h-4" />
                          )}
                        </TableCell>
                        <TableCell
                          className={`font-bold ${
                            b2.rate < b1.rate
                              ? 'text-emerald-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {b2.rate}% p.a.
                          {b2.rate < b1.rate && (
                            <CheckCircle2 className="inline ml-2 w-4 h-4" />
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Maximum Interest Rate
                        </TableCell>
                        <TableCell>{b1.maxRate}%</TableCell>
                        <TableCell>{b2.maxRate}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Processing Fee
                        </TableCell>
                        <TableCell>Up to 0.50%</TableCell>
                        <TableCell>Up to 0.50%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Digital Approval
                        </TableCell>
                        <TableCell>
                          {b1.slug.includes('sbi') ||
                          b1.slug.includes('pnb') ||
                          b1.slug.includes('bob')
                            ? 'Partial'
                            : 'Yes'}
                        </TableCell>
                        <TableCell>
                          {b2.slug.includes('sbi') ||
                          b2.slug.includes('pnb') ||
                          b2.slug.includes('bob')
                            ? 'Partial'
                            : 'Yes'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Prepayment Charges
                        </TableCell>
                        <TableCell>
                          <span className="text-emerald-600 font-medium">
                            Zero
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-emerald-600 font-medium">
                            Zero
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* RATE CHART */}
            <RateComparisonChart b1={b1} b2={b2} />

            {/* Ad Slot */}
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-center no-print">
              <AdSlot id="compare-mid" type="leaderboard" />
            </div>

            {/* PROFILE-BASED VERDICT */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-600" />
                Which Bank Is Better for Your Profile?
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Users,
                    color: 'emerald',
                    title: 'Salaried Employees',
                    desc: `Both banks favor stable income profiles. ${lowerRateBank.name} offers better long-term rates.`,
                  },
                  {
                    icon: Clock,
                    color: 'blue',
                    title: 'Faster Disbursal',
                    desc: `Private banks typically offer 3-7 day approvals vs 10-15 days for PSU banks.`,
                  },
                  {
                    icon: IndianRupee,
                    color: 'amber',
                    title: 'Lowest Total Cost',
                    desc: `${lowerRateBank.name}'s ${lowerRateBank.rate}% rate results in lower lifetime interest.`,
                  },
                  {
                    icon: Zap,
                    color: 'purple',
                    title: 'Self-Employed',
                    desc: `Private banks offer flexible income assessment and digital documentation.`,
                  },
                ].map((item, i) => (
                  <Card
                    key={i}
                    className="border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-5">
                      <div
                        className={`w-10 h-10 rounded-xl bg-${item.color}-50 flex items-center justify-center mb-3 shadow-sm`}
                      >
                        <item.icon
                          className={`w-5 h-5 text-${item.color}-600`}
                        />
                      </div>
                      <p className="font-bold text-slate-900 mb-2">
                        {item.title}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Pros & Cons Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Pros & Cons</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Bank 1 */}
                <Card className="border-slate-200">
                  <CardHeader className="bg-slate-50 border-b border-slate-200">
                    <CardTitle className="text-lg">{b1.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Pros
                      </h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Interest rate: {b1.rate}%</li>
                        <li>• Wide branch network</li>
                        <li>
                          •{' '}
                          {b1.slug.includes('sbi') ||
                          b1.slug.includes('pnb') ||
                          b1.slug.includes('bob')
                            ? 'Government backing'
                            : 'Fast digital approval'}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Cons
                      </h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>
                          •{' '}
                          {b1.slug.includes('sbi') ||
                          b1.slug.includes('pnb') ||
                          b1.slug.includes('bob')
                            ? 'Slower approval process'
                            : 'Higher processing fees'}
                        </li>
                        <li>
                          •{' '}
                          {b1.slug.includes('sbi') ||
                          b1.slug.includes('pnb') ||
                          b1.slug.includes('bob')
                            ? 'More documentation required'
                            : 'Stricter eligibility'}
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Bank 2 */}
                <Card className="border-slate-200">
                  <CardHeader className="bg-slate-50 border-b border-slate-200">
                    <CardTitle className="text-lg">{b2.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Pros
                      </h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Interest rate: {b2.rate}%</li>
                        <li>
                          •{' '}
                          {b2.slug.includes('sbi') ||
                          b2.slug.includes('pnb') ||
                          b2.slug.includes('bob')
                            ? 'Trusted PSU bank'
                            : 'Faster approval (3-7 days)'}
                        </li>
                        <li>
                          •{' '}
                          {b2.slug.includes('sbi') ||
                          b2.slug.includes('pnb') ||
                          b2.slug.includes('bob')
                            ? 'Lower processing fees'
                            : 'Digital documentation'}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Cons
                      </h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>
                          •{' '}
                          {b2.slug.includes('sbi') ||
                          b2.slug.includes('pnb') ||
                          b2.slug.includes('bob')
                            ? 'Limited digital services'
                            : 'Higher interest rate'}
                        </li>
                        <li>
                          •{' '}
                          {b2.slug.includes('sbi') ||
                          b2.slug.includes('pnb') ||
                          b2.slug.includes('bob')
                            ? 'Longer processing time'
                            : 'Stricter CIBIL requirements'}
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-emerald-600" />
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white border border-slate-200 rounded-lg px-5"
                  >
                    <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pt-2 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <FAQSchema faqs={faqs} />
            </section>

            {/* FINAL VERDICT */}
            <Card className="bg-linear-to-br from-lime-50 to-emerald-50 border-lime-200 shadow-md">
              <CardContent className="p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-lime-600 flex items-center justify-center shadow-lg">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-lime-900">
                    Final Verdict
                  </h2>
                </div>

                <p className="text-lime-900 leading-relaxed">
                  Choose <strong>{lowerRateBank.name}</strong> if your priority
                  is long-term cost efficiency with the lowest interest rate (
                  {lowerRateBank.rate}%). Choose{' '}
                  <strong>{higherRateBank.name}</strong> if approval speed,
                  digital convenience, and premium customer service matter more
                  to you.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="bg-lime-700 hover:bg-lime-800 text-white shadow-md"
                  >
                    <Link href="/emi-calculator/">
                      <Calculator className="mr-2 w-4 h-4" />
                      Calculate EMI Impact
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-lime-600 text-lime-700 hover:bg-lime-50"
                  >
                    <Link href="/compare-loans/">
                      <Scale className="mr-2 w-4 h-4" />
                      Compare More Banks
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <AuthorBio />
          </div>

          {/* ---------- SIDEBAR ---------- */}
          <aside className="lg:col-span-4 space-y-6 mb-12">
            <div className="sticky top-24 space-y-6">
              {/* Quick Action Card */}
              <Card className="border-slate-200 shadow-md">
                <CardHeader className="bg-linear-to-r from-emerald-50 to-teal-50 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-base font-bold">
                      Calculate Your EMI
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    See the exact EMI difference between {b1.name} and {b2.name}{' '}
                    based on your loan amount.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Link href="/emi-calculator/">
                      <Calculator className="mr-2 w-4 h-4" />
                      Open EMI Calculator
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Key Stats */}
              <Card className="border-slate-200">
                <CardHeader className="bg-slate-50 border-b border-slate-200">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Info className="w-4 h-4 text-emerald-600" />
                    Key Takeaways
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-600">
                      <strong>{lowerRateBank.name}</strong> offers{' '}
                      {Math.abs(parseFloat(rateDiff))}% lower rate
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-600">
                      Potential savings: ₹{(savings / 100000).toFixed(1)} lakhs
                      on ₹50L loan
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-600">
                      Both banks offer zero prepayment charges
                    </p>
                  </div>
                </CardContent>
              </Card>

              <FinancialNavWidget />

              {/* Sticky Ad */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center no-print">
                <AdSlot id="compare-sidebar" type="box" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
