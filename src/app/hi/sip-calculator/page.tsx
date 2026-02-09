import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SIPClient from '@/app/sip-calculator/SIPClient';
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
import { BarChart3, ArrowRight, TrendingUp, Info } from 'lucide-react';
import { SIPSchemas } from '@/components/schemas/SIPSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

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

export default function HindiSIPPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    enableStepUp: 'स्टेप-अप SIP सक्षम करें (वार्षिक रूप से निवेश बढ़ाएं)',
    stepUpBoost: 'वार्षिक वृद्धि के साथ अपने कॉर्पस को बढ़ावा दें',
    monthlySIP: 'मासिक SIP राशि (₹)',
    investmentPeriod: 'निवेश अवधि (वर्ष)',
    expectedReturn: 'अपेक्षित वार्षिक रिटर्न (%)',
    annualSIPIncrease: 'वार्षिक SIP वृद्धि (स्टेप-अप %)',
    noIncrease: '0% (कोई वृद्धि नहीं)',
    perYear: '% प्रति वर्ष',
    stepUpNote: 'आपकी SIP हर साल बढ़ेगी',
    starting: 'शुरुआत',
    ending: 'अंत',
    standardSIP: 'मानक SIP',
    stepUpSIP: 'स्टेप-अप SIP',
    maturityAmount: 'परिपक्वता राशि',
    totalInvested: 'कुल निवेशित राशि',
    wealthGain: 'धन लाभ (लाभ)',
    returnsDisclaimer:
      'मासिक दर में परिवर्तित स्थिर वार्षिक रिटर्न मानता है। वास्तविक म्यूचुअल फंड रिटर्न भिन्न होंगे।',
    stepUpBenefits: 'स्टेप-अप SIP लाभ',
    advantageOverStandard: 'मानक SIP की तुलना में लाभ',
    extraWealthGained: 'अतिरिक्त धन प्राप्त',
    extraInvestment: 'अतिरिक्त निवेश किया गया',
    netBenefit: 'शुद्ध लाभ:',
    netBenefitText: 'अतिरिक्त निवेश करके',
    compared: 'मानक SIP की तुलना में!',
    smartTip: 'स्मार्ट टिप',
    smartTipText:
      'स्टेप-अप SIP तब सही है जब आप आय वृद्धि की उम्मीद करते हैं (वेतन वृद्धि, व्यापार वृद्धि)। एक',
    saveCalculation: 'गणना सहेजें',
    shareWhatsApp: 'WhatsApp पर शेयर करें',
    showStepUp: 'स्टेप-अप SIP दिखाएं',
    hideStepUp: 'स्टेप-अप SIP छुपाएं',
    savedSIPPlans: 'आपकी सहेजी गई SIP योजनाएं',
    clearAll: 'सभी हटाएं',
    month: '/ महीना',
    forYears: 'के लिए',
    stepUp: 'स्टेप-अप',
    invested: 'निवेश:',
    maturity: 'परिपक्वता:',
    gain: 'लाभ:',
  };

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'faq-1',
      question: 'SIP क्या है और यह कैसे काम करता है?',
      answer:
        'Systematic Investment Plan (SIP) म्यूचुअल फंड में नियमित रूप से (मासिक/तिमाही) एक निश्चित राशि निवेश करने की एक विधि है। प्रत्येक किस्त प्रचलित NAV पर यूनिट खरीदती है। समय के साथ, SIP धन निर्माण के लिए Rupee Cost Averaging और Compounding का लाभ उठाता है।',
    },
    {
      id: 'faq-2',
      question: 'मुझे हर महीने SIP में कितना निवेश करना चाहिए?',
      answer:
        'यह आपकी लक्ष्य राशि, समय सीमा और अपेक्षित रिटर्न पर निर्भर करता है। एक सामान्य नियम के रूप में, SIP कैलकुलेटर का उपयोग अपनी लक्ष्य राशि, समय सीमा और अनुमानित रिटर्न (इक्विटी फंड के लिए 10-14%) के साथ करें और आवश्यक मासिक SIP की गणना करें।',
    },
    {
      id: 'faq-3',
      question:
        'भारत में इक्विटी SIP के लिए मुझे किस रिटर्न की अपेक्षा करनी चाहिए?',
      answer:
        'ऐतिहासिक रूप से, भारतीय इक्विटी बाजारों ने लंबी अवधि में लगभग 12-15% वार्षिक रिटर्न दिया है। योजना के लिए, विविधीकृत इक्विटी म्यूचुअल फंड के लिए 10-12% और हाइब्रिड फंड के लिए 7-9% मानें। हमेशा रिटर्न को अधिक आंकने के बजाय रूढ़िवादी रहें।',
    },
    {
      id: 'faq-4',
      question: 'क्या SIP एकमुश्त निवेश से बेहतर है?',
      answer:
        'SIP नौकरीपेशा निवेशकों और अस्थिर बाजारों के लिए बेहतर है क्योंकि यह खरीद मूल्य को औसत करता है और समय जोखिम को कम करता है। यदि आप लंबे बुल मार्केट की शुरुआत में एक बड़ी राशि निवेश करते हैं तो एकमुश्त अधिक रिटर्न दे सकता है, लेकिन इसमें अधिक समय जोखिम होता है।',
    },
    {
      id: 'faq-5',
      question: 'क्या मैं बाद में अपनी SIP राशि बढ़ा या घटा सकता हूं?',
      answer:
        'हां। आप SIP बढ़ा सकते हैं (Top-up SIP/Step-up SIP) या जैसे-जैसे आपकी आय बढ़ती है, अतिरिक्त SIP शुरू कर सकते हैं। आप जरूरत पड़ने पर SIP को रोक या बंद भी कर सकते हैं। हर साल SIP को 5-10% बढ़ाने से आपका अंतिम कोष काफी बढ़ जाता है।',
    },
    {
      id: 'faq-6',
      question: 'क्या SIP अल्पकालिक लक्ष्यों (1-3 वर्ष) के लिए सुरक्षित है?',
      answer:
        'नहीं। इक्विटी SIP कम से कम 5-7 साल दूर के लक्ष्यों के लिए उपयुक्त हैं। अल्पकालिक लक्ष्यों (1-3 वर्ष) के लिए, डेट फंड, लिक्विड फंड या आवर्ती जमा का उपयोग करें जहां अस्थिरता कम होती है।',
    },
    {
      id: 'faq-7',
      question: 'क्या SIP रिटर्न की गारंटी है?',
      answer:
        'नहीं। SIP बाजार-लिंक्ड हैं और रिटर्न की गारंटी नहीं है। SIP कैलकुलेटर चित्रण के लिए एक स्थिर रिटर्न मानता है, लेकिन वास्तविक रिटर्न बाजार प्रदर्शन और फंड चयन के आधार पर भिन्न होगा।',
    },
    {
      id: 'faq-8',
      question: 'क्या मैं इंडेक्स फंड में SIP कर सकता हूं?',
      answer:
        'हां। इंडेक्स फंड (जैसे Nifty 50, Nifty Next 50) में SIP बाजार में भाग लेने का एक लोकप्रिय कम लागत वाला तरीका है। लंबी अवधि में, ब्रॉड-मार्केट इंडेक्स SIP ने ऐतिहासिक रूप से कम व्यय अनुपात के साथ प्रतिस्पर्धी रिटर्न दिया है।',
    },
    {
      id: 'faq-9',
      question: 'भारत में SIP पर टैक्स कैसे लगता है?',
      answer:
        'प्रत्येक SIP किस्त को कर उद्देश्यों के लिए एक अलग निवेश के रूप में माना जाता है। इक्विटी फंड के लिए, 1 साल के बाद लाभ दीर्घकालिक है (प्रति वर्ष ₹1 लाख से अधिक पर 10% LTCG), और 1 साल से पहले अल्पकालिक है (15% STCG)। डेट फंड के लिए, कराधान आपके स्लैब पर निर्भर करता है।',
    },
    {
      id: 'faq-10',
      question: 'क्या मैं विभिन्न लक्ष्यों के लिए कई SIP चला सकता हूं?',
      answer:
        'हां, और यह अनुशंसित है। आप रिटायरमेंट, बाल शिक्षा और घर के डाउन पेमेंट जैसे विभिन्न लक्ष्यों के लिए अलग SIP/फंड बना सकते हैं। इससे ट्रैक करना, पुनर्संतुलन करना और प्रत्येक लक्ष्य तक पहुंचने पर निकालना आसान हो जाता है।',
    },
  ];

  const introContent = autoLinkContent(`
    <p>
      <strong>Systematic Investment Plan (SIP)</strong> आपको एकमुश्त निवेश करने के 
      बजाय म्यूचुअल फंड में नियमित रूप से एक निश्चित राशि निवेश करने की अनुमति देता है। 
      SIP <strong>Rupee Cost Averaging</strong> और <strong>Compounding की शक्ति</strong> 
      से लाभान्वित होते हैं, जो उन्हें रिटायरमेंट, बच्चों की शिक्षा और धन सृजन जैसे 
      दीर्घकालिक लक्ष्यों के लिए आदर्श बनाता है।
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>अनुशासित निवेश:</strong> बाजार समय का अनुमान लगाए बिना हर महीने एक निश्चित राशि निवेश करें।</li>
      <li><strong>Rupee Cost Averaging:</strong> जब बाजार नीचे होते हैं तो आप अधिक यूनिट खरीदते हैं और जब बाजार ऊपर होते हैं तो कम, खरीद मूल्य को औसत करते हुए।</li>
      <li><strong>कंपाउंडिंग की शक्ति:</strong> लंबी अवधि (10-20 वर्ष) के लिए निवेशित रहने से आपका पैसा तेजी से बढ़ता है।</li>
      <li><strong>लचीला और सुविधाजनक:</strong> मात्र ₹500 से SIP शुरू करें और कभी भी बढ़ाएं/घटाएं।</li>
      <li><strong>लक्ष्य-आधारित योजना:</strong> घर खरीद, बच्चों की शिक्षा या जल्दी रिटायरमेंट जैसे विशिष्ट वित्तीय लक्ष्यों के लिए SIP को मैप करें।</li>
    </ul>
  `);

  const sipVsLumpsumContent = autoLinkContent(`
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-3 text-left font-semibold border">पैरामीटर</th>
            <th class="p-3 text-left font-semibold border">SIP (व्यवस्थित निवेश)</th>
            <th class="p-3 text-left font-semibold border">एकमुश्त निवेश</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">सर्वोत्तम के लिए</td>
            <td class="p-3 border">मासिक आय वाले नौकरीपेशा निवेशक</td>
            <td class="p-3 border">बड़े निष्क्रिय कोष वाले निवेशक</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">बाजार समय जोखिम</td>
            <td class="p-3 border text-emerald-700">कम – समय के साथ औसत लागत</td>
            <td class="p-3 border">उच्च – पूरी राशि एक प्रवेश बिंदु पर उजागर</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">अस्थिरता अनुभव</td>
            <td class="p-3 border">सुचारू, क्रमिक निवेश</td>
            <td class="p-3 border">अल्पावधि में अधिक अस्थिर पोर्टफोलियो मूल्य</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">मजबूत बुल मार्केट में रिटर्न</td>
            <td class="p-3 border">एकमुश्त से थोड़ा कम</td>
            <td class="p-3 border text-emerald-700">जल्दी निवेश किए जाने पर अधिक</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">व्यवहारिक लाभ</td>
            <td class="p-3 border">अनुशासन बनाता है और भावनात्मक निर्णयों से बचाता है</td>
            <td class="p-3 border">अस्थिरता के माध्यम से निवेशित रहने के लिए धैर्य की आवश्यकता</td>
          </tr>
        </tbody>
      </table>
    </div>
  `);

  const updatedLabel = getCurrentMonthYearLabel();

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

      <SIPSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="SIP कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/sip-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                SIP कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-indigo-700">
                दीर्घकालिक धन सृजन के लिए म्यूचुअल फंड SIP की योजना बनाएं
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-sip-top" type="leaderboard" />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-indigo-200 bg-linear-to-br from-indigo-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-indigo-700 mb-1">
                      सामान्य रिटर्न (इक्विटी SIP)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      दीर्घकालिक औसत (10+ वर्ष)
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
                      धन सृजन
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹10k/माह @ 12% 20 वर्षों के लिए
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹95L+
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
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
            <SIPClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-sip-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-indigo-50/50 border-indigo-200 text-slate-600">
              <Info className="h-4 w-4 text-indigo-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  दीर्घकालिक मानसिकता महत्वपूर्ण है
                </strong>
                SIP तब सर्वोत्तम काम करते हैं जब आप बाजार के उतार-चढ़ाव के
                माध्यम से निवेशित रहते हैं। बाजार गिरावट के दौरान SIP बंद करने
                से बचें – वे अवधि वास्तव में सस्ते में अधिक यूनिट खरीदती हैं।
              </AlertDescription>
            </Alert>

            {/* SIP Formula Block */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    SIP रिटर्न गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      SIP रिटर्न की गणना वार्षिकी के भविष्य मूल्य फॉर्मूले का
                      उपयोग करके की जाती है:
                    </div>

                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        FV = P × &#123;[(1 + r)<sup>n</sup> − 1] ÷ r&#125; × (1
                        + r)
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
                        <span>= भविष्य मूल्य / आपके SIP की परिपक्वता राशि</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= मासिक SIP राशि (₹ में)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = मासिक रिटर्न दर = वार्षिक रिटर्न ÷ 12 ÷ 100
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>= कुल SIP किस्तों की संख्या (वर्ष × 12)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: SIP वृद्धि गणना
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>मासिक SIP (P):</strong>
                        </div>
                        <div>₹10,000</div>

                        <div>
                          <strong>अपेक्षित वार्षिक रिटर्न:</strong>
                        </div>
                        <div>12% प्रति वर्ष</div>

                        <div>
                          <strong>निवेश अवधि:</strong>
                        </div>
                        <div>10 वर्ष (120 महीने)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          चरण 1: मासिक रिटर्न दर (r)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 12 ÷ (12 × 100) = 12 ÷ 1200 = 0.01
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: (1 + r)<sup>n</sup>
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          (1 + 0.01)<sup>120</sup> ≈ 3.300
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: SIP फॉर्मूला लागू करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV = 10,000 × &#123;[(1.01)<sup>120</sup> − 1] ÷
                            0.01&#125; × 1.01
                          </div>
                          <div>
                            FV = 10,000 × &#123;(3.300 − 1) ÷ 0.01&#125; × 1.01
                          </div>
                          <div>FV = 10,000 × (2.300 ÷ 0.01) × 1.01</div>
                          <div>FV = 10,000 × 230 × 1.01</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          अनुमानित परिपक्वता मूल्य:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹23,23,000
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>कुल निवेशित राशि:</span>
                          <strong>₹12,00,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>कुल रिटर्न (लाभ):</span>
                          <strong className="text-green-700">
                            ≈ ₹11,23,000
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      SIP कंपाउंडिंग को समझना
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        प्रत्येक मासिक SIP किस्त कार्यकाल के अंत तक अनुमानित
                        रिटर्न दर पर बढ़ती है।
                      </li>
                      <li>
                        पहले की SIP अधिक समय तक निवेशित रहती हैं, इसलिए वे अंतिम
                        कोष में अधिक योगदान करती हैं।
                      </li>
                      <li>
                        रिटर्न दर या कार्यकाल में छोटी वृद्धि परिपक्वता राशि को
                        नाटकीय रूप से बढ़ा सकती है।
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    यह SIP कैलकुलेटर प्रमुख भारतीय म्यूचुअल फंड प्लेटफॉर्म
                    द्वारा अनुसरण किए जाने वाले मानक वार्षिकी-आधारित फॉर्मूले का
                    उपयोग करता है।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* SIP vs Lumpsum */}
            <section className="no-print mt-10">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    SIP बनाम एकमुश्त निवेश
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-slate-700 leading-relaxed">
                    <WikiText content={sipVsLumpsumContent} />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #3: IN-FEED */}
            <div className="no-print my-8">
              <AdSlot id="hi-sip-infeed-1" type="banner" lazyLoad={true} />
            </div>

            {/* Promo content */}
            <Card className="no-print my-6 border-indigo-200 bg-indigo-50/50 transition-colors hover:bg-indigo-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-indigo-900">
                    ₹1 करोड़ का कोष बनाना चाहते हैं?
                  </strong>
                  <Link
                    href="/guides/sip-investment-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-indigo-700 hover:text-indigo-800"
                  >
                    <span>हमारी पूर्ण SIP निवेश गाइड पढ़ें (2026)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Benefits & SIP concepts */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      SIP निवेश के लाभ
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #4: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-sip-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      इस SIP कैलकुलेटर का प्रभावी ढंग से उपयोग कैसे करें
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        यथार्थवादी रिटर्न मान्यता के साथ शुरू करें (इक्विटी फंड
                        के लिए 10-12%, हाइब्रिड या डेट के लिए कम)।
                      </li>
                      <li>
                        कंपाउंडिंग के प्रभाव को देखने के लिए विभिन्न कार्यकाल
                        (10, 15, 20 वर्ष) आजमाएं।
                      </li>
                      <li>
                        वार्षिक SIP वृद्धि को मॉडल करने के लिए{' '}
                        <strong>Step-up SIP</strong> विकल्प का उपयोग करें।
                      </li>
                      <li>
                        अनावश्यक निकासी से बचने के लिए प्रत्येक SIP को एक स्पष्ट
                        लक्ष्य और समयरेखा के साथ मैप करें।
                      </li>
                      <li>
                        वर्ष में एक बार अपने SIP की समीक्षा करें और जैसे-जैसे आप
                        अपने लक्ष्य के करीब पहुंचते हैं, इक्विटी और डेट के बीच
                        पुनर्संतुलन करें।
                      </li>
                    </ul>
                  </section>

                  {/* Related calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित कैलकुलेटर
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/hi/emi-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                💰
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  EMI कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  पूर्ण योजना के लिए अपने SIP को लोन EMI के साथ
                                  संतुलित करें।
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

                      <Link href="/hi/retirement-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                                🧓
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                                  रिटायरमेंट कोष कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  जल्दी रिटायरमेंट की योजना बनाने के लिए SIP और
                                  एकमुश्त को मिलाएं।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
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
                id="hi-sip-before-faq"
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
              <AdSlot id="hi-sip-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #7: SIDEBAR TOP */}
              <AdSlot id="hi-sip-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-sip-sidebar" />

              {/* 🎯 AD #8: SIDEBAR BOTTOM */}
              <AdSlot id="hi-sip-sidebar-bottom" type="box" lazyLoad={true} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
