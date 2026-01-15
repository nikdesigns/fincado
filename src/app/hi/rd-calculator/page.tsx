import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RDClient from '@/app/rd-calculator/RDClient';
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
import { ShieldCheck, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'RD कैलकुलेटर – रिकरिंग डिपॉजिट ब्याज और परिपक्वता राशि | Fincado',
  description:
    'RD कैलकुलेटर हिंदी में: जानें कि आपकी मासिक आरडी (Recurring Deposit) पर आपको कितना ब्याज मिलेगा और मैच्योरिटी राशि क्या होगी।',
  keywords: [
    'RD Calculator Hindi',
    'Recurring Deposit Calculator Hindi',
    'RD Interest Rate Hindi',
    'आरडी कैलकुलेटर',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/rd-calculator/',
    languages: { 'en-IN': 'https://fincado.com/rd-calculator/' },
  },
  openGraph: {
    title: 'RD कैलकुलेटर – सुरक्षित और निश्चित रिटर्न',
    description:
      'मुफ्त टूल: RD परिपक्वता राशि, कुल ब्याज और टीडीएस की सटीक गणना करें।',
    url: 'https://fincado.com/hi/rd-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiRDPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    monthlyDeposit: 'मासिक जमा (Monthly Deposit)',
    rate: 'ब्याज दर (Interest Rate %)',
    years: 'वर्ष (Years)',
    months: 'महीने (Months)',
    maturityAmount: 'परिपक्वता राशि (Maturity Amount)',
    totalInv: 'कुल जमा (Total Investment)',
    grossInt: 'कुल ब्याज (Gross Interest)',
    netInt: 'नेट ब्याज (Net Interest)',
    taxDeducted: 'TDS (Tax)',
    advancedParams: 'टैक्स विकल्प (Advanced)',
    taxRate: 'टैक्स दर (%)',
    ignoreTax: 'बिना टैक्स के देखें (Show Gross)',
  };

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'rd-faq-1',
      question: 'क्या RD के ब्याज पर टैक्स लगता है?',
      answer:
        'हाँ। रिकरिंग डिपॉजिट (RD) से मिलने वाला ब्याज पूरी तरह से टैक्सेबल होता है। अगर आपका ब्याज एक साल में ₹40,000 (वरिष्ठ नागरिकों के लिए ₹50,000) से ज्यादा है, तो बैंक 10% TDS काटता है।',
    },
    {
      id: 'rd-faq-2',
      question: 'क्या मैं अपनी मासिक किस्त बीच में बढ़ा सकता हूँ?',
      answer:
        'नहीं। सामान्य RD में मासिक किस्त की राशि खाता खोलते समय तय हो जाती है। हालाँकि, कुछ बैंक "Flexi RD" की सुविधा देते हैं जहाँ आप राशि बदल सकते हैं।',
    },
    {
      id: 'rd-faq-3',
      question: 'RD की न्यूनतम और अधिकतम अवधि क्या है?',
      answer:
        'आमतौर पर RD की न्यूनतम अवधि 6 महीने और अधिकतम अवधि 10 साल तक होती है।',
    },
    {
      id: 'rd-faq-4',
      question: 'क्या RD एक सुरक्षित निवेश है?',
      answer:
        'हाँ, RD बहुत सुरक्षित मानी जाती है क्योंकि इसमें ब्याज दर निश्चित होती है और बाजार के उतार-चढ़ाव का कोई असर नहीं होता। साथ ही, ₹5 लाख तक की राशि DICGC द्वारा बीमित होती है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="RD Calculator Hindi"
        description="Calculate Recurring Deposit maturity in Hindi."
        url="https://fincado.com/hi/rd-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'RD कैलकुलेटर',
            url: 'https://fincado.com/hi/rd-calculator/',
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
            <ShareTools title="RD कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/rd-calculator" />
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
            <span className="block mb-2">RD कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              छोटी मासिक बचत से बड़ा फंड बनाएं
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              रिकरिंग डिपॉजिट (RD) उन लोगों के लिए बेहतरीन है जो एक बार में बड़ा
              निवेश नहीं कर सकते। हर महीने थोड़ी रकम जमा करें और बैंक से{' '}
              <strong>चक्रवृद्धि ब्याज (Compound Interest)</strong> के साथ
              सुरक्षित रिटर्न पाएं।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <RDClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-rd-mid" type="banner" />
            </div>

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                तुलना करें
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/sip-calculator/"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:bg-slate-50
                  "
                >
                  📈 SIP कैलकुलेटर
                </Link>
                <Link
                  href="/hi/fd-calculator/"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:bg-slate-50
                  "
                >
                  💰 FD कैलकुलेटर
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    क्या आप ज्यादा रिटर्न चाहते हैं?
                  </strong>

                  <Link
                    href="/guides/fixed-deposit-guide/" // Use English or Hindi guide
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>गाइड पढ़ें: FD लैडरिंग से ब्याज कैसे बढ़ाएं</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS RD */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      RD (रिकरिंग डिपॉजिट) क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        RD एक प्रकार का टर्म डिपॉजिट है जिसमें आप एकमुश्त राशि
                        जमा करने के बजाय, हर महीने एक निश्चित राशि जमा करते हैं।
                        यह वेतनभोगी (Salaried) लोगों के लिए बचत का सबसे अच्छा
                        तरीका है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: TAXATION */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      RD ब्याज पर टैक्स (Taxation Rules)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        RD से मिलने वाला ब्याज पूरी तरह टैक्सेबल होता है। यह
                        आपकी कुल आय में जुड़ता है और आपके टैक्स स्लैब के अनुसार
                        टैक्स लगता है।
                      </p>
                      <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>
                          <strong>TDS:</strong> अगर ब्याज ₹40,000 (सीनियर सिटीजन
                          के लिए ₹50,000) से ज्यादा है, तो बैंक 10% TDS काटता
                          है।
                        </li>
                        <li>
                          <strong>Form 15G/15H:</strong> अगर आपकी आय टैक्सेबल
                          सीमा से कम है, तो आप यह फॉर्म जमा करके TDS कटने से रोक
                          सकते हैं।
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: RD VS SIP */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      RD बनाम SIP: कौन बेहतर है?
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        लोग अक्सर <strong>RD और SIP</strong> में कंफ्यूज रहते
                        हैं। RD आपको सुरक्षित और गारंटीड रिटर्न (6.5% - 7.5%)
                        देता है, जबकि SIP (म्यूचुअल फंड) में आपको ज्यादा रिटर्न
                        (12% - 15%) मिल सकता है लेकिन इसमें बाजार का जोखिम होता
                        है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 4: BENEFITS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      RD के फायदे (Benefits)
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>छोटी बचत:</strong> आप मात्र ₹500 प्रति माह से
                        शुरुआत कर सकते हैं।
                      </li>
                      <li>
                        <strong>निश्चित ब्याज:</strong> खाता खोलते समय ब्याज दर
                        लॉक हो जाती है।
                      </li>
                      <li>
                        <strong>अनुशासन:</strong> हर महीने निवेश करने की आदत
                        बनती है।
                      </li>
                      <li>
                        <strong>लोन सुविधा:</strong> आप अपनी RD राशि पर 90% तक
                        का लोन ले सकते हैं।
                      </li>
                    </ul>
                  </section>

                  {/* SECTION 5: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      RD ब्याज गणना का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      बैंक RD ब्याज की गणना तिमाही चक्रवृद्धि (Quarterly
                      Compounding) के आधार पर करते हैं:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="M = \sum_{i=1}^{n} P \left(1 + \frac{r}{400}\right)^{4 \times \frac{t_i}{12}}" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>M</strong> = परिपक्वता राशि (Maturity Value)
                        </li>
                        <li>
                          <strong>P</strong> = मासिक किस्त
                        </li>
                        <li>
                          <strong>r</strong> = ब्याज दर (%)
                        </li>
                        <li>
                          <strong>t</strong> = समय (महीनों में)
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
              <HindiSidebar adId="hi-rd-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
