import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GSTClient from './GSTClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import FAQSchema from '@/components/FAQSchema';
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from '@/components/ui/accordion';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'GST Calculator India – Reverse GST & Tax Slabs 2026',
  description:
    'Calculate GST inclusive and exclusive prices instantly. Check 2026 GST rates for Gold (3%), Real Estate (5%), and Electronics (18%). Reverse GST formula included.',
  keywords: [
    'GST Calculator',
    'Reverse GST Calculator',
    'GST Calculation Formula',
    'GST Rates 2026',
    'Calculate GST on Gold',
    'IGST CGST SGST Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/gst-calculator/',
  },
  openGraph: {
    title: 'GST Calculator – Instant Tax Computation',
    description:
      'Free tool for businesses to calculate GST invoices and reverse tax amounts.',
    url: 'https://fincado.com/gst-calculator/',
    type: 'website',
  },
};

const faqItems = [
  {
    id: 'gst-faq-1',
    question: 'Who needs to register for GST?',
    answer:
      'Businesses with an annual turnover exceeding ₹40 Lakhs (₹20 Lakhs for services) must register. E-commerce sellers and inter-state suppliers must register mandatorily.',
  },
  {
    id: 'gst-faq-2',
    question: 'What is HSN/SAC Code?',
    answer:
      'HSN (Harmonized System of Nomenclature) is used for goods, while SAC (Services Accounting Code) is for services. These codes determine the applicable GST rate.',
  },
  {
    id: 'gst-faq-3',
    question: 'Did Budget 2026 change GST rates?',
    answer:
      'No. The Union Budget 2026 did not announce changes to the standard GST slabs (5%, 12%, 18%, 28%). Any rate revisions are decided by the GST Council, not the Budget.',
  },
];

/* ---------------- PAGE ---------------- */

