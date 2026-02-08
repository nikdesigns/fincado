import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  Wallet,
  Landmark,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Best 80C Tax Saving Options 2025: ELSS, PPF, EPF, FD',
  description:
    'Best Section 80C investments 2025: ELSS (12-15% returns) vs PPF vs EPF vs FD comparison, post-tax returns, lock-in, best options for 30% slab & salaried employees.',
  keywords: [
    'best 80c tax saving options 2025',
    'ELSS vs PPF vs FD',
    'section 80c deduction limit',
    'tax saving for salaried employees',
    'ELSS mutual fund returns',
    'PPF interest rate 2025',
    'best tax saver fd',
    'NPS tax benefit 80ccd(1b)'
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/best-tax-saving-options-80c',
  },
  openGraph: {
    title: 'Best 80C Tax Saving Options 2025 | Save ₹46,800 Tax',
    description:
      'Compare ELSS, PPF, EPF, and FD. Find the best tax-saving investment to build wealth and save tax under Section 80C.',
    url: 'https://fincado.com/guides/best-tax-saving-options-80c',
    type: 'article',
    images: [
      {
        url: '/images/guides/tax/tax-benefits-80c-24b.webp',
        width: 1200,
        height: 630,
      }
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the maximum deduction under Section 80C in 2025?',
    answer:
      'The maximum deduction is ₹1.5 lakh per financial year. This limit is shared across Section 80C, 80CCC (pension funds), and 80CCD(1) (NPS).',
  },
  {
    question: 'Which is the best 80C investment for 30% tax bracket?',
    answer:
      'ELSS (Equity Linked Savings Scheme) is the best option for wealth creation, delivering 11-13% post-tax returns with the shortest 3-year lock-in period.',
  },
  {
    question: 'Can I claim Section 80C under the new tax regime?',
    answer:
      'No. Section 80C deductions are only available under the old tax regime. The new tax regime does not allow 80C, 80D, or HRA deductions.',
  },
  {
    question: 'Is ELSS better than PPF for tax saving?',
    answer:
      'Yes, for investors under 50 aiming for wealth creation, as ELSS delivers significantly higher returns (12-15%) compared to PPF (7.1%). PPF is better for risk-averse investors.',
  }
];

