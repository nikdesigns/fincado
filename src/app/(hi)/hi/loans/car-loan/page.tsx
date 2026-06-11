import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CarLoanClient from '@/app/(en)/loans/car-loan/CarLoanClient';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import FAQSchema from '@/components/FAQSchema';
import WikiText from '@/components/WikiText';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Car, ArrowRight, BookOpen, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CarLoanSchemas } from '@/components/schemas/CarLoanSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'कार लोन EMI कैलकुलेटर – नई और पुरानी कार लोन ब्याज दरें',
  description:
    'Fincado कार लोन कैलकुलेटर (Hindi): नई और पुरानी कार लोन की EMI गणना करें। SBI, HDFC, Axis की ब्याज दरें तुलना करें और पात्रता जांचें।',
  keywords: [
    'Car Loan EMI Calculator Hindi',
    'Auto Loan Calculator Hindi',
    'New Car vs Used Car Loan Hindi',
    'Car Loan Eligibility Hindi'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/loans/car-loan/',
    languages: {
      'hi-IN': 'https://fincado.com/hi/loans/car-loan/',
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
      question: 'भारत में वर्तमान कार लोन ब्याज दर क्या है?',
      answer:
        'फरवरी 2026 तक, नई कारों के लिए कार लोन ब्याज दरें 8.70% से 10.50% प्रति वर्ष तक हैं। SBI 8.85%-9.75%, HDFC 8.70%-10%, और ICICI 9%-10.50% ऑफर करते हैं। पुरानी कारों के लोन पर दरें अधिक (11%-14%) होती हैं।',
    },
    {
      id: 'faq-2',
      question: 'कार लोन के लिए कितना डाउन पेमेंट चाहिए?',
      answer:
        'अधिकांश बैंक नई कारों के लिए 10-20% डाउन पेमेंट की आवश्यकता रखते हैं (वे ऑन-रोड कीमत का 80-90% फाइनेंस करते हैं)। पुरानी कारों के लिए डाउन पेमेंट आमतौर पर 20-30% होता है। अधिक डाउन पेमेंट से EMI और कुल ब्याज कम होता है।',
    },
    {
      id: 'faq-3',
      question: 'क्या मुझे पुरानी कार के लिए लोन मिल सकता है?',
      answer:
        'हाँ, सभी प्रमुख बैंक और NBFC पुरानी कार लोन ऑफर करते हैं। लोन मैच्योरिटी के समय कार 8-10 साल से कम पुरानी होनी चाहिए। ब्याज दरें नई कार लोन से 2-3% अधिक होती हैं। अधिकतम अवधि आमतौर पर 5 साल होती है।',
    },
    {
      id: 'faq-4',
      question: 'कार लोन की अधिकतम अवधि क्या है?',
      answer:
        'नई कार लोन: 7 साल (84 महीने) तक। पुरानी कार लोन: 5 साल (60 महीने) तक। हालांकि, लंबी अवधि कुल ब्याज बढ़ाती है। अधिकांश लोग इष्टतम संतुलन के लिए 3-5 साल चुनते हैं।',
    },
    {
      id: 'faq-5',
      question: 'क्या कार लोन के लिए सह-आवेदक की आवश्यकता है?',
      answer:
        'अनिवार्य नहीं, लेकिन सह-आवेदक (पति/पत्नी/माता-पिता) जोड़ने से आय संयोजन करके आपकी लोन पात्रता बढ़ सकती है। यदि आपकी आय सीमांत है या क्रेडिट स्कोर 750 से कम है तो यह स्वीकृति की संभावना भी बढ़ाता है।',
    },
    {
      id: 'faq-6',
      question: 'क्या मैं बिना जुर्माने के अपना कार लोन प्रीपे कर सकता हूँ?',
      answer:
        'अधिकांश बैंक बिना जुर्माना शुल्क के कार लोन के प्रीपेमेंट की अनुमति देते हैं। कुछ पहले वर्ष के भीतर प्रीपेमेंट पर 2-5% जुर्माना लगा सकते हैं। प्रीपे करने से पहले विशिष्ट शर्तों के लिए अपने लोन समझौते की जांच करें।',
    },
    {
      id: 'faq-7',
      question: 'कार लोन के लिए कौन से दस्तावेज चाहिए?',
      answer:
        'आवश्यक दस्तावेज: पहचान प्रमाण (आधार, पैन), पता प्रमाण, आय प्रमाण (नौकरीपेशा के लिए 3 महीने की सैलरी स्लिप, स्वरोजगार के लिए 2 साल का ITR), बैंक स्टेटमेंट (6 महीने), कार कोटेशन/प्रोफार्मा इनवॉइस, और पासपोर्ट साइज फोटो।',
    },
    {
      id: 'faq-8',
      question: 'क्या कार लोन के साथ कार इंश्योरेंस अनिवार्य है?',
      answer:
        'हाँ, पूरे लोन अवधि के दौरान व्यापक कार बीमा अनिवार्य है। बैंक/NBFC आपको वैध बीमा बनाए रखने और उन्हें हाइपोथेकेशन होल्डर के रूप में जोड़ने की आवश्यकता होती है। नो क्लेम बोनस (NCB) लाभ लागू होते रहते हैं।',
    },
    {
      id: 'faq-9',
      question: 'क्या मैं अपना कार लोन दूसरे बैंक में ट्रांसफर कर सकता हूँ?',
      answer:
        'हाँ, आप कम ब्याज दर ऑफर करने वाले दूसरे बैंक में कार लोन बैलेंस ट्रांसफर कर सकते हैं। हालांकि, ट्रांसफर चार्ज, प्रोसेसिंग फीस की जांच करें और गणना करें कि क्या बचत ट्रांसफर लागत को उचित ठहराती है।',
    },
    {
      id: 'faq-10',
      question: 'कार लोन पात्रता की गणना कैसे की जाती है?',
      answer:
        'पात्रता निर्भर करती है: (1) मासिक आय (न्यूनतम ₹25,000), (2) क्रेडिट स्कोर (न्यूनतम 650, अधिमानतः 750+), (3) आयु (21-65 वर्ष), (4) EMI से आय अनुपात (50% से अधिक नहीं होना चाहिए), और (5) रोजगार स्थिरता (2+ वर्ष का कार्य अनुभव)।',
    }
  ];

  const introContent = autoLinkContent(`
    <p>
      <strong>कार लोन EMI कैलकुलेटर</strong> आपको कार की कीमत, डाउन पेमेंट, ब्याज दर 
      और अवधि के आधार पर अपने ऑटो लोन के लिए मासिक किस्त की गणना करने में मदद करता है। 
      भारतीय बैंक और NBFC <strong>नई कारों</strong> (कम दरें, 8.7%-10%) और 
      <strong>पुरानी कारों</strong> (अधिक दरें, 11%-14%) दोनों के लिए 7 साल तक की 
      लचीली अवधि के साथ कार लोन ऑफर करते हैं।
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>त्वरित स्वीकृति:</strong> कार लोन आमतौर पर न्यूनतम दस्तावेज के साथ 24-48 घंटे में स्वीकृत हो जाते हैं।</li>
      <li><strong>उच्च लोन राशि:</strong> बैंक ऑन-रोड कार कीमत का 90% तक फाइनेंस करते हैं (10% डाउन पेमेंट आवश्यक)।</li>
      <li><strong>लचीली अवधि:</strong> आपके बजट के अनुरूप 1-7 साल की चुकौती अवधि।</li>
      <li><strong>प्रतिस्पर्धी दरें:</strong> नई कारों के लिए 8.70% प्रति वर्ष से शुरू होने वाली ब्याज दरें।</li>
    </ul>
  `);

  const comparisonContent = autoLinkContent(`
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-3 text-left font-semibold border">कारक</th>
            <th class="p-3 text-left font-semibold border">नई कार लोन</th>
            <th class="p-3 text-left font-semibold border">पुरानी कार लोन</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">ब्याज दर</td>
            <td class="p-3 border text-emerald-700">8.70% - 10.00%</td>
            <td class="p-3 border">11.00% - 14.00%</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">अधिकतम लोन राशि</td>
            <td class="p-3 border">ऑन-रोड कीमत का 90%</td>
            <td class="p-3 border">बाजार मूल्य का 80%</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">अधिकतम अवधि</td>
            <td class="p-3 border">7 साल</td>
            <td class="p-3 border">5 साल</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">प्रोसेसिंग फीस</td>
            <td class="p-3 border">₹2,000 - ₹5,000</td>
            <td class="p-3 border">₹3,000 - ₹7,000</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">कार की आयु सीमा</td>
            <td class="p-3 border">बिल्कुल नई</td>
            <td class="p-3 border">8-10 साल तक पुरानी</td>
          </tr>
        </tbody>
      </table>
    </div>
  `);

  const updatedLabel = getCurrentMonthYearLabel();

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
          }
        ]}
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <CarLoanSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="कार लोन EMI कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/loans/car-loan" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700">
              <Car className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                कार लोन EMI कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-blue-700">
                नई और पुरानी कारों के लिए ऑटो लोन EMI कैलकुलेट करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-car-loan-top" type="leaderboard" />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      सबसे कम दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      HDFC Bank कार लोन {updatedLabel}
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8.70%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        प्रति वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      सामान्य EMI
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹10L @ 9% 5 साल के लिए
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹20,758
                      <span className="text-base font-normal text-slate-600">
                        /महीना
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-purple-700 mb-1">
                      अधिकतम लोन
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      फाइनेंस (नई कार)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      90%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        कीमत का
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <CarLoanClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-car-loan-after-calc"
                type="square"
                lazyLoad={false}
              />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-blue-50/50 border-blue-200 text-slate-600">
              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  प्रो टिप
                </strong>
                अधिक डाउन पेमेंट (20-30%) करने से आपकी मासिक EMI और भुगतान किया
                गया कुल ब्याज काफी कम हो जाता है। यह लोन स्वीकृति की संभावना भी
                बढ़ाता है।
              </AlertDescription>
            </Alert>

            {/* Bank Comparison */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    कार लोन ब्याज दरों की तुलना {updatedLabel}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-3 text-left font-semibold">
                            बैंक/NBFC
                          </th>
                          <th className="p-3 text-left font-semibold">
                            नई कार दर
                          </th>
                          <th className="p-3 text-left font-semibold">
                            पुरानी कार दर
                          </th>
                          <th className="p-3 text-left font-semibold">
                            प्रोसेसिंग फीस
                          </th>
                          <th className="p-3 text-left font-semibold">
                            अधिकतम अवधि
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">HDFC Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.70% - 10.00%
                          </td>
                          <td className="p-3">11.00% - 13.00%</td>
                          <td className="p-3">₹3,500</td>
                          <td className="p-3">7 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">SBI</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.85% - 9.75%
                          </td>
                          <td className="p-3">11.25% - 13.50%</td>
                          <td className="p-3">₹2,000</td>
                          <td className="p-3">7 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">ICICI Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            9.00% - 10.50%
                          </td>
                          <td className="p-3">11.50% - 14.00%</td>
                          <td className="p-3">₹3,000</td>
                          <td className="p-3">7 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Axis Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            9.25% - 11.50%
                          </td>
                          <td className="p-3">12.00% - 14.50%</td>
                          <td className="p-3">₹4,000</td>
                          <td className="p-3">7 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Bajaj Finserv</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            9.50% - 12.00%
                          </td>
                          <td className="p-3">12.50% - 15.00%</td>
                          <td className="p-3">₹5,000</td>
                          <td className="p-3">5 साल</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    *दरें सांकेतिक हैं और क्रेडिट स्कोर, कार मॉडल और लोन राशि के
                    आधार पर भिन्न होती हैं। अंतिम अपडेट: {updatedLabel}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #3: IN-FEED */}
            <div className="no-print my-8">
              <AdSlot id="hi-car-loan-infeed-1" type="banner" lazyLoad={true} />
            </div>

            {/* LIVE RATES TABLE */}
            <LiveRateTable type="carLoan" />

            {/* PROMO BOX */}
            <Card className="no-print my-6 border-blue-200 bg-blue-50/50 transition-colors hover:bg-blue-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-blue-900">
                    क्या आप अपनी ड्रीम कार खरीदना चाहते हैं?
                  </strong>

                  <Link
                    href="/guides/car-loan-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <span>हमारी पूर्ण कार लोन गाइड पढ़ें (2026)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* Benefits */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      भारत में कार लोन के लाभ
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* Comparison */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      नई कार लोन बनाम पुरानी कार लोन
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={comparisonContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #4: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-car-loan-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Eligibility */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      कार लोन पात्रता मानदंड
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        <strong>आयु:</strong> 21-65 वर्ष (नौकरीपेशा और
                        स्वरोजगार)
                      </li>
                      <li>
                        <strong>आय:</strong> न्यूनतम ₹25,000/महीना (नौकरीपेशा),
                        ₹4 लाख/वर्ष (स्वरोजगार)
                      </li>
                      <li>
                        <strong>क्रेडिट स्कोर:</strong> न्यूनतम 650, सर्वोत्तम
                        दरों के लिए अधिमानतः 750+
                      </li>
                      <li>
                        <strong>रोजगार:</strong> न्यूनतम 2 साल का कार्य अनुभव
                        (नौकरीपेशा), 3 साल का व्यवसाय (स्वरोजगार)
                      </li>
                      <li>
                        <strong>डाउन पेमेंट:</strong> नई कारों के लिए 10-20%,
                        पुरानी कारों के लिए 20-30%
                      </li>
                    </ul>
                  </section>

                  {/* 🎯 AD #5: AFTER ELIGIBILITY */}
                  <div className="no-print my-8">
                    <AdSlot
                      id="hi-car-loan-infeed-2"
                      type="banner"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Tips */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      सर्वोत्तम कार लोन डील पाने के टिप्स
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        अंतिम रूप देने से पहले कम से कम 3-4 बैंकों/NBFC के ऑफर
                        की तुलना करें
                      </li>
                      <li>
                        सबसे कम ब्याज दरों के लिए क्रेडिट स्कोर 750 से ऊपर बनाए
                        रखें
                      </li>
                      <li>EMI का बोझ कम करने के लिए अधिक डाउन पेमेंट करें</li>
                      <li>
                        कुल ब्याज को कम करने के लिए इष्टतम अवधि (3-5 साल) चुनें
                      </li>
                      <li>
                        विशेष ब्याज दरें ऑफर करने वाले डीलर टाई-अप की जांच करें
                      </li>
                      <li>
                        लोन समझौते पर हस्ताक्षर करने से पहले सभी शर्तों को ध्यान
                        से पढ़ें
                      </li>
                    </ul>
                  </section>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित लोन कैलकुलेटर
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/hi/emi-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                                💰
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                                  सामान्य EMI कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  किसी भी प्रकार के लोन के लिए EMI कैलकुलेट करें
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                                  <span>अभी कैलकुलेट करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/hi/loans/home-loan/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                🏠
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  होम लोन EMI कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  टैक्स लाभ के साथ होम लोन EMI कैलकुलेट करें
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                                  <span>अभी कैलकुलेट करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* 🎯 AD #6: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-car-loan-before-faq"
                type="leaderboard"
                lazyLoad={true}
              />
            </div>

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

            {/* 🎯 AD #7: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-car-loan-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #8: SIDEBAR TOP */}
              <AdSlot id="hi-car-loan-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-car-loan-sidebar" />

              {/* 🎯 AD #9: SIDEBAR BOTTOM */}
              <AdSlot
                id="hi-car-loan-sidebar-bottom"
                type="box"
                lazyLoad={true}
              />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
