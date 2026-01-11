import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EducationLoanClient from '@/app/loans/education-loan/EducationLoanClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle'; // ✅ Added
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex'; // ✅ Added for Formula
import FAQSchema from '@/components/FAQSchema'; // ✅ Added
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // ✅ Added
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // ✅ Added
import { Plane, ArrowRight } from 'lucide-react'; // ✅ Icons

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'एजुकेशन लोन कैलकुलेटर – ब्याज, EMI और टैक्स छूट (Section 80E)',
  description:
    'Fincado एजुकेशन लोन कैलकुलेटर (Hindi): अपनी EMI और कोर्स अवधि के ब्याज (Moratorium) की गणना करें। विदेश में पढ़ाई और टैक्स लाभ (Section 80E) की जानकारी प्राप्त करें।',
  keywords: [
    'Education Loan Calculator Hindi',
    'Student Loan EMI Hindi',
    'Section 80E Tax Deduction Hindi',
    'Study Abroad Loan Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/loans/education-loan/',
    languages: {
      'en-IN': 'https://fincado.com/loans/education-loan/',
    },
  },
  openGraph: {
    title: 'एजुकेशन लोन कैलकुलेटर – अपने भविष्य की योजना बनाएं',
    description: 'मुफ्त टूल: कोर्स के दौरान ब्याज और EMI की सटीक गणना करें।',
    url: 'https://fincado.com/hi/loans/education-loan/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiEducationLoanPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
    interestRate: 'ब्याज दर (Interest Rate %)',
    moratorium: 'कोर्स अवधि (Moratorium Months)',
    repaymentTenure: 'पुनर्भुगतान अवधि (Years)',
    payInterestToggle: 'क्या आप कोर्स के दौरान ब्याज चुकाएंगे?',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principalCap: 'कुल मूलधन (Principal + Interest)',
    totalInterest: 'कुल ब्याज',
    interestSavedMsg: '✅ आप मूलधन पर ब्याज बचा रहे हैं!',
    interestAddedMsg: '⚠️ ब्याज मूलधन में जुड़ गया:',
    repaymentSchedule: 'किस्त तालिका (Repayment Schedule)',
    startsAfter: 'कोर्स अवधि (Moratorium) के बाद शुरू',
    copy: 'कॉपी करें',
    export: 'डाउनलोड (CSV)',
    print: 'प्रिंट करें',
    month: 'माह',
    principal: 'मूलधन',
    interest: 'ब्याज',
    balance: 'बकाया राशि',
  };

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'faq-1',
      question: 'Moratorium अवधि क्या है?',
      answer:
        "यह एक 'पुनर्भुगतान अवकाश' (Repayment Holiday) है, जिसमें कोर्स की अवधि और 6-12 महीने शामिल होते हैं। इस दौरान आपको EMI नहीं देनी पड़ती, लेकिन साधारण ब्याज जुड़ता रहता है।",
    },
    {
      id: 'faq-2',
      question: 'Section 80E के तहत किसे छूट मिलती है?',
      answer:
        'कोई भी व्यक्ति जिसने अपनी, अपने जीवनसाथी या बच्चों की उच्च शिक्षा के लिए लोन लिया है, वह ब्याज पर टैक्स छूट का दावा कर सकता है।',
    },
    {
      id: 'faq-3',
      question: 'क्या विदेश में पढ़ाई के लिए लोन मिलता है?',
      answer:
        'हाँ। बैंक विदेश के प्रतिष्ठित संस्थानों के लिए ₹1.5 करोड़ तक का लोन देते हैं। आमतौर पर ₹7.5 लाख से अधिक के लोन के लिए संपत्ति (Collateral) की आवश्यकता होती है।',
    },
    {
      id: 'faq-4',
      question: 'क्या मैं कोर्स के दौरान ब्याज चुका सकता हूँ?',
      answer:
        'हाँ, यदि आप कोर्स के दौरान साधारण ब्याज का भुगतान करते हैं, तो आपकी EMI कम हो जाएगी क्योंकि ब्याज मूलधन (Principal) में नहीं जुड़ेगा।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Education Loan EMI Calculator Hindi"
        description="Calculate Education Loan EMI and Section 80E benefits in Hindi."
        url="https://fincado.com/hi/loans/education-loan/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'लोन', url: 'https://fincado.com/hi/loans/' },
          {
            name: 'एजुकेशन लोन कैलकुलेटर',
            url: 'https://fincado.com/hi/loans/education-loan/',
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
            <ShareTools title="एजुकेशन लोन कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/loans/education-loan" />
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
            <span className="block mb-2">एजुकेशन लोन कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              Moratorium अवधि और 80E टैक्स बचत की गणना करें
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              अपनी उच्च शिक्षा की योजना बनाएं। Fincado के कैलकुलेटर से{' '}
              <strong>Moratorium अवधि</strong> के साथ EMI की सटीक गणना करें और
              जानें कि आप <strong>Section 80E</strong> के तहत कितना टैक्स बचा
              सकते हैं।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <EducationLoanClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hindi-edu-loan-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="personalLoan" />

            {/* PROMO CARD (Study Abroad) */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Plane className="h-5 w-5 -rotate-45" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    क्या विदेश में पढ़ाई की योजना बना रहे हैं?
                  </strong>
                  <Link
                    href="/guides/education-loan-guide" // Ensure link exists or use English
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>गाइड पढ़ें: कोलेटरल बनाम नॉन-कोलेटरल लोन</span>
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
                      एजुकेशन लोन क्या है? (What is Education Loan?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        एजुकेशन लोन एक वित्तीय सहायता है जो छात्रों को भारत या
                        विदेश में उच्च शिक्षा प्राप्त करने में मदद करती है। अन्य
                        लोन के विपरीत, इसमें <strong>Moratorium अवधि</strong>{' '}
                        (पुनर्भुगतान अवकाश) की सुविधा होती है, जहाँ छात्र को
                        कोर्स के दौरान EMI नहीं चुकानी पड़ती।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: TAX BENEFITS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Section 80E टैक्स लाभ (Tax Benefits)
                    </h3>
                    <p className="text-slate-700">
                      एजुकेशन लोन सभी लोन प्रकारों में सबसे अच्छा टैक्स लाभ
                      प्रदान करता है। आयकर अधिनियम की <strong>धारा 80E</strong>{' '}
                      के तहत, आप चुकाए गए <strong>पूरे ब्याज</strong> पर कटौती
                      का दावा कर सकते हैं।
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>सीमा:</strong> कटौती की राशि पर कोई ऊपरी सीमा
                        नहीं है (80C के विपरीत)।
                      </li>
                      <li>
                        <strong>अवधि:</strong> यह लाभ 8 साल तक या जब तक ब्याज
                        पूरा न चुक जाए, तब तक मिलता है।
                      </li>
                    </ul>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: ELIGIBILITY */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      पात्रता (Eligibility Criteria)
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>छात्र:</strong> भारतीय नागरिक होना चाहिए, आयु
                        18-35 वर्ष।
                      </li>
                      <li>
                        <strong>सह-आवेदक (Co-Applicant):</strong> माता-पिता या
                        अभिभावक का होना अनिवार्य है।
                      </li>
                      <li>
                        <strong>संपार्श्विक (Collateral):</strong> ₹4 लाख तक के
                        लोन के लिए कुछ भी गिरवी रखने की आवश्यकता नहीं होती।
                      </li>
                    </ul>
                  </section>

                  {/* SECTION 4: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EMI फॉर्मूला (Calculation Formula)
                    </h3>
                    <p className="text-slate-700">
                      एजुकेशन लोन में Moratorium अवधि के ब्याज को मूलधन में जोड़
                      दिया जाता है:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="EMI = [(P + I_{moratorium}) \times r \times (1+r)^N] / [(1+r)^N - 1]" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>P</strong> = मूल लोन राशि
                        </li>
                        <li>
                          <strong>
                            I<sub>moratorium</sub>
                          </strong>{' '}
                          = पढ़ाई के दौरान जमा हुआ ब्याज
                        </li>
                        <li>
                          <strong>r</strong> = मासिक ब्याज दर
                        </li>
                        <li>
                          <strong>N</strong> = पुनर्भुगतान अवधि (महीनों में)
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* SECTION 5: RELATED TOOLS */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित कैलकुलेटर
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Link href="/hi/emi-calculator" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="font-semibold text-slate-900 group-hover:text-emerald-700">
                              EMI कैलकुलेटर
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                      <Link href="/hi/loans/personal-loan" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="font-semibold text-slate-900 group-hover:text-emerald-700">
                              पर्सनल लोन कैलकुलेटर
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
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
              <HindiSidebar adId="hindi-edu-loan-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
