import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import LumpsumClient from '@/app/lumpsum-calculator/LumpsumClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import FAQSchema from '@/components/FAQSchema';
import { LumpsumSchemas } from '@/components/schemas/LumpsumSchemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Zap, TrendingUp, ArrowRight, DollarSign } from 'lucide-react';
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
  title: 'Lumpsum कैलकुलेटर 2026 – एकमुश्त निवेश रिटर्न कैलकुलेटर | Fincado',
  description:
    'Lumpsum Calculator Hindi: म्यूचुअल फंड एकमुश्त निवेश पर कंपाउंड ब्याज के साथ रिटर्न की गणना करें। Lumpsum vs SIP रिटर्न की तुलना करें, CAGR जांचें, निवेश मल्टीपल और 2026 के लिए एकमुश्त निवेश रणनीतियों की योजना बनाएं।',
  keywords: [
    'Lumpsum Calculator Hindi',
    'Mutual Fund Calculator Hindi',
    'One Time Investment Hindi',
    'Lumpsum vs SIP Hindi',
    'CAGR Calculator Hindi',
    'Compound Interest Calculator Hindi'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/lumpsum-calculator/',
    languages: { 'en-IN': 'https://fincado.com/lumpsum-calculator/' },
  },
  openGraph: {
    title: 'Lumpsum कैलकुलेटर 2026 – एकमुश्त निवेश रिटर्न की गणना करें',
    description:
      'मुफ्त Lumpsum कैलकुलेटर से म्यूचुअल फंड रिटर्न का अनुमान लगाएं। कंपाउंड ब्याज, CAGR की गणना करें और Lumpsum vs SIP रणनीतियों की तुलना करें।',
    url: 'https://fincado.com/hi/lumpsum-calculator/',
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

export default function HindiLumpsumPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    investment: 'निवेश राशि (Investment)',
    rate: 'ब्याज दर (Expected Return %)',
    time: 'समय अवधि (Years)',
    frequency: 'ब्याज चक्र (Compounding)',
    futureVal: 'कुल राशि (Future Value)',
    invested: 'कुल निवेश',
    wealthGained: 'कुल फायदा (Returns)',
  };

  const introContent = autoLinkContent(`
    <p>
      एक <strong>Lumpsum निवेश</strong> का मतलब है एक बड़ी राशि को एक साथ निवेश करना, 
      बजाय इसके कि इसे SIP जैसे मासिक योगदान के माध्यम से फैलाया जाए। यह रणनीति तब 
      आदर्श है जब आपके पास अचानक धन आता है—जैसे बोनस, विरासत, संपत्ति बिक्री आय, या 
      रिटायरमेंट कॉर्पस—जिसे आप तुरंत म्यूचुअल फंड या अन्य निवेशों में लगाना चाहते हैं।
    </p>
    <p class="mt-4">
      Lumpsum निवेश पहले दिन से <strong>चक्रवृद्धि ब्याज</strong> से लाभान्वित होता है। 
      चूंकि पूरी राशि शुरुआत में ही निवेश की जाती है, हर रुपया आपके लिए शुरू से काम करता है, 
      समय के साथ SIP जैसे चरणबद्ध निवेशों की तुलना में संभावित रूप से उच्च रिटर्न उत्पन्न करता है।
    </p>
  `);

  const whenToUseLumpsumContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>अचानक धन प्राप्ति:</strong> बोनस, विरासत, या बीमा/FD से मैच्योरिटी आय प्राप्त हुई।</li>
      <li><strong>बाजार सुधार:</strong> बाजार में महत्वपूर्ण गिरावट आई है और आप खरीदारी का अवसर देखते हैं।</li>
      <li><strong>लंबी निवेश अवधि:</strong> आपके पास 10+ वर्ष हैं और बाजार की अस्थिरता को झेल सकते हैं।</li>
      <li><strong>कम वैल्यूएशन:</strong> बाजार वैल्यूएशन (P/E रेशियो) ऐतिहासिक रूप से कम हैं।</li>
      <li><strong>लक्ष्य-आधारित योजना:</strong> बड़े एकमुश्त लक्ष्य जैसे बच्चे की शिक्षा या घर का डाउन पेमेंट।</li>
    </ul>
  `);

  const lumpsumVsSIPContent = autoLinkContent(`
    <p>
      पुरानी बहस: क्या आपको एक साथ सब कुछ निवेश करना चाहिए या SIP के माध्यम से फैलाना चाहिए? यहाँ सच्चाई है:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>बुल मार्केट में Lumpsum जीतता है:</strong> यदि बाजार लगातार बढ़ता है, तो Lumpsum पहले दिन से पूर्ण लाभ कैप्चर करता है।</li>
      <li><strong>अस्थिर बाजार में SIP जीतता है:</strong> रुपी कॉस्ट एवरेजिंग आपको कम कीमतों पर अधिक यूनिट खरीदने में मदद करती है।</li>
      <li><strong>टाइमिंग जोखिम:</strong> Lumpsum में टाइमिंग जोखिम होता है—यदि आप बाजार के शिखर पर निवेश करते हैं, तो शुरुआत में रिटर्न कम हो सकता है।</li>
      <li><strong>व्यवहारिक लाभ:</strong> SIP अनुशासन लागू करता है और "बाजार को समय देने" के तनाव को दूर करता है।</li>
    </ul>
    <p class="mt-4 font-semibold text-slate-700">
      <strong>हाइब्रिड रणनीति:</strong> कई विशेषज्ञ 50% Lumpsum और शेष 50% STP (Systematic Transfer Plan) 
      या SIP के माध्यम से 6-12 महीनों में निवेश करने की सलाह देते हैं ताकि दोनों दृष्टिकोणों को संतुलित किया जा सके।
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Lumpsum म्यूचुअल फंड निवेश पर कर फंड प्रकार और होल्डिंग अवधि पर निर्भर करता है:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">इक्विटी म्यूचुअल फंड:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>अल्पकालिक (< 1 वर्ष):</strong> लाभ पर 20% कर (STCG)</li>
      <li><strong>दीर्घकालिक (> 1 वर्ष):</strong> ₹1.25 लाख प्रति वर्ष से अधिक लाभ पर 12.5% कर (LTCG)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">डेट म्यूचुअल फंड:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>सभी लाभ आपके आयकर स्लैब के अनुसार कर योग्य</strong> (अप्रैल 2023 से LTCG लाभ नहीं)</li>
    </ul>
  `);

  // ✅ FAQ Items (Hindi) - Expanded to 10
  const lumpsumFaqs = [
    {
      id: 'lumpsum-faq-1',
      question: 'Lumpsum निवेश क्या है?',
      answer:
        'Lumpsum निवेश का मतलब है एक बड़ी राशि को एक साथ निवेश करना, बजाय SIP जैसे मासिक किश्तों के। यह बोनस, विरासत, या मैच्योरिटी आय जैसे अचानक धन को लगाने के लिए आदर्श है।',
    },
    {
      id: 'lumpsum-faq-2',
      question: 'Lumpsum बनाम SIP - कौन बेहतर है?',
      answer:
        'जब बाजार कम वैल्यूएशन पर हो या मजबूत बुल मार्केट में हो तो Lumpsum सबसे अच्छा काम करता है। अस्थिर बाजारों के लिए SIP बेहतर है क्योंकि यह लागतों को औसत करता है। कई निवेशक हाइब्रिड दृष्टिकोण का उपयोग करते हैं: 50% Lumpsum और 50% STP/SIP के माध्यम से 6-12 महीनों में निवेश करें।',
    },
    {
      id: 'lumpsum-faq-3',
      question: 'Lumpsum निवेश के लिए न्यूनतम राशि क्या है?',
      answer:
        'अधिकांश म्यूचुअल फंड के लिए न्यूनतम Lumpsum निवेश ₹5,000 से ₹10,000 की आवश्यकता होती है। हालांकि, कुछ फंड में कम या अधिक न्यूनतम हो सकते हैं। विशिष्ट आवश्यकताओं के लिए अपने फंड हाउस या AMC से जांचें।',
    },
    {
      id: 'lumpsum-faq-4',
      question: 'क्या मैं अपना Lumpsum निवेश कभी भी निकाल सकता हूं?',
      answer:
        'हां, ओपन-एंडेड म्यूचुअल फंड कभी भी निकासी की अनुमति देते हैं। हालांकि, कुछ फंडों में एक्जिट लोड (जुर्माना) हो सकता है यदि आप एक निश्चित अवधि (आमतौर पर 1 वर्ष) के भीतर निकालते हैं। ELSS फंड में अनिवार्य 3 साल का लॉक-इन है।',
    },
    {
      id: 'lumpsum-faq-5',
      question: 'Lumpsum निवेश में CAGR क्या है?',
      answer:
        'CAGR (कंपाउंड एनुअल ग्रोथ रेट) आपके Lumpsum निवेश पर वार्षिकृत रिटर्न दर है। यह दिखाता है कि आपका निवेश औसतन हर साल कितना बढ़ता है। उदाहरण के लिए, 12% CAGR का मतलब है कि आपका निवेश अवधि के दौरान सालाना 12% बढ़ता है।',
    },
    {
      id: 'lumpsum-faq-6',
      question: 'क्या Lumpsum निवेश कर योग्य है?',
      answer:
        'हां। 1 वर्ष से अधिक रखे गए इक्विटी फंड के लिए, ₹1.25 लाख/वर्ष से अधिक लाभ पर LTCG कर 12.5% है। 1 वर्ष से कम होल्डिंग के लिए, STCG 20% है। डेट फंड लाभ आपके आयकर स्लैब के अनुसार कर योग्य हैं (LTCG लाभ नहीं)।',
    },
    {
      id: 'lumpsum-faq-7',
      question: 'क्या बाजार ऊंचा होने पर Lumpsum निवेश करना चाहिए?',
      answer:
        'आदर्श रूप से, जब बाजार सर्वकालिक उच्च (उच्च P/E अनुपात) पर हो तो बड़ी Lumpsum निवेश से बचें। इसके बजाय, STP (सिस्टमैटिक ट्रांसफर प्लान) का उपयोग करें ताकि 6-12 महीनों में धीरे-धीरे डेट से इक्विटी में जा सकें। यह टाइमिंग जोखिम को कम करता है।',
    },
    {
      id: 'lumpsum-faq-8',
      question: 'Lumpsum निवेश में STP क्या है?',
      answer:
        'STP (सिस्टमैटिक ट्रांसफर प्लान) आपको अपनी Lumpsum राशि को डेट फंड में पार्क करने और मासिक रूप से निश्चित राशि को इक्विटी फंड में स्थानांतरित करने की अनुमति देता है। यह Lumpsum (तत्काल तैनाती) और SIP (रुपी कॉस्ट एवरेजिंग) दोनों के लाभों को जोड़ता है।',
    },
    {
      id: 'lumpsum-faq-9',
      question: 'क्या मैं Lumpsum को SIP में बदल सकता हूं?',
      answer:
        'नहीं, आप मौजूदा Lumpsum निवेश को SIP में परिवर्तित नहीं कर सकते। हालांकि, आप उसी फंड में एक नया SIP शुरू कर सकते हैं। वैकल्पिक रूप से, एक फंड से दूसरे में धीरे-धीरे स्थानांतरित करने के लिए STP का उपयोग करें।',
    },
    {
      id: 'lumpsum-faq-10',
      question: 'Lumpsum निवेश से मुझे कितना रिटर्न मिल सकता है?',
      answer:
        'ऐतिहासिक डेटा दिखाता है कि इक्विटी म्यूचुअल फंड ने 10+ वर्षों में 12-15% CAGR दिया है। डेट फंड 6-8% रिटर्न देते हैं। हालांकि, पिछला प्रदर्शन गारंटीकृत नहीं है। आपका वास्तविक रिटर्न बाजार की स्थितियों और फंड के प्रदर्शन पर निर्भर करता है।',
    }
  ];

  return (
    <>
      <CalculatorSchema
        name="Lumpsum Calculator Hindi"
        description="Calculate one-time investment returns with compound interest and CAGR in Hindi."
        url="https://fincado.com/hi/lumpsum-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'Lumpsum कैलकुलेटर',
            url: 'https://fincado.com/hi/lumpsum-calculator/',
          }
        ]}
      />

      <FAQSchema
        faqs={lumpsumFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <LumpsumSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Lumpsum कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/lumpsum-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-green-100 text-lime-700">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Lumpsum कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                कंपाउंड ब्याज के साथ एकमुश्त निवेश रिटर्न की गणना करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              यदि आपके पास एक साथ बड़ी राशि (जैसे बोनस या प्रॉपर्टी से मिला
              पैसा) है, तो उसे <strong>एकमुश्त (Lumpsum)</strong> निवेश करें। इस
              कैलकुलेटर से जानें कि कंपाउंडिंग की मदद से आपका पैसा समय के साथ
              कितना बढ़ सकता है।
            </p>
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-lumpsum-top" type="leaderboard" />
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
                      ऐतिहासिक इक्विटी CAGR
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      लार्ज-कैप फंड (15+ वर्ष)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      12–15%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        प्रति वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      डेट फंड रिटर्न
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      औसत वार्षिकृत रिटर्न
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      6–8%
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
                      न्यूनतम निवेश
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      अधिकांश म्यूचुअल फंड
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹5,000
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        से आगे
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <LumpsumClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-lumpsum-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  निवेश टिप
                </strong>
                बाजार के शिखर पर बड़ी Lumpsum निवेश से बचें। बेहतर जोखिम प्रबंधन
                के लिए 6-12 महीनों में धीरे-धीरे डेट से इक्विटी में जाने के लिए
                STP (सिस्टमैटिक ट्रांसफर प्लान) का उपयोग करें।
              </AlertDescription>
            </Alert>

            {/* ✅ LUMPSUM FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Lumpsum निवेश फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      Lumpsum निवेश चक्रवृद्धि ब्याज के माध्यम से बढ़ता है।
                      भविष्य मूल्य की गणना कंपाउंड ब्याज फॉर्मूले का उपयोग करके
                      की जाती है:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        FV = P × (1 + r/n)<sup>n×t</sup>
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
                        <span>= भविष्य मूल्य (मैच्योरिटी पर कुल कोष)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= मूल राशि (₹ में Lumpsum निवेश)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = वार्षिक ब्याज दर (दशमलव के रूप में, जैसे 12% के लिए
                          0.12)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = प्रति वर्ष ब्याज चक्रवृद्धि की संख्या (1=वार्षिक,
                          4=तिमाही, 12=मासिक)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          t
                        </span>
                        <span>= निवेश अवधि वर्षों में</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>नोट:</strong> वार्षिक कंपाउंडिंग (अधिकांश
                        म्यूचुअल फंड) के लिए, n=1, इसलिए फॉर्मूला सरल हो जाता है
                        FV = P × (1 + r)<sup>t</sup>
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: Lumpsum निवेश (वार्षिक कंपाउंडिंग)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Lumpsum राशि (P):</strong>
                        </div>
                        <div>₹5,00,000</div>

                        <div>
                          <strong>अपेक्षित रिटर्न (r):</strong>
                        </div>
                        <div>12% प्रति वर्ष</div>

                        <div>
                          <strong>समय अवधि (t):</strong>
                        </div>
                        <div>10 वर्ष</div>

                        <div>
                          <strong>कंपाउंडिंग (n):</strong>
                        </div>
                        <div>वार्षिक (1)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          चरण 1: दर को दशमलव में बदलें
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 12 ÷ 100 = 0.12
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: (1 + r)<sup>t</sup> की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            (1 + 0.12)<sup>10</sup> = (1.12)<sup>10</sup>
                          </div>
                          <div>≈ 3.1058</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: भविष्य मूल्य की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>FV = 5,00,000 × 3.1058</div>
                          <div>FV = 15,52,900</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          भविष्य मूल्य:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ₹15,52,900
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>निवेश:</span>
                          <strong>₹5,00,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>धन अर्जित:</span>
                          <strong className="text-green-700">₹10,52,900</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>निवेश मल्टीपल:</span>
                          <strong className="text-lime-700">3.11x</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>पूर्ण रिटर्न:</span>
                          <strong className="text-blue-700">210.58%</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CAGR Explanation */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      CAGR (कंपाउंड एनुअल ग्रोथ रेट) को समझना
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        CAGR वह दर है जिस पर आपका निवेश सालाना बढ़ता है, निरंतर
                        वृद्धि मानते हुए। Lumpsum निवेश के लिए, CAGR अपेक्षित
                        रिटर्न दर के बराबर होता है।
                      </p>
                      <div className="p-3 bg-white rounded border border-purple-200 mt-2">
                        <div className="font-mono text-sm">
                          CAGR = [(FV / P)<sup>1/t</sup> - 1] × 100
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        हमारे उदाहरण में: CAGR = [(15,52,900 / 5,00,000)
                        <sup>1/10</sup> - 1] × 100 = 12%
                      </p>
                    </div>
                  </div>

                  {/* Power of Compounding */}
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      कंपाउंडिंग की शक्ति
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        Lumpsum निवेश का असली जादू चक्रवृद्धि ब्याज में निहित
                        है—आपके रिटर्न अपने स्वयं के रिटर्न उत्पन्न करते हैं।
                        देखें कि ₹5 लाख कैसे बढ़ता है:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs mt-2">
                        <li>वर्ष 5: ₹8.81 लाख (1.76x)</li>
                        <li>वर्ष 10: ₹15.53 लाख (3.11x)</li>
                        <li>वर्ष 15: ₹27.37 लाख (5.47x)</li>
                        <li>वर्ष 20: ₹48.23 लाख (9.65x)</li>
                        <li>वर्ष 25: ₹85.00 लाख (17x)</li>
                      </ul>
                      <p className="text-xs font-semibold text-amber-800 mt-2">
                        जितना अधिक समय तक आप निवेशित रहते हैं, कंपाउंडिंग उतनी
                        ही शक्तिशाली होती जाती है!
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    यह कैलकुलेटर मानक कंपाउंड ब्याज फॉर्मूले का उपयोग करता है।
                    वास्तविक म्यूचुअल फंड रिटर्न NAV परिवर्तन और बाजार प्रदर्शन
                    के आधार पर भिन्न होते हैं। पिछले रिटर्न भविष्य के परिणामों
                    की गारंटी नहीं देते।
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
                    मासिक निवेश से तुलना करना चाहते हैं?
                  </strong>

                  <Link
                    href="/hi/sip-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      नियमित निवेश कैसे काम करता है देखने के लिए हमारे SIP
                      कैलकुलेटर का प्रयास करें
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
                  {/* SECTION 1: WHAT IS LUMPSUM */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Lumpsum निवेश क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* SECTION 2: When to Use */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Lumpsum निवेश कब करें
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={whenToUseLumpsumContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #3: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-lumpsum-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* SECTION 3: Lumpsum vs SIP */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Lumpsum बनाम SIP: कौन बेहतर है?
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={lumpsumVsSIPContent} />
                    </div>
                  </section>

                  {/* COMPARISON TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Lumpsum बनाम SIP विस्तृत तुलना
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              कारक
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Lumpsum
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              SIP
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              निवेश मोड
                            </TableCell>
                            <TableCell className="text-slate-700">
                              एकमुश्त बड़ी राशि
                            </TableCell>
                            <TableCell className="text-slate-700">
                              मासिक किश्तें
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              पूंजी आवश्यक
                            </TableCell>
                            <TableCell className="text-slate-700">
                              पहले बड़ी राशि चाहिए
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              मासिक छोटी राशि
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              टाइमिंग जोखिम
                            </TableCell>
                            <TableCell className="text-slate-700">
                              उच्च (एकल प्रवेश बिंदु)
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              कम (रुपी कॉस्ट एवरेजिंग)
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              बुल मार्केट में रिटर्न
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              अधिक (पूर्ण एक्सपोजर)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              कम (क्रमिक प्रवेश)
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              बेयर मार्केट में रिटर्न
                            </TableCell>
                            <TableCell className="text-slate-700">
                              कम (उच्च कीमतों पर खरीदा)
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              अधिक (औसत नीचे)
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              अनुशासन आवश्यक
                            </TableCell>
                            <TableCell className="text-slate-700">
                              एकमुश्त निर्णय
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              मासिक बचत लागू करता है
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              सर्वश्रेष्ठ के लिए
                            </TableCell>
                            <TableCell className="text-slate-700">
                              अचानक धन, बाजार सुधार
                            </TableCell>
                            <TableCell className="text-slate-700">
                              नियमित वेतनभोगी निवेशक
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                      <p className="text-sm text-slate-700">
                        <strong>विशेषज्ञ फैसला:</strong> जब बाजार शिखर से 20%+
                        नीचे हो या आपके पास 10+ साल की अवधि हो तो Lumpsum का
                        उपयोग करें। चल रहे धन सृजन के लिए, SIP सुरक्षित और अधिक
                        अनुशासित है। कई निवेशक दोनों का उपयोग करते हैं: अचानक धन
                        के लिए Lumpsum, मासिक बचत के लिए SIP।
                      </p>
                    </div>
                  </section>

                  {/* TAXATION */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Lumpsum म्यूचुअल फंड निवेश पर कराधान
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={taxContent} />
                    </div>
                  </section>

                  {/* STP STRATEGY */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      STP: दोनों दुनिया का सबसे अच्छा
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        <strong>सिस्टमैटिक ट्रांसफर प्लान (STP)</strong> एक
                        हाइब्रिड रणनीति है जो Lumpsum और SIP के लाभों को जोड़ती
                        है:
                      </p>
                      <ol className="list-decimal pl-6 space-y-2 mt-4">
                        <li>
                          <strong>चरण 1:</strong> पूरी Lumpsum राशि को लिक्विड
                          या डेट फंड (कम जोखिम) में निवेश करें।
                        </li>
                        <li>
                          <strong>चरण 2:</strong> 6-12 महीनों में डेट से इक्विटी
                          फंड में मासिक निश्चित राशि स्थानांतरित करें।
                        </li>
                        <li>
                          <strong>चरण 3:</strong> यह प्रवेश मूल्य को औसत करता है
                          जबकि Lumpsum तैनात रहता है।
                        </li>
                      </ol>
                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                        <p className="text-sm text-slate-700">
                          <strong>उदाहरण:</strong> आपके पास ₹10 लाख हैं। लिक्विड
                          फंड में पूरी राशि निवेश करें। 10 महीनों के लिए मासिक
                          ₹1 लाख इक्विटी फंड में स्थानांतरित करें। आपका पैसा
                          पहले दिन से रिटर्न अर्जित करता है, जबकि आप इक्विटी
                          प्रवेश मूल्य को औसत करते हैं।
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* HOW TO USE */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      इस Lumpsum कैलकुलेटर का उपयोग कैसे करें
                    </h3>
                    <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                      <li>
                        अपनी एकमुश्त निवेश राशि दर्ज करें (न्यूनतम ₹5,000)।
                      </li>
                      <li>
                        अपेक्षित वार्षिक रिटर्न दर सेट करें (इक्विटी के लिए
                        8-12%, डेट के लिए 6-8%)।
                      </li>
                      <li>वर्षों में निवेश अवधि चुनें (न्यूनतम 1 वर्ष)।</li>
                      <li>
                        कंपाउंडिंग आवृत्ति चुनें (म्यूचुअल फंड के लिए वार्षिक
                        मानक है)।
                      </li>
                      <li>भविष्य मूल्य, धन अर्जित और CAGR तुरंत देखें।</li>
                      <li>
                        निवेश मल्टीपल और पूर्ण रिटर्न देखने के लिए{' '}
                        <strong>&quot;Advanced Metrics&quot;</strong> सक्षम
                        करें।
                      </li>
                      <li>
                        योजना चर्चाओं के लिए गणना सहेजें या WhatsApp के माध्यम
                        से साझा करें।
                      </li>
                    </ol>
                  </section>

                  {/* BEST FUNDS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Lumpsum निवेश के लिए सर्वश्रेष्ठ फंड श्रेणियां
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>लार्ज-कैप इंडेक्स फंड:</strong> कम जोखिम,
                          Nifty 50 या Sensex को ट्रैक करता है। 5+ वर्षों के लिए
                          आदर्श। अपेक्षित: 10-12% CAGR।
                        </li>
                        <li>
                          <strong>फ्लेक्सी-कैप / मल्टी-कैप फंड:</strong> बाजार
                          कैप में संतुलित एक्सपोजर। 7+ वर्षों के लिए आदर्श।
                          अपेक्षित: 12-14% CAGR।
                        </li>
                        <li>
                          <strong>वैल्यू फंड:</strong> बाजार सुधार के दौरान सबसे
                          अच्छा जब वैल्यूएशन कम हो। उच्च जोखिम। अपेक्षित: 14-16%
                          CAGR।
                        </li>
                        <li>
                          <strong>डेट फंड:</strong> अल्पकालिक लक्ष्यों (1-3
                          वर्ष) के लिए या STP पार्किंग के रूप में। अपेक्षित:
                          6-8% रिटर्न।
                        </li>
                        <li>
                          <strong>बैलेंस्ड एडवांटेज फंड:</strong> इक्विटी और डेट
                          के बीच गतिशील आवंटन। कम अस्थिरता। अपेक्षित: 10-12%
                          CAGR।
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित निवेश कैलकुलेटर
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/hi/sip-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                                📈
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                                  SIP कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  मासिक सिस्टमैटिक निवेश योजनाओं से रिटर्न की
                                  गणना करें।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                                  <span>अभी तुलना करें</span>
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
                                🏦
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  FD कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  गारंटीड ब्याज के साथ फिक्स्ड डिपॉजिट रिटर्न की
                                  गणना करें।
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
                id="hi-lumpsum-before-faq"
                type="leaderboard"
                lazyLoad={true}
              />
            </div>

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
                    defaultValue={lumpsumFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {lumpsumFaqs.map((faq) => (
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
              <AdSlot id="hi-lumpsum-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-lumpsum-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-lumpsum-sidebar" />

              {/* 🎯 AD #7: SIDEBAR BOTTOM */}
              <AdSlot
                id="hi-lumpsum-sidebar-bottom"
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
