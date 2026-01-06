import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CompoundInterestClient from '@/app/compound-interest-calculator/CompoundInterestClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable'; // Added for Investment Context
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
import { TrendingUp, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'कंपाउंड इंटरेस्ट कैलकुलेटर – चक्रवृद्धि ब्याज की गणना करें',
  description:
    'Fincado कंपाउंड इंटरेस्ट कैलकुलेटर (Hindi): जानें कि चक्रवृद्धि ब्याज से आपका पैसा कैसे दोगुना या तिगुना हो सकता है। मासिक, तिमाही और वार्षिक गणना करें।',
  keywords: [
    'Compound Interest Calculator Hindi',
    'Chakravridhi Byaj Calculator',
    'Future Value Calculator Hindi',
    'Power of Compounding Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/compound-interest-calculator',
    languages: {
      'en-IN': 'https://www.fincado.com/compound-interest-calculator',
    },
  },
  openGraph: {
    title: 'कंपाउंड इंटरेस्ट कैलकुलेटर – पैसे से पैसा कमाएं',
    description:
      'मुफ्त टूल: जानें कि समय के साथ आपका छोटा निवेश कितना बड़ा बन सकता है।',
    url: 'https://www.fincado.com/hi/compound-interest-calculator',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiCompoundInterestPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    principal: 'मूलधन राशि (Principal ₹)',
    rate: 'ब्याज दर (% वार्षिक)',
    timePeriod: 'समय अवधि (वर्ष)',
    frequency: 'कंपाउंडिंग आवृत्ति',
    resetDefaults: 'रीसेट करें',
    totalAmount: 'परिपक्वता राशि (Maturity Amount)',
    interestEarned: 'कुल ब्याज',
    investedAmount: 'निवेश की गई राशि',
    yearly: 'वार्षिक (Yearly)',
    halfYearly: 'छमाही (Half-Yearly)',
    quarterly: 'तिमाही (Quarterly)',
    monthly: 'मासिक (Monthly)',
    breakdown: 'विकास विवरण',
  };

  // ✅ FAQ Items (Hindi)
  const ciFaqs = [
    {
      id: 'faq-1',
      question: 'साधारण ब्याज और चक्रवृद्धि ब्याज में क्या अंतर है?',
      answer:
        'साधारण ब्याज केवल मूलधन पर मिलता है। चक्रवृद्धि ब्याज (Compound Interest) में, ब्याज पर भी ब्याज मिलता है, जिससे आपका पैसा तेजी से बढ़ता है।',
    },
    {
      id: 'faq-2',
      question: '72 का नियम (Rule of 72) क्या है?',
      answer:
        'यह एक सूत्र है जो बताता है कि आपका पैसा कितने समय में दोगुना होगा। 72 को ब्याज दर से भाग दें। उदाहरण: 72 ÷ 12% = 6 साल।',
    },
    {
      id: 'faq-3',
      question: 'कंपाउंडिंग का सबसे ज्यादा फायदा कैसे उठाएं?',
      answer:
        'जल्दी शुरुआत करें। जितना अधिक समय आप अपने पैसे को निवेशित रखेंगे, कंपाउंडिंग का प्रभाव उतना ही अधिक होगा।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Compound Interest Calculator Hindi"
        description="Calculate compound interest maturity amount in Hindi."
        url="https://www.fincado.com/hi/compound-interest-calculator"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com/hi' },
          { name: 'कैलकुलेटर', url: 'https://www.fincado.com/hi/calculators' },
          {
            name: 'कंपाउंड इंटरेस्ट कैलकुलेटर',
            url: 'https://www.fincado.com/hi/compound-interest-calculator',
          },
        ]}
      />

      <FAQSchema
        faqs={ciFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="कंपाउंड इंटरेस्ट कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/compound-interest-calculator" />
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
            <span className="block mb-2">कंपाउंड इंटरेस्ट कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              चक्रवृद्धि ब्याज (Compound Interest) की शक्ति देखें
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              अल्बर्ट आइंस्टीन ने कंपाउंड इंटरेस्ट को &quot;दुनिया का आठवां
              अजूबा&quot; कहा था। देखें कि{' '}
              <strong>ब्याज पर ब्याज (Interest on Interest)</strong> कमाने से
              आपकी छोटी बचत समय के साथ कितनी बड़ी बन सकती है।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <CompoundInterestClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-ci-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="fixedDeposit" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य कैलकुलेटर
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
                  href="/hi/fd-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  🏦 FD कैलकुलेटर
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
                  <TrendingUp className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    पैसे को तेजी से बढ़ाना चाहते हैं?
                  </strong>

                  <Link
                    href="/guides/sip-investment-guide" // Use English or Hindi guide
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>पढ़ें: SIP में कंपाउंडिंग कैसे काम करती है?</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS CI */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      कंपाउंड इंटरेस्ट क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        कंपाउंड इंटरेस्ट (चक्रवृद्धि ब्याज) वह ब्याज है जो न
                        केवल आपके मूलधन (Principal) पर मिलता है, बल्कि पिछले समय
                        में अर्जित ब्याज पर भी मिलता है। सरल शब्दों में, यह{' '}
                        <strong>&quot;ब्याज पर ब्याज&quot;</strong> है।
                      </p>
                      <p>
                        यह लंबी अवधि में धन सृजन (Wealth Creation) का सबसे
                        शक्तिशाली उपकरण है। जितना लंबा समय आप निवेशित रहेंगे,
                        कंपाउंडिंग का प्रभाव उतना ही अधिक होगा।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: FREQUENCY TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      कंपाउंडिंग आवृत्ति (Frequency) का महत्व
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              आवृत्ति
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              n का मान
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              उदाहरण
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              वार्षिक (Yearly)
                            </TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>PPF, EPF</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              छमाही (Half-Yearly)
                            </TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>कॉर्पोरेट बॉन्ड</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              तिमाही (Quarterly)
                            </TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>बैंक FD</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              मासिक (Monthly)
                            </TableCell>
                            <TableCell>12</TableCell>
                            <TableCell>सेविंग्स अकाउंट</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      कंपाउंड इंटरेस्ट का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      चक्रवृद्धि ब्याज की गणना इस सूत्र से की जाती है:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="A = P \left(1 + \frac{r}{n}\right)^{nt}" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>P</strong>: मूलधन (शुरुआती निवेश)
                        </li>
                        <li>
                          <strong>r</strong>: वार्षिक ब्याज दर (दशमलव में)
                        </li>
                        <li>
                          <strong>n</strong>: एक साल में ब्याज जुड़ने की आवृत्ति
                        </li>
                        <li>
                          <strong>t</strong>: समय (वर्षों में)
                        </li>
                      </ul>
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
                    defaultValue={ciFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {ciFaqs.map((faq) => (
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
              <HindiSidebar adId="hi-ci-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
