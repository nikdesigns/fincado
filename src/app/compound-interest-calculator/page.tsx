import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CompoundInterestClient from './CompoundInterestClient';
import AdSlot from '@/components/AdSlot';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import { autoLinkContent } from '@/utils/autoLinker';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import LanguageToggle from '@/components/LanguageToggle';
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
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck } from 'lucide-react'; // ✅ Icons

/* ---------------- SEO METADATA (Optimized 2026) ---------------- */
export const metadata: Metadata = {
  title: 'Compound Interest Calculator 2026 – The Power of Compounding',
  description:
    'Calculate compound interest with yearly, half-yearly, quarterly, or monthly frequency. See how your money grows over time with the power of compounding in 2026.',
  keywords: [
    'Compound Interest Calculator',
    'Compound Interest Formula',
    'Future Value Calculator',
    'Power of Compounding',
    'Investment Growth Calculator',
    'Compounding Frequency India 2026',
  ],
  alternates: {
    canonical: 'https://fincado.com/compound-interest-calculator/',
  },
  openGraph: {
    title: 'Compound Interest Calculator – Watch Your Money Grow (2026)',
    description:
      'Free tool to calculate maturity amount with compound interest formula.',
    url: 'https://fincado.com/compound-interest-calculator/',
    type: 'website',
  },
};

const faqItems = [
  {
    question: 'Which investments offer compound interest?',
    answer:
      'Most long-term investments use compounding, including Fixed Deposits, Mutual Funds (Growth), PPF, and EPF.',
  },
  {
    question: 'How can I maximize the power of compounding?',
    answer:
      'Start early, stay invested for long periods, reinvest returns, and prefer higher compounding frequency such as monthly.',
  },
  {
    question: 'Is compound interest better than simple interest?',
    answer:
      'Yes. Compound interest earns interest on both principal and accumulated interest, resulting in much higher returns over time.',
  },
];

/* ---------------- PAGE ---------------- */

