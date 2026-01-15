import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import APYClient from './APYClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Context
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import FAQSchema from '@/components/FAQSchema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ---------------- SEO METADATA (Optimized 2025) ---------------- */
export const metadata: Metadata = {
  title: 'APY Calculator 2025 – Atal Pension Yojana Contribution Chart',
  description:
    'Calculate monthly contribution for Atal Pension Yojana (APY). Check guaranteed pension (₹1000-₹5000), return to nominee, and age-wise contribution chart.',
  keywords: [
    'APY Calculator',
    'Atal Pension Yojana Calculator',
    'APY Contribution Chart 2025',
    'Pension Scheme for Unorganized Sector',
    'APY vs NPS',
    'Government Pension Scheme',
  ],
  alternates: {
    canonical: 'https://fincado.com/apy-calculator',
  },
  openGraph: {
    title: 'APY Calculator – Guaranteed Pension for Life',
    description:
      'Free tool to calculate APY contributions based on age and desired pension amount.',
    url: 'https://fincado.com/apy-calculator',
    type: 'website',
  },
};

const APY_FAQS = [
  {
    id: 'faq-1',
    question: 'What happens if I stop paying contributions?',
    answer:
      'The APY account may eventually be closed, and the accumulated corpus (your contributions plus interest) will be returned. However, maintenance charges and penalties may be deducted by the bank.',
  },
  {
    id: 'faq-2',
    question: 'Can I increase my pension amount later?',
    answer:
      'Yes. You can upgrade to a higher pension slab (for example, from ₹1,000 to ₹5,000) once in a financial year by paying the differential contribution amount.',
  },
  {
    id: 'faq-3',
    question: 'Is there a penalty for delayed payment?',
    answer:
      'Yes. Banks charge a small penalty for delayed contributions—typically ₹1 per month for every ₹100 contributed.',
  },
];

/* ---------------- PAGE ---------------- */

