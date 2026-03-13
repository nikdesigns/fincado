import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RetirementCalculatorClient from '@/app/retirement-calculator/RetirementCalculatorClient';
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
import {
  Info,
  Palmtree,
  ArrowRight,
  TrendingUp,
  Shield,
  Target,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'रिटायरमेंट कैलकुलेटर 2026 – पेंशन और कॉर्पस प्लानिंग | Fincado',
  description:
    'रिटायरमेंट कैलकुलेटर हिंदी में: महंगाई समायोजित खर्च, लक्ष्य कॉर्पस और मासिक SIP की गणना करें। 60 की उम्र में आरामदायक रिटायरमेंट की योजना बनाएं।',
  keywords: [
    'Retirement Calculator Hindi',
    'Pension Calculator Hindi',
    'Retirement Planning India Hindi',
    'Inflation Adjusted Retirement Hindi',
    'रिटायरमेंट कैलकुलेटर',
    'पेंशन कैलकुलेटर',
    'रिटायरमेंट प्लानिंग',
    'कॉर्पस कैलकुलेटर',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/retirement-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/retirement-calculator/',
    },
  },
  openGraph: {
    title: 'रिटायरमेंट कैलकुलेटर 2026 – अपने भविष्य को सुरक्षित करें',
    description:
      'मुफ्त रिटायरमेंट कैलकुलेटर: कॉर्पस, मासिक SIP और सेवानिवृत्ति के बाद की आय की योजना बनाएं। महंगाई-समायोजित खर्चों की गणना करें।',
    url: 'https://fincado.com/hi/retirement-calculator/',
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

export default function HindiRetirementPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    // Existing labels
    highSIPWarning: 'उच्च SIP आवश्यक',
    highSIPMessage:
      'आपकी आवश्यक मासिक SIP काफी अधिक है। सेवानिवृत्ति की आयु बढ़ाने, खर्च कम करने, या वर्तमान बचत बढ़ाने पर विचार करें।',
    retirementPlanning: 'सेवानिवृत्ति योजना कैलकुलेटर',
    reset: 'रीसेट',
    currentAge: 'वर्तमान आयु (वर्ष)',
    retirementAge: 'सेवानिवृत्ति आयु (वर्ष)',
    currentMonthlyExpense: 'वर्तमान मासिक खर्च (₹)',
    currentSavings: 'वर्तमान बचत (₹)',
    showAdvancedRates: 'उन्नत सेटिंग्स दिखाएं',
    hideAdvancedRates: 'उन्नत सेटिंग्स छुपाएं',
    inflationRate: 'सामान्य मुद्रास्फीति (% प्रति वर्ष)',
    preRetirementReturn: 'सेवानिवृत्ति पूर्व रिटर्न (% प्रति वर्ष)',
    postRetirementReturn: 'सेवानिवृत्ति बाद रिटर्न (% प्रति वर्ष)',
    targetRetirementCorpus: 'लक्षित सेवानिवृत्ति कोष',
    retirementYears: 'साल की सेवानिवृत्ति',
    monthlySIPRequired: 'आवश्यक मासिक SIP',
    perMonth: '/माह',
    forNextYears: 'अगले',
    expenseAtRetirement: 'सेवानिवृत्ति पर खर्च',
    monthInflationAdjusted: '/माह (मुद्रास्फीति समायोजित)',
    currentSavingsFV: 'वर्तमान बचत भविष्य मूल्य',
    ofTarget: 'लक्ष्य का',
    investmentBreakdown: 'निवेश विवरण',
    gapToFill: 'भरने योग्य अंतर',
    totalSIPInvestment: 'कुल SIP निवेश',
    expectedReturns: 'अपेक्षित रिटर्न',
    retirementNote:
      'गणना आपकी जीवन प्रत्याशा और जीवनशैली धारणाओं पर आधारित है।',
    savePlan: 'योजना सहेजें',
    shareWhatsApp: 'WhatsApp पर साझा करें',
    savedRetirementPlans: 'आपकी सहेजी गई सेवानिवृत्ति योजनाएं',
    clearAll: 'सभी साफ़ करें',
    age: 'आयु',
    corpus: 'कोष',
    sip: 'SIP',
    expense: 'खर्च',
    savings: 'बचत',
    returns: 'रिटर्न',
    sipRequiredMessage: 'आपको निवेश करना होगा',
    savingsSufficient: 'आपकी वर्तमान बचत पर्याप्त है!',

    // ✅ NEW LABELS - ADD THESE:
    calculatorMode: 'कैलकुलेटर मोड',
    basicPlanning: 'बुनियादी योजना',
    comprehensivePlanning: 'व्यापक योजना',

    // Life expectancy
    lifeExpectancy: 'जीवन प्रत्याशा (वर्ष)',

    // Healthcare
    healthcareInflation: 'स्वास्थ्य देखभाल मुद्रास्फीति (% प्रति वर्ष)',
    healthcareCosts: 'स्वास्थ्य देखभाल लागत',
    estimatedHealthcare: 'अनुमानित स्वास्थ्य लागत',
    perYear: '/वर्ष',

    // Additional income
    additionalIncome: 'अतिरिक्त सेवानिवृत्ति आय',
    pensionIncome: 'मासिक पेंशन (₹)',
    rentalIncome: 'मासिक किराया आय (₹)',
    otherIncome: 'अन्य मासिक आय (₹)',
    monthlyIncomeTotal: 'कुल मासिक आय',
    netMonthlyShortfall: 'शुद्ध मासिक कमी',
    adjustedCorpusNeeded: 'समायोजित कोष आवश्यक',

    // Emergency fund
    emergencyFund: 'आपातकालीन निधि',
    emergencyFundNote: '6 महीने के खर्च की सिफारिश',

    // Comparison mode
    comparisonMode: 'सेवानिवृत्ति परिदृश्यों की तुलना करें',
    compareScenarios: 'दो सेवानिवृत्ति रणनीतियों की साथ-साथ तुलना करें',
    scenarioA: 'परिदृश्य A - वर्तमान योजना',
    scenarioB: 'परिदृश्य B - वैकल्पिक',
    whichBetter: 'कौन सा परिदृश्य बेहतर है?',
    lowerSIP: 'कम SIP आवश्यक',
    higherCorpus: 'उच्च कोष',

    // Chart and table labels
    yearByYearProjection: 'वर्ष-दर-वर्ष प्रक्षेपण',
    year: 'वर्ष',
    corpusGrowth: 'समय के साथ कोष वृद्धि',
    annualSIP: 'वार्षिक SIP',
    corpusValue: 'कोष मूल्य',

    // Action labels
    downloadReport: 'रिपोर्ट डाउनलोड करें',
    calculationSaved: 'सेवानिवृत्ति योजना सहेजी गई!',
    calculationDeleted: 'गणना हटाई गई!',
    allCleared: 'सभी योजनाएं साफ़ की गईं!',
    calculationLoaded: 'योजना लोड की गई!',
    reportDownloaded: 'रिपोर्ट डाउनलोड की गई!',

    // Disclaimer
    returnsDisclaimer:
      'गणना उदाहरणात्मक है। वास्तविक रिटर्न बाजार स्थितियों के आधार पर भिन्न हो सकता है।',

    // Tax labels
    taxImpact: 'कर प्रभाव अनुमान',
    showTaxEstimate: 'कर अनुमान दिखाएं',
    hideTaxEstimate: 'कर अनुमान छुपाएं',
    estimatedAnnualTax: 'अनुमानित वार्षिक कर',
    taxNote:
      'कर अनुमान अनुमानित हैं और वास्तविक आय और कटौतियों के आधार पर भिन्न हो सकते हैं।',
  };

  // ✅ FAQ Items (Hindi) - Expanded to 10
  const retireFaqs = [
    {
      id: 'retire-faq-1',
      question: 'आरामदायक रिटायरमेंट के लिए मुझे कितने कॉर्पस की आवश्यकता है?',
      answer:
        'एक सामान्य नियम आपके वार्षिक खर्च का 25-30 गुना होना है। उदाहरण के लिए, यदि आपको रिटायरमेंट पर ₹50,000/माह (₹6 लाख/वर्ष) की आवश्यकता है, तो ₹1.5-1.8 करोड़ कॉर्पस का लक्ष्य रखें। यह 4% सुरक्षित निकासी दर के साथ 25-30 वर्षों की आरामदायक रिटायरमेंट सुनिश्चित करता है।',
    },
    {
      id: 'retire-faq-2',
      question: 'रिटायरमेंट के लिए 4% नियम क्या है?',
      answer:
        '4% नियम सुझाव देता है कि अपने रिटायरमेंट कॉर्पस का 4% सालाना (महंगाई के लिए समायोजित) निकालें ताकि 25-30 वर्षों तक बना रहे। यदि कॉर्पस ₹1 करोड़ है, तो पहले वर्ष ₹4 लाख निकालें, फिर हर साल महंगाई के अनुसार बढ़ाएं। यह आय की जरूरतों और कॉर्पस की दीर्घायु को संतुलित करता है।',
    },
    {
      id: 'retire-faq-3',
      question: 'मुझे रिटायरमेंट के लिए मासिक कितनी बचत करनी चाहिए?',
      answer:
        'अपनी मासिक आय का 15-20% रिटायरमेंट के लिए बचाने का लक्ष्य रखें। ₹50,000 कमाने वाले 30 वर्षीय को रिटायरमेंट फंड में ₹7,500-₹10,000 मासिक निवेश करना चाहिए। अधिकतम चक्रवृद्धि के लिए जल्दी शुरू करें - 25 बनाम 35 पर निवेश करने से आपका रिटायरमेंट कॉर्पस दोगुना हो सकता है।',
    },
    {
      id: 'retire-faq-4',
      question:
        'मुझे रिटायरमेंट के लिए NPS या म्यूचुअल फंड में निवेश करना चाहिए?',
      answer:
        'दोनों के फायदे हैं। NPS टैक्स लाभ (80CCD(1B) के तहत ₹50,000 अतिरिक्त), कम लागत (0.1%), लेकिन 60 तक 60% लॉक-इन प्रदान करता है। म्यूचुअल फंड लचीलापन, उच्च रिटर्न क्षमता प्रदान करते हैं, लेकिन कोई वार्षिकी जनादेश नहीं। आदर्श: दोनों का उपयोग करें - टैक्स बचत के लिए NPS, वृद्धि के लिए इक्विटी MF।',
    },
    {
      id: 'retire-faq-5',
      question: 'अर्ली रिटायरमेंट (FIRE) क्या है?',
      answer:
        'FIRE (Financial Independence, Retire Early) का मतलब पारंपरिक उम्र (60) से पहले (45-50) रिटायर होना है। इसके लिए आक्रामक बचत (आय का 50-70%), न्यूनतम जीवनशैली, और बड़े कॉर्पस (खर्च का 30-40x) की आवश्यकता होती है। यह उच्च कमाने वालों में लोकप्रिय है जो जल्दी वित्तीय स्वतंत्रता चाहते हैं।',
    },
    {
      id: 'retire-faq-6',
      question: 'महंगाई रिटायरमेंट प्लानिंग को कैसे प्रभावित करती है?',
      answer:
        'महंगाई रिटायरमेंट को काफी प्रभावित करती है। 6% महंगाई पर, आज का ₹50,000/माह 30 वर्षों में ₹2.87 लाख/माह हो जाता है। आपके रिटायरमेंट कॉर्पस को इसके लिए जिम्मेदार होना चाहिए। शुरुआती वर्षों में महंगाई को मात देने के लिए महंगाई-अनुक्रमित निवेश (इक्विटी, रियल एस्टेट) का उपयोग करें।',
    },
    {
      id: 'retire-faq-7',
      question: 'रिटायरमेंट के लिए सर्वोत्तम निवेश विकल्प क्या हैं?',
      answer:
        'आयु-आधारित आवंटन: 20-35 वर्ष: इक्विटी MFs (80%), PPF (20%)। 35-50 वर्ष: इक्विटी MFs (60%), NPS (20%), डेट MFs (20%)। 50-60 वर्ष: डेट MFs (50%), NPS (30%), इक्विटी (20%)। 60+: मासिक आय के लिए डेट/हाइब्रिड फंड से SWP।',
    },
    {
      id: 'retire-faq-8',
      question: 'क्या मुझे बीमा से रिटायरमेंट पेंशन योजना खरीदनी चाहिए?',
      answer:
        'आम तौर पर अनुशंसित नहीं। पारंपरिक पेंशन योजनाएं (LIC, आदि) उच्च शुल्क और अलचीलापन के साथ 5-6% रिटर्न देती हैं। इक्विटी MFs (12%) + NPS (10%) में निवेश करना और SWP का उपयोग करके अपनी खुद की पेंशन बनाना बेहतर है। आपको उच्च रिटर्न और लचीलापन मिलता है।',
    },
    {
      id: 'retire-faq-9',
      question: 'मुझे रिटायरमेंट के लिए कितना मेडिकल कॉर्पस रखना चाहिए?',
      answer:
        'मेडिकल खर्च रिटायरमेंट कॉर्पस का 25-30% है। 60 पर, स्वास्थ्य सेवा के लिए अलग से ₹30-40 लाख रखें (10-15% चिकित्सा महंगाई के साथ बढ़ता है)। मेडिकल झटकों से रिटायरमेंट कॉर्पस की रक्षा के लिए व्यापक स्वास्थ्य बीमा (₹10-20L कवर) + गंभीर बीमारी (₹50L) खरीदें।',
    },
    {
      id: 'retire-faq-10',
      question: 'क्या मैं ₹5 करोड़ के साथ 50 पर रिटायर हो सकता हूं?',
      answer:
        'हाँ, यदि खर्च ₹1.5-2 लाख/माह है। 4% नियम का उपयोग करते हुए, ₹5 करोड़ 25-30 वर्षों के लिए सुरक्षित रूप से ₹20 लाख/वर्ष (₹1.67L/माह) उत्पन्न करता है। लेकिन महंगाई के लिए जिम्मेदार - यह राशि क्रय शक्ति में कम हो जाएगी। महंगाई को मात देने के लिए शुरू में 60% इक्विटी में रखें।',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'रिटायरमेंट कैलकुलेटर',
            url: 'https://fincado.com/hi/retirement-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="रिटायरमेंट प्लानिंग कैलकुलेटर"
        description="खर्च, महंगाई और निवेश रिटर्न के आधार पर आवश्यक रिटायरमेंट कॉर्पस की गणना करें। मासिक SIP की योजना बनाएं और आरामदायक रिटायरमेंट सुनिश्चित करें।"
        url="https://fincado.com/hi/retirement-calculator/"
      />

      <FAQSchema
        faqs={retireFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="रिटायरमेंट प्लानिंग कैलकुलेटर" />
            <LanguageToggle path="/retirement-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-teal-100 text-emerald-700">
              <Palmtree className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                रिटायरमेंट प्लानिंग कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                अपने रिटायरमेंट कॉर्पस की योजना बनाएं और वित्तीय स्वतंत्रता
                प्राप्त करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              <strong>रिटायरमेंट प्लानिंग</strong> यह सुनिश्चित करने के बारे में
              है कि आपके पास कमाई बंद करने के बाद अपनी जीवनशैली बनाए रखने के लिए
              पर्याप्त वित्तीय कॉर्पस हो। एक अच्छी तरह से योजनाबद्ध रिटायरमेंट
              कॉर्पस महंगाई, जीवन प्रत्याशा, चिकित्सा खर्च और वांछित जीवनशैली के
              लिए जिम्मेदार होता है ताकि यह सुनिश्चित हो सके कि आप अपनी बचत से
              अधिक जीवित न रहें।
            </p>
            <p className="mt-4">
              यह रिटायरमेंट कैलकुलेटर आपके वर्तमान खर्चों, महंगाई दर और अपेक्षित
              रिटर्न के आधार पर <strong>आवश्यक लक्ष्य कॉर्पस</strong> निर्धारित
              करने में मदद करता है। यह आपकी वर्तमान बचत और रिटायरमेंट लक्ष्य के
              बीच अंतर को पाटने के लिए आवश्यक मासिक SIP की गणना करता है, जो तनाव
              मुक्त सेवानिवृत्ति के बाद के जीवन को सुनिश्चित करता है।
            </p>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-retirement-top" type="leaderboard" />
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
                      अनुशंसित कॉर्पस
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      वार्षिक खर्च × गुणक
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      25-30x
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        खर्च
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      सुरक्षित निकासी दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      कॉर्पस से वार्षिक निकासी
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      4%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        प्रति वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-amber-700 mb-1">
                      योजना अवधि
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      सेवानिवृत्ति के बाद की अवधि
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      25-30
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <RetirementCalculatorClient labels={hindiLabels} />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-retirement-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  योजना सुझाव
                </strong>
                रिटायरमेंट के लिए जल्दी निवेश शुरू करें। ₹10,000/माह निवेश करने
                वाले 25 वर्षीय के पास 35 पर शुरू करने की तुलना में 2x कॉर्पस
                होगा। चक्रवृद्धि लंबी अवधि में सबसे अच्छा काम करती है।
              </AlertDescription>
            </Alert>

            {/* ✅ RETIREMENT FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    रिटायरमेंट कॉर्पस गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      रिटायरमेंट प्लानिंग में महंगाई के लिए समायोजित भविष्य के
                      खर्चों की गणना करना शामिल है, फिर वार्षिकी फॉर्मूला का
                      उपयोग करके आवश्यक कॉर्पस निर्धारित करना:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold text-slate-700 mb-2">
                          चरण 1: भविष्य का मासिक खर्च
                        </div>
                        <div className="text-lg font-serif">
                          FE = CE × (1 + i)<sup>n</sup>
                        </div>
                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          चरण 2: आवश्यक रिटायरमेंट कॉर्पस
                        </div>
                        <div className="text-lg font-serif">
                          कॉर्पस = FE × 12 × [1 - (1 + r)<sup>-t</sup>] / r
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">जहाँ:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          FE
                        </span>
                        <span>
                          = रिटायरमेंट पर भविष्य का मासिक खर्च (महंगाई-समायोजित)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          CE
                        </span>
                        <span>= वर्तमान मासिक खर्च (आज का मूल्य ₹ में)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          i
                        </span>
                        <span>= मासिक महंगाई दर (वार्षिक दर ÷ 12 ÷ 100)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = रिटायरमेंट तक महीने (रिटायर होने के वर्ष × 12)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = वास्तविक रिटर्न दर [(1 + सेवानिवृत्ति के बाद रिटर्न)
                          / (1 + महंगाई) - 1]
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          t
                        </span>
                        <span>
                          = रिटायरमेंट अवधि वर्षों में (आमतौर पर 25-30 वर्ष)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                      <p className="text-xs text-slate-700">
                        <strong>नोट:</strong> वास्तविक रिटर्न क्रय
                        शक्ति-समायोजित कॉर्पस आवश्यकताओं की गणना करने के लिए
                        महंगाई के लिए सेवानिवृत्ति के बाद के रिटर्न को समायोजित
                        करता है।
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: 30 की उम्र में रिटायरमेंट प्लानिंग
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>वर्तमान आयु:</strong>
                        </div>
                        <div>30 वर्ष</div>

                        <div>
                          <strong>रिटायरमेंट आयु:</strong>
                        </div>
                        <div>60 वर्ष</div>

                        <div>
                          <strong>रिटायर होने के वर्ष:</strong>
                        </div>
                        <div>30 वर्ष (360 महीने)</div>

                        <div>
                          <strong>वर्तमान मासिक खर्च:</strong>
                        </div>
                        <div>₹50,000</div>

                        <div>
                          <strong>महंगाई दर:</strong>
                        </div>
                        <div>6% प्रति वर्ष</div>

                        <div>
                          <strong>सेवानिवृत्ति के बाद रिटर्न:</strong>
                        </div>
                        <div>8% प्रति वर्ष</div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">
                          चरण 1: मासिक महंगाई दर की गणना करें
                        </strong>
                        <div className="ml-4 font-mono text-sm">
                          i = 6% ÷ 12 ÷ 100 = 0.005
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: भविष्य के मासिक खर्च की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FE = 50,000 × (1 + 0.005)<sup>360</sup>
                          </div>
                          <div>FE = 50,000 × 6.023</div>
                          <div>FE ≈ ₹3,01,150</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: वास्तविक रिटर्न दर की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>r = (1 + 0.08) / (1 + 0.06) - 1</div>
                          <div>r = 1.08 / 1.06 - 1</div>
                          <div>r ≈ 0.0189 (1.89%)</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 4: रिटायरमेंट पर वार्षिक खर्च की गणना करें
                        </strong>
                        <div className="ml-4 font-mono text-sm">
                          वार्षिक खर्च = 3,01,150 × 12 = ₹36,13,800
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 5: रिटायरमेंट कॉर्पस की गणना करें (25 वर्ष)
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            कॉर्पस = 36,13,800 × [1 - (1.0189)<sup>-25</sup>] /
                            0.0189
                          </div>
                          <div>कॉर्पस = 36,13,800 × [1 - 0.6288] / 0.0189</div>
                          <div>कॉर्पस = 36,13,800 × 19.646</div>
                          <div>कॉर्पस ≈ ₹7,09,95,000</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          लक्ष्य रिटायरमेंट कॉर्पस:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ₹7.10 करोड़
                        </div>
                        <div className="text-xs text-slate-600 mt-2">
                          यह कॉर्पस रिटायरमेंट के बाद 25 वर्षों के लिए ₹3.01
                          लाख/माह प्रदान करेगा
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-300">
                        <p className="text-xs text-slate-600">
                          <strong>मुख्य अंतर्दृष्टि:</strong> आपका आज का
                          ₹50,000/माह खर्च 6% महंगाई के कारण 30 वर्षों में ₹3
                          लाख/माह हो जाता है। प्रारंभिक योजना और आक्रामक SIP
                          आपको आराम से यह कॉर्पस बनाने में मदद कर सकता है।
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SIP Calculation */}
                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <h4 className="font-semibold text-lime-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      आवश्यक मासिक SIP गणना
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        एक बार जब आप लक्ष्य कॉर्पस जान लेते हैं, तो वर्तमान बचत
                        और लक्ष्य के बीच अंतर को पाटने के लिए आवश्यक मासिक SIP
                        की गणना करें:
                      </p>
                      <div className="p-3 bg-white rounded border border-lime-200 mt-2">
                        <div className="font-mono text-sm space-y-1">
                          <div>
                            अंतर = लक्ष्य कॉर्पस - वर्तमान बचत का भविष्य मूल्य
                          </div>
                          <div className="mt-2">
                            SIP = अंतर / [((1 + r)<sup>n</sup> - 1) / r × (1 +
                            r)]
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        जहाँ r = मासिक पूर्व-सेवानिवृत्ति रिटर्न दर, n =
                        रिटायरमेंट तक महीने
                      </p>
                    </div>
                  </div>

                  {/* 25x vs 30x Rule */}
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      25x नियम बनाम 30x नियम
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        <strong>25x नियम:</strong> वार्षिक खर्च को 25 से गुणा
                        करें। 4% निकासी दर और 25 साल की रिटायरमेंट मानता है।
                        सामान्य रिटायरमेंट (60+) मध्यम जीवनशैली के लिए उपयुक्त।
                      </p>
                      <p>
                        <strong>30x नियम:</strong> वार्षिक खर्च को 30 से गुणा
                        करें। 3.33% निकासी दर और 30+ साल की रिटायरमेंट मानता है।
                        प्रारंभिक रिटायरमेंट (50-55) या लंबी जीवन प्रत्याशा के
                        लिए बेहतर।
                      </p>
                      <p className="text-xs font-semibold text-amber-800 mt-2">
                        💡 उदाहरण: ₹6L वार्षिक खर्च के लिए → 25x = ₹1.5 करोड़ |
                        30x = ₹1.8 करोड़
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    यह कैलकुलेटर मानक वित्तीय फॉर्मूले का उपयोग करता है।
                    वास्तविक रिटायरमेंट जरूरतें जीवनशैली, चिकित्सा खर्च और
                    महंगाई दरों के आधार पर भिन्न होती हैं। व्यक्तिगत योजना के
                    लिए वित्तीय सलाहकार से परामर्श करें।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    रिटायरमेंट आय बनाना चाहते हैं?
                  </strong>
                  <Link
                    href="/hi/swp-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      अपने कॉर्पस से व्यवस्थित निकासी की योजना बनाने के लिए SWP
                      कैलकुलेटर का उपयोग करें
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  रिटायरमेंट प्लानिंग महत्वपूर्ण क्यों है
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>महंगाई का कटाव:</strong> आज का ₹50,000, 6% महंगाई
                      पर 30 वर्षों में केवल ₹18,000 के बराबर होगा
                    </li>
                    <li>
                      <strong>लंबी जीवन प्रत्याशा:</strong> भारतीय अब 70-80 वर्ष
                      जीते हैं; 20-30 साल की रिटायरमेंट की योजना बनाएं
                    </li>
                    <li>
                      <strong>नियमित आय नहीं:</strong> वेतन बंद हो जाता है लेकिन
                      खर्च जारी रहते हैं (चिकित्सा, जीवनशैली, यात्रा)
                    </li>
                    <li>
                      <strong>बढ़ते स्वास्थ्य लागत:</strong> चिकित्सा महंगाई
                      10-15% है, सामान्य महंगाई से बहुत अधिक
                    </li>
                    <li>
                      <strong>क्रय शक्ति का नुकसान:</strong> फिक्स्ड डिपॉज़िट और
                      पेंशन समय के साथ मूल्य खो देते हैं
                    </li>
                    <li>
                      <strong>निर्भरता जोखिम:</strong> बच्चों पर बोझ न डालें;
                      वित्तीय स्वतंत्रता बनाए रखें
                    </li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  रिटायरमेंट प्लानिंग लक्ष्य
                </h3>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>
                    एक ठोस रिटायरमेंट योजना कई वित्तीय लक्ष्यों को कवर करनी
                    चाहिए:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>आवश्यक खर्च:</strong> आवास (किराया/रखरखाव), भोजन,
                      उपयोगिताओं, परिवहन - कॉर्पस का 40%
                    </li>
                    <li>
                      <strong>स्वास्थ्य सेवा:</strong> चिकित्सा बीमा, नियमित
                      जांच, दवाएं, सर्जरी - कॉर्पस का 25%
                    </li>
                    <li>
                      <strong>जीवनशैली और मनोरंजन:</strong> यात्रा, शौक,
                      मनोरंजन, भोजन - कॉर्पस का 20%
                    </li>
                    <li>
                      <strong>आपातकालीन फंड:</strong> अप्रत्याशित खर्च, घर की
                      मरम्मत, पारिवारिक समर्थन - कॉर्पस का 10%
                    </li>
                    <li>
                      <strong>विरासत योजना:</strong> बच्चों के लिए संपत्ति, दान,
                      उपहार - कॉर्पस का 5%
                    </li>
                  </ul>
                  <p className="mt-4 font-semibold text-emerald-700">
                    <strong>अंगूठे का नियम:</strong> लक्ष्य रिटायरमेंट कॉर्पस
                    रिटायरमेंट आयु पर आपके वार्षिक खर्च का 25-30 गुना होना चाहिए
                    (महंगाई के लिए समायोजित)।
                  </p>
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="hi-retirement-mid-content"
                  type="square"
                  label="विज्ञापन"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  रिटायरमेंट के लिए आयु-आधारित निवेश रणनीतियाँ
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <p>
                    रिटायरमेंट कॉर्पस निर्माण के लिए जीवनचक्र-आधारित निवेश
                    दृष्टिकोण की आवश्यकता होती है:
                  </p>
                  <h4 className="font-semibold text-slate-900 mt-4">
                    आयु 20-35 (संचय चरण):
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>आक्रामक आवंटन: 80-90% इक्विटी, 10-20% डेट</li>
                    <li>
                      वृद्धि पर ध्यान: स्मॉल-कैप, मिड-कैप, अंतर्राष्ट्रीय फंड
                    </li>
                    <li>अधिकतम चक्रवृद्धि लाभ के लिए जल्दी SIP शुरू करें</li>
                  </ul>
                  <h4 className="font-semibold text-slate-900 mt-4">
                    आयु 35-50 (विकास चरण):
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>मध्यम आवंटन: 60-70% इक्विटी, 30-40% डेट</li>
                    <li>
                      स्थिरता के लिए लार्ज-कैप और संतुलित फंड में शिफ्ट करें
                    </li>
                    <li>
                      वेतन वृद्धि के साथ SIP सालाना बढ़ाएं (10-15% टॉप-अप)
                    </li>
                  </ul>
                  <h4 className="font-semibold text-slate-900 mt-4">
                    आयु 50-60 (संरक्षण चरण):
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>रूढ़िवादी आवंटन: 30-40% इक्विटी, 60-70% डेट</li>
                    <li>पूंजी संरक्षण और स्थिर रिटर्न पर ध्यान दें</li>
                    <li>डेट फंड, PPF, NPS, डेट म्यूचुअल फंड में जाएं</li>
                  </ul>
                  <h4 className="font-semibold text-slate-900 mt-4">
                    आयु 60+ (वितरण चरण):
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>सुरक्षा आवंटन: 20-30% इक्विटी, 70-80% डेट</li>
                    <li>
                      मासिक आय के लिए SWP (व्यवस्थित निकासी योजना) का उपयोग करें
                    </li>
                    <li>आपात स्थिति के लिए तरल फंड में 2-3 साल के खर्च रखें</li>
                  </ul>
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  रिटायरमेंट निवेश विकल्प तुलना
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">विकल्प</TableHead>
                        <TableHead className="text-left">रिटर्न</TableHead>
                        <TableHead className="text-left">टैक्स लाभ</TableHead>
                        <TableHead className="text-left">तरलता</TableHead>
                        <TableHead className="text-left">
                          सबसे अच्छा है
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          इक्विटी म्यूचुअल फंड
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          12-15% प्रति वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          LTCG 12.5% ({'>'}1 वर्ष)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          उच्च (T+3 दिन)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          आयु 20-50, आक्रामक वृद्धि
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          NPS (नेशनल पेंशन)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          10-12% प्रति वर्ष
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹2L (80C + 80CCD)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कम (60 तक लॉक)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          वेतनभोगी, टैक्स बचत
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          PPF (पब्लिक प्रोविडेंट)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% प्रति वर्ष
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (₹1.5L/वर्ष)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          मध्यम (15 वर्ष लॉक)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          रूढ़िवादी, टैक्स-फ्री
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          EPF (कर्मचारी भविष्य निधि)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          8.25% प्रति वर्ष
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (₹2.5L तक)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कम (रिटायरमेंट तक)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          वेतनभोगी कर्मचारी
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          वरिष्ठ नागरिक योजनाएं
                        </TableCell>
                        <TableCell className="text-slate-700">
                          8-9% प्रति वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          80C के तहत ₹1.5L
                        </TableCell>
                        <TableCell className="text-slate-700">
                          मध्यम (5 वर्ष लॉक)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          60+ आयु, सुरक्षित रिटर्न
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          रियल एस्टेट
                        </TableCell>
                        <TableCell className="text-slate-700">
                          8-10% प्रति वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          LTCG 20% ({'>'}2 वर्ष)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          बहुत कम (महीने)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          उच्च पूंजी, विविधीकरण
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          पेंशन योजनाएं (बीमा)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          5-6% प्रति वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          80C के तहत ₹1.5L
                        </TableCell>
                        <TableCell className="text-slate-700">
                          बहुत कम (60 तक)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          अनुशंसित नहीं (कम रिटर्न)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>विशेषज्ञ मत:</strong> सर्वोत्तम रिटायरमेंट रणनीति
                    इक्विटी MFs (वृद्धि), NPS (टैक्स बचत), और PPF/EPF (सुरक्षा)
                    को जोड़ती है। खराब रिटर्न और उच्च शुल्क के कारण पारंपरिक
                    बीमा पेंशन योजनाओं से बचें।
                  </p>
                </div>
              </section>

              {/* Common Mistakes */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  रिटायरमेंट प्लानिंग में सामान्य गलतियाँ जिनसे बचना चाहिए
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>देर से शुरू करना:</strong> रिटायरमेंट प्लानिंग में
                      10 साल की देरी से खोए हुए चक्रवृद्धि के कारण आपका कॉर्पस
                      50% कम हो सकता है।
                    </li>
                    <li>
                      <strong>महंगाई को कम आंकना:</strong> 6-7% महंगाई के लिए
                      जिम्मेदार न होने का मतलब है कि आपका कॉर्पस तेजी से क्रय
                      शक्ति खो देगा।
                    </li>
                    <li>
                      <strong>स्वास्थ्य सेवा को नज़रअंदाज़ करना:</strong>{' '}
                      चिकित्सा खर्च 10-15% महंगाई हैं - अलग ₹30-50L चिकित्सा
                      कॉर्पस रखें।
                    </li>
                    <li>
                      <strong>संपत्ति पर अधिक निर्भरता:</strong> रियल एस्टेट
                      अतरल है - संपूर्ण रिटायरमेंट कॉर्पस संपत्ति में न डालें।
                    </li>
                    <li>
                      <strong>कोई आपातकालीन फंड नहीं:</strong> बाजार दुर्घटनाओं
                      के दौरान संकट बिक्री से बचने के लिए तरल फंड में 2-3 साल के
                      खर्च रखें।
                    </li>
                    <li>
                      <strong>बीमा पेंशन योजनाएं खरीदना:</strong> पारंपरिक पेंशन
                      योजनाएं उच्च शुल्क के साथ 5-6% रिटर्न देती हैं - उनसे
                      बचें।
                    </li>
                    <li>
                      <strong>पोर्टफोलियो रीबैलेंसिंग नहीं:</strong> पूंजी की
                      रक्षा के लिए रिटायरमेंट के पास आते समय इक्विटी से डेट में
                      शिफ्ट करें।
                    </li>
                    <li>
                      <strong>निकासी में महंगाई को नज़रअंदाज़ करना:</strong>{' '}
                      क्रय शक्ति बनाए रखने के लिए सालाना 5-6% निकासी बढ़ाएं।
                    </li>
                  </ul>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  इस रिटायरमेंट कैलकुलेटर का उपयोग कैसे करें
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    अपनी वर्तमान आयु और वांछित रिटायरमेंट आयु (आमतौर पर 60) दर्ज
                    करें।
                  </li>
                  <li>
                    वर्तमान मासिक खर्च दर्ज करें (आज का मूल्य, भविष्य का नहीं)।
                  </li>
                  <li>
                    वर्तमान रिटायरमेंट बचत दर्ज करें (EPF + PPF + MF + स्टॉक +
                    FD)।
                  </li>
                  <li>
                    महंगाई (6%), पूर्व-सेवानिवृत्ति रिटर्न (12%), और
                    सेवानिवृत्ति के बाद रिटर्न (8%) को समायोजित करने के लिए{' '}
                    <strong>&quot;उन्नत दरें दिखाएं&quot;</strong> पर क्लिक
                    करें।
                  </li>
                  <li>
                    25 साल की आरामदायक रिटायरमेंट के लिए आवश्यक लक्ष्य
                    रिटायरमेंट कॉर्पस देखें।
                  </li>
                  <li>
                    वर्तमान बचत और लक्ष्य के बीच अंतर को पाटने के लिए आवश्यक
                    मासिक SIP जांचें।
                  </li>
                  <li>
                    रिटायरमेंट पर खर्च (महंगाई-समायोजित) और बचत भविष्य मूल्य की
                    समीक्षा करें।
                  </li>
                  <li>
                    अपनी योजना सहेजें या परिवार/सलाहकार के साथ चर्चा के लिए
                    WhatsApp पर साझा करें।
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित रिटायरमेंट प्लानिंग टूल
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
                              अपना रिटायरमेंट कॉर्पस बनाने के लिए आवश्यक मासिक
                              SIP की गणना करें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>कॉर्पस बनाएं</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/hi/swp-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              SWP कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              मासिक रिटायरमेंट आय के लिए व्यवस्थित निकासी की
                              योजना बनाएं।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>निकासी की योजना बनाएं</span>
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
              <AdSlot
                id="hi-retirement-before-faq"
                type="leaderboard"
                lazyLoad
              />
            </div>

            {/* FAQs */}
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
                    defaultValue={retireFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {retireFaqs.map((faq) => (
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
              <AdSlot id="hi-retirement-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-retirement-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-retirement-sidebar-mid" />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-retirement-sidebar-bottom" type="box" lazyLoad />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
