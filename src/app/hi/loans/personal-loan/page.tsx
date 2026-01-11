import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PersonalLoanClient from '@/app/loans/personal-loan/PersonalLoanClient';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
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
import { Banknote, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'पर्सनल लोन EMI कैलकुलेटर – पात्रता और ब्याज दरें (2025)',
  description:
    'Fincado पर्सनल लोन कैलकुलेटर (Hindi): अपनी EMI निकालें, ब्याज दरें तुलना करें और पात्रता चेक करें। शादी, यात्रा या मेडिकल खर्च के लिए सटीक गणना।',
  keywords: [
    'Personal Loan EMI Calculator Hindi',
    'Personal Loan Interest Rate Hindi',
    'Unsecured Loan Calculator Hindi',
    'Loan Eligibility Calculator Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/loans/personal-loan/',
    languages: {
      'en-IN': 'https://fincado.com/loans/personal-loan/',
    },
  },
  openGraph: {
    title: 'पर्सनल लोन EMI कैलकुलेटर – अपनी जरूरतों को पूरा करें',
    description: 'मुफ्त टूल: पर्सनल लोन EMI, ब्याज और अवधि की गणना करें।',
    url: 'https://fincado.com/hi/loans/personal-loan/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiPersonalLoanPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
    interestRate: 'ब्याज दर (Interest Rate %)',
    tenure: 'अवधि (Years)',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principal: 'मूल राशि (Principal)',
    interest: 'ब्याज (Interest)',
    amortizationSchedule: 'किस्त तालिका (Amortization)',
    monthlyBreakdown: 'मासिक विवरण',
    copy: 'कॉपी करें',
    export: 'डाउनलोड (CSV)',
    print: 'प्रिंट करें',
    month: 'माह',
    balance: 'बकाया राशि',
  };

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'faq-1',
      question: 'पर्सनल लोन EMI की गणना कैसे की जाती है?',
      answer:
        'पर्सनल लोन EMI की गणना इस फॉर्मूले से होती है: [P x R x (1+R)^N] / [(1+R)^N-1], जहाँ P मूलधन है, R मासिक ब्याज दर है, और N महीनों में अवधि है।',
    },
    {
      id: 'faq-2',
      question: 'क्या मैं अपना पर्सनल लोन पहले चुका सकता हूँ?',
      answer:
        'हाँ, लेकिन अधिकांश बैंक बकाया मूलधन पर 2-4% का फोरक्लोजर शुल्क (Foreclosure Charges) लेते हैं। कुछ बैंक 12 महीने के बाद इसे मुफ्त कर देते हैं।',
    },
    {
      id: 'faq-3',
      question: 'क्या पर्सनल लोन के ब्याज पर टैक्स छूट मिलती है?',
      answer:
        'आमतौर पर नहीं। हालाँकि, यदि लोन का उपयोग घर की मरम्मत (धारा 24 के तहत) या व्यवसाय विस्तार के लिए किया जाता है, तो आप कटौती का दावा कर सकते हैं।',
    },
    {
      id: 'faq-4',
      question: 'पर्सनल लोन के लिए कितना सिबिल स्कोर चाहिए?',
      answer:
        '750 या उससे अधिक का CIBIL स्कोर उत्कृष्ट माना जाता है। इससे आपको कम ब्याज दर और जल्दी लोन मंजूरी मिलने में मदद मिलती है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Personal Loan EMI Calculator Hindi"
        description="Calculate Personal Loan EMI in Hindi."
        url="https://fincado.com/hi/loans/personal-loan/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'लोन', url: 'https://fincado.com/hi/loans/' },
          {
            name: 'पर्सनल लोन EMI कैलकुलेटर',
            url: 'https://fincado.com/hi/loans/personal-loan/',
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
            <ShareTools title="पर्सनल लोन EMI कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/loans/personal-loan" />
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
            <span className="block mb-2">पर्सनल लोन EMI कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              शादी, यात्रा या इमरजेंसी के लिए EMI चेक करें
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              अपने खर्चों की योजना बनाएं। Fincado के{' '}
              <strong>EMI कैलकुलेटर</strong> का उपयोग करके तुरंत जानें कि आपकी
              मासिक किस्त कितनी होगी। ब्याज दरों की तुलना करें और अप्लाई करने से
              पहले अपनी <strong>पात्रता (Eligibility)</strong> जांचें।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <PersonalLoanClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-personal-loan-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="personalLoan" />

            {/* PROMO CARD */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Banknote className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    क्या आपको तुरंत लोन चाहिए?
                  </strong>

                  <Link
                    href="/guides/personal-loan-guide" // Make sure this page exists or redirect to English
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>गाइड पढ़ें: तुरंत लोन अप्रूवल कैसे पाएं</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS IT */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      पर्सनल लोन क्या है? (What is a Personal Loan?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        पर्सनल लोन एक{' '}
                        <strong>असुरक्षित ऋण (Unsecured Loan)</strong> है जो
                        बैंक आपकी तत्काल वित्तीय जरूरतों को पूरा करने के लिए
                        देते हैं। होम या कार लोन के विपरीत, इसका उपयोग किसी भी
                        उद्देश्य (शादी, मेडिकल, यात्रा) के लिए किया जा सकता है।
                      </p>
                      <p>
                        चूंकि यह &quot;असुरक्षित&quot; है, इसलिए आपको कोई{' '}
                        <strong>संपत्ति</strong> (जैसे घर या सोना) गिरवी रखने की
                        आवश्यकता नहीं होती। इसकी मंजूरी मुख्य रूप से आपके
                        <strong>क्रेडिट स्कोर (CIBIL Score)</strong> और आय पर
                        निर्भर करती है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: ELIGIBILITY */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      पात्रता (Eligibility Criteria)
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>रोजगार:</strong> वेतनभोगी (Salaried) या
                        स्वरोजगार (Self-Employed)।
                      </li>
                      <li>
                        <strong>आयु:</strong> 21 से 60 वर्ष।
                      </li>
                      <li>
                        <strong>क्रेडिट स्कोर:</strong> 750+ CIBIL स्कोर पर सबसे
                        अच्छी ब्याज दरें मिलती हैं।
                      </li>
                      <li>
                        <strong>आय:</strong> न्यूनतम मासिक आय ₹25,000 (शहर के
                        अनुसार भिन्न हो सकती है)।
                      </li>
                    </ul>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: COMPARISON */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      पर्सनल लोन बनाम क्रेडिट कार्ड लोन
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        कई लोग पर्सनल लोन और क्रेडिट कार्ड लोन में भ्रमित होते
                        हैं। <strong>पर्सनल लोन</strong> आमतौर पर सस्ते (10.5% –
                        14%) होते हैं, जबकि क्रेडिट कार्ड पर ब्याज दरें बहुत
                        अधिक (36% – 42%) होती हैं। बड़े खर्चों के लिए हमेशा
                        पर्सनल लोन चुनें।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 4: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EMI फॉर्मूला (Calculation Formula)
                    </h3>
                    <p className="text-slate-700">
                      बैंक निम्नलिखित फॉर्मूले का उपयोग करके आपकी EMI तय करते
                      हैं:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="EMI = \frac{P \times R \times (1+R)^N}{(1+R)^N - 1}" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>P</strong> = लोन राशि (Principal)
                        </li>
                        <li>
                          <strong>R</strong> = मासिक ब्याज दर (वार्षिक दर ÷ 12 ÷
                          100)
                        </li>
                        <li>
                          <strong>N</strong> = महीनों की संख्या (Tenure)
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
              <HindiSidebar adId="hi-personal-loan-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
