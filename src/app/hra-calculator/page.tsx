import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HRAClient from './HRAClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import {
  BadgeCheck,
  Building2,
  FileText,
  AlertTriangle,
  Calculator,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'HRA Calculator 2026 – House Rent Allowance Exemption',
  description:
    'Calculate HRA exemption for Income Tax (FY 2026-27). Check tax-free rent limits for Metro vs Non-Metro cities under Old Tax Regime.',
  keywords: [
    'HRA Calculator',
    'House Rent Allowance',
    'HRA Exemption Calculator',
    'Section 10(13A)',
    'Rent Receipt Tax Benefit',
    'Old Tax Regime HRA',
  ],
  alternates: {
    canonical: 'https://fincado.com/hra-calculator/',
  },
  openGraph: {
    title: 'HRA Calculator – Save Tax on Rent',
    description:
      'Instantly calculate your tax-exempt House Rent Allowance (HRA) as per Section 10(13A).',
    url: 'https://fincado.com/hra-calculator/',
    type: 'website',
  },
};

const HRA_FAQS = [
  {
    question: 'Is HRA exemption available in the New Tax Regime?',
    answer:
      'No. The New Tax Regime (default for FY 2026-27) does not allow HRA exemption. You must opt for the Old Tax Regime to claim HRA benefits.',
  },
  {
    question: 'Do I need my landlord’s PAN card for HRA?',
    answer:
      'Yes, if your annual rent payment exceeds ₹1,00,000, quoting the landlord’s PAN is mandatory to claim HRA exemption.',
  },
  {
    question: 'Can I claim HRA if I live with my parents?',
    answer:
      'Yes, you can claim HRA if you pay rent to your parents and have valid rent receipts. However, your parents must show this rent as "Income from House Property" in their tax returns.',
  },
  {
    question: 'Which cities are considered Metro cities for HRA?',
    answer:
      'Only four cities are considered Metros for 50% HRA calculation: Delhi, Mumbai, Kolkata, and Chennai. All other cities (including Bangalore, Hyderabad, Pune) are Non-Metro (40%).',
  },
];

/* ---------------- PAGE ---------------- */

export default function HRAPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>House Rent Allowance (HRA)</strong> is a salary component paid by employers to help employees 
      meet their accommodation expenses. Under <strong>Section 10(13A)</strong> of the Income Tax Act, 
      a portion of HRA can be claimed as tax-exempt, provided you live in a rented house.
    </p>
    <p class="mt-2">
      This calculator helps you determine the exact <strong>Tax-Free HRA</strong> amount based on your 
      salary structure, rent paid, and city of residence.
    </p>
  `);

  const logicContent = autoLinkContent(`
    <p>
      The HRA exemption is calculated as the <strong>lowest</strong> of the following three values:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Actual HRA Received:</strong> The amount your employer pays you.</li>
      <li><strong>Rent Paid - 10% of Salary:</strong> Actual rent minus 10% of (Basic + DA).</li>
      <li><strong>50% or 40% of Salary:</strong> 50% for Metro cities (Delhi, Mumbai, Kolkata, Chennai) and 40% for Non-Metro cities.</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="HRA Calculator"
        description="Calculate House Rent Allowance (HRA) tax exemption limits."
        url="https://fincado.com/hra-calculator/"
      />

      <FAQSchema
        faqs={HRA_FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators/' },
            {
              name: 'HRA Calculator',
              url: 'https://fincado.com/hra-calculator/',
            },
          ]}
        />

        <header className="no-print my-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="HRA Calculator 2026" />
            <LanguageToggle path="/hi/hra-calculator/" />
          </div>

          <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em] text-slate-900">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              HRA Calculator
            </span>
            <span className="block mt-2 text-base sm:text-lg font-medium text-emerald-700">
              Calculate Tax-Free House Rent Allowance
            </span>
          </h1>

          <div className="mt-4 max-w-3xl text-slate-500 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Maximize your salary tax savings. Check how much of your rent
                  allowance is <strong>exempt from tax</strong> under Section
                  10(13A) of the Income Tax Act.
                </p>
              `}
            />
          </div>

          {/* ✅ Budget 2026 Alert */}
          <div className="mt-6 flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg items-start shadow-sm max-w-2xl">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-amber-900">
                Important: Old Tax Regime Only
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">
                HRA exemption is <strong>NOT available</strong> under the New
                Tax Regime (Default). You must opt for the Old Tax Regime to
                claim this benefit in FY 2026-27.
              </p>
            </div>
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <HRAClient />

            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hra-after-calc" type="banner" />
            </div>

            {/* Related Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Related Tax Tools
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/income-tax-calculator/"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  <Calculator className="w-4 h-4" /> Tax Calculator
                </Link>
                <Link
                  href="/sip-calculator/"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  📈 SIP Calculator
                </Link>
              </div>
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print space-y-10">
              {/* INTRO */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Understanding HRA Exemption
                </h2>
                <WikiText content={introContent} />
              </section>

              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* CALCULATION LOGIC */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  How HRA Exemption is Calculated
                </h3>
                <WikiText content={logicContent} />

                {/* Visual Cards for 3 Rules */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
                        1
                      </div>
                      <p className="text-sm font-medium text-slate-800">
                        Actual HRA Received
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        (From Employer)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
                        2
                      </div>
                      <p className="text-sm font-medium text-slate-800">
                        Rent Paid - 10% Salary
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        (Excess Rent)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
                        3
                      </div>
                      <p className="text-sm font-medium text-slate-800">
                        50% / 40% of Salary
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        (Metro / Non-Metro)
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-xs text-center text-slate-500 italic">
                  *Salary = Basic + Dearness Allowance (DA)
                </p>
              </section>

              {/* FORMULA */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Mathematical Formula
                </h3>
                <div className="py-6 overflow-x-auto bg-slate-50 px-4 rounded-md border border-slate-200">
                  <BlockMath math="\text{Exempt} = \min(\text{HRA}, \text{Rent} - 0.1 \times \text{Salary}, 0.5 \times \text{Salary})" />
                </div>
              </section>

              {/* DOCUMENTS */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Documents Required to Claim HRA
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-100 bg-white">
                    <FileText className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900">
                        Rent Receipts
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Required monthly or quarterly. Must have a revenue stamp
                        if cash &gt; ₹5000.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-100 bg-white">
                    <BadgeCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900">
                        Landlord&apos;s PAN
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Mandatory if total annual rent exceeds ₹1,00,000.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </article>

            {/* FAQs */}
            <section className="article no-print mt-12">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Frequently Asked Questions (FAQs)
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {HRA_FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`hra-faq-${index}`}
                    className="border-b"
                  >
                    <AccordionTrigger className="text-left font-medium text-slate-800 hover:no-underline">
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
            <div className="sticky top-28 space-y-6">
              <AdSlot id="hra-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
