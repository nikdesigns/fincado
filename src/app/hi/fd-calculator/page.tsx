import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FDClient from '@/app/fd-calculator/FDClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import FAQSchema from '@/components/FAQSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ShieldCheck,
  ArrowRight,
  Building2,
  TrendingUp,
  Info,
} from 'lucide-react';
import { FDSchemas } from '@/components/schemas/FDSchemas';
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
  title: 'FD कैलकुलेटर 2026 – फिक्स्ड डिपॉजिट ब्याज और रिटर्न | Fincado',
  description:
    'FD (Fixed Deposit) कैलकुलेटर हिंदी में: जानें कि आपकी जमा राशि पर बैंक आपको कितना ब्याज देगा। परिपक्वता राशि और टीडीएस की गणना करें।',
  keywords: [
    'FD Calculator Hindi',
    'Fixed Deposit Calculator Hindi',
    'FD Interest Rates 2026',
    'FD Maturity Calculator',
    'फिक्स्ड डिपॉजिट कैलकुलेटर',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/fd-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/fd-calculator/',
    },
  },
  openGraph: {
    title: 'FD कैलकुलेटर – सुरक्षित निवेश और निश्चित रिटर्न',
    description:
      'मुफ्त टूल: FD मैच्योरिटी राशि, कुल ब्याज और टीडीएस की सटीक गणना करें।',
    url: 'https://fincado.com/hi/fd-calculator/',
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

export default function HindiFDPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    // Basic fields
    principal: 'मूलधन राशि',
    rate: 'ब्याज दर (% प्रति वर्ष)',
    years: 'अवधि (वर्ष)',
    months: 'अतिरिक्त महीने',
    freq: 'चक्रवृद्धि आवृत्ति',
    maturity: 'परिपक्वता राशि',
    totalPrincipal: 'मूल राशि',
    interest: 'कुल ब्याज',

    // Frequency options
    quarterly: 'तिमाही',
    monthly: 'मासिक',
    halfYearly: 'अर्धवार्षिक',
    yearly: 'वार्षिक',

    // Display labels
    maturityAmount: 'परिपक्वता राशि',
    invested: 'निवेशित',
    interestEarned: 'अर्जित ब्याज',

    // Senior citizen
    seniorCitizen: 'वरिष्ठ नागरिक (60+ वर्ष)',
    seniorBonus: 'अतिरिक्त 0.5% ब्याज दर प्राप्त करें',

    // Input labels
    depositAmount: 'जमा राशि (₹)',
    interestRate: 'ब्याज दर (% प्रति वर्ष)',
    tenure: 'अवधि (वर्ष)',
    additionalMonths: 'अतिरिक्त महीने',
    compoundingFreq: 'चक्रवृद्धि आवृत्ति',
    mostCommon: 'सबसे आम',

    // Results
    totalInterest: 'कुल ब्याज',
    estimatedTDS: 'अनुमानित TDS (10%):',
    netInterest: 'शुद्ध ब्याज (TDS के बाद):',
    afterTDS: 'TDS के बाद',

    // Actions
    saveCalculation: 'गणना सहेजें',
    shareWhatsApp: 'WhatsApp पर साझा करें',
    compareBankRates: 'बैंक दरों की तुलना करें',
    hideBankRates: 'बैंक दरें छुपाएं',

    // Bank rates section
    popularBankRates: 'लोकप्रिय बैंक FD दरें (फरवरी 2026)',
    bankTenure: 'अवधि:',
    general: 'सामान्य:',
    senior: 'वरिष्ठ:',
    applyRate: 'दर लागू करें',
    ratesNote:
      'दरें सांकेतिक हैं और बैंक, अवधि और जमा राशि के अनुसार भिन्न होती हैं। वर्तमान दरों के लिए अपने बैंक से संपर्क करें। वरिष्ठ नागरिक दरें आमतौर पर 0.25-0.5% अतिरिक्त प्रदान करती हैं।',

    // Saved calculations
    savedFDPlans: 'आपकी सहेजी गई FD योजनाएं',
    clearAll: 'सभी साफ़ करें',
    compounding: 'चक्रवृद्धि:',
  };

  const introContent = autoLinkContent(`
    <p>
      <strong>फिक्स्ड डिपॉजिट (FD)</strong> एक कम जोखिम वाला निवेश साधन है 
      जो बैंकों और NBFC द्वारा पेश किया जाता है जहां आप एक निश्चित अवधि के लिए 
      एकमुश्त राशि जमा करते हैं और पूर्व-निर्धारित ब्याज दर पर रिटर्न पाते हैं।
    </p>
    <p class="mt-4">
      शेयर बाजार निवेश के विपरीत, FD <strong>गारंटीड रिटर्न</strong> और 
      पूंजी सुरक्षा प्रदान करता है, जो इसे रूढ़िवादी निवेशकों और वरिष्ठ नागरिकों 
      के लिए पसंदीदा विकल्प बनाता है।
    </p>
  `);

  const typesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>नियमित FD:</strong> 7 दिनों से 10 वर्षों तक लचीली अवधि के साथ मानक फिक्स्ड डिपॉजिट।</li>
      <li><strong>टैक्स सेवर FD:</strong> 5 साल की लॉक-इन अवधि के साथ धारा 80C लाभ ₹1.5 लाख तक।</li>
      <li><strong>वरिष्ठ नागरिक FD:</strong> 60 वर्ष से अधिक उम्र के निवेशकों के लिए अतिरिक्त 0.25-0.5% ब्याज।</li>
      <li><strong>कम्युलेटिव FD:</strong> अधिकतम रिटर्न के लिए मैच्योरिटी पर चक्रवृद्धि और भुगतान किया गया ब्याज।</li>
      <li><strong>नॉन-कम्युलेटिव FD:</strong> नियमित आय के लिए मासिक/तिमाही/वार्षिक ब्याज भुगतान।</li>
      <li><strong>फ्लेक्सी FD:</strong> स्वचालित स्वीप सुविधा के साथ बचत और FD का संयोजन।</li>
    </ul>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>पूंजी सुरक्षा:</strong> प्रति बैंक ₹5 लाख तक की FD DICGC द्वारा बीमित होती है।</li>
      <li><strong>गारंटीड रिटर्न:</strong> जमा के समय निर्धारित निश्चित ब्याज दर, बाजार की अस्थिरता से अप्रभावित।</li>
      <li><strong>तरलता:</strong> न्यूनतम जुर्माने (आमतौर पर 0.5-1%) के साथ समय से पहले निकासी की अनुमति।</li>
      <li><strong>टैक्स बचत:</strong> 5 साल की टैक्स सेवर FD ₹1.5 लाख तक धारा 80C कटौती के लिए योग्य।</li>
      <li><strong>लोन सुविधा:</strong> कम ब्याज दरों पर FD के खिलाफ लोन (जमा मूल्य का 90% तक) प्राप्त करें।</li>
      <li><strong>लचीली अवधि:</strong> अपने वित्तीय लक्ष्यों के आधार पर 7 दिनों से 10 वर्षों तक चुनें।</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      फिक्स्ड डिपॉजिट पर अर्जित ब्याज आपके आयकर स्लैब के अनुसार <strong>पूरी तरह से कर योग्य</strong> है। 
      इसे "अन्य स्रोतों से आय" के तहत आपकी वार्षिक आय में जोड़ा जाता है।
    </p>
    <ul class="list-disc pl-5 space-y-2 list-inside mt-2">
      <li><strong>TDS कटौती:</strong> यदि ब्याज एक वर्ष में ₹40,000 से अधिक है तो बैंक 10% TDS काटते हैं (वरिष्ठ नागरिकों के लिए ₹50,000)।</li>
      <li><strong>फॉर्म 15G/15H:</strong> यदि आपकी कुल आय कर योग्य सीमा से कम है तो TDS से बचने के लिए आप बैंक को ये फॉर्म जमा कर सकते हैं।</li>
      <li><strong>उच्च TDS:</strong> यदि बैंक को PAN प्रदान नहीं किया गया है तो 20% TDS।</li>
      <li><strong>अग्रिम कर:</strong> यदि TDS अपर्याप्त है, तो जुर्माने से बचने के लिए आपको अग्रिम कर का भुगतान करना पड़ सकता है।</li>
    </ul>
  `);

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'fd-faq-1',
      question: 'क्या FD के ब्याज पर टैक्स लगता है?',
      answer:
        'हाँ। फिक्स्ड डिपॉजिट से मिलने वाला ब्याज पूरी तरह से टैक्सेबल होता है। अगर आपका ब्याज एक साल में ₹40,000 (वरिष्ठ नागरिकों के लिए ₹50,000) से ज्यादा है, तो बैंक 10% TDS काटता है।',
    },
    {
      id: 'fd-faq-2',
      question: 'क्या मैं अपनी FD समय से पहले तोड़ सकता हूँ?',
      answer:
        'हाँ, ज्यादातर बैंक समय से पहले निकासी (Premature Withdrawal) की अनुमति देते हैं, लेकिन वे ब्याज दर पर 0.5% – 1% की पेनल्टी लगा सकते हैं। ध्यान दें कि 5 साल की टैक्स सेवर FD को किसी भी परिस्थिति में जल्दी नहीं निकाला जा सकता।',
    },
    {
      id: 'fd-faq-3',
      question:
        'कम्युलेटिव (Cumulative) और नॉन-कम्युलेटिव FD में क्या अंतर है?',
      answer:
        'कम्युलेटिव FD में ब्याज हर तिमाही मूलधन में जुड़ता रहता है और आपको मैच्योरिटी पर एकमुश्त राशि मिलती है (चक्रवृद्धि के माध्यम से उच्च रिटर्न)। नॉन-कम्युलेटिव FD में ब्याज आपको हर महीने, तिमाही, अर्ध-वार्षिक या वार्षिक आपके खाते में मिल जाता है, जो नियमित आय की जरूरतों के लिए उपयुक्त है।',
    },
    {
      id: 'fd-faq-4',
      question: 'क्या FD एक सुरक्षित निवेश है?',
      answer:
        'हाँ, यह बहुत सुरक्षित माना जाता है। DICGC के तहत प्रत्येक बैंक में ₹5 लाख तक की जमा राशि (मूलधन + ब्याज) पूरी तरह से बीमित होती है। हालांकि, रिटर्न हमेशा इक्विटी-आधारित निवेशों की तुलना में महंगाई को नहीं हरा सकता।',
    },
    {
      id: 'fd-faq-5',
      question: 'वरिष्ठ नागरिक FD दर लाभ क्या है?',
      answer:
        'वरिष्ठ नागरिक (60+ वर्ष) को बैंक के आधार पर FD पर अतिरिक्त 0.25% से 0.5% ब्याज मिलता है। कुछ बैंक 0.75% तक अतिरिक्त देते हैं। यह लाभ कॉर्पोरेट FD को छोड़कर अधिकांश FD योजनाओं पर उपलब्ध है।',
    },
    {
      id: 'fd-faq-6',
      question: 'क्या मैं अपनी FD पर लोन ले सकता हूं?',
      answer:
        'हां, अधिकांश बैंक जमा मूल्य के 90-95% तक FD के खिलाफ लोन देते हैं। ब्याज दर आमतौर पर FD दर से 1-2% अधिक होती है। यह समय से पहले निकासी से बेहतर विकल्प है क्योंकि आपकी FD ब्याज अर्जित करना जारी रखती है।',
    },
    {
      id: 'fd-faq-7',
      question: 'कौन सी कंपाउंडिंग आवृत्ति उच्चतम रिटर्न देती है?',
      answer:
        'मासिक चक्रवृद्धि उच्चतम रिटर्न देती है, इसके बाद तिमाही, अर्ध-वार्षिक और वार्षिक। हालांकि, अधिकांश बैंक मानक के रूप में तिमाही चक्रवृद्धि प्रदान करते हैं। रिटर्न में अंतर उच्च मूलधन और लंबी अवधि के साथ बढ़ता है।',
    },
    {
      id: 'fd-faq-8',
      question: 'क्या मैं अपनी FD को स्वचालित रूप से नवीनीकृत कर सकता हूं?',
      answer:
        'हां, बैंक ऑटो-रिन्यूअल सुविधा प्रदान करते हैं जहां आपकी FD मैच्योरिटी पर प्रचलित ब्याज दरों पर समान अवधि के लिए नवीनीकृत की जाती है। आप ब्याज प्राप्त करने और केवल मूल राशि को नवीनीकृत करने का विकल्प भी चुन सकते हैं।',
    },
    {
      id: 'fd-faq-9',
      question: 'क्या पोस्ट ऑफिस FD बैंक FD से बेहतर हैं?',
      answer:
        'पोस्ट ऑफिस टाइम डिपॉजिट (TD) थोड़ी अधिक ब्याज दरें देते हैं और कम TDS थ्रेशोल्ड होते हैं। हालांकि, बैंक FD अधिक लचीलापन, बेहतर तरलता और इंटरनेट बैंकिंग सुविधाएं प्रदान करते हैं। अपनी प्राथमिकता के आधार पर चुनें: उच्च रिटर्न (पोस्ट ऑफिस) बनाम सुविधा (बैंक)।',
    },
    {
      id: 'fd-faq-10',
      question: 'FD ब्याज पर TDS कैसे बचाएं?',
      answer:
        'यदि आपकी कुल आय कर योग्य सीमा से कम है तो अपने बैंक को फॉर्म 15G (60 से कम उम्र के व्यक्तियों के लिए) या फॉर्म 15H (वरिष्ठ नागरिकों के लिए) जमा करें। आप कर योग्य ब्याज को प्रबंधित करने के लिए परिवार के सदस्यों में FD को विभाजित कर सकते हैं या मैच्योरिटी तिथियां फैला सकते हैं।',
    },
  ];

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <CalculatorSchema
        name="FD Calculator Hindi"
        description="Calculate Fixed Deposit returns in Hindi."
        url="https://fincado.com/hi/fd-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'FD कैलकुलेटर',
            url: 'https://fincado.com/hi/fd-calculator/',
          },
        ]}
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <FDSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="FD कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/fd-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-emerald-100 text-lime-700">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                FD कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                ब्याज और चक्रवृद्धि के साथ FD मैच्योरिटी मूल्य की गणना करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              फिक्स्ड डिपॉजिट (FD) निवेश का पारंपरिक और सुरक्षित तरीका है। अपनी
              जमा राशि, ब्याज दर और अवधि दर्ज करें और जानें कि आपको{' '}
              <strong>चक्रवृद्धि ब्याज (Compound Interest)</strong> के साथ कितना
              रिटर्न मिलेगा।
            </p>
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-fd-top" type="leaderboard" />
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
                      औसत FD दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      प्रमुख बैंक (1-3 वर्ष)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      6.5–7.5%
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
                      वरिष्ठ नागरिक बोनस
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      60+ आयु के लिए अतिरिक्त ब्याज
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      +0.5%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        सामान्य
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
            <FDClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-fd-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  निवेश टिप
                </strong>
                FD लैडरिंग रणनीति पर विचार करें: अपने निवेश को विभिन्न
                मैच्योरिटी तिथियों के साथ कई FD में विभाजित करें ताकि तरलता और
                रिटर्न को संतुलित किया जा सके और बदलती ब्याज दरों का लाभ उठाया
                जा सके।
              </AlertDescription>
            </Alert>

            {/* ✅ FD FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    FD मैच्योरिटी गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      चक्रवृद्धि ब्याज (कम्युलेटिव) फिक्स्ड डिपॉजिट के लिए:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        A = P × (1 + r/n)<sup>n×t</sup>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">जहां:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          A
                        </span>
                        <span>= मैच्योरिटी राशि (मूलधन + ब्याज)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= मूल जमा राशि (₹ में)</span>
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
                          = प्रति वर्ष चक्रवृद्धि आवृत्ति (12=मासिक, 4=तिमाही,
                          2=अर्ध-वार्षिक, 1=वार्षिक)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          t
                        </span>
                        <span>= वर्षों में अवधि</span>
                      </div>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: FD गणना (तिमाही चक्रवृद्धि)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>मूलधन (P):</strong>
                        </div>
                        <div>₹1,00,000</div>

                        <div>
                          <strong>ब्याज दर (r):</strong>
                        </div>
                        <div>7% प्रति वर्ष</div>

                        <div>
                          <strong>अवधि (t):</strong>
                        </div>
                        <div>3 वर्ष</div>

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
                          <div>= 1.2314</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 4: FD फॉर्मूला लागू करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            A = P × (1 + r/n)<sup>n×t</sup>
                          </div>
                          <div>A = 1,00,000 × 1.2314</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          मैच्योरिटी राशि:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ₹1,23,140
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-300 space-y-2">
                        <div className="flex justify-between">
                          <span>जमा की गई मूल राशि:</span>
                          <strong>₹1,00,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>अर्जित ब्याज:</span>
                          <strong className="text-green-700">₹23,140</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>प्रभावी रिटर्न:</span>
                          <strong className="text-lime-700">23.14%</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Compounding Impact */}
                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <h4 className="font-semibold text-lime-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      चक्रवृद्धि आवृत्ति का प्रभाव
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        ₹1 लाख पर @ 7% 3 वर्षों के लिए, विभिन्न चक्रवृद्धि
                        आवृत्तियां देती हैं:
                      </p>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                        <div className="p-2 bg-white rounded border">
                          <strong>मासिक:</strong> ₹1,23,334
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <strong>तिमाही:</strong> ₹1,23,140
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <strong>अर्ध-वार्षिक:</strong> ₹1,22,926
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <strong>वार्षिक:</strong> ₹1,22,504
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        <strong>अंतर:</strong> मासिक चक्रवृद्धि इस निवेश पर
                        वार्षिक चक्रवृद्धि की तुलना में ₹830 अधिक देती है!
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
                        अधिकांश भारतीय बैंक मानक के रूप में तिमाही चक्रवृद्धि
                        प्रदान करते हैं।
                      </li>
                      <li>
                        नॉन-कम्युलेटिव FD (नियमित ब्याज भुगतान) चक्रवृद्धि ब्याज
                        नहीं, साधारण ब्याज का उपयोग करती हैं।
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
                        वरिष्ठ नागरिकों को अधिकांश FD पर अतिरिक्त 0.25-0.5%
                        मिलता है (बैंक के अनुसार भिन्न)।
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    यह कैलकुलेटर कम्युलेटिव FD के लिए मानक चक्रवृद्धि ब्याज
                    फॉर्मूले का उपयोग करता है। वास्तविक रिटर्न बैंक-विशिष्ट
                    नीतियों के कारण थोड़ा भिन्न हो सकता है।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* PROMO BOX */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    टैक्स लाभ के साथ गारंटीड रिटर्न की तलाश है?
                  </strong>

                  <Link
                    href="/hi/ppf-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>PPF कैलकुलेटर से तुलना करें (EEE टैक्स स्टेटस)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS FD */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      FD (फिक्स्ड डिपॉजिट) क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* SECTION 2: Types */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      फिक्स्ड डिपॉजिट के प्रकार
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={typesContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #3: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-fd-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* SECTION 3: BENEFITS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      फिक्स्ड डिपॉजिट के लाभ
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* Comparison Table */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      FD बनाम अन्य सुरक्षित निवेश विकल्प
                    </h3>

                    <div className="overflow-x-auto">
                      <Table className="border-collapse">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-left">विशेषता</TableHead>
                            <TableHead className="text-left">बैंक FD</TableHead>
                            <TableHead className="text-left">PPF</TableHead>
                            <TableHead className="text-left">RD</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              रिटर्न
                            </TableCell>
                            <TableCell className="font-semibold text-lime-600">
                              6.5% – 7.5%
                            </TableCell>
                            <TableCell className="text-slate-700">
                              7.1% (निश्चित)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              6.5% – 7.5%
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              निवेश मोड
                            </TableCell>
                            <TableCell className="text-slate-700">
                              एकमुश्त
                            </TableCell>
                            <TableCell className="text-slate-700">
                              एकमुश्त या वार्षिक
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              मासिक
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              लॉक-इन अवधि
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              लचीला (7 दिन - 10 वर्ष)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              15 वर्ष
                            </TableCell>
                            <TableCell className="text-slate-700">
                              6 महीने - 10 वर्ष
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              रिटर्न पर टैक्स
                            </TableCell>
                            <TableCell className="text-slate-700">
                              टैक्स स्लैब के अनुसार
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              पूरी तरह से टैक्स फ्री (EEE)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              टैक्स स्लैब के अनुसार
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              80C लाभ
                            </TableCell>
                            <TableCell className="text-slate-700">
                              हां (केवल 5 साल की FD)
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              हां
                            </TableCell>
                            <TableCell className="text-slate-700">
                              नहीं
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              तरलता
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              उच्च (जुर्माने के साथ)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              आंशिक (7 वर्ष के बाद)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              कम (हतोत्साहित)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* TAX Section */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      FD ब्याज पर TDS (2026 नियम)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={taxContent} />
                    </div>
                  </section>

                  {/* How to Use Calculator */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      इस FD कैलकुलेटर का उपयोग कैसे करें
                    </h3>
                    <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                      <li>अपनी जमा राशि (मूलधन) दर्ज करें।</li>
                      <li>
                        अपने बैंक द्वारा दी गई ब्याज दर दर्ज करें (नवीनतम दरें
                        जांचें)।
                      </li>
                      <li>वर्षों और अतिरिक्त महीनों में अवधि चुनें।</li>
                      <li>चक्रवृद्धि आवृत्ति चुनें (तिमाही सबसे आम है)।</li>
                      <li>
                        यदि आप 60+ वर्ष के हैं तो बोनस दरों के लिए वरिष्ठ नागरिक
                        मोड सक्षम करें।
                      </li>
                      <li>
                        लोकप्रिय बैंकों से वर्तमान दरें देखने के लिए{' '}
                        <strong>&quot;बैंक दरों की तुलना करें&quot;</strong> पर
                        क्लिक करें।
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
                      <Link href="/hi/rd-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                🔄
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  RD कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  मासिक निवेश के साथ आवर्ती जमा रिटर्न की गणना
                                  करें।
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

                      <Link href="/hi/ppf-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                🔒
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  PPF कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  EEE टैक्स लाभ और 7.1% दर के साथ PPF रिटर्न की
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
                id="hi-fd-before-faq"
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
              <AdSlot id="hi-fd-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-fd-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-fd-sidebar" />

              {/* 🎯 AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-fd-sidebar-bottom" type="box" lazyLoad={true} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
