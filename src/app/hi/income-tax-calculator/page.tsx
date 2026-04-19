import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import IncomeTaxClient from '@/app/income-tax-calculator/IncomeTaxClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { IncomeTaxSchemas } from '@/components/schemas/IncomeTaxSchemas';
import {
  BadgeCheck,
  Scale,
  FileText,
  Info,
  TrendingDown,
  ArrowRight,
  Receipt,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'इनकम टैक्स कैलकुलेटर 2026 – पुरानी vs नई व्यवस्था | FY 2025-26',
  description:
    'FY 2025-26 और FY 2026-27 के लिए इनकम टैक्स कैलकुलेट करें। तुरंत पुरानी vs नई व्यवस्था तुलना। टैक्स स्लैब, 80C कटौती, HRA छूट देखें और व्यक्तिगत सिफारिश पाएं।',
  keywords: [
    'इनकम टैक्स कैलकुलेटर भारत',
    'टैक्स कैलकुलेटर 2026',
    'नई vs पुरानी टैक्स व्यवस्था कैलकुलेटर',
    'FY 2025-26 टैक्स स्लैब',
    'Tax Year 2026-27 इनकम टैक्स',
    'धारा 80C कैलकुलेटर',
    'वेतन टैक्स कैलकुलेटर',
    'बजट 2026 टैक्स बदलाव'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/income-tax-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/income-tax-calculator/',
    },
  },
  openGraph: {
    title: 'इनकम टैक्स कैलकुलेटर 2026 – पुरानी vs नई व्यवस्था तुलना',
    description:
      'तुरंत व्यवस्था तुलना के साथ मुफ्त इनकम टैक्स कैलकुलेटर। FY 2025-26 और FY 2026-27 के लिए टैक्स कैलकुलेट करें, कटौती अनुकूलित करें, और टैक्स बचाएं।',
    url: 'https://fincado.com/hi/income-tax-calculator/',
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

/* ---------------- FAQ DATA ---------------- */
const faqItems = [
  {
    id: 'tax-faq-1',
    question: 'कौन सी टैक्स व्यवस्था बेहतर है: पुरानी या नई?',
    answer:
      'नई व्यवस्था बेहतर है यदि आपकी कटौतियां (80C + HRA + होम लोन ब्याज) ₹3.75 लाख से कम हैं। पुरानी व्यवस्था बेहतर है यदि आपके पास उच्च कटौतियां हैं (होम लोन, HRA, 80C सभी अधिकतम)। अपनी वास्तविक आय और कटौतियों के आधार पर दोनों की तुलना करने के लिए हमारे कैलकुलेटर का उपयोग करें।',
  },
  {
    id: 'tax-faq-2',
    question: 'क्या मैं हर साल पुरानी और नई व्यवस्था के बीच स्विच कर सकता हूं?',
    answer:
      'हां। वेतनभोगी व्यक्ति ITR दाखिल करते समय हर वित्तीय वर्ष पुरानी और नई टैक्स व्यवस्था के बीच स्विच कर सकते हैं। हालांकि, व्यापार आय वाले करदाता अपने जीवनकाल में केवल एक बार स्विच कर सकते हैं।',
  },
  {
    id: 'tax-faq-3',
    question: 'क्या नई व्यवस्था HRA छूट की अनुमति देती है?',
    answer:
      'नहीं। HRA छूट, LTA (अवकाश यात्रा भत्ता), धारा 80C, 80D, होम लोन ब्याज कटौती नई टैक्स व्यवस्था के तहत अनुमति नहीं है। केवल ₹75,000 का स्टैंडर्ड डिडक्शन अनुमति है।',
  },
  {
    id: 'tax-faq-4',
    question: 'इनकम टैक्स में स्टैंडर्ड डिडक्शन क्या है?',
    answer:
      'स्टैंडर्ड डिडक्शन बिना किसी प्रमाण के उपलब्ध फ्लैट कटौती है। पुरानी व्यवस्था: ₹50,000। नई व्यवस्था: ₹75,000। यह वेतनभोगी व्यक्तियों और पेंशनभोगियों पर स्वचालित रूप से लागू होता है।',
  },
  {
    id: 'tax-faq-5',
    question: 'धारा 87A छूट क्या है?',
    answer:
      'धारा 87A कम आय वाले करदाताओं के लिए टैक्स छूट प्रदान करती है। नई व्यवस्था: यदि कर योग्य आय ≤ ₹7 लाख है तो पूर्ण टैक्स छूट (शून्य टैक्स)। पुरानी व्यवस्था: यदि कर योग्य आय ≤ ₹5 लाख है तो पूर्ण टैक्स छूट (शून्य टैक्स)।',
  },
  {
    id: 'tax-faq-6',
    question: 'स्वास्थ्य और शिक्षा उपकर क्या है?',
    answer:
      'स्वास्थ्य और शिक्षा उपकर कुल इनकम टैक्स देयता (छूट और अधिभार के बाद) पर लगाया गया अतिरिक्त 4% टैक्स है। यह पुरानी और नई दोनों व्यवस्थाओं पर लागू होता है। उदाहरण: टैक्स = ₹1,00,000 → उपकर = ₹4,000 → कुल = ₹1,04,000।',
  },
  {
    id: 'tax-faq-7',
    question: 'इनकम टैक्स पर अधिभार कब लागू होता है?',
    answer:
      'अधिभार ₹50 लाख से ऊपर की आय पर लागू होता है: ₹50L-₹1Cr के लिए 10% अधिभार, ₹1Cr-₹2Cr के लिए 15%, ₹2Cr-₹5Cr के लिए 25%, ₹5Cr+ के लिए 37%। अधिभार इनकम टैक्स (उपकर से पहले) पर गणना किया जाता है। बेसिक कैलकुलेटर में शामिल नहीं।',
  },
  {
    id: 'tax-faq-8',
    question: 'धारा 80C के तहत कौन सी कटौतियां अनुमति हैं?',
    answer:
      'धारा 80C निम्नलिखित के लिए ₹1.5 लाख तक की कटौती की अनुमति देती है: EPF, PPF, ELSS म्यूचुअल फंड, NSC, जीवन बीमा प्रीमियम, होम लोन मूलधन, सुकन्या समृद्धि योजना, ट्यूशन फीस। केवल पुरानी व्यवस्था पर लागू होता है।',
  },
  {
    id: 'tax-faq-9',
    question: 'क्या EPF योगदान सकल वेतन में शामिल है?',
    answer:
      'कर्मचारी EPF योगदान (बेसिक का 12%) टैक्स गणना से पहले सकल वेतन से धारा 80C के तहत काटा जाता है। नियोक्ता EPF योगदान सकल वेतन में शामिल नहीं है (₹7.5L/वर्ष तक टैक्स मुक्त)।',
  },
  {
    id: 'tax-faq-10',
    question: 'क्या बजट 2026 ने इनकम टैक्स स्लैब बदल दिए?',
    answer:
      'बजट 2026 ने पुरानी और नई दोनों व्यवस्थाओं के लिए मौजूदा टैक्स स्लैब बनाए रखे। नई व्यवस्था के लिए स्टैंडर्ड डिडक्शन ₹75,000 रहता है। FY 2026-27 के लिए कोई नए बदलाव नहीं किए गए।',
  }
];

/* ---------------- PAGE ---------------- */
export default function IncomeTaxPageHindi() {
  const introContent = autoLinkContent(`
    <p>
      <strong>इनकम टैक्स कैलकुलेटर</strong> आपको निर्धारण वर्ष (AY) 2026-27 और 2027-28 
      के लिए सटीक टैक्स देयता की गणना करने में मदद करता है जो वित्तीय वर्ष 2025-26 और 
      2026-27 को कवर करते हैं। यह स्वचालित रूप से <strong>पुरानी टैक्स व्यवस्था</strong> 
      (80C, HRA, होम लोन जैसी कटौतियों के साथ) और <strong>नई टैक्स व्यवस्था</strong> 
      (कम दरें, उच्च स्टैंडर्ड डिडक्शन) की तुलना करता है और सर्वोत्तम विकल्प की सिफारिश करता है।
    </p>
    <p class="mt-4">
      कैलकुलेटर में वरिष्ठ नागरिकों के लिए आयु-आधारित छूट, धारा 87A छूट, स्वास्थ्य और शिक्षा 
      उपकर (4%), और विस्तृत टैक्स ब्रेकडाउन के साथ तुरंत व्यवस्था तुलना शामिल है।
    </p>
  `);

  const howTaxCalculatedContent = autoLinkContent(`
    <p>
      भारत में इनकम टैक्स <strong>प्रगतिशील टैक्स स्लैब</strong> का उपयोग करके गणना किया जाता है 
      जहां आय के विभिन्न हिस्सों पर अलग-अलग दरों से टैक्स लगाया जाता है। यहां चरण-दर-चरण प्रक्रिया है:
    </p>
    <ol class="list-decimal pl-6 space-y-2 mt-3">
      <li><strong>सकल कुल आय गणना करें:</strong> वेतन, मकान संपत्ति आय, पूंजीगत लाभ, अन्य स्रोत जोड़ें</li>
      <li><strong>स्टैंडर्ड डिडक्शन घटाएं:</strong> वेतनभोगी व्यक्तियों के लिए ₹50,000 (पुरानी) या ₹75,000 (नई)</li>
      <li><strong>अध्याय VIA कटौतियां लागू करें:</strong> 80C (₹1.5L), 80D (₹25-50k), HRA, होम लोन ब्याज (केवल पुरानी व्यवस्था)</li>
      <li><strong>कर योग्य आय गणना करें:</strong> सकल आय - स्टैंडर्ड डिडक्शन - अध्याय VIA कटौतियां</li>
      <li><strong>टैक्स स्लैब लागू करें:</strong> प्रत्येक स्लैब हिस्से पर टैक्स गणना करें (5%, 10%, 15%, 20%, 30%)</li>
      <li><strong>धारा 87A छूट जांचें:</strong> यदि आय ≤ ₹7L (नई) या ≤ ₹5L (पुरानी) है तो पूर्ण छूट</li>
      <li><strong>अधिभार जोड़ें:</strong> यदि आय ₹50 लाख से अधिक है (आय के आधार पर 10-37%)</li>
      <li><strong>स्वास्थ्य और शिक्षा उपकर जोड़ें:</strong> (टैक्स + अधिभार) पर 4%</li>
    </ol>
  `);

  const deductionsContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">प्रमुख कटौतियां (केवल पुरानी व्यवस्था):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>धारा 80C (₹1.5 लाख तक):</strong> EPF, PPF, ELSS, जीवन बीमा, NSC, होम लोन मूलधन, ट्यूशन फीस</li>
      <li><strong>धारा 80CCD(1B) (₹50,000 तक):</strong> NPS योगदान के लिए अतिरिक्त कटौती (80C के अलावा)</li>
      <li><strong>धारा 80D (₹25-50k तक):</strong> स्वास्थ्य बीमा प्रीमियम (स्वयं: ₹25k, माता-पिता: ₹25k, वरिष्ठ माता-पिता: ₹50k)</li>
      <li><strong>धारा 24(b) (₹2 लाख तक):</strong> स्व-अधिकृत संपत्ति के लिए होम लोन ब्याज</li>
      <li><strong>धारा 10(13A):</strong> HRA छूट (न्यूनतम: वास्तविक HRA, किराया - वेतन का 10%, मेट्रो के लिए वेतन का 50%/गैर-मेट्रो के लिए 40%)</li>
      <li><strong>धारा 80TTA/TTB (₹10-50k तक):</strong> बचत खाते पर ब्याज (₹10k सामान्य, ₹50k वरिष्ठ नागरिक)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">नई व्यवस्था में कटौतियां:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>स्टैंडर्ड डिडक्शन:</strong> ₹75,000 (केवल यह अनुमति है)</li>
      <li><strong>नियोक्ता NPS योगदान:</strong> धारा 80CCD(2) के तहत (वेतन का 10% तक)</li>
      <li><strong>अनुमति नहीं:</strong> 80C, 80D, HRA, LTA, होम लोन ब्याज, 80G दान, आदि।</li>
    </ul>
  `);

  const surchargeContent = autoLinkContent(`
    <p>
      <strong>अधिभार</strong> उच्च आय अर्जकों पर लगाया गया अतिरिक्त टैक्स है। यह इनकम टैक्स 
      राशि (उपकर से पहले) पर गणना किया जाता है और फिर कुल पर 4% उपकर जोड़ा जाता है:
    </p>
    <div class="mt-3 overflow-x-auto">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-slate-100">
            <th class="border p-2 text-left">आय सीमा</th>
            <th class="border p-2 text-left">अधिभार दर</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border p-2">₹50 लाख तक</td><td class="border p-2">कोई अधिभार नहीं</td></tr>
          <tr><td class="border p-2">₹50L - ₹1 करोड़</td><td class="border p-2">10%</td></tr>
          <tr><td class="border p-2">₹1 Cr - ₹2 करोड़</td><td class="border p-2">15%</td></tr>
          <tr><td class="border p-2">₹2 Cr - ₹5 करोड़</td><td class="border p-2">25%</td></tr>
          <tr><td class="border p-2">₹5 करोड़ से ऊपर</td><td class="border p-2">37%</td></tr>
        </tbody>
      </table>
    </div>
    <div class="mt-3 p-3 bg-amber-50 rounded border border-amber-200">
      <p class="text-sm text-slate-700">
        <strong>उदाहरण:</strong> आय = ₹60 लाख, टैक्स = ₹10 लाख → अधिभार (10%) = 
        ₹1 लाख → उपकर (4%) = ₹44,000 → कुल टैक्स = ₹11,44,000
      </p>
    </div>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'इनकम टैक्स कैलकुलेटर',
            url: 'https://fincado.com/hi/income-tax-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="इनकम टैक्स कैलकुलेटर भारत"
        description="Tax Year 2026-27 और AY 2027-28 के लिए इनकम टैक्स देयता गणना करें। तुरंत सिफारिश के साथ पुरानी vs नई टैक्स व्यवस्था की तुलना करें।"
        url="https://fincado.com/hi/income-tax-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <IncomeTaxSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="इनकम टैक्स कैलकुलेटर 2026" />
            <LanguageToggle path="/income-tax-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-green-100 text-emerald-700">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                इनकम टैक्स कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                FY 2025–26 और FY 2026–27
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  तुरंत <strong>पुरानी vs नई टैक्स व्यवस्था</strong> की सटीक स्लैब गणना के 
                  साथ तुलना करें। अपनी कटौतियों और आय स्तर के आधार पर पता करें कि कौन सी 
                  व्यवस्था आपका अधिक टैक्स बचाती है। बजट 2026 के अनुसार अपडेट किया गया।
                </p>
              `}
            />
          </div>

          {/* Budget 2026 Status */}
          <div className="mt-6 flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-900">
                बजट 2026: टैक्स स्लैब अपरिवर्तित
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                केंद्रीय बजट 2026 ने ₹75,000 स्टैंडर्ड डिडक्शन के साथ{' '}
                <strong>नई टैक्स व्यवस्था</strong> को डिफॉल्ट के रूप में बनाए
                रखा। पुरानी व्यवस्था स्लैब अपरिवर्तित रहते हैं। FY 2026-27 (AY
                2027-28) के लिए कैलकुलेटर अपडेट किया गया।
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-tax-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      टैक्स मुक्त आय
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      नई व्यवस्था (छूट के साथ)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹7L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      स्टैंडर्ड डिडक्शन
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      नई व्यवस्था (बिना प्रमाण)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹75k
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        फ्लैट
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-linear-to-br from-red-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-red-700 mb-1">
                      अधिकतम टैक्स दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹15L से ऊपर की आय
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      30%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        + उपकर
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <IncomeTaxClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-tax-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  व्यवस्था चयन टिप
                </strong>
                नई व्यवस्था आमतौर पर कम कटौतियों के साथ ₹12 लाख तक की आय के लिए
                बेहतर है। पुरानी व्यवस्था उन लोगों को लाभ देती है जिनके पास होम
                लोन, उच्च HRA, और अधिकतम 80C निवेश है। पुष्टि करने के लिए
                कैलकुलेटर का उपयोग करें!
              </AlertDescription>
            </Alert>

            {/* Tax Slab Comparison Tables */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    इनकम टैक्स स्लैब FY 2025-26 और FY 2026-27
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Old Regime Slabs */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-emerald-700 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        पुरानी टैक्स व्यवस्था
                      </h3>

                      <div className="overflow-hidden rounded-lg border border-slate-200">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-emerald-50">
                              <TableHead className="font-bold">
                                आय स्लैब
                              </TableHead>
                              <TableHead className="font-bold">
                                टैक्स दर
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="text-sm">
                            <TableRow>
                              <TableCell>₹2.5L तक*</TableCell>
                              <TableCell className="font-semibold">
                                शून्य
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹2.5L - ₹5L</TableCell>
                              <TableCell className="font-semibold">
                                5%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹5L - ₹10L</TableCell>
                              <TableCell className="font-semibold">
                                20%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹10L से ऊपर</TableCell>
                              <TableCell className="font-semibold">
                                30%
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <p>*बेसिक छूट: ₹3L (आयु 60-80), ₹5L (आयु 80+)</p>
                        <p>
                          <strong>स्टैंडर्ड डिडक्शन:</strong> ₹50,000
                        </p>
                        <p>
                          <strong>धारा 87A छूट:</strong> यदि कर योग्य आय ≤ ₹5L
                          है तो पूर्ण छूट
                        </p>
                        <p>
                          <strong>कटौतियां अनुमति:</strong> 80C, 80D, HRA, होम
                          लोन, आदि।
                        </p>
                      </div>
                    </div>

                    {/* New Regime Slabs */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-emerald-700 flex items-center gap-2">
                        <Receipt className="h-5 w-5" />
                        नई टैक्स व्यवस्था
                      </h3>

                      <div className="overflow-hidden rounded-lg border border-slate-200">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-emerald-50">
                              <TableHead className="font-bold">
                                आय स्लैब
                              </TableHead>
                              <TableHead className="font-bold">
                                टैक्स दर
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="text-sm">
                            <TableRow>
                              <TableCell>₹3L तक</TableCell>
                              <TableCell className="font-semibold">
                                शून्य
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹3L - ₹7L</TableCell>
                              <TableCell className="font-semibold">
                                5%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹7L - ₹10L</TableCell>
                              <TableCell className="font-semibold">
                                10%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹10L - ₹12L</TableCell>
                              <TableCell className="font-semibold">
                                15%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹12L - ₹15L</TableCell>
                              <TableCell className="font-semibold">
                                20%
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>₹15L से ऊपर</TableCell>
                              <TableCell className="font-semibold">
                                30%
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <p>
                          <strong>स्टैंडर्ड डिडक्शन:</strong> ₹75,000
                        </p>
                        <p>
                          <strong>धारा 87A छूट:</strong> यदि कर योग्य आय ≤ ₹7L
                          है तो पूर्ण छूट
                        </p>
                        <p>
                          <strong>कटौतियां अनुमति नहीं:</strong> 80C, 80D, HRA,
                          होम लोन, LTA
                        </p>
                        <p>
                          <strong>डिफॉल्ट व्यवस्था:</strong> स्वचालित रूप से
                          लागू होती है जब तक पुरानी नहीं चुनी जाती
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <p className="text-sm text-slate-700">
                      <strong>मुख्य अंतर:</strong> नई व्यवस्था में अधिक स्लैब (6
                      vs 4) कम दरों के साथ लेकिन कम कटौतियों के साथ। पुरानी
                      व्यवस्था में उच्च दरें हैं लेकिन 80C, 80D, HRA, होम लोन
                      ब्याज के तहत कटौतियां अनुमति देती है जो कर योग्य आय को
                      महत्वपूर्ण रूप से कम कर सकती हैं।
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    ELSS म्यूचुअल फंड (धारा 80C) से टैक्स बचाएं
                  </strong>
                  <Link
                    href="/hi/elss-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      ELSS कैलकुलेटर के साथ ELSS रिटर्न और टैक्स बचत क्षमता गणना
                      करें
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
                  भारत में इनकम टैक्स क्या है?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  इनकम टैक्स की गणना कैसे की जाती है? (चरण-दर-चरण)
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={howTaxCalculatedContent} />
                </div>

                {/* Example Calculation */}
                <div className="mt-6 p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">🧮</span>
                    उदाहरण: ₹12 लाख वेतन टैक्स गणना (नई व्यवस्था)
                  </h4>

                  <div className="space-y-3 text-sm text-slate-700">
                    <div className="space-y-2 font-mono">
                      <div className="flex justify-between">
                        <span>सकल वार्षिक वेतन:</span>
                        <span className="font-semibold">₹12,00,000</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>कम: स्टैंडर्ड डिडक्शन:</span>
                        <span>₹75,000</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>कर योग्य आय:</span>
                        <span>₹11,25,000</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-emerald-300">
                      <div className="font-semibold mb-2">टैक्स गणना:</div>
                      <div className="space-y-1 text-xs font-mono">
                        <div>₹3L तक: शून्य = ₹0</div>
                        <div>₹3L - ₹7L (₹4L × 5%): = ₹20,000</div>
                        <div>₹7L - ₹10L (₹3L × 10%): = ₹30,000</div>
                        <div>₹10L - ₹11.25L (₹1.25L × 15%): = ₹18,750</div>
                        <div className="border-t pt-1 mt-2 font-semibold">
                          कुल टैक्स: = ₹68,750
                        </div>
                        <div>
                          जोड़ें: स्वास्थ्य और शिक्षा उपकर (4%): = ₹2,750
                        </div>
                        <div className="font-bold text-base mt-2 text-emerald-700">
                          अंतिम टैक्स देयता: = ₹71,500
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-white rounded border border-emerald-200">
                      <div className="text-sm">
                        <strong>टैक्स के बाद शुद्ध आय:</strong> ₹12,00,000 -
                        ₹71,500 ={' '}
                        <strong className="text-emerald-700">₹11,28,500</strong>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        प्रभावी टैक्स दर: 5.96%
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="hi-tax-mid-content"
                  type="square"
                  label="विज्ञापन"
                />
              </div>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  कटौतियां और छूट की व्याख्या
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={deductionsContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  इनकम टैक्स पर अधिभार क्या है?
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={surchargeContent} />
                </div>
              </section>

              {/* Regime Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  पुरानी vs नई व्यवस्था: विस्तृत तुलना
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead>विशेषता</TableHead>
                        <TableHead>पुरानी व्यवस्था</TableHead>
                        <TableHead>नई व्यवस्था</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          टैक्स स्लैब
                        </TableCell>
                        <TableCell>4 स्लैब (5%, 20%, 30%)</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          6 स्लैब (5%, 10%, 15%, 20%, 30%)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          स्टैंडर्ड डिडक्शन
                        </TableCell>
                        <TableCell>₹50,000</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹75,000
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          धारा 80C (₹1.5L)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          अनुमति
                        </TableCell>
                        <TableCell>अनुमति नहीं</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">HRA छूट</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          अनुमति
                        </TableCell>
                        <TableCell>अनुमति नहीं</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          होम लोन ब्याज
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          अनुमति (₹2L)
                        </TableCell>
                        <TableCell>अनुमति नहीं</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          धारा 87A छूट
                        </TableCell>
                        <TableCell>₹5L आय तक</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹7L आय तक
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          LTA (अवकाश यात्रा)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          अनुमति
                        </TableCell>
                        <TableCell>अनुमति नहीं</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          डिफॉल्ट विकल्प
                        </TableCell>
                        <TableCell>नहीं</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          हां (FY 2023-24 से)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          के लिए सर्वोत्तम
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          उच्च कटौतियां (होम लोन, HRA, 80C सभी अधिकतम)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          कम कटौतियां, सरल वेतन आय
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* Recommendation Guide */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  आपको कौन सी टैक्स व्यवस्था चुननी चाहिए?
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-5 rounded-xl border-2 border-emerald-200 bg-emerald-50">
                    <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                      <BadgeCheck className="h-5 w-5" />
                      नई व्यवस्था चुनें यदि:
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5">
                      <li>आय ₹7 लाख से कम (छूट के साथ शून्य टैक्स)</li>
                      <li>कोई होम लोन या HRA लाभ नहीं</li>
                      <li>कटौतियां ₹3.75 लाख से कम</li>
                      <li>प्रमाण सबमिशन के बिना सरलता चाहते हैं</li>
                      <li>फ्रीलांसर/कंसल्टेंट बिना HRA के</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl border-2 border-emerald-200 bg-emerald-50">
                    <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      पुरानी व्यवस्था चुनें यदि:
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5">
                      <li>उच्च ब्याज के साथ होम लोन (₹2L कटौती)</li>
                      <li>उच्च HRA (मेट्रो में ₹3-4L छूट)</li>
                      <li>अधिकतम 80C निवेश (₹1.5L)</li>
                      <li>कुल कटौतियां ₹3.75 लाख से अधिक</li>
                      <li>उच्च चिकित्सा खर्चों के साथ वरिष्ठ नागरिक (80D)</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                  <p className="text-sm text-slate-700">
                    <strong>सामान्य नियम:</strong> नई व्यवस्था न्यूनतम कटौतियों
                    के साथ ₹12 लाख तक की आय के लिए अधिक टैक्स बचाती है। पुरानी
                    व्यवस्था तब बेहतर है जब कुल कटौतियां (HRA + 80C + होम लोन)
                    ₹3.75 लाख से अधिक हों। सटीक तुलना के लिए हमेशा कैलकुलेटर का
                    उपयोग करें!
                  </p>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  इस इनकम टैक्स कैलकुलेटर का उपयोग कैसे करें
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    <strong>वित्तीय वर्ष</strong> चुनें: FY 2025-26 (2026 में
                    ITR दाखिल करने के लिए) या FY 2026-27 (आगे की योजना के लिए)।
                  </li>
                  <li>
                    <strong>आयु वर्ग</strong> चुनें: 60 से कम, 60-80 (वरिष्ठ),
                    या 80+ (सुपर सीनियर)। पुरानी व्यवस्था में बेसिक छूट को
                    प्रभावित करता है।
                  </li>
                  <li>
                    <strong>सकल वार्षिक आय</strong> दर्ज करें: किसी भी कटौती से
                    पहले कुल वेतन (CTC घटा नियोक्ता PF योगदान)।
                  </li>
                  <li>
                    <strong>कुल कटौतियां</strong> जोड़ें: 80C (₹1.5L), 80D
                    (₹25-50k), HRA छूट, होम लोन ब्याज, आदि का योग। केवल पुरानी
                    व्यवस्था पर लागू होता है।
                  </li>
                  <li>
                    <strong>व्यवस्था तुलना</strong> की समीक्षा करें: कैलकुलेटर
                    दोनों व्यवस्थाओं के लिए टैक्स दिखाता है और हाइलाइट करता है
                    कि कौन सा अधिक बचाता है।
                  </li>
                  <li>
                    <strong>टैक्स ब्रेकडाउन</strong> देखें: कर योग्य आय गणना,
                    स्लैब-वार टैक्स, और उपकर के साथ अंतिम राशि देखें।
                  </li>
                  <li>
                    भविष्य के संदर्भ के लिए गणना सहेजें या WhatsApp के माध्यम से
                    CA/परिवार के साथ साझा करें।
                  </li>
                </ol>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित टैक्स और निवेश उपकरण
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/hi/elss-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              ELSS कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              धारा 80C के तहत ELSS म्यूचुअल फंड से टैक्स बचत और
                              रिटर्न गणना करें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>ELSS रिटर्न कैलकुलेट करें</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/hi/hra-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            🏠
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              HRA कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              पुरानी टैक्स व्यवस्था योजना के लिए मकान किराया
                              भत्ता छूट गणना करें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>HRA छूट कैलकुलेट करें</span>
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
              <AdSlot id="hi-tax-before-faq" type="leaderboard" lazyLoad />
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

            {/* AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-tax-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-tax-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-tax-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
