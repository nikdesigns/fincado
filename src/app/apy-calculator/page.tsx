import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import APYClient from './APYClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { APYSchemas } from '@/components/schemas/APYSchemas';

import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { BookOpen, ArrowRight, Info, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'APY Calculator 2026 – Atal Pension Yojana Contribution Calculator',
  description:
    'Free APY Calculator to calculate monthly contribution for Atal Pension Yojana. Check guaranteed pension (₹1000-₹5000), nominee corpus, and age-wise contribution chart. Compare pension scenarios instantly.',
  keywords: [
    'APY Calculator',
    'Atal Pension Yojana Calculator',
    'APY Contribution Chart',
    'Pension Scheme Calculator',
    'APY vs NPS',
    'Government Pension Scheme',
    'Guaranteed Pension Calculator',
    'PFRDA Pension',
  ],
  alternates: {
    canonical: 'https://fincado.com/apy-calculator/',
  },
  openGraph: {
    title: 'APY Calculator – Guaranteed Pension for Life',
    description:
      'Calculate monthly APY contributions based on age and desired pension. Get guaranteed pension backed by Government of India.',
    url: 'https://fincado.com/apy-calculator/',
    type: 'website',
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

/* ---------------- FAQ DATA ---------------- */
const faqItems = [
  {
    id: 'faq-1',
    question: 'What is Atal Pension Yojana (APY)?',
    answer:
      'Atal Pension Yojana (APY) is a government-backed pension scheme for workers in the unorganized sector. It provides guaranteed monthly pension ranging from ₹1,000 to ₹5,000 starting at age 60. The scheme is administered by PFRDA and contributions are made through participating banks.',
  },
  {
    id: 'faq-2',
    question: 'How is APY contribution calculated?',
    answer:
      'APY contributions depend on your joining age (18-40 years) and desired pension amount. Younger subscribers pay less because they have more years to contribute. For example, at age 25 for ₹5,000 pension, monthly contribution is ₹376, while at age 35, it increases to ₹902.',
  },
  {
    id: 'faq-3',
    question: 'What happens if I stop paying APY contributions?',
    answer:
      'If you stop paying, the account may be frozen after 6 months and closed after 12 months of non-payment. You will receive your accumulated corpus (contributions + interest) minus applicable penalties and bank charges. The guaranteed pension benefit is forfeited.',
  },
  {
    id: 'faq-4',
    question: 'Can I increase my pension amount later?',
    answer:
      'Yes. You can upgrade to a higher pension slab once per financial year by paying the differential amount for past periods. For example, you can upgrade from ₹2,000 to ₹5,000 pension by paying the difference plus accrued interest.',
  },
  {
    id: 'faq-5',
    question: 'What happens after the subscriber dies?',
    answer:
      "After the subscriber's death, the spouse continues to receive the same guaranteed pension. After both subscriber and spouse pass away, the accumulated corpus (up to ₹8.5 lakhs for ₹5,000 pension) is returned to the nominee.",
  },
  {
    id: 'faq-6',
    question: 'Is there a penalty for delayed APY payment?',
    answer:
      'Yes. Banks charge ₹1 per month penalty for every ₹100 of contribution for delayed payments. For example, if your monthly contribution is ₹500 and you pay 2 months late, the penalty would be ₹10 (₹5 per month × 2 months).',
  },
  {
    id: 'faq-7',
    question: 'Who is NOT eligible for APY?',
    answer:
      'Income tax payers are NOT eligible for APY (as per rules from October 1, 2022). Also, those who are already covered under statutory social security schemes like EPF, NPS (government sector), or ESIC cannot join APY.',
  },
  {
    id: 'faq-8',
    question: 'APY vs NPS - Which is better?',
    answer:
      'APY is better for guaranteed fixed pension (max ₹5,000/month) with government backing. NPS is better for higher pension potential (market-linked returns of 9-12%) but with investment risk. APY suits low-income workers; NPS suits salaried professionals seeking higher retirement corpus.',
  },
  {
    id: 'faq-9',
    question: 'Can I withdraw APY money before 60?',
    answer:
      'Premature exit is allowed only in exceptional cases like terminal illness or death. In such cases, the accumulated corpus is returned. Normal withdrawals before age 60 are not permitted, making APY a long-term commitment.',
  },
  {
    id: 'faq-10',
    question: 'Did Union Budget 2026 change APY rules?',
    answer:
      'Union Budget 2026 did not introduce any changes to APY contribution rates, pension amounts, or eligibility criteria. The scheme continues to operate as per existing PFRDA guidelines with the same 5 pension slabs (₹1,000 to ₹5,000).',
  },
];

/* ---------------- PAGE ---------------- */
export default function APYPage() {
  const updatedLabel = getCurrentMonthYearLabel();

  const introContent = autoLinkContent(`
    <p>
      <strong>Atal Pension Yojana (APY)</strong> is a social security scheme launched by the 
      Government of India to provide a defined pension to workers in the unorganized sector.
      It offers a minimum <strong>guaranteed pension</strong> ranging from ₹1,000 to ₹5,000 per month 
      starting at age 60, backed by government guarantee.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Age:</strong> Must be between 18 and 40 years at the time of joining.</li>
      <li><strong>Citizenship:</strong> Must be an Indian citizen.</li>
      <li><strong>Bank Account:</strong> Must have a valid savings bank account linked to Aadhaar.</li>
      <li><strong>Tax Status:</strong> Income tax payers are NOT eligible (as per rules from Oct 1, 2022).</li>
      <li><strong>No other coverage:</strong> Should not be covered under any other statutory social security scheme.</li>
    </ul>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Guaranteed Pension:</strong> Government guarantees the minimum pension. If actual returns are lower, the government makes up the difference.</li>
      <li><strong>Spouse Benefit:</strong> The same guaranteed pension continues to the spouse after the subscriber's death.</li>
      <li><strong>Corpus to Nominee:</strong> After both subscriber and spouse pass away, the accumulated corpus (₹1.7L to ₹8.5L depending on pension slab) is returned to the nominee.</li>
      <li><strong>Auto-debit:</strong> Contributions are automatically debited from your bank account, ensuring regular payments.</li>
    </ul>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'APY Calculator',
            url: 'https://fincado.com/apy-calculator/',
          },
        ]}
      />
      <CalculatorSchema
        name="Atal Pension Yojana (APY) Calculator"
        description="Calculate monthly contribution for APY pension scheme. Check guaranteed pension from ₹1000 to ₹5000, total investment, and nominee corpus based on your joining age."
        url="https://fincado.com/apy-calculator/"
      />
      <FAQSchema faqs={faqItems} />
      <APYSchemas />
      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="APY Calculator – Atal Pension Yojana 2026" />
            <LanguageToggle path="/hi/apy-calculator" />
          </div>

          <h1
            className="
              mb-4
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-semibold
              tracking-tight
              text-slate-900
            "
          >
            Atal Pension Yojana (APY) Calculator
            <span className="block text-base sm:text-lg font-medium text-lime-700 mt-1">
              Guaranteed Government Pension
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Use Fincado's <strong>APY Calculator</strong> to calculate your monthly contribution 
                  for <strong>Atal Pension Yojana</strong>. Get guaranteed pension backed by the 
                  Government of India. Compare different pension amounts and joining ages to 
                  <strong>plan your retirement smartly</strong>.
                </p>
              `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* ✅ Quick Stats Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      MOST POPULAR
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹5,000 Pension (Age 25)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹376
                      <span className="text-base font-normal text-slate-600">
                        /month
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      BEST TIME TO START
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Early age = Lower contribution
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      Age 18-25
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        ideal
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-amber-700 mb-1">
                      MAX CORPUS
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Nominee gets after both deaths
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹8.5L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        max
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* ✅ Calculator */}
            <APYClient />

            {/* ✅ Budget 2026 Alert */}
            <Alert className="mt-6 bg-slate-50/50 border-slate-200 text-slate-600">
              <Info className="h-4 w-4 text-indigo-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Budget 2026 Update
                </strong>
                This calculator uses official PFRDA contribution charts. Union
                Budget 2026 did not introduce any changes to APY contribution
                rates or pension amounts.
              </AlertDescription>
            </Alert>

            {/* ✅ Age-wise Contribution Table */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-linear-to-br from-white to-slate-50">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    Age-wise Monthly Contribution Chart
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-2">
                    Monthly contribution required for ₹5,000 pension at
                    different joining ages
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { age: 18, amt: 210 },
                      { age: 22, amt: 292 },
                      { age: 25, amt: 376 },
                      { age: 28, amt: 485 },
                      { age: 30, amt: 577 },
                      { age: 33, amt: 752 },
                      { age: 35, amt: 902 },
                      { age: 40, amt: 1454 },
                    ].map((item) => (
                      <div
                        key={item.age}
                        className="p-4 bg-white rounded-lg border border-slate-200 hover:border-emerald-300 transition"
                      >
                        <div className="text-xs text-slate-500 mb-2">
                          Age {item.age}
                        </div>
                        <div className="text-2xl font-bold text-emerald-700">
                          ₹{item.amt}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          per month
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-900">
                      <strong>💡 Tip:</strong> Starting at age 25 vs age 35
                      saves you <strong>₹526/month</strong> in contributions!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="apy-after-calc" type="banner" />
            </div>

            {/* ✅ Pension Slabs & Nominee Corpus */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Guaranteed Pension & Nominee Corpus
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-2">
                    All 5 pension slabs with corresponding nominee corpus
                    (Updated {updatedLabel})
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Monthly Pension</TableHead>
                          <TableHead>Sample Age 25 Contribution</TableHead>
                          <TableHead>Corpus to Nominee</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold">
                            ₹1,000
                          </TableCell>
                          <TableCell>₹76/month</TableCell>
                          <TableCell className="text-emerald-700 font-semibold">
                            ₹1.7 Lakh
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            ₹2,000
                          </TableCell>
                          <TableCell>₹151/month</TableCell>
                          <TableCell className="text-emerald-700 font-semibold">
                            ₹3.4 Lakh
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            ₹3,000
                          </TableCell>
                          <TableCell>₹226/month</TableCell>
                          <TableCell className="text-emerald-700 font-semibold">
                            ₹5.1 Lakh
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            ₹4,000
                          </TableCell>
                          <TableCell>₹301/month</TableCell>
                          <TableCell className="text-emerald-700 font-semibold">
                            ₹6.8 Lakh
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-emerald-50">
                          <TableCell className="font-bold text-emerald-900">
                            ₹5,000
                          </TableCell>
                          <TableCell className="font-semibold">
                            ₹376/month
                          </TableCell>
                          <TableCell className="text-emerald-700 font-bold">
                            ₹8.5 Lakh
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    *Contribution values are for reference. Actual amounts may
                    vary slightly by bank.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* ✅ Live Rates */}
            <section className="no-print mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Compare APY with FD Returns
              </h3>
              <LiveRateTable type="fixedDeposit" />
            </section>

            {/* ✅ Promo Box */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Want to understand APY better?
                  </strong>

                  <Link
                    href="/guides/apy-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Read our Complete APY Guide (Updated for 2026)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 💰 AD: MID CONTENT */}
            <div className="no-print my-10">
              <AdSlot id="apy-mid-content" type="leaderboard" />
            </div>

            {/* ✅ Rich Content Section */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* What is APY */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is Atal Pension Yojana (APY)?
                    </h2>
                    <div className="leading-relaxed text-slate-700">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* Eligibility */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Who Can Subscribe to APY?
                    </h3>
                    <div className="leading-relaxed text-slate-700">
                      <WikiText content={eligibilityContent} />
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* APY vs NPS */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      APY vs NPS: Which is Better?
                    </h3>

                    <Card className="border-slate-200">
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Feature</TableHead>
                                <TableHead>Atal Pension Yojana (APY)</TableHead>
                                <TableHead>
                                  National Pension System (NPS)
                                </TableHead>
                              </TableRow>
                            </TableHeader>

                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">
                                  Pension Amount
                                </TableCell>
                                <TableCell>Fixed (Max ₹5,000/month)</TableCell>
                                <TableCell>Market Linked (No Limit)</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="font-medium">
                                  Eligibility
                                </TableCell>
                                <TableCell>
                                  Unorganized Sector (Non-Tax Payers)
                                </TableCell>
                                <TableCell>
                                  Any Citizen (Including Tax Payers)
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="font-medium">
                                  Returns
                                </TableCell>
                                <TableCell>Guaranteed (Govt-backed)</TableCell>
                                <TableCell>Market Linked (9%–12%)</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="font-medium">
                                  Premature Exit
                                </TableCell>
                                <TableCell>
                                  Difficult (Special Cases Only)
                                </TableCell>
                                <TableCell>
                                  Partial Withdrawal Allowed
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="font-medium">
                                  Tax Benefit
                                </TableCell>
                                <TableCell>No tax deduction</TableCell>
                                <TableCell>
                                  Up to ₹2 lakh deduction (80CCD)
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Benefits */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Key Benefits of APY
                    </h3>
                    <div className="leading-relaxed text-slate-700">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* How Calculator Helps */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How This APY Calculator Helps Your Planning
                    </h3>

                    <p className="text-slate-700">
                      APY contributions vary significantly based on your joining
                      age. This calculator helps you make informed decisions by
                      showing exact contribution amounts, total investment over
                      time, and nominee corpus values.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="mb-1 font-semibold text-slate-900">
                          Instant Calculation
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Know exactly how much you need to contribute based on
                          your age and desired pension.
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="mb-1 font-semibold text-slate-900">
                          Compare Scenarios
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Compare different pension amounts and joining ages
                          side-by-side.
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="mb-1 font-semibold text-slate-900">
                          Save & Share
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Save your calculations and share pension plans with
                          family via WhatsApp.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Retirement Calculators
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {/* NPS Calculator */}
                      <Link href="/nps-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                🏛️
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  NPS Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate National Pension System returns with
                                  tax benefits
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      {/* PPF Calculator */}
                      <Link href="/ppf-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                                🏦
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                                  PPF Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate Public Provident Fund maturity with
                                  tax benefits
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      {/* EPF Calculator */}
                      <Link href="/epf-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-purple-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-50 to-purple-100 text-purple-700 text-2xl">
                                💼
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-purple-700 mb-1">
                                  EPF Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate Employee Provident Fund maturity
                                  amount
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-purple-700">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* ✅ FAQs */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={faqItems[0]?.id}
                    className="space-y-2"
                  >
                    {faqItems.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left text-slate-900">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="leading-relaxed text-slate-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <AuthorBio />
          </div>

          {/* ✅ Sidebar */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <AdSlot id="apy-sidebar" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
