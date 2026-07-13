import type { Metadata } from 'next';
import CreditCardEligibilityClient from './CreditCardEligibilityClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import { CardVerifiedNote, CardClusterNav } from '@/components/CreditCardFacts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { CreditCard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Credit Card Eligibility Calculator India (2026) | Fincado',
  description:
    'Check which type of credit card you are likely eligible for in India based on your income, employment type, age and CIBIL score band. Free instant estimate.',
  keywords: [
    'credit card eligibility calculator',
    'credit card eligibility check india',
    'which credit card can i get',
    'credit card eligibility by income',
    'credit card eligibility cibil score',
  ],
  alternates: {
    canonical: 'https://fincado.com/credit-card-eligibility-calculator/',
  },
  openGraph: {
    title: 'Credit Card Eligibility Calculator India (2026)',
    description:
      'Estimate which tier of credit card you are likely eligible for based on income, employment, age and CIBIL score.',
    url: 'https://fincado.com/credit-card-eligibility-calculator/',
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

const FAQ_ITEMS = [
  {
    question: 'How is credit card eligibility usually decided in India?',
    answer:
      'Issuers typically weigh monthly or annual income, employment type, age, existing credit obligations, and CIBIL score. Each bank sets its own thresholds and there is no single regulatory standard.',
  },
  {
    question: 'Can I get a credit card with no income proof?',
    answer:
      'Yes — secured cards issued against a Fixed Deposit (like SBI Card Unnati) do not require income proof and are commonly used by students, homemakers, and first-time applicants to start building a credit history.',
  },
  {
    question: 'What CIBIL score is considered good enough for a premium card?',
    answer:
      'Most premium and super-premium cards expect a CIBIL score of 750 or above, along with a clean repayment history and higher stated income.',
  },
  {
    question: 'Does this calculator guarantee I will be approved?',
    answer:
      'No. This tool gives a simplified estimate based on commonly stated issuer criteria. Actual approval depends on the specific bank’s underwriting, your full credit report, and existing debt obligations.',
  },
  {
    question: 'Does applying to multiple cards at once hurt my eligibility?',
    answer:
      'Yes, multiple hard inquiries in a short period can be seen as credit-seeking behavior and may lower your score, which can reduce approval odds elsewhere.',
  },
];

export default function CreditCardEligibilityCalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          {
            name: 'Credit Card Eligibility Calculator',
            url: 'https://fincado.com/credit-card-eligibility-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Credit Card Eligibility Calculator"
        description="Estimate which tier of Indian credit card you are likely eligible for based on income, employment type, age and CIBIL score band."
        url="https://fincado.com/credit-card-eligibility-calculator/"
      />

      <FAQSchema faqs={FAQ_ITEMS} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Credit Card Eligibility Calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-brand-50 to-green-100 text-brand-700">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Credit Card Eligibility Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-brand-700">
                Estimate Your Card Tier in India
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Enter your <strong>income, employment type, age, and CIBIL score band</strong> to get an
                  instant estimate of the type of credit card you are likely eligible for in India — from
                  secured, credit-building cards to premium and super-premium tiers.
                </p>
              `}
            />
          </div>

          <div className="no-print my-6">
            <AdSlot id="credit-card-eligibility-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <CardVerifiedNote />

            <CreditCardEligibilityClient />

            <div className="no-print my-8">
              <AdSlot id="credit-card-eligibility-after-calc" type="square" />
            </div>

            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible defaultValue="item-0" className="space-y-2">
                    {FAQ_ITEMS.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
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

            <div className="no-print my-8">
              <CardClusterNav />
            </div>

            <div className="no-print my-8 flex justify-center">
              <AdSlot id="credit-card-eligibility-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
            <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
              <strong>Disclaimer:</strong> This tool is for educational purposes only and does not constitute
              financial advice or a guarantee of credit card approval. Each issuer applies its own underwriting
              policy. Always verify current eligibility criteria on the issuer&apos;s official page before
              applying.
            </p>
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <AdSlot id="credit-card-eligibility-sidebar-top" type="skyscraper" />
              <SidebarCompareWidget />
              <AdSlot id="credit-card-eligibility-sidebar-bottom" type="box" lazyLoad />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
