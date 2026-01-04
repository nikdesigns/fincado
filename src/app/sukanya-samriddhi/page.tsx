import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SSYClient from './SSYClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Comparison context
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost
import { Card, CardContent } from '@/components/ui/card';
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
import FAQSchema from '@/components/FAQSchema';

/* ---------------- SEO METADATA (Optimized 2025) ---------------- */
export const metadata: Metadata = {
  title: 'SSY Calculator 2025 – Sukanya Samriddhi Maturity Value',
  description:
    "Calculate the maturity amount for your daughter's SSY account. Check 2025 interest rates (8.2%), tax benefits (EEE), and yearly growth schedule.",
  keywords: [
    'SSY Calculator',
    'Sukanya Samriddhi Yojana Calculator',
    'SSY Interest Rate 2025',
    'Girl Child Investment Plan',
    'Post Office SSY',
    'SSY vs PPF',
    'Tax Free Savings Scheme',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/sukanya-samriddhi/',
  },
  openGraph: {
    title: "SSY Calculator – Secure Your Daughter's Future",
    description:
      'Free tool to calculate SSY maturity value with current government interest rates.',
    url: 'https://www.fincado.com/sukanya-samriddhi/',
    type: 'website',
  },
};

export const SSY_FAQS = [
  {
    question: 'How long do I need to deposit money?',
    answer:
      'You need to deposit money for the first 15 years from the date of account opening. The account continues to earn interest without deposits for the remaining 6 years until maturity (total 21 years).',
  },
  {
    question: "Can I withdraw money for my daughter's education?",
    answer:
      'Yes. Partial withdrawal of up to 50% of the balance is allowed for higher education expenses once the girl child attains the age of 18 or passes the 10th standard.',
  },
  {
    question: 'What happens if the girl gets married before 21?',
    answer:
      'If the girl child turns 18 and gets married, the SSY account can be closed prematurely. No interest is credited after the date of marriage.',
  },
];
/* ---------------- PAGE ---------------- */

