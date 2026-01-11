import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HomeLoanClient from '@/app/loans/home-loan/HomeLoanClient';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import LanguageToggle from '@/components/LanguageToggle';
import HindiSidebar from '@/components/HindiSidebar';
import FAQSchema from '@/components/FAQSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Home, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'होम लोन EMI कैलकुलेटर – ब्याज और टैक्स छूट की गणना करें | Fincado',
  description:
    'Fincado होम लोन कैलकुलेटर (Hindi): अपनी मासिक किस्त (EMI) जानें, कुल ब्याज की गणना करें और टैक्स छूट (Section 80C, 24b) का लाभ उठाएं।',
  keywords: [
    'Home Loan EMI Calculator Hindi',
    'Housing Loan Calculator India',
    'Home Loan Tax Benefit Hindi',
    'SBI Home Loan Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/loans/home-loan/',
    languages: {
      'en-IN': 'https://fincado.com/loans/home-loan/',
    },
  },
  openGraph: {
    title: 'होम लोन EMI कैलकुलेटर – अपने घर का सपना पूरा करें',
    description: 'मुफ्त टूल: होम लोन EMI, ब्याज और टैक्स बचत की गणना करें।',
    url: 'https://fincado.com/hi/loans/home-loan/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiHomeLoanPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
    interestRate: 'ब्याज दर (Interest Rate %)',
    tenure: 'अवधि (Years)',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principal: 'मूल राशि (Principal)',
    interest: 'ब्याज (Interest)',
    amortizationSchedule: 'किस्त तालिका (Amortization)',
    yearlyBreakdown: 'वर्ष के अनुसार विवरण',
    copy: 'कॉपी करें',
    export: 'डाउनलोड (CSV)',
    print: 'प्रिंट करें',
    month: 'माह',
    balance: 'बकाया राशि',
  };

  // ✅ FAQ Items
  const faqItems = [
    {
      id: 'faq-1',
      question: 'होम लोन कैलकुलेटर कैसे मदद करता है?',
      answer:
        'यह आपको लोन लेने से पहले ही अपनी मासिक ईएमआई (EMI), कुल ब्याज लागत और टैक्स लाभों का सटीक अनुमान लगाने में मदद करता है, ताकि आप सही बजट बना सकें।',
    },
    {
      id: 'faq-2',
      question: 'होम लोन पर टैक्स लाभ क्या हैं?',
      answer:
        'आप धारा 80C के तहत मूलधन (Principal) भुगतान पर ₹1.5 लाख तक और धारा 24(b) के तहत ब्याज भुगतान पर ₹2 लाख तक की टैक्स कटौती का दावा कर सकते हैं।',
    },
    {
      id: 'faq-3',
      question: 'क्या लोन अवधि (Tenure) ब्याज को प्रभावित करती है?',
      answer:
        'हाँ। लंबी अवधि (जैसे 30 साल) चुनने से आपकी EMI कम हो जाती है, लेकिन बैंक को दिया जाने वाला कुल ब्याज काफी बढ़ जाता है।',
    },
    {
      id: 'faq-4',
      question: 'क्या मैं अपनी EMI बीच में बदल सकता हूँ?',
      answer:
        'हाँ, आप "Prepayment" करके या लोन रिफाइनेंस (Balance Transfer) कराके अपनी EMI या अवधि कम कर सकते हैं।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Home Loan EMI Calculator Hindi"
        description="Calculate Home Loan EMI and Tax Benefits in Hindi."
        url="https://fincado.com/hi/loans/home-loan/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'लोन', url: 'https://fincado.com/hi/loans/' },
          {
            name: 'होम लोन EMI कैलकुलेटर',
            url: 'https://fincado.com/hi/loans/home-loan/',
          },
        ]}
      />

      <FAQSchema faqs={faqItems} />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="होम लोन EMI कैलकुलेटर – ब्याज और टैक्स छूट" />
            <LanguageToggle path="/loans/home-loan" />
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
            <span className="block mb-2">होम लोन EMI कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              EMI, ब्याज और टैक्स छूट की सटीक गणना करें
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              अपने सपनों के घर की योजना बनाएं। Fincado के{' '}
              <strong>बैंक-ग्रेड कैलकुलेटर</strong> से तुरंत जानें कि आपकी मासिक
              किस्त कितनी होगी और आप <strong>धारा 80C और 24(b)</strong> के तहत
              कितना टैक्स बचा सकते हैं।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <HomeLoanClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-home-loan-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="homeLoan" />

            {/* PROMO CARD (Hindi) */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Home className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    क्या आप अपना पहला घर खरीद रहे हैं?
                  </strong>
                  <Link
                    href="/guides/home-loan-guide" // Ensure this link exists or use English fallback
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>हमारी विस्तृत होम लोन गाइड पढ़ें (2025 Edition)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* Section 1: Definition */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      होम लोन क्या है? (What is a Home Loan?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        होम लोन एक सुरक्षित ऋण (Secured Loan) है जो बैंक या
                        वित्तीय संस्थान घर खरीदने, बनाने या मरम्मत करने के लिए
                        देते हैं। भारत में, होम लोन 30 साल तक की लंबी अवधि और
                        आकर्षक <strong>टैक्स लाभ (Tax Benefits)</strong> के साथ
                        आते हैं।
                      </p>
                    </div>
                  </section>

                  {/* Section 2: Tax Benefits */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      होम लोन पर टैक्स लाभ (Tax Benefits 2025)
                    </h3>
                    <p className="text-slate-700">
                      होम लोन भारत में टैक्स बचाने का सबसे अच्छा तरीका है। आप दो
                      धाराओं के तहत छूट का दावा कर सकते हैं:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>धारा 80C:</strong> मूलधन (Principal) भुगतान पर
                        ₹1.5 लाख तक की कटौती।
                      </li>
                      <li>
                        <strong>धारा 24(b):</strong> ब्याज (Interest) भुगतान पर
                        ₹2 लाख तक की कटौती (स्वयं के घर के लिए)।
                      </li>
                    </ul>
                    <p className="text-slate-700 mt-2">
                      नोट: इस कैलकुलेटर का उपयोग करके आप देख सकते हैं कि आपकी
                      EMI में कितना हिस्सा ब्याज का है और कितना मूलधन का।
                    </p>
                  </section>

                  {/* AD */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Section 3: Formula */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      होम लोन EMI फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      भारतीय बैंक EMI की गणना के लिए &quot;Reducing Balance
                      Method&quot; का उपयोग करते हैं:
                    </p>

                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <BlockMath math="E = P \times r \times \frac{(1 + r)^n}{(1 + r)^n - 1}" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>E</strong> = EMI राशि
                        </li>
                        <li>
                          <strong>P</strong> = लोन राशि (Principal)
                        </li>
                        <li>
                          <strong>r</strong> = मासिक ब्याज दर (वार्षिक दर ÷ 12 ÷
                          100)
                        </li>
                        <li>
                          <strong>n</strong> = महीनों की संख्या
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Section 4: Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित कैलकुलेटर (Related Tools)
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Link href="/hi/emi-calculator" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-lg">
                                📊
                              </span>
                              <div>
                                <div className="font-semibold text-slate-900 group-hover:text-emerald-700">
                                  EMI कैलकुलेटर
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                  किसी भी लोन की EMI निकालें
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/hi/loans/personal-loan" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-lg">
                                💼
                              </span>
                              <div>
                                <div className="font-semibold text-slate-900 group-hover:text-emerald-700">
                                  पर्सनल लोन कैलकुलेटर
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                  ब्याज और EMI चेक करें
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/hi/loans/car-loan" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-lg">
                                🚗
                              </span>
                              <div>
                                <div className="font-semibold text-slate-900 group-hover:text-emerald-700">
                                  कार लोन कैलकुलेटर
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                  नई या पुरानी कार के लिए
                                </p>
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

            {/* --- FAQ SECTION --- */}
            <section className="no-print my-12">
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

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <HindiSidebar adId="hi-home-loan-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