export default function APYPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p class="mt-2">
      <strong>Atal Pension Yojana (APY)</strong> is a social security scheme launched by the 
      Government of India to provide a defined pension to workers in the unorganized sector.
    </p>
    <p class="mt-2">
      It offers a minimum <strong>guaranteed pension</strong> ranging from ₹1,000 to ₹5,000 per month 
      starting at age 60, depending on the subscriber's contribution amount and entry age.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2 mt-2">
      <li><strong>Age:</strong> Must be between 18 and 40 years.</li>
      <li><strong>Citizenship:</strong> Must be an Indian citizen.</li>
      <li><strong>Bank Account:</strong> Must have a valid savings bank account.</li>
      <li><strong>Tax Status:</strong> Should NOT be an income tax payer (Effective from Oct 1, 2022).</li>
    </ul>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2">
      <li><strong>Guaranteed Pension:</strong> The government guarantees the pension amount. If actual returns are lower, the government bridges the gap.</li>
      <li><strong>Spouse Benefit:</strong> The same pension is paid to the spouse after the subscriber's death.</li>
      <li><strong>Corpus to Nominee:</strong> After the death of both subscriber and spouse, the accumulated corpus (up to ₹8.5 Lakhs) is returned to the nominee.</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="Atal Pension Yojana (APY) Calculator"
        description="Calculate the monthly contribution required to get a guaranteed pension of ₹1000 to ₹5000 under the APY scheme."
        url="https://fincado.com/apy-calculator"
      />

      {/* FAQ Schema */}
      <FAQSchema
        faqs={APY_FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://incado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators' },
            {
              name: 'APY Calculator',
              url: 'https://fincado.com/apy-calculator',
            },
          ]}
        />

        <header className="no-print mb-10">
          {/* Share + Language */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Atal Pension Yojana (APY) Calculator" />
            <LanguageToggle path="/hi/apy-calculator" />
          </div>

          {/* Title */}
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

          {/* Intro text */}
          <div className="max-w-3xl text-base leading-relaxed text-slate-600">
            <WikiText
              content={`
        <p>
          Plan a <strong>guaranteed monthly pension</strong> backed by the
          Government of India using Fincado’s
          <strong>Atal Pension Yojana Calculator</strong>.
          Instantly find out how much you need to contribute every month
          based on your <strong>age</strong> and
          <strong>desired pension amount</strong>.
        </p>
      `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <APYClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="apy-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (Using FD/NPS context) */}
            <LiveRateTable type="fixedDeposit" />

            {/* ✅ Mobile-Only Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Retirement Tools
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/gratuity-calculator/"
                  className="
        rounded-lg
        border
        border-slate-200
        bg-white
        px-3
        py-3
        text-center
        text-sm
        font-medium
        text-slate-900
        hover:bg-slate-50
      "
                >
                  💼 Gratuity Calculator
                </Link>

                <Link
                  href="/retirement-calculator/"
                  className="
        rounded-lg
        border
        border-slate-200
        bg-white
        px-3
        py-3
        text-center
        text-sm
        font-medium
        text-slate-900
        hover:bg-slate-50
      "
                >
                  🏢 Retirement Calculator
                </Link>
              </div>
            </div>

            {/* ✅ Promo Box */}
            <div className="no-print my-8">
              <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50/60 p-4">
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl">
                  👴
                </div>

                {/* Content */}
                <div className="flex-1">
                  <strong className="block text-base font-semibold text-emerald-800">
                    Need Higher Pension?
                  </strong>

                  <Link
                    href="/guides/nps-guide/"
                    className="
          mt-1
          inline-flex
          items-center
          gap-1
          text-sm
          font-semibold
          text-emerald-700
          underline-offset-4
          hover:underline
        "
                  >
                    Read: Why NPS might be better than APY →
                  </Link>
                </div>
              </div>
            </div>

            {/* 💰 AD: MID CONTENT */}
            <div className="no-print my-10">
              <AdSlot id="apy-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- WHAT IS APY --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is Atal Pension Yojana (APY)?
                    </h2>

                    <div className="leading-relaxed text-slate-700">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- ELIGIBILITY --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Who Can Subscribe to APY?
                    </h3>

                    <div className="leading-relaxed text-slate-700">
                      <WikiText content={eligibilityContent} />
                    </div>
                  </section>

                  {/* --- AD SLOT --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* --- APY VS NPS --- */}
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
                                <TableCell>Guaranteed (~8%)</TableCell>
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
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* --- PENSION SLABS --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Pension Slab & Return to Nominee
                    </h3>

                    <Card className="border-slate-200">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Monthly Pension</TableHead>
                              <TableHead>Corpus Returned to Nominee</TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            <TableRow>
                              <TableCell>₹1,000</TableCell>
                              <TableCell>₹1.7 Lakh</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹2,000</TableCell>
                              <TableCell>₹3.4 Lakh</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹3,000</TableCell>
                              <TableCell>₹5.1 Lakh</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹4,000</TableCell>
                              <TableCell>₹6.8 Lakh</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹5,000</TableCell>
                              <TableCell>₹8.5 Lakh</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </section>

                  {/* --- HOW CALCULATOR HELPS --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How This Calculator Helps Your Planning
                    </h3>

                    <p className="text-slate-700">
                      APY contributions depend heavily on your entry age. The
                      earlier you join, the lower your monthly outflow. This
                      calculator lets you compare scenarios instantly.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="mb-1 font-semibold text-slate-900">
                          Contribution Check
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Know exactly how much will be deducted based on your
                          joining age.
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="mb-1 font-semibold text-slate-900">
                          Total Investment
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Compare lifetime contribution vs nominee corpus value.
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="mb-1 font-semibold text-slate-900">
                          Pension Selection
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Instantly compare ₹2,000 vs ₹5,000 pension cost.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* --- BENEFITS --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Key Benefits of APY
                    </h3>

                    <div className="leading-relaxed text-slate-700">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* --- FAQs --- */}
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
                    defaultValue={APY_FAQS[0]?.id}
                    className="space-y-2"
                  >
                    {APY_FAQS.map((faq) => (
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

          <aside className="sidebar no-print">
            <div className="sticky top-5 mb-6">
              <AdSlot id="apy-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
