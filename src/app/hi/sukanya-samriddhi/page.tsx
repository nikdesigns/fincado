import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SSYClient from '@/app/sukanya-samriddhi/SSYClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import AuthorBio from '@/components/AuthorBio';
import 'katex/dist/katex.min.css';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, Info, Baby, Shield, Gift } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'सुकन्या समृद्धि योजना (SSY) कैलकुलेटर 2026 - ब्याज और परिपक्वता | Fincado',
  description:
    'सुकन्या समृद्धि योजना (SSY) कैलकुलेटर हिंदी में: बेटी की 21 साल की उम्र में परिपक्वता राशि की गणना करें। 8.2% ब्याज दर, टैक्स फ्री रिटर्न, निवेश योजना।',
  keywords: [
    'Sukanya Samriddhi Yojana Hindi',
    'SSY Calculator Hindi',
    'Beti Bachao Beti Padhao',
    'सुकन्या समृद्धि योजना',
    'सुकन्या समृद्धि कैलकुलेटर',
    'बेटी बचाओ योजना',
    'SSY ब्याज दर 2026'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/sukanya-samriddhi/',
    languages: {
      'en-IN': 'https://fincado.com/sukanya-samriddhi/',
    },
  },
  openGraph: {
    title: 'सुकन्या समृद्धि योजना कैलकुलेटर 2026 – बेटी के भविष्य की योजना',
    description:
      'मुफ्त SSY कैलकुलेटर: बेटी की शिक्षा और शादी के लिए परिपक्वता राशि, टैक्स-फ्री रिटर्न और निवेश रणनीति की गणना करें।',
    url: 'https://fincado.com/hi/sukanya-samriddhi/',
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

export default function HindiSSYPage() {
  // ✅ Hindi Labels
  const hindiLabels = {
    ageWarning: 'नोट:',
    ageWarningNote:
      'SSY खाता केवल 10 वर्ष तक की लड़कियों के लिए खोला जा सकता है। सटीक गणना देखने के लिए आयु समायोजित करें।',
    ssyCalculator: 'सुकन्या समृद्धि योजना कैलकुलेटर',
    reset: 'रीसेट',
    girlAge: 'लड़की की वर्तमान आयु (वर्ष)',
    depositFrequency: 'जमा आवृत्ति',
    monthly: 'मासिक',
    yearly: 'वार्षिक',
    monthlyInvestment: 'मासिक निवेश (₹)',
    yearlyInvestment: 'वार्षिक निवेश (₹)',
    interestRate: 'ब्याज दर (% प्रति वर्ष)',
    showBreakdown: 'वर्षवार विवरण दिखाएं',
    hideBreakdown: 'वर्षवार विवरण छुपाएं',
    maturityValue: 'परिपक्वता मूल्य (कर मुक्त)',
    taxFree: 'कर मुक्त',
    maturity: 'परिपक्वता:',
    age: 'आयु:',
    totalInvestment: 'कुल निवेश',
    totalInterest: 'कुल ब्याज',
    annualInvestment: 'वार्षिक निवेश:',
    contributionNote: '15 वर्ष योगदान + 6 वर्ष केवल ब्याज',
    yearwiseGrowth: 'वर्षवार वृद्धि (पहले 5 वर्ष)',
    year: 'वर्ष',
    balance: 'शेष:',
    interest: 'ब्याज:',
    compoundingNote: '21 वर्ष की आयु में परिपक्वता तक चक्रवृद्धि जारी रहती है',
    lockInNote: 'लॉक-इन: 21 वर्ष | 18 वर्ष के बाद आंशिक निकासी | 100% कर मुक्त',
    saveCalculation: 'गणना सहेजें',
    shareWhatsApp: 'WhatsApp पर साझा करें',
    savedSSYPlans: 'आपकी सहेजी गई SSY योजनाएं',
    clearAll: 'सभी साफ़ करें',
    perYear: '/वर्ष',
  };

  // ✅ FAQ Items (Hindi) - Expanded to 10
  const ssyFaqs = [
    {
      id: 'ssy-faq-1',
      question: 'सुकन्या समृद्धि योजना क्या है?',
      answer:
        'सुकन्या समृद्धि योजना (SSY) बेटी बचाओ बेटी पढ़ाओ अभियान के तहत बेटियों के लिए सरकारी बचत योजना है। यह उच्च ब्याज दर (वर्तमान में 8.2% प्रति वर्ष), 100% टैक्स-फ्री रिटर्न प्रदान करती है और शिक्षा और शादी के खर्चों के लिए बनाई गई है।',
    },
    {
      id: 'ssy-faq-2',
      question: '2026 में SSY ब्याज दर क्या है?',
      answer:
        '2026 में, SSY ब्याज दर 8.2% प्रति वर्ष है, जो सालाना चक्रवृद्धि होती है। यह दर भारत सरकार द्वारा तिमाही संशोधित की जाती है और आधिकारिक राजपत्र में घोषित की जाती है।',
    },
    {
      id: 'ssy-faq-3',
      question: 'SSY में न्यूनतम और अधिकतम निवेश क्या है?',
      answer:
        'न्यूनतम निवेश: ₹250 प्रति वर्ष (लगभग ₹21/माह)। अधिकतम निवेश: ₹1,50,000 प्रति वित्तीय वर्ष। आप पूरे वर्ष में एकमुश्त या किस्तों में जमा कर सकते हैं।',
    },
    {
      id: 'ssy-faq-4',
      question: 'क्या मैं SSY खाता ऑनलाइन खोल सकता हूं?',
      answer:
        'नहीं, SSY खाते ऑनलाइन नहीं खोले जा सकते। आपको आवश्यक दस्तावेजों (जन्म प्रमाण पत्र, अभिभावक ID/पता प्रमाण, फोटो) के साथ डाकघर या अधिकृत बैंक शाखा में जाना होगा।',
    },
    {
      id: 'ssy-faq-5',
      question: 'SSY खाता कब परिपक्व होता है?',
      answer:
        'SSY खाता तब परिपक्व होता है जब बेटी 21 वर्ष की हो जाती है। हालांकि, शादी के लिए 18 वर्ष के बाद समयपूर्व बंद करने की अनुमति है। जमा केवल 15 वर्षों के लिए आवश्यक है, फिर शेष 6 वर्षों तक ब्याज मिलता रहता है।',
    },
    {
      id: 'ssy-faq-6',
      question: 'क्या परिपक्वता से पहले SSY निकासी की अनुमति है?',
      answer:
        'बेटी के 18 वर्ष की होने पर उच्च शिक्षा खर्चों के लिए शेष राशि का 50% तक आंशिक निकासी की अनुमति है। 18 वर्ष के बाद शादी के लिए या जीवन-घातक चिकित्सा आपात स्थिति में पूर्ण समयपूर्व बंद करने की अनुमति है।',
    },
    {
      id: 'ssy-faq-7',
      question: 'यदि मैं एक वर्ष के लिए SSY भुगतान चूक जाऊं तो क्या होगा?',
      answer:
        'यदि आप भुगतान चूक जाते हैं, तो खाता बंद नहीं होता बल्कि discontinuous हो जाता है। आप प्रति वर्ष ₹50 जुर्माना और लंबित न्यूनतम जमा का भुगतान करके इसे पुनर्जीवित कर सकते हैं। खाता discontinuous होने पर भी ब्याज मिलता रहता है।',
    },
    {
      id: 'ssy-faq-8',
      question: 'क्या NRI SSY खाता खोल सकते हैं?',
      answer:
        'नहीं, NRI (अनिवासी भारतीय) नया SSY खाता नहीं खोल सकते। हालांकि, यदि अभिभावक/बेटी निवासी थे और बाद में NRI बन गए, तो खाता बिना और जमा के परिपक्वता तक जारी रह सकता है।',
    },
    {
      id: 'ssy-faq-9',
      question: 'SSY बनाम PPF - कौन बेहतर है?',
      answer:
        'SSY उच्च ब्याज (8.2% बनाम PPF के लिए 7.1%) प्रदान करता है और 100% टैक्स-फ्री है। हालांकि, SSY केवल बेटियों के लिए 21 साल की लॉक-इन के साथ है, जबकि PPF 15 साल की लॉक-इन के साथ किसी के लिए भी है। बेटी के लिए, SSY स्पष्ट रूप से बेहतर है।',
    },
    {
      id: 'ssy-faq-10',
      question: 'SSY में 21 वर्षों के बाद मुझे कितना मिलेगा?',
      answer:
        'यह आपकी निवेश राशि और ब्याज दर पर निर्भर करता है। उदाहरण के लिए, 15 वर्षों तक 8.2% प्रति वर्ष पर ₹1.5 लाख/वर्ष निवेश करने से परिपक्वता (21 वर्ष) पर लगभग ₹65-67 लाख मिलेंगे। सटीक अनुमान के लिए ऊपर कैलकुलेटर का उपयोग करें।',
    }
  ];

  return (
    <>
      <CalculatorSchema
        name="सुकन्या समृद्धि योजना (SSY) कैलकुलेटर"
        description="बेटी की बचत योजना के लिए 100% टैक्स-फ्री रिटर्न और सरकारी गारंटी के साथ परिपक्वता मूल्य की गणना करें।"
        url="https://fincado.com/hi/sukanya-samriddhi/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'SSY कैलकुलेटर',
            url: 'https://fincado.com/hi/sukanya-samriddhi/',
          }
        ]}
      />

      <FAQSchema
        faqs={ssyFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="सुकन्या समृद्धि योजना कैलकुलेटर" />
            <LanguageToggle path="/sukanya-samriddhi" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-pink-50 to-rose-100 text-pink-700">
              <Baby className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                सुकन्या समृद्धि योजना (SSY) कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-pink-700">
                टैक्स-फ्री रिटर्न के साथ अपनी बेटी के भविष्य की योजना बनाएं
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              <strong>सुकन्या समृद्धि योजना (SSY)</strong> बेटी बचाओ बेटी पढ़ाओ
              अभियान के तहत सरकार समर्थित बचत योजना है। यह विशेष रूप से बेटियों
              की शिक्षा और शादी के खर्चों के लिए डिज़ाइन की गई है। यह योजना छोटी
              बचत योजनाओं में <strong>सबसे अधिक ब्याज दरों</strong> में से एक के
              साथ <strong>100% टैक्स-फ्री रिटर्न</strong> प्रदान करती है।
            </p>
            <p className="mt-4">
              बेटी के जन्म से लेकर 10 वर्ष की आयु तक SSY खाता खोला जा सकता है।
              जब बेटी 21 वर्ष की हो जाती है, या 18 वर्ष की आयु के बाद शादी पर
              खाता परिपक्व होता है। माता-पिता या कानूनी अभिभावक प्रति वर्ष
              न्यूनतम ₹250 (₹21/माह) से अधिकतम ₹1.5 लाख तक निवेश कर सकते हैं।
            </p>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-ssy-top" type="leaderboard" />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-pink-200 bg-linear-to-br from-pink-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-pink-700 mb-1">
                      वर्तमान ब्याज दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      सरकार द्वारा तिमाही संशोधित
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8.2%
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
                      टैक्स लाभ
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      EEE स्थिति - तीन गुना टैक्स छूट
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      100%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        टैक्स-फ्री
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      परिपक्वता अवधि
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      जब बेटी 21 वर्ष की हो जाए
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      21
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <SSYClient labels={hindiLabels} />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-ssy-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-pink-50/50 border-pink-200 text-slate-600">
              <Info className="h-4 w-4 text-pink-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  निवेश टिप
                </strong>
                चक्रवृद्धि लाभ को अधिकतम करने के लिए SSY खाता जितनी जल्दी हो सके
                खोलें (बेहतर होगा जन्म के समय)। उच्चतम रिटर्न और पूर्ण 80C कटौती
                पाने के लिए सालाना अधिकतम ₹1.5L निवेश करें।
              </AlertDescription>
            </Alert>

            {/* ✅ SSY FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    SSY गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      SSY 15 वर्षों तक जमा और परिपक्वता (21 वर्ष) तक निरंतर
                      चक्रवृद्धि के साथ चक्रवृद्धि ब्याज का उपयोग करता है।
                      परिपक्वता मूल्य की गणना इस प्रकार की जाती है:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-lg font-serif">
                          A = P × [(1 + r)<sup>n</sup> - 1] / r × (1 + r)
                          <sup>m</sup>
                        </div>
                        <div className="text-sm text-slate-600">
                          15 वर्षों तक जमा + 6 वर्षों तक केवल ब्याज अवधि के लिए
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">जहाँ:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          A
                        </span>
                        <span>
                          = परिपक्वता राशि (21 वर्ष की आयु पर कुल corpus)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= वार्षिक जमा राशि (₹250 से ₹1,50,000)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = वार्षिक ब्याज दर (वर्तमान में 8.2% = 0.082)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>= जमा अवधि (15 वर्ष)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          m
                        </span>
                        <span>
                          = अतिरिक्त केवल-ब्याज अवधि (21 वर्ष की आयु तक 6 वर्ष)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>नोट:</strong> जमा केवल 15 वर्षों के लिए अनिवार्य
                        है। इसके बाद, संचित corpus परिपक्वता तक ब्याज अर्जित
                        करता रहता है।
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: अधिकतम वार्षिक निवेश
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>वार्षिक जमा (P):</strong>
                        </div>
                        <div>₹1,50,000</div>

                        <div>
                          <strong>ब्याज दर (r):</strong>
                        </div>
                        <div>8.2% प्रति वर्ष</div>

                        <div>
                          <strong>जमा अवधि (n):</strong>
                        </div>
                        <div>15 वर्ष</div>

                        <div>
                          <strong>केवल-ब्याज (m):</strong>
                        </div>
                        <div>6 वर्ष</div>

                        <div>
                          <strong>कुल अवधि:</strong>
                        </div>
                        <div>21 वर्ष</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          चरण 1: 15 वर्षों की जमा के बाद भविष्य मूल्य की गणना
                          करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV<sub>15</sub> = 1,50,000 × [(1.082)<sup>15</sup> -
                            1] / 0.082
                          </div>
                          <div>
                            FV<sub>15</sub> = 1,50,000 × [3.271 - 1] / 0.082
                          </div>
                          <div>
                            FV<sub>15</sub> = 1,50,000 × 27.695
                          </div>
                          <div>
                            FV<sub>15</sub> ≈ ₹41,54,250
                          </div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: शेष 6 वर्षों के लिए चक्रवृद्धि (कोई जमा नहीं)
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV<sub>21</sub> = 41,54,250 × (1.082)<sup>6</sup>
                          </div>
                          <div>
                            FV<sub>21</sub> = 41,54,250 × 1.616
                          </div>
                          <div>
                            FV<sub>21</sub> ≈ ₹67,13,000
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>कुल निवेश (15 वर्ष):</span>
                            <strong className="text-slate-900">
                              ₹22,50,000
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>कुल अर्जित ब्याज:</span>
                            <strong className="text-emerald-700">
                              ₹44,63,000
                            </strong>
                          </div>
                          <div className="flex justify-between border-t pt-2 text-lg">
                            <span className="font-semibold">
                              परिपक्वता मूल्य:
                            </span>
                            <strong className="text-emerald-700">
                              ₹67,13,000
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300">
                        <p className="text-xs text-slate-600">
                          <strong>टैक्स लाभ:</strong> पूरे ₹67.13 लाख 100%
                          टैक्स-फ्री हैं! इसके अलावा, वार्षिक जमा को धारा 80C के
                          तहत ₹1.5L कटौती मिलती है।
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Investment Timeline */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      SSY निवेश समय-रेखा
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-700 min-w-16">
                          वर्ष 1-15:
                        </span>
                        <span>
                          वार्षिक जमा करें (₹250 से ₹1.5L)। ब्याज सालाना
                          चक्रवृद्धि होता है।
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-700 min-w-16">
                          वर्ष 16-21:
                        </span>
                        <span>
                          कोई जमा आवश्यक नहीं। Corpus 8.2% ब्याज अर्जित करता
                          रहता है।
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-700 min-w-16">
                          18 वर्ष की आयु:
                        </span>
                        <span>उच्च शिक्षा खर्चों के लिए 50% तक निकालें।</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-700 min-w-16">
                          21 वर्ष की आयु:
                        </span>
                        <span>
                          पूर्ण परिपक्वता - पूरी राशि टैक्स-फ्री निकालें।
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    यह कैलकुलेटर वार्षिक चक्रवृद्धि मानता है। वास्तविक ब्याज
                    दरें भारत सरकार द्वारा तिमाही संशोधित की जाती हैं। वर्तमान
                    दर: 8.2% प्रति वर्ष।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-pink-200 bg-pink-50/50 transition-colors hover:bg-pink-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                  <Gift className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-pink-900">
                    बेटी के अन्य लाभों की तलाश है?
                  </strong>
                  <Link
                    href="/hi/ppf-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-pink-700 hover:text-pink-800"
                  >
                    <span>अतिरिक्त दीर्घकालिक बचत के लिए PPF देखें</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  सुकन्या समृद्धि योजना (SSY) क्या है?
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>
                    <strong>सुकन्या समृद्धि योजना (SSY)</strong> बेटी बचाओ बेटी
                    पढ़ाओ अभियान के तहत शुरू की गई सरकार समर्थित बचत योजना है।
                    यह विशेष रूप से बेटियों की शिक्षा और शादी के खर्चों के लिए
                    डिज़ाइन की गई है। यह योजना छोटी बचत योजनाओं में{' '}
                    <strong>सबसे अधिक ब्याज दरों</strong> में से एक के साथ{' '}
                    <strong>100% टैक्स-फ्री रिटर्न</strong> प्रदान करती है।
                  </p>
                  <p>
                    बेटी के जन्म से लेकर 10 वर्ष की आयु तक SSY खाता खोला जा सकता
                    है। जब बेटी 21 वर्ष की हो जाती है, या 18 वर्ष की आयु के बाद
                    शादी पर खाता परिपक्व होता है। माता-पिता या कानूनी अभिभावक
                    प्रति वर्ष न्यूनतम ₹250 (₹21/माह) से अधिकतम ₹1.5 लाख तक
                    निवेश कर सकते हैं।
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  सुकन्या समृद्धि योजना के लाभ
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>उच्चतम ब्याज दर:</strong> वर्तमान में 8.2% प्रति
                      वर्ष (भारत सरकार द्वारा तिमाही संशोधित)
                    </li>
                    <li>
                      <strong>100% टैक्स-फ्री:</strong> योगदान (80C), अर्जित
                      ब्याज और परिपक्वता राशि - सभी टैक्स-फ्री
                    </li>
                    <li>
                      <strong>सरकारी गारंटी:</strong> सॉवरेन गारंटी शून्य जोखिम
                      और पूंजी सुरक्षा सुनिश्चित करती है
                    </li>
                    <li>
                      <strong>लचीली जमा:</strong> मासिक, त्रैमासिक, वार्षिक या
                      एकमुश्त - अपनी सुविधा चुनें
                    </li>
                    <li>
                      <strong>आंशिक निकासी:</strong> बेटी के 18 वर्ष की होने पर
                      शिक्षा खर्चों के लिए 50% तक निकालें
                    </li>
                    <li>
                      <strong>समयपूर्व बंद:</strong> 18 वर्ष की आयु के बाद बेटी
                      की शादी या चिकित्सा आपात स्थिति के मामले में अनुमति
                    </li>
                    <li>
                      <strong>राष्ट्रव्यापी स्थानांतरण:</strong> खाते को भारत भर
                      में किसी भी डाकघर से दूसरे में स्थानांतरित करें
                    </li>
                  </ul>
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="hi-ssy-mid-content"
                  type="square"
                  label="विज्ञापन"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  SSY खाते के लिए पात्रता
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>बेटी की आयु:</strong> खाता खोलने के समय 10 वर्ष से
                      कम होनी चाहिए
                    </li>
                    <li>
                      <strong>माता-पिता/अभिभावक:</strong> प्राकृतिक या कानूनी
                      अभिभावक खाता खोल सकते हैं
                    </li>
                    <li>
                      <strong>खातों की संख्या:</strong> अधिकतम 2 खाते - प्रत्येक
                      बेटी के लिए एक
                    </li>
                    <li>
                      <strong>जुड़वा/तीन बच्चे अपवाद:</strong> पहले बच्चे के बाद
                      पैदा हुए जुड़वा/तीन बच्चों के मामले में तीसरा खाता अनुमति
                    </li>
                    <li>
                      <strong>आवश्यक दस्तावेज:</strong> बेटी का जन्म प्रमाण
                      पत्र, अभिभावक की पहचान और पता प्रमाण, फोटोग्राफ
                    </li>
                    <li>
                      <strong>खोलने का स्थान:</strong> कोई भी अधिकृत डाकघर या
                      भाग लेने वाली बैंक शाखाएं
                    </li>
                  </ul>
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  SSY बनाम PPF बनाम FD - कौन सबसे अच्छा है?
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">विशेषता</TableHead>
                        <TableHead className="text-left">SSY</TableHead>
                        <TableHead className="text-left">PPF</TableHead>
                        <TableHead className="text-left">FD</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          ब्याज दर
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          8.2% प्रति वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% प्रति वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          6-7% प्रति वर्ष
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          टैक्स स्थिति
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% टैक्स-फ्री)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% टैक्स-फ्री)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ब्याज कर योग्य
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          लॉक-इन अवधि
                        </TableCell>
                        <TableCell className="text-slate-700">
                          21 वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          15 वर्ष
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          7 दिन - 10 वर्ष
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          न्यूनतम निवेश
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹250/वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹500/वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">₹1,000</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          अधिकतम निवेश
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L/वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L/वर्ष
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          कोई सीमा नहीं
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          80C कटौती
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हाँ (₹1.5L)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हाँ (₹1.5L)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          केवल 5 वर्षीय Tax Saver FD के लिए
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          आंशिक निकासी
                        </TableCell>
                        <TableCell className="text-slate-700">
                          18 वर्ष की आयु के बाद 50%
                        </TableCell>
                        <TableCell className="text-slate-700">
                          5 वर्षों के बाद
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          कभी भी (जुर्माना लागू हो सकता है)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          पात्रता
                        </TableCell>
                        <TableCell className="text-slate-700">
                          10 वर्ष तक की बेटी
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          कोई भी भारतीय नागरिक
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          कोई भी
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          जोखिम स्तर
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          शून्य (सरकारी गारंटी)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          शून्य (सरकारी गारंटी)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          बहुत कम (DICGC बीमित)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          सबसे अच्छा है
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          बेटी की शिक्षा/शादी
                        </TableCell>
                        <TableCell className="text-slate-700">
                          दीर्घकालिक बचत, सेवानिवृत्ति
                        </TableCell>
                        <TableCell className="text-slate-700">
                          अल्पकालिक, गारंटीड रिटर्न
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>विशेषज्ञ राय:</strong> बेटियों के लिए, SSY सबसे अधिक
                    ब्याज दर (8.2%), 100% टैक्स-फ्री रिटर्न और सरकारी गारंटी के
                    साथ स्पष्ट विजेता है। यह 1.1% से PPF को हराता है और पूरी तरह
                    से टैक्स-फ्री होने के साथ FDs की तुलना में बेहतर रिटर्न
                    प्रदान करता है।
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  SSY पर कराधान
                </h3>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>
                    सुकन्या समृद्धि योजना{' '}
                    <strong>EEE (Exempt-Exempt-Exempt)</strong> टैक्स स्थिति
                    प्रदान करती है, जो इसे भारत में सबसे टैक्स-कुशल निवेश
                    योजनाओं में से एक बनाती है:
                  </p>
                  <h4 className="font-semibold text-slate-900 mt-4">
                    तीन गुना टैक्स लाभ:
                  </h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>निवेश कटौती:</strong> धारा 80C के तहत प्रति वर्ष
                      ₹1.5 लाख तक
                    </li>
                    <li>
                      <strong>ब्याज छूट:</strong> वार्षिक अर्जित ब्याज पूरी तरह
                      से टैक्स-फ्री है (कोई TDS नहीं)
                    </li>
                    <li>
                      <strong>परिपक्वता टैक्स-फ्री:</strong> पूरी परिपक्वता राशि
                      आयकर से मुक्त है
                    </li>
                  </ul>
                  <p className="mt-4 font-semibold text-emerald-700">
                    उदाहरण: यदि परिपक्वता मूल्य ₹65 लाख है, तो आपको बिना किसी
                    टैक्स कटौती के पूरे ₹65 लाख मिलते हैं - FDs के विपरीत जहां
                    ब्याज पर TDS लागू होता है।
                  </p>
                </div>
              </section>

              {/* How to Open Account */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  SSY खाता कैसे खोलें
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    <strong>डाकघर या बैंक जाएं:</strong> निकटतम डाकघर या अधिकृत
                    बैंक शाखा (SBI, PNB, ICICI, HDFC, Axis, BOB, आदि) पर जाएं।
                  </li>
                  <li>
                    <strong>दस्तावेज साथ लाएं:</strong> बेटी का जन्म प्रमाण
                    पत्र, माता-पिता/अभिभावक का ID प्रमाण (आधार/PAN), पता प्रमाण
                    और प्रत्येक के 2 पासपोर्ट फोटो।
                  </li>
                  <li>
                    <strong>खाता खोलने का फॉर्म भरें:</strong> बेटी और अभिभावक
                    के विवरण के साथ SSY खाता खोलने का फॉर्म पूरा करें।
                  </li>
                  <li>
                    <strong>प्रारंभिक जमा करें:</strong> नकद, चेक, DD या ऑनलाइन
                    ट्रांसफर के माध्यम से न्यूनतम ₹250 (अधिक हो सकता है) जमा
                    करें।
                  </li>
                  <li>
                    <strong>पासबुक प्राप्त करें:</strong> खाता संख्या और पहली
                    जमा प्रविष्टि के साथ तुरंत SSY पासबुक प्राप्त करें।
                  </li>
                  <li>
                    <strong>ऑटो-डेबिट सेट करें (वैकल्पिक):</strong> सुविधा के
                    लिए स्वचालित मासिक/वार्षिक जमा के लिए बैंक खाता लिंक करें।
                  </li>
                </ol>
              </section>

              {/* Investment Strategy */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  इष्टतम SSY निवेश रणनीति
                </h3>
                <div className="text-slate-700 leading-relaxed space-y-3">
                  <p>
                    <strong>1. जल्दी खोलें:</strong> अधिकतम 21 वर्षों के
                    चक्रवृद्धि लाभ के लिए बेटी के जन्म पर खाता खोलें। जितनी
                    जल्दी आप शुरू करते हैं, परिपक्वता corpus उतनी ही अधिक होती
                    है।
                  </p>
                  <p>
                    <strong>2. अधिकतम निवेश करें:</strong> यदि संभव हो तो सालाना
                    पूरे ₹1.5 लाख जमा करें। यह टैक्स कटौती (80C) को अधिकतम करता
                    है और परिपक्वता पर ₹65-70 लाख देता है।
                  </p>
                  <p>
                    <strong>3. मासिक SIP:</strong> बेहतर कैश फ्लो प्रबंधन के लिए
                    वार्षिक एकमुश्त के बजाय ₹12,500 की मासिक ऑटो-डेबिट सेट करें।
                  </p>
                  <p>
                    <strong>4. भुगतान न चूकें:</strong> डिफॉल्ट करने पर ₹50/वर्ष
                    जुर्माना लगता है। discontinuous खाता स्थिति से बचने के लिए
                    जमा नियमित रखें।
                  </p>
                  <p>
                    <strong>5. आंशिक निकासी की योजना बनाएं:</strong> 18 वर्ष की
                    आयु में 50% निकासी का उपयोग केवल उच्च शिक्षा के लिए करें।
                    इसे छुए बिना छोड़ने से 21 तक अधिकतम चक्रवृद्धि मिलती है।
                  </p>
                  <p>
                    <strong>6. कई बेटियों पर विचार करें:</strong> यदि आपकी 2
                    बेटियां हैं, तो दोनों के लिए खाते खोलें और पूर्ण 80C लाभ के
                    लिए प्रत्येक में ₹75,000 (कुल ₹1.5L) निवेश करें।
                  </p>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  इस SSY कैलकुलेटर का उपयोग कैसे करें
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>अपनी बेटी की वर्तमान आयु (0-10 वर्ष) दर्ज करें।</li>
                  <li>जमा आवृत्ति चुनें: मासिक या वार्षिक।</li>
                  <li>
                    मासिक निवेश (₹250-₹12,500) या वार्षिक (₹1,000-₹1,50,000)
                    दर्ज करें।
                  </li>
                  <li>
                    वर्तमान ब्याज दर सेट करें (डिफ़ॉल्ट 8.2% - यदि सरकार दर
                    संशोधित करती है तो अपडेट करें)।
                  </li>
                  <li>जब बेटी 21 वर्ष की हो जाए तो परिपक्वता मूल्य देखें।</li>
                  <li>15 वर्षों के लिए कुल निवेश और अर्जित ब्याज जांचें।</li>
                  <li>
                    पहले 5 वर्षों में वृद्धि देखने के लिए{' '}
                    <strong>&quot;वर्षवार विवरण&quot;</strong> सक्षम करें।
                  </li>
                  <li>गणना सहेजें या संदर्भ के लिए WhatsApp पर साझा करें।</li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित बचत कैलकुलेटर
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/hi/ppf-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                            🏦
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                              PPF कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              टैक्स-फ्री ब्याज के साथ पब्लिक प्रोविडेंट फंड
                              रिटर्न की गणना करें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                              <span>अभी आज़माएं</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/hi/fd-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              FD कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              फिक्स्ड डिपॉज़िट परिपक्वता मूल्य और अर्जित ब्याज
                              की गणना करें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>गणना करें</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>
            </article>

            {/* AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="hi-ssy-before-faq" type="leaderboard" lazyLoad />
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
                    defaultValue={ssyFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {ssyFaqs.map((faq) => (
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

            {/* AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-ssy-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-ssy-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-ssy-sidebar-mid" />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-ssy-sidebar-bottom" type="box" lazyLoad />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
