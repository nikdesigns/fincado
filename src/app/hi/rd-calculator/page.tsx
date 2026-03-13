import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RDClient from '@/app/rd-calculator/RDClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import FAQSchema from '@/components/FAQSchema';
import { RDSchemas } from '@/components/schemas/RDSchemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  TrendingUp,
  ArrowRight,
  Repeat,
  CalendarCheck,
  Info,
} from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';
import { autoLinkContent } from '@/utils/autoLinker';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'RD कैलकुलेटर 2026 – रिकरिंग डिपॉजिट ब्याज और परिपक्वता राशि | Fincado',
  description:
    'RD कैलकुलेटर हिंदी में: जानें कि आपकी मासिक आरडी (Recurring Deposit) पर आपको कितना ब्याज मिलेगा और मैच्योरिटी राशि क्या होगी। तिमाही चक्रवृद्धि के साथ सटीक गणना।',
  keywords: [
    'RD Calculator Hindi',
    'Recurring Deposit Calculator Hindi',
    'RD Interest Rate Hindi',
    'आरडी कैलकुलेटर',
    'RD Maturity Calculator',
    'Post Office RD',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/rd-calculator/',
    languages: { 'en-IN': 'https://fincado.com/rd-calculator/' },
  },
  openGraph: {
    title: 'RD कैलकुलेटर – सुरक्षित और निश्चित रिटर्न',
    description:
      'मुफ्त टूल: RD परिपक्वता राशि, कुल ब्याज और टीडीएस की सटीक गणना करें।',
    url: 'https://fincado.com/hi/rd-calculator/',
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

export default function HindiRDPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    seniorCitizen: 'वरिष्ठ नागरिक (60+ वर्ष)',
    seniorBonus: 'अतिरिक्त 0.5% ब्याज दर प्राप्त करें',
    monthlyDeposit: 'मासिक जमा (₹)',
    interestRate: 'ब्याज दर (% प्रति वर्ष)',
    tenure: 'अवधि (वर्ष)',
    additionalMonths: 'अतिरिक्त महीने',
    showDetails: 'गणना विवरण दिखाएं',
    hideDetails: 'गणना विवरण छुपाएं',
    maturityAmount: 'परिपक्वता राशि',
    totalInvestment: 'कुल निवेश',
    netInterest: 'शुद्ध ब्याज',
    estimatedTDS: 'अनुमानित TDS (10%):',
    grossInterest: 'सकल ब्याज:',
    calculationBreakdown: 'गणना विवरण',
    monthlyDepositLabel: 'मासिक जमा:',
    totalMonths: 'कुल महीने:',
    compounding: 'चक्रवृद्धि:',
    quarterly: 'तिमाही',
    annualInterestRate: 'वार्षिक ब्याज दर:',
    wealthGain: 'धन लाभ:',
    saveCalculation: 'गणना सहेजें',
    shareWhatsApp: 'WhatsApp पर साझा करें',
    compareBankRates: 'बैंक दरों की तुलना करें',
    hideBankRates: 'बैंक दरें छुपाएं',
    popularBankRates: 'लोकप्रिय बैंक RD दरें (फरवरी 2026)',
    bankTenure: 'अवधि:',
    general: 'सामान्य:',
    senior: 'वरिष्ठ:',
    applyRate: 'दर लागू करें',
    ratesNote:
      'दरें सांकेतिक हैं और बैंक, अवधि और जमा राशि के अनुसार भिन्न होती हैं। पोस्ट ऑफिस RD दरें सभी अवधियों में एक समान हैं। वर्तमान दरों के लिए अपने बैंक से संपर्क करें।',
    savedRDPlans: 'आपकी सहेजी गई RD योजनाएं',
    clearAll: 'सभी साफ़ करें',
    maturity: 'परिपक्वता:',
    interest: 'ब्याज:',
    investment: 'निवेश:',
  };

  const introContent = autoLinkContent(`
    <p>
      <strong>रिकरिंग डिपॉजिट (RD)</strong> बैंकों और <strong>पोस्ट ऑफिस</strong> द्वारा 
      पेश किया जाने वाला एक टर्म डिपॉजिट है जो व्यक्तियों को एक पूर्व-निर्धारित अवधि के लिए 
      हर महीने एक निश्चित राशि जमा करने की अनुमति देता है। यह वेतनभोगी लोगों के लिए आदर्श है 
      जो अपनी आय का एक हिस्सा नियमित रूप से बचाना चाहते हैं।
    </p>
    <p class="mt-4">
      <strong>फिक्स्ड डिपॉजिट (FD)</strong> के विपरीत जहां एकमुश्त राशि की आवश्यकता होती है, 
      RD FD के समान ब्याज दरों के साथ नियमित बचत का अनुशासन लाता है। आपातकालीन फंड बनाने या 
      कार खरीदने या छुट्टी के लिए वित्त पोषण जैसे विशिष्ट लक्ष्यों के लिए बचत करने के लिए बिल्कुल सही।
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>न्यूनतम अवधि:</strong> 6 महीने (बैंक के अनुसार भिन्न)</li>
      <li><strong>अधिकतम अवधि:</strong> 10 वर्षों तक</li>
      <li><strong>न्यूनतम मासिक जमा:</strong> ₹100-₹500 (बैंक के अनुसार भिन्न)</li>
      <li><strong>चक्रवृद्धि:</strong> तिमाही (अधिकांश बैंक)</li>
      <li><strong>समय से पहले निकासी:</strong> जुर्माने के साथ अनुमति है (0.5-1%)</li>
      <li><strong>लोन सुविधा:</strong> RD शेष राशि के 90% तक उपलब्ध</li>
      <li><strong>ऑटो-डेबिट:</strong> बचत खाते से मासिक राशि स्वचालित रूप से काट ली जाती है</li>
    </ul>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>अनुशासित बचत:</strong> आपको हर महीने एक निश्चित राशि बिना असफल हुए बचाने के लिए मजबूर करता है।</li>
      <li><strong>गारंटीड रिटर्न:</strong> खोलते समय ब्याज दरें लॉक होती हैं, बाजार की अस्थिरता से अप्रभावित।</li>
      <li><strong>लचीली अवधि:</strong> अपने लक्ष्यों के आधार पर 6 महीने से 10 वर्षों तक की अवधि चुनें।</li>
      <li><strong>तरलता:</strong> आपात स्थिति में समय से पहले बंद किया जा सकता है (न्यूनतम जुर्माने के साथ)।</li>
      <li><strong>RD के खिलाफ लोन:</strong> कम ब्याज दरों पर अपने RD शेष राशि का 90% तक लोन प्राप्त करें।</li>
      <li><strong>वरिष्ठ नागरिक लाभ:</strong> 60 वर्ष से अधिक उम्र के निवेशकों के लिए अतिरिक्त 0.25-0.5% ब्याज।</li>
      <li><strong>स्वचालित निवेश:</strong> बचत खाते से ऑटो-डेबिट के साथ सेट करें और भूल जाएं।</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      रिकरिंग डिपॉजिट पर अर्जित ब्याज आपके आयकर स्लैब के अनुसार <strong>पूरी तरह से कर योग्य</strong> है। 
      इसे "अन्य स्रोतों से आय" के तहत आपकी वार्षिक आय में जोड़ा जाता है।
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>TDS कटौती:</strong> यदि ब्याज एक वर्ष में ₹40,000 से अधिक है तो बैंक 10% TDS काटते हैं (वरिष्ठ नागरिकों के लिए ₹50,000)।</li>
      <li><strong>फॉर्म 15G/15H:</strong> यदि आपकी कुल आय कर योग्य सीमा से कम है तो TDS से बचने के लिए इन फॉर्मों को जमा करें।</li>
      <li><strong>उच्च TDS:</strong> यदि बैंक को PAN प्रदान नहीं किया गया है तो 20% TDS।</li>
      <li><strong>ITR फाइलिंग:</strong> आपको अपने आयकर रिटर्न में RD ब्याज घोषित करना होगा, भले ही TDS नहीं काटा गया हो।</li>
    </ul>
  `);

  // ✅ FAQ Items (Hindi) - Expanded to 10
  const faqItems = [
    {
      id: 'rd-faq-1',
      question: 'क्या RD के ब्याज पर टैक्स लगता है?',
      answer:
        'हाँ। रिकरिंग डिपॉजिट (RD) से मिलने वाला ब्याज आपकी कुल आय में जोड़ा जाता है और आपके कर स्लैब के अनुसार कर लगाया जाता है। अगर आपका ब्याज एक वित्तीय वर्ष में ₹40,000 (वरिष्ठ नागरिकों के लिए ₹50,000) से ज्यादा है, तो बैंक 10% TDS काटता है।',
    },
    {
      id: 'rd-faq-2',
      question: 'क्या मैं अपनी मासिक किस्त बाद में बढ़ा सकता हूँ?',
      answer:
        'नहीं। सामान्य RD में मासिक किस्त की राशि खाता खोलते समय तय हो जाती है। हालाँकि, कुछ बैंक Flexi RD या iWish RD उत्पाद प्रदान करते हैं जहाँ आप जमा राशि में भिन्नता ला सकते हैं। आप विभिन्न राशियों के साथ कई RD भी खोल सकते हैं।',
    },
    {
      id: 'rd-faq-3',
      question: 'RD की न्यूनतम अवधि क्या है?',
      answer:
        'न्यूनतम RD अवधि आमतौर पर 6 महीने होती है, जबकि अधिकतम बैंक के आधार पर 10 वर्षों तक जा सकती है। पोस्ट ऑफिस RD की एक निश्चित अवधि 5 वर्षों की होती है।',
    },
    {
      id: 'rd-faq-4',
      question: 'यदि मैं एक RD किस्त मिस कर दूं तो क्या होता है?',
      answer:
        'अधिकांश बैंक प्रत्येक मिस की गई किस्त के लिए मासिक जमा के प्रति ₹100 पर ₹1-₹5 का जुर्माना लगाते हैं। यदि आप लगातार 4 किस्तें मिस करते हैं, तो RD खाता समय से पहले बंद हो सकता है। कुछ बैंक 15-30 दिनों की ग्रेस अवधि प्रदान करते हैं।',
    },
    {
      id: 'rd-faq-5',
      question: 'RD बनाम SIP - लंबी अवधि की संपत्ति के लिए कौन बेहतर है?',
      answer:
        'RD शून्य जोखिम के साथ गारंटीड रिटर्न (6.5-7.5%) प्रदान करता है, जो इसे अल्पकालिक लक्ष्यों (1-5 वर्ष) के लिए आदर्श बनाता है। इक्विटी म्यूचुअल फंड में SIP संभावित रूप से अधिक रिटर्न (12-15%) प्रदान करता है लेकिन बाजार जोखिम के साथ आता है। दीर्घकालिक धन सृजन (10+ वर्ष) के लिए, मुद्रास्फीति के लिए समायोजन के बाद SIP आमतौर पर RD से बेहतर प्रदर्शन करता है।',
    },
    {
      id: 'rd-faq-6',
      question: 'क्या मैं अपनी RD पर लोन ले सकता हूं?',
      answer:
        'हां, अधिकांश बैंक जमा मूल्य के 90-95% तक RD के खिलाफ लोन देते हैं। ब्याज दर आमतौर पर RD दर से 1-2% अधिक होती है। यह समय से पहले निकासी से बेहतर है क्योंकि आपकी RD ब्याज अर्जित करना जारी रखती है।',
    },
    {
      id: 'rd-faq-7',
      question: 'क्या पोस्ट ऑफिस RD बैंक RD से बेहतर है?',
      answer:
        'पोस्ट ऑफिस RD थोड़ी कम ब्याज (वर्तमान में 6.7%) प्रदान करता है लेकिन एक निश्चित 5 साल की अवधि है और भारत सरकार द्वारा समर्थित है। बैंक RD अवधि (6 महीने से 10 वर्षों) में अधिक लचीलापन प्रदान करते हैं और उच्च दरें (7.5% तक) हो सकती हैं। अपनी प्राथमिकता के आधार पर चुनें: सुरक्षा (पोस्ट ऑफिस) बनाम उच्च रिटर्न (बैंक)।',
    },
    {
      id: 'rd-faq-8',
      question: 'वरिष्ठ नागरिक RD दर लाभ क्या है?',
      answer:
        'वरिष्ठ नागरिक (60+ वर्ष) आमतौर पर बैंक के आधार पर RD पर अतिरिक्त 0.25% से 0.5% ब्याज प्राप्त करते हैं। कुछ बैंक 0.75% तक अतिरिक्त देते हैं। यह लाभ सभी अवधियों में अधिकांश RD योजनाओं पर उपलब्ध है।',
    },
    {
      id: 'rd-faq-9',
      question: 'क्या मैं मैच्योरिटी से पहले अपनी RD बंद कर सकता हूं?',
      answer:
        'हां, अधिकांश RD में समय से पहले निकासी की अनुमति है। हालांकि, बैंक ब्याज दर पर 0.5-1% का जुर्माना लगाते हैं। जुर्माना बैंक और RD रखे जाने की अवधि के अनुसार भिन्न होता है। कुछ बैंक चिकित्सा आपात स्थिति के लिए जुर्माना माफ करते हैं।',
    },
    {
      id: 'rd-faq-10',
      question: 'RD SIP से कैसे अलग है?',
      answer:
        'RD एक बैंक जमा उत्पाद है जिसमें गारंटीड रिटर्न और तिमाही चक्रवृद्धि है। SIP बाजार-लिंक्ड रिटर्न के साथ एक म्यूचुअल फंड निवेश विधि है। RD सुरक्षित है लेकिन कम रिटर्न (6.5-7.5%) प्रदान करता है, जबकि SIP उच्च रिटर्न (12-15%) उत्पन्न कर सकता है लेकिन बाजार जोखिम वहन करता है। RD अल्पकालिक लक्ष्यों के लिए आदर्श है, SIP दीर्घकालिक धन सृजन के लिए।',
    },
  ];

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <CalculatorSchema
        name="RD Calculator Hindi"
        description="Calculate Recurring Deposit maturity in Hindi."
        url="https://fincado.com/hi/rd-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'RD कैलकुलेटर',
            url: 'https://fincado.com/hi/rd-calculator/',
          },
        ]}
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <RDSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="RD कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/rd-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-emerald-100 text-lime-700">
              <Repeat className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                RD कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                गारंटीड रिटर्न के साथ अनुशासित मासिक बचत बढ़ाएं
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              रिकरिंग डिपॉजिट (RD) उन लोगों के लिए बेहतरीन है जो एक बार में बड़ा
              निवेश नहीं कर सकते। हर महीने थोड़ी रकम जमा करें और बैंक से{' '}
              <strong>चक्रवृद्धि ब्याज (Compound Interest)</strong> के साथ
              सुरक्षित रिटर्न पाएं।
            </p>
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-rd-top" type="leaderboard" />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-lime-200 bg-linear-to-br from-lime-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-lime-700 mb-1">
                      औसत RD दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      प्रमुख बैंक (1-3 वर्ष)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      6.7–7.5%
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
                      पोस्ट ऑफिस RD
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      5 साल की अवधि (सरकार समर्थित)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      6.7%
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
                    <div className="text-sm text-slate-600 mb-2">बैंक दरें</div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <RDClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-rd-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  निवेश टिप
                </strong>
                RD अल्प से मध्यम अवधि के लक्ष्यों (1-5 वर्ष) के लिए सबसे अच्छा
                काम करता है जैसे कार डाउन पेमेंट, छुट्टी, या आपातकालीन फंड के
                लिए बचत। दीर्घकालिक धन सृजन (10+ वर्ष) के लिए, संभावित रूप से
                उच्च रिटर्न के लिए इक्विटी म्यूचुअल फंड में SIP पर विचार करें।
              </AlertDescription>
            </Alert>

            {/* ✅ RD FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    RD मैच्योरिटी गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      RD ब्याज तिमाही चक्रवृद्धि होता है। चूंकि जमा मासिक रूप से
                      की जाती है, प्रत्येक किस्त एक अलग अवधि के लिए ब्याज अर्जित
                      करती है:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        M = P × &#123;[(1 + r/n)<sup>n×t</sup> - 1] ÷
                        (r/n)&#125; × (1 + r/n)
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">जहां:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          M
                        </span>
                        <span>= मैच्योरिटी राशि (अंत में कुल मूल्य)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= मासिक जमा राशि (₹ में)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = वार्षिक ब्याज दर (दशमलव के रूप में, जैसे 7% के लिए
                          0.07)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = प्रति वर्ष चक्रवृद्धि आवृत्ति (तिमाही के लिए 4)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          t
                        </span>
                        <span>= वर्षों में अवधि</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                      <p className="text-xs text-slate-700">
                        <strong>नोट:</strong> यह सूत्र एन्युइटी के फ्यूचर वैल्यू
                        फॉर्मूले के समान है लेकिन मासिक जमा के साथ तिमाही
                        चक्रवृद्धि के लिए समायोजित किया गया है।
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: RD गणना (तिमाही चक्रवृद्धि)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>मासिक जमा (P):</strong>
                        </div>
                        <div>₹5,000</div>

                        <div>
                          <strong>ब्याज दर (r):</strong>
                        </div>
                        <div>7% प्रति वर्ष</div>

                        <div>
                          <strong>अवधि (t):</strong>
                        </div>
                        <div>3 वर्ष (36 महीने)</div>

                        <div>
                          <strong>चक्रवृद्धि (n):</strong>
                        </div>
                        <div>तिमाही (4 बार/वर्ष)</div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">
                          चरण 1: दर को दशमलव में बदलें
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 7 ÷ 100 = 0.07
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: (1 + r/n) की गणना करें
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          1 + (0.07 ÷ 4) = 1 + 0.0175 = 1.0175
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: (1 + r/n)<sup>n×t</sup> की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            (1.0175)<sup>4×3</sup> = (1.0175)<sup>12</sup>
                          </div>
                          <div>≈ 1.2314</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 4: RD फॉर्मूला लागू करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            M = 5,000 × &#123;(1.2314 - 1) ÷ 0.0175&#125; ×
                            1.0175
                          </div>
                          <div>M = 5,000 × (0.2314 ÷ 0.0175) × 1.0175</div>
                          <div>M = 5,000 × 13.22 × 1.0175</div>
                          <div>M ≈ 5,000 × 13.45</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          अनुमानित मैच्योरिटी मूल्य:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹1,97,271
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-300 space-y-2">
                        <div className="flex justify-between">
                          <span>कुल जमा (36 महीने):</span>
                          <strong>₹1,80,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>अर्जित ब्याज:</span>
                          <strong className="text-green-700">₹17,271</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>प्रभावी लाभ:</span>
                          <strong className="text-lime-700">9.6%</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alternative Method */}
                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <h4 className="font-semibold text-lime-900 mb-2 flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" />
                      वैकल्पिक: महीने-दर-महीने गणना
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        प्रत्येक मासिक किस्त विभिन्न अवधियों के लिए ब्याज अर्जित
                        करती है:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs">
                        <li>
                          पहली किस्त 36 महीनों के लिए ब्याज अर्जित करती है
                        </li>
                        <li>
                          दूसरी किस्त 35 महीनों के लिए ब्याज अर्जित करती है
                        </li>
                        <li>
                          तीसरी किस्त 34 महीनों के लिए ब्याज अर्जित करती है
                        </li>
                        <li>... और इसी तरह</li>
                        <li>36वीं किस्त 1 महीने के लिए ब्याज अर्जित करती है</li>
                      </ul>
                      <p className="text-xs text-slate-600 mt-2">
                        उपरोक्त सूत्र ज्यामितीय प्रगति योग सूत्र का उपयोग करके
                        इस जटिल गणना को सरल बनाता है।
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      महत्वपूर्ण बिंदु
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        अधिकांश भारतीय बैंक RD ब्याज को तिमाही (हर 3 महीने)
                        चक्रवृद्धि करते हैं।
                      </li>
                      <li>
                        किस्तें मिस करने से जुर्माना लग सकता है और अंतिम
                        मैच्योरिटी राशि कम हो सकती है।
                      </li>
                      <li>
                        समय से पहले निकासी जुर्माना आमतौर पर ब्याज दर को 0.5-1%
                        कम कर देता है।
                      </li>
                      <li>
                        यदि वार्षिक ब्याज ₹40,000 से अधिक है तो 10% TDS काटा
                        जाता है (वरिष्ठों के लिए ₹50,000)।
                      </li>
                      <li>
                        वरिष्ठ नागरिकों को अधिकांश RD पर अतिरिक्त 0.25-0.5%
                        ब्याज मिलता है।
                      </li>
                      <li>
                        पोस्ट ऑफिस RD की एक निश्चित 5 साल की अवधि है जिसमें 6.7%
                        ब्याज दर है।
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    यह कैलकुलेटर तिमाही चक्रवृद्धि के साथ आवर्ती जमा के लिए मानक
                    चक्रवृद्धि ब्याज सूत्र का उपयोग करता है। वास्तविक रिटर्न
                    बैंक-विशिष्ट नीतियों के कारण थोड़ा भिन्न हो सकता है।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* PROMO BOX */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <TrendingUp className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    बाजार-लिंक्ड रिटर्न की तलाश है?
                  </strong>

                  <Link
                    href="/hi/sip-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      उच्च वृद्धि क्षमता के लिए SIP कैलकुलेटर से तुलना करें
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
                  {/* SECTION 1: WHAT IS RD */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      RD (रिकरिंग डिपॉजिट) क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* SECTION 2: Features */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      रिकरिंग डिपॉजिट की प्रमुख विशेषताएं
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={featuresContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #3: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-rd-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* SECTION 3: BENEFITS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      रिकरिंग डिपॉजिट के लाभ
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* Comparison Table */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      RD बनाम FD बनाम SIP तुलना
                    </h3>

                    <div className="overflow-x-auto">
                      <Table className="border-collapse">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-left">विशेषता</TableHead>
                            <TableHead className="text-left">RD</TableHead>
                            <TableHead className="text-left">FD</TableHead>
                            <TableHead className="text-left">SIP</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              रिटर्न
                            </TableCell>
                            <TableCell className="font-semibold text-lime-600">
                              6.7% – 7.5%
                            </TableCell>
                            <TableCell className="text-slate-700">
                              6.5% – 7.5%
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              12% – 15%
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              निवेश मोड
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              मासिक
                            </TableCell>
                            <TableCell className="text-slate-700">
                              एकमुश्त
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              मासिक
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              जोखिम स्तर
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              शून्य जोखिम
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              शून्य जोखिम
                            </TableCell>
                            <TableCell className="text-slate-700">
                              बाजार जोखिम
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              आदर्श के लिए
                            </TableCell>
                            <TableCell className="text-slate-700">
                              अल्पकालिक लक्ष्य (1-5 वर्ष)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              एकमुश्त पार्किंग
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              दीर्घकालिक धन (10+ वर्ष)
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              तरलता
                            </TableCell>
                            <TableCell className="text-slate-700">
                              मध्यम (जुर्माने के साथ)
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              उच्च (जुर्माने के साथ)
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              उच्च (कभी भी रिडीम कर सकते हैं)
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              रिटर्न पर टैक्स
                            </TableCell>
                            <TableCell className="text-slate-700">
                              टैक्स स्लैब के अनुसार
                            </TableCell>
                            <TableCell className="text-slate-700">
                              टैक्स स्लैब के अनुसार
                            </TableCell>
                            <TableCell className="text-slate-700">
                              LTCG: 12.5% (लाभ {'>'}₹1.25L)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                      <p className="text-sm text-slate-700">
                        <strong>विशेषज्ञ टिप:</strong> अल्पकालिक लक्ष्यों और
                        आपातकालीन फंड के लिए RD का उपयोग करें। सेवानिवृत्ति या
                        दीर्घकालिक धन के लिए, सुरक्षा और वृद्धि को संतुलित करने
                        के लिए RD को SIP के साथ मिलाएं।
                      </p>
                    </div>
                  </section>

                  {/* TAX Section */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      RD ब्याज कराधान (2026 नियम)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={taxContent} />
                    </div>
                  </section>

                  {/* How to Use Calculator */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      इस RD कैलकुलेटर का उपयोग कैसे करें
                    </h3>
                    <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                      <li>अपनी मासिक जमा राशि दर्ज करें (न्यूनतम ₹500)।</li>
                      <li>
                        अपने बैंक द्वारा दी गई ब्याज दर दर्ज करें (नवीनतम दरें
                        जांचें)।
                      </li>
                      <li>वर्षों और अतिरिक्त महीनों में अवधि चुनें।</li>
                      <li>
                        यदि आप 60+ वर्ष के हैं तो बोनस दरों के लिए वरिष्ठ नागरिक
                        मोड सक्षम करें।
                      </li>
                      <li>
                        लोकप्रिय बैंकों और पोस्ट ऑफिस से वर्तमान दरें देखने के
                        लिए <strong>&quot;बैंक दरों की तुलना करें&quot;</strong>{' '}
                        पर क्लिक करें।
                      </li>
                      <li>
                        मैच्योरिटी राशि, कुल निवेश और अर्जित ब्याज की समीक्षा
                        करें।
                      </li>
                      <li>
                        भविष्य के संदर्भ के लिए अपनी गणना सहेजें या WhatsApp के
                        माध्यम से साझा करें।
                      </li>
                    </ol>
                  </section>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित बचत कैलकुलेटर
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/hi/fd-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                🏦
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  FD कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  एकमुश्त निवेश के साथ फिक्स्ड डिपॉजिट रिटर्न की
                                  गणना करें।
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

                      <Link href="/hi/sip-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                📈
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  SIP कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  बाजार-लिंक्ड वृद्धि क्षमता के साथ SIP रिटर्न
                                  की गणना करें।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                                  <span>अभी आजमाएं</span>
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

            {/* 🎯 AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-rd-before-faq"
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

            {/* 🎯 AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-rd-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-rd-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-rd-sidebar" />

              {/* 🎯 AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-rd-sidebar-bottom" type="box" lazyLoad={true} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