export default function GSTPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>GST (Goods and Services Tax)</strong> is a destination-based indirect tax levied on the supply 
      of goods and services in India. It replaced multiple cascading taxes like VAT, Service Tax, and Excise Duty, 
      creating a "One Nation, One Tax" system.
    </p>
    <p class="mt-4">
      Businesses need to calculate GST accurately to file returns and generate <strong>e-invoices</strong>. 
      Consumers use it to cross-check bills for big-ticket purchases like cars or appliances.
    </p>
  `);

  const componentContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2 mt-2">
      <li><strong>CGST (Central GST):</strong> Collected by the Central Government on intra-state sales (within the same state).</li>
      <li><strong>SGST (State GST):</strong> Collected by the State Government on intra-state sales.</li>
      <li><strong>IGST (Integrated GST):</strong> Collected by the Central Government on inter-state sales (between two states) and imports.</li>
    </ul>
  `);

  const reverseContent = autoLinkContent(`
    <p>
      Often, you know the final MRP (Maximum Retail Price) and need to find the actual base price 
      before tax. This is called a <strong>Reverse GST Calculation</strong>. It is essential for traders 
      to determine their profit margins.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="GST Calculator India"
        description="Calculate GST inclusive and exclusive amounts instantly. Supports 3% (Gold), 5%, 12%, 18%, and 28% slabs."
        url="https://fincado.com/gst-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators/' },
            {
              name: 'GST Calculator',
              url: 'https://fincado.com/gst-calculator/',
            },
          ]}
        />

        <header className="no-print mb-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="GST Calculator" />
            <LanguageToggle path="/hi/gst-calculator" />
          </div>

          <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            GST Calculator
            <span className="block text-base sm:text-lg font-medium text-emerald-700 mt-2">
              Goods & Services Tax (India)
            </span>
          </h1>

          <p className="mb-4 text-sm text-slate-500">
            Calculate GST inclusive & exclusive prices instantly • Updated for
            2026
          </p>

          <div className="max-w-3xl text-base leading-relaxed text-slate-600">
            <WikiText
              content={`
                <p>
                  Instantly calculate <strong>GST Inclusive</strong> and
                  <strong>Exclusive</strong> prices for invoices, billing verification,
                  and GST compliance. Supports all common GST slabs used in India.
                </p>
              `}
            />
          </div>

          {/* ✅ Budget 2026 Verified Status */}
          <div className="mt-6 flex gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg items-start max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-emerald-900">
                Budget 2026: GST Slabs Unchanged
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                The Union Budget 2026 did not announce any changes to standard
                GST rates (5%, 12%, 18%, 28%). Rate revisions continue to be
                governed by the GST Council.
              </p>
            </div>
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <GSTClient />

            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="gst-after-calc" type="banner" />
            </div>

            <LiveRateTable type="personalLoan" />

            {/* Mobile Tools */}
            <div className="no-print my-8 md:hidden">
              <h3 className="mb-4 text-base font-semibold text-slate-900">
                Business Tools
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/sip-calculator/"
                  className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  📈 Investment Calc
                </Link>
                <Link
                  href="/loan-calculator/"
                  className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  💸 Business Loan
                </Link>
              </div>
            </div>

            {/* Promo Box */}
            <div className="no-print mt-8">
              <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl">
                  💼
                </div>
                <div className="flex-1">
                  <strong className="block text-sm font-semibold text-emerald-800">
                    Running a Business?
                  </strong>
                  <Link
                    href="/guides/gst-guide/"
                    className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
                  >
                    Read: How to file GST Returns Online →
                  </Link>
                </div>
              </div>
            </div>

            <div className="no-print my-10 flex justify-center">
              <AdSlot id="gst-mid-content" type="leaderboard" />
            </div>

            {/* Content Article */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Understanding GST (Goods and Services Tax)
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Current GST Rate Slabs (2026)
                    </h3>
                    <div className="overflow-x-auto rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="w-30 font-bold text-slate-900">
                              Rate
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Items Covered
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-semibold text-emerald-700">
                              0% (Exempt)
                            </TableCell>
                            <TableCell>
                              Fresh food (milk, eggs, vegetables), Books,
                              Newspapers
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-slate-900">
                              3%
                            </TableCell>
                            <TableCell>
                              Gold, Silver, Platinum, Diamonds
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-slate-900">
                              5%
                            </TableCell>
                            <TableCell>
                              Packaged food, Medicines, Economy Air Travel
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-slate-900">
                              12%
                            </TableCell>
                            <TableCell>
                              Mobiles, Processed Food, Business Class Air Travel
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-slate-900">
                              18%
                            </TableCell>
                            <TableCell>
                              Electronics, IT Services, Restaurants, Banking
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-slate-900">
                              28%
                            </TableCell>
                            <TableCell>
                              Luxury Cars, Cement, ACs, Tobacco (+ Cess)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  <div className="no-print my-10 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Components of GST
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={componentContent} />
                    </div>
                  </section>

                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Reverse GST Calculation Formula
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={reverseContent} />
                    </div>
                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="\text{Base Price} = \frac{\text{Total MRP}}{1 + (\text{GST Rate} / 100)}" />
                    </div>

                    <div className="text-slate-700 text-sm leading-relaxed">
                      <WikiText
                        content={`
                          <p>
                            <strong>Example:</strong> If a phone costs ₹11,800 (inclusive of 18% GST):<br />
                            Base Price = 11,800 / 1.18 = <strong>₹10,000</strong><br />
                            GST Amount = ₹1,800
                          </p>
                        `}
                      />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Benefits of GST System
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText
                        content={`
                          <ul class="list-disc list-inside space-y-2">
                            <li><strong>Eliminates Cascading Effect:</strong> Input Tax Credit avoids tax on tax.</li>
                            <li><strong>Higher Threshold:</strong> Businesses up to ₹40L turnover are exempt.</li>
                            <li><strong>Composition Scheme:</strong> Simplified compliance for turnover up to ₹1.5 Cr.</li>
                          </ul>
                        `}
                      />
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* FAQs */}
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
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left text-slate-900 font-medium hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed">
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
            <div className="sticky top-28 mb-6">
              <AdSlot id="gst-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