export default function TaxSavingOptionsGuide() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            '@id':
              'https://fincado.com/guides/best-tax-saving-options-80c#article',
            headline: 'Best Tax Saving Options Under Section 80C for 2025',
            description:
              'Comprehensive guide comparing ELSS, PPF, EPF, FD and other Section 80C investments to maximize tax savings and wealth creation.',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://fincado.com/guides/best-tax-saving-options-80c',
            },
            image: {
              '@type': 'ImageObject',
              url: '/images/guides/tax/tax-benefits-80c-24b.webp',
              width: 1200,
              height: 630,
            },
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
              url: 'https://fincado.com/about',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: '/logo.png',
              },
            },
            datePublished: '2025-12-30',
            dateModified: '2025-12-30',
          }),
        }}
      />

      {/* --- BREADCRUMB --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Best 80C Options',
            url: 'https://fincado.com/guides/best-tax-saving-options-80c',
          }
        ]}
      />

      {/* --- FAQ SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6">
        <Badge
          variant="secondary"
          className="mb-3 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1"
        >
          Tax Planning 2025
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Best Tax Saving Options Under Section 80C for 2025
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 12 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Last Updated: <strong className="text-slate-700">Dec 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verified Data
          </span>
        </div>

        <div className="mt-6">
          <ShareTools title="Best 80C Tax Saving Options 2025" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`Choosing the <strong>best tax saving options under Section 80C</strong> can save you up to <strong>₹46,800 annually</strong> (30% tax bracket) while building long-term wealth. 

With 15+ eligible investments ranging from <strong>ELSS mutual funds</strong> (12-15% returns) to <strong>PPF</strong> (7.1% returns) and <strong>Tax Saver FDs</strong>, most taxpayers struggle to maximize the limit efficiently. The critical mistake is focusing only on the tax deduction without comparing post-tax returns—<strong>ELSS delivers 11-13% post-tax returns versus PPF's 7.1%</strong>, a difference worth ₹10-15 lakh over a decade.`}
          />
        </CardContent>
      </Card>

      {/* --- VERDICT CARD --- */}
      <Card className="mb-10 border-l-4 border-l-lime-500 bg-lime-50/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl text-lime-800">
            <Lightbulb className="h-6 w-6 text-lime-600" /> Quick Verdict
            (30-Second Answer)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-slate-800 leading-relaxed">
          <p className="mb-3">
            <strong>ELSS is the #1 choice</strong> if you are under 50 and want
            to build wealth. It offers the{' '}
            <strong>highest returns (12-15%)</strong> and shortest lock-in (3
            years).
          </p>
          <p>
            <strong>PPF & EPF</strong> are best for conservative investors
            seeking guaranteed safety. <strong>Tax Saver FD</strong> is suitable
            only for senior citizens.
          </p>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-80c-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: WHAT IS 80C --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="what-is-80c"
            className="mb-4 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
          >
            <Briefcase className="h-6 w-6 text-blue-600" /> What is Section 80C?
          </h2>
          <p className="mb-6 text-slate-700 leading-relaxed">
            <strong>Section 80C</strong> of the Income Tax Act allows
            individuals and HUFs to claim a deduction of up to{' '}
            <strong>₹1.5 lakh</strong> from their total taxable income. It is
            the most popular tax-saving section in India.
          </p>

          <div className="rounded-lg bg-slate-50 border border-slate-200 p-5">
            <h3 className="mb-3 font-semibold text-slate-900">
              Key Highlights
            </h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <span>
                  <strong>Limit:</strong> ₹1.5 Lakh per financial year (shared
                  across 80C, 80CCC, 80CCD(1)).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <span>
                  <strong>Tax Regime:</strong> Available ONLY under the{' '}
                  <strong>Old Tax Regime</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <span>
                  <strong>Savings:</strong> Up to ₹46,800 tax saved for those in
                  the 30% bracket.
                </span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Reference:{' '}
              <a
                href="https://www.incometax.gov.in"
                rel="nofollow noopener"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Income Tax Department (Section 80C rules)
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 2: CALCULATION --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="calculation"
            className="mb-4 text-2xl font-bold text-slate-900 scroll-mt-20"
          >
            How Section 80C Deductions Work
          </h2>
          <p className="mb-6 text-slate-700">
            Let&apos;s see a breakdown for someone in the{' '}
            <strong>30% tax bracket</strong>:
          </p>

          <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Gross Taxable Income
                  </TableCell>
                  <TableCell className="text-right">₹10,00,000</TableCell>
                </TableRow>
                <TableRow className="bg-red-50/50">
                  <TableCell className="font-medium text-slate-700">
                    Less: 80C Investment
                  </TableCell>
                  <TableCell className="text-right font-medium text-emerald-600">
                    - ₹1,50,000
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Net Taxable Income
                  </TableCell>
                  <TableCell className="text-right">₹8,50,000</TableCell>
                </TableRow>
                <TableRow className="bg-emerald-100/50">
                  <TableCell className="font-bold text-slate-900">
                    Tax Saved (30% + Cess)
                  </TableCell>
                  <TableCell className="text-right font-bold text-emerald-700 text-lg">
                    ₹46,800
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-80c-2" type="leaderboard" />
      </div>

      {/* --- SECTION 3: INVESTMENT LIST --- */}
      <section className="mb-12">
        <h2
          id="list"
          className="mb-6 text-3xl font-bold text-slate-900 scroll-mt-20"
        >
          Complete List of Section 80C Eligible Investments
        </h2>

        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/tax/tax-benefits-80c-24b.webp"
            alt="List of tax saving options under section 80C"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* PPF */}
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2 bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" /> 1. Public
                Provident Fund (PPF)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-slate-600 space-y-3">
              <div className="flex justify-between text-sm border-b border-dashed border-slate-200 pb-2">
                <span>Returns</span>
                <span className="font-semibold text-emerald-600">
                  7.1% (Tax-Free)
                </span>
              </div>
              <div className="flex justify-between text-sm border-b border-dashed border-slate-200 pb-2">
                <span>Lock-in</span>
                <span className="font-medium text-slate-900">15 Years</span>
              </div>
              <p className="text-sm italic text-slate-500">
                Best for risk-free retirement planning.
              </p>
            </CardContent>
          </Card>

          {/* EPF */}
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2 bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" /> 2. Employee
                Provident Fund (EPF)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-slate-600 space-y-3">
              <div className="flex justify-between text-sm border-b border-dashed border-slate-200 pb-2">
                <span>Returns</span>
                <span className="font-semibold text-emerald-600">
                  8.25% (Tax-Free)
                </span>
              </div>
              <div className="flex justify-between text-sm border-b border-dashed border-slate-200 pb-2">
                <span>Lock-in</span>
                <span className="font-medium text-slate-900">
                  Until Retirement
                </span>
              </div>
              <p className="text-sm italic text-slate-500">
                Mandatory and excellent for salaried employees.
              </p>
            </CardContent>
          </Card>

          {/* ELSS */}
          <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-amber-400">
            <CardHeader className="pb-2 bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-amber-500" /> 3. ELSS Mutual
                Funds (Top Pick)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-slate-600 space-y-3">
              <div className="flex justify-between text-sm border-b border-dashed border-slate-200 pb-2">
                <span>Returns</span>
                <span className="font-semibold text-emerald-600">
                  12-15% (Market Linked)
                </span>
              </div>
              <div className="flex justify-between text-sm border-b border-dashed border-slate-200 pb-2">
                <span>Lock-in</span>
                <span className="font-medium text-emerald-600">
                  3 Years (Shortest)
                </span>
              </div>
              <p className="text-sm italic text-slate-500">
                Best for wealth creation and beating inflation.
              </p>
            </CardContent>
          </Card>

          {/* FD */}
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2 bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-slate-500" /> 4. Tax Saver FD
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-slate-600 space-y-3">
              <div className="flex justify-between text-sm border-b border-dashed border-slate-200 pb-2">
                <span>Returns</span>
                <span className="font-semibold text-amber-600">
                  6-7.5% (Taxable)
                </span>
              </div>
              <div className="flex justify-between text-sm border-b border-dashed border-slate-200 pb-2">
                <span>Lock-in</span>
                <span className="font-medium text-slate-900">5 Years</span>
              </div>
              <p className="text-sm italic text-slate-500">
                Best for senior citizens needing safety.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* NPS */}
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-5">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-slate-600" /> 5. National
                Pension System (NPS)
              </h3>
              <p className="text-sm text-slate-600 mb-2">
                <strong>Returns:</strong> 9-12% (Market Linked).
                <br />
                <strong>Lock-in:</strong> Until Age 60.
              </p>
              <Badge
                variant="outline"
                className="text-xs bg-white text-emerald-700 border-emerald-200"
              >
                Extra ₹50,000 deduction (80CCD 1B)
              </Badge>
            </CardContent>
          </Card>

          {/* SSY */}
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-5">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-pink-500" /> 6. Sukanya
                Samriddhi (SSY)
              </h3>
              <p className="text-sm text-slate-600 mb-2">
                <strong>Returns:</strong> 8.2% (Tax-Free).
                <br />
                <strong>Lock-in:</strong> 21 Years.
              </p>
              <Badge
                variant="outline"
                className="text-xs bg-white text-pink-700 border-pink-200"
              >
                For Girl Child Only
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 rounded-lg bg-blue-50/70 p-4 text-sm text-blue-800 border border-blue-100 flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Other Options:</strong> Life Insurance Premiums (Term/LIC),
            NSC, SCSS, Home Loan Principal Repayment, and Children&apos;s
            Tuition Fees.
          </div>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-80c-3" type="leaderboard" />
      </div>

      {/* --- SECTION 4: RANKING TABLE --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            Investments Ranked by Returns (Post-Tax)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* High Returns */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-emerald-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> High-Return Options (10%+
                Post-Tax)
              </h3>
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Investment</TableHead>
                      <TableHead>Pre-Tax Return</TableHead>
                      <TableHead>Post-Tax (30% Slab)</TableHead>
                      <TableHead>Risk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold">ELSS Funds</TableCell>
                      <TableCell>12-15%</TableCell>
                      <TableCell className="font-bold text-emerald-600">
                        11-13%
                      </TableCell>
                      <TableCell>High</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>NPS (Equity)</TableCell>
                      <TableCell>10-12%</TableCell>
                      <TableCell>9-11%</TableCell>
                      <TableCell>Medium</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Medium Returns */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-blue-800 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Medium-Return Options (7-9%
                Post-Tax)
              </h3>
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Investment</TableHead>
                      <TableHead>Return</TableHead>
                      <TableHead>Tax Status</TableHead>
                      <TableHead>Risk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">EPF</TableCell>
                      <TableCell>8.25%</TableCell>
                      <TableCell className="text-emerald-600 font-medium">
                        Tax-Free
                      </TableCell>
                      <TableCell>Zero</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SSY</TableCell>
                      <TableCell>8.2%</TableCell>
                      <TableCell className="text-emerald-600 font-medium">
                        Tax-Free
                      </TableCell>
                      <TableCell>Zero</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PPF</TableCell>
                      <TableCell>7.1%</TableCell>
                      <TableCell className="text-emerald-600 font-medium">
                        Tax-Free
                      </TableCell>
                      <TableCell>Zero</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Low Returns */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-amber-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Low-Return Options (&lt;7%
                Post-Tax)
              </h3>
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Investment</TableHead>
                      <TableHead>Pre-Tax</TableHead>
                      <TableHead>Post-Tax (30% Slab)</TableHead>
                      <TableHead>Risk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Tax Saver FD
                      </TableCell>
                      <TableCell>6-7.5%</TableCell>
                      <TableCell className="text-red-600">4.2-5.2%</TableCell>
                      <TableCell>Zero</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">NSC</TableCell>
                      <TableCell>7.7%</TableCell>
                      <TableCell className="text-red-600">5.3%</TableCell>
                      <TableCell>Zero</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">LIC / Trad.</TableCell>
                      <TableCell>4-6%</TableCell>
                      <TableCell>4-6%</TableCell>
                      <TableCell>Low</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <TrendingUp className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-sm text-emerald-900">
              <strong>Key Insight:</strong> ELSS delivers{' '}
              <strong>2-3x higher post-tax returns</strong> than FD for
              investors in the 30% tax bracket.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="guide-80c-4" type="leaderboard" />
      </div>

      {/* --- SECTION 5: COMPARISON --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="comparison"
            className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
          >
            ELSS vs PPF vs EPF vs FD: Comparison
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="w-37.5">Feature</TableHead>
                  <TableHead className="font-bold text-slate-900">
                    ELSS
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    PPF
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    EPF
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">FD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Returns</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    12-15%
                  </TableCell>
                  <TableCell>7.1%</TableCell>
                  <TableCell>8.25%</TableCell>
                  <TableCell>6-7.5%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lock-in</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    3 Years
                  </TableCell>
                  <TableCell>15 Years</TableCell>
                  <TableCell>Retirement</TableCell>
                  <TableCell>5 Years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Risk</TableCell>
                  <TableCell className="text-amber-600">High</TableCell>
                  <TableCell className="text-emerald-600">Zero</TableCell>
                  <TableCell className="text-emerald-600">Zero</TableCell>
                  <TableCell className="text-emerald-600">Zero</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tax on Returns</TableCell>
                  <TableCell>12.5% &gt; 1.25L</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    Tax-Free
                  </TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    Tax-Free
                  </TableCell>
                  <TableCell className="text-red-600">Fully Taxable</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Best For</TableCell>
                  <TableCell>Wealth</TableCell>
                  <TableCell>Safety</TableCell>
                  <TableCell>Salaried</TableCell>
                  <TableCell>Seniors</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 6: STRATEGY --- */}
      <section className="mb-12">
        <h2
          id="strategy"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Best Tax Saving Strategy for Salaried Employees
        </h2>

        <Card className="border-emerald-200 bg-linear-to-br from-white to-emerald-50/50 shadow-md">
          <CardHeader className="border-b border-emerald-100 pb-3">
            <CardTitle className="text-lg text-emerald-900">
              If You&apos;re in the 30% Tax Bracket (Goal: ₹2 Lakh Deduction)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-sm">
                  1
                </div>
                <div>
                  <strong className="block text-slate-900 text-lg">
                    EPF (Approx ₹60k+)
                  </strong>
                  <span className="text-slate-600">
                    Your mandatory monthly contribution automatically counts
                    towards 80C.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-sm">
                  2
                </div>
                <div>
                  <strong className="block text-slate-900 text-lg">
                    ELSS SIP (₹60k)
                  </strong>
                  <span className="text-slate-600">
                    Start a ₹5,000/month SIP. This builds wealth while saving
                    tax.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-sm">
                  3
                </div>
                <div>
                  <strong className="block text-slate-900 text-lg">
                    PPF (₹30k)
                  </strong>
                  <span className="text-slate-600">
                    Add balance here for stability and debt allocation.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm">
                  4
                </div>
                <div>
                  <strong className="block text-slate-900 text-lg">
                    NPS (₹50k)
                  </strong>
                  <span className="text-slate-600">
                    Invest extra ₹50,000 under Section 80CCD(1B) for
                    <span className="text-emerald-700 font-bold px-1">
                      extra ₹15,600 tax savings
                    </span>
                    over the 1.5L limit.
                  </span>
                </div>
              </li>
            </ul>

            <div className="mt-8 border-t border-emerald-200 pt-4 text-center">
              <span className="text-lg font-medium text-slate-700">
                Total Tax Saved:
              </span>{' '}
              <span className="text-3xl font-bold text-emerald-700">
                ₹62,400 / year
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="guide-80c-5" type="leaderboard" />
      </div>

      {/* --- SECTION 7: RECOMMENDATIONS --- */}
      <section className="mb-12">
        <h2
          id="recommendations"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Who Should Choose What?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-t-4 border-t-emerald-500 shadow-md">
            <CardHeader className="pb-3 bg-slate-50">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" /> Choose ELSS
                If...
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-600">
              <ul className="space-y-2 list-disc pl-4 marker:text-emerald-500">
                <li>You are under 50 years old.</li>
                <li>You want to beat inflation.</li>
                <li>You can wait 3+ years.</li>
                <li>You are in the 30% tax slab.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-blue-500 shadow-md">
            <CardHeader className="pb-3 bg-slate-50">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" /> Choose PPF
                If...
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-600">
              <ul className="space-y-2 list-disc pl-4 marker:text-blue-500">
                <li>You want zero risk.</li>
                <li>You are self-employed.</li>
                <li>You are saving for long-term (15y).</li>
                <li>You want tax-free interest.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-amber-500 shadow-md">
            <CardHeader className="pb-3 bg-slate-50">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-amber-600" /> Choose FD If...
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-600">
              <ul className="space-y-2 list-disc pl-4 marker:text-amber-500">
                <li>You are a Senior Citizen.</li>
                <li>You cannot tolerate any volatility.</li>
                <li>You are in a lower tax bracket.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 8: MISTAKES --- */}
      <section className="mb-12">
        <h2
          id="mistakes"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-7 w-7 text-amber-500" /> Common Mistakes
          to Avoid
        </h2>
        <Card className="border-red-100 bg-red-50/30">
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <XCircle className="h-6 w-6 shrink-0 text-red-500 mt-0.5" />
                <div className="text-slate-700">
                  <strong className="block text-slate-900 text-lg">
                    Buying Insurance for Tax
                  </strong>
                  Traditional LIC policies give only 4-6% returns. Buy Term
                  Insurance for cover and ELSS for growth.
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <XCircle className="h-6 w-6 shrink-0 text-red-500 mt-0.5" />
                <div className="text-slate-700">
                  <strong className="block text-slate-900 text-lg">
                    Ignoring NPS
                  </strong>
                  Missing out on the additional ₹50,000 deduction is a waste of
                  ₹15,600 in tax savings.
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <XCircle className="h-6 w-6 shrink-0 text-red-500 mt-0.5" />
                <div className="text-slate-700">
                  <strong className="block text-slate-900 text-lg">
                    Too Many Plans
                  </strong>
                  Don&apos;t buy a new policy every March. Stick to one or two
                  solid investments (ELSS + PPF).
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="guide-80c-6" type="leaderboard" />
      </div>

      {/* --- SECTION 9: FAQS --- */}
      <section className="mb-12">
        <h2
          id="faqs"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          FAQs: Section 80C Tax Saving
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQ_ITEMS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-4 bg-white"
            >
              <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
          <AccordionItem
            value="item-custom-1"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Does Home Loan Principal count under 80C?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes, the principal component of your home loan EMI is eligible for
              deduction under Section 80C up to the ₹1.5 lakh limit.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
      </div>

      <p className="mb-8 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
        Disclaimer: This content is for informational purposes only and does not
        constitute financial or tax advice. Tax laws are subject to change.
        Please consult a Chartered Accountant (CA) or financial advisor before
        making investment decisions.
      </p>

      {/* --- FINAL CTA --- */}
      <Card className="bg-slate-900 text-white border-none shadow-xl">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Ready to Save Tax?
          </h2>
          <p className="mb-8 max-w-lg text-slate-300 text-lg">
            Calculate how much your investment can grow with our free tools.
            Compare ELSS vs PPF vs FD returns instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/elss-calculator/"
              className="rounded-lg bg-emerald-500 px-8 py-4 font-bold text-white transition hover:bg-emerald-600 shadow-lg hover:shadow-emerald-500/25"
            >
              Start ELSS Calculator
            </Link>
            <Link
              href="/ppf-calculator/"
              className="rounded-lg border border-slate-600 bg-slate-800 px-8 py-4 font-bold text-white transition hover:bg-slate-700 hover:border-slate-500"
            >
              Check PPF Returns
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-80c-7" type="leaderboard" />
      </div>
    </article>
  );
}
