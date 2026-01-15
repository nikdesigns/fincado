import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PersonalLoanClient from './PersonalLoanClient';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { Banknote, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator – Check Eligibility & Interest (2025)',
  description:
    'Calculate Personal Loan EMI instantly. Compare interest rates from HDFC, SBI, ICICI. Check eligibility, documents required, and foreclosure charges.',
  keywords: [
    'Personal Loan EMI Calculator',
    'Personal Loan Interest Rate',
    'Unsecured Loan Calculator',
    'Loan Eligibility Calculator',
    'Prepayment Calculator',
    'Personal Loan vs Credit Card',
  ],
  alternates: {
    canonical: 'https://fincado.com/loans/personal-loan/',
  },
  openGraph: {
    title: 'Personal Loan EMI Calculator – Plan Your Finances',
    description:
      'Free tool to calculate Personal Loan EMI, Interest, and Tenure.',
    url: 'https://fincado.com/loans/personal-loan/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function PersonalLoanPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Personal Loan</strong> is an <strong>unsecured form of credit</strong>
      provided by financial institutions to help you meet immediate financial needs. 
      Unlike home or car loans, it is not restricted to a specific purpose.
    </p>
    <p class="mt-4">
      Because it is "unsecured," you do not need to pledge any <strong>collateral</strong> 
      (like property or gold). The approval is based primarily on your <strong>Credit Score</strong>, 
      income stability, and repayment capacity.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2">
      <li><strong>Employment:</strong> Salaried (MNC/Pvt Ltd/Govt) or Self-Employed.</li>
      <li><strong>Age:</strong> 21 to 60 years.</li>
      <li><strong>Credit Score:</strong> A CIBIL score of <strong>750+</strong> gets the best rates.</li>
      <li><strong>Income:</strong> Minimum monthly net income of ₹25,000 (varies by city).</li>
      <li><strong>Experience:</strong> Min 2 years total work experience.</li>
    </ul>
  `);

  const comparisonContent = autoLinkContent(`
    <p>
      Many borrowers confuse Personal Loans with Credit Card loans. 
      <strong>Personal Loans</strong> are generally cheaper (10.5%–14%) compared to Credit Card 
      revolving credit (36%–42%). Always choose a personal loan for large expenses like 
      weddings or medical emergencies.
    </p>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Is interest on personal loan tax deductible?',
      answer:
        'Generally, personal loan interest is not tax deductible. However, if the loan is used for home renovation (deductible under Section 24) or for business purposes, interest may be claimed as a deduction with proper documentation.',
    },
    {
      id: 'faq-2',
      question: 'What are foreclosure charges on a personal loan?',
      answer:
        'Most banks charge 2% to 4% of the outstanding principal if you close the loan before tenure completion. Some lenders waive foreclosure charges after a fixed period.',
    },
    {
      id: 'faq-3',
      question: 'What is a good CIBIL score for a personal loan?',
      answer:
        'A CIBIL score of 750 or above is considered excellent and helps you secure lower interest rates and faster approval.',
    },
    {
      id: 'faq-4',
      question: 'Can I prepay my personal loan anytime?',
      answer:
        'Yes, most banks allow part-prepayment or foreclosure, but charges may apply during the initial years of the loan tenure.',
    },
    {
      id: 'faq-5',
      question: 'Does personal loan EMI change during tenure?',
      answer:
        'Personal loans usually have fixed interest rates, so EMI remains constant unless you prepay or refinance the loan.',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Personal Loan EMI Calculator"
        description="Check your personal loan EMI. Compare interest rates and repayment terms from top banks."
        url="https://fincado.com/loans/personal-loan/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Loans', url: 'https://fincado.com/loans/' },
            {
              name: 'Personal Loan EMI Calculator',
              url: 'https://fincado.com/loans/personal-loan/',
            },
          ]}
        />

        <header className="no-print my-4">
          {/* TOP ACTION ROW */}
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Personal Loan EMI Calculator" />
            <LanguageToggle path="/hi/loans/personal-loan" />
          </div>

          {/* TITLE */}
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
        text-slate-900
      "
            >
              Personal Loan EMI Calculator
            </span>

            <span className="block text-base sm:text-lg font-medium text-lime-700 mt-2">
              Calculate EMI for travel, weddings & emergencies
            </span>
          </h1>

          {/* DESCRIPTION */}
          <div className="max-w-3xl mt-4 text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
        <p>
          Plan your expenses confidently using our <strong>Personal Loan EMI Calculator</strong>.
          Instantly check monthly EMI, total interest cost, and repayment timeline
          before applying for an unsecured loan.
        </p>
      `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <PersonalLoanClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="personal-loan-after-calc" type="banner" />
            </div>

            <LiveRateTable type="personalLoan" />

            {/* Promo Content */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                {/* Icon Container */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Banknote className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Need a loan quickly?
                  </strong>

                  <Link
                    href="/guides/personal-loan-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Read our Guide: How to Get Approved Instantly</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Rich seo content */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- SECTION: WHAT IS PERSONAL LOAN --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is a Personal Loan?
                    </h2>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- SECTION: ELIGIBILITY --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Who is Eligible for a Personal Loan?
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={eligibilityContent} />
                    </div>
                  </section>

                  {/* --- AD SLOT (CONSISTENT POSITION) --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* --- SECTION: COMPARISON --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Personal Loan vs Credit Card Loan
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={comparisonContent} />
                    </div>
                  </section>

                  {/* --- SECTION: HOW CALCULATOR HELPS --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How This Personal Loan EMI Calculator Helps
                    </h3>

                    <p className="text-slate-700">
                      Using a <strong>Personal Loan EMI Calculator</strong>{' '}
                      before applying helps you validate affordability, avoid
                      over-borrowing, and plan prepayments efficiently.
                    </p>

                    <div className="advantage-grid">
                      <div className="advantage-card">
                        <h4>Assess Affordability</h4>
                        <p>
                          Ensure your EMI stays within 40–50% of your monthly
                          take-home salary.
                        </p>
                      </div>

                      <div className="advantage-card">
                        <h4>Choose the Right Tenure</h4>
                        <p>
                          Longer tenure lowers EMI but increases total interest
                          paid over time.
                        </p>
                      </div>

                      <div className="advantage-card">
                        <h4>Plan Smart Prepayments</h4>
                        <p>
                          Track outstanding balance reduction to plan
                          foreclosure using bonuses or salary hikes.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* --- SECTION: EMI FORMULA (EMI STYLE) --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Personal Loan EMI Formula
                    </h3>

                    <p className="text-slate-700">
                      Banks calculate Personal Loan EMI using the standard
                      reducing balance formula:
                    </p>

                    <div className="overflow-x-auto text-sm rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <BlockMath math="EMI = \frac{P \times R \times (1+R)^N}{(1+R)^N - 1}" />
                    </div>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
              <ul class="list-disc list-inside space-y-2 text-xs">
                <li><strong>P</strong> = Loan Amount (Principal)</li>
                <li><strong>R</strong> = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)</li>
                <li><strong>N</strong> = Loan Tenure in Months</li>
              </ul>
            `}
                      />
                    </div>

                    <p className="text-sm text-slate-600">
                      This Personal Loan calculator follows RBI-aligned EMI
                      formulas used by Indian banks and NBFCs.
                    </p>
                  </section>

                  {/* --- SECTION: ADVANTAGES --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Key Advantages of a Personal Loan
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText
                        content={`
              <ul class="list-disc list-inside space-y-2">
                <li><strong>No Collateral Required:</strong> Your assets remain untouched.</li>
                <li><strong>Quick Disbursal:</strong> Funds often credited within 24–48 hours.</li>
                <li><strong>Flexible Usage:</strong> Weddings, travel, medical needs, or emergencies.</li>
                <li><strong>Fixed Interest Rates:</strong> EMIs remain constant throughout the tenure.</li>
              </ul>
            `}
                      />
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* --- FAQ SECTION --- */}
            <section className="no-print my-12">
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
                        <AccordionContent className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <AuthorBio />
            </section>
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <AdSlot id="personal-loan-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
