import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RentReceiptClient from './RentReceiptClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { ArrowRight, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Free Rent Receipt Generator 2026 – PDF for HRA Exemption',
  description:
    'Generate professional rent receipts instantly for HRA tax exemption. Download PDF, add revenue stamp guidance & landlord PAN. 100% HR-approved format for FY 2026-27.',
  keywords: [
    'rent receipt generator',
    'rent receipt for HRA',
    'free rent receipt PDF',
    'HRA rent receipt 2026',
    'generate rent receipt online',
    'house rent receipt format',
    'Section 10(13A) receipt',
    'rent receipt for ITR',
    'HRA proof submission'
  ],
  alternates: {
    canonical: 'https://fincado.com/rent-receipt-generator/',
    languages: {
      'en-IN': 'https://fincado.com/rent-receipt-generator/',
      'hi-IN': 'https://fincado.com/hi/rent-receipt-generator/',
    },
  },
  openGraph: {
    title: 'Free Rent Receipt Generator (PDF Download) 2026',
    description:
      'Create HR-approved rent receipts instantly for HRA exemption. Professional format + revenue stamp guidance.',
    url: 'https://fincado.com/rent-receipt-generator/',
    type: 'website',
  },
};

export default function RentReceiptPage() {
  const introContent = autoLinkContent(`
    <p>
    A <strong>Rent Receipt</strong> is a documented proof of rent payment made by a tenant to a landlord. 
    Salaried employees in India must submit these receipts to their HR departments to claim 
    <strong>House Rent Allowance (HRA) exemption</strong> under Section 10(13A) of the Income Tax Act. 
    Without valid rent receipts, your HRA becomes fully taxable, significantly reducing your <a href="/salary-calculator/">In-Hand Salary</a>.
  </p>
  `);

  const rulesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Rent exceeds ₹1,00,000 annually:</strong> The Landlord's PAN is strictly mandatory. If they don't have a PAN, a written declaration is required.</li>
      <li><strong>Revenue Stamp:</strong> A ₹1 revenue stamp must be affixed and signed across by the landlord <strong>only if</strong> the rent is paid in cash and exceeds ₹5,000 per receipt. For online transfers (NEFT/UPI/Cheque), a revenue stamp is not legally required.</li>
      <li><strong>Old vs New Regime:</strong> Remember, you can only claim HRA tax benefits if you opt for the <strong>Old Tax Regime</strong>. Compare your tax liability using our <a href="/income-tax-calculator/">Income Tax Calculator</a>.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Is a revenue stamp mandatory on rent receipts?',
      answer:
        'A ₹1 Revenue Stamp is legally required ONLY if the rent payment is made in CASH and exceeds ₹5,000 per receipt. If you pay your rent via Cheque, NEFT, RTGS, or UPI, a revenue stamp is NOT required. Your landlord just needs to sign the receipt.',
    },
    {
      id: 'faq-2',
      question: "Do I need my landlord's PAN card?",
      answer:
        "Yes, if your annual rent payment exceeds ₹1,00,000 (i.e., more than ₹8,333 per month), you must submit your landlord's PAN to your employer to claim HRA.",
    },
    {
      id: 'faq-3',
      question: 'Can I generate one receipt for the entire year?',
      answer:
        'While legally possible, most corporate HR departments and the Income Tax portal prefer monthly, quarterly, or half-yearly receipts. It is safest to generate a receipt for each quarter or month.',
    },
    {
      id: 'faq-4',
      question: 'Can I claim HRA if I pay rent to my parents?',
      answer:
        'Yes, you can claim HRA by paying rent to your parents, provided the property is registered in their name and they declare this rental income in their annual Income Tax Return (ITR). You must generate rent receipts and ideally transfer the money via bank transfer as proof.',
    },
    {
      id: 'faq-5',
      question: 'Is this rent receipt format accepted by all companies?',
      answer:
        'Yes. The format follows the exact requirements of Section 10(13A) and is accepted by almost all Indian companies and government departments.',
    },
    {
      id: 'faq-6',
      question: 'Can I edit the receipt after downloading?',
      answer:
        'You can download the PDF and edit it in any PDF editor if needed. However, we recommend generating a fresh receipt for each period to keep records clean.',
    },
    {
      id: 'faq-7',
      question: 'Do I need to submit rent receipts every month?',
      answer:
        'Most companies ask for receipts quarterly or half-yearly. Some ask for monthly. It is best to generate and keep receipts for every month as backup.',
    },
    {
      id: 'faq-8',
      question: 'What if my landlord refuses to sign the receipt?',
      answer:
        'You can still claim HRA by submitting bank transfer proofs + a self-declaration. However, a signed rent receipt is the strongest proof.',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Rent Receipt Generator',
            url: 'https://fincado.com/rent-receipt-generator/',
          }
        ]}
      />

      <CalculatorSchema
        name="Rent Receipt Generator"
        description="Generate and download free PDF rent receipts for HRA tax exemption."
        url="https://fincado.com/rent-receipt-generator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Rent Receipt Generator – Free PDF for HRA" />
            <LanguageToggle path="/hi/rent-receipt-generator/" />
          </div>
          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Rent Receipt Generator
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-1">
              Create Free PDFs for HRA Proof
            </span>
          </h1>

          {/* LAST UPDATED BANNER */}
          <div className="flex items-center gap-2 text-sm font-medium bg-brand-50 border border-brand-400 text-brand-700 px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1">
              ✅ Updated for FY 2026-27
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-brand-400">
              April 12, 2026
            </span>
            <span className="text-xs">• Compliant with Section 10(13A)</span>
          </div>

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="receipt-top" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText
              content={`
                <p>
                  Instantly generate professional, HR-approved <strong>Rent Receipts</strong>. Fill in your details below, and download or print the PDF directly. No sign-up required. Essential for claiming your House Rent Allowance (HRA) tax benefits.
                </p>
              `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <Alert className="no-print mb-6 bg-slate-50/50 border-slate-200 text-slate-600">
              <Printer className="h-4 w-4 text-emerald-600 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong>How to save as PDF:</strong> Fill the form, click the
                green Print button, and select &quot;Save as PDF&quot; as your
                Destination in the browser print dialog.
              </AlertDescription>
            </Alert>

            {/* The Generator Component */}
            <RentReceiptClient />

            {/* Related Tools Links */}
            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/hra-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Image
                  src="/images/icons/tax.svg"
                  alt="Tax icon"
                  width={16}
                  height={16}
                  className="mr-2"
                />{' '}
                Calculate HRA Exemption
              </Link>
              <Link
                href="/salary-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                Check In-Hand Salary <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Expanded Educational Content */}
            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Why Do You Need a Rent Receipt?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Crucial HRA Exemption Rules (FY 2026-27)
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-brand-50 border border-brand-200 p-6 rounded-xl">
                      <WikiText content={rulesContent} />
                    </div>
                  </section>

                  {/* HRA Exemption Table */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      HRA Exemption Calculation (Quick Reference)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="text-left p-4 border">Condition</th>
                            <th className="text-left p-4 border">
                              Exemption Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-4 border">Least of the three:</td>
                            <td className="p-4 border">Actual HRA received</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">
                              Rent paid minus 10% of Basic Salary
                            </td>
                            <td className="p-4 border">
                              Rent paid - 10% Basic
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border">
                              50% of Basic (Metro) or 40% (Non-Metro)
                            </td>
                            <td className="p-4 border">50%/40% of Basic</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* FAQ Section */}
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
                        <AccordionContent className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <div className="no-print mt-8">
              <AuthorBio />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <AdSlot id="receipt-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
