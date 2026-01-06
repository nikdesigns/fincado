import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SICalculatorClient from '@/app/simple-interest-calculator/SICalculatorClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable'; // Added for Comparison
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import FAQSchema from '@/components/FAQSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calculator, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'साधारण ब्याज (Simple Interest) कैलकुलेटर | Fincado',
  description:
    'Simple Interest Calculator Hindi: मूलधन, दर और समय दर्ज करें और तुरंत साधारण ब्याज की गणना करें। जानें कि यह चक्रवृद्धि ब्याज से कैसे अलग है।',
  keywords: [
    'Simple Interest Calculator Hindi',
    'Sadharan Byaj Calculator',
    'Interest Calculator India',
    'Simple vs Compound Interest Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/simple-interest-calculator',
    languages: {
      'en-IN': 'https://www.fincado.com/simple-interest-calculator',
    },
  },
  openGraph: {
    title: 'साधारण ब्याज कैलकुलेटर – आसान और सटीक',
    description: 'मुफ्त टूल: साधारण ब्याज और कुल राशि की तुरंत गणना करें।',
    url: 'https://www.fincado.com/hi/simple-interest-calculator',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiSIPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    principal: 'मूल राशि (Principal Amount)',
    rate: 'ब्याज दर (Interest Rate %)',
    time: 'समय अवधि (Years)',
    maturityVal: 'कुल राशि (Total Amount)',
    resultPrincipal: 'मूलधन (Principal)',
    resultInterest: 'कुल ब्याज (Interest)',
  };

  // ✅ FAQ Items (Hindi)
  const siFaqs = [
    {
      id: 'faq-1',
      question: 'साधारण ब्याज और चक्रवृद्धि ब्याज में क्या अंतर है?',
      answer:
        'साधारण ब्याज केवल मूलधन पर लगता है, जबकि चक्रवृद्धि ब्याज में ब्याज पर भी ब्याज मिलता है। लंबी अवधि में चक्रवृद्धि ब्याज (Compound Interest) अधिक रिटर्न देता है।',
    },
    {
      id: 'faq-2',
      question: 'क्या बैंक साधारण ब्याज का उपयोग करते हैं?',
      answer:
        'अधिकांश बचत खाते और एफडी चक्रवृद्धि ब्याज का उपयोग करते हैं। हालांकि, कुछ छोटे समय के लोन या देरी से भुगतान पर साधारण ब्याज लगाया जा सकता है।',
    },
    {
      id: 'faq-3',
      question: 'महीनों के लिए ब्याज की गणना कैसे करें?',
      answer:
        'यदि समय महीनों में है, तो उसे 12 से भाग देकर वर्षों में बदलें (जैसे 6 महीने = 6/12 = 0.5 वर्ष) और फिर सूत्र में उपयोग करें।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Simple Interest Calculator Hindi"
        description="Calculate Simple Interest in Hindi."
        url="https://www.fincado.com/hi/simple-interest-calculator"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com/hi' },
          { name: 'कैलकुलेटर', url: 'https://www.fincado.com/hi/calculators' },
          {
            name: 'साधारण ब्याज',
            url: 'https://www.fincado.com/hi/simple-interest-calculator',
          },
        ]}
      />

      <FAQSchema
        faqs={siFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="साधारण ब्याज कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/simple-interest-calculator" />
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
            <span className="block mb-2">साधारण ब्याज कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              ब्याज और कुल राशि की आसान गणना
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              यह कैलकुलेटर आपको आसानी से{' '}
              <strong>साधारण ब्याज (Simple Interest)</strong> और अंतिम राशि की
              गणना करने में मदद करता है। यह छोटे समय के लोन और अनौपचारिक उधारी
              के लिए उपयोगी है।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <SICalculatorClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-si-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="personalLoan" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                तुलना करें
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/compound-interest-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  🔄 चक्रवृद्धि ब्याज
                </Link>
                <Link
                  href="/hi/emi-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  🔢 EMI कैलकुलेटर
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Calculator className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    क्या आप कार लोन ले रहे हैं?
                  </strong>

                  <Link
                    href="/hi/loans/car-loan" // Fallback to English if Hindi absent
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      सावधान! &quot;Flat Rate&quot; ब्याज से बचें। यहाँ सही EMI
                      चेक करें
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS SI */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      साधारण ब्याज क्या है? (What is Simple Interest?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        <strong>साधारण ब्याज (SI)</strong> ब्याज की गणना करने का
                        एक तरीका है जहाँ ब्याज केवल मूल राशि (Principal) पर
                        लगाया जाता है। इसमें चक्रवृद्धि ब्याज की तरह &quot;ब्याज
                        पर ब्याज&quot; नहीं मिलता।
                      </p>
                      <p>
                        यह आमतौर पर छोटे समय के लिए दोस्तों या परिवार के बीच
                        उधार लेन-देन में उपयोग किया जाता है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: SI VS CI TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      साधारण ब्याज बनाम चक्रवृद्धि ब्याज
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              विशेषता
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              साधारण ब्याज (SI)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              चक्रवृद्धि ब्याज (CI)
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">गणना</TableCell>
                            <TableCell>केवल मूलधन पर</TableCell>
                            <TableCell>मूलधन + ब्याज पर</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              रिटर्न
                            </TableCell>
                            <TableCell>कम रिटर्न</TableCell>
                            <TableCell className="text-emerald-600 font-medium">
                              अधिक रिटर्न
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">उपयोग</TableCell>
                            <TableCell>कार लोन (Flat Rate)</TableCell>
                            <TableCell>FD, म्यूचुअल फंड, होम लोन</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: FLAT RATE TRAP */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      &quot;फ्लैट रेट&quot; लोन का जाल (The Flat Rate Trap)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        कई कार डीलर &quot;फ्लैट रेट&quot; (जैसे 7%) का विज्ञापन
                        देते हैं जो सस्ता लगता है। लेकिन इसमें आप पूरी अवधि के
                        दौरान <strong>पूरे मूलधन</strong> पर ब्याज देते हैं (भले
                        ही आप उसे चुका रहे हों)। इसकी वास्तविक दर लगभग दोगुनी
                        (13-14%) होती है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 4: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      साधारण ब्याज का सूत्र (Formula)
                    </h3>
                    <p className="text-slate-700">
                      साधारण ब्याज निकालने का मानक सूत्र यह है:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="SI = \frac{P \times R \times T}{100}" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>SI</strong> = साधारण ब्याज
                        </li>
                        <li>
                          <strong>P</strong> = मूलधन (Principal)
                        </li>
                        <li>
                          <strong>R</strong> = ब्याज दर (प्रति वर्ष)
                        </li>
                        <li>
                          <strong>T</strong> = समय (वर्षों में)
                        </li>
                      </ul>
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
                    defaultValue={siFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {siFaqs.map((faq) => (
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
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <HindiSidebar adId="hi-si-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
