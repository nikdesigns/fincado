import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CAGRClient from '@/app/cagr-calculator/CAGRClient';
import AdSlot from '@/components/AdSlot';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, ArrowRight, Info } from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'CAGR कैलकुलेटर – निवेश वृद्धि दर की गणना करें | Fincado',
  description:
    'Fincado CAGR कैलकुलेटर (Hindi): अपने निवेश की Compound Annual Growth Rate की गणना करें और जानें कि आपका पैसा कितनी तेजी से बढ़ा है।',
  keywords: [
    'CAGR Calculator Hindi',
    'Compound Annual Growth Rate Hindi',
    'Investment Return Calculator Hindi',
    'Portfolio Growth Calculator Hindi'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/cagr-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/cagr-calculator/',
    },
  },
  openGraph: {
    title: 'CAGR कैलकुलेटर – निवेश की वृद्धि दर जानें',
    description:
      'मुफ्त टूल: अपने निवेश के CAGR की गणना करें और समझें कि आपका पोर्टफोलियो कितनी तेजी से बढ़ रहा है।',
    url: 'https://fincado.com/hi/cagr-calculator/',
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

export default function HindiCAGRPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    initialInvestment: 'शुरुआती निवेश (₹)',
    finalValue: 'अंतिम मूल्य (₹)',
    investmentPeriod: 'निवेश अवधि (वर्ष)',
    cagrResult: 'CAGR (चक्रवृद्धि वार्षिक वृद्धि दर)',
    absoluteReturn: 'पूर्ण रिटर्न',
    totalGain: 'कुल धन लाभ',
    totalGainPercent: 'कुल रिटर्न %',
    saveCalculation: 'गणना सहेजें',
    shareWhatsApp: 'WhatsApp पर साझा करें',
    savedCalculations: 'आपकी सहेजी गई CAGR गणनाएं',
    clearAll: 'सभी साफ़ करें',
    years: 'वर्ष',
    investment: 'निवेश:',
    final: 'अंतिम:',
    period: 'अवधि:',
    cagr: 'CAGR:',
    gain: 'लाभ:',
    perYear: 'प्रति वर्ष',
  };

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'faq-1',
      question: 'CAGR क्या है और इसका उपयोग क्यों किया जाता है?',
      answer:
        'Compound Annual Growth Rate (CAGR) वह वार्षिक दर है जिस पर निवेश एक निश्चित अवधि में बढ़ता है, यह मानते हुए कि लाभ को पुनर्निवेश किया जाता है। CAGR अस्थिरता को सुचारू करता है और विभिन्न निवेशों की तुलना के लिए उपयोगी है क्योंकि यह लगातार वार्षिक रिटर्न दिखाता है।',
    },
    {
      id: 'faq-2',
      question: 'CAGR की गणना कैसे की जाती है?',
      answer:
        'CAGR की गणना फॉर्मूले का उपयोग करके की जाती है: CAGR = [(अंतिम मूल्य / शुरुआती निवेश) ^ (1 / वर्षों की संख्या)] - 1। उदाहरण के लिए, यदि आपने 5 वर्षों में ₹1,00,000 को ₹2,50,000 में बदल दिया, तो CAGR = [(2.5) ^ (1/5)] - 1 = लगभग 20.11% प्रति वर्ष।',
    },
    {
      id: 'faq-3',
      question: 'CAGR और पूर्ण रिटर्न में क्या अंतर है?',
      answer:
        'पूर्ण रिटर्न कुल प्रतिशत वृद्धि है, जबकि CAGR वार्षिक वृद्धि दर है। उदाहरण: 5 वर्षों में ₹1L से ₹2.5L का पूर्ण रिटर्न 150% है, लेकिन CAGR लगभग 20% प्रति वर्ष है। CAGR तुलना के लिए अधिक उपयोगी है क्योंकि यह समय कारक को शामिल करता है।',
    },
    {
      id: 'faq-4',
      question: 'भारतीय इक्विटी बाजारों के लिए अच्छा CAGR क्या है?',
      answer:
        'भारतीय इक्विटी बाजारों (Nifty 50, Sensex) ने लंबी अवधि (15-20+ वर्ष) में लगभग 10-14% CAGR दिया है। सक्रिय रूप से प्रबंधित म्यूचुअल फंड 12-15% CAGR लक्षित कर सकते हैं, जबकि fixed income लगभग 6-8% CAGR देता है। 15%+ का लगातार CAGR बहुत मजबूत प्रदर्शन माना जाता है।',
    },
    {
      id: 'faq-5',
      question: 'क्या CAGR निवेश में वास्तविक अस्थिरता दिखाता है?',
      answer:
        'नहीं। CAGR एक चिकनी, औसत वार्षिक वृद्धि दिखाता है और वास्तविक वर्ष-दर-वर्ष उतार-चढ़ाव को छुपाता है। उदाहरण के लिए, 12% CAGR वाला निवेश एक वर्ष में -20% और दूसरे में +50% हो सकता है। CAGR जोखिम का माप नहीं है—इसके लिए, मानक विचलन या maximum drawdown की जाँच करें।',
    },
    {
      id: 'faq-6',
      question: 'क्या मैं SIP रिटर्न के लिए CAGR का उपयोग कर सकता हूं?',
      answer:
        'हां, लेकिन सावधानी के साथ। SIP के लिए, पूरी अवधि में औसत रिटर्न प्राप्त करने के लिए XIRR (Extended Internal Rate of Return) बेहतर है क्योंकि यह मासिक नकदी प्रवाह को ध्यान में रखता है। CAGR एकमुश्त निवेश के लिए सबसे अच्छा है जहां एक बार में पूरी राशि निवेश की जाती है।',
    },
    {
      id: 'faq-7',
      question: 'CAGR का उपयोग करके विभिन्न निवेशों की तुलना कैसे करें?',
      answer:
        'समान समय अवधि में CAGR की तुलना करें। उदाहरण: यदि फंड A ने 10 वर्षों में 14% CAGR और फंड B ने 12% CAGR दिया, तो फंड A बेहतर प्रदर्शन करता है। हालांकि, CAGR के साथ जोखिम मेट्रिक्स (अस्थिरता, sharpe ratio) की भी जाँच करें।',
    },
    {
      id: 'faq-8',
      question: 'क्या रियल एस्टेट रिटर्न के लिए CAGR का उपयोग किया जा सकता है?',
      answer:
        'हां। रियल एस्टेट के लिए CAGR = [(बिक्री मूल्य / खरीद मूल्य) ^ (1 / वर्षों की संख्या)] - 1। भारतीय रियल एस्टेट ने ऐतिहासिक रूप से स्थान और समय के आधार पर 5-10% CAGR दिया है। किराये की आय और कर लाभ को अलग से जोड़ें।',
    },
    {
      id: 'faq-9',
      question: 'CAGR और XIRR में क्या अंतर है?',
      answer:
        'CAGR एकमुश्त निवेश के लिए है जहां एक बार में निवेश किया जाता है और होल्डिंग अवधि के अंत में बेचा जाता है। XIRR नियमित नकदी प्रवाह (SIP, dividend reinvestment) वाले निवेश के लिए है और प्रत्येक नकदी प्रवाह की तिथि को ध्यान में रखता है। म्यूचुअल फंड SIP के लिए XIRR अधिक सटीक है।',
    },
    {
      id: 'faq-10',
      question: 'क्या उच्च CAGR हमेशा बेहतर निवेश का मतलब है?',
      answer:
        'जरूरी नहीं। उच्च CAGR अक्सर उच्च जोखिम, अस्थिरता या छोटी ट्रैक रिकॉर्ड के साथ आता है। 25%+ CAGR का दावा करने वाला फंड असामान्य रूप से जोखिम भरा हो सकता है या नया हो सकता है। हमेशा CAGR को जोखिम समायोजित मेट्रिक्स (sharpe ratio, maximum drawdown) के साथ मिलाएं और कम से कम 5-7 वर्षों के प्रदर्शन की तलाश करें।',
    }
  ];

  const introContent = autoLinkContent(`
    <p>
      <strong>Compound Annual Growth Rate (CAGR)</strong> यह मापता है कि समय के साथ 
      निवेश कितनी तेजी से बढ़ा है, वार्षिक अस्थिरता को सुचारू करते हुए। CAGR निवेशकों, 
      विश्लेषकों और व्यापार मालिकों द्वारा विभिन्न समय सीमा और परिसंपत्ति वर्गों 
      में रिटर्न की तुलना करने के लिए व्यापक रूप से उपयोग किया जाता है।
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>सरल तुलना:</strong> विभिन्न निवेशों को मानकीकृत वार्षिक रिटर्न के साथ तुलना करें।</li>
      <li><strong>अस्थिरता को सुचारू करना:</strong> CAGR वार्षिक उतार-चढ़ाव को छुपाता है और औसत वृद्धि दर दिखाता है।</li>
      <li><strong>दीर्घकालिक फोकस:</strong> म्यूचुअल फंड, स्टॉक, रियल एस्टेट और व्यवसाय विकास के प्रदर्शन का मूल्यांकन करने के लिए आदर्श।</li>
      <li><strong>लक्ष्य निर्धारण:</strong> CAGR का उपयोग भविष्य के धन लक्ष्यों को प्रोजेक्ट करने के लिए किया जा सकता है (उदाहरण: मुझे 10 वर्षों में ₹1 करोड़ के लिए किस CAGR की आवश्यकता है?)।</li>
      <li><strong>पोर्टफोलियो मूल्यांकन:</strong> ट्रैक करें कि आपका पूरा निवेश पोर्टफोलियो कितनी तेजी से बढ़ रहा है और बेंचमार्क से तुलना करें।</li>
    </ul>
  `);

  const cagrVsAbsoluteContent = autoLinkContent(`
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-3 text-left font-semibold border">पैरामीटर</th>
            <th class="p-3 text-left font-semibold border">CAGR</th>
            <th class="p-3 text-left font-semibold border">पूर्ण रिटर्न</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">परिभाषा</td>
            <td class="p-3 border">वार्षिकृत वृद्धि दर</td>
            <td class="p-3 border">कुल प्रतिशत लाभ</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">समय कारक</td>
            <td class="p-3 border text-emerald-700">वर्षों की संख्या को ध्यान में रखता है</td>
            <td class="p-3 border">समय की परवाह नहीं करता</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">तुलना के लिए उपयोगिता</td>
            <td class="p-3 border text-emerald-700">उच्च – मानकीकृत वार्षिक रिटर्न</td>
            <td class="p-3 border">कम – विभिन्न समय अवधि भ्रमित करती है</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">उदाहरण (₹1L → ₹2.5L, 5 वर्ष)</td>
            <td class="p-3 border font-mono">~20% प्रति वर्ष</td>
            <td class="p-3 border font-mono">150% कुल</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">सबसे अच्छा उपयोग</td>
            <td class="p-3 border">निवेश, फंड, पोर्टफोलियो तुलना</td>
            <td class="p-3 border">सरल लाभ गणना</td>
          </tr>
        </tbody>
      </table>
    </div>
  `);

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <CalculatorSchema
        name="CAGR Calculator Hindi"
        description="Calculate Compound Annual Growth Rate for investments in Hindi."
        url="https://fincado.com/hi/cagr-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'CAGR कैलकुलेटर',
            url: 'https://fincado.com/hi/cagr-calculator/',
          }
        ]}
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="CAGR कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/cagr-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-lime-100 text-lime-700">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                CAGR कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                अपने निवेश की चक्रवृद्धि वार्षिक वृद्धि दर की गणना करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-cagr-top" type="leaderboard" />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      सामान्य इक्विटी CAGR
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      भारतीय बाजार (15-20 वर्ष)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      10–14%
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
                      उदाहरण: धन वृद्धि
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹1L @ 12% CAGR, 10 वर्ष
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹3.1L
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      अपडेट किया गया डेटा
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      मान्यताओं की अंतिम समीक्षा
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <CAGRClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-cagr-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  CAGR बनाम वास्तविक रिटर्न
                </strong>
                CAGR एक चिकनी औसत दर है और वर्ष-दर-वर्ष अस्थिरता को दर्शाता नहीं
                है। वास्तविक निवेश में महत्वपूर्ण उतार-चढ़ाव हो सकते हैं, लेकिन
                समान CAGR पर पहुंचते हैं।
              </AlertDescription>
            </Alert>

            {/* CAGR Formula Block */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    CAGR गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      CAGR की गणना निम्नलिखित फॉर्मूले का उपयोग करके की जाती है:
                    </div>

                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        CAGR = [(FV ÷ IV)<sup>1/n</sup> − 1] × 100
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">जहां:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          FV
                        </span>
                        <span>
                          = अंतिम मूल्य (Final Value) – आपके निवेश का वर्तमान
                          मूल्य
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          IV
                        </span>
                        <span>
                          = शुरुआती निवेश (Initial Value) – प्रारंभिक निवेश राशि
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>= निवेश अवधि (वर्षों में)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: CAGR गणना
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>शुरुआती निवेश (IV):</strong>
                        </div>
                        <div>₹1,00,000</div>

                        <div>
                          <strong>अंतिम मूल्य (FV):</strong>
                        </div>
                        <div>₹2,50,000</div>

                        <div>
                          <strong>निवेश अवधि (n):</strong>
                        </div>
                        <div>5 वर्ष</div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">
                          चरण 1: अनुपात की गणना करें
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          FV ÷ IV = 2,50,000 ÷ 1,00,000 = 2.5
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: n वीं जड़ लें (1/n घातांक)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          (2.5)<sup>1/5</sup> = (2.5)<sup>0.2</sup> ≈ 1.2011
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: 1 घटाएं और 100 से गुणा करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>CAGR = (1.2011 − 1) × 100</div>
                          <div>CAGR = 0.2011 × 100</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          चक्रवृद्धि वार्षिक वृद्धि दर:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ 20.11% प्रति वर्ष
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-300 space-y-2">
                        <div className="flex justify-between">
                          <span>कुल लाभ:</span>
                          <strong>₹1,50,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>पूर्ण रिटर्न:</span>
                          <strong className="text-green-700">150%</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      CAGR को समझना
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        CAGR मानता है कि निवेश हर साल स्थिर दर से बढ़ता है, भले
                        ही वास्तव में उतार-चढ़ाव हो।
                      </li>
                      <li>
                        यह विभिन्न परिसंपत्ति वर्गों और समय अवधि में रिटर्न की
                        तुलना के लिए उत्कृष्ट है।
                      </li>
                      <li>
                        उच्च CAGR बेहतर है, लेकिन हमेशा जोखिम और अस्थिरता को भी
                        ध्यान में रखें।
                      </li>
                      <li>
                        CAGR के लिए कम से कम 3-5 वर्षों का डेटा सर्वोत्तम है;
                        अल्पकालिक CAGR भ्रामक हो सकता है।
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    यह CAGR कैलकुलेटर वित्तीय विश्लेषण और निवेश तुलना में उपयोग
                    किए जाने वाले मानक फॉर्मूले का उपयोग करता है।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CAGR vs Absolute Return */}
            <section className="no-print mt-10">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    CAGR बनाम पूर्ण रिटर्न
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-slate-700 leading-relaxed">
                    <WikiText content={cagrVsAbsoluteContent} />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #3: IN-FEED */}
            <div className="no-print my-8">
              <AdSlot id="hi-cagr-infeed-1" type="banner" lazyLoad={true} />
            </div>

            {/* Promo content */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    अपने निवेश पोर्टफोलियो का विश्लेषण करें
                  </strong>
                  <Link
                    href="/guides/investment-basics/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>निवेश की मूल बातें गाइड पढ़ें</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Benefits & CAGR concepts */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      CAGR के लाभ
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #4: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-cagr-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      CAGR का उपयोग कब करें
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        म्यूचुअल फंड, स्टॉक या पोर्टफोलियो के दीर्घकालिक (3+
                        वर्ष) प्रदर्शन की तुलना करने के लिए।
                      </li>
                      <li>
                        रियल एस्टेट निवेश की वार्षिक वृद्धि दर की गणना करने के
                        लिए।
                      </li>
                      <li>
                        व्यवसाय राजस्व, लाभ या ग्राहक वृद्धि को ट्रैक करने के
                        लिए।
                      </li>
                      <li>
                        भविष्य के धन लक्ष्यों को प्रोजेक्ट करने के लिए (उदाहरण:
                        मुझे 10 वर्षों में ₹1 करोड़ के लिए किस CAGR की आवश्यकता
                        है?)।
                      </li>
                      <li>
                        बेंचमार्क इंडेक्स (Nifty 50, Sensex) के खिलाफ फंड
                        प्रदर्शन का मूल्यांकन करने के लिए।
                      </li>
                    </ul>
                  </section>

                  {/* Related calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित कैलकुलेटर
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/hi/sip-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                💰
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  SIP कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  मासिक SIP की योजना बनाएं और अपने CAGR लक्ष्यों
                                  तक पहुंचें।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                                  <span>अभी गणना करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/hi/lumpsum-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                📈
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  एकमुश्त कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  एकमुश्त निवेश की वृद्धि को CAGR के साथ
                                  प्रोजेक्ट करें।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                                  <span>अभी योजना बनाएं</span>
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

            {/* 🎯 AD #5: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-cagr-before-faq"
                type="leaderboard"
                lazyLoad={true}
              />
            </div>

            {/* FAQ */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    अक्सर पूछे जाने वाले प्रश्न
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
                        <AccordionTrigger className="text-left text-slate-900">
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

            {/* 🎯 AD #6: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-cagr-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #7: SIDEBAR TOP */}
              <AdSlot id="hi-cagr-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-cagr-sidebar" />

              {/* 🎯 AD #8: SIDEBAR BOTTOM */}
              <AdSlot id="hi-cagr-sidebar-bottom" type="box" lazyLoad={true} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