export default function SSYPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      <strong>Sukanya Samriddhi Yojana (SSY)</strong> is a government-backed savings scheme launched 
      as part of the <em>Beti Bachao, Beti Padhao</em> campaign. It is designed exclusively for the 
      girl child to build a corpus for her higher education and marriage expenses.
    </p>
    <p class="mt-2">
      It offers the <strong>highest interest rate</strong> among all small savings schemes and falls under 
      the <strong>EEE (Exempt-Exempt-Exempt)</strong> tax category, making it the best investment 
      for your daughter's future.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2">
      <li><strong>Girl Child:</strong> Account can be opened in the name of a girl child below 10 years of age.</li>
      <li><strong>Limit:</strong> Only one account per girl child. Maximum two accounts per family (exception for twins/triplets).</li>
      <li><strong>Min/Max Deposit:</strong> Minimum ₹250/year and Maximum ₹1.5 Lakh/year.</li>
    </ul>
  `);

  const withdrawalContent = autoLinkContent(`
    <p>
      <strong>Partial Withdrawal:</strong> You can withdraw up to 50% of the balance for the girl's 
      higher education once she turns 18 or passes 10th standard.
    </p>
    <p>
      <strong>Full Maturity:</strong> The account matures 21 years after opening. However, it can be 
      closed earlier if the girl gets married after turning 18.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Sukanya Samriddhi Yojana Calculator"
        description="Calculate the maturity amount for your daughter's SSY account based on current government interest rates."
        url="https://www.fincado.com/sukanya-samriddhi/"
      />

      {/* FAQ Schema */}
      <FAQSchema
        faqs={SSY_FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://www.fincado.com' },
            { name: 'Calculators', url: 'https://www.fincado.com/calculators' },
            {
              name: 'SSY Calculator',
              url: 'https://www.fincado.com/sukanya-samriddhi/',
            },
          ]}
        />

        <header className="no-print my-6">
          {/* Share + Language */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Sukanya Samriddhi Yojana (SSY) Calculator" />
            <LanguageToggle path="/hi/sukanya-samriddhi/" />
          </div>

          {/* Title */}
          <h1
            className="
      text-[clamp(1.9rem,4vw,2.6rem)]
      font-semibold
      leading-tight
      tracking-[-0.02em]
      text-slate-900
    "
          >
            <span
              className="
        block
        text-2xl
        sm:text-3xl
        lg:text-4xl
        font-semibold
        tracking-tight
      "
            >
              Sukanya Samriddhi Yojana (SSY) Calculator
            </span>

            <span className="block mt-2 text-base sm:text-lg font-medium text-lime-700">
              Build a tax-free corpus for your daughter’s education & marriage
            </span>
          </h1>

          {/* Intro */}
          <WikiText
            content={`
      <p class="max-w-2xl text-slate-600 mt-2">
        Secure your daughter&apos;s future with India&apos;s highest-return
        small savings scheme. Calculate the <strong>tax-free maturity amount</strong>
        for education or marriage planning.
      </p>
    `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <SSYClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="ssy-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (PPF vs SSY Comparison Context) */}
            <LiveRateTable type="fixedDeposit" />

            {/* ✅ Mobile-Only Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Related Calculators
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/ppf-calculator"
                  className="
        rounded-lg
        border border-slate-200
        bg-white
        px-3 py-3
        text-center
        text-sm
        font-medium
        text-slate-900
        transition
        hover:border-slate-300
        hover:bg-slate-50
      "
                >
                  🏦 PPF Calculator
                </Link>

                <Link
                  href="/sip-calculator"
                  className="
        rounded-lg
        border border-slate-200
        bg-white
        px-3 py-3
        text-center
        text-sm
        font-medium
        text-slate-900
        transition
        hover:border-slate-300
        hover:bg-slate-50
      "
                >
                  📈 Children&apos;s Fund
                </Link>
              </div>
            </div>

            {/* ✅ Promo Box */}
            <div
              className="
    no-print
    mt-8
    flex items-center gap-3
    rounded-lg
    border border-lime-200
    bg-lime-50
    p-4
  "
            >
              <span className="text-2xl">👧</span>

              <div>
                <strong className="block text-sm font-semibold text-lime-800">
                  Best Plan for Girl Child?
                </strong>

                <Link
                  href="/guides/ssy-guide"
                  className="
        mt-1 inline-block
        text-sm
        font-semibold
        text-lime-700
        underline
        underline-offset-2
        hover:text-lime-800
      "
                >
                  Read: SSY vs Mutual Funds Comparison →
                </Link>
              </div>
            </div>

            <div className="no-print my-10 flex justify-center">
              <AdSlot id="ssy-mid-content" type="leaderboard" />
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print space-y-10">
              {/* INTRO */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Sukanya Samriddhi Yojana (SSY)?
                </h2>
                <WikiText content={introContent} />
              </section>

              {/* AD */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* ELIGIBILITY */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Who Can Open an SSY Account?
                </h3>
                <WikiText content={eligibilityContent} />
              </section>

              {/* COMPARISON TABLE */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  SSY vs PPF: Which is Better?
                </h3>

                <Card>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Feature</TableHead>
                            <TableHead>Sukanya Samriddhi (SSY)</TableHead>
                            <TableHead>Public Provident Fund (PPF)</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Interest Rate
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              ~8.2%
                            </TableCell>
                            <TableCell className="text-slate-700">
                              ~7.1%
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Eligibility
                            </TableCell>
                            <TableCell className="text-slate-700">
                              Girl Child (Below 10 years)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              Anyone
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Tenure
                            </TableCell>
                            <TableCell className="font-semibold">
                              21 Years
                            </TableCell>
                            <TableCell>15 Years</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Deposit Period
                            </TableCell>
                            <TableCell>15 Years</TableCell>
                            <TableCell>15 Years</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* WITHDRAWAL */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Withdrawal & Maturity Rules
                </h3>
                <WikiText content={withdrawalContent} />
              </section>

              {/* HOW CALCULATOR HELPS */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  How This Calculator Helps Your Planning
                </h3>

                <WikiText
                  content={`
        <p>
          SSY involves a long <strong>21-year tenure</strong>, where deposits are
          made for only 15 years but interest continues for the full period.
          Calculating this manually is complex.
        </p>
      `}
                />

                <div className="advantage-grid mt-6">
                  <div className="advantage-card">
                    <h4>Maturity Estimate</h4>
                    <p>
                      Know exactly how much corpus will be available when your
                      daughter turns <strong>21 years old</strong>.
                    </p>
                  </div>

                  <div className="advantage-card">
                    <h4>Deposit Planning</h4>
                    <p>
                      See how increasing deposits from ₹2,000 to ₹5,000 can
                      dramatically boost the final amount due to compounding.
                    </p>
                  </div>

                  <div className="advantage-card">
                    <h4>Long-Term Visibility</h4>
                    <p>
                      Understand the power of compounding over two decades with
                      a government-backed scheme.
                    </p>
                  </div>
                </div>
              </section>

              {/* FORMULA */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  SSY Interest Calculation Logic
                </h3>

                <p>
                  Interest in SSY is compounded annually at the end of each
                  financial year.
                </p>

                <div className="py-6 overflow-x-auto bg-slate-50 border border-slate-200 rounded-md">
                  <BlockMath math="A = P(1 + r)^n" />
                </div>

                <WikiText
                  content={`
        <p class="text-sm text-slate-600">
          <em>
            P includes accumulated principal and interest from previous years.
          </em>
        </p>
      `}
                />
              </section>

              {/* ADVANTAGES */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Key Advantages of SSY
                </h3>

                <WikiText
                  content={`
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Highest Small-Savings Returns:</strong> Higher than PPF and most FDs.</li>
          <li><strong>EEE Tax Benefit:</strong> Investment, interest, and maturity are fully tax-free.</li>
          <li><strong>Sovereign Guarantee:</strong> Backed by the Government of India.</li>
        </ul>
      `}
                />
              </section>
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Frequently Asked Questions (FAQs)
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {SSY_FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`ssy-faq-${index}`}
                    className="border-b"
                  >
                    <AccordionTrigger className="text-left font-medium text-slate-800">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="mb-6 sticky top-5">
              <AdSlot id="ssy-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
