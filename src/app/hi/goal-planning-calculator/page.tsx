import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GoalPlanningClient from '@/app/goal-planning-calculator/GoalPlanningClient';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
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
import { Target, ArrowRight, Info } from 'lucide-react';
import { GoalPlanningSchemas } from '@/components/schemas/GoalPlanningSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'गोल प्लानिंग कैलकुलेटर – वित्तीय लक्ष्य योजना | Fincado',
  description:
    'Fincado गोल प्लानिंग कैलकुलेटर (Hindi): रिटायरमेंट, शिक्षा, घर खरीद के लिए मासिक SIP या एकमुश्त निवेश की गणना करें। मुद्रास्फीति समायोजन के साथ।',
  keywords: [
    'Goal Planning Calculator Hindi',
    'Financial Goal Calculator Hindi',
    'Retirement Planning Hindi',
    'Education Goal Calculator Hindi',
    'House Purchase Calculator Hindi'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/goal-planning-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/goal-planning-calculator/',
    },
  },
  openGraph: {
    title: 'गोल प्लानिंग कैलकुलेटर – अपने वित्तीय लक्ष्यों की योजना बनाएं',
    description:
      'मुफ्त टूल: जानें कि अपने वित्तीय लक्ष्यों को प्राप्त करने के लिए हर महीने या एकमुश्त कितना निवेश करना है।',
    url: 'https://fincado.com/hi/goal-planning-calculator/',
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

export default function HindiGoalPlanningPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    goalName: 'लक्ष्य का नाम',
    currentValue: 'लक्ष्य राशि (आज का मूल्य) ₹',
    yearsToGoal: 'लक्ष्य प्राप्त करने का समय (वर्ष)',
    inflationRate: 'मुद्रास्फीति दर (%)',
    expectedReturn: 'अपेक्षित वार्षिक रिटर्न (%)',
    existingCorpus: 'इस लक्ष्य के लिए मौजूदा बचत ₹',
    optional: 'वैकल्पिक',
    futureGoalValue: 'मुद्रास्फीति-समायोजित लक्ष्य राशि',
    existingCorpusGrowth: 'मौजूदा बचत की वृद्धि',
    gapToFill: 'निवेश के माध्यम से भरने के लिए अंतर',
    requiredMonthlySIP: 'आवश्यक मासिक SIP',
    orLumpSumToday: 'या आज एकमुश्त निवेश',
    totalSIPInvestment: 'समय के साथ कुल SIP निवेश',
    finalMaturity: 'अंतिम परिपक्वता (SIP + मौजूदा वृद्धि)',
    wealthGain: 'धन लाभ (रिटर्न)',
    inflationNote:
      'आपकी लक्ष्य राशि मुद्रास्फीति के लिए समायोजित है। यह वास्तविक राशि है जो आपको अपनी लक्ष्य तिथि तक जमा करने की आवश्यकता है।',
    planningInsights: 'योजना अंतर्दृष्टि',
    startEarly: 'जल्दी शुरुआत का लाभ',
    startEarlyText:
      '5 साल पहले शुरू करने से लंबी कंपाउंडिंग अवधि के कारण आपकी आवश्यक मासिक SIP 40-50% कम हो सकती है।',
    existingHelps: 'मौजूदा बचत मायने रखती है',
    existingHelpsText:
      'आज निवेश किए गए ₹1-2 लाख भी आपके मासिक बोझ को काफी कम कर सकते हैं। आपकी मौजूदा बचत समान रिटर्न दर पर बढ़ती है।',
    saveGoal: 'लक्ष्य सहेजें',
    shareWhatsApp: 'WhatsApp पर साझा करें',
    savedGoals: 'आपके सहेजे गए लक्ष्य',
    clearAll: 'सभी साफ़ करें',
    goalType: 'लक्ष्य प्रकार',
    future: 'भविष्य:',
    required: 'आवश्यक:',
    per: 'प्रति माह',
    growth: 'वृद्धि:',
    gap: 'अंतर:',
    monthlyInvestment: 'मासिक निवेश',
    lumpSumInvestment: 'एकमुश्त निवेश',
    selectGoalType: 'लक्ष्य प्रकार चुनें (वैकल्पिक)',
    customGoal: 'कस्टम लक्ष्य',
  };

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'faq-1',
      question: 'लक्ष्य-आधारित वित्तीय योजना क्या है?',
      answer:
        'लक्ष्य-आधारित योजना एक निवेश दृष्टिकोण है जहां आप पहले विशिष्ट वित्तीय लक्ष्यों (जैसे रिटायरमेंट, शिक्षा, घर) की पहचान करते हैं, फिर गणना करते हैं कि उन्हें प्राप्त करने के लिए मासिक या एकमुश्त कितना निवेश करना है। यह आपको अनुशासित रहने और वास्तविक जीवन के उद्देश्यों की ओर प्रगति को ट्रैक करने में मदद करता है।',
    },
    {
      id: 'faq-2',
      question: 'मुद्रास्फीति मेरे वित्तीय लक्ष्यों को कैसे प्रभावित करती है?',
      answer:
        'मुद्रास्फीति समय के साथ क्रय शक्ति को कम करती है। यदि आपको आज अपने बच्चे की शिक्षा के लिए ₹50 लाख की आवश्यकता है, तो 6% शिक्षा मुद्रास्फीति मानते हुए, 10 साल बाद आपको ₹89.5 लाख की आवश्यकता होगी। गोल प्लानिंग कैलकुलेटर स्वचालित रूप से मुद्रास्फीति के लिए आपकी लक्ष्य राशि को समायोजित करते हैं।',
    },
    {
      id: 'faq-3',
      question:
        'क्या मुझे गोल प्लानिंग के लिए SIP या एकमुश्त का उपयोग करना चाहिए?',
      answer:
        'यह आपके नकदी प्रवाह पर निर्भर करता है। यदि आपके पास नियमित आय है, तो SIP बेहतर है क्योंकि यह अनुशासन बनाता है और औसत लागत करता है। यदि आपके पास अचानक धन (बोनस, विरासत) है, तो तेजी से लक्ष्य प्राप्ति के लिए एकमुश्त को SIP के साथ मिलाएं। दोनों दृष्टिकोणों की तुलना करने के लिए कैलकुलेटर का उपयोग करें।',
    },
    {
      id: 'faq-4',
      question: 'क्या मैं एक साथ कई लक्ष्यों की योजना बना सकता हूं?',
      answer:
        'हां! प्रत्येक लक्ष्य के लिए अलग निवेश बकेट बनाने की सिफारिश की जाती है। उदाहरण के लिए, रिटायरमेंट, बाल शिक्षा और घर के लिए अलग से कैलकुलेटर चलाएं, फिर मासिक SIP को जोड़ें। यह फंड को मिलाने से रोकता है और अनुशासित निकासी में मदद करता है।',
    },
    {
      id: 'faq-5',
      question:
        'विभिन्न लक्ष्यों के लिए मुझे किस रिटर्न की अपेक्षा करनी चाहिए?',
      answer:
        '10+ साल दूर के लक्ष्यों के लिए, इक्विटी फंड के लिए 10-12% मानें। 5-10 साल के लक्ष्यों के लिए, 8-10% (संतुलित/हाइब्रिड फंड) का उपयोग करें। अल्पकालिक लक्ष्यों (1-5 वर्ष) के लिए, 6-8% (डेट फंड, FD) मानें। हमेशा रिटर्न अनुमानों के साथ रूढ़िवादी रहें।',
    },
    {
      id: 'faq-6',
      question:
        'क्या होगा अगर मेरे पास पहले से ही अपने लक्ष्य के लिए कुछ बचत है?',
      answer:
        'कैलकुलेटर में मौजूदा कोष फ़ील्ड का उपयोग करें। यह गणना करता है कि आपकी लक्ष्य तिथि तक यह राशि कितनी बढ़ेगी और तदनुसार आपकी आवश्यक मासिक SIP या अतिरिक्त एकमुश्त को कम करता है। मौजूदा बचत मासिक बोझ को काफी कम करती है।',
    },
    {
      id: 'faq-7',
      question: 'मुझे कितनी बार अपनी लक्ष्य योजना की समीक्षा करनी चाहिए?',
      answer:
        'साल में कम से कम एक बार या जब कोई बड़ा जीवन परिवर्तन होता है (वेतन वृद्धि, नया खर्च, शादी) तो समीक्षा करें। अपनी SIP राशि को समायोजित करें, इक्विटी और डेट के बीच पुनर्संतुलन करें, और हाल के रुझानों के आधार पर मुद्रास्फीति अनुमान अपडेट करें।',
    },
    {
      id: 'faq-8',
      question: 'क्या होगा अगर मैं अपनी SIP किस्तें चूक जाता हूं?',
      answer:
        'SIP किस्तें चूकने से लक्ष्य प्राप्ति में देरी होती है। यदि आपको रोकना है, तो जितनी जल्दी हो सके पुनः आरंभ करें या बाद में SIP राशि बढ़ाएं। कैलकुलेटर दिखाता है कि कैसे छोटी देरी भी आपकी लक्ष्य तिथि को आगे धकेल देती है या अधिक मासिक योगदान की आवश्यकता होती है।',
    },
    {
      id: 'faq-9',
      question: 'क्या गोल प्लानिंग अल्पकालिक लक्ष्यों के लिए उपयुक्त है?',
      answer:
        'हां, लेकिन कम जोखिम के साथ। 3 साल से कम के लक्ष्यों के लिए, इक्विटी-भारी निवेश से बचें। डेट म्यूचुअल फंड, आवर्ती जमा या सावधि जमा का उपयोग करें। गोल प्लानिंग किसी भी समयरेखा के लिए काम करती है, लेकिन परिसंपत्ति आवंटन क्षितिज के आधार पर भिन्न होता है।',
    },
    {
      id: 'faq-10',
      question: 'क्या मैं रिटायरमेंट के लिए गोल प्लानिंग का उपयोग कर सकता हूं?',
      answer:
        'बिल्कुल! रिटायरमेंट सबसे महत्वपूर्ण वित्तीय लक्ष्य है। अपने वांछित रिटायरमेंट कोष (मुद्रास्फीति और जीवन प्रत्याशा के लिए लेखांकन), रिटायरमेंट तक के वर्षों और अपेक्षित रिटर्न को इनपुट करें। कैलकुलेटर दिखाता है कि आप ट्रैक पर हैं या हर महीने अधिक बचत करने की आवश्यकता है।',
    }
  ];

  const introContent = autoLinkContent(`
    <p>
      एक <strong>गोल प्लानिंग कैलकुलेटर</strong> आपको यह निर्धारित करने में मदद करता है 
      कि <strong>रिटायरमेंट</strong>, <strong>बच्चों की शिक्षा</strong>, <strong>घर खरीदना</strong>, 
      या किसी भी बड़े खर्च जैसे विशिष्ट वित्तीय लक्ष्यों को प्राप्त करने के लिए आपको आज 
      या मासिक कितना निवेश करने की आवश्यकता है। यह आपको यथार्थवादी लक्ष्य देने के लिए 
      <strong>मुद्रास्फीति</strong> के लिए जिम्मेदार है और दिखाता है कि SIP, एकमुश्त, 
      या संयोजन सबसे अच्छा काम करता है या नहीं।
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>स्पष्ट रोडमैप:</strong> अपने लक्ष्यों तक पहुंचने के लिए हर महीने कितनी बचत करनी है, यह जानें।</li>
      <li><strong>मुद्रास्फीति समायोजन:</strong> मुद्रास्फीति के लिए लक्ष्य राशि को स्वचालित रूप से समायोजित करता है, इसलिए आपका लक्ष्य यथार्थवादी बना रहता है।</li>
      <li><strong>कई लक्ष्य:</strong> विभिन्न समयरेखा के साथ रिटायरमेंट, शिक्षा, घर, छुट्टी या किसी भी कस्टम लक्ष्य की योजना बनाएं।</li>
      <li><strong>SIP बनाम एकमुश्त:</strong> तुलना करें कि आपकी स्थिति के लिए मासिक SIP या एक बार का निवेश बेहतर काम करता है या नहीं।</li>
      <li><strong>प्रगति ट्रैक करें:</strong> अपनी बचत रणनीति की समीक्षा और समायोजन के लिए नियमित रूप से कैलकुलेटर का उपयोग करें।</li>
    </ul>
  `);

  const goalTypesContent = autoLinkContent(`
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-3 text-left font-semibold border">लक्ष्य प्रकार</th>
            <th class="p-3 text-left font-semibold border">विशिष्ट समयरेखा</th>
            <th class="p-3 text-left font-semibold border">अनुशंसित निवेश</th>
            <th class="p-3 text-left font-semibold border">अपेक्षित रिटर्न</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">रिटायरमेंट</td>
            <td class="p-3 border">20-40 वर्ष</td>
            <td class="p-3 border">इक्विटी SIP + PPF + NPS</td>
            <td class="p-3 border text-emerald-700">10-12% प्रति वर्ष</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">बाल शिक्षा</td>
            <td class="p-3 border">10-18 वर्ष</td>
            <td class="p-3 border">संतुलित म्यूचुअल फंड + SIP</td>
            <td class="p-3 border text-emerald-700">9-11% प्रति वर्ष</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">घर खरीद</td>
            <td class="p-3 border">5-15 वर्ष</td>
            <td class="p-3 border">डेट + इक्विटी मिश्रण</td>
            <td class="p-3 border text-emerald-700">8-10% प्रति वर्ष</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">शादी</td>
            <td class="p-3 border">5-10 वर्ष</td>
            <td class="p-3 border">हाइब्रिड फंड + SIP</td>
            <td class="p-3 border text-emerald-700">9-10% प्रति वर्ष</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">छुट्टी / कार</td>
            <td class="p-3 border">1-5 वर्ष</td>
            <td class="p-3 border">डेट फंड + FD + RD</td>
            <td class="p-3 border text-emerald-700">6-8% प्रति वर्ष</td>
          </tr>
        </tbody>
      </table>
    </div>
  `);

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <CalculatorSchema
        name="Goal Planning Calculator Hindi"
        description="Calculate goal-based financial planning in Hindi with inflation adjustment."
        url="https://fincado.com/hi/goal-planning-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'गोल प्लानिंग कैलकुलेटर',
            url: 'https://fincado.com/hi/goal-planning-calculator/',
          }
        ]}
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <GoalPlanningSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="गोल प्लानिंग कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/goal-planning-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                गोल प्लानिंग कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                मुद्रास्फीति-समायोजित लक्ष्यों के साथ वित्तीय लक्ष्यों की योजना
                बनाएं
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-goal-planning-top" type="leaderboard" />
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
                      औसत मुद्रास्फीति (भारत)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      सामान्य खर्च (2015-2025)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      5–6%
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
                      शिक्षा मुद्रास्फीति
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      स्कूल और कॉलेज फीस (भारत)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8–10%
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
                      अपडेट किया गया डेटा
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      गणना की अंतिम समीक्षा
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <GoalPlanningClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-goal-planning-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  जल्दी शुरू करें, निरंतर रहें
                </strong>
                जितनी जल्दी आप लक्ष्यों की योजना बनाना शुरू करते हैं, आपकी मासिक
                SIP आवश्यकता उतनी ही कम होती है। कंपाउंडिंग और समय आपके पक्ष में
                काम करते हैं। यहां तक कि 5 साल की बढ़त भी मासिक बोझ को 40-50% कम
                कर सकती है।
              </AlertDescription>
            </Alert>

            {/* Benefits & Concepts */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      लक्ष्य-आधारित योजना के लाभ
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #3: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-goal-planning-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      इस गोल प्लानिंग कैलकुलेटर का प्रभावी ढंग से उपयोग कैसे
                      करें
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        विशिष्ट समयरेखा के साथ सभी प्रमुख वित्तीय लक्ष्यों की
                        पहचान करें (रिटायरमेंट, शिक्षा, घर, शादी)।
                      </li>
                      <li>
                        वर्तमान लागतों पर शोध करें (जैसे आज इंजीनियरिंग कॉलेज की
                        फीस) और यथार्थवादी मुद्रास्फीति दरों का उपयोग करें
                        (शिक्षा के लिए 6-10%, सामान्य के लिए 5-6%)।
                      </li>
                      <li>
                        मासिक SIP बोझ को कम करने के लिए इस लक्ष्य के लिए
                        निर्धारित किसी भी मौजूदा बचत या निवेश को इनपुट करें।
                      </li>
                      <li>
                        परिसंपत्ति आवंटन के आधार पर अपेक्षित रिटर्न चुनें:
                        इक्विटी के लिए 10-12% (दीर्घकालिक), संतुलित के लिए 7-9%,
                        डेट के लिए 6-7%।
                      </li>
                      <li>
                        सालाना समीक्षा करें और यदि आय बढ़ती है, लक्ष्य समयरेखा
                        बदलती है, या रिटर्न अपेक्षाओं से विचलित होते हैं तो SIP
                        राशि को समायोजित करें।
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
                                📊
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  SIP कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  SIP रिटर्न की गणना करें और व्यवस्थित निवेश की
                                  योजना बनाएं।
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
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                🧓
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  रिटायरमेंट कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  विस्तृत विश्लेषण के साथ अपने रिटायरमेंट कोष की
                                  योजना बनाएं।
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

            {/* Goal Types Table */}
            <section className="no-print mt-10">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    लक्ष्य प्रकार द्वारा अनुशंसित निवेश रणनीति
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-slate-700 leading-relaxed">
                    <WikiText content={goalTypesContent} />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-goal-planning-before-faq"
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

            {/* 🎯 AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot
                id="hi-goal-planning-bottom"
                type="square"
                lazyLoad={true}
              />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-goal-planning-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-goal-planning-sidebar" />

              {/* 🎯 AD #7: SIDEBAR BOTTOM */}
              <AdSlot
                id="hi-goal-planning-sidebar-bottom"
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
