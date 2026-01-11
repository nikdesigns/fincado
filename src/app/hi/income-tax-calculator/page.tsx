import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import IncomeTaxClient from '@/app/income-tax-calculator/IncomeTaxClient';
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
import { TrendingUp, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA (HINDI) ---------------- */
export const metadata: Metadata = {
  title: 'इनकम टैक्स कैलकुलेटर 2025 - नई vs पुरानी व्यवस्था (Tax Calculator)',
  description:
    'इनकम टैक्स कैलकुलेटर AY 2025-26: अपनी आय पर टैक्स की गणना करें और जानें कि आपके लिए नई टैक्स व्यवस्था (New Regime) बेहतर है या पुरानी (Old Regime)।',
  keywords: [
    'इनकम टैक्स कैलकुलेटर',
    'टैक्स कैलकुलेटर 2025',
    'नई टैक्स व्यवस्था vs पुरानी',
    'इनकम टैक्स स्लैब 2025',
    'सैलरी टैक्स कैलकुलेटर',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/income-tax-calculator/',
  },
  openGraph: {
    title: 'इनकम टैक्स कैलकुलेटर - अपना टैक्स बचाएं',
    description:
      'जानें कि आप नई व्यवस्था और 80C कटौती के साथ कितना टैक्स बचा सकते हैं।',
    url: 'https://fincado.com/hi/income-tax-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

// ✅ Hindi Labels for the Calculator
const hindiLabels = {
  ayLabel: 'निर्धारण वर्ष (AY)',
  ageLabel: 'आयु वर्ग',
  incomeLabel: 'कुल वार्षिक आय (₹)',
  deductionsLabel: 'कुल कटौती (80C, 80D आदि)',
  deductionHint: '*कटौती केवल पुरानी व्यवस्था (Old Regime) के लिए लागू है।',
  recommendationLabel: 'हमारा सुझाव (Recommendation)',
  saveLabel: 'बचत:',
  oldRegimeLabel: 'पुरानी व्यवस्था टैक्स',
  newRegimeLabel: 'नई व्यवस्था टैक्स',
  netIncomeLabel: 'हाथ में आने वाली आय (Net Income)',
  ageOptions: {
    regular: '60 से कम (सामान्य)',
    senior: '60 - 80 (वरिष्ठ नागरिक)',
    superSenior: '80 से ऊपर (सुपर सीनियर)',
  },
};

// FAQ Items
const taxFaqs = [
  {
    id: 'faq-1',
    question: 'क्या नई व्यवस्था में HRA छूट मिलती है?',
    answer:
      'नहीं। नई टैक्स व्यवस्था (New Regime) में HRA (मकान किराया भत्ता), LTA और धारा 80C जैसी प्रमुख कटौती उपलब्ध नहीं हैं।',
  },
  {
    id: 'faq-2',
    question: 'क्या मैं हर साल टैक्स रिजीम बदल सकता हूं?',
    answer:
      'वेतनभोगी व्यक्ति (Salaried) हर साल पुरानी और नई व्यवस्था के बीच चयन कर सकते हैं। हालांकि, जिन लोगों की व्यावसायिक आय (Business Income) है, वे जीवन में केवल एक बार ही स्विच कर सकते हैं।',
  },
  {
    id: 'faq-3',
    question: 'सेस (Cess) क्या है?',
    answer:
      'आपके कुल इनकम टैक्स पर 4% का "स्वास्थ्य और शिक्षा उपकर" (Health & Education Cess) लगाया जाता है। यह दोनों व्यवस्थाओं में लागू है।',
  },
];

/* ---------------- PAGE ---------------- */

export default function IncomeTaxHindiPage() {
  const introContent = autoLinkContent(`
    <p>
      यह <strong>इनकम टैक्स कैलकुलेटर</strong> आपको निर्धारण वर्ष (AY) 2025-26 और 2024-25 के लिए 
      आपके टैक्स की गणना करने में मदद करता है।
    </p>
    <p>
      यह स्वचालित रूप से <strong>पुरानी टैक्स व्यवस्था (Old Regime)</strong> और 
      <strong>नई टैक्स व्यवस्था (New Regime)</strong> की तुलना करता है और आपको बताता है कि 
      किसमें आपको कम टैक्स देना पड़ेगा।
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Income Tax Calculator Hindi"
        description="Calculate income tax liability in Hindi. Compare New vs Old Regime."
        url="https://fincado.com/hi/income-tax-calculator/"
      />

      <FAQSchema
        faqs={taxFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'होम', url: 'https://fincado.com/hi/' },
            {
              name: 'कैलकुलेटर',
              url: 'https://fincado.com/hi/calculators/',
            },
            {
              name: 'इनकम टैक्स कैलकुलेटर',
              url: 'https://fincado.com/hi/income-tax-calculator/',
            },
          ]}
        />

        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="इनकम टैक्स कैलकुलेटर - अपना टैक्स बचाएं" />
            <LanguageToggle path="/income-tax-calculator" />
          </div>

          <h1
            className="
            text-[clamp(1.8rem,4vw,2.5rem)]
            font-semibold
            leading-tight
            tracking-[-0.02em]
            text-slate-900
          "
          >
            <span className="block mb-2">इनकम टैक्स कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              AY 2025-26 • नई vs पुरानी व्यवस्था तुलना
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              अब टैक्स का अंदाजा लगाना छोड़ें।{' '}
              <strong>नई vs पुरानी व्यवस्था</strong> की तुरंत तुलना करें। बजट
              2024 के नवीनतम स्लैब और <strong>₹75,000</strong> के स्टैंडर्ड
              डिडक्शन के साथ अपडेटेड।
            </p>
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <IncomeTaxClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-tax-after-calc" type="banner" />
            </div>

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                टैक्स बचत कैलकुलेटर
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/elss-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  📉 ELSS कैलकुलेटर
                </Link>
                <Link
                  href="/hi/ppf-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  🔒 PPF कैलकुलेटर
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <TrendingUp className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    क्या आप धारा 80C का पूरा उपयोग कर रहे हैं?
                  </strong>

                  <Link
                    href="/guides/best-tax-saving-options-80c" // Check if Hindi guide exists
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>पढ़ें: टैक्स बचाने के 5 स्मार्ट तरीके</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: INTRO */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      नई vs पुरानी टैक्स व्यवस्था: कौन सी बेहतर है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 2: TAX SLAB TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      FY 2024-25 (New Regime) के लिए टैक्स स्लैब
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              आय सीमा (Income Range)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              टैक्स दर
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>₹3,00,000 तक</TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              शून्य (Nil)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>₹3 लाख से ₹7 लाख</TableCell>
                            <TableCell>5%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>₹7 लाख से ₹10 लाख</TableCell>
                            <TableCell>10%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>₹10 लाख से ₹12 लाख</TableCell>
                            <TableCell>15%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>₹12 लाख से ₹15 लाख</TableCell>
                            <TableCell>20%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>₹15 लाख से ऊपर</TableCell>
                            <TableCell>30%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* SECTION 3: RECOMMENDATION TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      आपके लिए कौन सी व्यवस्था सही है?
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              आपकी स्थिति
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              सुझाव
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>कुल कटौती ₹3.75 लाख से कम</TableCell>
                            <TableCell className="font-semibold text-emerald-700">
                              नई व्यवस्था (New)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>होम लोन + 80C + 80D कटौती</TableCell>
                            <TableCell className="font-semibold text-blue-700">
                              पुरानी व्यवस्था (Old)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>₹7 लाख तक की आय</TableCell>
                            <TableCell className="font-semibold text-emerald-700">
                              नई व्यवस्था (ज़ीरो टैक्स)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* SECTION 4: HOW TO SAVE TAX */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      2025 में टैक्स कैसे बचाएं?
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            स्टैंडर्ड डिडक्शन
                          </h4>
                          <p className="text-sm text-slate-600">
                            नई व्यवस्था में नौकरीपेशा लोगों को बिना किसी प्रूफ
                            के <strong>₹75,000</strong> की सीधी छूट मिलती है।
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            धारा 87A
                          </h4>
                          <p className="text-sm text-slate-600">
                            नई व्यवस्था में ₹7 लाख तक की आय पर टैक्स{' '}
                            <strong>शून्य</strong> है। पुरानी में यह सीमा ₹5 लाख
                            है।
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            धारा 80C (Old Regime)
                          </h4>
                          <p className="text-sm text-slate-600">
                            <Link
                              href="/hi/elss-calculator"
                              className="text-emerald-700 hover:underline"
                            >
                              ELSS
                            </Link>{' '}
                            और PPF में निवेश करके आप ₹1.5 लाख तक बचा सकते हैं।
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* --- FAQ SECTION --- */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    अक्सर पूछे जाने वाले प्रश्न (FAQs)
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={taxFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {taxFaqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left text-slate-900 font-medium">
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

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <AdSlot id="hi-tax-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
