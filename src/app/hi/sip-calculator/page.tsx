import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SIPClient from '@/app/sip-calculator/SIPClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
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
import { Trophy, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'SIP कैलकुलेटर – रिटर्न और निवेश की गणना करें | Fincado',
  description:
    'Fincado SIP कैलकुलेटर (Hindi): जानें कि आपकी मासिक SIP निवेश आपको 5, 10 या 20 साल में कितना अमीर बना सकती है।',
  keywords: [
    'SIP Calculator Hindi',
    'Mutual Fund Calculator Hindi',
    'SIP Return Calculator Hindi',
    'Systematic Investment Plan Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/sip-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/sip-calculator/',
    },
  },
  openGraph: {
    title: 'SIP कैलकुलेटर – कंपाउंडिंग की शक्ति देखें',
    description:
      'मुफ्त टूल: जानें कि छोटी मासिक बचत कैसे भविष्य में बड़ा फंड बन सकती है।',
    url: 'https://fincado.com/hi/sip-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiSIPPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    monthlyInv: 'मासिक निवेश (Monthly Investment)',
    rate: 'ब्याज दर (Expected Return %)',
    timePeriod: 'समय अवधि (Years)',
    maturityValue: 'कुल राशि (Maturity Value)',
    invested: 'कुल निवेश (Invested)',
    returns: 'अनुमानित रिटर्न (Returns)',
  };

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'faq-1',
      question: 'क्या मैं SIP के पैसे कभी भी निकाल सकता हूँ?',
      answer:
        'हाँ, ओपन-एंडेड म्यूचुअल फंड में आप कभी भी पैसा निकाल सकते हैं। हालाँकि, ELSS (टैक्स सेविंग) फंड में 3 साल का लॉक-इन पीरियड होता है।',
    },
    {
      id: 'faq-2',
      question: 'अगर मैं एक महीने की SIP किस्त न दे पाऊँ तो क्या होगा?',
      answer:
        'ज्यादा कुछ नहीं। आपका बैंक बाउंस चार्ज काट सकता है, लेकिन आपकी SIP रद्द नहीं होती और अगले महीने से जारी रहती है।',
    },
    {
      id: 'faq-3',
      question: 'SIP निवेश के लिए कौन सी तारीख सबसे अच्छी है?',
      answer:
        'लंबे समय में तारीख का रिटर्न पर कोई खास असर नहीं पड़ता। अपनी सैलरी आने के बाद की कोई तारीख (जैसे 5 या 7 तारीख) चुनें ताकि अनुशासन बना रहे।',
    },
    {
      id: 'faq-4',
      question: 'स्टेप-अप (Step-Up) SIP क्या है?',
      answer:
        'स्टेप-अप SIP आपको हर साल अपनी निवेश राशि बढ़ाने (जैसे 10% से) की अनुमति देता है। इससे आपकी भविष्य की कुल राशि (Corpus) में भारी वृद्धि होती है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="SIP Calculator Hindi"
        description="Calculate SIP returns in Hindi with inflation adjustment."
        url="https://fincado.com/hi/sip-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'SIP कैलकुलेटर',
            url: 'https://fincado.com/hi/sip-calculator/',
          },
        ]}
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="SIP कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/sip-calculator" />
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
            <span className="block mb-2">SIP कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              छोटे निवेश से बड़ा फंड बनाएं
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              एसआईपी (SIP) म्यूचुअल फंड में निवेश करने का सबसे आसान और अनुशासित
              तरीका है। जानें कि <strong>कंपाउंडिंग (Compounding)</strong> की
              शक्ति से आप भविष्य में कितना अमीर बन सकते हैं।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <SIPClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-sip-mid" type="banner" />
            </div>

            {/* --- PROMO BOX --- */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Trophy className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    2025 में कहाँ निवेश करें?
                  </strong>

                  <Link
                    href="/hi/guides/sip-investment-guide/" // Use English guide if Hindi not available
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>हमारी गाइड पढ़ें: सर्वश्रेष्ठ SIP रणनीतियाँ</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS SIP */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      SIP क्या है? (What is SIP?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        SIP का मतलब है{' '}
                        <strong>Systematic Investment Plan</strong>। यह म्यूचुअल
                        फंड में निवेश करने का एक तरीका है जिसमें आप एकमुश्त पैसा
                        लगाने के बजाय हर महीने थोड़ी-थोड़ी रकम (जैसे ₹500) जमा
                        करते हैं।
                      </p>
                      <p>
                        यह <strong>Rupee Cost Averaging</strong> के सिद्धांत पर
                        काम करता है—जब बाजार गिरता है तो आपको ज्यादा यूनिट मिलते
                        हैं और जब बाजार चढ़ता है तो आपके निवेश की वैल्यू बढ़ती
                        है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: BENEFITS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SIP के फायदे (Benefits)
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>छोटी शुरुआत:</strong> आप मात्र ₹500 प्रति माह से
                        शुरू कर सकते हैं।
                      </li>
                      <li>
                        <strong>अनुशासन:</strong> बैंक से अपने आप पैसा कटने
                        (Auto-debit) से बचत की आदत बनती है।
                      </li>
                      <li>
                        <strong>कंपाउंडिंग की शक्ति:</strong> लंबे समय में आपको
                        &quot;ब्याज पर ब्याज&quot; मिलता है, जिससे पैसा तेजी से
                        बढ़ता है।
                      </li>
                      <li>
                        <strong>लचीलापन:</strong> आप कभी भी राशि बढ़ा सकते हैं
                        या SIP रोक सकते हैं।
                      </li>
                    </ul>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: TAXATION */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SIP रिटर्न पर टैक्स (Taxation Rules 2025)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        इक्विटी म्यूचुअल फंड (जहाँ 65% पैसा शेयर बाजार में लगता
                        है) के लिए नियम इस प्रकार हैं:
                      </p>
                      <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>
                          <strong>1 साल से कम (STCG):</strong> मुनाफे पर 20%
                          टैक्स।
                        </li>
                        <li>
                          <strong>1 साल से ज्यादा (LTCG):</strong> ₹1.25 लाख से
                          ऊपर के मुनाफे पर 12.5% टैक्स।
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* SECTION 4: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SIP गणना का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      SIP रिटर्न की गणना के लिए निम्नलिखित गणितीय सूत्र का उपयोग
                      किया जाता है:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="FV = P \times \frac{(1 + i)^n - 1}{i} \times (1 + i)" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>FV</strong> = भविष्य की राशि (Future Value)
                        </li>
                        <li>
                          <strong>P</strong> = मासिक निवेश राशि
                        </li>
                        <li>
                          <strong>i</strong> = मासिक ब्याज दर (वार्षिक दर ÷
                          1200)
                        </li>
                        <li>
                          <strong>n</strong> = कुल महीने (निवेश अवधि)
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
                    defaultValue={faqItems[0]?.id}
                    className="space-y-2"
                  >
                    {faqItems.map((faq) => (
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
              <HindiSidebar adId="hi-sip-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
