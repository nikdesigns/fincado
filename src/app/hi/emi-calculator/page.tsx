import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EMIClient from '@/app/emi-calculator/EMIClient';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import HindiSidebar from '@/components/HindiSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { BookOpen, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'EMI कैलकुलेटर – होम लोन, पर्सनल लोन की EMI निकालें | Fincado',
  description:
    'Fincado EMI कैलकुलेटर (Hindi): जानें आपकी मासिक किस्त (EMI) कितनी होगी। होम लोन, कार लोन और पर्सनल लोन के लिए सटीक गणना करें।',
  keywords: [
    'EMI Calculator Hindi',
    'Home Loan EMI Hindi',
    'Personal Loan EMI Calculator',
    'Loan Interest Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/emi-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/emi-calculator/',
    },
  },
  openGraph: {
    title: 'EMI कैलकुलेटर – अपनी लोन EMI प्लान करें',
    description:
      'मुफ्त टूल: होम लोन, कार लोन और पर्सनल लोन की EMI और ब्याज की गणना करें।',
    url: 'https://fincado.com/hi/emi-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiEMIPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
    rate: 'ब्याज दर (Interest Rate %)',
    tenure: 'लोन अवधि (Years)',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principal: 'मूल राशि (Principal)',
    totalInterest: 'कुल ब्याज (Total Interest)',
  };

  // ✅ Hindi FAQ Items
  const faqItems = [
    {
      id: 'faq-1',
      question: 'EMI क्रेडिट स्कोर को कैसे प्रभावित करती है?',
      answer:
        'कैलकुलेटर पर EMI चेक करने से क्रेडिट स्कोर पर कोई असर नहीं पड़ता। हालांकि, अगर आप लोन लेने के बाद समय पर EMI नहीं चुकाते हैं, तो आपका सिबिल (CIBIL) स्कोर कम हो सकता है।',
    },
    {
      id: 'faq-2',
      question: 'क्या प्रीपेमेंट (Prepayment) करने से EMI कम होती है?',
      answer:
        'आम तौर पर, बैंक प्रीपेमेंट करने पर लोन की अवधि (Tenure) कम करते हैं क्योंकि इससे ब्याज की सबसे ज्यादा बचत होती है। अगर आप EMI कम करना चाहते हैं, तो बैंक से विशेष अनुरोध कर सकते हैं।',
    },
    {
      id: 'faq-3',
      question: 'बैंक EMI की गणना कैसे करते हैं?',
      answer:
        'भारतीय बैंक "Reducing Balance Method" का उपयोग करते हैं। इसका मतलब है कि ब्याज केवल बची हुई मूल राशि (Outstanding Principal) पर ही लगाया जाता है।',
    },
    {
      id: 'faq-4',
      question: 'क्या फिक्स्ड और फ्लोटिंग रेट में EMI अलग होती है?',
      answer:
        'हाँ। फिक्स्ड रेट में EMI पूरे लोन के दौरान एक समान रहती है। फ्लोटिंग रेट में अगर RBI रेपो रेट बदलता है, तो आपकी EMI घट या बढ़ सकती है।',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'EMI कैलकुलेटर',
            url: 'https://fincado.com/hi/emi-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="EMI Calculator Hindi"
        description="Calculate Loan EMI in Hindi for Home, Car, and Personal Loan."
        url="https://fincado.com/hi/emi-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER SECTION --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="EMI कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/emi-calculator" />
          </div>

          <h1
            className="
              mb-4
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-semibold
              tracking-tight
              text-slate-900
            "
          >
            EMI कैलकुलेटर
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              अपने लोन की स्मार्ट प्लानिंग करें
            </span>
          </h1>

          {/* 💰 AD 1: TOP LEADERBOARD */}
          {/* <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="hi-emi-top" type="leaderboard" />
          </div> */}

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              Fincado के <strong>EMI कैलकुलेटर</strong> का उपयोग करके अपनी मासिक
              किस्त, कुल ब्याज और भुगतान शेड्यूल की गणना करें। यह टूल
              <strong> होम लोन, पर्सनल लोन और कार लोन</strong> के लिए एकदम सही
              है। लोन लेने से पहले अलग-अलग ब्याज दरों की तुलना करें और सही फैसला
              लें।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          {/* LEFT: MAIN CONTENT */}
          <div className="main-content">
            <EMIClient labels={hindiLabels} />

            {/* --- KEY INSIGHTS CARD --- */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    महत्वपूर्ण जानकारी (Key Insights)
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 text-base text-slate-600 list-disc pl-5">
                    <li>
                      कम EMI का मतलब अक्सर लंबी अवधि और अधिक कुल ब्याज होता है।
                    </li>
                    <li>
                      छोटा सा प्रीपेमेंट (Prepayment) भी आपके ब्याज में लाखों की
                      बचत कर सकता है।
                    </li>
                    <li>
                      ब्याज दर की तुलना में &apos;लोन अवधि&apos; (Tenure) कुल
                      भुगतान पर ज्यादा असर डालती है।
                    </li>
                    <li>
                      लोन अप्लाई करने से पहले अलग-अलग बैंकों की EMI चेक करना
                      समझदारी है।
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* 💰 AD 2: AFTER RESULT */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-emi-after-calc" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="personalLoan" />

            {/* --- PROMO CARD --- */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                {/* Icon Container */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    क्या आप लोन प्लानिंग में मदद चाहते हैं?
                  </strong>

                  <Link
                    href="/guides/emi-calculator-guide/" // Ensure this path exists or point to English
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>हमारी गाइड पढ़ें: EMI कम करने के तरीके</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE CONTENT --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1 */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      EMI क्या है? (What is EMI?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        <strong>EMI (Equated Monthly Installment)</strong> वह
                        निश्चित राशि है जो आप हर महीने बैंक को अपने लोन को
                        चुकाने के लिए देते हैं। इसमें मूल राशि (Principal) और
                        ब्याज (Interest) दोनों शामिल होते हैं।
                      </p>
                      <p>
                        भारतीय बैंक <strong>Reducing Balance Method</strong> का
                        उपयोग करते हैं, जिसका अर्थ है कि ब्याज केवल बकाया राशि
                        पर ही लगाया जाता है, पूरी राशि पर नहीं।
                      </p>
                    </div>
                  </section>

                  {/* 💰 AD 3: SQUARE */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 2 */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EMI को प्रभावित करने वाले कारक
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700">
                      <li>
                        <strong>लोन राशि (Principal):</strong> जितनी बड़ी राशि,
                        उतनी बड़ी EMI।
                      </li>
                      <li>
                        <strong>ब्याज दर (Interest Rate):</strong> कम ब्याज दर
                        का मतलब है कम मासिक बोझ। इसलिए हमेशा बैंकों की तुलना
                        करें।
                      </li>
                      <li>
                        <strong>अवधि (Tenure):</strong> लंबी अवधि चुनने से मासिक
                        EMI कम हो जाती है, लेकिन बैंक को दिया जाने वाला कुल
                        ब्याज काफी बढ़ जाता है।
                      </li>
                    </ul>
                  </section>

                  {/* SECTION 3: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EMI गणना का फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      बैंक निम्नलिखित गणितीय सूत्र का उपयोग करके आपकी किस्त तय
                      करते हैं:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="E = P \times r \times \frac{(1 + r)^n}{(1 + r)^n - 1}" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>
                          <strong>E</strong> = EMI राशि
                        </li>
                        <li>
                          <strong>P</strong> = मूल लोन राशि (Principal)
                        </li>
                        <li>
                          <strong>r</strong> = मासिक ब्याज दर (वार्षिक दर ÷ 12 ÷
                          100)
                        </li>
                        <li>
                          <strong>n</strong> = महीनों की संख्या (Tenure in
                          months)
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* SECTION 4: RELATED TOOLS */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      अन्य लोन कैलकुलेटर
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Link href="/hi/loans/home-loan/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-lg">
                                🏠
                              </span>
                              <div>
                                <div className="font-semibold text-slate-900 group-hover:text-emerald-700">
                                  होम लोन कैलकुलेटर
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                  घर खरीदने का बजट प्लान करें
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      {/* More cards can be added here mirroring the English logic */}
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

            <AuthorBio />
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* Using HindiSidebar component which likely contains the specific Hindi nav logic */}
              <HindiSidebar adId="hi-emi-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
