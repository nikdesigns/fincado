import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RetirementCalculatorClient from '@/app/retirement-calculator/RetirementCalculatorClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable'; // Added
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
import { Flame, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'रिटायरमेंट कैलकुलेटर – पेंशन और कॉर्पस प्लानिंग (Retirement Calculator)',
  description:
    'Fincado रिटायरमेंट कैलकुलेटर (Hindi): जानें रिटायरमेंट के लिए आपको कितने पैसों (Corpus) की जरूरत होगी। महंगाई और SIP की सटीक गणना करें।',
  keywords: [
    'Retirement Calculator Hindi',
    'Pension Calculator Hindi',
    'Retirement Planning India Hindi',
    'Inflation Adjusted Retirement Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/retirement-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/retirement-calculator/',
    },
  },
  openGraph: {
    title: 'रिटायरमेंट कैलकुलेटर – अपने बुढ़ापे को सुरक्षित करें',
    description:
      'जानें कि महंगाई को मात देने के लिए आपको आज कितनी बचत करनी चाहिए।',
    url: 'https://fincado.com/hi/retirement-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiRetirementPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    currentAge: 'वर्तमान आयु (Current Age)',
    retireAge: 'रिटायरमेंट आयु (Retire Age)',
    currentExpense: 'मासिक खर्च (Current Expense)',
    currentSavings: 'मौजूदा बचत (Current Savings)',
    advancedRates: 'उन्नत दरें (Inflation, Returns)',
    inflation: 'महंगाई दर (Inflation %)',
    preRetireReturn: 'निवेश रिटर्न (Retirement से पहले)',
    postRetireReturn: 'निवेश रिटर्न (Retirement के बाद)',
    resetDefaults: 'रीसेट करें',
    targetCorpus: 'लक्ष्य राशि (Target Corpus)',
    sipNeeded: 'जरूरी मासिक निवेश (SIP Needed)',
    perMonth: '/ महीना',
    expenseAtRetirement: 'रिटायरमेंट पर खर्च',
    currentSavingsFV: 'मौजूदा बचत का भविष्य मूल्य',
  };

  // ✅ FAQ Items (Hindi)
  const retireFaqs = [
    {
      id: 'faq-1',
      question: 'रिटायरमेंट के लिए कितने पैसों की जरूरत होती है?',
      answer:
        'एक सामान्य नियम यह है कि रिटायरमेंट के समय आपके पास अपने वार्षिक खर्च का 20-25 गुना पैसा होना चाहिए। यह महंगाई और आपकी जीवनशैली पर निर्भर करता है।',
    },
    {
      id: 'faq-2',
      question: '4% निकासी नियम (4% Withdrawal Rule) क्या है?',
      answer:
        'यह नियम कहता है कि यदि आप अपने रिटायरमेंट फंड का 4% पहले साल निकालते हैं और फिर उसे महंगाई के हिसाब से बढ़ाते हैं, तो आपका पैसा 30 साल तक चल सकता है।',
    },
    {
      id: 'faq-3',
      question: 'मुझे रिटायरमेंट प्लानिंग कब शुरू करनी चाहिए?',
      answer:
        'जितना जल्दी हो सके। 25 साल की उम्र में शुरू करने से आपको "कंपाउंडिंग" का बहुत बड़ा फायदा मिलता है, जो 35 या 40 की उम्र में शुरू करने पर नहीं मिल पाता।',
    },
    {
      id: 'faq-4',
      question: 'क्या NPS रिटायरमेंट के लिए अनिवार्य है?',
      answer:
        'नहीं, लेकिन यह रिटायरमेंट के लिए बहुत अच्छा है क्योंकि इसमें धारा 80CCD(1B) के तहत ₹50,000 की अतिरिक्त टैक्स छूट मिलती है और इसमें इक्विटी का विकल्प भी होता है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Retirement Calculator Hindi"
        description="Calculate retirement corpus and monthly SIP in Hindi."
        url="https://fincado.com/hi/retirement-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'रिटायरमेंट कैलकुलेटर',
            url: 'https://fincado.com/hi/retirement-calculator/',
          },
        ]}
      />

      <FAQSchema
        faqs={retireFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="रिटायरमेंट कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/retirement-calculator" />
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
            <span className="block mb-2">रिटायरमेंट कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              महंगाई और पेंशन की सटीक योजना बनाएं
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              जानें कि अपनी वर्तमान जीवनशैली को बनाए रखने के लिए आपको भविष्य में
              कितने पैसों की जरूरत होगी।
              <strong>महंगाई (Inflation)</strong> को ध्यान में रखकर अपने
              रिटायरमेंट कॉर्पस की सटीक गणना करें।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <RetirementCalculatorClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-retire-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="fixedDeposit" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य टूल
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/sip-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  📈 SIP कैलकुलेटर
                </Link>
                <Link
                  href="/hi/swp-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  💸 पेंशन (SWP)
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
                  <Flame className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    जल्दी रिटायर होना चाहते हैं?
                  </strong>

                  <Link
                    href="/guides/swp-guide" // Use English or Hindi guide
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      पढ़ें: F.I.R.E (Financial Independence) क्या है?
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
                  {/* SECTION 1: INTRO */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      रिटायरमेंट प्लानिंग क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        रिटायरमेंट प्लानिंग का मतलब है अपनी भविष्य की आय की
                        जरूरतों का अनुमान लगाना और उन्हें पूरा करने के लिए आज ही
                        बचत करना। यह केवल पैसे बचाने के बारे में नहीं है, बल्कि{' '}
                        <strong>महंगाई (Inflation)</strong> को मात देने के लिए
                        सही जगह निवेश करने के बारे में भी है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: COMPARISON TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      पैसे कहाँ निवेश करें? (EPF vs NPS vs Funds)
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              सुविधा
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              EPF (PF)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              NPS
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              इक्विटी फंड्स
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              रिटर्न
                            </TableCell>
                            <TableCell className="text-slate-600">
                              ~8.15% (फिक्स्ड)
                            </TableCell>
                            <TableCell className="text-amber-600 font-medium">
                              9% - 11%
                            </TableCell>
                            <TableCell className="text-emerald-600 font-medium">
                              12% - 15%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              टैक्स लाभ
                            </TableCell>
                            <TableCell>80C (EEE)</TableCell>
                            <TableCell className="text-emerald-600">
                              80CCD (+50k)
                            </TableCell>
                            <TableCell>ELSS (80C)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">जोखिम</TableCell>
                            <TableCell className="text-emerald-600">
                              शून्य
                            </TableCell>
                            <TableCell className="text-amber-600">
                              मध्यम
                            </TableCell>
                            <TableCell className="text-red-600">अधिक</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: RISKS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      दो सबसे बड़े जोखिम
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>महंगाई (Inflation):</strong> यह &quot;मूक
                        हत्यारा&quot; है। आज का 1 लाख रुपये 20 साल बाद बहुत कम
                        खरीदेगा। आपके निवेश को महंगाई (भारत में ~6%) से तेज
                        बढ़ना चाहिए।
                      </li>
                      <li>
                        <strong>लंबी उम्र (Longevity):</strong> उम्मीद से ज्यादा
                        जीने का मतलब है कि आपकी बचत खत्म हो सकती है। चिकित्सा
                        खर्च और लंबी आयु के लिए अतिरिक्त बफर की जरूरत होती है।
                      </li>
                    </ul>
                  </section>

                  {/* SECTION 4: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      भविष्य के खर्च का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      यह जानने के लिए कि भविष्य में आपके खर्च कितने होंगे, हम इस
                      सूत्र का उपयोग करते हैं:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="Exp_{future} = Exp_{current} \times (1 + r_{inf})^n" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>Exp</strong> = मासिक खर्च
                        </li>
                        <li>
                          <strong>r_inf</strong> = महंगाई दर (जैसे 6%)
                        </li>
                        <li>
                          <strong>n</strong> = रिटायरमेंट में बचे साल
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
                    defaultValue={retireFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {retireFaqs.map((faq) => (
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
              <HindiSidebar adId="hi-retire-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
