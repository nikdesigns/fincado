import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import NSCClient from '@/app/nsc-calculator/NSCClient';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import FAQSchema from '@/components/FAQSchema';
import { Shield, Info, TrendingUp, ArrowRight, FileText } from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'NSC कैलकुलेटर 2026 – राष्ट्रीय बचत पत्र परिपक्वता गणना | Fincado',
  description:
    '7.7% ब्याज दर के साथ NSC परिपक्वता राशि की गणना करें। 5 साल की निश्चित अवधि और Section 80C कर लाभ। सरकारी गारंटी के साथ सुरक्षित निवेश।',
  keywords: [
    'NSC Calculator Hindi',
    'National Savings Certificate Hindi',
    'NSC Interest Calculator Hindi',
    'NSC Maturity Calculator Hindi',
    'राष्ट्रीय बचत पत्र कैलकुलेटर',
    'NSC ब्याज गणना',
    'NSC कर लाभ',
    'Section 80C NSC'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/nsc-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/nsc-calculator/',
    },
  },
  openGraph: {
    title: 'NSC कैलकुलेटर – राष्ट्रीय बचत पत्र रिटर्न की गणना करें',
    description:
      'मुफ्त NSC कैलकुलेटर: 7.7% ब्याज के साथ परिपक्वता की गणना करें। Section 80C कर बचत और सरकारी गारंटी।',
    url: 'https://fincado.com/hi/nsc-calculator/',
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

export default function HindiNSCPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    investmentAmount: 'निवेश राशि (₹)',
    interestRate: 'ब्याज दर (% प्रति वर्ष)',
    tenure: 'अवधि (वर्ष)',
    maturityAmount: 'परिपक्वता राशि',
    totalInvested: 'कुल निवेशित राशि',
    interestEarned: 'ब्याज अर्जित',
    effectiveGain: 'प्रभावी लाभ:',
    section80C: 'Section 80C लाभ',
    section80CInfo: 'मूलधन + अर्जित ब्याज (पहले 4 वर्ष) कर कटौती के लिए योग्य',
    showBreakdown: 'वार्षिक विवरण दिखाएं',
    hideBreakdown: 'वार्षिक विवरण छुपाएं',
    yearwiseGrowth: 'वार्षिक वृद्धि',
    year: 'वर्ष',
    balance: 'शेष:',
    interest: 'ब्याज:',
    accruedInterest: 'अर्जित ब्याज:',
    saveCalculation: 'गणना सहेजें',
    shareWhatsApp: 'WhatsApp पर साझा करें',
    savedNSCPlans: 'आपकी सहेजी गई NSC योजनाएं',
    clearAll: 'सभी साफ़ करें',
    maturity: 'परिपक्वता:',
    fixedTenure: '5 साल की निश्चित अवधि',
    governmentBacked: 'सरकारी गारंटी • Section 80C योग्य',
    taxNote: 'ब्याज कर योग्य है, लेकिन अर्जित ब्याज 80C के लिए योग्य है',
  };

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'faq-1',
      question: 'वर्तमान NSC ब्याज दर क्या है?',
      answer:
        'वर्तमान NSC ब्याज दर 7.7% प्रति वर्ष है (Q4 FY 2025-26)। भारत सरकार तिमाही आधार पर NSC दरों की समीक्षा करती है। ब्याज सालाना चक्रवृद्धि होता है और 5 साल की परिपक्वता पर भुगतान किया जाता है।',
    },
    {
      id: 'faq-2',
      question: 'क्या NSC ब्याज पर टैक्स लगता है?',
      answer:
        'हां। NSC ब्याज आपके आयकर स्लैब के अनुसार पूर्ण रूप से कर योग्य है। हालांकि, पहले 4 वर्षों के लिए अर्जित ब्याज को पुनर्निवेशित माना जाता है और Section 80C कटौती के लिए योग्य है। 5वें वर्ष का ब्याज बिना 80C लाभ के कर योग्य है।',
    },
    {
      id: 'faq-3',
      question: 'क्या मैं NSC को 5 साल से पहले निकाल सकता हूं?',
      answer:
        'नहीं। NSC में 5 साल की अनिवार्य लॉक-इन अवधि है। समयपूर्व निकासी केवल विशेष मामलों में अनुमति है: खाताधारक की मृत्यु, न्यायालय आदेश द्वारा जब्ती, या संयुक्त धारक को हस्तांतरण। कोई अन्य समयपूर्व भुगतान की अनुमति नहीं है।',
    },
    {
      id: 'faq-4',
      question: 'NSC में न्यूनतम और अधिकतम निवेश क्या है?',
      answer:
        'न्यूनतम निवेश ₹1,000 है (₹100 के गुणकों में)। कोई अधिकतम सीमा नहीं है, लेकिन केवल ₹1.5 लाख प्रति वित्तीय वर्ष Section 80C कर कटौती के लिए योग्य है। आप एक वर्ष में कई NSC प्रमाणपत्र खरीद सकते हैं।',
    },
    {
      id: 'faq-5',
      question: 'NSC और PPF में कौन बेहतर है?',
      answer:
        'NSC: 5 साल, 7.7% ब्याज, परिपक्वता पर कर योग्य, कोई आंशिक निकासी नहीं। PPF: 15 साल (विस्तार योग्य), 7.1% ब्याज, 100% कर मुक्त (EEE स्थिति), 7 साल के बाद आंशिक निकासी। NSC अधिक ब्याज के साथ 5 साल के लक्ष्यों के लिए बेहतर है। PPF दीर्घकालिक कर मुक्त रिटायरमेंट बचत के लिए बेहतर है।',
    },
    {
      id: 'faq-6',
      question: 'क्या मैं NSC को ऋण के लिए गिरवी रख सकता हूं?',
      answer:
        'हां। NSC प्रमाणपत्र बैंकों और NBFCs से ऋण के लिए संपार्श्विक के रूप में गिरवी रखे जा सकते हैं। गिरवी रखे गए NSC ऋणदाता के पास सुरक्षा के रूप में रहते हैं। ऋण राशि आमतौर पर NSC मूल्य का 80-90% होती है। हालांकि, आप ऋण चुकाने तक NSC नहीं निकाल सकते।',
    },
    {
      id: 'faq-7',
      question: 'NSC ऑनलाइन कैसे खरीदें?',
      answer:
        'वर्तमान में, NSC केवल डाकघरों या अधिकृत बैंकों (SBI, ICICI, HDFC, Axis) पर ऑफ़लाइन खरीदा जा सकता है। आपको KYC दस्तावेज (आधार, पैन) के साथ शाखा में जाना होगा, आवेदन पत्र भरना होगा, और नकद/चेक द्वारा भुगतान करना होगा। ऑनलाइन खरीद अभी उपलब्ध नहीं है।',
    },
    {
      id: 'faq-8',
      question: 'क्या NRI NSC में निवेश कर सकते हैं?',
      answer:
        'नहीं। NRI (Non-Resident Indians) नए NSC प्रमाणपत्र नहीं खरीद सकते। NSC केवल भारतीय निवासियों के लिए उपलब्ध है। हालांकि, यदि आपने निवासी के रूप में NSC खरीदा और बाद में NRI बन गए, तो प्रमाणपत्र परिपक्वता तक जारी रह सकता है।',
    },
    {
      id: 'faq-9',
      question: 'परिपक्वता के बाद NSC का क्या होता है?',
      answer:
        '5 साल के बाद, आपका NSC परिपक्व हो जाता है और किसी भी डाकघर में भुनाया जा सकता है। परिपक्वता राशि (मूलधन + ब्याज) आपके बैंक खाते में जमा की जाती है या चेक द्वारा जारी की जाती है। NSC स्वचालित रूप से नवीनीकृत नहीं होता, इसलिए यदि आप जारी रखना चाहते हैं तो आपको मैन्युअल रूप से पुनर्निवेश करना होगा।',
    },
    {
      id: 'faq-10',
      question: 'NSC और FD में कौन बेहतर रिटर्न देता है?',
      answer:
        'NSC 7.7% (सरकारी दर, गारंटीकृत) Section 80C लाभ के साथ प्रदान करता है लेकिन 5 साल का लॉक-इन है। बैंक FD 6.5-7.5% (बैंक के अनुसार भिन्न) लचीली अवधि (7 दिन से 10 साल) के साथ देता है। NSC कर बचत और गारंटीकृत रिटर्न के लिए बेहतर है। FD तरलता और छोटी अवधि के लिए बेहतर है।',
    }
  ];

  const introContent = autoLinkContent(`
    <p>
      <strong>National Savings Certificate (NSC)</strong> भारत सरकार द्वारा डाकघरों और 
      अधिकृत बैंकों के माध्यम से पेश की जाने वाली एक निश्चित आय निवेश योजना है। यह 
      <strong>5 साल की लॉक-इन अवधि</strong> के साथ गारंटीकृत रिटर्न प्रदान करती है और 
      <strong>Section 80C</strong> कर कटौती के लिए योग्य है।
    </p>
    <p class="mt-4">
      वर्तमान <strong>7.7% वार्षिक ब्याज दर</strong> (सालाना चक्रवृद्धि लेकिन परिपक्वता 
      पर भुगतान) के साथ, NSC जोखिम से बचने वाले निवेशकों के लिए आदर्श है जो कर लाभ के 
      साथ सुरक्षित, सरकार-समर्थित रिटर्न चाहते हैं।
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>लॉक-इन अवधि:</strong> 5 साल (निश्चित, समयपूर्व निकासी की अनुमति नहीं)</li>
      <li><strong>न्यूनतम निवेश:</strong> ₹1,000 (₹100 के गुणकों में)</li>
      <li><strong>अधिकतम निवेश:</strong> कोई सीमा नहीं (लेकिन केवल ₹1.5L 80C के लिए योग्य)</li>
      <li><strong>ब्याज दर:</strong> 7.7% प्रति वर्ष (Q4 FY 2025-26, तिमाही समीक्षा)</li>
      <li><strong>चक्रवृद्धि:</strong> वार्षिक चक्रवृद्धि, परिपक्वता पर ब्याज भुगतान</li>
      <li><strong>उपलब्धता:</strong> डाकघर और अधिकृत बैंक</li>
      <li><strong>पात्रता:</strong> भारतीय निवासी, HUF, ट्रस्ट (NRI के लिए नहीं)</li>
      <li><strong>संपार्श्विक:</strong> ऋण के लिए सुरक्षा के रूप में गिरवी रखा जा सकता है</li>
    </ul>
  `);

  const taxBenefitsContent = autoLinkContent(`
    <p>
      NSC आयकर अधिनियम के <strong>Section 80C</strong> के तहत महत्वपूर्ण कर लाभ प्रदान करता है:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>निवेश कटौती:</strong> मूलधन Section 80C कटौती के लिए योग्य है (₹1.5 लाख तक)।</li>
      <li><strong>अर्जित ब्याज कटौती:</strong> पहले 4 वर्षों में अर्जित ब्याज को पुनर्निवेशित माना जाता है और संबंधित वर्षों में Section 80C कटौती के लिए योग्य है।</li>
      <li><strong>परिपक्वता कराधान:</strong> अर्जित संपूर्ण ब्याज (अर्जित ब्याज सहित) परिपक्वता पर आपके आयकर स्लैब के अनुसार कर योग्य है।</li>
      <li><strong>5वें वर्ष का ब्याज:</strong> 5वें वर्ष में अर्जित ब्याज पूर्ण रूप से कर योग्य है और 80C कटौती के लिए योग्य नहीं है।</li>
    </ul>
    <p class="mt-4">
      <strong>उदाहरण:</strong> यदि आप NSC में ₹1.5L निवेश करते हैं और 5 साल में ₹60,000 
      ब्याज कमाते हैं, तो आपको ₹1.5L (वर्ष 1) + अर्जित ब्याज (वर्ष 2-4) पर 80C कटौती 
      मिलती है, लेकिन अंतिम ब्याज वर्ष 5 में कर योग्य है।
    </p>
  `);

  const withdrawalContent = autoLinkContent(`
    <p>
      NSC में 5 साल की लॉक-इन के कारण सख्त निकासी नियम हैं:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>कोई समयपूर्व निकासी नहीं:</strong> सामान्य परिस्थितियों में NSC को 5 साल से पहले नहीं निकाला जा सकता।</li>
      <li><strong>अपवाद:</strong> समयपूर्व भुगतान केवल निम्नलिखित मामलों में अनुमति है: (1) खाताधारक की मृत्यु, (2) न्यायालय आदेश द्वारा जब्ती, (3) संयुक्त खातों के मामले में दूसरे धारक को हस्तांतरण।</li>
      <li><strong>परिपक्वता:</strong> 5 साल के बाद, प्रमाणपत्र किसी भी डाकघर में पहचान प्रमाण और पासबुक के साथ भुनाया जा सकता है।</li>
      <li><strong>स्वचालित नवीनीकरण:</strong> NSC स्वचालित रूप से नवीनीकृत नहीं होता। यदि वांछित हो तो परिपक्वता के बाद आपको मैन्युअल रूप से पुनर्निवेश करना होगा।</li>
    </ul>
  `);

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <CalculatorSchema
        name="NSC Calculator Hindi"
        description="Calculate National Savings Certificate maturity and returns in Hindi."
        url="https://fincado.com/hi/nsc-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'NSC कैलकुलेटर',
            url: 'https://fincado.com/hi/nsc-calculator/',
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
            <ShareTools title="NSC कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/nsc-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-green-50 to-emerald-100 text-green-700">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                NSC कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-green-700">
                राष्ट्रीय बचत पत्र से रिटर्न की गणना करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-nsc-top" type="leaderboard" />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-green-200 bg-linear-to-br from-green-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-green-700 mb-1">
                      वर्तमान NSC दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      सरकार अधिसूचित (Q4 FY25-26)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      7.7%
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
                      लॉक-इन अवधि
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      निश्चित परिपक्वता अवधि
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      5 वर्ष
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-amber-700 mb-1">
                      अंतिम अपडेट
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      नवीनतम दर समीक्षा
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <NSCClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-nsc-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-green-50/50 border-green-200 text-slate-600">
              <Info className="h-4 w-4 text-green-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  कर बचत टिप
                </strong>
                NSC निवेश Section 80C कटौती के लिए योग्य है। अर्जित ब्याज (पहले
                4 वर्ष) को भी 80C लाभ मिलता है। चक्रवृद्धि रिटर्न को अधिकतम करने
                के लिए वित्तीय वर्ष की शुरुआत में NSC खरीदें।
              </AlertDescription>
            </Alert>

            {/* NSC Formula Block */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    NSC परिपक्वता गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      NSC मानक चक्रवृद्धि ब्याज फॉर्मूले का उपयोग करता है:
                    </div>

                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        A = P × (1 + r)<sup>n</sup>
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
                        <span>= परिपक्वता राशि (5 वर्ष बाद कुल मूल्य)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= मूलधन (₹ में शुरुआती निवेश राशि)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = वार्षिक ब्याज दर (दशमलव में, जैसे 7.7% के लिए 0.077)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>= निवेश अवधि (NSC के लिए 5 वर्ष)</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                      <p className="text-xs text-slate-700">
                        <strong>नोट:</strong> ब्याज सालाना चक्रवृद्धि होता है
                        (वर्ष में एक बार) और संपूर्ण परिपक्वता राशि 5 साल के अंत
                        में भुगतान की जाती है।
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: NSC गणना (5 वर्ष)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>निवेश (P):</strong>
                        </div>
                        <div>₹1,00,000</div>

                        <div>
                          <strong>ब्याज दर (r):</strong>
                        </div>
                        <div>7.7% प्रति वर्ष</div>

                        <div>
                          <strong>अवधि (n):</strong>
                        </div>
                        <div>5 वर्ष (निश्चित)</div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">
                          चरण 1: दर को दशमलव में बदलें
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 7.7 ÷ 100 = 0.077
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: (1 + r)<sup>n</sup> की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            (1 + 0.077)<sup>5</sup> = (1.077)<sup>5</sup>
                          </div>
                          <div>≈ 1.4506</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: NSC फॉर्मूला लागू करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>A = 1,00,000 × 1.4506</div>
                          <div>A ≈ 1,45,060</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          परिपक्वता मूल्य (5 वर्ष):
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹1,45,060
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-300 space-y-2">
                        <div className="flex justify-between">
                          <span>मूलधन निवेशित:</span>
                          <strong>₹1,00,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>ब्याज अर्जित (कर योग्य):</span>
                          <strong className="text-green-700">₹45,060</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>प्रभावी लाभ:</span>
                          <strong className="text-emerald-700">45.06%</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Section 80C लाभ (30% स्लैब):</span>
                          <strong className="text-emerald-700">₹30,000</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tax Calculation Note */}
                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <h4 className="font-semibold text-lime-900 mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Section 80C कर लाभ विस्तार से
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p className="text-xs">
                        NSC Section 80C के तहत <strong>दोहरा कर लाभ</strong>{' '}
                        प्रदान करता है:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs">
                        <li>
                          <strong>वर्ष 1:</strong> मूलधन (₹1,00,000) को 80C
                          कटौती मिलती है
                        </li>
                        <li>
                          <strong>वर्ष 2-4:</strong> अर्जित ब्याज को
                          पुनर्निवेशित माना जाता है, इसे भी 80C कटौती मिलती है
                          (लगभग ₹7,700 + ₹8,293 + ₹8,931)
                        </li>
                        <li>
                          <strong>वर्ष 5:</strong> ब्याज कर योग्य है, कोई 80C
                          लाभ नहीं
                        </li>
                        <li>
                          <strong>कुल 80C लाभ:</strong> ₹1,00,000 (मूलधन) +
                          ₹24,924 (अर्जित ब्याज Y2-Y4) ≈ ₹1,24,924
                        </li>
                      </ul>
                      <p className="text-xs font-semibold text-lime-800 mt-2">
                        💡 टिप: अर्जित ब्याज हर साल आपकी 80C सीमा में जुड़ता है,
                        जो मूलधन निवेश से परे अतिरिक्त कर बचत देता है।
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    यह कैलकुलेटर मानक चक्रवृद्धि ब्याज फॉर्मूले का उपयोग करता
                    है। डाकघरों द्वारा वास्तविक ब्याज गणना वार्षिक चक्रवृद्धि के
                    साथ की जाती है और परिपक्वता पर ब्याज का भुगतान किया जाता है।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    दीर्घकालिक कर-मुक्त बचत की तलाश में?
                  </strong>
                  <Link
                    href="/hi/ppf-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      100% कर-मुक्त रिटर्न के लिए PPF कैलकुलेटर से तुलना करें
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
                  राष्ट्रीय बचत पत्र (NSC) क्या है?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NSC की प्रमुख विशेषताएं
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={featuresContent} />
                </div>
              </section>

              {/* 🎯 AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="hi-nsc-mid-content"
                  type="square"
                  label="विज्ञापन"
                  lazyLoad
                />
              </div>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NSC कर लाभ (Section 80C)
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxBenefitsContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NSC बनाम PPF बनाम FD बनाम KVP तुलना
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">विशेषता</TableHead>
                        <TableHead className="text-left">NSC</TableHead>
                        <TableHead className="text-left">PPF</TableHead>
                        <TableHead className="text-left">FD</TableHead>
                        <TableHead className="text-left">KVP</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          रिटर्न
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          7.7% (निश्चित)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% (निश्चित)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          6.5-7.5%
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.5% (दोगुना)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          लॉक-इन अवधि
                        </TableCell>
                        <TableCell className="text-slate-700">5 वर्ष</TableCell>
                        <TableCell className="text-slate-700">
                          15 वर्ष
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          7 दिन - 10 वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          115 महीने (~9.6 वर्ष)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          कर स्थिति
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कर योग्य (मूलधन पर 80C)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% कर मुक्त)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कर योग्य
                        </TableCell>
                        <TableCell className="text-slate-700">
                          कर योग्य (80C नहीं)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Section 80C
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हां (मूलधन + अर्जित ब्याज)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हां (मूलधन)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          केवल 5 साल की कर-बचत FD
                        </TableCell>
                        <TableCell className="text-slate-700">नहीं</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          न्यूनतम निवेश
                        </TableCell>
                        <TableCell className="text-slate-700">₹1,000</TableCell>
                        <TableCell className="text-slate-700">
                          ₹500/वर्ष
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1,000 - ₹10,000
                        </TableCell>
                        <TableCell className="text-slate-700">₹1,000</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          आदर्श के लिए
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          5 साल का कर-बचत लक्ष्य
                        </TableCell>
                        <TableCell className="text-slate-700">
                          दीर्घकालिक कर मुक्त बचत
                        </TableCell>
                        <TableCell className="text-slate-700">
                          अल्पकालिक तरलता
                        </TableCell>
                        <TableCell className="text-slate-700">
                          दीर्घकालिक धन दोगुना करना
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>विशेषज्ञ सुझाव:</strong> NSC गारंटीकृत रिटर्न के साथ
                    5 साल की कर-बचत के लिए आदर्श है। संतुलित पोर्टफोलियो के लिए
                    NSC को PPF के साथ मिलाएं—मध्यम अवधि के लक्ष्यों के लिए NSC,
                    दीर्घकालिक कर मुक्त धन के लिए PPF।
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NSC निकासी नियम
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={withdrawalContent} />
                </div>
              </section>

              {/* NSC vs SCSS */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NSC बनाम SCSS: वरिष्ठ नागरिकों के लिए कौन बेहतर है?
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <p>
                    <strong>वरिष्ठ नागरिक बचत योजना (SCSS)</strong> विशेष रूप से
                    वरिष्ठ नागरिकों (60+) के लिए डिज़ाइन की गई है, जबकि NSC सभी
                    के लिए खुला है:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>
                      <strong>आयु:</strong> SCSS के लिए 60+ वर्ष आवश्यक है, NSC
                      की कोई आयु सीमा नहीं है।
                    </li>
                    <li>
                      <strong>ब्याज:</strong> SCSS 8.2% (Q4 FY25-26) बनाम NSC
                      7.7% प्रदान करता है, लेकिन SCSS तिमाही ब्याज का भुगतान
                      करता है जबकि NSC चक्रवृद्धि करता है।
                    </li>
                    <li>
                      <strong>अवधि:</strong> SCSS 5 साल (3 साल विस्तार योग्य)
                      है, NSC निश्चित 5 साल है।
                    </li>
                    <li>
                      <strong>कर:</strong> दोनों Section 80C के लिए योग्य हैं।
                      SCSS ब्याज तिमाही कर योग्य है। NSC ब्याज परिपक्वता पर कर
                      योग्य है।
                    </li>
                    <li>
                      <strong>उपयोग:</strong> नियमित आय की आवश्यकता वाले वरिष्ठ
                      नागरिकों के लिए SCSS बेहतर है। एकमुश्त धन संचय के लिए NSC
                      बेहतर है।
                    </li>
                  </ul>
                  <p className="mt-4 font-semibold text-green-700">
                    निष्कर्ष: वरिष्ठ नागरिकों को अधिक ब्याज और तिमाही आय के लिए
                    SCSS चुनना चाहिए। युवा निवेशकों के लिए 5 साल के कर-बचत
                    लक्ष्यों के लिए NSC उपयुक्त है।
                  </p>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  इस NSC कैलकुलेटर का उपयोग कैसे करें
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    वह मूलधन राशि दर्ज करें जिसे आप निवेश करना चाहते हैं
                    (न्यूनतम ₹1,000)।
                  </li>
                  <li>
                    ब्याज दर सेट करें (वर्तमान में 7.7%, सरकार द्वारा तिमाही
                    अपडेट)।
                  </li>
                  <li>अवधि 5 साल पर निश्चित है (समायोजन की आवश्यकता नहीं)।</li>
                  <li>
                    परिपक्वता राशि, कुल अर्जित ब्याज, और Section 80C लाभ देखें।
                  </li>
                  <li>
                    <strong>&quot;वार्षिक विवरण दिखाएं&quot;</strong> सक्षम करें
                    यह देखने के लिए कि अर्जित ब्याज के साथ आपका निवेश हर साल
                    कैसे बढ़ता है।
                  </li>
                  <li>
                    भविष्य के संदर्भ के लिए अपनी गणना सहेजें या WhatsApp के
                    माध्यम से साझा करें।
                  </li>
                </ol>
              </section>

              {/* How to Buy NSC */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NSC कैसे खरीदें (डाकघर और बैंक)
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <p>NSC यहां से खरीदा जा सकता है:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>
                      <strong>सभी भारतीय डाकघर:</strong> KYC दस्तावेज (आधार,
                      पैन, पासपोर्ट आकार की फोटो) के साथ किसी भी डाकघर में जाएं।
                    </li>
                    <li>
                      <strong>अधिकृत बैंक:</strong> SBI, ICICI, HDFC, Axis Bank
                      और अन्य अधिकृत बैंकों की चुनिंदा शाखाएं।
                    </li>
                    <li>
                      <strong>आवेदन पत्र:</strong> फॉर्म A-1 (NSC VIII Issue के
                      लिए) भरें और भुगतान (नकद/चेक) के साथ जमा करें।
                    </li>
                    <li>
                      <strong>प्रमाणपत्र जारी करना:</strong> आपको निवेश, ब्याज
                      दर और परिपक्वता के विवरण के साथ एक भौतिक NSC प्रमाणपत्र
                      मिलेगा।
                    </li>
                    <li>
                      <strong>ऑनलाइन स्थिति:</strong> वर्तमान में, NSC ऑनलाइन
                      नहीं खरीदा जा सकता। आपको व्यक्तिगत रूप से शाखा में जाना
                      होगा।
                    </li>
                  </ul>
                </div>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित कर-बचत कैलकुलेटर
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/hi/ppf-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            🏦
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              PPF कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              15 साल के PPF निवेश के साथ 100% कर मुक्त रिटर्न की
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
                              लचीली अवधि के साथ फिक्स्ड डिपॉजिट रिटर्न की तुलना
                              करें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>अभी आज़माएं</span>
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

            {/* 🎯 AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="hi-nsc-before-faq" type="leaderboard" lazyLoad />
            </div>

            {/* FAQs */}
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
              <AdSlot id="hi-nsc-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-nsc-sidebar-top" type="skyscraper" />

              <HindiSidebar />

              {/* 🎯 AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-nsc-sidebar-bottom" type="box" lazyLoad />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
