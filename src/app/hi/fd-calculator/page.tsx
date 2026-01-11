import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FDClient from '@/app/fd-calculator/FDClient';
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
  title: 'FD कैलकुलेटर – फिक्स्ड डिपॉजिट ब्याज और रिटर्न | Fincado',
  description:
    'FD (Fixed Deposit) कैलकुलेटर हिंदी में: जानें कि आपकी जमा राशि पर बैंक आपको कितना ब्याज देगा। परिपक्वता राशि और टीडीएस की गणना करें।',
  keywords: [
    'FD Calculator Hindi',
    'Fixed Deposit Calculator Hindi',
    'FD Interest Rates 2025',
    'FD Maturity Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/fd-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/fd-calculator/',
    },
  },
  openGraph: {
    title: 'FD कैलकुलेटर – सुरक्षित निवेश और निश्चित रिटर्न',
    description:
      'मुफ्त टूल: FD मैच्योरिटी राशि, कुल ब्याज और टीडीएस की सटीक गणना करें।',
    url: 'https://fincado.com/hi/fd-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiFDPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    principal: 'जमा राशि (Principal Amount)',
    rate: 'ब्याज दर (Interest Rate %)',
    years: 'वर्ष (Years)',
    months: 'महीने (Months)',
    freq: 'ब्याज चक्र (Compounding Freq)',
    maturity: 'परिपक्वता राशि (Maturity Amount)',
    totalPrincipal: 'मूल राशि (Principal)',
    interest: 'कुल ब्याज (Total Interest)',
  };

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'fd-faq-1',
      question: 'क्या FD के ब्याज पर टैक्स लगता है?',
      answer:
        'हाँ। फिक्स्ड डिपॉजिट से मिलने वाला ब्याज पूरी तरह से टैक्सेबल होता है। अगर आपका ब्याज एक साल में ₹40,000 (वरिष्ठ नागरिकों के लिए ₹50,000) से ज्यादा है, तो बैंक 10% TDS काटता है।',
    },
    {
      id: 'fd-faq-2',
      question: 'क्या मैं अपनी FD समय से पहले तोड़ सकता हूँ?',
      answer:
        'हाँ, ज्यादातर बैंक समय से पहले निकासी (Premature Withdrawal) की अनुमति देते हैं, लेकिन वे ब्याज दर पर 0.5% – 1% की पेनल्टी लगा सकते हैं।',
    },
    {
      id: 'fd-faq-3',
      question:
        'कम्युलेटिव (Cumulative) और नॉन-कम्युलेटिव FD में क्या अंतर है?',
      answer:
        'कम्युलेटिव FD में ब्याज हर तिमाही मूलधन में जुड़ता रहता है और आपको मैच्योरिटी पर एकमुश्त राशि मिलती है (ज्यादा फायदा)। नॉन-कम्युलेटिव FD में ब्याज आपको हर महीने या तिमाही आपके खाते में मिल जाता है।',
    },
    {
      id: 'fd-faq-4',
      question: 'क्या FD एक सुरक्षित निवेश है?',
      answer:
        'हाँ, यह बहुत सुरक्षित माना जाता है। DICGC के तहत प्रत्येक बैंक में ₹5 लाख तक की जमा राशि (मूलधन + ब्याज) पूरी तरह से बीमित होती है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="FD Calculator Hindi"
        description="Calculate Fixed Deposit returns in Hindi."
        url="https://fincado.com/hi/fd-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'FD कैलकुलेटर',
            url: 'https://fincado.com/hi/fd-calculator/',
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
            <ShareTools title="FD कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/fd-calculator" />
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
            <span className="block mb-2">FD कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              ब्याज और मैच्योरिटी राशि की सटीक गणना
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              फिक्स्ड डिपॉजिट (FD) निवेश का पारंपरिक और सुरक्षित तरीका है। अपनी
              जमा राशि, ब्याज दर और अवधि दर्ज करें और जानें कि आपको{' '}
              <strong>चक्रवृद्धि ब्याज (Compound Interest)</strong> के साथ कितना
              रिटर्न मिलेगा।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <FDClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-fd-mid" type="banner" />
            </div>

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य बचत टूल
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/rd-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition
                    hover:border-emerald-300
                    hover:bg-emerald-50
                  "
                >
                  🔄 RD कैलकुलेटर
                </Link>
                <Link
                  href="/hi/ppf-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition
                    hover:border-emerald-300
                    hover:bg-emerald-50
                  "
                >
                  🏦 PPF कैलकुलेटर
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
                    क्या आप सुरक्षित निवेश चाहते हैं?
                  </strong>

                  <Link
                    href="/guides/fixed-deposit-guide" // Ensure this path exists or fallback to English
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      हमारी गाइड पढ़ें: FD लैडरिंग (Laddering) से ज्यादा ब्याज
                      कैसे पाएं
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
                  {/* SECTION 1: WHAT IS FD */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      FD (फिक्स्ड डिपॉजिट) क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        FD में आप एक निश्चित राशि को बैंक में एक निश्चित समय
                        (जैसे 1 साल, 5 साल) के लिए जमा करते हैं। बदले में बैंक
                        आपको सामान्य बचत खाते से ज्यादा ब्याज देता है।
                      </p>
                      <p>
                        शेयर बाजार के विपरीत, FD में{' '}
                        <strong>पूंजी की सुरक्षा (Capital Safety)</strong> और{' '}
                        <strong>गारंटीड रिटर्न</strong> मिलता है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: BENEFITS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      FD के मुख्य लाभ (Benefits)
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>सुरक्षित निवेश:</strong> ₹5 लाख तक की जमा राशि
                        DICGC द्वारा बीमित होती है।
                      </li>
                      <li>
                        <strong>निश्चित रिटर्न:</strong> बाजार के उतार-चढ़ाव का
                        कोई असर नहीं।
                      </li>
                      <li>
                        <strong>वरिष्ठ नागरिक लाभ:</strong> सीनियर सिटीजन्स को
                        0.50% अतिरिक्त ब्याज मिलता है।
                      </li>
                      <li>
                        <strong>लोन सुविधा:</strong> आप अपनी FD पर 90% तक का लोन
                        भी ले सकते हैं।
                      </li>
                    </ul>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      FD मैच्योरिटी का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      बैंक चक्रवृद्धि ब्याज (Compound Interest) की गणना के लिए
                      निम्नलिखित सूत्र का उपयोग करते हैं:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="A = P \left(1 + \frac{r}{n}\right)^{n \times t}" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>A</strong>: मैच्योरिटी राशि (Maturity Amount)
                        </li>
                        <li>
                          <strong>P</strong>: जमा राशि (Principal)
                        </li>
                        <li>
                          <strong>r</strong>: ब्याज दर (दशमलव में)
                        </li>
                        <li>
                          <strong>n</strong>: ब्याज चक्र (तिमाही के लिए 4)
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
              <HindiSidebar adId="hi-fd-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
