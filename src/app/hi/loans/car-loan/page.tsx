import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CarLoanClient from '@/app/loans/car-loan/CarLoanClient';
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
import { Car, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'कार लोन EMI कैलकुलेटर – नई और पुरानी कार लोन ब्याज दरें',
  description:
    'Fincado कार लोन कैलकुलेटर (Hindi): नई और पुरानी कार लोन की EMI गणना करें। SBI, HDFC, Axis की ब्याज दरें तुलना करें और पात्रता जांचें।',
  keywords: [
    'Car Loan EMI Calculator Hindi',
    'Auto Loan Calculator Hindi',
    'New Car vs Used Car Loan Hindi',
    'Car Loan Eligibility Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/loans/car-loan/',
    languages: {
      'en-IN': 'https://fincado.com/loans/car-loan/',
    },
  },
  openGraph: {
    title: 'कार लोन EMI कैलकुलेटर – अपने सपनों की कार घर लाएं',
    description: 'मुफ्त टूल: कार लोन EMI, ब्याज और अवधि की गणना करें।',
    url: 'https://fincado.com/hi/loans/car-loan/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiCarLoanPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    vehiclePrice: 'वाहन की कीमत (Vehicle Price)',
    downPayment: 'डाउन पेमेंट (Down Payment)',
    tradeInValue: 'पुरानी कार की कीमत (Trade-In)',
    interestRate: 'ब्याज दर (Interest Rate %)',
    tenure: 'अवधि (Years)',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principal: 'मूल राशि (Principal)',
    interest: 'ब्याज (Interest)',
    amortizationSchedule: 'किस्त तालिका (Amortization)',
    yearlyBreakdown: 'वर्ष के अनुसार विवरण',
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
      question: 'क्या मैं लोन के दौरान अपनी कार बेच सकता हूँ?',
      answer:
        'नहीं। कार बेचने से पहले आपको लोन चुकाकर आरसी (RC) से हाइपोथेकेशन (Hypothecation) हटवाना होगा।',
    },
    {
      id: 'faq-2',
      question: 'क्या कार लोन पर फोरक्लोजर चार्ज लगता है?',
      answer:
        'हाँ। आमतौर पर बैंक बकाया मूलधन का 3-5% चार्ज करते हैं। हालांकि, कुछ बैंक 2-3 साल बाद इसे माफ कर देते हैं।',
    },
    {
      id: 'faq-3',
      question: 'क्या वेतनभोगी (Salaried) लोगों को टैक्स छूट मिलती है?',
      answer:
        'आमतौर पर नहीं। कार लोन पर टैक्स लाभ केवल उन स्वरोजगार (Self-employed) व्यक्तियों या व्यवसायों के लिए उपलब्ध है जो वाहन का उपयोग व्यावसायिक उद्देश्यों के लिए करते हैं।',
    },
    {
      id: 'faq-4',
      question: 'नई कार और पुरानी कार लोन में क्या अंतर है?',
      answer:
        'नई कार लोन पर ब्याज दरें कम (8.5% - 11%) होती हैं, जबकि पुरानी (Used) कार लोन पर ब्याज दरें 12% - 18% तक हो सकती हैं।',
    },
    {
      id: 'faq-5',
      question: 'कार लोन के लिए सबसे अच्छी अवधि (Tenure) क्या है?',
      answer:
        '4 से 5 साल की अवधि सबसे बेहतर मानी जाती है। इसमें आपकी EMI बजट में रहती है और आप पर ब्याज का बहुत ज्यादा बोझ नहीं पड़ता।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Car Loan EMI Calculator Hindi"
        description="Calculate Car Loan EMI in Hindi for New and Used Cars."
        url="https://fincado.com/hi/loans/car-loan/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'लोन', url: 'https://fincado.com/hi/loans/' },
          {
            name: 'कार लोन EMI कैलकुलेटर',
            url: 'https://fincado.com/hi/loans/car-loan/',
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
        <header className="no-print my-10">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="कार लोन EMI कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/loans/car-loan" />
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
            <span className="block mb-2">कार लोन EMI कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              EMI और डाउन पेमेंट चेक करें
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              अपने सपनों की कार घर लाएं। Fincado के{' '}
              <strong>कार लोन EMI कैलकुलेटर</strong> का उपयोग करके जानें कि आपकी
              मासिक किस्त कितनी होगी। नई और पुरानी कारों की ब्याज दरों की तुलना
              करें और सही <strong>डाउन पेमेंट (Down Payment)</strong> की योजना
              बनाएं।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <CarLoanClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-car-loan-mid" type="banner" />
            </div>

            {/* LIVE RATES TABLE */}
            <LiveRateTable type="carLoan" />

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Car className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    नई कार या पुरानी कार? (New vs Used)
                  </strong>

                  <Link
                    href="/guides/car-loan-guide" // Check if Hindi guide exists, else point to English
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>हमारी गाइड पढ़ें: ब्याज दरें और हिडन चार्ज</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS CAR LOAN */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      कार लोन क्या है? (What is a Car Loan?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        कार लोन एक <strong>सुरक्षित ऋण (Secured Loan)</strong>{' '}
                        है जो बैंक नई या पुरानी कार खरीदने के लिए देते हैं। जब
                        तक आप पूरा लोन नहीं चुका देते, तब तक कार बैंक के पास
                        गिरवी (Hypothecation) रहती है।
                      </p>
                      <p>
                        नई कारों के लिए ब्याज दरें आमतौर पर{' '}
                        <strong>8.5% से 11%</strong> के बीच होती हैं।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: ELIGIBILITY */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      कार लोन की पात्रता (Eligibility)
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>आयु:</strong> 21 से 65 वर्ष।
                      </li>
                      <li>
                        <strong>आय:</strong> वेतनभोगी कर्मचारियों के लिए न्यूनतम
                        ₹3 लाख सालाना।
                      </li>
                      <li>
                        <strong>क्रेडिट स्कोर:</strong> 750+ CIBIL स्कोर पर सबसे
                        कम ब्याज दरें मिलती हैं।
                      </li>
                      <li>
                        <strong>रोजगार:</strong> कम से कम 2 साल का कार्य अनुभव।
                      </li>
                    </ul>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: NEW VS USED */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      नई कार बनाम पुरानी कार लोन (New vs Used)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        बैंक <strong>नई कार लोन</strong> और{' '}
                        <strong>पुरानी (Used) कार लोन</strong> के लिए अलग-अलग
                        दरें प्रदान करते हैं। पुरानी कार लोन की ब्याज दरें अक्सर
                        अधिक (12%–18%) होती हैं और इसके लिए आपको ज्यादा डाउन
                        पेमेंट (Down Payment) देना पड़ सकता है।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 4: HOW CALCULATOR HELPS */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      कैलकुलेटर का उपयोग कैसे करें?
                    </h3>
                    <p className="text-slate-700">
                      यह टूल आपको अपना बजट प्लान करने में मदद करता है ताकि आप पर
                      EMI का बोझ न पड़े।
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          डाउन पेमेंट (Down Payment)
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          जितना अधिक डाउन पेमेंट करेंगे, उतनी कम EMI और ब्याज
                          देना होगा।
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          सही अवधि (Tenure)
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          4-5 साल की अवधि सबसे संतुलित मानी जाती है (न ज्यादा
                          ब्याज, न ज्यादा EMI)।
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          कुल लागत (On-Road Price)
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          इंश्योरेंस, रजिस्ट्रेशन और मेंटेनेंस का खर्चा भी
                          जोड़कर बजट बनाएं।
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 5: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      कार लोन EMI फॉर्मूला
                    </h3>
                    <p className="text-slate-700">
                      बैंक EMI की गणना के लिए निम्नलिखित सूत्र का उपयोग करते
                      हैं:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="E = P \times r \times \frac{(1 + r)^n}{(1 + r)^n - 1}" />
                    </div>

                    <div className="text-slate-700">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>P</strong> = लोन की राशि (Principal)
                        </li>
                        <li>
                          <strong>r</strong> = मासिक ब्याज दर
                        </li>
                        <li>
                          <strong>n</strong> = महीनों की संख्या (Tenure)
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
              <HindiSidebar adId="hi-car-loan-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
