import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link'; // ✅ CORRECT
import SWPClient from '@/app/swp-calculator/SWPClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import FAQSchema from '@/components/FAQSchema';
import { SWPSchemas } from '@/components/schemas/SWPSchemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Info,
  TrendingDown,
  ArrowRight,
  Wallet,
  PiggyBank,
} from 'lucide-react';
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
  title: 'SWP कैलकुलेटर 2026 – सिस्टमैटिक विड्रॉल प्लान कैलकुलेटर | Fincado',
  description:
    'SWP Calculator Hindi: म्यूचुअल फंड से सिस्टमैटिक विड्रॉल प्लान रिटर्न की गणना करें। निवेश से नियमित आय की योजना बनाएं, कोष स्थिरता जांचें, निकासी रणनीतियां और 2026 के लिए रिटायरमेंट आय योजना।',
  keywords: [
    'SWP Calculator Hindi',
    'Systematic Withdrawal Plan Hindi',
    'Monthly Income Plan Hindi',
    'Mutual Fund SWP Hindi',
    'Retirement Income Calculator Hindi',
    'SWP vs SIP Hindi',
    'Pension Calculator Hindi'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/swp-calculator/',
    languages: { 'en-IN': 'https://fincado.com/swp-calculator/' },
  },
  openGraph: {
    title: 'SWP कैलकुलेटर 2026 – सिस्टमैटिक निकासी की योजना बनाएं',
    description:
      'मुफ्त SWP कैलकुलेटर से म्यूचुअल फंड से नियमित आय की योजना बनाएं। कोष स्थिरता, मासिक निकासी और रिटायरमेंट आय रणनीतियों की गणना करें।',
    url: 'https://fincado.com/hi/swp-calculator/',
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

export default function HindiSWPPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    // Existing labels
    corpusExhausted: '⚠️ कोष समाप्त',
    corpusExhaustedNote: 'आपका कोष समाप्त हो जाएगा',
    exhaustedIn: 'वर्षों में',
    considerReducing:
      'निकासी राशि कम करने या अपेक्षित रिटर्न बढ़ाने पर विचार करें।',
    swpCalculator: 'SWP कैलकुलेटर',
    reset: 'रीसेट',
    initialInvestment: 'प्रारंभिक निवेश (₹)',
    withdrawalAmount: 'निकासी राशि (₹)',
    withdrawalFrequency: 'निकासी आवृत्ति',
    monthly: 'मासिक',
    quarterly: 'त्रैमासिक',
    yearly: 'वार्षिक',
    expectedReturn: 'अपेक्षित रिटर्न (% प्रति वर्ष)',
    timePeriod: 'समय अवधि (वर्ष)',
    remainingCorpus: 'शेष कोष',
    initialCorpus: 'प्रारंभिक कोष',
    totalWithdrawn: 'कुल निकासी',
    annualWithdrawal: 'वार्षिक निकासी',
    yearwiseBreakdown: 'वर्ष-दर-वर्ष विवरण',
    year: 'वर्ष',
    withdrawn: 'निकासी',
    inflationNote:
      'निश्चित निकासी मानता है। मुद्रास्फीति समय के साथ क्रय शक्ति कम करती है।',
    saveCalculation: 'गणना सहेजें',
    shareWhatsApp: 'WhatsApp पर साझा करें',
    savedSWPPlans: 'आपकी सहेजी गई SWP योजनाएं',
    clearAll: 'सभी साफ़ करें',
    corpus: 'कोष',
    forYears: 'के लिए',
    remaining: 'शेष',

    // ✅ NEW LABELS - ADD THESE:
    calculatorMode: 'कैलकुलेटर मोड',
    withdrawalMode: 'निकासी योजना',
    goalMode: 'कोष स्थायित्व',
    targetYears: 'लक्ष्य अवधि (वर्ष)',

    // Inflation labels
    inflationRate: 'मुद्रास्फीति दर (% प्रति वर्ष)',
    enableInflation: 'मुद्रास्फीति समायोजन सक्षम करें',
    inflationAdjusted: 'मुद्रास्फीति-समायोजित निकासी',
    inflationImpact: 'मुद्रास्फीति प्रभाव',

    // Corpus status labels
    corpusWillLast: 'कोष चलेगा',
    years: 'वर्ष',

    // Table column labels
    openingBalance: 'प्रारंभिक शेष',
    interestEarned: 'अर्जित ब्याज',
    closingBalance: 'समापन शेष',

    // Action labels
    downloadReport: 'रिपोर्ट डाउनलोड करें',
    calculationSaved: 'गणना सहेजी गई!',
    calculationDeleted: 'गणना हटाई गई!',
    allCleared: 'सभी गणनाएं साफ़ की गईं!',
    calculationLoaded: 'गणना लोड की गई!',
    reportDownloaded: 'रिपोर्ट डाउनलोड की गई!',

    // Chart label
    corpusDepletionChart: 'समय के साथ कोष में कमी',

    // Tax calculator labels
    taxImpact: 'कर प्रभाव कैलकुलेटर',
    showTaxCalculator: 'कर कैलकुलेटर दिखाएं',
    hideTaxCalculator: 'कर कैलकुलेटर छिपाएं',
    fundType: 'फंड प्रकार',
    equityFund: 'इक्विटी फंड',
    debtFund: 'डेट फंड',
    estimatedTaxLiability: 'अनुमानित कर देयता',
    taxOnWithdrawals: 'निकासी पर कर',
    netWithdrawal: 'शुद्ध निकासी (कर के बाद)',
    taxNote:
      'कर गणना अनुमानित है। वास्तविक कर होल्डिंग अवधि और आय स्लैब के आधार पर भिन्न हो सकता है।',

    // Comparison mode labels
    comparisonMode: 'निकासी रणनीतियों की तुलना करें',
    compareStrategies: 'दो SWP रणनीतियों की साथ-साथ तुलना करें',
    strategyA: 'रणनीति A - वर्तमान योजना',
    strategyB: 'रणनीति B - वैकल्पिक',
    whichBetter: 'कौन सी रणनीति बेहतर है?',
    lastLonger: 'अधिक समय तक चलेगा',
    moreIncome: 'अधिक आय',

    // Disclaimer
    returnsDisclaimer:
      'गणना उदाहरणात्मक है। वास्तविक रिटर्न बाजार स्थितियों के आधार पर भिन्न हो सकता है।',

    // Inflation toggle labels
    withInflation: 'मुद्रास्फीति के साथ',
    withoutInflation: 'मुद्रास्फीति के बिना',
  };

  const introContent = autoLinkContent(`
    <p>
      <strong>सिस्टमैटिक विड्रॉल प्लान (SWP)</strong> एक म्यूचुअल फंड सुविधा है जो 
      निवेशकों को अपने निवेश कोष से नियमित रूप से (मासिक, तिमाही या वार्षिक) एक निश्चित 
      राशि निकालने की अनुमति देती है। यह SIP के विपरीत है—नियमित रूप से निवेश करने के 
      बजाय, आप नियमित रूप से निकाल रहे हैं जबकि आपका शेष कोष बढ़ता रहता है।
    </p>
    <p class="mt-4">
      SWP <strong>रिटायरमेंट आय योजना</strong> के लिए आदर्श है, आपकी संचित संपत्ति से 
      नियमित नकदी प्रवाह बनाना, या पूरे निवेश को भुनाए बिना आवधिक खर्चों को पूरा करना। 
      आपका शेष कोष रिटर्न अर्जित करना जारी रखता है, संभावित रूप से विस्तारित अवधि के लिए 
      निकासी को बनाए रखता है।
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>नियमित आय:</strong> वेतन या पेंशन की तरह निश्चित मासिक/तिमाही आय प्राप्त करें।</li>
      <li><strong>कर दक्षता:</strong> केवल कैपिटल गेन्स पर कर लगता है, पूरी निकासी पर नहीं (ब्याज आय के विपरीत)।</li>
      <li><strong>लचीलापन:</strong> बिना जुर्माने के कभी भी निकासी राशि बदलें, रोकें या बंद करें।</li>
      <li><strong>रुपी कॉस्ट एवरेजिंग (रिवर्स):</strong> NAV अधिक होने पर कम यूनिट भुनाएं, कम होने पर अधिक।</li>
      <li><strong>तरलता:</strong> आपातकाल के लिए कभी भी शेष कोष तक पहुंच।</li>
      <li><strong>कंपाउंडिंग लाभ:</strong> शेष कोष बढ़ता रहता है और रिटर्न अर्जित करता रहता है।</li>
    </ul>
  `);

  const whenToUseContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>रिटायरमेंट:</strong> रिटायरमेंट कोष को मासिक पेंशन जैसी आय में बदलें।</li>
      <li><strong>प्रारंभिक सेवानिवृत्ति:</strong> पेंशन/सामाजिक सुरक्षा शुरू होने तक आय अंतराल को पाटें।</li>
      <li><strong>बच्चे की शिक्षा:</strong> सेमेस्टर शुल्क या खर्चों का भुगतान करने के लिए नियमित निकासी।</li>
      <li><strong>चिकित्सा खर्च:</strong> बुजुर्ग माता-पिता या उपचार के लिए आवर्ती चिकित्सा लागतों को पूरा करें।</li>
      <li><strong>पूरक आय:</strong> जीवन शैली उन्नयन या EMI भुगतान के लिए वेतन में जोड़ें।</li>
      <li><strong>आपातकालीन निधि:</strong> रिटर्न अर्जित करते हुए आपातकालीन कोष की क्रमिक तैनाती।</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      SWP कराधान FD ब्याज या डिविडेंड आय की तुलना में अधिक अनुकूल है क्योंकि केवल 
      प्रत्येक निकासी के <strong>कैपिटल गेन्स हिस्से</strong> पर कर लगता है, पूरी राशि पर नहीं:
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
    <p class="mt-4 font-semibold text-emerald-700">
      उदाहरण: यदि आप मासिक ₹50,000 निकालते हैं और केवल ₹10,000 कैपिटल गेन है, तो कर 
      केवल ₹10,000 पर लागू होता है, पूरे ₹50,000 पर नहीं।
    </p>
  `);

  // ✅ FAQ Items (Hindi) - Expanded to 10
  const swpFaqs = [
    {
      id: 'swp-faq-1',
      question: 'म्यूचुअल फंड में SWP क्या है?',
      answer:
        'SWP (सिस्टमैटिक विड्रॉल प्लान) आपको अपने म्यूचुअल फंड निवेश से नियमित रूप से (मासिक/तिमाही/वार्षिक) एक निश्चित राशि निकालने की अनुमति देता है। आपका शेष कोष रिटर्न अर्जित करना जारी रखता है, जो इसे रिटायरमेंट आय या नियमित नकदी प्रवाह आवश्यकताओं के लिए आदर्श बनाता है।',
    },
    {
      id: 'swp-faq-2',
      question: 'SWP डिविडेंड से कैसे अलग है?',
      answer:
        'SWP निश्चित निकासी प्रदान करता है जिसे आप नियंत्रित करते हैं, जबकि डिविडेंड अनिश्चित होते हैं और फंड द्वारा तय किए जाते हैं। SWP बेहतर कर दक्षता (केवल कैपिटल गेन्स पर कर) और कभी भी रोकने या बंद करने की लचीलापन प्रदान करता है।',
    },
    {
      id: 'swp-faq-3',
      question: 'क्या SWP टैक्स-फ्री है?',
      answer:
        'नहीं, लेकिन SWP कर-कुशल है। केवल प्रत्येक निकासी के कैपिटल गेन्स हिस्से पर कर लगता है, पूरी राशि पर नहीं। 1 वर्ष से अधिक रखे गए इक्विटी फंड के लिए: ₹1.25L/वर्ष से अधिक लाभ पर 12.5% LTCG। डेट फंड के लिए: आपके आयकर स्लैब के अनुसार लाभ पर कर।',
    },
    {
      id: 'swp-faq-4',
      question: 'क्या मैं SWP को कभी भी रोक या बंद कर सकता हूं?',
      answer:
        'हां! SWP अत्यधिक लचीला है। आप बिना किसी जुर्माने के निकासी को रोक सकते हैं, निकासी राशि बदल सकते हैं, या SWP को पूरी तरह से बंद कर सकते हैं। बस अपने फंड हाउस या AMC को संशोधन अनुरोध सबमिट करें।',
    },
    {
      id: 'swp-faq-5',
      question: 'सुरक्षित SWP निकासी दर क्या है?',
      answer:
        'व्यापक रूप से स्वीकृत "4% नियम" सुझाव देता है कि 25-30 वर्षों तक इसे बनाए रखने के लिए वार्षिक रूप से अपने कोष का 4% निकालें। भारतीय इक्विटी फंड (10-12% रिटर्न) के लिए, आप सुरक्षित रूप से सालाना 5-6% निकाल सकते हैं। डेट फंड (6-8% रिटर्न) के लिए, 3-4% निकासी दर पर टिके रहें।',
    },
    {
      id: 'swp-faq-6',
      question: 'SWP के लिए कौन से फंड सबसे अच्छे हैं?',
      answer:
        'नियमित आय के लिए: बैलेंस्ड एडवांटेज फंड, मल्टी-एसेट फंड, या लार्ज-कैप इक्विटी फंड (कम अस्थिरता)। अल्पकालिक (1-3 वर्ष) के लिए: डेट फंड या आर्बिट्रेज फंड। उच्च अस्थिरता के कारण स्मॉल-कैप या सेक्टोरल फंड से बचें।',
    },
    {
      id: 'swp-faq-7',
      question: '₹50,000 मासिक SWP के लिए कितना कोष चाहिए?',
      answer:
        '5% सुरक्षित निकासी दर का उपयोग करते हुए: आवश्यक कोष = (₹50,000 × 12) ÷ 0.05 = ₹1.2 करोड़। यह 10% रिटर्न और 5% वार्षिक निकासी मानता है, 25-30 वर्षों तक बनाए रखता है। कम निकासी दरें कोष जीवन को बढ़ाती हैं।',
    },
    {
      id: 'swp-faq-8',
      question: 'SWP बनाम एन्युटी - रिटायरमेंट के लिए कौन बेहतर है?',
      answer:
        'SWP लचीलापन, मुद्रास्फीति सुरक्षा (कोष बढ़ता है) और तरलता प्रदान करता है। एन्युटी आजीवन गारंटीड आय प्रदान करती है लेकिन कोष पहुंच या मुद्रास्फीति सुरक्षा नहीं। कई सेवानिवृत्त लोग दोनों का उपयोग करते हैं: बुनियादी जरूरतों के लिए एन्युटी, जीवन शैली खर्चों के लिए SWP।',
    },
    {
      id: 'swp-faq-9',
      question: 'SWP के दौरान बाजार क्रैश होने पर क्या होता है?',
      answer:
        'बाजार सुधार अस्थायी रूप से आपके कोष मूल्य को कम करते हैं। यदि आप समान राशि निकालना जारी रखते हैं, तो आप कोष को तेजी से समाप्त कर देंगे। रणनीति: डेट फंड में 2-3 वर्ष के खर्च रखें, क्रैश के दौरान इक्विटी SWP कम करें, या गतिशील निकासी का उपयोग करें (कम वर्षों में कम निकालें)।',
    },
    {
      id: 'swp-faq-10',
      question: 'क्या मैं SIP निवेश से SWP शुरू कर सकता हूं?',
      answer:
        'हां! एक बार जब आपका SIP कोष आरामदायक स्तर (जैसे, ₹20-30 लाख) तक पहुंच जाता है, तो आप SWP शुरू कर सकते हैं। कई निवेशक आय के लिए परिपक्व फंड से SWP लेते हुए ग्रोथ फंड में SIP जारी रखते हैं।',
    }
  ];

  return (
    <>
      <CalculatorSchema
        name="SWP Calculator Hindi"
        description="Calculate systematic withdrawal plan returns from mutual funds in Hindi. Plan retirement income and check corpus sustainability."
        url="https://fincado.com/hi/swp-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'SWP कैलकुलेटर',
            url: 'https://fincado.com/hi/swp-calculator/',
          }
        ]}
      />

      <FAQSchema
        faqs={swpFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <SWPSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="SWP कैलकुलेटर - सिस्टमैटिक विड्रॉल प्लान" />
            <LanguageToggle path="/swp-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-green-100 text-lime-700">
              <TrendingDown className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                SWP कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                रिटायरमेंट आय के लिए सिस्टमैटिक निकासी की योजना बनाएं
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              एसडब्ल्यूपी (SWP) का उपयोग करके अपने निवेश को मासिक वेतन में
              बदलें। जानें कि आप हर महीने कितना पैसा निकाल सकते हैं और आपका{' '}
              <strong>फंड कितने साल तक चलेगा</strong>।
            </p>
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-swp-top" type="leaderboard" />
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
                      सुरक्षित निकासी दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      वार्षिक (25-30 वर्ष स्थिरता के लिए)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      4–5%
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
                      SWP पर कर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      केवल कैपिटल गेन्स पर, पूरी निकासी पर नहीं
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      12.5%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        LTCG
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      न्यूनतम कोष
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹25,000 मासिक आय के लिए (5% नियम)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹60L
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
            <SWPClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-swp-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  रिटायरमेंट प्लानिंग टिप
                </strong>
                4% नियम का पालन करें: 25-30 वर्षों तक बनाए रखने के लिए सालाना
                अपने कोष का 4% निकालें। बाजार क्रैश के दौरान इक्विटी बेचने से
                बचने के लिए डेट फंड में 2-3 वर्ष के खर्च रखें।
              </AlertDescription>
            </Alert>

            {/* ✅ SWP FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    SWP गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      SWP गणनाओं में महीने-दर-महीने आपके कोष को ट्रैक करना,
                      रिटर्न लागू करना और निकासी घटाना शामिल है। प्रत्येक निकासी
                      के बाद शेष राशि रिटर्न अर्जित करना जारी रखती है:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-lg font-serif">
                          Balance<sub>month</sub> = (Balance<sub>prev</sub> × (1
                          + r)) - W
                        </div>
                        <div className="text-sm text-slate-600">
                          प्रत्येक महीने के लिए पुनरावृत्ति रूप से लागू
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">जहां:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-28 font-mono font-semibold">
                          Balance<sub>month</sub>
                        </span>
                        <span>= वर्तमान महीने के अंत में कोष शेष</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-28 font-mono font-semibold">
                          Balance<sub>prev</sub>
                        </span>
                        <span>= पिछले महीने के अंत में कोष शेष</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-28 font-mono font-semibold">
                          r
                        </span>
                        <span>= मासिक रिटर्न दर (वार्षिक दर ÷ 12 ÷ 100)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-28 font-mono font-semibold">
                          W
                        </span>
                        <span>= महीने के लिए निकासी राशि</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                      <p className="text-xs text-slate-700">
                        <strong>नोट:</strong> साधारण ब्याज गणनाओं के विपरीत, SWP
                        को महीने-दर-महीने पुनरावृत्ति गणना की आवश्यकता होती है
                        क्योंकि निकासी उस कोष को कम करती है जो रिटर्न अर्जित
                        करता है।
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: मासिक SWP गणना
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>प्रारंभिक कोष:</strong>
                        </div>
                        <div>₹10,00,000</div>

                        <div>
                          <strong>मासिक निकासी:</strong>
                        </div>
                        <div>₹10,000</div>

                        <div>
                          <strong>वार्षिक रिटर्न:</strong>
                        </div>
                        <div>10% प्रति वर्ष</div>

                        <div>
                          <strong>समय अवधि:</strong>
                        </div>
                        <div>10 वर्ष (120 महीने)</div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">
                          चरण 1: मासिक रिटर्न दर की गणना करें
                        </strong>
                        <div className="ml-4 font-mono text-sm">
                          r = 10% ÷ 12 ÷ 100 = 0.008333
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: महीना 1 गणना
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            रिटर्न के बाद शेष = 10,00,000 × (1 + 0.008333) =
                            10,08,333
                          </div>
                          <div>
                            निकासी के बाद शेष = 10,08,333 - 10,000 = 9,98,333
                          </div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: महीना 2 गणना
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            रिटर्न के बाद शेष = 9,98,333 × (1 + 0.008333) =
                            10,06,651
                          </div>
                          <div>
                            निकासी के बाद शेष = 10,06,651 - 10,000 = 9,96,651
                          </div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <div className="text-xs text-slate-600 italic">
                          यह प्रक्रिया सभी 120 महीनों के लिए दोहराई जाती है...
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          10 वर्षों के बाद:
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>कुल निकासी:</span>
                            <strong className="text-lime-700">
                              ₹12,00,000
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>शेष कोष:</span>
                            <strong className="text-emerald-700">
                              ₹8,33,945
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-300">
                        <p className="text-xs text-slate-600">
                          <strong>मुख्य अंतर्दृष्टि:</strong> 10 वर्षों में ₹12L
                          निकालने के बावजूद, आपके पास अभी भी ₹8.34L शेष है
                          क्योंकि कोष ने सालाना 10% रिटर्न अर्जित किया।
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4% Rule Explanation */}
                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <h4 className="font-semibold text-lime-900 mb-2 flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      सुरक्षित निकासी के लिए 4% नियम
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        &quot;4% नियम&quot; सुझाव देता है कि 25-30 वर्षों तक
                        बनाए रखने के लिए अपने प्रारंभिक कोष का सालाना 4%
                        (मुद्रास्फीति के लिए समायोजित) निकालें। यह 7-10% रिटर्न
                        मानते हुए ऐतिहासिक डेटा पर आधारित है।
                      </p>
                      <div className="p-3 bg-white rounded border border-lime-200 mt-2">
                        <div className="font-mono text-sm space-y-1">
                          <div>सुरक्षित वार्षिक निकासी = कोष × 4%</div>
                          <div>
                            उदाहरण: ₹1 करोड़ × 4% = ₹4 लाख/वर्ष (₹33,333/महीना)
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        भारतीय इक्विटी फंड (10-12% रिटर्न) के लिए, आप सुरक्षित
                        रूप से 5% निकासी दर तक बढ़ा सकते हैं।
                      </p>
                    </div>
                  </div>

                  {/* Corpus Exhaustion Warning */}
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>⚠️</span>
                      आपका कोष कब समाप्त होगा?
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        जब मासिक निकासी मासिक रिटर्न से अधिक हो जाती है तो आपका
                        कोष समाप्त हो जाता है। उच्च निकासी दरें कोष को तेजी से
                        समाप्त करती हैं:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs mt-2">
                        <li>3% निकासी दर: कोष बढ़ता है (हमेशा के लिए टिकाऊ)</li>
                        <li>5% निकासी दर: कोष 25-30 वर्ष तक टिकता है</li>
                        <li>
                          7% निकासी दर: कोष 15-20 वर्षों में समाप्त होता है
                        </li>
                        <li>
                          10% निकासी दर: कोष 10-12 वर्षों में समाप्त होता है
                        </li>
                      </ul>
                      <p className="text-xs font-semibold text-amber-800 mt-2">
                        💡 रणनीति: कम निकासी दरों से शुरू करें। बाजार प्रदर्शन
                        के आधार पर धीरे-धीरे बढ़ाएं।
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    यह कैलकुलेटर महीने-दर-महीने पुनरावृत्ति गणना का उपयोग करता
                    है। वास्तविक रिटर्न बाजार की स्थितियों के आधार पर भिन्न होते
                    हैं। पिछला प्रदर्शन भविष्य के परिणामों की गारंटी नहीं देता।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* PROMO BOX */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <PiggyBank className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    रिटायरमेंट कोष बना रहे हैं?
                  </strong>
                  <Link
                    href="/hi/sip-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      अपनी धन संचय यात्रा की योजना बनाने के लिए SIP कैलकुलेटर का
                      उपयोग करें
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
                  {/* SECTION 1: WHAT IS SWP */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      सिस्टमैटिक विड्रॉल प्लान (SWP) क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* SECTION 2: Benefits */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SWP के लाभ
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #3: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-swp-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* SECTION 3: When to Use */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SWP का उपयोग कब करें
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={whenToUseContent} />
                    </div>
                  </section>

                  {/* COMPARISON TABLE */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SWP बनाम डिविडेंड बनाम FD ब्याज तुलना
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              कारक
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              SWP
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              डिविडेंड
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              FD ब्याज
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              नियमितता
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              निश्चित (आप नियंत्रित करें)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              अनिश्चित (फंड तय करता है)
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              निश्चित (गारंटीड)
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              कराधान
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              केवल कैपिटल गेन्स पर
                            </TableCell>
                            <TableCell className="text-slate-700">
                              स्लैब के अनुसार कर
                            </TableCell>
                            <TableCell className="text-slate-700">
                              स्लैब के अनुसार कर
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              लचीलापन
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              कभी भी बदलें/रोकें/बंद करें
                            </TableCell>
                            <TableCell className="text-slate-700">
                              कोई नियंत्रण नहीं
                            </TableCell>
                            <TableCell className="text-slate-700">
                              मैच्योरिटी तक निश्चित
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              कोष वृद्धि
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              शेष राशि बढ़ती है
                            </TableCell>
                            <TableCell className="text-slate-700">
                              मूलधन निवेशित रहता है
                            </TableCell>
                            <TableCell className="text-slate-700">
                              मूलधन निश्चित
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              मुद्रास्फीति सुरक्षा
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              निकासी बढ़ा सकते हैं
                            </TableCell>
                            <TableCell className="text-slate-700">
                              अनिश्चित डिविडेंड
                            </TableCell>
                            <TableCell className="text-slate-700">
                              निश्चित रिटर्न
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              तरलता
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              कभी भी पूर्ण पहुंच
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              कभी भी पूर्ण पहुंच
                            </TableCell>
                            <TableCell className="text-slate-700">
                              जल्दी निकासी पर जुर्माना
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              सर्वश्रेष्ठ के लिए
                            </TableCell>
                            <TableCell className="text-slate-700">
                              रिटायरमेंट आय, लचीलापन
                            </TableCell>
                            <TableCell className="text-slate-700">
                              निष्क्रिय आय चाहने वाले
                            </TableCell>
                            <TableCell className="text-slate-700">
                              जोखिम-विरोधी, गारंटीड आय
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                      <p className="text-sm text-slate-700">
                        <strong>विशेषज्ञ फैसला:</strong> SWP डिविडेंड और FD
                        ब्याज की तुलना में बेहतर लचीलापन और कर दक्षता प्रदान
                        करता है। कोष वृद्धि क्षमता के साथ अनुमानित नकदी प्रवाह
                        चाहने वाले सेवानिवृत्त लोगों के लिए आदर्श।
                      </p>
                    </div>
                  </section>

                  {/* TAXATION */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SWP पर कराधान
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={taxContent} />
                    </div>
                  </section>

                  {/* SWP STRATEGY */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      रिटायरमेंट के लिए इष्टतम SWP रणनीति
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        टिकाऊ रिटायरमेंट आय के लिए इस सिद्ध रणनीति का पालन करें:
                      </p>
                      <ol className="list-decimal pl-6 space-y-2 mt-4">
                        <li>
                          <strong>कोष बनाएं:</strong> कमाई के वर्षों के दौरान
                          SIP/lumpsum के माध्यम से रिटायरमेंट कोष जमा करें। अपने
                          वार्षिक खर्चों के 25-30x को लक्षित करें।
                        </li>
                        <li>
                          <strong>एसेट एलोकेशन:</strong> इक्विटी फंड (विकास) में
                          60%, डेट फंड (स्थिरता) में 40% रखें। सालाना
                          पुनर्संतुलन करें।
                        </li>
                        <li>
                          <strong>SWP शुरू करें:</strong> डेट फंड से 4-5%
                          वार्षिक निकासी दर से शुरू करें। यह नियमित खर्चों को
                          कवर करता है।
                        </li>
                        <li>
                          <strong>आपातकालीन बफर:</strong> लिक्विड/अल्ट्रा-शॉर्ट
                          डेट फंड में 2-3 वर्ष के खर्च बनाए रखें। क्रैश के दौरान
                          इक्विटी बेचने से बचें।
                        </li>
                        <li>
                          <strong>गतिशील निकासी:</strong> अच्छे वर्षों में
                          (बाजार 20%+ ऊपर), अधिक निकालें। खराब वर्षों में,
                          निकासी कम करें या आपातकालीन बफर का उपयोग करें।
                        </li>
                        <li>
                          <strong>वार्षिक समीक्षा:</strong> मुद्रास्फीति के लिए
                          सालाना 5-7% निकासी बढ़ाएं। कोष स्वास्थ्य की निगरानी
                          करें।
                        </li>
                      </ol>
                    </div>
                  </section>

                  {/* HOW TO USE */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      इस SWP कैलकुलेटर का उपयोग कैसे करें
                    </h3>
                    <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                      <li>
                        अपना प्रारंभिक निवेश कोष (संचित संपत्ति) दर्ज करें।
                      </li>
                      <li>
                        प्रति महीने/तिमाही/वर्ष वांछित निकासी राशि सेट करें।
                      </li>
                      <li>निकासी आवृत्ति चुनें (नियमित आय के लिए मासिक)।</li>
                      <li>
                        अपेक्षित वार्षिक रिटर्न दर दर्ज करें (संतुलित फंड के लिए
                        8-10%, इक्विटी के लिए 10-12%)।
                      </li>
                      <li>
                        वह समय अवधि चुनें जिसके लिए आप निकालने की योजना बना रहे
                        हैं।
                      </li>
                      <li>शेष कोष और कुल निकाली गई राशि देखें।</li>
                      <li>
                        पहले 5 वर्षों में कोष की कमी देखने के लिए{' '}
                        <strong>&quot;वर्ष-वार ब्रेकडाउन&quot;</strong> सक्षम
                        करें।
                      </li>
                      <li>
                        यदि कोष जल्दी समाप्त होता है, तो निकासी कम करें या
                        अपेक्षित रिटर्न बढ़ाएं।
                      </li>
                    </ol>
                  </section>

                  {/* BEST FUNDS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SWP के लिए सर्वश्रेष्ठ म्यूचुअल फंड
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>बैलेंस्ड एडवांटेज फंड:</strong> इक्विटी/डेट के
                          बीच गतिशील आवंटन। कम अस्थिरता। सेवानिवृत्त लोगों के
                          लिए आदर्श। अपेक्षित: 9-11% रिटर्न।
                        </li>
                        <li>
                          <strong>मल्टी-एसेट फंड:</strong> इक्विटी, डेट, सोने
                          में निवेश। विविध। 5+ वर्ष SWP के लिए अच्छा। अपेक्षित:
                          10-12% रिटर्न।
                        </li>
                        <li>
                          <strong>लार्ज-कैप इक्विटी फंड:</strong> स्थिर, कम
                          अस्थिरता। दीर्घकालिक SWP (10+ वर्ष) के लिए उपयुक्त।
                          अपेक्षित: 10-12% रिटर्न।
                        </li>
                        <li>
                          <strong>डेट फंड (शॉर्ट ड्यूरेशन):</strong> रूढ़िवादी
                          निवेशकों या अल्पकालिक SWP (1-3 वर्ष) के लिए। अपेक्षित:
                          6-8% रिटर्न।
                        </li>
                        <li>
                          <strong>आर्बिट्रेज फंड:</strong> अत्यंत कम जोखिम,
                          इक्विटी के रूप में कर-कुशल। वरिष्ठ नागरिकों के लिए
                          उपयुक्त। अपेक्षित: 5-7% रिटर्न।
                        </li>
                      </ul>
                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                        <p className="text-sm text-slate-700">
                          <strong>प्रो टिप:</strong> SWP के लिए स्मॉल-कैप या
                          सेक्टर फंड जैसे उच्च-अस्थिरता फंड से बचें। बाजार में
                          गिरावट के दौरान अस्थिरता कोष को तेजी से समाप्त कर सकती
                          है।
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित रिटायरमेंट कैलकुलेटर
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
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
                                  सिस्टमैटिक मासिक निवेश के साथ रिटायरमेंट कोष
                                  बनाएं।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                                  <span>कोष बनाएं</span>
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
                                💰
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  Lumpsum कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  एकमुश्त रिटायरमेंट कोष निवेश से रिटर्न की गणना
                                  करें।
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
                id="hi-swp-before-faq"
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
                    defaultValue={swpFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {swpFaqs.map((faq) => (
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
              <AdSlot id="hi-swp-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-swp-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-swp-sidebar" />

              {/* 🎯 AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-swp-sidebar-bottom" type="box" lazyLoad={true} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