export default function CompoundInterestPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Compound Interest</strong> is often called the "eighth wonder of the world". Unlike 
      Simple Interest, where you earn interest only on the principal, Compound Interest allows you 
      to earn <strong>interest on interest</strong>.
    </p>
    <p class="mt-2">
      This compounding effect causes your wealth to grow exponentially over time, making it the 
      most powerful concept in finance and investing.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Compound Interest Calculator"
        description="Calculate the future value of an investment with compound interest."
        url="https://fincado.com/compound-interest-calculator/"
      />

      {/* FAQ Schema */}
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
            {
              name: 'Calculators',
              url: 'https://fincado.com/calculators/',
            },
            {
              name: 'Compound Interest',
              url: 'https://fincado.com/compound-interest-calculator/',
            },
          ]}
        />

        <header className="no-print mb-10">
          {/* Share + Language */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Compound Interest Calculator" />
            <LanguageToggle path="/hi/compound-interest-calculator" />
          </div>

          {/* Title */}
          <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Compound Interest Calculator
            <span className="block mt-2 text-base sm:text-lg font-medium text-lime-700">
              Monthly • Quarterly • Yearly Compounding
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-4 text-sm text-slate-500">
            Visualise long-term wealth creation with exponential growth •
            Updated 2026
          </p>

          {/* Intro */}
          <div className="max-w-3xl text-base leading-relaxed text-slate-600">
            <WikiText
              content={`
                <p>
                  Calculate the future value of your investments using
                  <strong> monthly, quarterly, or yearly compounding</strong>.
                  Understand how compounding accelerates wealth over time compared to simple interest.
                </p>
              `}
            />
          </div>

          {/* ✅ Budget 2026 Verified Status */}
          <div className="mt-6 flex gap-3 p-3 bg-white border border-slate-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-slate-900">
                Budget 2026: Tax Rules on Interest
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                The Union Budget 2026 maintained the status quo on interest
                taxation. Interest from FDs and RDs continues to be taxed as per
                your income slab, while PPF remains Tax-Free (EEE status).
              </p>
            </div>
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <CompoundInterestClient />
            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="ci-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (FD/RD Context) */}
            <LiveRateTable type="fixedDeposit" />

            <div className="no-print my-10">
              <AdSlot id="ci-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Compound Interest?
                </h2>
                <WikiText content={introContent} />
              </section>

              {/* --- FORMULA --- */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  The Formula Explained
                </h3>

                <p className="text-slate-700">
                  The mathematical formula used to calculate the final amount (
                  <strong>A</strong>) is:
                </p>

                <div className="overflow-x-auto py-4 bg-slate-50 px-4 rounded-md border border-slate-200">
                  <BlockMath math="A = P \left(1 + \frac{r}{n}\right)^{nt}" />
                </div>

                <WikiText
                  content={`
                    <ul class="list-disc pl-5 space-y-2 text-sm text-slate-700">
                      <li><strong>P</strong>: Principal Amount (Initial Investment)</li>
                      <li><strong>r</strong>: Annual Interest Rate (decimal)</li>
                      <li><strong>n</strong>: Compounding frequency per year</li>
                      <li><strong>t</strong>: Time period in years</li>
                    </ul>
                  `}
                />
              </section>

              {/* 💰 AD 3 */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* --- COMPOUNDING FREQUENCY TABLE --- */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Compounding Frequency Explained
                </h3>

                <p className="text-slate-700">
                  The frequency at which interest is added to your account
                  significantly impacts returns.
                </p>

                <div className="rounded-lg border border-slate-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-bold text-slate-900">
                          Frequency
                        </TableHead>
                        <TableHead className="font-bold text-slate-900">
                          n Value
                        </TableHead>
                        <TableHead className="font-bold text-slate-900">
                          Common Examples
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Yearly</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>PPF, EPF (credited yearly)</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Half-Yearly
                        </TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>Corporate Bonds</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Quarterly</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>Bank Fixed Deposits</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Monthly</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>Savings Accounts</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* --- POWER OF COMPOUNDING --- */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  The Power of Compounding (Example)
                </h3>

                <p className="text-slate-700">
                  Suppose you invest <strong>₹1,00,000</strong> for{' '}
                  <strong>10 years</strong> at <strong>10%</strong>:
                </p>

                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                  <li>
                    <strong>Simple Interest:</strong> Final amount = ₹2,00,000
                  </li>
                  <li>
                    <strong>Compound Interest:</strong> Final amount ={' '}
                    <span className="font-semibold text-emerald-600">
                      ₹2,59,000
                    </span>
                  </li>
                </ul>

                <p className="text-slate-700">
                  That extra <strong>₹59,000</strong> is purely due to
                  compounding — money earning money.
                </p>
              </section>

              {/* --- RELATED CALCULATORS --- */}
              <section className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  Related Calculators
                </h3>
                <ul className="list-disc pl-5 text-emerald-700 font-medium">
                  <li>
                    <Link href="/sip-calculator/" className="hover:underline">
                      SIP Calculator
                    </Link>
                  </li>
                  <li>
                    <Link href="/fd-calculator/" className="hover:underline">
                      Fixed Deposit Calculator
                    </Link>
                  </li>
                  <li>
                    <Link href="/ppf-calculator/" className="hover:underline">
                      PPF Calculator
                    </Link>
                  </li>
                </ul>
              </section>
            </article>

            {/* FAQs */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="mb-6 text-2xl font-semibold text-slate-900">
                    Frequently Asked Questions (FAQs)
                  </h2>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="item-0"
                    className="w-full space-y-2"
                  >
                    {faqItems.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="rounded-lg border px-4"
                      >
                        <AccordionTrigger className="text-left text-slate-900 font-medium hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>

                        <AccordionContent className="text-sm leading-relaxed text-slate-600">
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
              <AdSlot id="ci-sidebar" type="box" />
            </div>

            <div>
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
