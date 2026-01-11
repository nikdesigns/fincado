import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FIRECalculatorClient from '@/app/fire-calculator/FIRECalculatorClient';
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
import { Rocket, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'FIRE कैलकुलेटर – जल्दी रिटायरमेंट की योजना बनाएं (Early Retirement)',
  description:
    'Fincado FIRE कैलकुलेटर (Hindi): अपना FIRE नंबर जानें और जल्दी रिटायर होने के लिए आवश्यक बचत की गणना करें। वित्तीय स्वतंत्रता (Financial Freedom) का पहला कदम।',
  keywords: [
    'FIRE Calculator Hindi',
    'Financial Independence Retire Early Hindi',
    'Early Retirement Calculator Hindi',
    'FIRE Number Formula Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/fire-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/fire-calculator/',
    },
  },
  openGraph: {
    title: 'FIRE कैलकुलेटर – अपनी शर्तों पर जीवन जिएं',
    description:
      'जानें कि आपको काम करना बंद करने के लिए कितने पैसों (Corpus) की जरूरत है।',
    url: 'https://fincado.com/hi/fire-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiFIREPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    currentAge: 'वर्तमान आयु (Current Age)',
    fireAge: 'FIRE आयु (Retire Age)',
    currentAnnualExpense: 'वार्षिक खर्च (Annual Expense)',
    currentCorpus: 'मौजूदा बचत (Current Savings)',
    advancedAssumptions: 'उन्नत सेटिंग (महंगाई, रिटर्न)',
    inflation: 'महंगाई दर (Inflation %)',
    returnRate: 'रिटर्न दर (Return Rate %)',
    safeWithdrawalRate: 'सुरक्षित निकासी दर (SWR %)',
    multiplier: 'गुणांक (Multiplier)',
    recommendedSWR: 'भारत के लिए सुझाव: 3.0% - 3.5%',
    resetDefaults: 'रीसेट करें',
    fireNumber: 'आपका FIRE लक्ष्य (FIRE Number)',
    monthlySavingsNeeded: 'मासिक बचत की जरूरत',
    perMonth: '/महीना',
    futureAnnualExp: 'भविष्य का वार्षिक खर्च',
    currentCorpusFV: 'मौजूदा बचत का भविष्य मूल्य',
  };

  // ✅ FAQ Items (Hindi)
  const fireFaqs = [
    {
      id: 'faq-1',
      question: 'FIRE हासिल करने में कितना समय लगता है?',
      answer:
        'यह आपकी बचत दर (Savings Rate) पर निर्भर करता है। यदि आप अपनी आय का 50% बचाते हैं, तो आपको लगभग 17 साल लगेंगे। यदि आप 70% बचाते हैं, तो आप 9-10 वर्षों में आर्थिक स्वतंत्रता प्राप्त कर सकते हैं।',
    },
    {
      id: 'faq-2',
      question: 'FIRE के लिए कहाँ निवेश करें?',
      answer:
        'इक्विटी म्यूचुअल फंड (विकास के लिए) और डेट इंस्ट्रूमेंट्स (स्थिरता के लिए) का एक संतुलित पोर्टफोलियो आवश्यक है। रियल एस्टेट से मिलने वाला किराया भी पैसिव इनकम का एक अच्छा स्रोत हो सकता है।',
    },
    {
      id: 'faq-3',
      question: 'क्या FIRE नंबर में चिकित्सा खर्च शामिल है?',
      answer:
        'FIRE कैलकुलेशन में आमतौर पर केवल जीवन-यापन के खर्च शामिल होते हैं। चिकित्सा खर्चों के लिए आपको एक अलग स्वास्थ्य बीमा (Health Insurance) और इमरजेंसी फंड रखना चाहिए।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="FIRE Calculator Hindi"
        description="Calculate Financial Independence Retire Early (FIRE) corpus in Hindi."
        url="https://fincado.com/hi/fire-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'FIRE कैलकुलेटर',
            url: 'https://fincado.com/hi/fire-calculator/',
          },
        ]}
      />

      <FAQSchema
        faqs={fireFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="FIRE कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/fire-calculator" />
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
            <span className="block mb-2">
              FIRE कैलकुलेटर (जल्दी रिटायरमेंट)
            </span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              अपनी आर्थिक स्वतंत्रता (Financial Freedom) की योजना बनाएं
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              पैसों के लिए काम करना बंद करें और अपने पैसे को अपने लिए काम करने
              दें। जानें कि आपको <strong>जल्दी रिटायर (Retire Early)</strong>{' '}
              होने के लिए आज कितनी बचत करनी चाहिए।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <FIRECalculatorClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-fire-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="fixedDeposit" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य रिटायरमेंट टूल
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
                  🏢 रिटायरमेंट
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-700">
                  <Rocket className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    जल्दी शुरुआत करें!
                  </strong>

                  <Link
                    href="/hi/guides/sip-investment-guide" // Use English or Hindi guide
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>पढ़ें: SIP के जरिए 1 करोड़ का फंड कैसे बनाएं?</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS FIRE */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      FIRE मूवमेंट क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        <strong>
                          FIRE (Financial Independence, Retire Early)
                        </strong>{' '}
                        एक जीवनशैली आंदोलन है जिसका लक्ष्य 60 वर्ष की पारंपरिक
                        उम्र के बजाय जल्दी (30 या 40 के दशक में) रिटायर होना है।
                      </p>
                      <p>
                        इसका मुख्य सिद्धांत है—आक्रामक बचत (आय का 50-70%) और
                        समझदारी से निवेश करके एक ऐसा
                        <strong>Corpus</strong> बनाना जो आपके जीवन भर के खर्चों
                        को पूरा कर सके।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: FIRE TYPES TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      FIRE के प्रकार (Types of FIRE)
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              प्रकार
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              जीवनशैली
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              आवश्यक राशि
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              Lean FIRE
                            </TableCell>
                            <TableCell>कम खर्चीला / न्यूनतम</TableCell>
                            <TableCell>&lt; 25 गुना वार्षिक खर्च</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Regular FIRE
                            </TableCell>
                            <TableCell>सामान्य जीवन</TableCell>
                            <TableCell>25 - 30 गुना वार्षिक खर्च</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Fat FIRE
                            </TableCell>
                            <TableCell>विलासितापूर्ण जीवन</TableCell>
                            <TableCell>&gt; 50 गुना वार्षिक खर्च</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: SWR */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      सुरक्षित निकासी दर (SWR)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        <strong>क्या भारत के लिए 4% नियम सही है?</strong>
                        <br />
                        नहीं, भारत में महंगाई दर (6-7%) अमेरिका से अधिक है।
                        इसलिए भारतीय नियोजक
                        <strong>3% से 3.5%</strong> की निकासी दर की सलाह देते
                        हैं। इसका मतलब है कि आपको अपने वार्षिक खर्च का लगभग
                        <strong>33 गुना</strong> जमा करना चाहिए।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 4: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      FIRE नंबर का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      आपका FIRE नंबर वह लक्ष्य राशि है जिसे आपको प्राप्त करना
                      है:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="FIRE = \text{Annual Expenses} \times \frac{100}{SWR}" />
                    </div>

                    <div className="text-slate-700">
                      <p className="text-sm">
                        <em>
                          उदाहरण: यदि आपका वार्षिक खर्च ₹6 लाख है और SWR 4% है,
                          तो आपको ₹1.5 करोड़ की आवश्यकता होगी।
                        </em>
                      </p>
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
                    defaultValue={fireFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {fireFaqs.map((faq) => (
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
              <HindiSidebar adId="hi-fire-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
