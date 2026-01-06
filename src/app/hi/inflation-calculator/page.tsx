import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import InflationClient from '@/app/inflation-calculator/InflationClient';
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
import { ArrowRight, Shield } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'महंगाई कैलकुलेटर – पैसे का भविष्य का मूल्य जानें (Inflation Calculator)',
  description:
    'Fincado महंगाई कैलकुलेटर (Hindi): जानें कि महंगाई आपकी बचत को कैसे कम करती है। भविष्य में शिक्षा, शादी और रिटायरमेंट के खर्च का सही अनुमान लगाएं।',
  keywords: [
    'Inflation Calculator Hindi',
    'Future Value of Money Hindi',
    'Cost of Living Calculator Hindi',
    'Rule of 72 Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/inflation-calculator',
    languages: {
      'en-IN': 'https://www.fincado.com/inflation-calculator',
    },
  },
  openGraph: {
    title: 'महंगाई कैलकुलेटर – अपनी क्रय शक्ति (Purchasing Power) जानें',
    description:
      'जानें कि आज के ₹1 लाख का मूल्य 10 साल बाद क्या होगा। सटीक गणना करें।',
    url: 'https://www.fincado.com/hi/inflation-calculator',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiInflationPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    currentAmount: 'वर्तमान राशि (Current Amount)',
    inflationRate: 'महंगाई दर (Inflation Rate %)',
    timePeriod: 'समय अवधि (Years)',
    futureValueRequired: 'भविष्य में आवश्यक राशि',
    todaysValue: 'आज का मूल्य',
    inflationImpact: 'महंगाई का असर (Loss)',
    disclaimer:
      '*महंगाई दरें अनुमानित हैं। वास्तविक महंगाई समय और श्रेणी के अनुसार भिन्न हो सकती है।',
  };

  // ✅ FAQ Items (Hindi)
  const inflationFaqs = [
    {
      id: 'faq-1',
      question: 'भारत में औसत महंगाई दर क्या है?',
      answer:
        'लंबी अवधि की योजना के लिए भारत में औसतन 6% से 7% महंगाई दर मानी जाती है। हालाँकि, शिक्षा और चिकित्सा (Medical) की महंगाई 10-12% तक हो सकती है।',
    },
    {
      id: 'faq-2',
      question: 'क्या फिक्स्ड डिपॉजिट (FD) महंगाई को मात दे सकता है?',
      answer:
        'आमतौर पर नहीं। टैक्स कटने के बाद, FD का रिटर्न अक्सर महंगाई दर के बराबर या उससे कम हो जाता है। इसे "Real Rate of Return" कहा जाता है।',
    },
    {
      id: 'faq-3',
      question: 'महंगाई से कैसे बचें?',
      answer:
        'महंगाई को मात देने के लिए इक्विटी (शेयर बाजार) या म्यूचुअल फंड में निवेश करना सबसे अच्छा तरीका है, क्योंकि ये लंबी अवधि में 12-15% का रिटर्न दे सकते हैं।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Inflation Calculator Hindi"
        description="Calculate future value of money considering inflation in Hindi."
        url="https://www.fincado.com/hi/inflation-calculator"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com/hi' },
          { name: 'कैलकुलेटर', url: 'https://www.fincado.com/hi/calculators' },
          {
            name: 'महंगाई कैलकुलेटर',
            url: 'https://www.fincado.com/hi/inflation-calculator',
          },
        ]}
      />

      <FAQSchema
        faqs={inflationFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="महंगाई कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/inflation-calculator" />
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
            <span className="block mb-2">महंगाई कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              जानें भविष्य में आपके खर्चे कितने बढ़ जाएंगे
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              महंगाई हर साल आपके पैसे की कीमत कम करती है। यह कैलकुलेटर बताता है
              कि आज के खर्चे को पूरा करने के लिए आपको भविष्य में कितने पैसों की
              जरूरत होगी।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <InflationClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-inflation-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="fixedDeposit" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                महंगाई को मात दें
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
                  href="/hi/retirement-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  👴 रिटायरमेंट
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-700">
                  <Shield className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    पैसे को सुरक्षित रखें
                  </strong>

                  <Link
                    href="/guides/gold-investment-guide" // Use English or Hindi guide
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>पढ़ें: क्या सोना (Gold) महंगाई से बचाता है?</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS INFLATION */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      महंगाई क्या है? (What Is Inflation?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        महंगाई वह दर है जिस पर समय के साथ वस्तुओं और सेवाओं की
                        कीमतें बढ़ती हैं। इसका सीधा मतलब है कि आपके पैसे की{' '}
                        <strong>क्रय शक्ति (Purchasing Power)</strong> कम हो रही
                        है।
                      </p>
                      <p></p>
                      <p>
                        उदाहरण के लिए, यदि महंगाई दर 6% है, तो जो सामान आज ₹100
                        का है, वह अगले साल ₹106 का होगा।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: REAL RETURNS TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      क्या आप महंगाई को मात दे रहे हैं? (Real Returns)
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              निवेश का प्रकार
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              औसत रिटर्न
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              महंगाई (6%)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              वास्तविक लाभ
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              सेविंग्स अकाउंट
                            </TableCell>
                            <TableCell>3.0%</TableCell>
                            <TableCell>-6.0%</TableCell>
                            <TableCell className="text-red-600 font-semibold">
                              -3.0% (नुकसान)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              फिक्स्ड डिपॉजिट (FD)
                            </TableCell>
                            <TableCell>7.0%</TableCell>
                            <TableCell>-6.0%</TableCell>
                            <TableCell className="text-emerald-600 font-semibold">
                              +1.0%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              म्यूचुअल फंड (Equity)
                            </TableCell>
                            <TableCell>12.0%</TableCell>
                            <TableCell>-6.0%</TableCell>
                            <TableCell className="text-emerald-600 font-semibold">
                              +6.0% (दौलत)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: RULE OF 72 */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      72 का नियम (The Rule of 72)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        यह एक त्वरित शॉर्टकट है जिससे आप जान सकते हैं कि महंगाई
                        आपके पैसे की कीमत को कितने समय में
                        <strong>आधा</strong> कर देगी।
                      </p>
                      <p>
                        <em>सूत्र: 72 ÷ महंगाई दर = वर्ष</em>
                      </p>
                      <p>
                        उदाहरण: यदि महंगाई 6% है, तो 12 वर्षों (72/6) में आपके
                        पैसे का मूल्य आधा हो जाएगा।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 4: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      महंगाई गणना का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      भविष्य के मूल्य (Future Value) की गणना के लिए इस सूत्र का
                      उपयोग करें:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="FV = PV \times (1 + r)^n" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>FV</strong> = भविष्य का मूल्य
                        </li>
                        <li>
                          <strong>PV</strong> = आज का मूल्य
                        </li>
                        <li>
                          <strong>r</strong> = महंगाई दर (दशमलव में)
                        </li>
                        <li>
                          <strong>n</strong> = वर्षों की संख्या
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
                    defaultValue={inflationFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {inflationFaqs.map((faq) => (
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
              <HindiSidebar adId="hi-inflation-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
