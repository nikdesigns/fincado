import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PersonalLoanClient from '@/app/loans/personal-loan/PersonalLoanClient';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
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
import { CreditCard, ArrowRight, BookOpen, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PersonalLoanSchemas } from '@/components/schemas/PersonalLoanSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'पर्सनल लोन EMI कैलकुलेटर – पात्रता और ब्याज दरें (2026)',
  description:
    'Fincado पर्सनल लोन कैलकुलेटर (Hindi): अपनी EMI निकालें, ब्याज दरें तुलना करें और पात्रता चेक करें। शादी, यात्रा या मेडिकल खर्च के लिए सटीक गणना।',
  keywords: [
    'Personal Loan EMI Calculator Hindi',
    'Personal Loan Interest Rate Hindi',
    'Unsecured Loan Calculator Hindi',
    'Loan Eligibility Calculator Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/loans/personal-loan/',
    languages: {
      'en-IN': 'https://fincado.com/loans/personal-loan/',
    },
  },
  openGraph: {
    title: 'पर्सनल लोन EMI कैलकुलेटर – अपनी जरूरतों को पूरा करें',
    description: 'मुफ्त टूल: पर्सनल लोन EMI, ब्याज और अवधि की गणना करें।',
    url: 'https://fincado.com/hi/loans/personal-loan/',
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

export default function HindiPersonalLoanPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
    interestRate: 'ब्याज दर (Interest Rate %)',
    tenure: 'अवधि (Years)',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principal: 'मूल राशि (Principal)',
    interest: 'ब्याज (Interest)',
    amortizationSchedule: 'किस्त तालिका (Amortization)',
    monthlyBreakdown: 'मासिक विवरण',
    copy: 'कॉपी करें',
    export: 'डाउनलोड (CSV)',
    print: 'प्रिंट करें',
    month: 'माह',
    balance: 'बकाया राशि',
  };

  // ✅ FAQ Items (Hindi)
  const faqItems = [
    {
      id: 'faq-1',
      question: 'भारत में वर्तमान पर्सनल लोन ब्याज दर क्या है?',
      answer:
        'फरवरी 2026 तक, पर्सनल लोन ब्याज दरें 10.49% से 24% प्रति वर्ष तक हैं। HDFC 10.50%-21%, SBI 11.15%-14.45%, और ICICI 10.75%-19% ऑफर करते हैं। दरें आपके क्रेडिट स्कोर पर बहुत निर्भर करती हैं - 750+ पर सर्वोत्तम दरें मिलती हैं।',
    },
    {
      id: 'faq-2',
      question: 'क्या मुझे 650 क्रेडिट स्कोर के साथ पर्सनल लोन मिल सकता है?',
      answer:
        'हाँ, लेकिन अधिक ब्याज दरों (18%-24%) की उम्मीद करें। 650-699 का क्रेडिट स्कोर "उचित" माना जाता है। बेहतर दरें पाने के लिए, समय पर बिल भुगतान, क्रेडिट उपयोग कम करके और बकाया चुकाकर अपना स्कोर 750+ तक सुधारें।',
    },
    {
      id: 'faq-3',
      question: 'मुझे अधिकतम कितनी पर्सनल लोन राशि मिल सकती है?',
      answer:
        'अधिकांश बैंक ₹40 लाख तक का पर्सनल लोन ऑफर करते हैं। हालांकि, आपकी पात्रता मासिक आय (आमतौर पर आपकी मासिक सैलरी का 5-10 गुना), क्रेडिट स्कोर, मौजूदा EMI और रोजगार स्थिरता पर निर्भर करती है। नौकरीपेशा कर्मचारियों को आमतौर पर स्वरोजगार से अधिक राशि मिलती है।',
    },
    {
      id: 'faq-4',
      question: 'पर्सनल लोन स्वीकृति में कितना समय लगता है?',
      answer:
        'डिजिटल लेंडर (बजाज फिनसर्व, HDFC बैंक) 5-10 मिनट में ऑनलाइन तत्काल स्वीकृति प्रदान करते हैं। पारंपरिक बैंकों को 1-3 कार्य दिवस लगते हैं। स्वीकृति के बाद 24-48 घंटों में वितरण होता है। पूर्व-स्वीकृत लोन तुरंत क्रेडिट हो जाते हैं।',
    },
    {
      id: 'faq-5',
      question: 'क्या मुझे पर्सनल लोन के लिए आय प्रमाण की आवश्यकता है?',
      answer:
        'हाँ, आमतौर पर आवश्यक होता है। नौकरीपेशा: पिछले 3 महीने की सैलरी स्लिप + 6 महीने के बैंक स्टेटमेंट। स्वरोजगार: पिछले 2 साल का ITR + बैंक स्टेटमेंट। कुछ बैंक मौजूदा ग्राहकों को अतिरिक्त आय प्रमाण के बिना पूर्व-स्वीकृत लोन प्रदान करते हैं।',
    },
    {
      id: 'faq-6',
      question: 'पर्सनल लोन के लिए प्रोसेसिंग फीस कितनी है?',
      answer:
        'प्रोसेसिंग फीस लोन राशि का 1-3% होती है, आमतौर पर ₹2,000 से ₹10,000 तक। HDFC 2.5% तक, SBI 1.5% तक, ICICI 2.5% तक चार्ज करते हैं। कुछ बैंक त्योहारी ऑफर के दौरान फीस माफ कर देते हैं। प्रोसेसिंग फीस पर GST (18%) अतिरिक्त है।',
    },
    {
      id: 'faq-7',
      question: 'क्या मैं बिना जुर्माने के अपना पर्सनल लोन प्रीपे कर सकता हूँ?',
      answer:
        'अधिकांश बैंक फ्लोटिंग रेट लोन के लिए बिना जुर्माने के प्रीपेमेंट की अनुमति देते हैं। फिक्स्ड रेट लोन पर 2-5% प्रीपेमेंट शुल्क हो सकता है। अपने लोन समझौते की जांच करें। जल्दी प्रीपे करने से विशेष रूप से पहले 2-3 वर्षों में महत्वपूर्ण ब्याज बचता है।',
    },
    {
      id: 'faq-8',
      question: 'क्या पर्सनल लोन ब्याज टैक्स कटौती योग्य है?',
      answer:
        'नहीं, पर्सनल लोन ब्याज टैक्स कटौती योग्य नहीं है। केवल होम लोन (धारा 24), एजुकेशन लोन (धारा 80E), और बिजनेस लोन ब्याज टैक्स कटौती के लिए योग्य हैं। पर्सनल लोन व्यक्तिगत खर्चों के लिए लिए जाते हैं, जो किसी भी कर धारा के तहत कवर नहीं होते।',
    },
    {
      id: 'faq-9',
      question: 'यदि मैं पर्सनल लोन EMI में डिफॉल्ट करता हूँ तो क्या होता है?',
      answer:
        'डिफॉल्ट करने से: (1) विलंब भुगतान जुर्माना (2%) + दंड ब्याज, (2) क्रेडिट स्कोर गिरता है (600 से नीचे जा सकता है), (3) 90 दिनों के बाद लोन NPA के रूप में चिह्नित, (4) कानूनी नोटिस और संभावित मुकदमा, (5) भविष्य के लोन अस्वीकार। पुनर्गठन के लिए तुरंत लेंडर से संपर्क करें।',
    },
    {
      id: 'faq-10',
      question:
        'क्या मैं फ्रीलांसर या गिग वर्कर के रूप में पर्सनल लोन ले सकता हूँ?',
      answer:
        'हाँ, लेकिन आवश्यकताएं सख्त हैं। आपको चाहिए: (1) स्थिर आय दिखाने वाला न्यूनतम 2 साल का ITR, (2) अच्छा क्रेडिट स्कोर (750+), (3) नियमित बैंक खाता क्रेडिट, (4) बजाज फिनसर्व, फुलरटन इंडिया जैसे कुछ लेंडर विशेष रूप से स्वरोजगार व्यक्तियों के लिए सेवा प्रदान करते हैं।',
    },
  ];

  const introContent = autoLinkContent(`
    <p>
      <strong>पर्सनल लोन EMI कैलकुलेटर</strong> आपको लोन राशि, ब्याज दर और अवधि 
      के आधार पर असुरक्षित पर्सनल लोन के लिए मासिक किस्त की गणना करने में मदद करता है। 
      भारत में पर्सनल लोन <strong>तत्काल, संपार्श्विक-मुक्त लोन</strong> हैं जिनकी 
      ब्याज दरें <strong>10.49% से 24%</strong> प्रति वर्ष तक होती हैं, जो आपके 
      क्रेडिट स्कोर और लेंडर पर निर्भर करती हैं।
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>तत्काल स्वीकृति:</strong> न्यूनतम दस्तावेज के साथ मिनटों में पर्सनल लोन स्वीकृति प्राप्त करें।</li>
      <li><strong>कोई संपार्श्विक आवश्यक नहीं:</strong> पूरी तरह से असुरक्षित लोन - कोई संपत्ति/संपत्ति की आवश्यकता नहीं।</li>
      <li><strong>लचीला उपयोग:</strong> चिकित्सा आपात स्थिति, शादी, शिक्षा, यात्रा या किसी भी व्यक्तिगत आवश्यकता के लिए उपयोग करें।</li>
      <li><strong>त्वरित वितरण:</strong> स्वीकृति के 24 घंटों के भीतर आपके खाते में लोन राशि जमा।</li>
      <li><strong>लचीली अवधि:</strong> आपके बजट के अनुरूप 1-5 साल की चुकौती अवधि।</li>
    </ul>
  `);

  const useCasesContent = autoLinkContent(`
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div class="font-semibold text-blue-900 mb-2">✅ अच्छे उपयोग के मामले</div>
        <ul class="text-sm text-slate-700 space-y-1 list-disc pl-4">
          <li>चिकित्सा आपात स्थिति</li>
          <li>शादी के खर्चे</li>
          <li>घर का नवीनीकरण</li>
          <li>शिक्षा शुल्क</li>
          <li>ऋण समेकन (उच्च-ब्याज क्रेडिट कार्ड)</li>
        </ul>
      </div>
      <div class="p-4 bg-red-50 rounded-lg border border-red-200">
        <div class="font-semibold text-red-900 mb-2">❌ इनके लिए बचें</div>
        <ul class="text-sm text-slate-700 space-y-1 list-disc pl-4">
          <li>सट्टा निवेश</li>
          <li>वैभवपूर्ण खरीदारी जो आप वहन नहीं कर सकते</li>
          <li>दूसरे लोन के लिए डाउन पेमेंट</li>
          <li>मौजूदा पर्सनल लोन चुकाना</li>
          <li>जुआ या जोखिम भरे उपक्रम</li>
        </ul>
      </div>
    </div>
  `);

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <CalculatorSchema
        name="Personal Loan EMI Calculator Hindi"
        description="Calculate Personal Loan EMI in Hindi."
        url="https://fincado.com/hi/loans/personal-loan/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'लोन', url: 'https://fincado.com/hi/loans/' },
          {
            name: 'पर्सनल लोन EMI कैलकुलेटर',
            url: 'https://fincado.com/hi/loans/personal-loan/',
          },
        ]}
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <PersonalLoanSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="पर्सनल लोन EMI कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/loans/personal-loan" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-50 to-purple-100 text-purple-700">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                पर्सनल लोन EMI कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-purple-700">
                तत्काल पर्सनल लोन EMI ऑनलाइन कैलकुलेट करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-personal-loan-top" type="leaderboard" />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-purple-700 mb-1">
                      सर्वोत्तम दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      HDFC पर्सनल लोन {updatedLabel}
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      10.50%
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
                      सामान्य EMI
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹5L @ 12% 3 साल के लिए
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹16,607
                      <span className="text-base font-normal text-slate-600">
                        /महीना
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      तत्काल स्वीकृति
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      डिजिटल लेंडर (750+ स्कोर)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      5 Min
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        ऑनलाइन
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <PersonalLoanClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-personal-loan-after-calc"
                type="square"
                lazyLoad={false}
              />
            </div>

            {/* EMI Formula Section */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    पर्सनल लोन EMI गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      पर्सनल लोन EMI की गणना बैंकों और NBFC द्वारा उपयोग किए
                      जाने वाले समान मानक EMI फॉर्मूले का उपयोग करके की जाती है:
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
                        <span>= पर्सनल लोन राशि (₹ में)</span>
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
                        <span>= महीनों में लोन अवधि (वर्ष × 12)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: पर्सनल लोन EMI
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>लोन राशि (P):</strong>
                        </div>
                        <div>₹5,00,000</div>

                        <div>
                          <strong>वार्षिक ब्याज दर:</strong>
                        </div>
                        <div>12% प्रति वर्ष</div>

                        <div>
                          <strong>लोन अवधि:</strong>
                        </div>
                        <div>3 साल (36 महीने)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          चरण 1: मासिक ब्याज दर (r)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 12 ÷ (12 × 100) = 12 ÷ 1200 = 0.01
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: (1+r)<sup>n</sup>
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          (1 + 0.01)<sup>36</sup> ≈ 1.4308
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: EMI फॉर्मूला लागू करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            EMI = 5,00,000 × [0.01 × 1.4308] / [1.4308 − 1]
                          </div>
                          <div>EMI = 5,00,000 × 0.014308 / 0.4308</div>
                          <div>EMI ≈ 5,00,000 × 0.033228</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          मासिक EMI:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ₹16,607
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>कुल देय राशि:</span>
                          <strong>₹5,97,852</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>कुल ब्याज भुगतान:</span>
                          <strong className="text-red-600">₹97,852</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      पर्सनल लोन EMI को समझना
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        पर्सनल लोन अन्य लोनों के समान{' '}
                        <strong>EMI फॉर्मूला</strong> का उपयोग करते हैं, लेकिन
                        ब्याज दरें आमतौर पर अधिक होती हैं।
                      </li>
                      <li>
                        EMI निश्चित रहती है, लेकिन{' '}
                        <strong>
                          ब्याज हिस्सा शुरुआती महीनों में सबसे अधिक
                        </strong>{' '}
                        होता है।
                      </li>
                      <li>
                        अवधि के पहले आधे हिस्से में प्रीपे करने से महत्वपूर्ण
                        ब्याज बच सकता है।
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-4">
                    यह पर्सनल लोन EMI कैलकुलेटर मानक Reducing Balance Method का
                    उपयोग करता है, इसलिए परिणाम बैंकों और NBFC द्वारा दिखाई गई
                    EMI के बहुत करीब होंगे।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Info Alert */}
            <Alert className="mt-6 bg-amber-50/50 border-amber-200 text-slate-600">
              <Info className="h-4 w-4 text-amber-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  स्मार्ट उधार टिप
                </strong>
                पर्सनल लोन में सबसे अधिक ब्याज दरें होती हैं। केवल बिल्कुल
                आवश्यक होने पर ही उधार लें। पहले गोल्ड लोन, FD के विरुद्ध लोन,
                या परिवार से उधार लेने जैसे विकल्पों पर विचार करें।
              </AlertDescription>
            </Alert>

            {/* Bank Comparison */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    पर्सनल लोन ब्याज दरों की तुलना {updatedLabel}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-3 text-left font-semibold">
                            बैंक/NBFC
                          </th>
                          <th className="p-3 text-left font-semibold">
                            ब्याज दर
                          </th>
                          <th className="p-3 text-left font-semibold">
                            लोन राशि
                          </th>
                          <th className="p-3 text-left font-semibold">
                            प्रोसेसिंग फीस
                          </th>
                          <th className="p-3 text-left font-semibold">अवधि</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">HDFC Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            10.50% - 21.00%
                          </td>
                          <td className="p-3">₹50k - ₹40L</td>
                          <td className="p-3">2.5% तक</td>
                          <td className="p-3">1-5 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">SBI</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            11.15% - 14.45%
                          </td>
                          <td className="p-3">₹25k - ₹20L</td>
                          <td className="p-3">1.5% तक</td>
                          <td className="p-3">1-5 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">ICICI Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            10.75% - 19.00%
                          </td>
                          <td className="p-3">₹50k - ₹50L</td>
                          <td className="p-3">2.5% तक</td>
                          <td className="p-3">1-5 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Axis Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            10.49% - 22.00%
                          </td>
                          <td className="p-3">₹50k - ₹40L</td>
                          <td className="p-3">2% तक</td>
                          <td className="p-3">1-5 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Bajaj Finserv</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            13.00% - 24.00%
                          </td>
                          <td className="p-3">₹1L - ₹40L</td>
                          <td className="p-3">3% तक</td>
                          <td className="p-3">1-5 साल</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    *दरें क्रेडिट स्कोर, आय और बैंक के साथ संबंध पर निर्भर करती
                    हैं। 750+ क्रेडिट स्कोर के लिए कम दरें। अंतिम अपडेट:{' '}
                    {updatedLabel}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #3: IN-FEED */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-personal-loan-infeed-1"
                type="banner"
                lazyLoad={true}
              />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="personalLoan" />

            {/* PROMO CARD */}
            <Card className="no-print my-6 border-purple-200 bg-purple-50/50 transition-colors hover:bg-purple-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-purple-900">
                    क्या आपको तत्काल धन चाहिए?
                  </strong>

                  <Link
                    href="/guides/personal-loan-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-800"
                  >
                    <span>हमारी पूर्ण पर्सनल लोन गाइड पढ़ें (2026)</span>
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
                      पर्सनल लोन के लाभ
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* Use Cases */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      पर्सनल लोन कब लें?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={useCasesContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #4: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-personal-loan-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Eligibility */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      पर्सनल लोन पात्रता मानदंड
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        <strong>आयु:</strong> 21-60 वर्ष (नौकरीपेशा), 25-65 वर्ष
                        (स्वरोजगार)
                      </li>
                      <li>
                        <strong>आय:</strong> न्यूनतम ₹25,000/महीना (मेट्रो शहरों
                        में नौकरीपेशा), ₹3-4 लाख/वर्ष (स्वरोजगार)
                      </li>
                      <li>
                        <strong>क्रेडिट स्कोर:</strong> न्यूनतम 650 (स्वीकार्य),
                        750+ (सर्वोत्तम दरें और तत्काल स्वीकृति)
                      </li>
                      <li>
                        <strong>रोजगार:</strong> न्यूनतम 2 साल का कार्य अनुभव
                        (नौकरीपेशा), 3 साल का व्यवसाय (स्वरोजगार)
                      </li>
                      <li>
                        <strong>EMI से आय अनुपात:</strong> कुल EMI मासिक आय के
                        50% से अधिक नहीं होनी चाहिए
                      </li>
                    </ul>
                  </section>

                  {/* 🎯 AD #5: AFTER ELIGIBILITY */}
                  <div className="no-print my-8">
                    <AdSlot
                      id="hi-personal-loan-infeed-2"
                      type="banner"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Documents */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      पर्सनल लोन के लिए आवश्यक दस्तावेज
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">
                          नौकरीपेशा के लिए
                        </h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                          <li>पैन कार्ड और आधार कार्ड</li>
                          <li>पिछले 3 महीने की सैलरी स्लिप</li>
                          <li>पिछले 6 महीने के बैंक स्टेटमेंट</li>
                          <li>रोजगार प्रमाण पत्र/नियुक्ति पत्र</li>
                          <li>Form 16 (पिछले 2 साल)</li>
                          <li>पासपोर्ट आकार की तस्वीरें</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">
                          स्वरोजगार के लिए
                        </h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                          <li>पैन कार्ड और आधार कार्ड</li>
                          <li>पिछले 2 साल का ITR गणना के साथ</li>
                          <li>पिछले 6-12 महीने के बैंक स्टेटमेंट</li>
                          <li>व्यवसाय प्रमाण (GST, Shop Act)</li>
                          <li>कार्यालय पता प्रमाण</li>
                          <li>पासपोर्ट आकार की तस्वीरें</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Tips */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      सर्वोत्तम पर्सनल लोन डील पाने के टिप्स
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        CIBIL स्कोर जांचें (साल में एक बार मुफ्त) - आवेदन करने
                        से पहले 750+ तक सुधारें
                      </li>
                      <li>
                        कम से कम 4-5 लेंडरों की तुलना करें - दरें काफी भिन्न
                        होती हैं (10%-24%)
                      </li>
                      <li>
                        अपने मौजूदा बैंक के साथ बातचीत करें - रिलेशनशिप बैंकिंग
                        से बेहतर दरें मिलती हैं
                      </li>
                      <li>
                        केवल वही उधार लें जो आपको चाहिए - उच्च EMI-से-आय अनुपात
                        स्वीकृति को प्रभावित करता है
                      </li>
                      <li>
                        फाइन प्रिंट पढ़ें - छिपे हुए शुल्क, प्रीपेमेंट जुर्माना
                        जांचें
                      </li>
                      <li>
                        एक साथ कई लेंडरों से लोन लेने से बचें - क्रेडिट ब्यूरो
                        के लिए लाल झंडा
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
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-purple-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-50 to-purple-100 text-purple-700 text-2xl">
                                💰
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-purple-700 mb-1">
                                  सामान्य EMI कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  किसी भी प्रकार के लोन के लिए EMI कैलकुलेट करें
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

                      <Link href="/hi/loans/home-loan/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                🏠
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  होम लोन EMI कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  कम दरें और टैक्स लाभ - बेहतर विकल्प
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
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
                id="hi-personal-loan-before-faq"
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
                id="hi-personal-loan-bottom"
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
              <AdSlot id="hi-personal-loan-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-personal-loan-sidebar" />

              {/* 🎯 AD #9: SIDEBAR BOTTOM */}
              <AdSlot
                id="hi-personal-loan-sidebar-bottom"
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
