import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EducationLoanClient from '@/app/loans/education-loan/EducationLoanClient';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import HindiSidebar from '@/components/HindiSidebar';
import LiveRateTable from '@/components/LiveRateTable';
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
import { GraduationCap, ArrowRight, BookOpen, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EducationLoanSchemas } from '@/components/schemas/EducationLoanSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'एजुकेशन लोन कैलकुलेटर – ब्याज, EMI और टैक्स छूट (Section 80E)',
  description:
    'Fincado एजुकेशन लोन कैलकुलेटर (Hindi): अपनी EMI और कोर्स अवधि के ब्याज (Moratorium) की गणना करें। विदेश में पढ़ाई और टैक्स लाभ (Section 80E) की जानकारी प्राप्त करें।',
  keywords: [
    'Education Loan Calculator Hindi',
    'Student Loan EMI Hindi',
    'Section 80E Tax Deduction Hindi',
    'Study Abroad Loan Hindi'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/loans/education-loan/',
    languages: {
      'hi-IN': 'https://fincado.com/hi/loans/education-loan/',
      'en-IN': 'https://fincado.com/loans/education-loan/',
    },
  },
  openGraph: {
    title: 'एजुकेशन लोन कैलकुलेटर – अपने भविष्य की योजना बनाएं',
    description: 'मुफ्त टूल: कोर्स के दौरान ब्याज और EMI की सटीक गणना करें।',
    url: 'https://fincado.com/hi/loans/education-loan/',
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

export default function HindiEducationLoanPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
    interestRate: 'ब्याज दर (Interest Rate %)',
    moratorium: 'कोर्स अवधि (Moratorium Months)',
    repaymentTenure: 'पुनर्भुगतान अवधि (Years)',
    payInterestToggle: 'क्या आप कोर्स के दौरान ब्याज चुकाएंगे?',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principalCap: 'कुल मूलधन (Principal + Interest)',
    totalInterest: 'कुल ब्याज',
    interestSavedMsg: '✅ आप मूलधन पर ब्याज बचा रहे हैं!',
    interestAddedMsg: '⚠️ ब्याज मूलधन में जुड़ गया:',
    repaymentSchedule: 'किस्त तालिका (Repayment Schedule)',
    startsAfter: 'कोर्स अवधि (Moratorium) के बाद शुरू',
    copy: 'कॉपी करें',
    export: 'डाउनलोड (CSV)',
    print: 'प्रिंट करें',
    month: 'माह',
    principal: 'मूलधन',
    interest: 'ब्याज',
    balance: 'बकाया राशि',
  };

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'faq-1',
      question: 'भारत में वर्तमान एजुकेशन लोन ब्याज दर क्या है?',
      answer:
        'फरवरी 2026 तक, भारत में अध्ययन के लिए एजुकेशन लोन ब्याज दरें 8.50% से 11.50% प्रति वर्ष तक हैं। विदेश में अध्ययन के लिए दरें 9.50% से 13.50% हैं। SBI 9.05%-10.40%, HDFC 9.50%-11.50%, और ICICI 10.50%-13.50% ऑफर करते हैं। दरें लोन राशि, कोर्स और संस्थान रैंकिंग के आधार पर भिन्न होती हैं।',
    },
    {
      id: 'faq-2',
      question: 'Section 80E टैक्स बेनिफिट क्या है?',
      answer:
        'Section 80E एजुकेशन लोन पर भुगतान किए गए ब्याज पर 8 साल तक 100% टैक्स कटौती की अनुमति देता है। कोई अधिकतम सीमा नहीं है। यदि आप सालाना ₹1 लाख ब्याज चुकाते हैं, तो पूरा ₹1 लाख कटौती योग्य है। मूलधन चुकौती 80E के तहत कवर नहीं है।',
    },
    {
      id: 'faq-3',
      question: 'क्या मुझे एजुकेशन लोन के लिए सह-आवेदक की आवश्यकता है?',
      answer:
        'हाँ, एजुकेशन लोन के लिए हमेशा सह-आवेदक की आवश्यकता होती है - आमतौर पर माता-पिता या अभिभावक। सह-आवेदक की आय पात्रता के लिए मानी जाती है। ₹7.5 लाख से अधिक के लोन के लिए, सह-आवेदक से संपार्श्विक (संपत्ति, FD, LIC) आवश्यक है।',
    },
    {
      id: 'faq-4',
      question: 'एजुकेशन लोन में Moratorium अवधि क्या है?',
      answer:
        'Moratorium EMI पुनर्भुगतान शुरू होने से पहले की छूट अवधि है। यह कोर्स अवधि + 1 साल (या नौकरी मिलने के 6 महीने बाद, जो भी पहले हो) के बराबर होती है। Moratorium के दौरान, साधारण ब्याज जमा होता है लेकिन EMI भुगतान आवश्यक नहीं है। कुछ उधारकर्ता कुल लागत कम करने के लिए इस अवधि के दौरान ब्याज का भुगतान करते हैं।',
    },
    {
      id: 'faq-5',
      question: 'क्या मुझे बिना संपार्श्विक के एजुकेशन लोन मिल सकता है?',
      answer:
        'हाँ, ₹7.5 लाख तक के लोन के लिए, यदि मान्यता प्राप्त संस्थानों में अध्ययन कर रहे हैं तो अधिकांश बैंक संपार्श्विक की आवश्यकता नहीं रखते। ₹7.5 लाख से अधिक राशि के लिए, संपार्श्विक (लोन के 100-150% मूल्य की संपत्ति, FD, LIC, NSC) अनिवार्य है। कुछ NBFC अधिक दरों पर संपार्श्विक के बिना अधिक राशि प्रदान करते हैं।',
    },
    {
      id: 'faq-6',
      question: 'एजुकेशन लोन के तहत कौन से खर्चे कवर होते हैं?',
      answer:
        'एजुकेशन लोन कवर करते हैं: (1) ट्यूशन और प्रवेश शुल्क, (2) हॉस्टल और आवास, (3) पुस्तकें, उपकरण और लैपटॉप, (4) यात्रा खर्च (विदेश के लिए), (5) अध्ययन यात्राएं, (6) परीक्षा/पुस्तकालय/प्रयोगशाला शुल्क, (7) सावधानी जमा, (8) भवन कोष। व्यक्तिगत खर्चे कवर नहीं होते।',
    },
    {
      id: 'faq-7',
      question: 'मुझे अधिकतम कितनी एजुकेशन लोन राशि मिल सकती है?',
      answer:
        'भारत में अध्ययन के लिए: ₹15-20 लाख तक। विदेश में अध्ययन के लिए: बैंक के आधार पर ₹1-1.5 करोड़ तक। SBI विदेश के लिए ₹1.5 करोड़ तक, HDFC ₹1 करोड़ तक, ICICI ₹1.2 करोड़ तक ऑफर करते हैं। लोन राशि कोर्स शुल्क, संस्थान रैंकिंग और सह-आवेदक की आय पर निर्भर करती है।',
    },
    {
      id: 'faq-8',
      question: 'कौन से कोर्स एजुकेशन लोन के लिए पात्र हैं?',
      answer:
        'पात्र कोर्स: (1) UGC/AICTE/सरकार द्वारा अनुमोदित संस्थानों से स्नातक/स्नातकोत्तर, (2) व्यावसायिक कोर्स (इंजीनियरिंग, मेडिकल, MBA, CA, CS), (3) मान्यता प्राप्त विश्वविद्यालयों से विदेश में कोर्स, (4) ITI/पॉलिटेक्निक से व्यावसायिक कोर्स। डिप्लोमा/प्रमाणपत्र कोर्सों पर प्रतिबंध हो सकते हैं।',
    },
    {
      id: 'faq-9',
      question:
        'यदि मैं पढ़ाई पूरी करने के बाद एजुकेशन लोन नहीं चुका सकता तो क्या होगा?',
      answer:
        'यदि चुकाने में असमर्थ: (1) लोन पुनर्गठन के लिए तुरंत बैंक से संपर्क करें, (2) विस्तारित Moratorium का अनुरोध करें (कुछ बैंक 2 साल तक की अनुमति देते हैं), (3) सह-आवेदक चुकाने के लिए उत्तरदायी हो जाते हैं, (4) संपार्श्विक (यदि गिरवी रखा गया) जब्त किया जा सकता है, (5) क्रेडिट स्कोर गिरता है जो भविष्य के लोन को प्रभावित करता है, (6) NPA घोषणा के बाद कानूनी कार्रवाई।',
    },
    {
      id: 'faq-10',
      question:
        'क्या मैं एजुकेशन लोन प्रीपे कर सकता हूँ और Section 80E लाभ पर बचत कर सकता हूँ?',
      answer:
        'हाँ, आप अधिकांश बैंकों में बिना जुर्माने के प्रीपे कर सकते हैं। हालांकि, इस पर विचार करें: यदि आपका टैक्स ब्रैकेट 30% है, और लोन दर 10% है, तो 80E कटौती के कारण प्रभावी कर-पश्चात लागत केवल 7% है। यदि आप कहीं और >7% रिटर्न कमा सकते हैं, तो प्रीपे न करें। केवल तभी प्रीपे करें जब आपका निवेश रिटर्न कम हो।',
    }
  ];

  const introContent = autoLinkContent(`
    <p>
      <strong>एजुकेशन लोन EMI कैलकुलेटर</strong> आपको भारत या विदेश में उच्च शिक्षा 
      के लिए लिए गए छात्र लोन के लिए मासिक किस्त की गणना करने में मदद करता है। 
      एजुकेशन लोन <strong>Section 80E</strong> के तहत भुगतान किए गए ब्याज पर 
      <strong>100% टैक्स कटौती</strong> (कोई ऊपरी सीमा नहीं) के साथ कोर्स पूरा होने + 
      1 साल Moratorium अवधि के बाद लचीली पुनर्भुगतान की सुविधा प्रदान करते हैं।
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>100% टैक्स कटौती:</strong> Section 80E के तहत 8 साल तक पूरी ब्याज राशि टैक्स कटौती योग्य है (कोई अधिकतम सीमा नहीं)।</li>
      <li><strong>₹7.5L तक के लोन के लिए कोई संपार्श्विक नहीं:</strong> अधिकांश बैंक ₹7.5 लाख से कम एजुकेशन लोन के लिए संपार्श्विक की आवश्यकता नहीं रखते।</li>
      <li><strong>Moratorium अवधि:</strong> EMI पुनर्भुगतान कोर्स पूरा होने + 1 साल (या नौकरी मिलने के 6 महीने बाद) के बाद शुरू होता है।</li>
      <li><strong>सभी खर्चों को कवर करता है:</strong> ट्यूशन फीस, हॉस्टल, किताबें, यात्रा, लैपटॉप और विदेश में रहने के खर्चे शामिल हैं।</li>
      <li><strong>कम ब्याज दरें:</strong> सरकारी सब्सिडी के कारण ब्याज दरें (8.5%-13.5%) पर्सनल लोन से कम होती हैं।</li>
    </ul>
  `);

  const domesticVsAbroadContent = autoLinkContent(`
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-3 text-left font-semibold border">कारक</th>
            <th class="p-3 text-left font-semibold border">भारत में अध्ययन</th>
            <th class="p-3 text-left font-semibold border">विदेश में अध्ययन</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">ब्याज दर</td>
            <td class="p-3 border text-emerald-700">8.50% - 11.50%</td>
            <td class="p-3 border">9.50% - 13.50%</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">लोन राशि</td>
            <td class="p-3 border">₹15 लाख तक</td>
            <td class="p-3 border">₹1.5 करोड़ तक</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">संपार्श्विक आवश्यक</td>
            <td class="p-3 border">₹7.5 लाख से अधिक</td>
            <td class="p-3 border">₹7.5 लाख से अधिक</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">पुनर्भुगतान अवधि</td>
            <td class="p-3 border">10-15 साल</td>
            <td class="p-3 border">15 साल</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">प्रोसेसिंग फीस</td>
            <td class="p-3 border">₹2,000 - ₹5,000</td>
            <td class="p-3 border">₹5,000 - ₹10,000</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">सह-आवेदक आवश्यक</td>
            <td class="p-3 border">माता-पिता/अभिभावक</td>
            <td class="p-3 border">माता-पिता/अभिभावक (अनिवार्य)</td>
          </tr>
        </tbody>
      </table>
    </div>
  `);

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <CalculatorSchema
        name="Education Loan EMI Calculator Hindi"
        description="Calculate Education Loan EMI and Section 80E benefits in Hindi."
        url="https://fincado.com/hi/loans/education-loan/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'लोन', url: 'https://fincado.com/hi/loans/' },
          {
            name: 'एजुकेशन लोन कैलकुलेटर',
            url: 'https://fincado.com/hi/loans/education-loan/',
          }
        ]}
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <EducationLoanSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="एजुकेशन लोन कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/loans/education-loan" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                एजुकेशन लोन EMI कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-indigo-700">
                Section 80E टैक्स लाभ के साथ छात्र लोन कैलकुलेटर
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-education-loan-top" type="leaderboard" />
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
                      सर्वोत्तम दर (भारत)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      SBI Scholar Loan {updatedLabel}
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8.50%
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
                      टैक्स बेनिफिट (80E)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ब्याज कटौती (8 साल)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      100%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        असीमित
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      MORATORIUM अवधि
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      EMI से पहले छूट अवधि
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      कोर्स
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        +1 वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <EducationLoanClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-education-loan-after-calc"
                type="square"
                lazyLoad={false}
              />
            </div>

            {/* Formula Section */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    एजुकेशन लोन EMI गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      एजुकेशन लोन EMI की गणना भी मानक Reducing Balance EMI
                      फॉर्मूले का उपयोग करके की जाती है। आमतौर पर, Moratorium के
                      दौरान ब्याज मूलधन में जोड़ दिया जाता है, और फिर EMI शुरू
                      होती है।
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        EMI = P × [r × (1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> −
                        1]
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">जहां:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>
                          = EMI शुरू होने के समय प्रभावी मूलधन (मूल लोन राशि +
                          Moratorium के दौरान जमा हुआ ब्याज)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>= मासिक ब्याज दर = वार्षिक दर ÷ (12 × 100)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = महीनों में पुनर्भुगतान अवधि (वर्ष × 12), Moratorium
                          अवधि को छोड़कर
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: Moratorium के साथ एजुकेशन लोन
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>मूल लोन राशि:</strong>
                        </div>
                        <div>₹10,00,000</div>

                        <div>
                          <strong>वार्षिक ब्याज दर:</strong>
                        </div>
                        <div>10% प्रति वर्ष</div>

                        <div>
                          <strong>कोर्स + Moratorium अवधि:</strong>
                        </div>
                        <div>5 साल (60 महीने)</div>

                        <div>
                          <strong>पुनर्भुगतान अवधि (Moratorium के बाद):</strong>
                        </div>
                        <div>10 साल (120 महीने)</div>
                      </div>

                      {/* Step 1 */}
                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          चरण 1: Moratorium के दौरान जमा हुआ ब्याज (साधारण
                          ब्याज)
                        </strong>
                        <div className="ml-4 font-mono text-base space-y-1">
                          <div>ब्याज = मूलधन × दर × समय</div>
                          <div>
                            ब्याज = 10,00,000 × 10% × 5 = 10,00,000 × 0.10 × 5
                          </div>
                          <div>ब्याज = ₹5,00,000</div>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: EMI शुरू होने पर मूलधन
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          P (प्रभावी) = 10,00,000 + 5,00,000 = ₹15,00,000
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: 10 साल के लिए ₹15,00,000 पर EMI फॉर्मूला लागू
                          करें
                        </strong>
                        <div className="ml-4 font-mono text-sm space-y-2">
                          <div>r = 10 ÷ (12 × 100) = 0.008333</div>
                          <div>n = 10 × 12 = 120 महीने</div>
                          <div>
                            EMI = 15,00,000 × [0.008333 × (1.008333)
                            <sup>120</sup>] / [(1.008333)<sup>120</sup> − 1]
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          मासिक EMI (लगभग):
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹19,800
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>कुल ब्याज (Moratorium + EMI अवधि):</span>
                          <strong className="text-red-600">
                            लंबी अवधि और Moratorium के कारण बहुत अधिक
                          </strong>
                        </div>
                        <p className="text-slate-600">
                          Moratorium के दौरान कम से कम ब्याज का भुगतान करने से
                          आपकी प्रभावी EMI और कुल लागत काफी कम हो सकती है।
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      एजुकेशन लोन विशिष्ट बिंदु
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        Moratorium के दौरान, बैंक आमतौर पर{' '}
                        <strong>साधारण ब्याज</strong> लेते हैं; यदि आप इसे नहीं
                        चुकाते हैं तो यह मूलधन में जोड़ दिया जाता है।
                      </li>
                      <li>
                        फिर EMI की गणना इस उच्च मूलधन पर समान मानक EMI फॉर्मूले
                        का उपयोग करके की जाती है।
                      </li>
                      <li>
                        Section 80E के तहत,{' '}
                        <strong>भुगतान किए गए ब्याज का 100%</strong> 8 साल के
                        लिए टैक्स कटौती योग्य है, जो आपकी प्रभावी लागत को कम
                        करता है।
                      </li>
                      <li>
                        यदि आपका टैक्स ब्रैकेट 30% है, तो 10% नाममात्र ब्याज दर
                        टैक्स के बाद प्रभावी रूप से लगभग 7% की लागत आती है।
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-4">
                    यह एजुकेशन लोन EMI कैलकुलेटर मानक Reducing Balance Method का
                    पालन करता है और Moratorium ब्याज को उसी तरह मानता है जैसे
                    अधिकांश भारतीय बैंक छात्र लोन की संरचना करते हैं।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Section 80E टैक्स बेनिफिट
                </strong>
                एजुकेशन लोन ब्याज कोई अधिकतम सीमा के बिना 8 साल के लिए 100%
                टैक्स कटौती योग्य है। 30% टैक्स ब्रैकेट में, प्रभावी ब्याज लागत
                30% कम हो जाती है। यह एजुकेशन लोन को भारत में सबसे टैक्स-कुशल
                लोन में से एक बनाता है।
              </AlertDescription>
            </Alert>

            {/* Bank Comparison */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    एजुकेशन लोन ब्याज दरों की तुलना {updatedLabel}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-3 text-left font-semibold">बैंक</th>
                          <th className="p-3 text-left font-semibold">
                            भारत दर
                          </th>
                          <th className="p-3 text-left font-semibold">
                            विदेश दर
                          </th>
                          <th className="p-3 text-left font-semibold">
                            अधिकतम लोन (विदेश)
                          </th>
                          <th className="p-3 text-left font-semibold">
                            संपार्श्विक आवश्यक
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">SBI</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.50% - 10.50%
                          </td>
                          <td className="p-3">9.50% - 11.50%</td>
                          <td className="p-3">₹1.5 करोड़</td>
                          <td className="p-3">₹7.5L से अधिक</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">HDFC Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            9.50% - 11.00%
                          </td>
                          <td className="p-3">10.50% - 12.50%</td>
                          <td className="p-3">₹1 करोड़</td>
                          <td className="p-3">₹7.5L से अधिक</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">ICICI Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            10.50% - 11.50%
                          </td>
                          <td className="p-3">11.50% - 13.00%</td>
                          <td className="p-3">₹1.2 करोड़</td>
                          <td className="p-3">₹7.5L से अधिक</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Axis Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            13.70% - 15.20%
                          </td>
                          <td className="p-3">14.50% - 16.00%</td>
                          <td className="p-3">₹75L</td>
                          <td className="p-3">₹4L से अधिक</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Bank of Baroda</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.85% - 10.15%
                          </td>
                          <td className="p-3">9.85% - 11.50%</td>
                          <td className="p-3">₹1.5 करोड़</td>
                          <td className="p-3">₹7.5L से अधिक</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    *दरें कोर्स, संस्थान, लोन राशि के आधार पर भिन्न होती हैं।
                    शीर्ष-रैंक संस्थानों को कम दरें मिलती हैं। लड़कियों को
                    0.25-0.5% छूट मिल सकती है। अंतिम अपडेट: {updatedLabel}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #3: IN-FEED */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-education-loan-infeed-1"
                type="banner"
                lazyLoad={true}
              />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="personalLoan" />

            {/* PROMO CARD */}
            <Card className="no-print my-6 border-indigo-200 bg-indigo-50/50 transition-colors hover:bg-indigo-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-indigo-900">
                    क्या विदेश में पढ़ाई की योजना बना रहे हैं?
                  </strong>

                  <Link
                    href="/guides/education-loan-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-indigo-700 hover:text-indigo-800"
                  >
                    <span>हमारी पूर्ण एजुकेशन लोन गाइड पढ़ें (2026)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* Benefits */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      एजुकेशन लोन के लाभ
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* Comparison */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      भारत में अध्ययन बनाम विदेश में अध्ययन लोन
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={domesticVsAbroadContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #4: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-education-loan-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Eligibility */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      एजुकेशन लोन पात्रता मानदंड
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        <strong>छात्र:</strong> मान्यता प्राप्त संस्थान में
                        प्रवेश प्राप्त भारतीय नागरिक (भारत में UGC/AICTE
                        अनुमोदित, विदेश में QS/Times रैंक)
                      </li>
                      <li>
                        <strong>आयु:</strong> आमतौर पर 18-35 वर्ष (बैंक के
                        अनुसार भिन्न)
                      </li>
                      <li>
                        <strong>सह-आवेदक:</strong> स्थिर आय के साथ
                        माता-पिता/अभिभावक अनिवार्य (नौकरीपेशा/स्वरोजगार/पेंशन के
                        साथ सेवानिवृत्त)
                      </li>
                      <li>
                        <strong>शैक्षणिक रिकॉर्ड:</strong> पिछली योग्यता परीक्षा
                        में न्यूनतम 50-60% अंक (12वीं/स्नातक)
                      </li>
                      <li>
                        <strong>प्रवेश प्रमाण:</strong> संस्थान से वैध प्रवेश
                        पत्र/ऑफर लेटर
                      </li>
                      <li>
                        <strong>संपार्श्विक:</strong> ₹7.5 लाख से अधिक के लोन के
                        लिए - लोन राशि के 100-150% मूल्य की संपत्ति/LIC/FD/NSC
                      </li>
                    </ul>
                  </section>

                  {/* 🎯 AD #5: AFTER ELIGIBILITY */}
                  <div className="no-print my-8">
                    <AdSlot
                      id="hi-education-loan-infeed-2"
                      type="banner"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Documents */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      एजुकेशन लोन के लिए आवश्यक दस्तावेज
                    </h2>

                    <div className="grid gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">
                          छात्र दस्तावेज
                        </h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                          <li>संस्थान से प्रवेश/ऑफर लेटर</li>
                          <li>10वीं, 12वीं और स्नातक की मार्कशीट</li>
                          <li>
                            प्रवेश परीक्षा स्कोर (GATE/GRE/GMAT/IELTS/TOEFL)
                          </li>
                          <li>कोर्स फीस संरचना और विवरण</li>
                          <li>
                            पैन कार्ड, आधार कार्ड, पासपोर्ट (विदेश के लिए)
                          </li>
                          <li>2 पासपोर्ट आकार की तस्वीरें</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">
                          सह-आवेदक (माता-पिता/अभिभावक) दस्तावेज
                        </h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                          <li>पैन कार्ड, आधार कार्ड, पता प्रमाण</li>
                          <li>
                            पिछले 6 महीने की सैलरी स्लिप (नौकरीपेशा) या 2 साल का
                            ITR (स्वरोजगार)
                          </li>
                          <li>पिछले 6-12 महीने के बैंक स्टेटमेंट</li>
                          <li>रोजगार प्रमाण पत्र/व्यवसाय प्रमाण</li>
                          <li>Form 16 या आय प्रमाण पत्र</li>
                          <li>
                            संपत्ति कागजात (यदि ₹7.5L से अधिक संपार्श्विक की
                            पेशकश कर रहे हैं)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Tips */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      सर्वोत्तम एजुकेशन लोन डील पाने के टिप्स
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        जल्दी आवेदन करें - अंतिम समय के तनाव से बचने के लिए
                        कोर्स शुरू होने से 4-6 महीने पहले
                      </li>
                      <li>
                        शीर्ष-रैंक संस्थानों को लक्षित करें - बैंक QS/Times
                        शीर्ष 200 विश्वविद्यालयों के लिए कम दरें ऑफर करते हैं
                      </li>
                      <li>
                        कम से कम 3-4 बैंकों की तुलना करें - समान प्रोफाइल के लिए
                        बैंकों के बीच दरें 2-3% भिन्न होती हैं
                      </li>
                      <li>
                        Moratorium के दौरान ब्याज का भुगतान करने पर विचार करें -
                        कुल ब्याज पर काफी बचत होती है
                      </li>
                      <li>
                        सरकारी सब्सिडी की जांच करें - EWS छात्रों को शिक्षा
                        मंत्रालय से ब्याज सब्सिडी मिल सकती है
                      </li>
                      <li>
                        अच्छा शैक्षणिक रिकॉर्ड बनाए रखें - कुछ बैंक मेधावी
                        छात्रों के लिए दर छूट प्रदान करते हैं
                      </li>
                      <li>
                        Section 80E लाभों का लाभ उठाएं - आपके टैक्स ब्रैकेट
                        प्रतिशत से प्रभावी ब्याज लागत कम हो जाती है
                      </li>
                    </ul>
                  </section>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित लोन कैलकुलेटर
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/hi/emi-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                                💰
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                                  सामान्य EMI कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  किसी भी प्रकार के लोन के लिए EMI कैलकुलेट करें
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                                  <span>अभी कैलकुलेट करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/hi/loans/personal-loan/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-purple-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-50 to-purple-100 text-purple-700 text-2xl">
                                💳
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-purple-700 mb-1">
                                  पर्सनल लोन कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  पर्सनल लोन से तुलना करें (कोई टैक्स बेनिफिट
                                  नहीं)
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-purple-700">
                                  <span>अभी कैलकुलेट करें</span>
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

            {/* 🎯 AD #6: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-education-loan-before-faq"
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

            {/* 🎯 AD #7: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot
                id="hi-education-loan-bottom"
                type="square"
                lazyLoad={true}
              />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #8: SIDEBAR TOP */}
              <AdSlot id="hi-education-loan-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-education-loan-sidebar" />

              {/* 🎯 AD #9: SIDEBAR BOTTOM */}
              <AdSlot
                id="hi-education-loan-sidebar-bottom"
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
