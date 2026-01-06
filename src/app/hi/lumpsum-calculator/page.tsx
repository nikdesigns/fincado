import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import LumpsumClient from '@/app/lumpsum-calculator/LumpsumClient';
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
import { ArrowRight, TrendingUp } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Lumpsum कैलकुलेटर – एकमुश्त निवेश पर रिटर्न | Fincado',
  description:
    'Lumpsum Calculator Hindi: म्यूचुअल फंड या एफडी में एकमुश्त निवेश पर मिलने वाले रिटर्न और कंपाउंडिंग ब्याज की गणना करें।',
  keywords: [
    'Lumpsum Calculator Hindi',
    'Mutual Fund Calculator Hindi',
    'One Time Investment Hindi',
    'Lumpsum vs SIP Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/lumpsum-calculator',
    languages: { 'en-IN': 'https://www.fincado.com/lumpsum-calculator' },
  },
  openGraph: {
    title: 'Lumpsum कैलकुलेटर – पैसे से पैसा बनाएं',
    description:
      'मुफ्त टूल: एकमुश्त निवेश पर चक्रवृद्धि ब्याज (Compound Interest) देखें।',
    url: 'https://www.fincado.com/hi/lumpsum-calculator',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiLumpsumPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    investment: 'निवेश राशि (Investment)',
    rate: 'ब्याज दर (Expected Return %)',
    time: 'समय अवधि (Years)',
    frequency: 'ब्याज चक्र (Compounding)',
    futureVal: 'कुल राशि (Future Value)',
    invested: 'कुल निवेश',
    wealthGained: 'कुल फायदा (Returns)',
  };

  // ✅ FAQ Items (Hindi)
  const lumpsumFaqs = [
    {
      id: 'faq-1',
      question: 'क्या म्यूचुअल फंड में एकमुश्त (Lumpsum) निवेश जोखिम भरा है?',
      answer:
        'हाँ, यदि आप बाजार के उच्चतम स्तर (Market Peak) पर निवेश करते हैं तो जोखिम हो सकता है। लेकिन 7-10 साल की लंबी अवधि में बाजार की अस्थिरता कम हो जाती है और अच्छा रिटर्न मिलता है।',
    },
    {
      id: 'faq-2',
      question: 'एकमुश्त निवेश का सही समय क्या है?',
      answer:
        'ऐतिहासिक रूप से, जब बाजार गिर रहा हो (Correction) या वैल्यूएशन कम हो, तब एकमुश्त निवेश करना सबसे फायदेमंद होता है।',
    },
    {
      id: 'faq-3',
      question: 'क्या मैं अपनी Lumpsum राशि को SIP में बदल सकता हूँ?',
      answer:
        'हाँ। आप अपनी एकमुश्त राशि को लिक्विड फंड (Liquid Fund) में डाल सकते हैं और एसटीपी (STP) के जरिए उसे धीरे-धीरे इक्विटी फंड में ट्रांसफर कर सकते हैं।',
    },
    {
      id: 'faq-4',
      question: 'SIP और Lumpsum में कौन बेहतर है?',
      answer:
        'SIP अस्थिर बाजार के लिए बेहतर है क्योंकि इसमें "Rupee Cost Averaging" का फायदा मिलता है। Lumpsum तब बेहतर है जब आपके पास बड़ी राशि हो और बाजार में गिरावट हो।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Lumpsum Calculator Hindi"
        description="Calculate one-time investment returns in Hindi."
        url="https://www.fincado.com/hi/lumpsum-calculator"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com/hi' },
          { name: 'कैलकुलेटर', url: 'https://www.fincado.com/hi/calculators' },
          {
            name: 'Lumpsum कैलकुलेटर',
            url: 'https://www.fincado.com/hi/lumpsum-calculator',
          },
        ]}
      />

      <FAQSchema
        faqs={lumpsumFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Lumpsum कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/lumpsum-calculator" />
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
            <span className="block mb-2">Lumpsum कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              एकमुश्त निवेश पर रिटर्न की गणना करें
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              यदि आपके पास एक साथ बड़ी राशि (जैसे बोनस या प्रॉपर्टी से मिला
              पैसा) है, तो उसे <strong>एकमुश्त (Lumpsum)</strong> निवेश करें। इस
              कैलकुलेटर से जानें कि कंपाउंडिंग की मदद से आपका पैसा समय के साथ
              कितना बढ़ सकता है।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <LumpsumClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-lumpsum-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="fixedDeposit" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य विकल्प
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/sip-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50
                  "
                >
                  📈 SIP कैलकुलेटर
                </Link>
                <Link
                  href="/hi/fd-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50
                  "
                >
                  🏦 FD कैलकुलेटर
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <TrendingUp className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    क्या बाजार बहुत ऊँचा है?
                  </strong>

                  <Link
                    href="/guides/sip-investment-guide" // Use English guide if Hindi absent
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      पढ़ें: STP (Systematic Transfer Plan) क्यों सुरक्षित है?
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
                  {/* SECTION 1: WHAT IS LUMPSUM */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Lumpsum निवेश क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        जब आप म्यूचुअल फंड या बैंक में एक ही बार में बड़ी रकम
                        जमा करते हैं, तो इसे <strong>Lumpsum निवेश</strong> कहते
                        हैं। इसका सबसे बड़ा फायदा यह है कि आपकी पूरी राशि पर
                        पहले दिन से ही रिटर्न मिलना शुरू हो जाता है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: COMPARISON TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Lumpsum बनाम SIP: कौन बेहतर है?
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              विशेषता
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Lumpsum (एकमुश्त)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              SIP (किस्त)
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              सही समय
                            </TableCell>
                            <TableCell className="text-amber-600 font-medium">
                              जब बाजार गिरा हो
                            </TableCell>
                            <TableCell className="text-emerald-600 font-medium">
                              कभी भी (Any Time)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">जोखिम</TableCell>
                            <TableCell className="text-red-600 font-medium">
                              अधिक (Timing Risk)
                            </TableCell>
                            <TableCell className="text-emerald-600 font-medium">
                              कम (Averaging)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">पूंजी</TableCell>
                            <TableCell>बड़ी राशि आवश्यक</TableCell>
                            <TableCell>छोटी राशि (₹500+)</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: STP STRATEGY */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      STP रणनीति (Pro Tip)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        स्मार्ट निवेशक सीधे Lumpsum निवेश करने के बजाय{' '}
                        <strong>STP (Systematic Transfer Plan)</strong> का उपयोग
                        करते हैं। इसमें आप पैसा पहले एक सुरक्षित &apos;लिक्विड
                        फंड&apos; में रखते हैं और वहां से हर महीने थोड़ा-थोड़ा
                        पैसा इक्विटी फंड में ट्रांसफर करते हैं।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 4: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Lumpsum गणना का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      यह कैलकुलेटर चक्रवृद्धि ब्याज (Compound Interest) के मानक
                      सूत्र का उपयोग करता है:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="FV = P (1 + r)^n" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>FV</strong> = भविष्य की राशि (Future Value)
                        </li>
                        <li>
                          <strong>P</strong> = निवेश राशि (Principal)
                        </li>
                        <li>
                          <strong>r</strong> = वार्षिक ब्याज दर
                        </li>
                        <li>
                          <strong>n</strong> = समय (वर्षों में)
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* SECTION 5: ADVANTAGES */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Lumpsum के फायदे
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            बड़ा रिटर्न
                          </h4>
                          <p className="text-sm text-slate-600">
                            पूरी राशि पर पहले दिन से ब्याज मिलता है, जिससे लंबे
                            समय में बड़ा कॉर्पस बनता है।
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            सुविधाजनक
                          </h4>
                          <p className="text-sm text-slate-600">
                            बार-बार निवेश ट्रैक करने की जरूरत नहीं। एक बार पैसा
                            लगाएं और भूल जाएं।
                          </p>
                        </CardContent>
                      </Card>
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
                    defaultValue={lumpsumFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {lumpsumFaqs.map((faq) => (
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
              <HindiSidebar adId="hi-lumpsum-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
